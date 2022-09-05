import { useSizeAwareness } from 'Hooks';
import React, { ChangeEvent, RefObject } from 'react';
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

  const tdRef: RefObject<HTMLTableCellElement> = React.createRef();
  const [cellWidth, setCellWidth] = React.useState<number>();
  const dimensions = useSizeAwareness();
  React.useEffect(() => {
    let multiplier: number;
    if (dimensions.width < 500) {
      multiplier = 1.1;
    } else if (dimensions.width < 1500) {
      multiplier = 1.075;
    } else {
      multiplier = 1.05;
    }
    setCellWidth((tdRef.current?.offsetWidth ?? 0) * multiplier);
  }, [tdRef, dimensions.width]);

  return (
    <div className="mapCell">
      <table className="mapLetterTable">
        <tbody>
          <tr>
            {array.map((char) => <td className="freqLetter" key={`freq${char}`}>{freq(text, char)}</td>)}
          </tr>
          <tr>
            {array.map((char) => <td ref={(array.length === 26 && char === 'A') || (array.length === 13 && (char === 'A' || char === 'N')) ? tdRef : null} className="mapLetter" key={`ct${char}`}>{char}</td>)}
          </tr>
        </tbody>
      </table>
      <div className="mapInputContainer">
        {array.map((char) => (
          <div className="mapInput" key={`pt${char}`} style={{ width: `${cellWidth}px` }}>
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
