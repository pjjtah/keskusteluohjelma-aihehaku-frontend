import { React, useState } from 'react'
import TagAdder from "./TagAdder";

function AdminList(props) {
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
    const itemsShown = 10;
    return (
        <ul >
            {filteredData.slice(0, itemsShown).map((item) => (
                <li key={item[2]} >
                    <a href={item[2]}>
                        {item[1]}
                    </a>
                    <TagAdder videoId={item[2].slice(17, item[2].indexOf("?"))} videoTime={item[2].slice(item[2].indexOf("=")+1)} tags={props.tags}></TagAdder>
                </li>

            ))}
            {filteredData.length > itemsShown &&
                <li>...</li>
            }
        </ul>
    )
}

export default AdminList
