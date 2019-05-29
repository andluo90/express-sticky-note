require('../../less/toast.less')


function toast(msg,level){
    this.msg = msg;
    this.showTime = 2000
    this.show(level)
}

toast.prototype ={
    show:function(level){
        let tmp = null
        console.log(`level is ${level}`)
        if(level !== undefined){
            tmp = `<span class="message ${level}">${this.msg}</span>`
        }else {
            tmp = `<span class="message">${this.msg}</span>`
            
        }
        console.log(tmp)
        this.$toast = $(tmp)
        $('main').append(this.$toast)
        setTimeout(() => {
            this.$toast.remove()
        }, this.showTime);
        
    }
}

function Toast(msg,time,level){
    console.log(msg,time,level)
    return new toast(msg,time,level)
}

module.exports = Toast