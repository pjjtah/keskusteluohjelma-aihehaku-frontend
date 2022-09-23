import { Button } from '@mui/material';
import { React, useState } from 'react'

function TagAdder(props) {


    const tagName = ""

    const videoId = ""

    const [getOpen, setOpen] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL

    // tagin lisääminen videoon
    async function tag() {

        return fetch(baseUrl + 'tagit/' + tagName, {
            method: 'POST',
            headers: {
            },
            body: videoId
        })
            .then(data => data.json())
    }

    const openMenu = () => {
        Object.entries(props.tags).map((item) => {
            console.log(item)
        })

      }

    return (
        <div>
        {Object.entries(props.tags).map((item) => (
            <Button>{item[0]}</Button>
        ))}
        </div>

        
    )
}

export default TagAdder
