import authenticateUser from './authenticateUser'
import createAccount from './createAccount'
import getDeck from './getDeck'
import searchCard from './searchCard'
import { get as getItem, set as setItem, clear as clearStore } from './localStorageMethods'

export { createAccount, authenticateUser, getDeck, searchCard, setItem, getItem, clearStore }
