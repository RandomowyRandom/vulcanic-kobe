import {Component} from 'react';
import './components/LoginPrompt'
import './App.css';
import LoginPrompt from './components/LoginPrompt';

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1>Vulcanic Kobe</h1>
        <LoginPrompt/>
      </div>
    )
  }
}

export default App;
