// import { Zen_Antique } from 'next/font/google';
import Pokemon from '../components/widgets/pokemon';
import Postit from '../components/widgets/postIt';
import Speedrun from '../components/widgets/speedrun';
import Spotify from '../components/widgets/spotify';
import Tasty from '../components/widgets/tasty';
import Trump from '../components/widgets/trump';
import Valorant from '../components/widgets/valorant';
import Weather from '../components/widgets/weather';
import Zelda from '../components/widgets/zelda';

const Frame = () => {

    return (
            <div id="widget_frame" className="max-w-full">
                <Pokemon />
                <Postit />
                <Speedrun />
                <Spotify />
                <Tasty />
                <Trump />
                <Valorant />
                <Weather />
                <Zelda />
            </div>
    );
}

export default Frame;