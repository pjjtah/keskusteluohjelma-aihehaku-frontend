import { React, useState } from 'react'
import Button from "react-bootstrap/Button";

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return userToken?.access_token
}

function TagList(props) {

    //create a new array by filtering the original array
    const filteredData = Object.values(props.tags).filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el[0].toLowerCase().includes(props.input)
        }
    })

    const baseUrl = process.env.REACT_APP_BASE_URL

    async function NewTag() {
        return fetch(baseUrl + 'tagit?nimi=' + props.input, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(data => data.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await NewTag();
        console.log(result)
        props.setInputText('');
        props.setTagsUpdated(false);
    }

    if (filteredData.length !== 0) {
        return (
            <ul >
                {filteredData.map((item) => (
                    <li key={item[0]} >
                        {item[0]}
                    </li>
                ))}
            </ul>
        )
    }
    else {
        return (
            <Button onClick={handleSubmit}>Lisää {props.input} tagiksi</Button>
        )
    }


}


export default TagList