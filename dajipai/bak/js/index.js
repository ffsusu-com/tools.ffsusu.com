$(function () {

    var csvList;
    var insert = '';
    var target = '.link ul';
    insert += '<li><a href="./pets.html"><img src="tupian/logo/pets.png"><div></div></a><p>宠物一览</p></li>';
    insert += '<li><a href="./mounts.html"><img src="tupian/logo/mounts.png"><div></div></a><p>坐骑一览</p></li>';
    $(target).append(insert);            

});
