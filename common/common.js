/**
 * Created with JetBrains PhpStorm.
 * User: xiaocai
 * Date: 13-1-28
 * Time: 上午9:35
 * To change this template use File | Settings | File Templates.
 */
//var version = "v2.11.67.7480";
var menuXmlFileName = "home_using.xml";   // 菜单配置文件名称，默认为home_using.xml

// 设置菜单配置文件
function setMenuXmlName(menuXmlName) {
    if (menuXmlName) {
        menuXmlFileName = menuXmlName;
    }
}

//删除左右两端的空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//删除左边的空格
function lTrim(str){
    return str.replace(/(^\s*)/g,"");
}

//删除右边的空格
function rTrim(str){
    return str.replace(/(\s*$)/g,"");
}

//剔除字符串中的空格
function delSpace(str){
    return str.replace(/[ ]/g,"");
}

// 设置cookie的信息
function setCookie(cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    seconds = seconds ? seconds : 630720000;
    expires.setTime(expires.getTime() + seconds * 1000);
    document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue) + (expires ? ';expires=' + expires.toGMTString() : '')
        + (path ? ';path=' + path : ';path=/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

// 根据cookie名称获取值
function getCookie(cookieName) {
    var cookieArray = document.cookie.split(';');
    var temp;

    for (var i = 0; i < cookieArray.length; i ++) {
        temp = cookieArray[i].split('=');
        if (cookieName === trim(decodeURIComponent(temp[0]))) {
            return decodeURIComponent(temp[1]);
        }
    }

    return "";
}

// load xml file on server
function loadXmlDoc(xmlPath) {
    var xmlDoc = null;
    try //Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.load(xmlPath);
    }
    catch(e)
    {
        try //Firefox, Mozilla, Opera, etc.
        {
            xmlDoc=document.implementation.createDocument("","",null);
            xmlDoc.async=false;
            xmlDoc.load(xmlPath);
        }
        catch(e)
        {
            try //Google Chrome
            {
                var xmlhttp = new window.XMLHttpRequest();
                xmlhttp.open("GET",xmlPath,false);
                xmlhttp.send(null);
                xmlDoc = xmlhttp.responseXML.documentElement;
            }
            catch(e)
            {
                error=e.message;
            }
        }
    }

    return xmlDoc;
}

