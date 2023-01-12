import { React, useState, useEffect } from "react";
import TaggingList from "./TaggingList";
import Search from "../Search";

import "../../App.css";

export default function AdminNew() {

  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState();
  const [videosLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [tagsUpdated, setTagsUpdated] = useState(false);
  const [suggestions, setSuggestions] = useState([])

  const baseUrl = process.env.REACT_APP_BASE_URL

// haetaan kaikki videot
// term meinaa hakutermia mutta sitä ei atm käytetä
useEffect(() => {
    console.log(videos);
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

  return (
    <div className="main">
      <div className="header">
      <p className="logo">, KAARLE.</p>
      {/* Jos ei näytetä otsikkoa, H1 piilotettuna johonkn? */}
      {/* <h1>Keskusteluohjelman aihehaku</h1> */}
      {/* TODO siirretään oikeeseen yläkulmaan 2 sarakkeen levyseksi */}
      <Search setIsLoaded={setIsLoaded} setVideos={setVideos}></Search>
      </div>
      <TaggingList videos={videos} tags={tags} setTagsUpdated={setTagsUpdated}/>
    </div>
  );
  }
