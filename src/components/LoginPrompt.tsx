import {Component} from 'react';
import '../backend/VulcanAPI';
import VulcanAPI from '../backend/VulcanAPI';

import '../css/LoginPrompt.css';

interface IProps{

}

interface IState{
    token: string;
    symbol: string;
    pin: string;
}

class LoginPrompt extends Component<IProps, IState>{
    api: VulcanAPI;

    constructor(props: IProps){
        super(props);
        this.api = new VulcanAPI();
    }

    private async login(){
        let account = await this.api.registerDevice(this.state.token, this.state.symbol, this.state.pin);
        // localStorage.setItem('account', JSON.stringify(account));
    }

    render(){
        return(
            <div className='login-prompt'>
                <h2 className='login-head'>Zaloguj się poprzez UONET+</h2>
                <input className='login-input' placeholder='Token' onChange={e => this.setState({token: e.target.value})}></input>
                <input className='login-input' placeholder='Symbol' onChange={e => this.setState({symbol: e.target.value})}></input>
                <input className='login-input' placeholder='PIN' onChange={e => this.setState({pin: e.target.value})}></input>
                <button className='login-button' onClick={() => this.login()}>Zaloguj</button>
            </div>
        )
    }
}

export default LoginPrompt;