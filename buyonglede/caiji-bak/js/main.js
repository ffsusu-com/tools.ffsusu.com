
var areaList = [
	"全部",
	"黑衣森林",
	"拉诺西亚",
	"萨纳兰",
	"库尔札斯",
	"摩杜纳",
	"阿巴拉提亚",
	"龙堡",
	"云冠群岛"
];
var pointTypeList = [
	"全部",
	"通常",
	"未知系全部",
	"未知＋时间限制",
	"未知",
	"时间限制",
	"传说",
	"闹铃设定",
	"护符",
	"云海"
];
var classTypeList = [
	"全部",
	"园艺工",
	"采矿工",
];
var patchList = [
	"全部",
	"2.x",
	"3.0",
	"3.1",
	"3.2",
	"3.3",
	"3.4",
];

var viewModeList = [
	"按採集点分类",
	"採集点分类＋最近时间",
	"按道具分类",
	"按道具分类＋最近时间"
];

var mapBase = {
	"魔大陆阿济兹拉": "abalathis_azyslla.png",
	"阿巴拉提亚云海": "abalathis_clouds.png",
	"库尔札斯西部高地": "coerthas_west.png",
	"库尔札斯中央高地": "coerthas_central.png",
	"翻云雾海": "dravania_clouds.png",
	"摩杜纳": "mordhona_mordhona.png",
	"龙堡参天高地": "dravania_upper.png",
	"拉诺西亚高地": "lanoscea_upper.png",
	"黑衣森林中央林区": "blackshroud_central.png",
	"黑衣森林东部林区": "blackshroud_east.png",
	"黑衣森林南部林区": "blackshroud_south.png",
	"黑衣森林北部林区": "blackshroud_north.png",
	"西萨纳兰": "thanalan_west.png",
	"西拉诺西亚": "lanoscea_west.png",
	"中萨纳兰": "thanalan_central.png",
	"中拉诺西亚": "lanoscea_central.png",
	"龙堡内陆低地": "dravania_lower.png",
	"拉诺西亚低地": "lanoscea_lower.png",
	"东萨纳兰": "thanalan_east.png",
	"东拉诺西亚": "lanoscea_east.png",
	"南萨纳兰": "thanalan_sourth.png",
	"北萨纳兰": "thanalan_north.png",
	"拉诺西亚外地": "lanoscea_outer.png",
	"云冠群岛": "diadem.png"
};

var pointDataForFilter = null;
var originalPointData = null;


//次採取情報の表示（エオルゼア時間・単位は分）
//NOTE 「180分後に掘れるか」でチェックしているため、採取可能時間は180分未満だと動作不正が生じる。設定変更時は注意！
//NOTE パッチ3.0 updateList にて特殊処理実装。
var timeMiningSpan = 60 * 3;

//時間
var baseTimerId = 0;
var dtEarth = new Object();
var dtEorzea = new Object();

//アラーム
///サウンドリスト
///スマホ用に、同名ファイルで別拡張子の mp3 を用意すること。
var soundList = [
	"beep01.wav", 
	"beep02.wav", 
	"jingle01.wav",
	"jingle02.wav", 
	"jingle03.wav", 
	"flash.wav",

];

///現在の時間更新において発報するアラーム
var currentAlarmList = [];
///発報抑止期間
var restrictAlarmTimeList = {};
var restrictSpan = 60 * 60 * 1000;//ミリ秒

///ダイアログ表示有無
var isShowAlarm = false;

///スクロール検知用
var baseTimetableOffset = null;
var baseFavoriteOffset = null;
var baseCommentOffset = null;
var baseFooterOffset = null;

///マイスケジュール系
var scheduleBaseId = 100000;

///スマホ用選択中ポイントデータ
var smpActivePointData = null;

//定数
var timeAdjust	= 1278950400;//補正
var timeGame	= 144;//補正単位
var timeEarth	= 7;//補正単位

//汎用
var config = {};
var isFirstCall = true;
var isForce = false;
var isDebug = false;
var preFilterCondition = null;

//------------------------------------------------------
//初期化
function init() { 
	if (!("isSMP" in window)) {
		isSMP = false;
	}

	//smp初期化
	smpInit();

	//設定ロード
	loadConfig();

	//データ更新
	updatePointData();

	//アラーム閉じ用イベント設定
	$("#alarmDialogOK").on("click", function(e){ isShowAlarm = false;$.unblockUI() });

	//スタイル調整
	adjustStyle();

	//初回時間更新
	updateTime();
	isFirstCall = false;

	//詳細初期化
	initDetail();

	//フィルタ初期化
	initFilter();

	//パネル初期化
	initTogglePanel();

	//お気に入り＆マイスケジュール初期化
	initFavoriteAndMySchedule();

	//フィルタ更新
	updateItemFilter();

	//アラーム全体初期化
	initAllAlarm();

	//リセットボタン初期化
	initAllResetButton();

	//イベント設定
	$("#filter_area").on("click blur keydown keyup keypress change", updateItemFilter);
	$("#filter_patch").on("click blur keydown keyup keypress change", updateItemFilter);
	$("#filter_point").on("click blur keydown keyup keypress change", updateItemFilter);
	$("#filter_class").on("click blur keydown keyup keypress change", updateItemFilter);
	$("#filter_text").on("click blur keydown keyup keypress change", updateItemFilter);

	//定期時間更新
	setInterval("updateTime()", 1000);

	//スクロール検知初期化
	initScrollCheck();
}

//スクロール検知初期化
function initScrollCheck() {
	if (isSMP) {
		return;
	}

	//初期位置保持
	baseTimetableOffset = $("#posbase_timetable").offset();
	baseFavoriteOffset  = $("#posbase_favorite").offset();
	baseCommentOffset   = $("#posbase_comment").offset();
	baseFooterOffset    = $("#posbase_footer").offset();

	//絶対座標設定
	$("#posbase_favorite").css({
		"position": "absolute",
		"top": baseFavoriteOffset.top + 0,
		"left": baseFavoriteOffset.left
	});
	$("#posbase_detail").css({
		"position": "absolute",
		"top": baseFavoriteOffset.top + $("#posbase_favorite").height() + 15,
		"left": baseFavoriteOffset.left
	});
	$("#posbase_alarm").css({
		"position": "absolute",
		"top": baseFavoriteOffset.top + $("#posbase_favorite").height() + 15 + $("#posbase_detail").height() + 15,
		"left": baseFavoriteOffset.left
	});

	//イベント設定
	$(window).on("scroll", checkScroll);
	$(window).on("resize", checkScroll);

	//一度調整のために強制実行
	checkScroll();
}
function checkScroll() {
	if (isSMP) {
		return;
	}

	var scrollTop = $(window).scrollTop();
	var baseTop = baseTimetableOffset.top;
	var moveTop = 0;

	//必要領域サイズ
	var rightPanelHeight = $("#posbase_favorite").height() + $("#posbase_detail").height() + $("#posbase_alarm").height() + 30;
	//上部チェック
	if (scrollTop > baseTop) {
		moveTop = scrollTop;
	} else {
		moveTop = baseFavoriteOffset.top + 0;
	}

	//下部チェック
	if (moveTop + rightPanelHeight - 8 >= baseTimetableOffset.top + $("#posbase_timetable").height()) {
		//下に移動して、下がはみ出るようであれば、はみ出ない位置に調整
		moveTop = baseTimetableOffset.top + $("#posbase_timetable").height() - rightPanelHeight - 8;

		//これで上がはみでるようであれば、あきらめて一番上に表示する
		if (moveTop < baseFavoriteOffset.top) {
			moveTop = baseFavoriteOffset.top + 0;
		}
	}

	//移動
	$("#posbase_favorite").css("top", moveTop);
	$("#posbase_detail").css(  "top", moveTop + $("#posbase_favorite").height() + 20);
	$("#posbase_alarm").css(   "top", moveTop + $("#posbase_favorite").height() + 20 + $("#posbase_detail").height() + 20);

	// 広告などを移動
	//起点位置の計算
	var listBottom = $("#posbase_timetable").offset().top + $("#posbase_timetable").height();
	var alarmBottom = $("#posbase_alarm").offset().top + $("#posbase_alarm").height();
	var baseBottom = (listBottom > alarmBottom ? listBottom : alarmBottom);

	//console.log("list=" + listBottom + ",alarm=" + alarmBottom + " => " + baseBottom);
	//移動
	var tmpLeft = ($(window).width() - 728) / 2;
	$("#posbase_comment").css({"position": "absolute", "top": baseBottom + 40, "left": $("#posbase_header").offset().left });
	$("#posbase_footer").css({"width": "90%", "position": "absolute", "top": baseBottom + 20, "left": 0 });

	// posbase_ad
	// posbase_comment
	// posbase_footer

	//背景整備
	updateBackLine();
}
function updateBackLine() {
	//timetable
	$("#posbase_timetable").css({
		"position": "absolute",
		"top": baseTimetableOffset.top,
		"left": $("#posbase_header").offset().left + 5
	});

	//detail, alarm
	//初期位置における差分量
	var baseDiff = baseFavoriteOffset.left - baseTimetableOffset.left;
	$("#posbase_favorite").css({
		"left": $("#posbase_timetable").offset().left + baseDiff
	});
	$("#posbase_detail").css({
		"left": $("#posbase_timetable").offset().left + baseDiff
	});
	$("#posbase_alarm").css({
		"left": $("#posbase_timetable").offset().left + baseDiff
	});

	//左側背景
	var left = $("#posbase_header").offset().left - 15;
	if (left < 0) {
		$("#back_gray0").hide();
	} else {
		$("#back_gray0").css({
			"left": 0,
			"width": left,
			"height": $("#posbase_footer").offset().top + $("#posbase_footer").height()
		});
		$("#back_gray0").show();
	}

	//右側背景
	var right = $("#posbase_header").offset().left + $("#posbase_header").width() + 30;
	var windowWidth = $(window).width();
	if (right > windowWidth) {
		$("#back_gray1").hide();
	} else {
		$("#back_gray1").css({
			"left": right,
			"width": windowWidth - right,
			"height": $("#posbase_footer").offset().top + $("#posbase_footer").height()
		});
		$("#back_gray1").show();
	}
}

function initTogglePanel() {
	if (isSMP) {
		return;
	}

	var panelBtnList = $(".panel_toggle_base");

	for (var i = 0;i < panelBtnList.length;i++) {
		var panel = panelBtnList[i];

		//ID抽出
		var id = $(panel).prop("id");
		if (-1 == id.indexOf("panel_toggle_")) {
			continue;
		}
		var panelName = id.substr(13);

		var configKeyName = "is_show_" + panelName;
		var isShow = (null != config[configKeyName] && true == config[configKeyName]);

		//マーク設定
		var markText = (isShow ? "▲" : "▼");
		$(panel).text(markText);

		//パネル設定
		var panelMainId = "panel_main_" + panelName;

		//表示切替
		if ("panel_main_detail_list" == panelMainId) {
			//DETAILパネル内リスト
			if (isShow) {
				$("#detail_item_area").show();
				$("#panel_main_detail_list0").hide();//位置確保用ダミーアイテム
				$("#panel_main_detail_list1").show();
			} else {
				$("#detail_item_area").hide();
				$("#panel_main_detail_list0").show();//位置確保用ダミーアイテム
				$("#panel_main_detail_list1").hide();
			}
		} else {
			//パネル全体
			if (isShow) {
				$("#" + panelMainId).show();
			} else {
				$("#" + panelMainId).hide();
			}
		}

		//マウス操作設定
		$(panel).on("mouseover", {"obj": $(panel), "type": 1}, onTogglePanelBtnMousePerform);
		$(panel).on("mouseout" , {"obj": $(panel), "type": 0}, onTogglePanelBtnMousePerform);
		$(panel).on("mouseup"  , {"obj": $(panel), "type": 1}, onTogglePanelBtnMousePerform);
		$(panel).on("mousedown", {"obj": $(panel), "type": 2}, onTogglePanelBtnMousePerform);
		$(panel).on("click",     {"obj": $(panel)           }, onTogglePanelBtnToggle);
	}

}
function onTogglePanelBtnToggle(e) {
	var panel = e.data["obj"];
	if (null == panel) {
		return;
	}

	//ID抽出
	var id = panel.prop("id");
	if (-1 == id.indexOf("panel_toggle_")) {
		return;
	}
	var panelName = id.substr(13);

	var configKeyName = "is_show_" + panelName;
	var isShow = (null != config[configKeyName] && true == config[configKeyName]);

	//定義判定
	isShow = !isShow;

	//マーク設定
	var markText = (isShow ? "▲" : "▼");
	$(panel).text(markText);

	//パネル設定
	var panelMainId = "panel_main_" + panelName;
	//表示切替
	if ("panel_main_detail_list" == panelMainId) {
		//DETAILパネル内リスト
		if (isShow) {
			$("#detail_item_area").show();
			$("#panel_main_detail_list0").hide();//位置確保用ダミーアイテム
			$("#panel_main_detail_list1").show();
		} else {
			$("#detail_item_area").hide();
			$("#panel_main_detail_list0").show();//位置確保用ダミーアイテム
			$("#panel_main_detail_list1").hide();
		}
	} else {
		//パネル全体
		if (isShow) {
			$("#" + panelMainId).show();
		} else {
			$("#" + panelMainId).hide();
		}
	}

	//マップ再配置
	if (null != clickLineBaseId) {
		onClickLine(clickLineBaseId, clickLineBaseObject);
	}

	checkScroll();

	//データ保存
	config[configKeyName] = isShow;
	saveConfig();

}
function onTogglePanelBtnMousePerform(e) {
	var viewType = e.data["type"];
	var obj = e.data["obj"];
	if (null == viewType || null == obj) {
		return;
	}

	if (2 == viewType) {
		$(obj).removeClass("panel_toggle_hover");
		$(obj).removeClass("panel_toggle_press");
		$(obj).addClass("panel_toggle_press");

	} else if (1 == viewType) {
		$(obj).removeClass("panel_toggle_hover");
		$(obj).removeClass("panel_toggle_press");
		$(obj).addClass("panel_toggle_hover");

	} else {
		$(obj).removeClass("panel_toggle_hover");
		$(obj).removeClass("panel_toggle_press");
	}
}

