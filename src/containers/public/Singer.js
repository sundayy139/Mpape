import React from 'react'
import { useParams } from 'react-router-dom'

const Singer = () => {
    const { singer } = useParams();
    console.log(singer);
    return (
        <div>Singer</div>
    )
}

export default Singer