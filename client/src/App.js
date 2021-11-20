import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import "./app.css";
function App() {
  const currUser='Saksham'
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId,setCurrentPlaceId]=React.useState(null)
  const [newPlace,setNewPlace]=React.useState(null)

  const [viewport, setViewport] = React.useState({
    height: "100vh",
    width: "100vw",
    latitude: 28.6139,
    longitude: 77.209,
    zoom: 8,
  });
  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
       
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick=(id)=>{
    setCurrentPlaceId(id)
  }

  const handleAddClick=(e)=>{
console.log(e)
  }
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onDblClick={()=>handleAddClick()}
      >
        {pins.length !== 0
          ? pins.map((p) => (
              <>
                <Marker
                  latitude={p.lat}
                  longitude={p.long}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <Room
                    style={{ fontSize: viewport.zoom * 7, color: p.username===currUser?"tomato":"green",cursor:"pointer" }}
                    onClick={()=>handleMarkerClick(p._id)}
                  ></Room>
                </Marker>
                { p._id===currentPlaceId&&
                <Popup
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                   onClose={()=>setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label htmlFor="">Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label htmlFor="">Review</label>
                    <p className="desc">{p.desc}</p>
                    <label htmlFor="">Rating</label>
                    <div className="stars">
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                    </div>
                    <label htmlFor="">Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>}
              </>
            ))
          : null}
            {/* <Popup
                  latitude={}
                  longitude={}
                  closeButton={}
                  closeOnClick={}
                   onClose={()=>setCurrentPlaceId(null)}
                  anchor="left"
                >
                  hii
                </Popup> */}
      </ReactMapGL>
    </>
  );
}

export default App;
