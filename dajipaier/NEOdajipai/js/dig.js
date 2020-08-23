function dig() {
    var infolist = [];
    //∂¡»°
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
        , '<ul id="page_check" style="height:200px;"><div style="padding-left:50px;" id="pagenum"></div><ul style="padding-left: 20px;top:0px;" id="aether"></ul></ul>'
        , '<ul id="page_item"><li style="padding-right: 160px; padding-left: 160px;position: relative;"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/∑µªÿ.png"></a></li>'
        , '<li style="width: 140px;"><a><img src="image/≤ÿ±¶Õº.png"><div></div></a><p>≤ÿ±¶Õº</p></li>'
    ); 
        $.ajax({
            url: './csv/µ…¡Á∏Ô.csv',
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,1)" target="_blank"><img src="image/aether/7.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,2)" target="_blank"><img src="image/aether/8.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,3)" target="_blank"><img src="image/aether/9.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,4)" target="_blank"><img src="image/aether/10.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,5)" target="_blank"><img src="image/aether/11.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="digexplain(this,6)" target="_blank"><img src="image/aether/12.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="digexplain(this,1)" target="_blank"><img src="image/aether/9.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="digexplain(this,2)" target="_blank"><img src="image/aether/10.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="digexplain(this,3)" target="_blank"><img src="image/aether/11.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="digexplain(this,4)" target="_blank"><img src="image/aether/12.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
            }
        });
        open("page");
    });
    //∑÷“≥
    var Page = {
        //√ø“≥ƒ⁄»› ˝ƒø    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:100px;" class="off">Â»Â»ƒ…∏Ô</a>';
            insert += '<a style="float:left;width:100px;" class="off">µ…¡Á∏Ô</a>';
            insert += '<a style="float:left;width:100px;" class="off">…Ó≤„¬ÃÕº</a>';
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
            var target = '#aether';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "Â»Â»ƒ…∏Ô") { pg = "1"; }
            else if (pg == "µ…¡Á∏Ô") { pg = "1"; }
            else if (pg == "…Ó≤„¬ÃÕº") { pg = "2"; }
            $("#page_item li").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function digexplain(obj, i) {
    var csvList;
    var pgn = $('a.on').text();
    var insert = '';
    var target = '#page_item li';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item li").empty();
    $.ajax({
        url: './csv/' + pgn + '.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img onclick="bigger(this)" style="float:left;width:390px;"src="image/dig/' + pgn + '/' + csvList[i][0] + '.jpg" onerror=this.style="display:none;">';
            for (var n = 1; n <= csvList[i][1]; n++) {
                insert += '<div style="float:left;width:130px;height:110px;text-align:center;"><img onclick="bigger(this)" style="width:110px;"src="image/dig/' + pgn + '/' + csvList[i][0] + n + '.jpg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: 0px;left: 20px;width: 18px;border-radius: 10px;background-color: #66ccff;">' + n + '</p></div>';
            }
            $(target).append(insert);
        }

    });
}