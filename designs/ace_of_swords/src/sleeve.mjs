export const sleeve = {
  name: 'ace_of_swords.sleeve',
  measurements: ['biceps', 'wrist', 'shoulderToWrist', 'shoulderToElbow'],
  draft: ({ Path, paths, Point, points, measurements, store, part }) => {
    const elasticMod = 1.5
    const shirringMod = 1.5
    const shoulderWidth = measurements.biceps * shirringMod * 0.75
    // 0.75 is the proportion of my biceps and the measurement for the off the shoulder sleeve
    const wristWidth = measurements.biceps * elasticMod
    const backArmholeLength = store.get('backArmholeLength')
    const frontArmholeLength = store.get('frontArmholeLength')
    // Here I sort off have to decide how much higher the shoulder seam is compared to the armpit meating of all seams. What I have going for me, is that the length and proportions of people's arms are relatively similar. And, this doesn't need to approximate someones anatomical armpit height, because the sleeve is loose.
    const wristToArmpitLength = measurements.shoulderToWrist * 0.7

    points.backArmpit = new Point(wristWidth / 2 - shoulderWidth / 2, 0).addCircle(7)
    points.frontArmpit = points.backArmpit.shift(0, shoulderWidth).addCircle(2)
    points.backShoulder = new Point(
      0,
      measurements.shoulderToWrist - wristToArmpitLength
    ).addCircle(3)
    points.frontShoulder = points.backShoulder.shift(0, wristWidth).addCircle(8)
    points.cp1 = points.backArmpit.shift(0, 30).addCircle(2)
    points.cp2 = points.backShoulder.shift(180, 30).addCircle(3)

    paths.backSleeve = new Path()
      .move(points.backArmpit)
      .curve(points.cp1, points.cp2, points.backShoulder)

    paths.shoulder = new Path().move(points.backArmpit).line(points.frontArmpit)

    paths.wrist = new Path()
      .move(points.backShoulder)
      .line(new Point(0, measurements.shoulderToWrist))
      .line(new Point(wristWidth, measurements.shoulderToWrist))
      .line(points.frontShoulder)
    return part
  },
}
