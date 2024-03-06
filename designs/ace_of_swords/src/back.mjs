export const back = {
  name: 'ace_of_swords.back',
  measurements: ['waist', 'highBust', 'waistToArmpit', 'hpsToWaistBack', 'shoulderToShoulder'],
  draft: ({ Path, paths, Point, points, measurements, store, part }) => {
    const shirringMod = 1.5
    const waistLength = (measurements.waist * shirringMod) / 4
    const neckLength = (measurements.shoulderToShoulder * shirringMod) / 4
    const verticalLength =
      measurements.waistToArmpit + (measurements.hpsToWaistBack - measurements.waistToArmpit) / 2

    paths.front = new Path()
      .move(new Point(0, 0))
      .line(new Point(0, verticalLength))
      .line(new Point(waistLength, verticalLength))
      .line(new Point(waistLength, verticalLength - measurements.waistToArmpit))
      .line(new Point(neckLength, 0))
      .line(new Point(0, 0))

    store.set('backArmholeLength', 10)

    return part
  },
}
