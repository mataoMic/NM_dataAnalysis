document.write("<script language=javascript src='/js/constant.js'></script>");
(function(){



    
var imgs= [
    "../../image/error/ERROR_OVERTIME_20201030_082555.jpg", 
    "../../image/error/ERROR_OVERTIME_20201030_081055.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_074955.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_073144.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_070141.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_064639.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_060724.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_052210.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_043707.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_041558.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_035158.jpg",
    "../../image/error/ERROR_OVERTIME_20201030_030950.jpg",
    "../../image/error/ERROR_OVERTIME_20201029_233924.jpg",
    "../../image/error/ERROR_OVERTIME_20201029_163437.jpg",
    "../../image/error/ERROR_OVERTIME_20201029_205318.jpg",
];    


//table数据处理
function status(res){
    if(res){
        return '是'
    }else{
        return '否'
    }
}


//图标数据
var chartList=[];




//点播测试统计查询
$("#s_iptv").click(function ()  {
    var company= $("#statistics_company_select").val();
    if(company=="IPTV"){
        statisticsLine('../../js/json/iptv.json');
    }else{
        statisticsLine('../../js/json/ott.json');
    }
    
}) 

//鉴权和直播测试查询IPTV
$("#s_iptv_authentication").click(function (){
    var time= $("#iptv-date").val();
    debugger
    var time1=(time.substring(0, 10)).replace(/-/g,'');
    var time2=(time.substring(time.length-10, time.length)).replace(/-/g,'');
    ipTvLine(`../../js/json/${time1}.json`);
}) 


//鉴权和直播测试查询OTT
$("#s_ott_authentication").click(function (){
    var time= $("#ott-date").val();
    var time1=(time.substring(0, 10)).replace(/-/g,'');
    var time2=(time.substring(time.length-10, time.length)).replace(/-/g,'');
    ottLine(`../../js/json/${time1}.json`);
}) 
  //公共请求方法
  async function func(){
    await ipTvLine('../../js/json/20201028_13.json'); //鉴权和直播测试查询IPTV折线图
    await ottLine('../../js/json/20201028_14.json'); //鉴权和直播测试查询ott折线图
    await ipTVSearch(API); //鉴权和直播测试查询IPTV搜索框
    await ottSearch(API); //鉴权和直播测试查询ott搜索框
 
    await statisticsLine('../../js/json/iptv.json'); //点播测试统计总表折线图
    await statisticsFailTable('../../js/json/iptv.json'); //点播测试统计总表折线图
    await statisticsSearch(API); //点播测试统计总表搜索框
}


 func();

 

   //鉴权和直播测试查询IPTV搜索框
   function ipTVSearch(szServer, startDate, endDate){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'post',
            url: szServer,
            dataType: 'text',
            success: function(json){
                var datas1 = [{id:'IPTV',text:'IPTV'},{id:'OTT',text:'OTT'}]
                var datas2 = [{id:'呼和浩特市',text:'呼和浩特市'},{id:'包头市',text:'包头市'},{id:'呼伦贝尔市',text:'呼伦贝尔市'},
                            {id:'兴安盟',text:'兴安盟'},{id:'通辽市',text:'通辽市'},{id:'赤峰市',text:'赤峰市'},
                            {id:'锡林郭勒盟',text:'锡林郭勒盟'},{id:'乌兰察布市',text:'乌兰察布市'},{id:'鄂尔多斯市',text:'鄂尔多斯市'},
                            {id:'乌海市',text:'乌海市'},{id:'巴彦淖尔市',text:'巴彦淖尔市'},{id:'阿拉善盟',text:'阿拉善盟'},
                            ]
                var datas3 = [{id:'1',text:'最近8小时'},{id:'2',text:'最近1天'},{id:'3',text:'最近1周'},{id:'3',text:'最近1周'},{id:'4',text:'最近3个月'}]
                layui.use(['form'], function () {
                    var form = layui.form,
                        layer = layui.layer
                        selectUtil1.render({
                            id: 'iptv_company_select',
                            data: datas1
                        });
                        selectUtil1.render({
                            id: 'iptv_channel_select',
                            data: datas2
                        });
                       
                        //监听提交
                        form.on('submit(demo1)', function(data){
                            layer.alert(JSON.stringify(data.field), {
                            title: '最终的提交信息'
                            })
                            return false;
                        });
                })
                resolve();
            },
            error: function(){
                resolve();
            }
        });
    });
    return p;
}


