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
source tasty/.env
set +o allexport
gnome-terminal --title="Tasty" -- node-dev tasty/tasty.js

set -o allexport
source tronald_rump/.env
set +o allexport
gnome-terminal --title="Tronald Rump" -- node-dev tronald_rump/tronald_rump.js

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
source zelda/.env
set +o allexport
gnome-terminal --title="Zelda" -- node-dev zelda/zelda.js
