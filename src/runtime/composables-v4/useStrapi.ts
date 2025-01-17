import type { FetchOptions } from 'ofetch'
import type { Strapi4ResponseSingle, Strapi4RequestParams, Strapi4ResponseMany } from '../types/v4'
import { useStrapiClient } from '#imports'

interface StrapiV4Client<T> {
  find<F = T>(contentType: string, params?: Strapi4RequestParams<F>): Promise<Strapi4ResponseMany<F>>
  findOne<F = T>(contentType: string, id?: string | number | Strapi4RequestParams<F>, params?: Strapi4RequestParams<F>): Promise<Strapi4ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  delete<F = T>(contentType: string, id?: string | number): Promise<Strapi4ResponseSingle<F>>
}

export const useStrapi = <T>(): StrapiV4Client<T> => {
  const client = useStrapiClient()

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi4RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: Strapi4RequestParams<T>, fetchOptions?: FetchOptions): Promise<Strapi4ResponseMany<T>> => {
    return client(`/${contentType}`, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {Strapi4RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, id?: string | number | Strapi4RequestParams<T>, params?: Strapi4RequestParams<T>, fetchOptions?: FetchOptions): Promise<Strapi4ResponseSingle<T>> => {
    if (typeof id === 'object') {
      params = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<Strapi4ResponseSingle<T>> => {
    return client(`/${contentType}`, { method: 'POST', body: { data } })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, id: string | number | Partial<T>, data?: Partial<T>): Promise<Strapi4ResponseSingle<T>> => {
    if (typeof id === 'object') {
      data = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'PUT', body: { data } })
  }

  /**
   * Delete an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<T>
   */
  const _delete = <T>(contentType: string, id?: string | number): Promise<Strapi4ResponseSingle<T>> => {
    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE' })
  }

  return {
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
