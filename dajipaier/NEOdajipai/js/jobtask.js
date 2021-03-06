﻿function jobtask() {
    var infolist = [];
    //读取
    $(function () {
        var csvList;
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
        , '<ul id="page_check" style="height: 140px;"><div id="typenum_1" class="job"></div><div id="typenum_2" class="job"></div><div id="typenum_3" class="job"></div></ul>'
        , '<ul id="page_item"><li id="page_item_left"><ul style="top:0px;" id="job"></ul></li><li style="padding-top: 0px;float: left;padding-left: 0px;" id="page_item_right"><ul  id="jobtask"></ul></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/返回.png"></a></li>'
        , '<li style="width: 160px;"><a><img src="image/职业任务.png"><div></div></a><p>职业任务</p></li>'
    );
        $.ajax({
            url: './txt/jobtask.txt',
            dataType: 'text',
            success: function (data) {
                $('#page_explain').append('<li>' + data + '</li>');
            }
        });        
        $.ajax({
            url: './csv/jobtask.csv',
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < 28; i++) {
                    infolist[i] = "";
                }
                for (var i = csvList.length-1; i > 1 ; i--) {
                    infolist[csvList[i][6]] += '<li><a class="btn" onclick="jobtaskexplain(this,' + i + ')" target="_blank"><p style="float:left;">' + csvList[i][3] + '</p><p style="float:right;">' + csvList[i][2] + '级</p></a></li>'; ;
                }
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
        setTotalPageNums: function () {
            var insert = '';
            for (var i = 1; i < 7; i++) {
                insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/' + i + '.png" onload="image(this)">' + i + '<div class="bd"></div></a>';
            }
            $("#typenum_1").append(insert);
            insert = '';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/7.png" onload="image(this)">7<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/8.png" onload="image(this)">8<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/9.png" onload="image(this)">10<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/11.png" onload="image(this)">11<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/12.png" onload="image(this)">12<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/13.png" onload="image(this)">13<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/14.png" onload="image(this)">14<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/10.png" onload="image(this)">15<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/15.png" onload="image(this)">16<div class="bd"></div></a>';
            $("#typenum_2").append(insert);
            insert = '';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/19.png" onload="image(this)">17<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/20.png" onload="image(this)">18<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/21.png" onload="image(this)">19<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/22.png" onload="image(this)">20<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/23.png" onload="image(this)">21<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/24.png" onload="image(this)">22<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/25.png" onload="image(this)">23<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/26.png" onload="image(this)">24<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/16.png" onload="image(this)">25<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/17.png" onload="image(this)">26<div class="bd"></div></a>';
            insert += '<a style="float:left;" class="off"><img src="image/jobtask/job/18.png" onload="image(this)">27<div class="bd"></div></a>';
            $("#typenum_3").append(insert);
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat($(diva).text());
        },
        setClickPageNum: function () {
            var a = $('div.job').find('a');
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
            var target = '#job';
            if ("null" == divb) {
                divb = document.getElementById('typenum_1').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3        
            $("#jobtask").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            //            $('a.btn:first').click();
            //            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function jobtaskexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '#jobtask';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#jobtask").empty();
    $.ajax({
        url: './csv/jobtask.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<p style="font-size: 19px;">' + csvList[i][3] + '</p>';
            insert += '<img style="float:left;width: 376px; height: 120px;opacity: 1;" src="image/jobtask/' + csvList[i][0] + '.png" onload="image(this)">';                        
            insert += '<p style="font-size: 13px;">位置：' + csvList[i][5] + '</p>';
            insert += '<p style="font-size: 13px;">NPC：' + csvList[i][4] + '</p>';
            csvList[i][7] == "" ? insert += '' : insert += '<p style="font-size: 13px;">缴纳物品：' + csvList[i][7] + '</p>';           
            $(target).append(insert);
        }

    });
}