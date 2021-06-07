import { Component } from "react";
import Popup from "reactjs-popup";

import '../css/Grade.css';

interface IProps{
    value: string;
    weight: number;
    teacher: string;
    name: string;
    date: string;
}

interface IState{

}

class GradeHolder extends Component<IProps, IState>{
    render(){
        return(
            <div className='grade-wrapper'>
                <Popup trigger={<span className='grade-value'>{this.props.value}</span>} position='top left'>
                    <p>Opis: {this.props.name}</p>
                    <p>Waga: {this.props.weight}</p>
                    <p>Data: {this.props.date}</p>
                    <p>Nauczyciel: {this.props.teacher}</p>
                </Popup>
            </div>
        )
    }
}

export default GradeHolder