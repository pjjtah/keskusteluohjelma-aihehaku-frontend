import { React, useState } from 'react'
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
      return el[1].toLowerCase().includes(props.input)
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

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await NewSuggestion();
    // console.log(result)
    setSuggested(true);
  }

  let fontSize = 16;
  const getFontSize = (textLenght) => {
    if (textLenght <= 5) fontSize = 35;
    if (textLenght > 5 && textLenght < 10) fontSize = 30;
    if (textLenght >= 10 && textLenght < 20) fontSize = 25;
    if (textLenght >= 20 && textLenght < 40) fontSize = 20;
    if (textLenght >= 40 && textLenght < 50) fontSize = 16;
    if (textLenght >= 50 && textLenght < 800) fontSize = 14;
    if (textLenght >= 80) fontSize = 12;
  }

  if (filteredData.length !== 0) {
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
                <a href={item[2]} target="_blank" rel="noreferrer" onChange={getFontSize(item[1].length)} style={{ fontSize: `${fontSize}px` }}>
                  {item[1]}
                </a>
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
      <Button onClick={handleSubmit}>Lähetä ehdotus: {props.input} </Button>
    )
  }
}

export default List
