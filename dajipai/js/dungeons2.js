function dungeons() {
    var infolist = [];
    //读取
    $(function () {
        var csvList;
        $(".link").empty();
        $(".link").append('<div id="type2num" class="type2num"></div><ul id="dungeons"></ul>');
        $(".explain").empty();
        $.ajax({
            url: './csv/dungeons.csv',
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < 11; i++) {
                    infolist[i] = "";
                }
                for (var i = 1; i < csvList.length; i++) {
                    infolist[csvList[i][9]] += '<li><a class="btn" onclick="dungeonsexplain(this,' + i + ')" target="_blank"><img src="tupian/dungeons/' + csvList[i][0] + '.png"><div class="bd"></div></a></li>'; ;
                }
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
            insert += '<a style="float:left;background: url(tupian/logo/061801.tex.png) 0 0 no-repeat;" class="off">1<div class="bd"><div style="background-position: -142px -2px;"></div><p>迷宫挑战(新生)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061801.tex.png) 0 0 no-repeat;" class="off">2<div class="bd"><div style="background-position: -142px -20px;"></div><p>迷宫挑战(苍穹)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061801.tex.png) 0 0 no-repeat;" class="off">3<div class="bd"><div style="background-position: -53px -74px;"></div><p>迷宫挑战(红莲)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061804.tex.png) 0 0 no-repeat;" class="off">4<div class="bd"><div style="background-position: -142px -2px;"></div><p>讨伐歼灭(新生)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061804.tex.png) 0 0 no-repeat;" class="off">5<div class="bd"><div style="background-position: -142px -20px;"></div><p>讨伐歼灭(苍穹)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061804.tex.png) 0 0 no-repeat;" class="off">6<div class="bd"><div style="background-position: -53px -74px;"></div><p>讨伐歼灭(红莲)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061802.tex.png) 0 0 no-repeat;" class="off">7<div class="bd"><div style="background-position: -142px -2px;"></div><p>大型任务(新生)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061802.tex.png) 0 0 no-repeat;" class="off">8<div class="bd"><div style="background-position: -142px -20px;"></div><p>大型任务(苍穹)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061802.tex.png) 0 0 no-repeat;" class="off">9<div class="bd"><div style="background-position: -53px -74px;"></div><p>大型任务(红莲)</p></div></a>';
            insert += '<a style="float:left;background: url(tupian/logo/061807.tex.png) 0 0 no-repeat;" class="off">10<div class="bd"><p>其他</p></div></a>';
            $("#type2num").append(insert);
            Page.setClickPageNum();
        },
        getClickPageNum: function (diva) {
            return parseFloat(diva.innerHTML);
        },
        setClickPageNum: function () {
            var divx = document.getElementById('type2num');
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
                divb = document.getElementById('type2num').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3        
            $(".explain").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function dungeonsexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/dungeons.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<p style="font-size: 19px;">' + csvList[i][3] + '</p>';
            insert += '<img style="float:left;"src="tupian/dungeons/' + csvList[i][0] + '.png">';
            csvList[i][10] == "1" ? insert += '<p style="float:left;font-size: 13px;">主线任务开启</p>' : insert += '<p style="float:left;font-size: 13px;">任务：' + csvList[i][4] + '</p><br/>';
            csvList[i][10] == "1" ? insert += '' : insert += '<p style="float:left;font-size: 13px;">位置：' + csvList[i][5] + '</p><br/>';
            csvList[i][10] == "1" ? insert += '' : insert += '<p style="float:left;font-size: 13px;">坐标：' + csvList[i][6] + '</p><br/>';
            csvList[i][10] == "1" ? insert += '' : insert += '<p style="float:left;font-size: 13px;">NPC：' + csvList[i][7] + '</p>';
            $(target).append(insert);
        }

    });
}