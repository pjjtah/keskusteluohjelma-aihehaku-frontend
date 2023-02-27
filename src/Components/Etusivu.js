import { React, useState, useEffect } from "react";
import List from "./List";
import Autosuggest from 'react-autosuggest';
import "../App.css";

function Etusivu() {
  const [inputText, setInputText] = useState("");
  const [videos, setVideos] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL

  let inputHandler = (e, newValue) => {
    
    var lowerCase = newValue["newValue"].toLowerCase();

    setInputText(lowerCase);
  };

  const searchTerm = (e) => {
      fetch(baseUrl + "keskusteluohjelma?term=" + inputText) 
      .then(res => res.json())
      .then(
        (result) => {
          setVideos(JSON.parse(result));
        },
        (error) => {
        }
      )
  }

  async function searchSuggestion(suggestion) {
    fetch(baseUrl + "keskusteluohjelma?term=" + suggestion) 
    .then(res => res.json())
    .then(
      (result) => {
        setVideos(JSON.parse(result));
      },
      (error) => {
      }
    )
}

async function searchEmpty() {
  setInputText("")
  fetch(baseUrl + "keskusteluohjelma?term=") 
  .then(res => res.json())
  .then(
    (result) => {
      setVideos(JSON.parse(result));
    },
    (error) => {
    }
  )
}

  // haetaan kaikki videot
  useEffect(() => {
      fetch(baseUrl + "keskusteluohjelma?term=") 
      .then(res => res.json())
      .then(
        (result) => {
          setVideos(JSON.parse(result));
        },
        (error) => {
        }
      )

}, [])

  // haetaan kaikki tagit
  useEffect(() => {
    fetch(baseUrl + "tagit") 
    .then(res => res.json())
    .then(
      (result) => {
        let t = JSON.parse(result)
        setTags(Object.values(t).filter(word => {
          return word[0] 
        }));
      },
      (error) => {
      }
    )
}, [])

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : tags.filter(t =>
    t[0].toLowerCase().slice(0, inputLength) === inputValue
  );
};


const getSuggestionValue = suggestion => suggestion[0];

const renderSuggestion = suggestion => (
  <div>
    {suggestion[0]}
  </div>
);
const onSuggestionsFetchRequested = ({ value }) => {
  setFilteredTags(getSuggestions(value));
};
  const onSuggestionsClearRequested = () => {
    setFilteredTags([]);
  };

  const onSuggestionSelected = (event, {suggestion, suggestionValue}) => {
    event.preventDefault();
    var lowerCase = suggestionValue.toLowerCase();
    setInputText(lowerCase);
    searchSuggestion(suggestionValue.toLowerCase());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchTerm();
    }
  }


  const inputProps = {
    value: inputText,
    onChange: inputHandler, // called every time the input value changes
    onBlur: "", // called when the input loses focus, e.g. when user presses Tab
    type: "search",
    placeholder: "AIHEHAKU",
    onKeyDown: handleKeyDown
  };


  return (
    
    <div className="main">
      <div className="header">
      <p className="logo" onClick={searchEmpty}>, KAARLE.</p>
      {/* Jos ei näytetä otsikkoa, H1 piilotettuna johonkn? */}
      {/* <h1>Keskusteluohjelman aihehaku</h1> */}
      {/* TODO siirretään oikeeseen yläkulmaan 2 sarakkeen levyseksi */}
      <div className="search">
      <Autosuggest
        suggestions={filteredTags}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        className="searchBox"
      />
        <button onClick={searchTerm} className="searchButton">ETSI</button>
      </div>
      </div>
      <List input={inputText} videos={videos} />
    </div>
  );
}

export default Etusivu;
