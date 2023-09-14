import localeNames from '@/locales/localeNames'
import { updateIntl } from '@/store/actions/intl'
import { useCurrentLocale, useLocales } from '@/store/hooks/intl'
import { ChevronUp } from 'lucide-react'

const LocaleSwitcher = () => {
    const locales = useLocales()
    const currentLocale = useCurrentLocale()

    return (
        <div className='relative group'>
            <button className='flex items-center justify-center gap-1'>
                {localeNames[currentLocale]}
                <ChevronUp
                    strokeWidth={3}
                    size={16}
                />
            </button>
            <nav className='absolute bottom-full left-0 -translate-y-2 shadow-box rounded bg-white py-1 min-w-[6rem] opacity-0 invisible transition-all group-focus-within:opacity-100 group-focus-within:visible'>
                {Object.keys(locales).map((locale, index) => (
                    <span
                        key={index}
                        onClick={() => updateIntl(locale)}
                        className={`h-9 flex items-center px-2 font-medium text-xs transition-all text-gray-800 hover:bg-gray-300 w-full select-none cursor-pointer ${
                            locale === currentLocale && 'bg-gray-300'
                        }`}
                    >
                        {localeNames[locale]}
                    </span>
                ))}
            </nav>
        </div>
    )
}

export default LocaleSwitcher
