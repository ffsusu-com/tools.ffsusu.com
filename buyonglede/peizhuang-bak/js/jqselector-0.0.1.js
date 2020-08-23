//jquery selectボックス拡張

//グローバル変数
var jqsList = {};
var materiaSet = null;
var currMateriaSelectorId = "";
var currMateriaSelectorParentId = "";
var currEquipSelectorId = "";

var freeModeMateriaList = ["mat_hit", "mat_crit", "mat_will", "mat_dodge", "mat_skill_speed", "mat_spell_speed", "mat_pie"];
var materiaFreeNudIdList = [];


//自動マテリアモード変更
function onClickAutoMateriaMode(modeValue) {
	config["autoMateriaMode"] = modeValue;
	saveConfig();
}
//自動マテリア設定
function setAutoMateria(id) {
	var jqs = jqsList[id];
	jqs.setAutoMateria();
}

//マテリア選択
function onSelectMateria(matInfo) {
	//セレクタ非表示
	//console.log(matInfo);
	$("#mat_selector").hide();

	//キャンセルの場合
	if ("cancel" == matInfo) {
		return;
	}

	if ("out" == matInfo) {
		//外す
		$("#" + currMateriaSelectorId + " .materia_item_text").html("-");
		$("#" + currMateriaSelectorId).attr("data-value", "");
	} else {
		//新しいものをつける
		//mat_crit-1
		$("#" + currMateriaSelectorId + " .materia_item_text").html(getMateriaText(matInfo));
		$("#" + currMateriaSelectorId).attr("data-value", matInfo);
	}

	//パラメタ上限再設定
	var jqs = jqsList[currMateriaSelectorParentId];
	jqs.calcLimitParam();
}
function onChangeMateriaSelectorAdjust(obj) {
	//パラメタ上限再設定
	var jqs = jqsList[currMateriaSelectorParentId];
	jqs.calcLimitParam();
}

//マテリアテキスト生成
function getMateriaText(matInfo) {
	if ("" == matInfo) {
		return "-";
	}

	var tmp = matInfo.split("-");
	var matId = tmp[0];
	var matIndex = tmp[1];
	var matDataList = getMateriaDataByLang();
	var matLevelNameList = getMateriaLevelNameListByLang();
	var matData = matDataList[matId];
	var matText = matData["name"] + ("jp" == lang ? "" : " ") + matLevelNameList[matIndex];
	matText += " (" + matData["effect_name"] + "+" + matData["values"][matIndex] + ")";

	return matText;
}

//マテリア表示
function onClickMateriaTab(e) {
	var obj = e.target;
	var id = $(obj).attr("id");
	var typeList = ["btl", "gatcrf", "atr"];
	var activeType = "";

	//コンテンツ表示切替
	for (var i in typeList) {
		if (-1 != id.indexOf(typeList[i])) {
			activeType = typeList[i];
			break;
		}
	}
	for (var i in typeList) {
		if (activeType == typeList[i]) {
			$(".mat_type_" + typeList[i]).show();
		} else {
			$(".mat_type_" + typeList[i]).hide();
		}
	}

	//タブ切り替え
	$(".mat_tabs li").removeClass("mat_active");
	$("#" + id).addClass("mat_active");

}

//マテリアセレクタ起動
function onClickMateriaSelector(obj) {
	//今開いているものが2回クリックされた場合は閉じる
	if ($("#mat_selector").is(":visible")) {
		var activeDataId = $("#mat_selector").attr("data-id-selector");
		var objDataId = $(obj).attr("id");
		if (null != activeDataId && null != objDataId && "" != activeDataId && "" != objDataId && activeDataId == objDataId) {
			$("#mat_selector").hide();
			return;
		}
	}

	//セレクタ移動
	$("#mat_selector").css({
		top: $(obj).offset().top + $(obj).height() + 4,
		left: $(obj).offset().left,
		zIndex: 3001
	});
	//ID取得
	currMateriaSelectorId = $(obj).attr("id");

	//親ID取得
	currMateriaSelectorParentId = currMateriaSelectorId.substr(0, currMateriaSelectorId.indexOf("materia_select_") - 1);

	//装備ID取得
	currEquipSelectorId = currMateriaSelectorParentId.replace("materia_", "equip_");
	//console.log(currMateriaSelectorId);
	//console.log(currMateriaSelectorParentId);
	//console.log(currEquipSelectorId);

	//セレクタへのdata-id設定
	$("#mat_selector").attr("data-id", $(obj).attr("data-id"));
	$("#mat_selector").attr("data-id-selector", $(obj).attr("id"));


	//装備取得
	var equipJqs = jqsList[currEquipSelectorId];
	//console.log(equipJqs);
	var equipData = equipJqs.setting.data[equipJqs.selectedIndex];
	var equipDetail = equipData["data"];

	//どのタブをアクティブにするか？
	//ギャザクラのパラメタがあるならギャザクラ、それ以外は戦闘タブ
	var isActiveGC = false;
	if (0 != getItemDetailValueNum(equipDetail, "bonus_gain", false) ||
		0 != getItemDetailValueNum(equipDetail, "bonus_quality", false) ||
		0 != getItemDetailValueNum(equipDetail, "bonus_cp", false) ||
		0 != getItemDetailValueNum(equipDetail, "bonus_work", false) ||
		0 != getItemDetailValueNum(equipDetail, "bonus_edit", false) ||
		0 != getItemDetailValueNum(equipDetail, "bonus_gp", false)) {
		isActiveGC = true;
	}

	//アクティブ化
	$("#" + (isActiveGC ? "mat_gatcrf" : "mat_btl")).trigger("click");

	//セレクタ表示
	$("#mat_selector").show();


}

//ホバー表示
/*
<span class="materia_item_base unselectable" onmouseover="onMouseMoveOnMateriaSelector(this)" onmouseout="onMouseOutOnMateriaSelector(this)"><span class="materia_item_text">天眼のマテリジャ (命中力+12)天眼のマテリジャ (命中力+12)</span>
<span class="selector_dd unselectable selector_dd_normal">▼</span>
</span>
*/
function onMouseMoveOnMateriaSelector(obj) {
	$('.selector_dd', obj).removeClass('selector_dd_normal');
	$('.selector_dd', obj).addClass('selector_dd_hover');
}
function onMouseOutOnMateriaSelector(obj) {
	$('.selector_dd', obj).removeClass('selector_dd_hover');
	$('.selector_dd', obj).addClass('selector_dd_normal');
}

