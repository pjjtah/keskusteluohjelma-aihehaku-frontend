import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import "../App.css";

function Etusivu() {
  const [inputText, setInputText] = useState("");
  const [videosLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [chapters, setChapters] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

  };

  // haetaan kaikki videot
  // term meinaa hakutermia mutta sitä ei atm käytetä
  useEffect(() => {
    if(videos != null){
      fetch(baseUrl + "keskusteluohjelma?term=")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(JSON.parse(result));
          setIsLoaded(true);
          setVideos(JSON.parse(result));
        },
        (error) => {
          setIsLoaded(true);
        }
      )
    }
}, [])

  return (
    <div className="main">
      {/* Jos ei näytetä otsikkoa, H1 piilotettuna johonkn? */}
      {/* <h1>Keskusteluohjelman aihehaku</h1> */}
      <div className="search">
        <input
          onChange={inputHandler}
          placeholder="ETSI AIHETTA"
          class="textBox"
        />
      </div>
      <List input={inputText} videos={videos} />
    </div>
  );
}

export default Etusivu;
