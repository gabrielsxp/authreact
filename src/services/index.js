import authenticateUser from './authenticateUser'
import createAccount from './createAccount'
import { get as getItem, set as setItem, clear as clearStore } from './localStorageMethods'

export { createAccount, authenticateUser, setItem, getItem, clearStore }
