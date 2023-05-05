import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Pokemon from "../components/widgets/pokemon";
import Postit from "../components/widgets/postIt";
import SpeedRun from "../components/widgets/speedRun";
import Spotify from "../components/widgets/spotify";
import Tasty from "../components/widgets/tasty";
import Trump from "../components/widgets/trump";
import Valorant from "../components/widgets/valorant";
import Weather from "../components/widgets/weather";
import Zelda from "../components/widgets/zelda";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Frame = ({ isLogged }) => {
  const [layout, setLayout] = useState([
    { i: "pokemon", x: 0, y: 0, w: 5, h: 2 },
    { i: "postit", x: 6, y: 0, w: 5, h: 2 },
    { i: "speedrun", x: 0, y: 2, w: 5, h: 2 },
    { i: "spotify", x: 0, y: 8, w: 5, h: 2 },
    { i: "tasty", x: 0, y: 4, w: 5, h: 2 },
    { i: "trump", x: 6, y: 4, w: 5, h: 2 },
    { i: "valorant", x: 0, y: 6, w: 5, h: 2 },
    { i: "weather", x: 6, y: 6, w: 5, h: 2 },
    { i: "zelda", x: 6, y: 2, w: 5, h: 2 },
  ]);

  const onLayoutChange = (newLayout) => {
    let updatedLayout = [];
    let prevY = 0;

    newLayout.forEach((item, index) => {
      const element = document.getElementById(item.i);

      if (element) {
        const height = window
          .getComputedStyle(element)
          .getPropertyValue("height");
        const newHeight = Math.ceil(parseInt(height, 10) / 80);

        if (index > 0) {
          prevY += updatedLayout[index - 1].h;
        }

        updatedLayout.push({ ...item, h: newHeight, y: prevY });
      } else {
        updatedLayout.push(item);
      }
    });

    setLayout(updatedLayout);
  };

  return (
    <div id="widget_frame" className="max-w-full">
      {/* <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={80}
        width={400}
        margin={[10, 10]}
        isResizable={false}
        autoSize={true}
        onLayoutChange={onLayoutChange}
      > */}
        {/* <div key="pokemon">
          <Pokemon />
        </div> */}
        <div key="postit">
          <Postit isLogged={isLogged}/>
        </div>
        {/* <div key="speedrun">
          <SpeedRun />
        </div> */}
        {/* <div key="tasty">
          <Tasty />
        </div> */}
        {/* <div key="trump">
          <Trump />
        </div> */}
        {/* <div key="valorant">
          <Valorant />
        </div> */}
        {/* <div key="weather">
          <Weather />
        </div> */}
        {/* <div key="zelda">
          <Zelda />
        </div> */}
        {/* <div key="spotify">
          <Spotify isLogged={isLogged} />
        </div> */}
      {/* </ResponsiveGridLayout> */}
    </div>
  );
};

export default Frame;
