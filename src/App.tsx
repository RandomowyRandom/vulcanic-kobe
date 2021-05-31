import {Component} from 'react';
import './components/LoginPrompt'
import './App.css';
import LoginPrompt from './components/LoginPrompt';
import VulcanAPI from './backend/VulcanAPI';

interface IProps{

}

interface IState{
  isLoggedIn: boolean;
  account: any;
}

class App extends Component<IProps, IState>{

  api: VulcanAPI;

  constructor(props: IProps){
    super(props);

    // create api instance
    this.api = new VulcanAPI();

    // try loading the account
    let account = localStorage.getItem('account');

    // set basic state
    this.state = {
      isLoggedIn: account !== null,
      account: account
    }
  }

  render(){
    return(
      <div className="App">
        <h1>Vulcanic Kobe</h1>
        {this.state.isLoggedIn ? <h2>Zalogowano jako: {this.state.account}</h2> : <LoginPrompt api={this.api}/>}
      </div>
    )
  }
}

export default App;
