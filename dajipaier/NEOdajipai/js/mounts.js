﻿function mounts() {
    var infolist = [];
    //读取
    $(function () {

        $('#left').remove();
        $('#right').remove();
        $('#main').append(
        '<div id="page" style="opacity: 0;"></div>'
    );
        if (document.documentElement.clientWidth - 1009 > 0) {
            $("#page").css("left", (document.documentElement.clientWidth - 1009) / 2);
        }
        else { $("#page").css("left", 0); }
        $("#page").empty();
        $('#page').append(
        '<ul id="page_itemtop"></ul>'
        , '<ul id="page_explain"></ul>'
        , '<ul id="page_item"><li style="width:560px;" id="page_item_left"><div style="width: 100%;" id="pagenum"></div><ul style="top:0px;" id="mounts"></ul></li><li style="padding-left: 10px;padding-top: 10px;width:430px;" id="page_item_right"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li><a><img src="image/坐骑.png"><div></div></a><p>坐骑</p></li>'
    );
        $.ajax({
            url: './txt/pets.txt',
            dataType: 'text',
            success: function (data) {
                $('#page_explain').append(data);
            }
        });
        var csvList;
        var insert = '';
        $.ajax({
            url: './csv/mounts.csv',
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < csvList.length; i++) {
                    if (i % 100 == 1) {
                        insert = '<li><a class="btn" onclick="mountexplain(' + i + ')" target="_blank"><img src="image/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onerror=this.src="image/chongwuzuoqi-ui/004400.tex.png" onload="image(this)">';
                        csvList[i][8] == "0" ? insert += '<div class="bd"></div></a></li>' : insert += '<div class="bd"><img src="image/logo/lv' + csvList[i][8] + '.png"></div></a></li>';
                    }
                    else {
                        insert += '<li><a class="btn" onclick="mountexplain(' + i + ')" target="_blank"><img src="image/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onerror=this.src="image/chongwuzuoqi-ui/004400.tex.png" onload="image(this)">';
                        csvList[i][8] == "0" ? insert += '<div class="bd"></div></a></li>' : insert += '<div class="bd"><img src="image/logo/lv' + csvList[i][8] + '.png"></div></a></li>';
                    }
                    if (i % 100 == 0)
                    { infolist[i / 100] = insert; }
                    else if (i == csvList.length - 1)
                    { infolist[Math.ceil(i / 100)] = insert; }
                }
                Page.arr = csvList.length - 1;
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
            }
        });
        open("page");
    });    
    //分页
    var Page = {
        //每页内容数目
        defaultPerPageNum: 100,
        arr: 0,
        setTotalPageNums: function () {
            var pp = Page.defaultPerPageNum;
            var pnums = Page.arr / pp > parseInt(Page.arr / pp) ? parseInt(Page.arr / pp) + 1 : Page.arr / pp;
            var div = document.getElementById('pagenum');
            div.innerHTML = "";
            for (var i = 0; i < pnums; i++) {
                var a = document.createElement('a');                
                a.innerHTML = i + 1;
                a.setAttribute('class', 'off');
                div.appendChild(a);
            }
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat(diva.innerHTML);
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
            var target = '#mounts';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            $('a.btn').find('.bd').removeClass('Selected');
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function mountexplain(i) {
    var csvList;
    var insert = '';
    var target = '#page_item_right';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item_right").empty();
    $.ajax({
        url: './csv/mounts.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img style="float:left;width:192px;height:192px;margin-right: 210px;" src=image/chongwuzuoqi/' + csvList[i][0] + '.png onerror=this.src="image/chongwuzuoqi/068400.tex.png" onload="image(this)">';
            insert += '<p style="font-size: 19px;float:left;">' + csvList[i][4] + '</p>';
            csvList[i][3] == "1" ? insert += '<img style="float:left;width:24px;height:25px;opacity:1;" src=image/logo/飞行.png>' : insert += "";
            insert += '<p style="margin: 4px 0px 0px 0px;">Patch' + csvList[i][2] + '</p><br>';
            csvList[i][5] == "" ? insert += '<p>目前不明</p><br>' : insert += '<p>' + csvList[i][5] + '</p><br>';
            csvList[i][7] == "" ? insert += '<p>目前不明</p>' : insert += '<p style="color:#696969;font-size: 15px;">' + csvList[i][7] + '</p>';
            $(target).append(insert);
        }

    });
}