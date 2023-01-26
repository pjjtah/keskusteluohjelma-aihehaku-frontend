import { React, useState } from "react";

import "../App.css";

function Search(props) {

    const baseUrl = process.env.REACT_APP_BASE_URL

    async function searchTerm(videoInput){
        fetch(baseUrl + "keskusteluohjelma?term=" + videoInput) 
        .then(res => res.json())
        .then(
          (result) => {
            props.setIsLoaded(true);
            props.setVideos(JSON.parse(result));
          },
          (error) => {
            props.setIsLoaded(true);
          }
        )
    
    }
    
    const [videoInputText, setVideoInputText] = useState("");

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setVideoInputText(lowerCase);
  };

  
  return (
      <div className="search">
        <input
          onChange={inputHandler}
          placeholder="ETSI AIHETTA"
          className="searchBox"
        />
        <button onClick={() => searchTerm(videoInputText) }className="searchButton">ETSI</button>
      </div>
  );
  }

export default Search
