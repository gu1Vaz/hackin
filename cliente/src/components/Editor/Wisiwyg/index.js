import React, { useState, forwardRef, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Wysiwyg = (props, ref) => {
  const [editorState, setEditorState] = useState(
    props.initial
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(props.initial))
        )
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (props.initial) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(props.initial))
        )
      );
    }
  }, [props.initial]);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class editor rounded"
      editorClassName="editor-class editor-texto"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default forwardRef(Wysiwyg);
