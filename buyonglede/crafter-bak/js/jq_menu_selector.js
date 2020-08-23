/*
 *  jquery-boilerplate - v3.4.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.


;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "menuSelector";
	var defaults = {};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend({
		}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		//初期化
		init: function () {
			this._initGlobalHandler();
			this._createSelectBase();
			this._createSelector();
		},

		//セレクタベース作成
		_createSelectBase: function() {
			$(this.element).css("width", this.settings.base.width);
			$(this.element).addClass("sm_base");
			$(this.element).html(this._drawSelectedItem());

			//イベント設定
			$(this.element).on("click", {ms: this}, this.onClickBase);
		},

		//選択中アイテム描画
		_drawSelectedItem: function() {
			var html = "";
			if (null != this.settings.base.drawSelectedItem) {
				html = this.settings.base.drawSelectedItem(this, this.settings.base.selectedItem);
			} else {
				html = sprintf(
					"<span class=\"sm_selected_image\" ><img src=\"{0}\" /></span>" +
					"<span class=\"sm_selected_text\">{1}</span>", [
					this.settings.base.selectedItem["image"],
					this.settings.base.selectedItem["title"]
				]);
			}
			html += "<span class=\"sm_selected_dd\">▼</span>";

			html = "<div style=\"display: table;width: 100%; height: 100%\">" + html + "</div>";

			return html;
		},

		//セレクタ作成
		_createSelector: function() {
			var id = $(this.element).attr("id");

			//幅計算
			var w = 0;
			for (var i in this.settings.menus) {
				w += parseInt(this.settings.menus[i].width);
			}
			w += parseInt(this.settings.items.width);

			//セレクタベース
			var html = "";
			var h = parseInt(this.settings.selector.height);
			html += sprintf("<div class=\"sm_selector_base\" id=\"{0}_selector\" style=\"width: {1}px;height:{2}px;display: none\">", [
				id, w, h
			]);

			if (0 != this.settings.menus.length) {
				//メニューベース
				html += sprintf("<div style=\"width: {0}px;float:left\">", [w - parseInt(this.settings.items.width)]);

				//テキスト検索
				if (this.settings.selector.textFilter) {
					html += "<div>";
					html += sprintf("<input type=\"text\" id=\"{0}_textfilter\" class=\"search_text\" style=\"width: {1}px;position:absolute;\" placeholder=\"{2}\">", [
						id,
						w - parseInt(this.settings.items.width) - 4,
						this.settings.selector.textPlaceholder
					]);
					html += sprintf("<span id=\"{0}_textclear\" class=\"search_text_clear\" style=\"left:{1}px\">×</span>", [
						id,
						w - parseInt(this.settings.items.width) - 20
					]);
					html += "</div>";
				}
				//メニュー
				for (var i in this.settings.menus) {
					html += this._createMenuList(i);
				}
				html += "</div>";
			}

			//アイテムベース
			html += sprintf("<div style=\"width: {0}px;float:left\">", [ parseInt(this.settings.items.width) ]);
			//アイテム
			html += this._createItemList();
			html += "</div>";

			html += "</div>"; // end sm_selector_base
			$(html).insertAfter($(this.element));

			//イベント設定
			if (0 != this.settings.menus.length) {
				for (var i in this.settings.menus) {
					$("#" + id + "_menus_" + i + " div.menu").on("click", {ms: this, menuIndex: i}, this.onClickMenu);
				}
			}
			$("#" + id + "_items").on("scroll resize", {ms: this}, this.onScrollItemList);
			$("#" + id + "_items div.item").on("click", {ms: this}, this.onClickItem);
			if (this.settings.selector.textFilter) {
				$("#" + id + "_textfilter").on("change keyup keydown keypress", {ms: this}, this.onChangeTextFilter);
				$("#" + id + "_textclear").on("click", {ms: this}, this.onClickClearText);
			}
		},

		//メニュー作成
		_createMenuList: function(menuIndex) {
			var h = parseInt(this.settings.selector.height) - 1;
			if (this.settings.selector.textFilter) {
				h -= 20;
			}
			var html = sprintf("<div class=\"menu_list\" id=\"{0}_menus_{1}\" style=\"width: {2}px;height: {3}px\">", [
				$(this.element).attr("id"), menuIndex, 
				parseInt(this.settings.menus[menuIndex].width),
				h
			]);
			html += this._createMenuListContents(menuIndex);
			html += "</div>";
			return html;
		},

		//メニュー更新
		//  上位メニュー変更時に呼び出される
		_updateMenuList: function(menuIndex) {
			var id = $(this.element).attr("id");

			//変更前の選択肢
			var currentSelectedMenu = this.settings.menus[menuIndex].selectedMenu;
			var currentHTML = $("#" + id + "_menus_" + menuIndex).html();

			//新しいHTMLを作成
			var newHTML = this._createMenuListContents(menuIndex);

			//変更がなければ何もしない
			if (currentHTML == newHTML) {
				return;
			}

			//変更前の選択肢が存在するか？
			if (-1 != this.settings.menus[menuIndex].currentMenuList.indexOf(currentSelectedMenu)) {
				// 存在する場合は何もしない
			} else {
				// 存在しない場合は0番目の要素を強制選択する
				this.settings.menus[menuIndex].selectedMenu = this.settings.menus[menuIndex].currentMenuList[0];
				var tmpHTML = $("<p>").append($(newHTML));
				tmpHTML.find("[x-menu-list-index=0]").addClass("active");
				newHTML = $(tmpHTML).html();
			}

			//適用＆イベント再設定
			$("#" + id + "_menus_" + menuIndex + " div.menu").off("click");
			$("#" + id + "_menus_" + menuIndex).html(newHTML);
			$("#" + id + "_menus_" + menuIndex + " div.menu").on("click", {ms: this, menuIndex: menuIndex}, this.onClickMenu);
		},

		//メニュー一覧作成
		_createMenuListContents: function(menuIndex) {
			var list = null;
			if ("function" == typeof(this.settings.menus[menuIndex].menuList)) {
				list = this.settings.menus[menuIndex].menuList(this);
			} else {
				list = this.settings.menus[menuIndex].menuList;
			}
			this.settings.menus[menuIndex].currentMenuList = list;

			var html = "";
			html = sprintf(
				"<div class=\"menu menu_title\" style=\"width: {0}px\"><span>{1}</span></div>", [
				parseInt(this.settings.menus[menuIndex].width) - 1,
				escapeHTML(this.settings.menus[menuIndex].menuTitle)
			]);
			for (var i in list) {
				html += this._drawMenu(menuIndex, i, list[i]);
			}
			return html;
		},

		//メニュー描画
		_drawMenu: function(menuIndex, menuListIndex, menu) {
			var html = "";
			if (null != this.settings.menus[menuIndex].drawMenu) {
				html = this.settings.menus[menuIndex].drawMenu(this, menu);
			} else {
				html = sprintf(
					"<div class=\"menu\" style=\"width: {0}px\" x-menu-index=\"{2}\" x-menu-list-index=\"{3}\"><span>{1}</span></div>", [
					parseInt(this.settings.menus[menuIndex].width) - 1, 
					escapeHTML(menu),
					menuIndex,
					menuListIndex
				]);
			}
			if (menu == this.settings.menus[menuIndex].selectedMenu) {
				html = $(html).addClass("active").outerHTML();
			}
			return html;
		},

		//アイテムリスト作成
		_createItemList: function() {
			var html = sprintf("<div class=\"item_list\" id=\"{0}_items\" style=\"width: {1}px;height: {2}px\">", [
				$(this.element).attr("id"),
				parseInt(this.settings.items.width),
				parseInt(this.settings.selector.height)
			]);
			html += this._createItemListContents();
			html += "</div>";
			return html;
		},

		//アイテムリスト更新
		_updateItemList: function() {
			var id = $(this.element).attr("id");

			//変更前の選択肢
			var currentHTML = $("#" + id + "_items").html();

			//新しいHTMLを作成
			var newHTML = this._createItemListContents();

			//変更がなければ何もしない
			if (currentHTML == newHTML) {
				return;
			}

			//選択肢の有無にかかわらず何もしない。
			//選択肢が消えている場合は null 設定するべきだが、選択確定ではないので影響はない。

			//適用＆イベント再設定
			$("#" + id + "_items div.item").off("click");
			$("#" + id + "_items").html(newHTML);
			$("#" + id + "_items div.item").on("click", {ms: this}, this.onClickItem);

			//画像読み込み（遅延ロード）
			this.onScrollItemList({data: {ms: this}});
		},

		//アイテム一覧作成
		_createItemListContents: function() {
			var list = null;
			if ("function" == typeof(this.settings.items.itemList)) {
				list = this.settings.items.itemList(this);
			} else {
				list = this.settings.items.itemList;
			}
			this.settings.items.currentItemList = list;
			var html = "";
			for (var i in list) {
				html += this._drawItem(i, list[i]);
			}
			return html;
		},

		//アイテム描画
		_drawItem: function(itemIndex, item) {
			var w = parseInt(this.settings.items.width);
			if (null != this.settings.items["itemWidth"]) {
				w = parseInt(this.settings.items.itemWidth);
			}
			var isImageLazyLoad = false;
			if (null != this.settings.items["imageLazyLoad"] && this.settings.items["imageLazyLoad"]) {
				isImageLazyLoad = true;
			}


			var html = "";
			var imageHTML = "";
			if (null != this.settings.items.drawItem) {
				html = this.settings.items.drawItem(this, itemIndex, item);
			} else {
				if (isImageLazyLoad) {
					imageHTML = sprintf("<img src=\"/crafter/image/sys/clear.png\" x-img-status=\"0\" x-img-org=\"{0}\" class=\"item_image\">", [ escapeHTML(item["image"]) ]);
				} else {
					imageHTML = sprintf("<img src=\"{0}\" class=\"item_image\">", [ escapeHTML(item["image"]) ]);
				}
				html = sprintf(
					"<div class=\"item\" style=\"width: {0}px\" x-item-index=\"{4}\">" + 
					"<table><tr valign=\"top\">" + 
					"<td>{1}</td>" + 
					"<td><span class=\"item_title\">{2}</span><br><span class=\"item_desc\">{3}</span></td>" + 
					"</tr></table>" + 
					"</div>", [
					w,
					imageHTML,
					escapeHTML(item["title"]),
					escapeHTML(item["desc"]),
					escapeHTML(itemIndex),
					
				]);
			}
			return html;
		},

		//テキスト入力
		onChangeTextFilter: function(e) {
			var ms = e.data.ms;
			var textInput = e.target;
			var text = $(e.target).val();
			ms.settings.selector.text = text;
			if (null != ms.settings.selector.onChangeText) {
				ms.settings.selector.onChangeText(ms, text);
			}
		},

		//テキストクリア
		onClickClearText: function(e) {
			var ms = e.data.ms;
			var id = $(ms.element).attr("id");
			$("#" + id + "_textfilter").val("");
		},

		//メニュークリック
		onClickMenu: function(e) {
			var activeMenu = e.currentTarget;
			if ($(activeMenu).hasClass("menu_title")) {
				return;
			}

			var ms = e.data.ms;
			var menuIndex = $(activeMenu).attr("x-menu-index");
			var menuListIndex = $(activeMenu).attr("x-menu-list-index");
			var value = ms.settings.menus[menuIndex].currentMenuList[menuListIndex];
			ms.settings.menus[menuIndex].selectedMenu = value;

			$(activeMenu).parent().find("div").removeClass("active");
			$(activeMenu).addClass("active");

			//テキスト検索を無効化
			ms.settings.selector.text = "";

			//下位メニューの更新
			for (var i = Number(menuIndex) + 1;i < ms.settings.menus.length;i++) {
				ms._updateMenuList(i);
			}

			//アイテムリストの更新
			ms._updateItemList(i);
		},

		//メニュー強制選択
		forceSelectMenu: function(menuIndex, value) {
			if (this.settings.menus.length <= value) {
				return;
			}
			var menuListIndex = -1;
			for (var i in this.settings.menus[menuIndex].currentMenuList) {
				if (this.settings.menus[menuIndex].currentMenuList[i] == value) {
					menuListIndex = i;
					break;
				}
			}
			if (-1 != menuListIndex) {
				this.settings.menus[menuIndex].selectedMenu = value;
				var id = $(this.element).attr("id");
				var activeMenu = $("#" + id + "_menus_" + menuIndex + " div.menu[x-menu-list-index=" + menuListIndex + "]");
				$(activeMenu).parent().find("div").removeClass("active");
				$(activeMenu).addClass("active");

				//テキスト検索を無効化
				this.settings.selector.text = "";

				//下位メニューの更新
				for (var i = Number(menuIndex) + 1;i < this.settings.menus.length;i++) {
					this._updateMenuList(i);
				}

				//アイテムリストの更新
				this._updateItemList(i);
			}
		},

		//アイテムクリック
		onClickItem: function(e) {
			var activeMenu = e.currentTarget;
			var ms = e.data.ms;
			var itemIndex = $(activeMenu).attr("x-item-index");
			var value = ms.settings.items.currentItemList[itemIndex];
			var isUpdated = (ms.settings.base.selectedItem != value);
			ms.settings.base.selectedItem = value;

			//ベース更新
			$(ms.element).html(ms._drawSelectedItem());

			//ハンドラ呼び出し
			if (null != ms.settings.selector.onChangeItem) {
				ms.settings.selector.onChangeItem(ms, value, isUpdated);
			}

			//セレクタ終了
			ms.closeSelector();
		},

		//アイテム強制選択
		forceSelectItem: function(value) {
			this.settings.base.selectedItem = value;

			//ベース更新
			$(this.element).html(this._drawSelectedItem());

			//ハンドラ呼び出し
			if (null != this.settings.selector.onChangeItem) {
				this.settings.selector.onChangeItem(this, value, true);
			}
		},

		//セレクタ起動
		onClickBase: function(e) {
			var ms = e.data.ms;
			var id = $(ms.element).attr("id");
			var selectorId = id + "_selector";
			var positionText = ms.settings.selector.selectorPosition;

			//既に開いているのであれば閉じる
			if ($("#" + selectorId).is(":visible")) {
				ms.closeSelector();
				return;
			}

			//起点情報
			var baseRect = {
				left: $("#" + id).offset().left,
				top: $("#" + id).offset().top,
				width: $("#" + id).width(),
				height: $("#" + id).height(),
			};
			//セレクタ情報
			var selectorRect = {
				left: $("#" + selectorId).offset().left,
				top: $("#" + selectorId).offset().top,
				width: $("#" + selectorId).width(),
				height: $("#" + selectorId).height(),
			};

			//左右位置
			var left = 0;
			if (-1 != positionText.indexOf("left")) {
				//左寄せ＝ベースとセレクタの左を同じにする
				left = baseRect.left;

			} else if (-1 != positionText.indexOf("right")) {
				//右寄せ＝ベースとセレクタの右を同じにする
				left = baseRect.left + baseRect.width + 8  - selectorRect.width;

			} else {
				//中央寄せ
				left = baseRect.left + baseRect.width / 2 - selectorRect.width / 2;
			}

			//上下位置
			var top = 0;
			if (-1 != positionText.indexOf("bottom")) {
				//下＝ベースの下とセレクタの上を合わせる
				top = baseRect.top + baseRect.height;
			} else if (-1 != positionText.indexOf("top")) {
				//上＝ベースの上とセレクタの下を合わせる
				top = baseRect.top - selector.height;
			} else {
				//中央寄せ
				top = baseRect.top + baseRect.height / 2 - selectorRect.height / 2;
			}

			//移動・表示
			$("#" + selectorId).css("left", left + "px");
			$("#" + selectorId).css("top", top + "px");
			$("#" + selectorId).zIndex(99900);
			$("#" + selectorId).show();

			//スクロール検知強制発動
			ms.onScrollItemList({data: {ms: ms}});
		},

		//セレクタ終了
		closeSelector: function() {
			//非表示化
			var id = $(this.element).attr("id");
			$("#" + id + "_selector").hide();
		},

		//アイテムスクロール検知
		onScrollItemList: function(e) {
			if (null != e.data.ms.settings.items["imageLazyLoad"] && e.data.ms.settings.items["imageLazyLoad"]) {
			} else {
				return;
			}

			var baseId = $(e.data.ms.element).attr("id");
			var imageListBase = $("#" + baseId + "_items");
			if (!$(imageListBase).is(":visible")) {
				return;
			}

			var visibleTop = $(imageListBase).offset().top;// + $(imageListBase).scrollTop();
			var visibleBottom = visibleTop + $(imageListBase).height();

			$("#" + baseId + "_items img").each(function() {
				//imageHTML = sprintf("<img src=\"/crafter/image/sys/clear.png\" x-img-status=\"0\" x-img-org=\"{0}\" class=\"item_image\">", [ escapeHTML(item["image"]) ]);
				//var tmpTitle = $(".item_title", $(this).parent().parent().parent().parent()).text();

				var status = $(this).attr("x-img-status");
				if (null == status || "0" != status) {
					return;
				}
				var imgTop = $(this).offset().top;
				var imgBottom = imgTop + $(this).height();

				if ((imgTop >= visibleTop && imgTop <= visibleBottom) || 
					(imgBottom >= visibleTop && imgBottom <= visibleBottom)) {
					//console.log(sprintf(tmpTitle + ":    show: visible({0}-{1}), img({2})", [visibleTop, visibleBottom, imgTop]));
				} else {
					//console.log(sprintf(tmpTitle + ": no show: visible({0}-{1}), img({2})", [visibleTop, visibleBottom, imgTop]));
					return;
				}
				$(this).attr("x-img-status", "1");
				$(this).css("opacity", "0");
				$(this).on("load", function() { $(this).animate({opacity: 1}, 500) });
				$(this).attr("src", $(this).attr("x-img-org"));
			});
		},

		//グローバルハンドラ設定
		_initGlobalHandler: function() {
			//クリック確認（メニュークローズ用）
			$(document).on("click", {ms: this}, this.onClickDocument);

			//メニュー上のホイールスクロールにて、コンテンツをスクロールさせないための処理
			var scrollEvent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
			$("body").on(scrollEvent, {selector: this}, this.onWheelDocument);
		},

		onWheelDocument: function(e) {
			//処理初期化
			var obj = e.target;
			var isIgnoreDocumentScroll = false;

			for (var i = 0;i < 100;i++) { //無限ループ抑止用
				if (null == obj || 0 == obj.length) {
					break;
				}
				if ($(obj).hasClass("item_list") || $(obj).hasClass("menu_list")) {
					//対象オブジェクトのスクロール状況を確認
					var scHeight = $(obj).get(0).scrollHeight;
					var scTop = $(obj).get(0).scrollTop;
					var arHeight = $(obj).height();

					//最上位までスクロールしていて、かつ上にスクロールしようとしている場合、
					//最下部までスクロールしていて、かつ下にスクロールしようとしている場合に、
					//スクロール抑止
					if ((0 == scTop && e.originalEvent.deltaY < 0) || 
						(scTop + arHeight >= scHeight && e.originalEvent.deltaY > 0)) {
						isIgnoreDocumentScroll = true;
						break;
					}

					//スクロール抑止しない場合でもそれ以上チェックする必要はないため、break
					break;
				}
				obj = $(obj).parent();
			}

			//抑止処理
			if (isIgnoreDocumentScroll) {
				e.preventDefault();
			}
		},

		onClickDocument: function(e) {
			var ms = e.data.ms;
			var id = $(ms.element).attr("id");
			var selectorId = id + "_selector";

			//セレクタ非表示中であれば何もしない
			if (!$("#" + selectorId).is(":visible")) {
				return;
			}

			//セレクタ表示中であれば、[id] または [id]_selector 以外をクリックされていたときに、セレクタを閉じる
			var obj = e.target;
			if (null == obj) {
				return;
			}
			var isMySelector = false;
			while (true) {
				var tmpId = $(obj).attr("id");
				if (tmpId == id || tmpId == selectorId) {
					isMySelector = true;
					break;
				}
				obj = $(obj).parent();
				if (0 == obj.length) {
					break;
				}
			}
			if (isMySelector) {
				return;
			}

			ms.closeSelector();
		}

	});

	function sprintf(text, values) {
		var ret = text;

		for (var i = 0;i < values.length;i++) {
			ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
		}

		return ret;
	}

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

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );
