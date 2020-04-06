const comment = async (id, token) =>{
    const res = await fetch(`http://localhost:7000/api/thread/comment/${id}`,{
        method:'DELETE',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    })

    if(res.status === 204)return {deleted:true};
    else return {deleted:false}


};

const thread = async (id,token) =>{
    const res = await fetch(`http://localhost:7000/api/thread/${id}`,{
        method:'DELETE',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    });
    if(res.status === 204)return {deleted:true};
    else return {deleted:false}
};

const user = async (token)=>{
    const res = await fetch(`http://localhost:7000/api/user/delete`,{
        method:'DELETE',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    });
    if(res.status === 204)return {deleted:true};
    else return {deleted:false}
};


const del = {
    comment,
    thread,
    user
};

export default  del