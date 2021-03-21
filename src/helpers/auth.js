import decode from 'jwt-decode';
import {history} from '../helpers/history';
import {store} from '../store/store';
import {LOGOUT} from '../store/actionType';
import {requestWithouthToken} from './request';

export function checkLoginStatus(){ 
    return !!localStorage.getItem('token');
};

export function saveToken(token){
    localStorage.setItem('token', JSON.stringify(token));
};

export function logout(){
    localStorage.removeItem('token');
    store.dispatch({
        type:LOGOUT
    });
    history.push('/login');
};

export const getToken = ()=> {
    const token = localStorage.getItem('token');
    
    if(token){
        const tokenParsed = JSON.parse(token);
        const tokenDecoded = decode(tokenParsed.jwt);

        if(tokenDecoded.exp - new Date().getTime ()/1000 > 60){
            return  Promise.resolve(tokenParsed.jwt);
        }
        else{
            const apiHost = process.env.REACT_APP_API_HOST;
            return requestWithouthToken( `${apiHost}/user/${tokenDecoded.userId}/token`,'PUT',{
                refreshToken: tokenParsed.refreshToken
            })
            .then(token => {
               saveToken(token);
               return token.jwt;
            })
            .catch(()=>{ logout() });
        }
    }
    else { logout() }
};
