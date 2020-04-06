import date from "./date";

const user = async(username, email,password) =>{
  const res = await fetch('http://localhost:7000/api/user/',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({username,password,email})
  });
    return await res.json()

};

const thread = async (title, content, userId, token, username) =>{
    const res = await fetch('http://localhost:7000/api/thread/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({title, content, userId})
    });
    const t = await res.json();
    if(t.error) return t;
    t.User = {};
    t.User.username = username;
    return date(t)
};

const comment = async (comment, userId, threadId, token, username) =>{
    const res = await fetch('http://localhost:7000/api/thread/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({comment, threadId, userId})
    });
    const c = await res.json();
    console.log(c)
    if(c.error) return c;
    c.User = username;
    c.User = {};
    c.User.username = username;
    return date(c)
};

const save = {
    user,
    comment,
    thread
};

export default save