import React, { memo, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { handleNumberFormat } from '../utils/fn'
import icons from '../utils/icons';

const { SlUserFollow, TbArrowsShuffle } = icons

const Artist = ({ image, title, follow, link }) => {

    const imageRef = useRef()

    const [isHover, setIsHover] = useState(false);

    const handleHoverEnter = () => {
        setIsHover(true)
        imageRef.current.classList.add('animate-scale-up-image')
        imageRef.current.classList.remove('animate-scale-down-image')
    }

    const handleHoverLeave = () => {
        setIsHover(false)
        imageRef.current.classList.add('animate-scale-down-image')
        imageRef.current.classList.remove('animate-scale-up-image')
    }


    return (
        <div className='flex flex-col items-center gap-[15px] px-4 py-8'>
            <Link
                className='relative rounded-full overflow-hidden'
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
                to={link}
            >
                <img src={image} ref={imageRef} alt='singer' className='w-full object-contain rounded-full cursor-pointer' />
                {
                    isHover && (
                        <div className='absolute top-0 left-0 right-0 bottom-0 rounded-md flex bg-overlay text-white items-center justify-center'>
                            <span
                                className=' rounded-full z-10 cursor-pointer opacity-70'
                            // onClick={(e) => handleClickBtnCard(e, data)}
                            >
                                <TbArrowsShuffle size={40} />
                            </span>
                        </div>
                    )
                }
            </Link>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <Link to={link} className='text-sm font-bold'>
                    {title}
                </Link>
                <span className='text-xs opacity-70'>
                    {`${handleNumberFormat(follow)} quan tâm`}
                </span>
                <button type='button' className='bg-main-500 opacity-90 px-4 py-2 text-sm rounded-r-full rounded-l-full flex items-center justify-center text-white gap-1 hover:opacity-100'>
                    <span>
                        <SlUserFollow size={14} />
                    </span>
                    <span className='text-xs uppercase'>
                        Quan tâm
                    </span>
                </button>
            </div>
        </div>
    )
}

export default memo(Artist)