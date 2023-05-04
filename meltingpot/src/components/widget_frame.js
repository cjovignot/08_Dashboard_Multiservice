import Pokemon from "../components/widgets/pokemon";
import Postit from "../components/widgets/postIt";
import SpeedRun from "../components/widgets/speedRun";
import Spotify from "../components/widgets/spotify";
import Tasty from "../components/widgets/tasty";
import Trump from "../components/widgets/trump";
import Valorant from "../components/widgets/valorant";
import Weather from "../components/widgets/weather";
import Zelda from "../components/widgets/zelda";

const Frame = ({ isLogged }) => {
  // Accept isLogged as a prop here
  return (
    <div id="widget_frame" className="max-w-full">
      <Pokemon />
      <Postit />
      <SpeedRun />
      <Spotify isLogged={isLogged} />
      <Tasty />
      <Trump />
      <Valorant />
      <Weather />
      <Zelda />
    </div>
  );
};

export default Frame;
