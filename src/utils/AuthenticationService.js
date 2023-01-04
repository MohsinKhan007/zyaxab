import Cookies from 'universal-cookie'
const cookies=new Cookies();
export const setCookie=(accessToken,refreshToken)=>{
// add the time thingyy into the application
    try{
        console.log("SetCookie");
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
// add these functions
export const setLocalStorage=(accessToken,refreshToken)=>{

    localStorage.setItem('access_token',accessToken);
    localStorage.setItem('refresh_token',refreshToken)
    
}

export const getLocalStorage=()=>{

    return [
        localStorage.getItem("access_token"),
        localStorage.getItem("refresh_token"),
    ]

}

export const getCookie=()=>{

    return [cookies.get('access_token'), cookies.get('refresh_token')]

}

export const isAuth=()=>{
	
	 let value=cookies.get('access_token') ||cookies.get('refresh_token')?true:false;
	 return value;

}

export const logout=()=>{
	console.log("Logout service");
    cookies.remove('access_token');
    cookies.remove('refresh_token');
}