//スタイル調整
function adjustStyle() {
	var browserType = "chrome";
	var ua = window.navigator.userAgent.toLowerCase();
	if (-1 != ua.indexOf("chrome")) {
		browserType = "chrome";
	} else if (-1 != ua.indexOf("firefox")) {
		browserType = "ff";
	} else if (-1 != ua.indexOf("trident")) {
		browserType = "ie";
	} else {
		browserType = "chrome"; //default
	}
	if ("ff" == browserType || "ie" == browserType) {
		$(".control_select_mark").css("display", "none");
	}
}

//アラーム全体操作
function initAllAlarm() {
	$("#status_all_alarm").on("click", onClickAllAlarm);
	setAlarmStatus(config["is_alarm_active"]);
}
function onClickAllAlarm() {
	//今 enabled であれば、disabled にする
	var isNextStatus = !($("#status_all_alarm").hasClass("all_alarm_enable"));
	setAlarmStatus(isNextStatus);
	saveConfig();
}
function setAlarmStatus(isActive) {
	if (isActive) {
		//ボタン更新
		$("#status_all_alarm").addClass("all_alarm_enable");
		$("#status_all_alarm").removeClass("all_alarm_disable");
		$("#status_all_alarm img").attr("src", "image/sys/bell.png");
		$("#status_all_alarm span").text(mlt_alarm_enabled);

		//配下の要素を enabled/disabled化
		$("#contents_all_alarm").removeClass("all_alarm_ctrl_disabled");
		$("#contents_all_alarm *").each(function() {
			var tagName = $(this).get(0).tagName.toLowerCase();
			if ("select" == tagName || "input" == tagName) {
				$(this).prop("disabled", false);
			}
		});
	} else {
		//ボタン更新
		$("#status_all_alarm").addClass("all_alarm_disable");
		$("#status_all_alarm").removeClass("all_alarm_enable");
		$("#status_all_alarm img").attr("src", "image/sys/bell_disabled.png");
		$("#status_all_alarm span").text(mlt_alarm_disabled);

		//配下の要素を enabled/disabled化
		$("#contents_all_alarm").addClass("all_alarm_ctrl_disabled");
		$("#contents_all_alarm *").each(function() {
			var tagName = $(this).get(0).tagName.toLowerCase();
			if ("select" == tagName || "input" == tagName) {
				$(this).prop("disabled", true);
			}
		});
	}


}

//------------------------------------------------------------------------------------
//お気に入り＆マイスケジュール
function initFavoriteAndMySchedule() {
	initFavorite();
	initMySchedule();
	initToggleFavorite();
}

//パネル切り替え処理
function initToggleFavorite() {

	//初期表示パネルを設定
	toggleFavoriteContents(config["favoriteContentType"], true);

}
function toggleFavoriteContents(type) {
	toggleFavoriteContents(type, false);
}
function toggleFavoriteContents(type, isInit) {
	if (0 == type) {
		//to Favorite
		$("#toggle_panel_favorite").show();
		$("#toggle_panel_myschedule").hide();
		$("#header_favorite").html(
			"<img src='image/sys/caption_favorite.png'> / " + 
			"<a href='javascript:void(0)' onclick='toggleFavoriteContents(1)'><img src='image/sys/caption_my_schedule.png' style='height: 16px;border: 0'></a>"
		);
	} else {
		//to MySchedule
		$("#toggle_panel_myschedule").show();
		$("#toggle_panel_favorite").hide();
		$("#header_favorite").html(
			"<img src='image/sys/caption_my_schedule.png'> / " + 
			"<a href='javascript:void(0)' onclick='toggleFavoriteContents(0)'><img src='image/sys/caption_favorite.png' style='height: 16px;border: 0'></a>"
		);
	}

	if (!isInit) {
		//パネル内容変更に伴い、パネル全体サイズの変更が発生
		//それにあわせてDETAIL,ALARMの位置を調整
		checkScroll();

		//設定保存（アクティブコンテンツ保持）
		saveConfig();
	}
}

//------------------------------
//マイスケジュール
function initMySchedule() {
	//起点時間
	var html = "";
	for (var h = 0;h < 24;h++)  {
		for (var m = 0;m < 60;m += 15) {
			var selected = ("" == html ? " selected" : "");
			html += sprintf("<option value=\"{0}:{1}\"{2}>{0}:{1}</option>", [
				paddingLeft(h, 2),
				paddingLeft(m, 2),
				selected
			]);
		}
	}
	$("#myschedule_start_time").html(html);

	//有効期間
	html = "";
	for (var h = 0;h < 10;h++)  {
		for (var m = 0;m < 60;m += 15) {
			if (h == 0 && m == 0) {
				continue;
			}
			var selected = (h == 3 && m == 0 ? " selected" : "");
			html += sprintf("<option value=\"{0}:{1}\"{2}>{0}h {1}m</option>", [
				h,
				paddingLeft(m, 2),
				selected
			]);
		}
	}
	$("#myschedule_span_time").html(html);

	//ロードした設定を表示に追加
	$("#myschedule_list").empty();
	refreshMyScheduleView();

	changeMyScheduleStatus();

	$("#myschedule_name_text").on("click blur keydown keyup keypress change", changeAddMyScheduleName);
	$("#myschedule_list").on("change", changeMyScheduleSelection);
}
function getMyScheduleSelectedIndex() {
	var id = $("#myschedule_list").val();
	var index = -1;
	var data = null;

	for (var i = 0;i < config["myschedule"].length;i++) {
		if (config["myschedule"][i]["id"] == id) {
			index = i;
			data = config["myschedule"][i];
			break;
		}
	}
	return index;
}

function deleteMySchedule() {
	var index = getMyScheduleSelectedIndex();
	if (-1 == index) {
		return;
	}
	var data = config["myschedule"][index];
	config["myschedule"].splice(index, 1);
	refreshMyScheduleView();
	changeMyScheduleStatus();

	//対象データが選択中リストに入っていたら消す
	var targetId = "list-" + String(scheduleBaseId + Number(data["id"]));
	index = config["alarm"].indexOf(targetId);
	if (-1 != index) {
		config["alarm"].splice(index, 1);
	}
	
	//対象データがお気に入りに入っていたら消す
	for (var i in config["favorite"]) {
		index = config["favorite"][i]["list"].indexOf(targetId);
		if (-1 != index) {
			config["favorite"][i]["list"].splice(index, 1);
		}
	}

	//対象データがアラーム制限に入っていたら消す
	if (null != restrictAlarmTimeList[targetId]) {
		delete restrictAlarmTimeList[targetId];
	}

	saveConfig();
	changeMyScheduleSelection();

	//データ再初期化
	updatePointData();
	updateItemFilter();
	checkScroll();
	updateTime();

}
function addMySchedule() {
	var scheduleName = $("#myschedule_name_text").val();
	if ("" == scheduleName) {
		alert("お気に入りの名前を設定してください。");
		return;
	}
	var id = getNewMyScheduleId();
	var data = {
		"id": id,
		"name": scheduleName,
		"start": $("#myschedule_start_time").val().replace(/^0/, ""),
		"span": $("#myschedule_span_time").val()
	};
	config["myschedule"].push(data);
	saveConfig();

	//addMyScheduleToView(data);
	refreshMyScheduleView();
	$("#myschedule_name_text").val("");
	changeAddMyScheduleName();
	changeMyScheduleSelection();

	//データ再初期化
	updatePointData();
	updateItemFilter();
	checkScroll();
	updateTime();
}
function getNewMyScheduleId() {
	var ret = 0;
	for (var i in config["myschedule"]) {
		if (config["myschedule"][i]["id"] >= ret) {
			ret = config["myschedule"][i]["id"] + 1;
		}
	}
	return ret;
}

function addMyScheduleToView(data) {
	var spans = data["span"].split(":");

	var optName = sprintf("{0} [{1}h {2}m] : {3}", [
		data["start"],
		spans[0],
		spans[1],
		data["name"]
	]);
	var optValue = data["id"];

	$("#myschedule_list").append($("<option>").html(optName).val(optValue));

}
function refreshMyScheduleView() {
	var selectedValue = $("#myschedule_list").val();
	config["myschedule"].sort(function(a, b) {
		var va = Number(a["start"].replace(":", ""));
		var vb = Number(b["start"].replace(":", ""));
		var ret = va - vb;
		if (0 == ret) {
			va = Number(a["span"].replace(":", ""));
			vb = Number(b["span"].replace(":", ""));
			ret = va - vb;
		}
		return ret;
	});
	var html = "";
	for (var i in config["myschedule"]) {
		var data = config["myschedule"][i];
		var spans = data["span"].split(":");
		var optName = sprintf("{0} [{1}h {2}m] : {3}", [
			data["start"],
			spans[0],
			spans[1],
			data["name"]
		]);
		html += sprintf("<option value=\"{0}\">{1}</option>", [data["id"], optName]);
	}
	$("#myschedule_list").html(html);
	if (null != selectedValue) {
		$("#myschedule_list").val(selectedValue);
	}

}

function deleteMyScheduleToView(data) {
	$("#myschedule_list option[value=" + data["id"] + "]").remove();
}
function changeMyScheduleSelection() {
	changeMyScheduleStatus();
}
function changeAddMyScheduleName() {
	var text = $("#myschedule_name_text").val();
	var isEnabled = true;
	if (null == text || "" == text) {
		isEnabled = false;
	}
	setFavoriteEnabled("myschedule_add", isEnabled);
}

function changeMyScheduleStatus() {
	var id = $("#myschedule_list").val();
	var isEnabled = true;
	if (null == id || "" == id) {
		isEnabled = false;
	}
	setMyScheduleEnabled("myschedule_delete", isEnabled);
}
function setMyScheduleEnabled(id, isEnabled) {
	if (isEnabled) {
		$("#" + id).removeAttr("disabled");
		$("#" + id).css("color", (isSMP ? "#000000" : "#ffffff"));
	} else {
		$("#" + id).attr("disabled", "disabled");
		$("#" + id).css("color", "#808080");
	}
}



//------------------------------
// お気に入り
function initFavorite() {
	$("#favorite_list").empty();
	for (var i in config["favorite"]) {
		addFavoriteListToView(config["favorite"][i]);
	}
	changeFavoriteStatus();

	$("#new_favorite_name").on("click blur keydown keyup keypress change", changeAddFavoriteText);
	$("#favorite_list").on("change", changeFavoriteSelection);
}
function changeFavoriteSelection() {
	var id = $("#favorite_list").val();
	var isEnabled = true;
	if (null == id || "" == id) {
		isEnabled = false;
	}
	setFavoriteEnabled("favorite_show", isEnabled);
	setFavoriteEnabled("favorite_delete", isEnabled);
}
function changeAddFavoriteText() {
	var text = $("#new_favorite_name").val();
	var isEnabled = true;
	if (null == text || "" == text) {
		isEnabled = false;
	}
	setFavoriteEnabled("favorite_add", isEnabled);
}
function dblclickFavorite() {
	showFavorite();
}
function showFavorite() {
	var index = getFavoriteSelectedIndex();
	if (-1 == index) {
		return;
	}
	var data = config["favorite"][index];
	showFavoriteToView(data);
}
function addFavorite() {
	if (0 == config["alarm"].length) {
		alert("お気に入りに設定するアイテムが選択されていません。1つ以上ベルを有効にしてください。");
		return;
	}
	var favName = $("#new_favorite_name").val();
	if ("" == favName) {
		alert("お気に入りの名前を設定してください。");
		return;
	}
	var id = getNewFavoriteId();
	var newList = [];
	for (var i in config["alarm"]) {
		newList.push(config["alarm"][i]);
	}
	var data = {
		"id": id,
		"name": favName,
		"list": newList,
		"filter": {
			"area": $("#filter_area").val(),
			"patch": $("#filter_patch").val(),
			"point": $("#filter_point").val(),
			"class": $("#filter_class").val(),
			"search": $("#filter_text").val()
		}
	};
	config["favorite"].push(data);
	saveConfig();

	addFavoriteListToView(data);
	$("#new_favorite_name").val("");
	changeAddFavoriteText();
	changeFavoriteSelection();
}
function getNewFavoriteId() {
	var ret = 0;
	for (var i in config["favorite"]) {
		if (config["favorite"][i]["id"] >= ret) {
			ret = config["favorite"][i]["id"] + 1;
		}
	}
	return ret;
}
function deleteFavorite() {
	var index = getFavoriteSelectedIndex();
	if (-1 == index) {
		return;
	}
	var data = config["favorite"][index];
	config["favorite"].splice(index, 1);
	deleteFavoriteListToView(data);
	changeFavoriteStatus();
	saveConfig();
	changeFavoriteSelection();
}
function getFavoriteSelectedIndex() {
	var id = $("#favorite_list").val();
	var index = -1;
	var data = null;

	for (var i = 0;i < config["favorite"].length;i++) {
		if (config["favorite"][i]["id"] == id) {
			index = i;
			data = config["favorite"][i];
			break;
		}
	}
	return index;
}
function changeFavoriteStatus() {
	var id = $("#favorite_list").val();
	var isEnabled = true;
	if (null == id || "" == id) {
		isEnabled = false;
	}
	setFavoriteEnabled("favorite_show", isEnabled);
	setFavoriteEnabled("favorite_delete", isEnabled);

}
function setFavoriteEnabled(id, isEnabled) {
	if (isEnabled) {
		$("#" + id).removeAttr("disabled");
		$("#" + id).css("color", (isSMP ? "#000000" : "#ffffff"));
	} else {
		$("#" + id).attr("disabled", "disabled");
		$("#" + id).css("color", "#808080");
	}
}

