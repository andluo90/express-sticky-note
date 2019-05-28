const express = require('express')
const router = express.Router()
const Note = require('../models/note')

//增删改查api

router.get('/notes',(req,res,next)=>{
    //获取所有的notes
    Note.findAll({raw:true}).then((data)=>{
        console.log(data)
        res.send({status:0,msg:'get all notes done.',data:data})
    }).catch((error)=>{
        res.send({status:1,msg:`数据库异常:${error}`})
    })
})

router.post('/notes/add',(req,res,next)=>{
    //新增notes
    console.log(`note:${req.body.note}`)
    Note.create({
        user:'andluo',
        text:'后台测试3',
        grade:3,
        status:1
    }).then(()=>{
        res.send({status:0,msg:'新增note成功.'})
    }).catch((error)=>{
        res.send({status:1,msg:`新增失败:${error}`})
    })
})

router.post('/notes/edit',(req,res,next)=>{
    //修改note
    console.log(`edit id:${req.body.id}, note:${req.body.note}`)
    Note.update({
        text:'后台测试更新.'
    },{
        where:{
            id:2
        }
    }).then(()=>{
        res.send({status:0,msg:'编辑note成功'})
    }).catch((error)=>{
        res.send({status:1,msg:`编辑Note失败:${error}`})

    })
})

router.post('/notes/delete',(req,res,next)=>{
    //修改note
    console.log(`delete id:${req.body.id}`)
    Note.destroy({
        where:{
            id:3
        }
    }).then(()=>{
        res.send({status:0,msg:'删除note成功.'})

    }).catch((error)=>{
        res.send({status:1,msg:`删除失败${error}`})

    })
})

module.exports = router



