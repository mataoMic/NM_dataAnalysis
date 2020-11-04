/**
 * Created with JetBrains PhpStorm.
 * User: xiaocai
 * Date: 14-10-27
 * Time: 下午4:08
 * To change this template use File | Settings | File Templates.
 */

/* 以下为ScrollEditableTable类提供的接口，若此处有某个接口尽量不要通过getHeadTable或getBodyTable获取单个表格类再调用相同名字的接口

getId:获取Id
setId(id):设置Id
getDom: 获取dom对象
enableTextEncode(enabled) : 设置是否需要为传入字符串编码
insertHead(headArray) : 插入表格表头
insertColumns(columnData, insertIndex) : 以json方式插入列
insertData(index, dataArray) : 插入表格数据
insertJsonData(index, jsonData) : 以json方式插入数据
addData(dataArray) : 添加表格数据
addJsonData(jsonData) : 以json方式添加数据
deleteAll : 删除所有行
deleteRow(index) : 删除行
setSelectRow(index) : 选中某行
getSelectRow : 获取选中行
deselectRow : 取消选中状态
getRowJson(index) : 获取行json
getColJson(index) : 获取列json
getHeadTable : 获取表头表格
getBodyTable : 获取内容表格
setHeadLineHeight(height) : 设置表头行高
setBodyLineHeight(height) : 设置内容行高
getOutmostDivStyle(styleName) : 获取最外层Div的style
setOutmostDivStyle(styleName, styleValue) : 设置最外层Div的style
hasHead : 判断是否有表头
getRowCount : 获取行数
getColCount : 获取列数
enableDragColWidth(enabled) : 设置表格的列宽可以鼠标拖动改变
setColsWidth(widthArray) : 设置列宽
getCaptionText : 获取caption
setCaptionText(text) : 设置caption
getCaptionStyle(styleName) : 获取caption style
setCaptionStyle(styleName, styleValue) : 设置caption style
getHeadCellChecked(index) : 获取表头单元格选中状态
getCellChecked(rowIndex, colIndex) : 获取单元格选中状态
setHeadCellChecked(index, checked) : 设置表头单元格选中状态
setCellChecked(rowIndex, colIndex, checked) : 设置单元格选中状态
enableHeadCellCheck(index, enabled, checked) : 启用或禁用表头项的复选框
enableCellCheck(rowIndex, colIndex, enabled, checked) : 启用或禁用表格单元格的复选框
enableColCellsCheck(index, enabled, checked) : 启用或禁用某列所有单元格的复选框
renderToDomObj(domObj) : 将表格显示到某个对象里
renderToDomObjById(id) : 将表格显示到某id的元素里
appendToDomObj(domObj) : 将表格添加到某个dom对象里
appendToDomObjById(id) : 将表格添加到某个id的元素里
getCheckedRowsJsonArray(colIndex) : 获取所有选中行的json数据
getCheckedRowsCount(colIndex) : 获取选中行数
setHeadCellCheckBoxGrayed(index, isGrayed) : 将表头单元格复选框设置为灰色
setCellCheckBoxGrayed(rowIndex, colIndex, isGrayed) : 将表格单元格复选框设置为灰色
setColCellsCheckBoxGrayed(index, isGrayed) : 将表格列复选框设置为灰色
isHeadCellCheckBoxGrayed(index) : 判断表头单元格复选框是否置灰
isHeadCellCheckBoxGrayChecked(index) : 判断表头单元格复选框是否选中且置灰的状态
isCellCheckBoxGrayed(rowIndex, colIndex) : 判断表格单元格复选框是否置灰
 isCellCheckBoxGrayChecked(rowIndex, colIndex) : 判断表格单元格复选框是否选中且置灰的状态
isColCellsCheckBoxGrayed(index) : 判断表格列复选框是否全置灰
refreshRow(index) : 刷新行显示
enableCellEdit = function (rowIndex, colIndex, enabled) : 设置某单元格可编辑
disableCellEdit = function (rowIndex, colIndex, enabled) : 取消某单元格可编辑功能
enableColCellsEdit = function (colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) : 设置某列单元格全部可编辑
setSelectRowInGroup = function (groupFieldVal, rowIndex) : 设置选中行
getSelectRowInGroup = function () : 获取选中行所在组的字段值及选中行索引组成的json
isGroupExpanded = function (groupFieldVal) : 获取分组展开状态
expandGroup = function (groupFieldVal, expand) : 展开分组
isGroupHead = function (rawRowIndex) : 判断是否是分组标题行
getGroupTitle = function (groupFieldVal) : 获取分组标题
setGroupTitle = function (groupFieldVal, title) : 设置分组标题
enableGroupCellEdit = function (groupFieldVal, rowIndex, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) : 设置某个单元格为可编辑单元格
enableColCellsEdit = function (colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) : 设置某列单元格全部可编辑
disableGroupCellEdit = function (groupFieldVal, rowIndex, colIndex) : 使单元格不可编辑
getGroupCellChecked = function (groupFieldVal, rowIndex, colIndex) : 判断单元格复选框是否选中
setGroupCellChecked = function (groupFieldVal, rowIndex, colIndex, checked) : 设置单元格选中状态
deleteGroup = function (groupFieldVal, flag) : 删除组,flag--0表示组名和元素名全部删除；1--表示只删除元素组名不删除
getRawRowIndex = function (groupFieldVal, index) : 根据分组字段值和组内索引获取总索引
getGroupAndRowIndex = function (rawRowIndex) : 根据总索引获取组字段值和行索引组成的json
appendHeadChildDomObj = function (index, domObj) :为表头单元格添加子dom对象
appendCaptionChildDomObj = function (domObj) :为Caption添加子dom对象
*/



/*
    目前本类基本作为一个基本类使用，为其他公用类做支撑。
 */
