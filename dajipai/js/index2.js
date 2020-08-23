function index() {
    $(function () {

        var csvList;
        var info = '';
        var insert = '';
        var target = '.link ul';
        $(".link").empty();
        $(".link").append('<div id="pagenum" class="pagenum"></div><ul style="width:500px;height:240px;" id="index"></ul>');
        $(".explain").empty();
        info += '<p class="explain-title">更新日志</p><ul style="height:100px;overflow:auto;">';
        info += '<p class="explain-main">17.9.24鸡排正式上线</p><br><br>';        
        info += '<p class="explain-main">本工具推荐吃用chrome或360极速，不支持IE</p>';
        info += '<p class="explain-main">如果发现图片错位，请首先F5/刷新</p>';
        info += '<p class="explain-main">使用过程中 如遇到数据错误问题，欢迎将问题发邮件至susu@ffxiv.vip</p>';
        info += '<p class="explain-main">如果对鸡排有希望的功能，也可以通过邮件提交（暂不做模拟器）</p>';        
        info += '</ul><p class="explain-foot">Copyright 2016-2017 FFXIV.CN&FFSUSU.COM & Ear All rights reserved.<br>FINAL FANTASY XIV©2010 - 2017 SQUARE ENIX CO., LTD. All Rights Reserved.</p>';
        $(".explain").append(info);        
        insert += '<li><a onclick="music()"><img src="tupian/logo/music2.png"><div></div></a><p>乐谱一览</p></li>';
        insert += '<li><a onclick="aether()"><img src="tupian/logo/aether.png"><div></div></a><p style="left:-51px;">风脉泉一览</p></li>';
        insert += '<li><a onclick="pets()"><img src="tupian/logo/pets.png"><div></div></a><p style="left:-51px;">宠物一览</p></li>';
        insert += '<li><a onclick="mounts()"><img src="tupian/logo/mounts.png"><div></div></a><p style="left:-51px;">坐骑一览</p></li>';         
        insert += '<li><a onclick="hunt()"><img src="tupian/logo/hunt.png"><div></div></a><p style="left:-32px;">狩猎任务一览</p></li>';
        insert += '<li><a onclick="dig()"><img src="tupian/logo/dig.png"><div></div></a><p style="left:-51px;">藏宝图一览</p></li>';
        $(target).append(insert);
    });
}