import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

function InputTag() {
  const [tags, setTags] = React.useState(["example tag"])
  return (
    <div>
      <ReactTagInput 
            tags={tags}
            placeholder="Precione enter para adicionar um novo email"
            onChange={(newTags) => setTags(newTags)}
          >
          </ReactTagInput>
      <input style={{display:"none"}} id="tags" value={tags}></input>
    </div>
  )
}
export {InputTag};