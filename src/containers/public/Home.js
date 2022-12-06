import React, { useEffect } from 'react';
import { Header, Slider } from '../../components/index';
import { useDispatch } from 'react-redux';
import { getHomeStart } from '../../store/actions/home';


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeStart())
    }, [])

    return (
        <div className='overflow-y-auto'>
            <div>
                <Header />
            </div>
            <Slider />
        </div>
    )
}

export default Home