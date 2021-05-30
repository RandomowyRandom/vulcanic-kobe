class VulcanAPI{
    public async registerDevice(token: string, symbol: string, pin: string){
        const endpoint = `/register?symbol=${symbol}&token=${token}&pin=${pin}`;
        let res = await fetch(endpoint);
        console.log(await res);
        let data = await res.json();
        console.log(await data)

        return data;
    }
}

export default VulcanAPI;