function addFavoriteListToView(favData) {
	$("#favorite_list").append($("<option>").html(favData["name"]).val(favData["id"]));
}
function deleteFavoriteListToView(data) {
	$("#favorite_list option[value=" + data["id"] + "]").remove();
}


function showFavoriteToView(data) {
	//アラームリストの設定解除
	var tmpList = [];
	for (var i in config["alarm"]) {
		tmpList.push(config["alarm"][i]);
	}

	var suffix = (isSMP ? "" : "_bell");
	for (var i in tmpList) {
		if (isSMP) {
			forceSMPClickBell(tmpList[i] + suffix, false);
		} else {
			forceClickBell(tmpList[i] + suffix, false);
		}
	}

	for (var i in data["list"]) {
		if (isSMP) {
			forceSMPClickBell(data["list"][i] + suffix, true);
		} else {
			forceClickBell(data["list"][i] + suffix, true);
		}
	}

	//その他の条件復旧
	isForce = true;
	$("#filter_area").val(data["filter"]["area"]);
	$("#filter_patch").val(data["filter"]["patch"]);
	$("#filter_point").val(data["filter"]["point"]);
	$("#filter_class").val(data["filter"]["class"]);
	$("#filter_text").val(data["filter"]["search"]);
	isForce = false;
	updateItemFilter();

	if (isSMP) {
		moveToId('list')
	}
}

//リセットボタン初期化
function initAllResetButton() {

	if (!isSMP) {
		$("#btn_reset").on("mouseover", onMouseOverAllResetButton);
		$("#btn_reset").on("mouseout",  onMouseOutAllResetButton);
		$("#btn_reset").on("mouseup",   onMouseUpAllResetButton);
		$("#btn_reset").on("mousedown", onMouseDownAllResetButton);
		$("#btn_reset").on("click",     onClickAllResetButton);

		$("#btn_bell_reset").on("mouseover", onMouseOverBellResetButton);
		$("#btn_bell_reset").on("mouseout",  onMouseOutBellResetButton);
		$("#btn_bell_reset").on("mouseup",   onMouseUpBellResetButton);
		$("#btn_bell_reset").on("mousedown", onMouseDownBellResetButton);
		$("#btn_bell_reset").on("click",     onClickBellResetButton);
	}
}
function onMouseOverAllResetButton() {
	$("#btn_reset").removeClass("all_reset_click");
	$("#btn_reset").addClass("all_reset_hover");
}
function onMouseOutAllResetButton() {
	$("#btn_reset").removeClass("all_reset_click");
	$("#btn_reset").removeClass("all_reset_hover");
}
function onMouseUpAllResetButton() {
	$("#btn_reset").removeClass("all_reset_click");
	$("#btn_reset").addClass("all_reset_hover");
}
function onMouseDownAllResetButton() {
	$("#btn_reset").addClass("all_reset_click");
	$("#btn_reset").removeClass("all_reset_hover");
}
function onClickAllResetButton() {
	isForce = true;
	$("#filter_area").val(0);
	$("#filter_patch").val(0);
	$("#filter_point").val(0);
	$("#filter_class").val(0);
	$("#filter_text").val("");
	isForce = false;
	updateItemFilter();
}
function onMouseOverBellResetButton() {
	$("#btn_bell_reset").removeClass("all_reset_click");
	$("#btn_bell_reset").addClass("all_reset_hover");
}
function onMouseOutBellResetButton() {
	$("#btn_bell_reset").removeClass("all_reset_click");
	$("#btn_bell_reset").removeClass("all_reset_hover");
}
function onMouseUpBellResetButton() {
	$("#btn_bell_reset").removeClass("all_reset_click");
	$("#btn_bell_reset").addClass("all_reset_hover");
}
function onMouseDownBellResetButton() {
	$("#btn_bell_reset").addClass("all_reset_click");
	$("#btn_bell_reset").removeClass("all_reset_hover");
}
function onClickBellResetButton() {

	//アラームリストの設定解除
	var tmpList = [];
	for (var i in config["alarm"]) {
		tmpList.push(config["alarm"][i]);
	}

	var suffix = (isSMP ? "" : "_bell");
	for (var i in tmpList) {
		if (isSMP) {
			forceSMPClickBell(tmpList[i] + suffix, false);
		} else {
			forceClickBell(tmpList[i] + suffix, false);
		}
	}

}

//詳細初期化
function initDetail() {
	var html = "";
	for (var i = 0;i < 8;i++) {

		html += sprintf(
			"<div id=\"itemlist-{0}\" class=\"itemlist_base\">" +
			"<div class=\"itemlist_image\"><img id=\"itemlist-{0}_image_img\" src=\"image/sys/icon_error.png\" class=\"itemlist_image_image\">" +
			"</div>" +
			"<div id=\"itemlist-{0}_text\" class=\"itemlist_text\">-</div>" +
			"</div>", [i]);
	}
	$("#detail_item_area").html(html);
}

//リスト作成
function createList() {
	var html = "";

	//disabled状態で作成
	for (var i in pointData) {
		var data = pointData[i];
		var id = "list-" + data["pointId"];

		//var lvText = "[Lv" + pointData[i]["lv"] + "] ";
		var lvText = ("" == data["pointS"] ? "" : "[" + data["pointS"].replace(/ .*$/, "") + "] ");
		var template = "";
		if (isSMP) {
			//スマホ
			template += '<tr id="{0}_main">';
			if (24 == data["timeLimit"]) {
				template += '<td nowrap class="listtable_bell"></td>';
			} else {
				template += '<td nowrap id="{0}_image" onclick="smpOnClickBell(\'{0}\')" class="listtable_bell"><img src="image/sys/bell_disabled.png" id="{0}_image_bell"></td>';
			}
			template += '<td nowrap id="{0}_line0" onclick="onClickLine(\'{0}\')" class="listtable_time">{1}</td>';
			template += '<td nowrap id="{0}_line1" onclick="onClickLine(\'{0}\')" class="listtable_stat"></td>';
			template += '<td nowrap id="{0}_line2" onclick="onClickLine(\'{0}\')" class="listtable_mark"><img src="{2}"></td>';
			template += '<td        id="{0}_line3" onclick="onClickLine(\'{0}\')" class="listtable_text">{3}</td>';
			template += '</tr>';

			html += sprintf(template, [
				id,
				(24 == data["timeLimit"] ? mlt_anytime : data["timeFrom"]),
				("园艺工" == data["type"] ? "image/smp/icon_btn_24.png" : "image/smp/icon_min_24.png"),
				lvText + getDefaultItem(data),
			]);

		} else {
			//PC
			/*
			<tr>
				<td><img src="image/sys/bell_disabled.png"></td>
				<td>23:59</td>
				<td>11:15</td>
				<td>园艺工</td>
				<td>39:ﾄﾘﾘｳﾑの球根/ﾐﾆﾏﾝﾄﾞﾗｺﾞﾗ</td>
			</tr>
			*/

			template = "<tr id=\"{0}\" class=\"\">" +
				(24 == data["timeLimit"] 
					? "<td id=\"{0}_bell\"{4}><img id=\"{0}_bell_image\" src=\"image/sys/bell_disabled.png\" class=\"gtmtable_bell\" style=\"visibility: hidden\"></td>"
					: "<td id=\"{0}_bell\"{4}><img id=\"{0}_bell_image\" src=\"image/sys/bell_disabled.png\" class=\"gtmtable_bell\"></td>") + 
				"<td id=\"{0}_line0\"{5}>{1}</td>" + 
				"<td id=\"{0}_line1\"{5}><span id=\"{0}_limit\">--:--</span></td>" + 
				"<td width=\"60px\" id=\"{0}_line2\"{5}>{2}</td>" + 
				"<td id=\"{0}_line3\"{5}>{3}</td>" + 
				"</tr>";

			html += sprintf(template, [
						id, 
						(24 == data["timeLimit"] ? mlt_anytime : data["timeFrom"]),
						translateByType("job", data["type"]),
						lvText + getDefaultItem(data),
						" onclick=\"onClickBell('" + id + "_bell')\"",
						" onclick=\"onClickLine('" + id + "')\" onmouseover='onMouseOverLine(this)' onmouseout='onMouseOutLine(this)'",
					]
			);
		}
	}

	$("#list").html(html);

	//初期設定復旧
	for (var i in config["alarm"]) {
		var baseId = config["alarm"][i];
		if (isSMP) {
			$("#" + baseId + "_image_bell").attr("src", "image/sys/bell.png");
		} else {
			$("#" + baseId + "_bell_image").attr("src", "image/sys/bell.png");
		}
	}


}

//代表アイテム文字列返却
function getDefaultItem(data) {
	var ret = "";

	if ("jp" == lang) {
		ret = data["mainItem"];

	} else {
		var itemName = data["items"][data["mainIndex"] - 1];
		ret = translateByType("item", itemName);

		var count = 0;
		for (var i in data["items"]) {
			if ("-" != data["items"][i]) {
				count++;
			}
		}
		if (count > 1) {
			ret += ", etc";
		}
	}


	return ret;
}
//------------------------------------------------------
//フィルタ初期化
function initFilter() {

	//エリアリスト
	var selected = "";
	var html = "";
	for (var i in areaList) {
		selected = (i == $("#filter_area").val() ? " selected" : "");

		html += sprintf("<option value=\"{0}\"{1}>{2}</option>", [
			i, selected, translateByType("areaList", areaList[i])
		]);
	}
	$("#filter_area").html(html);

	//ポイント
	html = "";
	for (var i in pointTypeList) {
		selected = (i == $("#filter_point").val() ? " selected" : "");

		html += sprintf("<option value=\"{0}\"{1}>{2}</option>", [
			i, selected, translateByType("pointTypeList", pointTypeList[i])
		]);
	}
	$("#filter_point").html(html);


	//クラス
	html = "";
	for (var i in classTypeList) {
		selected = (i == $("#filter_class").val() ? " selected" : "");

		html += sprintf("<option value=\"{0}\"{1}>{2}</option>", [
			i, selected, translateByType("job", classTypeList[i])
		]);
	}
	$("#filter_class").html(html);

	//パッチ
	html = "";
	for (var i in patchList) {
		selected = (i == $("#filter_patch").val() ? " selected" : "");

		html += sprintf("<option value=\"{0}\"{1}>{2}</option>", [
			i, selected, translateByType("patchList", patchList[i])
		]);
	}
	$("#filter_patch").html(html);

	//パッチ選択文字列1個目
	$("#filter_patch option:first").html(areaList[0][lang]);

	//表示モード
	html = "";
	for (var i in viewModeList) {
		selected = (i == $("#view_mode").val() ? " selected" : "");

		html += sprintf("<option value=\"{0}\"{1}>{2}</option>", [
			i, selected, translateByType("viewModeList", viewModeList[i])
		]);
	}
	$("#view_mode").html(html);


}

