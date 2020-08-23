var infolist = [];
//读取
$(function () {
    var csvList;    
    $.ajax({
        url: './csv/music.csv',
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < 7; i++) {
                infolist[i] = "";
            }
            for (var i = 1; i < csvList.length; i++) {
                infolist[csvList[i][7]] += '<li><a class="btn" onclick="explain(this,' + i + ')" target="_blank"><p>' + ('000' + csvList[i][0]).slice(-3) + '-' + csvList[i][1] + '</p></a></li>';
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
    $(".explain").empty();
    $.ajax({
        url: './csv/music.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<p style="font-size: 19px;">' + ('000' + csvList[i][0]).slice(-3) + '-' + csvList[i][1] + '</p>';
            csvList[i][8] == "" ? insert += '<p style="font-size: 13px;">暂无试听</p>' : insert += '<iframe style="float:left;" id="BGML" frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=110 src="//music.163.com/outchain/player?type=2&id=' + csvList[i][8] + '&auto=0&height=90"></iframe>';
            insert += '<p>获得方法:</p>';
            csvList[i][3] == "" ? insert += '<p style="font-size: 13px;">' + csvList[i][2] + '</p>' : insert += '<p style="font-size: 13px;">' + csvList[i][2] + ':' + csvList[i][3] + '</p>';
            csvList[i][4] == "" ? insert += '<p style="font-size: 13px;">' + csvList[i][5] + '</p>' : insert += '<p style="font-size: 13px;">NPC:' + csvList[i][4] +'购买（'+ csvList[i][5] + '）</p>';
            $(target).append(insert);
        }

    });
}
//分页
var Page = {
    //每页内容数目    
    setTotalPageNums: function () {
        var insert = '';
        insert += '<a style="float:left;background-position: -144px -600px;" class="off">1<div class="bd"><p>区域场景</p></div></a>';
        insert += '<a style="float:left;background-position: -212px -600px;" class="off">2<div class="bd"><p>迷宫挑战</p></div></a>';
        insert += '<a style="float:left;background-position: -280px -600px;" class="off">3<div class="bd"><p>讨伐歼灭</p></div></a>';
        insert += '<a style="float:left;background-position: -348px -600px;" class="off">4<div class="bd"><p>大型任务</p></div></a>';
        insert += '<a style="float:left;background-position: -416px -600px;" class="off">5<div class="bd"><p>其他</p></div></a>';
        insert += '<a style="float:left;background-position: -484px -600px;" class="off">6<div class="bd"><p>季节活动</p></div></a>';
        $("#typenum").append(insert);
        Page.setClickPageNum();
    },
    getClickPageNum: function (diva) {
        return parseFloat(diva.innerHTML);
    },
    setClickPageNum: function () {
        var divx = document.getElementById('typenum');
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
            divb = document.getElementById('typenum').children[0];
            divb.className = "on";
        }
        var pg = this.getClickPageNum(divb); // 1 2 3        
        $(".explain").empty();        
        $(target).empty();
        $(target).append(infolist[pg]);
        //        $('a.btn:first').click();
        //        $('a.btn:first').find('.bd').addClass('Selected');
    }
};