function EditableTable(id, width, height) {
    var instance = {},
        me = this;

    var BORDER_INIT_WIDTH = "0px";         // 边框默认宽度
    var BORDER_INIT_COLOR = "#CFD6E3";       // 边框默认颜色

    this.tableId = id;

    this.isTextEncodeEnable = true;    // 是否需要将传入的字符串编码，即是否保留html标签，空格等

    this.table = null;      // 表格的dom对象
    this.tHead = null;      // 表格表头的dom对象
    this.tBody = null;      // 表格内容的dom对象
    this.colorJson = {
        "thBkColor": "#1C86EE",          // 表头背景色
        //"thBkColor": "#1782D8",
        "oddBkColor": "#F0F3F7",         // 奇数行背景色
        "evenBkColor": "#FFFFFF",        // 偶数行背景色
        "thTextColor": "#FFF",           // 表头文字颜色
        //"selRowBkColor": "#51b2f6"      // 选中行背景色
        "selRowBkColor": "#CEE3FF"
    };

    this.headAlignment = "center";        // 表头文字对齐方式
    this.lineHeight = "30px";             // 表格行高
    this.colPropertyJsonArray = [];       // 列属性json数组，属性包括：title、dataIndex、width、editable、onEditorBeforeShow、onEditorChanged、
                                          // onEditorBlur、checkIndex、checkEnable、checkStatus、checkGrayed、onHeadCellBeforeChecked、
                                          // onHeadCellChecked、onCellsBeforeChecked、onCellsChecked
    this.colsWidthArray = [];             // 表格各列宽度
    this.rowDataArray = [];               // 表格行数据，为json数组，属性包括：row--行对象  extraData--附加数据  rowJson--行json数据
    this.selRowObj = null;                // 选中行
    this.bSelectable = true;              // 是否可以选中
    this.beforeSelRowCallback = null;     // 选中某行前的回调函数
    this.selRowCallback = null;           // 选中某行后的回调函数
    this.beforeDeselRowCallback = null;   // 取消选中某行前的回调函数
    this.deselRowCallback = null;         // 取消选中某行后的回调函数
    this.colsWidthDragEnabled = true;

    this.colMinWidth = 20;


    // 创建表格对象
    instance.create = function (id, tableWidth, tableHeight) {
        var tdStyle = null,
            tdStyleString = " td {cursor: default; padding-left: 2px; overflow: hidden; border-width: 0 1px 0 0; " +
                "border-style: solid; border-color:transparent; box-sizing: border-box; -moz-box-sizing: border-box;" +
                "-ms-box-sizing: border-box; -webkit-box-sizing: border-box; height: inherit;}",
            tdStyleText = null;

        me.table = document.createElement("table");
        if (!me.tableId) {
            me.tableId = "editableTable" + Math.round(Math.random() * 1000000);
        }
        me.table.id = me.tableId;

        if (tableWidth) {
            me.table.style.width = tableWidth;
        }
        if (tableHeight) {
            me.table.style.height = tableHeight;
        }
        //me.table.border = 1;
        me.tBody = document.createElement("tbody");
        me.tHead = document.createElement("thead");
        me.tHead.style.borderColor = "#eeeecc";
        me.table.appendChild(me.tHead);
        me.tHead.appendChild(document.createElement("tr"));
        me.table.appendChild(me.tBody);
        me.table.style.margin = "0";
        me.table.style.borderCollapse = "collapse";
        me.table.style.borderColor = BORDER_INIT_COLOR;
        me.table.style.borderWidth = BORDER_INIT_WIDTH;
        me.table.style.borderBottom = "1px solid #D0D3D7";
        me.table.style.fontSize = "15px";
        me.table.style.fontFamily = "arial,宋体,serif";
        me.table.style.tableLayout = "fixed";
        me.table.style.wordBreak = "break-word";
        me.table.style.wordWrap = "break-all";
        me.table.setAttribute("class", "borderBox tableBox");

        me.table.onclick = function (event) {
            var el = event.srcElement ? event.srcElement : event.target;

            if (el.tagName.toLowerCase() !== "td") {
                return;
            }

            me.selectRow(el.parentNode);
        };

        // 设置所有td的样式
        tdStyleString = "#" + me.tableId + tdStyleString + " #" + me.tableId + " th {padding-left: 2px;}";
        tdStyle = document.createElement("style");
        tdStyle.setAttribute("type", "text/css");
        if (tdStyle.styleSheet) {     // IE
            tdStyle.styleSheet.cssText = tdStyleString;
        } else {
            tdStyleText = document.createTextNode(tdStyleString);
            tdStyle.appendChild(tdStyleText);
        }
        me.table.appendChild(tdStyle);
    };

    instance.create(id, width, height);

    // 获取表格id
    instance.getId = function () {
        return me.tableId;
    };

    // 设置表格Id
    instance.setId = function (id) {
        if (id) {
            me.table.setAttribute("id", id);
        }
    };

    // 获取dom对象
    instance.getDom = function () {
        return me.table;
    };

    // 获取innerText，支持firefox浏览器
    this.getInnerText = function (domObj) {
        return domObj.innerHTML.decodeHtml();
    };

    // 设置innerText，支持firefox浏览器
    this.setInnerText = function (domObj, text) {
        var i = 0,
            textNode = null,
            spanEl = document.createElement("span");

        //text = me.isTextEncodeEnable ? text.toString().encodeHtml() : text;

        //spanEl.innerHTML = text;
        spanEl.appendChild(document.createTextNode(text));

        for (i = 0; i < spanEl.childNodes.length; i += 1) {
            if (3 === spanEl.childNodes[i].nodeType) {
                textNode = spanEl.childNodes[i];
                break;
            }
        }
        if (null === textNode) {
            return;
        }

        if (domObj.childNodes.length) {
            for (i = 0; i < domObj.childNodes.length; i += 1) {
                if (3 === domObj.childNodes[i].nodeType) {   // 为文本类型
                    domObj.insertBefore(textNode, domObj.childNodes[i]);
                    domObj.removeChild(domObj.childNodes[i + 1]);
                    return;
                }
            }
        }

        domObj.appendChild(textNode);
    };

    // 获取为传入字符串编码的使能开关
    instance.isTextEncodeEnabled = function () {
        return  me.isTextEncodeEnable;
    };

    // 设置是否需要为传入字符串编码
    instance.enableTextEncode = function (enabled) {
        me.isTextEncodeEnable = enabled;
    };

    // 设置是否可以选中行
    instance.enableSelect = function (selectable) {
        me.bSelectable = selectable;
    };

    // 选中表格中某行
    instance.setSelectRow = function (rowIndex) {
        if (rowIndex < 0 ||
                rowIndex >= instance.getRowCount()) {
            return;
        }

        rowIndex += 1;

        me.selectRow(me.table.rows[rowIndex]);
    };

    // 获取选中行索引
    instance.getSelectRow = function () {
        if (me.selRowObj) {
            return me.selRowObj.rowIndex - 1;
        } else {
            return -1;
        }
    };

    // 滚动某行到可视区域
    this.scrollRowIntoView = function (rowObj) {
        var htmlWidth = 0,
            htmlHeight = 0,
            parentRect = null,
            rowRect = null;

        if (!(rowObj instanceof Object)) {
            return;
        }

        parentRect = getRect(me.table.parentNode);
        rowRect = getRect(rowObj);
        htmlWidth = document.documentElement.clientWidth;
        htmlHeight = document.documentElement.clientHeight;

        if (rowRect.top >= htmlHeight ||
                rowRect.top >= parentRect.bottom ||
                rowRect.bottom <= 0 ||
                rowRect.bottom <= parentRect.top ||
                rowRect.left >= htmlWidth ||
                rowRect.left >= parentRect.right ||
                rowRect.right <= 0 ||
                rowRect.right <= parentRect.left) {
            setTimeout(function () {
                rowObj.scrollIntoView(true);
            }, 1);
        }
    };

    // 选中某行时的处理
    this.selectRow = function (rowObj) {
        if (!(rowObj instanceof Object) ||
            (rowObj instanceof Object &&
            rowObj.rowIndex < 1) ||
                !me.bSelectable) {
            return false;
        }

        if (me.beforeSelRowCallback &&
                false === me.beforeSelRowCallback(rowObj.rowIndex - 1)) {
            return false;
        }

        instance.deselectRow();

        rowObj.style.backgroundColor = me.colorJson.selRowBkColor;
        me.selRowObj = rowObj;

        if (this.selRowCallback) {
            this.selRowCallback(rowObj.rowIndex - 1);
        }

        me.scrollRowIntoView(rowObj);

        return true;
    };

    // 取消选中行的选中状态
    instance.deselectRow = function () {
        var isOddRow = true;

        if (null !== me.selRowObj) {
            if (me.beforeDeselRowCallback &&
                    false === me.beforeDeselRowCallback(me.selRowObj.rowIndex - 1)) {
                return;
            }

            /*if (1 === (me.selRowObj.rowIndex - 1) % 2) {
                isOddRow = false;
            }

            if (isOddRow) {
                me.selRowObj.style.backgroundColor = me.colorJson.oddBkColor;
            } else {
                me.selRowObj.style.backgroundColor = me.colorJson.evenBkColor;
            }*/

            instance.setOddLineBkColor(me.colorJson.oddBkColor);
            instance.setEvenLineBkColor(me.colorJson.evenBkColor);

            if (me.deselRowCallback) {
                me.deselRowCallback(me.selRowObj.rowIndex - 1);
            }

            me.selRowObj = null;
        }
    };

    // 获取表格style
    instance.getTableStyle = function (styleName) {
        if (me.table.style[styleName] &&
                "" !== me.table.style[styleName]) {
            return me.table.style[styleName];
        }

        return me.table[styleName];
    };

    // 设置表格style
    instance.setTableStyle = function (styleName, styleValue) {
        me.table.style[styleName] = styleValue;
    };

    // 获取caption
    instance.getCaptionText = function () {
        if (me.table.caption) {
            return me.getInnerText(me.table.caption);
        }

        return null;
    };

    // 设置caption
    instance.setCaptionText = function (text) {
        if (!me.table.caption) {
            me.table.createCaption();
            //me.table.caption.backgroundColor = "#EFEFEF";
            me.table.caption.style.backgroundColor = "#1782D8";
            me.table.caption.style.padding = "5px";
            me.table.caption.style.fontSize = "15px";
            //me.table.caption.style.color = "#223657";
            me.table.caption.style.fontWeight = "bold";
            me.table.caption.style.color = "#fff";
        }

        if (me.isTextEncodeEnable) {
            me.table.caption.innerHTML = text.toString().encodeHtml();
        } else {
            me.table.caption.innerHTML = text;
        }
    };

    // 获取caption style
    instance.getCaptionStyle = function (styleName) {
        if (me.table.caption.style[styleName] &&
                "" !== me.table.caption.style[styleName]) {
            return me.table.caption.style[styleName];
        }

        return me.table.style[styleName];
    };

    // 设置caption style
    instance.setCaptionStyle = function (styleName, styleValue) {
        me.table.caption.style[styleName] = styleValue;
    };

    // 为caption添加子dom对象
    instance.appendCaptionChildDomObj = function (domObj) {
        if (me.table.caption) {
            me.table.caption.appendChild(domObj);
        }
    };

    // 判断当前是否有表头
    instance.hasHead = function () {
        return "none" !== me.tHead.style.display;
    };

    // 显示表头
    instance.showHead = function () {
        me.table.rows[0].style.display = "table-row";
    };

    // 隐藏表头
    instance.hideHead = function () {
        me.table.rows[0].style.display = "none";
//        me.table.rows[0].style.display = "";
//        me.table.style['margin-top'] = "-30px";
//        me.table.children[0].style['opacity'] = '0';
    };

    // 插入表格表头
    instance.insertHead = function (headArray) {
        var i = 0,
            colPropertyJsonArray = [];

        if (!(headArray instanceof Array) ||
                me.colPropertyJsonArray.length) {
            return;
        }

        me.colsWidthArray = [];

        me.colPropertyJsonArray = [];

        for (i = 0; i < headArray.length; i += 1) {
            colPropertyJsonArray.push({
                title: headArray[i],
                dataIndex: i,
                editable: false,
                onEditorBeforeShow: null,
                onEditorChanged: null,
                onEditorBlur: null,
                checkIndex: null,
                checkEnable: false,
                checked: false,
                onHeadCellBeforeChecked: null,
                onHeadCellChecked: null,
                onCellsBeforeChecked: null,
                onCellsChecked: null
            });

            me.colsWidthArray.push("auto");
        }

        instance.insertColumns(colPropertyJsonArray);
    };

    // 获取某列的属性json
    instance.getColumnProperty = function (index) {
        if (index < 0 || index >= me.colPropertyJsonArray.length) {
            return null;
        }
        return me.colPropertyJsonArray[index];
    };

    // 以json方式插入表头
    // 参数columnData，可为json数组或者json类型，json属性包括：title、dataIndex、width、editable、onEditorBeforeShow, onEditorChanged
    // onEditorBlur、checkIndex、checkEnable、checkGrayed、onHeadCellBeforeChecked、onHeadCellChecked、onCellsBeforeChecked、onCellsChecked
    instance.insertColumns = function (columnData, insertIndex) {
        var columnJson = null,
            columnJsonArray = null,
            i = 0,
            j = 0;

        if (undefined === insertIndex) {
            insertIndex = 0;
        }

        if (!(columnData instanceof Object) &&
                !(columnData instanceof Array) &&
                (insertIndex < 0 || insertIndex > instance.getColCount())) {
            return;
        }

        if (columnData instanceof Array) {
            columnJsonArray = columnData;
        } else {
            columnJsonArray = [columnData];
        }

        for (i = columnJsonArray.length - 1; i >= 0; i -= 1) {
            if (!(columnJsonArray[i] instanceof Object)) {
                continue;
            }

            for (j = 0; j < me.colPropertyJsonArray.length; j += 1) {
                if (columnJsonArray[i].dataIndex === me.colPropertyJsonArray[j].dataIndex) {
                    break;
                }
            }
            if (j !== me.colPropertyJsonArray.length) {
                continue;
            }

            columnJson = $.extend({
                title: "",
                dataIndex: null,
                width: "auto",
                editable: false,
                onEditorBeforeShow: null,
                onEditorChanged: null,
                onEditorBlur: null,
                checkIndex: null,
                checkEnable: false,
                checked: false,
                checkGrayed: false,
                onHeadCellBeforeChecked: null,
                onHeadCellChecked: null,
                onCellsBeforeChecked: null,
                onCellsChecked: null
            }, columnJsonArray[i]);

            me.colPropertyJsonArray.splice(insertIndex, 0, columnJson);
            for (j = 0; j < me.table.rows.length; j += 1) {
                if (0 === j) {
                    me.table.rows[j].insertBefore(document.createElement("th"),
                        me.table.rows[j].cells.length ? me.table.rows[j].cells[insertIndex] : null);
                    me.setInnerText(me.table.rows[j].cells[insertIndex], columnJson.title);
                    if (columnJson.checkEnable) {
                        instance.enableHeadCellCheck(insertIndex, true, columnJson.onHeadCellChecked, columnJson.onHeadCellBeforeChecked);
                        if (columnJson.checkGrayed) {
                            instance.setHeadCellCheckBoxGrayed(insertIndex, true);
                        }
                    }
                } else {
                    me.table.rows[j].insertBefore(document.createElement("td"),
                        me.table.rows[j].cells.length ? me.table.rows[j].cells[insertIndex] : null);
                    me.setInnerText(me.table.rows[j].cells[insertIndex], "");
                    if (columnJson.editable) {
                        instance.enableCellEdit(j - 1, insertIndex, columnJson.onEditorChanged, columnJson.onEditorBlur, columnJson.onEditorBeforeShow);
                    }
                    if (columnJson.checkEnable) {
                        instance.enableCellCheck(j - 1, insertIndex, true, columnJson.onCellsChecked, columnJson.onCellsBeforeChecked);
                        if (columnJson.checkGrayed) {
                            instance.setCellCheckBoxGrayed(j - 1, insertIndex, true);
                        }
                    }
                }
            }

            me.colsWidthArray.splice(insertIndex, 0, columnJson.width);
        }

        me.table.rows[0].style.height = me.lineHeight;
        me.table.rows[0].style.backgroundColor = me.colorJson.thBkColor;
        me.table.rows[0].style.color = me.colorJson.thTextColor;

        me.tHead.style.textAlign = me.headAlignment;
        instance.setColsWidth(me.colsWidthArray);
        instance.setHeadAlignment(me.headAlignment);
        me.setHeadCellRightBorder();
        instance.enableDragColWidth(me.colsWidthDragEnabled);
    };

    // 添加表格内容
    instance.addData = function (dataArray) {
        return instance.insertData(instance.getRowCount(), dataArray);
    };

    // 以json方式添加表格内容
    // json属性为每列数据的dataIndex
    instance.addJsonData = function (jsonData) {
        return instance.insertJsonData(me.table.rows.length - 1, jsonData);
    };

    // 插入表格内容
    instance.insertData = function (index, dataArray) {
        var insertIndex = index,
            jsonArray = null,
            headArray = null,
            i = 0,
            maxDataLen = 0,
            res = -1;

        if (0 === me.colPropertyJsonArray.length) {
            for (i = 0; i < dataArray.length; i += 1) {
                if (dataArray[i].length > maxDataLen) {
                    maxDataLen = dataArray[i].length;
                }
            }

            if (0 === maxDataLen) {
                return null;
            }
            /*for (i = 0; i < maxDataLen; i += 1) {
                me.colPropertyJsonArray.push({
                    title: "",
                    dataIndex: i,
                    editable: false,
                    onCellsChanged: null,
                    onCellsBlur: null,
                    enableCheck: false,
                    checked: false,
                    onHeadCellChecked: null,
                    onCellsChecked: null
                });
            }*/

            headArray = new Array (maxDataLen);
            instance.insertHead(headArray);
            instance.hideHead();
        }

        jsonArray = me.twoDimArrayToJsonArray(dataArray);

        if (0 === jsonArray.length) {
            return null;
        }

        if (insertIndex >= instance.getRowCount()) {
            insertIndex = instance.getRowCount();
        }

        res = me.simpleInsertData(insertIndex, jsonArray);

        insertIndex += 1;

        return [{
            groupFieldValue: null,
            index: res
        }];
    };

    // 以json方式插入表格内容
    // json属性为每列数据的dataIndex
    instance.insertJsonData = function (index, jsonData) {
        var jsonDataArray = null;

        if (!(jsonData instanceof Array) &&
                !(jsonData instanceof Object)) {
            return null;
        }

        if (jsonData instanceof Array) {
            jsonDataArray = jsonData;
        } else {
            jsonDataArray = [jsonData];
        }

        return [{
            groupFieldValue: null,
            index: me.simpleInsertData(index, jsonDataArray)
        }];
    };

    // 简单方式插入表格内容，即直接在某个位置插入
    this.simpleInsertData = function (index, jsonArray) {
        var i = 0,
            j = 0,
            nextTr = null,
            tr = null,
            td = null,
            realIndex = index,
            dataArray = null,
            oHeadCellCheckBox = null,
            startRowIndex = 0;

        if (!(jsonArray instanceof Array) ||
                0 === jsonArray.length ||
                0 === me.colPropertyJsonArray.length) {
            return -1;
        }

        dataArray = me.jsonArrayToTwoDimArray(jsonArray);

        if (index < 0) {
            realIndex = 0;
        }
        realIndex += 1;
        if (realIndex >= me.table.rows.length) {
            realIndex = me.table.rows.length;
            nextTr = null;
        } else {
            nextTr = me.table.rows[realIndex];
        }

        startRowIndex = realIndex - 1;

        for (i = 0; i < dataArray.length; i += 1) {
            tr = document.createElement("tr");
            me.tBody.insertBefore(tr, nextTr);

            tr.style.height = me.lineHeight;

            for (j = dataArray[i].length - 1; j >= 0; j -= 1) {
                td = tr.insertCell(0);
                if (me.isTextEncodeEnable) {
                    td.innerHTML = null === dataArray[i][j] ? "" : dataArray[i][j].toString().encodeHtml();
                } else {
                    td.innerHTML = null === dataArray[i][j] ? "" : dataArray[i][j];
                }
            }

            for (j = 0; j < dataArray[i].length; j += 1) {
                if (me.colPropertyJsonArray[j].editable) {
                    instance.enableCellEdit(startRowIndex + i, j, me.colPropertyJsonArray[j].onEditorChanged, me.colPropertyJsonArray[j].onEditorBlur,
                        me.colPropertyJsonArray[j].onEditorBeforeShow);
                }
                if (me.colPropertyJsonArray[j].checkEnable) {
                    if (me.colPropertyJsonArray[j].hasOwnProperty("checkIndex") &&
                            me.colPropertyJsonArray[j].checkIndex &&
                            jsonArray[i].hasOwnProperty(me.colPropertyJsonArray[j].checkIndex) &&
                            jsonArray[i][me.colPropertyJsonArray[j].checkIndex]) {
                        instance.enableCellCheck(startRowIndex + i, j, true, true);
                    } else {
                        if (!me.colPropertyJsonArray[j].hasOwnProperty("checkStatus")) {
                            me.colPropertyJsonArray[j].checkStatus = false;
                        }
                        instance.enableCellCheck(startRowIndex + i, j, true, me.colPropertyJsonArray[j].checkStatus);
                    }

                    if (me.colPropertyJsonArray[j].checkGrayed) {
                        instance.setCellCheckBoxGrayed(startRowIndex + i, j, true);
                    }
                }
            }

            // 创建对象并插入rowDataArray
            me.rowDataArray.push({
                row: tr,
                extraData: null,
                rowJson: jsonArray[i]
            });
        }

        oHeadCellCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[index]);
        if (oHeadCellCheckBox) {
            for (i = 0; i < instance.getColCount(); i += 1) {
                if (me.colPropertyJsonArray[i].checkEnable) {
                    if (instance.isAllColCellsChecked(i)) {
                        me.setCheckBoxChecked(oHeadCellCheckBox, true);
                    } else {
                        me.setCheckBoxChecked(oHeadCellCheckBox, false);
                    }
                }
            }
        }

        instance.setOddLineBkColor(me.colorJson.oddBkColor);
        instance.setEvenLineBkColor(me.colorJson.evenBkColor);
        instance.setColsWidth(me.colsWidthArray);
        instance.setSelRowColor(me.colorJson.selRowBkColor);

        return realIndex - 1;
    };

    // 判断某一列是否都选中
    instance.isAllColCellsChecked = function (index) {
        var i = 0;

        if (index < 0 ||
                index >= instance.getColCount()) {
            return false;
        }

        for (i = 0; i < instance.getRowCount(); i += 1) {
            if (instance.isCellCheckEnabled(i, index) &&
                    !instance.isCellCheckBoxGrayed(i, index) &&
                    !instance.getCellChecked(i, index)) {
                return false;
            }
        }

        return true;
    };

    // 将二维数组转换为一维json数组
    this.twoDimArrayToJsonArray = function (twoDimArray) {
        var jsonArray = [],
            i = 0,
            j = 0,
            rowJson = null;

        if (!(twoDimArray instanceof Array) ||
                0 === twoDimArray.length ||
                0 === me.colPropertyJsonArray.length) {
            return [];
        }

        for (i = 0; i < twoDimArray.length; i += 1) {
            rowJson = {};
            for (j = 0; j < me.colPropertyJsonArray.length; j += 1) {
                if (twoDimArray[i].hasOwnProperty(j) &&
                        null !== twoDimArray[i][j]) {
                    rowJson[me.colPropertyJsonArray[j].dataIndex] = twoDimArray[i][j].toString();
                } else {
                    rowJson[me.colPropertyJsonArray[j].dataIndex] = "";
                }
            }

            jsonArray.push(rowJson);
        }

        return jsonArray;
    };

    // 将一维json数组转换为二维数组
    this.jsonArrayToTwoDimArray = function (jsonArray) {
        var twoDimArray = [],
            rowArray = null,
            i = 0,
            j = 0;

        if (0 === me.colPropertyJsonArray.length) {
            return [];
        }

        for (i = 0; i < jsonArray.length; i += 1) {
            rowArray = [];
            for (j = 0; j < me.colPropertyJsonArray.length; j += 1) {
                if (!jsonArray[i].hasOwnProperty(me.colPropertyJsonArray[j].dataIndex)) {
                    rowArray.push("");
                } else {
                    rowArray.push(jsonArray[i][me.colPropertyJsonArray[j].dataIndex]);
                }
            }
            twoDimArray.push(rowArray);
        }

        return twoDimArray;
    };

    // 设置可编辑单元格的点击和blur响应
    this.setEditableCellFunc = function (rowIndex, colIndex, onEditorChanged, changedParamArray, onEditorBlur,
        blurParamArray, onEditorBeforeShow, beforeShowParamArray) {
        var cell = instance.getCell(rowIndex, colIndex),
            isKeyuped = false;

        if (!cell) {
            return false;
        }

        cell.onclick = function () {
            var cellText = me.getInnerText(this),
                rowIndex = cell.parentNode.rowIndex - 1,
                colIndex = cell.cellIndex,
                beforeShowFunc = null,
                beforeShowFuncRes = null,
                input = null,
                i = 0;

            for (i = 0; i < this.childNodes.length; i += 1) {
                if (this.childNodes[i].nodeName.toLowerCase() === "input") {
                    return;
                }
            }

            input = document.createElement("input");
            input.type = "text";
            if (onEditorBeforeShow) {
                beforeShowFunc = onEditorBeforeShow;
            } else if (me.colPropertyJsonArray[colIndex].onEditorBeforeShow) {
                beforeShowFunc = me.colPropertyJsonArray[colIndex].onEditorBeforeShow;
            }

            if (beforeShowFunc) {
                beforeShowFuncRes = beforeShowFunc.apply(this, [input].concat(beforeShowParamArray));
                if (true === beforeShowFuncRes ||
                    undefined === beforeShowFuncRes) {
                    input.value = cellText;
                } else if (false === beforeShowFuncRes) {
                    return;
                } else {
                    input.value = beforeShowFuncRes;
                }
            } else {
                input.value = cellText;
            }

            input.style.width = "100%";
            input.style.height = "100%";
            cell.innerHTML = "";
            cell.appendChild(input);
            input.focus();
            input.select();

            function onInputChanged(event) {
                var rowIndex = 0,
                    colIndex = 0;

                rowIndex = input.parentNode.parentNode.rowIndex - 1;
                colIndex = input.parentNode.cellIndex;

                if (typeof onEditorChanged === "function") {
                    onEditorChanged.apply(this, [input].concat(changedParamArray));
                }
            }

            if ("\v" === "v") {    // 如果为IE
                input.onpropertychange = onInputChanged;
            } else {
                input.addEventListener("input", onInputChanged, false);
            }

            input.onkeyup = function (event) {
                var oriValue = null;

                switch (event.which) {
                    case 13:
                        //cellText = input.value;//bug37607表格编辑按回车超出范围提示后仍显示错误值问题
                        isKeyuped = true;
                        input.blur();
                        isKeyuped = false;
                        break;
                    case 27:
                        isKeyuped = true;
                        input.blur();
                        isKeyuped = false;
                        break;
                    default:
                        break;
                }
            };

            input.onblur = function () {
                var rowIndex = 0,
                    colIndex = 0,
                    editorBlurRes = null;

                rowIndex = input.parentNode.parentNode.rowIndex - 1;
                colIndex = input.parentNode.cellIndex;

                if (onEditorBlur) {
                    editorBlurRes = onEditorBlur.apply(this, [input].concat(blurParamArray));
                    if (false === editorBlurRes) {
                        return false;
                    } else if (undefined !== editorBlurRes) {
                        cellText = editorBlurRes;
                    }
                }

                if ((undefined === editorBlurRes ||
                    null === editorBlurRes) &&
                    !isKeyuped) {
                    cellText = input.value;
                }
                if (me.isTextEncodeEnable) {
                    cell.innerHTML = cellText.toString().encodeHtml();
                } else {
                    cell.innerHTML = cellText;
                }
            };
        };

        return true;
    };

    // 设置某个单元格为可编辑单元格
    instance.enableCellEdit = function (rowIndex, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        return me.setEditableCellFunc(rowIndex, colIndex, onEditorChanged, [rowIndex, colIndex], onEditorBlur,
            [rowIndex, colIndex], onEditorBeforeShow, [rowIndex, colIndex]);
    };

    // 使单元格不可编辑
    instance.disableCellEdit = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex);

        if (cell) {
            cell.onclick = null;
            cell.onblur = null;
            return true;
        }

        return false;
    };

    // 设置某列单元格全部可编辑
    instance.enableColCellsEdit = function (colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        var i = 0,
            length = me.table.rows.length;

        if (colIndex >= instance.getColCount()) {
            return;
        }

        length -= 1;

        for (i = 0; i < length; i += 1) {
            instance.enableCellEdit(i, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow);
        }

        me.colPropertyJsonArray[colIndex].editable = true;
        me.colPropertyJsonArray[colIndex].onEditorBeforeShow = onEditorBeforeShow;
        me.colPropertyJsonArray[colIndex].onEditorChanged = onEditorChanged;
        me.colPropertyJsonArray[colIndex].onEditorBlur = onEditorBlur;
    };

    // 使某列单元格都不可编辑
    instance.diableColCellsEdit = function (colIndex) {
        var i = 0;

        if (colIndex >= instance.getColCount()) {
            return;
        }

        for (i = 1; i < me.table.rows.length; i += 1) {
            if (instance.disableCellEdit(i, colIndex)) {
                me.colPropertyJsonArray[colIndex].editable = false;
            }
        }
    };

    // 根据checkBox对象获取行列索引
    // 返回值为json数据，rowIndex--行索引（表头为-1）  colIndex--列索引，失败则返回false
    this.getCheckBoxCellIndexsJson = function (oCheckBox) {
        var i = 0,
            j = 0,
            cell = null;

        if (!oCheckBox ||
                !(oCheckBox instanceof HTMLElement)) {
            return false;
        }

        for (i = 0; i < instance.getColCount(); i += 1) {
            if (oCheckBox === me.getCheckBoxChild(me.table.rows[0].cells[i])) {
                return {
                    rowIndex: -1,
                    colIndex: i
                };
            }
        }

        for (i = 0; i < instance.getRowCount(); i += 1) {
            for (j = 0; j < instance.getColCount(); j += 1) {
                cell = instance.getCell(i, j);
                if (cell) {
                    if (oCheckBox === me.getCheckBoxChild(cell)) {
                        return {
                            rowIndex: i,
                            colIndex: j
                        };
                    }
                }
            }
        }

        return false;
    };

    // 复选框点击响应
    this.onCheckBoxClick = function (oCheckBox) {
        var indexsJson = me.getCheckBoxCellIndexsJson(oCheckBox),
            beforeCheckRes = true;

        if (false === indexsJson) {
            return;
        }

        if (-1 === indexsJson.rowIndex) {
            if (me.colPropertyJsonArray[indexsJson.colIndex].hasOwnProperty("onHeadCellBeforeChecked") &&
                    me.colPropertyJsonArray[indexsJson.colIndex].onHeadCellBeforeChecked) {
                beforeCheckRes = me.colPropertyJsonArray[indexsJson.colIndex].onHeadCellBeforeChecked(indexsJson.colIndex,
                    instance.getHeadCellChecked(indexsJson.colIndex));
                if (false === beforeCheckRes) {
                    return;
                }
            }
            instance.setHeadCellChecked(indexsJson.colIndex, !instance.getHeadCellChecked(indexsJson.colIndex));
            if (me.colPropertyJsonArray[indexsJson.colIndex].hasOwnProperty("onHeadCellChecked") &&
                    me.colPropertyJsonArray[indexsJson.colIndex].onHeadCellChecked) {
                me.colPropertyJsonArray[indexsJson.colIndex].onHeadCellChecked(indexsJson.colIndex,
                    instance.getHeadCellChecked(indexsJson.colIndex));
            }
        } else {
            if (me.colPropertyJsonArray[indexsJson.colIndex].hasOwnProperty("onCellsBeforeChecked") &&
                    me.colPropertyJsonArray[indexsJson.colIndex].onCellsBeforeChecked) {
                beforeCheckRes = me.colPropertyJsonArray[indexsJson.colIndex].onCellsBeforeChecked(indexsJson.rowIndex,
                    indexsJson.colIndex, instance.getCellChecked(indexsJson.rowIndex, indexsJson.colIndex));
                if (false === beforeCheckRes) {
                    return;
                }
            }
            instance.setCellChecked(indexsJson.rowIndex, indexsJson.colIndex, !instance.getCellChecked(indexsJson.rowIndex, indexsJson.colIndex));
            if (me.colPropertyJsonArray[indexsJson.colIndex].hasOwnProperty("onCellsChecked") &&
                    me.colPropertyJsonArray[indexsJson.colIndex].onCellsChecked) {
                me.colPropertyJsonArray[indexsJson.colIndex].onCellsChecked(indexsJson.rowIndex,
                    indexsJson.colIndex, instance.getCellChecked(indexsJson.rowIndex, indexsJson.colIndex));
            }
        }
    };

    // 查找元素下的checkbox子元素
    this.getCheckBoxChild = function (element) {
        var i = 0,
            className = "";

        if (!element ||
                !(element instanceof HTMLElement)) {
            return null;
        }

        for (i = 0; i < element.childNodes.length; i += 1) {
            if (element.childNodes[i].nodeName.toLowerCase() === "input") {
                className = element.childNodes[i].getAttribute("class");
                if ("checkBox" === className ||
                        "uncheckBox" === className ||
                        "disabledCheckBox" === className ||
                        "disabledUncheckBox" === className) {
                    return  element.childNodes[i];
                }
            }
        }

        return null;
    };

    // 设置选中状态
    this.setCheckBoxChecked = function (oCheckBox, checked) {
        if (!oCheckBox ||
                !(oCheckBox instanceof HTMLElement)) {
            return;
        }

        if (checked && ("disabledCheckBox" === oCheckBox.getAttribute("class") ||
                "checkBox" === oCheckBox.getAttribute("class")) ||
                !checked && ("disabledUncheckBox" === oCheckBox.getAttribute("class") ||
                "uncheckBox" === oCheckBox.getAttribute("class"))) {
            return;
        }

        if (checked) {
            if ("disabledUncheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "disabledCheckBox");
            } else {
                oCheckBox.setAttribute("class", "checkBox");
            }
        } else {
            if ("disabledCheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "disabledUncheckBox");
            } else {
                oCheckBox.setAttribute("class", "uncheckBox");
            }
        }
    };

    // 获取选中状态
    this.getCheckBoxChecked = function (oCheckBox) {
        if (!oCheckBox ||
                !(oCheckBox instanceof HTMLElement)) {
            return false;
        }

        return "checkBox" === oCheckBox.getAttribute("class");
    };

    // 获取表头单元格选中状态
    instance.getHeadCellChecked = function (index) {
        var oHeadCellCheckBox = null;

        if (index >= instance.getColCount()) {
            return false;
        }

        oHeadCellCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[index]);
        if (oHeadCellCheckBox) {
            return me.getCheckBoxChecked(oHeadCellCheckBox);
        }

        return false;
    };

    // 获取单元格选中状态
    instance.getCellChecked = function (rowIndex, colIndex) {
        var cell = null,
            oCellCheckBox = null;

        if (rowIndex >= instance.getRowCount() ||
                colIndex >= instance.getColCount()) {
            return;
        }

        cell = instance.getCell(rowIndex, colIndex);
        if (cell) {
            oCellCheckBox = me.getCheckBoxChild(cell);
            if (oCellCheckBox) {
                return me.getCheckBoxChecked(oCellCheckBox);
            }
        }

        return false;
    };

    // 设置表头单元格选中状态
    instance.setHeadCellChecked = function (index, checked) {
        var oHeadCellCheckBox = null,
            oCellCheckBox = null,
            i = 0,
            cell = null;

        if (index >= instance.getColCount()) {
            return;
        }

        oHeadCellCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[index]);
        if (oHeadCellCheckBox) {
            me.setCheckBoxChecked(oHeadCellCheckBox, checked);
            for (i = 0; i < instance.getRowCount(); i += 1) {
                cell = instance.getCell(i, index);
                if (cell) {
                    oCellCheckBox = me.getCheckBoxChild(cell);
                    if (oCellCheckBox) {
                        me.setCheckBoxChecked(oCellCheckBox, checked);
                    }
                }
            }
        }
    };

    // 获取选中行数
    instance.getCheckedRowsCount = function (colIndex) {
        var i = 0,
            checkedCount = 0;

        if (colIndex < 0 || colIndex >= instance.getColCount()) {
            return 0;
        }

        for (i = 0; i < instance.getRowCount(); i += 1) {
            if (instance.getCellChecked(i, colIndex)) {
                checkedCount += 1;
            }
        }

        return checkedCount;
    };

    // 获取所有选中行的json数据
    instance.getCheckedRowsJsonArray = function (colIndex) {
        var i = 0,
            selectedRowsJsonArray = [];

        if (colIndex < 0 || colIndex >= instance.getColCount()) {
            return [];
        }

        for (i = 0; i < instance.getRowCount(); i += 1) {
            if (instance.getCellChecked(i, colIndex)) {
                selectedRowsJsonArray.push(instance.getRowJson(i));
            }
        }
        return selectedRowsJsonArray;
    };

    // 设置单元格选中状态
    instance.setCellChecked = function (rowIndex, colIndex, checked) {
        var oHeadCellCheckBox = null,
            oCellCheckBox = null,
            i = 0,
            cell = null;

        if (rowIndex >= instance.getRowCount() ||
                colIndex >= instance.getColCount()) {
            return;
        }

        cell = instance.getCell(rowIndex, colIndex);
        if (!cell) {
            return;
        }

        oCellCheckBox = me.getCheckBoxChild(cell);
        if (!oCellCheckBox) {
            return;
        }

        me.setCheckBoxChecked(oCellCheckBox, checked);
        if (me.colPropertyJsonArray[colIndex].hasOwnProperty("checkIndex") &&
                instance.getRowJson(rowIndex)) {
            instance.getRowJson(rowIndex)[me.colPropertyJsonArray[colIndex].checkIndex] = !!checked;
        }

        if (instance.hasHead()) {
            oHeadCellCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[colIndex]);
            if (oHeadCellCheckBox) {
                for (i = 0; i < instance.getRowCount(); i += 1) {
                    oCellCheckBox = me.getCheckBoxChild(instance.getCell(i, colIndex));
                    if (oCellCheckBox &&
                            !me.getCheckBoxChecked(oCellCheckBox)) {
                        me.setCheckBoxChecked(oHeadCellCheckBox, false);
                        break;
                    }
                }
                if (i === instance.getRowCount()) {
                    me.setCheckBoxChecked(oHeadCellCheckBox, true);
                }
            }
        }
    };

    // 创建复选框
    this.createCheckBox = function (rowIndex, colIndex, checked, onCellChecked, onCellBeforeChecked) {
        var checkEl = document.createElement("input"),
            cell = instance.getCell(rowIndex, colIndex);

        if (-1 === rowIndex) {
            cell = me.table.rows[0].cells[colIndex];
        }

        if (!cell) {
            return checkEl;
        }

        checkEl.setAttribute("readonly", "readonly");
        me.setCheckBoxChecked(checkEl, checked);
        checkEl.onclick = function (event) {
            var indexsJson = me.getCheckBoxCellIndexsJson(this),
                beforeCheckRes = true;

            if (onCellBeforeChecked) {
                if (-1 === rowIndex) {
                    beforeCheckRes = onCellBeforeChecked(colIndex, instance.getHeadCellChecked(colIndex));
                } else {
                    beforeCheckRes = onCellBeforeChecked(rowIndex, colIndex, instance.getCellChecked(rowIndex, colIndex));
                }

                if (false === beforeCheckRes) {
                    return;
                }
            }

            me.onCheckBoxClick(this);

            if (onCellChecked) {
                if (-1 === rowIndex) {
                    onCellChecked(colIndex, instance.getHeadCellChecked(colIndex));
                } else {
                    onCellChecked(rowIndex, colIndex, instance.getCellChecked(rowIndex, colIndex));
                }
            }
        };

        // 获取单元格中字符串的宽度
        function getCellStringWidth (string) {
            var span = null,
                width = 0;

            if ("string" !== typeof string) {
                return 0;
            }

            span = document.createElement("span");
            span.style.visibility = "hidden";
            span.textContent = string;
            cell.appendChild(span);

            width = span.offsetWidth;

            cell.removeChild(span);

            return width;
        }

        cell.onclick = function (event) {
            var checkBox = me.getCheckBoxChild(this),
                el = event.srcElement ? event.srcElement : event.target;

            if (!checkBox) {
                return;
            }

            if (("input" === el.tagName.toLowerCase() &&
                    -1 !== el.className.indexOf("checkBox")) ||
                null === checkBox.nextSibling ||
                3 !== checkBox.nextSibling.nodeType ||
                event.offsetX < checkBox.offsetLeft ||
                event.offsetX > checkBox.offsetLeft + checkBox.offsetWidth + 4 + getCellStringWidth(checkBox.nextSibling.nodeValue)) {
                return;
            }

            checkBox.click();
        };
        return checkEl;
    };

    // 启用或禁用表头项的复选框
    instance.enableHeadCellCheck = function (index, enabled, onHeadCellChecked, onHeadCellBeforeChecked) {
        var checkEl = null,
            checked = false,
            grayed = false;

        if (!instance.hasHead() ||
                index >= instance.getColCount()) {
            return;
        }

        checkEl = me.getCheckBoxChild(me.table.rows[0].cells[index]);

        if (checkEl) {
            checked = me.getCheckBoxChecked(checkEl) ||
                instance.isHeadCellCheckBoxGrayChecked(index);
            grayed = instance.isHeadCellCheckBoxGrayed(index);
            checkEl.parentNode.removeChild(checkEl);
        }

        if (!enabled) {
            return;
        }

        me.table.rows[0].cells[index].insertBefore(me.createCheckBox(-1, index, checked, onHeadCellChecked, onHeadCellBeforeChecked),
            me.table.rows[0].cells[index].childNodes.length ? me.table.rows[0].cells[index].childNodes[0] : null);

        if (grayed) {
            instance.setHeadCellCheckBoxGrayed(index, true);
        }

        if (onHeadCellBeforeChecked) {
            me.colPropertyJsonArray[index].onHeadCellBeforeChecked = onHeadCellBeforeChecked;
        }

        if (onHeadCellChecked) {
            me.colPropertyJsonArray[index].onHeadCellChecked = onHeadCellChecked;
        }
    };

    // 启用或禁用表格单元格的复选框
    instance.enableCellCheck = function (rowIndex, colIndex, enabled, checked, onCellChecked, onCellBeforeChecked) {
        var cell = instance.getCell(rowIndex, colIndex),
            checkEl = null,
            grayed = false,
            oHeadCellCheckBox = null;

        if (cell) {
            checkEl = me.getCheckBoxChild(cell);

            if (checkEl) {
                if (null === checked ||
                        undefined === checked) {
                    checked = me.getCheckBoxChecked(checkEl) ||
                        instance.isCellCheckBoxGrayed(rowIndex, colIndex);
                }
                grayed = instance.isCellCheckBoxGrayed(rowIndex, colIndex);
                checkEl.parentNode.removeChild(checkEl);
            }

            if (enabled) {
                cell.insertBefore(me.createCheckBox(rowIndex, colIndex, checked, onCellChecked, onCellBeforeChecked), cell.childNodes.length ? cell.childNodes[0] : null);
            }

            if (grayed) {
                instance.setCellCheckBoxGrayed(rowIndex, colIndex, true);
            }

            oHeadCellCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[colIndex]);
            if (oHeadCellCheckBox) {
                me.setCheckBoxChecked(oHeadCellCheckBox, instance.isAllColCellsChecked(colIndex));
            }
        }
    };

    // 启用或禁用某列所有单元格的复选框
    instance.enableColCellsCheck = function (index, enabled, checked, onCellsChecked, onCellsBeforeChecked) {
        var i = 0,
            cell = null;

        if (index >= instance.getColCount()) {
            return;
        }

        me.colPropertyJsonArray[index].checkEnable = enabled;
        me.colPropertyJsonArray[index].checkStatus = checked;

        if (onCellsBeforeChecked) {
            me.colPropertyJsonArray[index].onCellsBeforeChecked = onCellsBeforeChecked;
        }

        if (onCellsChecked) {
            me.colPropertyJsonArray[index].onCellsChecked = onCellsChecked;
        }

        instance.enableHeadCellCheck(index, enabled);
        for (i = 0; i < instance.getRowCount(); i += 1) {
            instance.enableCellCheck(i, index, enabled, checked, onCellsChecked, onCellsBeforeChecked);
        }
    };

    // 判断表头单元格是否可复选
    instance.isHeadCellCheckEnabled = function (index) {
        if (index < 0 ||
                index >= instance.getColCount()) {
            return false;
        }

        return me.getCheckBoxChild(me.table.rows[0].cells[index]) ? true : false;
    };

    // 判断一般单元格是否可复选
    instance.isCellCheckEnabled = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex);

        if (!cell) {
            return false;
        }

        return me.getCheckBoxChild(cell) ? true : false;
    };

    // 设置复选框为灰色
    this.setCheckBoxGrayed = function (oCheckBox, isGrayed) {
        if (!oCheckBox ||
                !(oCheckBox instanceof Object)) {
            return;
        }

        if (isGrayed) {
            if ("checkBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "disabledCheckBox");
            } else if ("uncheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "disabledUncheckBox");
            }
            oCheckBox.setAttribute("disabled", "disabled");
        } else {
            if ("disabledCheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "checkBox");
            } else if ("disabledUncheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "uncheckBox");
            }
            oCheckBox.removeAttribute("disabled");
        }
    };

    // 将表头单元格复选框设置为灰色
    instance.setHeadCellCheckBoxGrayed = function (index, isGrayed) {
        var oCheckBox = null;

        if (index < 0 ||
                index >= instance.getColCount()) {
            return;
        }

        oCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[index]);
        if (!oCheckBox) {
            return;
        }

        me.setCheckBoxGrayed(oCheckBox, isGrayed);
    };

    // 将表格单元格复选框设置为灰色
    instance.setCellCheckBoxGrayed = function (rowIndex, colIndex, isGrayed) {
        var cell = instance.getCell(rowIndex, colIndex),
            oCheckBox = null,
            oHeadCellCheckBox = null;

        if (!cell) {
            return;
        }

        oCheckBox = me.getCheckBoxChild(cell);
        if (!oCheckBox) {
            return;
        }

        me.setCheckBoxGrayed(oCheckBox, isGrayed);

        oHeadCellCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[colIndex]);
        if (oHeadCellCheckBox) {
            me.setCheckBoxChecked(oHeadCellCheckBox, instance.isAllColCellsChecked(colIndex));
        }
    };

    // 将表格列复选框设置为灰色
    instance.setColCellsCheckBoxGrayed = function (index, isGrayed) {
        var i = 0;

        if (index < 0 ||
                index >= instance.getColCount()) {
            return;
        }

        instance.setHeadCellCheckBoxGrayed(index, isGrayed);

        for (i = 0; i < instance.getRowCount(); i += 1) {
            instance.setCellCheckBoxGrayed(i, index, isGrayed);
        }

        me.colPropertyJsonArray[index].checkGrayed = !!isGrayed;
    };

    // 判断表头单元格复选框是否置灰
    instance.isHeadCellCheckBoxGrayed = function (index) {
        var oCheckBox = null;

        if (index < 0 ||
                index >= instance.getColCount()) {
            return false;
        }

        oCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[index]);
        if (!oCheckBox) {
            return false;
        }

        return "disabledCheckBox" === oCheckBox.getAttribute("class") ||
            "disabledUncheckBox" === oCheckBox.getAttribute("class");
    };

    // 判断表头单元格复选框是否置灰
    instance.isHeadCellCheckBoxGrayChecked = function (index) {
        var oCheckBox = null;

        if (index < 0 ||
                index >= instance.getColCount()) {
            return false;
        }

        oCheckBox = me.getCheckBoxChild(me.table.rows[0].cells[index]);
        if (!oCheckBox) {
            return false;
        }

        return "disabledCheckBox" === oCheckBox.getAttribute("class");
    };

    // 判断表格单元格复选框是否置灰
    instance.isCellCheckBoxGrayed = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex),
            oCheckBox = null;

        if (!cell) {
            return false;
        }

        oCheckBox = me.getCheckBoxChild(cell);
        if (!oCheckBox) {
            return false;
        }

        return "disabledCheckBox" === oCheckBox.getAttribute("class") ||
            "disabledUncheckBox" === oCheckBox.getAttribute("class");
    };

    // 判断表格单元格复选框是否置灰
    instance.isCellCheckBoxGrayChecked = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex),
            oCheckBox = null;

        if (!cell) {
            return false;
        }

        oCheckBox = me.getCheckBoxChild(cell);
        if (!oCheckBox) {
            return false;
        }

        return "disabledCheckBox" === oCheckBox.getAttribute("class");
    };

    // 判断表格列复选框是否全置灰
    instance.isColCellsCheckBoxGrayed = function (index) {
        if (index < 0 ||
                index >= instance.getColCount() ||
                !me.colPropertyJsonArray[index].hasOwnProperty("checkGrayed")) {
            return false;
        }

        return me.colPropertyJsonArray[index].checkGrayed;
    };

    // 获取表格边框宽度
    instance.getBorderWidth = function () {
        return me.table.style.borderWidth;
    };

    // 设置表格边框宽度
    instance.setBorderWidth = function (width) {
        me.table.style.borderWidth = width;
    };

    // 获取表格边框颜色
    instance.getBorderColor = function () {
        return me.table.style.borderColor;
    };

    // 设置表格边框宽度
    instance.setBorderColor = function (color) {
        me.table.style.borderColor = color;
    };

    // 获取表头某单元格的文字
    instance.getHeadCellText = function (index) {
        if (instance.hasHead() &&
                index >= 0 &&
                index < me.table.rows[0].cells.length) {
            return me.table.rows[0].cells[index].textContent;
        }
        return "";
    };

    // 设置表头某单元格的文字
    instance.setHeadCellText = function (index, text) {
        if (instance.hasHead() &&
                index >= 0 &&
                index < me.table.rows[0].cells.length) {
            me.table.rows[0].cells[index].textContent = text;
            me.colPropertyJsonArray[index].title = text;
        }
    };

    // 获取表头背景色
    instance.getHeadBkColor = function () {
        return me.colorJson.thBkColor;
    };

    // 设置表头背景色
    instance.setHeadBkColor = function (color) {
        if (instance.hasHead()) {
            me.table.rows[0].style.backgroundColor = color;
        }
        me.colorJson.thBkColor = color;
    };

    // 为表头单元格添加子dom对象
    instance.appendHeadChildDomObj = function (index, domObj) {
        if (instance.hasHead() && "object" === typeof domObj &&
            index >= 0 &&
            index < me.table.rows[0].cells.length) {
            me.table.rows[0].cells[index].appendChild(domObj);
        }
    };

    // 获取奇数行的背景色
    instance.getOddLineBkColor = function () {
        return me.colorJson.oddBkColor;
    };

    // 设置奇数行的背景色
    instance.setOddLineBkColor = function (color) {
        me.setInterlacingBkColor(0, instance.getRowCount() - 1, color);
        me.colorJson.oddBkColor = color;
    };

    // 获取偶数行的背景色
    instance.getEvenLineBkColor = function () {
        return me.colorJson.evenBkColor;
    };

    // 设置偶数行的背景色
    instance.setEvenLineBkColor = function (color) {
        me.setInterlacingBkColor(1, instance.getRowCount() - 1, color);
        me.colorJson.evenBkColor = color;
    };

    // 设置隔行的背景色
    this.setInterlacingBkColor = function (startIndex, endIndex, color) {
        var i = 0,
            temp = 0;

        if (startIndex > instance.getRowCount() - 1 ||
                endIndex < 0) {
            return;
        }

        if (startIndex < 0) {
            startIndex = 0;
        }

        if (endIndex > instance.getRowCount() - 1 ||
            null === endIndex) {
            endIndex = instance.getRowCount() - 1;
        }

        if (startIndex > endIndex) {
            temp = startIndex;
            startIndex = endIndex;
            endIndex = temp;
        }

        for (i = startIndex; i <= endIndex; i += 2) {
            me.table.rows[i + 1].style.backgroundColor = color;
        }
    };

    // 获取表头文字颜色
    instance.getHeadTextColor = function () {
        return me.colorJson.thTextColor;
    };

    // 设置表头文字颜色
    instance.setHeadTextColor = function (color) {
        me.table.rows[0].style.color = color;
        me.colorJson.thTextColor = color;
    };

    // 获取表内容文字颜色
    instance.getTextColor = function () {
        if (me.tBody) {
            return me.tBody.style.color;
        }

        return null;
    };

    // 设置表内容文字颜色
    instance.setTextColor = function (color) {
        if (me.tBody) {
            me.tBody.style.color = color;
        }
    };

    // 获取表头文字对齐方式
    instance.getHeadAlignment = function () {
        return me.headAlignment;
    };

    // 设置表头文字对齐方式
    instance.setHeadAlignment = function (alignment) {
        var i = 0;

        for (i = 0; i < me.table.rows[0].cells.length; i += 1) {
            me.table.rows[0].cells[i].style.textAlign = alignment;
        }
        me.headAlignment = alignment;
    };

    // 获取表内容文字对齐方式
    instance.getAlignment = function () {
        if (me.tBody) {
            return me.tBody.style.textAlign;
        }

        return null;
    };

    // 设置表内容文字对齐方式
    instance.setAlignment = function (alignment) {
        if (me.tBody) {
            me.tBody.style.textAlign = alignment;
        }
    };

    // 获取表格行高
    instance.getLineHeight = function () {
        return me.lineHeight;
    };

    // 设置表格行高
    instance.setLineHeight = function (height) {
        var i = 0;

        for (i = 0; i < me.table.rows.length; i += 1) {
            me.table.rows[i].style.height = height;
        }
    };

    // 设置表格外间距
    instance.setMargin = function (margin) {
        me.table.style.margin = margin;
    };

    // 获取单元格css
    instance.getRowStyle = function (index, styleName) {
        if (index < 0 ||
                index >= instance.getRowCount()) {
            return null;
        }

        return me.table.rows[index + 1].style[styleName];
    };

    // 设置单元格css
    instance.setRowStyle = function (index, styleName, styleValue) {
        if (index < 0 ||
                index >= instance.getRowCount()) {
            return;
        }

        me.table.rows[index + 1].style[styleName] = styleValue;
    };

    // 获取单元格css
    instance.getCellStyle = function (rowIndex, colIndex, styleName) {
        var cell = instance.getCell(rowIndex, colIndex);

        if (cell) {
            if (cell.style[styleName] &&
                    "" !== cell.style[styleName]) {
                return cell.style[styleName];
            }

            return cell[styleName];
        }

        return null;
    };

    // 设置单元格css
    instance.setCellStyle = function (rowIndex, colIndex, styleName, styleValue) {
        var cell = instance.getCell(rowIndex, colIndex);

        if (cell) {
            cell.style[styleName] = styleValue;
        }
    };

    // 根绝索引获取单元格
    instance.getCell = function (rowIndex, colIndex) {
        if (rowIndex < 0) {
            return null;
        }
        if (colIndex < 0) {
            return null;
        }
        rowIndex += 1;

        if (rowIndex >= me.table.rows.length) {
            return null;
        }
        if (colIndex >= me.table.rows[rowIndex].cells.length) {
            return null;
        }

        return me.table.rows[rowIndex].cells[colIndex];
    };

    // 获取行数
    instance.getRowCount = function () {
        return me.table.rows.length - 1;
    };

    // 获取列数
    instance.getColCount = function () {
        return me.colPropertyJsonArray.length;
    };

    // 获取每列的宽度
    instance.getColsWidth = function () {
        return me.colsWidthArray;
    };

    // 设置所有列的宽度
    instance.setColsWidth = function (widthArray) {
        var i = 0,
            rowIndex = 0;

        if (!instance.hasHead()) {
            if (0 === instance.getRowCount()) {
                return;
            }
            rowIndex = 1;
        }

        if (me.table.rows.length && widthArray) {
            for (i = 0; i < me.table.rows[rowIndex].cells.length; i += 1) {
                if (i < widthArray.length) {
                    me.table.rows[rowIndex].cells[i].style.width = widthArray[i];
                    me.colPropertyJsonArray[i].width = widthArray[i];
                    me.colsWidthArray[i] = widthArray[i];
                }
            }
        }
    };

    // 获取行对象在rowDataArray中对应的对象
    this.getRowIndexInRowDataArray = function (row) {
        var i = 0;

        for (i = 0; i < me.rowDataArray.length; i += 1) {
            if (row === me.rowDataArray[i].row) {
                return i;
            }
        }

        return -1;
    };

    // 获取行json
    instance.getRowJson = function (index) {
        var dataIndex = -1;

        if (index < 0 ||
                index >= instance.getRowCount()) {
            return null;
        }

        dataIndex = me.getRowIndexInRowDataArray(me.table.rows[index + 1]);

        return -1 === dataIndex ? null : me.rowDataArray[dataIndex].rowJson;
    };

    // 设置json
    instance.setRowJson = function (index, json) {
        var dataIndex = -1;

        if (index < 0 ||
                index >= instance.getRowCount() ||
                !(json instanceof Object)) {
            return;
        }

        dataIndex = me.getRowIndexInRowDataArray(me.table.rows[index + 1]);

        me.rowDataArray[dataIndex].rowJson = json;
        instance.refreshRow(index);
    };

    // 获取列json
    instance.getColJson = function (index) {
        if (index < 0 ||
                index >= instance.getColCount()) {
            return null;
        }

        return me.colPropertyJsonArray[index];
    };

    // 获取单元格html
    instance.getCellHTML = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex);
        return cell ? cell.innerHTML : null;
    };

    // 设置单元格html
    instance.setCellHTML = function (rowIndex, colIndex, html) {
        var cell = instance.getCell(rowIndex, colIndex);
        if (cell) {
            cell.innerHTML = html;
        }
    };

    // 获取单元格text
    instance.getCellText = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex);
        return cell ? me.getInnerText(cell) : null;
    };

    // 设置单元格text
    instance.setCellText = function (rowIndex, colIndex, text) {
        var cell = instance.getCell(rowIndex, colIndex);
        if (cell) {
            me.setInnerText(cell, text);
        }
    };

    // 删除所有行
    instance.deleteAll = function () {
        var i = 1;

        for (i = me.table.rows.length - 1; i >= 1; i -= 1) {
            me.table.deleteRow(i);
        }

        me.rowDataArray = [];
    };

    // 删除行
    instance.deleteRow = function (index) {
        var i = 0,
            dataIndex = -1;

        if (index < 0 || index > instance.getRowCount()) {
            return;
        }

        index += 1;

        dataIndex = me.getRowIndexInRowDataArray(me.table.rows[index]);
        if (-1 !== dataIndex) {
            me.rowDataArray.splice(dataIndex, 1);
        }

        me.table.deleteRow(index);

        instance.setOddLineBkColor(me.colorJson.oddBkColor);
        instance.setEvenLineBkColor(me.colorJson.evenBkColor);
        instance.setSelRowColor(me.colorJson.selRowBkColor);
    };

    // 获取单元格内子dom对象
    instance.getCellChildsDomObj = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex);

        if (cell) {
            return cell.childNodes;
        }

        return null;
    };

    // 删除单元格内子dom对象
    instance.removeAllCellChilds = function (rowIndex, colIndex) {
        var cell = instance.getCell(rowIndex, colIndex);

        if (cell) {
            while (cell.childNodes.length) {
                cell.removeChild(cell.childNodes[0]);
            }
        }
    };

    // 为单元格添加子dom对象
    instance.appendCellChildDomObj = function (rowIndex, colIndex, domObj) {
        var cell = instance.getCell(rowIndex, colIndex),
            i = 0;

        if (cell && "object" === typeof domObj) {
            cell.appendChild(domObj);
        }
    };

    // 获取行附加数据
    instance.getRowData = function (index) {
        var i = 0,
            dataIndex = -1;

        if (index < 0 || index >= instance.getRowCount()) {
            return null;
        }

        index += 1;

        dataIndex = me.getRowIndexInRowDataArray(me.table.rows[index]);

        return -1 === dataIndex ? null : me.rowDataArray[dataIndex].extraData;
    };

    // 设置行附加数据
    instance.setRowData = function (index, obj) {
        var rowData = null,
            i = 0,
            dataIndex = -1;

        if (index < 0 || index >= instance.getRowCount()) {
            return;
        }

        index += 1;

        dataIndex = me.getRowIndexInRowDataArray(me.table.rows[index]);
        if (-1 !== dataIndex) {
            rowData = me.rowDataArray[dataIndex];
        }

        if (rowData) {
            rowData.extraData = obj;
        } else {
            rowData = {};
            rowData.row = me.table.rows[index];
            rowData.extraData = obj;
            rowData.rowJson = null;
            me.rowDataArray.push(rowData);
        }
    };

    // 获取某行对象的行索引
    instance.getRowIndex = function (tableRow) {
        var i = 0;

        return tableRow.rowIndex - 1;
    };

    // 获取子元素所在行的索引
    instance.getRowIndexByChildNode = function (childNode) {
        var parentNode = null;

        if (!(childNode instanceof HTMLElement)) {
            return -1;
        }

        parentNode = childNode.parentNode;
        while (parentNode) {
            if ("tr" === parentNode.nodeName.toLowerCase()) {
                return instance.getRowIndex(parentNode);
            }

            parentNode = parentNode.parentNode;
        }

        return -1;
    };

    // 获取选中行的颜色
    instance.getSelRowColor = function () {
        return me.colorJson.selRowBkColor;
    };

    // 设置选中行的颜色
    instance.setSelRowColor = function (color) {
        me.colorJson.selRowBkColor = color;

        if (null !== me.selRowObj) {
            me.selRowObj.style.backgroundColor = color;
        }
    };

    // 设置双击事件的回调函数
    instance.setDblClickCallback = function (callback) {
        me.table.ondblclick = function (event) {
            var el = event.srcElement ? event.srcElement : event.target,
                rowIndex = -1,
                colIndex = -1,
                cellHtml = null;

            if (el.tagName.toLowerCase() !== "td") {
                return;
            }

            rowIndex = el.parentNode.rowIndex;
            rowIndex -= 1;
            colIndex = el.cellIndex;
            cellHtml = el.innerHTML;

            if (callback) {
                callback(rowIndex, colIndex, cellHtml);
            }
        };
    };

    // 设置选中某行前的回调函数
    instance.setBeforeSelRowCallback = function (callback) {
        me.beforeSelRowCallback = callback;
    };

    // 设置选中某行时的回调函数
    instance.setSelRowCallback = function (callback) {
        me.selRowCallback = callback;
    };

    // 设置取消选中某行前的回调函数
    instance.setDeselRowCallback = function (callback) {
        me.beforeDeselRowCallback = callback;
    };

    // 设置取消选中某行时的回调函数
    instance.setDeselRowCallback = function (callback) {
        me.deselCallback = callback;
    };

    // 设置表格的列宽可以鼠标拖动改变
    instance.enableDragColWidth = function (enabled) {
        var isVertLineMove = false,
            curTh = null,
            vertLineDiv = null,
            thDomArray = me.tHead.getElementsByTagName("th"),
            i = 0;

        if (0 === thDomArray.length) {
            return;
        }

        if (!enabled) {
            for (i = 0; i < thDomArray.length; i += 1) {
                thDomArray[i].onmousedown = null;
                thDomArray[i].onmousemove = null;
            }

            me.table.onmousemove = null;
            return;
        }

        function mouseMoveFunc(event) {
            var offset = 2,    // offset个像素内可拖拽
                leftDiff = event.offsetX,
                rightDiff = getElementRealWidth(this) - event.offsetX,
                bFirst = (this === thDomArray[0]),
                bLast = (this === thDomArray[thDomArray.length - 1]);

            //距离表头边框线左右offset个像素才触发效果
            if ((bFirst && rightDiff < offset) ||
                    (!bFirst && (leftDiff < offset || rightDiff < offset))) {
                this.style.cursor = "url(/image/pc/common/splith.cur),auto";
                //$(this).css('cursor', " url(/image/pc/common/splith.cur)-moz-zoom-out");
            } else {
                this.style.cursor = 'default';
            }
        }

        function mouseDownFunc(event) {
            var offset = 2,    // offset个像素内可拖拽
                leftDiff = event.offsetX,
                rightDiff = getElementRealWidth(this) - event.offsetX,
                bFirst = (this === thDomArray[0]),
                bLast = (this === thDomArray[thDomArray.length - 1]);

            //距离表头边框线左右offset个像素才触发效果
            if ((bFirst && rightDiff < offset) ||
                    (!bFirst && (leftDiff < offset || rightDiff < offset))) {
                vertLineDiv = document.createElement("div");
                vertLineDiv.style.position = "absolute";
                vertLineDiv.style.height = (me.tHead.clientHeight + me.tBody.clientHeight) + "px";
                vertLineDiv.style.top = getOffsetTopInPage(this) + "px";
                vertLineDiv.style.left = event.pageX + "px";
                vertLineDiv.style.width = "0";
                vertLineDiv.style.zIndex = 30000;
                vertLineDiv.style.borderLeft = "1px solid #1979ca";
                document.body.appendChild(vertLineDiv);

                window.onmouseup = function (event) {
                    var i = 0;

                    if (isVertLineMove) {
                        var index = 0,
                            oldWidth = getElementRealWidth(curTh),
                            newWidth = event.pageX - getOffsetLeftInPage(curTh);

                        for (i = 0; i < thDomArray.length; i += 1) {
                            if (curTh === thDomArray[i]) {
                                index = i;
                                break;
                            }
                        }

                        document.body.removeChild(vertLineDiv);
                        isVertLineMove = false;

                        if (Math.abs(newWidth - oldWidth) < offset) {
                            return;
                        }

                        if (newWidth <= me.colMinWidth) {
                            newWidth = me.colMinWidth;
                        }

                        me.table.style.width = (getElementRealWidth(me.table) + newWidth - oldWidth) + "px";

                        for (i = 0; i < me.table.rows.length; i += 1) {
                            me.table.rows[i].cells[index].style.width = newWidth + "px";
                        }
                    }
                };

                me.table.onmousemove = function (event) {
                    if (isVertLineMove && vertLineDiv) {
                        vertLineDiv.style.left = event.pageX + "px";
                        document.body.style.cssText = document.body.style.cssText + 'moz-user-select: -moz-none;' +
                            '-moz-user-select: none;' +
                            '-o-user-select:none;' +
                            '-khtml-user-select:none;' +
                            '-webkit-user-select:none;' +
                            '-ms-user-select:none;' +
                            'user-select:none';
                    }
                };

                //总是取前一个TH对象
                if (event.offsetX < getElementRealWidth(this) / 2) {
                    curTh = this.previousSibling;
                } else {
                    curTh = this;
                }

                //全局变量，代表当前是否处于调整列宽状态
                isVertLineMove = true;
                //总是取前一个TH对象
                if (event.offsetX < getElementRealWidth(this) / 2) {
                    curTh = this.previousSibling;
                } else {
                    curTh = this;
                }
            }
        }

        // 鼠标移到边框上时
        for (i = 0; i < thDomArray.length; i += 1) {
            thDomArray[i].onmousemove = mouseMoveFunc;
            thDomArray[i].onmousedown = mouseDownFunc;
        }
    };

    // 设置表格表头单元格右侧边框
    this.setHeadCellRightBorder = function () {
        var i = 0;

        for (i = 0; i < me.table.rows[0].cells.length; i += 1) {
            me.table.rows[0].cells[i].style.borderRight = "1px solid";
        }
    };

    // 刷新行显示
    instance.refreshRow = function (index) {
        var rowJson = null,
            i = 0,
            rowDataArray = null,
            grayed = false;

        if (index < 0 ||
                index >= instance.getRowCount()) {
            return;
        }

        rowJson = instance.getRowJson(index);
        rowDataArray = me.jsonArrayToTwoDimArray([rowJson])[0];

        for (i = 0; i < instance.getColCount(); i += 1) {
            instance.setCellText(index, i, rowDataArray[i]);
            if (instance.isCellCheckEnabled(index, i) &&
                    me.colPropertyJsonArray[i].checkEnable &&
                    me.colPropertyJsonArray[i].hasOwnProperty("checkIndex") &&
                    rowJson.hasOwnProperty(me.colPropertyJsonArray[i].checkIndex)) {
                grayed = instance.isCellCheckBoxGrayed(index, i);
                instance.setCellChecked(index, i, !!rowJson[me.colPropertyJsonArray[i].checkIndex]);
                if (grayed) {
                    instance.setCellCheckBoxGrayed(index, i, true);
                }
            }
        }
    };

    // 默认的行升序排序方法
    this.rowKeyCompare = function (key1, key2) {
        if ((null === key1 ||
                undefined === key1) &&
                null !== key2 &&
                undefined !== key2) {
            return -1;
        } else if ((null === key2 ||
            undefined === key2) &&
            null !== key1 &&
            undefined !== key1) {
            return 1;
        } else if ((null === key1 ||
            undefined === key1) &&
            (null === key2 ||
                undefined === key2)) {
            return 0;
        } else if (key1.toString() < key2.toString()) {
            return -1;
        } else if (key1.toString() > key2.toString()) {
            return 1;
        } else {
            return 0;
        }
    };

    // 列排序
    this.sortRowsInCol = function (index, isAsc) {
        var rowArray = me.tBody.rows,
            compareRes = 0,
            tempRow = null,
            i = 0,
            j = 0;

        for (i = 0; i < rowArray.length - 1; i += 1) {
            for (j = 0; j < rowArray.length - i; j += 1) {
                compareRes = me.rowKeyCompare(rowArray[j], rowArray[j + 1]);
                if ((isAsc || undefined === isAsc) &&
                    compareRes > 0) {
                    tempRow = rowArray[j];
                    rowArray[j] = rowArray[j + 1];
                    rowArray[j + 1] = tempRow;
                } else if (!isAsc && compareRes < 0) {
                    tempRow = rowArray[j];
                    rowArray[j] = rowArray[j + 1];
                    rowArray[j + 1] = tempRow;
                }
            }
        }
    };

    // 启用或禁用列表头可排序
    instance.enableColSort = function (index, enabled) {

    };

    // 判断列表头是否可排序
    instance.isColSortable = function (index) {
        return true;
    };

    // 获取列表头排序状态
    // 返回值：0--没有排序 1--升序排序 2--降序排序
    instance.getColSortStatus = function (index) {
        var headCell = null;

        if (index < 0 ||
            index > instance.getColCount()) {
            return 0;
        }

        headCell = me.table.rows[0].cells[index];

        switch (headCell.getAttribute("class")) {
            case "noSort":
                return 0;
            case "ascSort":
                return 1;
            case "descSort":
                return 2;
            default:
                break;
        }

        return 0;
    };

    // 设置列表头排序状态
    // 参数：status--0：没有排序 1：升序排序 2：降序排序
    instance.setColSortStatus = function (index, status) {
        var headCell = null;

        if (index < 0 ||
            index > instance.getColCount()) {
            return;
        }

        headCell = me.table.rows[0].cells[index];

        switch (status) {
            case 0:
                headCell.setAttribute("class", "noSort");
                break;
            case 1:
                headCell.setAttribute("class", "ascSort");
                me.sortRowsInCol(index, true);
                break;
            case 2:
                headCell.setAttribute("class", "descSort");
                me.sortRowsInCol(index, false);
                break;
            default:
                break;
        }
    };

    // 列表头点击响应
    this.onHeadCellClick = function (event) {
        var el = event.srcElement ? event.srcElement : event.target,
            status = 0;

        status = instance.getColSortStatus(el.cellIndex);

        switch (status) {
            case 0:
                instance.setColSortStatus(el.cellIndex, 1);
                break;
            case 1:
                instance.setColSortStatus(el.cellIndex, 2);
                break;
            case 2:
                instance.setColSortStatus(el.cellIndex, 1);
                break;
            default:
                break;
        }
    };

    // 将表格显示到某个对象里
    instance.renderToDomObj = function (domObj) {
        var i = 0;

        if ("object" === typeof domObj) {
            while (domObj.childNodes.length) {
                domObj.removeChild(domObj.childNodes[0]);
            }

            instance.appendToDomObj(domObj);
        }
    };

    // 将表格显示到某id的元素里
    instance.renderToDomObjById = function (id) {
        var domObj = document.getElementById(id);

        if (domObj) {
            instance.renderToDomObj(domObj);
        }
    };

    // 将表格添加到某个dom对象里
    instance.appendToDomObj = function (domObj) {
        if ("object" === typeof domObj) {
            domObj.appendChild(me.table);
        }
    };

    // 将表格添加到某个id的元素里
    instance.appendToDomObjById = function (id) {
        var domObj = document.getElementById(id);

        if (domObj) {
            instance.appendToDomObj(domObj);
        }
    };

    return instance;
}

