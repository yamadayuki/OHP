// @flow
import { createSelector } from 'reselect'

import type Page from 'entities/Page'
import type { Position } from 'types'

import { getCursorPosition } from './editor'
import { createGetPageByCursorPosition, createGetOrderByUid } from './entities/pages'

export const getCurrentPage = createSelector(
  getCursorPosition,
  createGetPageByCursorPosition,
  (
    cursorPosition: Position,
    getPageByCursorPosition: (pos: Position) => Page,
  ) => getPageByCursorPosition(cursorPosition),
)

export const getCurrentPageOrder = createSelector(
  getCurrentPage,
  createGetOrderByUid,
  (
    page: ?Page,
    getOrderByUid: (uid: string) => number,
  ) => page != null ? getOrderByUid(page.uid) : 0,
)
