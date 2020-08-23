//status table
var class001_arr = [ //剣術士
    [48 ,12,36],    [50 ,12,36],    [52 ,12,36],    [54 ,12,36],    [55 ,13,36],
    [56 ,13,37],    [56 ,14,38],    [57 ,14,39],    [59 ,14,39],    [60 ,14,40],
    [61 ,15,40],    [62 ,15,41],    [62 ,16,42],    [64 ,16,42],    [66 ,16,42],
    [68 ,16,42],    [69 ,17,42],    [70 ,17,43],    [70 ,18,44],    [71 ,18,45],
    [73 ,18,45],    [74 ,18,46],    [75 ,19,46],    [76 ,19,47],    [76 ,20,48],
    [78 ,20,48],    [80 ,20,48],    [82 ,20,48],    [83 ,21,48],    [84 ,21,49],
    [84 ,22,50],    [85 ,22,51],    [87 ,22,51],    [88 ,22,52],    [89 ,23,52],
    [90 ,23,53],    [90 ,24,54],    [92 ,24,54],    [94 ,24,54],    [96 ,24,54],
    [97 ,25,54],    [98 ,25,55],    [98 ,26,56],    [99 ,26,57],    [101,26,57],
    [102,26,58],    [103,27,58],    [104,27,59],    [104,28,60],    [106,28,60]
];
var class002_arr = [ //斧術士
    [60 ,12,24],    [61 ,12,25],    [63 ,12,25],    [64 ,12,26],    [65 ,13,26],
    [66 ,13,27],    [66 ,14,28],    [68 ,14,28],    [70 ,14,28],    [72 ,14,28],
    [73 ,15,28],    [74 ,15,29],    [74 ,16,30],    [75 ,16,31],    [77 ,16,31],
    [78 ,16,32],    [79 ,17,32],    [80 ,17,33],    [80 ,18,34],    [82 ,18,34],
    [84 ,18,34],    [86 ,18,34],    [87 ,19,34],    [88 ,19,35],    [88 ,20,36],
    [89 ,20,37],    [91 ,20,37],    [92 ,20,38],    [93 ,21,38],    [94 ,21,39],
    [94 ,22,40],    [96 ,22,40],    [98 ,22,40],    [100,22,40],    [101,23,40],
    [102,23,41],    [102,24,42],    [103,24,43],    [105,24,43],    [106,24,44],
    [107,25,44],    [108,25,45],    [108,26,46],    [110,26,46],    [112,26,46],
    [114,26,46],    [115,27,46],    [116,27,47],    [116,28,48],    [117,28,49]
];
var class003_arr = [ //格闘士
    [36,24,36],    [37,24,37],    [37,24,39],    [38,24,40],    [38,25,41],
    [39,25,42],    [40,26,42],    [41,26,43],    [41,26,45],    [42,26,46],
    [42,27,47],    [43,27,48],    [44,28,48],    [45,28,49],    [45,28,51],
    [46,28,52],    [46,29,53],    [47,29,54],    [48,30,54],    [49,30,55],
    [49,30,57],    [50,30,58],    [50,31,59],    [51,31,60],    [52,32,60],
    [53,32,61],    [53,32,63],    [54,32,64],    [54,33,65],    [55,33,66],
    [56,34,66],    [57,34,67],    [57,34,69],    [58,34,70],    [58,35,71],
    [59,35,72],    [60,36,72],    [61,36,73],    [61,36,75],    [62,36,76],
    [62,37,77],    [63,37,78],    [64,38,78],    [65,38,79],    [65,38,81],
    [66,38,82],    [66,39,83],    [67,39,84],    [68,40,84],    [69,40,85]
];
var class004_arr = [ //槍術士
    [36,12,48],    [37,12,49],    [37,12,51],    [38,12,52],    [38,13,53],
    [39,13,54],    [40,14,54],    [40,14,56],    [40,14,58],    [40,14,60],
    [40,15,61],    [41,15,62],    [42,16,62],    [43,16,63],    [43,16,65],
    [44,16,66],    [44,17,67],    [45,17,68],    [46,18,68],    [46,18,70],
    [46,18,72],    [46,18,74],    [46,19,75],    [47,19,76],    [48,20,76],
    [49,20,77],    [49,20,79],    [50,20,80],    [50,21,81],    [51,21,82],
    [52,22,82],    [52,22,84],    [52,22,86],    [52,22,88],    [52,23,89],
    [53,23,90],    [54,24,90],    [55,24,91],    [55,24,93],    [56,24,94],
    [56,25,95],    [57,25,96],    [58,26,96],    [58,26,98],    [58,26,100],
    [58,26,102],    [58,27,103],    [59,27,104],    [60,28,104],    [61,28,105]
];
var class005_arr = [ //双剣士
    [24,12,60],    [24,12,62],    [24,12,64],    [24,12,66],    [24,13,67],
    [25,13,68],    [26,14,68],    [27,14,69],    [27,14,71],    [28,14,72],
    [28,15,73],    [29,15,74],    [30,16,74],    [30,16,76],    [30,16,78],
    [30,16,80],    [30,17,81],    [31,17,82],    [32,18,82],    [33,18,83],
    [33,18,85],    [34,18,86],    [34,19,87],    [35,19,88],    [36,20,88],
    [36,20,90],    [36,20,92],    [36,20,94],    [36,21,95],    [37,21,96],
    [38,22,96],    [39,22,97],    [39,22,99],    [40,22,100],    [40,23,101],
    [41,23,102],    [42,24,102],    [42,24,104],    [42,24,106],    [42,24,108],
    [42,25,109],    [43,25,110],    [44,26,110],    [45,26,111],    [45,26,113],
    [46,26,114],    [46,27,115],    [47,27,116],    [48,28,116],    [48,28,118]
];
var class006_arr = [ //弓術士
    [12,12,72],    [13,12,73],    [13,12,75],    [14,12,76],    [14,13,77],
    [15,13,78],    [16,14,78],    [17,14,79],    [17,14,81],    [18,14,82],
    [18,15,83],    [19,15,84],    [20,16,84],    [21,16,85],    [21,16,87],
    [22,16,88],    [22,17,89],    [23,17,90],    [24,18,90],    [25,18,91],
    [25,18,93],    [26,18,94],    [26,19,95],    [27,19,96],    [28,20,96],
    [29,20,97],    [29,20,99],    [30,20,100],    [30,21,101],    [31,21,102],
    [32,22,102],    [33,22,103],    [33,22,105],    [34,22,106],    [34,23,107],
    [35,23,108],    [36,24,108],    [37,24,109],    [37,24,111],    [38,24,112],
    [38,25,113],    [39,25,114],    [40,26,114],    [41,26,115],    [41,26,117],
    [42,26,118],    [42,27,119],    [43,27,120],    [44,28,120],    [45,28,121]
];
var class007_arr = [ //幻術士
    [12,72 ,12],    [12,73 ,13],    [12,75 ,13],    [12,76 ,14],    [13,77 ,14],
    [13,78 ,15],    [14,78 ,16],    [14,80 ,16],    [14,82 ,16],    [14,84 ,16],
    [15,85 ,16],    [15,86 ,17],    [16,86 ,18],    [16,87 ,19],    [16,89 ,19],
    [16,90 ,20],    [17,91 ,20],    [17,92 ,21],    [18,92 ,22],    [18,94 ,22],
    [18,96 ,22],    [18,98 ,22],    [19,99 ,22],    [19,100,23],    [20,100,24],
    [20,101,25],    [20,103,25],    [20,104,26],    [21,105,26],    [21,106,27],
    [22,106,28],    [22,108,28],    [22,110,28],    [22,112,28],    [23,113,28],
    [23,114,29],    [24,114,30],    [24,115,31],    [24,117,31],    [24,118,32],
    [25,119,32],    [25,120,33],    [26,120,34],    [26,122,34],    [26,124,34],
    [26,126,34],    [27,127,34],    [27,128,35],    [28,128,36],    [28,129,37]
];
var class008_arr = [ //呪術士
    [12,60 ,24],    [12,61 ,25],    [12,63 ,25],    [12,64 ,26],    [13,65 ,26],
    [13,66 ,27],    [14,66 ,28],    [14,67 ,29],    [14,69 ,29],    [14,70 ,30],
    [15,71 ,30],    [15,72 ,31],    [16,72 ,32],    [16,73 ,33],    [16,75 ,33],
    [16,76 ,34],    [17,77 ,34],    [17,78 ,35],    [18,78 ,36],    [18,79 ,37],
    [18,81 ,37],    [18,82 ,38],    [19,83 ,38],    [19,84 ,39],    [20,84 ,40],
    [20,85 ,41],    [20,87 ,41],    [20,88 ,42],    [21,89 ,42],    [21,90 ,43],
    [22,90 ,44],    [22,91 ,45],    [22,93 ,45],    [22,94 ,46],    [23,95 ,46],
    [23,96 ,47],    [24,96 ,48],    [24,97 ,49],    [24,99 ,49],    [24,100,50],
    [25,101,50],    [25,102,51],    [26,102,52],    [26,103,53],    [26,105,53],
    [26,106,54],    [27,107,54],    [27,108,55],    [28,108,56],    [28,109,57]
];
var class009_arr = [ //巴術士
    [12,48,36],    [12,49,37],    [12,51,37],    [12,52,38],    [13,53,38],
    [13,54,39],    [14,54,40],    [14,55,41],    [14,57,41],    [14,58,42],
    [15,59,42],    [15,60,43],    [16,60,44],    [16,61,45],    [16,63,45],
    [16,64,46],    [17,65,46],    [17,66,47],    [18,66,48],    [18,67,49],
    [18,69,49],    [18,70,50],    [19,71,50],    [19,72,51],    [20,72,52],
    [20,73,53],    [20,75,53],    [20,76,54],    [21,77,54],    [21,78,55],
    [22,78,56],    [22,79,57],    [22,81,57],    [22,82,58],    [23,83,58],
    [23,84,59],    [24,84,60],    [24,85,61],    [24,87,61],    [24,88,62],
    [25,89,62],    [25,90,63],    [26,90,64],    [26,91,65],    [26,93,65],
    [26,94,66],    [27,95,66],    [27,96,67],    [28,96,68],    [28,97,69]
];

//training_list
var t001_arr = [+40,-20,-20,'身体'];
var t002_arr = [-20,+40,-20,'精神'];
var t003_arr = [-20,-20,+40,'戦術'];
var t004_arr = [+20,+20,-40,'身体+精神'];
var t005_arr = [+20,-40,+20,'身体+戦術'];
var t006_arr = [-40,+20,+20,'精神+戦術'];

//クラスレベルテーブルから数値を引き出す
function searchClassTableAll() {
    var memberCount = $('.member_layout').length;
    for (var i = 0; i < memberCount; i++) {
        var classNum = $('.member_layout').eq(i).find('.select_class option:selected').val();
        var levelNum = $('.member_layout').eq(i).find('.select_level option:selected').val().slice(5)-1;
        var classLevelArr = eval(classNum+'_arr')[levelNum];
        $('.member_layout').eq(i).find('.member_status_box').eq(0).val(classLevelArr[0]);
        $('.member_layout').eq(i).find('.member_status_box').eq(1).val(classLevelArr[1]);
        $('.member_layout').eq(i).find('.member_status_box').eq(2).val(classLevelArr[2]);
    }
};

