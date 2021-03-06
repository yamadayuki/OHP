// @flow
import { createSelector } from 'reselect'

import type { Map } from 'immutable'

import Page from 'entities/Page'

import type { RootState } from 'store/modules'
import type { PreviewState } from 'store/modules/preview'
import type { FetchStatus } from 'types'

import {
  getPageByUid,
  createGetOrderByUid,
} from './entities/pages'

export const getPreviewState = ({ preview }: RootState) => preview

export const getWidth = createSelector(
  getPreviewState,
  ({ width }: PreviewState) => width,
)

export const getBody = createSelector(
  getPreviewState,
  ({ body }: PreviewState) => body,
)

export const getOutline = createSelector(
  getPreviewState,
  ({ outline }: PreviewState) => outline,
)

export const getStyles = createSelector(
  getPreviewState,
  ({ styles }: PreviewState) => styles,
)

export const getMeta = createSelector(
  getPreviewState,
  ({ meta }: PreviewState) => meta,
)

export const getBaseFontSize = createSelector(
  getMeta,
  (meta: any) => meta && meta.fontSize,
)

export const getCurrentPageUid = createSelector(
  getPreviewState,
  ({ currentPageUid }: PreviewState) => currentPageUid,
)

export const getCurrentPage = createSelector(
  getPageByUid,
  getCurrentPageUid,
  (pageByUid: Map<string, Page>, uid: string) => pageByUid.get(uid, new Page()),
)

export const getCurrentPageOrder = createSelector(
  getCurrentPage,
  createGetOrderByUid,
  (
    page: Page,
    getOrderByUid: (uid: string) => number,
  ) => page != null ? getOrderByUid(page.uid) : 0,
)

export const getFetchStatus = createSelector(
  getPreviewState,
  ({ fetchStatus }: PreviewState) => fetchStatus,
)

export const isLoading = createSelector(
  getFetchStatus,
  (fetchStatus: FetchStatus) => fetchStatus === 'loading',
)
