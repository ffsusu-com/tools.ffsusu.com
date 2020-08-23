//--------------------------------------------------
//グローバル変数
var imageURLTemplate = "http://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/{0}/{1}.png";

var filterParamSample = {
	0: [1, 3],
	1: [3, 2],
	2: [2, 3],
	3: [6, 3],
	4: [3, 2, 7],
	5: [12, 13, 11],
	6: [8, 10, 9],
	99: [],
};

var mealsConfig = {};
var mealNameMap = null;
var sortIndex = -1;

//--------------------------------------------------
//初期化
//--------------------------------------------------
function mealsInit() {
	//設定読み込み
	mealsLoadConfig();
	sortIndex = mealsConfig["sortIndex"];

	//スマホ初期化
	mealsSMPInit();

	//フォーム初期化
	mealsInitForm();

	//フィルタ適用
	mealsUpdateFilter(true);

	//CSS調整
	adjustStyle();

	//名前ソート
	setSortIndexView();
	sortTable();

	//イベント設定
	$(window).on("scroll", setSortIndexView);
	$(window).on("resize", setSortIndexView);
}

//--------------------------------------------------
//フォーム初期化
//--------------------------------------------------
function mealsInitForm() {
	var html = "";

	//var mealsIndexList = ["VIT", "受け流し発動力", "クリティカル", "意思力", "スキルスピード", "命中力", "スペルスピード", "PIE", "CP", "加工精度", "作業精度", "GP", "獲得力", "識質力", "毒耐性", "沈黙耐性", "暗闇耐性", "睡眠耐性", "ヘヴィ耐性", "スロウ耐性", "スタン耐性", "バインド耐性", "分解精度", "装備消耗耐性", "錬精度上昇量"];
	for (var i in mealsIndexList) {
		var isChecked = (null != mealsConfig["filterParam"][i] ? " checked=\"checked\"" : "");
		html += sprintf(
			"<div class=\"meals_filter_block\"><input type=\"checkbox\" id=\"{0}\" value=\"{1}\" class=\"meals_filter_input\"{3}><label for=\"{0}\" class=\"meals_filter_label unselectable\">{2}</label></div>", [
				"filter_param_" + i,
				i,
				mealsIndexList[i],
				isChecked
			]
		);
	}

	$("#meals_filter").html(html);

	//イベント設定
	for (var i in mealsIndexList) {
		$("#filter_param_" + i).on("change", onChangeFilterParam);
	}

}
//--------------------------------------------------
//フィルタテンプレ
//--------------------------------------------------
function setFilterParamSample(id) {

	//設定確認
	if (-1 == id) {
		id = $("#useful_filter").val();
	}
	if ("" == id) {
		return;
	}

	var targetParams = filterParamSample[id];
	if (null == targetParams) {
		return;
	}

	//設定
	isForce = true;
	$("#meals_filter input").each(function() {
		if (-1 != targetParams.indexOf(Number($(this).val()))) {
			$(this).prop("checked", true);
		} else {
			$(this).prop("checked", false);
		}
	});

	isForce = false;

	//適用
	onChangeFilterParam();

	//ソート処理
	//1番目の指定パラメタでソートする
	sortIndex = -1;

	if (targetParams.length >= 1) {
		var targetParamName = mealsIndexList[targetParams[0]];
		var cnt = 0;
		$("#meals_table thead td").each(function() {
			var headerText = $(this).text();
			if (-1 == sortIndex && headerText == targetParamName) {
				sortIndex = cnt;
			}
			cnt++;
		});
	}

	setSortIndexView();
	sortTable();
}

