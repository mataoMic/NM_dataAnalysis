document.write("<script language=javascript src='/js/constant.js'></script>");
function status(res){
  if(res){
    return '是'
  }else{
    return '否'
  }
}


//动态实现table表格
layui.use('table', function(){
    var table = layui.table;
    //第二个实例
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
     //展示已知数据
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
                ,{field: 'OverTime', title: '超时时刻'}
                ]],
        data:dataIptvUe,
        //,skin: 'line' //表格风格
        // even: true
        //,page: true //是否显示分页
        //,limits: [5, 7, 10]
        //,limit: 5 //每页默认显示的数量
    });
     //展示已知数据
    table.render({
        elem: '#live-ott-table',
        height: 319,
        cellMinWidth: 249, //全局定义常规单元格的最小宽度，
        cols: [[ //标题栏
            {field: 'date', title: '日期'}
                ,{field: 'test', title: '所有测试节目总数'}
                ,{field: 'failures', title: '测试失败节目总数'}
                ]],
        data:[
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
    ],
        //,skin: 'line' //表格风格
        // even: true
        //,page: true //是否显示分页
        //,limits: [5, 7, 10]
        //,limit: 5 //每页默认显示的数量
    });
});
