import { Button } from '@mui/material';
import { React, useState, useEffect  } from 'react'
import TextField from "@mui/material/TextField";
import ClipLoader from "react-spinners/ClipLoader";

function TagAdder(props) {

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
    
        return userToken?.access_token
    }
    

    const [selectedTags, setSelectedTags] = useState([]);
    const [tagInputText, setTagInputText] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const [untagged, setUntagged] = useState([]);
    const [tagged, setTagged] = useState([]);
    

    if(selectedTags.length== 0){
        Object.entries(props.tags).map((item) => (
            item.flat().includes(props.videoId + "?t=" + props.videoTime)&&
            selectedTags.push(item[0]))
        )
    }

    const [getOpen, setOpen] = useState(false);
    const [getLoading, setLoading] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL

    useEffect(()=> {
        //create a new array by filtering the original array
        const filteredData = Object.entries(props.tags).filter((el) => {
          //if no input the return the original
          if (tagInputText === '') {
              return el;
          }
          //return the item which contains the user input
          else {
              return el[0].toLowerCase().includes(tagInputText)
          }
      })
      setFilteredTags(Object.fromEntries(filteredData))
      resetTags();
  }, [tagInputText])

    // tagin lisääminen videoon
    async function handleSubmit(tag) {
        setLoading(true);
        const result = await Tag(tag);

        selectedTags.push(tag)
        tagged.push([tag,tag])
        resetTags();
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

    async function NewTag() {
        return fetch(baseUrl + 'tagit?nimi=' + tagInputText, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(data => data.json())
    }
    const newTag = async e => {
        setLoading(true);
        e.preventDefault();
        const result = await NewTag();
        setLoading(false);
        handleSubmit(tagInputText)
        setTagInputText('');
        props.setTagsUpdated(false);
        setOpen(false)
    }

    const resetTags = () => {
        
        let [t, u] = splitTagged(Object.entries(filteredTags), e => selectedTags.includes(e[0]));
        setUntagged(u);
        setTagged(t)
    }

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setTagInputText(lowerCase);
    
      };

    async function DeleteTag(tag) {

        setLoading(true);
        return fetch(baseUrl + 'tagit/' + tag + "/" + props.videoId + "/" + props.videoTime, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(data => data.json())
            .then(setLoading(false))
    }
    const openMenu = (o) => {
        resetTags();
        setOpen(o)
        setTagInputText("");
        
      }

      if(getLoading){
        return (
            <ClipLoader />)
      }

    function splitTagged(array, filter) {
        let tagged = [], untagged = [];
        array.forEach((e) => (filter(e) ? tagged : untagged).push(e));
        return [ tagged, untagged];
    }

      if(Object.keys(filteredTags).length === 0 && getOpen){
        return (
            <div>
            <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="suodata tageja"
        />
            <Button onClick={newTag}>Lisää {tagInputText} tagiksi</Button>
            </div>
        )
      }
      else if(getOpen){
        return (
            <div>
                    <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="suodata tageja"
    />
    <Button onClick={(e) => openMenu(false)}>-</Button>
            {tagged.map((item) => (
                <Button key={item}   onClick={(e) => handleDelete(item, e)}  style={{
                    backgroundColor: "#90EE90",
                }}>{item[0]}</Button>
            ))}
            {untagged.map((item) => (
                <Button key={item} onClick={(e) => handleSubmit(item[0], e)}>{item[0]}</Button>
            ))}
                    
            </div>
        )
      }
      else {
        return(
        <div>
        {selectedTags.map((item) => (
            <Button key={item}   onClick={(e) => handleDelete(item, e)}  style={{
                backgroundColor: "#90EE90",
            }}>{item}</Button>
        ))}
        <Button onClick={(e) => openMenu(true)}>+</Button>
        </div>
        )
      }

}

export default TagAdder
