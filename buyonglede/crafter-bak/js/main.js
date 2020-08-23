// logic thanks! https://github.com/doxxx/ffxiv-craft-opt-web

/*

	[未修正]
	・IE10,edgeでフィルタが効かない
	・IE系でunzipがくそ重い。バックグラウンドに回したいよ

	[保留]
	工数あがりっぷり比較モード

	[中止]
	品質状態（高品質とか）のアクション追従有無（今は例えば2枠目を高品質にして、それを移動すると「高品質」であることも移動する。でも本来の品質状況はアクションに依存しない）
		※品質追従は取りやめ。シミュレータは基本最低条件でやらないと意味がないので…。でも魂系使う場合は品質設定面倒だし、復活するかもしないかも<br>


	実効率表示
		sample
			基本効率：100
			属性効果：効率+100
			アート効果：効率+120
			高品質：効率 * 1.5
			インナークワイエット(2)：加工精度+20%
*/

//*****************************************************************
//設定
//*****************************************************************

//設定値
var config = {};
var itemData = {};
var recipeData = {};

//レシピ検索用変数
var recipeMap = [];

//アクション操作用
var actionDragInfo = {}; // ドラッグ用
var actionClickInfo = {}; // クリック用

//スクロール処理
var helperBaseOffset = null;
var mainBaseOffset = null;
var senarioTopBaseOffset = null;
var isInitScrollCheck = false;

//URL共有処理用
var shareURLInfo = "";

//クリップボードコピー実行出力用タイマー
var clipboardViewTimerId = null;

//ゲーム接続
var isGameLinkActive = false;
var isGameLinkFirstConnect = false;
var gameLinkTimerId = null;

//強制処理フラグ
var isForce = false;
var isForceStopUpdateSenario = false;

//*****************************************************************
//メニュータブ切り替え
//*****************************************************************
function onClickMenuTab() {
	var targetTab = $(this).attr("class").replace("active", "").replace(/ /g, "");
	$("#menu_tabs span").removeClass("active");
	$(this).addClass("active");

	$(".menu_panel").hide();
	$(".menu_panel_" + targetTab).show();

	checkScroll();
}
//*****************************************************************
//パラメタ設定
//*****************************************************************
//ジョブ変更
function onUpdateJob(jobInfo, isUpdated) {
	//以前と同じものを選択した場合は何もしない
	if (!isUpdated) {
		return;
	}
	var jobName = jobInfo.title;
	onUpdateJobHelper(jobName);
}
function onUpdateJobHelper(jobName) {
	//値の保存
	setConfig("selectedJobName", jobName);
	saveConfig();

	var preIsForceStopUpdateSenario = isForceStopUpdateSenario;
	isForce = true;
	isForceStopUpdateSenario = true;

	//パラメタをジョブごとに変更した値にする
	var jobInfo = config["jobInfo"][jobName];
	//Lv
	$("#cd_lv").spinner("value", jobInfo.lv);

	//作業精度
	$("#cd_cs").spinner("value", jobInfo.craftmanship);

	//加工精度
	$("#cd_ctrl").spinner("value", jobInfo.control);

	//CP
	$("#cd_cp").spinner("value", jobInfo.cp);

	//レシピリセット
	$("#jqms_recipe").data("plugin_menuSelector").forceSelectMenu(0, "1 - 5");
	$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(emptyRecipe);

	//アクションパネル変更
	changeActionPanel(jobName);

	isForceStopUpdateSenario = preIsForceStopUpdateSenario;
	isForce = false;

	//シナリオリセット
	resetSenario();
}

//レシピ変更
function onUpdateRecipe(recipe, isUpdated) {
	if (!isUpdated) {
		return;
	}

	//ジョブ変更判定
	if (emptyRecipe.id != recipe.id) {
		var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
		if (recipe.recipe.category != jobName) {
			//選択中ジョブとは異なるジョブが選択された
			onUpdateRecipeWithJob(recipe);
			return;
		}
	}

	var preIsForceStopUpdateSenario = isForceStopUpdateSenario;
	isForceStopUpdateSenario = true;

	//手動 or 自動入力
	if (emptyRecipe.id == recipe.id) {
		//手動入力
		$("#rcp_lv").selectmenu("enable");
		$("#rcp_dur").spinner("enable");
		$("#rcp_proc").spinner("enable");
		$("#rcp_q").spinner("enable");
		$("#rcp_q_start").spinner("enable");

		$("#rcp_lv").val(config["recipeManualParam"]["lv"]);
		$("#rcp_lv").selectmenu("refresh");
		$("#rcp_dur").spinner("value", config["recipeManualParam"]["dur"]);
		$("#rcp_proc").spinner("value", config["recipeManualParam"]["proc"]);
		$("#rcp_q").spinner("value", config["recipeManualParam"]["quality"]);
		$("#rcp_q_start").spinner("value", config["recipeInitialQuality"]);

		clearRecipeDetail();

	} else {
		//自動入力
		$("#rcp_lv").selectmenu("disable");
		$("#rcp_dur").spinner("disable");
		$("#rcp_proc").spinner("disable");
		$("#rcp_q").spinner("disable");
		$("#rcp_q_start").spinner("enable");

		$("#rcp_lv").val(getRecipeLvOptionValue(recipe.recipe));
		$("#rcp_lv").selectmenu("refresh");
		$("#rcp_dur").spinner("value", recipe.recipe.dur);
		$("#rcp_proc").spinner("value", recipe.recipe.p_cost);
		$("#rcp_q").spinner("value", recipe.recipe.q);
		$("#rcp_q_start").spinner("value", 0); //config["recipeInitialQuality"]);

		//spinner は stop が発生しないので値が適用されない。selectmenuはイベント発生につき値が保存される
		config["recipeManualParam"]["lv"] = getRecipeLvOptionValue(recipe.recipe);
		config["recipeManualParam"]["dur"] = recipe.recipe.dur;
		config["recipeManualParam"]["proc"] = recipe.recipe.p_cost;
		config["recipeManualParam"]["quality"] = recipe.recipe.q;

		config["recipeInitialQuality"] = 0;

		setRecipeDetail(recipe.item, recipe.recipe);
	}

	//値の保存
	//強制変更の場合は保存しない
	if (!isForce) {
		config["selectedRecipe"] = recipe;
		saveConfig();
	}

	isForceStopUpdateSenario = preIsForceStopUpdateSenario;

	//シナリオリセット
	resetSenario();
}

//レシピ変更（＋ジョブ変更）
function onUpdateRecipeWithJob(recipe) {
	//ジョブ変更をする
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(recipe.recipe.category);

	//言語変更時の救済処理
	if (-1 == jobIndex) {
		return;
	}
	var jobInfo = {
		desc: "",
		image: jobList[jobIndex].image,
		title: jobList[jobIndex].name
	};
	$("#jqms_jobs").data("plugin_menuSelector").forceSelectItem(jobInfo);

	//ここで選択レシピが一度手動に戻る(onUpdateRecipeの呼び出し）

	//再度選択する
	recipe.title = recipe.title.replace(/ ≪.*≫/, "");
	$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(recipe);

}


function getRecipeLvOptionValue(recipe) {
	var key = recipe.lv + recipe.mark;
	var ret = lvTableRecipe[key];
	return ret;
}

//食事変更
function onUpdateMeal(value, isUpdated) {
	//値の保存
	config["selectedMeal"] = value;
	saveConfig();

	//シナリオ再計算
	updateSenario();
}

//パラメタ変更
function onUpdateParameter(e, ui) {
	if (isForce) {
		return;
	}
	var obj = e.target;
	var id = $(obj).attr("id");

	//ジョブパラメタ群の変更
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	if ("cd_lv" == id) {
		config["jobInfo"][jobName].lv = $(obj).val();

	} else if ("cd_cs" == id) {
		config["jobInfo"][jobName].craftmanship = $(obj).val();

	} else if ("cd_ctrl" == id) {
		config["jobInfo"][jobName].control = $(obj).val();

	} else if ("cd_cp" == id) {
		config["jobInfo"][jobName].cp = $(obj).val();

	} else if ("rcp_lv" == id) {
		config["recipeManualParam"]["lv"] = $(obj).val();

	} else if ("rcp_dur" == id) {
		config["recipeManualParam"]["dur"] = $(obj).val();

	} else if ("rcp_proc" == id) {
		config["recipeManualParam"]["proc"] = $(obj).val();

	} else if ("rcp_q" == id) {
		config["recipeManualParam"]["quality"] = $(obj).val();

	} else if ("rcp_q_start" == id) {
		config["recipeInitialQuality"] = $(obj).val();
	}

	saveConfig();

	//シナリオ再計算
	updateSenario();
}

//*****************************************************************
//アクションパネル処理
//*****************************************************************
//アクション表示切替
// 通常⇒通常テキストなし⇒小サイズ⇒小サイズテキストなし⇒（ループ）
function onClickSwitchActionViewSize() {

	//現状確認
	var currentMode = getCurrentActionViewMode()
	var newMode = (currentMode + 1) % 4;

	//設定
	setActionViewMode(newMode);

	//値の保存
	setConfig("actionViewMode", newMode);
	saveConfig();
}
function getCurrentActionViewMode() {
	var obj = $("#action_area_work .action");
	var mode = 0;

	if ($(obj).hasClass("action_small_notext")) {
		//小サイズテキストなし
		mode = 3;

	} else if ($(obj).hasClass("action_small")) {
		//小サイズ
		mode = 2;

	} else if ($(obj).hasClass("action_notext")) {
		//通常テキストなし
		mode = 1;

	} else {
		mode = 0;
	}
	return mode;
}
function setActionViewMode(mode) {

	//action以外を削除 
	// actionは通常サイズのスタイルと共に、各種フィルタ条件になっているため外さない
	$("#panel_main_action .action").removeClass("action_notext action_small action_small_notext");

	if (1 == mode) {
		//通常テキストなし
		$("#panel_main_action .action").addClass("action_notext");

	} else if (2 == mode) {
		//小サイズ
		$("#panel_main_action .action").addClass("action_small");

	} else if (3 == mode) {
		//小サイズテキストなし
		$("#panel_main_action .action").addClass("action_small_notext");

	} else {
		// 0 == mode
		//通常
	}
}

//アクションパネル開閉
function onClickActionTitle() {
	var id = $(this).attr("id");
	var panelId = id.replace("title_", "area_");

	if ($("#" + panelId).is(":visible")) {
		$("#" + panelId).hide();
		config["actionPanelStatus"][panelId] = false;
	} else {
		$("#" + panelId).show();
		config["actionPanelStatus"][panelId] = true;
	}
	checkFavoriteEmpty();
	saveConfig();
}

//アクション再表示
function onClickRefreshActionView() {
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	changeActionPanel(jobName);
}
//アクションパネル更新
function changeActionPanel(jobName) {

	//表示モードを確認
	var viewMode = getCurrentActionViewMode();

	//既存のイベントを解放
	$("#panel_main_action .action").each(function() { releaseActionEvent(this);});

	//新しいジョブにあったパネルを生成
	for (var i in actionPanelList) {
		var actionPanelName = actionPanelList[i];
		var actionIdList = null;
		if ("favorite" == actionPanelName) {
			actionIdList = config["actionFavorite"][jobName];
		} else {
			actionIdList = actionTableMap[jobName][actionPanelName];
		}
		var html = "";
		for (var j in actionIdList) {
			var actionHTML = createActionIconHTML(jobName, actionPanelName, actionIdList[j]);
			html += actionHTML;
		}

		$("#action_area_" + actionPanelName).html(html);
	}

	//お気に入り空チェック
	checkFavoriteEmpty();

	//表示モード適用
	setActionViewMode(viewMode);

	//アイコンをドラッグできるようにする
	$("#action_area_favorite .action").each(function(){ setActionClickEvent(this);});
	$("#action_area_work .action").each(function()    { setActionDragEvent(this); setActionClickEvent(this);});
	$("#action_area_quality .action").each(function() { setActionDragEvent(this); setActionClickEvent(this);});
	$("#action_area_buff .action").each(function()    { setActionDragEvent(this); setActionClickEvent(this);});
	$("#action_area_meister .action").each(function() { setActionDragEvent(this); setActionClickEvent(this);});
	$("#action_area_attr .action").each(function()    { setActionDragEvent(this); setActionClickEvent(this);});
}
function releaseActionEvent(obj) {
	//draggable
	if (null != $(obj).draggable("instance")) {
		$(obj).draggable("destroy");
	}

}
function setActionDragEvent(obj) {
	//draggable
	$(obj).draggable({
		helper: "clone",
		opacity: 0.7,
		distance: 5,
		connectToSortable: "#action_area_favorite, #senario_panel",
		start: function(e, ui) {
			actionClickInfo["object"] = null;
			$(this).draggable('option', 'cursorAt', {
				'left': Math.floor(ui.helper.outerWidth() / 2),
				'top': Math.floor(ui.helper.outerHeight() / 2),
			});
			$(this).css("zIndex", "50000");

			debug_dragStatLog("*** draggable: start");
			if (null == actionDragInfo["dragFromPanel"]) {
				var parentId = $(e.target).parent().attr("id");
				actionDragInfo["dragFromPanel"] = parentId;
				actionDragInfo["checkAreaList"] = ["#action_area_favorite", "#senario_panel"];
				actionDragInfo["areaResult"] = [];
				debug_dragStatLog("***** drag start: draggable");
			}
		},
		stop: function(e, ui) {
			debug_dragStatLog("*** draggable: stop");
			var parentId = $(e.target).parent().attr("id");
			if (null == parentId || parentId == actionDragInfo["dragFromPanel"]) {
				actionDragInfo = [];
				debug_dragStatLog("***** drag end: draggable" + (null == parentId ? "(deleted)" : ""));
			}
			if (null != ui.helper) {
				ui.helper.css("cursor", "pointer");
			}
		},
		drag: function(e, ui) {
			//debug_dragStatLog("*** draggable: drag");
			checkActionDragInfo(ui);
			var cursor = "no-drop";
			if (actionDragInfo["areaResult"]["#action_area_favorite"]) {
				cursor = "alias";
			} else if (actionDragInfo["areaResult"]["#senario_panel"]) {
				cursor = "alias";
			}
			ui.helper.css("cursor", cursor);
		}
	});
}
function setActionClickEvent(obj) {
	//click
	$(obj).on("mousedown", function(e) {
		actionClickInfo["object"] = null;
		if (0 != e.button) {
			return;
		}
		var parentId = "";
		var parent = e.target;
		while (true) {
			parent = $(parent).parent();
			if (null == parent || 0 == $(parent).length) {
				break;
			}
			if ($(parent).hasClass("action_area")) {
				parentId = $(parent).attr("id");
				break;
			}
		}
		actionClickInfo["object"] = $(this);
		actionClickInfo["fromPanel"] = parentId;
		actionClickInfo["actionId"] = $(this).attr("x-action-id");

	});
	$(obj).on("mouseup", function(e) {
		if (null == actionClickInfo["object"]) {
			return;
		}
		//クリックによるシナリオ追加
		forceAddSenario(actionClickInfo["actionId"], null, true);
		actionClickInfo["object"] = null;

		//最終行の表示
		var lastAction = $("#senario_panel .senario_action:last");
		if (null != lastAction && 0 != $(lastAction).length) {
			showTargetSenarioAction(lastAction);
		}
	});

}
//対象アクションを表示できるようにする
function showTargetSenarioAction(action) {
	if (getScrollTop() + $(window).height() > $(action).offset().top + $(action).height()) {
	} else {
		$(window).scrollTop($(action).offset().top + $(action).height() + 10 - $(window).height());
	}
}

//アクションアイコンHTML作成
function createActionIconHTML(jobName, actionPanelName, actionId) {
	var action = crafterActionData[actionId];
	var actionType = "";
	if ("true" == action["meister"]) {
		actionType = "meister";

	} else if ("1" == action["isAdd"]) {
		var jobIndex = getJobIndex(jobName);
		if (action["job"] != jobIndex) {
			actionType = "additional";
		}
	}
	var html = sprintf(
		"<div class=\"action\" id=\"action_{0}_{1}\" x-action-id=\"{1}\" style=\"z-index:20000\">" + 
		"<span class=\"action_icon_{1} image {3}\"><span class=\"cost\">{5}</span></span>" + 
		"<span class=\"text\">{4}</span>" +
		"" +
		"</div>", [
		actionPanelName,
		actionId,
		action["icon"],
		actionType,
		("jp" == lang ? action["jpAbbr"] : action[lang]),
		(0 != action.cpCost ? action.cpCost : "&nbsp;")
	]);
	return html;
}


//お気に入り更新
function updateFavorite() {
	var actionList = $("#action_area_favorite .action");
	var actionIdList = [];
	$(actionList).each(function() {
		if (!$(this).hasClass("ui-sortable-helper")) {
			actionIdList.push($(this).attr("x-action-id"));

			//クリックイベント再設定
			$(this).off("mouseup");
			$(this).off("mousedown");
			setActionClickEvent($(this));
		}
	});

	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	config["actionFavorite"][jobName] = actionIdList;
	if (config["isSharingFavorite"]) {
		shareFavorite(jobName);
	}
	saveConfig();

	checkFavoriteEmpty();
}
function checkFavoriteEmpty() {
	var actionList = $("#action_area_favorite .action");

	if (0 == actionList.length) {
		var rectParent = getRect("#panel_main_action");
		var rectFavorite = getRect("#action_area_favorite");

		var top = 108;
		var left = rectFavorite.left - rectParent.left + 5 + 5;

		$("#ml_action_empty").css({
			top: top + "px",
			left: left + "px",
		});

		if ($("#action_area_favorite").is(":visible")) {
			$("#ml_action_empty").show();
		} else {
			$("#ml_action_empty").hide();
		}

	} else {
		$("#ml_action_empty").hide();
	}
}

//お気に入り共有設定
function onClickSharingFavoriteLabel(e) {
	e.stopPropagation();
}
function onClickSharingFavorite(e) {
	//エリアトグル抑止
	e.stopPropagation();

	//設定
	var isSharing = $("#shared_favorite_job").prop("checked");
	config["isSharingFavorite"] = isSharing;
	if (isSharing) {
		var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
		shareFavorite(jobName);
	}
	saveConfig();
}
//お気に入り共有処理
function shareFavorite(baseJobName) {

	var baseList = config["actionFavorite"][baseJobName];
	for (var targetJobName in config["actionFavorite"]) {
		//ループ対象がベースジョブであれば何もしない
		if (baseJobName == targetJobName) {
			continue;
		}
		//ループ対象が現在の言語で定義されているジョブでなければ何もしない
		if (null == actionTableMap[targetJobName]) {
			continue;
		}

		//各アクションに対して処理を行う
		var jobIndex = getJobIndex(targetJobName);
		var newList = [];
		for (var i in baseList) {
			var baseActionId = baseList[i];
			var baseAction = crafterActionData[baseActionId];

			//自ジョブのアクションであれば、そのまま追加
			//アディショナル可能であれば、そのまま追加
			if (jobIndex == baseAction.job || "1" == baseAction.isAdd) {
				newList.push(baseActionId);
				continue;
			}

			//自ジョブにある同名アクションに変換
			var newAction = null;
			for (var tmpActionId in crafterActionData) {
				var tmpAction = crafterActionData[tmpActionId];
				if (jobIndex == tmpAction.job) {
					//同名チェック
					if (baseAction.jp == tmpAction.jp) {
						newAction = tmpAction;
						break;
					}
					//マイスターアクション ** の魂 は jpAbbr にて比較
					if (baseAction.jpAbbr == "魂" && baseAction.jpAbbr == tmpAction.jpAbbr) {
						newAction = tmpAction;
						break;
					}
				}
			}
			if (null == newAction) {
				console.log("アクション変換失敗:fromJob=" + baseJobName + ", toJob=" + targetJobName);
				console.log(baseAction);
				continue;
			}
			newList.push(newAction.id);
		}
		config["actionFavorite"][targetJobName] = newList;
	}


}

//*****************************************************************
//シナリオアクション処理
//*****************************************************************
//アクション複製
function duplicateAction(obj) {
	var id = $(obj).attr("x-id");
	var baseObj = $("#" + id);
	var actionId = $(baseObj).attr("x-action-id");

	var newItem = createSenarioAction(actionId);
	$(newItem).insertAfter(baseObj);

	//再取得
	var newId = $(newItem).attr("id");
	newItem = $("#" + newId);

	showTargetSenarioAction(newItem);

	updateSenario();
}

//アイテムクリック
function rightClickAction(obj) {
	var e = windowEvent();
	var itemOffset = $(obj).offset();
	var itemWidth = $(obj).width();
	var toLeft = itemOffset.left + itemWidth * 1.2;

	$(obj).css("white-space", "nowrap");
	$(obj).css("zoom", "1.0");
	$(obj).animate(
		{"opacity": 0},
		{
			duration: 300,
			step: function(now) {
				$(obj).css({transform: 'scaleY(' + now + ')'});
			},

			complete: function() {
				$("#" + $(this).attr("id")).remove();
				updateSenario();
			}
		}
	);


	e.preventDefault();
	e.stopPropagation();
}

//アクション削除
function removeAction(obj) {
	var id = $(obj).attr("x-id");
	obj = $("#" + id);

	var itemOffset = $(obj).offset();
	var itemWidth = $(obj).width();
	var toLeft = itemOffset.left + itemWidth * 1.2;

	$(obj).css("white-space", "nowrap");
	$(obj).css("zoom", "1.0");
	$(obj).animate(
		{"opacity": 0},
		{
			duration: 300,
			step: function(now) {
				$(obj).css({transform: 'scaleY(' + now + ')'});
			},

			complete: function() {
				$("#" + $(this).attr("id")).remove();
				updateSenario();
			}
		}
	);
}

//品質状態変更
function changeQuality(obj) {

	var currentIndex = Number($(obj).attr("x-quality"));
	var index = currentIndex - 1;
	if (index < 0) {
		index = craftStatusList.length - 1;
	}

	$(obj).attr("src", craftStatusList[index].image);
	$(obj).attr("x-tooltip", craftStatusList[index].title);
	$(obj).attr("x-quality", index);

	//ツールチップ強制書き換え
	$(".ui-tooltip-content").each(function(e) {
		$(this).html(craftStatusList[index].title);
	});

	//シナリオ更新
	updateSenario();
}
//成功失敗変更
function changeSucessResult(obj, isSuccess) {
	//親の取得
	var parent = $(obj).parent();

	//ボタン表示の変更
	if (isSuccess) {
		$("span:eq(0)", parent).removeClass("failure");
		$("span:eq(1)", parent).removeClass("action_result_deactive");
		$("span:eq(1)", parent).addClass("action_result_active");
		$("span:eq(2)", parent).addClass("action_result_deactive");
		$("span:eq(2)", parent).removeClass("action_result_active");
	} else {
		$("span:eq(0)", parent).addClass("failure");
		$("span:eq(1)", parent).addClass("action_result_deactive");
		$("span:eq(1)", parent).removeClass("action_result_active");
		$("span:eq(2)", parent).removeClass("action_result_deactive");
		$("span:eq(2)", parent).addClass("action_result_active");
	}

	//シナリオ更新
	updateSenario();
}

