require('../../less/note.less')
const toast = require('./toast')

function note(id,dateTime,content,status,grade){
    this.$container = $('#waterfall')
    this.id = id;
    this.dateTime = dateTime;
    this.content = content;
    this.status = status || 0;
    this.grade = grade

    this.show()
}

note.prototype = {
    show:function(){

        let css = `style="color:#00d4ed"`

        let grade_str = `
            <div class="grade">
                <span class="iconfont icon-xingxingman" data-grade=1 ${this.grade>=1?css:''}></span>
                <span class="iconfont icon-xingxingman" data-grade=2 ${this.grade>=2?css:''}></span>
                <span class="iconfont icon-xingxingman" data-grade=3 ${this.grade>=3?css:''}></span>
                <span class="iconfont icon-xingxingman" data-grade=4 ${this.grade>=4?css:''}></span>
                <span class="iconfont icon-xingxingman" data-grade=5 ${this.grade>=5?css:''}></span>
            </div>
        `


        const tmp = `
            <li class="item" data-id=${this.id} data-status=${this.status} data-grade=${this.grade}>
                <div class="title">
                <span class="datetime">${this.dateTime}</span>
                <span class="delete" data-id=${this.id}>x</span>
                </div>
                <div class="content">
                    <span class="detail">${this.content}</span>
                    <span class="iconfont icon-bianji" data-id=${this.id}></span>
                </div>
                <div class="bottom">
                ${grade_str}
                
                <div data-id=${this.id} class="${this.status===0 ?'uncompleted':'completed'}">${this.status===0?'未完成':'<span class="iconfont icon-gouxuan"></span>'}</div>
                </div>
            </li>`
        this.$container.prepend($(tmp))

        
        

    }
    
    
}

function Note(id=1,dateTime='2019-01-01',content='text...',status=0,grade){
    return new note(id=id,dateTime=dateTime,content=content,status=status,grade)
}

module.exports = Note