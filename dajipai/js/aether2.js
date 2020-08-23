﻿function aether() {
    var infolist = [];
    //读取
    $(function () {
        $(".link").empty();
        $(".link").append('<div id="pagenum" class="pagenum"></div><ul id="aether"></ul>');
        $(".explain").empty();
        var insert2 = '';
        insert2 += '<p class="explain-title">使用说明</p><ul style="height:130px;overflow:auto;">';
        insert2 += '<img alt="" src="https://ww1.sinaimg.cn/mw690/74ed1823gw1exa9neuhybj205d01n74x.jpg" style="width: 193px; height: 59px;" /><br />'
        insert2 += '<p class="explain-main">风脉小图对应1-10，从左到右，左上为1-5，左下为6-10</p>';
        insert2 += '<p class="explain-main">若无特地标注地名，只显示坐标的情况，则为当前地图的任务</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：什么是风脉？</span></p>';
        insert2 += '<p class="explain-main">A：风脉是飞行开启的必要条件之一</p>';
        insert2 += '<p class="explain-main">10个分布在该地图各个角落的[风脉泉]</p>';
        insert2 += '<p class="explain-main">4个完成该地图指定的支线任务送的[风脉泉]</p>';
        insert2 += '<p class="explain-main">1个指定主线任务送的[风脉泉]</p>';
        insert2 += '<p class="explain-main">完成以上累积15个[风脉泉]就可以飞该张图了</p>';
        insert2 += '<p class="explain-main">3.0一共6张地图、4.0一共6张地图</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：怎么飞? </span></p>';
        insert2 += '<p class="explain-main">完成15个[风脉泉]后，要确保该坐骑是飞行坐骑<img alt="" src="http://wx4.sinaimg.cn/large/a7a9f7f3gy1fjwxc80jawj200o00pt8h.jpg" style="width: 20px; height: 20px;" /></p>';
        insert2 += '<p class="explain-main">而陆行鸟系列坐骑，需要去完成「我心飞翔」才可飞行</p>';
        insert2 += '<p class="explain-main">「我心飞翔」伊修加德基础层 圣大鸟房 阿尔努兰(X:7 Y:11)</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：如何查看风脉</span></p>';
        insert2 += '<p class="explain-main">A：按i打开背包，在任务道具背包里，找到「风脉仪」，使用它可以查询风脉的位置</p>';
        insert2 += '<p class="explain-main">或按P，快捷指令 下的 地图&amp;移动，点开风脉泉，可以查看你现在开启的风脉情况</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q：如果不小心把 「风脉仪」丢了</p>';
        insert2 += '<p class="explain-main">A：在神拳痕（X：14.3 ，Y：9.6）找NPC加乌弗里德或者伊修加德基础层（X：13 ，Y：11.9）找NPC吉布里隆再次领取。</p></ul>';        
        $.ajax({
            url: './csv/aether.csv',
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,1)" target="_blank"><img src="tupian/aether/1.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,2)" target="_blank"><img src="tupian/aether/2.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,3)" target="_blank"><img src="tupian/aether/3.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,4)" target="_blank"><img src="tupian/aether/4.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,5)" target="_blank"><img src="tupian/aether/5.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,6)" target="_blank"><img src="tupian/aether/6.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,7)" target="_blank"><img src="tupian/aether/7.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,8)" target="_blank"><img src="tupian/aether/8.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,9)" target="_blank"><img src="tupian/aether/9.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,10)" target="_blank"><img src="tupian/aether/10.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,11)" target="_blank"><img src="tupian/aether/11.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,12)" target="_blank"><img src="tupian/aether/12.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                $(".explain").append(insert2);
            }
        });
    });    
    //分页
    var Page = {
        //每页内容数目    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:50px;" class="off" href="#">3.0</a>';
            insert += '<a style="float:left;width:50px;" class="off" href="#">4.0</a>';
            $("#pagenum").append(insert);
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
            var target = '.link ul';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "3.0") { pg = "1"; }
            else if (pg == "4.0") { pg = "2"; }
            $(".explain").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
//            $('a.btn:first').click();
//            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function aetherexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/aether.csv',
        success: function (data) {

            csvList = $.csv()(data);
            csvList[i][0] == "" ? insert += '<p style="font-size: 19px;">全部由主线触发</p>' : insert += '<img onclick="bigger(this)" style="float:left;width:190px;"src="tupian/aether/' + csvList[i][0] + '.jpg">';
            for (var n = 1; n < 11; n++) {
                insert += '<div style="float:left;width:100px;height:50px;text-align:center;"><img onclick="bigger(this)" style="width:80px;"src="tupian/aether/' + csvList[i][0] + n + '.jpg" onerror=this.style="display:none;"></div>';
            }
            csvList[i][12] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="tupian/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][12] + '</p>';
            csvList[i][13] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="tupian/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][13] + '</p>';
            csvList[i][14] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="tupian/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][14] + '</p>';
            csvList[i][15] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="tupian/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][15] + '</p>';
            $(target).append(insert);
        }

    });
}