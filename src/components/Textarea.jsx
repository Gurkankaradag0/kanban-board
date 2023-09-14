import { useEffect, useRef } from 'react'

const Textarea = ({ value, onChange, className = '', style = {}, disabled = false, min_height = 32, ...props }) => {
    const ref = useRef()

    useEffect(() => {
        ref.current.style.height = 'inherit'
        ref.current.style.height = `${Math.max(ref.current.scrollHeight + 2, min_height)}px`
    }, [value])

    useEffect(() => {
        if (!disabled) {
            ref.current.focus()
            ref.current.selectionStart = ref.current.selectionEnd = ref.current.textLength
        }
    }, [disabled])

    return (
        <textarea
            ref={ref}
            value={value}
            disabled={disabled}
            className={className}
            onChange={onChange}
            style={style}
            {...props}
        />
    )
}

export default Textarea
