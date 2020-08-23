//读取
$(function () {

    var csvList;
    var insert = '';
    var target = '.link-ex ul';
    $.ajax({
        url: './csv/guide.csv',
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                insert += '<li><a href="' + csvList[i][1] + '" target="_blank">' + csvList[i][0] + '</a><br></li>';
            }
            $(target).append(insert);
        }
    });
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