//------------------------------------------------------
//フィルタ処理
function updateItemFilter() {
	if (isForce) {
		return;
	}
	var filterText = $("#filter_text").val();
	if (null == filterText) {
		return;
	}

	//同一条件判定
	var filterCondition = 
		$("#filter_area").val() + "\t" + 
		$("#filter_patch").val() + "\t" + 
		$("#filter_point").val() + "\t" + 
		$("#filter_class").val() + "\t" + 
		$("#filter_text").val();

	if (null != preFilterCondition && preFilterCondition == filterCondition) {
		return;
	}
	preFilterCondition = filterCondition;

	saveConfig(); //フィルタテキストの保存

	//フィルタテキスト一覧作成
	var filterTextList = [];

	var tmp = filterText.split(/[　| ]+/);
	for (var i in tmp) {
		if (null != tmp[i] && "" != tmp[i]) {

			//記号＞半角変換　ひらがなカタカナ＞全角カタカナ変換
			var searchText = tmp[i];
			searchText = halfKanaCharToFullKanaChar(searchText);
			searchText = fullHiraganaCharToFullKanaChar(searchText);
			searchText = halfSymbolToFullSymbol(searchText);
			searchText = searchText.toLowerCase();

			if (-1 == filterTextList.indexOf(searchText)) {
				filterTextList.push(searchText);
			}
		}
	}

	//検索用文字列作成
	//エリア
	var filterArea = $("#filter_area").val();
	var filterAreaText = areaList[filterArea];
	if (0 == filterArea) {
		filterAreaText = "";
	}

	//クラス
	var filterClass = $("#filter_class").val();

	//パッチ
	var filterPatch = $("#filter_patch").val();
	var filterPatchText = "";
	if (0 != filterPatch) {
		filterPatchText = patchList[filterPatch];
	}

	//ポイント
	var filterPoint = $("#filter_point").val();

	//チェック及び表示
	for (var i in pointDataForFilter) {
		var data = pointDataForFilter[i];
		var id = "list-" + data["pointId"];
		var isBelled = (-1 != $.inArray(id, config["alarm"]));

		if (isSMP) {
			id += "_main";
		}

		var isShow = false;

		//フィルタ判定
		while (1) {
			//クラス
			if ((1 == filterClass && "园艺工" != data["type"]) ||
				(2 == filterClass && "采矿工" != data["type"])) {
				break;
			}

			//パッチ
			if ("" != filterPatchText) {
				if (-1 == data["patch"].indexOf(filterPatchText)) {
					break;
				}
			}

			//エリア
			if ("" != filterAreaText) {
				if (-1 == data["area"].indexOf(filterAreaText)) {
					break;
				}
			}

			//ポイント
			if (0 != filterPoint) {
				/*
					1	通常
					2	未知系全て
					3	未知＋刻限
					4	未知
					5	刻限
					6	伝説
					7	ベル付き
				*/
				var ptype = pointData[i]["ptype"];
				if ((1 == filterPoint && "通常" == ptype) ||
					(2 == filterPoint && ("未知" == ptype || "刻限" == ptype || "传说" == ptype)) ||
					(3 == filterPoint && ("未知" == ptype || "刻限" == ptype)) ||
					(4 == filterPoint && "未知" == ptype) ||
					(5 == filterPoint && "刻限" == ptype) ||
					(6 == filterPoint && "传说" == ptype) ||
					(7 == filterPoint && isBelled) ||
					(8 == filterPoint && "护符" == ptype) ||
					(9 == filterPoint && "云海" == ptype)
					) {
				} else {
					break;
				}
			}

			//テキスト
			if (0 != filterTextList.length) {
				for (var j in filterTextList) {
					var targetText = filterTextList[j];
					var targetText2 = filterTextList[j].replace("-", "");
					if (-1 != data["search"].indexOf(targetText) || -1 != data["search"].indexOf(targetText2)) {
						isShow = true;
						break;
					}
				}
				if (!isShow) {
					break;
				}
			}

			isShow = true;
			break;
		}
		if (isShow) {
			//<td id="list-103_line3">[Lv60] 硬銀砂/白雲母</td>
			//テキスト補正
			var textId = "";
			if (isSMP) {
				textId = "#" + id.replace("_main", "") + "_line3";
			} else {
				textId = "#" + id + "_line3";
			}

			///オリジナルの確保
			if (null == $(textId).attr("x-text")) {
				$(textId).attr("x-text", $(textId).text());
			}

			///検索にヒットした完全なアイテム名を取得
			data = pointData[i];
			var hitItems = [];
			var tmpItems = data["items"].concat(data["hiddens"]);
			var tmpItem = "";
			for (var j in tmpItems) {
				tmpItem = tmpItems[j];
				if ("" == tmpItem || "-" == tmpItem) {
					continue;
				}
				if ("jp" == lang) {
					tmpItem = halfKanaCharToFullKanaChar(tmpItem);
					tmpItem = fullHiraganaCharToFullKanaChar(tmpItem);
					tmpItem = halfSymbolToFullSymbol(tmpItem);
				} else {
					tmpItem = " " + translateByType("item", tmpItem);
				}
				if (-1 != tmpItem.toLowerCase().indexOf(targetText)) {
					hitItems.push(tmpItems[j]);
				}
			}

			///LVとアイテムに分解
			var viewText = $(textId).attr("x-text");
			if (0 != hitItems.length) {
				if (data["viewIndex"] >= scheduleBaseId) {
					//MyScheduleはデフォルトのまま
				} else {
					var tmpLvItems = viewText.split(" ", 2);
					//console.log(data);
					viewText = tmpLvItems[0] + " ";
					for (var j in hitItems) {
						viewText += (0 != j ? "/" : "" ) + hitItems[j];
					}
				}
				if (viewTextLength(viewText) >= 44) {
					viewText = cutViewText(viewText, 44);
				}
			}

			$(textId).text(viewText);

			//表示
			$("#" + id).show();


		} else {
			$("#" + id).hide();
		}
	}

	//表示更新
	preTopItemIndex = -1;
	updateList();

}

//------------------------------------------------------
//ベルクリック
function forceClickBell(id, isActive) {
	onClickBellHelper(id, isActive);
}
function onClickBell() {
	var id = $(this).attr("id");//list2_bell
	var bellId = id + "_image";
	var baseId = id.replace("_bell", "");
	var index = config["alarm"].indexOf(baseId);

	var isActive = (-1 == index);
	onClickBellHelper(id, isActive);
}
function onClickBell(id) {
	var bellId = id + "_image";
	var baseId = id.replace("_bell", "");
	var index = config["alarm"].indexOf(baseId);

	//console.log(bellId + ", " + baseId + ", " + index );
	var isActive = (-1 == index);
	onClickBellHelper(id, isActive);
}
function onClickBellHelper(id, isActive) {
	//PC:  list-5_bell
	//SMP: こない
	//var id = $(this).attr("id");//list2_bell
	var bellId = id + "_image";
	var baseId = id.replace("_bell", "");

	var index = config["alarm"].indexOf(baseId);

	//24時間チェック
	var pointId = baseId.replace("list-", "");
	var targetData = getPointDataByPointId(pointId);

	if (24 == targetData["timeLimit"]) {
		return;
	}

	if (isActive) {
		//on
		//クリックした瞬間にアラート範囲にいるのであれば、先に制限リストにいれておく
		//N分前通知
		var timing = Number($("#notify_timing").val());
		//地球時間N分を、ETN分に変換
		var adjustETMin = timing * timeGame / timeEarth;

		/*
		for (var i in pointData) {
			var data = pointData[i];
			var tmpId = "list-" + data["pointId"];
			if (tmpId != baseId) {
				continue;
			}
			if (isInTime(data["timeFrom"], data["timeTo"], adjustETMin)) {
				//リアル60分間は発報しない
				//console.log("set restrict with bell");
				restrictAlarmTimeList[tmpId] = getCurrentEarthTime() + restrictSpan;
				console.log("set restrict(onclick): " + tmpId + " => " + restrictAlarmTimeList[tmpId]);
			}
		}
		*/


		if (isInTime(targetData["timeFrom"], targetData["timeTo"], adjustETMin)) {
			//リアル60分間は発報しない
			//console.log("set restrict with bell");
			restrictAlarmTimeList[baseId] = getCurrentEarthTime() + restrictSpan;
			console.log("set restrict(onclick): " + baseId + " => " + restrictAlarmTimeList[baseId]);
		}

		config["alarm"].push(baseId);
		$("#" + bellId).attr("src", "image/sys/bell.png");

	} else {
		//off
		config["alarm"].splice(index, 1);
		$("#" + bellId).attr("src", "image/sys/bell_disabled.png");
		if (null != restrictAlarmTimeList[baseId]) {
			console.log("release restrict(onclick): " + baseId);
			restrictAlarmTimeList[baseId] = null;
		}
	}
	saveConfig();
}

//------------------------------------------------------
//ラインクリック
function onMouseOverLine(e) {
	var id = $(this).attr("id");
	if (null == id) {
		id = $(e).attr("id");
	}
	var baseId = id.replace(/_line./, "");
	$("#" + baseId).addClass("hover_line");
}
function onMouseOutLine(e) {
	var id = $(this).attr("id");
	if (null == id) {
		id = $(e).attr("id");
	}
	var baseId = id.replace(/_line./, "");
	$("#" + baseId).removeClass("hover_line");
}

var clickLineBaseId = null;
var clickLineBaseObject = null;
function onClickLine(inputId) {
	onClickLine(inputId, null);
}

function onClickLine(inputId, baseObject) {
	var id = null;

	if (null == baseObject) {
		id = $(this).attr("id");
		clickLineBaseId = inputId;
		clickLineBaseObject = $(this);
	} else {
		id = baseObject.attr("id");
	}

	if (null == id && null != inputId) {
		id = inputId;
	}
	var tmp0 = id.split("-");
	var tmp1 = tmp0[1].split("_");
	var index = tmp1[0];

	var data = getPointDataByPointId(index);
	if (data["viewIndex"] >= scheduleBaseId) {
		return;
	}

	//詳細情報設定
	//NOTE ポイント種別はとりあえず日本語のみ
	var addPointTypeText = "";
	if ("jp" == lang) {
		addPointTypeText = "[" + data["ptype"] + "] ";
	}

	$("#detail_time").text((24 == data["time_limit"] ? "常時" : data["timeFrom"]));
	$("#detail_type").text(addPointTypeText + translateByType("job", data["type"]));
	$("#detail_map").text(translateByType("area", data["pointM"]) + " (" + data["mapX"] + ", " + data["mapY"] + ")");
	$("#detail_item").text(getDefaultItem(data));

	var noteText = "";
	//"" == data["note"] ? "" : data["note"] + "<br><br>"
	if ("護符" == data["ptype"]) {
		noteText = "場所はランダム、棚は一部で異なります。";
	} else if ("" != data["note"]) {
		noteText = data["note"];
	}
	$("#detail_item_note").html(noteText);

	var itemHTML = "";
	for (var i in data["items"]) {
		var item = data["items"][i];
		var itemInfo = itemData[item];
		var text = translateByType("item", item);
		var id ="itemlist-" + i;

		if (undefined != itemInfo) {
			var tmpText = "";
			if (0 != itemInfo["gain"]) {
				tmpText += mltc_gathering + " " + itemInfo["gain"];
			}
			if (0 != itemInfo["quality"]) {
				if ("" != tmpText) {
					tmpText += " / ";
				}
				tmpText += mltc_perception + " " + itemInfo["quality"];
			}
			if ("" != tmpText) {
				text += " (" + tmpText + ")";
			}
		}
		//$("#" + id + "_text").text(text);

		//var img = "image/sys/icon_error.png";
		var img = (undefined == itemInfo ? "image/sys/icon_error.png" : "image/icons3/" + itemInfo["image"]);

		itemHTML += sprintf(
			"<div class=\"itemlist_base\">" +
			"<div class=\"itemlist_image\"><img src=\"{0}\" class=\"itemlist_image_image\"></div>" +
			"<div class=\"itemlist_text\">{1}</div>" +
			"</div>", [
			img, text
		]);
	}


	var hiddenHTML = "";
	for (var i in data["hiddens"]) {
		var item = data["hiddens"][i];
		if ("" == item || "-" == item) {
			continue;
		}

		var itemInfo = itemData[item];
		var text = translateByType("item", item);

		if ("" == hiddenHTML) {
			hiddenHTML += "<div style='height: 12px'></div>";
		}


		if (null != itemInfo) {
			var tmpText = "";
			if (0 != itemInfo["gain"]) {
				tmpText += mltc_gathering + " " + itemInfo["gain"];
			}
			if (0 != itemInfo["quality"]) {
				if ("" != tmpText) {
					tmpText += " / ";
				}
				tmpText += mltc_perception + " " + itemInfo["quality"];
			}
			if ("" != tmpText) {
				text += " (" + tmpText + ")";
			}
		}

		//var img = "image/sys/icon_error.png";
		var img = "image/icons3/" + itemInfo["image"];
		hiddenHTML += sprintf(
			"<div class=\"itemlist_base\">" +
			"<div class=\"itemlist_image\"><img src=\"{0}\" class=\"itemlist_image_image\"></div>" +
			"<div class=\"itemlist_text\">{1}: {2}</div>" +
			"</div>", [
			img, mlt_hidden, text
		]);

	}

	$("#detail_item_area").html(itemHTML + hiddenHTML);

	/*
	var map_id = paddingLeft(data["map_id"], 2);
	$("#detail_item_map").attr("src", "image/map/map_n" + map_id + ".png?" + apVersion);
	*/

	//マップ表示（スマホ側は追加処理側で実現する）
	if (!isSMP) {
		var mapBaseImage = "image/maps3/" + mapBase[data["pointM"]];
		$("#detail_item_map").attr("src", mapBaseImage + "?" + apVersion);

		var x = 300 / 44 * data["mapX"];
		var y = 300 / 44 * data["mapY"];

		var detailOffset = $("#posbase_detail").offset();
		var mapOffset = $("#detail_item_map").offset();
		var imageSize = 24;

		x = mapOffset.left - detailOffset.left + x - imageSize / 2;
		y = mapOffset.top - detailOffset.top + y - imageSize / 2;
		$("#map_mark").attr("src", "image/sys/mark_" + ("采矿工" == data["type"] ? "min" : "btn") + ".png");
		
		$("#map_mark").css({
			"left": x,
			"top":  y,
			"opacity": 1
		});
		if (0 == data["mapX"] && 0 == data["mapY"]) {
			$("#map_mark").hide();
		} else {
			$("#map_mark").show();
		}

		$("#detail_item_map").css("z-index", 1000);
		$("#map_mark").css("z-index", 2000);
	}

	checkScroll();

	//スマホ追加処理
	if (isSMP) {
		smpOnClickLine(inputId, data);
	}

}

//------------------------------------------------------
//時間更新
function updateTime() {
	currentAlarmList = [];
	checkRestrictTime();

	calcTime();
	showTime();
	updateList();
	checkAlarm();
	doAlarm();

}

