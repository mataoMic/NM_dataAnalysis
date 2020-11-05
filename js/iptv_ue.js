
document.write("<script language=javascript src='/js/constant.js'></script>");
(function(){
    //公共请求方法
    async function func(startDate, endDate){
        await ipTvLine(API,startDate,endDate); //鉴权和直播测试查询IPTV折线图
        await ottLine(API, startDate, endDate); //鉴权和直播测试查询ott折线图
        await ipTVSearch(API, startDate, endDate); //鉴权和直播测试查询IPTV搜索框
        await ottSearch(API, startDate, endDate); //鉴权和直播测试查询ott搜索框
        await statisticsSearch(API, startDate, endDate); //点播测试统计总表搜索框
        await statisticsLine(API, startDate, endDate); //点播测试统计总表折线图
    }

    var startDate = getDate(0);//前n天的日期
    var endDate = getDate(-6085);//当前天的日期 后2分钟
    func(startDate, endDate);
    //图标数据
    var chartList=[];
   
    //获取日期，num为负数表示获取前n天的日期,0为今天的日期,正数为后n天的日期，minutes当前时间加minutes
    function getDate(num, minutes){
        num = num || 0;
        minutes = minutes || 0;
        var time= new Date().getTime() + num*24*60*60*1000;
        var date = new Date(time);
        var szYear = date.getFullYear();
        var szMonth = (date.getMonth() + 1).toString();
        szMonth = szMonth.length == 1 ? ("0" + szMonth) : szMonth;
        var szDate = (date.getDate()).toString();
        szDate = szDate.length == 1 ? ("0" + szDate) : szDate;
        var szHours = (date.getHours()).toString();
        szHours = szHours.length == 1 ? ("0" + szHours) : szHours;
        var szMinutes = (date.getMinutes()).toString();
        date.setMinutes(parseInt(szMinutes) + minutes);
        szMinutes = (date.getMinutes()).toString();
        szMinutes = szMinutes.length == 1 ? ("0" + szMinutes) : szMinutes;
        var szSeconds = (date.getSeconds()).toString();
        szSeconds = szSeconds.length == 1 ? ("0" + szSeconds) : szSeconds;
        return szYear + "年" + szMonth + "月" + szDate + "日"+ szHours + ":" + szMinutes + ":" + szSeconds;
    }
    //鉴权和直播测试查询IPTV折线图
    function ipTvLine(szServer,startDate,endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer+'/Alarm/DegradeSimulationList?StartTime='+startDate+'&EndTime='+endDate+'&SelectedChannelType=0',
                dataType: 'text',
                success: function(json){
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
                           data: dateList1,
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
                               data:testList1//data.values
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
                               data: failuresList1//data.values
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
                               data: successRate1//data.values
                           },
                       ]
                   };
                   var iptvUe = echarts.init(document.getElementById('iptv'));
                   iptvUe.setOption(option);
                   chartList.push(iptvUe);
                   
                    resolve();
                },
                error: function(){
                   
                    resolve();
                }
            });
        });
        return p;
    }
    //鉴权和直播测试查询OTT折线图
    function ottLine(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
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
                    var iptvUe1 = echarts.init(document.getElementById('ott'));
                    iptvUe1.setOption(option);
                    chartList.push(iptvUe1);
                    resolve();
                },
                error: function(){
                   
                    resolve();
                }
            });
        });
        return p;
    }
    //鉴权和直播测试查询IPTV搜索框
    function ipTVSearch(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var datas1 = [{id:'1',text:'IPTV'},{id:'2',text:'OTT'}]
                    var datas2 = [{id:'1',text:'极光'},{id:'2',text:'华研'},{id:'3',text:'广电'}]
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
                            selectUtil2.render({
                                id: 'iptv_time_select',
                                data: datas3
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
                    var datas2 = [{id:'1',text:'百事通'},{id:'2',text:'华研'},{id:'3',text:'广电'}]
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
                            selectUtil2.render({
                                id: 'ott_time_select',
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
    //点播测试统计总表搜索框
    function statisticsSearch(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var datas1 = [{id:'1',text:'IPTV'},{id:'2',text:'OTT'}]
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
    //点播测试统计总表折线图
    function statisticsLine(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                  
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
  
    
   window.onresize=function(){
        chartList.forEach(function(item){
            item.resize();
        });
   }
  
})();