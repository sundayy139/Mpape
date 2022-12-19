import React, { memo } from 'react'
import { SectionCard } from './index';

const Section = ({ data, isHideDesc, isHideArtist }) => {

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5 w-full'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] font-bold capitalize'>
                    {data?.title}
                </h3>
                <span className='text-xs uppercase'>Tất cả</span>
            </div>
            <div className='flex justify-start items-start gap-[2.5%]'>
                {
                    data && data?.items?.length > 0 && data.items.filter((item, index) =>
                        index <= 4
                    )?.map(item => (
                        <div key={item.encodeId} className='w-[18%]'>
                            <SectionCard data={item} isHideDesc={isHideDesc} isHideArtist={isHideArtist} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default memo(Section)