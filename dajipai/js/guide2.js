//读取
$(function () {

    var csvList;
    var insert = '';
    var target = '.link-ex ul';
    insert += '<li><a onclick="index()">菜单</a><br></li>';    
    insert += '<li><a onclick="music()">乐谱一览</a><br></li>';
    insert += '<li><a onclick="aether()">风脉泉一览</a><br></li>';
    insert += '<li><a onclick="pets()">宠物一览</a><br></li>';
    insert += '<li><a onclick="mounts()">坐骑一览</a><br></li>';     
    insert += '<li><a onclick="hunt()">狩猎任务一览</a><br></li>';
    insert += '<li><a onclick="dig()">藏宝图一览</a><br></li>';
    $(target).append(insert);    
});
//布置
window.onload = function () {

    function box() {
        //获取DIV为‘box’的盒子
        var oBox = document.getElementById('main');
        //获取元素自身的宽度
        var L1 = oBox.offsetWidth;
        //获取元素自身的高度
        var H1 = oBox.offsetHeight;
        //获取实际页面的left值。（页面宽度减去元素自身宽度/2）
        var Left = (document.documentElement.clientWidth - L1) / 2;
        //获取实际页面的top值。（页面宽度减去元素自身高度/2）
        var top = (document.documentElement.clientHeight - H1) / 2;
        oBox.style.left = Left + 'px';
        oBox.style.top = top + 'px';
    }
    box();
    //当浏览器页面发生改变时，DIV随着页面的改变居中。
    window.onresize = function () {
        box();
    }

}