export const front = {
  name: 'ace_of_swords.front',
  measurements: [
    'waist',
    'highBust',
    'waistToArmpit',
    'hpsToWaistFront',
    'shoulderToShoulder',
    'chest',
    'bustFront',
  ],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, part }) => {
    const shirringMod = 1
    const horizontalArmscyeLength = measurements.chest / 4 - measurements.shoulderToShoulder / 2
    const waistLength = (measurements.waist / 4 + horizontalArmscyeLength) * shirringMod
    const bustWidth = (measurements.highBust / 4) * shirringMod // TODO: Too large, since we don't want the shirred volume over chest, but need to test large enough for someone's chest
    const armpitToArmpit = measurements.shoulderToShoulder * 0.85
    const neckLength = (armpitToArmpit * shirringMod) / 2
    const verticalLength =
      measurements.waistToArmpit + (measurements.hpsToWaistFront - measurements.waistToArmpit) / 2

    points.centerNeck = new Point(0, 0)
    points.centerWaist = new Point(0, verticalLength)
    points.sideWaist = new Point(waistLength, verticalLength)
    points.armpit = new Point(bustWidth, verticalLength - measurements.waistToArmpit)
    points.shoulder = new Point(neckLength, 0)

    paths.front = new Path()
      .move(points.centerNeck)
      .line(points.centerWaist)
      .line(points.sideWaist)
      .line(points.armpit)
      .move(points.shoulder)
      .line(points.centerNeck)

    points.cp1 = points.armpit.shift(190, horizontalArmscyeLength * 1.5).addCircle(3)
    paths.armhole = new Path().move(points.shoulder)._curve(points.cp1, points.armpit)
    store.set('frontArmholeLength', paths.armhole.length())

    points.middle = new Point(waistLength / 2, verticalLength / 2)
    points.title = points.middle
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'Bodice Front',
      align: 'center',
      scale: 0.8,
    })

    macro('hd', {
      id: 'neckLength',
      from: points.centerNeck,
      to: points.shoulder,
      y: points.centerNeck.y - 10,
    })
    macro('hd', {
      id: 'waistLength',
      from: points.centerWaist,
      to: points.sideWaist,
      y: points.centerWaist.y + 10,
    })
    macro('hd', {
      id: 'horizontalArmdepth',
      from: points.shoulder,
      to: points.armpit,
      y: points.armpit.y,
    })
    macro('vd', {
      id: 'sideSeam',
      from: points.sideWaist,
      to: points.armpit,
      x: points.armpit.x + 10,
    })
    macro('vd', {
      id: 'bodiceLength',
      from: points.centerNeck,
      to: points.centerWaist,
      x: points.centerWaist.x - 10,
    })
    macro('vd', {
      id: 'armdepth',
      from: points.shoulder,
      to: points.armpit,
      x: points.shoulder.x,
    })
    macro('pd', {
      id: 'armhole',
      path: paths.armhole,
      d: -10,
    })

    return part
  },
}