// 异步加载xml文件
function asyncLoadXmlDoc(xmlPath, callback) {
    var xmlHttp=null;
    function readyStateChangeHandle()
    {
        if(xmlHttp.readyState === 4)
        {
            if(xmlHttp.status === 200)
            {
                var xmlDOM=xmlHttp.responseXML;
                callback(xmlDOM.documentElement);
            } else {
                callback(null);
            }
        }
    }

    if(window.XMLHttpRequest)
    {
        xmlHttp=new XMLHttpRequest();
    }
    else if(window.ActiveXObject)
    {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.onreadystatechange = readyStateChangeHandle;
    xmlHttp.open("GET",xmlPath,true);
    xmlHttp.send(null);
}

// get attribute of a xml node
function getXmlNodeAttributeValue (xmlNode,attrName){
    if(!xmlNode)
        return "" ;
    if(!xmlNode.attributes)
        return "" ;
    if(xmlNode.attributes[attrName] != null)
        return xmlNode.attributes[attrName].value ;
    if(xmlNode.attributes.getNamedItem(attrName) != null)
        return xmlNode.attributes.getNamedItem(attrName).value ;
    return "" ;
}

/*
    convert on-dimensional array to json data
 */
function oneDimArrayToJson(fieldsArray, oneDimArray) {
    var jsonStr = '({';

    if (!oneDimArray || fieldsArray.length != oneDimArray.length) {
        return null;
    }

    for (var i in oneDimArray) {
        jsonStr += '"' + fieldsArray[i] + '":"' + oneDimArray[i] + '"';
        if (parseInt(i) !== oneDimArray.length - 1) {
            jsonStr += ',';
        }
    }

    jsonStr += '})';

    return eval(jsonStr);
}

/*
    convert two-dimensional array to json data
*/
function twoDimArrayToJson(fieldsArray, twoDimArray) {
    var jsonStr = '[';

    if (!twoDimArray.length || fieldsArray.length != twoDimArray[0].length) {
        return null;
    }

    for (var i in twoDimArray) {
        jsonStr += '{';
        for (var j in twoDimArray[i]) {
            jsonStr += '"' + fieldsArray[j] + '":"' + twoDimArray[i][j] + '"';
            if (parseInt(j) === twoDimArray[i].length - 1) {
                jsonStr += '}';
            } else {
                jsonStr += ',';
            }
        }
        if (parseInt(i) === twoDimArray.length - 1) {
            jsonStr += ']';
        } else {
            jsonStr += ',';
        }
    }

    return eval(jsonStr);
}

// get tcp port from ports.xml
function getTcpPort(xmlPath, serverName) {
    var portsXml = loadXmlDoc(xmlPath);
    var portNodes;

    if (null === portsXml) {
        return null;
    }

    portNodes = portsXml.getElementsByTagName("port");
    if (0 ===  portNodes.length) {
        return null;
    }
    for (var i = 0; i < portNodes.length; i ++) {
        if (serverName === getXmlNodeAttributeValue(portNodes[i], "server")) {
            return portNodes[i].childNodes[0].nodeValue;
        }
    }
    return null;
}

/*
 show MessageBox
 param: title--title text
        label--label text
        content--content text
        buttonText--json data,includes button text and button handler function.
  */
function showMessageBox(title, label, content, buttonText, width, height) {
    var wholeWidth = 350;
    var wholeHeight = 140;
    if (undefined !== width) {
        wholeWidth = width;
    }
    if (undefined !== height) {
        wholeHeight = height;
    }

    var window = Ext.create('Ext.window.Window',{
        title: title,
        width: wholeWidth,
        height: wholeHeight,
        modal:true,
        autoScroll:true,
        layout:'auto',
        items:[
            {
                xtype:'textfield',
                padding: 20,
                maxLength:200,
                fieldLabel:label,
                value:content,
                width:'80%',
                readOnly: true
            },
            {
                xtype: 'buttongroup',
                header: false,
                buttonAlign: 'center',
                width: '100%',
                columns: 1,
                buttons: [
                    {
                        xtype: 'button',
                        text: buttonText,
                        handler:  function(button, e) {
                            button.up().up().up().close();
                        }
                    }
                ]
            }
        ]
    });
    window.show();
}

// 判断是否支持websocket、dataview和arraybuffer
function isBrowserSupported() {// 浏览器支持判断
    if (window.WebSocket &&
        window.DataView &&
        window.ArrayBuffer) {
        return true;
    }
    alert('Please upgrade your browser!');
    return false;
}

// 长度不足则前补0
function addZero(str,length){
    return new Array(length - str.length + 1).join("0") + str;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

Date.prototype.UTCFormat = function(fmt)
{
    var o = {
        "M+" : this.getUTCMonth()+1,                 //月份
        "d+" : this.getUTCDate(),                    //日
        "h+" : this.getUTCHours(),                   //小时
        "m+" : this.getUTCMinutes(),                 //分
        "s+" : this.getUTCSeconds(),                 //秒
        "q+" : Math.floor((this.getUTCMonth()+3)/3), //季度
        "S"  : this.getUTCMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getUTCFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

// 上传文件
// uiTextJson中需包含filePath、browse、open、cancel、openFile元素,loadMaskTxt(遮罩中的名称)
function uploadFile(addCallback, doneCallback, isCleanExistFiles, isMultiple, fileDirInUpload, validExtsArray,
                    filePathLangText, browseLangText, openLangText, cancelLangText, openFileLangText, closeFileLangText,
                    maxFileSize, startUploadCallback, loadMaskTxt) {
    var fileFormPanel,
        fileUploadWindow,
        fileNameTextField,
        filePanel,
        operBtnGroup,
        successFileNameArray = [],
        strInputHtml = '',
        loadLock,
        extString = '',
        i,
        uploader,
        successFileArray = [],
        failedFileArray = [],
        $table = $("<table>"),
        $tr = $("<tr>"),
        $td = $("<td>"),
        $input = $("<input>"),
        $button = $("<button>");
    if(!loadMaskTxt){
        loadLock = new LoadLock(true, loadMaskTxt);
    }else{
        loadLock = new LoadLock(true, "0%");
    }
    fileUploadWindow = new PopupWindow(null, null, "fileUploadWnd");
    fileUploadWindow.setCaptionText(openFileLangText);
    if (closeFileLangText) {
        fileUploadWindow.enableCloseButton(closeFileLangText);
    }
    fileUploadWindow.setButtons(2, openLangText, function () {
        if (uploader.files.length) {
            if (uploader.files.length > 1) {
                if(loadMaskTxt){
                    loadLock.setMaskText("0%");
                }
            }
            loadLock.lock();
            uploader.start();
            fileUploadWindow.close();

            if (startUploadCallback && startUploadCallback instanceof Function) {
                startUploadCallback(loadLock, uploader.files);
            }
        }
    }, cancelLangText);

    $td.text(filePathLangText + ":");
    $td.width("100px");
    $tr.append($td);
    $td = $("<td>");
    $input.attr("type", "text");
    $input.attr("id", "fileNameInput");
    $input.attr("readonly", "readonly");
    $td.append($input);
    $button.addClass("funcBtn");
    $button.text(browseLangText);
    $button.attr("id", "browseBtn");
    $td.append($button);
    $td.width("280px");
    $tr.append($td);
    $table.append($tr);
    $table.css("margin-top", "15px");
    fileUploadWindow.setContent($table);

    fileUploadWindow.show();

    for (i = 0; i < validExtsArray.length; i += 1) {
        extString += validExtsArray[i];
        if (i !== validExtsArray.length - 1) {
            extString += ',';
        }
    }

    uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'browseBtn', // you can pass in id...
        //container: document.getElementById('container'), // ... or DOM Element itself
        url : '../../source/common/upload_file.php',
        flash_swf_url : '/plupload/js/Moxie.swf',
        silverlight_xap_url : '/plupload/js/Moxie.xap',

        filters : {
            max_file_size : (("undefined" === typeof maxFileSize) ? '10mb' : maxFileSize),
            mime_types: [
                {title : "files", extensions : extString}
            ],
            prevent_duplicates: true
        },

        multi_selection: isMultiple,
        multipart_params: {
            "fileDirInUpload": fileDirInUpload,
            "firstFile": isCleanExistFiles
        },

        drop_element: $("#fileUploadWnd")[0],

        init: {
            Error: function(up, err) {
                loadLock.unlock();
                alert("Error #" + err.code + ": " + err.message);
            },

            FilesAdded: function(up, files) {
                var i,
                    fileNamesString = '',
                    removeFileArray;

                if (!isMultiple) {
                    for (i = uploader.files.length - 2; i >= 0; i -= 1) {
                        uploader.removeFile(uploader.files[i]);
                    }
                }

                if (addCallback && addCallback instanceof Function) {
                    removeFileArray = addCallback(files);
                    if (removeFileArray && removeFileArray.length) {
                        for (i = 0; i < removeFileArray.length; i += 1) {
                            uploader.removeFile(removeFileArray[i]);
                        }
                    }
                }

                for (i = 0; i < uploader.files.length; i += 1) {
                    fileNamesString += uploader.files[i].name;
                    if (i !== uploader.files.length - 1) {
                        fileNamesString += ';';
                    }
                }
                $("#fileNameInput").val(fileNamesString);
                //fileNameTextField.setValue(fileNamesString);
            },

            FileUploaded: function(up, file, response) {
                try {
                    var resJson = JSON.parse(response.response);
                    if (resJson.success) {
                        successFileArray.push(file);
                    } else {
                        file.error = resJson.error;
                        failedFileArray.push(file);
                    }
                } catch (e) {
                    failedFileArray.push(file);
                }

                if(loadMaskTxt){
                    loadLock.setMaskText(uploader.total.percent + "%");
                }

                uploader.setOption("multipart_params", {
                    "fileDirInUpload": fileDirInUpload,
                    "firstFile": false
                });
            },

            UploadComplete: function(up, files) {
                loadLock.unlock();

                if (doneCallback && doneCallback instanceof Function) {
                    doneCallback(successFileArray, failedFileArray);
                }
            }
        }
    });

    uploader.init();
}

// 在调用某个函数前先判断是否已经登录，若已登录则执行传入的函数，参数为字符串类型
function callWithLoginVerified(funcStr) {
    function jumpToLoginPage(xmlDoc) {
        if (null === xmlDoc) {
            return;
        }
        var sysNode = xmlDoc.getElementsByTagName("system")[0];
        window.location.href = sysNode.getElementsByTagName("default_page")[0];
    }

    Ext.Ajax.request({
        url: '../../source/common/verify_logged.php',
        method: 'POST',
        timeout: 600000,
        params: {"user": encodeURIComponent(getCookie("user")), "loginRand": getCookie("loginRand")},
        success: function(response) {
            var res = Ext.decode(response.responseText);

            if (false === res.logged) {
                asyncLoadXmlDoc("xml/system.xml", jumpToLoginPage);
                return;
            }

            eval(funcStr);
        },
        failure: function(response) {
            asyncLoadXmlDoc("xml/system.xml", jumpToLoginPage);
        }
    });
}

// 动态创建iframe
function createIframe(parent, frameId, src, width, height, margin, position, top, left, zIndex, display, pageBreakAfter) {
    var ifrm = null;  //正在创建的iframe对象

    ifrm = document.createElement("iframe");
    ifrm.setAttribute("id",frameId);
    ifrm.setAttribute("src", src);
    ifrm.style.width = width;
    ifrm.style.height = height;
    ifrm.setAttribute("scrolling", "no");
    ifrm.setAttribute("frameborder", "0", 0);
    ifrm.setAttribute("name", frameId);
    ifrm.style.position = position;
    ifrm.style.top = top;
    ifrm.style.left = left;
    ifrm.style.zIndex = zIndex;
    ifrm.style.display = display;
    ifrm.style.margin = margin;
    ifrm.style.pageBreakAfter = pageBreakAfter;
    parent.appendChild(ifrm);
    //ifrm = fGetHtmlObj(id);
    return ifrm;
}

// 动态引入CSS文件
function addCssByLink(cssUrl) {
    var link = document.createElement("link"),
        heads = document.getElementsByTagName("head");

    link.setAttribute("ref", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", cssUrl);

    if (heads.length) {
        heads[0].addChild(link);
    } else {
        document.documentElement.appendChild(link);
    }
}

// 根据iframe内body的高度重新设置其高度
function resetIframeHeight(parent) {
    if (!parent) {
        return;
    }
    var iframes = parent.document.getElementsByTagName('iframe'),
        iframe = null,
        length = 0,
        i = 0;

    length = iframes.length;
    if (length == 0) {
        return;
    }
    try {
        for (i = 0; i < length; ++i) {
            iframe = iframes[i];
            if (iframe.contentWindow === self) {
                iframe.style.height = (document.body.offsetHeight + 20) + "px";
                return;
            }
        }
    } catch (e) {
    }
}

// 冒泡排序
function bubbleSort(arr){
    //外层循环，共要进行arr.length次求最大值操作
    for(var i=0;i<arr.length;i++){
        //内层循环，找到第i大的元素，并将其和第i个元素交换
        for(var j=i;j<arr.length;j++){
            if(arr[i]>arr[j]){
                //交换两个元素的位置
                var temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
}
function twoDimBubbleSort(twoDimArray, sortColIndex) {
    var temp;
    //外层循环，共要进行arr.length次求最大值操作
    for(var i=0;i<twoDimArray.length;i++){
        //内层循环，找到第i大的元素，并将其和第i个元素交换
        for(var j=i;j<twoDimArray.length;j++){
            if(twoDimArray[i][sortColIndex]>twoDimArray[j][sortColIndex]){
                //交换两个元素的位置
                temp=twoDimArray[i];
                twoDimArray[i]=twoDimArray[j];
                twoDimArray[j]=temp;
            }
        }
    }
}

// 忙闲状态类
function BusyStatus() {
    "use strict";

    var instance = {},    // 类实例
        me = this;

    this.isBusy = false;
    this.loadMask = null;

    instance.isBusy = function () {
        return me.isBusy;
    };

    instance.busy = function (isLoadMask, loadMaskText) {
        me.isBusy = true;

        if (isLoadMask) {
            me.loadMask = new Ext.LoadMask(Ext.getBody(), {
                msg: loadMaskText
            });
            me.loadMask.show();
        }
    };

    instance.idle = function () {
        me.isBusy = false;

        if (me.loadMask) {
            me.loadMask.hide();
            me.loadMask = null;
        }
    };

    instance.setLoadMaskText = function (text) {
        if (me.loadMask) {
            me.loadMask.hide();
            me.loadMask = new Ext.LoadMask(Ext.getBody(), {
                msg: text
            });
            me.loadMask.show();
        }
    };

    instance.isLoadMaskShow = function () {
        if (me.loadMask) {
            return !me.loadMask.isHidden();
        }
        return false;
    };

    return instance;
}

//序列号 16位转10位
function sn16To10(snstr){
    if(snstr){
        var snArr = snstr.split('');
        if(snArr.length == 16 && snArr[0] == 0 && snArr[1] == 0 && snArr[8] == 0
            && snArr[9] == 0 && snArr[10] == 0 && snArr[11] == 0){
            var sn = '';
            for(var i=2; i< snArr.length; i++){
                if(i === 8 || i === 9 || i === 10 || i === 11){
                }else{
                    sn += snArr[i];
                }
            }
            return sn;
        }else{
            return snstr;
        }
    }
    return snstr;
}

//序列号 10位转16位
function sn10To16(snstr){
    if(snstr){
        if(snstr.length == 10)
        {
            return '00'+snstr.slice(0,6)+'0000'+snstr.slice(6);
        }else{
            return snstr;
        }
    }
    return snstr;
}

// 加载锁定类
function LoadLock(maskShow, maskText, oParentObj) {
    "use strict";

    var instance = {},    // 类实例
        me = this;

    this.bLocked = false;
    this.bgLayer = null;
    this.loadMask = null;
    this.loadImg = null;
    this.loadText = null;
    this.maskTextString = maskText ? maskText : "Loading...";

    // 获取父元素
    this.getParent = function () {
        var oParent;

        if (!(oParentObj instanceof Object)) {
            oParent = $(document.body);
        } else if (!(oParentObj instanceof jQuery)) {
            oParent = $(oParentObj);
        } else {
            oParent = oParentObj;
        }

        if (oParent.length > 0) {
            oParent[0].onresize = function () {
                if (me.bgLayer) {
                    me.bgLayer.width(oParent[0].clientWidth);
                    me.bgLayer.height(oParent[0].scrollHeight);
                }
            };
        }

        return oParent;
    };

    this.createWindow = function () {
        var $imgDiv = null;

        if (null === me.bgLayer) {
            me.bgLayer = $("<div>");
            me.bgLayer.addClass("popup-bg-layer");
            me.bgLayer.css({
                "display": "block",
                "z-index": 30000
            });
        }

        if (null === me.loadImg) {
            $imgDiv = $("<div>");
            $imgDiv.css("text-align", "center");
            $imgDiv.css("margin", "15px");

            me.loadImg = $("<img>");
            me.loadImg.attr("src", "/image/pc/common/loading.gif");
            $imgDiv.append(me.loadImg);
        }

        if (null === me.loadText) {
            me.loadText = $("<div>");
            me.loadText.css("text-align", "center");
        }

        if (null === me.loadMask) {
            me.loadMask = $("<div>");
            me.loadMask.addClass("popup-layer");
            me.loadMask.css({
                "width": "300px",
                "height": "80px",
                "margin-left": "-150px",
                "margin-top": "-40px",
                "border": "2px solid #A0C3FF",
                "z-index": 30001
            });
            me.moveWndToCenter();
            me.loadMask.append($imgDiv);
            me.loadMask.append(me.loadText);
            me.loadMask.css("display", "block");
        }
    };

    // 初始化
    this.init = function () {
        if (maskShow) {
            me.createWindow();
        }
        if (me.loadText) {
            me.loadText.text(me.maskTextString);
        }
    };

    // 将窗口显示到可见区域中间
    this.moveWndToCenter = function () {
        if (document.body) {
            me.loadMask.css("margin-left", "0");
            me.loadMask.css("margin-top", "0");
            me.loadMask.css("top", (document.body.scrollTop + document.documentElement.clientHeight / 2 - 80 / 2) + "px");
            me.loadMask.css("left", (document.body.scrollLeft + document.documentElement.clientWidth / 2 - 300 / 2) + "px");
        }
    };

    me.init();

    // 锁定
    instance.lock = function () {
        var oParent = me.getParent();

        me.bLocked = true;

        if (me.bgLayer &&
            me.bgLayer.parentNode !== oParent) {
            oParent.append(me.bgLayer);
            me.bgLayer.width(oParent[0].clientWidth);
            me.bgLayer.height(oParent[0].scrollHeight);
        }

        if (me.loadMask &&
            me.loadMask.parentNode !== oParent) {
            oParent.append(me.loadMask);
            me.moveWndToCenter();
        }
    };

    // 解锁
    instance.unlock = function () {
        me.bLocked = false;

        if (me.bgLayer) {
            me.bgLayer.remove();
        }

        if (me.loadMask) {
            me.loadMask.remove();
        }
    };

    // 判断是否已加锁
    instance.isLocked = function () {
        return me.bLocked;
    };

    // 显示遮罩
    instance.showMask = function () {
        var oParent = me.getParent();

        me.createWindow();

        me.bgLayer.width(oParent[0].clientWidth);
        me.bgLayer.height(oParent[0].scrollHeight);

        oParent.append(me.bgLayer);
        oParent.append(me.loadMask);
        me.moveWndToCenter();
    };

    // 隐藏遮罩
    instance.hideMask = function () {
        if (me.bgLayer) {
            me.bgLayer.remove();
        }

        if (me.loadMask) {
            me.loadMask.remove();
        }
    };

    // 获取遮罩文字
    instance.getMaskText = function () {
        if (me.loadText) {
            return me.loadText.text();
        }
        return "";
    };

    // 设置遮罩文字
    instance.setMaskText = function (text) {
        if (me.loadText) {
            me.loadText.text(text);
        }
    };

    // 判断遮罩是否显示
    instance.isMaskShow = function () {
        return me.loadMask ? me.loadMask.is(":visible") : false;
    };

    // 获取遮罩style
    instance.getStyle = function (styleName) {
        if (me.loadMask) {
            return me.loadMask.css(styleName);
        }

        return null;
    };

    // 设置遮罩style
    instance.setStyle = function (styleName, styleValue) {
        if (me.loadMask) {
            me.loadMask.css(styleName, styleValue);
        }
    };

    // 获取背景style
    instance.getBgStyle = function (styleName) {
        if (me.bgLayer) {
            return me.bgLayer.css(styleName);
        }

        return null;
    };

    // 设置背景style
    instance.setBgStyle = function (styleName, styleValue) {
        if (me.bgLayer) {
            me.bgLayer.css(styleName, styleValue);
        }
    };

    return instance;
}

// 导出并下载文件
// orientation：报表方向，0位纵向 1为横向 只支持pdf格式
function exportAndDownloadFile(funcName, reportIdArray, fileNameWithoutExt, fileType, pageWidth, loadMask, phpFileName,
                               domain, failPrompt, busyStatus, fileShowWindow, pageAmongReports, successCallback,
                               failCallback, dataArray, orientation, font) {
    if (!pageAmongReports) {
        pageAmongReports = false;
    } else {
        pageAmongReports = true;
    }

    if ("undefined" === typeof orientation) {
        orientation = 0;
    }

    Ext.Ajax.request({
        timeout: 600000,
        url: '../source/module/' + phpFileName,
        method: 'POST',
        params: {"user": encodeURIComponent(getCookie("user")), "function": funcName, "reportIdArray": Ext.encode(reportIdArray),
            "fileNameWithoutExt": fileNameWithoutExt, "fileType": fileType, "pageWidth": pageWidth,
            "domain": encodeURIComponent(getDomainWithPort()), "pageAmongReports": pageAmongReports,
            "dataArray": Ext.encode(dataArray), "orientation": orientation, "font": font},
        success: function(response) {
            if (loadMask) {
                loadMask.hide();
            }

            if (busyStatus) {
                busyStatus.idle();
            }

            if (successCallback) {
                successCallback();
            }

            var res = eval('(' + response.responseText + ')');

            if (fileShowWindow &&
                fileShowWindow.hideMask) {
                fileShowWindow.hideMask();
            }

            if (false === res.success) {
                alert(failPrompt);
                return;
            }

            if (fileShowWindow) {
                fileShowWindow.location.href = domain + "/upload/" + res.fileDirInUpload + "/" + res.fileName;
            } else {
                if(fileNameWithoutExt == "otdr_pdf"){
                    window.open(domain + "/upload/" + res.fileDirInUpload + "/" + res.fileName,"_blank");
                }else{
                    window.location.href = domain + "/source/common/download_file.php?file_dir=" + encodeURIComponent(res.fileDirInUpload)
                    + "&file_name=" + encodeURIComponent(res.fileName);
                }
            }
        },
        failure: function(response) {
            if (fileShowWindow &&
                fileShowWindow.hideMask) {
                fileShowWindow.hideMask();
            }

            if (loadMask) {
                loadMask.hide();
            }

            if (busyStatus) {
                busyStatus.idle();
            }

            if (failCallback) {
                failCallback();
            }

            alert(failPrompt);
        }
    });
}

// 获取字符串中的单位
function getUnitFromStr(value) {
    var i;

    if ("string" !== typeof(value)) {
        return "";
    }

    for (i = 0; i < value.length; i += 1) {
        if ((value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90) ||
            (value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122)) {
            return value.substr(i);
        }
    }

    return "";
}

// 去掉字符串中的html标签
function delHtmlTag(str)
{
    var tempStr;
    tempStr = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    tempStr = tempStr.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    tempStr = tempStr.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    tempStr = tempStr.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return tempStr;
}

// 延时遮罩公用类
function DelayLoadMask (msg, dom) {
    "use strict";

    // 类私有成员
    var instance = {},                          // 遮罩实例
        me = this;                              // this指针
    instance.isKindOf = function (type) {// 类标识
        return me instanceof type;
    };

    // 类保护成员
    this.timer = null;                          // 定时器
    this.callCount = 0;                         // 调用次数
    this.visible = false;                       // 显示状态
    this.loadLock =
        new LoadLock(true, msg, $(dom));        // 遮罩对象
    me.runShow = function () {// 显示遮罩
        'use strict';

        return function () {
            me.visible = true;
            me.loadLock.lock();
        };
    };

    // 类接口函数
    instance.isTimming = function () {
        'use strict';

        return me.timer !== null;
    };
    instance.delayShow = function (msec) {// 延时显示遮罩
        'use strict';

        me.callCount += 1;
        if (me.callCount === 1) {
            if (msec === undefined) {
                msec = 200;
            }
            me.timer = setTimeout(me.runShow(), msec);
        }
    };
    instance.delayHide = function () {// 隐藏遮罩/取消延时显示
        'use strict';

        me.callCount -= 1;
        if (me.callCount === 0) {
            if (me.timer) {
                clearTimeout(me.timer);
                me.timer = null;
            }
            if (me.visible) {
                me.visible = false;
                me.loadLock.unlock();
            }
        }
    };

    return instance;
}

// 绑定一个函数用于回掉
function bindFunc (fn, scope, args) {
    return function() {
        return fn.apply(scope, args.concat(Array.prototype.slice.call(arguments, 0)));
    };
}

// 创建DOM元素
function createDomElement(tagName, attributes, innerHTML) {
    var el = document.createElement(tagName), key;
    for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            el.setAttribute(key, attributes[key]);
        }
    }
    if (typeof(innerHTML) === "string") {
        el.innerHTML = innerHTML;
    }
    return el;
}

// Ajax访问全局对象
var Ajax = new (function () {
    "use strict";

    // 类私有成员
    var instance = {},                          // Ajax实例
        me = this;                              // this指针
    instance.isKindOf = function (type) {// 类标识
        return me instanceof type;
    };

    // 类保护成员
    this.method = "POST";                       // 默认传输方法POST
    this.timeout = 30000;                       // 默认延时时间30s
    this.newRequest = function (method, url, async) {// 创建一个连接申请
        var xhr = null;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open(method, url, async);
        return xhr;
    };
    this.onStateChange = function (request) {// 状态变化回掉
        if (request.xhr.readyState === 4) {
            clearTimeout(request.timeout);
            if (request.xhr.status === 200) {
                if (request.options.success) {
                    request.options.success(request.xhr, request.options);
                }
            } else {
                if (request.options.failure) {
                    request.options.failure(request.xhr, request.options);
                }
            }
            delete request.xhr;
        }
    };
    this.abort = function (request) {// 超时处理
        clearTimeout(request.timeout);
        request.xhr.onreadystatechange = null;
        request.xhr.abort();
        if (request.options.failure) {
            request.options.failure(request.xhr, request.options);
        }
        delete request.xhr;
    };

    /*
    request(options)
        Sends an HTTP request to a remote server.
    options是一个JSON结构，支持的key包含
    1、url : String
        The URL to which to send the request. Defaults to the configured url.
    2、params : Object
        An object containing properties which are used as parameters to the request.
    3、method : String
        The HTTP method to use for the request. Defaults to the configured method, or if no method was configured. Note that the method name is case-sensitive and should be all caps.
    4、success : Function
        The function to be called upon success of the request. The callback is passed the following parameters:
        Parameters
        response : Object
            The XMLHttpRequest object containing the response data.
        options : Object
            The parameter to the request call.
    5、failure : Function
        The function to be called upon failure of the request. The callback is passed the following parameters:
        Parameters
        response : Object
            The XMLHttpRequest object containing the response data.
        options : Object
            The parameter to the request call.
    6、timeout : Number
        The timeout in milliseconds to be used for this request. Defaults to 30 seconds.
    */
    instance.request = function (options) {
        var url = options.url,
            method = options.method || me.method,
            timeout = options.timeout || me.timeout,
            request, xhr, sendstr = "", param;

        for (param in options.params) {
            if (options.params.hasOwnProperty(param)) {
                if (sendstr.length) {
                    sendstr += "&";
                }
                sendstr += encodeURIComponent(param) + "=";
                if (options.params[param] != null) {
                    sendstr += encodeURIComponent(options.params[param]);
                }
            }
        }
        xhr = me.newRequest(method, url, true);
        if (method === "POST") {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        request = {
            xhr: xhr,
            options: options,
            timeout: setTimeout(function() {
                me.abort(request);
            }, timeout)
        };
        xhr.onreadystatechange = bindFunc(me.onStateChange, me, [request]);
        xhr.send(sendstr);
    };

    return instance;
});

// TPP数据属性编辑类
function TppPropertyGrid (width, height) {
    "use strict";

    // 类私有成员
    var instance = {},                          // 列表实例
        me = this;                              // this指针
    instance.isKindOf = function (type) {// 类标识
        return me instanceof type;
    };

    // 类保护成员
    this.readOnly = false;                      // 只读属性
    this.grid = new PropertyGrid(width, height);// 属性列表

    this.dbTable = null;                        // 数据库表名
    this.autoID = null;                         // 自动增量ID
    this.itemID = null;                         // 数据项目ID
    this.parentID = null;                       // 父级ID
    this.updateFunc = null;                     // 更新回调函数
    this.inheritData = {};                      // 继承值
    this.rawPropData = null;                    // 原始属性值
    this.delayMask = null;                      // 延时显示遮罩
    this.tipFieldEmpty = "Please input the '[FIELD]' field.";

    this.initRawData = function () {// 初始化原始数据
        var i, propData;
        this.rawPropData = {};
        for (i = 0; i < me.grid.getCount(); i += 1) {
            propData = me.grid.getData(i);
            this.rawPropData[propData.key] = JSON.parse(JSON.stringify(propData));
        }
    };
    this.editorChange = function (propData, rowIndex, newValue) {// 编辑器值改变
        var i, j;
        this.inheritData[propData.funcCls] = newValue;
        if (propData.type === '1') {// 枚举类型
            this.delRelation(propData.id);
            for (j = 0; j < propData.detail.options.length; j += 1) {
                if (propData.detail.options[j].value === newValue) {
                    if (propData.detail.options[j].relate) {
                        this.insRelation(
                            propData.id,
                            propData.detail.options[j].relate
                        );
                    }
                    break;
                }
            }
        }
    };
    this.editorBlur = function (propData, rowIndex, newValue) {
        var i, cf, span, max, min;
        if (propData.id === '4003') {// cf
            cf = propData;
            for (i = 0; i < this.grid.getCount(); i += 1) {
                span = this.grid.getData(i);
                if (span && span.id === '4004') {
                    break;
                }
            }
            if (span.value) {
                max = parseFloat(cf.detail.maximum);
                min = parseFloat(cf.detail.minimum);
                if (parseFloat(cf.value) + parseFloat(span.value) / 2 > max) {
                    span.value = (max - parseFloat(cf.value)) * 2;
                    this.grid.setData(i, span);
                }
                if (parseFloat(cf.value) - parseFloat(span.value) / 2 < min) {
                    span.value = (parseFloat(cf.value) - min) * 2;
                    this.grid.setData(i, span);
                }
            }
        } else if (propData.id === '4004') {// span
            span = propData;
            for (i = 0; i < this.grid.getCount(); i += 1) {
                cf = this.grid.getData(i);
                if (cf && cf.id === '4003') {
                    break;
                }
            }
            if (cf.value) {
                max = parseFloat(cf.detail.maximum);
                min = parseFloat(cf.detail.minimum);
                if (parseFloat(cf.value) + parseFloat(span.value) / 2 > max) {
                    cf.value = max - parseFloat(span.value) / 2;
                    this.grid.setData(i, cf);
                }
                if (parseFloat(cf.value) - parseFloat(span.value) / 2 < min) {
                    cf.value = min + parseFloat(span.value) / 2;
                    this.grid.setData(i, cf);
                }
            }
        }
    };

    this.insRelation = function (depend, relate) {// 插入相关项
        this.delayMask.delayShow();
        Ajax.request({
            url: '/source/module/tpp_items_load.php',
            params: {
                "me": this,
                "itemID": relate,
                "dependID": depend,
                "parentID": this.parentID,
                "values": JSON.stringify(this.inheritData)
            },
            success: function (response, options) {
                var res = JSON.parse(response.responseText),
                    me = options.params.me,
                    i;
                me.delayMask.delayHide();
                if (res.res.success) {
                    me.addPropItems(res.data);
                } else {
                    alert(res.res.reason);
                }
            },
            failure: function (response, options) {
                options.params.me.delayMask.delayHide();
            }
        });
    };
    this.delRelation = function (depend) {// 删除相关项
        var i, propData;
        for (i = 0; i < this.grid.getCount(); i += 1) {
            propData = this.grid.getData(i);
            if (propData.dependID === depend) {
                if (propData.type === '1') {// 枚举类型
                    this.delRelation(propData.id);
                }
                this.grid.deleteData(i);
                i -= 1;
            }
        }
    };
    this.addPropItems = function (propItems) {// 增加属性项
        var i, j, propData;
        for (i in propItems) {
            if (propItems.hasOwnProperty(i) && i !== "value50" && i !== "value51") {
                this.inheritData[propItems[i].funcCls] = propItems[i].value;
                if (propItems[i].id === '2306') {// 合格线限定值特殊处理
                    var reg = new RegExp("^[1-9]([\\.]\\d+)?[eE][-\\+]?\\d+");
                    if (reg.test(propItems[i].value)) {// BER限制项设置正则表达式
                        propItems[i].detail.exponential = true;
                    }
                }

                // 规范化数据
                if (propItems[i].value == null) {
                    propItems[i].value = "";
                }
                propItems[i].invisible = propItems[i].invisible === '1';
                propItems[i].readOnly = propItems[i].readOnly === '1' || this.readOnly;
                propItems[i].disabled = propItems[i].disabled === '1';
                if (propItems[i].suffix == null) {
                    propItems[i].suffix = '';
                }
                if (propItems[i].hasOwnProperty("detail")) {
                    propItems[i].detail.suffix = propItems[i].suffix;
                }
                propItems[i].allowBlank = false;
                if(propItems[i]['funcCls'] == "usr_pl_areaid"){
                    propItems[i].allowBlank = true;
                }

                // 事件处理
                propItems[i].onchange = bindFunc(this.editorChange, this, []);
                propItems[i].onblur = bindFunc(this.editorBlur, this, []);

                // 扩展数据
                propItems[i].key = i;

                // 增加列表项
                for (j = 0; j < this.grid.getCount(); j += 1) {
                    propData = this.grid.getData(j);
                    if (propItems[i]['valIndex'] <= propData.valIndex) {
                        if (propItems[i]['valIndex'] === propData.valIndex) {
                            // 删除记录
                            this.grid.deleteData(j);
                        }
                        break;
                    }
                }
                this.grid.insertData(j, propItems[i]);
            }
        }
    };
    this.setPropData = function (propData) {// 设置属性数据
        instance.resetProperty();
        if (propData) {
            this.addPropItems(propData);
            this.initRawData();
        }
    };

    // 类公共成员
    instance.setColTitle = function (nameText, valueText) {// 设置列标题
        me.grid.setColTitle(nameText, valueText);
    };
    instance.setDelayMask = function (delayMask) {// 设置延时遮罩对象
        if (delayMask.isKindOf && delayMask.isKindOf(DelayLoadMask)) {
            me.delayMask = delayMask;
        }
    };
    instance.setErrorText = function (errtxt) {// 设置错误文本提示信息
        me.grid.setErrorText(errtxt);
    };
    instance.setEmptyText = function (emptyText) {
        me.tipFieldEmpty = emptyText;
    };
    instance.setReadOnly = function (readOnly) {
        var i, propData;
        me.readOnly = readOnly;
        for (i = 0; i < me.grid.getCount(); i += 1) {
            if (propData = me.grid.getData(i)) {
                propData.readOnly = readOnly;
                me.grid.setData(i, propData);
            }
        }
    };
    instance.getDom = function () {// 获取DOM对象
        return me.grid.getDom();
    };
    instance.initProperty = function (dbTable, autoID, parentID, itemID, updateFunc) {// 初始化属性表格
        me.dbTable = dbTable;
        me.autoID = autoID;
        me.parentID = parentID;
        me.itemID = itemID;
        me.updateFunc = updateFunc;
        if (me.autoID !== null) {
            me.delayMask.delayShow();
            Ajax.request({
                url: '/source/module/tpp_detls_load.php',
                params: {
                    "me": me,
                    "id": me.autoID,
                    "dataTable": me.dbTable
                },
                success: function (response, options) {
                    var me = options.params.me,
                        res = JSON.parse(response.responseText);
                    me.delayMask.delayHide();
                    if (res.res.success) {
                        me.setPropData(res.data);
                    } else {
                        alert(res.res.reason);
                    }
                },
                failure: function (response, options) {
                    options.params.me.delayMask.delayHide();
                }
            });
        } else {
            me.delayMask.delayShow();
            Ajax.request({
                url: '/source/module/tpp_items_load.php',
                params: {
                    "me": me,
                    "dependID": '',
                    "itemID": me.itemID,
                    "parentID": me.parentID
                },
                success: function (response, options) {
                    var me = options.params.me,
                        res = JSON.parse(response.responseText);
                    me.delayMask.delayHide();
                    if (res.res.success) {
                        me.setPropData(res.data);
                    } else {
                        alert(res.res.reason);
                    }
                },
                failure: function (response, options) {
                    options.params.me.delayMask.delayHide();
                }
            });
        }
    };
    instance.resetProperty = function () {// 清空属性表格
        me.inheritData = {};
        while (me.grid.getCount() > 0) {
            me.grid.deleteData(me.grid.getCount() - 1);
        }
    };
    instance.isModified = function () {// 判断是否修改
        if (me.autoID === null) {// 添加
            return true;
        }

        var i, propData;
        for (i = 0; i < me.grid.getCount(); i += 1) {
            propData = me.grid.getData(i);
            if (!me.rawPropData.hasOwnProperty(propData.key) ||
                propData.value !== me.rawPropData[i].value
            ) {
                return true;
            }
        }
        return false;
    };
    instance.savePropData = function () {// 保存属性数据
        var dbValues = {}, inputTips, value, i, valCount = 0, propData, key;
        for (i = 0; i < me.grid.getCount(); i += 1) {
            propData = me.grid.getData(i);
            key = propData.key;
            value = propData.value;
            // 检测是否为空
            if (propData.funcCls != "usr_pl_areaid" && propData.invisible !== true &&
                (value == null || value.toString().length === 0)
            ) {
                inputTips = me.tipFieldEmpty;
                alert(inputTips.replace('[FIELD]', propData.name));
                return false;
            }
            // 检测是否修改
            if (me.autoID === null || !me.rawPropData.hasOwnProperty(key) ||
                value !== me.rawPropData[key].value
            ) {
                dbValues[key] = value;
                valCount += 1;
            }
        }
        if (valCount === 0) {// 未修改
            if (me.updateFunc) {
                me.updateFunc({});
            }
            return true;
        }
        if (me.autoID !== null) {// 修改
            me.delayMask.delayShow();
            Ajax.request({
                url: '/source/module/tpp_data_save.php',
                params: {
                    "me": me,
                    "id": me.autoID,
                    "dataTable": me.dbTable,
                    "data": JSON.stringify(dbValues)
                },
                success: function (response, options) {
                    var me = options.params.me,
                        res = JSON.parse(response.responseText),
                        values,
                        i;
                    me.delayMask.delayHide();
                    if (res.res.success) {
                        me.initRawData();
                        if (me.updateFunc) {
                            values = {}/*JSON.parse(options.params.data)*/;
                            for (i in res.data) {
                                if (res.data.hasOwnProperty(i)) {
                                    values[i] = res.data[i];
                                }
                            }
                            me.updateFunc(values);
                        }
                    } else {
                        alert(res.res.reason);
                    }
                },
                failure: function (response, options) {
                    options.params.me.delayMask.delayHide();
                }
            });
        } else {// 增加
            me.delayMask.delayShow();
            Ajax.request({
                timeout: 600000,
                url: '/source/module/tpp_data_save.php',
                params: {
                    "me": me,
                    "item": me.itemID,
                    "parentid": me.parentID,
                    "dataTable": me.dbTable,
                    "data": JSON.stringify(dbValues)
                },
                success: function (response, options) {
                    var me = options.params.me,
                        res = JSON.parse(response.responseText),
                        values,
                        i;
                    me.delayMask.delayHide();
                    if (res.res.success) {
                        me.initRawData();
                        if (me.updateFunc) {
                            values = JSON.parse(options.params.data);
                            for (i in res.data) {
                                if (res.data.hasOwnProperty(i)) {
                                    values[i] = res.data[i];
                                }
                            }
                            me.updateFunc(values);
                        }
                    } else {
                        alert(res.res.reason);
                    }
                },
                failure: function (response, options) {
                    options.params.me.delayMask.delayHide();
                }
            });
        }
        return true;
    };

    return instance;
}

// type:类型，0--单行文本 1--列表的标题头 2--列表内容
function setDbDataArrayEl(dbDataArray, blockIndex, formatIndex, type, value) {
    if (blockIndex < 0 || formatIndex < 0) {
        return;
    }

    if (!dbDataArray[blockIndex]) {
        dbDataArray[blockIndex] = [];
    }
    dbDataArray[blockIndex][formatIndex] = [];
    dbDataArray[blockIndex][formatIndex][0] = type;
    dbDataArray[blockIndex][formatIndex][1] = value;
}

// 获取带端口的域名
function getDomainWithPort() {
    if (document.location.port) {
        return "http://" + document.domain + ":" + document.location.port;
    } else {
        return "http://" + document.domain;
    }
}

// 获取指定日期的字符串输出
function dateToStr(d) {
    var ret = d.getFullYear() + "-";
    ret += ("00" + (d.getMonth() + 1)).slice(-2) + "-";
    ret += ("00" + d.getDate()).slice(-2) + " ";
    ret += ("00" + d.getHours()).slice(-2) + ":";
    ret += ("00" + d.getMinutes()).slice(-2) + ":";
    ret += ("00" + d.getSeconds()).slice(-2);
    return ret;
}

// 获取指定日期字符串的日期对象输出 YYYY-mm-dd HH:MM:SS
function strToDate(str) {
    var date = new Date();
    if (str.length === 19) {
        date.setFullYear(
            parseInt(str.substr(0, 4), 10),
            parseInt(str.substr(5, 2), 10) - 1,
            parseInt(str.substr(8, 2), 10)
        );
        date.setHours(parseInt(str.substr(11, 2), 10));
        date.setMinutes(parseInt(str.substr(14, 2), 10));
        date.setSeconds(parseInt(str.substr(17, 2), 10));
        date.setMilliseconds(0);
    }
    return date;
}

// 更改电平/功率单位，由dBuV转换为目标单位,rf---为阻抗(默认75Ω)
function changeToUnit(value, unit, rf) {
    'use strict';
    value = parseFloat(value);
    if (unit === 'dBmV') {
        if(rf == '50'){
            value = value - 61.8;
        }else{
            value = value - 60;
        }
    } else if (unit === 'dBm') {
        if(rf == '50'){
            value = value - 107.0;
        }else{
            value = value - 108.8;
        }
    } else {
        if(rf == '50'){
            value = value - 1.8;
        }
    }
    return value;
}
// 更改电平/功率单位，由目标单位转换为dBuV，rf---为阻抗(默认75Ω)
function changeFromUnit(value, unit, rf) {
    'use strict';
    value = parseFloat(value);
    if (unit === 'dBmV') {
        if(rf == '50'){
            value = value + 61.8;
        }else{
            value = value + 60;
        }
    } else if (unit === 'dBm') {
        if(rf == '50'){ //50Ω
            value = value + 107.0;
        }else{ //75Ω
            value = value + 108.8;
        }
    } else {
        if(rf == '50'){
            value = value + 1.8;
        }
    }
    return value;
}
//单位为dBuV、dBmV时，阻抗75Ω和50Ω相互切换值的修改
function changeRF(value, srcrf, torf){
    if(srcrf != torf){
        if(torf == '50'){ //50Ω
            value = value + 1.8;
        }else{ //75Ω
            value = value - 1.8;
        }
    }else{
        if(torf == '50'){ //50Ω
            value = value + 1.8;
        }
    }
    return value;
}
// 保留小数位数,返回字符串
function roundNumber(number,decimals) {
    var newString = '',    // The new rounded number
        numString,
        pointIndex = -1,
        oriDecimals = 0,   // 原小数位数
        i = 0,
        deltData = 0,
        singleChar = '',
        singleData = 0,
        symbol = "",       // 符号
        ePos = -1,         // 科学计数法中e的位置
        suffix = "";       // 科学计数法后缀

    number = Number(number);
    decimals = Number(decimals);

    if (number < 0) {
        symbol = "-";
    }

    if (decimals < 1) {
        newString = (Math.round(number)).toString();
    } else {
        number = Math.abs(number);
        numString = number.toString();

        ePos = numString.indexOf("e");
        if (-1 === ePos) {
            ePos = numString.indexOf("E");
        }
        if (-1 !== ePos) {
            suffix = numString.substr(ePos);
        }

        pointIndex = numString.indexOf(".");

        if (-1 === pointIndex) {
            numString += ".";
            pointIndex = numString.length - 1;
        }

        oriDecimals = numString.length - pointIndex - 1;

        // 补充字符串长度
        if (oriDecimals < decimals) {
            numString += new Array(decimals - oriDecimals + 1).join("0");
        }

        if (Number(numString.charAt(pointIndex + decimals + 1)) >= 5) {
            deltData = 1;
        }
        for (i = pointIndex + decimals; i >= 0; i -= 1) {
            if ("." === numString.charAt(i)) {
                newString = "." + newString;
                continue;
            }

            singleData = Number(numString.charAt(i));
            if (9 === singleData &&
                1 === deltData) {
                singleChar = "0";
                deltData = 1;
            } else {
                singleChar = (singleData + deltData).toString();
                deltData = 0;
            }

            newString = singleChar + newString;
        }

        if (1 === deltData) {
            newString = "1" + newString;
        }

        newString = symbol + newString;
    }

    return newString + suffix;
}

// 根据function获取页面前缀
function getPagePrefixFromFunction(functionName) {
    var functionPrefixJson = {
        "ae500": "ae500",
        "ae600": "ae600",
        "ae700": "ae700",
        "ae2300": "ae4000",
        "otdr": "ae4000"
        },
        functionNameLowercase = functionName.toLowerCase();

    if (functionPrefixJson.hasOwnProperty(functionNameLowercase)) {
        return functionPrefixJson[functionNameLowercase];
    }

    return functionName;
}

// 判断是否是有效IP
function isValidIP(ip) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        sectionArray = null,
        i = 0;

    if ("string" !== typeof ip) {
        return false;
    }

    sectionArray = ip.split(".");

    if (4 !== sectionArray.length) {
        return false;
    }

    for (i = 0; i < sectionArray.length; i += 1) {
        if (sectionArray[i].length > 1 &&
            "0" === sectionArray[i].charAt(0)) {
            return false;
        }
    }

    return reg.test(ip);
}

// 弹窗类
function PopupWindow(width, height, id) {
    var me = this,
        instance = {};

    var buttonsStyle = 0,       // 0为没有按钮 1为只有确定按钮 2为有确定贵和取消按钮
        $popupBg = $("<div>"),
        $popupWnd = $("<div>"),
        $captionDiv = $("<div>"),
        $captionTextDiv = $("<div>"),
        $closeDiv = $("<div>"),
        $closeA = $("<a>"),
        $contentDiv = $("<div>"),
        $buttonsDiv = $("<div>");
    var okButton, cancelButton;

    if (!id) {
        id = "popupWindow" + Math.round(Math.random() * 1000000);
    }

    this.windowId = id;

    function onWindowResize() {
        instance.show();
        //$popupBg.width(document.documentElement.clientWidth);
        //$popupBg.height(document.documentElement.scrollHeight);
    }

    this.init = function () {
        // 关闭按钮
        $closeDiv.css("float", "right");
        $closeA.attr("href", "javascript:;");
        $closeDiv.append($closeA);

        // 标题
        $captionDiv.addClass("popup-caption");
        $captionTextDiv.css("float", "left");
        $captionDiv.append($captionTextDiv);
        $captionDiv.append($closeDiv);

        // 内容
        $contentDiv.css("width", "100%");
        $contentDiv.css("padding", "10px");
        $contentDiv.css("text-align", "center");
        $contentDiv.addClass("borderBox");

        // 按钮栏
        $buttonsDiv.addClass("popup-footer");
        $buttonsDiv.css("text-align", "center");
        $buttonsDiv.css("margin-top", "5px");

        // 遮罩半透明层
        $popupBg.addClass("popup-bg-layer");
        $popupBg.css("display", "block");
        $popupBg.width(document.documentElement.clientWidth);
        $popupBg.height(document.documentElement.scrollHeight);

        // 弹窗
        $popupWnd.addClass("popup-layer");
        $popupWnd.css("width", width);
        $popupWnd.css("height", height);
        $popupWnd.append($captionDiv);
        $popupWnd.append($contentDiv);
        $popupWnd.append($buttonsDiv);
        $popupWnd.css("display", "block");

        if (!me.windowId) {
            me.windowId = "popupWindow" + Math.round(Math.random() * 1000000);
        }
        $popupWnd.attr("id", me.windowId);

        if (window.addEventListener) {
            window.addEventListener("resize", onWindowResize, false);
        } else if (window.attachEvent) {
            window.attachEvent("onresize", onWindowResize);
        }
    };

    me.init();

    // 获取窗口id
    instance.getId = function () {
        return me.windowId;
    };

    // 获取窗口dom对象
    instance.getWndDom = function() {
        return $popupWnd.length ? $popupWnd[0] : null;
    };

    // 获取标题文字
    instance.getCaptionText = function () {
        return $captionTextDiv.text();
    };

    // 设置标题文字
    instance.setCaptionText = function (text) {
        $captionTextDiv.text(text);
    };

    // 启用窗口右上角关闭按钮
    instance.enableCloseButton = function (text, closeCallback) {
        $closeA.text("[ " + text + " ]");
        $closeA.click(function () {
            instance.close();
            if ("function" === typeof closeCallback) {
                closeCallback();
            }
        });
        $closeDiv.show();
    };

    // 禁用窗口右上角关闭按钮
    instance.disableCloseButton = function () {
        $closeDiv.hide();
    };

    //禁用确定按钮
    instance.setOkBtnStatus = function(flag){
        if(typeof okButton == "undefined"){
            return;
        }
        if(flag){
            if(typeof themeName != "undefined" && themeName == 'AETeP'){
                okButton.removeClass("funcBtn");
                okButton.addClass("disfuncBtn2");
                okButton.attr({"disabled":"disabled"});
            }else{
                okButton.removeClass("funcBtn");
                okButton.addClass("disfuncBtn");
                okButton.attr({"disabled":"disabled"});
            }
        }else{
            if(typeof themeName != "undefined" && themeName == 'AETeP'){
                okButton.removeClass("disfuncBtn2");
                okButton.addClass("funcBtn");
                //okButton.attr({"disabled":"disabled"});
                okButton.removeAttr('disabled');
            }else{
                okButton.removeClass("disfuncBtn");
                okButton.addClass("funcBtn");
                okButton.removeAttr('disabled');
            }
        }
    }

    //禁用取消按钮,true--禁用
    instance.setCancelBtnStatus = function(flag){
        if(typeof cancelButton == "undefined"){
            return;
        }
        if(flag){
            cancelButton.removeClass("funcBtn");
            cancelButton.addClass("disfuncBtn");
            cancelButton.attr({"disabled":"disabled"});
        }else{
            cancelButton.removeClass("disfuncBtn");
            cancelButton.addClass("funcBtn");
            cancelButton.removeAttr('disabled');
        }
    }

    // 显示按钮
    // 参数style:0为没有按钮 1为只有确定按钮 2为有确定和取消按钮
    instance.setButtons = function (style, okText, okCallback, cancelText, cancelCallback, noclose) {
        var $okBtn = null,
            $cancelBtn = null;

        if (0 !== style &&
            1 !== style &&
            2 !== style) {
            return;
        }

        me.buttonsStyle = style;

        $buttonsDiv.empty();

        if (1 === style ||
            2 === style) {
            $okBtn = $("<button>");
            $okBtn.addClass("funcBtn");
            $okBtn.text(okText);
            okButton = $okBtn;
            if ("function" === typeof okCallback) {
                $okBtn.click(okCallback);
            }
            $buttonsDiv.append($okBtn);
        }
        if (2 === style) {
            $cancelBtn = $("<button>");
            $cancelBtn.addClass("funcBtn");
            $cancelBtn.text(cancelText);
            cancelButton = $cancelBtn;
            $cancelBtn.click(function () {
                if(!noclose){ //根据该状态确定是否关闭窗口
                    instance.close();
                }
                if ("function" === typeof cancelCallback) {
                    cancelCallback();
                }
            });
            $buttonsDiv.append($cancelBtn);
        }
    };

    // 设置内容
    instance.setContent = function (content) {
        if (content.length > 0 &&
            (!content[0] instanceof HTMLElement &&
                !content[0] instanceof HTMLCollection)) {
            return;
        }
        $contentDiv.empty();
        $contentDiv.append(content);
    };

    // 获取弹窗style
    instance.getStyle = function (styleName) {
        return $popupWnd.css(styleName);
    };

    // 设置弹窗style
    instance.setStyle = function (styleName, styleValue) {
        $popupWnd.css(styleName, styleValue);
    };

    // 获取背景style
    instance.getBgStyle = function (styleName) {
        return $popupBg.css(styleName);
    };

    // 设置背景style
    instance.setBgStyle = function (styleName, styleValue) {
        $popupBg.css(styleName, styleValue);
    };

    // 获取内容区style
    instance.getContentStyle = function (styleName) {
        return $contentDiv.css(styleName);
    };

    // 设置内容区style
    instance.setContentStyle = function (styleName, styleValue) {
        $contentDiv.css(styleName, styleValue);
    };

    // 获取标题style
    instance.getCaptionStyle = function (styleName) {
        return $captionDiv.css(styleName);
    };

    // 设置标题style
    instance.setCaptionStyle = function (styleName, styleValue) {
        $captionDiv.css(styleName, styleValue);
    };

    // 显示弹窗
    instance.show = function () {
        var minWidth = 0,
            minHeight = 0;

        if (!$popupBg.is(":visible")) {
            $(document.body).append($popupBg);
        }
        $popupBg.width(Math.max(document.documentElement.clientWidth, document.documentElement.offsetWidth,
            document.documentElement.scrollWidth));
        $popupBg.height(document.documentElement.scrollHeight);

        if (!$popupWnd.is(":visible")) {
            $(document.body).append($popupWnd);
        }

        minWidth = document.documentElement.clientWidth < $popupWnd.width() ? document.documentElement.clientWidth : $popupWnd.width();
        minHeight = document.documentElement.clientHeight < $popupWnd.height() ? document.documentElement.clientHeight : $popupWnd.height();
        $popupWnd.css('margin-top', '0');
        $popupWnd.css('margin-left', '0');
        var topDist = $(document).scrollTop();
        var leftDist = $(document).scrollLeft();
        //var topDist = document.body.scrollTop;
        //var leftDist = document.body.scrollLeft;
        $popupWnd.css('top', (topDist + document.documentElement.clientHeight / 2 - minHeight / 2) + "px");
        $popupWnd.css('left', (leftDist + document.documentElement.clientWidth / 2 - minWidth / 2) + "px");

        // 允许拖拽
        new Drag($popupWnd.get(0), {
            handle: $captionDiv.get(0)
        });
    };

    // 关闭弹窗
    instance.close = function () {
        $popupBg.remove();
        $popupWnd.remove();

        if (window.removeEventListener) {
            window.removeEventListener("resize", onWindowResize, false);
        } else if (window.attachEvent) {
            window.detachEvent("onresize", onWindowResize);
        }
    };

    return instance;
}

function StringEx(){

    this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;

    this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;

    this.REGX_TRIM = /(^\s*)|(\s*$)/g;

    this.HTML_DECODE = {
        "&lt;" : "<",
        "&gt;" : ">",
        "&amp;" : "&",
        "&nbsp;": " ",
        "&quot;": "\"",
        "&copy;": ""

        // Add more
    };

    this.encodeHtml = function(s){
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_ENCODE,
                function($0){
                    var c = $0.charCodeAt(0), r = ["&#"];
                    c = (c == 0x20) ? 0xA0 : c;
                    r.push(c); r.push(";");
                    return r.join("");
                });
    };

    this.decodeHtml = function(s){
        var HTML_DECODE = this.HTML_DECODE;

        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_DECODE,
                function($0, $1){
                    var c = HTML_DECODE[$0];
                    if(c == undefined){
                        // Maybe is Entity Number
                        if(!isNaN($1)){
                            c = String.fromCharCode(($1 == 160) ? 32:$1);
                        }else{
                            c = $0;
                        }
                    }
                    return c;
                });
    };

    this.trim = function(s){
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_TRIM, "");
    };


    this.hashCode = function(){
        var hash = this.__hash__, _char;
        if(hash == undefined || hash == 0){
            hash = 0;
            for (var i = 0, len=this.length; i < len; i++) {
                _char = this.charCodeAt(i);
                hash = 31*hash + _char;
                hash = hash & hash; // Convert to 32bit integer
            }
            hash = hash & 0x7fffffff;
        }
        this.__hash__ = hash;

        return this.__hash__;
    };
}

StringEx.call(String.prototype);


// 下拉列表控件
// listJsonArray--列表json的数组，json包括text、callback，callback参数为li对象
function ComboBox(btnText, listJsonArray) {
    var instance = {},
        me = this,
        i = 0,
        $btnTextSpan = null,
        $btnTriangleSpan = null,
        $li = null;

    if ("string" !== typeof btnText ||
        !listJsonArray instanceof Array) {
        return instance;
    }

    this.$comboBox = $("<div><\/div>");
    this.$comboBox.addClass("btn-menu");

    this.$btn = $("<div><\/div>");
    this.$btn.addClass("toolbar-button");
    $btnTextSpan = $("<span><\/span>");
    $btnTextSpan.text(btnText)
        .addClass("toolbar-text")
        .appendTo(this.$btn);
    $btnTriangleSpan = $("<span><\/span>");
    $btnTriangleSpan.addClass("triangle")
        .appendTo(this.$btn);
    this.$comboBox.append(this.$btn);

    this.$list = $("<ul><\/ul>");
    for (i = 0; i < listJsonArray.length; i += 1) {
        listJsonArray[i] = $.extend({}, {
            "text": "",
            "callback": null
        }, listJsonArray[i]);
        $li = $("<li><\/li>");
        if (listJsonArray[i].hasOwnProperty("id")) {
            $li.attr("id", listJsonArray[i].id);
        }
        $li.text(listJsonArray[i].text);
        $li.click(function () {
            var index = $(this).prevAll().length;
            $btnTextSpan.text($(this).text());
            me.$list.hide();

            if (listJsonArray[index].callback) {
                listJsonArray[index].callback(this);
            }
        });
        this.$list.append($li);
    }
    this.$comboBox.append(this.$list);
    this.$comboBox.hover(function (e) {
        me.$list.show();
    }, function (e) {
        me.$list.hide();
    });

    // 获取jquery对象
    this.getJqueryObject = function(arg) {
        if ("string" === $.type(arg)) {
            return $("#" + arg);
        } else if (arg instanceof jQuery) {
            return arg;
        } else if (arg instanceof Object) {
            return $(arg);
        } else {
            return null;
        }
    };

    // 渲染到某元素
    instance.renderTo = function(arg) {
        var $target = me.getJqueryObject(arg);

        if ($target) {
            $target.empty();
            $target.append(me.$comboBox);
        }
    };

    // 加载到某元素
    instance.appendTo = function(arg) {
        var $target = me.getJqueryObject(arg);

        if ($target) {
            $target.append(me.$comboBox);
        }
    };

    return instance;
}


//根据语言引入相应的语言包
function importLanguageFile(language){
    if(language == 'English'){
        Ext.Loader.loadScript("/javascript/common/extjs/locale/ext-lang-en.js");
    }else if(language == 'Simplified Chinese'){
        Ext.Loader.loadScript("/javascript/common/extjs/locale/ext-lang-zh_CN.js");
    }
}


// 拖拽类
function Drag()
{
    //初始化
    this.initialize.apply(this, arguments)
}
Drag.prototype = {
    //初始化
    initialize : function (drag, options)
    {
        this.drag = this.$(drag);
        this._x = this._y = 0;
        this._moveDrag = this.bind(this, this.moveDrag);
        this._stopDrag = this.bind(this, this.stopDrag);

        this.setOptions(options);

        this.handle = this.$(this.options.handle);
        this.maxContainer = this.$(this.options.maxContainer);

        this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
        this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;

        this.limit = this.options.limit;
        this.lockX = this.options.lockX;
        this.lockY = this.options.lockY;
        this.lock = this.options.lock;

        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;

        this.handle.style.cursor = "move";

        this.changeLayout();

        this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
    },
    changeLayout : function ()
    {
        this.drag.style.top = this.drag.offsetTop + "px";
        this.drag.style.left = this.drag.offsetLeft + "px";
        this.drag.style.position = "absolute";
        this.drag.style.margin = "0"
    },
    startDrag : function (event)
    {
        var event = event || window.event;

        this._x = event.clientX - this.drag.offsetLeft;
        this._y = event.clientY - this.drag.offsetTop;

        this.addHandler(document, "mousemove", this._moveDrag);
        this.addHandler(document, "mouseup", this._stopDrag);

        event.preventDefault && event.preventDefault();
        this.handle.setCapture && this.handle.setCapture();

        this.onStart()
    },
    moveDrag : function (event)
    {
        var event = event || window.event;

        var iTop = event.clientY - this._y;
        var iLeft = event.clientX - this._x;

        if (this.lock) return;

        this.limit && (iTop < 0 && (iTop = 0), iLeft < 0 && (iLeft = 0), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));

        this.lockY || (this.drag.style.top = iTop + "px");
        this.lockX || (this.drag.style.left = iLeft + "px");

        event.preventDefault && event.preventDefault();

        this.onMove()
    },
    stopDrag : function ()
    {
        this.removeHandler(document, "mousemove", this._moveDrag);
        this.removeHandler(document, "mouseup", this._stopDrag);

        this.handle.releaseCapture && this.handle.releaseCapture();

        this.onStop()
    },
    //参数设置
    setOptions : function (options)
    {
        this.options =
        {
            handle:   this.drag, //事件对象
            limit:   true, //锁定范围
            lock:   false, //锁定位置
            lockX:   false, //锁定水平位置
            lockY:   false, //锁定垂直位置
            maxContainer: document.documentElement || document.body, //指定限制容器
            onStart:  function () {}, //开始时回调函数
            onMove:   function () {}, //拖拽时回调函数
            onStop:   function () {}  //停止时回调函数
        };
        for (var p in options) this.options[p] = options[p]
    },
    //获取id
    $ : function (id)
    {
        return typeof id === "string" ? document.getElementById(id) : id
    },
    //添加绑定事件
    addHandler : function (oElement, sEventType, fnHandler)
    {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
    },
    //删除绑定事件
    removeHandler : function (oElement, sEventType, fnHandler)
    {
        return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
    },
    //绑定事件到对象
    bind : function (object, fnHandler)
    {
        return function ()
        {
            return fnHandler.apply(object, arguments)
        }
    }
};

