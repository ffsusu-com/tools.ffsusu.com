function hunt() {
    var infolist = [];
    //��ȡ
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
        , '<ul id="page_check" style="height:200px;"><div style="padding-left:80px;" id="pagenum"></div><ul style="top:0px;" id="aether"></ul></ul>'
        , '<ul id="page_item"><li style="left: 300px;position: relative;"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/����.png"></a></li>'
        , '<li><a><img src="image/����.png"><div></div></a><p>����</p></li>'
    ); 
        $.ajax({
            url: './csv/aether.csv',
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,1)" target="_blank"><img src="image/aether/1.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,2)" target="_blank"><img src="image/aether/2.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,3)" target="_blank"><img src="image/aether/3.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,4)" target="_blank"><img src="image/aether/4.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,5)" target="_blank"><img src="image/aether/5.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,6)" target="_blank"><img src="image/aether/6.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,7)" target="_blank"><img src="image/aether/7.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,8)" target="_blank"><img src="image/aether/8.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,9)" target="_blank"><img src="image/aether/9.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,10)" target="_blank"><img src="image/aether/10.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,11)" target="_blank"><img src="image/aether/11.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,12)" target="_blank"><img src="image/aether/12.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");                
            }
        });
        open("page");
    });
    //��ҳ
    var Page = {
        //ÿҳ������Ŀ    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:50px;" class="off">3.0</a>';
            insert += '<a style="float:left;width:50px;" class="off">4.0</a>';
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
            var target = '#aether';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[1];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "3.0") { pg = "1"; }
            else if (pg == "4.0") { pg = "2"; }
            $("#page_item li").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function huntexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '#page_item li';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item li").empty();
    $.ajax({
        url: './csv/aether.csv',
        success: function (data) {
            insert += '<img onclick="bigger(this)" style="width:390px;"src="image/hunt/' + i + '.jpg">';
            $(target).append(insert);
        }
    });
}