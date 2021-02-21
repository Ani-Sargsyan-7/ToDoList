export default function request(url, method='GET', body){
    const params = {
        method: method,
        headers:{
            "Content-Type": 'application/json'
        }
    };
    if(body){
        params.body = JSON.stringify(body);
    }

    return fetch(url, params)
            .then(async(response)=>{
                const res = await response.json();
                if(response.status >= 400 && response.status < 600){
                    if(res.error){
                        throw res.error;
                    }else{
                        return new Error('Something went wrong!');
                    };
                };
                return res;
            })
            .catch(error =>{
                alert('Something went wrong!', error);
            });
};