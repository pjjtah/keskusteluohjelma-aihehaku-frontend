import { Button} from '@mui/material';
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
    

    if(selectedTags.length === 0){
        Object.entries(props.tags).map((item) => (
            item.flat().includes(props.videoId + "?t=" + props.videoTime)
            && (item[0] !== "piilotettu" && 
            item[0] !== "alapeukku" && 
            item[0] !== "yläpeukku" && 
            item[0] !== "lit")
            &&
            selectedTags.push(item[0]))
        )
    }

    if(selectedEmojis.length === 0){
        Object.entries(props.tags).map((item) => (
            item.flat().includes(props.videoId + "?t=" + props.videoTime)
            && (item[0] === "piilotettu" | 
            item[0] === "alapeukku" || 
            item[0] === "yläpeukku" || 
            item[0] === "lit")
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

  async function handlePiilotettu(tag) {
    setLoading(true);
    setSelectedEmojis(["piilotettu"])
    await Tag("piilotettu");
    await DeleteTag("alapeukku");
    await DeleteTag("yläpeukku");
    await DeleteTag("lit");
    setTagged(tagged.filter(item => item !== tag))
    setLoading(false);
}

async function handleAlapeukku(tag) {
    setLoading(true);
    setSelectedEmojis(["alapeukku"])
    await Tag("alapeukku");
    await DeleteTag("piilotettu");
    await DeleteTag("yläpeukku");
    await DeleteTag("lit");
    setTagged(tagged.filter(item => item !== tag))
    setLoading(false);
}

async function handleYlapeukku(tag) {
    setLoading(true);
    setSelectedEmojis(["yläpeukku"])
    await Tag("yläpeukku");
    await DeleteTag("piilotettu");
    await DeleteTag("alapeukku");
    await DeleteTag("lit");
    setTagged(tagged.filter(item => item !== tag))
    setLoading(false);
}

async function handleLit(tag) {
    setLoading(true);
    setSelectedEmojis(["lit"])
    await Tag("lit");
    await DeleteTag("piilotettu");
    await DeleteTag("alapeukku");
    await DeleteTag("yläpeukku");
    setTagged(tagged.filter(item => item !== tag))
    setLoading(false);
}


    // tagin lisääminen videoon
    async function handleSubmit(tag) {
        setLoading(true);
        await Tag(tag);
        if(tag !== "piilotettu" && 
        tag !== "alapeukku" && 
        tag !== "yläpeukku" && 
        tag !== "lit"){
            selectedTags.push(tag)
            tagged.push([tag,tag])
        }
        else{
            selectedEmojis.push(tag)
        }
        setLoading(false);
    }

        // tagin poistaminen videolta
        async function handleDelete(tag) {
            setLoading(true);

            if(tag !== "piilotettu" && 
            tag !== "alapeukku" && 
            tag !== "yläpeukku" && 
            tag !== "lit"){
                setSelectedTags(selectedTags.filter(item => item !== tag))
            }
            else{
                setSelectedEmojis(selectedEmojis.filter(item => item !== tag))
            }
            DeleteTag(tag);
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
            .then(setLoading(false))
    }
    const newTag = async e => {
        setLoading(true);
        e.preventDefault();
        await NewTag();
        
        handleSubmit(tagInputText)
        setTagInputText('');
        setOpen(false)
    }

    useEffect(() => {
        resetTags();
    }, [selectedTags]);

    const resetTags = () => {
        let [t, u] = splitTagged(Object.entries(filteredTags), e => selectedTags.includes(e[0]));
        if(selectedTags.length === 0){
            setTagged([])
        }
        setUntagged(u);
        setTagged(t)
    }

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setTagInputText(lowerCase);
    
      }

    async function DeleteTag(tag) {
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

            <ClipLoader />
        )
      }

    function splitTagged(array, filter) {
        let tagged = [], untagged = [];
        array.forEach((e) => (filter(e) ? tagged : untagged).push(e));
        return [ tagged, untagged];
    }
      if(getOpen){
        return (
            <div>
                {selectedEmojis.includes("piilotettu") ? <Button className='piilotaButton' onClick={(e) => handleDelete("piilotettu", e)} style={{
                    backgroundColor: "#D3D3D3",}}>❌</Button> : (
            <Button className='piilotaButton' onClick={(e) => handlePiilotettu("piilotettu", e)}>❌</Button>)}

            {selectedEmojis.includes("alapeukku") ? <Button className='piilotaButton' onClick={(e) => handleDelete("alapeukku", e)} style={{
                    backgroundColor: "#D3D3D3",}}>👎</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleAlapeukku("alapeukku", e)}>👎</Button>)}

            {selectedEmojis.includes("yläpeukku") ? <Button className='piilotaButton' onClick={(e) => handleDelete("yläpeukku", e)} style={{
                    backgroundColor: "#D3D3D3",}}>👍</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleYlapeukku("yläpeukku", e)}>👍</Button>)}

            {selectedEmojis.includes("lit") ? <Button className='piilotaButton' onClick={(e) => handleDelete("lit", e)} style={{
                    backgroundColor: "#D3D3D3",}}>🔥</Button> : (
            <Button className='piilotaButton' onClick={(e) => handleLit("lit", e)}>🔥</Button>)}

<TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="suodata"
    />
    
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
                <br></br>
            <Button className='lisaaButton' onClick={(e) => openMenu(false)}>Valmis</Button>
            </div>
        )
      }
      else {
        return(
        <div>
            {selectedEmojis.includes("piilotettu") ? <p>❌</p> : (<p></p>)}
            {selectedEmojis.includes("alapeukku") ? <p>👎</p> : (<p></p>)}
            {selectedEmojis.includes("yläpeukku") ? <p>👍</p> : (<p></p>)}
            {selectedEmojis.includes("lit") ? <p>🔥</p> : (<p></p>)}

        {selectedTags.map((item) => (
            <p  style={{
                color: "#808080",
                font: "Kaarle",
                textTransform: "uppercase",

            }}>{item}</p>
        ))}
        <Button className='lisaaButton' onClick={(e) => openMenu(true)} style={{
                }}>Lisää tägejä</Button>
        </div>
        )
      }

}

export default TagAdder
