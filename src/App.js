import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ReactDOM from 'react-dom';
import createRoot from 'react-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

function App() {
  return (
    <div className="App">
      <div className = 'game'>
        <div className='main'>
          <Table />
        </div>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class Game extends React.Component{
  render(){
    return(
      <div className = 'game'>
        <div className='main'>
          <Table />
        </div>
      </div>
    )
  }
}

root.render(
  <Game />,
  document.getElementById('root')
);

class Table extends React.Component{
  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => {
    let arr = Array("1","2","3","4","5","6","7","8","9","10","11","12","13");
    let sts = Array(13).fill(0);
    arr = this.shuffle(arr);
    return {
      cards: arr,
      status: sts,
      ready: -1,
      message: '',
      const: 15,
      timer: null,
      title: '',
      run: false,
      overlay: 'overlay'
    }
  }
  shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
  }
}

export default App;