// 解析product_set.xml文件，获取产品菜单对应关系
// 返回结果中menu值为空数组的项表示包括此菜单下所有菜单项
function getProductMenuIds(productFunc) {
    var productSetXml = loadXmlDoc("/xml/ui/product_set.xml"),
        productNodes = null,
        curProductNode = null,
        menuNodes = null,
        subMenuNodes = null,
        resMenuJson = {
            wholeMenu: [],
            partMenu: {}
        },
        menuId = null,
        i = 0,
        j = 0;

    if (!productSetXml) {
        return null;
    }

    productNodes = productSetXml.getElementsByTagName("product");
    if (!productNodes) {
        return null;
    }

    for (i = 0; i < productNodes.length; i += 1) {
        if (productFunc === getXmlNodeAttributeValue(productNodes[i], "func")) {
            curProductNode = productNodes[i];
            break;
        }
    }

    if (!curProductNode) {
        return null;
    }

    menuNodes = curProductNode.getElementsByTagName("main_menu");
    for (i = 0; i < menuNodes.length; i += 1) {
        menuId = getXmlNodeAttributeValue(menuNodes[i], "id");
        subMenuNodes = menuNodes[i].getElementsByTagName("sub_menu");
        if (0 === subMenuNodes.length) {
            resMenuJson.wholeMenu.push(menuId);
        } else {
            resMenuJson.partMenu[menuId] = [];
            for (j = 0; j < subMenuNodes.length; j += 1) {
                resMenuJson.partMenu[menuId].push(subMenuNodes[j].childNodes[0].nodeValue);
            }
        }

    }

    return resMenuJson;
}

