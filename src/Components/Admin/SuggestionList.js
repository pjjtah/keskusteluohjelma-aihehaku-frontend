import { React, useState } from 'react'
import Button from "react-bootstrap/Button";

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return userToken?.access_token
}

function SuggestionList(props) {

    console.log(Object.values(props.suggestions))
    const baseUrl = process.env.REACT_APP_BASE_URL

        return (
            <ul >
                {Object.keys(props.suggestions).reverse().map((item) => (
                    <li key={item} >
                        {item}
                    </li>
                ))}
            </ul>
        )

}


export default SuggestionList