import { Component } from "react";
import GradeHolder from "./GradeHolder";
import Grade from '../backend/Grade';

import '../css/SubjectGrade.css';

interface IProps{
    subjectName: string;
    grades: Array<Grade>;
}

interface IState{

}

class SubjectGrades extends Component<IProps, IState>{

    private round(value : number, precision : number) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    private getAverage(){
        let sum = 0;
        let amount = 0;

        this.props.grades.forEach(g =>{
            if(!isNaN(g.value)){
                sum += (g.value * g.weight);
                amount += g.weight;
            }
        });

        console.log(`sum: ${sum}; amount:${amount}; ${this.props.subjectName}`)

        return sum / amount;
    }

    render(){
        return(
            <div className='subject-grades'>
                <div>
                    <p className='subject-name'>{this.props.subjectName}</p>
                </div>
                {
                    this.props.grades.map(g => {console.log(g); return <GradeHolder value={g.content} teacher={g.teacher} weight={g.weight}></GradeHolder>})
                }
                <p>;</p>
                <p className='average-grade'>Średnia: {this.round(this.getAverage(), 2)}</p>
            </div>
        )
    }
}

export default SubjectGrades