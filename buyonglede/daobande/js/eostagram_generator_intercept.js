/**
 * 定義
 */
var filters = {
	"sepia":       {"name": "セピア化フィルタ", "type": "onoff"},
	"monochrome":  {"name": "モノクロ化フィルタ", "type": "onoff"},
	"instagram":   {"name": "インスタ風フィルタ", "type": "onoff"},
	"contrast":    {"name": "コントラスト調整", "type": "slider", "max": 127, "min": -127, "default": 0},
	"reflection":  {"name": "水面反射", "type": "slider", "max": 300, "min": 0, "default": 0},
};

/**
 * 割り込み初期化
 */
$(function(){

	//フィルタ選択追加
	addFiltersForm();

	$('#update').on('click',function(){

		//追加フィルタ処理
		filteringImage();

		//フィルタ処理後にイメージを再構成
		createDownloadImage();

		//ダウンロードリンク出力
		showDownloadLink();
	});


});

/**
 * 追加フィルタ処理
 */
function filteringImage() {
/*
$("#result").parent().removeClass("display_none");
$("#frame_white").hide();
$("#frame_black").hide();
$("#filter_vignette").hide();
$("#filter_color_blue").hide();
$("#filter_color_yellow").hide();
*/
	if ($("#sepia_filter_on").prop("checked")) {
		applySepiaFilter();
	}
	if ($("#monochrome_filter_on").prop("checked")) {
		applyMonochromeFilter();
	}
	if ($("#instagram_filter_on").prop("checked")) {
		applyInstagramFilter();
	}

	applyReflection();

	applyContrastTuning();

}

/**
 * インスタ風
 */
function applyInstagramFilter() {
	var w = stage.width;
	var h = stage.height;

	var colorSize = 4;

	$("#tmp").remove();
	$("body").append("<canvas id='tmp' width='" + w + "' height='" + h + "'>");
	var texture = document.getElementById('tmp');
	var gradientContext = texture.getContext('2d');
	var gradient = context.createRadialGradient(768 / 2, 768 / 2, 0, 768 / 2, 768 / 2, 768 * 0.6);

	gradient.addColorStop(0, "#804e0f");
	gradient.addColorStop(1, "#3b003b");

	gradientContext.fillStyle = gradient;
	gradientContext.fillRect(0, 239, 768, 768);

	var screen = blend(context, gradientContext, function(bottomPixel, topPixel) {
		return Math.floor(255 - (255 - topPixel * 0.5) * (255 - bottomPixel * 1) / 255);
	});

	// (0,239)-(w768,h768) の範囲のみコピーする
	//context.putImageData(screen, 0, 0);

	var imageData = context.getImageData(0, 0, w, h);
	var colorSize = 4;
	for (var y = 239;y < 239 + 768;y++) {
		for (var x = 0;x < 768;x++) {
			var idx = y * (w * colorSize) + x * colorSize;
			imageData.data[idx + 0] = screen.data[idx + 0];
			imageData.data[idx + 1] = screen.data[idx + 1];
			imageData.data[idx + 2] = screen.data[idx + 2];
		}
	}

	context.putImageData(imageData, 0, 0);
}
function blend (background, foreground, transform) {
	var w = stage.width;
	var h = stage.height;

	var bottom = background.getImageData(0, 0, w, h);
	var top = foreground.getImageData(0, 0, w, h);

	//フィルタ適用範囲は (0,239)-(w768,h768)
	var colorSize = 4;

	for (var y = 0;y < h;y++) {
		for (var x = 0;x < w;x++) {
			var idx = y * (w * colorSize) + x * colorSize;

			if (y >= 239 && y < 239 + 768) {
				top.data[idx + 0] = transform(bottom.data[idx + 0], top.data[idx + 0]);
				top.data[idx + 1] = transform(bottom.data[idx + 1], top.data[idx + 1]);
				top.data[idx + 2] = transform(bottom.data[idx + 2], top.data[idx + 2]);
			} else {
				top.data[idx + 0] = bottom.data[idx + 0];
				top.data[idx + 1] = bottom.data[idx + 1];
				top.data[idx + 2] = bottom.data[idx + 2];
			}
		}
	}

	return top;
}

/**
 * 反射
 */
function applyReflection() {
	var w = stage.width;
	var h = stage.height;

	//反射位置は最下部からのY距離。
	var border =$("#reflection_slider").val();
	if (0 == border) {
		return;
	}
	var imageData = context.getImageData(0, 0, w, h);

	var colorSize = 4;
	var baseY = 239 + 768 - border;
	for (var i = 0;i < border;i++) {
		for (var x = 0;x < 768;x++) {
			var y = baseY + i;
			var copyY = baseY - (y - baseY) - 1;
			var idx = y * (w * colorSize) + x * colorSize;
			var cpIdx = copyY * (w * colorSize) + x * colorSize;
			var v = (border - i) / border * 0.2;
			imageData.data[idx + 0] = Math.floor(imageData.data[cpIdx + 0] * v);
			imageData.data[idx + 1] = Math.floor(imageData.data[cpIdx + 1] * v);
			imageData.data[idx + 2] = Math.floor(imageData.data[cpIdx + 2] * v);
		}
	}

	context.putImageData(imageData, 0, 0);
}


/**
 * コントラスト調整
 */
