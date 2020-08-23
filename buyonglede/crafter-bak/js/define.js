// logic thanks! https://github.com/doxxx/ffxiv-craft-opt-web

//*****************************************************************
//設定
//*****************************************************************
//定数
var CRAFT_STATUS_VERYHIGH = 0;
var CRAFT_STATUS_HIGH = 1;
var CRAFT_STATUS_NORMAL = 2;
var CRAFT_STATUS_LOW = 3;

//ランダムIDベース値
var RANDOM_BASE = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

//ロドスト情報
var imageRootURL = "http://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/";
var ldstRootURL = "http://" + langForView + ".finalfantasyxiv.com";
var ldstPlayGuideRootURL = "http://" + langForView + ".finalfantasyxiv.com/lodestone/playguide/db";

//短縮URL生成機能
var URL_SHORTER = "http://ffxiv.rs.exdreams.net/crafter/create_url.php";

//ゲームリンク用URL
var URL_GAMELINK_INIT = "http://localhost:{0}/gamelink/init";
var URL_GAMELINK_GET = "http://localhost:{0}/gamelink/get";

//ジョブ一覧
var jobList = [
	{"name": ml_job_cpt, "image": "image/sys/job_cpt.png"},
	{"name": ml_job_bsm, "image": "image/sys/job_bsm.png"},
	{"name": ml_job_arm, "image": "image/sys/job_arm.png"},
	{"name": ml_job_gsm, "image": "image/sys/job_gsm.png"},
	{"name": ml_job_ltw, "image": "image/sys/job_ltw.png"},
	{"name": ml_job_wvr, "image": "image/sys/job_wvr.png"},
	{"name": ml_job_alc, "image": "image/sys/job_alc.png"},
	{"name": ml_job_cul, "image": "image/sys/job_cul.png"},
];

//クラフトステータス
var craftStatusList = [
	{title: ml_craft_status_veryhigh, image: "image/sys/quality_veryhigh.png" },
	{title: ml_craft_status_high ,    image: "image/sys/quality_high.png" },
	{title: ml_craft_status_normal ,  image: "image/sys/quality_normal.png" },
	{title: ml_craft_status_low ,     image: "image/sys/quality_low.png" }
];

//ジョブ別アクション定義
var actionTableMap = {};
actionTableMap[ml_job_cpt] = {
	"work":    [94,48,22,28,58,0,6,42,193],
	"quality": [86,1,72,8,3,7,78],
	"buff":    [161,177,169,157,2,4,154,158,156,160,159,185,67,155,162,136,9,153],
	"meister": [137,145,127,111,119,95,103],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};

actionTableMap[ml_job_bsm] = {
	"work":    [94,48,22,28,58,10,16,42,193],
	"quality": [87,11,72,8,13,17,79],
	"buff":    [161,178,170,157,12,14,154,158,156,160,159,186,67,155,162,136,18,153],
	"meister": [138,146,128,112,120,96,104],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};
actionTableMap[ml_job_arm] = {
	"work":    [94,48,22,28,58,19,26,42,193],
	"quality": [88,20,72,8,23,27,80],
	"buff":    [161,179,171,157,21,24,154,158,156,160,159,187,67,155,162,136,29,153],
	"meister": [139,147,129,113,121,97,105],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};
actionTableMap[ml_job_gsm] = {
	"work":    [94,48,22,28,58,50,55,42,193],
	"quality": [89,51,72,8,53,56,81],
	"buff":    [161,180,172,157,52,54,154,158,156,160,159,188,67,155,162,136,57,153],
	"meister": [140,148,130,114,122,98,106],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};

actionTableMap[ml_job_ltw] = {
	"work":    [94,48,22,28,58,30,36,42,193],
	"quality": [90,31,72,8,33,37,82],
	"buff":    [161,182,174,157,32,34,154,158,156,160,159,190,67,155,162,136,38,153],
	"meister": [141,149,131,115,123,99,107],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};
actionTableMap[ml_job_wvr] = {
	"work":    [94,48,22,28,58,39,46,42,193],
	"quality": [91,40,72,8,43,47,83],
	"buff":    [161,181,173,157,41,44,154,158,156,160,159,189,67,155,162,136,49,153],
	"meister": [142,150,132,116,124,100,108],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};
