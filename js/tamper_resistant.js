document.write("<script language=javascript src='/js/dataTable.js'></script>");
document.write("<script language=javascript src='/js/global.js'></script>");
var content_query
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
        layer.msg('查询中。。', {
            icon: 2,
            time: 15000 //2秒关闭（如果不配置，默认是3秒）
          }, function(){
            //2秒后自动执行这里面的内容
          }); 
        //表单数据formData
        var formData = data.field;
        let id = $(this).attr('id')
       switch (id) {
           case 'iptv':
            content_query(formData,id)
               break;
           default:
            content_query(formData,id)
               break;
       }
        console.log($(this).attr('id'))
        // editCharts(id,[99,55,44,66,12,66,12])
    });
})
$(function(params) {
    content_query = _debounce(function (param, id) {
        var data = {
            StartTime:'2014年01月01日',
            EndTime:'2020年05月19日',
            SelectedChannelType:'1'
        }
        $.ajax({
            type: "POST",
            url: SERVER_URL+"/Alarm/DegradeResistantList",
            data:data,
            dataType: "json",
            success: function (response) {
                editCharts(id, [99, 55, 44, 66, 12, 66, 12], )
                console.log(response)
            }
        });
    }, 500)
})