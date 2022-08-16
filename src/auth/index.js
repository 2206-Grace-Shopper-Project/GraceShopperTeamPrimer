export async function grabToken (){
    const token = localStorage.getItem('token')
    return token
}

export async function storeToken(token){
    localStorage.setItem('token', token)
}


export const grabUser = () => {
    const stringifyObj = localStorage.getItem('username')
     return JSON.parse(stringifyObj)
 } 

export const storeUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    }


export const clearUsernameAndToken = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
}
