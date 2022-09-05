import React from 'react';

export type Mapping = {
    [p: string]: string;
};

export type TextState = {
    text: string;
    mapping: Mapping;
};

function CipherTextDisplay(props: TextState) {
  let { text } = props;
  const chunks: string[] = [];
  while (text.includes(' ') && text.length > 36) {
    let space = 36;
    for (; space >= 0 && text[space] !== ' '; space--) {}
    space = space <= 0 ? text.indexOf(' ') : space;
    chunks.push(text.substring(0, space));
    text = text.substring(space + 1);
  }
  chunks.push(text);
  return (
    <table className="letterTable">
      <tbody>
        {chunks.map((chunk, i) => (
          <React.Fragment key={i}>
            <tr>
              {chunk.split('').map((char, index) => <td className="ctLetter" key={index}>{char}</td>)}
            </tr>
            <tr>
              {chunk.split('').map((char, index) => <td className="ptLetter" key={index}>{props.mapping[char] || ''}</td>)}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default CipherTextDisplay;
