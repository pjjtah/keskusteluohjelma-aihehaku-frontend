import { React, useState } from 'react'
import TagAdder from "./TagAdder";
import Button from "react-bootstrap/Button";

function TagDownloader(props) {

    function backup() {
          const link = document.createElement("a");
          link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(props.tags))}`;
          link.download = "tagit-varmuuskopio.json";
          link.click();
    }
    return (
        <Button key="more" onClick={backup} style={{
            backgroundColor: "#ADD8E6",
        }}>Lataa varmuuskopio tageista</Button>
    )
}

export default TagDownloader
