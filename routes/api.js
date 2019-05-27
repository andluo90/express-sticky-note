const express = require('express')
const router = express.Router()

//增删改查api

router.get('/notes',(req,res,next)=>{
    //获取所有的notes
    res.send({status:0,msg:'get all notes done.',data:'test'})
})

router.post('/notes/add',(req,res,next)=>{
    //新增notes
    console.log(`add id:${req.body.id}, note:${req.body.note}`)
    res.send({status:0,msg:'新增note成功.'})
})

router.post('/notes/edit',(req,res,next)=>{
    //修改note
    console.log(`edit id:${req.body.id}, note:${req.body.note}`)
    res.send({status:0,msg:'修改note成功.'})
})

router.post('/notes/delete',(req,res,next)=>{
    //修改note
    console.log(`delete id:${req.body.id}`)
    res.send({status:0,msg:'删除note成功.'})
})

module.exports = router



