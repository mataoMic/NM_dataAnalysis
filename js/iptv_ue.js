(function(){
    var src = [{
        "server": "包头", /*中心服务器*/
        "sub_server": "小区O", /*子服务器*/
        "network": "IPTV",
        "cdnName": "华为区公司209",
        "cdnIp": "192.168.0.209",
        "time": "2018-08-12 14:00:00",
        "channelName": " CCTVHD ",/*对应json文件中的 channel 字段，此时该字段为空*/
        "type": "50000 ", /* 50000 为机顶盒为机顶盒鉴权，首页，直播状态; 50001为机顶盒点播状态   */
        "stbSimulationTestedNum": "10000", /*机顶盒仿真测试次数*/
        "epgAuthenticationFailNum": "300", /*EPG认证失败次数*/
        "epgPageGetFailNum": "299", /*EPG页面获取失败次数*/
        "liveBroadcastTotalNum": "5000",/*直播状态含有该属性，直播总数*/
        "liveBroadcastFailNum": "300", /*直播状态含有该属性，直播播测失败次数*/
        "onDemandPlaybackNum": "10000", /*点播状态含有该属性，点播总数*/
        "onDemandPlaybackFailNum ": "300"/*点播状态含有该属性，点播播测失败次数*/
    }];
    src = [{
        'server': '包头',
        "time": "2018-08-12 14:00:00",
        "epgAuthenticationFailNum": "300"
    },{
        'server': '包头',
        "time": "2018-08-12 14:05:00",
        "epgAuthenticationFailNum": "100"
    },{
        server: '包头',
        "time": "2018-08-12 14:10:00",
        "epgAuthenticationFailNum": "50"
    },{
        server: '包头',
        "time": "2018-08-12 14:15:00",
        "epgAuthenticationFailNum": "220"
    },{
        server: '包头',
        "time": "2018-08-12 14:20:00",
        "epgAuthenticationFailNum": "90"
    }];
    var passRateTitleArr = ['EPG认证成功率', 'EPG页面达标率', '直播达标率', '点播达标率'];
    var colors = ['#f00', '#0f0', '#00f', '#ff0'];
    var option = {
        color: colors,
        legend: {
            data: passRateTitleArr,
            textStyle: {
                color: '#fff'
            }
        },
        title: {
            text: '报警数据',
            textStyle: {
                color: '#fff'
            },
            left: 60
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        toolbox: {
            show: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
            axisLabel: {
                color: '#fff'
            }},
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: '#fff'
            },
            axisPointer: {
                snap: true
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
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 300, 700, 600, 400].map(function(item){
                    return item/10;
                }),
                areaStyle: {}
            },
            {
                name: passRateTitleArr[1],
                type: 'line',
                lineStyle: {
                    color: colors[1]
                },
                smooth: true,
                data: [90, 30, 200, 110, 380, 530, 410, 440, 320, 280, 260, 280, 220, 410, 490, 640, 250, 420, 510, 310].map(function(item){
                    return item/10;
                }),
                areaStyle: {}
            },
            {
                name: passRateTitleArr[2],
                type: 'line',
                lineStyle: {
                    color: colors[2]
                },
                smooth: true,
                data: [100, 80, 50, 60, 70, 100, 250, 200, 200, 190, 180, 190, 200, 300, 400, 650, 100, 500, 400, 200].map(function(item){
                    return item/10;
                }),
                areaStyle: {}
            },
            {
                name: passRateTitleArr[3],
                type: 'line',
                lineStyle: {
                    color: colors[3]
                },
                smooth: true,
                data: [100, 230, 230, 210, 280, 330, 510, 540, 420, 380, 360, 380, 120, 510, 590, 740, 350, 520, 610, 410].map(function(item){
                    return item/10;
                }),
                areaStyle: {}
            }
        ]
    };
    var iptvUe = echarts.init(document.getElementById('iptvue'));
    iptvUe.setOption(option);
})();