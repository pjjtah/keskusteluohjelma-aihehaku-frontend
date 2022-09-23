import { React, useState, useEffect } from "react";
import AdminList from "./AdminList";
import TextField from "@mui/material/TextField";

import "../../App.css";

export default function Admin() {

  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState();
  const [videosLoaded, setIsLoaded] = useState(false);
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
  if(videos.length == 0){
    fetch(baseUrl + "keskusteluohjelma?term=")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setVideos(JSON.parse(result));
      },
      (error) => {
        setIsLoaded(true);
      }
    )
}}, [])

// haetaan kaikki tagit
useEffect(() => {

    fetch(baseUrl + "tagit")
    .then(res => res.json())
    .then(
      (result) => {
        
        setTags(JSON.parse(result));
      },
      (error) => {
        setIsLoaded(true);
      }
    )
  }, [])

  return (
    <div className="main">
    <h1>God Mode</h1>
    <div className="search">
      <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="etsi aihetta"
      />
    </div>
    <AdminList input={inputText} videos={videos} tags={tags} />
  </div>
  );
  }
