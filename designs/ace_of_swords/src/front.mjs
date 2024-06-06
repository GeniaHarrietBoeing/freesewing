export const front = {
  name: 'ace_of_swords.front',
  measurements: [
    'waist',
    'highBust',
    'waistToArmpit',
    'hpsToWaistFront',
    'hpsToBust',
    'shoulderToShoulder',
    'chest',
    'bustFront',
    'underbust',
    'highBustFront',
    'neck',
    'shoulderSlope',
  ],
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, utils, part }) => {
    const shirringMod = 1.5
    const dartWidth = 70

    // Easy fitting bodice

    // Neck and Armscye
    store.set('frontVerticalArmscyeLength', 20)

    let armscyeDepth = measurements.hpsToWaistFront - measurements.waistToArmpit
    let totalChestEase = 70

    points.centerNeck = new Point(0, measurements.neck * 0.2).setCircle(2)
    points.hps = new Point(measurements.neck * 0.2, 0).setCircle(2)
    points.hpsDart = points.hps.shift(0, dartWidth / 2).setCircle(2)
    points.chest = new Point(0, armscyeDepth).setCircle(2)
    points.sideChest = new Point(0.5 * measurements.highBustFront, points.chest.y).setCircle(2)
    points.underArm = points.sideChest
      .shift(
        0,
        0.5 *
          (0.5 * measurements.chest +
            totalChestEase -
            points.sideChest.x -
            (0.5 * measurements.shoulderToShoulder + 10))
      )
      .setCircle(2)
    points.midArmscye = points.sideChest
      .shift(90, 0.5 * (points.chest.y - points.centerNeck.y) - 20)
      .setCircle(4)
    let xShoulder = measurements.shoulderToShoulder / 2 + dartWidth / 2
    points.shoulder = utils
      .beamsIntersect(
        new Point(xShoulder, 0),
        new Point(xShoulder, 100),
        points.hpsDart,
        points.hpsDart.shift(360 - measurements.shoulderSlope, 100)
      )
      .setCircle(5)

    paths.shoulder = new Path().move(points.hpsDart).line(points.shoulder)

    paths.armscye = new Path()
      .move(points.underArm)
      .curve(points.sideChest, points.midArmscye, points.shoulder)
    store.set('frontArmholeLength', paths.armscye.length())

    paths.chest = new Path().move(points.chest).line(points.underArm)

    //where to cut off for off-the-shoulder:
    let yCutOff = points.centerNeck.y + (points.chest.y - points.centerNeck.y) / 3
    points.meeeh = new Point(0, 0).setText(yCutOff)
    paths.cutOff = new Path()
      .move(new Point(0, yCutOff))
      .line(new Point(points.underArm.x, yCutOff))
    points.cutOffShoulder = utils
      .curveIntersectsY(
        points.underArm,
        points.sideChest,
        points.midArmscye,
        points.shoulder,
        yCutOff
      )
      .setCircle(2)

    macro('pd', {
      id: 'shoulder',
      path: paths.shoulder,
      d: -10,
    })

    macro('pd', {
      id: 'armhole',
      path: paths.armscye,
      d: -10,
    })

    macro('pd', {
      id: 'chest',
      path: paths.chest,
      d: -10,
    })

    /*
    let armpitToArmpit = measurements.shoulderToShoulder * 0.85
    let neckLength = (armpitToArmpit * shirringMod) / 2
    let verticalLength =
      measurements.waistToArmpit + (measurements.hpsToWaistFront - measurements.waistToArmpit) / 2
    let waistLength = (measurements.waist / 4) * shirringMod
    let bustWidth = (measurements.highBustFront / 2) * shirringMod // TODO: Too large, since we don't want the shirred volume over chest, but need to test large enough for someone's chest
    let ratioBustUnderbust = measurements.chest / measurements.underbust // related to the fleshiness of the chest, just to get a feeling for how much the bust would distort the hpsToWaistFront and keeps it from being a true vertical measurement. if this is large, then the hpsToFrontWaist will have a higher deviance from a vertical measurement

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
    let verticalArmscyeLength = points.armpit.y - points.shoulder.y
    points.cp1 = points.armpit.shift(170, horizontalArmscyeLength * 1).addCircle(3)
    paths.armhole = new Path().move(points.shoulder)._curve(points.cp1, points.armpit)
    store.set('frontArmholeLength', paths.armhole.length())
    store.set('frontVerticalArmscyeLength', verticalArmscyeLength)

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

    points.bustApex = new Point(
      0,
      points.centerWaist.y - (measurements.hpsToWaistFront - measurements.hpsToBust)
    ).setCircle(5)

    macro('hd', {
      id: 'widthAtApex',
      from: new Point(
        0,
        points.centerWaist.y - (measurements.hpsToWaistFront - measurements.hpsToBust)
      ),
      to: new Point(
        points.armpit.x,
        points.centerWaist.y - (measurements.hpsToWaistFront - measurements.hpsToBust)
      ),
      y: points.centerWaist.y - (measurements.hpsToWaistFront - measurements.hpsToBust),
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
      nr: 1,
      title: 'Bodice Front',
      align: 'center',
      scale: 0.8,
    })

    // Grainline
    macro('grainline', {
      from: new Point(points.middle.x / 2, points.centerWaist.y * 0.25),
      to: new Point(points.middle.x / 2, points.centerWaist.y * 0.75),
    })

  */
    return part
  },
}