//------------------------------------------------------
//アラーム発生
function doAlarm() {
	if (isFirstCall) {
		return;
	}
	if (0 == currentAlarmList.length) {
		return;
	}

	if (isSMP) {
		smpDoAlarm();
		return;
	}

	if (false == $("#status_all_alarm").hasClass("all_alarm_enable")) { 
		return;
	}

	if (isShowAlarm) {
		return;
	}

	//音の再生
	//再生なしの場合は呼び出し先で判定
	playSound();

	//デスクトップ通知
	//発行有無等は呼び出し先で判定
	checkNotifyDesktop();

	//ポップアップ
	if ($("#alarm_popup").prop("checked")) {
		//alarmDialogTime
		var msg = "";
		msg = sprintf("{0}:{1}", [ paddingLeft(new Date().getHours(), 2), paddingLeft(new Date().getMinutes() ,2) ]);
		$("#alarmDialogTime").text(msg);

		var timing = Number($("#notify_timing").val());
		if (0 == timing) {
			$("#alarmDialogTitle").text(mltc_popup_now);
		} else {
			$("#alarmDialogTitle").text(sprintf(mltc_popup_early, [String(timing)]));
		}

		//alarmDialogMessage
		msg = "";
		for (var i in currentAlarmList) {
			data = currentAlarmList[i]["data"];
			if (data["viewIndex"] >= scheduleBaseId) {
				msg += "[MySchedule] " + data["mainItem"] + "<br>";
			} else {
				msg += sprintf("[{0}] {1} ({2})<br>", [ 
					translateByType("area", data["pointM"]),
					translateByType("item", data["mainItem"]),
					translateByType("job", data["type"])
				]);
			}
		}
		$("#alarmDialogMessage").html(msg);

		isShowAlarm = true;
		$.blockUI({message: $("#alarmDialog"), css: {width: '400px'}});
	}
}

//------------------------------------------------------
//発報抑止期間の解除確認
function checkRestrictTime() {
	var limitTime = getCurrentEarthTime();
	for (var k in restrictAlarmTimeList) {
		if (restrictAlarmTimeList[k] != null && restrictAlarmTimeList[k] <= limitTime) {
			console.log("release restrict(time): " + k);
			restrictAlarmTimeList[k] = null;
		}
	}
}

//------------------------------------------------------
//アラーム発生確認
function checkAlarm() {

	//N分前通知
	var timing = Number($("#notify_timing").val());
	//地球時間N分を、ETN分に変換
	var adjustETMin = timing * timeGame / timeEarth;

	//全ポイントループ
	for (var i in pointData) {
		var data = pointData[i];
		var id = "list-" + data["pointId"];

		//アラーム指定が入っているデータのみ処理
		if (-1 == config["alarm"].indexOf(id)) {
			continue;
		}
		//発報抑止中であればスキップ
		if (null != restrictAlarmTimeList[id]) {
			continue;
		}

		//console.log("check: id=" + id + ", name=" + data["mainItem"]);
		//console.log("test: " + id);
		if (isInTime(data["timeFrom"], data["timeTo"], adjustETMin)) {
			//console.log("HIT");
			//発報キューに投入
			currentAlarmList.push({"id": id, "data": data});
			//リアル60分間は発報しない
			restrictAlarmTimeList[id] = getCurrentEarthTime() + restrictSpan;
			console.log("set restrict(time): " + id + " => " + restrictAlarmTimeList[id]);
		}

	}

}

//------------------------------------------------------
//リスト更新
function updateList() {
	//console.log("--------------------------------------");
	//console.log("current at: " + dtEorzea.hour + ":" + dtEorzea.min);
	for (var i in pointData) {
		var data = pointData[i];
		var id = "list-" + data["pointId"];

		//常時のデータは更新しない
		if (24 == data["timeLimit"]) {
			continue;
		}

		// そろそろとれる時間判定用
		var nextInTimeTo = "";
		var tmp = data["timeFrom"].split(":");
		var tmpH = Number(tmp[0]);
		var tmpM = tmp[1];//"00" という値をそのまま使うため、Numberしない
		tmpH += 3;

		nextInTimeTo = tmpH + ":" + tmpM;


		//現在の時間帯か、次の時間帯かを判定
		//console.log("item: " + data["item"]);
		if (isInTime(data["timeFrom"], data["timeTo"], 0)) {
			//いまとれる
			if (isSMP) {
				$("#" + id + "_main td").removeClass("listtable_next");
				$("#" + id + "_main td").removeClass("listtable_none");
				$("#" + id + "_main td").addClass("listtable_active");
				//$("#" + id + "_line1").text(sprintf(mltc_item_active, [getDiffTime(data["timeTo"], 59)]));
				updateTextNecessary(id + "_line1", sprintf(mltc_item_active, [getDiffTime(data["timeTo"], 59)]));

			} else {
				$("#" + id).addClass("active_line");
				$("#" + id).removeClass("next_line");
				/*
				//ある行に対して★をつける前に★がついていなかったら、その行のアイテムが取得可能な状態になった瞬間を表す。
				//そのタイミングでのみアラートを発報する
				if (-1 == $("#" + id + "_limit").text().indexOf("★")) {
					checkAlarm(id, data);
				}*/
				//$("#" + id + "_limit").text(sprintf(mltc_item_active, [getDiffTime(data["timeTo"], 59)]));
				updateTextNecessary(id + "_limit", sprintf(mltc_item_active, [getDiffTime(data["timeTo"], 59)]));
			}


		//} else if (isInTime(data["time_from"], data["time_to"], timeMiningSpan)) {
		} else if (isInTime(data["timeFrom"], nextInTimeTo, timeMiningSpan)) {
			//そろそろとれる
			// NOTE 3.0改修
			// timeMiningSpan 後に、time_from - time_to の範囲内に入っているかをチェックする
			// つまり「そろそろとれる」条件は、取れはじめる時間の timeMiningSpan 前から発生する
			// 2.xではET3時間前にアラーム発生。取れる時間範囲も３時間だったので問題は発生しない。
			// 3.0では取れる時間がET１時間分しかないものがあるため、取れる時間の3-2時間前のみ条件に一致する。
			// 2-0時間前だと、その３時間後は既に取れない時間であるため。

			// これを「３時間以内に time_from - time_to の範囲に入りうるか」でチェックする必要がある
			// time_to をそのまま与えるのではなく、time_from + 3hにすればよい
			if (isSMP) {
				$("#" + id + "_main td").removeClass("listtable_active");
				$("#" + id + "_main td").removeClass("listtable_none");
				$("#" + id + "_main td").addClass("listtable_next");
				//$("#" + id + "_line1").text(sprintf(mltc_item_next, [getDiffTime(data["timeFrom"], 0)]));
				updateTextNecessary(id + "_line1", sprintf(mltc_item_next, [getDiffTime(data["timeFrom"], 0)]));

			} else {
				$("#" + id).removeClass("active_line");
				$("#" + id).addClass("next_line");
				//$("#" + id + "_limit").text(sprintf(mltc_item_next, [getDiffTime(data["timeFrom"], 0)]));
				updateTextNecessary(id + "_limit", sprintf(mltc_item_next, [getDiffTime(data["timeFrom"], 0)]));
			}

		} else {
			//しばらくとれない
			if (isSMP) {
				$("#" + id + "_main td").removeClass("listtable_next");
				$("#" + id + "_main td").removeClass("listtable_active");
				$("#" + id + "_main td").addClass("listtable_none");
				//$("#" + id + "_line1").text(getNextTime(data["timeFrom"]));
				updateTextNecessary(id + "_line1", getNextTime(data["timeFrom"]));

			} else {
				$("#" + id).removeClass("active_line");
				$("#" + id).removeClass("next_line");
				//$("#" + id + "_limit").text(getNextTime(data["timeFrom"]));
				updateTextNecessary(id + "_limit", getNextTime(data["timeFrom"]));
			}
		}
	}

	//順序入替
	//swapItemOrder();
}
//必要がある場合のみ更新するぜメソッド
function updateTextNecessary(id, text) {
	if (text != $("#" + id).text()) {
		$("#" + id).text(text);
	}
}



//順序入替
var isMoveItemWithTime = true;
var preTopItemIndex = -1;
function swapItemOrder() {
	if (!isMoveItemWithTime) {
		return;
	}
	//一番上のアイテムはET4時間前とする
	//例：ET3:59の時点で、一番上にあるのは23:00 or 0:00         のもの
	//例：ET4:00の時点で、一番上にあるのは         0:00 or 1:00 のもの
	//例：ET4:01の時点で、一番上にあるのは                 1:00 のもの
	//刻限を考えて、4時間前＆分無視（4:59->0:59->0:00のもの）とする。

	var suffix = (isSMP ? "_main" : "");

	var tmpTopItemIndex = -1;
	var topItemIndex = -1;
	for (var i in pointData) {
		var id = "list-" + i;
		var data = pointData[i];

		//常時のデータは更新しない
		if (24 == data["timeLimit"]) {
			continue;
		}

		//時間部分を抜いてくる
		var nextInTimeTo = "";
		var tmp = data["timeFrom"].split(":");
		var tmpH = Number(tmp[0]);
		
		//4時間前にする
		tmpH += 4;
		if (tmpH >= 24) {
			tmpH -= 24;
		}
		//console.log(data["timeFrom"] + " => " + tmpH + " vs " + dtEorzea.hour);
		if (tmpH >= dtEorzea.hour) {
			tmpTopItemIndex = i;
			break;
		}
	}
//console.log("result: " + tmpTopItemIndex);
//isMoveItemWithTime = false;

	if (-1 != tmpTopItemIndex) {
		//ここを走査起点位置として「あと何分」の表示が出ているアイテムを探す

		for (var i = tmpTopItemIndex;i < pointData.length;i++) {
			if (24 == pointData[i]["timeLimit"]) {
				continue;
			}
			var testIdBase = "#list-" + i + suffix;
			var testId = testIdBase + (isSMP ? " td" : "");
			if (!$(testIdBase).is(":visible")) {
				continue;
			}
			if (
				$(testId).hasClass("active_line") ||
				$(testId).hasClass("next_line") ||
				$(testId).hasClass("listtable_active") ||
				$(testId).hasClass("listtable_next")) {
				topItemIndex = i;
				break;
			}
		}
		if (-1 == topItemIndex) {
			for (var i = 0;i < tmpTopItemIndex;i++) {
				if (24 == pointData[i]["timeLimit"]) {
					continue;
				}
				var testIdBase = "#list-" + i + suffix;
				var testId = testIdBase + (isSMP ? " td" : "");
				if (!$(testIdBase).is(":visible")) {
					continue;
				}
				if (
					$(testId).hasClass("active_line") ||
					$(testId).hasClass("next_line") ||
					$(testId).hasClass("listtable_active") ||
					$(testId).hasClass("listtable_next")) {
					topItemIndex = i;
					break;
				}
			}
		}

	}

	if (topItemIndex != preTopItemIndex) {
		console.log("top item: " + pointData[i]["timeFrom"] + "=>" + pointData[i]["item"]);
		preTopItemIndex = topItemIndex;

		//並び替え順序の決定
		var htmlForTime = "";
		var htmlForFixed = "";
		for (var i = topItemIndex;i < pointData.length;i++) {
			if (i < 0 || null == pointData[i] || null == pointData[i]["timeLimit"]) {
				continue;
			}
			if (24 == pointData[i]["timeLimit"]) {
				htmlForFixed += $("#list-" + i + suffix).outerHTML();
			} else {
				htmlForTime += $("#list-" + i + suffix).outerHTML();
			}
		}
		for (var i = 0;i < topItemIndex;i++) {
			if (i < 0 || null == pointData[i] || null == pointData[i]["timeLimit"]) {
				continue;
			}
			if (24 == pointData[i]["timeLimit"]) {
				htmlForFixed += $("#list-" + i + suffix).outerHTML();
			} else {
				htmlForTime += $("#list-" + i + suffix).outerHTML();
			}
		}
		$("#list").html(htmlForTime + htmlForFixed);
	}
}

//デフォルト順序
function orderItemsDefault() {
	var htmlForTime = "";
	var htmlForFixed = "";
	for (var i = 0;i < pointData.length;i++) {
		if (i < 0 || null == pointData[i] || null == pointData[i]["timeLimit"]) {
			continue;
		}
		if (24 == pointData[i]["timeLimit"]) {
			htmlForFixed += $("#list-" + i + suffix).outerHTML();
		} else {
			htmlForTime += $("#list-" + i + suffix).outerHTML();
		}
	}
	$("#list").html(htmlForTime + htmlForFixed);
}


//------------------------------------------------------
//次のリアル時間取得
function getNextTime(timeText) {
	var ret = "";
	var targetTime = timeText.split(":");
	var eTimeTarget = Number(targetTime[0]) * 3600 + Number(targetTime[1]) * 60;
	var eTime = dtEorzea.hour * 3600 + dtEorzea.min * 60 + dtEorzea.sec;

	//エオルゼア時間による差分秒
	var eTimeDiff = eTimeTarget - eTime;
	if (eTimeDiff < 0) {
		eTimeDiff += 86400;
	}

	//リアル時間による差分秒
	//切り上げる
	var rTimeDiff = Math.ceil( eTimeDiff / (1440 / 70) );

	//リアル時間を作成
	// 誤差抑止のため、ミリ秒以下は捨てる
	var rTime = Math.floor(getCurrentEarthTime() / 1000) * 1000;
	var rDate = new Date(rTime + rTimeDiff * 1000);

	ret = sprintf("({0}:{1})", [
		paddingLeft(rDate.getHours(), 2), 
		paddingLeft(rDate.getMinutes(), 2)
	]);

	return ret;

}

