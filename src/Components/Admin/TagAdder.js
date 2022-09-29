import { Button } from '@mui/material';
import { React, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function TagAdder(props) {

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
    
        return userToken?.access_token
    }

    const [selectedTags, setSelectedTags] = useState([]);

    if(selectedTags.length== 0){
        Object.entries(props.tags).map((item) => (
            item.flat().includes(props.videoId + "?t=" + props.videoTime)&&
            selectedTags.push(item[0]))
        )
    }


    const [getOpen, setOpen] = useState(false);

    const [getLoading, setLoading] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL

    // tagin lisääminen videoon
    async function handleSubmit(tag) {
        setLoading(true);
        const result = await Tag(tag);

        selectedTags.push(tag)
        setLoading(false);
    }

        // tagin poistaminen videolta
        async function handleDelete(tag) {
            setLoading(true);
            const result = await DeleteTag(tag);
            
            setSelectedTags(selectedTags.filter(item => item !== tag));
            setLoading(false);
        }

    async function Tag(tag) {
        return fetch(baseUrl + 'tagit/' + tag + "/" + props.videoId + "/" + props.videoTime, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(data => data.json())
    }

    async function DeleteTag(tag) {
        return fetch(baseUrl + 'tagit/' + tag + "/" + props.videoId + "/" + props.videoTime, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(data => data.json())
    }

    const openMenu = () => {
        Object.entries(props.tags).map((item) => {
            console.log(item)
        })

      }

      if(getLoading){
        return (
            <ClipLoader />)
      }
    return (
        <div>

        {Object.entries(props.tags).map((item) => (
            selectedTags.includes(item[0])  ?
            <Button key={item[0]}   onClick={(e) => handleDelete(item[0], e)}  style={{
                backgroundColor: "#90EE90",
            }}>{item[0]}</Button> :
            <Button key={item[0]} onClick={(e) => handleSubmit(item[0], e)}>{item[0]}</Button>
        ))}
        </div>

        
    )
}

export default TagAdder