(function( $ ) {

	//関係ない場所をクリックされたらクローズする
	$(document).click(function(e) {
		//ターゲットが data-id をもっており、かつ jqsList に登録されているのであれば、
		//jqsを操作中であるため、無視する
		if (null == e.target) {
			return;
		}
		//チェック階層数
		var depth = 10;
		var obj = e.target;
		var isValidTarget = false;
		for (var i = 0;i < depth;i++) {
			if (null == obj) {
				break;
			}
			var tmpDataId = $(obj).attr("data-id");
			if (tmpDataId != undefined && jqsList[tmpDataId] != undefined) {
				//jqs操作中
				isValidTarget = true;
				break;
			}
			obj = $(obj).parent();
		}
		if (isValidTarget) {
			//有効な要素であれば閉じない
			return;
		}

		// マテリア要素をクリックしたとき、IE,FFでは option、chrome では select が来る
		// select が取れないと、data-id が取得できずにクローズ扱いになってしまう。
		if ("option" == e.target.tagName.toLowerCase() && ("ie" == browserType || "ff" == browserType)) {
			try {
				var parent = $(e.target).parent();
				if (null != parent && null != parent.get(0).tagName && null != parent.attr("id")) {
					if ("select" == parent.get(0).tagName.toLowerCase() && -1 != parent.attr("id").toLowerCase().indexOf("materia_selector")) {
						//マテリア要素クリック
						return;
					}
				}
			} catch (e) {
				console.log(e);
			}
		}
		closeAllJqselector();
		$("#mat_selector").hide();
	});

	//すべてのjqsにcloseを発行
	function closeAllJqselector() {
		for (i in jqsList) {
			jqsList[i].closeDropDown();
		}
	}

	//マテリアセットロード
	function loadMateriaSetLS() {
		//読み込んでいない時のみ処理
		if (null == materiaSet) {
			materiaSet = {};
			try {
				var rawData = window.localStorage.getItem("esMateriaSet");
				materiaSet = JSON.parse(rawData);
			} catch (e) {
				materiaSet = null;
			}
			if (null == materiaSet) {
				materiaSet = {};
			}
		}
	}

	//マテリアセットセーブ
	function saveMateriaSetLS() {
		//読み込んでいるときのみ処理
		if (null != materiaSet) {
			window.localStorage.setItem("esMateriaSet", JSON.stringify(materiaSet));
		}
	}

	//jqs本体
	function jqselector() {
		//メンバ変数
		this.elem = null;
		this.setting = null;
		this.dataId = null;
		this.selectedIndex = 0;
		this.hovertedIndex = -1;
		this.status = 0;
		this.isDropDown = false;

		this.bindFunctions = {};

		//イベントバインド
		/*
			jqs.mouseOverSelectedItem
			jqs.mouseOutSelectedItem
			jqs.mouseOverDropDownItem
			jqs.mouseOutDropDownItem
			jqs.selectItem
			jqs.selectMateria
			jqs.openDropDown
			jqs.closeDropDown
		*/
		this.on = function(eventName, func) {
			if ("" == eventName || null == eventName || null == func) {
				return;
			}
			if (null == this.bindFunctions[eventName]) {
				this.bindFunctions[eventName] = new Array();
			} else {
			}
			this.bindFunctions[eventName].push(func);
		}
		this.off = function(eventName, func) {
			if ("" == eventName || null == eventName || null == this.bindFunctions[eventName]) {
				return;
			}
			if (null == func || 1 == this.bindFunctions.length) {
				delete this.bindFunctions[eventName];
			} else {
				for (var i = 0;i < this.bindFunctions.length;i++) {
					if (this.bindFunctions[i] == func) {
						this.bindFunctions.splice(i, 1);
						break;
					}
				}
			}
		}
		this.trigger = function(eventName, args) {
			if ("" == eventName || null == eventName || null == this.bindFunctions[eventName]) {
				return;
			}
			for (var i = 0;i < this.bindFunctions[eventName].length;i++) {
				this.bindFunctions[eventName][i](this, eventName, args);
			}
		};

		//無効化
		this.setEnabled = function(isEnabled) {
			if (this.setting.isEnabled == isEnabled) {
			//	return;
			}

			this.setting.isEnabled = isEnabled;

			this.closeDropDown();
			this.status = (isEnabled ? 0 : 3);
			this.setViewButtonImage();

			$("#" + this.dataId + "_item").css("color", isEnabled ? this.setting.boxColor : this.setting.boxDisabledColor);

		};

		//マテリア用：付与対象装備ID
		this.setTargetId = function(targetId) {
			this.setting.targetId = targetId;
		}
		this.setTargetData = function(targetData, targetHQ) {
			this.setting.targetData = targetData;
			this.setting.targetHQ = targetHQ;
		}

		//セレクタ表示初期化
		this.initView = function() {

			this.selectedIndex = 0;

			materiaFreeNudIdList = [];
			var viewHTML = this.createSelectedViewHTML();
			this.elem.empty();
			this.elem.append(viewHTML);

			for (var i in materiaFreeNudIdList) {
				var nudId = materiaFreeNudIdList[i]["id"];
				var nudValue = materiaFreeNudIdList[i]["value"];
				$("#" + nudId).jqNud({maxValue: 999, minValue:0, defaultValue: nudValue});
			}

			//ビュー本体へのバインド
			//var itemId = "#"  + this.dataId + "_item";
			var itemId = "#"  + this.dataId + "_viewItem";
			$(itemId).bind("mouseover", this, this.onMouseOverView);
			$(itemId).bind("mouseout", this, this.onMouseOutView);
			$(itemId).bind("mouseup", this, this.onMouseUpView);
			$(itemId).bind("mousedown", this, this.onMouseDownView);

			if (this.setting.materiaMode) {
				//OKボタンへのバインド
				var ddId = this.dataId + "_dropdown";
				$("#" + ddId + "_ok").bind("click", {id: ddId, obj:this}, this.onClickMateriaOK);
				$("#" + ddId + "_clear").bind("click", {id: ddId, obj:this}, this.onClickMateriaClear);

				for (var i = 0;i < 3;i++) {
					$("#set_apply_" + this.dataId + "_" + i).bind("click",  {id: ddId, obj:this, index: i}, this.onClickSetApply);
					$("#set_regist_" + this.dataId + "_" + i).bind("click", {id: ddId, obj:this, index: i}, this.onClickSetRegist);
				}

			} else {
				//子要素へのバインド
				for (var i = 0;i < this.setting.data.length;i++) {
					var ddChildViewItemId = this.dataId + "_childViewItem_" + i;
					$("#" + ddChildViewItemId).bind("mouseover", {id: ddChildViewItemId, obj: this}, this.onMouseOverChildViewItem);
					$("#" + ddChildViewItemId).bind("mouseout", {id: ddChildViewItemId, obj: this}, this.onMouseOutChildViewItem);
					$("#" + ddChildViewItemId).bind("click", {id: ddChildViewItemId, obj: this}, this.onClickChildViewItem);
				}
			}


		};

		//選択アイテム（初期ビュー）操作
		this.onMouseOverView = function(elem) {
			//console.log("onMouseOverView");
			var tmpJQS = elem.data;
			if (!tmpJQS.setting.isEnabled) {
				return;
			}
			tmpJQS.status = 1;
			tmpJQS.setViewButtonImage();
			tmpJQS.trigger("jqs.mouseOverSelectedItem", tmpJQS.setting.data[tmpJQS.selectedIndex]);
		};
		this.onMouseOutView = function(elem) {
			//console.log("onMouseOutView");
			var tmpJQS = elem.data;
			if (!tmpJQS.setting.isEnabled) {
				return;
			}
			tmpJQS.status = 0;
			tmpJQS.setViewButtonImage();
			tmpJQS.trigger("jqs.mouseOutSelectedItem", tmpJQS.setting.data[tmpJQS.selectedIndex]);
		};
		this.onMouseUpView = function(elem) {
			//console.log("onClickView");
			var tmpJQS = elem.data;
			if (!tmpJQS.setting.isEnabled) {
				return;
			}
			tmpJQS.status = 2;
			tmpJQS.setViewButtonImage();
		};
		this.onMouseDownView = function(elem) {
			//console.log("onClickView");
			var tmpJQS = elem.data;
			if (!tmpJQS.setting.isEnabled) {
				return;
			}
			tmpJQS.status = 1;
			tmpJQS.setViewButtonImage();

			if (showEquipList(tmpJQS)) {
				return;
			}

			if (!tmpJQS.isDropDown) {
				tmpJQS.showDropDown();
			} else {
				tmpJQS.closeDropDown();
			}
		};

		this.setViewButtonImage = function() {
			var newClass = "selector_dd_normal";
			if (3 == this.status) {
				newClass = "selector_dd_disabled";
			} else if (2 == this.status) {
				newClass = "selector_dd_press";
			} else if (1 == this.status) {
				newClass = "selector_dd_hover";
			}

			var itemId = "#" + this.dataId + "_item";
			var target = $(".selector_dd", $(itemId).parent());
			$(target).removeClass("selector_dd_normal");
			$(target).removeClass("selector_dd_disabled");
			$(target).removeClass("selector_dd_press");
			$(target).removeClass("selector_dd_hover");
			$(target).addClass(newClass);

		};
		this.showDropDown = function() {
			closeAllJqselector();

			this.isDropDown = true;
			pos = $(this.elem).offset();
			posTop = pos.top;
			posLeft = pos.left;
			scrollTop = getScrollTop();
	        clientHeight = getClientHeight();
			boxHeight = Number(this.setting.boxHeightWidth.replace("px", ""));
			ddHeight = Number(this.setting.ddHeight.replace("px", ""));
			isUnder = true;

			//ビューボックスの画面上のY位置
			posRelTop = posTop - scrollTop;

			if (posRelTop + boxHeight + ddHeight <= clientHeight) {
				//下にドロップダウンを開き、入りきるなら下に開く
				isUnder = true;

			} else if (posRelTop - ddHeight >= 0) {
				//上にドロップダウンを開き、入りきるなら上に開く
				isUnder = false;

			} else {
				//どっちに開いても開ききらないのであれば、余白が広い方向に開く
				//＝はみ出す量が少ない側に開く

				//下に開いたときのはみ出す量
				bottomOverSize = (posRelTop + boxHeight + ddHeight) - clientHeight;

				//上に開いたときのはみだす量
				topOverSize = -1 * (posRelTop - ddHeight);

				if (bottomOverSize < topOverSize) {
					isUnder = true;
				} else {
					isUnder = false;
				}
			}

			if (isUnder) {
				posTop = pos.top + boxHeight;
			} else {
				posTop = pos.top - ddHeight;
			}

			if (this.setting.materiaMode) {
				this.initMateriaSelection();

				if (this.setting.materiaMode) {
					if (this.setting.materiaFreeMode) {
						$("#" + this.dataId + "_dropdown .materia_free_mode").show();
						$("#" + this.dataId + "_dropdown .materia_normal_mode").hide();
					} else {
						$("#" + this.dataId + "_dropdown .materia_normal_mode").show();
						$("#" + this.dataId + "_dropdown .materia_free_mode").hide();
					}
					posTop -= 8;

					//選択可否の用意
					var limit = 5;
					if (null != this.setting.targetData && "1" == this.setting.targetData["ne_materia"]) {
						limit = Number(this.setting.targetData["base_materia"]);
					}
					var mbIdBase = this.dataId + "_materia_select_";
					for (var i = 1;i <= 5;i++) {
						var mbId = mbIdBase + (i - 1);
						if (i > limit) {
							//disabled
							$("#" + mbId + "_base").css("color", "#606060");
							$("#" + mbId).css("pointer-events", "none");
							$("#" + mbId + "_adjust").prop("disabled", "disabled");
							$("#" + mbId + "_adjust").prop("attr", "disabled");
							$("#" + mbId + "_adjust").css("color", "#606060");
						} else {
							//enabled
							$("#" + mbId + "_base").css("color", "#ffffff");
							$("#" + mbId).css("pointer-events", "initial");
							$("#" + mbId + "_adjust").prop("disabled", "");
							$("#" + mbId + "_adjust").prop("attr", "");
							$("#" + mbId + "_adjust").css("color", "#ffffff");
						}
					}
				}
			}

			$("#" + this.dataId + "_dropdown").css("position", "absolute");
			$("#" + this.dataId + "_dropdown").css("left", posLeft);
			$("#" + this.dataId + "_dropdown").css("top", posTop);
			$("#" + this.dataId + "_dropdown").css("zIndex", 1000);
			$("#" + this.dataId + "_dropdown").css("display", "block");
			$("#" + this.dataId + "_dropdown").css("visibility", "visible");

			this.trigger("jqs.openDropDown", null);
		};


		//子要素操作
		this.onMouseOverChildViewItem = function(elem) {
			elem.data.obj.setChildViewItemMouseOver(elem.data.id);
		};
		this.onMouseOutChildViewItem = function(elem) {
			elem.data.obj.setChildViewItemMouseOut(elem.data.id);
		};
		this.onClickChildViewItem = function(elem) {
			elem.data.obj.setChildViewItemClick(elem.data.id);
		};

		this.setChildViewItemMouseOver = function(ddChildViewItemId) {
			var pos0 = ddChildViewItemId.lastIndexOf("_");
			var index = ddChildViewItemId.substr(pos0 + 1);
			var ddChildItemId = this.dataId + "_childItem_" + index;
			$("#" + ddChildItemId).css("color", this.setting.ddHighlightColor);
			$("#" + ddChildItemId).css("background-color", this.setting.ddHighlightBackgroundColor);
			this.trigger("jqs.mouseOverDropDownItem", this.setting.data[Number(index)]);
		};
		this.setChildViewItemMouseOut = function(ddChildViewItemId) {
			var pos0 = ddChildViewItemId.lastIndexOf("_");
			var index = ddChildViewItemId.substr(pos0 + 1);
			var ddChildItemId = this.dataId + "_childItem_" + index;
			$("#" + ddChildItemId).css("color", this.setting.ddColor);
			$("#" + ddChildItemId).css("background-color", this.setting.ddBackgroundColor);
			this.trigger("jqs.mouseOutDropDownItem", this.setting.data[Number(index)]);
		};
		this.setChildViewItemClick = function(ddChildViewItemId) {
			var pos0 = ddChildViewItemId.lastIndexOf("_");
			var index = ddChildViewItemId.substr(pos0 + 1);
			var ddChildItemId = this.dataId + "_childItem_" + index;
			//$("#" + ddChildItemId).css("color", this.setting.ddColor);
			//$("#" + ddChildItemId).css("background-color", this.setting.ddBackgroundColor);


			this.selectedIndex = index;

			var textClass = "unselectable";
			if (null != this.setting.data[this.selectedIndex].color && "" != this.setting.data[this.selectedIndex].color) {
				textClass += " pu_itemname_small_" + this.setting.data[this.selectedIndex].color;
			}
			$("#" + this.dataId + "_item").html(this.setting.data[this.selectedIndex].text);
			$("#" + this.dataId + "_item").attr("class", textClass);
		

			this.trigger("jqs.selectItem", this.setting.data[this.selectedIndex]);

			this.closeDropDown();
		};

		//強制選択
		this.forceSelectItemByIndex = function(index) {
			this.forceSelectItem(index);
		}
		this.forceSelectItemByName = function(name, isHQ) {
			var index = -1;
			if ("" != name) {
console.log("================================");
console.log("name=" + name + ",isHQ="+ (isHQ ? "true" : "false"));
				for (var i = 0;i < this.setting.data.length;i++) {
console.log("tn=" + this.setting.data[i]["data"]["name"] + ",isHQ=" + (this.setting.data[i]["isHQ"] ? "true" : "false"));
					if (this.setting.data[i]["data"]["name"] == name && isHQ == this.setting.data[i]["isHQ"]) {
						index = i;
						break;
					}
				}
console.log("result=" + index);
				if (-1 != index) {
					this.forceSelectItem(index);
				}
			}
		}
		this.forceSelectItemById = function(id, isHQ) {
			var index = 0;
			if ("" != id) {
				for (var i = 0;i < this.setting.data.length;i++) {
					if (this.setting.data[i]["data"]["id"] == id && isHQ == this.setting.data[i]["isHQ"]) {
						index = i;
						break;
					}
				}
			}
			this.forceSelectItem(index);
		}

		this.forceSelectItem = function(data) {
			if (this.setting.materiaMode) {
				//マテリア
				this.selectedMateriaData = data;
				var selectedDataText = this.createSelectedMateriaText();
				$("#" + this.dataId + "_item").text(selectedDataText);
				this.trigger("jqs.selectMateria", this.selectedMateriaData);

			} else {
				//通常
				//this.selectedIndex = data;
				if (data >= this.setting.data.length) {
					data = 0;
				}
				var ddChildViewItemId = this.dataId + "_childViewItem_" + data;
				this.setChildViewItemClick(ddChildViewItemId);
			}
		};

		//ドロップダウン終了
		this.closeDropDown = function() {
			if (!this.isDropDown) {
				return;
			}
			this.isDropDown = false;
			$("#" + this.dataId + "_dropdown").css("display", "none");
			$("#" + this.dataId + "_dropdown").css("visibility", "hidden");
			this.trigger("jqs.closeDropDown", null);
		};

		//マテリアクリアボタン押下
		this.onClickMateriaClear = function(elem) {
			elem.data.obj.setMateriaClearClick(elem.data.id);
			elem.data.obj.trigger("jqs.selectMateria", this.selectedMateriaData);
		};
		this.setMateriaClearClick = function(ddId) {
			var dataId = ddId.substr(0, ddId.length - 9);
			if (this.setting.materiaFreeMode) {
				for (var i in freeModeMateriaList) {
					$("#materia_free_" + ddId + "_" + freeModeMateriaList[i]).val(0);
				}
			} else {
				for (var i = 0;i < 5;i++) {
					$("#" + dataId + "_materia_select_" + i).attr("data-value", "");
					$("#" + dataId + "_materia_select_" + i + " .materia_item_text").html("-");
					$("#" + dataId + "_materia_select_" + i + "_adjust").val(0);
				}
			}
		};

		//マテリアOKボタン押下
		this.onClickMateriaOK = function(elem) {
			elem.data.obj.setMateriaOKClick(elem.data.id);
			elem.data.obj.trigger("jqs.selectMateria", this.selectedMateriaData);
			elem.data.obj.closeDropDown();
		};
		this.setMateriaOKClick = function(ddId) {
			//マテリア選択状況を更新
			//作成すべきデータ形式
			//this.selectedMateriaData = [{"key": "mat_str", "level": 3, "adjust": -2}, {"key": "mat_wind", "level": 1, "adjust": 3} ];
			this.selectedMateriaData = [];
			var index = 0;

			if (!this.setting.materiaFreeMode) {
				for (var i = 0;i < 5;i++) {
					var ddChildItemId = this.dataId + "_materia_select_" + i;
					//var selectedMateriaValue = $("#" + ddChildItemId + " option:selected").val();
					var selectedMateriaValue = $("#" + ddChildItemId).attr("data-value");
					if ("" != selectedMateriaValue) {
						var tmp = selectedMateriaValue.split("-", 2);
						var ddChildItemAdjustId = ddChildItemId + "_adjust";
						var selectedAdjustValue = $("#" + ddChildItemAdjustId + " option:selected").val();

						this.selectedMateriaData[index] = {"key": tmp[0], "level": tmp[1], "adjust": selectedAdjustValue};
						index++;
					}
				}
			} else {
				for (var i in freeModeMateriaList) {
					var materiaId = freeModeMateriaList[i];
					var baseMateriaInfo = this.materiaData[materiaId];
					var nudId = "materia_free_" + ddId + "_" + materiaId;
					var nudValue = $("#" + nudId).val();
					if (0 != nudValue) {
						this.selectedMateriaData[index] = {"key": materiaId, "level": 0, "adjust": nudValue - baseMateriaInfo["values"][0]};
						index++;
					}
				}
			}

			//ビュー更新
			var selectedDataText = this.createSelectedMateriaText();
			$("#" + this.dataId + "_item").text(selectedDataText);
		};

		//セット適用準備
		this.initSetButtons = function(e) {
			var ddId = this.dataId;
			var targetId = this.setting.targetId;

			for (var i = 0;i < 3;i++) {
				var btnId ="set_apply_" + ddId + "_" + i;
				if ("" != targetId && null != materiaSet && null != materiaSet[targetId] && null != materiaSet[targetId][i]) {
					$("#" + btnId).removeAttr("disabled");
				} else {
					$("#" + btnId).attr("disabled", "disabled");
				}
			}
		};
		//セット適用
		this.onClickSetApply = function(e) {
			if (null == materiaSet) {
				return;
			}

			var jqs = e.data.obj;
			var dataId = e.data.obj.dataId;
			var index = e.data.index;
			var targetId = e.data.obj.setting.targetId;

			var setData = null;
			if (null != materiaSet[targetId] && null != materiaSet[targetId][index]) {
				setData = materiaSet[targetId][index];
			}
			if (null != setData) {
				if (jqs.setting.materiaFreeMode) {
					var ddId = dataId + "_dropdown";
					for (var i in freeModeMateriaList) {
						$("#materia_free_" + ddId + "_" + freeModeMateriaList[i]).val(0);
					}
					for (var i in setData) {
						var tmp = setData[i]["m"].split("-");
						var materiaId = tmp[0];
						var baseMateriaInfo = jqs.materiaData[materiaId];
						var value = setData[i]["a"] + baseMateriaInfo["values"][0];
						var nudId = "materia_free_" + ddId + "_" + materiaId;
						$("#" + nudId).val(value);
					}
				} else {
					for (var i = 0;i < 5;i++) {
						$("#" + dataId + "_materia_select_" + i).attr("data-value", setData[i]["m"]);
						$("#" + dataId + "_materia_select_" + i + " .materia_item_text").html(getMateriaText(setData[i]["m"]));
						$("#" + dataId + "_materia_select_" + i + "_adjust").val(setData[i]["a"]);
					}
				}
			}
		};

		//セット登録
		this.onClickSetRegist = function(e) {
			if (null == materiaSet) {
				return;
			}

			var jqs = e.data.obj;
			var dataId = e.data.obj.dataId;
			var index = e.data.index;
			var targetId = e.data.obj.setting.targetId;

			var setData = [];
			if (jqs.setting.materiaFreeMode) {
				var ddId = dataId + "_dropdown";
				for (var i in freeModeMateriaList) {
					var materiaId = freeModeMateriaList[i];
					var baseMateriaInfo = jqs.materiaData[materiaId];
					var nudId = "materia_free_" + ddId + "_" + materiaId;
					var nudValue = $("#" + nudId).val();
					if (0 != nudValue) {
						setData.push({
							"m": materiaId + "-0",
							"a": nudValue - baseMateriaInfo["values"][0]
						});
					}
				}
			} else {
				for (var i = 0;i < 5;i++) {
					//ちょっと長いのでキー名は1文字にする。m=materia, a=adjust
					setData.push({
						"m": $("#" + dataId + "_materia_select_" + i).attr("data-value"),
						"a": $("#" + dataId + "_materia_select_" + i + "_adjust").val()
					});
				}
			}
			if (null == materiaSet[targetId]) {
				materiaSet[targetId] = [null, null, null];
			}
			materiaSet[targetId][index] = setData;
			saveMateriaSetLS();
			jqs.initSetButtons();
			alert(mt_materia_set_regist_ok);

		};


		//マテリア自動選択（ロジック案２）
		//this.setAutoMateria_logic2 = function() {
		this.setAutoMateria = function(opt_exAutoPatternMode) {
			var exAutoPatternMode = opt_exAutoPatternMode === undefined ? null : opt_exAutoPatternMode;

			//マテリアコスト定義
			this.materiaCostList = [1, 2, 3, 5, 15]; //アラダガジャの順のコスト値

			//強化対象パラメタと優先度の決定
			//現時点では以下の通りの固定とする
			//戦闘系：意思／クリ／スキスピorスぺスピ
			//ギャザ：獲得／識質／GP
			//クラ　：作業／加工／CP
			var targetList = [];
			var jobClass = $("#general_filter_jobclass").val(); // クラス名そのまま
			var classType = CLASS_TYPE_NONE;
			var showParams = [];
			for (var i in classTypeDetailMap) {
				if (-1 != classTypeDetailMap[i].indexOf(jobClass)) {
					classType = eval(i); //変数名になってるので強引に解決
					showParams = EQ_SHOW_PARAMS[i];
					break;
				}
			}
			if (CLASS_TYPE_GATHERER == classType) {
				targetList = [
					{"mat": "mat_gain"},
					{"mat": "mat_quality"},
					{"mat": "mat_gp"}
				];
			} else if (CLASS_TYPE_CRAFTER == classType) {
				targetList = [
					{"mat": "mat_work"},
					{"mat": "mat_edit"},
					{"mat": "mat_cp"}
				];
			} else {
				/*
				targetList = [
					{"mat": "mat_crit"},
					{"mat": "mat_will"},
				];
				if (CLASS_TYPE_CASTER == classType || CLASS_TYPE_HEALER == classType) {
					targetList.push({"mat": "mat_spell_speed"});
				} else {
					targetList.push({"mat": "mat_skill_speed"});
				}*/
				for (var i in showParams) {
					for (var j in this.materiaData) {
						if (this.materiaData[j].effect == showParams[i]) {
							targetList.push({"mat": j});
							break;
						}
					}
				}
			}

			//上記のうち、上限定義が存在するものを付与対象とする
			var limitInfo = getParamLimitDataForParam(this.setting.targetId);
			if (null == limitInfo) {
				return;
			}

			var tmpList = [];
			for (var i in targetList) {
				var d = targetList[i];
				var bonusKey = this.materiaData[d["mat"]].effect;
				if (null != limitInfo[bonusKey]) {
					d["bonusKey"] = bonusKey;
					d["limitValue"] = limitInfo[bonusKey];
					tmpList.push(d);
				}
			}
			if (0 == tmpList.length) {
				return;
			}

			targetList = $.extend(true, [], tmpList);

			//優先度は特化係数を利用する
			var spList = getSPList(jobClass, null);//クラス別特化係数
			tmpList = [];
			for (var i in targetList) {
				var d = targetList[i];
				d["prior"] = 0;
				var bonusKey = d["bonusKey"];
				for (var j in spList) {
					if (null != spList[j][bonusKey]) {
						d["prior"] = spList[j][bonusKey];
						break;
					}
				}
				tmpList.push(d);
			}
			targetList = $.extend(true, [], tmpList);

			//優先度順にソート
			targetList.sort(function(a, b) {
				return b["prior"] - a["prior"];
			});

			//各パラメタのデフォルト値を targetList に保持
			var isHQ = this.setting.targetHQ;
			var data = this.setting.targetData;
			for (var i in targetList) {
				var bonusKey = targetList[i]["bonusKey"];
				var baseValue = 0;
				var paramKey = bonusKey + (this.setting.targetHQ ? "_hq" : "_nq");
				if (null != this.setting.targetData[paramKey]) {
					baseValue = Number(this.setting.targetData[paramKey]);
				}
				targetList[i]["baseValue"] = baseValue;
			}

			//パラメタごとに最大強化パターンを全てリストアップ
			//ただし基本ステの最大数は確定穴の数と同じ
			var workPatterns = [];
			for (var i in targetList) {
				this.tmpPatterns = [];
				var mat = targetList[i]["mat"];
				var baseValue = targetList[i]["baseValue"];
				var limitValue = targetList[i]["limitValue"];

				var materiaCountLimit = 5;
				if ("mat_str" == mat || "mat_vit" == mat || "mat_dex" == mat || "mat_int" == mat || "mat_mnd" == mat || "mat_pie" == mat) {
					materiaCountLimit = Number(this.setting.targetData["base_materia"]);
				}

				//有効な穴の数が5以下ならそれにあわせる
				if ("1" == data["ne_materia"]) {
					var tmpCount = Number(data["base_materia"]);
					if (tmpCount < materiaCountLimit) {
						materiaCountLimit = tmpCount;
					}
				}

				if (baseValue < limitValue) {
					for (var j = 4;j >= 0;j--) {
						workPatterns = [];
						this.setAutoMateriaSingleHelper(mat, materiaCountLimit, baseValue, limitValue, baseValue, workPatterns, j);
					}
				}

				targetList[i]["patterns"] = $.extend(true, [], this.tmpPatterns);
			}

			//パラメタごとの整理
			for (var i in targetList) {
				var newPatterns = [];
				//マテリア個数ごとに整理する
				for (var j = 1;j <= 5;j++) {

					//個数グループ整理
					var countPatterns = [];
					var isExistReachLimit = false;
					for (var k in targetList[i]["patterns"]) {
						if (targetList[i]["patterns"][k]["values"].length != j) {
							continue;
						}
						countPatterns.push(targetList[i]["patterns"][k]);
						if (targetList[i]["patterns"][k]["isReachLimit"]) {
							isExistReachLimit = true;
						}
					}
					if (0 == countPatterns.length) {
						continue;
					}

					var bestPattern = null;
					if (!isExistReachLimit) {
						//個数グループに上限に到達しているものが1つもない場合：合計値が最も高いものを採用
						var bestSum = -1;
						for (var k in countPatterns) {
							if (-1 == bestSum || countPatterns[k]["sum"] > bestSum) {
								bestPattern = countPatterns[k];
								bestSum = countPatterns[k]["sum"];
							}
						}

					} else {
						//個数グループに上限に到達しているものが1つ以上ある場合：上限到達のうち、コストが最も低いものを採用
						var bestCost = -1;
						for (var k in countPatterns) {
							if (!countPatterns[k]["isReachLimit"]) {
								continue;
							}
							var tmpCost = 0;
							for (var l in countPatterns[k]["values"]) {
								tmpCost += this.materiaCostList[countPatterns[k]["values"][l]];
							}
							if (-1 == bestCost || tmpCost < bestCost) {
								bestPattern = countPatterns[k];
								bestCost = tmpCost;
							}
						}
					}
					if (null != bestPattern) {
						newPatterns.push(bestPattern);
					}

				} // end materia count loop
				targetList[i]["patterns"] = $.extend(true, [], newPatterns);
			} // end targetList loop
//DEBUG
/*
console.log("===================================================");
console.log("all-patterns");
for (var i in targetList) {
	console.log("loop: " + i + ", mat=" + targetList[i]["mat"] + ", ptns=" + targetList[i]["patterns"].length);
	for (var j in targetList[i]["patterns"]) {
		console.log("------------------");
		console.log(i + "-" + j);
		var mName = "";
		for (var k in targetList[i]["patterns"][j]["values"]) {
			var x0 = targetList[i]["mat"] + "-" + targetList[i]["patterns"][j]["values"][k];
			var x1 = getMateriaText(x0);
			if ("" != mName) {
				mName += "/";
			}
			mName += x1;
		}

		console.log("tl=" + i + ", pt=" + j);
		console.log(mName);
	}
}
*/

			//全てのマテリア組み合わせを試してみる
			//このうち、効果が最大／コストが最も低い／ジャの制限に一致するもの　を採用する
			//とりあえずジャ無制限から考えてみる
			/*
				targetList[0] - patterns[0]
				targetList[1] - patterns[0]
				targetList[2] - patterns[0]
				これで最大数まで嵌める
			*/
			//最大マテリア数
			var maxMateriaCount = 5;
			if (null != this.setting.targetData["ne_materia"] && "1" == this.setting.targetData["ne_materia"]) {
				maxMateriaCount = Number(this.setting.targetData["base_materia"]);
			}
			//最大ジャ数（ただしパターンリストアップ時には、ジャを削らない）
			var mode = config["autoMateriaMode"];
			if (null != exAutoPatternMode) {
				mode = exAutoPatternMode;
			}

			var maxJACount = 0;
			if (0 == mode) {
				maxJACount = maxMateriaCount;
			} else if (1 == mode) {
				maxJACount = Number(this.setting.targetData["base_materia"]);
			}

			this.tmpPatterns = {"score": -1, "cost": -1, "list": []};
			workPatterns = [];

			this.setAutoMateriaMultiHelper(targetList, 0, workPatterns, maxMateriaCount, maxMateriaCount, "");

			var resultPatterns = $.extend(true, [], this.tmpPatterns);

			//ジャ制限処理
			//前に定義されているものが効果が高いものなので、前のジャを残す
			var jaCount = 0;
			for (var i = 0;i < resultPatterns.list.length;i++) {
				if (4 == resultPatterns.list[i].value) {
					jaCount++;
					if (jaCount > maxJACount) {
						resultPatterns.list[i].value = 3;
					}
				}
			}

			//リスト並び替え
			//ジャを前に配置する
			resultPatterns.list.sort(function(a, b) {
				return b["value"] - a["value"];
			});

//DEBUG
console.log("===================================================");
console.log("result");
console.log("maxMateria: " + maxMateriaCount);
console.log("maxJACount: " + maxJACount);

var mName = "";
for (var j in resultPatterns.list) {
	var x0 = resultPatterns.list[j]["mat"] + "-" + resultPatterns.list[j]["value"];
	var x1 = getMateriaText(x0);
	if ("" != mName) {
		mName += "/";
	}
	mName += x1;
}
console.log("result set=" + mName);
console.log("score     =" + resultPatterns.score);
console.log("cost      =" + resultPatterns.cost);


			//パラメタ設定：マテリア／調整値リセット
			for (var i = 0;i < 5;i++) {
				var selectorId = this.dataId + "_materia_select_" + i;
				var adjusterId = selectorId + "_adjust";
				if (i < resultPatterns.list.length) {
					var d = resultPatterns.list[i];
					var matInfo = d["mat"] + "-" + d["value"];
					$("#" + selectorId).attr("data-value", matInfo);
					$("#" + selectorId + " .materia_item_text").html(getMateriaText(matInfo));
					$("#" + adjusterId).val(0);

				} else {
					$("#" + selectorId).attr("data-value", "");
					$("#" + selectorId + " .materia_item_text").html("-");
					$("#" + adjusterId).val(0);
				}
			}

			//現在の設定を入れたときに、上限を超過する場合は調整値を設定
			//組み合わせ計算からそこまで大きな無駄はでないので、
			//例えばクリが３つ入っていたら、最後のクリのみで調整する

			//現マテリアでの強化結果を計算
			var addMap = {};
			for (var i = 0;i < resultPatterns.list.length;i++) {
				var d = resultPatterns.list[i];
				var v = this.materiaData[d["mat"]].values[d["value"]];
				var b = this.materiaData[d["mat"]].effect;
				if (null == addMap[b]) {
					addMap[b] = 0;
				}
				addMap[b] += v;
			}

			//調整値を計算
			var adjustMap = {};
			for (var i in targetList) {
				var d = targetList[i];
				//強化がなされていないのであれば何もしない
				if (null == addMap[d["bonusKey"]]) {
					continue;
				}
				if (d["baseValue"] + addMap[d["bonusKey"]] > d["limitValue"]) {
					adjustMap[d["mat"]] = d["limitValue"] - (d["baseValue"] + addMap[d["bonusKey"]]);
				}
			}

			if (exAutoPatternMode) {
				return {"materiaSet": resultPatterns, "adjustMap": adjustMap};
			}

			for (var i in adjustMap) {
				var adjustValue = adjustMap[i];
				for (var j = 4;j >= 0;j--) {
					var selectorId = this.dataId + "_materia_select_" + j;
					var adjusterId = selectorId + "_adjust";
					var matInfo = $("#" + selectorId).attr("data-value");
					var tmp = matInfo.split("-");
					if (tmp[0] == i) {
						$("#" + adjusterId).val(adjustValue);
						break;
					}
				}
			}

			//上限表示再計算
			this.calcLimitParam();
		};

		//自動マテリア設定ヘルパー（複数パラメタ）
		this.setAutoMateriaMultiHelper = function(targetList, tlIndex, workPatterns, maxMateriaCount, maxJACount, debugText) {

			//対象パラメタに候補マテリアが0の場合も強引に回す
			var isDummyLoop = false;
			if (0 == targetList[tlIndex]["patterns"].length) {
				isDummyLoop = true;
				targetList[tlIndex]["patterns"].push({});
			}

			for (var i = 0;i < targetList[tlIndex]["patterns"].length;i++) {
				//対象パターンのマテリアを全部投入
				var addMateriaCount = 0;
				if (!isDummyLoop) {
					var pattern = targetList[tlIndex]["patterns"][i];
					for (var j in pattern.values) {
						if (workPatterns.length >= maxMateriaCount) {
							break;
						}
						workPatterns.push({
							"mat": targetList[tlIndex]["mat"],
							"value": pattern.values[j]
						});
						addMateriaCount++;
					}
				}

				if (tlIndex == targetList.length - 1) {
					//すべての targetList の処理が終わっているのであれば、この時点の workPatterns で評価開始
					var testPattern = workPatterns.slice(0, (workPatterns.length >= maxMateriaCount ? maxMateriaCount : workPatterns.length));

					//ジャの上限数チェック
					var jaCount = 0;
					for (var j in testPattern) {
						if (4 == testPattern[j]["value"]) {
							jaCount++;
						}
					}
					if (jaCount <= maxJACount) {
						//パラメタごとの強化値合計／コスト合計を計算
						var paramInfo = {};
						var sumCost = 0;
						for (var j in testPattern) {
							var bonusKey = this.materiaData[testPattern[j]["mat"]].effect;
							var bonusValue = this.materiaData[testPattern[j]["mat"]].values[testPattern[j]["value"]];
							if (null == paramInfo[bonusKey]) {
								paramInfo[bonusKey] = {"mat": testPattern[j]["mat"], "bonusKey": bonusKey, "value": 0};
							}
							paramInfo[bonusKey]["value"] += bonusValue;
							sumCost += this.materiaCostList[testPattern[j]["value"]];
						}
						var jobClass = $("#general_filter_jobclass").val(); // クラス名そのまま
						var spList = getSPList(jobClass, null);//クラス別特化係数
						var sumScore = 0;

						for (var j in paramInfo) {
							paramInfo[j]["score"] = 0;
							//GP, CP は最優先化。スコアを思いっきり上げる。
							if (j == "bonus_cp" || j == "bonus_gp") {
								paramInfo[j]["score"] = 1000 * paramInfo[j]["value"];
							} else {
								for (var k in spList) {
									if (spList[k][j] != null) {
										paramInfo[j]["score"] = spList[k][j] * paramInfo[j]["value"];
										break;
									}
								}
							}
							sumScore += paramInfo[j]["score"];
						}
						if (-1 == this.tmpPatterns.score || 
							sumScore > this.tmpPatterns.score ||
							(sumScore == this.tmpPatterns.score && sumCost < this.tmpPatterns.cost)) {
							this.tmpPatterns.score = sumScore;
							this.tmpPatterns.cost = sumCost;
							this.tmpPatterns.list = $.extend(true, [], testPattern);
						}

//DEBUG
/*
console.log("===================================================");
console.log("combination");
console.log(debugText + ", tl=" + tlIndex + "/p=" + i);
var mName = "";
for (var j in workPatterns) {
	var x0 = workPatterns[j]["mat"] + "-" + workPatterns[j]["value"];
	var x1 = getMateriaText(x0);
	if ("" != mName) {
		mName += "/";
	}
	mName += x1;
}
console.log("raw set   =" + mName);
mName = "";
for (var j in testPattern) {
	var x0 = testPattern[j]["mat"] + "-" + testPattern[j]["value"];
	var x1 = getMateriaText(x0);
	if ("" != mName) {
		mName += "/";
	}
	mName += x1;
}
console.log("result set=" + mName);
console.log("score     =" + sumScore);
console.log("cost      =" + sumCost);
*/
					} // end max ja count check
				} else {
					//ほかの targetList が残っているのであれば、それを入れる
					this.setAutoMateriaMultiHelper(targetList, tlIndex + 1, workPatterns, maxMateriaCount, maxJACount, debugText + ", tl=" + tlIndex + "/p=" + i);
				}

				//次実行に備えて、入れたマテリアを外す
				if (!isDummyLoop) {
					//for (var j in pattern.values) {
					for (var j = 0;j < addMateriaCount;j++) {
						workPatterns.pop(); // 入れた数だけ pop する
					}
				}
			}
			if (isDummyLoop) {
				//ダミー値を除去
				targetList[tlIndex]["patterns"].pop();
			}
		};

		//自動マテリア設定ヘルパー（単一パラメタ）
		this.setAutoMateriaSingleHelper = function(mat, materiaCountLimit, baseValue, limitValue, currentValue, workPatterns, matLevel) {
			//指定のマテリアをはめると上限を超えるか？
			var matValue = this.materiaData[mat].values[matLevel];
			if (currentValue + matValue >= limitValue) {
				//超えるのであれば、これを嵌めてパターン登録して終了
				var sum = limitValue - baseValue; // 上限を超えていても評価値は上限まで強化と同等とする
				workPatterns.push(matLevel);
				this.tmpPatterns.push({"isReachLimit": true, "sum": sum, "values": $.extend(true, [], workPatterns)});
				workPatterns.pop();
				return;
			}

			//指定のマテリアを嵌めると、マテリア数が上限数になるか？
			if (workPatterns.length >= materiaCountLimit - 1) {
				//上限超えないけどこれをはめて終了
				var sum = currentValue + matValue - baseValue;
				workPatterns.push(matLevel);
				this.tmpPatterns.push({"isReachLimit": false, "sum": sum, "values": $.extend(true, [], workPatterns)});
				workPatterns.pop();
				return;
			}

			//指定のマテリアをはめても、上限に到達しない＆マテリア数に余裕がある場合は、
			//今回のマテリアを嵌めた上で、次のマテリアを嵌める
			//ただし、上位のマテリアは対象外とする
			workPatterns.push(matLevel);
			for (var i = matLevel;i >= 0;i--) {
				this.setAutoMateriaSingleHelper(mat, materiaCountLimit, baseValue, limitValue, currentValue + matValue, workPatterns, i);
			}

			//戻る前に今回嵌めたものを外す
			workPatterns.pop(matLevel);
		}


		//マテリア選択初期化
		this.initMateriaSelection = function() {
			if (this.setting.materiaFreeMode) {
				var ddId = this.dataId + "_dropdown";
				for (var i in freeModeMateriaList) {
					$("#materia_free_" + ddId + "_" + freeModeMateriaList[i]).val(0);
				}
				for (i in this.selectedMateriaData) {
					var key = this.selectedMateriaData[i]["key"];
					var level = this.selectedMateriaData[i]["level"];
					var adjust = this.selectedMateriaData[i]["adjust"];
					var value = adjust + this.materiaData[key]["values"][level];
					var nudId = "materia_free_" + ddId + "_" + key;
					$("#" + nudId).val(value);
				}

			} else {
				//マテリア
				//上限テキスト設定
				//ddHTML += "<span id='param_limit_" + this.dataId + "' style='display: none'></span><br>";
				var equipId = this.setting.targetId;
				var limitInfo = null;
				var limitHTML = "";
				if ("" != equipId) {
					limitInfo = getParamLimitDataForParam(equipId);
					if (null != limitInfo) {
						limitHTML = this.createLimitParamHTML(limitInfo);
					}
				}
				if ("" == limitHTML) {
					$("#param_limit_" + this.dataId).hide();
				} else {
					$("#param_limit_" + this.dataId).html(limitHTML);
					$("#param_limit_" + this.dataId).show();
				}

				for (var i = 0;i < 5;i++) {
					var selectedValue = "";
					var ddChildItemId = this.dataId + "_materia_select_" + i;
					if (i >= this.selectedMateriaData.length) {
						selectedValue = "";
					} else {
						selectedValue = this.selectedMateriaData[i]["key"] + "-" + this.selectedMateriaData[i]["level"];
					}
					$("#" + ddChildItemId + " .materia_item_text").html(getMateriaText(selectedValue));
					$("#" + ddChildItemId).attr("data-value", selectedValue);

					//調整値
					var ddChildItemAdjustId = ddChildItemId + "_adjust";
					if (i >= this.selectedMateriaData.length) {
						selectedValue = 0;
					} else {
						selectedValue = this.selectedMateriaData[i]["adjust"];
					}
					$("#" + ddChildItemAdjustId).val(selectedValue);
				}

				//強化値計算
				this.calcLimitParam();
			}
		};

		//パラメタ上限（マテリア上限）HTML構築
		this.createLimitParamHTML = function(limitInfo) {
			//NOTE このへんから実装は limit_info.js にもあるので注意
			var ret = "";
			var paramList = getLimitParamList();
			var isHQ = this.setting.targetHQ;
			var data = this.setting.targetData;

			ret = "<table class='limitParam' cellpadding='4' cellspacing='0'>";

			ret += "<tr class='lp_header'>";
			for (var i = 0;i < 2;i++) {
				ret += "" + 
						"<td class='lp_name'>" + ""+ "</td>" + 
						"<td class='lp_base'>" + ml_pl_base + "</td>" +
						"<td class='lp_add'>" + ml_pl_add + "</td>" +
						"<td class='lp_limit'>" + ml_pl_limit+ "</td>";
			}
			ret += "</tr>";

			var isOpen = false;
			for (var i in paramList) {
				var p = paramList[i];
				if (i % 2 == 0) {
					ret += "<tr>";
					isOpen = true;
				}
				var key = p + (isHQ ? "_hq" : "_nq");
				var baseValue = (null != data[key] ? data[key].replace("+", "") : "");
				var limitValue = (null != limitInfo[p] ? limitInfo[p] : "");

				ret += sprintf(
					"<td class='lp_name' x-param='{3}' x-base='{4}' x-limit='{5}'>{0}</td>" + 
					"<td class='lp_base'>{1}</td>" +
					"<td class='lp_add'></td>" +
					"<td class='lp_limit'>{2}</td>", [
					showBonusList[p],
					baseValue,
					limitValue,
					p,
					baseValue,
					limitValue
				]);

				if (i % 2 == 1) {
					ret += "</tr>";
					isOpen = false;
				}
			}
			if (isOpen) {
				ret += "<td colspan='4'></td></tr>";
			}
			ret += "</table>";

			//自動設定
			var checkedAutoMateria0 = (0 == config["autoMateriaMode"] ? " checked" : "");
			var checkedAutoMateria1 = (1 == config["autoMateriaMode"] ? " checked" : "");
			var checkedAutoMateria2 = (2 == config["autoMateriaMode"] ? " checked" : "");
			ret += sprintf(
				"<div class='auto_materia'>" + 
				"<input type='button' value='{0}' class='control_general' onclick='setAutoMateria(\"{1}\")'>" + 
				"<input type='radio' name='auto_materia_rad' id='{1}_auto_materia_0' value='0' {2} onclick='onClickAutoMateriaMode(0)'><label for='{1}_auto_materia_0'>{5}</label>" + 
				"<input type='radio' name='auto_materia_rad' id='{1}_auto_materia_1' value='1' {3} onclick='onClickAutoMateriaMode(1)'><label for='{1}_auto_materia_1'>{6}</label>" + 
				"<input type='radio' name='auto_materia_rad' id='{1}_auto_materia_2' value='2' {4} onclick='onClickAutoMateriaMode(2)'><label for='{1}_auto_materia_2'>{7}</label>" + 
				"</div>", [
				ml_am_auto,
				this.dataId,
				checkedAutoMateria0,
				checkedAutoMateria1,
				checkedAutoMateria2,
				ml_am_full,
				ml_am_hole,
				ml_am_noja
			]);

			return ret;
		};

		//現在の強化値
		this.calcLimitParam = function() {

			//マテリア設定の取得／強化値の数値化
			//mat_dodge-3 のような値になっている
			var addParamMap = {};
			for (var i = 0;i < 5;i++) {
				var matInfo = $("#" + this.dataId + "_materia_select_" + i).attr("data-value");
				var adjustValue = Number($("#" + this.dataId + "_materia_select_" + i + "_adjust").val());
				if ("" != matInfo && "-" != matInfo) {
					var tmp = matInfo.split("-");
					if (2 == tmp.length) {
						var key = tmp[0];
						var index = Number(tmp[1]);
						var bonusKey = this.materiaData[key].effect;
						var bonusValue = this.materiaData[key].values[index];
						if (null == addParamMap[bonusKey]) {
							addParamMap[bonusKey] = 0;
						}
						addParamMap[bonusKey] += bonusValue;
						addParamMap[bonusKey] += adjustValue;
					}
				}
			}

			//強化値の反映
			$(".limitParam tr", $("#param_limit_" + this.dataId)).each(function() {
				var tr = $(this);
				var tdList = $("td", tr);

				for (var i = 0;i <= 4;i += 4) {
					//パラメタキー
					var bonusKey = $(tdList.get(i)).attr("x-param");
					if (null == bonusKey) {
						continue;
					}

					//初期値
					var baseValue = Number($(tdList.get(i)).attr("x-base"));
					var limitValue = Number($(tdList.get(i)).attr("x-limit"));

					//強化値設定
					var addValue = "";
					var textClass = "v_add_ok";
					if (null != addParamMap[bonusKey]) {
						addValue = Number(addParamMap[bonusKey]);
						if (addValue + baseValue > limitValue) {
							textClass = "v_add_over";
						}
					}
					$(tdList.get(i + 2)).html("<span class='" + textClass + "'>" + addValue + "</span>");
				};
			});


		};

		//選択アイテム（初期ビュー）HTML作成
		this.createSelectedViewHTML = function() {
			var selectedDataText = "";
			var textClass = "";
			if (this.setting.materiaMode) {
				selectedDataText = this.createSelectedMateriaText();
			} else {
				selectedDataText = this.setting.data[this.selectedIndex].text;
				if (null != this.setting.data[this.selectedIndex].color && "" != this.setting.data[this.selectedIndex].color) {
					textClass = " pu_itemname_small_" + this.setting.data[this.selectedIndex].color;
				}
			}
			var itemId = this.dataId + "_item";
			var itemHTML = sprintf(
				"<span id='{0}' data-id='{5}' style='padding:0 {1} 0 4px; height: {1};" + 
				"line-height: {1}; display:block; width:{3};cursor:default;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;-webkit-text-overflow: ellipsis;-o-text-overflow: ellipsis;' class='unselectable{6}'>{4}</span>",
				[itemId, this.setting.boxHeightWidth, this.setting.boxDDImageNormal, this.setting.width, selectedDataText, this.dataId, textClass]);
			itemHTML += sprintf(
				"<span data-id='{0}' class='selector_dd selector_dd_disabled unselectable'>▼</span>",
				[this.dataId] );


			var viewItemId = this.dataId + "_viewItem";
			var viewHTML = sprintf(
				"<span id='{0}' data-id='{1}' " + 
				"style='border:1px solid {2};display:inline-block;zoom:1;color:{3};background-color:{4};position:relative'>" + 
				itemHTML + "</span>",
				[viewItemId, this.dataId, this.setting.boxBorderColor, this.setting.boxColor, this.setting.boxBackgroundColor]);

			//4=padding, 2=border
			var ddHTML = "";

			var isShow = false;
			var ddId = this.dataId + "_dropdown";
			if (this.setting.materiaMode) {
				//=======================================================================================================
				//マテリアモード
				ddHTML = sprintf(
					"<div id='{0}' data-id='{1}' style='background-color: {2};" + 
					"border:2px solid {3};display:{4};visibility:{5};" + 
					"position: absolute;left: 0px;top: 0px;padding:4px;box-shadow: 0px 0px 10px 0px #c0c0c0;'>",
					[ddId, this.dataId, this.setting.ddBackgroundColor, "#a0a0a0" /* this.setting.ddBorder */,
					 isShow ? "block" : "none", isShow ? "visible" : "hidden"]);

				//--------------------------------------------------------------------
				//フリー選択モード（空島装備調整用）
				ddHTML += "<div class='materia_free_mode' style='display: none'>";

				ddHTML += "<table><tr>";
				for (var i in freeModeMateriaList) {
					var materiaId = freeModeMateriaList[i];
					var ddChildHTML = "";
					var baseMateriaInfo = this.materiaData[materiaId];
					var nudId = "materia_free_" + ddId + "_" + materiaId;
					var nudValue = 0;

					//選択中データを確認
					for (i in this.selectedMateriaData) {
						var key = this.selectedMateriaData[i]["key"];
						var level = this.selectedMateriaData[i]["level"];
						var adjust = this.selectedMateriaData[i]["adjust"];
						if (key == materiaId) {
							nudValue = adjust + this.materiaData[key]["values"][level];
							break;
						}
					}
					materiaFreeNudIdList.push({"id": nudId, "value": nudValue});

					ddChildHTML += ((0 != i && i % 3 == 0) ? "</tr><tr>": "");
					ddChildHTML += sprintf(
						"<td nowrap>{0}</td>" +
						"<td nowrap><input type=\"text\" id=\"{1}\" size=\"8\"/></td>",
						[
							baseMateriaInfo["effect_name"],
							nudId
						]
					);

					ddHTML += ddChildHTML;
				}
				ddHTML += "</tr></table>";

				ddHTML += "</div>";

				//--------------------------------------------------------------------
				//通常選択モード（普通にマテリア埋め込み）
				ddHTML += "<div class='materia_normal_mode' style='white-space: nowrap'>";
				ddHTML += "<div id='param_limit_" + this.dataId + "' style='display: none'></div>";

				for (var i = 0;i < 5;i++) {
					var ddChildItemId = this.dataId + "_materia_select_" + i;
					var ddChildHTML = "";

					//選択中データを確認
					var currMateriaName = "-";
					var currMateriaValue = "";
					for (var j in this.materiaData) {
						data = this.materiaData[j];
						for (var k = 0;k < data["values"].length;k++) {
							if (0 == data["values"][k]) {
								continue;
							}
							if (i < this.selectedMateriaData.length) {
								if (this.selectedMateriaData[i]["key"] == j && this.selectedMateriaData[i]["level"] == k) {
									//天眼「の」マテリガ
									currMateriaName = data["name"] + ("jp" == lang ? "の" : " ") + this.materiaLevelNameList[k];
									currMateriaName += " (" + data["effect_name"] + "+" + data["values"][k] + ")";
									currMateriaValue = j + "-" + k;
									break;
								}
							}
						}
					}
					//カレント表示
					ddChildHTML += sprintf('<div id="{0}_base" style="display: inline">', [ddChildItemId]);
					ddChildHTML += sprintf(
						'{0}. <span class="materia_item_base unselectable" onmouseover="onMouseMoveOnMateriaSelector(this)" onmouseout="onMouseOutOnMateriaSelector(this)" ' +
						'id="{1}" data-id="{2}" data-value="{3}" onclick="onClickMateriaSelector(this)">' +
						'<span class="materia_item_text">{4}</span><span class="selector_dd unselectable selector_dd_normal">▼</span></span>', [
						(i + 1),
						ddChildItemId,
						this.dataId,
						currMateriaValue,
						currMateriaName
					]);

					//調整
					ddChildHTML += " " + ml_materia_adjust + " ";
					ddChildHTML += sprintf("<label class=\"control_select_label\"><select id='{0}_adjust' data-id='{3}' class='control_select' onchange='onChangeMateriaSelectorAdjust(this)'>",
						[ddChildItemId, this.setting.boxColor, this.setting.boxBackgroundColor, this.dataId,
						 this.selectedMateriaData.length <= i ? " disabled" : ""]);

					for (var j = -9;j <= 9;j++) {
						isSelected = false;
						if (i < this.selectedMateriaData.length) {
							if (this.selectedMateriaData[i]["adjust"] == j) {
								isSelected = true;
							}
						} else if (0 == j) {
							isSelected = true;
						}
						ddChildHTML += sprintf("<option value='{0}'{1}>{2}</option>",
							[j, isSelected ? " selected" : "", (j < 0 ? j : j == 0 ? "0" : "+" + j)]);
					}
					ddChildHTML += "</select><span class=\"control_select_mark\">▼</span></label>";
					ddChildHTML += "</div>";//end base
					ddChildHTML += "<br>";

					ddHTML += ddChildHTML;
				}
				ddHTML += "</div>";

				//セットボタン
				ddHTML += "<table style=\"margin-left: 9px; margin-bottom: 4px;\"><tr>";
				for (var i = 0;i < 3;i++) {
					ddHTML += sprintf("<td><input type=\"button\" id=\"set_apply_{0}_{1}\" value=\"{2}\" class=\"control_general_set_materia\" style=\"width:100%\" data-id=\"{3}\"></td>", [
						this.dataId,
						i,
						(0 == i ? ml_set1_apply : 1 == i ? ml_set2_apply : ml_set3_apply),
						this.dataId,
					]);
				}
				ddHTML += "</tr><tr>";
				for (var i = 0;i < 3;i++) {
					ddHTML += sprintf("<td><input type=\"button\" id=\"set_regist_{0}_{1}\" value=\"{2}\" class=\"control_general_set_materia\" style=\"width:100%\" data-id=\"{3}\"></td>", [
						this.dataId,
						i,
						(0 == i ? ml_set1_regist : 1 == i ? ml_set2_regist : ml_set3_regist),
						this.dataId,
					]);
				}
				ddHTML += "</tr></table>";

				//OKボタン
				ddHTML += sprintf(
					"<div style='text-align:right;padding-right:8px'>"  +
					"<input id='{0}_clear' data-id='{1}' type='button' value='重置' class='control_general'>&nbsp;" + 
					"<input id='{0}_ok' data-id='{1}' type='button' value='确定' class='control_general'>" + 
					"</div>",
					[ddId, this.dataId]);


				ddHTML += "</div>";

			} else {
				//=======================================================================================================
				//通常モード
				var ddWidth = 4 + Number(this.setting.width.replace("px", "")) + Number(this.setting.boxHeightWidth.replace("px", ""));
				var maxTextLength = 0;
				var maxTextLengthText = "";

				ddHTML = sprintf(
					"<div id='{0}' data-id='{1}' style='width:{2};height:{3};background-color: {4};" + 
					"border:1px solid {5};display:{6};visibility:{7};" + 
					"position: absolute;left: 0px;top: 0px;overflow: auto;overflow-x: hidden;cursor:default'>",
					[ddId, this.dataId, ddWidth + "px", this.setting.ddHeight, 
					 this.setting.ddBackgroundColor, this.setting.ddBorder,
					 isShow ? "block" : "none", isShow ? "visible" : "hidden"]);

				for (var i = 0;i < this.setting.data.length;i++) {
					var ddChildItemId = this.dataId + "_childItem_" + i;
					var ddChildViewItemId = this.dataId + "_childViewItem_" + i;
					textClass = "";
					if (null != this.setting.data[i].color && "" != this.setting.data[i].color) {
						textClass = " class=\"pu_itemname_small_" + this.setting.data[i].color + "\"";
					}
					var ddChildHTML = sprintf(
						"<span id='{0}' " +
						"style='display:inline-block;zoom:1;color:{2};background-color:{3};' class='unselectable' data-id='{5}'>" +
						"<span id='{4}' data-id='{5}' style='padding:0 {6} 0 4px;height:{6};line-height:{6};display:block;width:{7};white-space: nowrap;overflow: hidden;text-overflow: ellipsis;-webkit-text-overflow: ellipsis;-o-text-overflow: ellipsis;'" + textClass + ">" + 
						"{8}</span></span>",
						[ddChildItemId, this.setting.boxBorderColor, this.setting.boxColor, this.setting.boxBackgroundColor,
						 ddChildViewItemId, this.dataId, this.setting.boxHeightWidth, this.setting.width, this.setting.data[i].text]);

					ddHTML += ddChildHTML;
					if (this.setting.data[i].text.length > maxTextLength) {
						maxTextLength = this.setting.data[i].text.length;
						maxTextLengthText = this.setting.data[i].text;
					}
				}
				ddHTML += "</div>";
				this.setting.maxLengthText = maxTextLengthText;
			}


			return viewHTML + ddHTML;
		};

		//データ再設定
		this.resetData = function(data) {
			if (this.setting.materiaMode) {
				this.selectedMateriaData = [];
				this.initMateriaSelection();
				var selectedDataText = this.createSelectedMateriaText();
				$("#" + this.dataId + "_item").text(selectedDataText);

			} else {
				this.setting.data = data;
				this.selectedIndex = 0;
				this.initView();
			}
		};
		this.setMateriaModeType = function(isMateriaFreeMode) {
			this.setting.materiaFreeMode = isMateriaFreeMode;
		};
		//データ初期化
		this.initData = function() {
			var data = null;

			//コールバック定義があれば、それを優先
			if (null != this.setting.dataCallback) {
				data = this.setting.dataCallback(this, this.dataId);
				if (null != data) {
					this.setting.data = data;
				}
			}

			//デフォルトデータ
			if (null == data) {
				this.setting.data = [{"text": "-", "data": ""}];
			}

			//debug
			//this.selectedMateriaData = [{"key": "mat_str", "level": 3, "adjust": -2}, {"key": "mat_wind", "level": 1, "adjust": 3} ];

		};

		//選択マテリア文字列
		this.createSelectedMateriaText = function() {
			var ret = "";

			for (i in this.selectedMateriaData) {
				var key = this.selectedMateriaData[i]["key"];
				var level = this.selectedMateriaData[i]["level"];
				var adjust = this.selectedMateriaData[i]["adjust"];

				if ("" != ret) {
					ret += ", ";
				}

				if (this.setting.materiaFreeMode) {
					var value = adjust + this.materiaData[key]["values"][level];
					ret += this.materiaData[key]["effect_name"] + value;
				} else {
					matName = this.materiaData[key]["name"];
					matLevelNameAbbr = this.materiaLevelNameAbbrList[level];

					ret += matName + ("jp" == lang ? "" : " ") + matLevelNameAbbr;
				}
			}

			if ("" == ret) {
				ret = (this.setting.materiaFreeMode ? ml_randomparam_nostatus : ml_materia_noselect);
			} else {
				if ("jp" != lang) {
					ret = ml_materia_detail;
				}
			}

			return ret;
		}

		//マテリア選択HTML作成
		this.createMateriaSelector = function() {
			var matOrder = [
				{"key": "mat_hit", "type": "btl"},
				{"key": "mat_crit", "type": "btl"},
				{"key": "mat_will", "type": "btl"},
				{"key": "mat_dodge", "type": "btl"},
				{"key": "mat_skill_speed", "type": "btl"},
				{"key": "mat_spell_speed", "type": "btl"},
				{"key": "mat_gain", "type": "gatcrf"},
				{"key": "mat_quality", "type": "gatcrf"},
				{"key": "mat_gp", "type": "gatcrf"},
				{"key": "mat_work", "type": "gatcrf"},
				{"key": "mat_edit", "type": "gatcrf"},
				{"key": "mat_cp", "type": "gatcrf"},
				{"key": "mat_str", "type": "btl"},
				{"key": "mat_vit", "type": "btl"},
				{"key": "mat_dex", "type": "btl"},
				{"key": "mat_int", "type": "btl"},
				{"key": "mat_mnd", "type": "btl"},
				{"key": "mat_pie", "type": "btl"},
				{"key": "mat_fire", "type": "atr"},
				{"key": "mat_ice", "type": "atr"},
				{"key": "mat_wind", "type": "atr"},
				{"key": "mat_earth", "type": "atr"},
				{"key": "mat_lightning", "type": "atr"},
				{"key": "mat_water", "type": "atr"}
			];

			var html = "";
			var htmlTab = sprintf(
				'<ul class="mat_tabs"><li id="mat_btl" class="mat_active">{0}</li><li id="mat_gatcrf">{1}</li><li id="mat_atr">{2}</li></ul>', [
				ml_mat_type_btl,
				ml_mat_type_gatcrf,
				ml_mat_type_atr,
			]);
			var htmlBody = "<table class='mat_table'>";
			htmlBody += sprintf(
				"<tr class='mat_line'><td nowrap><a href='javascript:void(0)' onclick=\"onSelectMateria('out')\">{0}</a></td>" +
				"<td></td><td></td><td></td><td></td><td nowrap><a href='javascript:void(0)' onclick=\"onSelectMateria('cancel')\">{1}</a></td></tr>", [
					ml_mat_out, ml_mat_cancel
				]
			);
			for (var i in matOrder) {
				var htmlLine = "";
				var key = matOrder[i]["key"];
				var type = matOrder[i]["type"];
				var matData = this.materiaData[key];

				for (var j in matData["values"]) {
					htmlLine += sprintf(
						"<td nowrap><a href='javascript:void(0)' onclick=\"onSelectMateria('{0}')\">{1} ({2})</a></td>", [
						key + "-" + j,
						this.materiaLevelNameAbbrList[j],
						matData["values"][j]
					]);
				}

				htmlBody += sprintf(
					"<tr class='mat_line mat_type_{0}'><td nowrap><img src='{1}' class='mat_image'><span class='mat_title'>{2}({3})</span></td>" +
					htmlLine + 
					"</tr>",[
					type,
					matData["icon"],
					matData["name"],
					matData["effect_name"]
				]);
			}
			htmlBody += "</table>";

			$("#mat_selector").html(htmlTab + htmlBody);

			//$("#" + (isActiveGC ? "mat_gatcrf" : "mat_btl")).trigger("click");
			//イベント設定
			$("#mat_btl").on(   "click", function(e) {onClickMateriaTab(e);});
			$("#mat_gatcrf").on("click", function(e) {onClickMateriaTab(e);});
			$("#mat_atr").on(   "click", function(e) {onClickMateriaTab(e);});
		}

		//マテリアデータ初期化
		this.initMateriaData = function() {
			this.materiaData = getMateriaDataByLang();
			this.materiaLevelNameList = getMateriaLevelNameListByLang();
			this.materiaLevelNameAbbrList = getMateriaLevelNameAbbrListByLang();

			this.selectedMateriaData = [];
			
		};

		//初期化
		this.init = function(elem, conf) {
			this.elem = elem;

			var defaults = {
				data: null,
				dataCallback: null,

				width: "320px",
				boxHeightWidth: "18px",

				boxColor: "#ffffff",
				boxBorderColor: "#808080",
				boxBackgroundColor: "#000000",
				boxDisabledColor: "#808080",
				boxDDImageNormal: "image/sys/dd_normal.png",
				boxDDImageHover: "image/sys/dd_hover.png",
				boxDDImageDown: "image/sys/dd_down.png",
				boxDDImageDisabled: "image/sys/dd_disabled.png",

				ddHeight: "144px",
				ddColor: "#ffffff",
				ddBorder: "#606060",
				ddBackgroundColor: "#000000",
				ddHighlightColor: "#ffffff",
				ddHighlightBackgroundColor: "#808080",

				isAutoPosition: true,
				isInitData: true,
				materiaMode: false,
				materiaFreeMode: false,
				isEnabled: true,
				isDebug: false,
				targetItem: null,

				targetId: "",
				targetData: null,
				targetHQ: false
			};

			this.setting = $.extend(defaults, conf);
			this.dataId = $(this.elem).attr("data-id");

			this.initMateriaData();

			if (0 == Object.keys(jqsList).length) {
				this.createMateriaSelector();
			}
			jqsList[this.dataId] = this;

			if (this.setting.isInitData) {
				this.initData();
				this.initView();
			}

		}

	};

	$.fn.jqSelector = function(options) {
		loadMateriaSetLS();

		var obj = new jqselector();
		obj.init(this, options);

		return obj;
	};

})( jQuery );
