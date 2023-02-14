import { React, useState, useEffect } from "react";
import List from "./List";
import Autosuggest from 'react-autosuggest';
import "../App.css";

function Etusivu() {
  const [inputText, setInputText] = useState("");
  const [videosLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [chapters, setChapters] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL

  let inputHandler = (e, newValue) => {
    console.log(newValue);
    console.log(newValue["newValue"])
    
    var lowerCase = newValue["newValue"].toLowerCase();

    setInputText(lowerCase);

  };

  const searchTerm = (e) => {
      fetch(baseUrl + "keskusteluohjelma?term=" + inputText) 
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

  }

  // haetaan kaikki videot
  useEffect(() => {
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

}, [])

  // haetaan kaikki tagit
  useEffect(() => {
    fetch(baseUrl + "tagit") 
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        let t = JSON.parse(result)
        setTags(Object.values(t).filter(word => {
          return word[0] 
        }));
      },
      (error) => {
        setIsLoaded(true);
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

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion[0];

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion[0]}
  </div>
);
const onSuggestionsFetchRequested = ({ value }) => {
  setFilteredTags(getSuggestions(value));
};
  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setFilteredTags([]);
  };


  const inputProps = {
    value: inputText,
    onChange: inputHandler, // called every time the input value changes
    onBlur: "", // called when the input loses focus, e.g. when user presses Tab
    type: "search",
    placeholder: "AIHEHAKU"
  };

  return (
    
    <div className="main">
      <div className="header">
      <p className="logo">, KAARLE.</p>
      {/* Jos ei näytetä otsikkoa, H1 piilotettuna johonkn? */}
      {/* <h1>Keskusteluohjelman aihehaku</h1> */}
      {/* TODO siirretään oikeeseen yläkulmaan 2 sarakkeen levyseksi */}
      <div className="search">
      <Autosuggest
        suggestions={filteredTags}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
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
