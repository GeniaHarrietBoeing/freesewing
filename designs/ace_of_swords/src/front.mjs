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
    'underbust',
  ],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, part }) => {
    let shirringMod = 1.5

    let armpitToArmpit = measurements.shoulderToShoulder * 0.85
    let neckLength = (armpitToArmpit * shirringMod) / 2
    let verticalLength =
      measurements.waistToArmpit + (measurements.hpsToWaistFront - measurements.waistToArmpit) / 2
    let horizontalArmscyeLength = measurements.chest / 4 - measurements.shoulderToShoulder / 2
    let waistLength = (measurements.waist / 4) * shirringMod
    let bustWidth = (measurements.highBust / 4) * shirringMod // TODO: Too large, since we don't want the shirred volume over chest, but need to test large enough for someone's chest
    let ratioBustUnderbust = measurements.chest / measurements.underbust // related to the fleshiness of the chest, just to get a feeling for how much the bust would distort the hpsToWaistFront and keeps it from being a true vertical measurement. if this is large, then the hpsToFrontWaist will have a higher deviance from a vertical measurement

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

    points.cp1 = points.armpit.shift(170, horizontalArmscyeLength * 1.5).addCircle(3)
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
    macro('hd', {
      id: 'bustWidth',
      from: points.centerNeck,
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
