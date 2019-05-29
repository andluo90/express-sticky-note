// note 模型
const Sequelize = require('sequelize');
const path = require('path')

//连接数据库
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
  
    storage: path.join(__dirname, '../database/database.sqlite') 
  });


// 测试数据库能否连接成功.
// sequelize.authenticate()
//          .then(function(err) {
//             console.log('Connection has been established successfully.');
//         })
//         .catch(function (err) {
//             console.log('Unable to connect to the database:', err);
//         });

const Note = sequelize.define('note',{
    uid:{
        type:Sequelize.INTEGER,
    },
    user:{
        type:Sequelize.STRING,
        allowNull:false
    },
    text:{
        type:Sequelize.STRING(500)
    },
    grade:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    deleted:{
        type:Sequelize.INTEGER,
        defaultValue:1
    }
    
})

// Note.sync() //模型进行同步

// Note.sync().then(()=>{
//     return Note.create({
//         user:'andluo',
//         text:'后台测试',
//         grade:0,
//         status:0
//     })
// })

// 查询Demo
// Note.findAll({raw: true}).then(function(data) {
//       console.log(data)
// })

// Note.create({
//     user:'andluo',
//     text:'后台测试333',
//     grade:4,
//     status:0
// }).then((data)=>{
//     console.log('id is ------')
//     console.log(data.dataValues.id)
// })

// Note.findAll({
//     raw:true,
//     where:{deleted:1}})
//     .then((data)=>{
//         console.log(data)
//     })

module.exports = Note

