import { React, memo } from 'react'
import TagAdder from "./TagAdder";


function TaggingList(props) {

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
                <TagAdder item={item} videoName={item[1]} videoId={item[2].slice(17, item[2].indexOf("?"))} videoTime={item[2].slice(item[2].indexOf("=")+1)} updateTags={props.updateTags} tags={props.tags}></TagAdder>
              </li>
            ))}
          </ul>
        ))}
      </div>
    )
  }
}

export default memo(TaggingList)
