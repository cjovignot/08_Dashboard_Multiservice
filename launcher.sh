#!/bin/bash
set -o allexport
source pokemon/.env
set +o allexport
gnome-terminal --title="Pokemon" -- node-dev pokemon/pokemon.js

set -o allexport
source postit/.env
set +o allexport
gnome-terminal --title="Postit" -- node-dev postit/postit.js

set -o allexport
source speedrun/.env
set +o allexport
gnome-terminal --title="Speedrun" -- node-dev speedrun/speedrun.js

set -o allexport
source spotify/.env
set +o allexport
gnome-terminal --title="Spotify" -- node-dev spotify/index.js

set -o allexport
source emoji/.env
set +o allexport
gnome-terminal --title="Emoji" -- node-dev emoji/emoji.js

set -o allexport
source food/.env
set +o allexport
gnome-terminal --title="Food" -- node-dev food/food.js

set -o allexport
source users/.env
set +o allexport
gnome-terminal --title="Users" -- node-dev users/index.js

set -o allexport
source valorant/.env
set +o allexport
gnome-terminal --title="Valorant" -- node-dev valorant/valorant.js

set -o allexport
source weather/.env
set +o allexport
gnome-terminal --title="Weather" -- node-dev weather/weather.js

set -o allexport
set +o allexport
gnome-terminal --title="Zelda" -- node-dev zelda/zelda.js

cd ./meltingpot/
npm run dev