(function(){
    var option;
    var startDate = "1990-01-01 00:00:00", endDate = getDateJoinMinus();
    var arrSignalType = ["IPTV", "OTT"];
    //平台出口，平台入口
    var arrAddr = ["区公司", "赤峰", "呼和浩特", "包头", "鄂尔多斯", "阿拉善", "锡林浩特",
        "通辽", "乌兰察布", "乌海", "巴彦淖尔", "乌兰浩特", "呼伦贝尔"];
    var arrChannel = ["所有频道"];
    addOptions("signalType", arrSignalType);
    addOptions('addr', arrAddr);
    addOptions('channel', arrChannel);
    var ele = document.getElementById('iptvue');
    var iptvUe = echarts.init(ele);
    $('#endDate').val(endDate);
    startDate = getDate(0, -8);
    endDate = getDate();
    var searchCondition = {
        signalType: arrSignalType[$('#signalType').val()],
        company: arrAddr[$('#addr').val()],
        channel: $('#channel').val(),
        startDate: startDate,
        endDate: endDate
    };
    contentHealth(searchCondition);
    function searchChanFn(){
        console.log(1);
    }
    $('#channel').bind('input', throttle(searchChanFn, 2000));
    $("#signalType").change(function(){
        var value = parseInt(this.value, 10);
        searchCondition["signalType"] = arrSignalType[value];
    });
    $('#timeSel').change(function(){
        getTimeScope(this.value);
        //contentHealth(szServer, szStartDate, szEndDate);
    });
    $('#searchBtn').bind('click', function(){
        var bShow = $('#timeDiv').is(":visible");
        if(bShow){
            var szStartDate = $('#startDate').val();
            var szEndDate = $('#endDate').val();
            szStartDate = timeTrans(szStartDate);
            szEndDate = timeTrans(szEndDate);
            searchCondition['startDate'] = szStartDate;
            searchCondition['endDate'] = szEndDate;
        }else{
            getTimeScope($('#timeSel').val());
        }
        searchCondition = $.extend(searchCondition, {
            signalType: arrSignalType[$('#signalType').val()],
            company: arrAddr[$('#addr').val()],
            channel: $('#channel').val()
        });
        contentHealth(searchCondition);
        //contentHealth("", szStartDate, szEndDate);
    });
    function contentHealth(condition){
        if(!option){
            return;
        }
        xData = [];
        yImgRateData = [];
        yWordRateData = [];
        for(var i = 0; i < 10000; i++){
            var time = getDateJoinMinus(i);
            xData.push(time);
            yImgRateData.push(80 + parseInt(Math.random(0, 1) * 10, 10));
            yWordRateData.push(70 + parseInt(Math.random(0, 1) * 5, 10));
        }
        option.xAxis.data = xData;
        option.series[0].data = yImgRateData;
        option.series[1].data = yWordRateData;
        iptvUe.setOption(option);
        return;
        var szStartDate = condition['startDate'];
        var szEndDate = condition['endDate'];
        var szChannelName = condition['channel'];
        //SelectedChannelType=0表示IPTV,1表示OTT
        //SerachStr频道名称
        //地市
        var szUrl = "http://192.168.77.175:8081" + "/Alarm/DegradeTest?StartTime="+szStartDate+"&EndTime="+szEndDate;
        if(szChannelName != "所有频道"){
            szUrl = "http://192.168.77.175:8081" + "/Alarm/DegradeTest?StartTime="+szStartDate+"&EndTime="+szEndDate + "&SerachStr="+szChannelName;
        }
        var p = new Promise(function(resolve, reject){
            $.ajax({
                type: 'post',
                url: szUrl,
                //url: 'http://192.168.77.175:8081/Alarm/DegradeTest?StartTime=2020年01月01日&EndTime=2020年07月24日&SelectedChannelType=0',
                //url: 'http://192.168.77.175:8081/Alarm/DegradeTest?StartTime=2020年07月23日11:00:00&EndTime=2020年07月24日11:00:00',
                //url: szServer + "/Alarm/DegradeData?StartTime="+startDate+"&EndTime="+endDate,
                dataType: 'text',
                success: function(json){
                    json = eval('(' + json + ')');
                    var datas = json['Alarms'];
                    if(!(datas instanceof Array)){
                        iptvUe.setOption({}, true);
                        resolve();
                        return;
                    }
                    if(!datas.length) {
                        iptvUe.setOption({}, true);
                        resolve();
                        return;
                    }
                    var xData = [], yImgRateData = [], yWordRateData = [];
                    datas.sort(function(a, b){
                        return timeStampToNum(a['AlarmTime']) - timeStampToNum(b['AlarmTime']);
                    });
                    datas.forEach(function(item){
                        var imgRate = item['LegalImageNum']/item['MonitorImageNum'];
                        imgRate = (imgRate*100).toFixed(2);
                        var wordRate = item['LegalWordsNum']/item['MonitorWordsNum'];
                        wordRate = (wordRate*100).toFixed(2);
                        var time = timeStampToDate(item['AlarmTime']);
                        /*imgRate = (imgRate * 100).toFixed(2);
                        var wordRate = item['LegalWordsRate'] || 0;
                        wordRate = (wordRate * 100).toFixed(2);
                        var imgNum = item['TotalLegalImageNum'] || 0;
                        var wordNum = item['TotalLegalWordsNum'] || 0;*/
                        xData.push(time);
                        yImgRateData.push(imgRate);
                        yWordRateData.push(wordRate);
                    });
                    option.xAxis.data = xData;
                    option.series[0].data = yImgRateData;
                    option.series[1].data = yWordRateData;
                    iptvUe.setOption(option);
                    resolve();
                },
                error: function(){
                    resolve();
                }
            });
        });
        return p;
    }
    var passRateTitleArr = ['合法图像', '合法字幕'];
    var colors = ['#F00', '#0F0'/*, '#00f', '#ff0'*/];
    option = {
        color: colors,
        legend: {
            data: passRateTitleArr,
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        title: {
            text: '报警数据',
            textStyle: {
                color: '#fff',
                fontSize: 20
            },
            left: 60
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
            //formatter: '{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%'
            formatter: function(args){
                var str = "";
                args.forEach(function(item, index){
                    if(index == 0) str += item['name'];
                    str += '<br/>' + item['marker'] + item['seriesName'] +"："+ item['data'] + '%';
                });
                return str;
            }
        },
        toolbox: {
            show: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            //data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
            data: [],
            axisLabel: {
                textStyle: {
                    color: '#fff',  //更改坐标轴文字颜色
                    fontSize : 16   //更改坐标轴文字大小
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%',
                textStyle: {
                    color: '#fff',  //更改坐标轴文字颜色
                    fontSize : 16   //更改坐标轴文字大小
                }
            },
            max: 100,
            axisPointer: {
                //snap: true
            }
        },
        series: [
            {
                name: passRateTitleArr[0],
                type: 'line',
                lineStyle: {
                    color: colors[0]
                },
                smooth: true,
                /*data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 300, 700, 600, 400].map(function(item){
                    return item/10;
                }),*/
                data: [],
                areaStyle: {},
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}%'
                    }
                }
            },
            {
                name: passRateTitleArr[1],
                type: 'line',
                lineStyle: {
                    color: colors[1]
                },
                smooth: true,
                data: [],
                /*data: [90, 30, 200, 110, 380, 530, 410, 440, 320, 280, 260, 280, 220, 410, 490, 640, 250, 420, 510, 310].map(function(item){
                    return item/10;
                }),*/
                areaStyle: {

                }
            }
        ]
    };
    //var ele = document.getElementById('iptvue');
    //var iptvUe = echarts.init(ele);
    iptvUe.setOption(option);

    var alarmTable = new ScrollEditableTable('100%', '100%', '100%', '240px');
    alarmTable.renderToDomObjById('alarmList');
    var titleArr = [{
        title: '报警时间',
        dataIndex: 'alarmTime',
        width: '300px'
    },{
        title: '频道名称',
        dataIndex: 'channelName',
        width: '200px'
    },{
        title: '报警地点',
        dataIndex: 'alarmAddr',
        width: '200px'
    },{
        title: '频道IP',
        dataIndex: 'channelIP',
        width: '200px'
    },{
        title: '报警值',
        dataIndex: 'alarmValue',
        width: '80px'
    },{
        title: '报警画面',
        dataIndex: 'alarmImg',
        width: '100px'
    }];
    alarmTable.insertColumns(titleArr);
    alarmTable.getBodyTable().setLineHeight('37px');
    alarmTable.getBodyTable().setAlignment('center');

    function getTimeScope(value){
        var nVal = parseInt(value, 10);
        var szStartDate = "", szEndDate = "";
        $('#timeDiv').hide();
        switch(nVal){
            case 0: //最近8小时
                szStartDate = getDate(0, -8);
                szEndDate = getDate();
                break;
            case 1: //最近1天
                szStartDate = getDate(-1);
                szEndDate = getDate();
                break;
            case 2://最近1周
                szStartDate = getDate(-7);
                szEndDate = getDate();
                break;
            case 3: //自定义时间
                $('#endDate').val(getDateJoinMinus());
                $('#timeDiv').show();
                return;
            /*
             szStartDate = $('#startDate').val();
             szEndDate = $('#endDate').val();
             break;*/
        }
        searchCondition['startDate'] = szStartDate;
        searchCondition['endDate'] = szEndDate;
    }
    //为某个select添加元素的函数
    function addOptions(id, arr){
        var options = '';
        $.grep(arr, function(element, index){
            options += '<option value="'+ index +'">'+ element +'</option>'
        });
        $('#' + id).empty();
        $('#' + id).append(options);
    }
    function timeStampToNum(szTimeStamp){
        if(szTimeStamp.length < 21) return szTimeStamp;
        szTimeStamp = szTimeStamp.slice(6, -2);
        var nTimeStamp = parseInt(szTimeStamp, 10);
        return nTimeStamp;
    }
    //间隔符的时间转换为年月日间隔
    function timeTrans(szDate){
        var arrData = szDate.split(" ");
        var arr = arrData[0].split('-');
        var str = arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
        return str + arrData[1];
    }
    //获取日期，num为负数表示获取前n天的日期,0为今天的日期,正数为后n天的日期，minutes当前时间加minutes
    function getDateJoinMinus(num, minutes){
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
        return szYear + "-" + szMonth + "-" + szDate + " "+ szHours + ":" + szMinutes + ":" + szSeconds;
    }
    function getDate(days, hours, minutes){
        days = days || 0;
        hours = hours || 0;
        minutes = minutes || 0;
        var time= new Date().getTime() + days*24*60*60*1000;
        var date = new Date(time);
        var szYear = date.getFullYear();
        var szMonth = (date.getMonth() + 1).toString();
        szMonth = szMonth.length == 1 ? ("0" + szMonth) : szMonth;
        var szDate = (date.getDate()).toString();
        szDate = szDate.length == 1 ? ("0" + szDate) : szDate;
        var szHours = (date.getHours()).toString();
        szHours = (parseInt(szHours) + hours).toString();
        date.setHours(szHours);
        szHours = szHours.length == 1 ? ("0" + szHours) : szHours;
        var szMinutes = (date.getMinutes()).toString();
        szMinutes = (parseInt(szMinutes) + minutes).toString();
        date.setMinutes(szMinutes);
        szMinutes = szMinutes.length == 1 ? ("0" + szMinutes) : szMinutes;
        var szSeconds = (date.getSeconds()).toString();
        szSeconds = szSeconds.length == 1 ? ("0" + szSeconds) : szSeconds;
        return szYear + "年" + szMonth + "月" + szDate + "日"+ szHours + ":" + szMinutes + ":" + szSeconds;
    }
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
        var szHours = (date.getHours()).toString();
        szHours = szHours.length == 1 ? ("0" + szHours) : szHours;
        var szMinutes = (date.getMinutes()).toString();
        szMinutes = (date.getMinutes()).toString();
        szMinutes = szMinutes.length == 1 ? ("0" + szMinutes) : szMinutes;
        var szSeconds = (date.getSeconds()).toString();
        szSeconds = szSeconds.length == 1 ? ("0" + szSeconds) : szSeconds;
        return szYear + "-" + szMonth + "-" + szDate + " " + szHours + ":" + szMinutes + ":" + szSeconds;
    }
    function throttle(func, delay) {
        var prev = Date.now();
        return function() {
            var context = this;   //this指向window
            var args = arguments;
            var now = Date.now();
            if (now - prev >= delay) {
                func.apply(context, args);
                prev = Date.now();
            }
        }
    }
})();

//选择时间的点击事件
function timeFmt(){
    //WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss' ,lang:'en'});
    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss' ,lang:'zh-cn'});
}