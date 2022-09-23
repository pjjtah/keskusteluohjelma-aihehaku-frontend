import { React, useState } from 'react'
import TagAdder from "./TagAdder";

function AdminList(props) {
    //create a new array by filtering the original array
    const filteredData = props.videos .filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el[1].toLowerCase().includes(props.input)
        }
    })
    return (
        <ul >
            {filteredData.map((item) => (
                <li key={item[0] + "_" + item[2]} >
                    <a href={item[2]}>
                        {item[1]}
                    </a>
                    <TagAdder videoId={item[0] + "_" + item[2]} tags={props.tags}></TagAdder>
                </li>
            ))}
        </ul>
    )
}

export default AdminList
