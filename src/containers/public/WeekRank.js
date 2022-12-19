import React, { memo, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import icons from '../../utils/icons';
import bgChart from '../../assets/image/week-chart-bg.jpg';
import { RankList } from '../../components/index'

const { BsPlayFill } = icons;

const notActiveStyle = 'cursor-pointer py-[10px] text-[#32323d] hover:text-main-500'
const activeStyle = 'cursor-pointer py-[10px] text-main-500 border-b-[3px] border-b-main-500'

const WeekRank = ({ weekData }) => {

    const { pId } = useParams();

    return (
        <div className='relative'>
            <img src={bgChart} className='w-full h-[450px] object-cover grayscale' />
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-chart'></div>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ced9d9] to-[#ced9d9] opacity-80 flex items-end'></div>
            <div className='px-[59px] pt-[96px] absolute top-0 left-0 right-0 bottom-2/3 bg-transparent z-10 flex flex-col gap-8'>
                <div className='flex items-center gap-4'>
                    <h3 className='text-main-500 text-[40px] font-bold'>
                        Bảng Xếp Hạng Tuần
                    </h3>
                    <span className='p-2 rounded-full bg-main-500 text-white hover:bg-white hover:text-main-500 cursor-pointer'>
                        <BsPlayFill size={25} />
                    </span>
                </div>
                <div className='flex gap-10 text-[24px] font-bold uppercase'>
                    {
                        weekData && weekData?.map(item => (
                            <NavLink
                                key={item.chartId}
                                to={item?.link?.split('.')[0]}
                                className={({ isActive }) => isActive ? activeStyle : notActiveStyle}>
                                {item.country === 'vn' ? 'Việt Nam' : item.country === 'us' ? "US-UK" : item.country === 'korea' ? 'K-Pop' : ''}
                            </NavLink>
                        ))
                    }
                </div>
                <div className='pb-[40px]'>
                    <RankList
                        data={weekData?.find(item => item?.link?.includes(pId))?.items}
                        number={50}
                        orderWith='min-w-[60px]'
                        hideBtn
                    />
                </div>
            </div>
        </div >
    )
}

export default memo(WeekRank)