//クッキーの読み込み
function loadSaveData() {
    // 自動JSON化を有効に
    $.cookie.json = true;

    //保存クッキーの展開
    if($.cookie("squadronlData")){
        var squadronlDataArray = $.cookie("squadronlData");
        var countSquadron = 6;
        var countMember   = 8;

        $('.mission_status').find('.body').val(squadronlDataArray[0]);
        $('.mission_status').find('.spirit').val(squadronlDataArray[1]);
        $('.mission_status').find('.tactics').val(squadronlDataArray[2]);

        $('.squadron_status').find('.body').val(squadronlDataArray[3]);
        $('.squadron_status').find('.spirit').val(squadronlDataArray[4]);
        $('.squadron_status').find('.tactics').val(squadronlDataArray[5]);

        $('.member_layout').eq(0).find('.name').val(squadronlDataArray[6]);
        $('.member_layout').eq(0).find('.select_class').val(squadronlDataArray[7]);
        $('.member_layout').eq(0).find('.select_level').val(squadronlDataArray[8]);
        $('.member_layout').eq(1).find('.name').val(squadronlDataArray[9]);
        $('.member_layout').eq(1).find('.select_class').val(squadronlDataArray[10]);
        $('.member_layout').eq(1).find('.select_level').val(squadronlDataArray[11]);
        $('.member_layout').eq(2).find('.name').val(squadronlDataArray[12]);
        $('.member_layout').eq(2).find('.select_class').val(squadronlDataArray[13]);
        $('.member_layout').eq(2).find('.select_level').val(squadronlDataArray[14]);
        $('.member_layout').eq(3).find('.name').val(squadronlDataArray[15]);
        $('.member_layout').eq(3).find('.select_class').val(squadronlDataArray[16]);
        $('.member_layout').eq(3).find('.select_level').val(squadronlDataArray[17]);
        $('.member_layout').eq(4).find('.name').val(squadronlDataArray[18]);
        $('.member_layout').eq(4).find('.select_class').val(squadronlDataArray[19]);
        $('.member_layout').eq(4).find('.select_level').val(squadronlDataArray[20]);
        $('.member_layout').eq(5).find('.name').val(squadronlDataArray[21]);
        $('.member_layout').eq(5).find('.select_class').val(squadronlDataArray[22]);
        $('.member_layout').eq(5).find('.select_level').val(squadronlDataArray[23]);
        $('.member_layout').eq(6).find('.name').val(squadronlDataArray[24]);
        $('.member_layout').eq(6).find('.select_class').val(squadronlDataArray[25]);
        $('.member_layout').eq(6).find('.select_level').val(squadronlDataArray[26]);
        $('.member_layout').eq(7).find('.name').val(squadronlDataArray[27]);
        $('.member_layout').eq(7).find('.select_class').val(squadronlDataArray[28]);
        $('.member_layout').eq(7).find('.select_level').val(squadronlDataArray[29]);

        $('.squadron_ranks').find('.select_rank').val(squadronlDataArray[30]);

        if ( !squadronlDataArray[31] ) {
            $('.random_bonus_wrapper').find('.select_random_bonus_1').val('nothing');
        }else{
            $('.random_bonus_wrapper').find('.select_random_bonus_1').val(squadronlDataArray[31]);
        }
        if ( !squadronlDataArray[32] ) {
            $('.random_bonus_wrapper').find('.select_random_bonus_2').val('nothing');
        }else{
            $('.random_bonus_wrapper').find('.select_random_bonus_2').val(squadronlDataArray[32]);
        }
        if ( !squadronlDataArray[33] ) {
            $('.random_bonus_wrapper').find('.select_random_bonus_3').val('nothing');
        }else{
            $('.random_bonus_wrapper').find('.select_random_bonus_3').val(squadronlDataArray[33]);
        }

        if ( !squadronlDataArray[34] ) {
            $('.mission_status').find('.mission_level').val('30');
        }else{
            $('.mission_status').find('.mission_level').val(squadronlDataArray[34]);
        }

        if ( !squadronlDataArray[35] ) {
            $('.member_layout').eq(0).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(0).find('.select_race').val(squadronlDataArray[35]);
        }
        if ( !squadronlDataArray[36] ) {
            $('.member_layout').eq(0).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(0).find('.select_jinx_terms').val(squadronlDataArray[36]);
        }
        if ( !squadronlDataArray[37] ) {
            $('.member_layout').eq(0).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(0).find('.select_jinx_detail').val(squadronlDataArray[37]);
        }

        if ( !squadronlDataArray[38] ) {
            $('.member_layout').eq(1).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(1).find('.select_race').val(squadronlDataArray[38]);
        }
        if ( !squadronlDataArray[39] ) {
            $('.member_layout').eq(1).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(1).find('.select_jinx_terms').val(squadronlDataArray[39]);
        }
        if ( !squadronlDataArray[40] ) {
            $('.member_layout').eq(1).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(1).find('.select_jinx_detail').val(squadronlDataArray[40]);
        }

        if ( !squadronlDataArray[41] ) {
            $('.member_layout').eq(2).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(2).find('.select_race').val(squadronlDataArray[41]);
        }
        if ( !squadronlDataArray[42] ) {
            $('.member_layout').eq(2).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(2).find('.select_jinx_terms').val(squadronlDataArray[42]);
        }
        if ( !squadronlDataArray[43] ) {
            $('.member_layout').eq(2).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(2).find('.select_jinx_detail').val(squadronlDataArray[43]);
        }

        if ( !squadronlDataArray[44] ) {
            $('.member_layout').eq(3).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(3).find('.select_race').val(squadronlDataArray[44]);
        }
        if ( !squadronlDataArray[45] ) {
            $('.member_layout').eq(3).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(3).find('.select_jinx_terms').val(squadronlDataArray[45]);
        }
        if ( !squadronlDataArray[46] ) {
            $('.member_layout').eq(3).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(3).find('.select_jinx_detail').val(squadronlDataArray[46]);
        }

        if ( !squadronlDataArray[47] ) {
            $('.member_layout').eq(4).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(4).find('.select_race').val(squadronlDataArray[47]);
        }
        if ( !squadronlDataArray[48] ) {
            $('.member_layout').eq(4).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(4).find('.select_jinx_terms').val(squadronlDataArray[48]);
        }
        if ( !squadronlDataArray[49] ) {
            $('.member_layout').eq(4).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(4).find('.select_jinx_detail').val(squadronlDataArray[49]);
        }

        if ( !squadronlDataArray[50] ) {
            $('.member_layout').eq(5).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(5).find('.select_race').val(squadronlDataArray[50]);
        }
        if ( !squadronlDataArray[51] ) {
            $('.member_layout').eq(5).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(5).find('.select_jinx_terms').val(squadronlDataArray[51]);
        }
        if ( !squadronlDataArray[52] ) {
            $('.member_layout').eq(5).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(5).find('.select_jinx_detail').val(squadronlDataArray[52]);
        }

        if ( !squadronlDataArray[53] ) {
            $('.member_layout').eq(6).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(6).find('.select_race').val(squadronlDataArray[53]);
        }
        if ( !squadronlDataArray[54] ) {
            $('.member_layout').eq(6).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(6).find('.select_jinx_terms').val(squadronlDataArray[54]);
        }
        if ( !squadronlDataArray[55] ) {
            $('.member_layout').eq(6).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(6).find('.select_jinx_detail').val(squadronlDataArray[55]);
        }

        if ( !squadronlDataArray[56] ) {
            $('.member_layout').eq(7).find('.select_race').val('race001');
        }else{
            $('.member_layout').eq(7).find('.select_race').val(squadronlDataArray[56]);
        }
        if ( !squadronlDataArray[57] ) {
            $('.member_layout').eq(7).find('.select_jinx_terms').val('jinx_terms_000');
        }else{
            $('.member_layout').eq(7).find('.select_jinx_terms').val(squadronlDataArray[57]);
        }
        if ( !squadronlDataArray[58] ) {
            $('.member_layout').eq(7).find('.select_jinx_detail').val('jinx_detail_000');
        }else{
            $('.member_layout').eq(7).find('.select_jinx_detail').val(squadronlDataArray[58]);
        }

        var num = 59;
        for ( var i = 1; i < 10; i++ ) {
            if ( !squadronlDataArray[num] ) {
                $('#mission_preset_'+i).find('.select_random_bonus_1').val('nothing');
            }else{
                $('#mission_preset_'+i).find('.select_random_bonus_1').val(squadronlDataArray[num]);
            }
            if ( !squadronlDataArray[num+1] ) {
                $('#mission_preset_'+i).find('.select_random_bonus_2').val('nothing');
            }else{
                $('#mission_preset_'+i).find('.select_random_bonus_2').val(squadronlDataArray[num+1]);
            }
            if ( !squadronlDataArray[num+2] ) {
                $('#mission_preset_'+i).find('.select_random_bonus_3').val('nothing');
            }else{
                $('#mission_preset_'+i).find('.select_random_bonus_3').val(squadronlDataArray[num+2]);
            }

            if ( !squadronlDataArray[num+3] ) {
                $('#mission_preset_'+i).find('.mission_level').val('40');
            }else{
                $('#mission_preset_'+i).find('.mission_level').val(squadronlDataArray[num+3]);
            }

            if ( !squadronlDataArray[num+4] ) {
                $('#mission_preset_'+i).find('.body').val('100');
            }else{
                $('#mission_preset_'+i).find('.body').val(squadronlDataArray[num+4]);
            }
            if ( !squadronlDataArray[num+5] ) {
                $('#mission_preset_'+i).find('.spirit').val('100');
            }else{
                $('#mission_preset_'+i).find('.spirit').val(squadronlDataArray[num+5]);
            }
            if ( !squadronlDataArray[num+6] ) {
                $('#mission_preset_'+i).find('.tactics').val('100');
            }else{
                $('#mission_preset_'+i).find('.tactics').val(squadronlDataArray[num+6]);
            }
            var num = num + 7;
        };

    };
};

//クッキーの削除
function deleteCookie() {
    var cookie_name  = "squadronlData";
    $('#delete_cookie').click(function(){
        if(!confirm('本当にcookieを削除しますか？')){
            /* キャンセルの時の処理 */
            return false;
        }else{
            /*　OKの時の処理 */
            $.cookie('squadronlData',"",{path:"/squadron_calculater.html",expires:-1});
            location.reload();
        }
    });
}

//クッキーの保存
function saveSquadronlData() {
    var countSquadron = 6;
    var countMember   = 8;
    var squadronArray = [];

    missionBody    = $('.mission_status').find('.body').val();
    missionSpirit  = $('.mission_status').find('.spirit').val();
    missionTactics = $('.mission_status').find('.tactics').val();
    squadronArray.push(missionBody);
    squadronArray.push(missionSpirit);
    squadronArray.push(missionTactics);

    squadronBody    = $('.squadron_status').find('.body').val();
    squadronSpirit  = $('.squadron_status').find('.spirit').val();
    squadronTactics = $('.squadron_status').find('.tactics').val();
    squadronArray.push(squadronBody);
    squadronArray.push(squadronSpirit);
    squadronArray.push(squadronTactics);

    for ( var i = 0; i < countMember; i++ ) {
        memberName  = $('.member_layout').eq(i).find('.name').val();
        memberClass = $('.member_layout').eq(i).find('.select_class option:selected').val();
        memberLevel = $('.member_layout').eq(i).find('.select_level option:selected').val();
        squadronArray.push(memberName);
        squadronArray.push(memberClass);
        squadronArray.push(memberLevel);
    };

    squadronRank = $('.squadron_ranks').find('.select_rank option:selected').val();
    squadronArray.push(squadronRank);

    randomBonus1 = $('.random_bonus_wrapper').find('.select_random_bonus_1 option:selected').val();
    randomBonus2 = $('.random_bonus_wrapper').find('.select_random_bonus_2 option:selected').val();
    randomBonus3 = $('.random_bonus_wrapper').find('.select_random_bonus_3 option:selected').val();
    squadronArray.push(randomBonus1);
    squadronArray.push(randomBonus2);
    squadronArray.push(randomBonus3);

    missionLevel = $('.mission_status').find('.mission_level').val();
    squadronArray.push(missionLevel);

    for ( var i = 0; i < countMember; i++ ) {
        memberRace = $('.member_layout').eq(i).find('.select_race option:selected').val();
        jinxTerms  = $('.member_layout').eq(i).find('.select_jinx_terms option:selected').val();
        jinxDetail = $('.member_layout').eq(i).find('.select_jinx_detail option:selected').val();
        squadronArray.push(memberRace);
        squadronArray.push(jinxTerms);
        squadronArray.push(jinxDetail);
    };

    for ( var i = 1; i < 10; i++ ) {
        var randomBonus1   = $('#mission_preset_'+i).find('.select_random_bonus_1').val();
        var randomBonus2   = $('#mission_preset_'+i).find('.select_random_bonus_2').val();
        var randomBonus3   = $('#mission_preset_'+i).find('.select_random_bonus_3').val();
        var missionLevel   = $('#mission_preset_'+i).find('.mission_level').val();
        var missionBody    = $('#mission_preset_'+i).find('.body').val();
        var missionSpirit  = $('#mission_preset_'+i).find('.spirit').val();
        var missionTactics = $('#mission_preset_'+i).find('.tactics').val();
        squadronArray.push(randomBonus1);
        squadronArray.push(randomBonus2);
        squadronArray.push(randomBonus3);
        squadronArray.push(missionLevel);
        squadronArray.push(missionBody);
        squadronArray.push(missionSpirit);
        squadronArray.push(missionTactics);
    };

console.log(squadronArray);
    //配列をクッキー保存
    $.cookie("squadronlData",squadronArray, { expires: 365 , path: "/squadron_calculater.html" });
};

//プリセットを出力
function missionPresetOutput() {
    $('.mission_preset_box').find('.btn_S').click(function(){
        var presetId = $(this).attr('id').slice(7,8);

        var randomBonus1   = $('#mission_preset_'+presetId).find('.select_random_bonus_1').val();
        var randomBonus2   = $('#mission_preset_'+presetId).find('.select_random_bonus_2').val();
        var randomBonus3   = $('#mission_preset_'+presetId).find('.select_random_bonus_3').val();
        var missionLevel   = $('#mission_preset_'+presetId).find('.mission_level').val();
        var missionBody    = $('#mission_preset_'+presetId).find('.body').val();
        var missionSpirit  = $('#mission_preset_'+presetId).find('.spirit').val();
        var missionTactics = $('#mission_preset_'+presetId).find('.tactics').val();

        $('.random_bonus_wrapper').find('.select_random_bonus_1').val(randomBonus1);
        $('.random_bonus_wrapper').find('.select_random_bonus_2').val(randomBonus2);
        $('.random_bonus_wrapper').find('.select_random_bonus_3').val(randomBonus3);
        $('.mission_status').find('.mission_level').val(missionLevel)
        $('.mission_status').find('.body').val(missionBody)
        $('.mission_status').find('.spirit').val(missionSpirit)
        $('.mission_status').find('.tactics').val(missionTactics)
        $('.mission_preset_box').slideToggle();

        saveSquadronlData();
    })

    $('#preset_list_reset').click(function(){
        for ( var i = 1; i < 10; i++ ) {
            $('#mission_preset_'+i).find('.select_random_bonus_1').val('nothing');
            $('#mission_preset_'+i).find('.select_random_bonus_2').val('nothing');
            $('#mission_preset_'+i).find('.select_random_bonus_3').val('nothing');
            $('#mission_preset_'+i).find('.mission_level').val('40');
            $('#mission_preset_'+i).find('.body').val('100');
            $('#mission_preset_'+i).find('.spirit').val('100');
            $('#mission_preset_'+i).find('.tactics').val('100');
        }
        saveSquadronlData();
    })

}

//プルダウン内配色
function classColorAdd() {
    var memberCount = $('.member_layout').length;
    for (var i = 0; i < memberCount; i++) {
        var jobType = $('.member_layout').eq(i).find('.select_class').val();

        if ( jobType == 'class001' || jobType == 'class002') {
            $('.member_layout').eq(i).find('.select_class').css('background','#88f');
        }else if ( jobType == 'class007') {
            $('.member_layout').eq(i).find('.select_class').css('background','#8f8');
        }else{
            $('.member_layout').eq(i).find('.select_class').css('background','#f88');
        };

    }
};

//スターonoff
function favoriteStarCheck(self) {
    if ( self.hasClass('checked') ) {
        self.removeClass('checked');
        self.children('.on').addClass('display_none');
        self.children('.off').removeClass('display_none');
    }else{
        self.addClass('checked');
        self.children('.off').addClass('display_none');
        self.children('.on').removeClass('display_none');
    }
};

