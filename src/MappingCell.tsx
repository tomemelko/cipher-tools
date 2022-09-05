import React, { ChangeEvent } from 'react';
import { Mapping, TextState } from './TextDisplay';

export type MappingCellProps = TextState & {
  onMappingChange: (mapping: Mapping) => void;
} & {
  array: string[];
}

function MappingCell(props: MappingCellProps) {
  const {
    array,
    mapping,
    onMappingChange,
    text,
  } = props;
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

  function freq(inputText: string, char: string): number | string {
    return (inputText.match(new RegExp(char, 'g')) || []).length || '-';
  }

  return (
    <div className="mapCell">
      <table className="mapLetterTable">
        <tbody>
          <tr>
            {array.map((char) => <td className="freqLetter" key={`freq${char}`}>{freq(text, char)}</td>)}
          </tr>
          <tr>
            {array.map((char) => <td className="mapLetter" key={`ct${char}`}>{char}</td>)}
          </tr>
        </tbody>
      </table>
      <div className="mapInputContainer">
        {array.map((char) => (
          <div className="mapInput" key={`pt${char}`}>
            <input
              placeholder="?"
              onFocus={((event: ChangeEvent<HTMLInputElement>) => event.target.select())}
              className="mapInput"
              value={mapping[char] || ''}
              onChange={onBoxChanged}
              id={char}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MappingCell;
