function aether() {
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
        , '<ul id="page_item"><li style="width:560px;" id="page_item_left"></li><li style="padding-left: 10px;padding-top: 10px;" id="page_item_right"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/����.png"></a></li>'
        , '<li><a><img src="image/����.png"><div></div></a><p>����</p></li>'
    );
        var insert2 = '';
        insert2 += '<p style="font-size: 19px;">ʹ��˵��</p><ul style="width:420px;height:480px;top: 0px;">';
        insert2 += '<img alt="" src="image/aether/nothing/shuoming.jpg" style="width: 193px; height: 59px;opacity: 1;" /><br />'
        insert2 += '<p class="explain-main">����Сͼ��Ӧ1-10�������ң�����Ϊ1-5������Ϊ6-10</p>';
        insert2 += '<p class="explain-main">�����صر�ע������ֻ��ʾ������������Ϊ��ǰ��ͼ������</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q��ʲô�Ƿ�����</span></p>';
        insert2 += '<p class="explain-main">A�������Ƿ��п����ı�Ҫ����֮һ</p>';
        insert2 += '<p class="explain-main">10���ֲ��ڸõ�ͼ���������[����Ȫ]</p>';
        insert2 += '<p class="explain-main">4����ɸõ�ͼָ����֧�������͵�[����Ȫ]</p>';
        insert2 += '<p class="explain-main">1��ָ�����������͵�[����Ȫ]</p>';
        insert2 += '<p class="explain-main">��������ۻ�15��[����Ȫ]�Ϳ��Էɸ���ͼ��</p>';
        insert2 += '<p class="explain-main">3.0һ��6�ŵ�ͼ��4.0һ��6�ŵ�ͼ��5.0һ��6��ͼ</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q����ô��? </span></p>';
        insert2 += '<p class="explain-main">���15��[����Ȫ]��Ҫȷ���������Ƿ�������<img alt="" src="image/logo/����.png" style="width: 20px; height: 20px;opacity: 1;" /></p>';
        insert2 += '<p class="explain-main">��½����ϵ�������Ҫȥ��ɡ����ķ��衹�ſɷ���</p>';
        insert2 += '<p class="explain-main">�����ķ��衹���޼ӵ»����� ʥ���� ����Ŭ��(X:7 Y:11)</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q����β鿴����</span></p>';
        insert2 += '<p class="explain-main">A����i�򿪱�������������߱�����ҵ��������ǡ���ʹ�������Բ�ѯ������λ��</p>';
        insert2 += '<p class="explain-main">��P�����ָ�� �µ� ��ͼ&amp;�ƶ����㿪����Ȫ�����Բ鿴�����ڿ����ķ������</p>';
        insert2 += '<p class="explain-main"><span style="color:#ff0000;">Q�������С�İ� �������ǡ�����</p>';
        insert2 += '<p class="explain-main">A������ȭ�ۣ�X��14.3 ��Y��9.6����NPC���ڸ���»������޼ӵ»����㣨X��13 ��Y��11.9����NPC������¡�ٴ���ȡ��</p></ul>';
        $.ajax({
            url: './csv/aether.csv',
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[3] = "";
                for (i = 1; i < 7; i++) {
                    infolist[1] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 7; i < 13; i++) {
                    infolist[2] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }
                for (i = 13; i < 19; i++) {
                    infolist[3] += '<li><a class="btn" onclick="aetherexplain(this,' + i + ')" target="_blank"><img src="image/aether/' + i + '.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                }                
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                $("#page_item_right").append(insert2);
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
            insert += '<a style="float:left;width:50px;" class="off">5.0</a>';
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
                divb = document.getElementById('pagenum').children[2];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "3.0") { pg = "1"; }
            else if (pg == "4.0") { pg = "2"; }
            else if (pg == "5.0") { pg = "3"; }
            $("#aether").empty();
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
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $("#page_item_left").empty();
    $.ajax({
        url: './csv/aether.csv',
        success: function (data) {

            csvList = $.csv()(data);
            csvList[i][0] == "" ? insert += '<p style="font-size: 19px;">ȫ�������ߴ���</p>' : insert += '<img onclick="bigger(this)" style="float:left;width:340px;"src="image/aether/' + csvList[i][0] + '.jpeg" onerror=this.style="display:none;">';
            insert += '<ul style="top:0px;">';
            for (var n = 1; n < 11; n++) {
                insert += '<div style="float:left;width:100px;height:70px;text-align:center;"><img onclick="bigger(this)" style="width:80px;"src="image/aether/' + csvList[i][0] + n + '.jpeg" onerror=this.style="display:none;">';
                csvList[i][0] == "" ? insert += '' : insert += '<p style="float: left;position: relative;top: 0px;left: 20px;width: 18px;border-radius: 10px;background-color: #66ccff;">' + n + '</p></div>';
            }
            insert += '</ul><ul>';
            csvList[i][12] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][12] + '</p>';
            csvList[i][13] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][13] + '</p>';
            csvList[i][14] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][14] + '</p>';
            csvList[i][15] == "" ? insert += '' : insert += '<img style="float:left;width:20px;"src="image/logo/061419.tex.png"><p style="font-size: 15px;">' + csvList[i][15] + '</p>';
            insert += '</ul>';
            $('#page_item_left').append(insert);
        }

    });
}