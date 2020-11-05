var SERVER_URL = 'http://192.168.100.199:8081' //142，146
//防抖函数
function _debounce(fn,wait){
    let timer=null;
    return function(){
         let args=arguments,that=this;
         timer&&clearTimeout(timer);
         timer=setTimeout(function(){fn.apply(that,args)},wait)
    }        
} 