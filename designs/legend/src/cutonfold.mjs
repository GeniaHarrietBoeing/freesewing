import { box } from './shared.mjs'

function legendCutonfold({ points, Point, macro, part }) {
  points.a = new Point(10, 20)
  points.b = new Point(90, 20)

  macro('cutonfold', {
    from: points.a,
    to: points.b,
  })

  return box(part, 100, 25)
}

export const cutonfold = {
  name: 'legend.cutonfold',
  draft: legendCutonfold,
}
