var map = [
    { "area": "longbaoneiludidi", "x": "12", "y": "25", "l": "118", "t": "279" },
    { "area": "longbaoneiludidi", "x": "14", "y": "33", "l": "149", "t": "376" },
    { "area": "longbaoneiludidi", "x": "15", "y": "21", "l": "152", "t": "222" },
    { "area": "longbaoneiludidi", "x": "19", "y": "35", "l": "198", "t": "390" },
    { "area": "longbaoneiludidi", "x": "25", "y": "21", "l": "277", "t": "222" },
    { "area": "longbaoneiludidi", "x": "27", "y": "28", "l": "304", "t": "306" },
    { "area": "longbaoneiludidi", "x": "35", "y": "29", "l": "390", "t": "328" },
    { "area": "longbaoneiludidi", "x": "38", "y": "24", "l": "436", "t": "258" },
    {"area":"the_churning_mists", "x":"11", "y":"16", "l":"112", "t":"177"},
    {"area":"the_churning_mists", "x":"11", "y":"35", "l":"112", "t":"400"},
    {"area":"the_churning_mists", "x":"12", "y":"30", "l":"124", "t":"280"},
    {"area":"the_churning_mists", "x":"16", "y":"36", "l":"172", "t":"412"},
    {"area":"the_churning_mists", "x":"18", "y":"21", "l":"196", "t":"232"},
    {"area":"the_churning_mists", "x":"22", "y":"24", "l":"244", "t":"268"},
    {"area":"the_churning_mists", "x":"28", "y":"24", "l":"316", "t":"268"},
    {"area":"the_churning_mists", "x":"32", "y":"16", "l":"358", "t":"164"},
    {"area":"the_churning_mists", "x":"35", "y":"29", "l":"387", "t":"316"},
    { "area": "the_coerthas_western_highlands", "x": "15", "y": "31", "l": "180", "t": "372" },
    { "area": "the_coerthas_western_highlands", "x": "16", "y": "23", "l": "172", "t": "256" },
    { "area": "the_coerthas_western_highlands", "x": "22", "y": "27", "l": "287", "t": "310" },
    { "area": "the_coerthas_western_highlands", "x": "28", "y": "11", "l": "354", "t": "120" },
    { "area": "the_coerthas_western_highlands", "x": "33", "y": "5", "l": "421", "t": "50" },
    { "area": "the_coerthas_western_highlands", "x": "33", "y": "19", "l": "429", "t": "228" },
    { "area": "the_coerthas_western_highlands", "x": "35", "y": "10", "l": "452", "t": "112" },
    { "area": "the_coerthas_western_highlands", "x": "36", "y": "16", "l": "460", "t": "190" },
    { "area": "the_dravanian_forelands", "x": "9", "y": "36", "l": "84", "t": "400" },
    { "area": "the_dravanian_forelands", "x": "20", "y": "25", "l": "212", "t": "266" },
    { "area": "the_dravanian_forelands", "x": "21", "y": "36", "l": "228", "t": "402" },
    { "area": "the_dravanian_forelands", "x": "24", "y": "24", "l": "260", "t": "258" },
    { "area": "the_dravanian_forelands", "x": "25", "y": "12", "l": "270", "t": "123" },
    { "area": "the_dravanian_forelands", "x": "28", "y": "11", "l": "308", "t": "107" },
    { "area": "the_dravanian_forelands", "x": "28", "y": "26", "l": "316", "t": "286" },
    { "area": "the_dravanian_forelands", "x": "30", "y": "33", "l": "332", "t": "376" },
    { "area": "the_dravanian_forelands", "x": "37", "y": "17", "l": "417", "t": "177" },
    { "area": "the_sea_of_clouds", "x": "9", "y": "26", "l": "91", "t": "286" },
    { "area": "the_sea_of_clouds", "x": "10", "y": "17", "l": "96", "t": "185" },
    { "area": "the_sea_of_clouds", "x": "13", "y": "10", "l": "129", "t": "93" },
    { "area": "the_sea_of_clouds", "x": "13", "y": "21", "l": "131", "t": "228" },
    { "area": "the_sea_of_clouds", "x": "27", "y": "23", "l": "306", "t": "247" },
    { "area": "the_sea_of_clouds", "x": "27", "y": "35", "l": "293", "t": "388" },
    { "area": "the_sea_of_clouds", "x": "35", "y": "10", "l": "396", "t": "94" },
    { "area": "the_sea_of_clouds", "x": "35", "y": "37", "l": "390", "t": "412" },
    { "area": "the_sea_of_clouds", "x": "37", "y": "15", "l": "414", "t": "155" },
    { "area": "the_sea_of_clouds", "x": "37", "y": "20", "l": "419", "t": "215" }
];

jQuery(document).ready(function(a) {
    a("#overlay").fadeOut()

    function e() {
    e = map;
    
    for (var s = 1, n = "", o = 0; o < e.length; o++)
        n != e[o].area && (a("#g7_list").append('<p id="' + e[o].area + '">' + t[e[o].area] + "</p>"),
//        a("#menu").append('<li><a href="#' + e[o].area + '">' + t[e[o].area] + "</a></li>"),
        n = e[o].area,
        s = 1),
        a("#g7_list").append('<div class="cell"><img src="./image/treasure_g7/' + e[o].area + "_" + e[o].x + "-" + e[o].y + '.jpg" data-area="' + e[o].area + '" data-x="' + e[o].x + '" data-y="' + e[o].y + '" data-t="' + e[o].t + '" data-l="' + e[o].l + '" class="img_mouseout"><br><span class="pos_t" data-area="' + e[o].area + '" data-x="' + e[o].x + '" data-y="' + e[o].y + '">[' + e[o].x + ":" + e[o].y + "]"),
        s % 4 == 0 && a("#g7_list").append("<br>"),
        s++;
    "none" == a("#g7_list").css("display") && (a("#loading").css("display", "none"),
    a("#g7_list").css("display", "block"))
    
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
        longbaoneiludidi: "龙堡内陆低地",
        the_churning_mists: "翻云雾海",
        the_coerthas_western_highlands: "库尔扎斯西部高地",
        the_dravanian_forelands: "龙堡参天高地",
        the_sea_of_clouds: "阿巴拉提亚云海"
    };
    e(),
    a(document).on("click", "#g7_list img", function() {
        a("#select_g7").css("top", a(this).attr("data-t") + "px"),
        a("#select_g7").css("left", a(this).attr("data-l") + "px"),
        a("#select_g7").css("background", "url(./image/treasure_g7/treasuremap.tex.png) -510px -95px no-repeat"),
        a("#select_g7").html("&nbsp;&nbsp;[" + a(this).attr("data-x") + ":" + a(this).attr("data-y") + "]"),
        a("#digmap").css("background-image", "url(./image/treasure_g7/" + a(this).attr("data-area") + ".jpg)"),
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
    a(document).on("mouseover", "#g7_list img", function() {
        a(this).attr("class", "img_mouseover")
    }),
    a(document).on("mouseout", "#g7_list img", function() {
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