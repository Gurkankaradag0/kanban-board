import { setColor } from '@/store/actions/board'
import { invertColor } from '@/utils/helpers'
import classNames from 'classnames'
import { CircleIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { isMobile } from 'react-device-detect'

const HexColor = ({ board, onBlurCapture }) => {
    const ref = useRef()
    const [open, setOpen] = useState(false)

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
            className='relative group z-10'
            onBlurCapture={onBlurCapture}
            ref={ref}
        >
            <button
                className='w-7 h-7 rounded text-icon hover:bg-hover group-focus-within:bg-hover flex items-center justify-center'
                onClick={() => isMobile && setOpen(true)}
            >
                <CircleIcon
                    fill={board.color}
                    size={20}
                    strokeWidth={0.5}
                    color={invertColor(board.color)}
                />
            </button>
            <div
                className={classNames({
                    'absolute top-full right-0 translate-y-1 shadow-box rounded transition-all': true,
                    'opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible': !isMobile,
                    'opacity-100 visible': isMobile && open,
                    'opacity-0 invisible': isMobile && !open
                })}
            >
                <HexColorPicker
                    color={board.color}
                    onChange={(c) => setColor(board._id, c)}
                />
            </div>
        </div>
    )
}

export default HexColor
