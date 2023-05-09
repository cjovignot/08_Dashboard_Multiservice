import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Pokemon from "../components/widgets/pokemon";
import Postit from "../components/widgets/postIt";
import SpeedRun from "../components/widgets/speedrun";
import Spotify from "../components/widgets/spotify";
import Food from "./widgets/food";
import Emoji from "../components/widgets/emoji";
import Valorant from "../components/widgets/valorant";
import Weather from "../components/widgets/weather";
import Zelda from "../components/widgets/zelda";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Frame = ({ isLogged }) => {
  const layout = [
    { i: "zelda", x: 0, y: 0, w: 1, h: 2 },
    { i: "weather", x: 1, y: 0, w: 1, h: 2 },
    { i: "spotify", x: 2, y: 0, w: 1, h: 2 },
    { i: "pokemon", x: 0, y: 1, w: 1, h: 2 },
    { i: "postit", x: 1, y: 1, w: 1, h: 2 },
    { i: "food", x: 2, y: 1, w: 1, h: 2 },
    { i: "emoji", x: 0, y: 2, w: 1, h: 2 },
    { i: "valorant", x: 1, y: 2, w: 1, h: 2 },
    { i: "speedrun", x: 2, y: 2, w: 1, h: 2 },
    ];


  return (
      <ResponsiveGridLayout
        id="widget_frame"
        className="layout bg-gradient-to-r from-sky-500 to-indigo-500"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 3 }}
        cols={{ lg: 3 }}
        rowHeight={90}
        width="800px"
        margin={[0, 10]}
        isResizable={false}
      >
        <div key="pokemon">
          <Pokemon />
        </div>
        <div key="postit">
          <Postit isLogged={isLogged}/>
        </div>
        <div key="speedrun">
          <SpeedRun />
        </div>
        <div key="spotify">
          <Spotify isLogged={isLogged} />
        </div>
        <div key="food">
          <Food />
        </div>
        <div key="emoji">
          <Emoji />
        </div>
        <div key="valorant">
          <Valorant />
        </div>
        <div key="weather">
          <Weather />
        </div>
        <div key="zelda">
          <Zelda />
        </div>
      </ResponsiveGridLayout>
  );
};

export default Frame;
