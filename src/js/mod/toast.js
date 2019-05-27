require('../../less/toast.less')


function toast(msg,time=2){
    this.msg = msg;
    this.showTime = time * 2000
    this.show()
}

toast.prototype ={
    show:function(){
        const tmp = `<span class="message">${this.msg}</span>`
        this.$toast = $(tmp)
        $('main').append(this.$toast)
        setTimeout(() => {
            this.$toast.remove()
        }, this.showTime);
    }
}

function Toast(msg,time){
    return new toast(msg,time)
}

module.exports = Toast