import { React, memo } from 'react'
import TagAdder from "./TagAdder";


function TaggingList(props) {
  

  function findLongestWord(str) {

    str = str.replace("/", "/ ");
    var strSplit = str.split(' ');

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


  if (props.videos.length !== 0) {
    const chunkSize = Math.ceil( props.videos.length / 5);
    const groups = props.videos.map((e, i) => { 
      return i % chunkSize === 0 ? props.videos.slice(i, i + chunkSize) : null; 
    }).filter(e => { return e; });
    

    return (
      <div className='items'>
        {groups.map((items) => (
          <ul key={items}>

            {items.map((item) => (
              <li key={items.indexOf(item)} className="textBox">

                <a href={item[2]} target="_blank" rel="noreferrer" onChange={getFontSize(item[1])} style={{ fontSize: `${fontSize}px` }}>
                  {item[1].replace("/", "/ ")}
                  </a>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>

                <TagAdder videoId={item[2].slice(17, item[2].indexOf("?"))} videoTime={item[2].slice(item[2].indexOf("=")+1)} updateTags={props.updateTags} tags={props.tags}></TagAdder>
              </li>
            ))}
          </ul>
        ))}
      </div>
    )
  }
}

export default memo(TaggingList)
