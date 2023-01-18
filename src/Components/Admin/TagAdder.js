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
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [tagInputText, setTagInputText] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const [untagged, setUntagged] = useState([]);
    const [tagged, setTagged] = useState([]);
    

    if(selectedTags.length== 0){
        Object.entries(props.tags).map((item) => (
            item.flat().includes(props.videoId + "?t=" + props.videoTime)
            && (item[0] != "piilotettu" && 
            item[0] != "alapeukku" && 
            item[0] != "yläpeukku" && 
            item[0] != "lit")
            &&
            selectedTags.push(item[0]))
        )
    }

    if(selectedEmojis.length== 0){
        Object.entries(props.tags).map((item) => (
            item.flat().includes(props.videoId + "?t=" + props.videoTime)
            && (item[0] == "piilotettu" | 
            item[0] == "alapeukku" || 
            item[0] == "yläpeukku" || 
            item[0] == "lit")
            &&
            selectedEmojis.push(item[0]))
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
        if(tag != "piilotettu" && 
        tag != "alapeukku" && 
        tag != "yläpeukku" && 
        tag != "lit"){
            selectedTags.push(tag)
            tagged.push([tag,tag])
        }
        else{
            selectedEmojis.push(tag)
        }
        resetTags();
        setLoading(false);
    }

        // tagin poistaminen videolta
        async function handleDelete(tag) {
            console.log(tag)
            setLoading(true);
            const result = await DeleteTag(tag);
            if(tag != "piilotettu" && 
            tag != "alapeukku" && 
            tag != "yläpeukku" && 
            tag != "lit"){
                selectedTags.pop(tag)
            }
            else{
                selectedEmojis.pop(tag)
            }
            resetTags();
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
    
      }

    async function DeleteTag(tag) {

        setLoading(true);
        return fetch(baseUrl + 'tagit/' + tag + "/" + props.videoId + "/" + props.videoTime, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(data => data.json())
    }
    const openMenu = (o) => {
        resetTags();
        setOpen(o)
        setTagInputText("");
        
      }

      if(getLoading){
        return (

            <ClipLoader />
        )
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
            label="suodata"
        />
            <Button className='piilotaButton' onClick={newTag}>Lisää {tagInputText} tagiksi</Button>
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
        label="suodata"
    />
    <Button className='piilotaButton' onClick={(e) => openMenu(false)}>-</Button>
            {tagged.map((item) => (
                <Button key={item}  className='piilotaButton' onClick={(e) => handleDelete(item[0], e)}  style={{
                    fontWeight: "bold",
                    color: "#000000",
                }}>{item[0]}</Button>
            ))}
            {untagged.slice(0,10).map((item) => (
                <Button key={item} className='piilotaButton' onClick={(e) => handleSubmit(item[0], e)} style={{
                    color: "#000000",
                }}>{item[0]}</Button>
            ))}
            <Button onClick={newTag} className='piilotaButton' style={{
                    color: "#000000",
                }}>Lisää {tagInputText} tagiksi</Button>   
            </div>
        )
      }
      else {
        return(
        <div>
            {selectedEmojis.includes("piilotettu") ? <Button className='piilotaButton' onClick={(e) => handleDelete("piilotettu", e)} style={{
                    backgroundColor: "#D3D3D3",}}>❌</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleSubmit("piilotettu", e)}>❌</Button>)}

            {selectedEmojis.includes("alapeukku") ? <Button className='piilotaButton' onClick={(e) => handleDelete("alapeukku", e)} style={{
                    backgroundColor: "#D3D3D3",}}>👎</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleSubmit("alapeukku", e)}>👎</Button>)}

            {selectedEmojis.includes("yläpeukku") ? <Button className='piilotaButton' onClick={(e) => handleDelete("yläpeukku", e)} style={{
                    backgroundColor: "#D3D3D3",}}>👍</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleSubmit("yläpeukku", e)}>👍</Button>)}

            {selectedEmojis.includes("lit") ? <Button className='piilotaButton' onClick={(e) => handleDelete("lit", e)} style={{
                    backgroundColor: "#D3D3D3",}}>🔥</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleSubmit("lit", e)}>🔥</Button>)}

        {selectedTags.map((item) => (
            <Button key={item}  className='piilotaButton' onClick={(e) => handleDelete(item, e)}  style={{
                fontWeight: "bold",
                color: "#000000"
            }}>{item}</Button>
        ))}
        <Button className='piilotaButton' onClick={(e) => openMenu(true)} style={{
                    color: "#000000",
                }}>+</Button>
        </div>
        )
      }

}

export default TagAdder
