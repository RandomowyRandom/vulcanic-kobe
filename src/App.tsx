import {Component} from 'react';
import './components/LoginPrompt'
import './App.css';
import LoginPrompt from './components/LoginPrompt';
import VulcanAPI from './backend/VulcanAPI';
import StudentInfo from './components/StudentInfo';
import ProfilePic from './profile_pic.png';
import GradesPanel from './components/GradesPanel';

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
        <h3>Nieoficjalna aplikacja dziennika UONET+</h3>
        {
          this.state.isLoggedIn ? 
          <div>
            <StudentInfo image={ProfilePic} api={this.api} account={this.state.account}/>
            <GradesPanel api={this.api} account={this.state.account}></GradesPanel> 
          </div> : 
          <LoginPrompt api={this.api}/>
        }
      </div>
    )
  }
}

export default App;
