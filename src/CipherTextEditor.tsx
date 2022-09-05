import React, { ChangeEvent } from 'react';
import { TextState } from './TextDisplay';

export type CiphertestEditorProps = TextState & {
    onChange: (text: string) => void;
}

function CipherTextEditor(props: CiphertestEditorProps) {
  const { onChange, text } = props;
  function onBoxChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    const newVal = e.currentTarget.value.toLocaleUpperCase();
    onChange(newVal);
  }

  return (
    <div className="ctInput">
      <textarea
        placeholder="?"
        className="ctInput"
        value={text}
        onChange={onBoxChanged}
      />
    </div>
  );
}

export default CipherTextEditor;
