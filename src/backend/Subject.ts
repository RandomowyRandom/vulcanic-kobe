import { LinkedList } from "typescript-collections";
import Grade from '../backend/Grade';

class Subject{
    public name: string;
    public grades: LinkedList<Grade> = new LinkedList<Grade>();

    constructor(name: string){
        this.name = name;
    }
}

export default Subject;