actionTableMap[ml_job_alc] = {
	"work":    [94,48,22,28,58,59,65,42,193],
	"quality": [92,60,72,8,62,66,84],
	"buff":    [161,183,175,157,61,63,154,158,156,160,159,191,67,155,162,136,68,153],
	"meister": [143,151,133,117,125,101,109],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};
actionTableMap[ml_job_cul] = {
	"work":    [94,48,22,28,58,69,75,42,193],
	"quality": [93,70,72,8,73,76,85],
	"buff":    [161,184,176,157,71,74,154,158,156,160,159,192,67,155,162,136,77,153],
	"meister": [144,152,134,118,126,102,110],
	"attr":    [15, 164, 25, 165, 5, 163, 35, 166, 45, 167, 64, 168],
};

//アクションパネル名一覧
//	action_title_***, action_area_***
var actionPanelList = [
	"favorite", "work", "quality", "buff", "meister", "attr"
];
//アクションパネル名一覧（動作定義）
var actionPanelAttrMap = {
	"action_area_favorite": {"drag": true,  "dropTo": [ "action_area_favorite", "senario_panel" ] },
	"action_area_work"    : {"drag": true,  "dropTo": [ "action_area_favorite", "senario_panel" ] },
	"action_area_quality" : {"drag": true,  "dropTo": [ "action_area_favorite", "senario_panel" ] },
	"action_area_buff"    : {"drag": true,  "dropTo": [ "action_area_favorite", "senario_panel" ] },
	"action_area_meister" : {"drag": true,  "dropTo": [ "action_area_favorite", "senario_panel" ] },
	"action_area_attr"    : {"drag": true,  "dropTo": [ "action_area_favorite", "senario_panel" ] },
	"senario_panel"       : {"drag": true,  "dropTo": [ ] },
};


//計算用
//レベル変換テーブル
var lvTableCrafter = {
    51: 120, // 120
    52: 125, // 125
    53: 130, // 130
    54: 133, // 133
    55: 136, // 136
    56: 139, // 139
    57: 142, // 142
    58: 145, // 145
    59: 148, // 148
    60: 150  // 150
};

var lvTableRecipe = {
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"10": 10,
	"11": 11,
	"12": 12,
	"13": 13,
	"14": 14,
	"15": 15,
	"16": 16,
	"17": 17,
	"18": 18,
	"19": 19,
	"20": 20,
	"21": 21,
	"22": 22,
	"23": 23,
	"24": 24,
	"25": 25,
	"26": 26,
	"27": 27,
	"28": 28,
	"29": 29,
	"30": 30,
	"31": 31,
	"32": 32,
	"33": 33,
	"34": 34,
	"35": 35,
	"36": 36,
	"37": 37,
	"38": 38,
	"39": 39,
	"40": 40,
	"41": 41,
	"42": 42,
	"43": 43,
	"44": 44,
	"45": 45,
	"46": 46,
	"47": 47,
	"48": 48,
	"49": 49,
	"50": 50,
	"50★": 55,
	"50★★": 70,
	"50★★★": 90,
	"50★★★★": 110,
	"51": 120,
	"52": 125,
	"53": 130,
	"54": 133,
	"55": 136,
	"56": 139,
	"57": 142,
	"58": 145,
	"59": 148,
	"60": 150,
	"60★": 160,
	"60★★": 170,
	"60★★★": 190, // temporary 2016.02.23
	"60★★★★": 210, // temporary 2016.09.28

};

var lvTableRecipeIng1 = {
	40: 36,
	41: 36,
	42: 37,
	43: 38,
	44: 39,
	45: 40,
	46: 41,
	47: 42,
	48: 43,
	49: 44,
	50: 45,
	55: 50,     // 50_1star     *** unverified
	70: 50,     // 50_2star     *** unverified
	90: 58,     // 50_3star     *** unverified
	110: 58,    // 50_4star     *** unverified
	115: 100,   // 51 @ 169/339 difficulty
	120: 100,   // 51 @ 210/410 difficulty
	125: 100,   // 52
	130: 110,   // 53
	133: 110,   // 54
	136: 110,   // 55
	139: 124,   // 56
	142: 129.5, // 57
	145: 134.5, // 58
	148: 139,   // 59
	150: 140,   // 60
	160: 151,   // 60_1star
	170: 151.15,// 60_2star (no data)
	190: 153.25,// 60_3star (no data) 2016.2.23,
	210: 154.32 // 60_4star (no data) 2016.9.28
};

