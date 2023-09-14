import LocaleSwitcher from './LocaleSwitcher'

const Footer = () => {
    return (
        <footer className='flex justify-center items-center gap-2 h-[3.5rem] text-xs leading-none font-semibold'>
            <LocaleSwitcher />
            <span>@2023 {` `}</span>
            <a
                href='https://github.com/Gurkankaradag0'
                target='_blank'
            >
                Gürkan Karadağ
            </a>
        </footer>
    )
}

export default Footer