//編成の詳細を表示する
function resultPatternDetailPopup() {

    var mission_body    = parseInt($('.mission_status').find('.body').val()),
        mission_spirit  = parseInt($('.mission_status').find('.spirit').val()),
        mission_tactics = parseInt($('.mission_status').find('.tactics').val());

    var squadron_body    = parseInt($('.squadron_status').find('.body').val()),
        squadron_spirit  = parseInt($('.squadron_status').find('.spirit').val()),
        squadron_tactics = parseInt($('.squadron_status').find('.tactics').val());

    //表示・非表示処理
    $('#result').find('tr').hover(
        function(evt) {
            var pointerTop  = evt.clientY,
                pointerLeft = evt.clientX;

            if ( !$(this).hasClass('status_3clear_noapp') && !$(this).hasClass('status_2clear_noapp') && !$(this).hasClass('status_1clear_noapp') && !$(this).hasClass('sort_tab') ) {
                // $('.test').text(pointerTop+' : '+pointerLeft);
                $('.popup').css({
                    display: 'inline-block',
                    top: pointerTop+0,
                    left: pointerLeft+30
                });

                //小隊能力値
                $('.popup .result_popup').find('.p_squadron_b').text(squadron_body);
                $('.popup .result_popup').find('.p_squadron_s').text(squadron_spirit);
                $('.popup .result_popup').find('.p_squadron_t').text(squadron_tactics);

                //隊員能力値
                for (var i = 0; i < 4; i++) {
                    var memberId = $(this).find('td:first-child').find('p').eq(i).get(0).className.split(" ")[0].slice(4)-1;

                    var memberName     = $('.member_layout').eq(memberId).find('.name').val(),
                        memberClass    = $('.member_layout').eq(memberId).find('.select_class').val(),
                        memberLevel    = $('.member_layout').eq(memberId).find('.select_level').val(),
                        memberBody     = parseInt($('.member_layout').eq(memberId).find('input[type=number]').eq(0).val()),
                        memberSpirit   = parseInt($('.member_layout').eq(memberId).find('input[type=number]').eq(1).val()),
                        memberTactics  = parseInt($('.member_layout').eq(memberId).find('input[type=number]').eq(2).val()),
                        memberJinx1    = $('.member_layout').eq(memberId).find('.select_jinx_terms option:selected').text(),
                        memberJinx2    = $('.member_layout').eq(memberId).find('.select_jinx_detail option:selected').text();

                    var memberJinx     = memberJinx1 + '：' + memberJinx2;

                    var d_memberBody     = parseInt($(this).find('td:first-child').find('p').eq(i).attr('para_b')),
                        d_memberSpirit   = parseInt($(this).find('td:first-child').find('p').eq(i).attr('para_s')),
                        d_memberTactics  = parseInt($(this).find('td:first-child').find('p').eq(i).attr('para_t'));

                    $('.popup .result_popup').find('.p_member_n').eq(i).text(memberName);

                    if (d_memberBody > memberBody) {
                        $('.popup .result_popup').find('.p_member_b').eq(i).html('<p class="color_green">'+d_memberBody+'</p>');
                    }else{
                        $('.popup .result_popup').find('.p_member_b').eq(i).html(d_memberBody);
                    }

                    if (d_memberSpirit > memberSpirit) {
                        $('.popup .result_popup').find('.p_member_s').eq(i).html('<p class="color_green">'+d_memberSpirit+'</p>');
                    }else{
                        $('.popup .result_popup').find('.p_member_s').eq(i).html(d_memberSpirit);
                    }

                    if (d_memberTactics > memberTactics) {
                        $('.popup .result_popup').find('.p_member_t').eq(i).html('<p class="color_green">'+d_memberTactics+'</p>');
                    }else{
                        $('.popup .result_popup').find('.p_member_t').eq(i).html(d_memberTactics);
                    }

                    if( memberJinx1 == '--' || memberJinx2 == '--' ){
                        var memberJinx = '--'
                        $('.popup .result_popup').find('.p_member_j').eq(i).html(memberJinx);
                    }else{
                        if( $(this).find('td:first-child').find('p').eq(i).hasClass('random_bonus_active') ){
                            var memberJinx2_0 = memberJinx2.split("+")[0];
                            var memberJinx2_1 = parseInt(memberJinx2.slice(-3, -1));
                            var memberJinx2_2 = memberJinx2.slice(-1);
                            $('.popup .result_popup').find('.p_member_j').eq(i).html('<p class="color_green">ランダムボーナス効果:'+memberJinx2_0+'+'+(memberJinx2_1*2)+memberJinx2_2+'<p class="color_green">');
                        }else if( $(this).find('td:first-child').find('p').eq(i).hasClass('jinx_active') ){
                            $('.popup .result_popup').find('.p_member_j').eq(i).html('<p class="color_green">'+memberJinx+'</p>');
                        }else{
                            $('.popup .result_popup').find('.p_member_j').eq(i).html(memberJinx);
                        }
                    }

                }

                //合計能力値
                $('.popup .result_popup').find('.p_party_b').text($(this).find('.calculate_b').text());
                $('.popup .result_popup').find('.p_party_s').text($(this).find('.calculate_s').text());
                $('.popup .result_popup').find('.p_party_t').text($(this).find('.calculate_t').text());

                //任務適性能力値
                $('.popup .result_popup').find('.p_mission_b').text(mission_body);
                $('.popup .result_popup').find('.p_mission_s').text(mission_spirit);
                $('.popup .result_popup').find('.p_mission_t').text(mission_tactics);

                //差分計算
                $('.popup .result_popup').find('.p_calculate_b').removeClass('color_green').removeClass('color_red')
                $('.popup .result_popup').find('.p_calculate_s').removeClass('color_green').removeClass('color_red')
                $('.popup .result_popup').find('.p_calculate_t').removeClass('color_green').removeClass('color_red')
                var calB = $(this).find('.calculate_b').text()-mission_body,
                    calS = $(this).find('.calculate_s').text()-mission_spirit,
                    calT = $(this).find('.calculate_t').text()-mission_tactics;
                if( calB > 0 ) {
                    $('.popup .result_popup').find('.p_calculate_b').addClass('color_green').text('(+'+calB+')');
                } else if( calB < 0 ) {
                    $('.popup .result_popup').find('.p_calculate_b').addClass('color_red').text('('+calB+')');
                } else {
                    $('.popup .result_popup').find('.p_calculate_b').text('('+calB+')');
                };
                if( calS > 0 ) {
                    $('.popup .result_popup').find('.p_calculate_s').addClass('color_green').text('(+'+calS+')');
                } else if( calS < 0 ) {
                    $('.popup .result_popup').find('.p_calculate_s').addClass('color_red').text('('+calS+')');
                } else {
                    $('.popup .result_popup').find('.p_calculate_s').text('('+calS+')');
                };
                if( calT > 0 ) {
                    $('.popup .result_popup').find('.p_calculate_t').addClass('color_green').text('(+'+calT+')');
                } else if( calT < 0 ) {
                    $('.popup .result_popup').find('.p_calculate_t').addClass('color_red').text('('+calT+')');
                } else {
                    $('.popup .result_popup').find('.p_calculate_t').text('('+calT+')');
                };
            }//end if
        },
        function() {
            $('.popup').css('display','none');
        }
    );
}

