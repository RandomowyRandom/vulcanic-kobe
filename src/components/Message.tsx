import {Component} from 'react';

import '../css/Message.css';

interface IProps{
    subject: string;
    content: string;
    sender: string;
    date: string;
}

interface IState{
    isOpen: boolean
}

class Message extends Component<IProps, IState>{

    constructor(props: IProps){
        super(props);

        this.state = {
            isOpen: false
        }
    }   

    render(){
        return(
            <div className='message'>
                {
                    this.state.isOpen ? 
                    <div>
                        <h3 className='message-title'>{this.props.subject}</h3>
                        <h4 className='message-author'>{this.props.sender}</h4>
                        <h4 className='message-date'>{this.props.date}</h4>
                        <p className='message-content'>{this.props.content}</p>
                        <button className='message-button' onClick={() => {this.setState({isOpen: false})}}>🡅</button>
                    </div> :
                    <div>
                        <h3 className='message-title'>{this.props.subject}</h3>
                        <h4 className='message-author'>{this.props.sender}</h4>
                        <button className='message-button' onClick={() => {this.setState({isOpen: true})}}>🡇</button>
                    </div>
                }

            </div>
        )
    }
}

export default Message;