//テキストメモ編集開始
function enterMemoEditMode(obj) {
	//ほかに編集しているものがある場合は編集終了
	$("#senario_panel textarea").each(function() {completeMemoEditMode($(this));});

	//編集開始
	$(obj).readOnly = false;
	$(obj).css("backgroundColor", "#404040");
	$(obj).removeClass("readonly");
	$(obj).focus();
}
function completeMemoEditMode(obj) {
	//編集中判定
	if ($(obj).hasClass("readonly")) {
		return;
	}

	//編集終了
	$(obj).readOnly = true;
	$(obj).css("backgroundColor", "#202020");
	$(obj).addClass("readonly");

}
function onMouseDownMemo(obj) {

	//バブリング停止
	var e = windowEvent();
	if (null != e) {
		e.stopPropagation();
	}

}
//*****************************************************************
//品質・工数計算
//*****************************************************************
//シナリオリセット
function resetSenario(_isUpdateSenario) {
	isUpdateSenario = (_isUpdateSenario === undefined ? true : _isUpdateSenario);

	$("#senario_panel").html("");
	if (isUpdateSenario) {
		updateSenario();
	}
}

//シナリオ更新
var senarioInfo = {};
function updateSenario() {

	if (isForceStopUpdateSenario) {
		return;
	}

	console.log("***** update senario");

	//アクション数確認
	checkSenarioEmpty();

	//フィニッシュワークが残っていたら消す
	var isFinishWorkSuccess = clearFinishWork();

	//初期化
	initSenario();

	//アクション毎に処理開始
	var turn = 0;
	var preActionName = "";
	var actionContCount = 1;
	for (var i = 0;i < senarioInfo.actionList.length;i++) {
		//初期化
		var actionObj = senarioInfo.actionList[i];
		var action = crafterActionData[actionObj.id];
		var craftStatus = getCraftStatus(actionObj);
		var isSuccess = getSuccessStatus(actionObj);
		senarioInfo.flags.isAddFinishWork = false;

		//テキストメモは何もしない
		if (action.id == 193) {
			continue;
		}
		turn++;

		//アクション名補正
		var viewActionName = action[lang];

		if (45 == actionObj.id && "jp" == lang) {
			//長さ調整
			if (actionContCount +1 < 10) {
				viewActionName = "ブランド･オブ･ライトニング";
			} else {
				viewActionName = "ﾌﾞﾗﾝﾄﾞ･ｵﾌﾞ･ﾗｲﾄﾆﾝｸﾞ";
			}
		}
		if (preActionName == action[lang]) {
			actionContCount++;
			$(".title", actionObj.object).html(viewActionName + " (" + actionContCount + ")");
		} else {
			actionContCount = 1;
			$(".title", actionObj.object).html(viewActionName);
		}
		preActionName = action[lang];

		//バフの有効化
		enableBuff();

		//実行前バフ状態の適用
		setBuffView(actionObj);

		//成功率補正表示
		setSuccessRateView(action, actionObj);

		//処理前ステータスの退避
		var preStatus = $.extend(true, [], senarioInfo.status);

		//実行可否の確認
		var ret = isExecutableAction(turn, action, craftStatus);
		setExecutableActionView(actionObj, ret);
		if ("" != ret) {
			//実行不可

			//バフ評価
			//NOTE 仕事唄のスタック0フィニッシュワークもここに含む
			executeBuff(actionObj, craftStatus);

			//ターン経過バフ処理
			updateBuffsTurn();

			//結果表示
			setResultView(actionObj, preStatus, false);

		} else {
			//実行可能

			//アクション実行
			executeAction(action, actionObj, isSuccess);

			//バフ評価
			//NOTE 仕事唄のスタック0フィニッシュワークもここに含む
			executeBuff(actionObj, craftStatus);

			//結果表示
			setResultView(actionObj, preStatus, true);

			//フィニッシュワーク
			if (senarioInfo.flags.isAddFinishWork) {
				addFinishWork(actionObj, isFinishWorkSuccess, turn, craftStatus);
				preActionName = "";
				actionContCount = 1;
			}

			//ターン経過バフ処理
			updateBuffsTurn();
		}
	}

	updateProgressPanel();
	saveSenario();
	checkScroll();

	updateMacro();
	updateAdditional();
}
//アディショナルリスト更新
function updateAdditional() {

	//利用アクションの一覧を取得
	var actionIdList = [];
	for (var i in senarioInfo.actionList) {
		var tmpId = senarioInfo.actionList[i].id;
		if (-1 == actionIdList.indexOf(tmpId)) {
			actionIdList.push(tmpId);
		}
	}

	//アディショナル判定
	var additionalList = [];
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(jobName);

	for (var i in actionIdList) {
		var action = crafterActionData[actionIdList[i]];
		if (Number(action.job) == jobIndex || Number(action.job) == 99) {
			continue;
		}
		additionalList.push(action.id);
	}

	//HTML構築
	var html = "";
	var isInvalidMark = false;
	for (var i in additionalList) {
		var actionHTML = createActionIconHTML(jobName, "additionallist", additionalList[i]);
		html += actionHTML;

		//最大11個まで出力
		if (10 == i) {
			isInvalidMark = true;
			break;
		}
	}

	$("#additional_panel .list").html(html);

	//サイズ補正
	$("#additional_panel .list div").addClass("action_small");

	//無効化マークはHTMLに追加した後に補正
	if (isInvalidMark) {
		$("#additional_panel .list div:eq(10) span:eq(0)").addClass("invalid_filter");
	}
}

//全体プログレスパネル更新
function updateProgressPanel() {
	var maxWidth = 100;

	//耐久
	$("#progress_dur_value").html(senarioInfo.status.dur + "/" + senarioInfo.status.maxdur);

	//工数
	var baseValue = senarioInfo.status.proc;
	if (baseValue > senarioInfo.status.maxproc) {
		baseValue = senarioInfo.status.maxproc;
	}
	var v = Math.floor(baseValue / senarioInfo.status.maxproc * maxWidth);
	$("#progress_proc_bar").css("width", v + "px");
	$("#progress_proc_value").html(baseValue + "/" + senarioInfo.status.maxproc);

	//品質
	baseValue = senarioInfo.status.quality;
	if (baseValue > senarioInfo.status.maxquality) {
		baseValue = senarioInfo.status.maxquality;
	}
	v = Math.floor(baseValue / senarioInfo.status.maxquality * maxWidth);
	$("#progress_quality_bar").css("width", v + "px");
	$("#progress_quality_value").html(baseValue + "/" + senarioInfo.status.maxquality);
	v = calcHQPercent();
	$("#progress_quality_percent").html(sprintf("(HQ {0}%)", [v]));

	//CP
	baseValue = senarioInfo.status.cp;
	if (baseValue > senarioInfo.status.maxcp) {
		baseValue = senarioInfo.status.maxcp;
	}
	v = Math.floor(baseValue / senarioInfo.status.maxcp * maxWidth);
	$("#progress_cp_bar").css("width", v + "px");
	$("#progress_cp_value").html(baseValue + "/" + senarioInfo.status.maxcp);
}

function calcHQPercent() {
	if (0 == senarioInfo.status.maxquality) {
		return 100;
	}

	var percent = senarioInfo.status.quality / senarioInfo.status.maxquality * 100;
	if (100 == percent) {
		return 100;
	} else if (0 >= percent) {
		return 1;
	}

	for (var i = 1;i <= 100;i++) {
		var res = -0.0000056604 * Math.pow(i, 4) + 0.0015369705 * Math.pow(i, 3) - 0.1426469573 * Math.pow(i, 2) + 5.6122722959 * Math.pow(i, 1) - 5.5950384565;
		if (res > percent) {
			return (1 == i ? 1 : i - 1);
		}
	}
	return 100;
}

//シナリオ保存
function saveSenario() {
	config["actionSenario"] = [];
	for (var i = 0;i < senarioInfo.actionList.length;i++) {
		var actionObj = senarioInfo.actionList[i];
		var action = crafterActionData[actionObj.id];
		var craftStatus = getCraftStatus(actionObj);
		var isSuccess = getSuccessStatus(actionObj);

		var actionInfo = {
			id: action.id,
			craftStatus: craftStatus,
			isSuccess: isSuccess,
		};
		if (193 == actionObj.id) {
			actionInfo.memo = $("textarea", $(actionObj.object)).val();
		}
		config["actionSenario"].push(actionInfo);
	}
	saveConfig();
}

//結果表示
function setResultView(actionObj, preStatus, isSuccess) {

	var v = 0;

	if (isSuccess) {
		//eq:3= 耐久, 4=工数, 5=品質, 6=CP
		//耐久
		$("tr:eq(0) td:eq(3) .dur", $(actionObj.object)).html(senarioInfo.status.dur);
		$("tr:eq(0) td:eq(3) .effect", $(actionObj.object)).removeClass("plus");
		$("tr:eq(0) td:eq(3) .effect", $(actionObj.object)).removeClass("minus");
		v = senarioInfo.status.dur - preStatus.dur;
		if (0 == v) {
			$("tr:eq(0) td:eq(3) .effect", $(actionObj.object)).html("&nbsp;");
		} else {
			$("tr:eq(0) td:eq(3) .effect", $(actionObj.object)).addClass(v > 0 ? "plus" : "minus");
			$("tr:eq(0) td:eq(3) .effect", $(actionObj.object)).html(v > 0 ? "(+" + v + ")" : "(" + v + ")");
		}
		setResultGraph($("tr:eq(0) td:eq(3)", $(actionObj.object)), senarioInfo.status.dur, senarioInfo.status.maxdur, "/crafter/image/sys/barbase_dur.png");

		//工数
		$("tr:eq(0) td:eq(4) .proc", $(actionObj.object)).html(senarioInfo.status.proc);
		$("tr:eq(0) td:eq(4) .effect", $(actionObj.object)).removeClass("plus");
		$("tr:eq(0) td:eq(4) .effect", $(actionObj.object)).removeClass("minus");
		v = senarioInfo.status.proc - preStatus.proc;
		if (0 == v) {
			$("tr:eq(0) td:eq(4) .effect", $(actionObj.object)).html("&nbsp;");
		} else {
			$("tr:eq(0) td:eq(4) .effect", $(actionObj.object)).addClass(v > 0 ? "plus" : "minus");
			$("tr:eq(0) td:eq(4) .effect", $(actionObj.object)).html(v > 0 ? "(+" + v + ")" : "(" + v + ")");
		}
		setResultGraph($("tr:eq(0) td:eq(4)", $(actionObj.object)), senarioInfo.status.proc, senarioInfo.status.maxproc, "/crafter/image/sys/barbase_proc.png");

		//品質
		$("tr:eq(0) td:eq(5) .quality", $(actionObj.object)).html(senarioInfo.status.quality);
		$("tr:eq(0) td:eq(5) .effect", $(actionObj.object)).removeClass("plus");
		$("tr:eq(0) td:eq(5) .effect", $(actionObj.object)).removeClass("minus");
		v = senarioInfo.status.quality - preStatus.quality;
		if (0 == v) {
			$("tr:eq(0) td:eq(5) .effect", $(actionObj.object)).html("&nbsp;");
		} else {
			$("tr:eq(0) td:eq(5) .effect", $(actionObj.object)).addClass(v > 0 ? "plus" : "minus");
			$("tr:eq(0) td:eq(5) .effect", $(actionObj.object)).html(v > 0 ? "(+" + v + ")" : "(" + v + ")");
		}
		setResultGraph($("tr:eq(0) td:eq(5)", $(actionObj.object)), senarioInfo.status.quality, senarioInfo.status.maxquality, "/crafter/image/sys/barbase_quality.png");

		//CP
		$("tr:eq(0) td:eq(6) .cp", $(actionObj.object)).html(senarioInfo.status.cp);
		$("tr:eq(0) td:eq(6) .effect", $(actionObj.object)).removeClass("plus");
		$("tr:eq(0) td:eq(6) .effect", $(actionObj.object)).removeClass("minus");
		v = senarioInfo.status.cp - preStatus.cp;
		if (0 == v) {
			$("tr:eq(0) td:eq(6) .effect", $(actionObj.object)).html("&nbsp;");
		} else {
			$("tr:eq(0) td:eq(6) .effect", $(actionObj.object)).addClass(v > 0 ? "plus" : "minus");
			$("tr:eq(0) td:eq(6) .effect", $(actionObj.object)).html(v > 0 ? "(+" + v + ")" : "(" + v + ")");
		}
		setResultGraph($("tr:eq(0) td:eq(6)", $(actionObj.object)), senarioInfo.status.cp, senarioInfo.status.maxcp, "/crafter/image/sys/barbase_cp.png");

	} else {
		//eq:3= 耐久, 4=工数, 5=品質, 6=CP
		//耐久
		$("tr:eq(0) td:eq(3) .dur", $(actionObj.object)).html("&nbsp;");
		$("tr:eq(0) td:eq(3) .effect", $(actionObj.object)).html("&nbsp;");
		setResultGraph($("tr:eq(0) td:eq(3)", $(actionObj.object)), 0, 0, "/crafter/image/sys/barbase_dur.png");

		//工数
		$("tr:eq(0) td:eq(4) .proc", $(actionObj.object)).html("&nbsp;");
		$("tr:eq(0) td:eq(4) .effect", $(actionObj.object)).html("&nbsp;");
		setResultGraph($("tr:eq(0) td:eq(4)", $(actionObj.object)), 0, 0, "/crafter/image/sys/barbase_proc.png");

		//品質
		$("tr:eq(0) td:eq(5) .quality", $(actionObj.object)).html("&nbsp;");
		$("tr:eq(0) td:eq(5) .effect", $(actionObj.object)).html("&nbsp;");
		setResultGraph($("tr:eq(0) td:eq(5)", $(actionObj.object)), 0, 0, "/crafter/image/sys/barbase_quality.png");

		//CP
		$("tr:eq(0) td:eq(6) .cp", $(actionObj.object)).html("&nbsp;");
		$("tr:eq(0) td:eq(6) .effect", $(actionObj.object)).html("&nbsp;");
		setResultGraph($("tr:eq(0) td:eq(6)", $(actionObj.object)), 0, 0, "/crafter/image/sys/barbase_cp.png");
	}
}
function setResultGraph(object, value, maxValue, imageURL) {
	var widthPercent = 0;
	if (maxValue != 0) {
		widthPercent = value / maxValue * 100;
		if (widthPercent < 0) {
			widthPercent = 0;
		} else if (widthPercent > 100) {
			widthPercent = 100;
		}
	}
	$(object).css({
		backgroundImage: "url(" + imageURL + ")",
	    backgroundSize: widthPercent + "% 1px",
	    backgroundRepeat: "no-repeat"
	});
}

//成功率補正表示
function setSuccessRateView(action, actionObj) {
	//成功率算出
	var buffSteady = getBuffInfoByEffectId(57);
	var buffSteady2 = getBuffInfoByEffectId(45);
	var baseRate = Number(action.successRate);

	//いったん補正クラスを外す
	$(".success", $(actionObj.object)).removeClass("success_rate_up");

	if (100 == baseRate) {
		//もともと100であるものは補正対象外
		$(".success", $(actionObj.object)).html(baseRate + "%");

	} else if (null == buffSteady && null == buffSteady2) {
		//補正対象バフがない
		$(".success", $(actionObj.object)).html(baseRate + "%");

	} else {
		//補正
		baseRate += (null != buffSteady2 ? 30 : 20);
		if (baseRate > 100) {
			baseRate = 100;
		}
		$(".success", $(actionObj.object)).addClass("success_rate_up");
		$(".success", $(actionObj.object)).html(baseRate + "%");
	}
}

//バフ表示
function setBuffView(actionObj) {
	var html = "";
	for (var i in senarioInfo.buffList) {
		var buff = senarioInfo.buffList[i];
		var action = crafterActionData[buff.id];
		var turnText = (0 != buff.turn ? buff.turn + "t" : buff.stack);
		if (162 == buff.id) {
			turnText = "&nbsp;";
		}
		html += sprintf(
			'<div class="action_small3"><span class="action_icon_{0} image"><span class="buff_turn">{1}</span></span></div>', [
			buff.id,
			turnText
		]);
	}
	$(".buff", $(actionObj.object)).html(html);
}

//バフ評価
function executeBuff(actionObj, craftStatus) {
	//アクション実行に依存しないバフ効果
	var removeIdList = [];
	for (var i in senarioInfo.buffList) {
		var buff = senarioInfo.buffList[i];

		//有効になっていないもの（今回付与されたバフ）は発動しない
		if (!buff.enable) {
			return;
		}

		//effect=49: コンファ(CP+8)
		//effect=43: マニュピレーション(耐久+10)
		//effect=40: 仕事唄(turn=0にてフィニッシュワーク発動)
		if (49 == buff.effectId) {
			addCP(8);

		} else if (43 == buff.effectId) {
			addDur(10);

		} else if (40 == buff.effectId) {
			//高品質ならスタック減
			if (CRAFT_STATUS_VERYHIGH == craftStatus || CRAFT_STATUS_HIGH == craftStatus) {
				senarioInfo.buffList[i].stack--;
				if (senarioInfo.buffList[i].stack <= 0) {
					senarioInfo.flags.isAddFinishWork = true;
					removeIdList.push(senarioInfo.buffList[i].id);
				}
			}
		}
	}
	for (var i in removeIdList) {
		removeBuff(removeIdList[i]);
	}
}

//フィニッシュワーククリア
function clearFinishWork() {
	var fwAction = $("#senario_panel .senario_action_nomove");
	var ret = true;
	if (null != fwAction && 0 != $(fwAction).length) {
		ret = getSuccessStatus({object: $(fwAction)});
	}
	$(fwAction).remove();

	return ret;
}

//フィニッシュワーク発動
function addFinishWork(actionObj, isFinishWorkSuccess, turn, craftStatus) {

	//処理前ステータスの退避
	var preStatus = $.extend(true, [], senarioInfo.status);
	
	//アクション作成
	var newItem = createSenarioAction(135);
	$(newItem).insertAfter($(actionObj.object));

	//ID取得
	var id = $(newItem).attr("id");
	newItem = $("#" + id);

	//移動できないようにする
	$("#" + id).addClass("senario_action_nomove");

	//バフ・品質は非表示にする
	$(".quality_image", $("#" + id)).parent().html("");

	//成功率補正表示
	var action = crafterActionData[135];
	setSuccessRateView(action, {object: newItem});

	//成否適用
	$("span:eq(1)", $(".success", $(newItem)).parent()).removeClass("action_result_active");
	$("span:eq(2)", $(".success", $(newItem)).parent()).removeClass("action_result_deactive");
	if (isFinishWorkSuccess) {
		$("span:eq(0)", $(".success", $(newItem)).parent()).removeClass("failure");
		$("span:eq(1)", $(".success", $(newItem)).parent()).addClass("action_result_active");
		$("span:eq(2)", $(".success", $(newItem)).parent()).addClass("action_result_deactive");
	} else {
		$("span:eq(0)", $(".success", $(newItem)).parent()).addClass("failure");
		$("span:eq(1)", $(".success", $(newItem)).parent()).addClass("action_result_deactive");
		$("span:eq(2)", $(".success", $(newItem)).parent()).addClass("action_result_active");
	}

	//実行可否の確認
	var ret = isExecutableAction(turn, action, craftStatus);
	setExecutableActionView(actionObj, ret);
	if ("" != ret) {
		//実行不可
	} else {
		//実行可能

		//工数追加
		if (isFinishWorkSuccess) {
			addProcHelper(action, action.csEffect);
		}

		//耐久消費
		var cost = Number(action.csCost);
		//倹約判定
		if (null != getBuffInfoByEffectId(44) || null != getBuffInfoByEffectId(48)) {
			cost = Math.floor(cost * 0.5);
		}
		addDur(-1 * cost);
	}

	//結果表示
	setResultView({object: newItem}, preStatus);
}

//ターン経過バフ処理
function updateBuffsTurn() {
	var newBuffList = [];
	//ターン経過
	for (var i in senarioInfo.buffList) {
		if (senarioInfo.buffList[i].enable && senarioInfo.buffList[i].turn >= 1) {
			senarioInfo.buffList[i].turn--;
		}
		if (senarioInfo.buffList[i].turn >= 1 || senarioInfo.buffList[i].stack >= 1) {
			//継続
			newBuffList.push(senarioInfo.buffList[i]);
		}
	}
	senarioInfo.buffList = newBuffList;
}


