<<<<<<< HEAD
document.write("<script language=javascript src='/js/dataTable.js'></script>");
document.write("<script language=javascript src='/js/global.js'></script>");
var pic_content_query, subtitles_content_query
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
        //表单数据formData
        var formData = data.field;
        // editCharts()
        let id = $(this).attr('id')
        if (id.slice(2) == 'pic') {
            pic_content_query(Object.assign(formData, {
                SelectedChannelType: 1
            }), id)
        } else {
            subtitles_content_query(Object.assign(formData, {
                SelectedChannelType: 0
            }), id)
        }
        // editCharts(id, [99, 55, 44, 66, 12, 66, 12], )
        // renderTable(id.slice(2), tableDatas)
    });
})
$(function (params) {
    pic_content_query = _debounce(function (param, id) {
        var data = {
            StartTime: '2014年01月01日',
            EndTime: '2020年05月19日',
            SelectedChannelType: '1'
        }
        $.ajax({
            type: "POST",
            url: SERVER_URL + "/Alarm/DegradeTest",
            data: data,
            dataType: "json",
            success: function (response) {
                editCharts(id, [99, 55, 44, 66, 12, 66, 12], )
                renderTable(id.slice(2), tableDatas)
                layer.msg('查询成功', {
                    icon: 1,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //2秒后自动执行这里面的内容
                });
                console.log(response)
            }
        });
    }, 500)
    subtitles_content_query = _debounce(function (param, id) {
        var data = {
            StartTime: '2014年01月01日',
            EndTime: '2020年05月19日',
            SelectedChannelType: '1'
        }
        $.ajax({
            type: "POST",
            url: SERVER_URL + "/Alarm/DegradeSimulationList",
            data: data,
            dataType: "json",
            success: function (response) {
                editCharts(id, [99, 55, 44, 66, 12, 66, 12], )
                renderTable(id.slice(2), tableDatas)
                layer.msg('查询成功', {
                    icon: 1,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //2秒后自动执行这里面的内容
                });
                console.log(response)
            }
        });
    }, 500)
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
=======
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
>>>>>>> cfa981cfa6efbf233da787bc5b5626ca203645ab
}