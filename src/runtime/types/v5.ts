import type { MetaResponsePaginationByOffset, MetaResponsePaginationByPage, PaginationByOffset, PaginationByPage, StrapiLocale } from '.'

export interface Strapi5Error {
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}

type Strapi5RequestParamField<T> = {
  [K in keyof T]: T[K] extends object
    ? never
    : K;
}[keyof T]

type Strapi5RequestParamSort<T> = `${Exclude<keyof T, symbol>}${':asc' | ':desc' | ''}`

type Strapi5RequestParamPopulate<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer I>
      ? `${Exclude<K, symbol>}` | `${Exclude<K, symbol>}.${Strapi5RequestParamPopulate<I>}`
      : `${Exclude<K, symbol>}` | `${Exclude<K, symbol>}.${Strapi5RequestParamPopulate<T[K]>}`
    : never;
}[keyof T]

export interface Strapi5RequestParams<T> {
  fields?: Array<Strapi5RequestParamField<T>>
  populate?: '*' | Strapi5RequestParamPopulate<T> | Array<Strapi5RequestParamPopulate<T>>
  sort?: Strapi5RequestParamSort<T> | Array<Strapi5RequestParamSort<T>>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale | null
}

export interface StrapiSystemFields {
  documentId: string
  locale?: string
}

export type Strapi5ResponseData<T> = T extends object
  ? T extends Array<infer U>
    ? Array<Strapi5ResponseData<U>> // Handle arrays
    : T extends Record<string, unknown>
      ? { [K in keyof T]: Strapi5ResponseData<T[K]> } & StrapiSystemFields
      : T
  : T

// Pagination interface for optional pagination info in the meta field
export interface StrapiResponseMetaPagination {
  page: number
  pageSize: number
}

export interface Strapi5ResponseSingle<T> {
  data: Strapi5ResponseData<T>
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMany<T> {
  data: Strapi5ResponseData<T>[]
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMeta {
  pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
  [key: string]: unknown
}
