const login = async (username, password) =>{
    const res = await fetch('http://localhost:7000/api/user/login',{
        method: 'POST',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({username,password})
    });
    const u = await  res.json();
    if(u && u.token) localStorage.setItem('Bearer', u.token);
    return u;
};

const signOut=()=>{
    localStorage.removeItem('Bearer')
};

const checkToken =async  (token)=>{
    const res = await fetch('http://localhost:7000/api/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    const user = await res.json();
    user.token = token;
    return user
};

const auth = {
    login,
    signOut,
    checkToken
};
export default auth