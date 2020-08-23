var map = [
    {"area":"the_sea_of_clouds", "x":"6", "y":"7", "l":"52", "t":"57"},
    {"area":"the_sea_of_clouds", "x":"10", "y":"39", "l":"94", "t":"433"},
    {"area":"the_sea_of_clouds", "x":"14", "y":"26", "l":"142", "t":"295"},
    {"area":"the_sea_of_clouds", "x":"17", "y":"16", "l":"174", "t":"168"},
    {"area":"the_sea_of_clouds", "x":"18", "y":"34", "l":"200", "t":"383"},
    {"area":"the_sea_of_clouds", "x":"20", "y":"5", "l":"214", "t":"33"},
    {"area":"the_sea_of_clouds", "x":"21", "y":"32", "l":"227", "t":"350"},
    {"area":"the_sea_of_clouds", "x":"22", "y":"10", "l":"244", "t":"95"},
    {"area":"the_sea_of_clouds", "x":"29", "y":"23", "l":"322", "t":"256"},
    {"area":"the_sea_of_clouds", "x":"31", "y":"18", "l":"349", "t":"193"},
    {"area":"the_coerthas_western_highlands", "x":"6", "y":"12", "l":"60", "t":"127"},
    {"area":"the_coerthas_western_highlands", "x":"12", "y":"24", "l":"130", "t":"295"},
    {"area":"the_coerthas_western_highlands", "x":"20", "y":"30", "l":"241", "t":"386"},
    {"area":"the_coerthas_western_highlands", "x":"21", "y":"12", "l":"261", "t":"132"},
    {"area":"the_coerthas_western_highlands", "x":"29", "y":"15", "l":"365", "t":"179"},
    {"area":"the_coerthas_western_highlands", "x":"34", "y":"7", "l":"443", "t":"70"},
    {"area":"the_coerthas_western_highlands", "x":"36", "y":"26", "l":"470", "t":"325"},
    {"area":"the_churning_mists", "x":"7", "y":"17", "l":"62", "t":"177"},
    {"area":"the_churning_mists", "x":"10", "y":"9", "l":"93", "t":"81"},
    {"area":"the_churning_mists", "x":"10", "y":"20", "l":"93", "t":"207"},
    {"area":"the_churning_mists", "x":"12", "y":"13", "l":"120", "t":"127"},
    {"area":"the_churning_mists", "x":"17", "y":"33", "l":"177", "t":"369"},
    {"area":"the_churning_mists", "x":"21", "y":"37", "l":"228", "t":"419"},
    {"area":"the_churning_mists", "x":"23", "y":"19", "l":"257", "t":"194"},
    {"area":"the_churning_mists", "x":"28", "y":"37", "l":"307", "t":"416"},
    {"area":"the_churning_mists", "x":"32", "y":"25", "l":"350", "t":"277"},
    {"area":"the_dravanian_forelands", "x":"10", "y":"30", "l":"96", "t":"327"},
    {"area":"the_dravanian_forelands", "x":"12", "y":"34", "l":"112", "t":"388"},
    {"area":"the_dravanian_forelands", "x":"13", "y":"34", "l":"128", "t":"382"},
    {"area":"the_dravanian_forelands", "x":"14", "y":"34", "l":"151", "t":"377"},
    {"area":"the_dravanian_forelands", "x":"18", "y":"34", "l":"195", "t":"377"},
    {"area":"the_dravanian_forelands", "x":"23", "y":"25", "l":"253", "t":"275"},
    {"area":"the_dravanian_forelands", "x":"23", "y":"31", "l":"255", "t":"342"},
    {"area":"the_dravanian_forelands", "x":"27", "y":"30", "l":"298", "t":"336"},
    {"area":"the_dravanian_forelands", "x":"29", "y":"24", "l":"320", "t":"253"}
];

jQuery(document).ready(function(a) {
    a("#overlay").fadeOut()

    function e() {
    e = map;
    
    for (var s = 1, n = "", o = 0; o < e.length; o++)
        n != e[o].area && (a("#g8_list").append('<p id="' + e[o].area + '">' + t[e[o].area] + "</p>"),
//        a("#menu").append('<li><a href="#' + e[o].area + '">' + t[e[o].area] + "</a></li>"),
        n = e[o].area,
        s = 1),
        a("#g8_list").append('<div class="cell"><img src="./image/treasure_g8/' + e[o].area + "_" + e[o].x + "-" + e[o].y + '.jpg" data-area="' + e[o].area + '" data-x="' + e[o].x + '" data-y="' + e[o].y + '" data-t="' + e[o].t + '" data-l="' + e[o].l + '" class="img_mouseout"><br><span class="pos_t" data-area="' + e[o].area + '" data-x="' + e[o].x + '" data-y="' + e[o].y + '">[' + e[o].x + ":" + e[o].y + "]"),
        s % 4 == 0 && a("#g8_list").append("<br>"),
        s++;
    "none" == a("#g8_list").css("display") && (a("#loading").css("display", "none"),
    a("#g8_list").css("display", "block"))
    
    }
    function s() {
        var t = a(window).width()
          , e = window.innerHeight
          , s = 516
          , n = 516
          , o = (t - s) / 2
          , i = (e - n) / 2;
        a("#digmap").css({
            left: o + "px"
        }),
        a("#digmap").css({
            top: i + "px"
        })
    }
    var t = {
        the_sea_of_clouds: "阿巴拉提亚云海",
        the_coerthas_western_highlands: "库尔扎斯西部高地",
        the_churning_mists: "翻云雾海",
        the_dravanian_forelands: "龙堡参天高地"
    };
    e(),
    a(document).on("click", "#g8_list img", function() {
        a("#select_g8").css("top", a(this).attr("data-t") + "px"),
        a("#select_g8").css("left", a(this).attr("data-l") + "px"),
        a("#select_g8").css("background", "url(./image/treasure_g8/treasuremap.tex.png) -510px -95px no-repeat"),
        a("#select_g8").html("&nbsp;&nbsp;[" + a(this).attr("data-x") + ":" + a(this).attr("data-y") + "]"),
        a("#digmap").css("background-image", "url(./image/treasure_g8/" + a(this).attr("data-area") + ".jpg)"),
        a("#overlay").fadeIn(),
        s()
    }),
    a(document).on("click", ".pos_t", function() {
        var e = document.getElementById("pos_box")
          , s = document.createElement("textarea");
        s.innerText = t[a(this).attr("data-area")] + " [" + a(this).attr("data-x") + ":" + a(this).attr("data-y") + "]",
        e.appendChild(s),
        s.select(),
        document.execCommand("copy"),
        e.removeChild(s)
    }),
    a(document).on("click", "#overlay", function() {
        a("#overlay").fadeOut()
    }),
    a(document).on("click", "#close", function() {
        a("#overlay").fadeOut()
    }),
    a(document).on("mouseover", "#g8_list img", function() {
        a(this).attr("class", "img_mouseover")
    }),
    a(document).on("mouseout", "#g8_list img", function() {
        a(this).attr("class", "img_mouseout")
    });
    var n = !1;
    a(window).resize(function() {
        n !== !1 && clearTimeout(n),
        n = setTimeout(function() {
            s()
        }, 200)
    })
});