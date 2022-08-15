export async function grabToken (){
    const token = localStorage.getItem('token')
    return token
}

export async function storeToken(){
    localStorage.setItem('token', token)
}