var lvTableRecipeIng2 = {
	40: 33,
	41: 34,
	42: 35,
	43: 36,
	44: 37,
	45: 38,
	46: 39,
	47: 40,
	48: 40,
	49: 41,
	50: 42,
	55: 47,     // 50_1star     *** unverified
	70: 47,     // 50_2star     *** unverified
	90: 56,     // 50_3star     *** unverified
	110: 56,    // 50_4star     *** unverified
	115: 100,   // 51 @ 169/339 difficulty
	120: 100,   // 51 @ 210/410 difficulty
	125: 100,   // 52
	130: 110,   // 53
	133: 110,   // 54
	136: 110,   // 55
	139: 124,   // 56
	142: 129.5, // 57
	145: 133,   // 58
	148: 136,   // 59
	150: 139,   // 60
	160: 150,   // 60_1star
	170: 151.15,// 60_2star
	190: 152.25,// 60_3star (no data) 2016.2.23 => 152.25
	210: 153.32 // 60_4star (no data) 2016.9.28
};


//レシピ検索用
var lvList = [
	"1 - 5", "6 - 10", "11 - 15", "16 - 20", "21 - 25", "26 - 30", "31 - 35", "36 - 40", 
	"41 - 45", "46 - 50", "50★ - ★★★★", "51 - 55", "56 - 60", "60★ - ★★★★"
];
var emptyRecipe = {"image": "image/sys/clear.png", "title": ml_manual, "desc": "", "id": "ffffffff"};

//食事検索用変数
var mealTypeList = [ml_all, ml_cp, ml_cs, ml_ctrl];
var emptyMeal = {"image": "image/sys/clear.png", "title": ml_none, "desc": "", "meal": null, "sort": -1};

//jquery-ui sortable 拡張
var ext = {
	_createHelper: function(event) {

		var o = this.options,
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);

		//Add the helper to the DOM if that didn't happen already
		if(!helper.parents("body").length) {
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
		}

		if(helper[0] === this.currentItem[0]) {
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
		}

		/*
		if(!helper[0].style.width || o.forceHelperSize) {
			helper.width(this.currentItem.width());
		}
		if(!helper[0].style.height || o.forceHelperSize) {
			helper.height(this.currentItem.height());
		}
		*/
		return helper;

	},
	_createPlaceholder: function(that) {
		that = that || this;
		var className,
			o = that.options;

		if(!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function() {

					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						element = $( "<" + nodeName + ">", that.document[0] )
							.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
							.removeClass("ui-sortable-helper");
					if ( nodeName === "tbody" ) {
						that._createTrPlaceholder(
							that.currentItem.find( "tr" ).eq( 0 ),
							$( "<tr>", that.document[ 0 ] ).appendTo( element )
						);
					} else if ( nodeName === "tr" ) {
						that._createTrPlaceholder( that.currentItem, element );
					} else if ( nodeName === "img" ) {
						element.attr( "src", that.currentItem.attr( "src" ) );
					}

					if ( !className ) {
						element.css( "visibility", "hidden" );
					}

					//NOTE ここまでのHTML
					//<div class="action_sortable_placeholder"></div>
					var baseId = $(this).attr("id");
					if ("action_area_favorite" == baseId) {
						var mode = getCurrentActionViewMode();
						var spClass = 
							0 == mode ? "action action_sp" :
							1 == mode ? "action action_notext action_notext_sp" :
							2 == mode ? "action action_small action_small_sp" : 
										"action action_small_notext action_small_notext_sp";
						html = '<div class="action ' + spClass + '"><span class="image"><span class="cost">&nbsp;</span></span><span class="text">&nbsp;</span></div>';

						element = $(html);
						//element.append(innerHTML);
						//element.append("<div class=\"test\"></div>");
					}
					return element;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);
	}
};
$.extend($.ui.sortable.prototype, ext);
