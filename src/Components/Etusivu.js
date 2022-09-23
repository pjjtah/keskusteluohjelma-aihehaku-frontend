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

  const baseUrl = "http://127.0.0.1:8000/"

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

  };

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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
        }
      )
    }
}, [])

  return (
    <div className="main">
      <h1>Keskusteluohjelman aihehaku</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="etsi aihetta"
        />
      </div>
      <List input={inputText} videos={videos} />
    </div>
  );
}

export default Etusivu;
