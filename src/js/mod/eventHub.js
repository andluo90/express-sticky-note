class EventHub{
    constructor(){
        this.events = {}
    }
    on(event_name,fn){
        if(!this.events[event_name]){
            this.events[event_name] = []
        }
        this.events[event_name].push(fn)
    }
    
    emit(event_name,params){
        let fn_list = this.events[event_name]
        fn_list.map((fn)=>{
            fn.apply(null,params)
        })
    }

    off(event_name,fn){
        let fn_list = this.events[event_name]
        let index = fn_list.indexOf(fn)
        if( index > -1){
            delete fn_list[index]
        }       
    }
}

const eventHub = new EventHub()

module.exports = eventHub