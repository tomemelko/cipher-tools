import React, { ChangeEvent } from 'react';
import { Mapping, TextState } from './TextDisplay';

export type MappingEditorProps = TextState & {
    onMappingChange: (mapping: Mapping) => void;
}

function MappingDisplay(props: MappingEditorProps) {
  const { onMappingChange, text, mapping } = props;
  function onBoxChanged(e: ChangeEvent<HTMLInputElement>) {
    let newVal = e.currentTarget.value.toUpperCase();
    if (newVal.length > 1) {
      newVal = newVal[newVal.length - 1];
    }
    if (newVal !== '' && !/^[A-Z]$/.test(newVal)) {
      e.preventDefault();
      return;
    }
    onMappingChange({ [e.target.id]: newVal });
  }

  function freq(inputText: string, char: number): number | string {
    return (inputText.match(new RegExp(String.fromCharCode(char + 65), 'g')) || []).length || '-';
  }

  return (
    <div>
      <table className="mapLetterTable">
        <tbody>
          <tr>
            {Array.from(Array(26)).map((char, i) => <td className="freqLetter" key={char}>{freq(text, i)}</td>)}
          </tr>
          <tr>
            {Array.from(Array(26)).map((char, i) => <td className="mapLetter" key={char}>{String.fromCharCode(i + 65)}</td>)}
          </tr>
        </tbody>
      </table>
      <div className="mapInputContainer">
        {Array.from(Array(26)).map((char, i) => (
          <div className="mapInput" key={char}>
            <input
              placeholder="?"
              onFocus={((event: ChangeEvent<HTMLInputElement>) => event.target.select())}
              className="mapInput"
              value={mapping[String.fromCharCode(i + 65)] || ''}
              onChange={onBoxChanged}
              id={String.fromCharCode(i + 65)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MappingDisplay;
