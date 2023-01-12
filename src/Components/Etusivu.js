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

  const searchTerm = (e) => {
      fetch(baseUrl + "keskusteluohjelma?term=" + inputText) 
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setVideos(JSON.parse(result));
          setInputText("");
          console.log(e)
        },
        (error) => {
          setIsLoaded(true);
        }
      )

  }

  // haetaan kaikki videot
  useEffect(() => {
      fetch(baseUrl + "keskusteluohjelma?term=") 
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setVideos(JSON.parse(result));
          console.log(JSON.parse(result))
        },
        (error) => {
          setIsLoaded(true);
        }
      )

}, [])


  return (
    <div className="main">
      <div className="header">
      <p className="logo">, KAARLE.</p>
      {/* Jos ei näytetä otsikkoa, H1 piilotettuna johonkn? */}
      {/* <h1>Keskusteluohjelman aihehaku</h1> */}
      {/* TODO siirretään oikeeseen yläkulmaan 2 sarakkeen levyseksi */}
      <div className="search">
        <input
          onChange={inputHandler}
          placeholder="ETSI AIHETTA"
          className="textBox"
        />
        <button onClick={searchTerm}>ETSI</button>
      </div>
      </div>
      <List input={inputText} videos={videos} />
    </div>
  );
}

export default Etusivu;
