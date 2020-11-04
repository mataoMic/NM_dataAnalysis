document.write("<script language=javascript src='/js/dataTable.js'></script>");
layui.use(['form'], function () {
    var form = layui.form;
    // iptv
    selectUtil.render({
        id: 'iptv_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'iptv_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'iptv_channel_select',
        data: cancel_datas
    });
    // 华为
    selectUtil.render({
        id: 'hw_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'hw_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'hw_channel_select',
        data: cancel_datas
    });
    // 中兴
    selectUtil.render({
        id: 'zx_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'zx_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'zx_channel_select',
        data: cancel_datas
    });
    // 烽火
    selectUtil.render({
        id: 'fh_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'fh_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'fh_channel_select',
        data: cancel_datas
    });
    // 杭研
    selectUtil.render({
        id: 'hy_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'hy_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'hy_channel_select',
        data: cancel_datas
    });
    form.on('submit', function (data) {
        event.preventDefault()
        layer.msg('查询成功', {
            icon: 1,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
          }, function(){
            //2秒后自动执行这里面的内容
          }); 
        //表单数据formData
        var formData = data.field;
        // editCharts()
        console.log($(this).attr('id'))
        let id = $(this).attr('id')
        editCharts(id,[99,55,44,66,12,66,12])
    });
})