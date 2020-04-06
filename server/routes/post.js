const express = require('express');
const router =  express.Router();
const Thread = require('../db/models/').Thread;
const Comment = require('../db/models/').Comment;
const User = require('../db/models/').User;
const auth = require('../utils/auth');


router.post('/', auth, async (req,res)=>{
    const {title, content, userId} = req.body;

            try {
                if(!(title === '')) {
                    const thread = await Thread.create({title: title, content: content, userId: userId})
                    res.send(thread)
                } else {res.send({error:"Title can't be empty!"})}
            }catch(e){
                console.log(e)
                if(e.errors[0].type === 'notNull Violation') res.send({error:"Title can't be empty!"});
                else if(e.parent.errno === 1062) res.send({error:'Title with the same name already exists!'});
                else res.send({error:'Unable to save new post!'})
            }

});

router.get('/', async (req,res) =>{
    try{
        let offset = Number(req.query.offset);
        if(!offset) offset = 0;
        const threads = await Thread.findAll({
            attributes:['id', 'title', 'content', 'updatedAt', 'userId'],
            include:[{
                model:User,
                required:true,
                attributes:['username']
            }],
            limit:10,
            offset:offset
            });
        res.send(threads)
    }catch (e) {
        console.log(e)
         res.send({error:'Unable to retrieve threads!'})
    }
});
router.put('/:id', auth, async (req,res)=>{

    const id = req.params.id;
    const {title,content} = req.body;
    try{
        const thread = await Thread.update({title:title,content:content},{where:{id}});

        if(thread==0) return res.status(404).send();
        const t = await Thread.findOne({
            attributes:['id', 'title', 'content', 'updatedAt', 'userId'],
            include:[{
                model:User,
                required:true,
                attributes:['username']
            }],
            where:{id}
        });
        if(!t)return res.send({error:'Unable to retrieve edited thread'})
        res.send(t)
    }catch (e) {
        console.log(e);
        res.send({error:'Unable to update the post!'})
    }
});

router.delete('/:id', auth, async (req,res)=>{
    const id = req.params.id;
    try{
        const thread = await Thread.destroy({where:{id}})
        if(thread==0) return res.status(404).send();
        res.status(204).send()
    }catch(e){
        console.log(e);
        res.send({error:'Unable to delete the post'})
    }
});

router.post('/comment', auth, async (req,res)=>{
    const {comment, threadId, userId} = req.body;

    try {
        if(!(comment === '')){
            const comments = await Comment.create({comment:comment, userId: userId, threadId:threadId});
            res.send(comments)
        }else{
            res.send({error:"Comment can't be empty!"})
        }

    }catch(e){

        if(e.errors[0].type === 'notNull Violation') res.send({error:"Comment can't be empty!"});
        else res.send({error:'Unable to save new comment!'})
    }

});
router.get('/comment', async (req,res) =>{
    try{
        const threadId = req.query.threadId;
        const offset = Number(req.query.offset);
        if(!threadId) return res.send({error:'Unable to retrieve comments!'});
        const comments = await Comment.findAll({
            attributes:['id', 'comment', 'updatedAt', 'userId', 'threadId'],
            include:[{
                model:User,
                required:true,
                attributes:['username']
            }],
            where:{threadId},
            limit:10,
            offset:offset
        });
        res.send(comments)
    }catch (e) {
        console.log(e);
        res.send({error:'Unable to retrieve comments!'})
    }
});

router.put('/comment/:id', auth, async (req,res)=>{

    const id = req.params.id;
    const {comment} = req.body;
    try{
        const com = await Comment.update({comment:comment},{where:{id}});
        console.log(com)
        if(com==0) return res.status(404).send();
        const c = await Comment.findOne({
            attributes:['id', 'comment', 'updatedAt', 'userId', 'threadId'],
            include:[{
            model:User,
            required:true,
            attributes:['username']
        }],
        where:{id}
        });
        if(!c)return res.send({error:'Unable to retrieve edited comment'})
        res.send(c)
    }catch (e) {
        console.log(e);
        res.send({error:'Unable to update the post!'})
    }
});

router.delete('/comment/:id', auth, async (req,res)=>{
    const id = req.params.id;
    try{
        const com = await Comment.destroy({where:{id}});
        if(com==0) return res.status(404).send();
        res.status(204).send(   )
    }catch(e){
        console.log(e);
        res.send({error:'Unable to delete the post'})
    }
});

module.exports = router;