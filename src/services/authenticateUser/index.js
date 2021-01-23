import axios from '../httpService'
import { endpoints } from '../../constants'

export default async function authenticateUser (userObject, loadingCallback) {
  loadingCallback(true)
  try {
    const { user, token } = await axios.post(endpoints.signIn, { ...userObject })
    loadingCallback(false)
    if (user && token) {
      return { user, token }
    }
  } catch (error) {
    loadingCallback(false)
    throw new Error(error)
  }
}
