import React from 'react';
import Letter, { Mapping, TextState } from './TextDisplay';
import './App.css';
import MappingDisplay from './MappingEditor';


class App extends React.Component<any, TextState> {
  constructor(props: any) {
    super(props);
    const mapping: Mapping = {};
    for (let i = 0; i <= 26; i++) {
      mapping[String.fromCharCode(i + 65)] = '';
    }
    this.state = {text: 'CYUP CYDMLC, BDCPXKMN KM POT NBQCC. Q PQZ, CKXTMP HTP LTQUTMKMN, YM POT RBYWTM SYMSBTPT YU CKLTFQXW. Q HTXXYF RQXX BYXXC, FKPO Q LYN RYDMLKMN QUPTB.'.toUpperCase(), mapping };
  }

  onMappingChange = (newState: Mapping) => {
    this.setState((state, props) => {
      return { mapping : {...state.mapping, ...newState} };
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="CipherTextPlainText">
            <Letter {...this.state} />
          </div>
          <div className='Letter-Mapping'>
            <MappingDisplay {...this.state} onMappingChange={this.onMappingChange} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