//集計テーブル構築
function patternCalculation() {

    $('.tab_switch').removeClass('display_none');
    $('#result').removeClass('display_none');

    var mission_body    = parseInt($('.mission_status').find('.body').val()),
        mission_spirit  = parseInt($('.mission_status').find('.spirit').val()),
        mission_tactics = parseInt($('.mission_status').find('.tactics').val());

    var squadron_body    = parseInt($('.squadron_status').find('.body').val()),
        squadron_spirit  = parseInt($('.squadron_status').find('.spirit').val()),
        squadron_tactics = parseInt($('.squadron_status').find('.tactics').val());

    var name_1 = $('.member_layout').eq(0).find('.name').val(),
        name_2 = $('.member_layout').eq(1).find('.name').val(),
        name_3 = $('.member_layout').eq(2).find('.name').val(),
        name_4 = $('.member_layout').eq(3).find('.name').val(),
        name_5 = $('.member_layout').eq(4).find('.name').val(),
        name_6 = $('.member_layout').eq(5).find('.name').val(),
        name_7 = $('.member_layout').eq(6).find('.name').val(),
        name_8 = $('.member_layout').eq(7).find('.name').val();

    var body_1 = parseInt($('.member_layout').eq(0).find('.member_status_box').eq(0).val()),
        body_2 = parseInt($('.member_layout').eq(1).find('.member_status_box').eq(0).val()),
        body_3 = parseInt($('.member_layout').eq(2).find('.member_status_box').eq(0).val()),
        body_4 = parseInt($('.member_layout').eq(3).find('.member_status_box').eq(0).val()),
        body_5 = parseInt($('.member_layout').eq(4).find('.member_status_box').eq(0).val()),
        body_6 = parseInt($('.member_layout').eq(5).find('.member_status_box').eq(0).val()),
        body_7 = parseInt($('.member_layout').eq(6).find('.member_status_box').eq(0).val()),
        body_8 = parseInt($('.member_layout').eq(7).find('.member_status_box').eq(0).val());

    var spirit_1 = parseInt($('.member_layout').eq(0).find('.member_status_box').eq(1).val()),
        spirit_2 = parseInt($('.member_layout').eq(1).find('.member_status_box').eq(1).val()),
        spirit_3 = parseInt($('.member_layout').eq(2).find('.member_status_box').eq(1).val()),
        spirit_4 = parseInt($('.member_layout').eq(3).find('.member_status_box').eq(1).val()),
        spirit_5 = parseInt($('.member_layout').eq(4).find('.member_status_box').eq(1).val()),
        spirit_6 = parseInt($('.member_layout').eq(5).find('.member_status_box').eq(1).val()),
        spirit_7 = parseInt($('.member_layout').eq(6).find('.member_status_box').eq(1).val()),
        spirit_8 = parseInt($('.member_layout').eq(7).find('.member_status_box').eq(1).val());

    var tactics_1 = parseInt($('.member_layout').eq(0).find('.member_status_box').eq(2).val()),
        tactics_2 = parseInt($('.member_layout').eq(1).find('.member_status_box').eq(2).val()),
        tactics_3 = parseInt($('.member_layout').eq(2).find('.member_status_box').eq(2).val()),
        tactics_4 = parseInt($('.member_layout').eq(3).find('.member_status_box').eq(2).val()),
        tactics_5 = parseInt($('.member_layout').eq(4).find('.member_status_box').eq(2).val()),
        tactics_6 = parseInt($('.member_layout').eq(5).find('.member_status_box').eq(2).val()),
        tactics_7 = parseInt($('.member_layout').eq(6).find('.member_status_box').eq(2).val()),
        tactics_8 = parseInt($('.member_layout').eq(7).find('.member_status_box').eq(2).val());

    var body_1234 = body_1 + body_2 + body_3 + body_4 + squadron_body,
        body_1235 = body_1 + body_2 + body_3 + body_5 + squadron_body,
        body_1236 = body_1 + body_2 + body_3 + body_6 + squadron_body,
        body_1237 = body_1 + body_2 + body_3 + body_7 + squadron_body,
        body_1238 = body_1 + body_2 + body_3 + body_8 + squadron_body,
        body_1245 = body_1 + body_2 + body_4 + body_5 + squadron_body,
        body_1246 = body_1 + body_2 + body_4 + body_6 + squadron_body,
        body_1247 = body_1 + body_2 + body_4 + body_7 + squadron_body,
        body_1248 = body_1 + body_2 + body_4 + body_8 + squadron_body,
        body_1256 = body_1 + body_2 + body_5 + body_6 + squadron_body,
        body_1257 = body_1 + body_2 + body_5 + body_7 + squadron_body,
        body_1258 = body_1 + body_2 + body_5 + body_8 + squadron_body,
        body_1267 = body_1 + body_2 + body_6 + body_7 + squadron_body,
        body_1268 = body_1 + body_2 + body_6 + body_8 + squadron_body,
        body_1278 = body_1 + body_2 + body_7 + body_8 + squadron_body,
        body_1345 = body_1 + body_3 + body_4 + body_5 + squadron_body,
        body_1346 = body_1 + body_3 + body_4 + body_6 + squadron_body,
        body_1347 = body_1 + body_3 + body_4 + body_7 + squadron_body,
        body_1348 = body_1 + body_3 + body_4 + body_8 + squadron_body,
        body_1356 = body_1 + body_3 + body_5 + body_6 + squadron_body,
        body_1357 = body_1 + body_3 + body_5 + body_7 + squadron_body,
        body_1358 = body_1 + body_3 + body_5 + body_8 + squadron_body,
        body_1367 = body_1 + body_3 + body_6 + body_7 + squadron_body,
        body_1368 = body_1 + body_3 + body_6 + body_8 + squadron_body,
        body_1378 = body_1 + body_3 + body_7 + body_8 + squadron_body,
        body_1456 = body_1 + body_4 + body_5 + body_6 + squadron_body,
        body_1457 = body_1 + body_4 + body_5 + body_7 + squadron_body,
        body_1458 = body_1 + body_4 + body_5 + body_8 + squadron_body,
        body_1467 = body_1 + body_4 + body_6 + body_7 + squadron_body,
        body_1468 = body_1 + body_4 + body_6 + body_8 + squadron_body,
        body_1478 = body_1 + body_4 + body_7 + body_8 + squadron_body,
        body_1567 = body_1 + body_5 + body_6 + body_7 + squadron_body,
        body_1568 = body_1 + body_5 + body_6 + body_8 + squadron_body,
        body_1578 = body_1 + body_5 + body_7 + body_8 + squadron_body,
        body_1678 = body_1 + body_6 + body_7 + body_8 + squadron_body,
        body_2345 = body_2 + body_3 + body_4 + body_5 + squadron_body,
        body_2346 = body_2 + body_3 + body_4 + body_6 + squadron_body,
        body_2347 = body_2 + body_3 + body_4 + body_7 + squadron_body,
        body_2348 = body_2 + body_3 + body_4 + body_8 + squadron_body,
        body_2356 = body_2 + body_3 + body_5 + body_6 + squadron_body,
        body_2357 = body_2 + body_3 + body_5 + body_7 + squadron_body,
        body_2358 = body_2 + body_3 + body_5 + body_8 + squadron_body,
        body_2367 = body_2 + body_3 + body_6 + body_7 + squadron_body,
        body_2368 = body_2 + body_3 + body_6 + body_8 + squadron_body,
        body_2378 = body_2 + body_3 + body_7 + body_8 + squadron_body,
        body_2456 = body_2 + body_4 + body_5 + body_6 + squadron_body,
        body_2457 = body_2 + body_4 + body_5 + body_7 + squadron_body,
        body_2458 = body_2 + body_4 + body_5 + body_8 + squadron_body,
        body_2467 = body_2 + body_4 + body_6 + body_7 + squadron_body,
        body_2468 = body_2 + body_4 + body_6 + body_8 + squadron_body,
        body_2478 = body_2 + body_4 + body_7 + body_8 + squadron_body,
        body_2567 = body_2 + body_5 + body_6 + body_7 + squadron_body,
        body_2568 = body_2 + body_5 + body_6 + body_8 + squadron_body,
        body_2578 = body_2 + body_5 + body_7 + body_8 + squadron_body,
        body_2678 = body_2 + body_6 + body_7 + body_8 + squadron_body,
        body_3456 = body_3 + body_4 + body_5 + body_6 + squadron_body,
        body_3457 = body_3 + body_4 + body_5 + body_7 + squadron_body,
        body_3458 = body_3 + body_4 + body_5 + body_8 + squadron_body,
        body_3467 = body_3 + body_4 + body_6 + body_7 + squadron_body,
        body_3468 = body_3 + body_4 + body_6 + body_8 + squadron_body,
        body_3478 = body_3 + body_4 + body_7 + body_8 + squadron_body,
        body_3567 = body_3 + body_5 + body_6 + body_7 + squadron_body,
        body_3568 = body_3 + body_5 + body_6 + body_8 + squadron_body,
        body_3578 = body_3 + body_5 + body_7 + body_8 + squadron_body,
        body_3678 = body_3 + body_6 + body_7 + body_8 + squadron_body,
        body_4567 = body_4 + body_5 + body_6 + body_7 + squadron_body,
        body_4568 = body_4 + body_5 + body_6 + body_8 + squadron_body,
        body_4578 = body_4 + body_5 + body_7 + body_8 + squadron_body,
        body_4678 = body_4 + body_6 + body_7 + body_8 + squadron_body,
        body_5678 = body_5 + body_6 + body_7 + body_8 + squadron_body;

    var spirit_1234 = spirit_1 + spirit_2 + spirit_3 + spirit_4 + squadron_spirit,
        spirit_1235 = spirit_1 + spirit_2 + spirit_3 + spirit_5 + squadron_spirit,
        spirit_1236 = spirit_1 + spirit_2 + spirit_3 + spirit_6 + squadron_spirit,
        spirit_1237 = spirit_1 + spirit_2 + spirit_3 + spirit_7 + squadron_spirit,
        spirit_1238 = spirit_1 + spirit_2 + spirit_3 + spirit_8 + squadron_spirit,
        spirit_1245 = spirit_1 + spirit_2 + spirit_4 + spirit_5 + squadron_spirit,
        spirit_1246 = spirit_1 + spirit_2 + spirit_4 + spirit_6 + squadron_spirit,
        spirit_1247 = spirit_1 + spirit_2 + spirit_4 + spirit_7 + squadron_spirit,
        spirit_1248 = spirit_1 + spirit_2 + spirit_4 + spirit_8 + squadron_spirit,
        spirit_1256 = spirit_1 + spirit_2 + spirit_5 + spirit_6 + squadron_spirit,
        spirit_1257 = spirit_1 + spirit_2 + spirit_5 + spirit_7 + squadron_spirit,
        spirit_1258 = spirit_1 + spirit_2 + spirit_5 + spirit_8 + squadron_spirit,
        spirit_1267 = spirit_1 + spirit_2 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_1268 = spirit_1 + spirit_2 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_1278 = spirit_1 + spirit_2 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_1345 = spirit_1 + spirit_3 + spirit_4 + spirit_5 + squadron_spirit,
        spirit_1346 = spirit_1 + spirit_3 + spirit_4 + spirit_6 + squadron_spirit,
        spirit_1347 = spirit_1 + spirit_3 + spirit_4 + spirit_7 + squadron_spirit,
        spirit_1348 = spirit_1 + spirit_3 + spirit_4 + spirit_8 + squadron_spirit,
        spirit_1356 = spirit_1 + spirit_3 + spirit_5 + spirit_6 + squadron_spirit,
        spirit_1357 = spirit_1 + spirit_3 + spirit_5 + spirit_7 + squadron_spirit,
        spirit_1358 = spirit_1 + spirit_3 + spirit_5 + spirit_8 + squadron_spirit,
        spirit_1367 = spirit_1 + spirit_3 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_1368 = spirit_1 + spirit_3 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_1378 = spirit_1 + spirit_3 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_1456 = spirit_1 + spirit_4 + spirit_5 + spirit_6 + squadron_spirit,
        spirit_1457 = spirit_1 + spirit_4 + spirit_5 + spirit_7 + squadron_spirit,
        spirit_1458 = spirit_1 + spirit_4 + spirit_5 + spirit_8 + squadron_spirit,
        spirit_1467 = spirit_1 + spirit_4 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_1468 = spirit_1 + spirit_4 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_1478 = spirit_1 + spirit_4 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_1567 = spirit_1 + spirit_5 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_1568 = spirit_1 + spirit_5 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_1578 = spirit_1 + spirit_5 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_1678 = spirit_1 + spirit_6 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_2345 = spirit_2 + spirit_3 + spirit_4 + spirit_5 + squadron_spirit,
        spirit_2346 = spirit_2 + spirit_3 + spirit_4 + spirit_6 + squadron_spirit,
        spirit_2347 = spirit_2 + spirit_3 + spirit_4 + spirit_7 + squadron_spirit,
        spirit_2348 = spirit_2 + spirit_3 + spirit_4 + spirit_8 + squadron_spirit,
        spirit_2356 = spirit_2 + spirit_3 + spirit_5 + spirit_6 + squadron_spirit,
        spirit_2357 = spirit_2 + spirit_3 + spirit_5 + spirit_7 + squadron_spirit,
        spirit_2358 = spirit_2 + spirit_3 + spirit_5 + spirit_8 + squadron_spirit,
        spirit_2367 = spirit_2 + spirit_3 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_2368 = spirit_2 + spirit_3 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_2378 = spirit_2 + spirit_3 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_2456 = spirit_2 + spirit_4 + spirit_5 + spirit_6 + squadron_spirit,
        spirit_2457 = spirit_2 + spirit_4 + spirit_5 + spirit_7 + squadron_spirit,
        spirit_2458 = spirit_2 + spirit_4 + spirit_5 + spirit_8 + squadron_spirit,
        spirit_2467 = spirit_2 + spirit_4 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_2468 = spirit_2 + spirit_4 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_2478 = spirit_2 + spirit_4 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_2567 = spirit_2 + spirit_5 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_2568 = spirit_2 + spirit_5 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_2578 = spirit_2 + spirit_5 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_2678 = spirit_2 + spirit_6 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_3456 = spirit_3 + spirit_4 + spirit_5 + spirit_6 + squadron_spirit,
        spirit_3457 = spirit_3 + spirit_4 + spirit_5 + spirit_7 + squadron_spirit,
        spirit_3458 = spirit_3 + spirit_4 + spirit_5 + spirit_8 + squadron_spirit,
        spirit_3467 = spirit_3 + spirit_4 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_3468 = spirit_3 + spirit_4 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_3478 = spirit_3 + spirit_4 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_3567 = spirit_3 + spirit_5 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_3568 = spirit_3 + spirit_5 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_3578 = spirit_3 + spirit_5 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_3678 = spirit_3 + spirit_6 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_4567 = spirit_4 + spirit_5 + spirit_6 + spirit_7 + squadron_spirit,
        spirit_4568 = spirit_4 + spirit_5 + spirit_6 + spirit_8 + squadron_spirit,
        spirit_4578 = spirit_4 + spirit_5 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_4678 = spirit_4 + spirit_6 + spirit_7 + spirit_8 + squadron_spirit,
        spirit_5678 = spirit_5 + spirit_6 + spirit_7 + spirit_8 + squadron_spirit;

    var tactics_1234 = tactics_1 + tactics_2 + tactics_3 + tactics_4 + squadron_tactics,
        tactics_1235 = tactics_1 + tactics_2 + tactics_3 + tactics_5 + squadron_tactics,
        tactics_1236 = tactics_1 + tactics_2 + tactics_3 + tactics_6 + squadron_tactics,
        tactics_1237 = tactics_1 + tactics_2 + tactics_3 + tactics_7 + squadron_tactics,
        tactics_1238 = tactics_1 + tactics_2 + tactics_3 + tactics_8 + squadron_tactics,
        tactics_1245 = tactics_1 + tactics_2 + tactics_4 + tactics_5 + squadron_tactics,
        tactics_1246 = tactics_1 + tactics_2 + tactics_4 + tactics_6 + squadron_tactics,
        tactics_1247 = tactics_1 + tactics_2 + tactics_4 + tactics_7 + squadron_tactics,
        tactics_1248 = tactics_1 + tactics_2 + tactics_4 + tactics_8 + squadron_tactics,
        tactics_1256 = tactics_1 + tactics_2 + tactics_5 + tactics_6 + squadron_tactics,
        tactics_1257 = tactics_1 + tactics_2 + tactics_5 + tactics_7 + squadron_tactics,
        tactics_1258 = tactics_1 + tactics_2 + tactics_5 + tactics_8 + squadron_tactics,
        tactics_1267 = tactics_1 + tactics_2 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_1268 = tactics_1 + tactics_2 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_1278 = tactics_1 + tactics_2 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_1345 = tactics_1 + tactics_3 + tactics_4 + tactics_5 + squadron_tactics,
        tactics_1346 = tactics_1 + tactics_3 + tactics_4 + tactics_6 + squadron_tactics,
        tactics_1347 = tactics_1 + tactics_3 + tactics_4 + tactics_7 + squadron_tactics,
        tactics_1348 = tactics_1 + tactics_3 + tactics_4 + tactics_8 + squadron_tactics,
        tactics_1356 = tactics_1 + tactics_3 + tactics_5 + tactics_6 + squadron_tactics,
        tactics_1357 = tactics_1 + tactics_3 + tactics_5 + tactics_7 + squadron_tactics,
        tactics_1358 = tactics_1 + tactics_3 + tactics_5 + tactics_8 + squadron_tactics,
        tactics_1367 = tactics_1 + tactics_3 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_1368 = tactics_1 + tactics_3 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_1378 = tactics_1 + tactics_3 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_1456 = tactics_1 + tactics_4 + tactics_5 + tactics_6 + squadron_tactics,
        tactics_1457 = tactics_1 + tactics_4 + tactics_5 + tactics_7 + squadron_tactics,
        tactics_1458 = tactics_1 + tactics_4 + tactics_5 + tactics_8 + squadron_tactics,
        tactics_1467 = tactics_1 + tactics_4 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_1468 = tactics_1 + tactics_4 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_1478 = tactics_1 + tactics_4 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_1567 = tactics_1 + tactics_5 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_1568 = tactics_1 + tactics_5 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_1578 = tactics_1 + tactics_5 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_1678 = tactics_1 + tactics_6 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_2345 = tactics_2 + tactics_3 + tactics_4 + tactics_5 + squadron_tactics,
        tactics_2346 = tactics_2 + tactics_3 + tactics_4 + tactics_6 + squadron_tactics,
        tactics_2347 = tactics_2 + tactics_3 + tactics_4 + tactics_7 + squadron_tactics,
        tactics_2348 = tactics_2 + tactics_3 + tactics_4 + tactics_8 + squadron_tactics,
        tactics_2356 = tactics_2 + tactics_3 + tactics_5 + tactics_6 + squadron_tactics,
        tactics_2357 = tactics_2 + tactics_3 + tactics_5 + tactics_7 + squadron_tactics,
        tactics_2358 = tactics_2 + tactics_3 + tactics_5 + tactics_8 + squadron_tactics,
        tactics_2367 = tactics_2 + tactics_3 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_2368 = tactics_2 + tactics_3 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_2378 = tactics_2 + tactics_3 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_2456 = tactics_2 + tactics_4 + tactics_5 + tactics_6 + squadron_tactics,
        tactics_2457 = tactics_2 + tactics_4 + tactics_5 + tactics_7 + squadron_tactics,
        tactics_2458 = tactics_2 + tactics_4 + tactics_5 + tactics_8 + squadron_tactics,
        tactics_2467 = tactics_2 + tactics_4 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_2468 = tactics_2 + tactics_4 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_2478 = tactics_2 + tactics_4 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_2567 = tactics_2 + tactics_5 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_2568 = tactics_2 + tactics_5 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_2578 = tactics_2 + tactics_5 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_2678 = tactics_2 + tactics_6 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_3456 = tactics_3 + tactics_4 + tactics_5 + tactics_6 + squadron_tactics,
        tactics_3457 = tactics_3 + tactics_4 + tactics_5 + tactics_7 + squadron_tactics,
        tactics_3458 = tactics_3 + tactics_4 + tactics_5 + tactics_8 + squadron_tactics,
        tactics_3467 = tactics_3 + tactics_4 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_3468 = tactics_3 + tactics_4 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_3478 = tactics_3 + tactics_4 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_3567 = tactics_3 + tactics_5 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_3568 = tactics_3 + tactics_5 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_3578 = tactics_3 + tactics_5 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_3678 = tactics_3 + tactics_6 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_4567 = tactics_4 + tactics_5 + tactics_6 + tactics_7 + squadron_tactics,
        tactics_4568 = tactics_4 + tactics_5 + tactics_6 + tactics_8 + squadron_tactics,
        tactics_4578 = tactics_4 + tactics_5 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_4678 = tactics_4 + tactics_6 + tactics_7 + tactics_8 + squadron_tactics,
        tactics_5678 = tactics_5 + tactics_6 + tactics_7 + tactics_8 + squadron_tactics;

    //計算一覧表のリセット
    $('#result .calculation_table').find('tr').remove();
    $('#result .calculation_table').find('thead').remove();

    $('#result .calculation_table').append(
        '<thead><tr class="sort_tab"><th>編成</th><th>身体</th><th>精神</th><th>戦術</th><th>訓練計算</th></tr></thead>'
    );

    //タブのリセット
    $('.tab').removeClass('current');
    $('#pattern_3clear_show').addClass('current');
    $('.calculation_table').find('.status_3clear').show();
    $('.calculation_table').find('.status_3clear_noapp').show();
    $('.calculation_table').find('.status_2clear').hide();
    $('.calculation_table').find('.status_2clear_noapp').hide();
    $('.calculation_table').find('.status_1clear').hide();
    $('.calculation_table').find('.status_1clear_noapp').hide();
    $('.calculation_table').find('.status_none').hide();

    //計算一覧表の生成
    $('#result .calculation_table').append(
        '<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p></td><td class="calculate_b">'+body_1234+'</td><td class="calculate_s">'+spirit_1234+'</td><td class="calculate_t">'+tactics_1234+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p></td><td class="calculate_b">'+body_1235+'</td><td class="calculate_s">'+spirit_1235+'</td><td class="calculate_t">'+tactics_1235+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_1236+'</td><td class="calculate_s">'+spirit_1236+'</td><td class="calculate_t">'+tactics_1236+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1237+'</td><td class="calculate_s">'+spirit_1237+'</td><td class="calculate_t">'+tactics_1237+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1238+'</td><td class="calculate_s">'+spirit_1238+'</td><td class="calculate_t">'+tactics_1238+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p></td><td class="calculate_b">'+body_1245+'</td><td class="calculate_s">'+spirit_1245+'</td><td class="calculate_t">'+tactics_1245+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_1246+'</td><td class="calculate_s">'+spirit_1246+'</td><td class="calculate_t">'+tactics_1246+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1247+'</td><td class="calculate_s">'+spirit_1247+'</td><td class="calculate_t">'+tactics_1247+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1248+'</td><td class="calculate_s">'+spirit_1248+'</td><td class="calculate_t">'+tactics_1248+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_1256+'</td><td class="calculate_s">'+spirit_1256+'</td><td class="calculate_t">'+tactics_1256+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1257+'</td><td class="calculate_s">'+spirit_1257+'</td><td class="calculate_t">'+tactics_1257+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1258+'</td><td class="calculate_s">'+spirit_1258+'</td><td class="calculate_t">'+tactics_1258+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1267+'</td><td class="calculate_s">'+spirit_1267+'</td><td class="calculate_t">'+tactics_1267+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1268+'</td><td class="calculate_s">'+spirit_1268+'</td><td class="calculate_t">'+tactics_1268+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_2">'+name_2+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1278+'</td><td class="calculate_s">'+spirit_1278+'</td><td class="calculate_t">'+tactics_1278+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p></td><td class="calculate_b">'+body_1345+'</td><td class="calculate_s">'+spirit_1345+'</td><td class="calculate_t">'+tactics_1345+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_1346+'</td><td class="calculate_s">'+spirit_1346+'</td><td class="calculate_t">'+tactics_1346+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1347+'</td><td class="calculate_s">'+spirit_1347+'</td><td class="calculate_t">'+tactics_1347+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1348+'</td><td class="calculate_s">'+spirit_1348+'</td><td class="calculate_t">'+tactics_1348+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_1356+'</td><td class="calculate_s">'+spirit_1356+'</td><td class="calculate_t">'+tactics_1356+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1357+'</td><td class="calculate_s">'+spirit_1357+'</td><td class="calculate_t">'+tactics_1357+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1358+'</td><td class="calculate_s">'+spirit_1358+'</td><td class="calculate_t">'+tactics_1358+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1367+'</td><td class="calculate_s">'+spirit_1367+'</td><td class="calculate_t">'+tactics_1367+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1368+'</td><td class="calculate_s">'+spirit_1368+'</td><td class="calculate_t">'+tactics_1368+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1378+'</td><td class="calculate_s">'+spirit_1378+'</td><td class="calculate_t">'+tactics_1378+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_1456+'</td><td class="calculate_s">'+spirit_1456+'</td><td class="calculate_t">'+tactics_1456+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1457+'</td><td class="calculate_s">'+spirit_1457+'</td><td class="calculate_t">'+tactics_1457+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1458+'</td><td class="calculate_s">'+spirit_1458+'</td><td class="calculate_t">'+tactics_1458+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1467+'</td><td class="calculate_s">'+spirit_1467+'</td><td class="calculate_t">'+tactics_1467+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1468+'</td><td class="calculate_s">'+spirit_1468+'</td><td class="calculate_t">'+tactics_1468+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1478+'</td><td class="calculate_s">'+spirit_1478+'</td><td class="calculate_t">'+tactics_1478+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_1567+'</td><td class="calculate_s">'+spirit_1567+'</td><td class="calculate_t">'+tactics_1567+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1568+'</td><td class="calculate_s">'+spirit_1568+'</td><td class="calculate_t">'+tactics_1568+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1578+'</td><td class="calculate_s">'+spirit_1578+'</td><td class="calculate_t">'+tactics_1578+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_1">'+name_1+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_1678+'</td><td class="calculate_s">'+spirit_1678+'</td><td class="calculate_t">'+tactics_1678+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p></td><td class="calculate_b">'+body_2345+'</td><td class="calculate_s">'+spirit_2345+'</td><td class="calculate_t">'+tactics_2345+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_2346+'</td><td class="calculate_s">'+spirit_2346+'</td><td class="calculate_t">'+tactics_2346+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_2347+'</td><td class="calculate_s">'+spirit_2347+'</td><td class="calculate_t">'+tactics_2347+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2348+'</td><td class="calculate_s">'+spirit_2348+'</td><td class="calculate_t">'+tactics_2348+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_2356+'</td><td class="calculate_s">'+spirit_2356+'</td><td class="calculate_t">'+tactics_2356+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_2357+'</td><td class="calculate_s">'+spirit_2357+'</td><td class="calculate_t">'+tactics_2357+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2358+'</td><td class="calculate_s">'+spirit_2358+'</td><td class="calculate_t">'+tactics_2358+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_2367+'</td><td class="calculate_s">'+spirit_2367+'</td><td class="calculate_t">'+tactics_2367+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2368+'</td><td class="calculate_s">'+spirit_2368+'</td><td class="calculate_t">'+tactics_2368+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_3">'+name_3+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2378+'</td><td class="calculate_s">'+spirit_2378+'</td><td class="calculate_t">'+tactics_2378+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_2456+'</td><td class="calculate_s">'+spirit_2456+'</td><td class="calculate_t">'+tactics_2456+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_2457+'</td><td class="calculate_s">'+spirit_2457+'</td><td class="calculate_t">'+tactics_2457+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2458+'</td><td class="calculate_s">'+spirit_2458+'</td><td class="calculate_t">'+tactics_2458+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_2467+'</td><td class="calculate_s">'+spirit_2467+'</td><td class="calculate_t">'+tactics_2467+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2468+'</td><td class="calculate_s">'+spirit_2468+'</td><td class="calculate_t">'+tactics_2468+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2478+'</td><td class="calculate_s">'+spirit_2478+'</td><td class="calculate_t">'+tactics_2478+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_2567+'</td><td class="calculate_s">'+spirit_2567+'</td><td class="calculate_t">'+tactics_2567+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2568+'</td><td class="calculate_s">'+spirit_2568+'</td><td class="calculate_t">'+tactics_2568+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2578+'</td><td class="calculate_s">'+spirit_2578+'</td><td class="calculate_t">'+tactics_2578+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_2">'+name_2+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_2678+'</td><td class="calculate_s">'+spirit_2678+'</td><td class="calculate_t">'+tactics_2678+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p></td><td class="calculate_b">'+body_3456+'</td><td class="calculate_s">'+spirit_3456+'</td><td class="calculate_t">'+tactics_3456+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_3457+'</td><td class="calculate_s">'+spirit_3457+'</td><td class="calculate_t">'+tactics_3457+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_3458+'</td><td class="calculate_s">'+spirit_3458+'</td><td class="calculate_t">'+tactics_3458+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_3467+'</td><td class="calculate_s">'+spirit_3467+'</td><td class="calculate_t">'+tactics_3467+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_3468+'</td><td class="calculate_s">'+spirit_3468+'</td><td class="calculate_t">'+tactics_3468+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_4">'+name_4+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_3478+'</td><td class="calculate_s">'+spirit_3478+'</td><td class="calculate_t">'+tactics_3478+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_3567+'</td><td class="calculate_s">'+spirit_3567+'</td><td class="calculate_t">'+tactics_3567+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_3568+'</td><td class="calculate_s">'+spirit_3568+'</td><td class="calculate_t">'+tactics_3568+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_3578+'</td><td class="calculate_s">'+spirit_3578+'</td><td class="calculate_t">'+tactics_3578+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_3">'+name_3+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_3678+'</td><td class="calculate_s">'+spirit_3678+'</td><td class="calculate_t">'+tactics_3678+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p></td><td class="calculate_b">'+body_4567+'</td><td class="calculate_s">'+spirit_4567+'</td><td class="calculate_t">'+tactics_4567+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_4568+'</td><td class="calculate_s">'+spirit_4568+'</td><td class="calculate_t">'+tactics_4568+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_4">'+name_4+'</p> / <p class="mem_5">'+name_5+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_4578+'</td><td class="calculate_s">'+spirit_4578+'</td><td class="calculate_t">'+tactics_4578+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_4">'+name_4+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_4678+'</td><td class="calculate_s">'+spirit_4678+'</td><td class="calculate_t">'+tactics_4678+'</td><td class="training_notice"></td></tr>'
        ,'<tr><td><p class="mem_5">'+name_5+'</p> / <p class="mem_6">'+name_6+'</p> / <p class="mem_7">'+name_7+'</p> / <p class="mem_8">'+name_8+'</p></td><td class="calculate_b">'+body_5678+'</td><td class="calculate_s">'+spirit_5678+'</td><td class="calculate_t">'+tactics_5678+'</td><td class="training_notice"></td></tr>'
    );

    //生成したテーブルに対してジンクス処理
    var jinx_cal  = $('input[name="jinx_cal"]:checked').val();
    if ( jinx_cal == 'jinx_cal_on' ) {
        jinxTeemsCheck();
    }


    var pattern_count = $('#result .calculation_table').find('tr').length;

    //スター処理
    for (var i = 0; i < 8; i++) {
        if ( $('.member_layout').eq(i).find('.check_star').hasClass('checked') ) {
            for (var j = 0; j < pattern_count; j++) {
                $('#result .calculation_table').find('tr').eq(j).find('.mem_'+(i+1)).addClass('color_yellow');
                $('#result .calculation_table').find('tr').eq(j).find('.mem_'+(i+1)).parent('td').addClass('check_star')
            }
        }
    }

    //既定値を越えてる場合は「レッド」
    //既定値-20の場合は「オレンジ」
    for (var i = 0; i < pattern_count; i++) {
        var calculate_body    = $('#result .calculation_table').find('tr').eq(i).find('.calculate_b').text();
        var calculate_spirit  = $('#result .calculation_table').find('tr').eq(i).find('.calculate_s').text();
        var calculate_tactics = $('#result .calculation_table').find('tr').eq(i).find('.calculate_t').text();

        if ( mission_body-20 <= calculate_body ){
            $('#result .calculation_table').find('tr').eq(i).find('.calculate_b').addClass('color_orange');
        }
        if ( mission_body <= calculate_body ){
            $('#result .calculation_table').find('tr').eq(i).find('.calculate_b').removeClass('color_orange').addClass('color_red');
        }

        if ( mission_spirit-20 <= calculate_spirit ){
            $('#result .calculation_table').find('tr').eq(i).find('.calculate_s').addClass('color_orange');
        }
        if ( mission_spirit <= calculate_spirit ){
            $('#result .calculation_table').find('tr').eq(i).find('.calculate_s').removeClass('color_orange').addClass('color_red');
        }

        if ( mission_tactics-20 <= calculate_tactics ){
            $('#result .calculation_table').find('tr').eq(i).find('.calculate_t').addClass('color_orange');
        }
        if ( mission_tactics <= calculate_tactics ){
            $('#result .calculation_table').find('tr').eq(i).find('.calculate_t').removeClass('color_orange').addClass('color_red');
        }
    };

    //3パラメータ「赤」の場合、行に対してclass付与
    for (var i = 0; i < pattern_count; i++) {
        var countClearPara = $('#result .calculation_table').find('tr').eq(i).find('.color_red').length;

        if ( countClearPara == 3 ) {
            $('#result .calculation_table').find('tr').eq(i).addClass('status_3clear');
        }else if ( countClearPara == 2 ) {
            $('#result .calculation_table').find('tr').eq(i).addClass('status_2clear');
        }else if ( countClearPara == 1 ) {
            $('#result .calculation_table').find('tr').eq(i).addClass('status_1clear');
        }else {
            $('#result .calculation_table').find('tr').eq(i).addClass('status_none');
        }
        $('#result .calculation_table thead').find('tr').removeClass('status_none').addClass('sort_tab');
    };

    //3パラメータ満たしているものだけ表示
    for (var i = 0; i < pattern_count; i++) {
        if ( !$('#result .calculation_table').find('tr').eq(i).hasClass('status_3clear') ) {
            $('#result .calculation_table').find('tr').eq(i).addClass('display_none');
        }
    }
    $('#result .calculation_table').find('.sort_tab').removeClass('display_none');

    //組み合わせが見つからなかった際の表示
    if ( $('.status_3clear').length < 1 ) {
        $('#result .calculation_table').append(
            '<tr class="status_3clear_noapp"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
        );
    }
    if ( $('.status_2clear').length < 1 ) {
        $('#result .calculation_table').append(
            '<tr class="status_2clear_noapp display_none"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
        );
    }
    if ( $('.status_1clear').length < 1 ) {
        $('#result .calculation_table').append(
            '<tr class="status_1clear_noapp display_none"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
        );
    }

    $('.sortable').tablesorter();
};

