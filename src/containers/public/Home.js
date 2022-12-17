import React, { useEffect } from 'react';
import { SliderBanner, Section, NewRelease, FavoriteArtist, ChartSection, Artist } from '../../components/index';
import { useDispatch } from 'react-redux';
import { getHomeStart } from '../../store/actions/home';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
};

const Home = () => {

    const { autoTheme1, autoTheme2, top100, xone, newMusic, weekChart, favoriteArtist, singer } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeStart())
    }, [])

    return (
        <div className='overflow-y-auto'>
            <SliderBanner />
            <NewRelease />
            <Section data={autoTheme1} />
            <Section data={autoTheme2} />
            <ChartSection />
            <div className=' flex items-center px-[43px] w-full mt-12'>
                {
                    weekChart?.map(item => (
                        <Link
                            to={item?.link?.split('.')[0]}
                            key={item.link}
                            className='flex-1 px-4'
                        >
                            <img src={item.cover} className='w-full object-cover rounded-md' />
                        </Link>
                    ))
                }
            </div>
            {singer && (
                <div className='mt-12 px-[59px] w-full'>
                    <Slider {...settings}>
                        {
                            singer?.map(item => (
                                <Artist
                                    key={item.id}
                                    image={item.thumbnail}
                                    title={item.name}
                                    follow={item.totalFollow}
                                    link={item.link}
                                />
                            ))
                        }
                    </Slider>
                </div>
            )}
            <Section data={top100} />
            <Section data={xone} />
            <Section data={newMusic} />
            {
                favoriteArtist && Object.keys(favoriteArtist).length > 0 ? <FavoriteArtist favoriteArtist={weekChart} /> : null
            }
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Home