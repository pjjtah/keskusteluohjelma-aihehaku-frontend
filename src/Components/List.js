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
        console.log(result)
        setSuggested(true);
    }

    if (filteredData.length !== 0) {
      const chunkSize = filteredData.length / 5 << 0;
      const groups = filteredData.map((e, i) => { 
          return i % chunkSize === 0 ? filteredData.slice(i, i + chunkSize) : null; 
      }).filter(e => { return e; });
      console.log(groups)

        return (
            <div className='items'>
              {groups.map((items) => (
                <ul>
                 {items.map((item) => (
                    <li key={item[2]}>
                        <a href={item[2]} target="_blank" rel="noreferrer">
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
