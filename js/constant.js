
//IP地址
var API="http://192.168.100.199:8081";



//点播测试统计总表模拟数据
var data=[
    {"date":20201017,"test":266174,"failures":2220,"测试失败频道列表":"20201017044158.xlsx"},
    {"date":20201012,"test":263246,"failures":2201,"测试失败频道列表":"20201012100321.xlsx"},
    {"date":20201007,"test":260764,"failures":2158,"测试失败频道列表":"20201007153423.xlsx"},
    {"date":20201003,"test":259317,"failures":1874,"测试失败频道列表":"20201003060048.xlsx"},
    {"date":20200928,"test":252925,"failures":1846,"测试失败频道列表":"20200928161921.xlsx"},
    {"date":20200805,"test":240974,"failures":865,"测试失败频道列表":"20200805170304.xlsx"},
    {"date":20200801,"test":275109,"failures":815,"测试失败频道列表":"20200801213316.xlsx"},
    {"date":20200731,"test":15638,"failures":173,"测试失败频道列表":"20200731224244.xlsx"},
    {"date":20200726,"test":15582,"failures":172,"测试失败频道列表":"20200726212740.xlsx"},
    {"date":20200717,"test":326358,"failures":1456,"测试失败频道列表":"20200717022322.xlsx"},
    {"date":20200713,"test":342632,"failures":2238,"测试失败频道列表":"20200713235321.xlsx"},
    {"date":20200711,"test":341484,"failures":1838,"测试失败频道列表":"20200711110222.xlsx"},
    {"date":20200709,"test":313596,"failures":2407,"测试失败频道列表":"20200709092841.xlsx"},
];
var dateList=[];
data.forEach(function(item){
    dateList.push(item.date); 
});
var testList=[];
data.forEach(function(item){
    testList.push((item.test)/10000) 
})
var failuresList=[];
data.forEach(function(item){
    failuresList.push(item.failures); 
})
var successRate=[];
data.forEach(function(item){
    var num=((item.test-item.failures)/item.test).toString();
    var rate=parseFloat(num.substring(0,num.indexOf(".")+4));
    successRate.push(rate*100);
})