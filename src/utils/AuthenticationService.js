import Cookies from 'universal-cookie'
const cookies=new Cookies();
export const setCookie=(accessToken,refreshToken)=>{

    try{
        const expiration=new Date();
        expiration.setTime(expiration.getTime()+(10000))
        cookies.set('access_token',accessToken,{path:'/',expiration})
        cookies.set('refresh_token',refreshToken,{path:'/',expiration})
        return true;
        }catch(e){
            console.log(e);
            return false;
        }

}

export const setLocalStorage=(accessToken,refreshToken)=>{
    try{
    localStorage.setItem('access_token',accessToken);
    localStorage.setItem('refresh_token',refreshToken)
    }catch(e){
        console.log(e);
    }
    
}

export const getLocalStorage=()=>{
    try{
        return [
            localStorage.getItem("access_token"),
            localStorage.getItem("refresh_token"),
        ]
    }catch(e){
        console.log(e);
    }

}

export const getCookie=()=>{
    try{
        return [cookies.get('access_token'), cookies.get('refresh_token')]
    }catch(e){
        console.log(e);
    }
}

export const isAuth=()=>{
    try{
	    let value=cookies.get('access_token') ||cookies.get('refresh_token')?true:false;
	    return value;
    }catch(e){
        console.log(e);
    }


}

export const logout=()=>{
    try{
	console.log("Logout service");
    cookies.remove('access_token');
    cookies.remove('refresh_token');
    }catch(e){
        console.log(e)
    }
}
