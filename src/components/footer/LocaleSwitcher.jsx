import localeNames from '@/locales/localeNames'
import { updateIntl } from '@/store/actions/intl'
import { useCurrentLocale, useLocales } from '@/store/hooks/intl'
import classNames from 'classnames'
import { ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const LocaleSwitcher = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const locales = useLocales()
    const currentLocale = useCurrentLocale()

    const onClickHandle = (e) => {
        if (!e.composedPath().includes(ref.current)) setOpen(false)
    }

    useEffect(() => {
        isMobile && document.body.addEventListener('click', onClickHandle)
        return () => {
            isMobile && document.body.removeEventListener('click', onClickHandle)
        }
    }, [])

    return (
        <div
            className='relative group'
            ref={ref}
        >
            <button
                className='flex items-center justify-center gap-1'
                onClick={() => isMobile && setOpen(true)}
            >
                {localeNames[currentLocale]}
                <ChevronUp
                    strokeWidth={3}
                    size={16}
                />
            </button>
            <nav
                className={classNames({
                    'absolute bottom-full left-0 -translate-y-2 shadow-box rounded bg-white py-1 min-w-[6rem] transition-all': true,
                    'opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible': !isMobile,
                    'opacity-100 visible': isMobile && open,
                    'opacity-0 invisible': isMobile && !open
                })}
            >
                {Object.keys(locales).map((locale, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            updateIntl(locale)
                            isMobile && setOpen(false)
                        }}
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
