import decode from 'jwt-decode';

export const checkLoginStatus = () => !!localStorage.getItem('token');

export function saveToken(token){
    localStorage.setItem('token', JSON.stringify(token));
}

export function getToken(){
    const token = localStorage.getItem('token');
    if(token){
        const tokenParsed = JSON.parse(token).jwt;
        const tokenDecoded = decode(tokenParsed.jwt);

        if((tokenDecoded.exp - new Date().getItem()/1000 )> 60){
            return  tokenParsed.jwt;
        }
        else{
            const apiHost = process.env.REACT_APP_API_HOST;
            fetch( `${apiHost}/user/${tokenDecoded.userId/token}`,{
                method: 'PUT',
                body:JSON.stringify({ refreshToken: tokenParsed.refreshToken }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(token => {
                localStorage.setItem('token', JSON.stringify(token));
                return saveToken(token);
            })
        }
    }
};
