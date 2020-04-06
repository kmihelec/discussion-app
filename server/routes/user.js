const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router =  express.Router();
const User = require('../db/models').User;
const Comment = require('../db/models').Comment;
const Thread = require('../db/models').Thread;
const auth = require('../utils/auth');

router.post('/', async (req,res)=>{
    const {username, password, email} = req.body;
    bcrypt.genSalt(12, (err,salt)=>{
        if(err)return res.send("Something went wrong");
        bcrypt.hash(password, salt, async (err, hash)=>{
            if(err)return res.send("Something went wrong");
            try {
                const user = await User.create({username: username, password: hash, email: email});
                res.status(201).send(user)
            }catch(e){
                if(e.original.errno === 'ECONNREFUSED') return res.send({error:"Can't connect to the database!"})
                const error = e.errors[0].message.split(' ');
                if (error[0] === 'email') res.send({error:"Email already registered!"});
                else  if(error[0] === 'username') res.send({error:"Username already exists!"});
                else res.send({error:'Unable to save new user!'})
            }
            })
    })
});
router.post('/login', async (req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.authenticate(username,password);
        const token = jwt.sign({user:user.username, id:user.id}, process.env.SECRET, {expiresIn: '2h'});
        const u = {
            username: user.username,
            id: user.id,
            token:token
        };
        res.send(u)
    } catch(e)
    {

        res.status(401).send({error:'Wrong username or password!'})
    }
});

router.post('/auth', async (req,res)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        res.send({id:decoded.id, username:decoded.user})
    }catch (e) {
        console.log(e);
        res.send({error:'Please re-login'})
    }

})

router.get('/', async (req,res)=>{
    try{
        const user = await User.findAll({
            attributes:['id', 'username']
        });
        res.send(user)
    }catch (e) {
        res.status(500).send('Unable to retrieve data')
    }
});

router.get('/:id', auth, async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findOne({where:{id}});
        if (!user) {
            return res.status(404).send({error:"User doesn't exists!"})
        }
        const comments = await Comment.findAll({
            attributes:['id', 'comment', 'threadId', 'updatedAt'],
            where:{userId:id}
        });
        const threads = await Thread.findAll({
            attributes:['id', 'title', 'content', 'updatedAt'],
            where:{userId:id}
        });

        if(Number(id) === Number(req.id)){
            res.send({user,comments,threads})
        }else {
            res.send({user: user.username, comments,threads})
        }
    }catch (e) {
        console.log(e)
        res.status(500).send('Unable to retrieve data')
    }
});

router.delete('/delete', auth, async (req,res)=>{
   try{
       const username = req.user;
       await User.destroy({
           where:{username}
       });
       res.status(204).send()
   } catch (e) {
       console.log(e);
       res.status(500).send()
   }
});

router.put('/update', auth, async(req,res)=>{
   try{
       let name, mail;
       const {username, email, currentPassword, newPassword} = req.body;
       const user = await User.authenticate(req.user, currentPassword);
       if(username==='')name = req.username;
       else name = username
       if(email==='')mail = req.email;
       else mail = email;
       if (user){
           if(newPassword){
               bcrypt.genSalt(12, (err,salt)=>{
                   if(err)return  res.status(500).send();
                   bcrypt.hash(newPassword, salt, async (err, hash)=>{
                       if(err)return  res.status(500).send();
                       try {
                          const u = await User.update({username: name, password: hash, email: mail},{ where:{username:req.user}});
                           if(u==0) return res.status(404).send();
                           res.status(204).send()
                       }catch(e){
                           console.log(e);
                           res.status(204).send()
                       }
                   })
               })
           }else{
               try {
                   const u = await User.update({username: name, email: mail}, { where:{username:req.user}});
                   if(u==0) return res.status(404).send();
                   res.status(204).send()
               }catch(e){
                   console.log(e);
                   res.status(404).send();
               }
           }
       }else{
           res.status(404).send();
       }
   } catch (e) {
       console.log(e);
       res.status(404).send();
   }
});

module.exports = router;