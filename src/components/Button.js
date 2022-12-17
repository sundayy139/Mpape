import React, { memo } from 'react'

const Button = ({ text, style }) => {
    return (
        <button
            type='button'
            className={style ? style : 'uppercase px-4 py-1 rounded-l-full rounded-r-full border bg-transparent'}
        >
            {text}
        </button>
    )
}

export default memo(Button)