// 获取配置的产品对应的所有菜单项数据
function getSystemMenuData() {
    var systemXml = loadXmlDoc("/xml/system.xml"),
        homeXml = loadXmlDoc("/xml/ui/home.xml"),
        systemNode = null,
        productNode = null,
        mainMenuNodes = null,
        btnGroupNodes = null,
        btnNodes = null,
        productIdArray = null,
        productMenuJsonArray = [],
        wholeMenuArray = [],
        partMenuJson = {},
        i = 0,
        j = 0,
        k = 0,
        menuId = null;

    if (null === systemXml ||
        null === homeXml) {
        return null;
    }

    systemNode = systemXml.getElementsByTagName("system");
    if (0 === systemNode.length) {
        return null;
    }
    systemNode = systemNode[0];

    productNode = systemNode.getElementsByTagName("product");
    if (0 === productNode.length) {
        return null;
    }
    productNode = productNode[0];

    mainMenuNodes = homeXml.getElementsByTagName("tab");
    if (0 === mainMenuNodes.length) {
        return null;
    }

    productIdArray = productNode.childNodes[0].nodeValue.split(",");

    // 根据设置的产品func名获取所有有效菜单
    for (i = 0; i < productIdArray.length; i += 1) {
        productMenuJsonArray.push(getProductMenuIds(productIdArray[i]));
    }
    for (i = 0; i < productMenuJsonArray.length; i += 1) {
        $.unique($.merge(wholeMenuArray, productMenuJsonArray[i].wholeMenu));
        for (menuId in productMenuJsonArray[i].partMenu) {
            if (productMenuJsonArray[i].partMenu.hasOwnProperty(menuId) &&
                partMenuJson.hasOwnProperty(menuId)) {
                $.unique($.merge(partMenuJson[menuId], productMenuJsonArray[i].partMenu[menuId]));
            } else {
                partMenuJson[menuId] = productMenuJsonArray[i].partMenu[menuId];
            }
        }
    }

    // 如果只需加载部分菜单的数据中有与加载全部菜单的数据的id有重合的项则删除
    for (i = 0; i < wholeMenuArray.length; i += 1) {
        if (partMenuJson.hasOwnProperty(wholeMenuArray[i])) {
            delete partMenuJson[wholeMenuArray[i]];
        }
    }

    // 根据有效菜单数组或json获取dom对象数组
    for (i = mainMenuNodes.length - 1; i >= 0; i -= 1) {
        menuId = getXmlNodeAttributeValue(mainMenuNodes[i], "id");
        if (-1 === wholeMenuArray.indexOf(menuId) &&
            !partMenuJson.hasOwnProperty(menuId)) {
            mainMenuNodes[i].parentNode.removeChild(mainMenuNodes[i]);
        }
    }
    for (menuId in partMenuJson) {
        if (partMenuJson.hasOwnProperty(menuId)) {
            for (i = 0; i < mainMenuNodes.length; i += 1) {
                if (menuId === getXmlNodeAttributeValue(mainMenuNodes[i], "id")) {
                    btnGroupNodes = mainMenuNodes[i].getElementsByTagName("button_group");
                    for (j = btnGroupNodes.length - 1; j >= 0; j -= 1) {
                        btnNodes = btnGroupNodes[j].getElementsByTagName("button");
                        for (k = btnNodes.length - 1; k >= 0; k -= 1) {
                            if (-1 === partMenuJson[menuId].indexOf(getXmlNodeAttributeValue(btnNodes[k], "id"))) {
                                btnNodes[k].parentNode.removeChild(btnNodes[k]);
                            }
                        }
                        if (0 === btnGroupNodes[j].children.length) {
                            btnGroupNodes[j].parentNode.removeChild(btnGroupNodes[j]);
                        }
                    }

                    break;
                }
            }
        }
    }

    return mainMenuNodes;
}

