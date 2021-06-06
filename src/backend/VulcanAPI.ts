class VulcanAPI{
    public async registerDevice(token: string, symbol: string, pin: string){
        const endpoint = `/register?symbol=${symbol}&token=${token}&pin=${pin}`;

        let res = await fetch(endpoint);
        if(res.status === 200){
            let data = await res.json();
            return data;
        }
        else{
            return null;
        }
    }

    public async getGrades(account : string){
        const endpoint = `/grades?account=${account}`;

        let res = await fetch(endpoint);
        let data = await res.json();
        return data;
    }

    public async getMessages(account : string){
        const endpoint = `/messages?account=${account}`;

        let res = await fetch(endpoint);
        let data = await res.json();
        return data;
    }

    public async getStudentInfo(account: string){
        const endpoint = `/student?account=${account}`;

        let res = await fetch(endpoint);
        let data = await res.json();
        return data;
    }
}

export default VulcanAPI;