import { React, useState, useEffect } from "react";
import TaggingList from "./TaggingList";
import SuggestionList from "./SuggestionList";
import NewTag from "./NewTag"
import TextField from "@mui/material/TextField";

import "../../App.css";
import TagDownloader from "./TagDownloader";

export default function AdminNew() {

const [inputText, setInputText] = useState("");
  const [videoInputText, setVideoInputText] = useState("");
  const [tagInputText, setTagInputText] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState();
  const [videosLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [tagsUpdated, setTagsUpdated] = useState(false);
  const [suggestions, setSuggestions] = useState([])

  const baseUrl = process.env.REACT_APP_BASE_URL

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setVideoInputText(lowerCase);

  };

  const searchTerm = (e) => {
    fetch(baseUrl + "keskusteluohjelma?term=" + videoInputText) 
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setVideos(JSON.parse(result));
        setVideoInputText("");
      },
      (error) => {
        setIsLoaded(true);
      }
    )

}
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

  // haetaan kaikki ehdotukset
useEffect(() => {
  if(!tagsUpdated){
    fetch(baseUrl + "ehdotukset")
    .then(res => res.json())
    .then(
      (result) => {
        setSuggestions(JSON.parse(result));
      },
      (error) => {
        setIsLoaded(true);
      }
    )
  }
  
    }, [])

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
      <TaggingList input={inputText} videos={videos} tags={tags} setTagsUpdated={setTagsUpdated}/>
    </div>
  );
  }
