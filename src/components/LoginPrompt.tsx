import {Component} from 'react';
import '../backend/VulcanAPI';
import VulcanAPI from '../backend/VulcanAPI';

import '../css/LoginPrompt.css';

interface IProps{
    api: VulcanAPI;
}

interface IState{
    token: string;
    symbol: string;
    pin: string;
    errorText: string;
}

class LoginPrompt extends Component<IProps, IState>{

    constructor(props: IProps){
        super(props);

        this.state = {
            token: '',
            symbol: '',
            pin: '',
            errorText: ''
        }
    }

    private async login(){
        let account = await this.props.api.registerDevice(this.state.token, this.state.symbol, this.state.pin);

        if(account !== null){
            localStorage.setItem('account', JSON.stringify(account));
            window.location.reload()
        }
        else{
            this.setState({errorText: 'Nieprawidłowe dane logowania!'});
        }
    }

    render(){
        return(
            <div className='login-prompt'>
                <h2 className='login-head'>Zaloguj się poprzez UONET+</h2>
                <input className='login-input' placeholder='Token' onChange={e => this.setState({token: e.target.value})}></input>
                <input className='login-input' placeholder='Symbol' onChange={e => this.setState({symbol: e.target.value})}></input>
                <input className='login-input' placeholder='PIN' onChange={e => this.setState({pin: e.target.value})}></input>
                <button className='login-button' onClick={() => this.login()}>Zaloguj</button>
                <p className='error-text'>{this.state.errorText}</p>
            </div>
        )
    }
}

export default LoginPrompt;