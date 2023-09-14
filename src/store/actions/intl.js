import store from '..'
import { _updateIntl } from '../reducers/intl'

export const updateIntl = (locale) => store.dispatch(_updateIntl(locale))
