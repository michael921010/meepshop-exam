import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { getEditorState } from "@/utils/draft";
import { styled, Box, alpha } from "@mui/material";

const EditorContainer = styled(Box)(({ theme }) => ({
  ".rdw-editor-wrapper": {
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
  },
  ".rdw-editor-toolbar": {
    backgroundColor: theme.palette.background.paper,
  },
  ".rdw-dropdown-wrapper": {
    ".rdw-dropdown-selectedtext": {
      color: theme.palette.common.black,
    },
    ".rdw-dropdown-optionwrapper": {
      color: theme.palette.common.black,
    },
  },
  ".rdw-link-modal": {
    color: theme.palette.common.black,
  },
  ".rdw-embedded-modal": {
    color: theme.palette.common.black,
  },
  ".rdw-colorpicker-modal": {
    color: theme.palette.common.black,
  },
  ".rdw-image-modal": {
    color: theme.palette.common.black,
  },

  ".rdw-editor-main": {
    flex: 1,
    boxShadow: `inset 0 3px 6px 0 ${alpha("rgba(0, 0, 0, 0.16)", 0.5)}`,
    border: `solid 1px ${alpha("#818181", 0.5)}`,
    padding: theme.spacing(0, 1.5),
  },
}));

const CustomEditor = forwardRef(function CustomEditor({ value, onChange, ...props }, ref) {
  const convertedValue = useRef("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = useCallback(
    (editorState) => {
      setEditorState(editorState);

      const converted = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      onChange?.(converted);
      convertedValue.current = converted;
    },
    [onChange]
  );

  useEffect(() => {
    if (value !== convertedValue.current) {
      const _editorState = getEditorState(value);
      setEditorState(_editorState);

      console.warn("There were some difference in the editor state.");
    }
  }, [value]);

  return (
    <EditorContainer>
      <Editor
        ref={ref}
        editorState={editorState}
        onEditorStateChange={handleChange}
        stripPastedStyles
        toolbar={{
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            previewImage: true,
            inputAccept: "image/*",
            uploadCallback: (file) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  const dataURL = reader.result;
                  const truncatedDataURL = dataURL.substring(10, 30) + "..."; // set the maximum length of the truncated string
                  resolve({
                    data: { link: dataURL },
                    link: { url: truncatedDataURL },
                  });
                };
                reader.onerror = (error) => {
                  reject(error);
                };
              });
            },
            alt: { present: true, mandatory: false },
          },
        }}
        {...props}
      />
    </EditorContainer>
  );
});

export default CustomEditor;