//アクション実行
function executeAction(action, actionObj, isSuccess) {

	//NOTE アクション失敗は、アクションごとに挙動が異なるため、個々に処理する
	//NOTE はじめから成功率100％のアクションについては、失敗処理は実装しない

	var isExec = false;
	var effectDetail = "";
	var actionId = Number(action.id);
	var effectId = Number(action.effectId);
	var isNoUseDurCP = false;
	var buffInnerQuiet = getBuffInfoByEffectId(58);
	var buffWorkSong   = getBuffInfoByEffectId(40);

	/*
		■品質
		[効率] 100
		基本効率：100

		[精度] 1234 * 4.5
		基本作業精度：1234
		インナークワイエット(8)：加工精度 * 2.4
		イノベーション：加工精度 * 1.5

		[その他]
		高品質：上昇値 * 1.5
		工面算段II
		
		------------------------------------------
		■工数
		[効率] 250
		基本効率：100
		仕事唄効果：+50
		属性効果：+100
		アート効果：+120 (残工数60%)

		[精度] 1234 * 4.5
		基本作業精度：1234

		[その他]
		工面算段II
		堅実の心得

		control += senarioInfo.param.control * (0.2 * (buffInnerQuiet.stack - 1));
	*/

	while (true) {
		//工数
		//失敗の可能性：模範以外
		//effect=0：作業
		//effect=6：中級作業
		//effect=11：突貫作業
		//effect=13：ピース
		//effect=15：模範作業
		//effect=17：模範作業2
		//effect=18：堅実作業
		//effect=5：ブランド風
		//effect=10：ブランド火
		//effect=12：ブランド氷
		//effect=14：ブランド土
		//effect=16：ブランド雷
		//effect=19：ブランド水
		//effect=24：確信
		if (0 == effectId ||
			6 == effectId ||
			11 == effectId ||
			15 == effectId ||
			17 == effectId) {
			//効率依存
			if (isSuccess) {
				addProcHelper(action, action.csEffect);
			}
			isExec = true;
			break;
		}
		if (5  == effectId || 10 == effectId || 12 == effectId ||
			14 == effectId || 16 == effectId || 19 == effectId) {
			//効率依存、ただしレシピ等により効率変動
			if (isSuccess) {
				var effect = Number(action.csEffect);

				//アートオブ＊＊が有効である場合、工数残り1%につき効率2上昇（最大200増加）
				if (null != getBuffInfo([163, 164, 165, 166, 167, 168])) {
					var procPercent = Math.floor(senarioInfo.status.proc / senarioInfo.status.maxproc * 100);
					if (procPercent < 0) {
						procPercent = 0;
					} else if (procPercent > 100) {
						procPercent = 100;
					}
					effect += (100 - procPercent) * 2;
				}

				//属性レシピの場合、+100
				//NOTE：レシピ情報の a_at に "火" のようにデータが格納されている。データ言語問わず常に日本語。
				if (senarioInfo.rawRecipe.id != emptyRecipe.id) {
					var atInfo = senarioInfo.rawRecipe.recipe["a_at"];
					if (( 5 == effectId && "風" == atInfo) ||
						(10 == effectId && "火" == atInfo) ||
						(12 == effectId && "氷" == atInfo) ||
						(14 == effectId && "土" == atInfo) ||
						(16 == effectId && "雷" == atInfo) ||
						(19 == effectId && "水" == atInfo)) {
						effect += 100;
					}
				}
				addProcHelper(action, effect);
			}
			isExec = true;
			break;
		}
		if (13 == effectId || 
			24 == effectId) {
			//最大工数依存
			if (isSuccess) {
				var restProc = senarioInfo.status.maxproc - senarioInfo.status.proc;
				var v = Math.floor(restProc / 100 * 33);
				addProc(v);
			}
			isExec = true;
			break;
		}
		if (18 == effectId) {
			//固定値
			if (isSuccess) {
				addProc(40);
			}
			if (null != getBuffInfoByEffectId(31)) {
				isNoUseDurCP = true;
			}
			isExec = true;
			break;
		}

		//品質
		//失敗の可能性：すべて
		//	グレスラ消費の可能性があるので、addQualityHelper 内で判定する
		//effect=1：加工
		//effect=3：中級加工
		//effect=7：上級加工
		//effect=21：ヘイスティタッチ
		//effect=23：集中加工
		//effect=8：ビエルゴの祝福
		//effect=22：ビエルゴの技巧
		//effect=26：ビエルゴの奇跡
		if (1 == effectId ||
			3 == effectId ||
			7 == effectId ||
			21 == effectId ||
			23 == effectId) {
			//効率依存
			addQualityHelper(action, actionObj, action.ctrlEffect, isSuccess);

			//インナークワイエット+1
			if (isSuccess) {
				if (null != buffInnerQuiet) {
					//集中加工は+2なので、先に1回追加処理
					if (23 == effectId) {
						if (buffInnerQuiet.stack <= 10) {
							updateBuffStack(buffInnerQuiet.id, 1);
						}
					}
					//それ以外は+1
					if (buffInnerQuiet.stack <= 10) {
						updateBuffStack(buffInnerQuiet.id, 1);
					}
				}
			}
			isExec = true;
			break;
		}
		if (8 == effectId ||
			22 == effectId ||
			26 == effectId) {
			//効率依存
			addQualityHelper(action, actionObj, action.ctrlEffect, isSuccess);

			//インナークワイエット更新
			if (8 == effectId || 22 == effectId) {
				//インナー終了
				removeBuff(buffInnerQuiet.id);

			} else if (26 == effectId) {
				//インナースタック半減
				var stack = buffInnerQuiet.stack;
				if (1 != stack) {
					stack = Math.floor(stack / 2);
				}
				updateBuffStack(buffInnerQuiet.id, stack, true);
			}
			isExec = true;
			break;
		}

		//工数＆品質
		//失敗の可能性：あり
		//effect=28：匠の技
		if (28 == effect) {
			//効率依存
			if (isSuccess) {
				addProcHelper(action, action.csEffect);
				addQualityHelper(action, actionObj, action.ctrlEffect, isSuccess);
			}
			isExec = true;
			break;
		}

		//バフ：耐久回復
		//失敗の可能性：なし
		//2,12,21,32,41,52,61,77(effect=2)：マスターズメンド：耐久30
		//4,14,24,34,44,54,63,74(effect=4)：マスターズメンド2：耐久60
		//111-118(effect=27)：ニメーヤの紬車
		if (2 == effectId ||
			4 == effectId) {
			addDur(Number(action.csAdd));
			isExec = true;
			break;
		}
		if (27 == effectId) {
			//1-3=30, 4-8=20, 9-=10
			var add = 10;
			if (buffWorkSong.stack <= 3) {
				add = 30;
			} else if (buffWorkSong.stack <= 8) {
				add = 20;
			}
			addDur(add);
			removeBuff(buffWorkSong.id);
			isExec = true;
			break;
		}

		//バフ：CP回復
		//失敗の可能性：なし
		//127-134(effect=29)：会心の仕事
		//67(effect=20)：秘訣
		//153(effect=41)：リラックス
		if (29 == effectId) {
			addCP(Number(action.cpAddRun));
			updateBuffStack(buffWorkSong.id, -1);
			isExec = true;
			break;
		}
		if (20 == effectId) {
			addCP(Number(action.cpAddRun));
			isExec = true;
			break;
		}
		if (41 == effectId) {
			var add = 5;
			for (var i = 2;i <= buffInnerQuiet.stack;i++) {
				add = add + (12 - i);
			}
			addCP(add);
			removeBuff(buffInnerQuiet.id);
			isExec = true;
			break;
		}


		//バフ：ターン継続バフ
		//失敗の可能性：イノベイティブタッチ
		//154(42)：工面：定義どおり
		//155(43)：マニュ：定義どおり
		//156(44)：倹約：定義どおり
		//157(45)：ステディ2：定義どおり
		//158(46)：工面2：定義どおり
		//159(47)：イノベ：定義どおり
		//160(48)：倹約2：定義どおり
		//161(49)：コンファ：定義どおり
		//163-168(51-56)：アートオブ：定義どおり
		//169-176(57)：ステディ：定義どおり
		//185-192(59)：グレスラ：定義どおり
		//137-144(32)：魂：定義どおり
		//95-102(25)：イノベイティブタッチ：イノベーション3ターン
		//136(31)：堅実の心得：計算
		//162(50)：リクレイム：永続
		if (42 == effectId ||
			43 == effectId ||
			44 == effectId ||
			45 == effectId ||
			46 == effectId ||
			47 == effectId ||
			48 == effectId ||
			49 == effectId ||
			57 == effectId ||
			59 == effectId ||
			32 == effectId) {
			addBuff(action, action.turn, 0);
			isExec = true;
			break;
		}
		if (effectId >= 51 && effectId <= 56) {
			senarioInfo.flags.isUsedArtAction = true;
			addBuff(action, action.turn, 0);
			isExec = true;
		}

		if (50 == effectId) {
			addBuff(action, 999, 0);
			isExec = true;
			break;
		}
		if (25 == effectId) {
			addQualityHelper(action, actionObj, action.ctrlEffect, isSuccess);
			if (isSuccess) {
				//成功時
				//イノベーション付与
				addBuff(crafterActionData[159], 3, 0);

				//インナークワイエット追加
				if (buffInnerQuiet.stack <= 10) {
					updateBuffStack(buffInnerQuiet.id, 1);
				}
			}
			isExec = true;
			break;
		}
		if (31 == effectId) {
			if (isSuccess) {
				var turn = Math.floor(senarioInfo.status.maxproc / 100) + 1;
				addBuff(action, turn, 0);
			}
			isExec = true;
			break;
		}

		//スタック系バフ
		//失敗の可能性：なし
		//177-184(effect=58)：インナー：1～
		//145-152(effect=40)：仕事唄：～11
		if (58 == effectId) {
			addBuff(action, 0, 1);
			isExec = true;
			break;
		}
		if (40 == effectId) {
			addBuff(action, 0, 11);
			isExec = true;
			break;
		}

		//何もしない
		//失敗の可能性：なし
		//9,18,29,38,49,57,68,77(effect=9)：経過観察
		if (9 == effectId) {
			isExec = true;
			break;
		}
		break;
	}

	if (!isExec) {
		return "";
	}

	//耐久・CP消費
	if (!isNoUseDurCP) {
		if (0 != action.csCost) {
			var cost = Number(action.csCost);
			//倹約判定
			if (null != getBuffInfoByEffectId(44) || null != getBuffInfoByEffectId(48)) {
				cost = Math.floor(cost * 0.5);
			}
			addDur(-1 * cost);
		}
		if (0 != action.cpCost) {
			addCP(-1 * Number(action.cpCost));
		}
	}

	return effectDetail;
}

//工数追加
function addProcHelper(action, effect) {
	//仕事唄による効率向上
	var buffWorkSong = getBuffInfoByEffectId(40);
	var newEffect = Number(effect);
	if (null != buffWorkSong && buffWorkSong.stack % 3 == 0) {
		newEffect += 50;
	}

	//baseValue = 効率100における上昇値
	var baseValue = calcProgress(action, newEffect);
	
	var result = baseValue / 100 * Number(newEffect);

	//少数以下切り捨て
	result = Math.floor(result);
	//result = Math.floor(result * 1000) / 1000;

	addProc(result);
}
function addProc(value) {
	senarioInfo.status.proc += value;
	/*
	if (senarioInfo.status.proc > senarioInfo.status.maxproc) {
		senarioInfo.status.proc = senarioInfo.status.maxproc;
	}
	*/
}


//品質追加
function addQualityHelper(action, actionObj, effect, isSuccess) {
	var buffInnerQuiet = getBuffInfoByEffectId(58);
	var newEffect = effect;

	//効率バフ計算
	if (8 == action.effectId) {
		//ビエルゴの祝福
		newEffect = 100 + 20 * (buffInnerQuiet.stack - 1);

	} else if (22 == action.effectId) {
		//ビエルゴの技巧
		newEffect = 150 + 10 * (buffInnerQuiet.stack - 1);

	} else if (26 == action.effectId) {
		//ビエルゴの奇跡
		newEffect = 100 + 10 * (buffInnerQuiet.stack - 1);
	}

	//計算（内部で加工精度バフ処理）
	//baseValue = 効率100における上昇値
	var baseValue = calcQuality(action, newEffect);
	var result = baseValue / 100 * Number(newEffect);

	//倍率計算
	//グレスラ
	var buffGreatStride = getBuffInfoByEffectId(59);
	if (null != buffGreatStride) {
		result = result * 2;
		removeBuff(buffGreatStride.id);//グレスラ消費
	}

	//品質状態
	var craftStatus = getCraftStatus(actionObj);
	if (CRAFT_STATUS_LOW == craftStatus) {
		result = result * 0.5;

	} else if (CRAFT_STATUS_HIGH == craftStatus) {
		result = result * 1.5;

	} else if (CRAFT_STATUS_VERYHIGH == craftStatus) {
		result = result * 4.0;
	}

	//少数以下切り捨て
	result = Math.floor(result);
	//result = Math.floor(result * 1000) / 1000;

	if (isSuccess) {
		addQuality(result);
	}
}
function addQuality(value) {
	senarioInfo.status.quality += value;
	/*
	if (senarioInfo.status.quality > senarioInfo.status.maxquality) {
		senarioInfo.status.quality = senarioInfo.status.maxquality;
	}
	*/
}

//作業進捗
function calcProgress(action, effect) {

	//リアル解析計算値の取得
	var ingType = 0;
	if (null != getBuffInfoByEffectId(46)) {
		ingType = 2;
	} else if (null != getBuffInfoByEffectId(42)) {
		ingType = 1;
	}
	var realInfo = getAnalylzedProgress(true, Number(senarioInfo.param.lv), Number(senarioInfo.rawRecipe.recipe["lv_num"]), ingType);
	if (null != realInfo) {
		//y = 0.3092749700686221  * x -21.74836438348518
		var f = realInfo.formula.replace("x", senarioInfo.param.craftmanship);
		var v = eval(f);

		return v;
	}


	//クラフターレベル
	var crafterLv = senarioInfo.param.lv;
	if (null != lvTableCrafter[crafterLv]) {
		crafterLv = lvTableCrafter[crafterLv];
	}

	//レシピレベル
	var recipeLv = 0;
	if (null != senarioInfo.rawRecipe.recipe) {
		recipeLv = lvTableRecipe[senarioInfo.rawRecipe.recipe.lv + senarioInfo.rawRecipe.recipe.mark];
	} else {
		recipeLv = senarioInfo.recipe.lv;
	}

	//レベル係数
	var lvDiff = calcLvDiff(crafterLv, recipeLv);
	var baseProgress = 0;
	var lvFactor = 0;
	var progress = 0;

	//パラメタ計算
	var craftmanship = senarioInfo.param.craftmanship;

	//効果計算
	if (crafterLv >= 120){
		baseProgress = 2.09860e-5 * craftmanship * craftmanship + 0.196184 * craftmanship + 2.68452;

		// Level boost for recipes below crafter level
		// Level boost arbitrarily capped at 100 levels for now because of limited data
		if (lvDiff > 0) {
			lvFactor += 0.0504824 * Math.min(lvDiff, 5);
		}
		if (lvDiff > 5) {
			lvFactor += 0.0205906 * Math.min(lvDiff - 5, 10);
		}
		if (lvDiff > 15) {
			lvFactor += 0.0106398 * Math.min(lvDiff - 15, 5);
		}
		if (lvDiff > 20) {
			lvFactor += 6.69723e-4 * Math.min(lvDiff - 20, 100);
		}

		// Level penalty for recipes above crafter level
		// Level difference penalty appears to be capped at -6
		lvDiff = Math.max(lvDiff, -6);
		if (lvDiff < 0){
			lvFactor += 0.0804561 * Math.max(lvDiff, -5);
		}
		if (lvDiff < -5){
			lvFactor += 0.0505185 * Math.max(lvDiff - (-5), -1);
		}

		progress = (1 + lvFactor) * baseProgress;

	} else {
		baseProgress = 0.214959 * craftmanship + 1.6;

		// Level boost for recipes below crafter level
		// Level boost arbitrarily capped at 100 levels for now because of limited data
		if (lvDiff > 0) {
			lvFactor += 0.0495218 * Math.min(lvDiff, 5);
		}
		if (lvDiff > 5) {
			lvFactor += 0.0221127 * Math.min(lvDiff - 5, 10);
		}
		if (lvDiff > 15) {
			lvFactor += 0.0103120 * Math.min(lvDiff - 15, 5);
		}
		if (lvDiff > 20) {
			lvFactor += 6.68438e-4 * Math.min(lvDiff - 20, 100);
		}

		// Level penalty for recipes above crafter level
		// Level difference penalty was capped at -9 in 2.2
		lvDiff = Math.max(lvDiff, -6);
		if ((lvDiff < -5)) {
			lvFactor = 0.0501 * lvDiff;
		} else if ((-5 <= lvDiff) && (lvDiff < 0)) {
			lvFactor = 0.10 * lvDiff;
		}

		progress = (1 + lvFactor) * baseProgress;
	}

	return progress;
}

//品質進捗
function calcQuality(action, effect) {

	//リアル解析計算値の取得
	var ingType = 0;
	if (null != getBuffInfoByEffectId(46)) {
		ingType = 2;
	} else if (null != getBuffInfoByEffectId(42)) {
		ingType = 1;
	}
	var realInfo = getAnalylzedProgress(false, Number(senarioInfo.param.lv), Number(senarioInfo.rawRecipe.recipe["lv_num"]), ingType);
	if (null != realInfo) {
		//y = 0.3092749700686221  * x -21.74836438348518
		var c = senarioInfo.param.control;

		//インナークワイエット
		var buffInnerQuiet = getBuffInfoByEffectId(58);
		if (null != buffInnerQuiet) {
			c += c * (0.2 * (buffInnerQuiet.stack - 1));
		}
		//イノベ
		var buffInnovation = getBuffInfoByEffectId(47);
		if (null != buffInnovation) {
			c += c * 0.5;
		}

		//計算
		var f = realInfo.formula.replace("x", c);
		var v = eval(f);

		return v;
	}


	//クラフターレベル
	var crafterLv = senarioInfo.param.lv;
	if (null != lvTableCrafter[crafterLv]) {
		crafterLv = lvTableCrafter[crafterLv];
	}

	//レシピレベル
	var recipeLv = 0;
	if (null != senarioInfo.rawRecipe.recipe) {
		recipeLv = lvTableRecipe[senarioInfo.rawRecipe.recipe.lv + senarioInfo.rawRecipe.recipe.mark];
	} else {
		recipeLv = senarioInfo.recipe.lv;
	}

	//レベル係数
	var lvDiff = calcLvDiff(crafterLv, recipeLv);
    var baseQuality = 0;
    var recipeLevelFactor = 0;
    var levelCorrectionFactor = 0;
    var levelCorrectedQuality = 0;


	//パラメタ計算
	var control = senarioInfo.param.control;

	//インナークワイエット
	var buffInnerQuiet = getBuffInfoByEffectId(58);
	if (null != buffInnerQuiet) {
		control += senarioInfo.param.control * (0.2 * (buffInnerQuiet.stack - 1));
	}
	//イノベーション
	var buffInnovation = getBuffInfoByEffectId(47);
	if (null != buffInnovation) {
		control += senarioInfo.param.control * 0.5;
	}

	//効果計算
	if (recipeLv >= 115) {
		baseQuality = 3.37576e-5 * control * control + 0.338835 * control + 33.1305;

		recipeLevelFactor = 3.37610e-4 * (115 - recipeLv);

		// Level penalty for recipes above crafter level
		// Level difference penalty appears to be capped at -6
		lvDiff = Math.max(lvDiff, -6);
		if (lvDiff < 0) {
			levelCorrectionFactor = 0.0400267 * Math.max(lvDiff, -3);
		}
		if (lvDiff < -3){
			levelCorrectionFactor += 0.0451309 * Math.max(lvDiff - (-3), -3);
		}

		levelCorrectedQuality = baseQuality * (1 + levelCorrectionFactor) * (1 + recipeLevelFactor);

	} else if (recipeLv > 50) {
		baseQuality = 3.46e-5 * control * control + 0.3514 * control + 34.66;

		lvDiff = Math.max(lvDiff, -5);
		if (lvDiff <= -5) {
			levelCorrectionFactor = 0.05374 * lvDiff;
		} else {
			//if lvDiff > -5
			// Ingenuity does not quite reduce LDiff to 0
			levelCorrectionFactor = 0.05 * -0.5;
		}

		levelCorrectedQuality = baseQuality * (1 + levelCorrectionFactor);

	} else {
		baseQuality = 3.46e-5 * control * control + 0.3514 * control + 34.66;

		lvDiff = Math.max(lvDiff, -5);
		if (lvDiff < 0) {
			levelCorrectionFactor = 0.05 * lvDiff;
		}

		levelCorrectedQuality = baseQuality * (1 + levelCorrectionFactor);
	}

	//NOTE levelCorrectedQuality = 効率100における上昇値
	var result = levelCorrectedQuality;

	return result;
}

//レシピと自分のレベル差分を確認
function calcLvDiff(crafterLv, recipeLv) {

	//レベル差分計算
	var lvDiff = crafterLv - recipeLv;
	var rawLvDiff = lvDiff;
	var limitMax = 999;
	var limitMin = -10;

	if (null != getBuffInfoByEffectId(46)) {
		//工面2が有効
		if (null != lvTableRecipeIng2[recipeLv]) {
			recipeLv = lvTableRecipeIng2[recipeLv];
			lvDiff = crafterLv - recipeLv;
		} else {
			lvDiff = crafterLv - (recipeLv - 7); // fall back on 2.2 estimate
		}

		if (lvDiff > 0) {
			if (rawLvDiff >= 30) {
				//元のレベル差が30以上あるならば、元のレベル差を利用
				lvDiff = rawLvDiff;
			} else {
				//そうでなければ上限30
				lvDiff = Math.min(lvDiff, 30);
			}
		}

		if (lvDiff < 0) {
			lvDiff = Math.max(lvDiff, limitMin);
		}

	} else if (null != getBuffInfoByEffectId(42)) {
		//工面が有効
		if (null != lvTableRecipeIng1[recipeLv]) {
			recipeLv = lvTableRecipeIng1[recipeLv];
			lvDiff = crafterLv - recipeLv;
		} else {
			lvDiff = crafterLv - (recipeLv - 5); // fall back on 2.2 estimate
		}
		if (lvDiff > 0) {
			if (rawLvDiff >= 30) {
				//元のレベル差が30以上あるならば、元のレベル差を利用
				lvDiff = rawLvDiff;
			} else {
				//そうでなければ上限30
				lvDiff = Math.min(lvDiff, 30);
			}
		}

		if (lvDiff < 0) {
			lvDiff = Math.max(lvDiff, limitMin);
		}
	} else {
		//ここのコードは参照元にはないが、これをやらんと工面を使う前にレベル差分が20より大きい場合に、工面を使わないほうが良い、というようになってしまう。
		if (lvDiff > 0) {
			lvDiff = Math.min(lvDiff, limitMax);
		}

		if (lvDiff < 0) {
			lvDiff = Math.max(lvDiff, limitMin);
		}
	}

	return lvDiff;
}


//耐久消費／回復
function addDur(value) {
	senarioInfo.status.dur += value;
	if (senarioInfo.status.dur > senarioInfo.status.maxdur) {
		senarioInfo.status.dur = senarioInfo.status.maxdur;
	} else if (senarioInfo.status.dur < 0) {
		senarioInfo.status.dur = 0;
	}
}


//CP消費／回復
function addCP(value) {
	senarioInfo.status.cp += value;
	if (senarioInfo.status.cp > senarioInfo.status.maxcp) {
		senarioInfo.status.cp = senarioInfo.status.maxcp;
	} else if (senarioInfo.status.cp < 0) {
		senarioInfo.status.cp = 0;
	}
}
//バフ追加
function addBuff(action, turn, stack) {
	removeBuff(action.id);
	senarioInfo.buffList.push({
		id: action.id,
		effectId: action.effectId,
		turn: turn,
		stack: stack,
		enable: false
	});
}
//バフスタック変更
function updateBuffStack(actionId, stack, _isOverwrite) {
	var isOverwrite = (_isOverwrite === undefined ? false : _isOverwrite);

	for (var i in senarioInfo.buffList) {
		if (actionId == senarioInfo.buffList[i].id) {
			if (isOverwrite) {
				senarioInfo.buffList[i].stack = stack;
			} else {
				senarioInfo.buffList[i].stack += stack;
			}

			//上限確認
			var tmpAction = crafterActionData[senarioInfo.buffList[i].id];
			if (58 == tmpAction.effectId) {
				//インナークワイエット
				if (senarioInfo.buffList[i].stack > 11) {
					senarioInfo.buffList[i].stack = 11;
				}
			}
			//NOTE 仕事唄のスタック0はフィニッシュワーク発動があるため、ここではチェックしない
			break;
		}
	}
}

