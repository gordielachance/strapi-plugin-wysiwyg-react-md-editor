import React, { useState,useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import RemarkPluginEmbed from '../plugins/RemarkEmbeds';
import RemarkPluginGallery from '../plugins/RemarkGallery';

//import rehypeRaw from "rehype-raw";
//import remarkGfm from "remark-gfm";
//import { visit } from "unist-util-visit";

const CustomMDEditor = (props:any) => {

  const [value, setValue] = useState<string | undefined>(props.value);

  useEffect(() => {
    setValue(props.value)
  }, [props.value]);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
      <MDEditor
        value={value}
        onChange={setValue}
        hidden={props.hidden}
        commands={props.commands}
        previewOptions={{
          remarkPlugins: [[RemarkPluginEmbed],[RemarkPluginEmbed]],

          // Retain raw HTML if needed
          //rehypePlugins: [[rehypeRaw]],
        }}
      />
  );
};

export default CustomMDEditor;
