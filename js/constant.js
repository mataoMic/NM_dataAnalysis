
//IP地址
var API="http://192.168.100.146:8081";




//点播测试统计总表模拟数据
var data=[];
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
//点播测试统计总表模拟数据
var data1=[
    {"date":20201017,"test":162741,"failures":82,"测试失败频道列表":"20201017044158.xlsx"},
    {"date":20201012,"test":162884,"failures":73,"测试失败频道列表":"20201012100321.xlsx"},
    {"date":20201007,"test":162852,"failures":70,"测试失败频道列表":"20201007153423.xlsx"},
    {"date":20201003,"test":162565,"failures":70,"测试失败频道列表":"20201003060048.xlsx"},
    {"date":20200928,"test":162558,"failures":70,"测试失败频道列表":"20200928161921.xlsx"},
    {"date":20200805,"test":162220,"failures":70,"测试失败频道列表":"20200805170304.xlsx"},
    {"date":20200801,"test":161778,"failures":61,"测试失败频道列表":"20200801213316.xlsx"},
];
//失败数据
var datafail=[
    {"date":"2020-07-07","time":"05:51:12","one":"娱乐","two":"娱乐","order":3,"program":"张钧甯赤脚上树拿蛋","1":1,"11413090":11413039,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:37","one":"娱乐","two":"娱乐","order":4,"program":"大张伟张钧甯相拥而泣","1":1,"11413090":11354974,"result":"失败"},
    {"date":"2020-07-07","time":"05:51:42","one":"娱乐","two":"娱乐","order":5,"program":"张钧甯帮大张伟克服逆境","1":1,"11413090":11296668,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:42","one":"娱乐","two":"娱乐","order":6,"program":"大张伟张钧甯水下尖叫","1":1,"11413090":11233704,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:43","one":"娱乐","two":"娱乐","order":7,"program":"韩雪受罚戴地狱头盔","1":1,"11413090":11233567,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:44","one":"娱乐","two":"娱乐","order":8,"program":"白雪组合协力攀瀑布","1":1,"11413090":11233504,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:44","one":"娱乐","two":"娱乐","order":9,"program":"刘语熙谢天华敏捷捕鼠","1":1,"11413090":11233588,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:47","one":"娱乐","two":"全部","order":1,"program":"娱乐专题-天真有邪-林宥嘉-第26届东方风云榜","1":1,"11413090":569924042,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:47","one":"娱乐","two":"全部","order":2,"program":"娱乐专题-往后余生-马良-第26届东方风云榜","1":1,"11413090":569924032,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:48","one":"娱乐","two":"全部","order":3,"program":"鞠婧祎叹云兮自带仙气","1":1,"11413090":569924017,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:48","one":"娱乐","two":"全部","order":4,"program":"娱乐专题-Blah-Blah-乐华七子NEXT-第26届东方风云榜","1":1,"11413090":569924007,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:49","one":"娱乐","two":"全部","order":5,"program":"娱乐专题-说谎-林宥嘉-第26届东方风云榜","1":1,"11413090":569923982,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:50","one":"娱乐","two":"全部","order":6,"program":"娱乐专题-无药可救-张杰-第26届东方风云榜","1":1,"11413090":569923972,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:50","one":"娱乐","two":"全部","order":7,"program":"娱乐专题-去流浪-周笔畅-第26届东方风云榜","1":1,"11413090":569923962,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:51","one":"娱乐","two":"全部","order":8,"program":"吉克隽逸热情点燃全场","1":1,"11413090":569923937,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:51","one":"娱乐","two":"全部","order":9,"program":"娱乐专题-原来你也在这里-周笔畅-第26届东方风云榜","1":1,"11413090":569923927,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:52","one":"娱乐","two":"全部","order":10,"program":"娱乐专题-岁月神偷-周笔畅-第26届东方风云榜","1":1,"11413090":569923917,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:53","one":"娱乐","two":"全部","order":11,"program":"娱乐专题-Bamboo竹-张杰-第26届东方风云榜","1":1,"11413090":569923902,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:53","one":"娱乐","two":"全部","order":12,"program":"娱乐专题-别废话-袁娅维-第26届东方风云榜","1":1,"11413090":569923887,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:54","one":"娱乐","two":"全部","order":13,"program":"吴青峰柔情演绎起风了","1":1,"11413090":569923872,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:54","one":"娱乐","two":"全部","order":14,"program":"娱乐专题-大中国-周笔畅许魏洲陈粒-第26届东方风云榜","1":1,"11413090":569923847,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:55","one":"娱乐","two":"全部","order":15,"program":"娱乐专题-Pull Up-蔡徐坤-第26届东方风云榜","1":1,"11413090":569924443,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:56","one":"娱乐","two":"全部","order":16,"program":"娱乐专题-花开-周深-第26届东方风云榜","1":1,"11413090":569924433,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:57","one":"娱乐","two":"全部","order":17,"program":"娱乐专题-YOU-林彦俊-第26届东方风云榜","1":1,"11413090":569924419,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:57","one":"娱乐","two":"全部","order":18,"program":"娱乐专题-那好吧-李艺彤-第26届东方风云榜","1":1,"11413090":569924404,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:58","one":"娱乐","two":"全部","order":19,"program":"娱乐专题-太极禅-霍尊-第26届东方风云榜","1":1,"11413090":569924389,"result":"成功"},
    {"date":"2020-07-07","time":"05:51:59","one":"娱乐","two":"全部","order":20,"program":"娱乐专题-只凝视着你-大黑摩季-第26届东方风云榜","1":1,"11413090":569924369,"result":"成功"},
    {"date":"2020-07-07","time":"05:52:00","one":"娱乐","two":"全部","order":21,"program":"娱乐专题-佛系少女-冯提莫-第26届东方风云榜","1":1,"11413090":569924359,"result":"成功"},
];
var dateList1=[];
data1.forEach(function(item){
    dateList1.push(item.date); 
});
var testList1=[];
data1.forEach(function(item){
    testList1.push((item.test)/10000) 
})
var failuresList1=[];
data1.forEach(function(item){
    failuresList1.push(item.failures); 
})
var successRate1=[];
data1.forEach(function(item){
    var num=((item.test-item.failures)/item.test).toString();
    var rate=parseFloat(num.substring(0,num.indexOf(".")+4));
    successRate1.push(rate*100);
})

var dataIptvUe=[
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:00:47 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:01:47.021 ","CloseFlag":true,"CloseTime":"2020-10-28 13:59:39.677 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:00:06.125 ","Duration":"20.515s","OpenFlag":true,"OpenTime":"2020-10-28 13:59:45.758 "},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:03:47 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:04:47.007 ","CloseFlag":true,"CloseTime":"2020-10-28 14:02:39.064 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:03:05.084 ","Duration":"20.930s","OpenFlag":true,"OpenTime":"2020-10-28 14:02:44.344 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:06:47 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:07:47.030 ","CloseFlag":false,"CloseTime":"","CompleteFlag":true,"CompleteTime":"2020-10-28 14:06:04.162 ","Duration":"23.565s","OpenFlag":false,"OpenTime":"","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:09:47 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:10:48.020 ","CloseFlag":true,"CloseTime":"2020-10-28 14:08:39.603 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:09:05.639 ","Duration":"21.553s","OpenFlag":true,"OpenTime":"2020-10-28 14:08:44.306 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:12:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:13:48.057 ","CloseFlag":true,"CloseTime":"2020-10-28 14:11:40.712 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:12:06.024 ","Duration":"21.18s","OpenFlag":true,"OpenTime":"2020-10-28 14:11:45.223 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:15:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:16:48.002 ","CloseFlag":true,"CloseTime":"2020-10-28 14:14:40.591 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:15:06.334 ","Duration":"20.790s","OpenFlag":true,"OpenTime":"2020-10-28 14:14:45.758 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:18:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:19:48.057 ","CloseFlag":true,"CloseTime":"2020-10-28 14:17:40.714 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:18:05.830 ","Duration":"20.834s","OpenFlag":true,"OpenTime":"2020-10-28 14:17:45.134 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:21:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:22:48.033 ","CloseFlag":true,"CloseTime":"2020-10-28 14:20:40.756 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:21:06.676 ","Duration":"19.867s","OpenFlag":true,"OpenTime":"2020-10-28 14:20:47.010 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:24:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:25:48.005 ","CloseFlag":true,"CloseTime":"2020-10-28 14:23:40.977 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:24:05.086 ","Duration":"20.673s","OpenFlag":true,"OpenTime":"2020-10-28 14:23:44.636 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:27:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:28:48.228 ","CloseFlag":true,"CloseTime":"2020-10-28 14:26:40.607 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:27:05.624 ","Duration":"20.563s","OpenFlag":true,"OpenTime":"2020-10-28 14:26:45.262 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:30:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:31:48.002 ","CloseFlag":true,"CloseTime":"2020-10-28 14:29:40.711 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:30:06.078 ","Duration":"20.745s","OpenFlag":true,"OpenTime":"2020-10-28 14:29:45.607 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:33:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:34:48.012 ","CloseFlag":true,"CloseTime":"2020-10-28 14:32:40.500 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:33:06.353 ","Duration":"22.283s","OpenFlag":true,"OpenTime":"2020-10-28 14:32:44.096 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:36:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:37:48.023 ","CloseFlag":true,"CloseTime":"2020-10-28 14:35:40.606 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:36:10.971 ","Duration":"25.807s","OpenFlag":true,"OpenTime":"2020-10-28 14:35:45.375 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:39:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:40:48.079 ","CloseFlag":true,"CloseTime":"2020-10-28 14:38:40.596 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:39:06.034 ","Duration":"21.485s","OpenFlag":true,"OpenTime":"2020-10-28 14:38:44.726 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:42:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:43:48.005 ","CloseFlag":true,"CloseTime":"2020-10-28 14:41:40.772 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:42:06.885 ","Duration":"21.845s","OpenFlag":true,"OpenTime":"2020-10-28 14:41:45.262 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:45:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:46:48.002 ","CloseFlag":true,"CloseTime":"2020-10-28 14:44:40.959 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:45:04.676 ","Duration":"19.191s","OpenFlag":true,"OpenTime":"2020-10-28 14:44:45.719 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:48:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:49:48.037 ","CloseFlag":false,"CloseTime":"","CompleteFlag":true,"CompleteTime":"2020-10-28 14:48:07.085 ","Duration":"22.111s","OpenFlag":true,"OpenTime":"2020-10-28 14:47:45.184 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:51:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:52:48.005 ","CloseFlag":true,"CloseTime":"2020-10-28 14:50:40.644 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:51:05.911 ","Duration":"20.637s","OpenFlag":true,"OpenTime":"2020-10-28 14:50:45.510 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:54:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:55:48.178 ","CloseFlag":true,"CloseTime":"2020-10-28 14:53:40.516 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:54:05.736 ","Duration":"20.424s","OpenFlag":true,"OpenTime":"2020-10-28 14:53:45.502 ","OverFlag":false,"OverTime":""},
    {"CCTV1Status":true,"CCTV1Time":"2020-10-28 14:57:48 ","CCTV2Status":true,"CCTV2Time":"2020-10-28 14:58:48.005 ","CloseFlag":true,"CloseTime":"2020-10-28 14:56:40.652 ","CompleteFlag":true,"CompleteTime":"2020-10-28 14:57:05.474 ","Duration":"20.459s","OpenFlag":true,"OpenTime":"2020-10-28 14:56:45.262 ","OverFlag":false,"OverTime":""}
  ];
 