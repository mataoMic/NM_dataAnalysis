
function shows(_this) {
    _this.parent().parent().prev().children('.buttonText').text(_this.text())
}

function selectdDefault(id,value) {
    $('#'+id).find("option[value=" + value + "]").attr("selected", true);//再次渲染
}
// 动态实现Layui下拉框工具方法
var selectUtil = {
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
        // $select.append('<option value="">默认全部</option>');
        $.each(datas, function (index, item) {
            var $option = $('<option value="' + item[prop.id] + '">' + item[prop.text] +
                '</option>');
            $select.append($option);
        });
        form.render('select');
    }
}