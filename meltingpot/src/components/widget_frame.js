// import { Zen_Antique } from 'next/font/google';
import Pokemon from '../components/widgets/pokemon';
import Postit from '../components/widgets/postIt';
import SpeedRun from '../components/widgets/speedRun';
import Spotify from '../components/widgets/spotify';
import Tasty from '../components/widgets/tasty';
import Trump from '../components/widgets/trump';
import Valorant from '../components/widgets/valorant';
import Weather from '../components/widgets/weather';
import Zelda from '../components/widgets/zelda';

const Frame = () => {

    return (
        <div className="flex">
            <div className="flex-wrap">
                <Pokemon />
                <Postit />
                <SpeedRun />
                <Spotify />
                <Tasty />
                <Trump />
                <Valorant />
                <Weather />
                <Zelda />
            </div>
        </div>
    );
}

export default Frame;