//バフ除去
function removeBuff(actionId) {
	var index = -1;
	for (var i in senarioInfo.buffList) {
		if (actionId == senarioInfo.buffList[i].id) {
			index = i;
			break;
		}
	}
	if (-1 != index) {
		senarioInfo.buffList.splice(index, 1);
	}
}

//バフ有効化
//	バフ追加＞評価のため、追加直後のバフをすぐに評価しないため、追加時には無効化されている
//	次ターン頭にて全部有効化する。主にコンファのため。
function enableBuff() {
	for (var i in senarioInfo.buffList) {
		senarioInfo.buffList[i].enable = true;
	}
}


//アクション実行可否の確認
function isExecutableAction(turn, action, craftStatus) {
	var ret = "";
	var actionId = Number(action.id);
	var effectId = Number(action.effectId);

	//工数制限
	//	完成済なら実行不可
	if (senarioInfo.status.proc >= senarioInfo.status.maxproc) {
		return ml_err_complete;
	}

	//耐久制限
	//	耐久1未満なら実行不可
	if (senarioInfo.status.dur < 1) {
		return ml_err_dur;
	}

	//CP制限
	if (action.cpCost > senarioInfo.status.cp) {
		return ml_err_cp;
	}

	//アート系利用制限
	if (effectId >= 51 && effectId <= 56) {
		if (senarioInfo.flags.isUsedArtAction) {
			return ml_err_art;
		}
	}

	//ターン限定
	//	94(24)：確信：1ターン目
	//	136(31)：堅実の心得：1ターン目
	if (24 == effectId || 31 == effectId) {
		if (1 != turn) {
			return ml_err_1turn;
		}
	}

	//状態制限
	//	67(20)：秘訣＞高品質
	//	78-85(22)：ビエルゴの技巧＞高品質
	//	86-93(23)：集中加工＞高品質
	if (20 == effectId ||
		22 == effectId ||
		23 == effectId) {
		if (CRAFT_STATUS_VERYHIGH != craftStatus && CRAFT_STATUS_HIGH != craftStatus) {
			return ml_err_hq;
		}
	}

	//バフ制限
	///	8(8)：ビエルゴの祝福：インナークワイエット
	//	153(41)：リラックス：インナークワイエット
	//	78-85(22)：ビエルゴの技巧：インナークワイエット
	//	103-110(26)：ビエルゴの奇跡：インナークワイエット

	//	119-126(28)：匠の技：インナースタック数＝仕事唄スタック数
	//	111-118(27)：ニメーヤの紬車：仕事唄
	//	127-134(29)：会心の仕事：仕事唄スタック数 mod 3 == 0

	var buffInnerQuiet = getBuffInfoByEffectId(58);
	var buffWorkSong   = getBuffInfoByEffectId(40);

	if (8 == effectId ||
		41 == effectId ||
		26 == effectId ||
		22 == effectId) {
		if (null == buffInnerQuiet || buffInnerQuiet.stack < 2) {
			return ml_err_inner;
		}
	}
	if (28 == effectId || 
		27 == effectId ||
		29 == effectId) {
		if (null == buffWorkSong || buffWorkSong.stack < 1) {
			return ml_err_worksong;
		}

		if (29 == effectId && buffWorkSong.stack % 3 != 0) {
			return ml_err_ws_stack;
		}

		if (28 == effectId && buffInnerQuiet.stack != buffWorkSong.stack) {
			return ml_err_stack;
		}
	}

	return "";
}

//アクション実行可否の表現設定
function setExecutableActionView(actionObj, executableStatus) {
	var id = $(actionObj.object).attr("id");
	if ("" == executableStatus) {
		//実行可
		$(actionObj.object).removeClass("senario_action_invalid");
		$("#" + id + "_err").hide();

	} else {
		//実行不可
		$(actionObj.object).addClass("senario_action_invalid");

		//エラー表示作成
		$("#" + id + "_err").html(executableStatus);

		//位置決定
		var left = 
			$("tr:eq(0) td:eq(0)", $(actionObj.object)).outerWidth() +
			$("tr:eq(0) td:eq(1)", $(actionObj.object)).outerWidth() + 15;
		var width = 
			$("tr:eq(0) td:eq(2)", $(actionObj.object)).outerWidth() +
			$("tr:eq(0) td:eq(3)", $(actionObj.object)).outerWidth() +
			$("tr:eq(0) td:eq(4)", $(actionObj.object)).outerWidth() +
			$("tr:eq(0) td:eq(5)", $(actionObj.object)).outerWidth() +
			$("tr:eq(0) td:eq(6)", $(actionObj.object)).outerWidth() - 5;
		$("#" + id + "_err").css({
			left: left + "px",
			top: "11px",
			width: width + "px"
		});
		$("#" + id + "_err").show();
	}
}

//バフ検索
function getBuffInfo(actionIdList) {
	var ret = null;
	for (var i in senarioInfo.buffList) {
		if (-1 != actionIdList.indexOf(Number(senarioInfo.buffList[i].id))) {
			ret = senarioInfo.buffList[i];
			break;
		}
	}
	return ret;
}
function getBuffInfoByEffectId(effectId) {
	var ret = null;
	for (var i in senarioInfo.buffList) {
		if (crafterActionData[senarioInfo.buffList[i].id].effectId == effectId) {
			ret = senarioInfo.buffList[i];
			break;
		}
	}
	return ret;
}

//クラフトステータス取得
function getCraftStatus(actionObj) {
	var ret = $(actionObj.object).find("[x-quality]").attr("x-quality");
	if (null == ret) {
		ret = CRAFT_STATUS_NORMAL;
	}
	return ret;
}
//成功失敗ステータス取得
function getSuccessStatus(actionObj) {
	var html = $(actionObj.object).find(".success");
	if (null == html || 0 == $(html).length) {
		return true;
	}
	var ret = $(html).hasClass("failure");
	return !ret;
}

//シナリオ処理：初期化
function initSenario() {
	///計算に必要な全情報を格納する
	senarioInfo = {
		rawRecipe: $("#jqms_recipe").data("plugin_menuSelector").settings.base.selectedItem,
		recipe: null,
		param: {  // 飯も含める
			"job": $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title,
			"lv": Number($("#cd_lv").val()),
			"craftmanship": Number($("#cd_cs").val()),
			"control": Number($("#cd_ctrl").val()),
			"cp": Number($("#cd_cp").val())
		},
		status: {"dur": 0, "maxdur": 0, "proc":0, "maxproc": 0, "quality": 0, "maxquality": 0, "cp": 0, "maxcp": 0},
		flags: {"isUsedArtAction": false},
		actionList: [],
		buffList: [],
	};

	///レシピ
	if (emptyRecipe.id == senarioInfo.rawRecipe.id) {
		senarioInfo.recipe = {
			"lv" : $("#rcp_lv").val(),
			"dur" : $("#rcp_dur").val(),
			"p_cost" : $("#rcp_proc").val(),
			"q" : $("#rcp_q").val()
		};
	} else {
		senarioInfo.recipe = senarioInfo.rawRecipe.recipe;
	}

	///パラメータへの食事情報反映
	addMealInfoToSenarioInfo();

	///初期ステータスの反映
	senarioInfo.status["dur"] = Number(senarioInfo.recipe["dur"]);
	senarioInfo.status["maxdur"] = Number(senarioInfo.recipe["dur"]);
	senarioInfo.status["proc"] = 0;
	senarioInfo.status["maxproc"] = Number(senarioInfo.recipe["p_cost"]);
	senarioInfo.status["quality"] = Number($("#rcp_q_start").val());
	senarioInfo.status["maxquality"] = Number(senarioInfo.recipe["q"]);
	senarioInfo.status["cp"] = Number(senarioInfo.param["cp"]);
	senarioInfo.status["maxcp"] = Number(senarioInfo.param["cp"]);

	//アクション
	$("#senario_panel .senario_action").each(function() {
		senarioInfo.actionList.push({
			id: $(this).attr("x-action-id"),
			object: this
		});
	});
}
////シナリオ処理：初期化：食事反映
function addMealInfoToSenarioInfo() {
	var mealInfo = $("#jqms_meals").data("plugin_menuSelector").settings.base.selectedItem
	if (null == mealInfo || null == mealInfo.meal) {
		return;
	}
	var addParam = {};
	for (var paramKey in mealInfo.meal["params"]) {
		var info = mealInfo.meal["params"][paramKey];
		var baseValue = -1;
		var baseKey = "";
		if (ml_cs == paramKey) {
			baseKey = "craftmanship";
		} else if (ml_ctrl == paramKey) {
			baseKey = "control";
		} else if (ml_cp == paramKey) {
			baseKey = "cp";
		}
		if ("" == baseValue) {
			continue;
		}
		baseValue = senarioInfo.param[baseKey];
		baseValue = Number(baseValue);

		var tmpValue = Number(info["add_value"].replace("%", "").replace("+", ""));
		if (-1 != info["add_value"].indexOf("%")) {
			tmpValue = Math.floor(baseValue / 100 * tmpValue);
		}
		if (null != info["add_limit"] && "" != info["add_limit"]) {
			if (tmpValue > info["add_limit"]) {
				tmpValue = Number(info["add_limit"]);
			}
		}
		addParam[baseKey] = tmpValue;
	}
	for (var key in addParam) {
		senarioInfo.param[key] += addParam[key];
	}
}

//シナリオ空チェック
function checkSenarioEmpty() {
	//位置調整
	var actionList = $("#senario_panel .senario_action");

	if (0 == actionList.length) {
		var rectParent = getRect("#senario_main_panel");
		var rectSenario = getRect("#senario_panel");
		var left = rectSenario.left - rectParent.left;
		var top = $("#menu_main_tabs").outerHeight() + $("#senario_top_panel").outerHeight() + $("#main_panel .header").outerHeight();
		var width = (rectSenario.width - 42);
		$("#ml_senario_action_empty").css({
			top: top + "px",
			left: left + "px",
			width: width + "px"
		});
		$("#ml_senario_action_empty").show();

	} else {
		$("#ml_senario_action_empty").hide();
	}

	//サイズ調整
	if ($("#additional_panel").is(":visible")) {
		$(".senario_action_empty").css("minHeight", "110px");
	} else {
		$(".senario_action_empty").css("minHeight", "140px");
	}
}


//*****************************************************************
//メインタブ処理
//*****************************************************************
//タブ切り替え
function onClickMainMenuTab() {
	var targetTab = $(this).attr("class").replace("active", "").replace(/ /g, "");
	$("#menu_main_tabs span").removeClass("active");
	$(this).addClass("active");

	$(".main_menu_panel").hide();
	$("#" + targetTab + "_main_panel").show();

	checkScroll();
	checkSenarioEmpty();
}


//*****************************************************************
//お気に入りタブ
//*****************************************************************
//サブタブ処理
function onClickFavSubTab() {
	var id = $(this).attr("id");
	var tabName = id.substr("ml_fav_subtab_".length);

	//タブのアクティブ化
	$("#fav_subtab span").removeClass("active");
	$(this).addClass("active");

	//パネルのアクティブ化
	$(".menu_panel_fav_sub").hide();
	$(".menu_panel_fav_sub_" + tabName).show();

	checkScroll();
}

//初期表示
function showFavorite() {
	var html = "";
	for (var i = 0;i < config["favoriteList"].length;i++) {
		var favInfo = config["favoriteList"][i];
		html += createFavoriteItem(favInfo);
	}
	$("#panel_main_fav").html(html);
	for (var i = 0;i < config["favoriteList"].length;i++) {
		setFavoriteItemEvent(config["favoriteList"][i].id);
	}
}
//お気に入り要素作成
function createFavoriteItem(favInfo) {
	var html = sprintf(
		'<div id="fav_{0}" class="fav">' +
		'<span class="title">{1}</span>' +
		'<input type="text" class="title_input" style="display: none">' + 
		'<span class="remove"><img src="/crafter/image/sys/action_remove.png"></span></div>', [
		favInfo.id,
		favInfo.title
	]);
	return html;
}
//イベント設定
function setFavoriteItemEvent(id) {
	$("#fav_" + id + " .title").on("click", function(e){showFavoriteDetail(e, id);});
	$("#fav_" + id + " .title").on("dblclick", function(e){enterFavoriteEditMode(id);});
	$("#fav_" + id + " .title_input").on("focusout", function(e){completeFavoriteEditMode(id);});
	$("#fav_" + id + " .title_input").on("keydown", function(e){checkCompleteFavoriteEditMode(e, id);});
	$("#fav_" + id + " .remove").on("click", function(e){removeFavorite(id);});

}
//選択したお気に入りを表示
function showFavoriteDetail(e, id) {
	var favInfo = getFavorite(id);
	if (null == favInfo) {
		return;
	}
	showFavoriteDetailHelper(favInfo);
}
function showFavoriteDetailHelper(favInfo) {

	//シナリオ更新強制停止
	isForceStopUpdateSenario = true;

	//ジョブ情報適用
	$("#jqms_jobs").data("plugin_menuSelector").forceSelectItem(favInfo.job.job);

	$("#cd_lv").spinner("value",   favInfo.job.lv);
	$("#cd_cs").spinner("value",   favInfo.job.craftmanship);
	$("#cd_ctrl").spinner("value", favInfo.job.control);
	$("#cd_cp").spinner("value",   favInfo.job.cp);

	//食事適用
	$("#jqms_meals").data("plugin_menuSelector").forceSelectItem(favInfo.meal);

	//レシピ適用
	$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(favInfo.recipe.recipe);
	if (emptyRecipe.id == favInfo.recipe.recipe.id) {
		$("#rcp_lv").val(favInfo.recipe.lv);
		$("#rcp_lv").selectmenu("refresh");
		$("#rcp_dur").spinner("value", favInfo.recipe.dur);
		$("#rcp_proc").spinner("value", favInfo.recipe.proc);
		$("#rcp_q").spinner("value", favInfo.recipe.quality);
	}
	//初期品質
	$("#rcp_q_start").spinner("value", favInfo.recipe.initialQuality);

	isForceStopUpdateSenario = false;

	//シナリオ適用
	loadSenario(favInfo.actionList);
}