/*
 分组表格类，继承自表格类
 参数groupTitleTpl为分组标题的模板，其中的{groupField}将被替换为分组field的值
 */
function GroupEditableTable(id, width, height, groupField, groupTitleTpl) {
    var instance = EditableTable.call(this, id, width, height),
        me = this;
    me.dynamicFn = null;
    this.groupFieldIndex = null;
    this.rowGroupArray = [];              // 行分组的json数组，json的元素分别为：expand--是否展开 titleRow--标题行对象 rowArray--分组子行数据
    this.rowGroupArray[0] = {
        groupFieldValue: null,
        expand: true,
        titleRow: document.createElement("tr"),
        rowDataArray: []                  // 类数组rowDataArray的子集
    };

    // 根据分组字段值获取分组数据，为rowGroupArray的元素
    this.getGroupDataByFieldVal = function (groupFieldVal) {
        var i = 0,
            groupData = null;

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (groupFieldVal === me.rowGroupArray[i].groupFieldValue) {
                groupData = me.rowGroupArray[i];
                break;
            }
        }

        return groupData;
    };
    //设置动态元素的函数
    instance.setDynamicFn = function(fn){
        me.dynamicFn = fn;
    }
    // 根据分组字段值和组内索引获取总索引
    instance.getRawRowIndex = function (groupFieldVal, index) {
        var i = 0,
            rawIndex = 0;

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (0 !== i) {
                rawIndex += 1;
            }

            if (groupFieldVal === me.rowGroupArray[i].groupFieldValue) {
                return rawIndex + index;
            }

            rawIndex += me.rowGroupArray[i].rowDataArray.length;
        }

        return -1;
    };

    // 根据总索引获取组字段值和行索引组成的json
    instance.getGroupAndRowIndex = function (rawRowIndex) {
        var row = null,
            i = 0,
            j = 0;

        if (rawRowIndex < 0 ||
                rawRowIndex >= instance.getRowCount()) {
            return null;
        } else if (me.isGroupHeadRow(me.table.rows[rawRowIndex + 1])) {
            for (i = 0; i < me.rowGroupArray.length; i += 1) {
                if (me.table.rows[rawRowIndex + 1] === me.rowGroupArray[i].titleRow) {
                    return {
                        groupFieldValue: me.rowGroupArray[i].groupFieldValue,
                        index: -1
                    };
                }
            }
        }

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            for (j = 0; j < me.rowGroupArray[i].rowDataArray.length; j += 1) {
                if (me.rowGroupArray[i].rowDataArray[j].row === me.table.rows[rawRowIndex + 1]) {
                    return {
                        groupFieldValue: me.rowGroupArray[i].groupFieldValue,
                        index: j
                    };
                }
            }
        }

        return null;
    };

    // 屏蔽插入表头方法
    instance.insertHead = function (headArray) {};
    // 屏蔽非json方式添加数据的方法
    instance.addData = function (dataArray) { return null; };
    // 屏蔽非json方式插入数据的方法
    instance.insertData = function (index, dataArray) { return null; };

    // json方式插入数据的方法
    instance.insertJsonData = function (index, jsonData) {
        var jsonDataArray = null,
            res = null,
            resArray = [],
            i = 0;

        if (!(jsonData instanceof Array) &&
            !(jsonData instanceof Object)) {
            return null;
        }

        if (jsonData instanceof Array) {
            jsonDataArray = jsonData;
        } else {
            jsonDataArray = [jsonData];
        }

        for (i = 0; i < jsonDataArray.length; i += 1) {
            res = me.insertJsonDataToGroup(jsonDataArray[i], index);
            if (res) {
                resArray.push(res);
            }
        }

        return resArray;
    };

    // 添加一行数据到分组
    this.insertJsonDataToGroup = function (jsonData, index) {
        var i = 0,
            j = 0,
            realIndex = 0,
            insertIndex = 0,
            rowJsonData = null,
            rowGroupIndex = 0,
            tr = null,
            td = null,
            textDiv = null,
            expand = true;
        if('expand' in jsonData){
            expand = jsonData['expand'];
        }
        if (!jsonData ||
            !(jsonData instanceof Object)) {
            return null;
        }

        if (!jsonData.hasOwnProperty(groupField)) {
            jsonData[groupField] = null;
        }

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (jsonData[groupField] === me.rowGroupArray[i].groupFieldValue) {
                if (null === index ||
                        undefined === index ||
                        index > me.rowGroupArray[i].rowDataArray.length) {
                    realIndex = me.rowGroupArray[i].rowDataArray.length;
                } else if (index < 0) {
                    realIndex = 0;
                } else {
                    realIndex = index;
                }

                insertIndex = me.simpleInsertData(instance.getRawRowIndex(jsonData[groupField],
                    realIndex), [jsonData]);

                rowGroupIndex = i;
                expand = instance.isGroupExpanded(jsonData[groupField]);
                break;
            }
        }

        if (i === me.rowGroupArray.length) {
            // 添加标题行
            tr = document.createElement("tr");
            me.tBody.appendChild(tr);
            tr.style.height = me.lineHeight;
            tr.style.borderBottom = "1px solid #218fff";
            tr.style.fontWeight = "bold";
            tr.style.textAlign = "left";
            for (j = 0; j < instance.getColCount(); j += 1) {
                td = document.createElement("td");
                if (0 === j) {
                    var colNum = instance.getColCount();
                    td.colSpan = colNum || 3;
                    me.table.style.tableLayout = "auto";
                    textDiv = document.createElement("div");
                    if ("string" === typeof groupTitleTpl) {
                        textDiv.innerHTML = groupTitleTpl.replace(/{groupField}/g, jsonData[groupField]);
                    } else {
                        textDiv.innerHTML = jsonData[groupField];
                    }
                    td.appendChild(textDiv);
                    tr.appendChild(td);
                }
            }
            tr.onclick = function (event) {
                if(me.dynamicFn){
                    if(!instance.isGroupExpanded(jsonData[groupField])){ //展开的时候动态加载
                        me.dynamicFn(jsonData[groupField], event.currentTarget.rowIndex - 1);
                    }else{ //闭合的时候删除组中的元素
                        instance.deleteGroup(jsonData[groupField], 1);
                    }
                }
                instance.setGroupIndex(event.currentTarget.rowIndex - 1);
                instance.expandGroup(jsonData[groupField], !instance.isGroupExpanded(jsonData[groupField]));
            };

            me.rowGroupArray.push({
                groupFieldValue: jsonData[groupField],
                expand: true,
                titleRow: tr,
                rowDataArray: []
            });

            insertIndex = me.simpleInsertData(instance.getRowCount(), [jsonData]);
            rowGroupIndex = me.rowGroupArray.length - 1;
        }

        rowJsonData = me.getRowIndexInRowDataArray(me.table.rows[insertIndex + 1]);
        if (-1 !== rowJsonData) {
            rowJsonData = me.rowDataArray[rowJsonData];
            if (null === me.rowGroupArray[rowGroupIndex].groupFieldValue) {
                me.rowGroupArray[rowGroupIndex].rowDataArray.splice(insertIndex, 0, rowJsonData);
            } else {
                me.rowGroupArray[rowGroupIndex].rowDataArray.splice(insertIndex -
                    me.rowGroupArray[rowGroupIndex].titleRow.rowIndex, 0, rowJsonData);
            }
        }

        if (0 !== rowGroupIndex) {
            instance.expandGroup(me.rowGroupArray[rowGroupIndex].groupFieldValue, expand);
        }

        instance.setOddLineBkColor(me.colorJson.oddBkColor);
        instance.setEvenLineBkColor(me.colorJson.evenBkColor);
        instance.setSelRowColor(me.colorJson.selRowBkColor);

        return instance.getGroupAndRowIndex(insertIndex);
    };

    //设置单击组标题头的信息
    instance.setGroupIndex = function(index){
        this.groupFieldIndex = index;
    }
    instance.getGroupIndex = function(){
        return this.groupFieldIndex;
    }

    // 滚动某行到可视区域
    this.scrollRowIntoView = function (rowObj) {
        var htmlWidth = 0,
            htmlHeight = 0,
            groupRowIndex = null,
            parentRect = null,
            rowRect = null;

        if (!(rowObj instanceof Object)) {
            return;
        }

        groupRowIndex = instance.getGroupAndRowIndex(rowObj.rowIndex - 1);
        if (null === groupRowIndex) {
            return;
        }

        if (!instance.isGroupExpanded(groupRowIndex.groupFieldValue)) {
            instance.expandGroup(groupRowIndex.groupFieldValue, true);
        }

        parentRect = getRect(me.table.parentNode);
        rowRect = getRect(rowObj);
        htmlWidth = document.documentElement.clientWidth;
        htmlHeight = document.documentElement.clientHeight;

        if (rowRect.top >= htmlHeight ||
            rowRect.top >= parentRect.bottom ||
            rowRect.bottom <= 0 ||
            rowRect.bottom <= parentRect.top ||
            rowRect.left <= 0) {
            setTimeout(function () {
                rowObj.scrollIntoView(true);
            }, 1);
        }
    };

    // 设置选中行
    instance.setSelectRowInGroup = function (groupFieldVal, rowIndex) {
        var rawIndex = instance.getRawRowIndex(groupFieldVal, rowIndex);

        if (-1 === rawIndex) {
            return;
        }

        instance.setSelectRow(rawIndex);
    };

    // 获取选中行所在组的字段值及选中行索引组成的json
    instance.getSelectRowInGroup = function () {
        var selRawIndex = instance.getSelectRow();

        return instance.getGroupAndRowIndex(selRawIndex);
    };

    // 添加分组数据
    instance.addJsonData = function (dataArray) {
        var jsonArray = dataArray,
            i = 0,
            resJsonArray = [];

        if (!jsonArray ||
            !(jsonArray instanceof Object)) {
            return null;
        } else if (!(jsonArray instanceof Array)) {
            jsonArray = [jsonArray];
        }

        for (i = 0; i < jsonArray.length; i += 1) {
            resJsonArray.push(me.insertJsonDataToGroup(jsonArray[i]));
        }

        return resJsonArray;
    };

    // 获取分组展开状态
    instance.isGroupExpanded = function (groupFieldVal) {
        var singleGroupJson = null;

        singleGroupJson = me.getGroupDataByFieldVal(groupFieldVal);

        if (null === singleGroupJson) {
            return false;
        }

        return singleGroupJson.expand;
    };

    // 展开分组
    instance.expandGroup = function (groupFieldVal, expand) {
        var singleGroupJson = null,
            textDiv = null,
            i = 0;

        singleGroupJson = me.getGroupDataByFieldVal(groupFieldVal);

        if (null === singleGroupJson) {
            return;
        }

        singleGroupJson.expand = expand;

        textDiv = singleGroupJson.titleRow.getElementsByTagName("td")[0].getElementsByTagName("div")[0];
        if (expand) {
            textDiv.style.background = "url(/image/pc/common/close_icon.png) no-repeat left center";
            textDiv.style.paddingLeft = "15px";
            for (i = 0; i < singleGroupJson.rowDataArray.length; i += 1) {
                    singleGroupJson.rowDataArray[i].row.style.display = "table-row";
                }
        } else {
            textDiv.style.background = "url(/image/pc/common/open_icon.png) no-repeat left center";
            textDiv.style.paddingLeft = "15px";
            for (i = 0; i < singleGroupJson.rowDataArray.length; i += 1) {
                singleGroupJson.rowDataArray[i].row.style.display = "none";
            }
        }
    };

    // 判断是否是分组标题行
    instance.isGroupHead = function (rawRowIndex) {
        if (rawRowIndex < 0 ||
                rawRowIndex >= instance.getRowCount()) {
            return false;
        }
        return me.isGroupHeadRow(me.table.rows[rawRowIndex + 1]);
    };

    // 根据行对象判断是否是分组标题行
    this.isGroupHeadRow = function (row) {
        var i = 0;

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (row === me.rowGroupArray[i].titleRow) {
                return true;
            }
        }

        return false;
    };

    // 获取分组标题
    instance.getGroupTitle = function (groupFieldVal) {
        var singleGroupJson = null;

        singleGroupJson = me.getGroupDataByFieldVal(groupFieldVal);

        if (null === singleGroupJson) {
            return "";
        }

        return singleGroupJson.titleRow.cells[0].getElementsByTagName("div")[0].innerHTML;
    };

    // 设置分组标题
    instance.setGroupTitle = function (groupFieldVal, title) {
        var singleGroupJson = null;

        singleGroupJson = me.getGroupDataByFieldVal(groupFieldVal);

        if (null === singleGroupJson) {
            return;
        }

        singleGroupJson.titleRow.cells[0].getElementsByTagName("div")[0].innerHTML = title;
    };

    me.table.onclick = function (event) {
        var el = event.srcElement ? event.srcElement : event.target;

        if (el.tagName.toLowerCase() !== "td") {
            return;
        }

        if (!me.isGroupHeadRow(el.parentNode)) {
            me.selectRow(el.parentNode);
        }
    };

    // 设置某个单元格为可编辑单元格
    instance.enableGroupCellEdit = function (groupFieldVal, rowIndex, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        var rawRowIndex = instance.getRawRowIndex(groupFieldVal, rowIndex),
            paramArray = [groupFieldVal, rowIndex, colIndex];

        if (-1 === rawRowIndex) {
            return false;
        }

        return me.setEditableCellFunc(rawRowIndex, colIndex, onEditorChanged, paramArray, onEditorBlur, paramArray,
            onEditorBeforeShow, [groupFieldVal, rowIndex, colIndex]);
    };

    // 设置某列单元格全部可编辑
    instance.enableColCellsEdit = function (colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        var i = 0,
            length = instance.getRowCount();

        if (colIndex >= instance.getColCount()) {
            return;
        }

        for (i = 0; i < length; i += 1) {
            if (!instance.isGroupHead(i)) {
                instance.enableCellEdit(i, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow);
            }
        }

        me.colPropertyJsonArray[colIndex].editable = true;
        me.colPropertyJsonArray[colIndex].onEditorBeforeShow = onEditorBeforeShow;
        me.colPropertyJsonArray[colIndex].onEditorChanged = onEditorChanged;
        me.colPropertyJsonArray[colIndex].onEditorBlur = onEditorBlur;
    };

    // 使单元格不可编辑
    instance.disableGroupCellEdit = function (groupFieldVal, rowIndex, colIndex) {
        var rawRowIndex = instance.getRawRowIndex(groupFieldVal, rowIndex);

        if (-1 === rawRowIndex) {
            return false;
        }

        return instance.disableCellEdit(rawRowIndex, colIndex);
    };

    // 判断单元格复选框是否选中
    instance.getGroupCellChecked = function (groupFieldVal, rowIndex, colIndex) {
        var rawRowIndex = instance.getRawRowIndex(groupFieldVal, rowIndex);

        if (-1 === rawRowIndex) {
            return false;
        }

        return instance.getCellChecked(rawRowIndex, colIndex);
    };

    // 设置单元格选中状态
    instance.setGroupCellChecked = function (groupFieldVal, rowIndex, colIndex, checked) {
        var rawRowIndex = instance.getRawRowIndex(groupFieldVal, rowIndex);

        if (-1 === rawRowIndex) {
            return;
        }

        instance.setCellChecked(rawRowIndex, colIndex, checked);
    };

    // 删除组
    instance.deleteGroup = function (groupFieldVal, flag) {
        var i = 0,
            j = 0;

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (groupFieldVal === me.rowGroupArray[i].groupFieldValue) {
                instance.deleteRow(me.rowGroupArray[i].titleRow.rowIndex - 1, flag);

                for (j = me.rowGroupArray[i].rowDataArray.length - 1; j >= 0; j -= 1) {
                    instance.deleteRow(me.rowGroupArray[i].rowDataArray[j].row.rowIndex - 1, flag);
                }
            }
        }
    };

    // 删除所有行
    instance.deleteAll = function () {
        var i = 1;

        for (i = me.table.rows.length - 1; i >= 1; i -= 1) {
            me.table.deleteRow(i);
        }

        me.rowDataArray = [];
        me.rowGroupArray = [{
            groupFieldValue: null,
            expand: true,
            titleRow: document.createElement("tr"),
            rowDataArray: []                  // 类数组rowDataArray的子集
        }];
    };

    // 删除行
    instance.deleteRow = function (index, flag) {
        var i = 0,
            j = 0,
            dataIndex = -1;

        if (index < 0 || index > instance.getRowCount()) {
            return;
        }

        index += 1;

        dataIndex = me.getRowIndexInRowDataArray(me.table.rows[index]);
        if (-1 !== dataIndex) {
            for (i = 0; i < me.rowGroupArray.length; i += 1) {
                for (j = 0; j < me.rowGroupArray[i].rowDataArray.length; j += 1) {
                    if (me.rowGroupArray[i].rowDataArray[j] === me.rowDataArray[dataIndex]) {
                        me.table.deleteRow(index);
                        me.rowGroupArray[i].rowDataArray.splice(j, 1);
                        if(!flag){
                            if (0 === me.rowGroupArray[i].rowDataArray.length &&
                                0 !== i) {
                                me.table.deleteRow(me.rowGroupArray[i].titleRow.rowIndex);
                                me.rowGroupArray.splice(i , 1);
                            }
                        }

                        break;
                    }
                }
            }
            me.rowDataArray.splice(dataIndex, 1);
        }

        instance.setOddLineBkColor(me.colorJson.oddBkColor);
        instance.setEvenLineBkColor(me.colorJson.evenBkColor);
        instance.setSelRowColor(me.colorJson.selRowBkColor);
    };

    // 设置奇数行的背景色
    instance.setOddLineBkColor = function (color) {
        var i = 0;

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (me.rowGroupArray[i].rowDataArray.length) {
                me.setInterlacingBkColor(me.rowGroupArray[i].rowDataArray[0].row.rowIndex - 1,
                    me.rowGroupArray[i].rowDataArray[me.rowGroupArray[i].rowDataArray.length - 1].row.rowIndex - 1, color);
            }
        }

        me.colorJson.oddBkColor = color;
    };

    // 设置偶数行的背景色
    instance.setEvenLineBkColor = function (color) {
        var i = 0;

        for (i = 0; i < me.rowGroupArray.length; i += 1) {
            if (me.rowGroupArray[i].rowDataArray.length > 1) {
                me.setInterlacingBkColor(me.rowGroupArray[i].rowDataArray[0].row.rowIndex - 1 + 1,
                    me.rowGroupArray[i].rowDataArray[me.rowGroupArray[i].rowDataArray.length - 1].row.rowIndex - 1, color);
            }
        }

        me.colorJson.evenBkColor = color;
    };

    this.parentRefreshRow = instance.refreshRow;

    // 刷新行显示
    instance.refreshRow = function (index) {
        var oldRow = null,
            oldGroup = null,
            newRow = null,
            rowJson = null,
            addRes = null,
            i = 0,
            j = 0;

        if (index < 0 ||
                index >= instance.getRowCount()) {
            return;
        }

        oldRow = me.table.rows[index + 1];

        me.parentRefreshRow(index);
        rowJson = instance.getRowJson(index);
        if (null === rowJson) {
            return;
        }

        oldGroup = instance.getGroupAndRowIndex(index);
        if (null === oldGroup) {
            return;
        }

        if ((rowJson.hasOwnProperty(groupField) &&
            rowJson[groupField] === oldGroup.groupFieldValue) ||
            (!rowJson.hasOwnProperty(groupField) &&
            null === oldGroup.groupFieldValue)) {
            return;
        }

        addRes = instance.addJsonData(rowJson);
        if (null === addRes) {
            return;
        }
        newRow = me.table.rows[instance.getRawRowIndex(addRes.groupFieldValue, addRes.index) + 1];

        for (i = 0; i < oldRow.cells.length; i += 1) {
            newRow.cells[i].innerHTML = "";
            for (j = 0; j < oldRow.cells[i].childNodes.length; j += 1) {
                newRow.cells[i].appendChild(oldRow.cells[i].childNodes[j]);
            }
        }

        instance.deleteRow(oldRow.rowIndex - 1);
    };

    return instance;
}

