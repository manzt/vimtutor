import { editor as monacoEditor } from 'monaco-editor';
import { initVimMode } from 'monaco-vim/src';

const editorNode = document.getElementById('editor');
const statusNode = document.getElementById('status');

(async () => {
  const res = await fetch('./vimtutor.txt');
  const editor = monacoEditor.create(editorNode, {
    value: await res.text(),
    minimap: { enabled: true },
    theme: 'vs-dark',
    language: null,
    fontSize: 14,
    scrollBeyondLastLine: false,
  });
  editor.focus();
  const vimMode = initVimMode(editor, statusNode);
  window.editor = editor;
  window.vimMode = vimMode;
})();
