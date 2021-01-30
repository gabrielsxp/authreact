import axios from '../httpService'
import { getQuery } from '../../helpers'
import { endpoints } from '../../constants'

export default async function searchCard (options, loadingCallback) {
  loadingCallback(true)
  try {
    const query = getQuery(options)
    const { cards } = await axios.get(`${endpoints.cards + query}searchJoin=or`)
    loadingCallback(false)
    return cards
  } catch (error) {
    loadingCallback(false)
    throw new Error(error)
  }
}
