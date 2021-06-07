import {Component} from 'react';
import './components/LoginPrompt'
import './App.css';
import LoginPrompt from './components/LoginPrompt';
import VulcanAPI from './backend/VulcanAPI';
import StudentInfo from './components/StudentInfo';
import ProfilePic from './profile_pic.png';
import GradesPanel from './components/GradesPanel';
import MessagesPanel from './components/MessagesPanel';

enum PageType{
  Grades,
  Messages
}

interface IProps{

}

interface IState{
  isLoggedIn: boolean;
  account: any;
  page: PageType;
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
      account: account,
      page: PageType.Grades
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
            <div className='page-select'>
              <button onClick={() => {this.setState({page: PageType.Grades})}}>Oceny</button>
              <button onClick={() => {this.setState({page: PageType.Messages})}}>Wiadomosci</button>
            </div>
            {
              this.state.page === PageType.Grades ?
                <GradesPanel api={this.api} account={this.state.account}></GradesPanel> 
              :
              this.state.page === PageType.Messages ?
                <MessagesPanel account={this.state.account} api={this.api}/>
              : 
              <p></p>
            }
          </div> : 
          <LoginPrompt api={this.api}/>
        }
      </div>
    )
  }
}

export default App;
