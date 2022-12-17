import React, { memo, useState } from 'react'
import { SectionCard } from './index';

const Section = ({ data }) => {

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] font-bold capitalize'>
                    {data?.title}
                </h3>
                <span className='text-xs uppercase'>Tất cả</span>
            </div>
            <div className='flex justify-between items-start gap-7'>
                {
                    data && data?.items?.length > 0 && data.items.filter((item, index) =>
                        index <= 4
                    )?.map(item => (
                        <SectionCard key={item.encodeId} data={item} />
                    ))}
            </div>
        </div>
    )
}

export default memo(Section)