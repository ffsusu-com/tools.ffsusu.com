function dig() {
    var infolist = [];
    //读取
    $(function () {
        $(".link").empty();
        $(".link").append('<div id="pagenum" class="pagenum"></div><ul id="aether"></ul>');
        $(".explain").empty();        
        $.ajax({
            url: './csv/G10.csv',
            success: function (data) {
                infolist[1] = "";
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,1)" target="_blank"><img src="tupian/aether/7.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,2)" target="_blank"><img src="tupian/aether/8.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,3)" target="_blank"><img src="tupian/aether/9.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,4)" target="_blank"><img src="tupian/aether/10.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,5)" target="_blank"><img src="tupian/aether/11.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,6)" target="_blank"><img src="tupian/aether/12.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");                
            }
        });
    });    
    //分页
    var Page = {
        //每页内容数目    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:50px;" class="off"  href="#">G10</a>';
            $("#pagenum").append(insert);
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return diva.innerHTML;
        },
        setClickPageNum: function () {
            var divx = document.getElementById('pagenum');
            var a = divx.children;
            var len = a.length;
            for (var i = 0; i < len; i++) {
                a[i].onclick = function () {
                    for (var i = 0; i < len; i++) { a[i].className = "off"; }
                    this.className = "on";
                    Page.allContent(this);
                };
            }
        },
        allContent: function (divb) {
            var target = '.link ul';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "G10") { pg = "1"; }
            $(".explain").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function digexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/G10.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img onclick="bigger(this)" style="float:left;width:190px;"src="tupian/dig/G10/' + csvList[i][0] + '.jpg" onerror=this.style="display:none;">';
            for (var n = 1; n < 11; n++) {
                insert += '<div style="float:left;width:100px;height:75px;text-align:center;"><img onclick="bigger(this)" style="width:75px;"src="tupian/dig/G10/' + csvList[i][0] + n + '.jpg" onerror=this.style="display:none;"></div>';
            }            
            insert += '<b style="float:left;font-size: 9px;">' + '上方为查找对应编号，具体位置请点击左边大图；左到右，左上为1-5，左下为6-10<br>欢迎玩家发送邮件至susu@ffxiv.vip，补充图片或坐标' + '</b>';            
            $(target).append(insert);
        }

    });
}