// 判断是否带有数据库
function withDatabase() {
    var sysXml = loadXmlDoc("/xml/system.xml"),
        withDbNode = null;

    if (!sysXml) {
        return false;
    }

    withDbNode = sysXml.getElementsByTagName("with_database");
    if (0 === withDbNode.length) {
        return false;
    }
    withDbNode = withDbNode[0];

    return "0" !== withDbNode.childNodes[0].nodeValue;
}

// html字符实体编码
function htmlEncode ( input )
{
    var converter = document.createElement("DIV");
    converter.innerText = input;
    var output = converter.innerHTML;
    converter = null;
    return output;
}

// html字符实体解码
function htmlDecode ( input )
{
    var converter = document.createElement("DIV");
    converter.innerHTML = input;
    var output = converter.innerText;
    converter = null;
    return output;
}
// 创建用户频道表的表格
function createChTable(arrList,colTitles,renderToId,captionText,oHeight){
    // 创建频道表表格
    var chanelTable = new ScrollEditableTable("100%","100%", "100%", oHeight)
    chanelTable.enableTextEncode(false);
    chanelTable.setCaptionText(captionText);
    chanelTable.insertColumns(colTitles);
    chanelTable.addJsonData(arrList);
    chanelTable.renderToDomObjById(renderToId);
    return chanelTable;
}

