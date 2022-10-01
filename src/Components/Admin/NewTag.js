import { React, useState} from "react";
import TextField from "@mui/material/TextField";
import TagList from "./TagList"
import ClipLoader from "react-spinners/ClipLoader";

import "../../App.css";

function NewTag(props) {

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    props.setTagInputText(lowerCase);

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
        label="suodata tageja"
    />
  <TagList input={props.tagInputText} setInputText={props.setTagInputText} tags={props.tags} setTagsUpdated={props.setTagsUpdated}/>
    </div>

  );
  }

  export default NewTag