function applyContrastTuning() {
	var w = stage.width;
	var h = stage.height;

	//調整係数は -127～127
	var ct = $("#contrast_slider").val();
	if (0 == ct) {
		return;
	}
	var imageData = context.getImageData(0, 0, w, h);

	//フィルタ適用範囲は (0,239)-(w768,h768)
	var colorSize = 4;
	for (var y = 239;y < 239 + 768;y++) {
		for (var x = 0;x < 768;x++) {
			var idx = y * (w * colorSize) + x * colorSize;
			imageData.data[idx + 0] = calcContrast(imageData.data[idx + 0], ct);
			imageData.data[idx + 1] = calcContrast(imageData.data[idx + 1], ct);
			imageData.data[idx + 2] = calcContrast(imageData.data[idx + 2], ct);
		}
	}

	context.putImageData(imageData, 0, 0);
}
function calcContrast(v, ct) {
	var aa;
	if (ct > 0) {
		aa = 255 / (255 - (ct * 2));
	} else {
		aa = (255 + (ct * 2)) / 255;
	}

	var ret = Math.floor((aa * (v - 127)) + 127);

	if (ret < 0) {
		ret = 0;
	}
	if (ret > 255) {
		ret = 255;
	}
	return ret;
}


/**
 * セピア化フィルタ適用
 */
function applySepiaFilter() {
	var w = stage.width;
	var h = stage.height;

	var imageData = context.getImageData(0, 0, w, h);

	//フィルタ適用範囲は (0,239)-(w768,h768)
	var colorSize = 4;
	for (var y = 239;y < 239 + 768;y++) {
		for (var x = 0;x < 768;x++) {
			var idx = y * (w * colorSize) + x * colorSize;
			var v = imageData.data[idx + 0] * 0.299 + imageData.data[idx + 1] * 0.587 + imageData.data[idx + 2] * 0.114;
			if (v > 255) {
				v = 255;
			}
			v /= 255;

			imageData.data[idx + 0] = parseInt(v * 240);
			imageData.data[idx + 1] = parseInt(v * 200);
			imageData.data[idx + 2] = parseInt(v * 145);
		}
	}

	context.putImageData(imageData, 0, 0);
}

/**
 * モノクロ化フィルタ適用
 */
function applyMonochromeFilter() {

	var w = stage.width;
	var h = stage.height;

	var imageData = context.getImageData(0, 0, w, h);

	//フィルタ適用範囲は (0,239)-(w768,h768)
	var colorSize = 4;
	for (var y = 239;y < 239 + 768;y++) {
		for (var x = 0;x < 768;x++) {
			var idx = y * (w * colorSize) + x * colorSize;
			var v = imageData.data[idx + 0] * 0.2126 + imageData.data[idx + 1] * 0.7152 + imageData.data[idx + 2] * 0.0722;
			if (v > 255) {
				v = 255;
			}
			imageData.data[idx + 0] = v;
			imageData.data[idx + 1] = v;
			imageData.data[idx + 2] = v;
		}
	}

	context.putImageData(imageData, 0, 0);
}

/**
 * カラーレンジ制限
 */
function checkColorRange(v) {
	var ret = v;
	if (ret > 255) {
		ret = 255;
	}
	if (ret < 0) {
		ret = 0;
	}
	return ret;
}


/**
 * フィルタ追加
 */
function addFiltersForm() {
	var html = "";
	for (var i in filters) {
		if ("onoff" == filters[i].type) {
			html += sprintf(
				' <div class="input_data_layout">' + "\n" +
				' <p>{0}</p>' + "\n" +
				' <label><input type="radio" name="{1}_filter" id="{1}_filter_on" value="オン">オン</label>' + "\n" +
				' <label><input type="radio" name="{1}_filter" id="{1}_filter_off" value="オフ" checked>オフ</label>' + "\n" +
				' </div><br>' + "\n\n" ,
				[filters[i].name, i]
			);

		} else if ("slider" == filters[i].type) {
			html += sprintf(
				' <div class="input_data_layout">' + "\n" +
				' <p>{0}</p>' + "\n" +
				' <label><input type="range" name="{1}_slider" id="{1}_slider" min="{2}" max="{3}" value="{4}">' + "\n" +
				' <input type="button" value="リセット" onclick="{1}_slider.value = 0" style="margin:4px; padding:4px">' + "\n" +
				' </div><br>' + "\n\n" ,
				[filters[i].name, i, filters[i].min, filters[i].max, filters[i].default]
			);

		}
	}
	$("#update").before(html);
}

/**
 * ダウンロードリンク出力
 */
function showDownloadLink() {
	if ("br" == $("#download_item").next().next()[0].tagName.toLowerCase()) {
		$("#download_item").next().after("<a href='javascript:void(0)' onclick='downloadImage()' class='btn_M center dl_link' style='margin-left:10px'>ダウンロード</a><br>");
	}
}

/**
 * ダウンロードリンク押下時処理
 */
function downloadImage() {
	var data = $("#download_item").attr("src");

	if (window.navigator.msSaveBlob) {
		//IE系

	    // Base64からバイナリへ変換
	    var bin = atob(data.replace(/^.*,/, ''));
	    var buffer = new Uint8Array(bin.length);
	    for (var i = 0; i < bin.length; i++) {
	        buffer[i] = bin.charCodeAt(i);
	    }
	    // Blobを作成
	    var blob = new Blob([buffer.buffer], {
	        type: "image/png"
	    });
		window.navigator.msSaveBlob(blob, "eostagram_image.png");

	} else {
		//それ以外
		$("#data_download").remove();

		var a = document.createElement("a");
		a.id = "data_download";
		document.body.appendChild(a);
		a.download = "eostagram_image.png";
		a.href = data;
		a.target = "_self";
		a.click();
	}
}


/**
 * 簡易sprintf
 */
function sprintf(text, values) {
	var ret = text;

	for (var i = 0;i < values.length;i++) {
		ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
	}

	return ret;
}

