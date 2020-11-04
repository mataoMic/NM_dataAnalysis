document.write("<script language=javascript src='/js/dataTable.js'></script>");
layui.use(['form'], function () {
    var form = layui.form
    // 图片
    selectUtil.render({
        id: 'pic_platform_select',
        data: platform_datas
    });
    selectUtil.render({
        id: 'pic_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'pic_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'pic_channel_select',
        data: cancel_datas
    });
    // 字幕
    selectUtil.render({
        id: 'subtitles_platform_select',
        data: platform_datas
    });
    selectUtil.render({
        id: 'subtitles_time_select',
        data: time_datas
    });
    selectUtil.render({
        id: 'subtitles_company_select',
        data: company_datas
    });
    selectUtil.render({
        id: 'subtitles_channel_select',
        data: cancel_datas
    });
    // selectdDefault('pic_platform_select',1)
    // selectdDefault('pic_time_select',1)
    // selectdDefault('pic_company_select',1)
    // selectdDefault('pic_channel_select',1)

    // selectdDefault('subtitles_platform_select',1)
    // selectdDefault('subtitles_time_select',1)
    // selectdDefault('subtitles_company_select',1)
    // selectdDefault('subtitles_channel_select',1)
    
    form.render('select') 

    form.on('submit', function (data) {
        event.preventDefault()
        layer.msg('查询成功', {
            icon: 1,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, function () {
            //2秒后自动执行这里面的内容
        });
        //表单数据formData
        var formData = data.field;
        // editCharts()
        let id = $(this).attr('id')
        editCharts(id, [99, 55, 44, 66, 12, 66, 12], )
        renderTable(id.slice(2), tableDatas)
    });
})

function renderTable(id, dataArr) {
    var html = ''
    dataArr.forEach(e => {
        html += `<tr>
                <td>${e.time}</td>
                <td> ${e.chanelName} </td>
                <td> ${e.address}</td>
                <td> ${e.chanelIp}</td> 
                <td> ${e.alarm}</td>
                <td> ${e.pic}</td></tr>`
    });
    $('#' + id + '_alarm_table tbody').html(html)
    // $(html).appendTo($('#'+id+'_alarm_table tbody:last'));
}