//時間差分取得
function getDiffTime(timeText, adjustSec) {
	var tmp = timeText.split(":");
	var timeFromSec = Number(tmp[0]) * 3600 + Number(tmp[1]) * 60 + adjustSec;
	var eTimeSec = dtEorzea.hour * 3600 + dtEorzea.min * 60 + dtEorzea.sec;
	var timeDiff = timeFromSec - eTimeSec;
	if (timeDiff < 0) {
		timeDiff += 86400;
	} else if (timeDiff >= 86400) {
		timeDiff -= 86400;
	}

	//console.log("time=" + timeText + "/sec=" + timeFromSec + "/eTime=" + eTimeSec);
	//エオルゼア時間＞現実時間に変換
	timeDiff = timeDiff / (1440 / 70);

	var min = Math.floor(timeDiff / 60);
	var sec = Math.floor(timeDiff - min * 60);
	var ret = paddingLeft(min, 2) + ":" + paddingLeft(sec, 2);

	return ret;

}

//時間範囲確認
function isInTime(timeFromText, timeToText, addMin) {
	var tmp;

	tmp = timeFromText.split(":");
	var timeFrom = Number(tmp[0]) * 60 + Number(tmp[1]);

	tmp = timeToText.split(":");
	var timeTo = Number(tmp[0]) * 60 + Number(tmp[1]);

	//終了時間24時超え対応
	if (timeTo < timeFrom) {
		timeTo += 1440;
	}

	var eTime = dtEorzea.hour * 60 + dtEorzea.min + addMin;

	//21:00 => 1260-1499
	var isIn = false;

	//通常時間範囲
	if (eTime >= timeFrom && eTime <= timeTo) {
		isIn = true;
	}

	//timeToが２４時を超える場合
	if (!isIn && timeTo >= 1440) {
		timeFrom -= 1440;
		timeTo -= 1440;
		if (eTime >= timeFrom && eTime <= timeTo) {
			isIn = true;
		}
	}

	//eTimeが２４時を超える場合
	if (!isIn && eTime >= 1440) {
		eTime -= 1440;
		if (eTime >= timeFrom && eTime <= timeTo) {
			isIn = true;
		}
	}

	//時間範囲を２つ作成する
/*
	var rangeFrom = [-1, -1];
	var rangeTo   = [-1, -1];

	rangeFrom[0] = timeFrom;
	rangeTo[0]   = (timeTo <= 1440 ? timeTo : 1440);
	if (timeTo > 1440) {
		rangeFrom[1] = 0;
		rangeTo[1]   = timeTo - 1440;
	}
if (isDebug) {
	console.log(sprintf("test=" + eTime + ", range0={0}-{1}, range1={2}-{3}",[rangeFrom[0], rangeTo[0], rangeFrom[1], rangeTo[1]]));
}
	for (var i = 0;i <= rangeFrom.length;i++) {
		if (-1 == rangeFrom[i]) {
			continue;
		}
		if (rangeFrom[i] <= eTime && eTime <= rangeTo[i]) {
			isIn = true;
if (isDebug) {
	console.log("hit in range" + i);
}
			break;
		}
	}
*/

	// console.log("add:" + addMin + "//span:"+ timeFromText + "-" + timeToText + "/num=" + timeFrom + "-" + timeTo + "/et=" + eTime + "/result=" + isIn);

	return isIn;
}

//時間表示
function showTime() {
	//地球時間
	var text = sprintf("{0}/{1} {2}:{3}:{4}", [
		paddingLeft(dtEarth.month, 2),
		paddingLeft(dtEarth.day, 2),
		paddingLeft(dtEarth.hour, 2),
		paddingLeft(dtEarth.min, 2),
		paddingLeft(dtEarth.sec, 2),
	]);
	$("#time_earth").text(text);

	text = sprintf("{0}/{1} {2}:{3}:{4}", [
		paddingLeft(dtEorzea.month, 2),
		paddingLeft(dtEorzea.day, 2),
		paddingLeft(dtEorzea.hour, 2),
		paddingLeft(dtEorzea.min, 2),
		paddingLeft(dtEorzea.sec, 2),
	]);
	$("#time_eorzea").text(text);


}
//時間計算
var tmpBaseTime = 0;
function calcTime() {
	//地球時間
	var testFixTime = 0;//1439251098444;//1435592957091;//1396407420179 - 10 * 60 * 1000;
	var testDiffTime = 0;//(23 + 4) * 4200 / 24 * 1000;
	var testHighSpeed = 0;//10;

	var now = new Date(getCurrentEarthTime() + testDiffTime);
	if (0 != testFixTime) {
		now = new Date(testFixTime + testDiffTime);
	}

	//加速
	if (testHighSpeed > 0) {
		if (0 == tmpBaseTime) {
			tmpBaseTime = now.getTime();
		} else {
			d = now.getTime() - tmpBaseTime;
			now = new Date(now.getTime() + d * testHighSpeed);
		}
	}
	dtEarth = new Object();
	dtEarth.year  = now.getYear() + 1900;
	dtEarth.month = now.getMonth() + 1;
	dtEarth.day   = now.getDate();
	dtEarth.hour  = now.getHours();
	dtEarth.min   = now.getMinutes();
	dtEarth.sec   = now.getSeconds();
	dtEarth.epoch = now.getTime();

	//エオルゼア時間
	var timeJST = now;
	var timeEorzea = Math.round((timeJST / 1000 - timeAdjust) * timeGame / timeEarth);
	timeEorzea = Math.round(timeEorzea / 10) * 10;

	// エオルゼアの時間を表示
	dtEorzea = new Object();
	dtEorzea.year  = Math.floor(timeEorzea / 33177600);
	dtEorzea.month = Math.floor(timeEorzea % 33177600 / 2764800) + 1;
	dtEorzea.day   = Math.floor(timeEorzea % 2764800 / 86400) + 1;
	dtEorzea.hour  = Math.floor(timeEorzea % 86400 / 3600);
	dtEorzea.min   = Math.floor(timeEorzea % 3600 / 60);
	dtEorzea.sec   = timeEorzea % 60;
	dtEorzea.epoch = timeEorzea;

//debug エオルゼア時間指定
/*
var t = "04:00:59";
var t2 = t.split(":");
dtEorzea.hour  = Number(t2[0]);
dtEorzea.min   = Number(t2[1]);
dtEorzea.sec   = Number(t2[2]);
dtEorzea.epoch  = 0;
*/
}
//リアル時間返却
var debugRTBaseTime = new Date().getTime();
var debugRTBy = 0;//倍速
var debugRTFixedBaseTime = 0;//1441704448322;//固定時間からの進行
var debugRTFixedTime = 0;//1441704428322;//固定時間
function getCurrentEarthTime() {
	var v = new Date().getTime();
	v += nictTimeDiff;//NTP補正

	//デバッグ：倍速
	if (0 != debugRTBy) {
		v += (v - debugRTBaseTime) * debugRTBy;
	}

	//デバッグ：固定時間からの進行
	if (0 != debugRTFixedBaseTime) {
		v = v - debugRTBaseTime + debugRTFixedBaseTime;
	}

	//デバッグ：固定時間
	if (0 != debugRTFixedTime) {
		v = debugRTFixedTime;
	}

	return v;
}


//------------------------------------------------------
//デスクトップ通知
var isForceDNCheck = false;
function setNotificatePermission() {
	if (isForceDNCheck) {
		return;
	}
	if (!$("#alarm_desktop").prop("checked")) {
		return;
	}

	if (!notify.isSupported) {
		alert(mltc_dn_notsupported);
		isForceDNCheck = true;
		$("#alarm_desktop").prop("checked", "");
		isForceDNCheck = false;
		return;

	} else if (notify.permissionLevel() == notify.PERMISSION_GRANTED) {
		doDesktopNotify(null, null, mltc_dn_enable);
		return;

	} else if (notify.permissionLevel() == notify.PERMISSION_DENIED) {
		alert(mltc_dn_already_denied);
		isForceDNCheck = true;
		$("#alarm_desktop").prop("checked", "");
		isForceDNCheck = false;
		return;

	} else {
		Notification.requestPermission(function (permission) {
			if (permission === notify.PERMISSION_GRANTED) {
				doDesktopNotify(null, null, mltc_dn_enable);
			} else {
				isForceDNCheck = true;
				$("#alarm_desktop").prop("checked", "");
				isForceDNCheck = false;
			}
		});
	}

}
function checkNotifyDesktop() {
	if (!notify.isSupported || notify.permissionLevel() != notify.PERMISSION_GRANTED) {
		return;
	}
	if (!$("#alarm_desktop").prop("checked")) {
		return;
	}

	//	currentAlarmList.push({"id": id, "data": data});
	// console.log(currentAlarmList[0]["data"]["item"]);
	var timing = Number($("#notify_timing").val());
	var mainData = currentAlarmList[0]["data"];
	var isMySchedule = (mainData["viewIndex"] >= scheduleBaseId);
	var mainItemName = mainData.items[mainData.mainIndex - 1];
	var mainItemInfo = isMySchedule ? null : itemData[mainItemName];
	var icon = isMySchedule ? "image/sys/icon_myschedule.png" : "image/icons3/" + mainItemInfo["image"];

	var msg = "";
	msg = sprintf("[{0}:{1}] ", [ paddingLeft(new Date().getHours(), 2), paddingLeft(new Date().getMinutes() ,2) ]);
	if (0 == timing) {
		msg += mltc_popup_now + "\n\n";
	} else {
		msg += sprintf(mltc_popup_early, [String(timing)]) + "\n\n";
	}

	for (var i in currentAlarmList) {
		data = currentAlarmList[i]["data"];
		if (isMySchedule) {
			msg += sprintf("[{0}] {1}\n", [ "MySchedule", data["mainItem"], data["type"] ]);
		} else {
			msg += sprintf("[{0}] {1} ({2})\n", [ data["pointL"], data["mainItem"], data["type"] ]);
		}
	}
	doDesktopNotify(icon, null, msg);
}

function doDesktopNotify(icon, title, message) {
	if (!notify.isSupported || notify.permissionLevel() != notify.PERMISSION_GRANTED) {
        return;
    }
	if (null == icon) {
		icon = "http://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/2e/2e9151a76c163882fc93915ceff6f663df809526.png";
	}
	if (null == title) {
		title = mlt_title;
	}
	notify.config({autoClose: 15000});
	notify.createNotification(title, {
		body: message,
		icon: icon
	});
}

//------------------------------------------------------
//サウンド再生
function testPlaySound() {
	playSound();

}
function playSound() {
	if (!window.HTMLAudioElement) {
		return;
	}

	var index = $("#alarm_sound").val();
	if ("" == index || null == soundList[index]) {
		return;
	}
	var file = soundList[index];
	var audio = new Audio();
	var volume = Number($("#alarm_volume").val()) / 100;

	audio.src = "sound/" + file;
	audio.volume = volume;
	audio.play();
}
function changeVolume() {
	var vol = $("#alarm_volume").val();
}

//------------------------------------------------------
//ポイントデータ取得
function getPointDataByPointId(index) {
	var ret = null;

	for (var i in pointData) {
		if (pointData[i]["pointId"] == index) {
			ret = pointData[i];
			break;
		}
	}

	return ret;
}

//検索用PointData作成
//ひらがなカタカナを全て全角カタカナに統一
function createPointDataForFilter() {
	pointDataForFilter = [];
	for (var i in pointData) {
		var data = pointData[i];
		var isShow = false;

		var newType = "";
		var newItemText = "";

		var itemList = data["items"].concat(data["hiddens"]);
		if ("jp" == lang) {
			newType = data["type"];

			for (var j in itemList) {
				if ("" != itemList[j] && "-" != itemList[j]) {
					var text = itemList[j];
					text = halfKanaCharToFullKanaChar(text);
					text = fullHiraganaCharToFullKanaChar(text);
					text = halfSymbolToFullSymbol(text);
					newItemText += " " + text;
					newItemText += " " + translateByType2("item", itemList[j], "jpKana");
					newItemText += " " + translateByType2("item", itemList[j], "jpRoma");
					newItemText = newItemText.toLowerCase();
				}
			}
			pointDataForFilter.push({"type": data["type"], "pointId": data["pointId"], "item": newItemText, "search": newType + newItemText, "area": data["pointL"], "patch": data["patch"]});

		} else {
			newType = translateByType("job", data["type"]);
			for (var j in itemList) {
				if ("" != itemList[j] && "-" != itemList[j]) {
					newItemText += " " + translateByType("item", itemList[j]);
				}
			}
			pointDataForFilter.push({"type": data["type"], "pointId": data["pointId"], "item": newItemText, "search": (newType + newItemText).toLowerCase(), "area": data["pointL"], "patch": data["patch"]});
		}
	}
}
//データ更新
function updatePointData() {

	//データ退避
	if (null == originalPointData) {
		originalPointData = $.extend(true, [], pointData);
	}

	//オリジナルデータ設定
	pointData = null;
	pointData = $.extend(true, [], originalPointData);

	//MyScheduleデータマージ
	var mergeData = [];
	for (var i in config["myschedule"]) {
		var baseData = config["myschedule"][i];
		var timeFromSplit = baseData["start"].split(":");
		var timeSpanSplit = baseData["span"].split(":");
		var tmpTimeLimit = Number(timeSpanSplit[0]) + Number(timeSpanSplit[1]) / 60;
		var tmpTimeToInt = 
			Number(timeFromSplit[0]) * 60 + 
			Number(timeFromSplit[1]) + 
			Number(timeSpanSplit[0]) * 60 + 
			Number(timeSpanSplit[1]);
		var tmpTimeH = Math.floor(tmpTimeToInt / 60) % 24;
		var tmpTimeM = tmpTimeToInt % 60;
		var tmpTimeTo = tmpTimeH + ":" + paddingLeft(tmpTimeM, 2);

		var data = {
			hiddens: [],
			items: [baseData["name"]],
			lv: "",
			mainIndex: "1",
			mainItem: baseData["name"],
			mapX: "",
			mapY: "",
			note: "",
			patch: "3.0",
			pointId: Number(baseData["id"] + scheduleBaseId),
			pointL: "",
			pointM: "",
			pointS: "",
			ptype: "未知",
			timeFrom: baseData["start"],
			timeLimit: tmpTimeLimit,
			timeTo: tmpTimeTo,
			type: "-",
			viewIndex: Number(baseData["id"] + scheduleBaseId),

			sortValue: Number(timeFromSplit[0]) * 60 + Number(timeFromSplit[1]),
			insertIndex: -1

		};
		mergeData.push(data);
	}
	mergeData.sort(function(a, b) {return a["sortValue"] - b["sortValue"]});
	for (var i in pointData) {
		var data = pointData[i];
		var timeFromSplit = data["timeFrom"].split(":");
		var timeFrom = Number(timeFromSplit[0]) * 60 + Number(timeFromSplit[1]);

		if (24 == data["timeLimit"]) {
			for (var j in mergeData) {
				if (-1 == mergeData[j].insertIndex) {
					mergeData[j].insertIndex = i;
				}
			}
		}

		for (var j in mergeData) {
			if (-1 == mergeData[j].insertIndex && mergeData[j].sortValue < timeFrom) {
				mergeData[j].insertIndex = i;
			}
		}
	}

	mergeData.sort(function(a, b) {
		var ret = b["insertIndex"] - a["insertIndex"];
		if (0 == ret) {
			ret = b["sortValue"] - a["sortValue"];
		}
		return ret;
	});

	for (var i in mergeData) {
		pointData.splice(mergeData[i].insertIndex, 0, mergeData[i]);
	}


	//検索用データ作成
	createPointDataForFilter();

	//リスト作成
	createList();
}

