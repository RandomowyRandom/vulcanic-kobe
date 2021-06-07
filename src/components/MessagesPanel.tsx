import {Component} from 'react';
import VulcanAPI from '../backend/VulcanAPI';
import Message from './Message';

interface IProps{
    api: VulcanAPI;
    account: string;
}

interface IState{
    isDataFetched: boolean;
    messages: Array<any>;
}

class MessagesPanel extends Component<IProps, IState>{

    constructor(props: IProps){
        super(props);

        this.state = {
            isDataFetched: false,
            messages: new Array<any>()
        }
    }

    private async fetchMessages(){
        const response = await this.props.api.getMessages(this.props.account);

        this.setState({isDataFetched: true, messages: response.messages.reverse()});
    }

    componentDidMount(){
        this.fetchMessages();
    }

    render(){
        if (!this.state.isDataFetched)
            return <div></div>;

        return(
            <div>
                {this.state.messages.map(m => {return <Message date={m.sentDate} content={m.content} sender={m.sender} subject={m.subject}/>})}
            </div>
        )
    }
}

export default MessagesPanel;