import { useSelector } from 'react-redux'

export const useCurrentLocale = () => useSelector((state) => state.intl.locale)
export const useLocale = () => useSelector((state) => state.intl.locales[state.intl.locale])
export const useLocales = () => useSelector((state) => state.intl.locales)
