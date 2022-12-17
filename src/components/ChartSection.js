import React, { memo, useEffect, useRef, useState } from 'react';
import bgChart from '../assets/image/bg-chart.jpg';
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { SongCard } from './index';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import path from '../utils/path';
import icons from '../utils/icons';

const { BsPlayFill } = icons

const ChartSection = () => {

    const chartRef = useRef();
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    });
    const [style, setStyle] = useState({});
    const [selectedTooltip, setSelectedTooltip] = useState();
    const [data, setData] = useState();
    const { chart, rank } = useSelector(state => state.app);
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                border: { dash: [3, 4] },
                min: chart?.minScore,
                max: chart?.maxScore
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: "transparent" }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {

                    if (!chartRef || !chartRef.current) return

                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
                        return
                    }

                    const counters = []
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chart?.items)[i]
                        })
                    }

                    const result = counters.find(item => item.data.some(number => number === +tooltip?.body[0]?.lines[0]?.replace(',', '')))
                    setSelectedTooltip(result.encodeId)

                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        }
    }

    useEffect(() => {
        const position = chartRef.current?.canvas.getBoundingClientRect()

        if (position?.left < tooltipState.left) {
            setStyle({
                top: tooltipState.top,
                right: `calc(100% - ${tooltipState.left}px)`,
                opacity: tooltipState.opacity,
                position: 'absolute'
            })
        } else {
            setStyle({
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: 'absolute'
            })
        }
    }, [tooltipState])


    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = [];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    // data: chart?.items[Object.keys(chart?.items)[i]]?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4
                })
            }
        }
        setData({ labels, datasets })
    }, [chart])

    return (
        <div className='mt-12 px-[59px] relative max-h-[450px]'>
            <img
                src={bgChart}
                className='w-full rounded-xl object-cover max-h-[450px]'
                alt="background"
            />
            <div className='absolute z-10 top-0 left-[59px] bottom-0 right-[59px] bg-gradient-to-t from-[#740091] to-[#2d1a4c] opacity-95 rounded-xl'>
            </div>
            <div className='absolute z-20 top-0 left-[59px] bottom-0 right-[59px] p-5 flex flex-col gap-8'>
                <Link to={path.ZING_CHART} className='flex items-center gap-4 text-white  w-fit'>
                    <h3 className='text-[28px] font-bold hover:text-[#c273ed]'>
                        #zingchart
                    </h3>
                    <span className='p-1 rounded-full bg-white hover:bg-[#e5e5e5]'>
                        <BsPlayFill size={25} color='#c273ed' />
                    </span>
                </Link>
                <div className='flex gap-4 h-full overflow-hidden'>
                    <div className='flex-3 flex flex-col gap-4'>
                        {
                            rank?.filter((i, index) => index < 3).map((item, index) => (
                                <SongCard
                                    key={item.encodeId}
                                    thumbnail={item.thumbnail}
                                    encodeId={item.encodeId}
                                    title={item.title}
                                    artistsNames={item.artistsNames}
                                    percent={Math.round(item.score / chart?.totalScore * 100)}
                                    order={index + 1}
                                    style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#ab74b8]'
                                />
                            ))
                        }
                        <Link to={path.ZING_CHART} className='text-white text-sm px-6 py-1 rounded-l-full rounded-r-full border border-white w-fit m-auto'>
                            Xem thêm
                        </Link>
                    </div>
                    <div className='flex-7 relative'>
                        {
                            data && <Line ref={chartRef} data={data} options={options} />
                        }
                        <div style={style} >
                            <SongCard
                                key={rank?.find(item => item.encodeId === selectedTooltip)?.encodeId}
                                thumbnail={rank?.find(item => item.encodeId === selectedTooltip)?.thumbnail}
                                encodeId={rank?.find(item => item.encodeId === selectedTooltip)?.encodeId}
                                title={rank?.find(item => item.encodeId === selectedTooltip)?.title}
                                artistsNames={rank?.find(item => item.encodeId === selectedTooltip)?.artistsNames}
                                percent={Math.round(rank?.find(item => item.encodeId === selectedTooltip)?.score / chart?.totalScore * 100)}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)