//訓練集計処理
function trainingCalculatuion() {

    var mission_body    = parseInt($('.mission_status').find('.body').val()),
        mission_spirit  = parseInt($('.mission_status').find('.spirit').val()),
        mission_tactics = parseInt($('.mission_status').find('.tactics').val());

    var pattern_table = $('#result .calculation_table').find('tr');
    var pattern_count = pattern_table.length;

    var squadronRank = $('.squadron_ranks').find('.select_rank option:selected').val();

    var training_terms  = $('input[name="training_terms"]:checked').val();

    if ( squadronRank == 'rank_1' ) {
        var training_max = 200;
    }else if ( squadronRank == 'rank_2' ) {
        var training_max = 280;
    }else if ( squadronRank == 'rank_3' ) {
        var training_max = 400;
    };

    for (var i = 0; i < pattern_count; i++) {
        if ( training_terms == "training_terms_3" && !pattern_table.eq(i).hasClass('status_3clear') ||
             training_terms == "training_terms_2" && !pattern_table.eq(i).hasClass('status_3clear') && !pattern_table.eq(i).hasClass('status_2clear') )
        {

            for (var j = 1; j < 7; j++) {

                var squadron_body    = parseInt($('.squadron_status').find('.body').val()),
                    squadron_spirit  = parseInt($('.squadron_status').find('.spirit').val()),
                    squadron_tactics = parseInt($('.squadron_status').find('.tactics').val());

                var squadron_sum = squadron_body + squadron_spirit + squadron_tactics;

                var result_body    = parseInt(pattern_table.eq(i).find('.calculate_b').text()),
                    result_spirit  = parseInt(pattern_table.eq(i).find('.calculate_s').text()),
                    result_tactics = parseInt(pattern_table.eq(i).find('.calculate_t').text());

                var member_body    = result_body - squadron_body,
                    member_spirit  = result_spirit - squadron_spirit,
                    member_tactics = result_tactics - squadron_tactics;

                if ( training_max - squadron_sum >= 40 ) {
                    //上限値に達していない場合
                    if ( j == 1 ){
                        //身体訓練
                        var training_body_result_1    = squadron_body + 40;
                        var training_spirit_result_1  = squadron_spirit;
                        var training_tactics_result_1 = squadron_tactics;
                    }else if ( j == 2 ){
                        //精神訓練
                        var training_body_result_1    = squadron_body;
                        var training_spirit_result_1  = squadron_spirit + 40;
                        var training_tactics_result_1 = squadron_tactics;
                    }else if ( j == 3 ){
                        //戦術訓練
                        var training_body_result_1    = squadron_body;
                        var training_spirit_result_1  = squadron_spirit;
                        var training_tactics_result_1 = squadron_tactics + 40;
                    }else if ( j == 4 ){
                        //身体+精神訓練
                        var training_body_result_1    = squadron_body + 20;
                        var training_spirit_result_1  = squadron_spirit + 20;
                        var training_tactics_result_1 = squadron_tactics;
                    }else if ( j == 5 ){
                        //身体+戦術訓練
                        var training_body_result_1    = squadron_body + 20;
                        var training_spirit_result_1  = squadron_spirit;
                        var training_tactics_result_1 = squadron_tactics + 20;
                    }else if ( j == 6 ){
                        //精神+戦術訓練
                        var training_body_result_1    = squadron_body;
                        var training_spirit_result_1  = squadron_spirit + 20;
                        var training_tactics_result_1 = squadron_tactics + 20;
                    };//end if (上限値に達してない場合)
                }else{
                    //上限値に達してる場合
                    if ( j == 1 ) {
                        //単体訓練
                        if ( squadron_spirit + squadron_tactics < 40 ) {
                            var training_body_result_1    = squadron_body;
                            var training_spirit_result_1  = squadron_spirit;
                            var training_tactics_result_1 = squadron_tactics;
                        }else{
                            var training_body_result_1    = squadron_body + 40;
                            if ( squadron_spirit <= 0 ) {
                                var training_spirit_result_1  = squadron_spirit;
                                var training_tactics_result_1 = squadron_tactics - 40;
                            }else if ( squadron_tactics <= 0 ) {
                                var training_spirit_result_1  = squadron_spirit - 40;
                                var training_tactics_result_1 = squadron_tactics;
                            }else{
                                var training_spirit_result_1  = squadron_spirit - 20;
                                var training_tactics_result_1 = squadron_tactics -20;
                            }
                        }
                    }else if ( j == 2 ) {
                        //単体訓練
                        if ( squadron_body + squadron_tactics < 40 ) {
                            var training_body_result_1    = squadron_body;
                            var training_spirit_result_1  = squadron_spirit;
                            var training_tactics_result_1 = squadron_tactics;
                        }else{
                            var training_spirit_result_1  = squadron_spirit + 40;
                            if ( squadron_body <= 0 ) {
                                var training_body_result_1  = squadron_body;
                                var training_tactics_result_1 = squadron_tactics - 40;
                            }else if ( squadron_tactics <= 0 ) {
                                var training_body_result_1  = squadron_body - 40;
                                var training_tactics_result_1 = squadron_tactics;
                            }else{
                                var training_body_result_1  = squadron_body - 20;
                                var training_tactics_result_1 = squadron_tactics -20;
                            }
                        }
                    }else if ( j == 3 ) {
                        //単体訓練
                        if ( squadron_body + squadron_spirit < 40 ) {
                            var training_body_result_1    = squadron_body;
                            var training_spirit_result_1  = squadron_spirit;
                            var training_tactics_result_1 = squadron_tactics;
                        }else{
                            var training_tactics_result_1 = squadron_tactics + 40;
                            if ( squadron_body <= 0 ) {
                                var training_body_result_1  = squadron_body;
                                var training_spirit_result_1 = squadron_spirit - 40;
                            }else if ( squadron_spirit <= 0 ) {
                                var training_body_result_1  = squadron_body - 40;
                                var training_spirit_result_1 = squadron_spirit;
                            }else{
                                var training_body_result_1  = squadron_body - 20;
                                var training_spirit_result_1 = squadron_spirit -20;
                            }
                        }
                    }else{
                        //複合訓練
                        var training_body_result_1    = squadron_body    + eval('t00'+j+'_arr')[0];
                        var training_spirit_result_1  = squadron_spirit  + eval('t00'+j+'_arr')[1];
                        var training_tactics_result_1 = squadron_tactics + eval('t00'+j+'_arr')[2];
                        if ( training_body_result_1 < 0 || training_spirit_result_1 < 0 || training_tactics_result_1 < 0 ) {
                            var training_body_result_1    = squadron_body;
                            var training_spirit_result_1  = squadron_spirit;
                            var training_tactics_result_1 = squadron_tactics;
                        };
                    };//end if

                }//end if (上限値に達してない場合)

                var t1_body    = member_body    + training_body_result_1;
                var t1_spirit  = member_spirit  + training_spirit_result_1;
                var t1_tactics = member_tactics + training_tactics_result_1;

                if ( training_terms == "training_terms_3" && mission_body   <= t1_body   && mission_spirit  <= t1_spirit  && mission_tactics <= t1_tactics ||
                     training_terms == "training_terms_2" && mission_body   <= t1_body   && mission_spirit  <= t1_spirit  ||
                     training_terms == "training_terms_2" && mission_body   <= t1_body   && mission_tactics <= t1_tactics ||
                     training_terms == "training_terms_2" && mission_spirit <= t1_spirit && mission_tactics <= t1_tactics)
                {
                    pattern_table.eq(i).addClass('training1_done');
                    pattern_table.eq(i).find('.training_notice').append('<div class="t1"><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"></div>');
                }else{

                    for (var k = 1; k < 7; k++) {

                        //1回目の訓練結果を基礎値とする
                        var squadron_body    = training_body_result_1;
                        var squadron_spirit  = training_spirit_result_1;
                        var squadron_tactics = training_tactics_result_1;

                        var squadron_sum = squadron_body + squadron_spirit + squadron_tactics;

                        if ( training_max - squadron_sum >= 40 ) {
                            //上限値に達していない場合
                            if ( k == 1 ){
                                //身体訓練
                                var training_body_result_2    = squadron_body + 40;
                                var training_spirit_result_2  = squadron_spirit;
                                var training_tactics_result_2 = squadron_tactics;
                            }else if ( k == 2 ){
                                //精神訓練
                                var training_body_result_2    = squadron_body;
                                var training_spirit_result_2  = squadron_spirit + 40;
                                var training_tactics_result_2 = squadron_tactics;
                            }else if ( k == 3 ){
                                //戦術訓練
                                var training_body_result_2    = squadron_body;
                                var training_spirit_result_2  = squadron_spirit;
                                var training_tactics_result_2 = squadron_tactics + 40;
                            }else if ( k == 4 ){
                                //身体+精神訓練
                                var training_body_result_2    = squadron_body + 20;
                                var training_spirit_result_2  = squadron_spirit + 20;
                                var training_tactics_result_2 = squadron_tactics;
                            }else if ( k == 5 ){
                                //身体+戦術訓練
                                var training_body_result_2    = squadron_body + 20;
                                var training_spirit_result_2  = squadron_spirit;
                                var training_tactics_result_2 = squadron_tactics + 20;
                            }else if ( k == 6 ){
                                //精神+戦術訓練
                                var training_body_result_2    = squadron_body;
                                var training_spirit_result_2  = squadron_spirit + 20;
                                var training_tactics_result_2 = squadron_tactics + 20;
                            };//end if (上限値に達してない場合)
                        }else{
                            //上限値に達してる場合
                            if ( k == 1 ) {
                                //単体訓練
                                if ( squadron_spirit + squadron_tactics < 40 ) {
                                    var training_body_result_2    = squadron_body;
                                    var training_spirit_result_2  = squadron_spirit;
                                    var training_tactics_result_2 = squadron_tactics;
                                }else{
                                    var training_body_result_2    = squadron_body + 40;
                                    if ( squadron_spirit <= 0 ) {
                                        var training_spirit_result_2  = squadron_spirit;
                                        var training_tactics_result_2 = squadron_tactics - 40;
                                    }else if ( squadron_tactics <= 0 ) {
                                        var training_spirit_result_2  = squadron_spirit - 40;
                                        var training_tactics_result_2 = squadron_tactics;
                                    }else{
                                        var training_spirit_result_2  = squadron_spirit - 20;
                                        var training_tactics_result_2 = squadron_tactics -20;
                                    }
                                }
                            }else if ( k == 2 ) {
                                //単体訓練
                                if ( squadron_body + squadron_tactics < 40 ) {
                                    var training_body_result_2    = squadron_body;
                                    var training_spirit_result_2  = squadron_spirit;
                                    var training_tactics_result_2 = squadron_tactics;
                                }else{
                                    var training_spirit_result_2  = squadron_spirit + 40;
                                    if ( squadron_body <= 0 ) {
                                        var training_body_result_2  = squadron_body;
                                        var training_tactics_result_2 = squadron_tactics - 40;
                                    }else if ( squadron_tactics <= 0 ) {
                                        var training_body_result_2  = squadron_body - 40;
                                        var training_tactics_result_2 = squadron_tactics;
                                    }else{
                                        var training_body_result_2  = squadron_body - 20;
                                        var training_tactics_result_2 = squadron_tactics -20;
                                    }
                                }
                            }else if ( k == 3 ) {
                                //単体訓練
                                if ( squadron_body + squadron_spirit < 40 ) {
                                    var training_body_result_2    = squadron_body;
                                    var training_spirit_result_2  = squadron_spirit;
                                    var training_tactics_result_2 = squadron_tactics;
                                }else{
                                    var training_tactics_result_2 = squadron_tactics + 40;
                                    if ( squadron_body <= 0 ) {
                                        var training_body_result_2  = squadron_body;
                                        var training_spirit_result_2 = squadron_spirit - 40;
                                    }else if ( squadron_spirit <= 0 ) {
                                        var training_body_result_2  = squadron_body - 40;
                                        var training_spirit_result_2 = squadron_spirit;
                                    }else{
                                        var training_body_result_2  = squadron_body - 20;
                                        var training_spirit_result_2 = squadron_spirit -20;
                                    }
                                }
                            }else{
                                //複合訓練
                                var training_body_result_2    = squadron_body    + eval('t00'+k+'_arr')[0];
                                var training_spirit_result_2  = squadron_spirit  + eval('t00'+k+'_arr')[1];
                                var training_tactics_result_2 = squadron_tactics + eval('t00'+k+'_arr')[2];
                                if ( training_body_result_2 < 0 || training_spirit_result_2 < 0 || training_tactics_result_2 < 0 ) {
                                    var training_body_result_2    = squadron_body;
                                    var training_spirit_result_2  = squadron_spirit;
                                    var training_tactics_result_2 = squadron_tactics;
                                };
                            };//end if

                        }//end if (上限値に達してない場合)

                        var t2_body    = member_body    + training_body_result_2;
                        var t2_spirit  = member_spirit  + training_spirit_result_2;
                        var t2_tactics = member_tactics + training_tactics_result_2;

                        if ( training_terms == "training_terms_3" && mission_body   <= t2_body   && mission_spirit  <= t2_spirit  && mission_tactics <= t2_tactics ||
                             training_terms == "training_terms_2" && mission_body   <= t2_body   && mission_spirit  <= t2_spirit  ||
                             training_terms == "training_terms_2" && mission_body   <= t2_body   && mission_tactics <= t2_tactics ||
                             training_terms == "training_terms_2" && mission_spirit <= t2_spirit && mission_tactics <= t2_tactics)
                        {
                            pattern_table.eq(i).addClass('training2_done');
                            pattern_table.eq(i).find('.training_notice').append('<div class="t2"><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png">　⇒　<img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"></div>');
                        }else{

                            for (var l = 1; l < 7; l++) {

                                //2回目の訓練結果を基礎値とする
                                var squadron_body    = training_body_result_2;
                                var squadron_spirit  = training_spirit_result_2;
                                var squadron_tactics = training_tactics_result_2;

                                var squadron_sum = squadron_body + squadron_spirit + squadron_tactics;

                                if ( training_max - squadron_sum >= 40 ) {
                                    //上限値に達していない場合
                                    if ( l == 1 ){
                                        //身体訓練
                                        var training_body_result_3    = squadron_body + 40;
                                        var training_spirit_result_3  = squadron_spirit;
                                        var training_tactics_result_3 = squadron_tactics;
                                    }else if ( l == 2 ){
                                        //精神訓練
                                        var training_body_result_3    = squadron_body;
                                        var training_spirit_result_3  = squadron_spirit + 40;
                                        var training_tactics_result_3 = squadron_tactics;
                                    }else if ( l == 3 ){
                                        //戦術訓練
                                        var training_body_result_3    = squadron_body;
                                        var training_spirit_result_3  = squadron_spirit;
                                        var training_tactics_result_3 = squadron_tactics + 40;
                                    }else if ( l == 4 ){
                                        //身体+精神訓練
                                        var training_body_result_3    = squadron_body + 20;
                                        var training_spirit_result_3  = squadron_spirit + 20;
                                        var training_tactics_result_3 = squadron_tactics;
                                    }else if ( l == 5 ){
                                        //身体+戦術訓練
                                        var training_body_result_3    = squadron_body + 20;
                                        var training_spirit_result_3  = squadron_spirit;
                                        var training_tactics_result_3 = squadron_tactics + 20;
                                    }else if ( l == 6 ){
                                        //精神+戦術訓練
                                        var training_body_result_3    = squadron_body;
                                        var training_spirit_result_3  = squadron_spirit + 20;
                                        var training_tactics_result_3 = squadron_tactics + 20;
                                    };//end if (上限値に達してない場合)
                                }else{
                                    //上限値に達してる場合
                                    if ( l == 1 ) {
                                        //単体訓練
                                        if ( squadron_spirit + squadron_tactics < 40 ) {
                                            var training_body_result_3    = squadron_body;
                                            var training_spirit_result_3  = squadron_spirit;
                                            var training_tactics_result_3 = squadron_tactics;
                                        }else{
                                            var training_body_result_3    = squadron_body + 40;
                                            if ( squadron_spirit <= 0 ) {
                                                var training_spirit_result_3  = squadron_spirit;
                                                var training_tactics_result_3 = squadron_tactics - 40;
                                            }else if ( squadron_tactics <= 0 ) {
                                                var training_spirit_result_3  = squadron_spirit - 40;
                                                var training_tactics_result_3 = squadron_tactics;
                                            }else{
                                                var training_spirit_result_3  = squadron_spirit - 20;
                                                var training_tactics_result_3 = squadron_tactics -20;
                                            }
                                        }
                                    }else if ( l == 2 ) {
                                        //単体訓練
                                        if ( squadron_body + squadron_tactics < 40 ) {
                                            var training_body_result_3    = squadron_body;
                                            var training_spirit_result_3  = squadron_spirit;
                                            var training_tactics_result_3 = squadron_tactics;
                                        }else{
                                            var training_spirit_result_3  = squadron_spirit + 40;
                                            if ( squadron_body <= 0 ) {
                                                var training_body_result_3  = squadron_body;
                                                var training_tactics_result_3 = squadron_tactics - 40;
                                            }else if ( squadron_tactics <= 0 ) {
                                                var training_body_result_3  = squadron_body - 40;
                                                var training_tactics_result_3 = squadron_tactics;
                                            }else{
                                                var training_body_result_3  = squadron_body - 20;
                                                var training_tactics_result_3 = squadron_tactics -20;
                                            }
                                        }
                                    }else if ( l == 3 ) {
                                        //単体訓練
                                        if ( squadron_body + squadron_spirit < 40 ) {
                                            var training_body_result_3    = squadron_body;
                                            var training_spirit_result_3  = squadron_spirit;
                                            var training_tactics_result_3 = squadron_tactics;
                                        }else{
                                            var training_tactics_result_3 = squadron_tactics + 40;
                                            if ( squadron_body <= 0 ) {
                                                var training_body_result_3  = squadron_body;
                                                var training_spirit_result_3 = squadron_spirit - 40;
                                            }else if ( squadron_spirit <= 0 ) {
                                                var training_body_result_3  = squadron_body - 40;
                                                var training_spirit_result_3 = squadron_spirit;
                                            }else{
                                                var training_body_result_3  = squadron_body - 20;
                                                var training_spirit_result_3 = squadron_spirit -20;
                                            }
                                        }
                                    }else{
                                        //複合訓練
                                        var training_body_result_3    = squadron_body    + eval('t00'+l+'_arr')[0];
                                        var training_spirit_result_3  = squadron_spirit  + eval('t00'+l+'_arr')[1];
                                        var training_tactics_result_3 = squadron_tactics + eval('t00'+l+'_arr')[2];
                                        if ( training_body_result_3 < 0 || training_spirit_result_3 < 0 || training_tactics_result_3 < 0 ) {
                                            var training_body_result_3    = squadron_body;
                                            var training_spirit_result_3  = squadron_spirit;
                                            var training_tactics_result_3 = squadron_tactics;
                                        };
                                    };//end if

                                }//end if (上限値に達してない場合)

                                var t3_body    = member_body    + training_body_result_3;
                                var t3_spirit  = member_spirit  + training_spirit_result_3;
                                var t3_tactics = member_tactics + training_tactics_result_3;

                                if ( training_terms == "training_terms_3" && mission_body   <= t3_body   && mission_spirit  <= t3_spirit  && mission_tactics <= t3_tactics ||
                                     training_terms == "training_terms_2" && mission_body   <= t3_body   && mission_spirit  <= t3_spirit  ||
                                     training_terms == "training_terms_2" && mission_body   <= t3_body   && mission_tactics <= t3_tactics ||
                                     training_terms == "training_terms_2" && mission_spirit <= t3_spirit && mission_tactics <= t3_tactics)
                                {
                                    pattern_table.eq(i).addClass('training3_done');
                                    pattern_table.eq(i).find('.training_notice').append('<div class="t3"><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png">　⇒　<img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png">　⇒　<img class="icon_training" src="./img/squadron_calculater/icon_t00'+l+'.png"></div>');
                                }else{
                                    pattern_table.eq(i).addClass('training_false');
                                }
                            };//end for(l)

                        };
                    }//end for(k)

                };
            }//end for(j)

            if ( pattern_table.eq(i).hasClass('training1_done') ) {
                pattern_table.eq(i).find('.training_notice').find('.t3').remove();
                pattern_table.eq(i).find('.training_notice').find('.t2').remove();
                pattern_table.eq(i).find('.training_notice').find('.t1:not(:first-child)').remove()
                pattern_table.eq(i).removeClass('training_false');
                pattern_table.eq(i).removeClass('training3_done');
                pattern_table.eq(i).removeClass('training2_done');
            };

            if ( pattern_table.eq(i).hasClass('training2_done') ) {
                pattern_table.eq(i).find('.training_notice').find('.t3').remove();
                pattern_table.eq(i).find('.training_notice').find('.t2:not(:first-child)').remove()
                pattern_table.eq(i).removeClass('training_false');
                pattern_table.eq(i).removeClass('training3_done');
            };

            if ( pattern_table.eq(i).hasClass('training3_done') ) {
                pattern_table.eq(i).find('.training_notice').find('.t3:not(:first-child)').remove()
                pattern_table.eq(i).removeClass('training_false');
            };

            if ( training_terms == "training_terms_3" ) {
                if ( pattern_table.eq(i).hasClass('training_false') ) {
                    pattern_table.eq(i).find('.training_notice').html('任務適正能力値3つを<br>3回以内の訓練で満たせません')
                };
            }else if ( training_terms == "training_terms_2" ) {
                if ( pattern_table.eq(i).hasClass('training_false') ) {
                    pattern_table.eq(i).find('.training_notice').html('任務適正能力値2つを<br>3回以内の訓練で満たせません')
                };
            }

        }//end if(status_3clear)
    }//end for(i)

    //組み合わせが見つからなかった際の表示
    if ( $('.training1_done').length < 1 ) {
        $('#result .calculation_table').append(
            '<tr class="training1_done_noapp display_none"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
        );
    }
    if ( $('.training2_done').length < 1 ) {
        $('#result .calculation_table').append(
            '<tr class="training2_done_noapp display_none"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
        );
    }
    if ( $('.training3_done').length < 1 ) {
        $('#result .calculation_table').append(
            '<tr class="training3_done_noapp display_none"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
        );
    }
    $('#result .calculation_table').append(
        '<tr class="training_false_noapp display_none"><td colspan="5">対応した組み合わせは見つかりませんでした</td></tr>'
    );

};

