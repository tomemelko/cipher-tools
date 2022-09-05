import React from 'react';

// eslint-disable-next-line eslint-comments/disable-enable-pair -- I want to disable for the whole file
/* eslint-disable react/no-array-index-key -- I don't care about this rule right now */

export type Mapping = {
    [p: string]: string;
};

export type TextState = {
    text: string;
    mapping: Mapping;
};

function CipherTextDisplay(props: TextState) {
  let { text } = props;
  const { mapping } = props;
  const chunks: string[] = [];
  while (text.includes(' ') && text.length > 36) {
    let space = 36;
    // eslint-disable-next-line no-empty -- This could be a while loop with a body, but this feels cleaner to me
    for (; space >= 0 && text[space] !== ' '; space -= 1) { }
    space = space <= 0 ? text.indexOf(' ') : space;
    chunks.push(text.substring(0, space));
    text = text.substring(space + 1);
  }
  chunks.push(text);
  return (
    <table className="letterTable">
      <tbody>
        {chunks.map((chunk) => (
          <React.Fragment key={chunk}>
            <tr>
              {chunk.split('').map((char, i) => <td className="ctLetter" key={`ct${char}${i}`}>{char}</td>)}
            </tr>
            <tr>
              {chunk.split('').map((char, i) => <td className="ptLetter" key={`pt${char}${i}`}>{mapping[char] || ''}</td>)}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default CipherTextDisplay;
