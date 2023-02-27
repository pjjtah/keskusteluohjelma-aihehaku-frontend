import { React, useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import "../App.css";

function Search(props) {


    const baseUrl = process.env.REACT_APP_BASE_URL

    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [inputText, setInputText] = useState("");

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

    async function searchSuggestion(suggestion) {
        fetch(baseUrl + "keskusteluohjelma?term=" + suggestion) 
        .then(res => res.json())
        .then(
          (result) => {
            props.setVideos(JSON.parse(result));
          },
          (error) => {
          }
        )
      }

  

    let inputHandler = (e, newValue) => {
        console.log(newValue);
 
      };
    
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
      
      
        const inputProps = {
          value: setInputText,
          onChange: inputHandler, // called every time the input value changes
          onBlur: "", // called when the input loses focus, e.g. when user presses Tab
          type: "search",
          placeholder: "AIHEHAKU"
        };

  
  return (
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
      <button onClick={() => searchTerm(inputText)} className="searchButton">ETSI</button>
      </div>
  );
  }

export default Search