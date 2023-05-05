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
    { i: "pokemon", x: 6, y: 1, w: 5, h: 2 },
    { i: "postit", x: 6, y: 0, w: 5, h: 2 },
    { i: "speedrun", x: 0, y: 2, w: 5, h: 1 },
    { i: "spotify", x: 0, y: 8, w: 5, h: 3 },
    { i: "food", x: 0, y: 4, w: 5, h: 1 },
    { i: "emoji", x: 0, y: 4, w: 5, h: 1 },
    { i: "valorant", x: 0, y: 6, w: 5, h: 1 },
    { i: "weather", x: 6, y: 6, w: 5, h: 2 },
    { i: "zelda", x: 0, y: 6, w: 5, h: 1 },
  ];


  return (
      <ResponsiveGridLayout
        id="widget_frame"
        className="layout bg-gradient-to-r from-sky-500 to-indigo-500"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 100 }}
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
        <div key="tasty">
          <Food />
        </div>
        <div key="trump">
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
    // </div>
  );
};

export default Frame;
