(function(){

    //公共请求方法
    async function func(szServer, startDate, endDate){
        await ottSearchTop(szServer, startDate, endDate); //质量劣化历史详情ott搜索框
        await ottHaiwei(szServer, startDate, endDate); //华为平台折线图
        await ottFenghuo(szServer, startDate, endDate); //烽火平台折线图
        await ottZhongxing(szServer, startDate, endDate); //中兴平台折线图
        await ottHangyan(szServer, startDate, endDate); //杭研平台折线图
    }

    var startDate = getDate(0);//前n天的日期
    var endDate = getDate(0, 2);//当前天的日期 后2分钟
    func('http://192.168.77.175:8081/Alarm/QualityAlarm', startDate, endDate);
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
    //质量劣化历史详情ott搜索框
    function ottSearchTop(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var arrCompanyPos = [];
                    var szCompanyColor;
                    json = eval('(' + json + ')');
                    var dataSrc = json['Alarms'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    mapAddrData = [];
                    dataSrc.forEach(function(item, index){
                        var szAddr = item['ServerName'];
                        var fNum = item['AlarmNum'];
                        /*{min: 0, max: 20, label: '0-20', color: colors[0]},
                         {min: 20, max: 40, label: '20-40', color: colors[1]},
                         {min: 40, max: 60, label: '40-60', color: colors[2]},
                         {min: 60, max: 80, label: '60-80', color: colors[3]},
                         {min: 80, max: 100, label: '80-100', color: colors[4]},
                         {min: 100, label: '其他', color: colors[5]}*/
                        var strColor = getColor(fNum);
                        if(szAddr == "区公司"){
                            arrCompanyPos = [item['Lon'], item['Lat']];
                            szCompanyColor = strColor;
                        }
                        mapAddrData.push({
                            name: transAddr(szAddr),
                            //value: fNum,
                            itemStyle: {
                                normal: {
                                    areaColor: strColor,
                                    borderColor: '#edce00'
                                }
                            }
                        });
                    });
                },
                error: function(){
                    var datas1 = [{id:'1',text:'省公司广电入口'},{id:'2',text:'OTT'}]
                    var datas2 = [{id:'1',text:'省公司'},{id:'2',text:'乌海市'},{id:'3',text:'赤峰市'}]
                    var datas3 = [{id:'1',text:'最近8小时'},{id:'2',text:'最近1天'},{id:'3',text:'最近1周'},{id:'3',text:'最近1周'},{id:'4',text:'最近1个月'}]
                   //华为平台
                    layui.use(['form'], function () {
                        var form = layui.form,
                            layer = layui.layer
                            selectUtil1.render({
                                id: 'hw_company_select',
                                data: datas2
                            });
                            selectUtil2.render({
                                id: 'hw_channel_select',
                                data: datas1
                            });
                            selectUtil3.render({
                                id: 'hw_time_select',
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
                    //烽火平台
                    layui.use(['form'], function () {
                        var form = layui.form,
                            layer = layui.layer
                            selectUtil1.render({
                                id: 'fh_company_select',
                                data: datas2
                            });
                            selectUtil2.render({
                                id: 'fh_channel_select',
                                data: datas1
                            });
                            selectUtil3.render({
                                id: 'fh_time_select',
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
                    //中兴平台
                    layui.use(['form'], function () {
                        var form = layui.form,
                            layer = layui.layer
                            selectUtil1.render({
                                id: 'zx_company_select',
                                data: datas2
                            });
                            selectUtil2.render({
                                id: 'zx_channel_select',
                                data: datas1
                            });
                            selectUtil3.render({
                                id: 'zx_time_select',
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
                    //杭研平台
                    layui.use(['form'], function () {
                        var form = layui.form,
                            layer = layui.layer
                            selectUtil1.render({
                                id: 'hy_company_select',
                                data: datas2
                            });
                            selectUtil2.render({
                                id: 'hy_channel_select',
                                data: datas1
                            });
                            selectUtil3.render({
                                id: 'hy_time_select',
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
                }
            });
        });
        return p;
    }
   
    //华为平台折线图
    function ottHaiwei(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var arrCompanyPos = [];
                    var szCompanyColor;
                    json = eval('(' + json + ')');
                    var dataSrc = json['Alarms'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    mapAddrData = [];
                    dataSrc.forEach(function(item, index){
                        var szAddr = item['ServerName'];
                        var fNum = item['AlarmNum'];
                        /*{min: 0, max: 20, label: '0-20', color: colors[0]},
                         {min: 20, max: 40, label: '20-40', color: colors[1]},
                         {min: 40, max: 60, label: '40-60', color: colors[2]},
                         {min: 60, max: 80, label: '60-80', color: colors[3]},
                         {min: 80, max: 100, label: '80-100', color: colors[4]},
                         {min: 100, label: '其他', color: colors[5]}*/
                        var strColor = getColor(fNum);
                        if(szAddr == "区公司"){
                            arrCompanyPos = [item['Lon'], item['Lat']];
                            szCompanyColor = strColor;
                        }
                        mapAddrData.push({
                            name: transAddr(szAddr),
                            //value: fNum,
                            itemStyle: {
                                normal: {
                                    areaColor: strColor,
                                    borderColor: '#edce00'
                                }
                            }
                        });
                    });
                    resolve();
                },
                error: function(){
                     //折线图显示
                    var option = {
                        // backgroundColor:'#232d36',
                        title: {
                            left: 'center',
                            text: '华为平台',
                            top: 20,
                            textStyle : {
                                color : '#ffffff',
                                fontSize: 16,
                            }
                        },
                        legend:{
                            data:['EPG认证成功率', 'EPG界面达标率', '直播达标率', ],
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
                                show: true,
                                width: 10,
                                yAxisIndex: [0],
                                rigth: 10, 
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
                            {
                                type: 'inside',
                                yAxisIndex: 0,
                                show: true,
                                height: 15,
                            }
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
                            top: '22%',
                            left: '10%',
                            right: '5%',
                            bottom: '15%',
                            // containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLine: {
                                show: false,
                                color:'#A582EA'
                            },
                        
                            axisLabel: {
                                color: '#A582EA',
                                width:100
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: ["2020-06-21","2020-06-22","2020-06-23","2020-06-24","2020-06-25","2020-06-26","2020-06-27"]//this.$moment(data.times).format("HH-mm") ,
                    
                        }],
                    
                        yAxis: [{
                            type: 'value',
                            min: 0,
                            // max: 140,
                            splitNumber: 4,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#00BFF3',
                                    opacity:0.23
                                }
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                margin: 20,
                                textStyle: {
                                    color: '#fff',
                    
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        }],
                        series: [
                            {
                                name:'EPG认证成功率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#A582EA",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#A582EA',
                                    }
                                },
                                itemStyle: {
                                    color: "#A582EA",
                                    borderColor: "#A582EA",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(43,193,145,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(43,193,145,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [4,7,5,4,3,5,8]//data.values
                            },
                            {
                                name:'EPG界面达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#00ca95",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#00ca95',
                                    }
                                },
                                itemStyle: {
                                    color: "#00ca95",
                                    borderColor: "#00ca95",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(0,202,149,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0,202,149,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [3,5,6,8,3,4,7]//data.values
                            },
                            {
                                name:'直播达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#2CABE3",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#2CABE3',
                                    }
                                },
                                itemStyle: {
                                    color: "#2CABE3",
                                    borderColor: "#2CABE3",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(81,150,164,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(81,150,164,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [5,6,4,2,1,7,6]//data.values
                            },
                        ]
                    };
                    var iptvLineBottom = echarts.init(document.getElementById('hw'));
                    iptvLineBottom.setOption(option);
                    chartList.push(iptvLineBottom);
                    resolve();
                }
            });
        });
        return p;
    }
 
    //烽火平台折线图
    function ottFenghuo(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var arrCompanyPos = [];
                    var szCompanyColor;
                    json = eval('(' + json + ')');
                    var dataSrc = json['Alarms'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    mapAddrData = [];
                    dataSrc.forEach(function(item, index){
                        var szAddr = item['ServerName'];
                        var fNum = item['AlarmNum'];
                        /*{min: 0, max: 20, label: '0-20', color: colors[0]},
                         {min: 20, max: 40, label: '20-40', color: colors[1]},
                         {min: 40, max: 60, label: '40-60', color: colors[2]},
                         {min: 60, max: 80, label: '60-80', color: colors[3]},
                         {min: 80, max: 100, label: '80-100', color: colors[4]},
                         {min: 100, label: '其他', color: colors[5]}*/
                        var strColor = getColor(fNum);
                        if(szAddr == "区公司"){
                            arrCompanyPos = [item['Lon'], item['Lat']];
                            szCompanyColor = strColor;
                        }
                        mapAddrData.push({
                            name: transAddr(szAddr),
                            //value: fNum,
                            itemStyle: {
                                normal: {
                                    areaColor: strColor,
                                    borderColor: '#edce00'
                                }
                            }
                        });
                    });
                    resolve();
                },
                error: function(){
                      //折线图显示
                      var option = {
                        title: {
                            left: 'center',
                            text: '烽火平台',
                            top: 20,
                            textStyle : {
                                color : '#ffffff',
                                fontSize: 16,
                            }
                        },
                        legend:{
                            data:['EPG认证成功率', 'EPG界面达标率', '直播达标率', ],
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
                                show: true,
                                width: 10,
                                yAxisIndex: [0],
                                rigth: 10, 
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
                            {
                                type: 'inside',
                                yAxisIndex: 0,
                                show: true,
                                height: 15,
                            }
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
                            top: '22%',
                            left: '10%',
                            right: '5%',
                            bottom: '15%',
                            // containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLine: {
                                show: false,
                                color:'#A582EA'
                            },
                        
                            axisLabel: {
                                color: '#A582EA',
                                width:100
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: ["2020-06-21","2020-06-22","2020-06-23","2020-06-24","2020-06-25","2020-06-26","2020-06-27"]//this.$moment(data.times).format("HH-mm") ,
                    
                        }],
                    
                        yAxis: [{
                            type: 'value',
                            min: 0,
                            // max: 140,
                            splitNumber: 4,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#00BFF3',
                                    opacity:0.23
                                }
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                margin: 20,
                                textStyle: {
                                    color: '#fff',
                    
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        }],
                        series: [
                            {
                                name:'EPG认证成功率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#A582EA",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#A582EA',
                                    }
                                },
                                itemStyle: {
                                    color: "#A582EA",
                                    borderColor: "#A582EA",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(43,193,145,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(43,193,145,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [4,7,5,4,3,5,8]//data.values
                            },
                            {
                                name:'EPG界面达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#00ca95",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#00ca95',
                                    }
                                },
                                itemStyle: {
                                    color: "#00ca95",
                                    borderColor: "#00ca95",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(0,202,149,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0,202,149,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [3,5,6,8,3,4,7]//data.values
                            },
                            {
                                name:'直播达标率',
                                type: 'line',
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                smooth:true, 
                                lineStyle: {
                                    normal: {
                                        color: "#2CABE3",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#2CABE3',
                                    }
                                },
                                itemStyle: {
                                    color: "#2CABE3",
                                    borderColor: "#2CABE3",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(81,150,164,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(81,150,164,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [5,6,4,2,1,7,6]//data.values
                            },
                        ]
                    };
                    var iptvLineBottom = echarts.init(document.getElementById('fh'));
                    iptvLineBottom.setOption(option);
                    chartList.push(iptvLineBottom);
                    resolve();
                }
            });
        });
        return p;
    }
    //中兴平台折线图
    function ottZhongxing(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var arrCompanyPos = [];
                    var szCompanyColor;
                    json = eval('(' + json + ')');
                    var dataSrc = json['Alarms'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    mapAddrData = [];
                    dataSrc.forEach(function(item, index){
                        var szAddr = item['ServerName'];
                        var fNum = item['AlarmNum'];
                        /*{min: 0, max: 20, label: '0-20', color: colors[0]},
                         {min: 20, max: 40, label: '20-40', color: colors[1]},
                         {min: 40, max: 60, label: '40-60', color: colors[2]},
                         {min: 60, max: 80, label: '60-80', color: colors[3]},
                         {min: 80, max: 100, label: '80-100', color: colors[4]},
                         {min: 100, label: '其他', color: colors[5]}*/
                        var strColor = getColor(fNum);
                        if(szAddr == "区公司"){
                            arrCompanyPos = [item['Lon'], item['Lat']];
                            szCompanyColor = strColor;
                        }
                        mapAddrData.push({
                            name: transAddr(szAddr),
                            //value: fNum,
                            itemStyle: {
                                normal: {
                                    areaColor: strColor,
                                    borderColor: '#edce00'
                                }
                            }
                        });
                    });
                    resolve();
                },
                error: function(){
                     //折线图显示
                     var option = {
                        // backgroundColor:'#232d36',
                        title: {
                            left: 'center',
                            text: '中兴平台',
                            top: 20,
                            textStyle : {
                                color : '#ffffff',
                                fontSize: 16,
                            }
                        },
                        legend:{
                            data:['EPG认证成功率', 'EPG界面达标率', '直播达标率', ],
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
                                show: true,
                                width: 10,
                                yAxisIndex: [0],
                                rigth: 10, 
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
                            {
                                type: 'inside',
                                yAxisIndex: 0,
                                show: true,
                                height: 15,
                            }
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
                            top: '22%',
                            left: '10%',
                            right: '5%',
                            bottom: '15%',
                            // containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLine: {
                                show: false,
                                color:'#A582EA'
                            },
                        
                            axisLabel: {
                                color: '#A582EA',
                                width:100
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: ["2020-06-21","2020-06-22","2020-06-23","2020-06-24","2020-06-25","2020-06-26","2020-06-27"]//this.$moment(data.times).format("HH-mm") ,
                    
                        }],
                    
                        yAxis: [{
                            type: 'value',
                            min: 0,
                            // max: 140,
                            splitNumber: 4,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#00BFF3',
                                    opacity:0.23
                                }
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                margin: 20,
                                textStyle: {
                                    color: '#fff',
                    
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        }],
                        series: [
                            {
                                name:'EPG认证成功率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#A582EA",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#A582EA',
                                    }
                                },
                                itemStyle: {
                                    color: "#A582EA",
                                    borderColor: "#A582EA",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(43,193,145,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(43,193,145,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [4,7,5,4,3,5,8]//data.values
                            },
                            {
                                name:'EPG界面达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#00ca95",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#00ca95',
                                    }
                                },
                                itemStyle: {
                                    color: "#00ca95",
                                    borderColor: "#00ca95",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(0,202,149,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0,202,149,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [3,5,6,8,3,4,7]//data.values
                            },
                            {
                                name:'直播达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#2CABE3",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#2CABE3',
                                    }
                                },
                                itemStyle: {
                                    color: "#2CABE3",
                                    borderColor: "#2CABE3",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(81,150,164,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(81,150,164,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [5,6,4,2,1,7,6]//data.values
                            },
                        ]
                    };
                    var iptvLineBottom = echarts.init(document.getElementById('zx'));
                    iptvLineBottom.setOption(option);
                    chartList.push(iptvLineBottom);
                    resolve();
                }
            });
        });
        return p;
    }
    //杭研平台折线图
    function ottHangyan(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer,
                dataType: 'text',
                success: function(json){
                    var arrCompanyPos = [];
                    var szCompanyColor;
                    json = eval('(' + json + ')');
                    var dataSrc = json['Alarms'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    mapAddrData = [];
                    dataSrc.forEach(function(item, index){
                        var szAddr = item['ServerName'];
                        var fNum = item['AlarmNum'];
                        /*{min: 0, max: 20, label: '0-20', color: colors[0]},
                         {min: 20, max: 40, label: '20-40', color: colors[1]},
                         {min: 40, max: 60, label: '40-60', color: colors[2]},
                         {min: 60, max: 80, label: '60-80', color: colors[3]},
                         {min: 80, max: 100, label: '80-100', color: colors[4]},
                         {min: 100, label: '其他', color: colors[5]}*/
                        var strColor = getColor(fNum);
                        if(szAddr == "区公司"){
                            arrCompanyPos = [item['Lon'], item['Lat']];
                            szCompanyColor = strColor;
                        }
                        mapAddrData.push({
                            name: transAddr(szAddr),
                            //value: fNum,
                            itemStyle: {
                                normal: {
                                    areaColor: strColor,
                                    borderColor: '#edce00'
                                }
                            }
                        });
                    });
                    resolve();
                },
                error: function(){
                    //折线图显示
                    var option = {
                        // backgroundColor:'#232d36',
                        title: {
                            left: 'center',
                            text: '杭研平台',
                            top: 20,
                            textStyle : {
                                color : '#ffffff',
                                fontSize: 16,
                            }
                        },
                        legend:{
                            data:['EPG认证成功率', 'EPG界面达标率', '直播达标率', ],
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
                                show: true,
                                width: 10,
                                yAxisIndex: [0],
                                rigth: 10, 
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
                            {
                                type: 'inside',
                                yAxisIndex: 0,
                                show: true,
                                height: 15,
                            }
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
                            top: '22%',
                            left: '10%',
                            right: '5%',
                            bottom: '15%',
                            // containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLine: {
                                show: false,
                                color:'#A582EA'
                            },
                        
                            axisLabel: {
                                color: '#A582EA',
                                width:100
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: ["2020-06-21","2020-06-22","2020-06-23","2020-06-24","2020-06-25","2020-06-26","2020-06-27"]//this.$moment(data.times).format("HH-mm") ,
                    
                        }],
                    
                        yAxis: [{
                            type: 'value',
                            min: 0,
                            // max: 140,
                            splitNumber: 4,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#00BFF3',
                                    opacity:0.23
                                }
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                margin: 20,
                                textStyle: {
                                    color: '#fff',
                    
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        }],
                        series: [
                            {
                                name:'EPG认证成功率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#A582EA",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#A582EA',
                                    }
                                },
                                itemStyle: {
                                    color: "#A582EA",
                                    borderColor: "#A582EA",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(43,193,145,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(43,193,145,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [4,7,5,4,3,5,8]//data.values
                            },
                            {
                                name:'EPG界面达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#00ca95",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#00ca95',
                                    }
                                },
                                itemStyle: {
                                    color: "#00ca95",
                                    borderColor: "#00ca95",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(0,202,149,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0,202,149,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [3,5,6,8,3,4,7]//data.values
                            },
                            {
                                name:'直播达标率',
                                type: 'line',
                                smooth:true, 
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#2CABE3",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#2CABE3',
                                    }
                                },
                                itemStyle: {
                                    color: "#2CABE3",
                                    borderColor: "#2CABE3",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(81,150,164,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(81,150,164,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: [5,6,4,2,1,7,6]//data.values
                            },
                        ]
                    };
                    var iptvLineBottom = echarts.init(document.getElementById('hy'));
                    iptvLineBottom.setOption(option);
                    chartList.push(iptvLineBottom);
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
            // $select.append('<option value="">所有CDN</option>');
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
            // $select.append('<option value="">所有频道</option>');
            $.each(datas, function (index, item) {
                var $option = $('<option value="' + item[prop.id] + '">' + item[prop.text] +
                    '</option>');
                $select.append($option);
            });
            form.render('select');
        }
    }
    var selectUtil3 = {
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


    window.onresize=function(){
        chartList.forEach(function(item){
            item.resize();
        });
   }
})();