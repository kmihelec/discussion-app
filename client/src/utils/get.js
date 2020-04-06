import date from "./date";

const threads = async (offset)=>{
    const res = await fetch(`http://localhost:7000/api/thread?offset=${offset}`,{
        method:'GET'
    });
    const t = await res.json();
    if(t.error) return t;
    return date(t)
};

const comments = async (offset, threadId) =>{
    const res = await fetch(`http://localhost:7000/api/thread/comment?offset=${offset}&threadId=${threadId}`,{
        method:'GET'
    });
    const c = await res.json();
    if(c.error) return c;
    return date(c)
};

const profile = async (id, token) =>{
    const res = await fetch(`http://localhost:7000/api/user/${id}`,{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+ token
        }
    });

    const p = await res.json();
    if(p.error) return p;
    p.comments = date(p.comments);
    p.threads = date(p.threads);
    return p
};

const get = {
    threads,
    comments,
    profile
};
export default get