import icons from '../utils/icons';

const { MdLibraryMusic, FiDisc, AiOutlineLineChart, MdOutlineFeed } = icons;

export const sidebarMenu = [
    {
        path: 'mymusic',
        title: 'Cá nhân',
        icon: <MdLibraryMusic size={24} />
    },
    {
        path: '',
        title: 'Khám phá',
        icon: <FiDisc size={24} />
    },
    {
        path: 'zing-chart',
        title: 'Zing chart',
        icon: <AiOutlineLineChart size={24} />
    },
    {
        path: 'follow',
        title: 'Theo dõi',
        icon: <MdOutlineFeed size={24} />
    },
]