//ジンクス条件処理
function jinxTeemsCheck() {

    //連想配列の作成
    for (var i = 0; i < 8; i++) {
        eval('var member_'+(i+1)+'_arr = {}');

        var memberName       = $('.member_layout').eq(i).find('.name').val(),
            memberClass      = $('.member_layout').eq(i).find('.select_class').val(),
            memberLevel      = $('.member_layout').eq(i).find('.select_level').val(),
            memberRace       = $('.member_layout').eq(i).find('.select_race').val(),
            memberBody       = $('.member_layout').eq(i).find('input[type=number]').eq(0).val(),
            memberSpirit     = $('.member_layout').eq(i).find('input[type=number]').eq(1).val(),
            memberTactics    = $('.member_layout').eq(i).find('input[type=number]').eq(2).val(),
            memberjinxTerms  = $('.member_layout').eq(i).find('.select_jinx_terms').val(),
            memberjinxDetail = $('.member_layout').eq(i).find('.select_jinx_detail').val();

        eval('member_'+(i+1)+'_arr.name = memberName');
        eval('member_'+(i+1)+'_arr.class = memberClass');
        eval('member_'+(i+1)+'_arr.level = memberLevel');
        eval('member_'+(i+1)+'_arr.race = memberRace');
        eval('member_'+(i+1)+'_arr.body = memberBody');
        eval('member_'+(i+1)+'_arr.spirit = memberSpirit');
        eval('member_'+(i+1)+'_arr.tactics = memberTactics');
        eval('member_'+(i+1)+'_arr.jinxTerms = memberjinxTerms');
        eval('member_'+(i+1)+'_arr.jinxDetail = memberjinxDetail');

    };

    var pattern_table = $('#result .calculation_table').find('tr');
    var pattern_count = $('#result .calculation_table').find('tr').length;

    var random_bonus_1 = $('.select_random_bonus_1 option:selected').val(),
        random_bonus_2 = $('.select_random_bonus_2 option:selected').val(),
        random_bonus_3 = $('.select_random_bonus_3 option:selected').val();

    for (var i = 0; i < pattern_count; i++) {

        if ( !pattern_table.eq(i).hasClass('sort_tab') ) {

            var party_arr = [];

            for (var k = 0; k < 4; k++) {
                var partyMemberId = pattern_table.eq(i).find('td:first-child').find('p').eq(k).attr('class').slice(4);
                party_arr.push(partyMemberId);
            }//end for(k)

            var party_race_arr  = [];
            var party_class_arr = [];

            for (var l = 0; l < 4; l++) {
                var memberID    = party_arr[l];
                var memberRace  = eval('member_'+memberID+'_arr["race"]');
                party_race_arr.push(memberRace);
                var memberClass = eval('member_'+memberID+'_arr["class"]');
                party_class_arr.push(memberClass);
            }//end for(l)

            for (var n = 0; n < 4; n++) {

                var partyMemberId = pattern_table.eq(i).find('td:first-child').find('p').eq(n).get(0).className.split(" ")[0].slice(4);

                var member_body           = eval('member_'+partyMemberId+'_arr["body"]');
                var member_spirit         = eval('member_'+partyMemberId+'_arr["spirit"]');
                var member_tactics        = eval('member_'+partyMemberId+'_arr["tactics"]');

                pattern_table.eq(i).find('td:first-child').find('p').eq(n).attr('para_b',member_body);
                pattern_table.eq(i).find('td:first-child').find('p').eq(n).attr('para_s',member_spirit);
                pattern_table.eq(i).find('td:first-child').find('p').eq(n).attr('para_t',member_tactics);
            }

            for (var j = 0; j < 4; j++) {

                var search_arr  = [];
                var search_arr1 = [];
                var search_arr2 = [];
                var search_arr3 = [];
                var search_arr4 = [];
                var search_arr5 = [];
                var search_arr6 = [];
                var search_arr7 = [];
                var search_arr8 = [];
                var search_arr9 = [];

                var partyMemberId = pattern_table.eq(i).find('td:first-child').find('p').eq(j).get(0).className.split(" ")[0].slice(4);

                var member_class          = eval('member_'+partyMemberId+'_arr["class"]');
                var member_level          = eval('member_'+partyMemberId+'_arr["level"]').slice(5);
                var member_race           = eval('member_'+partyMemberId+'_arr["race"]');
                var member_body           = eval('member_'+partyMemberId+'_arr["body"]');
                var member_spirit         = eval('member_'+partyMemberId+'_arr["spirit"]');
                var member_tactics        = eval('member_'+partyMemberId+'_arr["tactics"]');
                var member_jinx_terms_id  = eval('member_'+partyMemberId+'_arr["jinxTerms"]');
                var member_jinx_detail_id = eval('member_'+partyMemberId+'_arr["jinxDetail"]');

                //ボーナス対象か判定
                if ( random_bonus_1 == member_class ||
                     random_bonus_1 == member_race  ||
                     random_bonus_2 == member_class ||
                     random_bonus_2 == member_race  ||
                     random_bonus_3 == member_class ||
                     random_bonus_3 == member_race )
                {
                    var random_bonus_active = true;
                }else{
                    var random_bonus_active = false;
                }

                // ランダムボーナスがtrueだったら無条件で発動
                if( random_bonus_active ){
                    jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                    pattern_table.eq(i).find('td:first-child').find('.mem_'+partyMemberId).addClass('random_bonus_active')
                }else{

                    //ジンクス条件チェック
                    switch (member_jinx_terms_id) {
                        //ジンクスなし
                        case "jinx_terms_000":
                            break;

                        //小隊任務に参加した場合
                        case "jinx_terms_001":
                            jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            break;

                        //小隊任務に参加した場合
                        case "jinx_terms_002":
                            if ( member_level >= $('input.mission_level').val() ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //レベル50位上の場合
                        case "jinx_terms_003":
                            if ( member_level >= 50 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //ヒューランと同行した場合
                        case "jinx_terms_004":
                            //編成内のヒューランを抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == "race001");
                            })
                            //ヒューランをカウントする
                            var count_race = search_arr.length;
                            //自分がヒューランだったら-1
                            if ( member_race == 'race001' ) {
                                var count_race = count_race -1;
                            }
                            if ( count_race >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //エレゼンと同行した場合
                        case "jinx_terms_005":
                            //編成内のエレゼンを抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == "race002");
                            })
                            //エレゼンをカウントする
                            var count_race = search_arr.length;
                            //自分がエレゼンだったら-1
                            if ( member_race == 'race002' ) {
                                var count_race = count_race -1;
                            }
                            if ( count_race >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //ララフェルと同行した場合
                        case "jinx_terms_006":
                            //編成内のララフェルを抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == "race003");
                            })
                            //ララフェルをカウントする
                            var count_race = search_arr.length;
                            //自分がララフェルだったら-1
                            if ( member_race == 'race003' ) {
                                var count_race = count_race -1;
                            }
                            if ( count_race >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //ミコッテと同行した場合
                        case "jinx_terms_007":
                            //編成内のミコッテを抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == "race004");
                            })
                            //ミコッテをカウントする
                            var count_race = search_arr.length;
                            //自分がミコッテだったら-1
                            if ( member_race == 'race004' ) {
                                var count_race = count_race -1;
                            }
                            if ( count_race >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //ルガディンと同行した場合
                        case "jinx_terms_008":
                            //編成内のルガディンを抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == "race005");
                            })
                            //ルガディンをカウントする
                            var count_race = search_arr.length;
                            //自分がルガディンだったら-1
                            if ( member_race == 'race005' ) {
                                var count_race = count_race -1;
                            }
                            if ( count_race >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //アウラと同行した場合
                        case "jinx_terms_009":
                            //編成内のアウラを抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == "race006");
                            })
                            //アウラをカウントする
                            var count_race = search_arr.length;
                            //自分がアウラだったら-1
                            if ( member_race == 'race006' ) {
                                var count_race = count_race -1;
                            }
                            if ( count_race >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //剣術士と同行した場合
                        case "jinx_terms_010":
                            //編成内の剣術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class001");
                            })
                            //剣術士をカウントする
                            var count_class = search_arr.length;
                            //自分が剣術士だったら-1
                            if ( member_class == 'class001' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //斧術士と同行した場合
                        case "jinx_terms_011":
                            //編成内の斧術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class002");
                            })
                            //斧術士をカウントする
                            var count_class = search_arr.length;
                            //自分が斧術士だったら-1
                            if ( member_class == 'class002' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //格闘士と同行した場合
                        case "jinx_terms_012":
                            //編成内の格闘士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class003");
                            })
                            //格闘士をカウントする
                            var count_class = search_arr.length;
                            //自分が格闘士だったら-1
                            if ( member_class == 'class003' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //槍術士と同行した場合
                        case "jinx_terms_013":
                            //編成内の槍術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class004");
                            })
                            //槍術士をカウントする
                            var count_class = search_arr.length;
                            //自分が槍術士だったら-1
                            if ( member_class == 'class004' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //双剣士と同行した場合
                        case "jinx_terms_014":
                            //編成内の双剣士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class005");
                            })
                            //双剣士をカウントする
                            var count_class = search_arr.length;
                            //自分が双剣士だったら-1
                            if ( member_class == 'class005' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //弓術士と同行した場合
                        case "jinx_terms_015":
                            //編成内の弓術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class006");
                            })
                            //弓術士をカウントする
                            var count_class = search_arr.length;
                            //自分が弓術士だったら-1
                            if ( member_class == 'class006' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //幻術士と同行した場合
                        case "jinx_terms_016":
                            //編成内の幻術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class007");
                            })
                            //幻術士をカウントする
                            var count_class = search_arr.length;
                            //自分が幻術士だったら-1
                            if ( member_class == 'class007' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //呪術士と同行した場合
                        case "jinx_terms_017":
                            //編成内の呪術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class008");
                            })
                            //呪術士をカウントする
                            var count_class = search_arr.length;
                            //自分が呪術士だったら-1
                            if ( member_class == 'class008' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //巴術士と同行した場合
                        case "jinx_terms_018":
                            //編成内の巴術士を抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == "class009");
                            })
                            //巴術士をカウントする
                            var count_class = search_arr.length;
                            //自分が巴術士だったら-1
                            if ( member_class == 'class009' ) {
                                var count_class = count_class -1;
                            }
                            if ( count_class >= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //自分と同種族と同行した場合
                        case "jinx_terms_019":
                            //編成内の自分と同じ種族を抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == member_race);
                            })
                            //自分の種族をカウントする
                            var count_race = search_arr.length;
                            if ( count_race >= 2 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //自分と異なる種族と同行した場合
                        case "jinx_terms_020":
                            //編成内の自分と同じ種族を抜き出す
                            var search_arr = $.grep( party_race_arr, function( value ) {
                                return (value == member_race);
                            })
                            //自分の種族をカウントする
                            var count_race = search_arr.length;
                            if ( count_race <= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //自分と同クラスと同行した場合
                        case "jinx_terms_021":
                            //編成内の自分と同じクラスを抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == member_class);
                            })
                            //自分のクラスをカウントする
                            var count_class = search_arr.length;
                            if ( count_class >= 2 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //自分と異なるクラスと同行した場合
                        case "jinx_terms_022":
                            //編成内の自分と同じクラスを抜き出す
                            var search_arr = $.grep( party_class_arr, function( value ) {
                                return (value == member_class);
                            })
                            //自分のクラスをカウントする
                            var count_class = search_arr.length;
                            if ( count_class <= 1 ) {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //同行者の種族が全て異なる場合
                        case "jinx_terms_023":
                            //編成内から各種族をを抜き出す
                            var search_arr1 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race001');
                            })
                            var search_arr2 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race002');
                            })
                            var search_arr3 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race003');
                            })
                            var search_arr4 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race004');
                            })
                            var search_arr5 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race005');
                            })
                            var search_arr6 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race006');
                            })
                            // 各種族をカウントする
                            var count_race1 = search_arr1.length;
                            var count_race2 = search_arr2.length;
                            var count_race3 = search_arr3.length;
                            var count_race4 = search_arr4.length;
                            var count_race5 = search_arr5.length;
                            var count_race6 = search_arr6.length;
                            if ( count_race1 <= 1 &&
                                 count_race2 <= 1 &&
                                 count_race3 <= 1 &&
                                 count_race4 <= 1 &&
                                 count_race5 <= 1 &&
                                 count_race6 <= 1 )
                            {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //同行者のクラスが全て異なる場合
                        case "jinx_terms_024":
                            //編成内から各クラスをを抜き出す
                            var search_arr1 = $.grep( party_class_arr, function( value ) {
                                return (value == "class001");
                            })
                            var search_arr2 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class002');
                            })
                            var search_arr3 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class003');
                            })
                            var search_arr4 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class004');
                            })
                            var search_arr5 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class005');
                            })
                            var search_arr6 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class006');
                            })
                            var search_arr7 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class007');
                            })
                            var search_arr8 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class008');
                            })
                            var search_arr9 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class009');
                            })
                            // 各クラスをカウントする
                            var count_class1 = search_arr1.length;
                            var count_class2 = search_arr2.length;
                            var count_class3 = search_arr3.length;
                            var count_class4 = search_arr4.length;
                            var count_class5 = search_arr5.length;
                            var count_class6 = search_arr6.length;
                            var count_class7 = search_arr7.length;
                            var count_class8 = search_arr8.length;
                            var count_class9 = search_arr9.length;
                            if ( count_class1 <= 1 &&
                                 count_class2 <= 1 &&
                                 count_class3 <= 1 &&
                                 count_class4 <= 1 &&
                                 count_class5 <= 1 &&
                                 count_class6 <= 1 &&
                                 count_class7 <= 1 &&
                                 count_class8 <= 1 &&
                                 count_class9 <= 1 )
                            {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //同種族が3名以上の場合
                        case "jinx_terms_025":
                            //編成内から各種族をを抜き出す
                            var search_arr1 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race001');
                            })
                            var search_arr2 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race002');
                            })
                            var search_arr3 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race003');
                            })
                            var search_arr4 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race004');
                            })
                            var search_arr5 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race005');
                            })
                            var search_arr6 = $.grep( party_race_arr, function( value ) {
                                return (value == 'race006');
                            })
                            // 各種族をカウントする
                            var count_race1 = search_arr1.length;
                            var count_race2 = search_arr2.length;
                            var count_race3 = search_arr3.length;
                            var count_race4 = search_arr4.length;
                            var count_race5 = search_arr5.length;
                            var count_race6 = search_arr6.length;
                            if ( count_race1 >= 3 ||
                                 count_race2 >= 3 ||
                                 count_race3 >= 3 ||
                                 count_race4 >= 3 ||
                                 count_race5 >= 3 ||
                                 count_race6 >= 3 )
                            {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;

                        //同クラスが3名以上いる場合
                        case "jinx_terms_026":
                            //編成内から各クラスをを抜き出す
                            var search_arr1 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class001');
                            })
                            var search_arr2 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class002');
                            })
                            var search_arr3 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class003');
                            })
                            var search_arr4 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class004');
                            })
                            var search_arr5 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class005');
                            })
                            var search_arr6 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class006');
                            })
                            var search_arr7 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class007');
                            })
                            var search_arr8 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class008');
                            })
                            var search_arr9 = $.grep( party_class_arr, function( value ) {
                                return (value == 'class009');
                            })
                            // 各クラスをカウントする
                            var count_class1 = search_arr1.length;
                            var count_class2 = search_arr2.length;
                            var count_class3 = search_arr3.length;
                            var count_class4 = search_arr4.length;
                            var count_class5 = search_arr5.length;
                            var count_class6 = search_arr6.length;
                            var count_class7 = search_arr7.length;
                            var count_class8 = search_arr8.length;
                            var count_class9 = search_arr9.length;
                            if ( count_class1 >= 3 ||
                                 count_class2 >= 3 ||
                                 count_class3 >= 3 ||
                                 count_class4 >= 3 ||
                                 count_class5 >= 3 ||
                                 count_class6 >= 3 ||
                                 count_class7 >= 3 ||
                                 count_class8 >= 3 ||
                                 count_class9 >= 3 )
                            {
                                jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j);
                            }
                            break;
                    }//end switch

                }//end if random_bonus_active

            }//end for(j)

        }//end if
    }//end for(i)