//追加
function onClickAddFavorite() {
	//データ生成
	var favInfo = createFavoriteInfo();
	if (0 == favInfo.actionList.length) {
		return;
	}
	config["favoriteList"].push(favInfo);
	saveConfig();

	var html = createFavoriteItem(favInfo);
	$("#panel_main_fav").append(html);
	setFavoriteItemEvent(favInfo.id);

	//追加したアイテムを編集モードにする
	enterFavoriteEditMode(favInfo.id);
}
//お気に入りデータ生成
function createFavoriteInfo() {
	var titleText =	
		"[" + 
		$("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title + 
		"] ";
	if (null != $("#jqms_recipe").data("plugin_menuSelector").settings.base.selectedItem.item) {
		titleText += $("#jqms_recipe").data("plugin_menuSelector").settings.base.selectedItem.item.name;
	} else {
		titleText += $("#jqms_recipe").data("plugin_menuSelector").settings.base.selectedItem.title;
	}

	var favInfo = {
		id: getNewFavoriteId(),
		title: titleText,
		job: {
			job: $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem,
			lv: Number($("#cd_lv").val()),
			craftmanship: Number($("#cd_cs").val()),
			control: Number($("#cd_ctrl").val()),
			cp: Number($("#cd_cp").val())
		},
		meal: $("#jqms_meals").data("plugin_menuSelector").settings.base.selectedItem,
		recipe: {
			recipe: $("#jqms_recipe").data("plugin_menuSelector").settings.base.selectedItem,
			lv: 0,
			dur: 0,
			proc: 0,
			quality: 0,
			initialQuality: 0
		},
		actionList: []
	};
	if (emptyRecipe.id == favInfo.recipe.recipe.id) {
		favInfo.recipe.lv = Number($("#rcp_lv").val());
		favInfo.recipe.dur = Number($("#rcp_dur").val());
		favInfo.recipe.proc = Number($("#rcp_proc").val());
		favInfo.recipe.quality = Number($("#rcp_q").val());
		favInfo.recipe.initialQuality = Number($("#rcp_q_start").val());
	}

	//シナリオ取得の前に一度更新をかけておく。
	updateSenario();
	for (var i = 0;i < senarioInfo.actionList.length;i++) {
		var actionObj = senarioInfo.actionList[i];
		var actionInfo = {
			id: actionObj.id,
			craftStatus: getCraftStatus(actionObj),
			isSuccess: getSuccessStatus(actionObj),
		};
		if (193 == actionObj.id) {
			actionInfo.memo = $("textarea", $(actionObj.object)).val();
		}
		favInfo.actionList.push(actionInfo);
	}

	return favInfo;
}


//お気に入り取得
function getFavorite(id) {
	var favInfo = null;
	for (var i = 0;i < config["favoriteList"].length;i++) {
		if (id == config["favoriteList"][i].id) {
			favInfo = config["favoriteList"][i];
			break;
		}
	}
	return favInfo;
}
//お気に入りID取得
function getNewFavoriteId() {
	var ret = 0;

	for (var i = 0;i < config["favoriteList"].length;i++) {
		var favInfo = config["favoriteList"][i];
		if (favInfo.id >= ret) {
			ret = favInfo.id + 1;
		}
	}
	return ret;
}

//お気に入り削除
function removeFavorite(id) {
	//データ更新
	var newList = [];
	for (var i in config["favoriteList"]) {
		if (config["favoriteList"][i].id != id) {
			newList.push(config["favoriteList"][i]);

		}
	}
	config["favoriteList"] = newList;
	saveConfig();

	//表示更新
	$("#fav_" + id).remove();
}

//編集モードへ移行
function enterFavoriteEditMode(id) {
	var favInfo = getFavorite(id);
	if (null == favInfo) {
		return;
	}

	//編集中のものがある場合は強制終了
	for (var i in config["favoriteList"]) {
		var tmpId = config["favoriteList"][i].id;
		if ($("#fav_" + tmpId + " .title_input").is(":visible")) {
			completeFavoriteEditMode(tmpId);
		}
	}

	//編集モードへ
	$("#fav_" + id + " .title").hide();
	$("#fav_" + id + " .title_input").val(favInfo.title);
	$("#fav_" + id + " .title_input").show();
	$("#fav_" + id + " .title_input").focus();

}
//編集終了
function checkCompleteFavoriteEditMode(e, id) {
	if (13 == e.keyCode) {
		completeFavoriteEditMode(id);
	}
}
function completeFavoriteEditMode(id) {
	var favInfo = getFavorite(id);
	if (null == favInfo) {
		return;
	}
	var newTitle = $("#fav_" + id + " .title_input").val();
	if ("" == newTitle) {
		newTitle = "no title";
	}
	for (var i in config["favoriteList"]) {
		if (config["favoriteList"][i].id == id) {
			config["favoriteList"][i].title = newTitle;
			break;
		}
	}
	saveConfig();

	$("#fav_" + id + " .title").html(newTitle);
	$("#fav_" + id + " .title").show();
	$("#fav_" + id + " .title_input").hide();
}

//***** マイテンプレート ************************

//初期表示
function showTemplate() {
	var html = "";
	for (var i = 0;i < config["templateList"].length;i++) {
		var tplInfo = config["templateList"][i];
		html += createTemplateItem(tplInfo);
	}
	$("#panel_main_tpl").html(html);
	for (var i = 0;i < config["templateList"].length;i++) {
		setTemplateItemEvent(config["templateList"][i].id);
	}
}
//テンプレート要素作成
function createTemplateItem(tplInfo) {
	var html = sprintf(
		'<div id="tpl_{0}" class="tpl">' +
		'<span class="title">{1}</span>' +
		'<input type="text" class="title_input" style="display: none">' + 
		'<span class="remove"><img src="/crafter/image/sys/action_remove.png"></span></div>', [
		tplInfo.id,
		tplInfo.title
	]);
	return html;
}
//イベント設定
function setTemplateItemEvent(id) {
	$("#tpl_" + id + " .title").on("click", function(e){showTemplateDetail(e, id);});
	$("#tpl_" + id + " .title").on("dblclick", function(e){enterTemplateEditMode(id);});
	$("#tpl_" + id + " .title_input").on("focusout", function(e){completeTemplateEditMode(id);});
	$("#tpl_" + id + " .title_input").on("keydown", function(e){checkCompleteTemplateEditMode(e, id);});
	$("#tpl_" + id + " .remove").on("click", function(e){removeTemplate(id);});

}
//選択したテンプレートを表示
function showTemplateDetail(e, id) {
	var tplInfo = getTemplate(id);
	if (null == tplInfo) {
		return;
	}
	showTemplateDetailHelper(tplInfo);
}
function showTemplateDetailHelper(tplInfo) {

	//アクションのジョブ調整
	var actionList = [];
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(jobName);

	var artIdList = [163, 164, 165, 166, 167, 168];
	var brandIdList = [5, 15, 25, 35, 45, 64];

	for (var i in tplInfo.actionList) {
		var action = crafterActionData[tplInfo.actionList[i].id];
		var result = null;
		
		//ブランド／アート系
		//普通に処理するとアディショナルで入るが、極力自分の職で使えるものに寄せる
		if (-1 != artIdList.indexOf(Number(action.id))) {
			for (var j in artIdList) {
				var tmpId = artIdList[j];
				if (Number(crafterActionData[tmpId].job) == jobIndex) {
					result = {
						id: crafterActionData[tmpId].id,
						craftStatus: CRAFT_STATUS_NORMAL,
						isSuccess: true,
					};
					break;
				}
			}
			if (null != result) {
				actionList.push(result);
				continue;
			}
		}
		if (-1 != brandIdList.indexOf(Number(action.id))) {
			for (var j in brandIdList) {
				var tmpId = brandIdList[j];
				if (Number(crafterActionData[tmpId].job) == jobIndex) {
					result = {
						id: crafterActionData[tmpId].id,
						craftStatus: CRAFT_STATUS_NORMAL,
						isSuccess: true,
					};
					break;
				}
			}
			if (null != result) {
				actionList.push(result);
				continue;
			}
		}


		//そのまま使えるものはそのまま追加。
		if (Number(action.job) == jobIndex || "99" == action.job || "1" == action.isAdd) {
			//フィニッシュワーク／メモもここに含む（フィニッシュワークは updateSenario の冒頭で1回消えるけど）
			actionList.push(tplInfo.actionList[i]);
			continue;
		}

		//ジョブ調整
		//ジョブ内で同じ effectId を持つアクションがあればそれを追加
		for (var j in crafterActionData) {
			if (Number(crafterActionData[j].job) == jobIndex && 
				crafterActionData[j].effectId == action.effectId) {
				result = {
					id: crafterActionData[j].id,
					craftStatus: CRAFT_STATUS_NORMAL,
					isSuccess: true,
				};
				break;
			}
		}
		if (null != result) {
			actionList.push(result);
		}

		//変換失敗
		console.log("cannot apply");
		console.log(action);
	}


	//状態制限
	//	67(20)：秘訣＞高品質
	//	78-85(22)：ビエルゴの技巧＞高品質
	//	86-93(23)：集中加工＞高品質
	if (20 == effectId ||
		22 == effectId ||
		23 == effectId) {
		if (CRAFT_STATUS_VERYHIGH != craftStatus && CRAFT_STATUS_HIGH != craftStatus) {
			return ml_err_hq;
		}
	}

	//品質調整
	for (var i in actionList) {
		var action = crafterActionData[actionList[i].id];
		var effectId = Number(action.effectId);
		if (20 == effectId ||
			22 == effectId ||
			23 == effectId) {
			actionList[i].craftStatus = CRAFT_STATUS_HIGH;
		}
	}

	//シナリオ適用
	loadSenario(actionList);
}

//追加
function onClickAddTemplate() {
	//データ生成
	var tplInfo = createTemplateInfo();
	if (0 == tplInfo.actionList.length) {
		return;
	}
	config["templateList"].push(tplInfo);
	saveConfig();

	var html = createTemplateItem(tplInfo);
	$("#panel_main_tpl").append(html);
	setTemplateItemEvent(tplInfo.id);

	//追加したアイテムを編集モードにする
	enterTemplateEditMode(tplInfo.id);
}
//テンプレートデータ生成
function createTemplateInfo() {
	var tplInfo = {
		id: getNewTemplateId(),
		title: "no title",
		actionList: []
	};

	//シナリオ取得の前に一度更新をかけておく。
	updateSenario();
	for (var i = 0;i < senarioInfo.actionList.length;i++) {
		var actionObj = senarioInfo.actionList[i];
		var actionInfo = {
			id: actionObj.id,
			craftStatus: CRAFT_STATUS_NORMAL,
			isSuccess: true,
		};
		if (193 == actionObj.id) {
			actionInfo.memo = $("textarea", $(actionObj.object)).val();
		}
		tplInfo.actionList.push(actionInfo);
	}

	return tplInfo;
}


//テンプレート取得
function getTemplate(id) {
	var tplInfo = null;
	for (var i = 0;i < config["templateList"].length;i++) {
		if (id == config["templateList"][i].id) {
			tplInfo = config["templateList"][i];
			break;
		}
	}
	return tplInfo;
}
//テンプレートID取得
function getNewTemplateId() {
	var ret = 0;

	for (var i = 0;i < config["templateList"].length;i++) {
		var tplInfo = config["templateList"][i];
		if (tplInfo.id >= ret) {
			ret = tplInfo.id + 1;
		}
	}
	return ret;
}

//テンプレート削除
function removeTemplate(id) {
	//データ更新
	var newList = [];
	for (var i in config["templateList"]) {
		if (config["templateList"][i].id != id) {
			newList.push(config["templateList"][i]);

		}
	}
	config["templateList"] = newList;
	saveConfig();

	//表示更新
	$("#tpl_" + id).remove();
}

//編集モードへ移行
function enterTemplateEditMode(id) {
	var tplInfo = getTemplate(id);
	if (null == tplInfo) {
		return;
	}

	//編集中のものがある場合は強制終了
	for (var i in config["templateList"]) {
		var tmpId = config["templateList"][i].id;
		if ($("#tpl_" + tmpId + " .title_input").is(":visible")) {
			completeTemplateEditMode(tmpId);
		}
	}

	//編集モードへ
	$("#tpl_" + id + " .title").hide();
	$("#tpl_" + id + " .title_input").val(tplInfo.title);
	$("#tpl_" + id + " .title_input").show();
	$("#tpl_" + id + " .title_input").focus();

}
//編集終了
function checkCompleteTemplateEditMode(e, id) {
	if (13 == e.keyCode) {
		completeTemplateEditMode(id);
	}
}
function completeTemplateEditMode(id) {
	var tplInfo = getTemplate(id);
	if (null == tplInfo) {
		return;
	}
	var newTitle = $("#tpl_" + id + " .title_input").val();
	if ("" == newTitle) {
		newTitle = "no title";
	}
	for (var i in config["templateList"]) {
		if (config["templateList"][i].id == id) {
			config["templateList"][i].title = newTitle;
			break;
		}
	}
	saveConfig();

	$("#tpl_" + id + " .title").html(newTitle);
	$("#tpl_" + id + " .title").show();
	$("#tpl_" + id + " .title_input").hide();
}


//*****************************************************************
//マクロタブ
//*****************************************************************
//マクロ設定変更
function updateMacroConfig() {
	var tmp = {
		"lines": $("#macro_lines").val(),
		"continue_log": $("#macro_continue_log").val(),
		"complete_log": $("#macro_complete_log").val(),
		"precise": $("#macro_precise").prop("checked"),
		"last_nowait": $("#macro_last_nowait").prop("checked"),
	};

	//呼び出し回数が多いため、変更検知を行う
	if (config["macroLines"] == tmp["line"] &&
		config["macroContinueLog"] == tmp["continue_log"] &&
		config["macroCompleteLog"] == tmp["complete_log"] &&
		config["macroPrecise"] == tmp["precise"] &&
		config["macroLastNoWait"] == tmp["last_nowait"]) {
		return;
	}

	config["macroLines"] = tmp["lines"];
	config["macroContinueLog"] = tmp["continue_log"];
	config["macroCompleteLog"] = tmp["complete_log"];
	config["macroPrecise"] = tmp["precise"];
	config["macroLastNoWait"] = tmp["last_nowait"];

	saveConfig();
}

//マクロ構築
function updateMacro() {

	//既存マクロクリア
	$("#panel_main_macro").html("");

	//アクション一覧用意
	var macroList = [];
	var actionIdList = [];
	$("#senario_panel .senario_action").each(function() {
		var tmpId = $(this).attr("x-action-id");
		//フィニッシュワーク／テキストメモは無視する
		if (tmpId != 135 && tmpId != 193) {
			actionIdList.push(tmpId);
		}
	});

	//アクションが未定義の場合はここで終了
	if (0 == actionIdList.length) {
		return;
	}

	//1マクロの最大行数
	var maxLines = config["macroLines"];
	var listIndex = 0;
	var isAddCompleteLog = true;

	//1個目の箱だけ用意する
	macroList.push([]);
	
	for (var i in actionIdList) {
		var actionId = actionIdList[i];
		var action = crafterActionData[actionId];

		//最終アクション？
		var isLast = (i == actionIdList.length - 1);

		//このアクションを実行するために必要な箱のサイズは？
		var needSize = 1;
		var isAddPrecise = false;
		if (Number(action.effectId) == 1 && config["macroPrecise"]) {
			//加工であり、かつ集中加工を合わせる場合は2つ追加
			isAddPrecise = true;
			needSize = 2;
		}

		//追加対象の箱サイズを確認
		var boxSize = macroList[listIndex].length;
		var emptySize = maxLines - boxSize;

		if (needSize > emptySize) {
			//アクションを格納するサイズだけ、箱が空いていない
			//ここは needSize >= 2 の場合にしか来ない。
			//無条件で箱追加
			if ("" != config["macroContinueLog"]) {
				macroList[listIndex].push(config["macroContinueLog"]);
			}
			listIndex++;
			macroList.push([]);

			//集中加工の追加
			if (isAddPrecise) {
				var tmpAction = getActionFromEffectId(23);
				if (null != tmpAction) {
					macroList[listIndex].push(createMacroLine(tmpAction.id, true));
				}
			}
			macroList[listIndex].push(createMacroLine(actionId));

		} else if (1 == emptySize) {
			//残りが1行
			if (isLast) {
				//アクションも最後ならそのまま入れる。終了ログは省略する
				isAddCompleteLog = false;
				macroList[listIndex].push(createMacroLine(actionId));

			} else if ("" == config["macroContinueLog"]) {
				//処理中アクションが最後ではなく、継続ログが定義されていない場合、今の箱に入れる
				macroList[listIndex].push(createMacroLine(actionId));

				//今の箱はいっぱいなので、新しい箱を作る
				listIndex++;
				macroList.push([]);

			} else {
				//処理中アクションが最後ではなく、継続ログが定義されている場合、継続ログを入れて次の行へ
				macroList[listIndex].push(config["macroContinueLog"]);
				listIndex++;
				macroList.push([]);
				macroList[listIndex].push(createMacroLine(actionId));
			}

		} else {
			//残りが2行以上で、必要なサイズを持っている場合、現在の箱に入れる

			//集中加工の追加が必要な場合
			if (isAddPrecise) {
				//最後であればそのまま入れる
				//最後でなく、かつ継続ログがある場合は、この追加で箱の空きが0になると、継続ログが入らないので、次箱にする
				if (!isLast && "" != config["macroContinueLog"]) {
					if (emptySize + needSize + 1 > maxLines) {
						macroList[listIndex].push(config["macroContinueLog"]);
						listIndex++;
						macroList.push([]);
					}
				}
				var tmpAction = getActionFromEffectId(23);
				if (null != tmpAction) {
					macroList[listIndex].push(createMacroLine(tmpAction.id, true));
				}
			}
			//対象アクションの追加
			macroList[listIndex].push(createMacroLine(actionId));
		}
	}

	//終了ログ
	//終了ログが定義されている場合は、終了ログを入れる
	if (isAddCompleteLog && "" != config["macroCompleteLog"]) {
		if (macroList[listIndex].length < maxLines) {
			macroList[listIndex].push(config["macroCompleteLog"]);
		}
	}

	//最終行ウェイトなし
	if (config["macroLastNoWait"]) {
		for (var i in macroList) {
			for (var j = macroList[i].length - 1;j >= 0;j--) {
				if (-1 != macroList[i][j].indexOf(" <wait")) {
					macroList[i][j] = macroList[i][j].replace(/ <wait..>/, "");
					break;
				}
			}
		}
	}

	//アディショナルマクロを追加
	//アディショナル判定
	var additionalList = [];
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(jobName);
	for (var i in actionIdList) {
		var action = crafterActionData[actionIdList[i]];
		if (Number(action.job) == jobIndex || Number(action.job) == 99) {
			continue;
		}
		if (-1 == additionalList.indexOf(action.id)) {
			additionalList.push(action.id);
		}
	}
	var additionalHTML = "";
	if (0 != additionalList.length) {
		var macroHTML = "";
		macroHTML += "/aaction clear<br>";
		for (var i in additionalList) {
			var action = crafterActionData[additionalList[i]];
			var quote = ("jp" == lang ? "": "\"");
			macroHTML += sprintf("/aaction {1}{0}{1}<br>", [action[lang], quote]);
		}
		additionalHTML += sprintf(
			"<div class=\"macro_panel\" id=\"macro_99\">" +
			"<div class=\"macro_header\"><span class=\"title\">Additional Action</span><img src=\"/crafter/image/sys/action_copy.png\" class=\"copy\"></div>" + 
			"<div class=\"macro_body\" onclick=\"selectAllContents(this)\">{0}</div>" + 
			"</div></div>", [
			macroHTML
		]);
	}

	//HTML構築
	var html = "";
	html += additionalHTML;
	for (var i in macroList) {
		var macroHTML = "";
		for (var j in macroList[i]) {
			macroHTML += escapeHTML(macroList[i][j]) + "<br>";
		}
		html += sprintf(
			"<div class=\"macro_panel\" id=\"macro_{0}\">" +
			"<div class=\"macro_header\"><span class=\"title\">MACRO #{1}</span><img src=\"/crafter/image/sys/action_copy.png\" class=\"copy\"></div>" + 
			"<div class=\"macro_body\" onclick=\"selectAllContents(this)\">{2}</div>" + 
			"</div></div>", [
			i, 
			(Number(i) + 1),
			macroHTML
		]);
	}
	$("#panel_main_macro").html(html);

	//コピー時ハンドル登録
	$("body").off("copy");
	$("body").on("copy", ".macro_header .copy", function(e) {
		//コピー実行
		var contents = $(this).parent().next().html();
		contents = contents.replace(/<br>/g, "\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
		e.clipboardData.clearData();
		e.clipboardData.setData("text/plain", contents);
		e.preventDefault();

		//表示タイマーの無効化
		if (null != clipboardViewTimerId) {
			clearTimeout(clipboardViewTimerId);
			clipboardViewTimerId = null;
		}
		//コピー表示
		var panel = $(this).parent().parent();
		$(".macro_copied").css({
			top: (panel.offset().top + 30) + "px",
			left: (panel.offset().left + 15) + "px",
			opacity: "1"
		});
		$(".macro_copied").show();

		//2秒後にフェードアウト
		clipboardViewTimerId = setTimeout(function() {
			$(".macro_copied").stop().animate({opacity: "0"}, 1000);
		}, 2000);
	});
}


//アクションマクロ作成
function createMacroLine(actionId, _isNoWait) {
	var isNoWait = (_isNoWait === undefined ? false : _isNoWait);

	var ret = "";
	var action = crafterActionData[actionId];
	var quote = ("jp" == lang ? "": "\"");
	ret = sprintf("/ac {1}{0}{1}", [action[lang], quote]);
	if (!isNoWait) {
		ret += sprintf(" <wait.{0}>", [action.macroWait]);
	}
	return ret;
}

//*****************************************************************
//その他タブ
//*****************************************************************
//サブタブ処理
function onClickEtcSubTab() {
	var id = $(this).attr("id");
	var tabName = id.substr("ml_etc_subtab_".length);

	//タブのアクティブ化
	$("#etc_subtab span").removeClass("active");
	$(this).addClass("active");

	//パネルのアクティブ化
	$(".menu_panel_etc_sub").hide();
	$(".menu_panel_etc_sub_" + tabName).show();

	checkScroll();
}

//テキストメモを含むかどうかのチェック変更
function onClickCreateURLIncludeNode() {
	config["isIncludeMemoOnCreateURL"] = $("#is_include_memo_url").prop("checked");
	saveConfig();

	if (config["isIncludeMemoOnCreateURL"]) {
		$("#ml_include_memo_warn").show();
	} else {
		$("#ml_include_memo_warn").hide();
	}
}

//URL生成
function onClickCreateURL() {

	//データ生成
	var favInfo = createFavoriteInfo();
	if (0 == favInfo.actionList.length) {
		return;
	}

	//そのままJSONにするとURLが長すぎるので、データ圧縮を行う
	///いらない要素は削除
	delete favInfo.id;
	delete favInfo.title;

	//ジョブ：ジョブ名のみにする
	favInfo.job.name = favInfo.job.job.title;
	delete favInfo.job.job;

	//食事：IDおよびHQ情報のみにする
	var tmpMeal = {id: null, isHQ: null};
	if (null != favInfo.meal.meal) {
		tmpMeal.id = favInfo.meal.meal.id;
		tmpMeal.isHQ = favInfo.meal.meal.is_hq;
	}
	favInfo.meal = tmpMeal;

	//レシピ：レシピIDのみにする。手動用パラメタはそのまま。
	var tmpRecipe = {recipeId: null};
	if (emptyRecipe.id != favInfo.recipe.recipe.id) {
		tmpRecipe.recipeId = favInfo.recipe.recipe.recipe.rid;
	}
	favInfo.recipe.recipe = tmpRecipe;

	//アクションリスト：TSVにする
	var tmpActionList = "";

	for (var i in favInfo.actionList) {
		if (!config["isIncludeMemoOnCreateURL"] && 193 == favInfo.actionList[i].id) {
			continue;
		}
		if ("" != tmpActionList) {
			tmpActionList += "|";
		}
		tmpActionList += 
			favInfo.actionList[i].id + "," + 
			favInfo.actionList[i].craftStatus + "," + 
			(favInfo.actionList[i].isSuccess ? "t" : "f");

		if (193 == favInfo.actionList[i].id && null != favInfo.actionList[i].memo) {
			var tmpText = favInfo.actionList[i].memo;
			tmpText = tmpText.replace(/\|/g, "｜");
			tmpText = tmpText.replace(/,/g, "，");
			tmpActionList += "," + tmpText;
		}
	}
	favInfo.actionList = tmpActionList;

	//文字列化
	//100アクションで1250byte
	var jsonText = JSON.stringify(favInfo);
	var b64Text = Base64.encodeURI(jsonText);

	//生成中表示
	$(".menu_panel_etc_sub_etc .url_area .url").html("...");
	$("body").css("cursor", "wait");

	//URL生成
	shareURLInfo = "";
	addHeaders = {};
	//この手はローカルでしか使えない？
	// location.origin = "http://" + location.host;
	addHeaders["X-Origin"] = "http://" + location.host;

	$.ajax({
		url: URL_SHORTER,
		type: "POST",
		data: {data: b64Text},
		dataType : "json",
		headers: addHeaders,
		success: function(json, dataType) {
			console.log("createShareURL:success");
			shareURLInfo = json;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("createShareURL:error");
		    console.log("エラー：" + textStatus + "/" + jqXHR.responseText);
			shareURLInfo = "";
		},
		complete: function(jqXHR, textStatus) {
			console.log("createShareURL:complete");
			console.log(shareURLInfo);
			$("body").css("cursor", "auto");

			if ("" == shareURLInfo || false == shareURLInfo["result"]) {
				$(".menu_panel_etc_sub_etc .url_area .url").html(ml_create_url_failure);
				setShareLinksDisabled();
			} else {
				$(".menu_panel_etc_sub_etc .url_area .url").html(shareURLInfo["url"]);
				setShareLinks();
			}
		}
	});
}
//共有処理
function setShareLinks() {

	var html = "";

	//twitter
	html = sprintf("<a href=\"javascript:void(0)\" onclick=\"shareTwitter('{0}')\"><img src=\"{1}\" class=\"share_image\"></a>", [
		shareURLInfo["url"],
		"/crafter/image/sys/share_tw_active.png"
	]);
	$("#share_tw").html(html);

	//facebook
	html = sprintf("<a href=\"javascript:void(0)\" onclick=\"shareFacebook('{0}')\"><img src=\"{1}\" class=\"share_image\"></a>", [
		shareURLInfo["url"],
		"/crafter/image/sys/share_fb_active.png"
	]);
	$("#share_fb").html(html);

	//g+
	gapi.plusone.render("share_gp", {
		"href": shareURLInfo["url"],
		"size": "medium",
		"annotation": "none",
		"recomemendations": "false",
		"action": "share"
	});

	$(".social_link span").show();
}
function shareGooglePlus(shareUrl) {
}
function shareFacebook(shareUrl) {
	var url = sprintf("http://www.facebook.com/share.php?u={0}&t={1}",
		[ encodeURIComponent(shareUrl), encodeURIComponent(ml_title)] );
	window.open(url);
}

function shareTwitter(shareUrl) {
	var url = sprintf("http://twitter.com/share?url={0}&text={1}", [
		encodeURIComponent(shareUrl),
		encodeURIComponent(ml_title)
	]);
	window.open(url, null, "width=550,height=420,left=" + (Math.round(screen.width/2-550/2)) + ",top=" + (Math.round(screen.height/2-420/2)));
}
function setShareLinksDisabled() {
	//ボタン無効化
	$(".social_link span").hide();
}

//テキスト化
function onClickStringify() {
	var text = "";
	var preActionName = "";
	var actionCount = 1;

	var actionIdList = [];
	$("#senario_panel .senario_action").each(function() {
		var tmpId = $(this).attr("x-action-id");
		//テキストメモは無視する（フィニッシュワークは入れる）
		if (tmpId != 193) {
			actionIdList.push(tmpId);
		}
	});

	for (var i in actionIdList) {
		var actionId = actionIdList[i];
		var action = crafterActionData[actionId];
		var actionName = ("jp" == lang ? action["jpAbbr"] : action[lang]);

		if (actionName != preActionName) {
			//今回のアクションが前回と異なる場合
			//前回のアクションをテキストに追加する
			if ("" != text) {
				text += "→";
			}
			text += preActionName;
			if (1 != actionCount) {
				text += "x" + actionCount;
			}
			actionCount = 1;
		} else {
			//今回のアクションが前回と同じ場合
			//カウントアップのみ行う
			actionCount++;
		}
		preActionName = actionName;
	}
	//最後のアクションを追加する
	if ("" != text) {
		text += "→";
	}
	text += preActionName;
	if (1 != actionCount) {
		text += "x" + actionCount;
	}

	//HTML
	$("#menu_panel_etc_etc .stringify_area").text(text);
	$("#menu_panel_etc_etc .stringify_area").show();

}

//***** オプション ************************
//オプション変更
function onChangeOptionScroll() {

	//値保存
	config["isShowAdditional"] = $("#opt_show_additional").prop("checked");
	config["isFollowScrollActionPanel"] = $("#opt_scroll_action").prop("checked");
	config["isFollowScrollResultPanel"] = $("#opt_scroll_result").prop("checked");
	saveConfig();

	//設定適用
	if (config["isShowAdditional"]) {
		$("#additional_panel").show();
	} else {
		$("#additional_panel").hide();
	}
	checkScroll();
	checkSenarioEmpty();
}


//*****************************************************************
//その他タブ：ゲーム接続
//*****************************************************************
//接続／切断ボタン
function onClickGameLink() {
	if (isGameLinkActive) {
		deactivateGameLink();
	} else {
		activateGameLink();
	}
}
//接続タイマー開始
function activateGameLink() {

	var port = $("#gamelink_port").val();
	if (!port.match(/^[0-9]+$/)) {
		alert("ポート番号は数値で指定してください。");
		return;
	}
	if (port < 49152 || port > 65535) {
		alert("ポート番号は 49152 ～ 65535 の間で指定してください。");
		return;
	}
	config["gameLinkPort"] = port;
	saveConfig();

	//接続開始
	isGameLinkActive = true;
	isGameLinkFirstConnect = true;
	gameLinkTimerId = setTimeout("linkGame()", 1000);
	$(".linkstatus_area .status").text(ml_gamelink_status_active);
	$(".linkstatus_area .status").css("color", "#aaaaff");
	$(".linkstatus_area .button").text(ml_gamelink_button_todeactive);
}

//接続タイマー停止
function deactivateGameLink() {
	if (null != gameLinkTimerId) {
		clearTimeout(gameLinkTimerId);
		gameLinkTimerId = null;
	}
	$(".linkstatus_area .status").text(ml_gamelink_status_deactive);
	$(".linkstatus_area .status").css("color", "#ffaaaa");
	$(".linkstatus_area .button").text(ml_gamelink_button_toactive);
	isGameLinkActive = false;

}

//接続
function linkGame() {

	//リクエスト発行
	var url = 
		isGameLinkFirstConnect ? sprintf(URL_GAMELINK_INIT, [config["gameLinkPort"]]) 
							   : sprintf(URL_GAMELINK_GET,  [config["gameLinkPort"]]);
	isGameLinkFirstConnect = false;
	$.ajax({
		url: url,
		type: "GET",
		dataType : "json",
		timeout: 2000 * 100,
		success: function(json, dataType) {
			receiveGameLinkData(json);
			//次回接続用タイマーの起動
			clearTimeout(gameLinkTimerId);
			gameLinkTimerId = setTimeout("linkGame()", 1000);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			//タイマーリセット
			deactivateGameLink();
		},
	});
}

//ゲームリンクデータ受領
function receiveGameLinkData(json) {

	if (0 != json.length) {
		console.log(json);
	}

	for (var i in json) {

		var data = json[i];
		if (1 == data.dataType) {
			//ジョブ・ステータス情報
			updateJobStatusGameLink(data);

		} else if (2 == data.dataType) {
			//制作開始／ジョブ・ステータス情報
			updateRecipeGameLink(data);

		} else if (3 == data.dataType) {
			//アクション発動
			actionGameLink(data);

		} else if (4 == data.dataType) {
			//レシピ制作完了
			//何もしない
		}

	}
}


//ゲームリンク：制作開始
function updateRecipeGameLink(data) {
	//選択中のジョブと data.item からレシピを決定する
	var itemId = null;
	var recipe = null;

	//アイテムIDを取得
	for (var tmpItemId in itemData.data) {
		if (data.item == itemData.data[tmpItemId].name) {
			itemId = tmpItemId;
			break;
		}
	}
	if (null != itemId && null != recipeData.data[itemId]) {
		//レシピIDを検索
		var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
		for (var i in recipeData.data[itemId]) {
			if (jobName == recipeData.data[itemId][i]["category"]) {
				recipe = recipeData.data[itemId][i];
				break;
			}
		}
	}
	if (null == recipe) {
		$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(emptyRecipe);
	} else {
		var item = itemData.data[itemId];
		var lvMark = "[Lv" + recipe["lv"] + recipe["mark"] + "] ";
		var selectRecipe = {
			"image": createImageURL(item.img),
			"title": lvMark + item.name,
			"desc" : "",
			"recipe": recipe,
			"item": item
		};
		$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(selectRecipe);
	}
}

//ゲームリンク：アクション発動
function actionGameLink(data) {

	//まずはわかりやすい形に変換する
	var linkAction = {};
	linkAction.actionId = getActionIdByName(data["action"]);
	if (-1 == linkAction.actionId) {
		return;
	}
	linkAction.addBuff = [];
	if ("" != data["addBuff"]) {
		var tmp = data["addBuff"].split(",");
		for (var i = 0;i < tmp.length;i++) {
			var tmpId = getActionIdByName(tmp[i]);
			if (-1 != tmpId) {
				linkAction.addBuff.push(tmpId);
			}
		}
	}
	linkAction.removeBuff = [];
	if ("" != data["removeBuff"]) {
		var tmp = data["removeBuff"].split(",");
		for (var i = 0;i < tmp.length;i++) {
			var tmpId = getActionIdByName(tmp[i]);
			if (-1 != tmpId) {
				linkAction.removeBuff.push(tmpId);
			}
		}
	}
	linkAction.dur = Number(data["dur"]);
	linkAction.proc = Number(data["proc"]);
	linkAction.quality = Number(data["quality"]);
	linkAction.isSuccess = ("success" == data["result"]);

	console.log(linkAction);

	//現時点では以下のみ採用する
	//発動アクション
	//成否
	var newItem = createSenarioAction(linkAction.actionId);

	//まずは一度追加する
	$("#senario_panel").append(newItem);

	//ID取得
	var id = $(newItem).attr("id");

	//成否適用
	$("span:eq(1)", $(".success", $("#" + id)).parent()).removeClass("action_result_active");
	$("span:eq(2)", $(".success", $("#" + id)).parent()).removeClass("action_result_deactive");
	if (linkAction.isSuccess) {
		$("span:eq(0)", $(".success", $("#" + id)).parent()).removeClass("failure");
		$("span:eq(1)", $(".success", $("#" + id)).parent()).addClass("action_result_active");
		$("span:eq(2)", $(".success", $("#" + id)).parent()).addClass("action_result_deactive");
	} else {
		$("span:eq(0)", $(".success", $("#" + id)).parent()).addClass("failure");
		$("span:eq(1)", $(".success", $("#" + id)).parent()).addClass("action_result_deactive");
		$("span:eq(2)", $(".success", $("#" + id)).parent()).addClass("action_result_active");
	}
	updateSenario();

	//取り直してからスクロール
	newItem = $("#" + id);
	showTargetSenarioAction(newItem);


}
function getActionIdByName(actionName) {
	var ret = -1;
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(jobName);

	for (var i in crafterActionData) {
		var action = crafterActionData[i];
		if (action[lang] == actionName) {
			if (99 == action.job || 
				jobIndex == action.job ||
				"1" == action.isAdd) {
				ret = action.id;
				break;
			}
		}
	}

	return ret;
}

//ゲームリンク：ジョブ・ステータス情報
function updateJobStatusGameLink(data) {
	//NOTE 未対応
	isForceStopUpdateSenario = true;

	//ジョブ
	var jobIndex = getJobIndex(data["jobName"]);
	if (-1 != jobIndex) {
		$("#jqms_jobs").data("plugin_menuSelector").forceSelectItem({
			"title": jobList[jobIndex].name,
			"image": jobList[jobIndex].image,
			"desc": ""
		});
	}

	//パラメタ
	$("#cd_lv").spinner("value",   Number(data["jobLv"]));
	$("#cd_cs").spinner("value",   Number(data["craftmanship"]));
	$("#cd_ctrl").spinner("value", Number(data["control"]));
	$("#cd_cp").spinner("value",   Number(data["cp"]));

	//食事 - 空固定（すでに適用されている）
	$("#jqms_meals").data("plugin_menuSelector").forceSelectItem(emptyMeal);

	isForceStopUpdateSenario = false;

	resetSenario();
}


//*****************************************************************
//スクロール処理
//*****************************************************************
//初期化
function initScrollCheck() {
	//初期位置保持
	helperBaseOffset = $("#helper_panel").offset();
	mainBaseOffset = $("#main_panel").offset();
	senarioTopBaseOffset = $("#senario_top_panel").offset();

	//絶対座標の再設定
	$("#helper_panel").css({
		"position": "absolute",
		"top": helperBaseOffset.top,
		"left": helperBaseOffset.left
	});
	$("#main_panel").css({
		"position": "absolute",
		"top": mainBaseOffset.top,
		"left": mainBaseOffset.left
	});
	$("#senario_top_panel").css({
		"position": "absolute",
		"top": senarioTopBaseOffset.top - mainBaseOffset.top,
		"left": senarioTopBaseOffset.left - mainBaseOffset.left
	});
	$("#lower_panel").css({
		"position": "absolute"
	});

	//イベント設定
	$(window).on("scroll", checkScroll);
	$(window).on("resize", checkScroll);

	isInitScrollCheck = true;

	//一度調整のために強制実行
	checkScroll();
}

//スクロール処理
function checkScroll() {
	if (!isInitScrollCheck) {
		return;
	}

	//左右位置調整
	var recipeRect = getRect("#recipe_panel_base");
	$("#helper_panel").css("left", recipeRect.left + "px");
	$("#main_panel").css("left", (getRect("#helper_panel").right + 12) + "px");

	//シナリオパネル位置調整
	if ($("#additional_panel").is(":visible")) {
		$("#senario_panel").css("marginTop", "185px");
	} else {
		$("#senario_panel").css("marginTop", "100px");
	}

	//上下位置調整
	//現在のスクロール位置
	var scrollTop = $(window).scrollTop();
	var helperPanelRect = getRect("#helper_panel");
	var mainPanelRect = getRect("#main_panel");

	if (!config["isFollowScrollActionPanel"]) {
		$("#helper_panel").css("top", helperBaseOffset.top + "px");
	} else {
		if (helperPanelRect.height >= mainPanelRect.height) {
			//ヘルパーパネルの方が大きい
			//→常に初期位置
			$("#helper_panel").css("top", helperBaseOffset.top + "px");

		} else {
			//ヘルパーパネルの方が大きい
			if (helperBaseOffset.top > scrollTop) {
				//初期位置よりスクロール位置が上な
				//→初期位置に移動
				$("#helper_panel").css("top", helperBaseOffset.top + "px");

			} else {
				//初期位置よりスクロール位置が下
				//→スクロール位置＝ヘルパー上部
				var tmpTop = scrollTop;

				//移動することで、ヘルパー下部がメイン下部を超える場合は、メイン下部に合わせる
				if (tmpTop + helperPanelRect.height > mainPanelRect.bottom + 12) {
					tmpTop = mainPanelRect.bottom - helperPanelRect.height + 12;
				}
				$("#helper_panel").css("top", tmpTop + "px");
			}
		}
	}

	//フッタ要素移動
	var mainPanelBottom = $("#main_panel").offset().top + $("#main_panel").height();
	var helperPanelBottom = $("#helper_panel").offset().top + $("#helper_panel").height();
	var baseBottom = (mainPanelBottom > helperPanelBottom ? mainPanelBottom : helperPanelBottom);
	$("#lower_panel").css({
		top: (baseBottom + 16) + "px",
		width: recipeRect.width + "px"
	});

	//背景カラー位置調整
	$(".base").css("height", ($("#lower_panel").offset().top + $("#lower_panel").height()) + "px");

	//シナリオトップパネルの移動
	if (!config["isFollowScrollResultPanel"]) {
		$("#senario_top_panel").css({
			"top": (senarioTopBaseOffset.top - mainBaseOffset.top ) + "px"
		});
	} else {
		var senarioTopPanelRect = getRect("#senario_top_panel");
		if (scrollTop < senarioTopBaseOffset.top) {
			//位置変更不要
			$("#senario_top_panel").css({
				"top": (senarioTopBaseOffset.top - mainBaseOffset.top) + "px"
			});
		} else {
			//パネル上部に常に表示するように移動
			var scrollValue = scrollTop - senarioTopBaseOffset.top;
			var newTop = senarioTopBaseOffset.top - mainBaseOffset.top + scrollValue - 1;
			var newBottom = Number($("#main_panel").offset().top) + Number(newTop) + $("#senario_top_panel").outerHeight();
			if (newBottom < mainPanelBottom) {
				//メインパネルを超えない
				$("#senario_top_panel").css({
					"top": (senarioTopBaseOffset.top - mainBaseOffset.top + scrollValue - 2) + "px"
				});
			} else {
				//メインパネルを超える
				var absTop = mainPanelBottom - $("#senario_top_panel").outerHeight();
				$("#senario_top_panel").css({
					"top": (absTop - mainBaseOffset.top) + "px"
				});
			}
		}
	}
}

//*****************************************************************
//クエリ文字列からのロード
//*****************************************************************
function loadQueryString() {
	var qs = location.search;
	if ("" == qs) {
		return;
	}

	var params = analyzeParam(qs);
	if (null == params["d"]) {
		return;
	}

	//オブジェクト化
	var jsonText = Base64.decode(params["d"]);
	var favInfo = JSON.parse(jsonText);

	//データ圧縮されたものを復旧
	//ジョブ
	var jobIndex = getJobIndex(favInfo.job.name);
	if (-1 == jobIndex) {
		console.log("ジョブ名：インデックス変換不可");
		return;
	}
	favInfo.job.job = {
		desc: "",
		image: jobList[jobIndex].image,
		title: jobList[jobIndex].name
	};
	delete favInfo.job.name;

	//食事
	var mealInfo = searchMeal(favInfo.meal.id, favInfo.meal.isHQ);
	if (null == mealInfo) {
		//未選択
		favInfo.meal = emptyMeal;
	} else {
		//選択済
		var desc = "";
		for (var key in mealInfo["params"]) {
			if ("" != desc) {
				desc += "/ ";
			}
			desc += key + " " + mealInfo["params"][key]["add_value"];
			if (null != mealInfo["params"][key]["add_limit"]) {
				desc += sprintf(ml_meal_limit, [mealInfo["params"][key]["add_limit"]]);
			}
		}
		favInfo.meal = {
			"image": createImageURL(mealInfo.image),
			"title": mealInfo.name,
			"desc": desc,
			"meal": mealInfo,
			"sort": Number(mealInfo["sort_sum"])
		};
	}

	//レシピ
	var recipeInfo = null;
	var itemInfo = null;
	if (favInfo.recipe.recipe.recipeId != emptyRecipe.id) {
		for (var itemId in recipeData.data) {
			for (var i in recipeData.data[itemId]) {
				var recipe = recipeData.data[itemId][i];
				if (recipe.rid == favInfo.recipe.recipe.recipeId) {
					itemInfo = itemData.data[itemId];
					recipeInfo = recipe;
					break;
				}
			}
			if (null != recipeInfo) {
				break;
			}
		}
	}
	if (null == recipeInfo) {
		favInfo.recipe.recipe = emptyRecipe;
	} else {
		var lvMark = "[Lv" + recipeInfo["lv"] + recipeInfo["mark"] + "] ";
		favInfo.recipe.recipe = {
			"image": createImageURL(itemInfo.img),
			"title": lvMark + itemInfo.name,
			"desc" : "",
			"recipe": recipeInfo,
			"item": itemInfo
		};
	}

	//アクションリスト
	var tmpActionList = favInfo.actionList.split("|");
	favInfo.actionList = [];
	for (var i in tmpActionList) {
		var tmp = tmpActionList[i].split(",", 4);
		var actionInfo = {
			id: tmp[0],
			craftStatus: tmp[1],
			isSuccess: ("t" == tmp[2])
		};
		if (tmp.length >= 4) {
			actionInfo.memo = tmp[3];
		}
		favInfo.actionList.push(actionInfo);
	}

	//圧縮復旧が終わったのでデータ適用
	showFavoriteDetailHelper(favInfo);
}

//食事検索（ID・HQより）
function searchMeal(id, isHQ) {
	var mealInfo = null;
	for (var i in mealsList) {
		if (mealsList[i].id == id && mealsList[i].is_hq == isHQ) {
			mealInfo = mealsList[i];
			break;
		}
	}
	return mealInfo;
}

//*****************************************************************
//初期化
//*****************************************************************
//初期化
function init() {
	//コンフィグ読み込み
	loadConfig();

	//データ読み込み
	//⇒init2へ
	loadData();


}
//初期化
function init2() {
	//コントロール初期化
	initControls();

	//デフォルト適用
	applyDefaultData();

	//クエリ文字列からのロード
	loadQueryString();

	//スクロール検知初期化
	initScrollCheck();

	//空チェック（実施されない場合に備えて念のため）
	checkSenarioEmpty();
	checkFavoriteEmpty();

//debugMethod0();
}
function debugMethod0() {
//調理師
//Lv60, 作業753, 加工728, CP402, 飯無し
$("#jqms_jobs").data("plugin_menuSelector").forceSelectItem({"title": "調理師", "image": "", "desc": ""});
$("#cd_lv").spinner("value", 60);
$("#cd_cs").spinner("value", 753);
$("#cd_ctrl").spinner("value", 728);
$("#cd_cp").spinner("value", 402);
$("#jqms_meals").data("plugin_menuSelector").forceSelectItem(emptyMeal);

//レシピ群
items = ["メープルシロップ", "アップルジュース", "ダガースープ", "ポポトパンケーキ", "サワークリーム", "グリルドスイートフィッシュ", "カイザーゼンメル", "オーケアニスシュニッツェル", "バースデーケーキ" ];
view = [];
for (var i in items) {
	var itemName = items[i];
	//アイテムIDを取得
	for (var tmpItemId in itemData.data) {
		if (itemName == itemData.data[tmpItemId].name) {
			itemId = tmpItemId;
			break;
		}
	}
	//レシピIDを検索
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	for (var i in recipeData.data[itemId]) {
		if (jobName == recipeData.data[itemId][i]["category"]) {
			recipe = recipeData.data[itemId][i];
			break;
		}
	}
	var item = itemData.data[itemId];
	var lvMark = "[Lv" + recipe["lv"] + recipe["mark"] + "] ";
	var selectRecipe = {
		"image": createImageURL(item.img),
		"title": lvMark + item.name,
		"desc" : "",
		"recipe": recipe,
		"item": item
	};
	$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(selectRecipe);

	var tv = [lvMark + ": " + itemName];

	var actions = [
		[48] , [ 154, 48 ], [158, 48]
	];
	for (var j in actions) {
		resetSenario();
		for (var k in actions[j]) {
			forceAddSenario(actions[j][k], null, false);
		}
		updateSenario();
		//console.log("pattern " + j + " => " + senarioInfo.status.proc);

		//クラフターレベル
		var crafterLv = senarioInfo.param.lv;
		if (null != lvTableCrafter[crafterLv]) {
			crafterLv = lvTableCrafter[crafterLv];
		}
		//レシピレベル
		var recipeLv = 0;
		if (null != senarioInfo.rawRecipe.recipe) {
			recipeLv = lvTableRecipe[senarioInfo.rawRecipe.recipe.lv + senarioInfo.rawRecipe.recipe.mark];
		} else {
			recipeLv = senarioInfo.recipe.lv;
		}
		//レベル係数
		var lvDiff = calcLvDiff(crafterLv, recipeLv);

		tv.push(senarioInfo.status.proc + "[" + lvDiff + "]");
	}
	view.push(tv);
}
console.table(view);
}

//デフォルトデータ適用
function applyDefaultData() {

	isForceStopUpdateSenario = true;

	//退避設定
	var tmpActionSenarioList = config["actionSenario"];
	//ジョブ	
	var jqmsJobs = $("#jqms_jobs").data("plugin_menuSelector");
	var tmpName = jqmsJobs.settings.base.selectedItem.title;
	for (var i = jobList.length - 1;i >= 0;i--) {
		if (jobList[i].name == config["selectedJobName"] || 0 == i) {
			jqmsJobs.forceSelectItem({
				"title": jobList[i].name,
				"image": jobList[i].image,
				"desc": ""
			});

			break;
		}
	}

	//アクションパネルステータス
	for (var panelId in config["actionPanelStatus"]) {
		if (config["actionPanelStatus"][panelId]) {
			$("#" + panelId).show();
		} else {
			$("#" + panelId).hide();
		}
	}
	//アクションサイズ適用
	setActionViewMode(config["actionViewMode"]);

	//食事
	$("#jqms_meals").data("plugin_menuSelector").forceSelectItem(config["selectedMeal"]);

	//レシピ選択
	$("#jqms_recipe").data("plugin_menuSelector").forceSelectItem(config["selectedRecipe"]);

	//手動入力の場合、Lv／耐久／必要工数／品質の復旧
	if (emptyRecipe.id == config["selectedRecipe"].id) {
		$("#rcp_lv").val(config["recipeManualParam"]["lv"]);
		$("#rcp_lv").selectmenu("refresh");
		$("#rcp_dur").spinner("value", config["recipeManualParam"]["dur"]);
		$("#rcp_proc").spinner("value", config["recipeManualParam"]["proc"]);
		$("#rcp_q").spinner("value", config["recipeManualParam"]["quality"]);
	}
	//初期品質
	$("#rcp_q_start").spinner("value", config["recipeInitialQuality"]);

	isForceStopUpdateSenario = false;

	//シナリオ復旧
	loadSenario(tmpActionSenarioList);

	//マクロ設定
	$("#macro_lines").val(config["macroLines"]);
	$("#macro_lines").selectmenu("refresh");
	$("#macro_continue_log").val(config["macroContinueLog"]);
	$("#macro_complete_log").val(config["macroCompleteLog"]);
	$("#macro_precise").prop("checked", config["macroPrecise"]);
	$("#macro_precise").attr("checked", config["macroPrecise"]);
	$("#macro_last_nowait").prop("checked", config["macroLastNoWait"]);
	$("#macro_last_nowait").attr("checked", config["macroLastNoWait"]);

	//ゲーム接続ポート番号設定
	$("#gamelink_port").val(config["gameLinkPort"]);
}

//シナリオ復旧
function loadSenario(actionSenarioList) {
	//シナリオリセット
	resetSenario(false);
	initSenario();

	for (var i in actionSenarioList) {
		var action = actionSenarioList[i];
		var newItem = createSenarioAction(action.id);

		//まずは一度追加する
		$("#senario_panel").append(newItem);

		//ID取得
		var id = $(newItem).attr("id");

		//品質適用
		if (0 != $("#" + id).find("[x-quality]").length) {
			$("#" + id).find("[x-quality]").attr("x-quality", action.craftStatus);
			$("#" + id).find("[x-quality]").attr("x-tooltip", craftStatusList[action.craftStatus].title);
			$("#" + id).find("[x-quality]").attr("src", craftStatusList[action.craftStatus].image);
		}

		//成否適用
		$("span:eq(1)", $(".success", $("#" + id)).parent()).removeClass("action_result_active");
		$("span:eq(2)", $(".success", $("#" + id)).parent()).removeClass("action_result_deactive");
		if (action.isSuccess) {
			$("span:eq(0)", $(".success", $("#" + id)).parent()).removeClass("failure");
			$("span:eq(1)", $(".success", $("#" + id)).parent()).addClass("action_result_active");
			$("span:eq(2)", $(".success", $("#" + id)).parent()).addClass("action_result_deactive");
		} else {
			$("span:eq(0)", $(".success", $("#" + id)).parent()).addClass("failure");
			$("span:eq(1)", $(".success", $("#" + id)).parent()).addClass("action_result_deactive");
			$("span:eq(2)", $(".success", $("#" + id)).parent()).addClass("action_result_active");
		}

		//メモ適用
		if (null != action.memo) {
			$("textarea", "#" + id).val(action.memo);
		}
	}
	updateSenario();

	updateMacro();

}

//コントロール初期化
function initControls() {
	//--------------------------------------------------
	//パラメタ
	//--------------------------------------------------
	//ジョブ
	$("#jqms_jobs").menuSelector({
		base: {
			width: "120px",
			drawSelectedItem: null,
			selectedItem: {"image": "/crafter/image/sys/job_cpt.png", "title": ml_job_cpt, "desc": ""}
		},
		selector: {
			height: "200px",
			selectorPosition: "left, bottom",
			textFilter: false,
			onChangeItem: function(ms, value, isUpdated) {
				onUpdateJob(value, isUpdated);
			}
		},
		menus: [],
		items: {
			width: "120px",
			itemWidth: "120px",
			itemList: function(ms) {
				var ret = [];
				for (var i in jobList) {
					ret.push({
						"image": jobList[i].image,
						"title": jobList[i].name,
						"desc": "",
					});
				}
				return ret;
			},
			drawItem: function(ms, itemIndex, item) {
				return sprintf(
					"<div class=\"item\" style=\"width:{0}px;display:table\" x-item-index=\"{1}\">" + 
					"<img src=\"{2}\" style=\"width:24px;height:24px;display:table-cell;vertical-align:middle\">" + 
					"<span class=\"item_title\" style=\"display:table-cell;vertical-align:middle\">{3}</span>" + 
					"</div>", [
					parseInt(ms.settings.items.width),
					escapeHTML(itemIndex),
					escapeHTML(item["image"]),
					escapeHTML(item["title"]),
				]);
			}
		}
	});

	//レベル
	$("#cd_lv").spinner({
		max: 60,
		min: 1,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});

	//作業精度
	$("#cd_cs").spinner({
		max: 9999,
		min: 0,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});

	//加工精度
	$("#cd_ctrl").spinner({
		max: 9999,
		min: 0,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});

	//CP
	$("#cd_cp").spinner({
		max: 9999,
		min: 0,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});

	//食事
	$("#jqms_meals").menuSelector({
		base: {
			width: "210px",
			drawSelectedItem: null,
			selectedItem: emptyMeal
		},
		selector: {
			height: "400px",
			selectorPosition: "right, bottom",
			textFilter: true,
			text: "",
			textPlaceholder: ml_search_text,
			onChangeText: function(ms, text) {
				//テキスト入力された場合は、種類条件を無視する
				if ("" == text) {
					return;
				}

				//メニュー0を強制更新
				ms.settings.menus[0].selectedMenu = ml_all;
				ms._updateMenuList(0);

				//アイテム一覧も強制更新
				ms._updateItemList();
			},
			onChangeItem: function(ms, value, isUpdated) {
				onUpdateMeal(value, isUpdated);
			}
		},
		menus: [
			{
				width: "120px",
				menuTitle: ml_type,
				menuList: mealTypeList,
				drawMenu: null,
				selectedMenu: mealTypeList[1]
			},
		],
		items: {
			width: "350px",
			itemWidth: "330px",
			itemList: function(ms) {
				var ret = [];
				var type = ms.settings.menus[0].selectedMenu;
				var textFilter = normalize(ms.settings.selector.text);
				if ("" != textFilter) {
					//テキスト
					for (var i in mealsList) {
						var meal = mealsList[i];
						if (null == meal.normalizedName) {
							meal.normalizedName = normalize(meal.name);
						}
						if (-1 != meal.normalizedName.indexOf(textFilter)) {
							var desc = "";
							for (var key in meal["params"]) {
								if ("" != desc) {
									desc += "/ ";
								}
								desc += key + " " + meal["params"][key]["add_value"];
								if (null != meal["params"][key]["add_limit"]) {
									desc += sprintf(ml_meal_limit, [meal["params"][key]["add_limit"]]);
								}
							}
							ret.push({
								"image": createImageURL(meal.image),
								"title": meal.name,
								"desc": desc,
								"meal": meal,
								"sort": Number(meal["sort_sum"])
							});
						}
					}
				} else {
					//種類
					for (var i in mealsList) {
						var meal = mealsList[i];
						var isValidTarget = false;
						var isValidTypeList = false;
						var sortValue = 0;
						for (var key in meal["params"]) {
							if (key == ms.settings.menus[0].selectedMenu) {
								isValidTarget = true;
								sortValue = Number(meal["params"][key]["sort_value"]) * 1000;
								break;
							}
							if (-1 != mealTypeList.indexOf(key)) {
								isValidTypeList = true;
								sortValue = Number(meal["sort_sum"]);
							}
						}
						if (isValidTarget || (ml_all == ms.settings.menus[0].selectedMenu && isValidTypeList)) {
							var desc = "";
							for (var key in meal["params"]) {
								if ("" != desc) {
									desc += " / ";
								}
								desc += key + " " + meal["params"][key]["add_value"];
								if (null != meal["params"][key]["add_limit"]) {
									desc += sprintf(ml_meal_limit, [meal["params"][key]["add_limit"]]);
								}
							}
							ret.push({
								"image": createImageURL(meal.image),
								"title": meal.name,
								"desc": desc,
								"meal": meal,
								"sort": Number(sortValue)
							});
						}
					}
				}
				ret.sort(function(a, b) {
					var ret = b.sort - a.sort;
					if (0 == ret) {
						ret = a.title > b.title ? 1 : -1;
					}
					return ret;
				});
				ret.unshift(emptyMeal);
				return ret;
			},
			drawItem: null,
			imageLazyLoad: true,
		}
	});

	//--------------------------------------------------
	//レシピ
	//--------------------------------------------------
	//レシピ検索用変数初期化
	for (var itemId in recipeData.data) {
		for (var i in recipeData.data[itemId]) {
			var recipe = recipeData.data[itemId][i];

			// by job
			if (null == recipeMap[recipe["category"]]) {
				recipeMap[recipe["category"]] = [];
			}
			// byLv
			var lvRange = "";
			if ("" == recipe["mark"]) {
				//★なしは計算にて範囲判定
				var lvMin = Math.floor((recipe["lv"] - 1) / 5) * 5 + 1;
				var lvMax = lvMin + 4;
				lvRange = lvMin + " - " + lvMax;

			} else if (50 == recipe["lv"]) {
				//50で★付きは「50★ - ★★★★」
				lvRange = "50★ - ★★★★";

			} else if (60 == recipe["lv"]) {
				//60で★付きは「60★ - ★★★★」
				lvRange = "60★ - ★★★★";

			} else {
				console.log("cannot map lv range");
				console.log(recipe);
				continue;
			}

			if (null == recipeMap[recipe["category"]][lvRange]) {
				recipeMap[recipe["category"]][lvRange] = {
					"typeMap": {},
					"itemIdList": []
				};
			}
			recipeMap[recipe["category"]][lvRange]["typeMap"][recipe["type"]] = 1;
			recipeMap[recipe["category"]][lvRange]["itemIdList"].push(itemId);
		}
	}

	//レシピ検索定義
	$("#jqms_recipe").menuSelector({
		base: {
			width: "210px",
			drawSelectedItem: function(ms, item) {
				var title = item["title"].replace(/^\[.*?\] /, "");
				return sprintf(
					"<span class=\"sm_selected_image\" ><img src=\"{0}\" /></span>" +
					"<span class=\"sm_selected_text\">{1}</span>", [
					item["image"],
					title
				]);
			},
			selectedItem: emptyRecipe
		},
		selector: {
			height: "400px",
			selectorPosition: "left, bottom",
			textFilter: true,
			text: "",
			textPlaceholder: ml_search_text,
			onChangeText: function(ms, text) {
				//テキスト入力された場合は、Lv・種類条件を無視する
				if ("" == text) {
					return;
				}

				//メニュー0,1を強制更新
				ms.settings.menus[0].selectedMenu = "";
				ms.settings.menus[1].selectedMenu = "";
				ms._updateMenuList(0);
				ms._updateMenuList(1);

				//アイテム一覧も強制更新
				ms._updateItemList();
			},
			onChangeItem: function(ms, value, isUpdated) {
				onUpdateRecipe(value, isUpdated);
			}
		},
		menus: [
			{
				width: "120px",
				menuTitle: "Lv",
				menuList: lvList,
				drawMenu: null,
				selectedMenu: "1 - 5"
			},
			{
				width: "150px",
				menuTitle: ml_type,
				menuList: function(ms) {
					var lvRange = ms.settings.menus[0].selectedMenu;
					var category = translateJobName($("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title);
					var ret = Object.keys(recipeMap[category][lvRange]["typeMap"]);
					ret.sort();
					ret.unshift(ml_all);
					return ret;
				},
				drawMenu: null,
				selectedMenu: ml_all
			}
		],
		items: {
			width: "350px",
			itemWidth: "330px",
			itemList: function(ms) {
				var ret = [];
				var lvRange = ms.settings.menus[0].selectedMenu;
				var type = ms.settings.menus[1].selectedMenu;
				var textFilter = normalize(ms.settings.selector.text);
				var category = translateJobName($("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title);

				if ("" != textFilter) {
					//テキスト検索
					if (textFilter.length >= 2) {
						var resultList = {};
						for (var itemId in recipeData.data) {
							var item = itemData.data[itemId];
							if (null == item.normalizedName) {
								item.normalizedName = normalize(item.name);
							}
							if (-1 == item.normalizedName.indexOf(textFilter)) {
								continue;
							}
							for (var recipeIndex in recipeData.data[itemId]) {
								var recipe = recipeData.data[itemId][recipeIndex];
								var lvMark = "[Lv" + recipe["lv"] + recipe["mark"] + "] ";
								if (null == resultList[recipe.category]) {
									resultList[recipe.category] = [];
								}
								resultList[recipe.category].push({
									"image": createImageURL(item.img),
									"title": lvMark + item.name,
									"desc" : "",
									"recipe": recipe,
									"item": item
								});
							}
						}

						//リスト作成及びタイトル変更
						if (null != resultList[category]) {
							for (var i in resultList[category]) {
								ret.push(resultList[category][i]);
							}
						}
						for (var tmpCategory in resultList) {
							if (tmpCategory == category) {
								continue;
							}
							for (var i in resultList[tmpCategory]) {
								resultList[tmpCategory][i].title += " ≪" + resultList[tmpCategory][i].recipe.category + "≫";
								ret.push(resultList[tmpCategory][i]);
							}
						}
						
						//ソート順：選択中ジョブLv60->1 他ジョブ60->1
						ret.sort(function(a, b) {
							var order = 0;
							if (a.recipe.category == category && b.recipe.category != category) {
								return 1;
							}
							if (a.recipe.category != category && b.recipe.category == category) {
								return -1;
							}
							order = a.recipe.category == b.recipe.category ? 0 : a.recipe.category > b.recipe.category ? 1 : -1;
							if (0 == order) {
								order = a.recipe.lv - b.recipe.lv;
								if (0 == order) {
									order = a.recipe.mark.length - b.recipe.mark.length;
									if (0 == order) {
										order = a.item.name > b.item.name ? 1 : -1;
									}
								}
							}
							return order;
						});
					}

				} else {
					//LV, 種類指定
					for (var index in recipeMap[category][lvRange].itemIdList) {
						var itemId = recipeMap[category][lvRange].itemIdList[index];
						for (var i in recipeData.data[itemId]) {
							var recipe = recipeData.data[itemId][i];
							if (category == recipe["category"] && (ml_all == type || recipe["type"] == type)) {
								var item = itemData.data[itemId];
								var lvMark = "[Lv" + recipe["lv"] + recipe["mark"] + "] ";
								ret.push({
									"image": createImageURL(item.img),
									"title": lvMark + item.name,
									"desc" : "",
									"recipe": recipe,
									"item": item
								});
							}
						}
					}
					ret.sort(function(a, b) {
						var ret = a.recipe.lv - b.recipe.lv;
						if (0 == ret) {
							ret = a.recipe.mark.length - b.recipe.mark.length;
							if (0 == ret) {
								ret = a.item.name > b.item.name ? 1 : -1;
							}
						}
						return ret;
					});
				}
				if ("" != textFilter) {
					//テキスト検索時は逆順（レベルが高い方がよくつかわれるため、それを前に出す）
					ret.reverse();
				}

				//頭に手動を入れる
				ret.unshift(emptyRecipe);
				return ret;
			},
			drawItem: null,
			imageLazyLoad: true,
		}
	});

	//レシピLv
	var options = "";
	var optionSelected = " selected";
	//Lv+マークソート
	var tmpLvList = [];
	for (var lvText in lvTableRecipe) {
		tmpLvList.push(lvText);
	}
	tmpLvList.sort(function(a, b) {
		var va = Number(a.replace(/★/g, ""));
		var vb = Number(b.replace(/★/g, ""));
		var ret = va - vb;
		if (0 == ret) {
			ret = a.length - b.length;
		}
		return ret;
	});
	for (var i in tmpLvList) {
		lvText = tmpLvList[i];
		options += sprintf("<option value=\"{0}\"{1}>{2}</option>", [
			lvTableRecipe[lvText], optionSelected, lvText
		]);
		optionSelected = "";
	}
	$("#rcp_lv").html(options);
	$("#rcp_lv").selectmenu();
	$("#rcp_lv").selectmenu("disable");
	$("#rcp_lv").on("selectmenuselect", function(e, ui) { onUpdateParameter(e, ui); });
	$("#rcp_lv").on("selectmenuopen", function(e, ui) {
		var menuBase = $(".ui-selectmenu-menu");
		var ulBase = $("ul", menuBase);
		var liSelected = $(".ui-state-focus", ulBase);
		if (0 != liSelected.length) {
			//ベース＝top:297, height: 300
			//本体  ＝top:297, height: 1595
			//対象  ＝top:1239
			menuBase.scrollTop($(liSelected).offset().top - $(ulBase).offset().top);
		}
	});

	//耐久
	$("#rcp_dur").spinner({
		max: 99999,
		min: 1,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});
	$("#rcp_dur").spinner("value", 1);
	$("#rcp_dur").spinner("disable");

	//必要工数
	$("#rcp_proc").spinner({
		max: 99999,
		min: 1,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});
	$("#rcp_proc").spinner("value", 1);
	$("#rcp_proc").spinner("disable");

	//品質
	$("#rcp_q").spinner({
		max: 99999,
		min: 0,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});
	$("#rcp_q").spinner("value", 0);
	$("#rcp_q").spinner("disable");

	//初期品質
	$("#rcp_q_start").spinner({
		max: 99999,
		min: 0,
		stop: function(e, ui) { onUpdateParameter(e, ui);},
	});
	$("#rcp_q_start").spinner("value", 0);
	$("#rcp_q_start").spinner("disable");


	//--------------------------------------------------
	//アクション
	//--------------------------------------------------
	//ツールチップ
	$("body").tooltip({
		items: ".action, .quality_image",
		show: {effect: "fade", delay: 500, duration: 150, easing: "linear"},
		hide: false,
		content: function() {
			if ($(this).hasClass("quality_image")) {
				return $(this).attr("x-tooltip");
			}
			return createToolTipContent(this);
		},
		track: true
	});


	//アクションパネルトグル
	$(".action_title").on("click", onClickActionTitle);

	//お気に入り共有
	$("#shared_favorite_job").prop("checked", config["isSharingFavorite"]);
	$("#shared_favorite_job").on("click", onClickSharingFavorite);
	$("#ml_favorite_sharing").on("click", onClickSharingFavoriteLabel);

	//基本アクション群パネルは、draggable のため各アクションに対して処理を定義していることと、
	//内容が動的に変化することに対して再定義が随時必要なため、changeActionPanel にて対応している。

	//お気に入りパネル
	$("#action_area_favorite").sortable({
		connectWith: "#senario_panel",
		helper: "clone",
		placeholder: "placeholder_senario_action",
		opacity: 0.7,
		distance: 5,

		start: function(e, ui) {
			debug_dragStatLog("*** favorite: start");
			actionClickInfo["object"] = null;
			if (null == actionDragInfo["dragFromPanel"]) {
				var parentId = ui.item.parent().attr("id");
				actionDragInfo["dragFromPanel"] = parentId;
				actionDragInfo["checkAreaList"] = ["#senario_panel", "#action_area_favorite"];
				actionDragInfo["areaResult"] = [];
				debug_dragStatLog("***** drag start: favorite");
			}
			ui.item.css("display", "inline-block");
		},

		stop: function(e, ui) {
			debug_dragStatLog("*** favorite: stop");
			if (null != ui.helper) {
				ui.helper.css("display", "none");
				ui.helper.remove();
			}
			var parentId = ui.item.parent().attr("id");
			if (null == parentId || parentId == actionDragInfo["dragFromPanel"]) {
				actionDragInfo = [];
				debug_dragStatLog("***** drag end: favorite" + (null == parentId ? "(deleted)" : ""));
			}
		},

		activate: function(e, ui) {
			debug_dragStatLog("*** favorite: activate");
		},
		deactivate: function(e, ui) {
			//自分のものに関わらず、ドラッグが終了したら発火
			//お気に入り削除チェック
			debug_dragStatLog("*** favorite: deactivate");

			if ("action_area_favorite" == actionDragInfo["dragFromPanel"] && 
				false == actionDragInfo["areaResult"]["#action_area_favorite"] &&
				false == actionDragInfo["areaResult"]["#senario_panel"]) {
				debug_dragStatLog("**** delete favorite");
				ui.item.remove();
			}
			updateFavorite();
		},

		over: function(e, ui) {
			$(this).removeClass("hide_ph");
		},
		out: function(e, ui) {
			$(this).addClass("hide_ph");
		},

		sort: function(e, ui) {
			//debug_dragStatLog("*** favorite: sort");
			//オブジェクトが自分のエリア内に入っているときに発火（action.dragと同時）
			checkActionDragInfo(ui);
			var cursor = "no-drop";
			if (actionDragInfo["areaResult"]["#action_area_favorite"]) {
				cursor = "alias";
			} else if (actionDragInfo["areaResult"]["#senario_panel"]) {
				cursor = "alias";
			}
			ui.helper.css("cursor", cursor);
		},

		receive: function(e, ui) {
			debug_dragStatLog("*** favorite: receive");

			//favorite内での移動処理
			if ("action_area_favorite" == actionDragInfo["dragFromPanel"]) {
				ui.item.remove();
			}

			//同一アイテムが複数存在した場合は削除
			var cnt = 0;
			var actionId = ui.helper.attr("x-action-id");
			$("#action_area_favorite .action").each(function() {
				if ($(this).attr("x-action-id") == actionId) {
					cnt++;
				}
			});
			if (cnt >= 2) {
				//ドロップ処理をキャンセルする
				if (null != $(ui.sender).sortable("instance")) {
					$(ui.sender).sortable("cancel");
				}
				if (null != $(ui.sender).draggable("instance")) {
					$(ui.sender).draggable("cancel");
					$(ui.helper).remove();
				}
			}
		},
		update: function(e, ui) {
			debug_dragStatLog("*********** favorite: update");
			//favorite内部の動作に限り、uihelperを消しに行く
			if ("action_area_favorite" == actionDragInfo["dragFromPanel"]) {
				if (actionDragInfo["areaResult"]["#action_area_favorite"]) {
					if (null != ui.helper) {
						ui.helper.remove();
					}
				}
			}
			//お気に入り更新
			updateFavorite();
		}
	});


	//シナリオパネル
	$("#senario_panel").sortable({
		placeholder: "placeholder_action",
		opacity: 0.7,
		distance: 5,
		cancel: ".senario_action_nomove",

		start: function(e, ui) {
			debug_dragStatLog("*** senario: start");
			actionClickInfo["object"] = null;
			if (null == actionDragInfo["dragFromPanel"]) {
				var parentId = ui.item.parent().attr("id");
				actionDragInfo["dragFromPanel"] = parentId;
				actionDragInfo["checkAreaList"] = ["#senario_panel"];
				actionDragInfo["areaResult"] = [];
				debug_dragStatLog("***** drag start: senario");
			}
		},
		stop: function(e, ui) {
			debug_dragStatLog("*** senario: stop");
			var parentId = ui.item.parent().attr("id");
			if (null == parentId || parentId == actionDragInfo["dragFromPanel"]) {
				actionDragInfo = []
				debug_dragStatLog("***** drag end: senario" + (null == parentId ? "(deleted)" : ""));
			}
		},

		activate: function(e, ui) {
			debug_dragStatLog("*** senario:activate");
		},
		deactivate: function(e, ui) {
			debug_dragStatLog("*** senario: deactivate");
			if (null != ui.item) {
				$(ui.item).css("cursor", "pointer");
			}
			//シナリオ削除チェック
			if ("senario_panel" == actionDragInfo["dragFromPanel"] && 
				false == actionDragInfo["areaResult"]["#senario_panel"]) {
				debug_dragStatLog("**** delete senario");
				var id = $(ui.item).attr("id");
				ui.item.remove();
				updateSenario();
			}
		},

		over: function(e, ui) {
			$(this).removeClass("hide_ph");
		},
		out: function(e, ui) {
			$(this).addClass("hide_ph");
		},

		sort: function(e, ui) {
			//オブジェクトが自分のエリア内に入っているときに発火（action.dragと同時）
			//debug_dragStatLog("*** senario: sort");
			checkActionDragInfo(ui);
			var cursor = "no-drop";
			if (actionDragInfo["areaResult"]["#senario_panel"]) {
				cursor = "alias";
			}
			ui.helper.css("cursor", cursor);
		},
		receive: function(e, ui) {
			debug_dragStatLog("*** senario: receive");

			//お気に入り＞シナリオ経由＞外にドロップのケースをチェック
			if (null != actionDragInfo["areaResult"] && null != actionDragInfo["areaResult"]["#senario_panel"]) {
				if (true != actionDragInfo["areaResult"]["#senario_panel"]) {
					//キャンセル
					if (null != $(ui.sender).sortable("instance")) {
						$(ui.sender).sortable("cancel");
					}
					if (null != $(ui.sender).draggable("instance")) {
						$(ui.sender).draggable("cancel");
						$(ui.helper).remove();
					}
					return;
				}
			}

			//挿入しようとしている位置を、HTMLから取得
			var tmpItemList = [];
			var prevItem = null;
			$("#senario_panel > *").each(function(){tmpItemList.push(this);});
			for (var i in tmpItemList) {
				if (!$(tmpItemList[i]).hasClass("senario_action")) {
					break;
				}
				prevItem = tmpItemList[i];
			}

			//ドロップ処理をキャンセルする
			if (null != $(ui.sender).sortable("instance")) {
				$(ui.sender).sortable("cancel");
			}
			if (null != $(ui.sender).draggable("instance")) {
				$(ui.sender).draggable("cancel");
				$(ui.helper).remove();
			}

			//新たな要素を生成
			//<div id="test_senario_1" class="item item_water">hhhh</div>
			var newActionId = $(ui.item).attr("x-action-id");
			var newItem = createSenarioAction(newActionId);
			if (null == prevItem) {
				$(newItem).prependTo($("#senario_panel"));
			} else {
				$(newItem).insertAfter($(prevItem));
			}
			//シナリオ更新
			updateSenario();
		},
		update: function(e, ui) {
			debug_dragStatLog("*** senario: update");
			//シナリオ更新
			updateSenario();
			if (null != ui.item) {
				ui.item.css("cursor", "pointer");
			}
		}
	});

	//--------------------------------------------------
	//メニュー
	//--------------------------------------------------
	//タブ選択
	$("#menu_tabs span").on("click", onClickMenuTab);

	//テンプレ選択
	$("#senario_menu_template").selectmenu();
	$("#senario_menu_template").on("selectmenuselect", function(e, ui) {
		applyTemplate();
	});

	//クリア
	$(".senario_menu_clear").on("click", function(e, ui) {
		resetSenario();
	});

	//--------------------------------------------------
	//お気に入り
	//--------------------------------------------------
	//サブタブ選択
	$("#fav_subtab span").on("click", onClickFavSubTab);

	$(".fav_add").on("click", onClickAddFavorite);
	showFavorite();

	$(".tpl_add").on("click", onClickAddTemplate);
	showTemplate();


	//--------------------------------------------------
	//マクロ
	//--------------------------------------------------
	//行数選択
	$("#macro_lines").selectmenu();
	$("#macro_lines").on("selectmenuselect", function(e, ui) {
		updateMacroConfig();
		updateMacro();
	});
	$("#macro_continue_log").on("change keyup keydown keypress", function(e) {
		updateMacroConfig();
		updateMacro();
	});
	$("#macro_complete_log").on("change keyup keydown keypress", function(e) {
		updateMacroConfig();
		updateMacro();
	});
	$("#macro_precise").on("change keyup keydown keypress", function(e) {
		updateMacroConfig();
		updateMacro();
	});
	$("#macro_last_nowait").on("change keyup keydown keypress", function(e) {
		updateMacroConfig();
		updateMacro();
	});

	//--------------------------------------------------
	//その他
	//--------------------------------------------------
	//サブタブ選択
	$("#etc_subtab span").on("click", onClickEtcSubTab);

	//URL生成
	$(".menu_panel_etc_sub_etc .create_url").on("click", onClickCreateURL);
	$("#is_include_memo_url").on("change", onClickCreateURLIncludeNode);
	$("#is_include_memo_url").prop("checked", config["isIncludeMemoOnCreateURL"]);
	$("#is_include_memo_url").change();
	
	//テキスト化
	$(".menu_panel_etc_sub_etc .stringify_translate").on("click", onClickStringify);

	//オプション
	$("#opt_show_additional").prop("checked", config["isShowAdditional"]);
	$("#opt_show_additional").attr("checked", config["isShowAdditional"]);
	$("#opt_scroll_action").prop("checked", config["isFollowScrollActionPanel"]);
	$("#opt_scroll_action").attr("checked", config["isFollowScrollActionPanel"]);
	$("#opt_scroll_result").prop("checked", config["isFollowScrollResultPanel"]);
	$("#opt_scroll_result").attr("checked", config["isFollowScrollResultPanel"]);

	$("#opt_show_additional").on("change", onChangeOptionScroll);
	$("#opt_scroll_action").on("change", onChangeOptionScroll);
	$("#opt_scroll_result").on("change", onChangeOptionScroll);

	$("#opt_show_additional").change();
	$("#opt_scroll_action").change();
	$("#opt_scroll_result").change();


	//ゲーム接続
	$(".menu_panel_etc_sub_gamelink .gamelink").on("click", onClickGameLink);
	//日本語以外は非表示
	if ("jp" != lang) {
		$(".linkstatus_area").hide();
		$(".link_note").hide();
	}

	//--------------------------------------------------
	//右ペイン
	//--------------------------------------------------
	//タブ選択
	$("#menu_main_tabs span").on("click", onClickMainMenuTab);


}
//シナリオ強制追加（初期データ復旧はこれは使わず自前で実装）
function forceAddSenario(actionId, prevItem, isUpdateSenario) {
	var newItem = createSenarioAction(actionId);

	if (null == prevItem) {
		$("#senario_panel").append(newItem);
	} else {
		$(newItem).insertAfter($(prevItem));
	}
	if (isUpdateSenario) {
		updateSenario();
	}

}

//アクション位置判定
function checkActionDragInfo(ui) {

	var target = ui.helper
	var uiRect = {
		left: ui.helper.offset().left,
		top: ui.helper.offset().top,
		width: ui.helper.width(),
		height: ui.helper.height()
	};
	var testPoint = {
		x: uiRect.left + uiRect.width / 2,
		y: uiRect.top + uiRect.height / 2
	};

	var isExistResult = false;
	for (var i in actionDragInfo["checkAreaList"]) {
		var areaId = actionDragInfo["checkAreaList"][i];
		var result = isInRectById(testPoint, areaId);
		if (null == actionDragInfo["areaResult"][areaId] || actionDragInfo["areaResult"][areaId] != result) {
			console.log("** area check: " + areaId + " => " + result);
		}
		actionDragInfo["areaResult"][areaId] = result;
	}
}
function isInRectById(point, id) {
	var rect = {
		left:   $(id).offset().left,
		top:    $(id).offset().top,
		width:  $(id).width(),
		height: $(id).height()
	};
	return isInRect(point, rect);
}
function isInRect(point, rect) {
	var ret = false;
	if (point.x >= rect.left &&
		point.x <= rect.left + rect.width &&
		point.y >= rect.top &&
		point.y <= rect.top + rect.height) {
		ret = true;
	}
	return ret;
}
//アクションツールチップ生成
function createToolTipContent(obj) {

	var ret = "";
	var actionId = $(obj).attr("x-action-id");
	if ($(obj).hasClass("ui-draggable-dragging")) {
		return "";
	}
	if ($(obj).hasClass("ui-sortable-helper")) {
		return "";
	}

	if (null != actionId) {
		var action = crafterActionData[actionId];
		if (null != action) {
			ret = sprintf(
				"<div style=\"text-align:left\">{0}<br><br>{1}</div>", [
				action[lang],
				action[lang + "Desc"]
			]);
		}
	}
	return ret;
}

//シナリオ用アクション生成
function createSenarioAction(actionId) {
	var ret = "";
	var action = crafterActionData[actionId];
	var randId = createRandomId(12);

	//アクション枠色設定
	var actionType = "";
	if ("true" == action["meister"]) {
		actionType = "meister";

	} else if ("1" == action["isAdd"]) {
		var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
		var jobIndex = getJobIndex(jobName);
		if (action["job"] != jobIndex) {
			actionType = "additional";
		}
	}

	//品質状態設定
	var craftStatus = CRAFT_STATUS_NORMAL;
	//特定品質でしか稼動しないものは、デフォルトでその品質にする
	//67：秘訣
	//78-85：ビエルゴの技巧
	//86-93：集中加工
	if (67 == actionId || 
		(actionId >= 78 && actionId <= 85) ||
		(actionId >= 86 && actionId <= 93)) {
		craftStatus = CRAFT_STATUS_HIGH;
	}
	var craftStatusImage = craftStatusList[craftStatus].image;
	var craftStatusTitle = craftStatusList[craftStatus].title;

	//NOTE buff は生成時は空とする。
	//NOTE 成功率はデフォルト値とする
	if (193 == actionId) {
		//テキストメモ
		ret = sprintf(
			'<div class="senario_action" id="senario_{5}" x-action-id="{0}" oncontextmenu="rightClickAction(this)">' +
			'<table>' +
			'<tr>' +
			// image
			'<td class="col_image" rowspan="2"><span class="action_icon_{0} {3}">{8}</span></td>' +
			'<td>&nbsp;</td>' + 

			//success
			'<td class="col_value" rowspan="2" colspan="5" style="width: 320px; text-align: left;">' +
			'<textarea id="senario_{5}_memo" class="text_input readonly" onclick="enterMemoEditMode(this)" onfocusout="completeMemoEditMode(this)" onmousedown="onMouseDownMemo(this)" readyonly>' + ml_memo_initial + '</textarea>' +
			'</td>' + 
			'</tr>' +
			'<tr>' +
				'<td class="col_title"><span class="title">{2}</span></td>' +
			'</tr>' +
			'</table> ' + 
			'<span class="senario_action_error" id="senario_{5}_err" style="display: none"></span>' + 
			'<div id="senario_{5}_menu" class="senario_action_menu">' +
			'<span class="action_menu" onclick="duplicateAction(this)" x-id="senario_{5}"><img src="/crafter/image/sys/action_add.png"></span>' +
			'<span class="action_menu" onclick="removeAction(this)" x-id="senario_{5}"><img src="/crafter/image/sys/action_remove.png"></span>' +
			'</div>' + 
			'</div>', [
			actionId,
			action["successRate"],
			action[lang],
			actionType,
			craftStatusTitle,
			randId,
			craftStatusImage,
			craftStatus,
			(0 != action.cpCost ? "<span class=\"cost\">" + action.cpCost + "</span>" : "")
		]);

	} else {
		//通常アクション
		var actionName = action[lang];
		//長さ調整⇒updateSenarioで名前書き換えがあるので、そちらで行う
		/*
		if (45 == actionId && "jp" == lang) {
			actionName = "ブランド･オブ･ライトニング";
		}*/
		ret = sprintf(
			'<div class="senario_action" id="senario_{5}" x-action-id="{0}" oncontextmenu="rightClickAction(this)">' +
			'<table>' +
			'<tr>' +
			// image
			'<td class="col_image" rowspan="2"><span class="action_icon_{0} {3}">{8}</span></td>' +
			'<td>' + 
				// quality
				'<img src="{6}" class="quality_image" x-tooltip="{4}" x-quality="{7}" onclick="changeQuality(this)">' +
				// buff
				//<div class="action_small3" id="action_favorite_161"><span class="action_icon_161 image"><span class="buff_turn">10</span></span></div>
				'<div class="buff">' + 
				'</div>' +
			'</td>' +

			//success
			'<td class="col_value" rowspan="2">' + 
				'<span class="success">{1}%</span>' +
				(100 == action["successRate"] ? "" : 
				'<span class="action_result action_result_active" onclick="changeSucessResult(this, true)">○</span>' +
				'<span class="action_result action_result_deactive" onclick="changeSucessResult(this, false)">×</span>') +
			'</td>' +
			'<td class="col_value" rowspan="2"><span class="dur">0</span><span class="effect">&nbsp;</span></td>' +
			'<td class="col_value" rowspan="2"><span class="proc">0</span><span class="effect">&nbsp;</span></td>' +
			'<td class="col_value" rowspan="2"><span class="quality">0</span><span class="effect">&nbsp;</span></td>' +
			'<td class="col_value" rowspan="2"><span class="cp">0</span><span class="effect">&nbsp;</span></td>' +
			'</tr>' +
			'<tr>' +
				'<td class="col_title"><span class="title">{2}</span></td>' +
			'</tr>' +
			'</table> ' + 
			'<span class="senario_action_error" id="senario_{5}_err" style="display: none"></span>' + 
			'<div id="senario_{5}_menu" class="senario_action_menu">' +
			'<span class="action_menu" onclick="duplicateAction(this)" x-id="senario_{5}"><img src="/crafter/image/sys/action_add.png"></span>' +
			'<span class="action_menu" onclick="removeAction(this)" x-id="senario_{5}"><img src="/crafter/image/sys/action_remove.png"></span>' +
			'</div>' + 
			'</div>', [
			actionId,
			action["successRate"],
			actionName,
			actionType,
			craftStatusTitle,
			randId,
			craftStatusImage,
			craftStatus,
			(0 != action.cpCost ? "<span class=\"cost\">" + action.cpCost + "</span>" : "")
		]);
	}

	return ret;
}

//*************************************
//** コンフィグ
//*************************************
function loadConfig() {
	config = {};

	//読み込み
	var obj = window.localStorage.getItem("RSCrafterConfig");
	if (null != obj) {
		try {
			config = JSON.parse(obj);
		} catch (e) {
			config = {};
		}
	}

	//デフォルト設定
	setDefaultConfig("selectedJobName", jobList[0].name);
	setDefaultConfig("selectedMeal", emptyMeal);
	setDefaultConfig("selectedRecipe", emptyRecipe);
	setDefaultConfig("recipeManualParam", {
		"lv": 150,
		"dur": 70,
		"proc": 956,
		"quality": 7851
	});
	setDefaultConfig("recipeInitialQuality", 0);

	setDefaultConfig("actionViewMode", 0);
	setDefaultConfig("isSharingFavorite", true);
	setDefaultConfig("favoriteList", []);
	setDefaultConfig("templateList", []);

	setDefaultConfig("macroLines", 15);
	setDefaultConfig("macroContinueLog", "/echo 次のマクロへ <se.10>");
	setDefaultConfig("macroCompleteLog", "/echo 完成！ <se.8>");
	setDefaultConfig("macroPrecise", true);
	setDefaultConfig("macroLastNoWait", true);

	setDefaultConfig("isIncludeMemoOnCreateURL", false);
	setDefaultConfig("gameLinkPort", 51080);
	setDefaultConfig("isFollowScrollActionPanel", true);
	setDefaultConfig("isFollowScrollResultPanel", true);
	setDefaultConfig("isShowAdditional", false);

	//マージしてデフォルト生成
	var tmpJobInfo = config["jobInfo"];
	var tmpActionFavorite = config["actionFavorite"];
	if (null == tmpJobInfo) {
		tmpJobInfo = {};
	}
	if (null == tmpActionFavorite) {
		tmpActionFavorite = {};
	}
	for (var i in jobList) {
		if (!(jobList[i].name in tmpJobInfo)) {
			tmpJobInfo[jobList[i].name] = {lv: 60, craftmanship: 718, control: 695, cp:400};
		}
		if (!(jobList[i].name in tmpActionFavorite)) {
			tmpActionFavorite[jobList[i].name] = [];
		}
	}
	config["jobInfo"] = tmpJobInfo;
	config["actionFavorite"] = tmpActionFavorite;

	var tmpPanelStatus = config["actionPanelStatus"];
	if (null == tmpPanelStatus) {
		tmpPanelStatus = {};
	}
	for (var i in actionPanelList) {
		var panelId = "action_area_" + actionPanelList[i];
		if (null == tmpPanelStatus[panelId]) {
			tmpPanelStatus[panelId] = true;
		}
	}
	config["actionPanelStatus"] = tmpPanelStatus;


	//デフォルト補填後の保存
	saveConfig();
}
function getConfig(key, defaultValue) {
	var ret = config[key];
	if (null == ret) {
		config[key] = defaultValue;
		saveConfig();
		ret = defaultValue;
	}
	return ret;
}
function setConfig(key, value) {
	config[key] = value;
}
function setDefaultConfig(key, value) {
	if (null == config[key]) {
		config[key] = value;
	}
}
function saveConfig() {
	window.localStorage.setItem("RSCrafterConfig", JSON.stringify(config));
}


//*****************************************************************
//データ読み込み
//*****************************************************************
function loadData() {
	if (!window.localStorage) {
		alert(ml_html5);
		return;
	}

	localDataVersion = getLocalDataVersion();
	if (isForceLoadItemData || null == localDataVersion || localDataVersion < currentDataVersion) {
		setupLocalData();

	} else {
		itemData =   JSON.parse(doUnzip("itemData.dat",   window.localStorage.getItem("RSItemData")));
		recipeData = JSON.parse(doUnzip("recipeData.dat", window.localStorage.getItem("RSRecipeData")));
		init2();
	}
}

//データ保存
function saveItemData() {
	window.localStorage.setItem("RSDataVersion", recipeData["version"]);
	window.localStorage.setItem("RSItemData",   doZip("itemData.dat",   JSON.stringify(itemData)));
	window.localStorage.setItem("RSRecipeData", doZip("recipeData.dat", JSON.stringify(recipeData)));
}

//データ読み込み
function setupLocalData() {

	window.itemData = null;
	window.recipeData = null;

	$.blockUI({	
		css: {padding: "5%", width: "60%", left: "15%", backgroundColor: "#ffffff", border: "2px solid #808080"}, 
		message: "<div align='center'><table><tr><td><img src='image/sys/load.gif' width='32px' height='32px'</td><td style='color:#000000'>" + ml_load + "</td></tr></table></div>"
	});

	setTimeout("setupLocalItemDataHelper()", 100);
}

function setupLocalItemDataHelper() {

	var langItemDataFile = itemDataFile.replace("LANG", langForView);

	$.getJSON(langItemDataFile + "?" + Math.floor( Math.random() * 1000000), function() {
		console.log("getJSON:run");
	})
	.success(function(json) {
		console.log("getJSON:success");
		window.itemData = json;
	})
	.error(function(jqXHR, textStatus, errorThrown) {
		console.log("getJSON:error");
		console.log("エラー：" + textStatus);
		console.log("テキスト：" + jqXHR.responseText);
		window.itemData = null;
		hideLoading();
		alert(ml_load_failure);
	})
	.complete(function() {
		if (null != window.itemData) {
			console.log("getJSON:complete");
			setupLocalRecipeDataHelper();
		}
	});
}
function setupLocalRecipeDataHelper() {

	var langRecipeDataFile = recipeDataFile.replace("LANG", langForView);

	$.getJSON(langRecipeDataFile + "?" + Math.floor( Math.random() * 1000000), function() {
		console.log("getJSON:run");
	})
	.success(function(json) {
		console.log("getJSON:success");
		window.recipeData = json;
	})
	.error(function(jqXHR, textStatus, errorThrown) {
		console.log("getJSON:error");
		console.log("エラー：" + textStatus);
		console.log("テキスト：" + jqXHR.responseText);
		window.recipeData = null;
		hideLoading();
		alert(ml_load_failure);
	})
	.complete(function() {
		if (null != window.recipeData) {
			hideLoading();
			saveItemData();
			init2();
		}
	});
}


//データ読み込み非表示
function hideLoading() {
	$.unblockUI();
}

//データバージョン確認
function getLocalDataVersion() {
	var version = window.localStorage.getItem("RSDataVersion");
	return version;
}

function doZip(fileName, data) {
	console.log("zipped: file=" + fileName + ", data=" + data.length);

	var zip = new JSZip();
	var content = null;

	zip.file(fileName, data);
	content = zip.generate({
		type : "string",
		compression: "DEFLATE",
		compressionOptions : {level:6}
	});

	if ("ie" == browserType) {
		content = window.btoa(content);
	}
	console.log("zipped: result=" + content.length);

	return content;
}
function doUnzip(fileName, data) {
	var zip = new JSZip();
	var content = null;

	console.log("unzipper: file=" + fileName + ", data=" + data.length);
	
	if ("ie" == browserType) {
		data = window.atob(data);
	}
	zip.load(data);
	content = zip.file(fileName).asText();
	console.log("unzipped: result=" + content.length);

	return content;
}

//*****************************************************************
//** 共通/汎用処理
//*****************************************************************
//ジョブ名⇒ジョブインデックス
function getJobIndex(jobName) {
	var ret = -1;
	for (var i in jobList) {
		if (jobName == jobList[i].name) {
			ret = i;
			break;
		}
	}
	return ret;
}

//全要素選択
function selectAllContents(obj) {
	var range = document.createRange();
	range.selectNodeContents(obj);
	window.getSelection().addRange(range);
}

//ロドスト画像URL作成
function createImageURL(image) {
	return imageRootURL + image.substring(0, 2) + "/" + image + ".png";
}

//パラメタ解析
function analyzeParam(param) {
	var text = param.substr(1);
	var ret = [];
	var kvList = text.split("&");
	for (var i in kvList) {
		var kvSet = kvList[i].split("=");
		ret[kvSet[0]] = decodeURI(kvSet[1]);
	}

	return ret;

}

//イベント取得
function windowEvent() {
	if (window.event) {
		return window.event;
	}
	var caller = arguments.callee.caller;
	while (caller) {
		var ob = caller.arguments[0];
		if (ob && ob.constructor == MouseEvent) {
			return ob;
		}
		caller = caller.caller;
	}
	return null;
}

//全半角数値置換
function castNumber(a) {
	return a.replace(/[０１２３４５６７８９]/g
		, function(a){
			var b = "０１２３４５６７８９".indexOf(a);
			return (b !== -1)? b:a;
		}
	);
}

//半角数値以外を削除
function deleteWithoutNumber(inStr) {
	var strMatch = inStr.match(/[0-9]/g);
	var rtnMatch = "";
	try {
		for (var i = 0; i < strMatch.length; i++) {
			rtnMatch = rtnMatch + strMatch[i];
		}
	} catch (e) {}
	return rtnMatch;
}

//簡易sprintf
function sprintf(text, values) {
	var ret = text;

	for (var i = 0;i < values.length;i++) {
		ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
	}

	return ret;
}

//HTMLエスケープ
function escapeHTML(text) {
	var TABLE_FOR_ESCAPE_HTML = {
		"&": "&amp;",
		"\"": "&quot;",
		"<": "&lt;",
		">": "&gt;"
	};
	return text.replace(/[&"<>]/g, function(match) {
		return TABLE_FOR_ESCAPE_HTML[match];
	});
}

//ひらがな⇒カタカナ
//半角ひらがな⇒カタカナ
//中黒点⇒削除
//https://www.npmjs.com/package/moji
function normalize(text) {
	return new Moji(text).convert("HK", "ZK").convert("ZE", "HE").convert("HG", "KK").toString().replace("・", "");
}
//ランダムID生成
function createRandomId(len) {
	var ret = "";
	var max = RANDOM_BASE.length;

	for (var i = 0;i < len;i++) {
		ret += RANDOM_BASE.substr(Math.floor(Math.random() * max), 1);
	}

	return ret;
}

//jquery拡張 outerHTML
jQuery.fn.outerHTML = function(s) {
	return (s)
	? this.before(s).remove()
	: jQuery("<p>").append(this.eq(0).clone()).html();
}

//startsWith (String拡張）
String.prototype.startsWith = function(prefix) {
	return this.indexOf(prefix) === 0;
}

//endsWith (String拡張）
String.prototype.endsWith = function(suffix) {
	return this.match(suffix+"$") == suffix;
};

//文字数カウント
String.prototype.countText = function(target) {
	var count = 0;
	var pos = this.indexOf(target);
	while (pos != -1) {
		count++;
		pos = this.indexOf(target, pos + 1);
	}
	return count;
}
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

//領域取得
function getRect(id) {

	var offset = $(id).offset();
	var ret = {
		left: offset.left,
		top: offset.top,
		width: $(id).width(),
		height: $(id).height(),
		right: 0,
		bottom: 0
	};
	ret.right = ret.left + ret.width;
	ret.bottom = ret.top + ret.height;

	return ret;
}

//デバッグ用
var isDebugStat = true;
function debug_dragStatLog(msg) {
	if (isDebugStat) {
		console.log(msg);
	}
}
var isDebugKeyDownStop = false;
document.onkeydown = function() {
	if (isDebugKeyDownStop) {
		debugger;
	}
}
