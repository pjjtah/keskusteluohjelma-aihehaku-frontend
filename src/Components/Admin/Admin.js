import { React, useState, useEffect } from "react";
import AdminList from "./AdminList";
import NewTag from "./NewTag"
import TextField from "@mui/material/TextField";

import "../../App.css";

export default function Admin() {

  const [videoInputText, setVideoInputText] = useState("");
  const [tagInputText, setTagInputText] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState();
  const [videosLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [tagsUpdated, setTagsUpdated] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setVideoInputText(lowerCase);

  };


// haetaan kaikki videot
// term meinaa hakutermia mutta sitä ei atm käytetä
useEffect(() => {
  if(videos.length === 0){
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
      if(filteredTags == undefined){
        setFilteredTags(JSON.parse(result));
      }
    },
    (error) => {
      setIsLoaded(true);
      setTagsUpdated(true);
    }
  )
}

  }, [tagsUpdated])

  useEffect(()=> {
        //create a new array by filtering the original array
        const filteredData = Object.entries(tags).filter((el) => {
          //if no input the return the original
          if (tagInputText === '') {
              return el;
          }
          //return the item which contains the user input
          else {
              return el[0].toLowerCase().includes(tagInputText)
          }
      })
      setFilteredTags(Object.fromEntries(filteredData))
  }, [tagInputText])

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
        label="suodata aiheita"
      />
    <AdminList input={videoInputText} videos={videos} tags={filteredTags} />
        </td>
      <td style={{verticalAlign: 'top'}}>
      <NewTag tags={tags} tagsUpdated={tagsUpdated} setTagsUpdated={setTagsUpdated} setTagInputText={setTagInputText} tagInputText={tagInputText}/>
      </td>
      </tr>
      </tbody>
    </table>
    </div>
  );
  }