// console.log(member_1_arr);
// console.log(member_2_arr);
// console.log(member_3_arr);
// console.log(member_4_arr);
// console.log(member_5_arr);
// console.log(member_6_arr);
// console.log(member_7_arr);
// console.log(member_8_arr);

}

//ジンクス効果処理
function jinxDetailCalculation(random_bonus_active, party_arr, member_jinx_detail_id, member_1_arr, member_2_arr, member_3_arr, member_4_arr, member_5_arr, member_6_arr, member_7_arr, member_8_arr, i, j) {

    var pattern_table = $('#result .calculation_table').find('tr');
    var partyMemberId = pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('class').slice(4);

    pattern_table.eq(i).find('td:first-child').find('.mem_'+partyMemberId).addClass('jinx_active');

    var member_class   = eval('member_'+partyMemberId+'_arr["class"]');
    var member_race    = eval('member_'+partyMemberId+'_arr["race"]');
    var member_body    = eval('member_'+partyMemberId+'_arr["body"]');
    var member_spirit  = eval('member_'+partyMemberId+'_arr["spirit"]');
    var member_tactics = eval('member_'+partyMemberId+'_arr["tactics"]');

    switch (member_jinx_detail_id) {

        case 'jinx_detail_000':
            break;

        //身体能力+10%
        case 'jinx_detail_001':
            if ( random_bonus_active ) {
                var cal_body = Math.floor(member_body * 1.2);
            }else{
                var cal_body = Math.floor(member_body * 1.1);
            }
            var res_body = cal_body - member_body;

            var d_sum_body = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_b'))+res_body;
            pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_b',d_sum_body)

            var sum_body = parseInt(pattern_table.eq(i).find('.calculate_b').text())+res_body;
            pattern_table.eq(i).find('.calculate_b').text(sum_body);
            break;

        //身体能力+15%
        case 'jinx_detail_002':
            if ( random_bonus_active ) {
                var cal_body = Math.floor(member_body * 1.3);
            }else{
                var cal_body = Math.floor(member_body * 1.15);
            }
            var res_body = cal_body - member_body;

            var d_sum_body = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_b'))+res_body;
            pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_b',d_sum_body)

            var sum_body = parseInt(pattern_table.eq(i).find('.calculate_b').text())+res_body;
            pattern_table.eq(i).find('.calculate_b').text(sum_body);
            break;

        // 精神力+10%
        case 'jinx_detail_003':
            if ( random_bonus_active ) {
                var cal_spirit = Math.floor(member_spirit * 1.2);
            }else{
                var cal_spirit = Math.floor(member_spirit * 1.1);
            }
            var res_spirit = cal_spirit - member_spirit;

            var d_sum_spirit = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_s'))+res_spirit;
            pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_s',d_sum_spirit)

            var sum_spirit = parseInt(pattern_table.eq(i).find('.calculate_s').text())+res_spirit;
            pattern_table.eq(i).find('.calculate_s').text(sum_spirit);
            break;

        // 精神力+15%
        case 'jinx_detail_004':
            if ( random_bonus_active ) {
                var cal_spirit = Math.floor(member_spirit * 1.3);
            }else{
                var cal_spirit = Math.floor(member_spirit * 1.15);
            }
            var res_spirit = cal_spirit - member_spirit;

            var d_sum_spirit = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_s'))+res_spirit;
            pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_s',d_sum_spirit)

            var sum_spirit = parseInt(pattern_table.eq(i).find('.calculate_s').text())+res_spirit;
            pattern_table.eq(i).find('.calculate_s').text(sum_spirit);
            break;

        // 戦術錬度+10%
        case 'jinx_detail_005':
            if ( random_bonus_active ) {
                var cal_tactics = Math.floor(member_tactics * 1.2);
            }else{
                var cal_tactics = Math.floor(member_tactics * 1.1);
            }
            var res_tactics = cal_tactics - member_tactics;

            var d_sum_tactics = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_t'))+res_tactics;
            pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_t',d_sum_tactics)

            var sum_tactics = parseInt(pattern_table.eq(i).find('.calculate_t').text())+res_tactics;
            pattern_table.eq(i).find('.calculate_t').text(sum_tactics);
            break;

        // 戦術錬度+15%
        case 'jinx_detail_006':
            if ( random_bonus_active ) {
                var cal_tactics = Math.floor(member_tactics * 1.3);
            }else{
                var cal_tactics = Math.floor(member_tactics * 1.15);
            }
            var res_tactics = cal_tactics - member_tactics;

            var d_sum_tactics = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_t'))+res_tactics;
            pattern_table.eq(i).find('td:first-child').find('p').eq(j).attr('para_t',d_sum_tactics)

            var sum_tactics = parseInt(pattern_table.eq(i).find('.calculate_t').text())+res_tactics;
            pattern_table.eq(i).find('.calculate_t').text(sum_tactics);
            break;

        // 全員の身体能力+10%
        case 'jinx_detail_007':
            var sum_body = parseInt(pattern_table.eq(i).find('.calculate_b').text());
            for (var m = 0; m < 4; m++) {
                var party_member_id       = parseInt(party_arr[m]);
                var party_member_body     = eval('member_'+party_member_id+'_arr["body"]');
                if ( random_bonus_active ) {
                    var party_member_cal_body = Math.floor(party_member_body * 1.2);
                }else{
                    var party_member_cal_body = Math.floor(party_member_body * 1.1);
                }
                var party_member_res_body = party_member_cal_body - party_member_body;

                var d_sum_body = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_b'))+party_member_res_body;
                pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_b',d_sum_body)

                var sum_body = sum_body + party_member_res_body;
            }
            pattern_table.eq(i).find('.calculate_b').text(sum_body);
            break;

        // 全員の身体能力+15%
        case 'jinx_detail_008':
            var sum_body = parseInt(pattern_table.eq(i).find('.calculate_b').text());
            for (var m = 0; m < 4; m++) {
                var party_member_id       = parseInt(party_arr[m]);
                var party_member_body     = eval('member_'+party_member_id+'_arr["body"]');
                if ( random_bonus_active ) {
                    var party_member_cal_body = Math.floor(party_member_body * 1.3);
                }else{
                    var party_member_cal_body = Math.floor(party_member_body * 1.15);
                }
                var party_member_res_body = party_member_cal_body - party_member_body;

                var d_sum_body = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_b'))+party_member_res_body;
                pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_b',d_sum_body)

                var sum_body = sum_body + party_member_res_body;
            }
            pattern_table.eq(i).find('.calculate_b').text(sum_body);
            break;

        // 全員の精神力+10%
        case 'jinx_detail_009':
            var sum_spirit = parseInt(pattern_table.eq(i).find('.calculate_s').text());
            for (var m = 0; m < 4; m++) {
                var party_member_id       = parseInt(party_arr[m]);
                var party_member_spirit     = eval('member_'+party_member_id+'_arr["spirit"]');
                if ( random_bonus_active ) {
                    var party_member_cal_spirit = Math.floor(party_member_spirit * 1.2);
                }else{
                    var party_member_cal_spirit = Math.floor(party_member_spirit * 1.1);
                }
                var party_member_res_spirit = party_member_cal_spirit - party_member_spirit;

                var d_sum_spirit = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_s'))+party_member_res_spirit;
                pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_s',d_sum_spirit)

                var sum_spirit = sum_spirit + party_member_res_spirit;
            }
            pattern_table.eq(i).find('.calculate_s').text(sum_spirit);
            break;

        // 全員の精神力+15%
        case 'jinx_detail_010':
            var sum_spirit = parseInt(pattern_table.eq(i).find('.calculate_s').text());
            for (var m = 0; m < 4; m++) {
                var party_member_id       = parseInt(party_arr[m]);
                var party_member_spirit     = eval('member_'+party_member_id+'_arr["spirit"]');
                if ( random_bonus_active ) {
                    var party_member_cal_spirit = Math.floor(party_member_spirit * 1.3);
                }else{
                    var party_member_cal_spirit = Math.floor(party_member_spirit * 1.15);
                }
                var party_member_res_spirit = party_member_cal_spirit - party_member_spirit;

                var d_sum_spirit = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_s'))+party_member_res_spirit;
                pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_s',d_sum_spirit)

                var sum_spirit = sum_spirit + party_member_res_spirit;
            }
            pattern_table.eq(i).find('.calculate_s').text(sum_spirit);
            break;

        // 全員の戦術錬度+10%
        case 'jinx_detail_011':
            var sum_tactics = parseInt(pattern_table.eq(i).find('.calculate_t').text());
            for (var m = 0; m < 4; m++) {
                var party_member_id       = parseInt(party_arr[m]);
                var party_member_tactics     = eval('member_'+party_member_id+'_arr["tactics"]');
                if ( random_bonus_active ) {
                    var party_member_cal_tactics = Math.floor(party_member_tactics * 1.2);
                }else{
                    var party_member_cal_tactics = Math.floor(party_member_tactics * 1.1);
                }
                var party_member_res_tactics = party_member_cal_tactics - party_member_tactics;

                var d_sum_tactics = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_t'))+party_member_res_tactics;
                pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_t',d_sum_tactics)

                var sum_tactics = sum_tactics + party_member_res_tactics;
            }
            pattern_table.eq(i).find('.calculate_t').text(sum_tactics);
            break;

        // 全員の戦術錬度+15%
        case 'jinx_detail_012':
            var sum_tactics = parseInt(pattern_table.eq(i).find('.calculate_t').text());
            for (var m = 0; m < 4; m++) {
                var party_member_id       = parseInt(party_arr[m]);
                var party_member_tactics     = eval('member_'+party_member_id+'_arr["tactics"]');
                if ( random_bonus_active ) {
                    var party_member_cal_tactics = Math.floor(party_member_tactics * 1.3);
                }else{
                    var party_member_cal_tactics = Math.floor(party_member_tactics * 1.15);
                }
                var party_member_res_tactics = party_member_cal_tactics - party_member_tactics;

                var d_sum_tactics = parseInt(pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_t'))+party_member_res_tactics;
                pattern_table.eq(i).find('td:first-child').find('p').eq(m).attr('para_t',d_sum_tactics)

                var sum_tactics = sum_tactics + party_member_res_tactics;
            }
            pattern_table.eq(i).find('.calculate_t').text(sum_tactics);
            break;

    }//end switch
}

//集計結果、タブ切り替え
function changeTab() {
    $('#pattern_3clear_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.status_3clear').removeClass('display_none');
        $('.calculation_table').find('.status_3clear_noapp').removeClass('display_none');
    })
    $('#pattern_2clear_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.status_2clear').removeClass('display_none');
        $('.calculation_table').find('.status_2clear_noapp').removeClass('display_none');
    })
    $('#pattern_1clear_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.status_1clear').removeClass('display_none');
        $('.calculation_table').find('.status_1clear_noapp').removeClass('display_none');
    })
    $('#pattern_all_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.status_3clear').removeClass('display_none');
        $('.calculation_table').find('.status_2clear').removeClass('display_none');
        $('.calculation_table').find('.status_1clear').removeClass('display_none');
    })
    $('#training1_done_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.training1_done').removeClass('display_none');
        $('.calculation_table').find('.training1_done_noapp').removeClass('display_none');
    })
    $('#training2_done_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.training2_done').removeClass('display_none');
        $('.calculation_table').find('.training2_done_noapp').removeClass('display_none');
    })
    $('#training3_done_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.training3_done').removeClass('display_none');
        $('.calculation_table').find('.training3_done_noapp').removeClass('display_none');
    })
    $('#training_false_show').click(function(){
        $('.tab').removeClass('current');
        $('.calculation_table').find('tr').addClass('display_none');
        $(this).addClass('current');
        $('.calculation_table').find('.sort_tab').removeClass('display_none');
        $('.calculation_table').find('.training_false:not(.status_3clear_noapp):not(.status_2clear_noapp):not(.status_1clear_noapp)').removeClass('display_none');
console.log($('.calculation_table').find('.training_false:not(.status_3clear_noapp):not(.status_2clear_noapp):not(.status_1clear_noapp)').length)
        if ( $('.calculation_table').find('.training_false:not(.sort_tab):not(.status_3clear_noapp):not(.status_2clear_noapp):not(.status_1clear_noapp)').length < 1 ) {
            $('.calculation_table').find('.training_false_noapp').removeClass('display_none');
        }
    })
}

