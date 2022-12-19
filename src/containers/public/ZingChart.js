import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import * as apis from '../../apis/index';
import bgChart from '../../assets/image/bg-chart.jpg';
import { RankList, SongCard } from '../../components/index';
import icons from '../../utils/icons';

const { BsPlayFill } = icons

const ZingChart = () => {
    const [chartData, setChartData] = useState(null)
    const [selectedTooltip, setSelectedTooltip] = useState();
    const [style, setStyle] = useState({});
    const [data, setData] = useState();
    const chartRef = useRef();
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    });

    useEffect(() => {
        const fetchChart = async () => {
            const res = await apis.apiGetChartHome();
            if (res.data.err === 0) {
                setChartData(res.data.data)
            };
        }
        fetchChart()
    }, [])

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
        const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = [];
        if (chartData?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
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
    }, [chartData])

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(0,0,0,0.3)', drawTicks: false },
                border: { dash: [3, 4] },
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore
            },
            x: {
                ticks: { color: 'gray' },
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
                            data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i]
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

    return (
        <div className=''>
            <div className='relative'>
                <img src={bgChart} className='w-full h-[500px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-chart'></div>
                <div className='px-[59px] pt-[96px] absolute top-0 left-0 right-0 bottom-2/3 bg-transparent z-10 flex items-center gap-4'>
                    <h3 className='text-main-500 text-[40px] font-bold'>#zingchart</h3>
                    <span className='p-2 rounded-full bg-main-500 text-white hover:bg-white hover:text-main-500 cursor-pointer'>
                        <BsPlayFill size={25} />
                    </span>
                </div>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ced9d9] to-[#ced9d9] opacity-90 flex items-end'>
                    <div className='px-[59px] w-full h-2/3 relative'>
                        {
                            data && <Line ref={chartRef} data={data} options={options} />
                        }
                        <div style={style} className='w-auto' >
                            <SongCard
                                key={chartData?.RTChart?.items?.find(item => item.encodeId === selectedTooltip)?.encodeId}
                                thumbnail={chartData?.RTChart?.items?.find(item => item.encodeId === selectedTooltip)?.thumbnail}
                                encodeId={chartData?.RTChart?.items?.find(item => item.encodeId === selectedTooltip)?.encodeId}
                                title={chartData?.RTChart?.items?.find(item => item.encodeId === selectedTooltip)?.title}
                                artists={chartData?.RTChart?.items?.find(item => item.encodeId === selectedTooltip)?.artists}
                                percent={Math.round(chartData?.RTChart?.items?.find(item => item.encodeId === selectedTooltip)?.score / chartData?.RTChart?.chart?.totalScore * 100)}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[59px] mt-12 mb-[30px]'>
                <RankList data={chartData?.RTChart?.items} number={10} orderWith='min-w-[60px]' />
            </div>
            <div className='relative'>
                <img src={bgChart} className='w-full h-[650px] object-cover grayscale' />
                <div className='px-[59px] pt-7 absolute top-0 left-0 right-0 bottom-0 bg-transparent z-10 flex flex-col gap-8'>
                    <h3 className='text-main-500 text-[40px] font-bold'>
                        Bảng Xếp Hạng Tuần
                    </h3>
                    <div className='flex w-full justify-between'>
                        {
                            chartData?.weekChart && Object.entries(chartData?.weekChart)?.map((item, index) => (
                                <div className='w-[32%] rounded-2xl bg-[#ffffff80] py-5' key={index}>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='text-main-500 text-[24px] font-bold pl-10'>
                                            {item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? "US-UK" : item[0] === 'korea' ? 'K-Pop' : ''}
                                        </h3>
                                        <span className='p-1 rounded-full bg-main-500 text-white hover:bg-white hover:text-main-500 cursor-pointer'>
                                            <BsPlayFill size={20} />
                                        </span>
                                    </div>
                                    <div>
                                        <RankList
                                            data={item[1].items}
                                            isHideAlbum
                                            number={5}
                                            orderWith='min-w-[40px]'
                                            link={item[1].link}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#ced9d9] to-[#ced9d9] opacity-90 flex items-end'></div>
            </div>
        </div >
    )
}

export default ZingChart