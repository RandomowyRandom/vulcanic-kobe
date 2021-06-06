class Grade{

    public content: string;
    public subject: string;
    public date: string;
    public teacher: string;
    public name: string;
    public weight: number;
    
    constructor(content: string, subject: string, date: string, teacher: string, name: string, weight: number){
        this.content = content;
        this.subject = subject;
        this.date = date;
        this.teacher = teacher;
        this.name = name;
        this.weight = weight;
    }
    
    get value(){

        if(this.content.length === 1){
            return parseInt(this.content);
        }
        else{
            let v = parseInt(this.content[0]);

            if(this.content[1] === '+'){
                v += .25;
            }
            else{
                v -= .25;
            }

            return v;
        }
    }

}

export default Grade;