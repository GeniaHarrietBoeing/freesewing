export const front = {
  name: 'ace_of_swords.front',
  measurements: ['neck', 'waist'],
  draft: ({ Path, paths, Point, points, measurements, part }) => {
    points.a = new Point(0, 0)
    points.b = new Point(measurements.neck, measurements.neck)
      .addCircle(5)
      .setText(measurements.waist)

    return part
  },
}
