/*
* 效果页面
* */
var charts = {iptv:'',hw:'',zx:'',hy:'',fh:''}
var xData = ['1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '7小时','8小时']
var yData = [60, 100, 100, 23, 88,98,88,100]
var options = {
    iptv:{
        backgroundColor: '#040f3c',
        title: {
            text: '',
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            top: '5%',
            left: 'center',
        },
        dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            bottom: 10,
            
            "start": 10,
            "end": 80,
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
    
        }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
        }],
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
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false,
                color: '#A582EA'
            },

            axisLabel: {
                color: '#A582EA',
                width: 100
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: xData,

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
                    opacity: 0.23
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
        series: [{
                name: '液压异常报警',
                type: 'line',
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
                    color: "#fff",
                    borderColor: "#A582EA",
                    borderWidth: 2,
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                data: [4, 7, 5, 4, 3, 5, 8] //data.values
            }
        ]
    },
    ott:{
        backgroundColor: '#040f3c',
        title: {
            text: '',
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            top: '5%',
            left: 'center',
        },
        dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            bottom: 10,
            
            "start": 10,
            "end": 80,
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
    
        }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
        }],
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
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false,
                color: '#A582EA'
            },

            axisLabel: {
                color: '#A582EA',
                width: 100
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: xData,

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
                    opacity: 0.23
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
        series: [{
                name: '液压异常报警',
                type: 'line',
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
                    color: "#fff",
                    borderColor: "#A582EA",
                    borderWidth: 2,
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                data: [4, 7, 5, 4, 3, 5, 8] //data.values
            }
        ]
    }
};
function initCharts(id,ydata,xdata = ['5', '10', '15', '20', '25', '30', '60']) {
    let option = id == 'iptv'? options.iptv: options.ott
    option.xAxis.data = xdata
    option.series[0].data = ydata
    option.title.text= OTT_company[id]
    var ele = document.getElementById(id);
    charts[id]= echarts.init(ele);
    charts[id].setOption(option);
}
function editCharts(id,ydata,xdata = ['5', '10', '15', '20', '25', '30', '60']) {
    let option = id.slice(2) == 'iptv'? options.iptv: options.ott
    option.xAxis.data = xdata
    option.series[0].data = ydata
    charts[id.slice(2)].setOption(option);
}
(function(){
    initCharts('iptv',yData)
    initCharts('hw',yData)
    initCharts('zx',yData)
    initCharts('hy',yData)
    initCharts('fh',yData)
})();