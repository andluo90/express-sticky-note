const express = require('express')
const router = express.Router()
const Note = require('../models/note')

//增删改查api

router.get('/notes',(req,res,next)=>{
    //获取所有的notes
    const opts = {raw:true}
    if(req.session && req.session.user){
        opts.where = {uid:req.session.user.id,deleted:1}
        Note.findAll(opts).then((data)=>{
            res.send({status:0,msg:'get all notes done.',data:data})
        }).catch((error)=>{
            res.send({status:1,msg:`数据库异常:${error}`})
        })
    }else{
        opts.where = {user:'All',deleted:1}
        Note.findAll(opts).then((data)=>{
            res.send({status:0,msg:'未登录',data:data})
        }).catch((error)=>{
            res.send({status:1,msg:`数据库异常:${error}`})
        })
    }
    
})

router.post('/notes/add',(req,res,next)=>{
    //新增notes
    const text  = req.body.text
    const user = req.session && req.session.user ? req.session.user : undefined
    if(user){
        Note.create({
            uid:user.id,
            user:user.username,
            text:text,
            grade:0,
            status:0
        }).then((data)=>{
            res.send({status:0,id:data.dataValues.id,msg:'新增note成功.'})
        }).catch((error)=>{
            res.send({status:1,msg:`新增失败:${error}`})
        })
    }else{
        res.send({status:0,id:'',msg:'未登录.'})
    }
    
})

router.post('/notes/edit',(req,res,next)=>{
    //修改note
    console.log(`edit id:${req.body.id}, note:${req.body.text}`)
    const {id,text} = req.body
    const user = req.session && req.session.user ? req.session.user : undefined
    if(user){
        Note.update({
            text:text
        },{
            where:{
                uid:user.id,
                id:id
            }
        }).then(()=>{
            res.send({status:0,msg:'编辑note成功'})
        }).catch((error)=>{
            res.send({status:1,msg:`编辑Note失败:${error}`})
    
        })
    }else{
        res.send({status:0,msg:'未登录'})
    }
    
})

router.post('/notes/completed',(req,res,next)=>{
    //标记note
    console.log(`edit id:${req.body.id}`)
    const user = req.session && req.session.user ? req.session.user : undefined
    if(user){
        Note.update({
            status:1
        },{
            where:{
                uid:user.id,
                id:req.body.id
            }
        }).then(()=>{
            res.send({status:0,msg:'标志note成功'})
        }).catch((error)=>{
            res.send({status:1,msg:`标志Note失败:${error}`})
    
        })
    }else{
        res.send({status:0,msg:`未登录`})
    }
    
})

router.post('/notes/delete',(req,res,next)=>{
    //修改note
    console.log(`delete id:${req.body.id}`)
    const user = req.session && req.session.user ? req.session.user : undefined
    if(user){
        Note.update(
            {
                deleted:0
            },
            {
                where:{
                    uid:user.id,
                    id:req.body.id
            }
        }).then(()=>{
            res.send({status:0,msg:'删除note成功.'})
    
        }).catch((error)=>{
            res.send({status:1,msg:`删除失败${error}`})
        })
    }else {
        res.send({status:0,msg:`未登录`})
    }
    
})

module.exports = router



