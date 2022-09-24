import { React, useState} from "react";
import TextField from "@mui/material/TextField";
import TagList from "./TagList"
import ClipLoader from "react-spinners/ClipLoader";

import "../../App.css";

function NewTag(props) {

  const [inputText, setInputText] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

  };

  if(!props.tagsUpdated){
    return ( <ClipLoader />)
  }
  return (
    <div>
    <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="etsi tageja"
    />
  <TagList input={inputText} setInputText={setInputText} tags={props.tags} setTagsUpdated={props.setTagsUpdated}/>
    </div>

  );
  }

  export default NewTag