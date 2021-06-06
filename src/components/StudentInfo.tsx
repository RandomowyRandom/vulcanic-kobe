import {Component} from 'react';
import VulcanAPI from '../backend/VulcanAPI';
import '../css/StudentInfo.css'
import ReactRoundedImage from "react-rounded-image";
import {Popup} from 'reactjs-popup';

interface IProps{
    api: VulcanAPI;
    image: any;
    account: string;
}

interface IState{
    studentName: string;
    schoolName: string;
}

class StudentInfo extends Component<IProps, IState>{
    constructor(props: IProps){
        super(props);

        this.state = {
            studentName: '',
            schoolName: ''
        }
    }

    componentDidMount(){
        this.fetchStudentData();
    }

    private async fetchStudentData(){
        const studentData = await this.props.api.getStudentInfo(this.props.account);

        this.setState({studentName: studentData.student.displayName, schoolName: studentData.student.schoolName});
    }

    private logout(){
        localStorage.clear();
        window.location.reload();
    }

    render(){
        return(
            <div className='student-info-card'>
                <h2>Zalogowano jako:</h2>
                <div className='profile-pic'>
                <ReactRoundedImage 
                    image={this.props.image}
                    imageWidth='100'
                    imageHeight='100'
                    roundedSize='13'/>
                </div>
                <div className='student-school-name'>
                    <p>{this.state.studentName}</p>
                    <p>{this.state.schoolName}</p>
                </div>
                <div className='logout-button'>
                    <Popup trigger={<button>Wyloguj się</button>} position='top left'>
                        <div className='popup'>
                            <p>Aby poprawnie się wylogować, należy również wyrejestrować urządzenie w sekcji Dostęp Mobilny</p>
                            <button onClick={() => this.logout()}>Kontunuuj</button>
                        </div>
                    </Popup>
                    
                </div>
            </div>
        )
    }
}

export default StudentInfo;