//------------------------------------------------------
//コンフィグ管理
function saveConfig() {
	if (!window.localStorage) {
		return;
	}

	var data = {};

	data["notify_timing"] = $("#notify_timing").val();
	data["popup"] = $("#alarm_popup").prop("checked");
	data["desktop_notify"] = $("#alarm_desktop").prop("checked");
	data["sound"] = $("#alarm_sound").val();
	data["volume"] = $("#alarm_volume").val();
	data["alarm"] = config["alarm"];
	data["filter_text"] = $("#filter_text").val();
	data["filter_area"] = $("#filter_area").val();
	data["filter_point"] = $("#filter_point").val();
	data["filter_class"] = $("#filter_class").val();
	data["filter_patch"] = $("#filter_patch").val();
	data["is_show_detail"] = $("#panel_main_detail").is(':visible');
	data["is_show_alarm"] = $("#panel_main_alarm").is(':visible');
	data["is_show_detail_list"] = $("#panel_main_detail_list1").is(':visible');
	data["is_show_detail_map"] = $("#panel_main_detail_map").is(':visible');
	data["is_show_favorite"] = $("#panel_main_favorite").is(':visible');
	data["is_alarm_active"] = $("#status_all_alarm").hasClass("all_alarm_enable");
	data["favorite"] = config["favorite"];
	data["myschedule"] = config["myschedule"];
	data["view_mode"] = $("#view_mode").val();
	data["favoriteContentType"] = ($("#toggle_panel_favorite").is(":visible") ? 0 : 1);


/*	var isNextStatus = !($("#status_all_alarm").hasClass("all_alarm_enable"));
	setAlarmStatus(isNextStatus);
	saveConfig();
*/

	//smp
	data["smp_is_first_alarm"] = smpIsFirstAlarm;

	window.localStorage.setItem("gtConfig", JSON.stringify(data));
}
function loadConfig() {
	if (!window.localStorage) {
		return;
	}

	var data = null;

	try {
		data = JSON.parse(window.localStorage.getItem("gtConfig"));
	} catch (e) {
		data = null;
		console.log(e);
	}

	//データ補正
	if (null == data){ 
		data = {};
	}
	if (null == data["notify_timing"]) {
		data["notify_timing"] = "0";
	}
	if (null == data["popup"]) {
		data["popup"] = false;
	}
	if (null == data["desktop_notify"]) {
		data["desktop_notify"] = false;
	}
	if (null == data["sound"]) {
		data["sound"] = "0";
	}
	if (null == data["alarm"]) {
		data["alarm"] = [];
	}
	if (null == data["volume"]) {
		data["volume"] = "30";
	}
	if (null == data["filter_area"]) {
		data["filter_area"] = "0";
	}
	if (null == data["filter_patch"]) {
		data["filter_patch"] = "0";
	}
	if (null == data["filter_point"]) {
		data["filter_point"] = "2";
	}
	if (null == data["filter_class"]) {
		data["filter_class"] = "0";
	}
	if (null == data["filter_text"]) {
		data["filter_text"] = "";
	}
	if (null == data["is_show_detail"]) {
		data["is_show_detail"] = true;
	}
	if (null == data["is_show_detail_map"]) {
		data["is_show_detail_map"] = true;
	}
	if (null == data["is_show_detail_list"]) {
		data["is_show_detail_list"] = true;
	}
	if (null == data["is_show_alarm"]) {
		data["is_show_alarm"] = true;
	}
	if (null == data["is_show_favorite"]) {
		data["is_show_favorite"] = false;
	}
	if (null == data["is_alarm_active"]) {
		data["is_alarm_active"] = true;
	}
	if (null == data["favorite"]) {
		data["favorite"] = [];
	}
	if (null == data["view_mode"]) {
		data["view_mode"] = 0;
	}
	if (null == data["myschedule"]) {
		data["myschedule"] = [];
	}
	if (null == data["favoriteContentType"]) {
		data["favoriteContentType"] = 0;
	}

	//smp
	smpIsFirstAlarm = false;
	if (null == data["smp_is_first_alarm"]) {
		smpIsFirstAlarm = true;
	}

	//デスクトップ通知は、通知可能であることを確認する
	if (data["desktop_notify"]) {
		if (isSMP || !notify.isSupported) {
			data["desktop_notify"] = false;
		}
	}

	//グローバル設定
	config = data;

	//値復旧
	$("#notify_timing").val(data["notify_timing"]);
	$("#alarm_popup").prop("checked", data["popup"]);
	$("#alarm_desktop").prop("checked", data["desktop_notify"]);
	$("#alarm_sound").val(data["sound"]);

	$("#alarm_volume").val(data["volume"]);

	$("#filter_area").val(data["filter_area"]);
	$("#filter_patch").val(data["filter_patch"]);
	$("#filter_point").val(data["filter_point"]);
	$("#filter_class").val(data["filter_class"]);
	$("#filter_text").val(data["filter_text"]);

	setAlarmStatus(config["is_alarm_active"]);

}

//------------------------------------------------------
//汎用処理

//パディング
function paddingLeft(text, figure) {
	var ret = String(text);

	while (true) {
		if (ret.length >= figure) {
			break;
		}
		ret = "0" + ret;
	}
	return ret;
}

//簡易sprintf
function sprintf(text, values) {
	var ret = text;

	for (var i = 0;i < values.length;i++) {
		ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
	}

	return ret;
}