function ScrollEditableTable(showWidth, maxShowHeight, realWidth, showHeight, id, groupField, groupTitleTpl) {
    var instance = {},
        me = this;
    this.allDivId = id ? id : "scrollEditableTable" + Math.round(Math.random() * 1000000);

    this.allDiv = document.createElement("div");

    this.captionDiv = document.createElement("div");
    this.headDiv = document.createElement("div");
    this.bodyDiv = document.createElement("div");

    function adjustRealWidth(showWidth, realWidth) {
        var showWidthUnit = null,
            realWidthUnit = null,
            borderLeftWidth = 0,
            borderRightWidth = 0;

        if (showWidth &&
            "string" === typeof showWidth &&
            -1 === showWidth.indexOf("%") &&
            realWidth &&
            "string" === typeof realWidth &&
            -1 === realWidth.indexOf("%") &&
            parseInt(showWidth, 10) === parseInt(realWidth, 10)) {
            showWidthUnit = showWidth.substr(parseInt(showWidth, 10).toString().length);
            realWidthUnit = realWidth.substr(parseInt(realWidth, 10).toString().length);
            if (showWidthUnit === realWidthUnit) {
                if (me.allDiv.style.borderLeftWidth.length) {
                    borderLeftWidth = parseInt(me.allDiv.style.borderLeftWidth, 10);
                }
                if (me.allDiv.style.borderRightWidth.length) {
                    borderRightWidth = parseInt(me.allDiv.style.borderRightWidth, 10);
                }
                realWidth = (parseInt(realWidth, 10) - borderLeftWidth - borderRightWidth) + realWidthUnit;
            }
        }

        return realWidth;
    }

    realWidth = adjustRealWidth(showWidth, realWidth);

    if (groupField) {
        this.headTable = new GroupEditableTable(null, realWidth, null, groupField, groupTitleTpl);
        this.bodyTable = new GroupEditableTable(null, realWidth, null, groupField, groupTitleTpl);
    } else {
        this.headTable = new EditableTable(null, realWidth);
        this.bodyTable = new EditableTable(null, realWidth);
    }

    this.allDiv.style.width = showWidth;
    this.allDiv.style.overflow = "hidden";
    this.allDiv.style.position = "relative";
    this.allDiv.setAttribute("id", this.allDivId);

    this.captionDiv.style.width = "100%";
    me.captionDiv.style.backgroundColor = "#1782D8";
    //me.captionDiv.style.padding = "5px";
    me.captionDiv.style.fontSize = "15px";
    me.captionDiv.style.fontWeight = "bold";
    me.captionDiv.style.color = "#fff";

    this.bodyDiv.style.width = "100%";
    this.bodyDiv.style.overflow = "auto";
    this.bodyDiv.style.position = "relative";

    this.headTable.setTableStyle("width", realWidth);
    this.headTable.setTableStyle("position", "relative");
    //this.headTable.setTableStyle("border-width", "0");

    this.headDiv.style.width = "100%";
    this.headDiv.style.position = "relative";
    this.headDiv.style.backgroundColor = me.headTable.getHeadBkColor();

    this.colMinWidth = 20;
    this.colsWidthDragEnabled = true;      // 是否可以拖拽改变列宽



    // 获取Id
    instance.getId = function () {
        return me.allDivId;
    };

    // 设置Id
    instance.setId = function (id) {
        if (id) {
            me.allDiv.setAttribute("id", id);
        }
    };

    // 获取dom对象
    instance.getDom = function () {
        me.modifyColsWidth();
        return me.allDiv;
    };

    // 设置是否需要为传入字符串编码
    instance.enableTextEncode = function (enabled) {
        me.headTable.enableTextEncode(enabled);
        me.bodyTable.enableTextEncode(enabled);
    };

    // 插入表格表头
    instance.insertHead = function (headArray) {
        var i = 0;

        if (!(headArray instanceof Array) ||
                0 === headArray.length) {
            return;
        }

        me.headTable.insertHead(headArray);

        for (i = me.headTable.getColCount() - 1; i >= 0; i -= 1) {
            me.bodyTable.insertColumns(me.headTable.getColumnProperty(i));
        }

        me.bodyTable.hideHead();

        for (i = 0; i < instance.getColCount(); i += 1) {
            if (me.headTable.isHeadCellCheckEnabled(i)) {
                me.setColCellsCheckBoxClickFunc(i);
            }
        }

        instance.enableDragColWidth(me.colsWidthDragEnabled);
    };

    // 以json方式插入列
    instance.insertColumns = function (columnData, insertIndex) {
        var i = 0;

        me.headTable.insertColumns(columnData, insertIndex);
        me.bodyTable.insertColumns(columnData, insertIndex);
        me.bodyTable.hideHead();

        for (i = 0; i < instance.getColCount(); i += 1) {
            if (me.headTable.isHeadCellCheckEnabled(i)) {
                me.setColCellsCheckBoxClickFunc(i);
            }
        }

        instance.enableDragColWidth(me.colsWidthDragEnabled);
    };

    // 插入表格数据
    instance.insertData = function (index, dataArray) {
        var res = null;

        res = me.bodyTable.insertData(index, dataArray);
        me.modifyColsWidth();
        me.setHeadCellsCheckBoxStatus();
        me.setAllCellsCheckBoxFunc();

        return res;
    };

    // 以json方式插入数据
    instance.insertJsonData = function (index, jsonData) {
        var res = null;

        if (groupField) {
            res = me.bodyTable.insertJsonData(index, jsonData);
        } else {
            res = me.bodyTable.insertJsonData(null === index ? instance.getRowCount() : index, jsonData);
        }

        me.modifyColsWidth(index);
        me.setHeadCellsCheckBoxStatus();
        me.setAllCellsCheckBoxFunc();
        return res;
    };

    // 设置表头复选框状态
    this.setHeadCellsCheckBoxStatus = function () {
        var i = 0,
            isGrayed = false;

        for (i = 0; i < instance.getColCount(); i += 1) {
            if (me.headTable.isHeadCellCheckEnabled(i)) {
                isGrayed = me.headTable.isHeadCellCheckBoxGrayed(i);

                me.headTable.setHeadCellChecked(i, false);
                if (me.bodyTable.isAllColCellsChecked(i)) {
                    me.headTable.setHeadCellChecked(i, true);
                }

                if (isGrayed) {
                    me.headTable.setHeadCellCheckBoxGrayed(i, true);
                }
            }
        }
    };

    // 添加表格数据
    instance.addData = function (dataArray) {
        return instance.insertData(instance.getRowCount(), dataArray);
    };

    // 以json方式添加数据
    instance.addJsonData = function (jsonData) {
        return instance.insertJsonData(null, jsonData);
    };

    // 为所有内容单元格设置响应
    this.setAllCellsCheckBoxFunc = function () {
        var i = 0;

        for (i = 0; i < instance.getColCount(); i += 1) {
            me.setColCellsCheckBoxClickFunc(i);
        }
    };

    // 删除所有行
    instance.deleteAll = function () {
        me.bodyTable.deleteAll();
    };

    // 删除行
    instance.deleteRow = function (index, flag) {
        me.bodyTable.deleteRow(index, flag);
    };

    // 选中某行
    instance.setSelectRow = function (index) {
        me.bodyTable.setSelectRow(index);
    };

    // 获取选中行
    instance.getSelectRow = function () {
        return me.bodyTable.getSelectRow();
    };

    // 取消选中状态
    instance.deselectRow = function () {
        me.bodyTable.deselectRow();
    };

    // 获取行json
    instance.getRowJson = function (index) {
        return me.bodyTable.getRowJson(index);
    };

    // 设置行json
    instance.setRowJson = function (index, json) {
        return me.bodyTable.setRowJson(index, json);
    };

    // 获取列json
    instance.getColJson = function (index) {
        return me.headTable.getColJson(index);
    };

    // 获取表头表格
    instance.getHeadTable = function () {
        return me.headTable;
    };

    // 获取内容表格
    instance.getBodyTable = function () {
        return me.bodyTable;
    };

    // 设置表头行高
    instance.setHeadLineHeight = function (height) {
        me.headTable.setLineHeight(height);
        me.refreshTableHeight();
    };

    // 设置内容行高
    instance.setBodyLineHeight = function (height) {
        me.bodyTable.setLineHeight(height);
        me.refreshTableHeight();
    };

    // 获取最外层Div的style
    instance.getOutmostDivStyle = function (styleName) {
        if (me.allDiv.style[styleName]) {
            return me.allDiv.style[styleName];
        }

        return null;
    };

    // 设置最外层Div的style
    instance.setOutmostDivStyle = function (styleName, styleValue) {
        me.allDiv.style[styleName] = styleValue;
    };

    // 判断是否有表头
    instance.hasHead = function () {
        return me.headTable.hasHead();
    };

    // 获取行数
    instance.getRowCount = function () {
        return me.bodyTable.getRowCount();
    };

    // 获取列数
    instance.getColCount = function () {
        return me.headTable.getColCount();
    };

    // 修正表格列宽
    this.modifyColsWidth = function (index) {
        var i = 0,
            headTableObj = me.headTable.getDom(),
            bodyTableObj = me.bodyTable.getDom(),
            scrollBarWidth = me.bodyDiv.offsetWidth - me.bodyDiv.clientWidth,
            width = 0;

        if (me.bodyTable.getRowCount()) {
            if (scrollBarWidth &&
                    getElementRealWidth(me.headDiv) - getElementRealWidth(headTableObj) < scrollBarWidth) {
                headTableObj.style.width = me.bodyDiv.clientWidth + "px";//(getElementRealWidth(headTableObj) - scrollBarWidth - 2) + "px";
            }

            width = getElementRealWidth(headTableObj);
            if (width) {
                bodyTableObj.style.width = width + "px";
            }

            for (i = 0; i < headTableObj.rows[0].cells.length; i += 1) {
                width = getElementRealWidth(headTableObj.rows[0].cells[i]);
                if (width) {
//                    if(bodyTableObj.rows[1].cells[i]){
//                        bodyTableObj.rows[1].cells[i].style.width = width + "px";
//                    }
                    index = index == undefined ? 1 : index;
                    if("colspan" in bodyTableObj.rows[index].cells["0"].attributes){ //如果分组
                        if(bodyTableObj.rows[index+1] && bodyTableObj.rows[index+1].cells[i]){
                            bodyTableObj.rows[index+1].cells[i].style.width = width + "px";
                        }
                    }else{
                        bodyTableObj.rows[1].cells[i].style.width = width + "px";
                    }

                }
            }
        }
    };

    // 设置表格的列宽可以鼠标拖动改变
    instance.enableDragColWidth = function (enabled) {
        var isVertLineMove = false,
            curTh = null,
            vertLineDiv = null,
            headTableObj = me.headTable.getDom(),
            bodyTableObj = me.bodyTable.getDom(),
            headThDomArray = headTableObj.getElementsByTagName("th"),
            i = 0;

        me.colsWidthDragEnabled = enabled;

        if (!enabled) {
            for (i = 0; i < headThDomArray.length; i += 1) {
                headThDomArray[i].onmousedown = null;
                headThDomArray[i].onmousemove = null;
            }

            me.allDiv.onmousemove = null;

            return;
        }

        function mouseMoveFunc(event) {
            var offset = 2,    // offset个像素内可拖拽
                leftDiff = event.offsetX,
                rightDiff = getElementRealWidth(this) - event.offsetX,
                bFirst = (this === headThDomArray[0]),
                bLast = (this === headThDomArray[headThDomArray.length - 1]);

            //距离表头边框线左右offset个像素才触发效果
            if ((bFirst && rightDiff < offset) ||
                    (!bFirst && (leftDiff < offset || rightDiff < offset)) ||
                    bLast && rightDiff < offset) {
                this.style.cursor = "url(/image/pc/common/splith.cur),auto";
                //$(this).css('cursor', " url(/image/pc/common/splith.cur)-moz-zoom-out");
            } else {
                this.style.cursor = "default";
            }
        }

        function mouseDownFunc(event) {
            var offset = 2,    // offset个像素内可拖拽
                leftDiff = event.offsetX,
                rightDiff = getElementRealWidth(this) - event.offsetX,
                bFirst = (this === headThDomArray[0]),
                bLast = (this === headThDomArray[headThDomArray.length - 1]);

            //距离表头边框线左右offset个像素才触发效果
            if ((bFirst && rightDiff < offset) ||
                    (!bFirst && (leftDiff < offset || rightDiff < offset))) {
                vertLineDiv = document.createElement("div");

                vertLineDiv = document.createElement("div");
                vertLineDiv.style.position = "absolute";
                vertLineDiv.style.height = (me.headDiv.clientHeight + me.bodyDiv.clientHeight) + "px";
                vertLineDiv.style.top = getOffsetTopInPage(this) + "px";
                vertLineDiv.style.left = event.pageX + "px";
                vertLineDiv.style.width = "0";
                vertLineDiv.style.zIndex = 30000;
                vertLineDiv.style.borderLeft = "1px solid #1979ca";
                document.body.appendChild(vertLineDiv);

                window.onmouseup = function (event) {
                    var i = 0;

                    if (isVertLineMove) {
                        var index = 0,
                            oldWidth = getElementRealWidth(curTh),
                            newWidth = event.pageX - getOffsetLeftInPage(curTh);

                        for (i = 0; i < headThDomArray.length; i += 1) {
                            if (curTh === headThDomArray[i]) {
                                index = i;
                                break;
                            }
                        }

                        document.body.removeChild(vertLineDiv);
                        isVertLineMove = false;

                        if (Math.abs(newWidth - oldWidth) < offset) {
                            return;
                        }

                        if (newWidth <= me.colMinWidth) {
                            newWidth = me.colMinWidth;
                        }

                        headTableObj.style.width = (getElementRealWidth(headTableObj) + newWidth - oldWidth) + "px";
                        bodyTableObj.style.width = getElementRealWidth(headTableObj) + "px";


                        for (i = 0; i < headTableObj.rows.length; i += 1) {
                            headTableObj.rows[i].cells[index].style.width = newWidth + "px";
                        }
                        for (i = 0; i < bodyTableObj.rows.length; i += 1) {
                            if(bodyTableObj.rows[i].cells[index]){
                                bodyTableObj.rows[i].cells[index].style.width = newWidth + "px";
                            }
                        }
                        //var height = $(headTableObj).height();
                        //bodyTableObj.style.marginTop =  "-" + height + "px";
                        me.modifyColsWidth();
                    }
                };

                me.allDiv.onmousemove = function (event) {
                    if (isVertLineMove &&
                            vertLineDiv) {
                        vertLineDiv.style.left = event.pageX + "px";
                        document.body.style.cssText = document.body.style.cssText + 'moz-user-select: -moz-none;' +
                            '-moz-user-select: none;' +
                            '-o-user-select:none;' +
                            '-khtml-user-select:none;' +
                            '-webkit-user-select:none;' +
                            '-ms-user-select:none;' +
                            'user-select:none';
                    }
                };


                //全局变量，代表当前是否处于调整列宽状态
                isVertLineMove = true;
                //总是取前一个TH对象
                if (event.offsetX < getElementRealWidth(this) / 2) {
                    curTh = this.previousSibling;
                } else {
                    curTh = this;
                }
            }
        }

        // 鼠标移到边框上时
        for (i = 0; i < headThDomArray.length; i += 1) {
            headThDomArray[i].onmousemove = mouseMoveFunc;
            headThDomArray[i].onmousedown = mouseDownFunc;
        }
    };

    // 设置列宽
    instance.setColsWidth = function (widthArray) {
        me.headTable.setColsWidth(widthArray);
        me.bodyTable.setColsWidth(widthArray);
        me.modifyColsWidth();
    };

    // 获取caption
    instance.getCaptionText = function () {
        if (me.table.caption) {
            return me.getInnerText(me.table.caption);
        }

        return null;
    };

    // 设置caption
    instance.setCaptionText = function (text) {
        if (me.isTextEncodeEnable) {
            me.captionDiv.innerHTML = text.toString().encodeHtml();
        } else {
            me.captionDiv.innerHTML = text;
        }

        if ("" !== text ||
            !text) {
            me.captionDiv.style.padding = "5px";
        } else {
            me.captionDiv.style.padding = "0";
        }
    };

    // 获取caption style
    instance.getCaptionStyle = function (styleName) {
        if (me.captionDiv.style[styleName] &&
            "" !== me.captionDiv.style[styleName]) {
            return me.captionDiv.style[styleName];
        }

        return me.allDiv.style[styleName];
    };

    // 设置caption style
    instance.setCaptionStyle = function (styleName, styleValue) {
        me.captionDiv.style[styleName] = styleValue;
    };

    // 为caption添加子dom对象
    instance.appendCaptionChildDomObj = function (domObj) {
        if (me.captionDiv) {
            me.captionDiv.appendChild(domObj);
        }
    };

    // 获取表头单元格选中状态
    instance.getHeadCellChecked = function (index) {
        return me.headTable.getHeadCellChecked(index);
    };

    // 获取单元格选中状态
    instance.getCellChecked = function (rowIndex, colIndex) {
        return me.bodyTable.getCellChecked(rowIndex, colIndex);
    };

    // 设置表头单元格选中状态
    instance.setHeadCellChecked = function (index, checked) {
        me.headTable.setHeadCellChecked(index, checked);
        me.bodyTable.setHeadCellChecked(index, checked);
    };

    // 获取选中行数
    instance.getCheckedRowsCount = function (colIndex) {
        return me.bodyTable.getCheckedRowsCount(colIndex);
    };

    // 获取所有选中行的json数据
    instance.getCheckedRowsJsonArray = function (colIndex) {
        return me.bodyTable.getCheckedRowsJsonArray(colIndex);
    };

    // 设置单元格选中状态
    instance.setCellChecked = function (rowIndex, colIndex, checked) {
        var oHeadCellCheckBox = null,
            oCellCheckBox = null,
            i = 0,
            cell = null;

        if (rowIndex >= instance.getRowCount() ||
            colIndex >= instance.getColCount()) {
            return;
        }

        cell = me.bodyTable.getCell(rowIndex, colIndex);
        if (!cell) {
            return;
        }

        oCellCheckBox = me.getCheckBoxChild(cell);
        if (!oCellCheckBox) {
            return;
        }

        me.setCheckBoxChecked(oCellCheckBox, checked);

        if (instance.hasHead()) {
            oHeadCellCheckBox = me.getCheckBoxChild(me.headTable.getDom().rows[0].cells[colIndex]);
            if (oHeadCellCheckBox) {
                for (i = 0; i < instance.getRowCount(); i += 1) {
                    oCellCheckBox = me.getCheckBoxChild(me.bodyTable.getCell(i, colIndex));
                    if (oCellCheckBox &&
                            !me.getCheckBoxChecked(oCellCheckBox) &&
                            !instance.isCellCheckBoxGrayed(i, colIndex)) {
                        me.setCheckBoxChecked(oHeadCellCheckBox, false);
                        break;
                    }
                }
                if (i === instance.getRowCount()) {
                    me.setCheckBoxChecked(oHeadCellCheckBox, true);
                }
            }
        }
    };

    // 启用或禁用表头项的复选框
    instance.enableHeadCellCheck = function (index, enabled, onHeadCellChecked, onHeadCellBeforeChecked) {
        me.headTable.enableHeadCellCheck(index, enabled, onHeadCellChecked, onHeadCellBeforeChecked);
        me.bodyTable.enableHeadCellCheck(index, enabled, onHeadCellChecked, onHeadCellBeforeChecked);
        me.setColCellsCheckBoxClickFunc(index);
    };

    // 启用或禁用表格单元格的复选框
    instance.enableCellCheck = function (rowIndex, colIndex, enabled, checked, onCellChecked, onCellBeforeChecked) {
        me.bodyTable.enableCellCheck(rowIndex, colIndex, enabled, checked, onCellChecked, onCellBeforeChecked);
        me.headTable.setHeadCellChecked(colIndex, me.bodyTable.getHeadCellChecked(colIndex));
        me.setColCellsCheckBoxClickFunc(colIndex);
    };

    // 启用或禁用某列所有单元格的复选框
    instance.enableColCellsCheck = function (index, enabled, checked, onCellsChecked, onCellsBeforeChecked) {
        me.headTable.enableColCellsCheck(index, enabled, checked, onCellsChecked, onCellsBeforeChecked);
        me.bodyTable.enableColCellsCheck(index, enabled, checked, onCellsChecked, onCellsBeforeChecked);
        me.setColCellsCheckBoxClickFunc(index);
    };

    // 为某一列表格的复选框设置点击响应
    this.setColCellsCheckBoxClickFunc = function (colIndex) {
        var i = 0,
            oCheckBox = null,
            checkBoxClickFunc = function (event) {
                me.onCheckBoxClick(this);
            };

        if (colIndex < 0 ||
                colIndex >= instance.getColCount()) {
            return;
        }

        oCheckBox = me.getCheckBoxChild(me.headTable.getDom().rows[0].cells[colIndex]);
        if (oCheckBox) {
            oCheckBox.onclick = checkBoxClickFunc;
        }

        for (i = 0; i < instance.getRowCount(); i += 1) {
            oCheckBox = me.getCheckBoxChild(me.bodyTable.getCell(i, colIndex));
            if (oCheckBox) {
                oCheckBox.onclick = checkBoxClickFunc;
            }
        }
    };

    // 添加滚动响应
    $(this.bodyDiv).scroll(function (event) {
        var offsetLeft = $(this).scrollLeft();
        var $headTableJObj = $("#" + me.headTable.getId());
        $headTableJObj.css("left", - offsetLeft);
        $(me.headDiv).css("background-color", me.headTable.getHeadBkColor());
    });

    // 查找元素下的checkbox子元素
    this.getCheckBoxChild = function (element) {
        var i = 0,
            className = "";

        if (!element ||
                !(element instanceof HTMLElement)) {
            return null;
        }

        for (i = 0; i < element.childNodes.length; i += 1) {
            if (element.childNodes[i].nodeName.toLowerCase() === "input") {
                className = element.childNodes[i].getAttribute("class");
                if ("checkBox" === className ||
                    "uncheckBox" === className ||
                    "disabledCheckBox" === className ||
                    "disabledUncheckBox" === className) {
                    return  element.childNodes[i];
                }
            }
        }

        return null;
    };

    // 设置选中状态
    this.setCheckBoxChecked = function (oCheckBox, checked) {
        if (!oCheckBox ||
                !(oCheckBox instanceof HTMLElement)) {
            return;
        }


        if (checked && ("disabledCheckBox" === oCheckBox.getAttribute("class") ||
            "checkBox" === oCheckBox.getAttribute("class")) ||
            !checked && ("disabledUncheckBox" === oCheckBox.getAttribute("class") ||
                "uncheckBox" === oCheckBox.getAttribute("class"))) {
            return;
        }

        if (checked) {
            if ("disabledUncheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "disabledCheckBox");
            } else {
                oCheckBox.setAttribute("class", "checkBox");
            }
        } else {
            if ("disabledCheckBox" === oCheckBox.getAttribute("class")) {
                oCheckBox.setAttribute("class", "disabledUncheckBox");
            } else {
                oCheckBox.setAttribute("class", "uncheckBox");
            }
        }
    };

    // 获取选中状态
    this.getCheckBoxChecked = function (oCheckBox) {
        if (!oCheckBox ||
                !(oCheckBox instanceof HTMLElement)) {
            return false;
        }

        return "checkBox" === oCheckBox.getAttribute("class");
    };

    // 复选框点击响应
    this.onCheckBoxClick = function (oCheckBox) {
        var indexsJson = null,
            rowIndex = 0,
            colJson = null,
            beforeCheckRes = true;

        if (!oCheckBox) {
            return;
        }

        indexsJson = me.getCheckBoxCellIndexsJson(oCheckBox);

        if (!indexsJson) {
            return;
        }

        colJson = instance.getColJson(indexsJson.colIndex);

        if (-1 === indexsJson.rowIndex) {
            if (colJson.hasOwnProperty("onHeadCellBeforeChecked") &&
                    colJson.onHeadCellBeforeChecked) {
                beforeCheckRes = colJson.onHeadCellBeforeChecked(indexsJson.colIndex, me.headTable.getHeadCellChecked(indexsJson.colIndex));
                if (false === beforeCheckRes) {
                    return;
                }
            }
            me.headTable.setHeadCellChecked(indexsJson.colIndex, !me.headTable.getHeadCellChecked(indexsJson.colIndex));
            me.bodyTable.setHeadCellChecked(indexsJson.colIndex, me.headTable.getHeadCellChecked(indexsJson.colIndex));
            if (colJson.hasOwnProperty("onHeadCellChecked") &&
                    colJson.onHeadCellChecked) {
                colJson.onHeadCellChecked(indexsJson.colIndex, me.headTable.getHeadCellChecked(indexsJson.colIndex));
            }
        } else {
            if (colJson.hasOwnProperty("onCellsBeforeChecked") &&
                    colJson.onCellsBeforeChecked) {
                beforeCheckRes = colJson.onCellsBeforeChecked(indexsJson.rowIndex,
                    indexsJson.colIndex, instance.getCellChecked(indexsJson.rowIndex, indexsJson.colIndex));
                if (false === beforeCheckRes) {
                    return;
                }
            }
            instance.setCellChecked(indexsJson.rowIndex, indexsJson.colIndex,
                !instance.getCellChecked(indexsJson.rowIndex, indexsJson.colIndex));
            if (colJson.hasOwnProperty("onCellsChecked") &&
                    colJson.onCellsChecked) {
                colJson.onCellsChecked(indexsJson.rowIndex,
                    indexsJson.colIndex, instance.getCellChecked(indexsJson.rowIndex, indexsJson.colIndex));
            }
        }
    };

    // 根据checkBox对象获取行列索引
    // 返回值为json数据，rowIndex--行索引（表头为-1）  colIndex--列索引，失败则返回false
    this.getCheckBoxCellIndexsJson = function (oCheckBox) {
        var i = 0,
            j = 0,
            cell = null;

        if (!oCheckBox ||
                !(oCheckBox instanceof HTMLElement)) {
            return false;
        }

        for (i = 0; i < instance.getColCount(); i += 1) {
            if (oCheckBox === me.getCheckBoxChild(me.headTable.getDom().rows[0].cells[i])) {
                return {
                    rowIndex: -1,
                    colIndex: i
                };
            }
        }

        for (i = 0; i < instance.getRowCount(); i += 1) {
            for (j = 0; j < instance.getColCount(); j += 1) {
                cell = me.bodyTable.getCell(i, j);
                if (cell) {
                    if (oCheckBox === me.getCheckBoxChild(cell)) {
                        return {
                            rowIndex: i,
                            colIndex: j
                        };
                    }
                }
            }
        }

        return false;
    };

    // 刷新表格高度
    this.refreshTableHeight = function () {
        var headTableObj = me.headTable.getDom(),
            headTableHeight = headTableObj.offsetHeight;

        if (showHeight) {
            me.bodyDiv.style.height = parseInt(showHeight, 10) - headTableHeight + "px";
        } else if (maxShowHeight &&
            getElementRealWidth(me.bodyDiv) > parseInt(maxShowHeight, 10) - headTableHeight) {
            me.bodyDiv.style.height = parseInt(maxShowHeight, 10) - headTableHeight + "px";
        }
    };

    // 将表格显示到某个对象里
    instance.renderToDomObj = function (domObj) {
        var i = 0;

        if ("object" === typeof domObj) {
            while (domObj.childNodes.length) {
                domObj.removeChild(domObj.childNodes[0]);
            }

            instance.appendToDomObj(domObj);
        }
    };

    // 将表格显示到某id的元素里
    instance.renderToDomObjById = function (id) {
        var domObj = document.getElementById(id);

        if (domObj) {
            instance.renderToDomObj(domObj);
        }
    };

    // 将表格添加到某个dom对象里
    instance.appendToDomObj = function (domObj) {
        if ("object" === typeof domObj) {
            domObj.appendChild(me.allDiv);
            // 若没有横向滚动条没有纵向滚动条，则表头跟内容无法对齐，所以需要处理一下
            me.modifyColsWidth();
        }
    };

    // 将表格添加到某个id的元素里
    instance.appendToDomObjById = function (id) {
        var domObj = document.getElementById(id);

        if (domObj) {
            instance.appendToDomObj(domObj);
        }
    };

    // 将表头单元格复选框设置为灰色
    instance.setHeadCellCheckBoxGrayed = function (index, isGrayed) {
        me.headTable.setHeadCellCheckBoxGrayed(index, isGrayed);
    };

    // 将表格单元格复选框设置为灰色
    instance.setCellCheckBoxGrayed = function (rowIndex, colIndex, isGrayed) {
        me.bodyTable.setCellCheckBoxGrayed(rowIndex, colIndex, isGrayed);
        me.headTable.setHeadCellChecked(colIndex, me.bodyTable.getHeadCellChecked(colIndex));
    };

    // 将表格列复选框设置为灰色
    instance.setColCellsCheckBoxGrayed = function (index, isGrayed) {
        me.headTable.setColCellsCheckBoxGrayed(index, isGrayed);
        me.bodyTable.setColCellsCheckBoxGrayed(index, isGrayed);
    };

    // 判断表头单元格复选框是否置灰
    instance.isHeadCellCheckBoxGrayed = function (index) {
        return me.headTable.isHeadCellCheckBoxGrayed(index);
    };

    // 判断表头单元格复选框是否置灰
    instance.isHeadCellCheckBoxGrayChecked = function (index) {
        return me.headTable.isHeadCellCheckBoxGrayChecked(index);
    };

    // 判断表格单元格复选框是否置灰
    instance.isCellCheckBoxGrayed = function (rowIndex, colIndex) {
        return me.bodyTable.isCellCheckBoxGrayed(rowIndex, colIndex);
    };

    // 判断表格单元格复选框是否置灰
    instance.isCellCheckBoxGrayChecked = function (rowIndex, colIndex) {
        return me.bodyTable.isCellCheckBoxGrayChecked(rowIndex, colIndex);
    };

    // 判断表格列复选框是否全置灰
    instance.isColCellsCheckBoxGrayed = function (index) {
        return me.headTable.isColCellsCheckBoxGrayed(index);
    };

    // 刷新行显示
    instance.refreshRow = function (index) {
        me.bodyTable.refreshRow(index);
        me.setHeadCellsCheckBoxStatus();
    };

    // 设置某单元格可编辑
    instance.enableCellEdit = function (rowIndex, colIndex, enabled) {
        return me.bodyTable.enableCellEdit(rowIndex, colIndex, enabled);
    };

    // 取消某单元格可编辑功能
    instance.disableCellEdit = function (rowIndex, colIndex, enabled) {
        return me.bodyTable.disableCellEdit(rowIndex, colIndex, enabled);
    };

    // 设置某列单元格全部可编辑
    instance.enableColCellsEdit = function (colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        me.bodyTable.enableColCellsEdit(colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow);
    };

    // 设置选中行
    instance.setSelectRowInGroup = function (groupFieldVal, rowIndex) {
        if (groupField) {
            me.bodyTable.setSelectRowInGroup(groupFieldVal, rowIndex);
        }
    };

    // 获取选中行所在组的字段值及选中行索引组成的json
    instance.getSelectRowInGroup = function () {
        if (groupField) {
            return me.bodyTable.getSelectRowInGroup();
        }

        return null;
    };

    //获取单击组标题头的信息
    instance.getGroupIndex = function(){
        if(groupField){
            return me.bodyTable.getGroupIndex();
        }

    }
    // 获取分组展开状态
    instance.isGroupExpanded = function (groupFieldVal) {
        if (groupField) {
            return me.bodyTable.isGroupExpanded(groupFieldVal);
        }

        return false;
    };

    // 展开分组
    instance.expandGroup = function (groupFieldVal, expand) {
        if (groupField) {
            me.bodyTable.expandGroup(groupFieldVal, expand);
        }
    };

    // 判断是否是分组标题行
    instance.isGroupHead = function (rawRowIndex) {
        if (groupField) {
            return me.bodyTable.isGroupHead(rawRowIndex);
        }

        return false;
    };

    // 获取分组标题
    instance.getGroupTitle = function (groupFieldVal) {
        if (groupField) {
            return me.bodyTable.getGroupTitle(groupFieldVal);
        }

        return null;
    };

    // 设置分组标题
    instance.setGroupTitle = function (groupFieldVal, title) {
        if (groupField) {
            me.bodyTable.setGroupTitle(groupFieldVal, title);
        }
    };

    // 设置某个单元格为可编辑单元格
    instance.enableGroupCellEdit = function (groupFieldVal, rowIndex, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        if (groupField) {
            me.bodyTable.enableGroupCellEdit(groupFieldVal, rowIndex, colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow);
        }
    };

    // 设置某列单元格全部可编辑
    instance.enableColCellsEdit = function (colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow) {
        if (groupField) {
            me.bodyTable.enableColCellsEdit(colIndex, onEditorChanged, onEditorBlur, onEditorBeforeShow);
        }
    };

    // 使单元格不可编辑
    instance.disableGroupCellEdit = function (groupFieldVal, rowIndex, colIndex) {
        if (groupField) {
            me.bodyTable.disableGroupCellEdit(groupFieldVal, rowIndex, colIndex);
        }
    };

    // 判断单元格复选框是否选中
    instance.getGroupCellChecked = function (groupFieldVal, rowIndex, colIndex) {
        if (groupField) {
            return me.bodyTable.getGroupCellChecked(groupFieldVal, rowIndex, colIndex);
        }

        return false;
    };

    // 设置单元格选中状态
    instance.setGroupCellChecked = function (groupFieldVal, rowIndex, colIndex, checked) {
        if (groupField) {
            me.bodyTable.setGroupCellChecked(groupFieldVal, rowIndex, colIndex, checked);
        }
    };

    // 删除组
    instance.deleteGroup = function (groupFieldVal, flag) {
        if (groupField) {
            me.bodyTable.deleteGroup(groupFieldVal, flag);
        }
    };

    // 根据分组字段值和组内索引获取总索引
    instance.getRawRowIndex = function (groupFieldVal, index) {
        if (groupField) {
            return me.bodyTable.getRawRowIndex(groupFieldVal, index);
        }

        return -1;
    };

    // 根据总索引获取组字段值和行索引组成的json
    instance.getGroupAndRowIndex = function (rawRowIndex) {
        if (groupField) {
            return me.bodyTable.getGroupAndRowIndex(rawRowIndex);
        }

        return null;
    };

    // 隐藏表头
    instance.hideHead = function () {
        me.headTable.hideHead();
    };

    function onWindowResize() {
        me.modifyColsWidth();
    }

    if (window.addEventListener) {
        window.addEventListener("resize", onWindowResize, false);
    } else if (window.attachEvent) {
        window.attachEvent("onresize", onWindowResize);
    }

    this.allDiv.appendChild(me.captionDiv);
    this.allDiv.appendChild(me.headDiv);
    this.headTable.appendToDomObj(me.headDiv);
    this.allDiv.appendChild(me.bodyDiv);
    this.bodyTable.appendToDomObj(me.bodyDiv);
    this.headTable.getDom().style.borderBottom = "0";
    this.bodyTable.getDom().style.borderBottom = "0";

    this.refreshTableHeight();
    this.modifyColsWidth();

    return instance;
}

