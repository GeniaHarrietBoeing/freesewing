export const sleeve = {
  name: 'ace_of_swords.sleeve',
  measurements: ['biceps', 'wrist', 'shoulderToWrist', 'shoulderToElbow'],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, sa, part }) => {
    const elasticMod = 1.5
    const shirringMod = 1.5
    const shoulderWidth = measurements.biceps * shirringMod * 0.5
    // 0.75 is the proportion of my biceps and the measurement for the off the shoulder sleeve
    const wristWidth = measurements.biceps * elasticMod
    const backArmholeLength = store.get('backArmholeLength')
    const frontArmholeLength = store.get('frontArmholeLength')
    // Here I sort off have to decide how much higher the shoulder seam is compared to the armpit meating of all seams. What I have going for me, is that the length and proportions of people's arms are relatively similar. And, this doesn't need to approximate someones anatomical armpit height, because the sleeve is loose.
    const wristToArmpitLength = measurements.shoulderToWrist * 0.8

    points.backShoulder = new Point(wristWidth / 2 - shoulderWidth / 2, 0)
    points.frontShoulder = points.backShoulder.shift(0, shoulderWidth)
    points.backArmpit = new Point(0, measurements.shoulderToWrist - wristToArmpitLength)
    points.frontArmpit = points.backArmpit.shift(0, wristWidth)

    // Fitting the back armsleeve curve
    let tweak = 1
    let runs = 0
    let delta
    do {
      points.cp1Back = points.backShoulder.shift(180, tweak * 30).addCircle(5)
      points.cp2Back = points.backArmpit.shift(0, 30).addCircle(3)

      paths.backSleeve = new Path()
        .move(points.backShoulder)
        .curve(points.cp1Back, points.cp2Back, points.backArmpit)
      delta = paths.backSleeve.length() - backArmholeLength
      runs++
      if (delta > 0) tweak = tweak * 0.99
      else tweak = tweak * 1.02
    } while (Math.abs(delta) > 1 && runs < 50)

    // Fitting the front armsleeve curve
    tweak = 1
    runs = 0
    do {
      points.cp1Front = points.frontShoulder.shift(0, tweak * 30).addCircle(5)
      points.cp2Front = points.frontArmpit.shift(180, 30).addCircle(3)

      paths.frontSleeve = new Path()
        .move(points.frontShoulder)
        .curve(points.cp1Front, points.cp2Front, points.frontArmpit)
      delta = paths.frontSleeve.length() - frontArmholeLength
      runs++
      if (delta > 0) tweak = tweak * 0.99
      else tweak = tweak * 1.02
    } while (Math.abs(delta) > 1 && runs < 100)

    paths.shoulder = new Path().move(points.backShoulder).line(points.frontShoulder)

    points.backWrist = new Point(0, measurements.shoulderToWrist)
    points.frontWrist = points.backWrist.shift(0, wristWidth)

    paths.wrist = new Path()
      .move(points.backArmpit)
      .line(points.backWrist)
      .line(points.frontWrist)
      .line(points.frontArmpit)
      .hide()

    // preparing the Seam Allowance
    paths.seam = paths.backSleeve.join(
      paths.wrist,
      paths.frontSleeve.reverse(true),
      paths.shoulder.reverse(true)
    )
    if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

    // placing the information on the pattern
    points.middle = new Point(wristWidth / 2, wristToArmpitLength)
    points.title = points.middle
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'Sleeve',
      align: 'center',
      scale: 0.8,
    })

    macro('hd', {
      id: 'shoulder',
      from: points.backShoulder,
      to: points.frontShoulder,
      y: points.backShoulder.y + 5,
    })
    macro('hd', {
      id: 'armpit',
      from: points.backArmpit,
      to: points.frontArmpit,
      y: points.backArmpit.y - 10,
    })
    macro('hd', {
      id: 'lengthDiffShoulderArmpit',
      from: points.backArmpit,
      to: points.backShoulder,
      y: points.backArmpit.y,
    })
    macro('vd', {
      id: 'shoulderHeight',
      from: points.backShoulder,
      to: points.backArmpit,
      x: points.backShoulder.x,
    })
    macro('vd', {
      id: 'sleeveLength',
      from: points.backShoulder,
      to: points.backWrist,
      x: points.backWrist.x - 10,
    })
    macro('pd', {
      id: 'backSleeve',
      path: paths.backSleeve,
      d: 10,
    })
    macro('pd', {
      id: 'frontSleeve',
      path: paths.frontSleeve,
      d: -10,
    })

    return part
  },
}
