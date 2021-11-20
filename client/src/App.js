import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import { Room, Star, StarBorder } from "@material-ui/icons";
// import axios from "axios";
// import { format } from "timeago.js";

function App() {
  const [viewport, setViewport] = React.useState({
    height: "100vh",
    width: "100vw",
    latitude: 28.6139,
    longitude: 77.209,
    zoom: 8,
  });

  return (
    <>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
    >
    <Marker
    latitude={28.99029}
    longitude={79.54945}
    offsetLeft={-20}
    offsetTop={-10}
    >
      <Room style={{fontSize:viewport.zoom*7,color:"green"}}></Room>
    </Marker>
    </ReactMapGL>
    </>
  );
}

export default App;
