import { React, useState, useEffect } from "react";
import AdminList from "./AdminList";
import SuggestionList from "./SuggestionList";
import NewTag from "./NewTag"
import TextField from "@mui/material/TextField";

import "../../App.css";
import TagDownloader from "./TagDownloader";

export default function Admin() {

  const [videoInputText, setVideoInputText] = useState("");
  const [tagInputText, setTagInputText] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState();
  const [videos, setVideos] = useState([]);
  const [tagsUpdated, setTagsUpdated] = useState(false);
  const [suggestions, setSuggestions] = useState([])

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
        setVideos(JSON.parse(result));
      },
      (error) => {
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
      if(filteredTags === undefined){
        setFilteredTags(JSON.parse(result));
      }
    },
    (error) => {
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
      <td style={{verticalAlign: 'top', marginLeft: '150px'}}>
      <p>-suodata tageja ja videoita kirjoittamalla hakukenttiin</p>
      <p>-mikäli tagia ei vielä ole, voit lisätä sen kirjoittamalla tagin nimen kokonaisuudessaan hakukenttään</p>
      <p>-klikkaa tagin nimeä videoklipin alla, niin se lisätään kyseisen videon alle. klikkaamalla jo valittua tagia se poistetaan klipistä</p>
      <TagDownloader tags={tags}></TagDownloader>
        </td>
        <td style={{verticalAlign: 'top'}}>
          <h3>Ehdotukset:</h3>
          <SuggestionList suggestions={suggestions} />
        </td>
      </tr>


      </tbody>
    </table>
    </div>
  );
  }
