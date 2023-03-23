import { React, useState } from 'react'
import igLink from "../iglinkki.jpg"
import Button from "react-bootstrap/Button";

function List(props) {

  const baseUrl = process.env.REACT_APP_BASE_URL
  const [suggested, setSuggested] = useState(false);

  //create a new array by filtering the original array
  const filteredData = props.videos.filter((el) => {
    //if no input the return the original
    if (props.input === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      return el[1].toLowerCase().includes("")
    }
  })

  async function NewSuggestion() {
    return fetch(baseUrl + 'ehdotukset?ehdotus=' + props.input, {
      method: 'POST',
      headers: {
      }
    })
    .then(data => data.json())
  }

  const openVideo = (e) => {
    return fetch(baseUrl + 'katsottu/' + e.substring(17), {
      method: 'GET',
      headers: {
      }
    })
    .then(data => data.json())
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await NewSuggestion();
    // console.log(result)
    setSuggested(true);
  }

  function findLongestWord(str) {

    str = str.replace("/", "/ ");
    str = str.replace("-", "- ");

    var strSplit = str.split(/\s+/)

    var longestWord = strSplit.sort(function(a, b) { 
      return b.length - a.length;
    });

    return longestWord[0].length; 
  }

  let fontSize = 38;
  const getFontSize = (text) => {
    let longestWord = findLongestWord(text)
    if(longestWord < 6){
      fontSize = 50
    }
    if(longestWord < 9){
      fontSize = 43
    }
    if(longestWord < 11){
      fontSize = 35
    }
    else if(longestWord < 14){
      fontSize = 27
    }
    else if(longestWord < 16){
      fontSize = 25
    }
    else if(longestWord < 18){
      fontSize = 22
    }
    else if(longestWord < 21){
      fontSize = 18
    }
    else if(longestWord < 24){
      fontSize = 17
    }
    else if(longestWord < 28){
      fontSize = 14
    }
    else if(longestWord >= 28){
      fontSize = 12
    }

  }

  if (filteredData.length !== 0) {
    filteredData.forEach(function(element, index, array){
        if(element[1].includes("-")){
          element[1].replace("-", "- ");
          array[index][1] = element[1].replace("-", "- ");
        }
    });

    const chunkSize = Math.ceil( filteredData.length / 5);
    const groups = filteredData.map((e, i) => { 
      return i % chunkSize === 0 ? filteredData.slice(i, i + chunkSize) : null; 
    }).filter(e => { return e; });

    return (
      <div className='items'>
        {groups.map((items) => (
          <ul key={items}>
            {items.map((item) => (
              <li key={items.indexOf(item)} className="textBox">
                {item[0] === "ig" ?
                 <a href={item[2]} target="_blank" onClick={(e) => openVideo("https://youtu.be/instagram?t=0")} rel="noreferrer" onChange={getFontSize(item[1])} style={{ padding: "0px", width: "100%", backgroundColor: "black"}}>
                  <img src={igLink}></img>
               </a> :
                <a href={item[2]} target="_blank" onClick={(e) => openVideo(item[[2]])} rel="noreferrer" onChange={getFontSize(item[1])} style={{ fontSize: `${fontSize}px` }}>
                    {item[1]}
                  </a>
                }

              </li>
            ))}
          </ul>
        ))}
      </div>
    )
  }
  if (suggested){
    return(
      <p>Kiitos ehdotuksestasi.</p>
    )
  }
  else {
    return (
      <Button onClick={handleSubmit}>Ehdota {props.input} </Button>
    )
  }
}

export default List
