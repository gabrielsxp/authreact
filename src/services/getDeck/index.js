import axios from '../httpService'
import { endpoints } from '../../constants'

export default async function getDeck (id, loadingCallback) {
  loadingCallback(true)
  try {
    const { deck } = await axios.get(`${endpoints.deck}/${id}`)
    loadingCallback(false)
    return deck
  } catch (error) {
    loadingCallback(false)
    throw new Error(error)
  }
}