//全角英数記号＞半角英数記号変換
function halfSymbolToFullSymbol(targetText) {
	return targetText.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
	    return String.fromCharCode(s.charCodeAt(0) - 65248);
	});
}
//全角ひらがな＞全角カタカナ変換
function fullHiraganaCharToFullKanaChar(targetText) {
	return targetText.replace(/[\u3041-\u3096]/g, function(match) {
		var chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
}
//半角カタカナ＞全角カタカナ変換
function halfKanaCharToFullKanaChar(targetText) {
	var txt = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯ､｡ｰ｢｣ﾞﾟ";
	var zen = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ、。ー「」";
	zen += "　　ヴ　　ガギグゲゴザジズゼゾダヂヅデド　　　　　バビブベボ　　　　　　　　　　　　　　　　　　　　　　　　　　　　　";
	zen += "　　　　　　　　　　　　　　　　　　　　　　　　　パピプペポ　　　　　　　　　　　　　　　　　　　　　　　　　　　　　";
	var str = "";
	for (var i = 0; i < targetText.length; i++) {
		var c = targetText.charAt(i);
		var cnext = targetText.charAt(i + 1);
		var n = txt.indexOf(c,0);
		var nnext = txt.indexOf(cnext,0);
		if (n >= 0) {
			if (nnext == 60) {
				c = zen.charAt(n + 60);
				i++;
			} else if (nnext == 61) {
				c = zen.charAt(n + 120);
				i++;
			} else {
				c = zen.charAt(n);
			}
		}
		if ((n != 60) && (n != 61)) {
			str += c;
		}
	}
	return str;
}

//表示文字数取得
function viewTextLength(str) {
	var len = 0;

	var maxLength = str.length;
	for (var i = 0;i < maxLength;i++) {
		len += (isHalf(str.charAt(i)) ? 1 : 2);
	}
	return len;
}
function isHalf(c){
	if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
		return true;
	}
	return false;
}
//表示文字数制限
function cutViewText(str, limit) {
	var len = 0;
	var sumLen = 0;
	var ret = "";
	var maxLength = str.length;
	for (var i = 0;i < maxLength;i++) {
		var c = str.charAt(i);
		var cLen = isHalf(str.charAt(i)) ? 1 : 2;
		if (sumLen + cLen > limit) {
			ret += "…";
			break;
		}
		ret += c;
		sumLen += cLen;
	}
	return ret;
}

//****************************************************
//スマホ対応
//****************************************************
var smpIsFirstAlarm = false;
var smpIsAlarmEnabled = false;

var smpAudio = null;
var smpScrollTop = 0;
var smpRunAlarmInfo = [];

//スマホ初期化
function smpInit() {
	if ("isSMP" in window) {
		window.scrollTo(0, 1);
		$(window).on("hashchange", function(e) {smpOnHashChange(e);});

	} else {
		isSMP = false;
	}
}

//メニュートグル
function smpToggleMenu() {
	if ($("#menu_view").is(":visible")) {
		//表示中であれば非表示にする
		$("#header_menubtn").attr("src", "image/smp/menu_128a.png");
		$("#menu_view").hide();
	} else {
		//非表示であれば表示する
		$("#header_menubtn").attr("src", "image/smp/menu_128b.png");
		$("#menu_view").show();
	}
}
function smpShowDetailList() {
	$("#detail_link_list").addClass("unclickable");
	$("#detail_link_map").removeClass("unclickable");
	$("#detail_item_area").show();
	$("#detail_item_map").hide();
	setMapMark();
}
function smpShowDetailMap() {
	$("#detail_link_list").removeClass("unclickable");
	$("#detail_link_map").addClass("unclickable");
	$("#detail_item_area").hide();
	$("#detail_item_map").show();
	setMapMark();
}
function smpShowTimeTable() {
	$("#note_table").hide();
	$("#timetable_table").show();
	$("#alarmconfig_table").show();
	$("#menu_view").hide();
}
function smpShowNote() {
	$("#timetable_table").hide();
	$("#alarmconfig_table").hide();
	$("#note_table").show();
	$("#menu_view").hide();
}
function moveToId(id) {
	window.scrollTo(0, $("#" + id).offset().top + 1);
}
//------------------------------------------------------
//ハッシュ変更：ポップアップ起動
function smpOnHashChange() {
	if ("#show_alarmusage" == location.hash) {
		smpShowAlarmUsageMain();
	}
}

//------------------------------------------------------
//ベル処理

//ベルクリック
//NOTE 本来はアラーム制御が入るが、スマホ用は表示のみ

function forceSMPClickBell(id, isActive) {
	smpOnClickBellHelper(id, isActive);
}
function smpOnClickBell(id) {
	var baseId = id;
	var index = config["alarm"].indexOf(baseId);
	var isActive = (-1 == index);
	smpOnClickBellHelper(id, isActive);
}

function smpOnClickBellHelper(id, isActive) {
	var baseId = id;
	var index = config["alarm"].indexOf(baseId);
	var pointId = baseId.replace("list-", "");
	var targetData = getPointDataByPointId(pointId);
	var newSrc = "";

	//24時間チェック
	if (24 == targetData["timeLimit"]) {
		return;
	}

	if (isActive) {
		//off => on

		//N分前通知
		var timing = Number($("#notify_timing").val());
		//地球時間N分を、ETN分に変換
		var adjustETMin = timing * timeGame / timeEarth;
		/*
		for (var i in pointData) {
			var tmpId = "list-" + i;
			if (tmpId != baseId) {
				continue;
			}
			var data = pointData[i];
			if (isInTime(data["time_from"], data["time_to"], adjustETMin)) {
				//リアル60分間は発報しない
				//console.log("set restrict with bell");
				restrictAlarmTimeList[tmpId] = getCurrentEarthTime() + restrictSpan;
				console.log("set restrict(onclick): " + tmpId + " => " + restrictAlarmTimeList[tmpId]);
			}
		}*/

		if (isInTime(targetData["timeFrom"], targetData["timeTo"], adjustETMin)) {
			//リアル60分間は発報しない
			//console.log("set restrict with bell");
			restrictAlarmTimeList[baseId] = getCurrentEarthTime() + restrictSpan;
			console.log("set restrict(onclick): " + baseId + " => " + restrictAlarmTimeList[baseId]);
		}
		config["alarm"].push(baseId);
		$("#" + id + "_image_bell").attr("src", "image/sys/bell.png");

	} else {
		//on => off
		if (null != restrictAlarmTimeList[baseId]) {
			console.log("release restrict(onclick): " + baseId);
			restrictAlarmTimeList[baseId] = null;
		}
		config["alarm"].splice(index, 1);
		$("#" + id + "_image_bell").attr("src", "image/sys/bell_disabled.png");
	}
	saveConfig();

}

//アイテムクリック時追加処理
function smpOnClickLine(id, data) {
	//画面右端に寄せて出力する
	smpActivePointData = data;

	//スクロール位置
	var scrollTop = getScrollTop();

	//画面表示領域
    var clientWidth = getClientWidth();
    var clientHeight = getClientHeight();

/*
		var mapBaseImage = "image/maps3/" + mapBase[data["map"]];
		$("#detail_item_map").attr("src", mapBaseImage + "?" + apVersion);

		var x = 300 / 44 * data["map_x"];
		var y = 300 / 44 * data["map_y"];

		var detailOffset = $("#posbase_detail").offset();
		var mapOffset = $("#detail_item_map").offset();

		x = mapOffset.left - detailOffset.left + x - 8;
		y = mapOffset.top - detailOffset.top + y - 8;

		$("#map_mark").css({
			"left": x,
			"top":  y,
		});
		$("#map_mark").show();

		$("#detail_item_map").css("z-index", 1000);
		$("#map_mark").css("z-index", 2000);
*/

	//画像設定（マークなし画像）
	var mapBaseImage = "image/maps3/" + mapBase[data["pointM"]];
	$("#detail_item_map").attr("src", mapBaseImage + "?" + apVersion);


	//コンテンツのwh
	var w = $("#detail_table").width();
	var h = 460;//地図表示時のサイズで確保する。$("#detail_table").height();

	//クリックアイテムの位置（ページ内絶対位置）・高さ
	var itemTop = $("#" + id + "_main").offset().top;
	var itemHeight = $("#" + id + "_main").height();
	var itemTopInView = itemTop - scrollTop;

	//位置の決定
	var detailLeft = (clientWidth - w) / 2;
	var detailTop = scrollTop + (clientHeight - h) / 2;

	//マスク表示
	$("#detail_mask_area").css("z-index", "301");
	$("#detail_mask_area").show();

	//移動
	//detailLeft = 0;
	$("#detail_table").css({
		"position": "absolute",
		"left": detailLeft + "px",
		"top": detailTop + "px",
		"z-index": 302
	});
	$("#detail_table").show();

	//マーク配置（移動後に実施）
	//マップタブが表示されている状態で配置が必要
	$("#map_mark").attr("src", "image/sys/mark_" + ("采矿工" == data["type"] ? "min" : "btn") + ".png");
	setMapMark();

	//スクロール禁止
	$("body").on("touchmove.noScroll", function(e) {
	    e.preventDefault();
	});

	//解除用検知イベント
	$("#detail_mask_area").on("click", smpOnClickBodyInPopupDetail);
	$("#detail_table").on("click", smpOnClickBodyInPopupDetail);



}
//解除検知
function smpOnClickBodyInPopupDetail(e) {
	var id = $(e.target).attr("id");
	if ("detail_link_map" == id || "detail_link_list" == id ||
		"mlt_map" == id || "mlt_list" == id) {
		return;
	}

	//解除
	$("#detail_mask_area").off("click");
	$("#detail_table").off("click");

	$("#detail_mask_area").hide();
	$("#detail_table").hide();

	$("body").off("touchmove.noScroll");
}

function setMapMark() {

	if ($("#detail_item_map").is(':hidden')) {
		$("#map_mark").hide();

	} else if (0 == smpActivePointData["mapX"] && 0 == smpActivePointData["mapY"]) {
		$("#map_mark").hide();

	} else {
		var detailOffset = $("#detail_table").offset();
		var mapOffset = $("#detail_item_map").offset();
		var x = 300 / 44 * smpActivePointData["mapX"];
		var y = 300 / 44 * smpActivePointData["mapY"];
		var imageSize = 24;

		x = mapOffset.left - detailOffset.left + x - imageSize / 2;
		y = mapOffset.top - detailOffset.top + y - imageSize / 2;
		$("#map_mark").css({
			"left": x,
			"top":  y,
		});
		$("#map_mark").show();
	}
}

//------------------------------------------------------
//アラーム系処理

//usage表示
function smpShowAlarmUsage() {
	location.hash = "#show_alarmusage";
}

function smpShowAlarmUsageMain() {
	//スクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//リスト表示
	$("#alarm_usage").show();

	window.scrollTo(0, 1);

	return true;
}
function smpOnClickCancelAU() {
	$("#all_area").show();
	$("#alarm_usage").hide();
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
}

//アラーム有効化
function smpSetAlarmEnabled() {
	if (!smpIsAlarmEnabled) {
		//無効状態から有効へ
		//各種要素を有効にする
		$(".alarmconfig_sub span").removeClass("alarm_disabled_text");
		$(".alarmconfig_sub input").removeAttr("disabled");
		$(".alarmconfig_sub select").removeAttr("disabled");
		$("#alarmconfig_onoff").val(mltc_alarm_off);
		smpIsAlarmEnabled = true;

		//サウンド設定
		var ret = smpInitAudio();
		if (!ret) {
			return;
		}

		//初回アラーム有効時の注意事項表示
		if (smpIsFirstAlarm) {
			smpIsFirstAlarm = false;
			saveConfig();
			smpShowAlarmUsage();
		}
	} else {
		//有効状態から無効へ
		smpSetAlarmDisabled();
	}
}
function smpSetAlarmDisabled() {
	//サウンド停止
	smpDisposeAudio();

	//各種要素を無効にする
	$(".alarmconfig_sub span").addClass("alarm_disabled_text");
	$(".alarmconfig_sub input").attr("disabled", "disabled");
	$(".alarmconfig_sub select").attr("disabled", "disabled");
	$("#alarmconfig_onoff").val(mltc_alarm_on);
	smpIsAlarmEnabled = false;
}

//サウンド設定
function smpInitAudio() {
	//ブラウザ対応確認
	if (!window.HTMLAudioElement) {
		smpSetAlarmDisabled();
		alert(mltc_sound_disabled);
		return false;
	}

	//とりあえず今のデータを止める
	smpDisposeAudio();

	//サウンドを選択
	var volume = Number($("#alarm_volume").val()) / 100;

	var soundIndex = $("#alarm_sound").val();
	var soundFileWAV = soundList[soundIndex];
	var soundFileMP3 = soundFileWAV.replace("wav", "mp3");
	var soundFile = "";

	//読み込み
	smpAudio = new Audio();
	//フォーマット対応確認
	if (smpAudio.canPlayType("audio/wav")) {
		soundFile = soundFileWAV;
	} else if (smpAudio.canPlayType("audio/mpeg")) {
		soundFile = soundFileMP3;
	} else {
		//対応していなければ停止
		smpSetAlarmDisabled();
		alert(mltc_sound_disabled);
		return false;
	}
	smpAudio.src = "sound/" + soundFile;
	smpAudio.volume = volume;
	smpAudio.load();

	return true;
}
//ボリューム調整
function smpUpdateVolume() {
	if (!window.HTMLAudioElement) {
		return;
	}
	if (null == smpAudio) {
		return;
	}
	var volume = Number($("#alarm_volume").val()) / 100;
	smpAudio.volume = volume;
}

//サウンドテスト
function smpTestPlaySound() {
	smpPlaySound(true);
}
//サウンド再生
function smpPlaySound(isTest) {
	if (!smpIsAlarmEnabled) {
		return;
	}
	if (!window.HTMLAudioElement) {
		if (isTest) {
			alert(mltc_sound_disabled);
		}
		return;
	}
	if (null == smpAudio) {
		if (isTest) {
			alert(mltc_sound_initializing);
		}
		return;
	}
	smpAudio.pause();
	smpAudio.currentTime = 0;

	console.log("play sound for smp");
	var volume = Number($("#alarm_volume").val()) / 100;
	smpAudio.volume = volume;
	smpAudio.play();

}

//サウンド停止
function smpDisposeAudio() {
	if (null != smpAudio) {
		try {
			smpAudio.close();
		} catch (e) {}
	}

	//アラーム情報初期化
	smpAudio = null;
	smpRunAlarmInfo = [];
}



//アラーム発生時処理
function smpDoAlarm() {
	//アラームが無効であれば何もしない
	if (!smpIsAlarmEnabled) {
		return;
	}

	//ポップアップ表示中であれば何もしない
	if ($('#alarm_notify_main_area').is(':visible')) {
		return;
	}

	//音の再生
	//スマホ版はサウンドなし選択はできないので条件なしで呼び出し
	smpPlaySound(false);

	//ポップアップ通知
	if ($("#alarm_popup").prop("checked")) {
		//テキスト設定
		var msg = "";
		msg = sprintf("[{0}:{1}]", [ paddingLeft(new Date().getHours(), 2), paddingLeft(new Date().getMinutes() ,2) ]);
		$("#anm_time").text(msg);

		var timing = Number($("#notify_timing").val());
		if (0 == timing) {
			$("#anm_title").text(mltc_popup_now);
		} else {
			$("#anm_title").text(sprintf(mltc_popup_early, [String(timing)]));
		}

		msg = "";
		for (var i in currentAlarmList) {
			var data = currentAlarmList[i]["data"];
			msg += sprintf(
				"<div class='anm_item_map'>＠{0}</div>" +
				"<div class='anm_item_detail'>{1} ({2})</div><br>",
				[ 
					translateByType("area", data["pointM"]), 
					getDefaultItem(data), 
					translateByType("job", data["type"])
				]
			);
		}
		$("#anm_items").html(msg);

		//表示
		$("#alarm_notify_mask_area").show();
		$("#alarm_notify_mask_area").css("z-index", "1001");

		$("#alarm_notify_main_area").show();
		var h = $("#alarm_notify_main_area").height();
		var t = (getClientHeight() - h) / 2 * 0.8;
		$("#alarm_notify_main_area").css("top", t + "px");
		$("#alarm_notify_main_area").css("z-index", "1002");

		$("body").css("overflow", "hidden");
		$(window).on('touchmove.noScroll', function(e) {
		  e.preventDefault();
		});
	}
}
function smpOnClickCloseAN() {
	$("#alarm_notify_mask_area").hide();
	$("#alarm_notify_main_area").hide();
	$("body").css("overflow", "auto");
	$(window).off('.noScroll');
}

//-----------
//汎用処理

//スクロール位置
function getScrollTop() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}
//クライアントサイズ
function getClientHeight() {
	return document.documentElement.clientHeight || document.body.clientHeight;
}
function getClientWidth() {
	return document.documentElement.clientWidth || document.body.clientWidth;
}

jQuery.fn.outerHTML = function(s) {
	if($(this).get(0)){
		return $(this).get(0).outerHTML;
	}
	return null;
}

jQuery.fn.bounds = function(s) {
	if($(this).get(0)){
		var offset = $(this).offset();
		var ret = {
			top: offset.top,
			left: offset.left,
			width: $(this).width(),
			height: $(this).height(),
			x: offset.left,
			y: offset.top,
			right: offset.left + $(this).width(),
			bottom: offset.top + $(this).height()
		};
		return ret;
	}
	return null;
}

//各アイテムに時間のバーを出すやつ
function showItemTimeLine() {

	$("#list tr").each(function() {
		var id = $(this).attr("id");
		var idIndex = id.replace("list-", "");
		var barIdBase = id + "_bar_base";
		var barIdLine0 = id + "_bar_line0";
		var barIdLine1 = id + "_bar_line1";
		var data = pointData[idIndex];
		var barHeight = 2;

		//常時取れるものはバー対応しない
		if ("24" == data["time_limit"]) {
			return;
		}

		//要素存在確認
		if (!($(barIdBase)[0])) {
			$("body").append("<div id='" + barIdBase + "' class='itemlist_bar_base' style='display: none'></div>");
			$("body").append("<div id='" + barIdLine0 + "' class='itemlist_bar_line' style='display: none'></div>");
			$("body").append("<div id='" + barIdLine1 + "' class='itemlist_bar_line' style='display: none'></div>");
		}

		if ($(this).is(":hidden")) {
			//要素が非表示であれば、バーも表示しない
			$("#" + barIdBase).hide();
			$("#" + barIdLine0).hide();
			$("#" + barIdLine1).hide();

		} else {
			//要素位置を確認
			var offset = $(this).bounds();

			//バーの位置を決定
			var tmp = data["time_from"].split(":");
			var timeFrom = Number(tmp[0]);
			var timeSpan = Number(data["time_limit"]);

			var atStartPos = [];
			var atLength = [];

			atStartPos.push(offset.width / 24 * timeFrom);
			atLength.push(offset.width / 24 * timeSpan);
			if (atStartPos[0] + atLength[0] > offset.width) {
				atStartPos.push(0);
				atLength.push(atStartPos[0] + atLength[0] - offset.width);
				atLength[0] = offset.width - atStartPos[0];
			}

			//バーを移動・表示する
			$("#" + barIdBase).css({
				top: offset.top,
				left: offset.left,
				width: offset.width,
				height: barHeight
			});
			$("#" + barIdBase).show();

			$("#" + barIdLine0).css({
				top: offset.top,
				left: offset.left + atStartPos[0],
				width: atLength[0],
				height: barHeight
			});
			$("#" + barIdLine0).show();

			if (atStartPos.length >= 2) {
				$("#" + barIdLine1).css({
					top: offset.top,
					left: offset.left + atStartPos[1],
					width: atLength[1],
					height: barHeight
				});
				$("#" + barIdLine1).show();
			} else {
				$("#" + barIdLine1).hide();
			}
		}
	});

	return;

}