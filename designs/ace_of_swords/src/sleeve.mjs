export const sleeve = {
  name: 'ace_of_swords.sleeve',
  measurements: ['biceps', 'wrist', 'shoulderToWrist', 'shoulderToElbow'],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, part }) => {
    const elasticMod = 1.5
    const shirringMod = 1.5
    const shoulderWidth = measurements.biceps * shirringMod * 0.75
    // 0.75 is the proportion of my biceps and the measurement for the off the shoulder sleeve
    const wristWidth = measurements.biceps * elasticMod
    const backArmholeLength = store.get('backArmholeLength')
    const frontArmholeLength = store.get('frontArmholeLength')
    // Here I sort off have to decide how much higher the shoulder seam is compared to the armpit meating of all seams. What I have going for me, is that the length and proportions of people's arms are relatively similar. And, this doesn't need to approximate someones anatomical armpit height, because the sleeve is loose.
    const wristToArmpitLength = measurements.shoulderToWrist * 0.7

    points.backShoulder = new Point(wristWidth / 2 - shoulderWidth / 2, 0).addCircle(10)
    points.frontShoulder = points.backShoulder.shift(0, shoulderWidth).addCircle(2)
    points.backArmpit = new Point(0, measurements.shoulderToWrist - wristToArmpitLength).addCircle(
      3
    )
    points.frontArmpit = points.backArmpit.shift(0, wristWidth).addCircle(8)

    // Fitting the back armsleeve curve
    let tweak = 1
    let delta
    do {
      points.cp1 = points.backShoulder.shift(200, tweak * 30).addCircle(5)
      points.cp2 = points.backArmpit.shift(0, 30).addCircle(3)

      paths.backSleeve = new Path()
        .move(points.backShoulder)
        .curve(points.cp1, points.cp2, points.backArmpit)
      delta = paths.backSleeve.length() - backArmholeLength
      if (delta > 0) tweak = tweak * 0.99
      else tweak = tweak * 1.02
    } while (Math.abs(delta) > 1)

    paths.shoulder = new Path().move(points.backShoulder).line(points.frontShoulder)

    points.backWrist = new Point(0, measurements.shoulderToWrist)
    points.frontWrist = points.backWrist.shift(0, wristWidth)

    paths.wrist = new Path()
      .move(points.backArmpit)
      .line(points.backWrist)
      .line(points.frontWrist)
      .line(points.frontArmpit)

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

    return part
  },
}