// 电平单位工具
var LevelUnitUtil = {
    DBM_FLAG : 0,
    DBMV_FLAG : 1,
    DBUV_FLAG : 2,
    V_FLAG : 3,
    MV_FLAG : 4,
    UV_FLAG : 5,
    NV_FLAG : 6
};
// 单位转换函数
LevelUnitUtil.pvUnitCalculate = function(inValue, inUnit, outUnit, resistance) {
    "use strict";
    var ohm, outValue;
    if (resistance === 75) {
        ohm = 18.75061;
    } else if (resistance === 50) {
        ohm = 17;
    } else {
        return null;
    }

    if (inUnit === outUnit) {
        outValue = inValue;
    } else if (inUnit < 3 && outUnit < 3) {
        if (inUnit === LevelUnitUtil.DBUV_FLAG) {
            outValue = inValue - 90 - ohm;
        } else if (inUnit === LevelUnitUtil.DBMV_FLAG) {
            outValue = inValue - 30 - ohm;
        } else if (inUnit === LevelUnitUtil.DBM_FLAG) {
            outValue = inValue;
        }

        if (outUnit === LevelUnitUtil.DBUV_FLAG) {
            outValue = outValue + 90 + ohm;
        } else if (outUnit === LevelUnitUtil.DBMV_FLAG) {
            outValue = outValue + 30 + ohm;
        }
    } else {
        if (inUnit === LevelUnitUtil.DBUV_FLAG) {
            outValue = inValue - 90 - ohm;
        } else if (inUnit === LevelUnitUtil.DBMV_FLAG) {
            outValue = inValue - 30 - ohm;
        } else if (inUnit === LevelUnitUtil.DBM_FLAG) {
            outValue = inValue;
        } else if (inUnit === LevelUnitUtil.NV_FLAG) {
            outValue = 20 * Math.log(inValue / 1000000) / Math.log(10) - 30 - ohm;
        } else if (inUnit === LevelUnitUtil.UV_FLAG) {
            outValue = 20 * Math.log(inValue / 1000.0) / Math.log(10) - 30 - ohm;
        } else if (inUnit === LevelUnitUtil.MV_FLAG) {
            outValue = 20 * Math.log(inValue) / Math.log(10) - 30 - ohm;
        } else if (inUnit === LevelUnitUtil.V_FLAG) {
            outValue = 20 * Math.log(inValue * 1000) / Math.log(10) - 30 - ohm;
        }

        if (outUnit === LevelUnitUtil.DBUV_FLAG) {
            outValue = outValue + 90 + ohm;
        } else if (outUnit === LevelUnitUtil.DBMV_FLAG) {
            outValue = outValue + 30 + ohm;
        } else if (outUnit === LevelUnitUtil.V_FLAG) {
            outValue = Math.pow(10, (outValue + 30 + ohm) / 20) / 1000;
        } else if (outUnit === LevelUnitUtil.MV_FLAG) {
            outValue = Math.pow(10, (outValue + 30 + ohm) / 20);
        } else if (outUnit === LevelUnitUtil.UV_FLAG) {
            outValue = Math.pow(10, (outValue + 30 + ohm) / 20) * 1000;
        } else if (outUnit === LevelUnitUtil.NV_FLAG) {
            outValue = Math.pow(10, (outValue + 30 + ohm) / 20) * 1000000;
        }
    }
    return outValue;
};


// 格式化字符串后
/*
   参数：fmtString-格式化字符串  例如{0:e2}表示将后面第一个参数转换为自然指数格式后，取两位小数
        fmtString后可以跟任意多个需要代入的变量
 */