//鉴权和直播测试查询OTT搜索框
function ottSearch(szServer, startDate, endDate){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'post',
            url: szServer,
            dataType: 'text',
            success: function(json){
                var datas1 = [{id:'1',text:'IPTV'},{id:'2',text:'OTT'}]
                var datas2 =[{id:'呼和浩特市',text:'呼和浩特市'},{id:'包头市',text:'包头市'},{id:'呼伦贝尔市',text:'呼伦贝尔市'},
                {id:'兴安盟',text:'兴安盟'},{id:'通辽市',text:'通辽市'},{id:'赤峰市',text:'赤峰市'},
                {id:'锡林郭勒盟',text:'锡林郭勒盟'},{id:'乌兰察布市',text:'乌兰察布市'},{id:'鄂尔多斯市',text:'鄂尔多斯市'},
                {id:'乌海市',text:'乌海市'},{id:'巴彦淖尔市',text:'巴彦淖尔市'},{id:'阿拉善盟',text:'阿拉善盟'},
                ];
                var datas3 = [{id:'1',text:'最近8小时'},{id:'2',text:'最近1天'},{id:'3',text:'最近1周'},{id:'3',text:'最近1周'},{id:'4',text:'最近3个月'}]
                layui.use(['form'], function () {
                    var form = layui.form,
                        layer = layui.layer
                        selectUtil1.render({
                            id: 'ott_company_select',
                            data: datas1
                        });
                        selectUtil1.render({
                            id: 'ott_channel_select',
                            data: datas2
                        });
                       
                })
                resolve();
            },
            error: function(){
                  resolve();
            }
        });
    });
    return p;
}

 //鉴权和直播测试查询IPTV折线图
 function ipTvLine(szServer, startDate, endDate){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'get',
            url: szServer,
            dataType: 'json',
            success: function(json){
                var data=json;
                var dateList=[];
                var testList=[];
                var failuresList=[];
                var successRate=[];
                var warningList=[];
                    data.forEach(function(item){
                       dateList.push(item.CCTV1Time); 
                   });
                   
                   data.forEach(function(item){
                        var time= (item.Duration).replace("s",'');
                       testList.push(time) 
                   })
                   
                   data.forEach(function(item){
                    if(item.CompleteFlag==true){
                       failuresList.push(100); 
                    }else{
                        failuresList.push(0); 
                    }
                   })
                   
                   data.forEach(function(item){
                       if(item.OverFlag==false){
                        successRate.push(100);
                       }else{
                        successRate.push(0);
                        warningList.push(item)
                       }
                       
                   })
                   var colors = ["#FFA500",'#0FC5F3','#00FA9A'];
                   //折线图显示
                   var dom =document.getElementById('iptv');
                    
                    var drillDown={
                        getOption:function(){
                            var option=null;
                            option = {
                                // backgroundColor:'#232d36',
                                legend:{
                                    data:['开机时长', '首页加载成功率', '开机成功率', ],
                                    textStyle:{
                                        color:'#fff',
                                        align: 'left',
                                    },
                                    x:'left'
                                },
                                dataZoom: [
                                    {
                                        show: true,
                                        height: 10,
                                        xAxisIndex: [0],
                                        bottom: 10,
                                        
                                        // "start": 10,
                                        // "end": 80,
                                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                                        handleSize: '110%',
                                        handleStyle: {
                                            color: "#5B3AAE",
                                        },
                                        textStyle:{
                                            color:"rgba(204,187,225,0.5)",
                                        },
                                        fillerColor:"rgba(67,55,160,0.4)",
                                        borderColor: "rgba(204,187,225,0.5)",
                                
                                    },
                                    {
                                        type: 'inside',
                                        xAxisIndex: 0,
                                        show: true,
                                        height: 15,
                                    },
                                ],
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        lineStyle: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 0,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: 'rgba(0, 255, 233,0)'
                                                }, {
                                                    offset: 0.5,
                                                    color: 'rgba(255, 255, 255,1)',
                                                }, {
                                                    offset: 1,
                                                    color: 'rgba(0, 255, 233,0)'
                                                }],
                                                global: false
                                            }
                                        },
                                    },
                                },
                                grid: {
                                    top: '15%',
                                    left: '10%',
                                    right: '5%',
                                    bottom: '15%',
                                    containLabel: true
                                },
                                xAxis: {
                                    data: dateList,
                                    axisLine: {
                                      show: true, //隐藏X轴轴线
                                      lineStyle: {
                                        color: '#26D9FF',
                                        width:2
                                      }
                                    },
                                    axisTick: {
                                      show: true //隐藏X轴刻度
                                    },
                                    axisLabel: {
                                      show: true,
                                      textStyle: {
                                        color: "rgba(250,250,250,0.6)", //X轴文字颜色
                                        fontSize: 12
                                      }
                                    },
                                  },
                                
                            
                                yAxis: [
                                     {//第一个y轴位置在左侧
                                    position:'left',
                                    type : 'value',
                                    offset:20,
                                    name: '开机时长',
                                    axisLine: {
                                        lineStyle: {
                                            color: colors[0],
                                            width: 2
                                        }
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    axisLabel: {
                                        show: true,
                                        margin: 20,
                                        textStyle: {
                                            color: colors[0],
                            
                                        },
                                        formatter: '{value} s'
                                    },
                                    axisTick: {
                                        show: true,
                                    },
                                },
                                {//第二个y轴在右侧
                                    position:'left',
                                    offset:110,
                                    type : 'value',
                                    name: '首页加载成功率',
                                    axisLine: {
                                        lineStyle: {
                                            color: colors[1],
                                            width: 2
                                        }
                                    },
                                    axisLabel: {
                                        show: true,
                                        margin: 20,
                                        textStyle: {
                                            color: colors[1],
                                        },
                                        formatter: '{value} %'
                                    },
                                    axisTick: {
                                        show: true,
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                },
                                {//第三个y轴也在左侧，距第二个30个像素
                                    position:'right',
                                    type : 'value',
                                    name: '开机成功率',
                                    max:110,
                                    min:-10,
                                    axisLine: {
                                        lineStyle: {
                                            color: colors[2],
                                            width: 2
                                        }
                                    },
                                    axisLabel: {
                                        show: true,
                                        margin: 20,
                                        textStyle: {
                                            color: colors[2],
                                        },
                                        formatter: '{value} %'
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                }],
                                series: [
                                    {
                                        name:'开机时长',
                                        type: 'bar',
                                        barWidth: 10,
                                        itemStyle: {
                                            normal: {
                                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                        offset: 0,
                                                        color: "rgba(255,165,0, 1)"
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: "rgba(255,165,0, 1)"
                                                    }
                                                ]),
                                                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                        offset: 0,
                                                        color: "rgba(160,196,225, 1)"
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: "rgba(255,165,0, 1)"
                                                    }
                                                ]),
                                                borderWidth: 2
                                            }
                                        },
                                        yAxisIndex:'0',
                                        data:testList//data.values
                                    },
                                    {
                                        name:'首页加载成功率',
                                        type: 'line',
                                        smooth:true, 
                                        symbol: 'circle',
                                        symbolSize: 5,
                                        lineStyle: {
                                            normal: {
                                                color: "#0FC5F3",
                                            },
                                        },
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#0FC5F3',
                                            }
                                        },
                                        itemStyle: {
                                            color: "#0FC5F3",
                                            borderColor: "#0FC5F3",
                                            borderWidth: 2,
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                    offset: 0,
                                                    color: 'rgba(15,197,243,1)'
                                                }, {
                                                    offset: 1,
                                                    color: 'rgba(15,197,243,1)'
                                                }]),
                                                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                    offset: 0,
                                                    color: 'rgba(180,240,255,1)'
                                                }, {
                                                    offset: 1,
                                                    color: 'rgba(15,197,243,1)'
                                                }]),
                                                borderWidth: 2
                                            }
                                        },
                                        yAxisIndex:'1',
                                        data: failuresList//data.values
                                    },
                                    {
                                        name:'开机成功率',
                                        type: 'line',
                                        smooth:true, 
                                        symbol: 'circle',
                                        symbolSize: 5,
                                        lineStyle: {
                                            normal: {
                                                color: "#00FA9A",
                                            },
                                        },
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#00FA9A',
                                            }
                                        },
                                        itemStyle: {
                                            color: "#00FA9A",
                                            borderColor: "#00FA9A",
                                            borderWidth: 2,
                                        },
                                        yAxisIndex:'2',
                                        data: successRate//data.values
                                    },
                                ]
                                }; 
                            return option;
                        },
                        initChart:function(myChart, option){
                            myChart.setOption(option);
                            myChart.on('click',function(object){
                                echarts.dispose(dom);
                                var myChart=echarts.init(dom);
                                option.xAxis.data=['2020-10-28 12:23:00','2020-10-28 12:26:00'];
                                option.series[0].data=[
                                    123,234,4355
                                ];
                                option.series[1].data=[
                                    123,234,4355
                                ];
                                option.series[2].data=[
                                    123,234,4355
                                ];
                                myChart.setOption(option,true);
                            })
                        }
                    }
                   var listener=echarts.init(dom);
                   var option=drillDown.getOption();
                   drillDown.initChart(listener,option);
                   chartList.push(listener);
                   
                   
                   //动态实现table表格
                   layui.use('table', function(){
                       var table = layui.table;
                       table.render({
                           elem: '#live-iptv-table',
                           height: 319,
                           cellMinWidth: 110, //全局定义常规单元格的最小宽度，
                           cols: [[ //标题栏
                               {field: 'CCTV1Status', title: 'CCTV1状态',templet:(res)=>status(res) }
                                   ,{field: 'CCTV1Time', title: 'CCTV1启动时刻',width:180 }
                                   ,{field: 'CCTV2Status', title: 'CCTV2状态',templet:(res)=>status(res) }
                                   ,{field: 'CCTV1Time', title: 'CCTV2启动时刻'}
                                   ,{field: 'CloseFlag', title: '关闭状态',templet:(res)=>status(res) }
                                   ,{field: 'CloseTime', title: '关闭时刻'}
                                   ,{field: 'CompleteFlag', title: '首页加载状态',templet:(res)=>status(res) }
                                   ,{field: 'CompleteTime', title: '首页加载时刻'}
                                   ,{field: 'Duration', title: '开机时长'}
                                   ,{field: 'OpenFlag', title: '开机状态',templet:(res)=>status(res) }
                                   ,{field: 'OpenTime', title: '开机时刻'}
                                   ,{field: 'OverFlag', title: '超时状态',templet:(res)=>status(res) }
                                   ,{field: 'OverTime', title: '超时时刻'},
                                   {
                                    field: 'imgurl',
                                    title: '图片',
                                    templet:'#titleTpl'
                                  }
                                   ]],
                           data:warningList,
                            //,skin: 'line' //表格风格
                            // even: true
                            //,page: true //是否显示分页
                            //,limits: [5, 7, 10]
                            //,limit: 5 //每页默认显示的数量
                       });
                      
                   });
   
                    resolve();
            },
            error: function(){
                resolve();
            }
        });
    });
    return p;
}





 //鉴权和直播测试查询ott折线图
 function ottLine(szServer){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'get',
            url: szServer,
            dataType: 'json',
            success: function(json){
                var data=json;
                var dateList=[];
                var testList=[];
                var failuresList=[];
                var warningList=[];
                var successRate=[];
                    data.forEach(function(item){
                       dateList.push(item.CCTV1Time); 
                   });
                   
                   data.forEach(function(item){
                        var time= (item.Duration).replace("s",'');
                       testList.push(time) 
                   })
                   
                   data.forEach(function(item){
                    if(item.CompleteFlag==true){
                       failuresList.push(100); 
                    }else{
                        failuresList.push(0); 
                    }
                   })
                   
                   data.forEach(function(item){
                       if(item.OverFlag==false){
                        successRate.push(100);
                       }else{
                        successRate.push(0);
                        warningList.push(item)
                       }
                       
                   })
                   for(var i=0;i<warningList.length;i++){
                        for(var j=0; j<imgs.length;j++){
                          if(j==i){
                            warningList[i]={...warningList[i], imgurl:imgs[j]}
                          }
                        }
                    }
                   
                   var colors = ["#FFA500",'#0FC5F3','#00FA9A'];
                   //折线图显示
                   var option = {
                    // backgroundColor:'#232d36',
                    legend:{
                        data:['开机时长', '首页加载成功率', '开机成功率', ],
                        textStyle:{
                            color:'#fff',
                            align: 'left',
                        },
                        x:'left'
                    },
                    dataZoom: [
                        {
                            show: true,
                            height: 10,
                            xAxisIndex: [0],
                            bottom: 10,
                            
                            // "start": 10,
                            // "end": 80,
                            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                            handleSize: '110%',
                            handleStyle: {
                                color: "#5B3AAE",
                            },
                            textStyle:{
                                color:"rgba(204,187,225,0.5)",
                            },
                            fillerColor:"rgba(67,55,160,0.4)",
                            borderColor: "rgba(204,187,225,0.5)",
                    
                        },
                        {
                            type: 'inside',
                            xAxisIndex: 0,
                            show: true,
                            height: 15,
                        },
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '15%',
                        left: '10%',
                        right: '5%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        data: dateList,
                        axisLine: {
                          show: true, //隐藏X轴轴线
                          lineStyle: {
                            color: '#26D9FF',
                            width:2
                          }
                        },
                        axisTick: {
                          show: true //隐藏X轴刻度
                        },
                        axisLabel: {
                          show: true,
                          textStyle: {
                            color: "rgba(250,250,250,0.6)", //X轴文字颜色
                            fontSize: 12
                          }
                        },
                      },
                    
                
                    yAxis: [
                         {//第一个y轴位置在左侧
                        position:'left',
                        type : 'value',
                        offset:20,
                        name: '开机时长',
                        axisLine: {
                            lineStyle: {
                                color: colors[0],
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            margin: 20,
                            textStyle: {
                                color: colors[0],
                
                            },
                            formatter: '{value} s'
                        },
                        axisTick: {
                            show: true,
                        },
                    },
                    {//第二个y轴在右侧
                        position:'left',
                        offset:110,
                        type : 'value',
                        name: '首页加载成功率',
                        axisLine: {
                            lineStyle: {
                                color: colors[1],
                                width: 2
                            }
                        },
                        axisLabel: {
                            show: true,
                            margin: 20,
                            textStyle: {
                                color: colors[1],
                            },
                            formatter: '{value} %'
                        },
                        axisTick: {
                            show: true,
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    {//第三个y轴也在左侧，距第二个30个像素
                        position:'right',
                        type : 'value',
                        name: '开机成功率',
                        max:110,
                        min:-10,
                        axisLine: {
                            lineStyle: {
                                color: colors[2],
                                width: 2
                            }
                        },
                        axisLabel: {
                            show: true,
                            margin: 20,
                            textStyle: {
                                color: colors[2],
                            },
                            formatter: '{value} %'
                        },
                        splitLine: {
                            show: false
                        },
                    }],
                    series: [
                        {
                            name:'开机时长',
                            type: 'bar',
                            barWidth: 10,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "rgba(255,165,0, 1)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(255,165,0, 1)"
                                        }
                                    ]),
                                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "rgba(160,196,225, 1)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(255,165,0, 1)"
                                        }
                                    ]),
                                    borderWidth: 2
                                }
                            },
                            yAxisIndex:'0',
                            data:testList//data.values
                        },
                        {
                            name:'首页加载成功率',
                            type: 'line',
                            smooth:true, 
                            symbol: 'circle',
                            symbolSize: 5,
                            lineStyle: {
                                normal: {
                                    color: "#0FC5F3",
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#0FC5F3',
                                }
                            },
                            itemStyle: {
                                color: "#0FC5F3",
                                borderColor: "#0FC5F3",
                                borderWidth: 2,
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(15,197,243,1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(15,197,243,1)'
                                    }]),
                                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(180,240,255,1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(15,197,243,1)'
                                    }]),
                                    borderWidth: 2
                                }
                            },
                            yAxisIndex:'1',
                            data: failuresList//data.values
                        },
                        {
                            name:'开机成功率',
                            type: 'line',
                            smooth:true, 
                            symbol: 'circle',
                            symbolSize: 5,
                            lineStyle: {
                                normal: {
                                    color: "#00FA9A",
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#00FA9A',
                                }
                            },
                            itemStyle: {
                                color: "#00FA9A",
                                borderColor: "#00FA9A",
                                borderWidth: 2,
                            },
                            yAxisIndex:'2',
                            data: successRate//data.values
                        },
                    ]
                };  
                   var listener=echarts.init(document.getElementById('ott'));
                   listener.setOption(option);
                   chartList.push(listener);
                   
                   //动态实现table表格
                   layui.use('table', function(){
                       var table = layui.table;
                       table.render({
                           elem: '#live-ott-table',
                           height: 319,
                           cellMinWidth: 110, //全局定义常规单元格的最小宽度，
                           cols: [[ //标题栏
                               {field: 'CCTV1Status', title: 'CCTV1状态',templet:(res)=>status(res) }
                                   ,{field: 'CCTV1Time', title: 'CCTV1启动时刻',width:180 }
                                   ,{field: 'CCTV2Status', title: 'CCTV2状态',templet:(res)=>status(res) }
                                   ,{field: 'CCTV1Time', title: 'CCTV2启动时刻'}
                                   ,{field: 'CloseFlag', title: '关闭状态',templet:(res)=>status(res) }
                                   ,{field: 'CloseTime', title: '关闭时刻'}
                                   ,{field: 'CompleteFlag', title: '首页加载状态',templet:(res)=>status(res) }
                                   ,{field: 'CompleteTime', title: '首页加载时刻'}
                                   ,{field: 'Duration', title: '开机时长'}
                                   ,{field: 'OpenFlag', title: '开机状态',templet:(res)=>status(res) }
                                   ,{field: 'OpenTime', title: '开机时刻'}
                                   ,{field: 'OverFlag', title: '超时状态',templet:(res)=>status(res) }
                                   ,{field: 'OverTime', title: '超时时刻'},
                                   {
                                    field: 'imgurl',
                                    fixed:'right',
                                    title: '图片',
                                    templet:'#titleTpl1'
                                  }
                                   ]],
                           data:warningList,
                           //,skin: 'line' //表格风格
                           // even: true
                           //,page: true //是否显示分页
                           //,limits: [5, 7, 10]
                           //,limit: 5 //每页默认显示的数量
                       });
                      
                   });
   
                    resolve();
            },
            error: function(){
                resolve();
            }
        });
    });
    return p;
}





 //点播测试统计折线图
 function statisticsLine(szServer, startDate, endDate){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'get',
            url: szServer,
            dataType: 'json',
            success: function(json){
                var data=json;
                var dateList=[];
                var testList=[];
                var failuresList=[];
                var successRate=[];
                    data.forEach(function(item){
                       dateList.push(item.date); 
                   });
                   
                   data.forEach(function(item){
                       testList.push((item.testNumber)/10000) 
                   })
                   
                   data.forEach(function(item){
                       failuresList.push(item.failuresNumber); 
                   })
                   
                   data.forEach(function(item){
                       var num=((item.testNumber-item.failuresNumber)/item.testNumber).toString();
                       var rate=parseFloat(num.substring(0,num.indexOf(".")+4));
                       successRate.push(rate*100);
                   })
                   var colors = ["#FFA500",'#0FC5F3','#00FA9A'];
                   //折线图显示
                   var option = {
                       // backgroundColor:'#232d36',
                       legend:{
                           data:['测试节目总数', '测试失败节目总数', '成功率', ],
                           textStyle:{
                               color:'#fff',
                               align: 'left',
                           },
                           x:'left'
                       },
                       dataZoom: [
                           {
                               show: true,
                               height: 10,
                               xAxisIndex: [0],
                               bottom: 10,
                               
                               // "start": 10,
                               // "end": 80,
                               handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                               handleSize: '110%',
                               handleStyle: {
                                   color: "#5B3AAE",
                               },
                               textStyle:{
                                   color:"rgba(204,187,225,0.5)",
                               },
                               fillerColor:"rgba(67,55,160,0.4)",
                               borderColor: "rgba(204,187,225,0.5)",
                       
                           },
                           {
                               type: 'inside',
                               xAxisIndex: 0,
                               show: true,
                               height: 15,
                           },
                       ],
                       tooltip: {
                           trigger: 'axis',
                           axisPointer: {
                               lineStyle: {
                                   color: {
                                       type: 'linear',
                                       x: 0,
                                       y: 0,
                                       x2: 0,
                                       y2: 1,
                                       colorStops: [{
                                           offset: 0,
                                           color: 'rgba(0, 255, 233,0)'
                                       }, {
                                           offset: 0.5,
                                           color: 'rgba(255, 255, 255,1)',
                                       }, {
                                           offset: 1,
                                           color: 'rgba(0, 255, 233,0)'
                                       }],
                                       global: false
                                   }
                               },
                           },
                       },
                       grid: {
                           top: '15%',
                           left: '10%',
                           right: '5%',
                           bottom: '15%',
                           containLabel: true
                       },
                       xAxis: {
                           data: dateList,
                           axisLine: {
                             show: true, //隐藏X轴轴线
                             lineStyle: {
                               color: '#26D9FF',
                               width:2
                             }
                           },
                           axisTick: {
                             show: true //隐藏X轴刻度
                           },
                           axisLabel: {
                             show: true,
                             textStyle: {
                               color: "rgba(250,250,250,0.6)", //X轴文字颜色
                               fontSize: 12
                             }
                           },
                         },
                       
                   
                       yAxis: [
                            {//第一个y轴位置在左侧
                           position:'left',
                           type : 'value',
                           offset:20,
                           name: '测试节目总数',
                           axisLine: {
                               lineStyle: {
                                   color: colors[0],
                                   width: 2
                               }
                           },
                           splitLine: {
                               show: false
                           },
                           axisLabel: {
                               show: true,
                               margin: 20,
                               textStyle: {
                                   color: colors[0],
                   
                               },
                               formatter: '{value} 万'
                           },
                           axisTick: {
                               show: true,
                           },
                       },
                       {//第二个y轴在右侧
                           position:'left',
                           offset:110,
                           max:10000,
                           type : 'value',
                           name: '测试失败节目总数',
                           axisLine: {
                               lineStyle: {
                                   color: colors[1],
                                   width: 2
                               }
                           },
                           axisLabel: {
                               show: true,
                               margin: 20,
                               textStyle: {
                                   color: colors[1],
                               },
                           },
                           axisTick: {
                               show: true,
                           },
                           splitLine: {
                               show: false
                           },
                       },
                       {//第三个y轴也在左侧，距第二个30个像素
                           position:'right',
                           type : 'value',
                           name: '成功率',
                           min:95,
                           axisLine: {
                               lineStyle: {
                                   color: colors[2],
                                   width: 2
                               }
                           },
                           axisLabel: {
                               show: true,
                               margin: 20,
                               textStyle: {
                                   color: colors[2],
                               },
                               formatter: '{value} %'
                           },
                           splitLine: {
                               show: false
                           },
                       }],
                       series: [
                           {
                               name:'测试节目总数',
                               type: 'bar',
                               barWidth: 10,
                               itemStyle: {
                                   normal: {
                                       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                               offset: 0,
                                               color: "rgba(255,165,0, 1)"
                                           },
                                           {
                                               offset: 1,
                                               color: "rgba(255,165,0, 1)"
                                           }
                                       ]),
                                       borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                               offset: 0,
                                               color: "rgba(160,196,225, 1)"
                                           },
                                           {
                                               offset: 1,
                                               color: "rgba(255,165,0, 1)"
                                           }
                                       ]),
                                       borderWidth: 2
                                   }
                               },
                               yAxisIndex:'0',
                               data:testList//data.values
                           },
                           {
                               name:'测试失败节目总数',
                               type: 'bar',
                               barWidth: 10,
                               itemStyle: {
                                   normal: {
                                       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                           offset: 0,
                                           color: 'rgba(15,197,243,1)'
                                       }, {
                                           offset: 1,
                                           color: 'rgba(15,197,243,1)'
                                       }]),
                                       borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                           offset: 0,
                                           color: 'rgba(180,240,255,1)'
                                       }, {
                                           offset: 1,
                                           color: 'rgba(15,197,243,1)'
                                       }]),
                                       borderWidth: 2
                                   }
                               },
                               yAxisIndex:'1',
                               data: failuresList//data.values
                           },
                           {
                               name:'成功率',
                               type: 'line',
                               smooth:true, 
                               symbol: 'circle',
                               symbolSize: 5,
                               lineStyle: {
                                   normal: {
                                       color: "#00FA9A",
                                   },
                               },
                               label: {
                                   show: true,
                                   position: 'top',
                                   textStyle: {
                                       color: '#00FA9A',
                                   }
                               },
                               itemStyle: {
                                   color: "#00FA9A",
                                   borderColor: "#00FA9A",
                                   borderWidth: 2,
                               },
                               yAxisIndex:'2',
                               data: successRate//data.values
                           },
                       ]
                   }; 
                   var listener=echarts.init(document.getElementById('statistics'));
                   listener.setOption(option);
                   chartList.push(listener);
                   
                   //动态实现table表格
                   layui.use('table', function(){
                       var table = layui.table;
                       
                       //展示已知数据
                       table.render({
                           elem: '#iptv-table',
                           height: 319,
                           cellMinWidth: 249, //全局定义常规单元格的最小宽度，
                           cols: [[ //标题栏
                               {field: 'date', title: '日期'}
                                   ,{field: 'testNumber', title: '所有测试节目总数'}
                                   ,{field: 'failuresNumber', title: '测试失败节目总数'}
                                   ]],
                           data:data
                           //,skin: 'line' //表格风格
                           // even: true
                           //,page: true //是否显示分页
                           //,limits: [5, 7, 10]
                           //,limit: 5 //每页默认显示的数量
                       });
                      table.on('row(test)',function(obj){
                          var rowData=obj.data;
                        //   debugger
                          console.log(rowData);
                      })
                   });
                 
                    resolve();
            },
            error: function(){
                resolve();
            }
        });
    });
    return p;
}



 //点播测试失败表格
 function statisticsFailTable(szServer, startDate, endDate){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'get',
            url: szServer,
            dataType: 'json',
            success: function(json){
                   
                   //动态实现table表格
                     layui.use('table', function(){
                        var table = layui.table;
                        
                        
                        table.render({
                        elem: '#lost-table',
                        height: 319,
                        cellMinWidth: 120, //全局定义常规单元格的最小宽度，
                        data:datafail,
                        cols: [[ //表头
                            {field: 'date', title: '日期' },
                            {field: 'time', title: '时间'},
                            {field: 'one', title: '一级菜单' },
                            {field: 'two', title: '二级菜单'} ,
                            {field: 'order', title: '菜单序号' },
                            {field: 'program', title: '节目名称'},
                            {field: '1', title: '节目序号'},
                            {field: '11413090', title: '节目ID'},
                            {field: 'result', title: '测试结果'}
                        ]]
                        });
                    });

                    resolve();
            },
            error: function(){
                resolve();
            }
        });
    });
    return p;
}

 //点播测试统计总表搜索框
 function statisticsSearch(szServer, startDate, endDate){
    var p = new Promise(function(resolve, reject){
        $.ajax({
            type: 'post',
            url: szServer,
            dataType: 'text',
            success: function(json){
                var datas1 = [{id:'IPTV',text:'IPTV'},{id:'OTT',text:'OTT'}]
                var datas2 = [{id:'1',text:'极光'},{id:'2',text:'华研'},{id:'3',text:'广电'}]
                var datas3 = [{id:'1',text:'最近8小时'},{id:'2',text:'最近1天'},{id:'3',text:'最近1周'},{id:'3',text:'最近1周'},{id:'4',text:'最近3个月'}]
                layui.use(['form'], function () {
                    var form = layui.form,
                        layer = layui.layer
                        selectUtil1.render({
                            id: 'statistics_company_select',
                            data: datas1
                        });
                        selectUtil1.render({
                            id: 'statistics_channel_select',
                            data: datas2
                        });
                        selectUtil2.render({
                            id: 'statistics_time_select',
                            data: datas3
                        });
                })
                resolve();
            },
            error: function(){
                resolve();
            }
        });
    });
    return p;
}

 // 动态实现Layui下拉框工具方法
 var selectUtil1 = {
    render: function (param) {
        var $ = layui.$,
            form = layui.form;
        var id = param.id,
            prop = param.prop || {
                id: 'id',
                text: 'text'
            },
            datas = param.data || [];
        var $select = $('#' + id);
        //重置下拉框
        $select.empty();
        $.each(datas, function (index, item) {
            var $option = $('<option value="' + item[prop.id] + '">' + item[prop.text] +
                '</option>');
            $select.append($option);
        });
        form.render('select');
    }
}
var selectUtil2 = {
    render: function (param) {
        var $ = layui.$,
            form = layui.form;
        var id = param.id,
            prop = param.prop || {
                id: 'id',
                text: 'text'
            },
            datas = param.data || [];
        var $select = $('#' + id);
        //重置下拉框
        $select.empty();
        $select.append('<option value="">默认全部</option>');
        $.each(datas, function (index, item) {
            var $option = $('<option value="' + item[prop.id] + '">' + item[prop.text] +
                '</option>');
            $select.append($option);
        });
        form.render('select');
    }
}

//Tab的切换功能，切换事件监听等，需要依赖element模块
layui.use('element', function(){
    var $ = layui.jquery;
    var element = layui.element;
    element.on('tab(demo)', function(elem){
        var colors = ["#FFA500",'#0FC5F3','#00FA9A'];
        //折线图显示
        var listener=echarts.init(document.getElementById('statistics'));
        listener.resize();
        var iptvUe1 = echarts.init(document.getElementById('ott'));
        iptvUe1.resize();
        var iptvUe = echarts.init(document.getElementById('iptv'));
        iptvUe.resize();
    });
})


//日期范围选择器
layui.use('laydate', function(){
    var laydate = layui.laydate;
    //日期范围
    laydate.render({
        elem: '#iptv-date'
        ,range: true,
        trigger: 'click'
    });
    laydate.render({
        elem: '#ott-date'
        ,range: true,
        trigger: 'click'
    });
})

window.onresize=function(){
    chartList.forEach(function(item){
        item.resize();
    });
}
  



})();