$(function(){

    deleteCookie();
    loadSaveData();
    searchClassTableAll();
    classColorAdd();
    changeTab();
    missionPresetOutput();

    //test
    // patternCalculation();
    // resultPatternDetailPopup();

    $('.mission_status').find('input').change(function(){
        saveSquadronlData();
    })

    $('.squadron_status').find('input').change(function(){
        saveSquadronlData();
    })

    $('.member_layout').find('input').change(function(){
        saveSquadronlData();
    })

    $('select').change(function(){
        searchClassTableAll();
        saveSquadronlData();
        classColorAdd();
    })

    $('.mission_preset_layout').find('input').change(function(){
        saveSquadronlData();
    })

    $('.member_layout').find('.check_star').click(function(){
        var self = $(this);
        favoriteStarCheck(self);
        saveSquadronlData();
    })

    //計算ボタンを押した際の挙動
    $('#calculation').click(function(){
        patternCalculation();
        resultPatternDetailPopup();

        var training_terms  = $('input[name="training_terms"]:checked').val();
        if ( training_terms != 'training_terms_0' ) {
            trainingCalculatuion();
        }
        $('.tab_switch_training').addClass('display_none');
        if ( training_terms != 'training_terms_0' ) {
            $('.tab_switch_training').removeClass('display_none');
        }
    })

    //計算ボタンを押した際の挙動
    // $('#calculation2').click(function(){
    //     patternCalculation();
    //     resultPatternDetailPopup();
    //     trainingCalculatuion();
    // })

    //ツイートボタン
    $('.tweet_button').socialbutton('twitter', {
        button: 'horizontal',
        text: 'FF14 冒険者小隊 能力値計算ツール #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/squadron_calculater.html'
    });

    //ヘルプ画像表示
    // $('.mission_status p').hover(function() {
    //     $('.mission_status').find('.help_image').show();
    // }, function() {
    //     $('.mission_status').find('.help_image').hide();
    // });
    // $('.squadron_status tr:first-child p').hover(function() {
    //     $('.squadron_status').find('.help_image').show();
    // }, function() {
    //     $('.squadron_status').find('.help_image').hide();
    // });

    $('.mission_preset_open').click(function(){
        $('.mission_preset_box').slideToggle();
    })

    $('.jinx_notice_wrapper_show').click(function(){
        $('.jinx_notice_wrapper').slideToggle();
    })


    var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();

    if (userAgent.indexOf('chrome') != -1) {
        $( ".member_status" ).sortable();
        $( ".member_status" ).disableSelection();
        $( ".member_status" ).find('.member_layout').css('cursor','move');
    }

    // if (userAgent.indexOf('msie') != -1) {
    //     //IE6～9（おそらく）
    //     if (appVersion.indexOf("msie 6.") != -1) {
    //         //IE6での処理
    //     }else if (appVersion.indexOf("msie 7.") != -1) {
    //         //IE7での処理
    //     }else if (appVersion.indexOf("msie 8.") != -1) {
    //         //IE8での処理
    //     }else if (appVersion.indexOf("msie 9.") != -1) {
    //         //IE9での処理
    //     }
    // }else if (userAgent.indexOf('chrome') != -1) {
    //     //Chrome/Opera（最新版）での処理
    // }else if (userAgent.indexOf('safari') != -1) {
    //     //Safariでの処理
    // }else if (userAgent.indexOf('firefox') != -1) {
    //     //Firefoxでの処理
    // }

})