import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getArrSlider } from '../utils/fn';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions'

const Slider = () => {

    const { banner } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0;
        let max = 2;
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
            for (let i = 0; i < sliderEls.length; i++) {

                // delete className added before
                sliderEls[i].classList?.remove('animate-slide-right', 'order-last', 'z-20');
                sliderEls[i].classList?.remove('animate-slide-left', 'order-first', 'z-10');
                sliderEls[i].classList?.remove('animate-slide-left2', 'order-2', 'z-10');

                // hide show images
                if (list.some(item => item === i)) {
                    sliderEls[i].style.display = 'block'
                } else {
                    sliderEls[i].style.display = 'none'
                }
            }

            // add animation
            list.forEach(item => {
                if (item === max) {
                    sliderEls[item].classList?.add('animate-slide-right', 'order-last', 'z-20')
                } else if (item === min) {
                    sliderEls[item].classList?.add('animate-slide-left', 'order-first', 'z-10')
                } else {
                    sliderEls[item].classList?.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })

            min = min === sliderEls.length - 1 ? 0 : min += 1;
            max = max === sliderEls.length - 1 ? 0 : max += 1;

        }, 5000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    const handleClickBanner = (item) => {
        if (item.type === 1) {
            dispatch(actions.setCurrentSongId(item.encodeId))
            dispatch(actions.play(true))
        }
    }


    return (
        <div className='w-full overflow-hidden px-[59px] pt-8'>
            <div className='w-full flex gap-8'>
                {
                    banner?.map((item, index) => (
                        <img key={item.encodeId}
                            src={item.banner}
                            onClick={() => handleClickBanner(item)}
                            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <= 2 ? "block" : "hidden"}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Slider