import React from 'react';
import CipherTextDisplay, { Mapping, TextState } from './TextDisplay';
import './App.css';
import MappingDisplay from './MappingEditor';
import CipherTextEditor from './CipherTextEditor';

class App extends React.Component<any, TextState> {
  constructor(props: any) {
    super(props);
    const mapping: Mapping = {};
    for (let i = 0; i <= 26; i += 1) {
      mapping[String.fromCharCode(i + 65)] = '';
    }
    this.state = { text: 'CYUP CYDMLC, BDCPXKMN KM POT NBQCC. Q PQZ, CKXTMP HTP LTQUTMKMN, YM POT RBYWTM SYMSBTPT YU CKLTFQXW. Q HTXXYF RQXX BYXXC, FKPO Q LYN RYDMLKMN QUPTB.'.toUpperCase(), mapping };
  }

  onCipherTextChange = (text: string) => {
    this.setState({ text });
  };

  onMappingChange = (newState: Mapping) => {
    this.setState((state) => ({ mapping: { ...state.mapping, ...newState } }));
  };

  render() {
    const { mapping, text } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="CipherTextPlainText">
            <CipherTextEditor text={text} mapping={mapping} onChange={this.onCipherTextChange} />
          </div>
          <div className="CipherTextPlainText">
            <CipherTextDisplay text={text} mapping={mapping} />
          </div>
          <div className="Letter-Mapping">
            <MappingDisplay text={text} mapping={mapping} onMappingChange={this.onMappingChange} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
