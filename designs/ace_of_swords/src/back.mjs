export const back = {
  name: 'ace_of_swords.back',
  measurements: ['waist', 'highBust', 'waistToArmpit', 'hpsToWaistBack', 'shoulderToShoulder'],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, part }) => {
    const shirringMod = 1.5
    const horizontalArmscyeLength = measurements.highBust / 4 - measurements.shoulderToShoulder / 2
    const waistLength = (measurements.waist / 4 + horizontalArmscyeLength) * shirringMod
    const armpitToArmpit = measurements.shoulderToShoulder * 0.85
    const neckLength = (armpitToArmpit * shirringMod) / 2
    const verticalLength =
      measurements.waistToArmpit + (measurements.hpsToWaistBack - measurements.waistToArmpit) / 2

    points.centerNeck = new Point(0, 0)
    points.centerWaist = new Point(0, verticalLength)
    points.sideWaist = new Point(waistLength, verticalLength)
    points.armpit = new Point(waistLength, verticalLength - measurements.waistToArmpit)
    points.shoulder = new Point(neckLength, 0)

    paths.front = new Path()
      .move(points.centerNeck)
      .line(points.centerWaist)
      .line(points.sideWaist)
      .line(points.armpit)
      .move(points.shoulder)
      .line(points.centerNeck)

    points.cp1 = points.armpit.shift(170, 50).addCircle(3)
    paths.armhole = new Path().move(points.shoulder)._curve(points.cp1, points.armpit)
    store.set('backArmholeLength', paths.armhole.length())

    points.middle = new Point(waistLength / 2, verticalLength / 2)
    points.title = points.middle
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'Bodice Back',
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
