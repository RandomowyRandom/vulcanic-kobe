import { Component } from "react";
import Subject from '../backend/Subject';
import Grade from '../backend/Grade';
import VulcanAPI from "../backend/VulcanAPI";
import { LinkedDictionary } from "typescript-collections";
import SubjectGrades from "./SubjectGrades";

interface IProps{
    api: VulcanAPI;
    account: string;
}

interface IState{
    isDataFetched: boolean;
    subjects: Array<Subject>;
}

class GradesPanel extends Component<IProps, IState>{ 

    constructor(props: IProps){

        super(props);

        this.state = {
            isDataFetched: false,
            subjects: new Array<Subject>(),
        }
    }

    private async fetchGrades(){
        const response = await this.props.api.getGrades(this.props.account);

        // map all subjects
        const subjects = response.grades.map((e : any) => e.subject);
        const subjectSet = new Set(subjects);

        // create dictionaty of subjects
        const subjectDictionary = new LinkedDictionary<string, Subject>();
        subjectSet.forEach((s : any) => {
            subjectDictionary.setValue(s, new Subject(s))
        });

        // map all grades to coresponding subject
        response.grades.forEach((g : any) => {
            const sub = subjectDictionary.getValue(g.subject);

            sub?.grades.add(new Grade(g.mark, g.subject, g.date, g.teacher, g.name, g.weight));
        });

        // cache grades to components state
        this.setState({subjects: subjectDictionary.values(), isDataFetched: true});
    }

    componentDidMount(){
        this.fetchGrades();
    }

    render(){
        if (!this.state.isDataFetched)
            return <div></div>;

        return(
            <div>
                {this.state.subjects.map(s => {return <SubjectGrades subjectName={s.name} grades={s.grades.toArray()}></SubjectGrades>})}
            </div>
        )
    }
}

export default GradesPanel