// 获取距离浏览器左边框的像素数
function getOffsetLeftInPage(domObj) {
    var offsetLeft = 0;

    if (!domObj ||
        !(domObj instanceof HTMLElement)) {
        return 0;
    }

    while (domObj) {
        offsetLeft += domObj.offsetLeft;
        domObj = domObj.offsetParent;
    }

    return offsetLeft;
}

// 获取距离浏览器顶端的像素数
function getOffsetTopInPage(domObj) {
    var offsetTop = 0;

    if (!domObj ||
            !(domObj instanceof HTMLElement)) {
        return 0;
    }

    while (domObj) {
        offsetTop += domObj.offsetTop;
        domObj = domObj.offsetParent;
    }

    return offsetTop;
}

// 获取元素的实际宽度
function getElementRealWidth (domObj) {
    if (!domObj ||
            !(domObj instanceof HTMLElement)) {
        return 0;
    }
    return Math.max(domObj.clientWidth, domObj.offsetWidth, domObj.scrollWidth);
}

// 获取元素的实际高度
function getElementRealHeight (domObj) {
    if (!domObj ||
        !(domObj instanceof HTMLElement)) {
        return 0;
    }
    return Math.max(domObj.clientHeight, domObj.offsetHeight, domObj.scrollHeight);
}

function getRect( elements ){
    var rect = elements.getBoundingClientRect();
    var clientTop = document.documentElement.clientTop;
    var clientLeft = document.documentElement.clientLeft;
    return { // 兼容ie多出的两个px
        top : rect.top - clientTop, // 距离顶部的位置
        bottom : rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
        left : rect.left - clientLeft, // 距离左边的位置
        right : rect.right - clientLeft // 距离右边的位置就是 距离左边的位置加上元素本身的宽度
    };
};
