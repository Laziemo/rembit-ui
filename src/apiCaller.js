

const domain = process.env.HOST;




export default (method,headers,endpoint,body)=>{
    let url=`${domain}/${endpoint}`;    
    if(method==="POST"){
        const options = {
            method: method,
            headers:
            {
                ...headers,
                "Allow":  'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body),
            json: true

        };
        console.log(options)
        return fetch(url,options);
    }
    else{
        url =  `${url}?`;
        let parameter;
        for (parameter in body){
            console.log(parameter)
            url = `${url}${parameter}=${body[parameter]}&`
        }
        return fetch(url);
    }
}