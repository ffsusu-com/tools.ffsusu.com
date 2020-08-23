//jquery NumberUpDownボックス

(function( $ ) {
	//グローバル変数
	var jqNudMap = {};

	//汎用：ID変換
	function getJqNudId(rawId) {
		var tmp = rawId.split("_");
		var id = rawId;
		if (tmp.length >= 2) {
			id = tmp[0] + "_" + tmp[1];
		}
		return id;
	}
	//汎用：jqnud取得
	function getJqNudByRawId(id) {
		return jqNudMap[getJqNudId(id)];
	}
	function getJqNud(id) {
		return jqNudMap[id];
	}

	//本体
	function jqNud() {
		//メンバ変数
		this.elem = null;
		this.setting = null;
		this.isEnabled = true;
		this.isForce = false;

		this.preValue = "";

		//無効化
		this.setEnabled = function(isEnabled) {
			this.isEnabled = isEnabled;
			//色設定
			var idList = [this.setting.textBoxId, this.setting.id + "_minus", this.setting.id + "_plus"];
			for (var i = 0;i < idList.length;i++) {
				var id = idList[i];
				$("#" + id).css("border-color", isEnabled ? this.setting.defaultBorderColor : this.setting.disabledBorderColor);
				$("#" + id).css("background-color", isEnabled ? this.setting.defaultBackgroundColor : this.setting.disabledBackgroundColor);
				$("#" + id).css("color", isEnabled ? this.setting.defaultColor : this.setting.disabledColor);
				if (0 == i) {
					if (isEnabled) {
						$("#" + id).removeAttr("disabled");
					} else {
						$("#" + id).attr("disabled", "disabled");
					}
				}
			}
		};

		//ボタン操作
		this.onMouseOverButton = function(e) {
			var jqNud = e.data;
			if (!jqNud.isEnabled) {return;}
			$(this).css("background", "-prefix-linear-gradient(top, #999, #333)");
			$(this).css("background", "linear-gradient(to bottom, #999, #333)");
		};
		this.onMouseOutButton = function(e) {
			var jqNud = e.data;
			if (!jqNud.isEnabled) {return;}
			$(this).css("background", "-prefix-linear-gradient(top, #777, #111)");
			$(this).css("background", "linear-gradient(to bottom, #777, #111)");

		};
		this.onMouseDownButton = function(e) {
			var jqNud = e.data;
			if (!jqNud.isEnabled) {return;}
			$(this).css("background", "-prefix-linear-gradient(top, #aaa, #555)");
			$(this).css("background", "linear-gradient(to bottom, #aaa, #555)");
		};
		this.onMouseUpButton = function(e) {
			var jqNud = e.data;
			if (!jqNud.isEnabled) {return;}
			$(this).css("background", "-prefix-linear-gradient(top, #999, #333)");
			$(this).css("background", "linear-gradient(to bottom, #999, #333)");

			jqNud.changeValueByButton(-1 != $(this).attr("id").indexOf("minus") ? false : true);
		};

		//入力フォーカスが外れた時に起動
		this.onChangeCompleteValue = function(e) {
			var jqNud = e.data;

			//処理が複雑になる可能性があるため、jqnud内部で処理へ
			jqNud.onChangeCompleteValueHelper(e);
		};

		//テキスト入力などによる数値変更
		this.onChangeCompleteValueHelper = function(e) {
			if (this.isForce) {
				return;
			}
			var result = this.validate();
			if (!result.isValid) {
				return;
			}

			//更新確認
			if (this.preValue == result.value) {
				return;
			}

			//書き換え
			if (result.isRewrite) {
				var tmpIsForce = isForce;
				this.isForce = true;
				$("#" + this.setting.textBoxId).val(result.text);
				this.isForce = tmpIsForce;
			}

			//内部データ更新
			this.preValue = result.value;

			if (null != this.setting.onChange) {
				this.setting.onChange(this, result.value);
			}
		};

		//外部からの強制設定
		//バリデーションがないので正しい値を設定すること
		this.setValue = function(v) {
			//更新確認
			if (this.preValue == v) {
				return;
			}

			//書き換え
			this.isForce = true;
			$("#" + this.setting.textBoxId).val(v);
			this.isForce = false;

			//内部データ更新
			this.preValue = v;

			if (null != this.setting.onChange) {
				this.setting.onChange(this, v);
			}
		};

		//バリデーション
		this.validate = function() {
			var ret = {
				isValid: false,
				isRewrite: false,
				text: $("#" + this.setting.textBoxId).val(),
				value: 1
			};

			//値の正当性を確認
			while (true) {
				//空の場合は無視
				if ("" == ret.text) {
					break;
				}

				//全角数値を半角数値に変換する。
				var halfText = this.castNumber(ret.text);
				if (ret.text != halfText) {
					ret.isRewrite = true;
					ret.text = halfText;
				}

				//数値変換できるか？
				if (!jQuery.isNumeric(ret.text)) {
					//できない場合、どの程度できないか？
					// "a" => 不明なので無視。
					// "3a0" => "30"にする
					// "30a" => "30"にする
					var tmpText = this.deleteWithoutNumber(ret.text);
					if ("" == ret.text) {
						//無効値として終了
						break;
					}

					//念のため数値チェック
					if (!jQuery.isNumeric(tmpText)) {
						//無効値として終了
						break;
					}

					//数値化した値を用意し、処理続行
					ret.isRewrite = true;
					ret.text = tmpText;
				}

				//数値にしてみる
				//小数以下は無視する
				var tmpValue = Math.ceil(Number(ret.text));
				if (Number(ret.text) != tmpValue || String(tmpValue) != ret.text) {
					ret.isRewrite = true;
					ret.text = String(tmpValue);
				}

				//範囲確認
				if (tmpValue > this.setting.maxValue) {
					ret.isRewrite = true;
					tmpValue = this.setting.maxValue;
					ret.text = String(this.setting.maxValue);
				}
				if (tmpValue < this.setting.minValue) {
					ret.isRewrite = true;
					tmpValue = this.setting.minValue;
					ret.text = String(this.setting.minValue);
				}

				//正当性確認終了
				ret.value = tmpValue;
				ret.isValid = true;
				break;
			}

			return ret;
		};

		//ボタンによる数値変更
		this.changeValueByButton = function(isPlus) {

			//-------------------
			//編集前の値をバリデート
			var result;
			while (true) {
				result = this.validate();
				if (!result.isValid) {
					break;
				}

				//更新確認
				if (this.preValue == result.value) {
					break;
				}

				//書き換え
				if (result.isRewrite) {
					var tmpIsForce = isForce;
					this.isForce = true;
					$("#" + this.setting.textBoxId).val(result.text);
					this.isForce = tmpIsForce;
				}
				break;
			}
			//内部データ更新
			this.preValue = result.value;
			//-------------------

			//現在の値を取得
			var value = this.preValue;
			if (isPlus) {
				value += this.setting.changeValue;
			} else {
				value -= this.setting.changeValue;
			}

			if (value > this.setting.maxValue) {
				value = this.setting.maxValue;
			}
			if (value < this.setting.minValue) {
				value = this.setting.minValue;
			}

			if (value == this.preValue) {
				return;
			}

			$("#" + this.setting.textBoxId).val(value).trigger("change");
		};

		//nudスタイル等初期化
		this.initNud = function() {

			var textBox = $("#" + this.setting.textBoxId);
			var rawTextBox = textBox.get()[0];

			/*
			//テキストボックス用意（入れ替える）
			var textBoxHTML = this.sprintf(
				"<input type='text' id='{0}' value='{1}' style='" +
				"width: {2}; height: 18px; text-align: right; background-color: {3}; color: {4}; border: 1px solid {5}; padding-right: 4px; margin-right: 12px;'>",
				[this.setting.textBoxId, this.setting.defaultValue, this.setting.textBoxWidth, this.setting.defaultBackgroundColor, this.setting.defaultColor, this.setting.defaultBorderColor]);

			//ボタン用意
			var unselectableCSS = "-moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;";

			var minusHTML = this.sprintf(
				"<img id='{0}' src='{1}' " +
				"style='display: inline-block; width: 15px; height: 9px; border: 1px solid {2}; background-color: {3}; position: relative; left: -29px; top: 6px;{4}'>",
				[this.setting.id + "_minus", this.setting.minusImage, this.setting.defaultBorderColor, this.setting.defaultBackgroundColor, unselectableCSS]);
			var plusHTML = this.sprintf(
				"<img id='{0}' src='{1}' " +
				"style='display: inline-block; width: 15px; height: 9px; border: 1px solid {2}; background-color: {3}; position: relative; left: -12px; top: -5px;{4}'>",
				[this.setting.id + "_plus", this.setting.plusImage, this.setting.defaultBorderColor, this.setting.defaultBackgroundColor, unselectableCSS]);

			//divで囲む
			var divHTML = this.sprintf("<div id='{0}' style='display:{1}'>{2}{3}{4}</div>",
				[this.setting.id, this.setting.displayStyle, textBoxHTML, plusHTML, minusHTML]);
			*/

			var divHTML = this.sprintf(
				"<span id='{0}' class=\"nud_base\">" +
				"<input type='text' class='nud_text' id='{2}' value='{3}'>" +
				"<span class=\"nud_plus_base unselectable\" id='{0}_plus'></span><span class=\"nud_plus_text unselectable\">＋</span>" + 
				"<span class=\"nud_minus_base unselectable\" id='{0}_minus'></span><span class=\"nud_minus_text unselectable\">－</span>" + 
				"</span>",
				[ 
					this.setting.id,
					this.setting.displayStyle,
					this.setting.textBoxId,
					this.setting.defaultValue,
				]
			);

			//HTML入れ替え
			rawTextBox.outerHTML = divHTML;

			//イベント設定
			for (var i = 0;i < 2;i++) {
				var id = this.setting.id + "_" + (0 == i ? "minus" : "plus");
				$("#" + id).on("mouseover", this, this.onMouseOverButton);
				$("#" + id).on("mouseout",  this, this.onMouseOutButton);
				$("#" + id).on("mousedown", this, this.onMouseDownButton);
				$("#" + id).on("mouseup",   this, this.onMouseUpButton);
			}
			//$("#" + this.setting.textBoxId).on("click blur keydown keyup keypress change", this, this.onChangeValue);
			$("#" + this.setting.textBoxId).on("blur", this, this.onChangeCompleteValue);

			//初期値
			this.preValue = this.setting.defaultValue;
		};

		//初期化
		this.init = function(elem, conf) {
			this.elem = elem;

			var defaults = {
				id: "jqnud_" + Math.floor(Math.random() * 1000000),
				textBoxId: $(this.elem).attr("id"),
				textBoxWidth: "32px",
				maxValue: 50,
				minValue: 1,
				defaultValue: 1,
				changeValue: 1,
				onChange: null,
				displayStyle: "inline",

				plusImage: "image/sys/nud_plus.png",
				minusImage: "image/sys/nud_minus.png",

				defaultBorderColor: "#ffffff",
				hoverBorderColor: "#ffffff",
				pressBorderColor: "#ffffff",
				disabledBorderColor: "#808080",

				defaultBackgroundColor: "#000000",
				hoverBackgroundColor: "#406080",
				pressBackgroundColor: "#6080d0",
				disabledBackgroundColor: "#000000",

				defaultColor: "#ffffff",
				disabledColor: "#808080"
			};

			this.setting = $.extend(defaults, conf);

			this.initNud();
		};

		//専用util//////////////////////////////////

		//簡易sprintf
		this.sprintf = function(text, values) {
			var ret = text;

			for (var i = 0;i < values.length;i++) {
				ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
			}
			return ret;
		};

		//全半角数値置換
		this.castNumber = function(a) {
			return a.replace(/[０１２３４５６７８９]/g
				, function(a){
					var b = "０１２３４５６７８９".indexOf(a);
					return (b !== -1)? b:a;
				}
			);
		};

		//半角数値以外を削除
		this.deleteWithoutNumber = function(inStr) {
			var strMatch = inStr.match(/[0-9]/g);
			var rtnMatch = "";
			try {
				for (var i = 0; i < strMatch.length; i++) {
					rtnMatch = rtnMatch + strMatch[i];
				}
			} catch (e) {}
			return rtnMatch;
		};

	};

	$.fn.jqNud = function(options) {
		var obj = new jqNud();
		obj.init(this, options);

		jqNudMap[obj.setting.id] = obj;

		return obj;
	};

})( jQuery );