function printf(fmtString) {
    var chopper = window.chopper = window.chopper || { cultures: {} },
        math = Math,
        formatRegExp = /\{(\d+)(:[^\}]+)?\}/g,
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean",
        UNDEFINED = "undefined",
        slice = [].slice,
        globalize = window.Globalize,
        standardFormatRegExp =  /^(n|c|p|e)(\d*)$/i,
        literalRegExp = /(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g,
        commaRegExp = /\,/g,
        EMPTY = "",
        POINT = ".",
        COMMA = ",",
        SHARP = "#",
        ZERO = "0",
        PLACEHOLDER = "??",
        EN = "en-US",
        objectToString = {}.toString;
    //cultures
    chopper.cultures["en-US"] = {
        name: EN,
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %", "n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["($n)", "$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                AM: [ "AM", "am", "AM" ],
                PM: [ "PM", "pm", "PM" ],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0,
                twoDigitYearMax: 2029
            }
        }
    };
    function findCulture(culture) {
        if (culture) {
            if (culture.numberFormat) {
                return culture;
            }
            if (typeof culture === STRING) {
                var cultures = chopper.cultures;
                return cultures[culture] || cultures[culture.split("-")[0]] || null;
            }
            return null;
        }
        return null;
    }
    function getCulture(culture) {
        if (culture) {
            culture = findCulture(culture);
        }
        return culture || chopper.cultures.current;
    }
    function expandNumberFormat(numberFormat) {
        numberFormat.groupSizes = numberFormat.groupSize;
        numberFormat.percent.groupSizes = numberFormat.percent.groupSize;
        numberFormat.currency.groupSizes = numberFormat.currency.groupSize;
    }
    chopper.culture = function(cultureName) {
        var cultures = chopper.cultures, culture;
        if (cultureName !== undefined) {
            culture = findCulture(cultureName) || cultures[EN];
            culture.calendar = culture.calendars.standard;
            cultures.current = culture;
            if (globalize && !globalize.load) {
                expandNumberFormat(culture.numberFormat);
            }
        } else {
            return cultures.current;
        }
    };
    chopper.culture(EN);
    //number formatting
    function formatNumber(number, format, culture) {
        culture = getCulture(culture);
        var numberFormat = culture.numberFormat,
            groupSize = numberFormat.groupSize[0],
            groupSeparator = numberFormat[COMMA],
            decimal = numberFormat[POINT],
            precision = numberFormat.decimals,
            pattern = numberFormat.pattern[0],
            literals = [],
            symbol,
            isCurrency, isPercent,
            customPrecision,
            formatAndPrecision,
            negative = number < 0,
            integer,
            fraction,
            integerLength,
            fractionLength,
            replacement = EMPTY,
            value = EMPTY,
            idx,
            length,
            ch,
            hasGroup,
            hasNegativeFormat,
            decimalIndex,
            sharpIndex,
            zeroIndex,
            hasZero, hasSharp,
            percentIndex,
            currencyIndex,
            startZeroIndex,
            start = -1,
            end;
        //return empty string if no number
        if (number === undefined) {
            return EMPTY;
        }
        if (!isFinite(number)) {
            return number;
        }
        //if no format then return number.toString() or number.toLocaleString() if culture.name is not defined
        if (!format) {
            return culture.name.length ? number.toLocaleString() : number.toString();
        }
        formatAndPrecision = standardFormatRegExp.exec(format);
        // standard formatting
        if (formatAndPrecision) {
            format = formatAndPrecision[1].toLowerCase();
            isCurrency = format === "c";
            isPercent = format === "p";
            if (isCurrency || isPercent) {
                //get specific number format information if format is currency or percent
                numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
                groupSize = numberFormat.groupSize[0];
                groupSeparator = numberFormat[COMMA];
                decimal = numberFormat[POINT];
                precision = numberFormat.decimals;
                symbol = numberFormat.symbol;
                pattern = numberFormat.pattern[negative ? 0 : 1];
            }
            customPrecision = formatAndPrecision[2];
            if (customPrecision) {
                precision = +customPrecision;
            }
            //return number in exponential format
            if (format === "e") {
                return customPrecision ? number.toExponential(precision) : number.toExponential(); // toExponential() and toExponential(undefined) differ in FF #653438.
            }
            // multiply if format is percent
            if (isPercent) {
                number *= 100;
            }
            number = round(number, precision);
            negative = number < 0;
            number = number.split(POINT);
            integer = number[0];
            fraction = number[1];
            //exclude "-" if number is negative.
            if (negative) {
                integer = integer.substring(1);
            }
            value = integer;
            integerLength = integer.length;
            //add group separator to the number if it is longer enough
            if (integerLength >= groupSize) {
                value = EMPTY;
                for (idx = 0; idx < integerLength; idx++) {
                    if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                        value += groupSeparator;
                    }
                    value += integer.charAt(idx);
                }
            }
            if (fraction) {
                value += decimal + fraction;
            }
            if (format === "n" && !negative) {
                return value;
            }
            number = EMPTY;
            for (idx = 0, length = pattern.length; idx < length; idx++) {
                ch = pattern.charAt(idx);
                if (ch === "n") {
                    number += value;
                } else if (ch === "$" || ch === "%") {
                    number += symbol;
                } else {
                    number += ch;
                }
            }
            return number;
        }
        //custom formatting
        //
        //separate format by sections.
        //make number positive
        if (negative) {
            number = -number;
        }
        if (format.indexOf("'") > -1 || format.indexOf("\"") > -1 || format.indexOf("\\") > -1) {
            format = format.replace(literalRegExp, function (match) {
                var quoteChar = match.charAt(0).replace("\\", ""),
                    literal = match.slice(1).replace(quoteChar, "");
                literals.push(literal);
                return PLACEHOLDER;
            });
        }
        format = format.split(";");
        if (negative && format[1]) {
            //get negative format
            format = format[1];
            hasNegativeFormat = true;
        } else if (number === 0) {
            //format for zeros
            format = format[2] || format[0];
            if (format.indexOf(SHARP) == -1 && format.indexOf(ZERO) == -1) {
                //return format if it is string constant.
                return format;
            }
        } else {
            format = format[0];
        }
        percentIndex = format.indexOf("%");
        currencyIndex = format.indexOf("$");
        isPercent = percentIndex != -1;
        isCurrency = currencyIndex != -1;
        //multiply number if the format has percent
        if (isPercent) {
            number *= 100;
        }
        if (isCurrency && format[currencyIndex - 1] === "\\") {
            format = format.split("\\").join("");
            isCurrency = false;
        }
        if (isCurrency || isPercent) {
            //get specific number format information if format is currency or percent
            numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
            groupSize = numberFormat.groupSize[0];
            groupSeparator = numberFormat[COMMA];
            decimal = numberFormat[POINT];
            precision = numberFormat.decimals;
            symbol = numberFormat.symbol;
        }
        hasGroup = format.indexOf(COMMA) > -1;
        if (hasGroup) {
            format = format.replace(commaRegExp, EMPTY);
        }
        decimalIndex = format.indexOf(POINT);
        length = format.length;
        if (decimalIndex != -1) {
            fraction = number.toString().split("e");
            if (fraction[1]) {
                fraction = round(number, Math.abs(fraction[1]));
            } else {
                fraction = fraction[0];
            }
            fraction = fraction.split(POINT)[1] || EMPTY;
            zeroIndex = format.lastIndexOf(ZERO) - decimalIndex;
            sharpIndex = format.lastIndexOf(SHARP) - decimalIndex;
            hasZero = zeroIndex > -1;
            hasSharp = sharpIndex > -1;
            idx = fraction.length;
            if (!hasZero && !hasSharp) {
                format = format.substring(0, decimalIndex) + format.substring(decimalIndex + 1);
                length = format.length;
                decimalIndex = -1;
                idx = 0;
            } if (hasZero && zeroIndex > sharpIndex) {
                idx = zeroIndex;
            } else if (sharpIndex > zeroIndex) {
                if (hasSharp && idx > sharpIndex) {
                    idx = sharpIndex;
                } else if (hasZero && idx < zeroIndex) {
                    idx = zeroIndex;
                }
            }
            if (idx > -1) {
                number = round(number, idx);
            }
        } else {
            number = round(number);
        }
        sharpIndex = format.indexOf(SHARP);
        startZeroIndex = zeroIndex = format.indexOf(ZERO);
        //define the index of the first digit placeholder
        if (sharpIndex == -1 && zeroIndex != -1) {
            start = zeroIndex;
        } else if (sharpIndex != -1 && zeroIndex == -1) {
            start = sharpIndex;
        } else {
            start = sharpIndex > zeroIndex ? zeroIndex : sharpIndex;
        }
        sharpIndex = format.lastIndexOf(SHARP);
        zeroIndex = format.lastIndexOf(ZERO);
        //define the index of the last digit placeholder
        if (sharpIndex == -1 && zeroIndex != -1) {
            end = zeroIndex;
        } else if (sharpIndex != -1 && zeroIndex == -1) {
            end = sharpIndex;
        } else {
            end = sharpIndex > zeroIndex ? sharpIndex : zeroIndex;
        }
        if (start == length) {
            end = start;
        }
        if (start != -1) {
            value = number.toString().split(POINT);
            integer = value[0];
            fraction = value[1] || EMPTY;
            integerLength = integer.length;
            fractionLength = fraction.length;
            if (negative && (number * -1) >= 0) {
                negative = false;
            }
            //add group separator to the number if it is longer enough
            if (hasGroup) {
                if (integerLength === groupSize && integerLength < decimalIndex - startZeroIndex) {
                    integer = groupSeparator + integer;
                } else if (integerLength > groupSize) {
                    value = EMPTY;
                    for (idx = 0; idx < integerLength; idx++) {
                        if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                            value += groupSeparator;
                        }
                        value += integer.charAt(idx);
                    }
                    integer = value;
                }
            }
            number = format.substring(0, start);
            if (negative && !hasNegativeFormat) {
                number += "-";
            }
            for (idx = start; idx < length; idx++) {
                ch = format.charAt(idx);
                if (decimalIndex == -1) {
                    if (end - idx < integerLength) {
                        number += integer;
                        break;
                    }
                } else {
                    if (zeroIndex != -1 && zeroIndex < idx) {
                        replacement = EMPTY;
                    }
                    if ((decimalIndex - idx) <= integerLength && decimalIndex - idx > -1) {
                        number += integer;
                        idx = decimalIndex;
                    }
                    if (decimalIndex === idx) {
                        number += (fraction ? decimal : EMPTY) + fraction;
                        idx += end - decimalIndex + 1;
                        continue;
                    }
                }
                if (ch === ZERO) {
                    number += ch;
                    replacement = ch;
                } else if (ch === SHARP) {
                    number += replacement;
                }
            }
            if (end >= start) {
                number += format.substring(end + 1);
            }
            //replace symbol placeholders
            if (isCurrency || isPercent) {
                value = EMPTY;
                for (idx = 0, length = number.length; idx < length; idx++) {
                    ch = number.charAt(idx);
                    value += (ch === "$" || ch === "%") ? symbol : ch;
                }
                number = value;
            }
            length = literals.length;
            if (length) {
                for (idx = 0; idx < length; idx++) {
                    number = number.replace(PLACEHOLDER, literals[idx]);
                }
            }
        }
        return number;
    }
    var round = function(value, precision) {
        precision = precision || 0;
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + precision) : precision)));
        value = value.toString().split('e');
        value = +(value[0] + 'e' + (value[1] ? (+value[1] - precision) : -precision));
        return value.toFixed(precision);
    };
    var toString = function(value, fmt, culture) {
        if (fmt) {
            if (typeof value === NUMBER) {
                return formatNumber(value, fmt, culture);
            }
        }
        return value !== undefined ? value : "";
    };
    if (globalize && !globalize.load) {
        toString = function(value, format, culture) {
            if ($.isPlainObject(culture)) {
                culture = culture.name;
            }
            return globalize.format(value, format, culture);
        };
    }
    chopper.format = function(fmt) {
        var values = arguments;
        return fmt.replace(formatRegExp, function(match, index, placeholderFormat) {
            var value = values[parseInt(index, 10) + 1];
            return toString(value, placeholderFormat ? placeholderFormat.substring(1) : "");
        });
    };
    return chopper.format.apply(this, arguments);
}

