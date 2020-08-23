var infolist = [];
//读取
$(function () {
    var csvList;    
    $.ajax({
        url: './csv/jobtask.csv',
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < 28; i++) {
                infolist[i] = "";
            }
            for (var i = 1; i < csvList.length; i++) {
                infolist[csvList[i][6]] += '<li><a class="btn" onclick="explain(this,' + i + ')" target="_blank"><p style="float:left;">' + csvList[i][3] + '</p><p style="float:right;">' + csvList[i][2] + '级</p></a></li>'; ;
            }
            Page.setTotalPageNums();
            Page.setClickPageNum();            
            Page.allContent("null");
        }
    });
});
function explain(obj,i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/jobtask.csv',
        success: function (data) {

            csvList = $.csv()(data);            
            insert += '<img src="tupian/jobtask/' + csvList[i][0] + '.png">';
            insert += '<p style="font-size: 13px;">任务：' + csvList[i][3] + '</p>';
            insert += '<p style="font-size: 13px;">位置：' + csvList[i][5] + '</p>';
            insert += '<p style="font-size: 13px;">NPC：' + csvList[i][4] + '</p>';
            $(target).append(insert);
        }

    });
}
//分页
var Page = {
    //每页内容数目    
    setTotalPageNums: function () {
        var insert = '';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/1.png)" class="off">1<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/2.png)" class="off">2<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/3.png)" class="off">3<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/4.png)" class="off">4<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/5.png)" class="off">5<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/6.png)" class="off">6<div class="bd"></div></a>';
        $("#type2num").append(insert);
        insert = '';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/7.png)" class="off">7<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/8.png)" class="off">8<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/9.png)" class="off">10<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/11.png)" class="off">11<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/12.png)" class="off">12<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/13.png)" class="off">13<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/14.png)" class="off">14<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/10.png)" class="off">15<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/15.png)" class="off">16<div class="bd"></div></a>';
        $("#type2num_2").append(insert);
        insert = '';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/19.png)" class="off">17<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/20.png)" class="off">18<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/21.png)" class="off">19<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/22.png)" class="off">20<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/23.png)" class="off">21<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/24.png)" class="off">22<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/25.png)" class="off">23<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/26.png)" class="off">24<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/16.png)" class="off">25<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/17.png)" class="off">26<div class="bd"></div></a>';
        insert += '<a style="float:left;background: url(tupian/jobtask/job/18.png)" class="off">27<div class="bd"></div></a>';
        $("#type2num_3").append(insert);
        Page.setClickPageNum();
    },
    getClickPageNum: function (diva) {
        return parseFloat(diva.innerHTML);
    },
    setClickPageNum: function () {                
        var a = $('div.type2num').find('a');
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