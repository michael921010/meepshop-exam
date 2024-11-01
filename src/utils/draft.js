import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

export function getEditorState(value) {
  const _editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(htmlToDraft?.(value).contentBlocks)
  );

  return _editorState;
}
