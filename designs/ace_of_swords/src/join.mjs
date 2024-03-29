export const join = {
  name: 'ace_of_swords.join',
  draft: ({ Path, paths, Point, points, measurements, store, macro, paperless, sa, part }) => {
    points.A1 = new Point(0, 0)
    points.A2 = new Point(60, 0)
    points.B1 = new Point(0, 10)
    points.B2 = new Point(60, 10)
    points.C1 = new Point(0, 20)
    points.C2 = new Point(60, 20)

    paths.path1 = new Path().move(points.A1).line(points.A2).setClass('various')

    paths.path2 = new Path().move(points.B1).line(points.B2).setClass('note')

    paths.path3 = new Path().move(points.C1).line(points.C2).setClass('canvas')

    paths.joint = paths.path1.join(paths.path2, paths.path3).setClass('lining dotted')

    return part
  },
}
