//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { sleeve } from './sleeve.mjs'
import { join } from './join.mjs'

// Create new design
const Ace_of_swords = new Design({
  data,
  parts: [join],
})

// Named exports
export { join, i18n, Ace_of_swords }
