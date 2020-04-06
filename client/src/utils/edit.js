import date from "./date";


const comment = async (id, comment,token) =>{

    const res = await fetch(`http://localhost:7000/api/thread/comment/${id}`,{
        method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({comment})
        });
    const c = await res.json();

    if(c.error) return c;
    return date(c)
};

const thread = async (id, title, content, token)=>{

    const res = await fetch(`http://localhost:7000/api/thread/${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, content})
    });
    if(res.status===404) return {error:'Unable to edit thread!'};
    const t = await res.json();
    if(t.error) return t;
    return date(t)
};

const user = async (username, email, currentPassword, newPassword,token) =>{
    try {
        const res = await fetch(`http://localhost:7000/api/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({username, email, currentPassword, newPassword})
        });
        if (res.status === 204) return {updated: true};
        else return {error: 'Unable to update data!'};

    } catch (e) {
        console.log(e);
        return {error: 'Unable to update data!'};
    }
};

const edit = {
    comment,
    user,
    thread
};

export default edit