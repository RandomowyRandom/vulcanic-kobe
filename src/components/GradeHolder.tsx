import { Component } from "react";
import Popup from "reactjs-popup";

import '../css/Grade.css';

interface IProps{
    value: string;
    weight: number;
    teacher: string;
}

interface IState{

}

class GradeHolder extends Component<IProps, IState>{
    render(){
        return(
            <div className='grade-wrapper'>
                <Popup trigger={<span className='grade-value'>{this.props.value}</span>} position='top left'>
                    <p>jd</p>
                    <p>JDJD</p>
                </Popup>
            </div>
        )
    }
}

export default GradeHolder