import store from '..'
import { _setUser } from '../reducers/user'

export const setUser = (user) => store.dispatch(_setUser(user))
