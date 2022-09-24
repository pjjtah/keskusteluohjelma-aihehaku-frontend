import { React, useState, useEffect } from "react";
import AdminList from "./AdminList";
import NewTag from "./NewTag"
import TextField from "@mui/material/TextField";

import "../../App.css";

export default function Admin() {

  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState([]);
  const [videosLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [tagsUpdated, setTagsUpdated] = useState(false);

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
if(!tagsUpdated){
  fetch(baseUrl + "tagit")
  .then(res => res.json())
  .then(
    (result) => {
      
      setTags(JSON.parse(result));
      setTagsUpdated(true);
    },
    (error) => {
      setIsLoaded(true);
      setTagsUpdated(true);
    }
  )
}

  }, [tagsUpdated])

  return (
    <div>
    <h1>God Mode</h1>
    <table>
      <tbody>
      <tr>
        <td>
        <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="etsi aihetta"
      />
    <AdminList input={inputText} videos={videos} tags={tags} />
        </td>
      <td style={{verticalAlign: 'top'}}>
      <NewTag tags={tags} tagsUpdated={tagsUpdated} setTagsUpdated={setTagsUpdated}/>
      </td>
      </tr>
      </tbody>
    </table>
    </div>
  );
  }
