import React, { useState, useEffect } from "react";
import axios from "axios";

const Spotify = ({ isLogged }) => {
  if (!isLogged) {
    return (
      <div className="card w-128 bg-neutral shadow-xl image-full m-auto m-10 h-44">
        <div className="card-body max-h-44 overflow-scroll">
          <h2 className="card-title">
            Spotify{" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"
              width={40}
            ></img>
          </h2>
          <div className="text-center mt-6">Please log in to enable Spotify.</div>
        </div>
      </div>
    );
  }
  const [playlists, setPlaylists] = useState([]);
  const [connected, setConnected] = useState(false);
  const [tokensAvailable, setTokensAvailable] = useState(false);

  const connectToSpotify = async () => {
    try {
      const jwtToken = localStorage.getItem("userJwtToken");
      //   const response = await axios.get("http://localhost:3001/login", {
      //     headers: { Authorization: `Bearer ${jwtToken}` },
      //   });
      //   const authUrl = response.data;

      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=81cacf37375b4a2d84bb2d9828da6363&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&scope=user-read-private%20user-read-email%20playlist-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20streaming%20user-library-modify%20user-library-read%20user-read-playback-position%20user-top-read%20user-read-recently-played&state=" +
        jwtToken +
        "&show_dialog=true";
    } catch (error) {
      console.error("Error connecting to Spotify:", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const jwtToken = localStorage.getItem("userJwtToken");
      const response = await axios.get("http://localhost:3001/playlists", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setPlaylists(response.data.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    const isConnected = localStorage.getItem("spotifyConnected");
    const urlParams = new URLSearchParams(window.location.search);
    const urlConnected = urlParams.get("connected");

    if (isConnected === "true" || urlConnected === "true") {
      setConnected(true);
    }
  }, []);

  useEffect(() => {
    if (connected === true) {
      const jwtToken = localStorage.getItem("userJwtToken");
      axios
        .get("http://localhost:3001/token-status", {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then(() => {
          setTokensAvailable(true);
          fetchPlaylists();
        })
        .catch((error) => {
          console.error("Error checking token status:", error);
          setTokensAvailable(false);
        });
    }
  }, [connected]);

  //   useEffect(() => {}, []);

  return (
    <div className="card w-auto bg-neutral shadow-xl image-full  ml-10 mr-10 mb-10 h-44">
      <div className="card-body max-h-44 overflow-scroll">
        <h2 className="card-title">
          Spotify{" "}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"
            width={40}
          ></img>
        </h2>
        {!connected || !tokensAvailable ? (
          <button onClick={connectToSpotify} id="spotify_button">Connect to Spotify</button>
        ) : (
          <>
            {playlists.length === 0 && <p>Loading...</p>}
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {playlist.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Spotify;
