import React, { memo } from 'react'
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
    return (
        <Triangle
            height="80"
            width="80"
            color="#0E8080"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default memo(Loading)