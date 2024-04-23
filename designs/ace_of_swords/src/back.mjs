export const back = {
  name: 'ace_of_swords.back',
  measurements: [
    'waist',
    'highBust',
    'waistToArmpit',
    'hpsToWaistBack',
    'shoulderToShoulder',
    'highBustFront',
  ],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, part }) => {
    const shirringMod = 1.5
    let waistLength = (measurements.waist / 4) * shirringMod
    let armpitToArmpit = measurements.shoulderToShoulder * 0.85
    let neckLength = (armpitToArmpit * shirringMod) / 2
    let verticalLength =
      measurements.waistToArmpit + (measurements.hpsToWaistBack - measurements.waistToArmpit) / 2
    let bustWidth = ((measurements.highBust - measurements.highBustFront) / 2) * shirringMod

    // check for the case that someone's chest is smaller than their waist
    if (bustWidth < waistLength) bustWidth = waistLength

    points.centerNeck = new Point(0, 0)
    points.sideWaist = new Point(waistLength, verticalLength)
    points.armpit = new Point(bustWidth, verticalLength - measurements.waistToArmpit)
    points.shoulder = new Point(neckLength, 0)

    // Trueing side seam length
    paths.sideSeam = new Path().move(points.armpit).line(points.sideWaist).hide()
    points.truedSideWaist = paths.sideSeam.shiftAlong(measurements.waistToArmpit)
    points.centerWaist = new Point(0, points.truedSideWaist.y)

    // Drawing the path
    paths.front = new Path()
      .move(points.centerNeck)
      .line(points.centerWaist)
      .line(points.truedSideWaist)
      .line(points.armpit)
      .move(points.shoulder)
      .line(points.centerNeck)

    // Armscye
    let horizontalArmscyeLength = points.armpit.x - points.shoulder.x
    points.cp1 = points.armpit.shift(170, horizontalArmscyeLength).addCircle(3)
    paths.armhole = new Path().move(points.shoulder)._curve(points.cp1, points.armpit)
    store.set('backArmholeLength', paths.armhole.length())

    // Pattern measurements
    macro('hd', {
      id: 'neckLength',
      from: points.centerNeck,
      to: points.shoulder,
      y: points.centerNeck.y - 10,
    })
    macro('hd', {
      id: 'waistLength',
      from: points.centerWaist,
      to: points.truedSideWaist,
      y: points.centerWaist.y + 10,
    })
    macro('hd', {
      id: 'horizontalArmdepth',
      from: points.shoulder,
      to: points.armpit,
      y: points.armpit.y,
    })
    macro('hd', {
      id: 'bustWidth',
      from: points.centerNeck,
      to: points.armpit,
      y: points.armpit.y,
    })
    macro('vd', {
      id: 'sideSeam',
      from: points.truedSideWaist,
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
    macro('pd', {
      id: 'sideseam',
      path: new Path().move(points.armpit).line(points.truedSideWaist),
      d: -10,
    })

    // Pattern information box
    points.middle = new Point(waistLength / 2, verticalLength / 2)
    points.title = points.middle
    macro('title', {
      at: points.title,
      nr: 2,
      title: 'Bodice Back',
      align: 'center',
      scale: 0.8,
    })

    // Grainline
    macro('grainline', {
      from: new Point(points.middle.x / 2, points.centerWaist.y * 0.25),
      to: new Point(points.middle.x / 2, points.centerWaist.y * 0.75),
    })

    return part
  },
}