//id--将折叠控件添加到某个html元素上；data--折叠控件标题显示的数据源
function createFold(id, data){
    var instance = {}, me = this;
    me.clickFn = null;
    me.foldType = true; //默认折叠的方式，每次至多仅有一个折叠框处于展开
    createDom();
    //隐藏第n个折叠框
    instance.setHidden = function(index){
        $(instance.getParent(index)).css('display', 'none');
        $(instance.getParent(index)).next().css('display', 'none');
    }
    //设置第n个折叠框的标题
    instance.setText = function(index, value){
        $(instance.getParent(index)).text(value);
    }
    //获取第n个折叠框的标题
    instance.getText = function(index){
        return $(instance.getParent(index)).text();
    }
    instance.setClickFn = function(fn){
        me.clickFn = fn;
    }
    //设置第n个折叠框展开
    instance.setExpand = function(index){
        //首先折叠所有的
        var folds = $(instance.getAllParent());
        folds.each(function(index, element){
            $(element).removeClass('showblock');
            $(element).addClass('hideblock');//抽屉把手收缩的css
            $(element).next().removeClass('subshowblock');
            $(element).next().addClass('subhideblock');
            //$(element).css('opacity', '0.8');
            $(element).css('font-weight', 'normal');
        });
        //根据index索引展开某个折叠框
        var ele = $(instance.getParent(index));
        var nextEle = ele.next();
        ele.removeClass('hideblock');
        ele.addClass('showblock');
        nextEle.removeClass('subhideblock');
        nextEle.addClass('subshowblock');
        //ele.css('background-color', '#0097FD');//49,141,253   #CEE3FF
        //ele.css('opacity', '1');
        ele.css('font-weight', 'bold');
    }
    //获取当前展开折叠框的索引
    instance.getExpand = function(){
        //return me.expandIndex;
    }
    //向第n个折叠框中添加元素
    instance.addElement = function(index, ele){
        var child = instance.getChild(index)
        $(child).append(ele);
    }

    //获取所有折叠框
    instance.getAllParent = function(){
        var parents = $('.parentDiv');
        return parents;
    }
    //获取某个折叠框
    instance.getParent = function(index){
        if(index > instance.getAllChild().length - 1){
            return undefined;
        }
        var parent = $('.parentDiv')[index];
        return parent;
    }
    //获取所有折叠框中包含的子元素
    instance.getAllChild = function(){
        var childs = $('.childDiv');
        return childs;
    }
    //获取某个折叠框中的子元素
    instance.getChild = function(index){
        if(index > instance.getAllChild().length - 1){
            return undefined;
        }
        var child = $('.childDiv')[index];
        return child;
    }
    instance.setClickIndex = function(index){
        me.clickIndex = index;
    }
    instance.getClickIndex = function(){
        if(me.clickIndex !== undefined){
            return me.clickIndex;
        }
        return -1;
    }
    //设置每次至多仅有一个折叠框处于展开还是有多个折叠框处于展开
    instance.setFoldType = function(value){
        me.foldType = value;
    }
    //获取折叠框展开的模式--是否可以展开多个，如果可以展开多个--false；至多展开一个--true
    instance.getFoldType = function(){
        return me.foldType;
    }

    function createDom(){
        var root = $('<div></div>');
        root.attr('class', 'accord');
        var className, subClassName;
        for(var i = 0, len = data.length; i < len; i++){
            var div = $('<div></div>');
            div.text(data[i]);
            if(i === 0){
                className = 'showblock';
                subClassName = 'subshowblock';
            }else{
                className = 'hideblock';
                subClassName = 'subhideblock';
            }
            div.attr('class', className);
            div.addClass('parentDiv');
            div.appendTo(root);
            var childDiv = $('<div></div>');
            childDiv.attr('class', subClassName);
            childDiv.addClass('childDiv');
            childDiv.appendTo(root);
        }
        root.appendTo($('#' + id));
        return root;
    }
    /*addElement函数的用法*/
    //instance.addElement(0, $('<div>000<button>000</button></div>'));
    //instance.addElement(1, $('<span>value：</span><input style="width:100%;" type="text" value="25"/>'));
    instance.setExpand(0);
    //设置折叠框的展开收缩动作
    $(instance.getAllParent()).each(function(index, element){
        $(this).bind('click', function(e){
            //根据情况对点击的折叠框进行展开和收缩
            /*将当前的折叠框进行处理，先前是展开的现在收缩，先前是收缩的现在展开*/
            instance.setClickIndex(index);//设置当前点击的是哪个折叠框
            var ele = $(e.currentTarget);
            var cls = ele[0].className;
            var nextEle = ele.next();//当前元素的下一个元素，即折叠框的子元素
            if(cls.indexOf('showblock') !== -1){//如果当前元素处于折叠状态
                ele.removeClass('showblock');
                ele.addClass('hideblock');
                nextEle.removeClass('subshowblock');
                nextEle.addClass('subhideblock');
            }else{
                ele.removeClass('hideblock');
                ele.addClass('showblock');
                nextEle.removeClass('subhideblock');
                nextEle.addClass('subshowblock');
            }
            //$('.parentDiv').css('background-color', '#D9E7F8');//217,231,248
            //ele.css('background-color', '#0097FD');
            //ele.css('opacity', '1');
            ele.css('font-weight', 'bold');
            if(me.foldType){//至多仅可以展开一个折叠框
                //其他的折叠框需要隐藏
                var otherFolds = $(instance.getAllParent()).not($(this));
                otherFolds.each(function(index, element){
                    $(element).removeClass('showblock');
                    $(element).addClass('hideblock');//抽屉把手收缩的css
                    $(element).next().removeClass('subshowblock');
                    $(element).next().addClass('subhideblock');
                    //$(element).css('opacity', '0.8');
                    $(element).css('font-weight', 'normal');
                });
            }
            if(me.clickFn){
                me.clickFn(e);
            }
        });
    });
    return instance;
}

// 判断通信数据是否是有效数据
function isCommDataValid(commProcess, arrayData) {
    if (!arrayData ||
        !(arrayData instanceof Array)) {
        if (typeof commProcess.getErrCallback() === "function") {
            commProcess.getErrCallback()(ERR_UNKNOWN);
        }
        return false;
    }
    return true;
}

//截图功能
function screenFunc(id, loadMask){
    html2canvas($('#'+ id), {
        onrendered: function(canvas) {
            var html_canvas = canvas.toDataURL();
            if(loadMask){
                loadMask.showMask();
            }
            $.post('/source/module/btv_data_store.php', {order_id:1,type_id:2, screen_shot: html_canvas}, function(msg){
                var res = msg;
                if(!res['res']['success']){
                    alert(res['res']['reason']);
                    if(loadMask){
                        loadMask.hideMask();
                    }
                    return;
                }
                window.location.href = "/source/common/download_file.php?file_dir=" +
                    encodeURIComponent(res.data.path) + "&file_name=" + encodeURIComponent(res.data.name);
                if(loadMask){
                    loadMask.hideMask();
                }
            }, 'json');
        }
    });
}

// 设置起始页
function setStartPage(oLoadLock) {
    var relativePath = null;

    oLoadLock.lock();

    relativePath = window.location.href.indexOf(window.location.pathname);
    relativePath = window.location.href.substr(relativePath);

    $.post("/source/module/system_home_page.php", {
        homePageUrl: encodeURIComponent(relativePath)
    }, function (result) {
        var resRes = null;

        try {
            resRes = JSON.parse(result);
            oLoadLock.unlock();
            if (resRes.success) {
                if ($("#homePageLink").length) {
                    $("#homePageLink").attr("href", getDomainWithPort() + relativePath);
                }
            } else {
                alert(resRes.error.message);
            }
        } catch (e) {
            oLoadLock.unlock();
        }
    })
}
function secondToMins(s){
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h = Math.floor(s/60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    var s = s%60;
    //将变量转换为字符串
    h += '';
    s += '';
    //如果只有一位数，前面增加一个0
    h = (h.length == 1) ? '0' + h : h;
    s = (s.length == 1) ? '0' + s : s;
    return h + ':' + s;
}
//时间（s）转换成（hh:mm:ss）
function timeConvert(KeepTime) {
    var ret;
    var ss,mm,hh;
    var result;
    if(KeepTime){
        //秒
        ss = KeepTime % 60;
        //分
        ret = parseInt(KeepTime / 60);
        mm = ret % 60;
        //时
        hh = parseInt(ret / 60);
        //补0
        var szhh,szmm,szss;
        szhh = hh.toString(); szmm = mm.toString(); szss = ss.toString();
        if(szhh.length == 1){szhh = "0"+szhh;}
        if(szmm.length == 1){szmm = "0"+szmm;}
        if(szss.length == 1){szss = "0"+szss;}
        //返回
        result = szhh+":"+szmm+":"+szss;
    }
    return result;
}

//判断字符串中是否含有特殊字符
function isSpecChar(str, len){
    if(typeof(str) != 'string'){
        return false;
    }
    len = len || 255;
    if(str.length <= len && str.length > 0){
        for(var i=0;i<str.length;i++){
            if(str.charAt(i)==='\\'|| str.charAt(i) === '/'
                || str.charAt(i) === ':' || str.charAt(i) === '*'
                || str.charAt(i) === '?' || str.charAt(i) === '"'
                || str.charAt(i)=== '<'
                || str.charAt(i) === '>' || str.charAt(i) === '|'){
                return true;
            }
        }
    }
    return false;
}
//判断中英文混合长度
function getMixLength(str) {
    if(typeof str !== 'string'){
        str = '' + str;
    }
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 3;
        }
    }
    return len;
}
//百度->google gps
function bd09towgs84(bd_long,bd_lati){

    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    function bd09togcj02(bd_lon, bd_lat) {
        var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var x = bd_lon - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat]
    }
    function gcj02towgs84(lng, lat) {
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            var dlat = transformlat(lng - 105.0, lat - 35.0);
            var dlng = transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            mglat = lat + dlat;
            mglng = lng + dlng;
            return [lng * 2 - mglng, lat * 2 - mglat]
        }
    }

    function transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    }

    function transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    }

    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
    function out_of_china(lng, lat) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }
    var x = bd09togcj02(bd_long,bd_lati);
    var y = gcj02towgs84(x[0],x[1]);

    //return[y[0].toFixed(6),y[1].toFixed(6)];
    return[y[0],y[1]];
}
//google gps->百度
function wgs84tobd09(longi,lati){

    var GPS = {
        PI : 3.14159265358979324,
        x_pi : 3.14159265358979324 * 3000.0 / 180.0,
        delta : function (lat, lon) {
            // Krasovsky 1940
            //
            // a = 6378245.0, 1/f = 298.3
            // b = a * (1 - f)
            // ee = (a^2 - b^2) / a^2;
            var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
            var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
            var dLat = this.transformLat(lon - 105.0, lat - 35.0);
            var dLon = this.transformLon(lon - 105.0, lat - 35.0);
            var radLat = lat / 180.0 * this.PI;
            var magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            var sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
            return {'lat': dLat, 'lon': dLon};
        },

        //GPS---高德
        gcj_encrypt : function ( wgsLat , wgsLon ) {
            if (this.outOfChina(wgsLat, wgsLon))
                return {'lat': wgsLat, 'lon': wgsLon};

            var d = this.delta(wgsLat, wgsLon);
            return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};
        },
        outOfChina : function (lat, lon) {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        },
        transformLat : function (x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
            return ret;
        },
        transformLon : function (x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
            return ret;
        }
    };
    var gcj02tobd09 = function gcj02tobd09(lng, lat) {
        var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        var PI = 3.1415926535897932384626;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var lat = +lat;
        var lng = +lng;
        var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
        var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat]
    };
    var first = GPS.gcj_encrypt(lati,longi);
    var second = gcj02tobd09(first.lon,first.lat);
    return second;
}
//高德->GPS
function gdToGPS(gd_long, gd_lati){

    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    function transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    }

    function transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    }
    function transform(lat, lon) {
        if (out_of_china(lat, lon)) {
            return [lat, lon];
        }
        var dLat = transformlat(lon - 105.0, lat - 35.0);
        var dLon = transformlng(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return [mgLat, mgLon];
    }
    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
    function out_of_china(lat, lng) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }
    //GPS->高德
    function gps84_To_Gcj02(lon, lat) {
        if (out_of_china(lat, lon)) {
            return [lat, lon];
        }
        var dLat = transformlat(lon - 105.0, lat - 35.0);
        var dLon = transformlng(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * pi;
        var magic = Math.sin(radLat);
        var magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return [mgLat, mgLon];
    }
    //高德->GPS
    function gcj02_To_Gps84(lon, lat) {
        var gps = transform(lat, lon);
        var lontitude = lon * 2 - gps[1];
        var latitude = lat * 2 - gps[0];
        return [latitude, lontitude];
    }
    var y = gcj02_To_Gps84(gd_long, gd_lati);
    //return[y[0].toFixed(6),y[1].toFixed(6)];
    return[y[1], y[0]];
}
//GPS->高德
function gpsToGD(gd_long, gd_lati){

    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    function transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    }

    function transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    }
    function transform(lat, lon) {
        if (out_of_china(lat, lon)) {
            return [lat, lon];
        }
        var dLat = transformlat(lon - 105.0, lat - 35.0);
        var dLon = transformlng(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return [mgLat, mgLon];
    }
    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
    function out_of_china(lat, lng) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }
    //GPS->高德
    function gps84_To_Gcj02(lon, lat) {
        if (out_of_china(lat, lon)) {
            return [lat, lon];
        }
        var dLat = transformlat(lon - 105.0, lat - 35.0);
        var dLon = transformlng(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * PI;
        var magic = Math.sin(radLat);
        var magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return [mgLat, mgLon];
    }
    //高德->GPS
    function gcj02_To_Gps84(lon, lat) {
        var gps = transform(lat, lon);
        var lontitude = lon * 2 - gps[1];
        var latitude = lat * 2 - gps[0];
        return [latitude, lontitude];
    }
    var y = gps84_To_Gcj02(gd_long, gd_lati);
    //return[y[0].toFixed(6),y[1].toFixed(6)];
    return[y[1], y[0]];
}