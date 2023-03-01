import axios, { AxiosError } from 'axios'
import type PersonDtoType from './model/PersonDtoType'
import type PersonType from './model/PersonType'

const baseURL = '/api/persons'

const getAll = async () => {
  try {
    return await axios.get<PersonType[]>(baseURL)
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError && e.response?.data.error === 'ApiError') {
      console.log(e)
      throw new Error(e.response.data.cause, { cause: 'ApiError' })
    } else {
      throw e
    }
  }
}
const find = async (id: number) => {
  try {
    return await axios.get(`${baseURL}/${id}`)
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError && e.response?.data.error === 'ApiError') {
      console.log(e)
      throw new Error(e.response.data.cause, { cause: 'ApiError' })
    } else {
      throw e
    }
  }
}

const create = async (newPerson: PersonDtoType) => {
  try {
    return await axios.post(baseURL, newPerson)
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError && e.response?.data.error === 'ApiError') {
      console.log(e)
      throw new Error(e.response.data.cause, { cause: 'ApiError' })
    } else {
      throw e
    }
  }
}

const update = async (id: number, newPerson: PersonType) => {
  try {
    return await axios.put(`${baseURL}/${id}`, newPerson)
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError && e.response?.data.error === 'ApiError') {
      console.log(e)
      throw new Error(e.response.data.cause, { cause: 'ApiError' })
    } else {
      throw e
    }
  }
}

const remove = async (id: number) => {
  try {
    return await axios.delete(`${baseURL}/${id}`)
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError && e.response?.data.error === 'ApiError') {
      console.log(e)
      throw new Error(e.response.data.cause, { cause: 'ApiError' })
    } else {
      throw e
    }
  }
}

export default {
  getAll,
  find,
  create,
  update,
  remove,
}
