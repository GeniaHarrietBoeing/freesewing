export const sleeve = {
  name: 'ace_of_swords.sleeve',
  measurements: ['biceps', 'wrist', 'shoulderToWrist'],
  draft: ({ Path, paths, Point, points, measurements, store, part }) => {
    const elasticMod = 1.5
    const shirringMod = 1.5
    const shoulderWidth = measurements.biceps * shirringMod * 0.75
    // 0.75 is the proportion of my biceps and the measurement for the off the shoulder sleeve
    const wristWidth = measurements.biceps * elasticMod
    const backArmholeLength = store.get('backArmholeLength')
    const frontArmholeLength = store.get('frontArmholeLength')

    paths.shoulder = new Path()
      .move(new Point(0, 0))
      .line(new Point(0, shoulderWidth))
      .line(new Point(backArmholeLength, shoulderWidth))

    paths.wrist = new Path()
      .move(new Point(measurements.shoulderToWrist, 0))
      .line(new Point(measurements.shoulderToWrist, wristWidth))

    return part
  },
}
