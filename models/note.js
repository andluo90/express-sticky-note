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

Note.findAll({raw: true}).then(function(data) {
      console.log(data)
})

module.exports = Note

