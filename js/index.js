$(function(){
    var channelSafeHandler;
    var nSynmobSize = 40;
    var colors = ['#EE7942', '#EE4000', '#4876FF', '#EEEE00','#EEB422', '#00ff00'];
    var mapAddrData = [
        {name:'包头市',
            itemStyle: {
                normal: {
                    areaColor: colors[0],
                    borderColor: '#edce00'
                }
            }
        },
        {name:'呼伦贝尔市',
            itemStyle: {
                normal: {
                    areaColor: colors[1],
                    borderColor: '#edce00'
                }
            }
        },
        {name:'兴安盟',
            itemStyle: {
                normal: {
                    areaColor: colors[2],
                    borderColor: '#0abcee'
                }
            }
        },
        {name:'通辽市',
            itemStyle: {
                normal: {
                    areaColor: colors[3],
                    borderColor: '#1ca9f2'
                }
            }
        },
        {name:'锡林郭勒盟',
            itemStyle: {
                normal: {
                    areaColor: colors[4],
                    borderColor: '#88ddf5'
                }
            }
        },
        {name:'赤峰市',
            itemStyle: {
                normal: {
                    areaColor: colors[5],
                    borderColor: '#45b5ef'
                }
            }
        },
        {name:'乌兰察布市',
            itemStyle: {
                normal: {
                    areaColor: colors[0],
                    borderColor: '#45b5ef'
                }
            }
        },
        {name:'呼和浩特市',
            itemStyle: {
                normal: {
                    areaColor: colors[1],
                    borderColor: '#45b5ef'
                }
            },
            label: {
                show: true,
                position: [1000, 1000],
                align: 'bottom',
                rich: {
                    a: {
                        align: 'bottom'
                        // 没有设置 `align`，则 `align` 为 right
                    }
                }
            }
        },
        {name:'巴彦淖尔市',
            itemStyle: {
                normal: {
                    areaColor: colors[2],
                    borderColor: '#45b5ef'
                }
            }
        },
        {name:'临沂市',
            itemStyle: {
                normal: {
                    areaColor: colors[3],
                    borderColor: '#45b5ef'
                }
            }
        },
        {name:'鄂尔多斯市',
            itemStyle: {
                normal: {
                    areaColor: colors[4],
                    borderColor: '#1ca9f2'
                }
            }
        },
        {name:'乌海市',
            itemStyle: {
                normal: {
                    areaColor: colors[5],
                    borderColor: '#88ddf5'
                }
            }
        },
        {name:'阿拉善盟',
            itemStyle: {
                normal: {
                    areaColor: colors[5],
                    borderColor: '#88ddf5'
                }
            }
        }
    ];
    async function func(szServer, startDate, endDate){
        //startDate = "2010年01月01日";
        //endDate = "2021年01月01日";
        await iptvFeeling(szServer, startDate, endDate);//IPTV用户体验
        await ottFeeling(szServer, startDate, endDate);//OTT用户体验
        await iptvQulity(szServer, startDate, endDate);//IPTV质量监测
        await ottQulity(szServer, startDate, endDate);//OTT质量监测
        await contentHealth(szServer, startDate, endDate);//内容健康
        await channelSafeIPTV(szServer, startDate, endDate);//频道安全防篡改IPTV
        await channelSafeOTT(szServer, startDate, endDate);//频道安全防篡改OTT
        await transQulityAlarm(szServer, startDate, endDate); //传输质量报警信息
        await mapAlarm(szServer, startDate, endDate); //地图报警
        await areaPercent(szServer, startDate, endDate); //地区百分比
    }
    var startDate = getDate(0);//前n天的日期
    var endDate = getDate(0, 2);//当前天的日期 后2分钟
    func('http://192.168.77.175:8081', startDate, endDate);
    function transQulityAlarm(szServer, startDate, endDate){//传输质量报警信息
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/QualityAlarm?StartTime=2014年01月01日&EndTime=2020年05月19日",
                success: function(json){
                    var dataSrc = json['Alarms'];
                    if(!(dataSrc instanceof Array)){
                        return;
                    }
                    if(!dataSrc.length) return;
                    var alarmData = [];
                    dataSrc.forEach(function(item){
                        var szAlarmLevel = emptyToStr(item["Level"]);
                        var szChannelName = emptyToStr(item["ChannelName"]);
                        var szAlarmAddr = emptyToStr(item["AlarmZone"]);
                        var szAlarmTime = emptyToStr(item["AlarmTime"]);
                        var szAlarmValue = emptyToStr(item["CautionValue"]);
                        var nKeepTime = emptyToStr(item["ContinuedMilliseconds"]);
                        alarmData.push({
                            alarmLevel: szAlarmLevel,
                            channelName: szChannelName,
                            alarmAddr: szAlarmAddr,
                            alarmTime: timeStampToDate(szAlarmTime),
                            alarmValue: szAlarmValue,
                            keepTime: nKeepTime
                        });
                    });
                    alarmTable.addJsonData(alarmData);
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    function emptyToStr(val){
        return (val == undefined ? "" : val).toString();
    }
    //IPTV用户体验
    function iptvFeeling(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/DegradeSimulation?StartTime="+startDate+"&EndTime="+endDate+"&SelectedChannelType=0",
                dataType: 'text',
                success: function(json){
                    var json = eval('(' + json + ')');
                    var dataSrc = json['Datas'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    var datas = dataSrc[0];
                    var iptvSrc = [{
                        index: 0,
                        value: datas['EpgAuthenticationFailRate'] || 100,
                        text: 'EPG认证\r\n成功率',
                        color: ['#EEEEEE70', colors[0]]
                    }, {
                        index: 1,
                        value: datas['EpgPageGetFailRate'] || 100,
                        text: 'EPG认证\r\n达标率',
                        color: ['#EEEEEE70', colors[1]]
                    }, {
                        index: 2,
                        value: datas['LiveBroadcastFailRate'] || 100,
                        text: '直播\r\n达标率',
                        color: ['#EEEEEE70', colors[2]]
                    }, {
                        index: 3,
                        value: datas['OnDemandPlaybackFailRate'] || 100,
                        text: '点播\r\n达标率',
                        color: ['#EEEEEE70', colors[3]]
                    }];
                    iptvHandler = [];
                    iptvSrc.forEach(function(item, index){
                        var iptv = echarts.init(document.getElementById('iptvchild'+ (item.index + 1)));
                        var opt = getPieOption(item.value, item.text, item.color);
                        iptv.setOption(opt);
                        iptvHandler.push(iptv);
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
    //OTT用户体验
    function ottFeeling(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/DegradeSimulation?StartTime="+startDate+"&EndTime="+endDate+"&SelectedChannelType=1",
                dataType: 'text',
                success: function(json){
                    var src = eval('(' + json + ')');
                    var dataSrc = src['Datas'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    var datas = dataSrc[0];
                    if(!datas) {
                        resolve();
                        return;
                    }
                    var ottSrc = [{
                        index: 0,
                        value: datas['EpgAuthenticationFailRate'] || 100,
                        text: 'EPG认证\r\n成功率',
                        color: ['#EEEEEE70', colors[0]]
                    }, {
                        index: 1,
                        value: datas['EpgPageGetFailRate'] || 100,
                        text: 'EPG认证\r\n达标率',
                        color: ['#EEEEEE70', colors[1]]
                    }, {
                        index: 2,
                        value: datas['LiveBroadcastFailRate'] || 100,
                        text: '直播\r\n达标率',
                        color: ['#EEEEEE70', colors[2]]
                    }, {
                        index: 3,
                        value: datas['OnDemandPlaybackFailRate'] || 100,
                        text: '点播\r\n达标率',
                        color: ['#EEEEEE70', colors[3]]
                    }];
                    ottHandler = [];
                    ottSrc.forEach(function(item){
                        var ott = echarts.init(document.getElementById('ottchild'+ (item.index + 1)));
                        var opt = getPieOption(item.value, item.text, item.color);
                        ott.setOption(opt);
                        ottHandler.push(ott);
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
    //IPTV质量监测
    function iptvQulity(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + '/Alarm/DegradeMonitor?StartTime='+startDate+'&EndTime='+endDate+'&SelectedChannelType=0',
                dataType: 'text',
                success: function(json){
                    json = eval('('+ json + ')');
                    var datas = json['Datas'];
                    if(!(datas instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!datas.length) {
                        resolve();
                        return;
                    }
                    var tvInfos = $('.tvInfo');
                    var platInfos = $('.platInfo');
                    $(tvInfos[0]).text(datas[0]['ChannelNum'].toFixed(2));
                    $(tvInfos[1]).text(datas[0]['StreamInterruptRate'].toFixed(2));
                    $(tvInfos[2]).text(datas[0]['IpRateAverRate'].toFixed(2));
                    $(tvInfos[3]).text(datas[0]['TsPacLostRate'].toFixed(2));
                    $(platInfos[0]).text(datas[1]['ChannelNum'].toFixed(2));
                    $(platInfos[1]).text(datas[1]['StreamInterruptRate'].toFixed(2));
                    $(platInfos[2]).text(datas[1]['IpRateAverRate'].toFixed(2));
                    $(platInfos[3]).text(datas[1]['TsPacLostRate'].toFixed(2));
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    //OTT质量监测
    function ottQulity(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + '/Alarm/DegradeMonitor?StartTime='+startDate+'&EndTime='+endDate+'&SelectedChannelType=1',
                dataType: 'text',
                success: function(json){
                    json = eval('(' + json + ')');
                    var datas = json['Datas'];
                    if(!(datas instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!datas.length) {
                        resolve();
                        return;
                    }
                    /*"ServerName": 平台名称
                     "PlatformNum": 设备数
                     "ChannelNum": 频道数
                     "HealthRate": 健康度,
                     */
                    var qulitySrc = [];
                    datas.forEach(function(item, index){
                        qulitySrc.push({
                            index: index,
                            title: item['ServerName'],
                            subTitle: item['PlatformNum']+'台\r\n'+item['ChannelNum'] + '频道',
                            text: '健康度',
                            value: item['HealthRate'].toFixed(2),
                            color: [[0.2, '#FF6F90'], [0.8, '#FFB36F'], [1, '#27D9C8']]
                        });
                    });
                    qmHandler = [];
                    $('.qmott').empty();
                    qulitySrc.forEach(function(item){
                        var eleId = 'qmchild'+ (item.index + 1);
                        $('.qmott').append($('<div class="childqmott" id="'+eleId+'"></div>'));
                    });
                    qulitySrc.forEach(function(item){
                        var eleId = 'qmchild'+ (item.index + 1);
                        var qm = echarts.init(document.getElementById(eleId));
                        var opt = getGaugeOption(item.value, item.title, item.subTitle, item.text, item.color, 'qmGauge');
                        qm.setOption(opt);
                        qmHandler.push(qm);
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
    //内容健康监测
    function contentHealth(szServer, startDate, endDate){
        var str = szServer + "/Alarm/DegradeData?StartTime="+startDate+"&EndTime="+endDate;
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                //url: 'http://192.168.77.175:8081/Alarm/DegradeData?StartTime=2014年01月01日&EndTime=2020年05月19日',
                url: szServer + "/Alarm/DegradeData?StartTime="+startDate+"&EndTime="+endDate,
                dataType: 'text',
                success: function(json){
                    json = eval('(' + json + ')');
                    var datas = json['Datas'];
                    if(!(datas instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!datas.length) {
                        resolve();
                        return;
                    }
                    var imgRate = datas[0]['LegalImageRate'] || 0;
                    imgRate = (imgRate * 100).toFixed(2);
                    var wordRate = datas[0]['LegalWordsRate'] || 0;
                    wordRate = (wordRate * 100).toFixed(2);
                    var imgNum = datas[0]['TotalLegalImageNum'] || 0;
                    var wordNum = datas[0]['TotalLegalWordsNum'] || 0;
                    var contentGaugeSrc = [{
                        index: 0,
                        title: '图像健康度',
                        subTitle: '正常图像报警总数：' + imgNum,
                        text: '健康度',
                        value: imgRate,
                        color: [[0.09, '#ff4500'], [0.82, '#1e90ff'], [1, 'lime']]
                    },{
                        index: 1,
                        title: '字幕健康度',
                        subTitle: '正常字幕报警总数：' + wordNum,
                        text: '健康度',
                        value: wordRate,
                        color: [[0.09, '#ff4500'], [0.82, '#1e90ff'], [1, 'lime']]
                    }];
                    contentHandler = [];
                    contentGaugeSrc.forEach(function(item){
                        var content = echarts.init(document.getElementById('contentchild'+ (item.index + 1)));
                        var opt = getGaugeOption(item.value, item.title, item.subTitle, item.text, item.color, 'contentGauge');
                        content.setOption(opt);
                        contentHandler.push(content);
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
    //频道安全防篡改IPTV
    function channelSafeIPTV(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/DegradeResistant?StartTime="+startDate+"&EndTime="+endDate+"& SelectedChannelType=0",
                dataType: 'text',
                success: function(json){
                    json = eval('(' + json + ')');
                    var dataSrc = json['Datas'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    var channelSafeSrc = [];
                    mapAddrData = [];
                    dataSrc.forEach(function(item, index){
                        var szAddr = item['ServerName'];
                        var fNum = item['FalsifyChannelNum'];
                        channelSafeSrc.push({
                            index: index,
                            text: szAddr,
                            value: fNum
                        });
                        /*{min: 0, max: 20, label: '0-20', color: colors[0]},
                         {min: 20, max: 40, label: '20-40', color: colors[1]},
                         {min: 40, max: 60, label: '40-60', color: colors[2]},
                         {min: 60, max: 80, label: '60-80', color: colors[3]},
                         {min: 80, max: 100, label: '80-100', color: colors[4]},
                         {min: 100, label: '其他', color: colors[5]}*/
                        var strColor = '#eee';
                        if(fNum > 0 && fNum <= 20){
                            strColor = colors[0];
                        }else if(fNum > 20 && fNum <= 40){
                            strColor = colors[1];
                        }else if(fNum > 40 && fNum <= 60){
                            strColor = colors[2];
                        }else if(fNum > 60 && fNum <= 80){
                            strColor = colors[3];
                        }else if(fNum > 80 && fNum >= 100){
                            strColor = colors[4];
                        }else if(fNum > 100){
                            strColor = colors[5];
                        }else{
                            strColor = '#eee';
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
                    channelSafeHandler = echarts.init(document.getElementById('channelSafe'));
                    var opt = getBarOption(channelSafeSrc);
                    channelSafeHandler.setOption(opt);
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    //频道安全防篡改OTT
    function channelSafeOTT(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/DegradeResistant?DegradeResistant="+startDate+"&EndTime="+endDate+"&SelectedChannelType=1",
                dataType: 'text',
                success: function(json){
                    json = eval('(' + json + ')');
                    var dataSrc = json['Datas'];
                    if(!(dataSrc instanceof Array)){
                        resolve();
                        return;
                    }
                    if(!dataSrc.length) {
                        resolve();
                        return;
                    }
                    var ottCdnSrc = [];
                    dataSrc.forEach(function(item){
                        var platName = item['ServerName'];
                        var deviceName = item['PlatformNum'];
                        var channelNum = item['ChannelNum'];
                        var healthNum = item['FalsifyChannelNum'];
                        ottCdnSrc.push({
                            title: platName + '：' + deviceName + '台/' + channelNum + '频道',
                            text: platName,
                            value: healthNum
                        })
                    });
                    var ottCdn = echarts.init(document.getElementById('ottCdn'));
                    //var opt = getBarOption(ottCdnSrc, 'ottcdn');
                    var opt = getPathOption(ottCdnSrc);
                    ottCdn.setOption(opt);
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    //地图报警
    function mapAlarm(szServer, startDate, endDate){
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/QualityAlarmnum?StartTime="+startDate+"&EndTime="+endDate+"& SelectedChannelType=0",
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
                    //地图的显示
                    var maps = echarts.init(document.getElementById('mapadd'));
                    var option = {
                        tooltip : {
                            trigger: 'item',
                            formatter: '{b}'
                        },
                        visualMap: {
                            top: 8,
                            x: 'left',
                            y: 'top',
                            orient: 'vertical',
                            textStyle: {
                                color: '#fff'
                            },
                            hoverLink: false,
                            pieces: [
                                {min: 0, max: 20, label: '0-20', color: colors[0]},
                                {min: 20, max: 40, label: '20-40', color: colors[1]},
                                {min: 40, max: 60, label: '40-60', color: colors[2]},
                                {min: 60, max: 80, label: '60-80', color: colors[3]},
                                {min: 80, max: 100, label: '80-100', color: colors[4]},
                                {min: 100, label: '其他', color: colors[5]}
                                /*{gt: 0, lte: 20, label: '0-20', color: colors[0]},
                                 {gt: 20, lte: 40, label: '20-40', color: colors[1]},
                                 {gt: 40, lte: 60, label: '40-60', color: colors[2]},
                                 {gt: 60, lte: 80, label: '60-80', color: colors[3]},
                                 {gt: 80, lte: 100, label: '80-100', color: colors[4]},
                                 {gt: 100, label: '其他', color: colors[5]}*/
                            ],
                            outOfRange: {
                                color: '#eee'
                            }
                        },
                        series : [{
                            name: '内蒙古',
                            type: 'map',
                            mapType: '内蒙古',
                            //roam: false,
                            top:'18%',
                            zoom: 1.2,
                            //x:'25%',
                            selectedMode : 'single',//multiple多选
                            roam: true,
                            //aspectScale: 0.6,
                            scaleLimit:{
                                min: 1,
                                max: 10
                            },
                            itemStyle:{
                                normal:{
                                    label:{
                                        show:true,
                                        textStyle: {
                                            color: "#231816"
                                        }
                                    },
                                    areaStyle:{color:'#B1D0EC'},
                                    color:'#B1D0EC',
                                    borderColor:'#dadfde'//区块的边框颜色
                                },
                                emphasis:{//鼠标hover样式
                                    label:{
                                        show:true,
                                        textStyle:{
                                            color:'#fa4f04'
                                        }
                                    },
                                    areaStyle:{color:'red'}
                                }
                            },
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data: mapAddrData,
                            markPoint:{
                                symbol: 'pin',
                                symbolSize: nSynmobSize,
                                symbolOffset: [-3, -3],
                                itemStyle: {
                                    normal: {
                                        borderColor: '#33CBFF',
                                        color:'#ff0000',
                                        borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: [{
                                    name: '区公司',
                                    itemStyle: {
                                        color: szCompanyColor
                                    },
                                    coord: arrCompanyPos//[111.62, 40.82]
                                }]
                            }
                        }]
                    };
                    maps.setOption(option);
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    //地区百分比
    function areaPercent(szServer, startDate, endDate){//传输质量报警信息
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szServer + "/Alarm/DegradeMonitor?StartTime="+startDate+"&EndTime="+endDate+"&SelectedChannelType=2",
                success: function(json){
                    var dataSrc = json['Datas'];
                    if(!(dataSrc instanceof Array)){
                        return;
                    }
                    if(!dataSrc.length) return;
                    var opt = getHBarOption(dataSrc);
                    var elAreaPercent = document.getElementById("areaPercent");
                    var elAreaPercentCharts = echarts.init(elAreaPercent);
                    elAreaPercentCharts.setOption(opt);
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    var alarmLevelArr = Array.prototype.slice.call($('#alarmLevel input'));
    alarmLevelArr.forEach(function(item, index){
        $(item).val(colors[index]);
    });
    var iptvHandler = [], ottHandler = [], qmHandler = [], contentHandler = [];
    var contentGaugeSrc = [{
        index: 0,
        title: '图像健康度',
        subTitle: '正常图像报警总数：' + 0,
        text: '健康度',
        value: 0,
        color: [[0.09, '#ff4500'], [0.82, '#1e90ff'], [1, 'lime']]
    },{
        index: 1,
        title: '字幕健康度',
        subTitle: '正常字幕报警总数：' + 0,
        text: '健康度',
        value: 0,
        color: [[0.09, '#ff4500'], [0.82, '#1e90ff'], [1, 'lime']]
    }];
    contentGaugeSrc.forEach(function(item){
        var content = echarts.init(document.getElementById('contentchild'+ (item.index + 1)));
        var opt = getGaugeOption(item.value, item.title, item.subTitle, item.text, item.color, 'contentGauge');
        content.setOption(opt);
        contentHandler.push(content);
    });
    var channelSafeSrc = [{
        index: 0,
        text: '阿拉善盟',
        value: 10
    },{
        index: 1,
        text: '乌海市',
        value: 10
    },{
        index: 2,
        text: '鄂尔多斯',
        value: 10
    },{
        index: 3,
        text: '巴彦淖尔',
        value: 10
    },{
        index: 4,
        text: '呼和浩特',
        value: 10
    },{
        index: 5,
        text: '乌兰察布',
        value: 10
    },{
        index: 6,
        text: '锡林郭勒',
        value: 10
    },{
        index: 7,
        text: '赤峰',
        value: 10
    },{
        index: 8,
        text: '通辽',
        value: 10
    },{
        index: 9,
        text: '兴安盟',
        value: 10
    },{
        index: 10,
        text: '呼伦贝尔',
        value: 10
    },{
        index: 11,
        text: '包头',
        value: 10
    }];
    channelSafeHandler = echarts.init(document.getElementById('channelSafe'));
    var opt = getBarOption(channelSafeSrc);
    channelSafeHandler.setOption(opt);
    var iptvSrc = [{
        index: 0,
        value: 100,
        text: 'EPG认证\r\n成功率',
        color: ['#EEEEEE70', colors[0]]
    }, {
        index: 1,
        value: 100,
        text: 'EPG认证\r\n达标率',
        color: ['#EEEEEE70', colors[1]]
    }, {
        index: 2,
        value: 100,
        text: '直播\r\n达标率',
        color: ['#EEEEEE70', colors[2]]
    }, {
        index: 3,
        value: 100,
        text: '点播\r\n达标率',
        color: ['#EEEEEE70', colors[3]]
    }];
    iptvSrc.forEach(function(item, index){
        var iptv = echarts.init(document.getElementById('iptvchild'+ (item.index + 1)));
        var opt = getPieOption(item.value, item.text, item.color);
        iptv.setOption(opt);
        iptvHandler.push(iptv);
    });
    var ottSrc = [{
        index: 0,
        value: 100,
        text: 'EPG认证\r\n成功率',
        color: ['#EEEEEE70', colors[0]]
    }, {
        index: 1,
        value: 100,
        text: 'EPG认证\r\n达标率',
        color: ['#EEEEEE70', colors[1]]
    }, {
        index: 2,
        value: 100,
        text: '直播\r\n达标率',
        color: ['#EEEEEE70', colors[2]]
    }, {
        index: 3,
        value: 100,
        text: '点播\r\n达标率',
        color: ['#EEEEEE70', colors[3]]
    }];
    ottSrc.forEach(function(item){
        var ott = echarts.init(document.getElementById('ottchild'+ (item.index + 1)));
        var opt = getPieOption(item.value, item.text, item.color);
        ott.setOption(opt);
        ottHandler.push(ott);
    });
    var qmGaugeSrc = [{
        index: 0,
        title: '华为',
        subTitle: '0台\r\n0频道',
        text: '健康度',
        value: 0,
        color: [[0.2, '#FF6F90'], [0.8, '#FFB36F'], [1, '#27D9C8']]
    },{
        index: 1,
        title: '中兴',
        subTitle: '0台\r\n0频道',
        text: '健康度',
        value: 0,
        color: [[0.2, '#FF6F90'], [0.8, '#FFB36F'], [1, '#27D9C8']]
    },{
        index: 2,
        title: '烽火',
        subTitle: '0台\r\n0频道',
        text: '健康度',
        value: 0,
        color: [[0.2, '#FF6F90'], [0.8, '#FFB36F'], [1, '#27D9C8']]
    }/*,{
        index: 3,
        title: '杭研',
        subTitle: '0台\r\n0频道',
        text: '健康度',
        value: 0,
        color: [[0.2, '#FF6F90'], [0.8, '#FFB36F'], [1, '#27D9C8']]
    }*/];
    $('.qmott').empty();
    qmGaugeSrc.forEach(function(item){
        var eleId = 'qmchild'+ (item.index + 1);
        $('.qmott').append($('<div class="childqmott" id="'+eleId+'"></div>'));
    });
    qmGaugeSrc.forEach(function(item){
        var eleId = 'qmchild'+ (item.index + 1);
        if(!$('#' + eleId).length){
            return;
        }
        var qm = echarts.init(document.getElementById(eleId));
        var opt = getGaugeOption(item.value, item.title, item.subTitle, item.text, item.color, 'qmGauge');
        qm.setOption(opt);
        qmHandler.push(qm);
    });
    var ottCdnSrc = [{
        title: '华为：0台/0频道',
        text: '华为',
        value: 10
    },{
        title: '中兴：0台/0频道',
        text: '中兴',
        value: 10
    },{
        title: '烽火：0台/0频道',
        text: '烽火',
        value: 10
    }/*,{
        title: '杭研：0台/0频道',
        text: '杭研',
        value: 10
    }*/];
    var ottCdn = echarts.init(document.getElementById('ottCdn'));
    //var opt = getBarOption(ottCdnSrc, 'ottcdn');
    var opt = getPathOption(ottCdnSrc);
    ottCdn.setOption(opt);
    //var ottValue = $('#ottValue');
    //var opt = getHBarOption(mapAddrData);
    var elAreaPercent = document.getElementById("areaPercent");
    var areaPercentCharts = echarts.init(elAreaPercent);
    areaPercentCharts.setOption({});
    function getPathOption(src){
        var xData = [], colorArr = [], barData = [], szTitle = '';
        src.forEach(function(item, index){
            xData.push(item.text);
            colorArr.push(colors[index]);
            barData.push(item.value);
            if("title" in item){
                szTitle += item.title + "\r\n";
            }
        });
        var option = {
            title: {
                text: szTitle,
                textStyle: {
                    color: '#00C5CD',
                    fontWeight: 'normal',
                    fontSize: 14,
                    lineHeight: 20,
                    rich: {
                        a: { }
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + ': ' + params[0].value;
                }
            },
            xAxis: {
                data: xData,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    color: '#fff'
                }
            },
            yAxis: {
                axisTick: {show: false},
                axisLabel: {
                    color: '#fff'
                },
                splitLine: {     //网格线
                    show: true,
                    lineStyle:{
                        color: '#0000CD'
                    }
                }
            },
            color: colorArr,
            visualMap: {
                top: 8,
                    x: 'right',
                    y: 'top',
                    orient: 'vertical',
                    textStyle: {
                    color: '#fff'
                },
                hoverLink: false,
                    pieces: [
                    {min: 0, max: 20, label: '0-20', color: colors[0]},
                    {min: 20, max: 40, label: '20-40', color: colors[1]},
                    {min: 40, max: 60, label: '40-60', color: colors[2]},
                    {min: 60, max: 80, label: '60-80', color: colors[3]},
                    {min: 80, max: 100, label: '80-100', color: colors[4]},
                    {min: 100, label: '其他', color: colors[5]}
                    /*{gt: 0, lte: 20, label: '0-20', color: colors[0]},
                     {gt: 20, lte: 40, label: '20-40', color: colors[1]},
                     {gt: 40, lte: 60, label: '40-60', color: colors[2]},
                     {gt: 60, lte: 80, label: '60-80', color: colors[3]},
                     {gt: 80, lte: 100, label: '80-100', color: colors[4]},
                     {gt: 100, label: '其他', color: colors[5]}*/
                ],
                    outOfRange: {
                    color: '#999'
                }
            },grid: {
                top: 95,
                bottom: 30,
                //width: 230,
                right: 80,
                left: 40
            },
            series: [{
                name: 'hill',
                type: 'pictorialBar',
                //barCategoryGap: '-130%',
                // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                itemStyle: {
                    opacity: 1
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                },
                data: barData,
                z: 10
            }]
        };
        return option;
    }
    function getHBarOption(src){
        //var percentData = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        var yAddrData = [];
        var xData = [];
        src.forEach(function(item, index){
            yAddrData.push(transAddr(item['ServerName']));
            xData.push({
                value: item['IpRateAverRate'],
                itemStyle: {
                    color: getColor(item['IpRateAverRate'])
                }
            });
        });
        var option = {
            title: {
                text: '地区百分比(%)',
                textStyle:{
                    color: '#fff',
                    fontSize: '12px'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            /*legend: {
             data: ['2011年', '2012年']
             },*/
            grid: {
                left: '3%',
                right: '4%',
                //bottom: '3%',
                bottom: 0,
                top: 20,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                //boundaryGap: [0, 0.01],
                axisLabel: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                data: yAddrData,
                axisLabel:{
                    color: '#fff'
                },
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    type: 'bar',
                    data: xData
                }
            ]
        };
        return option;
    }
    /*channelSafeSrc.forEach(function(item, index){
        index = Math.floor(index/2);
        ottValue.append($('<div style="text-align: left;width:108px;margin:0 auto;"><span style="display:inline-block;margin-left:0px;' +
            'border-radius:8px;width:8px;height:8px;' +
            'background-color:'+colors[index]+';"></span><span style="margin-right:0px;color:'+colors[index]+';">'+
            item['text']+"："+item['value']+'</span></div'));
    });*/
    //IPTV,OTT用户体验
    function getPieOption(circleValue, subTitle, colors){
        var opt = {
            tooltip: {
                formatter: function(val){
                    //return val.seriesName.replace('\r\n', '<br>') + '：<br>' + val.data.value + '%';
                },
                position: 'right'
            },
            title: [{
                text: subTitle,
                //y: 'bottom',
                y: '65%',
                x: '26%',
                textStyle: {
                    fontSize: '13',
                    color: '#7AC5CD',
                    fontWeight: 'bold'
                }
            },{
                show:true,
                text: (100-circleValue) + '%',
                x:'center',
                y:'30%',
                textStyle: {
                    fontSize: '14',
                    color: 'white',
                    fontWeight: 'normal'
                }
            }],
            color: colors,calculable : true,
            series:[{
                type: 'pie',
                name: subTitle,
                radius: ['50%', '70%'],
                center: ["50%", "35%"],
                itemStyle: {
                },
                data: [{ value: circleValue, name: '' },
                    { value: 100 - circleValue, name: '' }],
                animation: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                }
            }]
        };
        return opt;
    }
    //获取仪表盘信息
    function getGaugeOption(value, title, subTitle, text, colors, type){
        var opt = {
            /*tooltip: {
                formatter: function(val){
                    return val.seriesName + "：" + val.value + '%';
                },
                position: [0, 50]
            },*/
            title: {
                text: title,
                subtext: subTitle,
                textStyle: {
                    color: '#4876FF'
                },
                top: 10,
                //x:'center',
                //y: 'bottom',,
                //padding: [50, 50],
                itemGap: 100,
                left: 'center',//主副标题的水平位置
                //top: 'center',//主副标题的垂直位置
                subtextStyle:{
                    color: '#00868B',
                    fontWeight: 'bold'
                }
            },
            series: [
                {
                    name: text,
                    type: 'gauge',
                    radius: 45,
                    detail: {
                        formatter: text + '{value}%' + '',
                        color: '#00C5CD',
                        fontSize: 14,
                        fontWeight: 'bold',
                        offsetCenter: [0, 43]
                    },
                    lineStyle: {
                        width: 1
                    },
                    /*splitLine: {
                        show: false
                    },*/
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        distance: 4
                    },
                    splitNumber: 5,
                    splitLine : { //分割线样式（及10、20等长线样式）
                        length : 5,
                        lineStyle : { // 属性lineStyle控制线条样式
                            width : 2
                        }
                    },
                    title : {
                        textStyle: {
                            fontWeight: 'normal',
                            //fontSize: 1,
                            color: '#fff'
                        }
                    },
                    pointer: { //指针样式
                        length: '90%',
                        width: 5
                    },
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: colors,
                            width: 8
                        }
                    },
                    data: [{value: value, name: ''}]
                }
            ]
        };
        if(type == "contentGauge"){
            opt.series[0].axisLine.lineStyle.width = 5;
            opt.series[0].axisLine.lineStyle.shadowColor = '#fff'; //默认透明
            opt.series[0].axisLine.lineStyle.shadowBlur = 10;
            opt.title.itemGap = 110;
        }
        return opt;
    }
    //获取柱状图信息
    function getBarOption(src, type){
        var xData = [], yData = [];
        var szTitle = "";
        //var colors = ['#f5fc13', '#ff8400', '#fc0000', '#9b004f','#860023', '#00ff00'];
        var colors = ['#EE7942', '#EE4000', '#4876FF', '#EEEE00','#EEB422', '#00ff00'];
        src.forEach(function(item){
            xData.push(item.text);
            yData.push(item.value);
            if("title" in item){
                szTitle += item.title + "\r\n";
            }
        });
        var opt = {
            title: {
                text: szTitle,
                textStyle: {
                    color: '#00C5CD',
                    fontWeight: 'normal',
                    fontSize: 14,
                    lineHeight: 18
                }
            },
            tooltip: {},
            xAxis: [
                {
                    type: 'category',
                    data: xData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{
                        color: '#fff'
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {     //网格线
                        show: false,
                        lineStyle:{
                            color: '#0000CD'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel:{
                        color: '#fff'
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {//网格线
                        show: true,
                        lineStyle:{
                            color: '#0000CD'
                        }
                    }
                }
            ],
            grid: {
                top: 30,
                bottom: 30,
                //width: 230,
                right: 80,
                left: 40
            },
            visualMap: {
                top: 8,
                x: 'right',
                y: 'top',
                orient: 'vertical',
                textStyle: {
                    color: '#fff'
                },
                hoverLink: false,
                pieces: [
                    {min: 0, max: 20, label: '0-20', color: colors[0]},
                    {min: 20, max: 40, label: '20-40', color: colors[1]},
                    {min: 40, max: 60, label: '40-60', color: colors[2]},
                    {min: 60, max: 80, label: '60-80', color: colors[3]},
                    {min: 80, max: 100, label: '80-100', color: colors[4]},
                    {min: 100, label: '其他', color: colors[5]}
                    /*{gt: 0, lte: 20, label: '0-20', color: colors[0]},
                    {gt: 20, lte: 40, label: '20-40', color: colors[1]},
                    {gt: 40, lte: 60, label: '40-60', color: colors[2]},
                    {gt: 60, lte: 80, label: '60-80', color: colors[3]},
                    {gt: 80, lte: 100, label: '80-100', color: colors[4]},
                    {gt: 100, label: '其他', color: colors[5]}*/
                ],
                outOfRange: {
                    color: '#999'
                }
            },
            series: [{
                    name: '',
                    type: 'bar',
                    data: yData,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var index_color = params.value;
                                getColor(index_color);
                            }
                        }
                    }
                }]
        };
        if(typeof type != "undefined" && type == "ottcdn"){
            opt.grid.top = 95;
            opt.visualMap.top = 72;
            opt.title.textStyle.rich = {
                a: {
                    fontSize: 14,
                    lineHeight: 18
                }
            }
        }
        return opt;
    }
    /* 地图 需要哪个省市的地图直接引用js 将下面的name以及mapType修改为对应省市名称*/
    var maps = echarts.init(document.getElementById('mapadd'));
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },
        series : [{
            name: '山东',
            type: 'map',
            mapType: '山东',
            roam: false,
            top:'8%',
            zoom:1.2,
            x:'25%',
            selectedMode : 'single',//multiple多选
            itemStyle:{
                normal:{
                    label:{
                        show:true,
                        textStyle: {
                            color: "#231816"
                        }
                    },
                    areaStyle:{color:'#B1D0EC'},
                    color:'#B1D0EC',
                    borderColor:'#dadfde'//区块的边框颜色
                },
                emphasis:{//鼠标hover样式
                    label:{
                        show:true,
                        textStyle:{
                            color:'#fa4f04'
                        }
                    },
                    areaStyle:{color:'red'}
                }
            },
            data:[
                {name:'济南市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'德州市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#0abcee'
                        }
                    }
                },
                {name:'聊城市',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'泰安市',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5'
                        }
                    }
                },
                {name:'莱芜市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'菏泽市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'枣庄市',
                    itemStyle: {
                        normal: {
                            areaColor: '#45b5ef',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'济宁市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffd811',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'临沂市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffa312',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'青岛市',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'烟台市',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5'
                        }
                    }
                },
                {name:'威海市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'潍坊市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'淄博市',
                    itemStyle: {
                        normal: {
                            areaColor: '#45b5ef',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'滨州市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'东营市',
                    itemStyle: {
                        normal: {
                            areaColor: 'red',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'日照市',
                    itemStyle: {
                        normal: {
                            areaColor: 'red',
                            borderColor: '#45b5ef'
                        }
                    }
                }
            ]
        }]
    };
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },
        series : [{
            name: '内蒙古',
            type: 'map',
            mapType: '内蒙古',
            //roam: false,
            top:'18%',
            zoom: 1.2,
            //x:'25%',
            selectedMode : 'single',//multiple多选
            roam: true,
            //aspectScale: 0.6,
            scaleLimit:{
                min: 1,
                max: 10
            },
            itemStyle:{
                normal:{
                    label:{
                        show:true,
                        textStyle: {
                            color: "#231816"
                        }
                    },
                    areaStyle:{color:'#B1D0EC'},
                    color:'#B1D0EC',
                    borderColor:'#dadfde'//区块的边框颜色
                },
                emphasis:{//鼠标hover样式
                    label:{
                        show:true,
                        textStyle:{
                            color:'#fa4f04'
                        }
                    },
                    areaStyle:{color:'red'}
                }
            },
            data:[
                {name:'包头市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffd5ff',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'呼伦贝尔市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffd5ff',
                            borderColor: '#edce00'
                        }
                    }
                },
                {name:'兴安盟',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#0abcee'
                        }
                    }
                },
                {name:'通辽市',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'锡林郭勒盟',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5'
                        }
                    }
                },
                {name:'赤峰市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'乌兰察布市',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'呼和浩特市',
                    itemStyle: {
                        normal: {
                            areaColor: '#45b5ef',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'巴彦淖尔市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffd811',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'临沂市',
                    itemStyle: {
                        normal: {
                            areaColor: '#ffa312',
                            borderColor: '#45b5ef'
                        }
                    }
                },
                {name:'鄂尔多斯市',
                    itemStyle: {
                        normal: {
                            areaColor: '#92d050',
                            borderColor: '#1ca9f2'
                        }
                    }
                },
                {name:'乌海市',
                    itemStyle: {
                        normal: {
                            areaColor: '#88ddf5',
                            borderColor: '#88ddf5'
                        }
                    }
                },
                {name:'阿拉善盟',
                    itemStyle: {
                        normal: {
                            areaColor: '#13d5ff',
                            borderColor: '#45b5ef'
                        }
                    }
                }
            ],
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false
                }
            },
            data: mapAddrData,
            markPoint:{
                symbol: 'pin',
                symbolSize: nSynmobSize,
                symbolOffset: [-3, -3],
                itemStyle: {
                    normal: {
                        borderColor: '#33CBFF',
                        color:'#ff0000',
                        borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                        label: {
                            show: true
                        }
                    }
                },
                data: [{
                    name: '区公司',
                    coord: [111.62, 40.82]
                }]
            }
        }]
    };
    maps.setOption(option);

    var alarmTable = new ScrollEditableTable('100%', '100%', '100%', '240px');
    alarmTable.renderToDomObjById('alarmInfo');
    var titleArr = [{
        title: '报警级别/描述',
        dataIndex: 'alarmLevel',
        width: '100px'
    },{
        title: '报警地点',
        dataIndex: 'alarmAddr'
    },{
        title: '频道名称',
        dataIndex: 'channelName'
    },{
        title: '报警时间',
        dataIndex: 'alarmTime'
    },{
        title: '报警值',
        dataIndex: 'alarmValue',
        width: '80px'
    },{
        title: '持续时间(ms)',
        dataIndex: 'keepTime',
        width: '100px'
    }];
    alarmTable.insertColumns(titleArr);
    alarmTable.getBodyTable().setLineHeight('37px');
    alarmTable.getBodyTable().setAlignment('center');
    $('#menubtn').click(function(){
        $('#menu').show();
    }).hover(function(){
        $(this).css('width', '90px');
        $('#menu').show();
    }, function(){
        $(this).css('width', '30px');
        $('#menu').hide();
    });
    $('#menu').hover(function(){
        $(this).show();
    }, function(){
        $(this).hide();
    });
    //时间转换
    function timeStampToDate(szTimeStamp){
        if(szTimeStamp.length < 21) return szTimeStamp;
        szTimeStamp = szTimeStamp.slice(6, -2);
        var date = new Date(+szTimeStamp);
        var szYear = date.getFullYear();
        var szMonth = (date.getMonth() + 1).toString();
        szMonth = szMonth.length == 1 ? ("0"+szMonth) : szMonth;
        var szDate = (date.getDate()).toString();
        szDate = szDate.length == 1 ? ("0"+szDate) : szDate;
        return szYear + "-" + szMonth + "-" + szDate + "";
    }
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
    //地址转换
    function transAddr(szAddrText){
        var szAddr = '';
        switch(szAddrText){
            case "区公司":
                szAddr = "区公司";
                break;
            case "乌兰浩特":
                szAddr = "兴安盟";
                break;
            case "阿拉善":
                szAddr = "阿拉善盟";
                break;
            case"锡林浩特":
                szAddr = "锡林郭勒盟";
                break;
            case "包头":
            case "赤峰":
            case "呼和浩特":
            case "鄂尔多斯":
            case "通辽":
            case "乌兰察布":
            case "乌海":
            case "巴彦淖尔":
            case "呼伦贝尔":
                szAddr = szAddrText + "市";
                break;
            default:
                szAddr = szAddrText;
                break;
        }
        return szAddr;
    }
    function getColor(value){
        if(value >0 && value <= 20) {
            return colors[0];
        }else if(value >20 && value <= 40) {
            return colors[1];
        }else if(value >40 && value <=60) {
            return colors[2];
        }else if(value >60 && value <=80) {
            return colors[3];
        }else if(value >80 && value <=100) {
            return colors[4];
        }else{
            return '#eee';
        }
    }
    //首页点击事件
    $('#user-experience').mouseover(function(){
        $('#experience-details').addClass("show");
    });
    $('#user-experience').mouseout(function(){
        $('#experience-details').removeClass("show");
    });
    $('#experience-details').click(function(){
        window.location.href='iptv_ue1.html'
      });

    
    window.addEventListener("resize", function () {
        maps.resize();
        ottCdn && ottCdn.resize();
        channelSafeHandler && channelSafeHandler.resize();
        iptvHandler && iptvHandler.forEach(function(item){
            item.resize();
        });
        ottHandler && ottHandler.forEach(function(item){
            item.resize();
        });
        qmHandler && qmHandler.forEach(function(item){
            item.resize();
        });
        contentHandler && contentHandler.forEach(function(item){
            item.resize();
        });
    });
});