//--------------------------------------------------
//フィルタ処理
//--------------------------------------------------
function onChangeFilterParam() {
	if (isForce) {
		return;
	}

	mealsConfig["filterParam"] = {};
	$("#meals_filter input").each(function() {
		if ($(this).prop("checked")) {
			mealsConfig["filterParam"][$(this).val()] = true;
		}
	});
	mealsSaveConfig();

	mealsUpdateFilter();
}
function mealsUpdateFilter() {
	mealsUpdateFilter(false);
}
function mealsUpdateFilter(isInit) {
	var paramKeys = {};
	var filteredList = [];
	var filterMap = {};

	var oldSortKey = "";
	if (-1 != sortIndex) {
		oldSortKey = $("#meals_table thead td:eq(" + sortIndex + ")").text();
	}

	//フィルタ条件
	$("#meals_filter input").each(function() {
		if ($(this).prop("checked")) {
			filterMap[mealsIndexList[$(this).val()]] = true;
		}
	});

	//フィルタリング
	for (var i in mealsList) {
		var isHit = false;
		var meal = mealsList[i];

		for (var j in meal["params"]) {
			if (null != filterMap[j]) {
				isHit = true;
				break;
			}
		}
		if (isHit) {
			filteredList.push(meal);

			//キー一覧作成
			for (var j in meal["params"]) {
				paramKeys[j] = true;
			}
		}
	}

	//キー一覧を mealsIndexList の順に並べる
	var paramKeyList = [];
	for (var i in mealsIndexList) {
		if (null != paramKeys[mealsIndexList[i]]) {
			paramKeyList.push(mealsIndexList[i]);
		}
	}

	var header = "";
	var body = "";

	//ヘッダ構築
	header = "<tr>";
	header += "<td onclick='onClickHeader(0)'>名前</td>";
	var cnt = 1;
	for (var i in paramKeyList) {
		header += sprintf("<td onclick='onClickHeader({0})'>{1}</td>", [cnt, paramKeyList[i]]);
		cnt++;
	}
	header += sprintf("<td onclick='onClickHeader({0})'>備考</td>", [cnt]);
	header += "</tr>";

	//ボディ構築
	for (var i in filteredList) {
		var line = "";
		var meal = filteredList[i];


		var imageURL = sprintf(imageURLTemplate, [meal["image"].substr(0, 2), meal["image"]]);

		line += sprintf("<tr x-name=\"{0}\">", [meal["name"]]);
		line += sprintf("<td><div class=\"meal_title\"><img src=\"{0}\" class=\"meal_image\"><span class=\"meal_name\">{1}</span></div></td>", [imageURL, meal["name"]]);

		for (var j in paramKeyList) {
			var paramKey = null;
			for (var k in meal["params"]) {
				if (k == paramKeyList[j]) {
					paramKey = k;
					break;
				}
			}
			if (null == paramKey) {
				line += "<td></td>";
			} else {
				var buf = "";
				if ("" != meal["params"][paramKey]["add_value"]) {
					buf += meal["params"][paramKey]["add_value"];
				}
				if ("" != meal["params"][paramKey]["add_limit"]) {
					if ("" != buf) {
						buf += "/";
					}
					buf += meal["params"][paramKey]["add_limit"];
				}
				if ("" != meal["params"][paramKey]["add_value"] && "" != meal["params"][paramKey]["add_limit"]) {
					var addValue = Number(meal["params"][paramKey]["add_value"].replace("%", "").replace("+", ""));
					var addLimit = Number(meal["params"][paramKey]["add_limit"]);
					var maxValue = Math.ceil(addLimit / (addValue / 100));
					if ("" != buf) {
						buf += "/";
					}
					buf += maxValue;
				}
				line += sprintf("<td>{0}</td>", [buf]);
			}
		}
		line += "<td></td>";

		line += "</tr>";

		body += line;
	}

	//設定
console.time();
	$("#meals_table thead").html(header);
console.timeEnd();
console.time();
	$("#meals_table tbody").html(body);
console.timeEnd();

	//ソート条件再設定
	if (isInit) {
		sortIndex = mealsConfig["sortIndex"];
	} else {
		var newSortIndex = 0;
		var cnt = $("#meals_table thead td").length;
		for (var i = 0;i < cnt;i++) {
			if ("" != oldSortKey && oldSortKey == $("#meals_table thead td:eq(" + i + ")").text()) {
				newSortIndex = i;
				break;
			}
		}
		sortIndex = newSortIndex;
	}
	setSortIndexView();
	sortTable();
}

//--------------------------------------------------
//ソート処理
//--------------------------------------------------
function onClickHeader(tmpSortIndex) {
	sortIndex = tmpSortIndex;
	setSortIndexView();
	sortTable();
}

function setSortIndexView() {
	if ("" == $("#meals_table tbody td").text()) {
		sortIndex = -1;
	}

	if (-1 == sortIndex) {
		$("#sortIcon").hide();
	} else {
		var headerColumn = $("#meals_table thead td:eq(" + sortIndex + ")");
		$("#sortIcon").css({
			"left": headerColumn.offset().left + headerColumn.width() + 9 - $("#sortIcon").width(),
			"top": headerColumn.offset().top + headerColumn.height() + 9 - $("#sortIcon").height() + 1,
		});
		$("#sortIcon").show();
	}
}
function sortTable() {
	var htmlList = [];
	$("#meals_table tbody tr").each(function() {
		var encodedName = $(this).attr("x-name").replace("&", "&amp;");
		htmlList.push({
			name: encodedName,
			html: $(this).outerHTML(),
			data: getMealByName(encodedName)
		});
	});

	var sortKey = $("#meals_table thead td:eq(" + (-1 == sortIndex ? 0 : sortIndex) + ")").text();

	htmlList.sort(function(a, b) {
		var va = (null != a.data.params[sortKey] ? Number(a.data.params[sortKey]["sort_value"]) : -1);
		var vb = (null != b.data.params[sortKey] ? Number(b.data.params[sortKey]["sort_value"]) : -1);
		var ret = vb - va;
		if (0 == ret) {
			ret = (a.data.name == b.data.name ? 0 : a.data.name < b.data.name ? -1 : 1);
		}
		return ret;
	});

	var html = "";
	for (var i in htmlList) {
		html += htmlList[i].html;
	}
	$("#meals_table tbody").html(html);

	mealsConfig["sortIndex"] = sortIndex;
	mealsSaveConfig();
}


//--------------------------------------------------
//データ処理
//--------------------------------------------------
function getMealByName(name) {

	if (null == mealNameMap) {
		mealNameMap = {};
		for (var i in mealsList) {
			mealNameMap[mealsList[i]["name"]] = mealsList[i];
		}
	}
	return mealNameMap[name];
}

//--------------------------------------------------
//スマホ初期化
//--------------------------------------------------
function mealsSMPInit() {

	if (!("isSMP" in window)) {
		isSMP = false;
	}

}


//--------------------------------------------------
//設定読み込み
//--------------------------------------------------
function mealsLoadConfig() {
	mealsConfig = {};

	var obj = window.localStorage.getItem("esMealConfig");
	if (null != obj) {
		try {
			mealsConfig = JSON.parse(obj);
		} catch (e) {
			mealsConfig = {};
		}
	}
	mealsSetDefaultConfig("filterParam", {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true});
	mealsSetDefaultConfig("sortParams", []);
	mealsSetDefaultConfig("sortIndex", 0);
}
function mealsSetDefaultConfig(key, value) {
	if (null == mealsConfig[key]) {
		mealsConfig[key] = value;
	}
}
function mealsSaveConfig() {
	window.localStorage.setItem("esMealConfig", JSON.stringify(mealsConfig));

}

//--------------------------------------------------
//汎用処理
//--------------------------------------------------
jQuery.fn.outerHTML = function(s) {
	return (s)
	? this.before(s).remove()
	: jQuery("<p>").append(this.eq(0).clone()).html();
}
