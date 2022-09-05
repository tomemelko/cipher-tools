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
  const { mapping } = props;
  const chunks: string[] = [];
  while (text.includes(' ') && text.length > 36) {
    let space = 36;
    // eslint-disable-next-line no-empty -- This could be a while loop with a body, but this feels cleaner to me
    for (; space >= 0 && text[space] !== ' '; space -= 1) {}
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
              {chunk.split('').map((char) => <td className="ctLetter" key={char}>{char}</td>)}
            </tr>
            <tr>
              {chunk.split('').map((char) => <td className="ptLetter" key={char}>{mapping[char] || ''}</td>)}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default CipherTextDisplay;
