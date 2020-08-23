//*****************************************************************
//レシピ詳細
//*****************************************************************

var nodeIndex = 0;
var shardInfo = {
	"fire1": "27623d06a42",
	"ice1": "f2dfd367f1e",
	"wind1": "843899bc8f6",
	"earth1": "ef4394eb49b",
	"thunder1": "6fed6129996",
	"water1": "9f967ad6b5a",
	"fire2": "75403105d7f",
	"ice2": "2d800a06851",
	"wind2": "5db117cd77b",
	"earth2": "ff6eae7bdcb",
	"thunder2": "b21a951916e",
	"water2": "44d3f4cb26b",
	"fire3": "e8ccb4b1f81",
	"ice3": "4dbe0ec0a76",
	"wind3": "b61cbfd2d6e",
	"earth3": "c97c6825890",
	"thunder3": "06061fd121b",
	"water3": "e3d82488f80",
};


//レシピ詳細表示
function setRecipeDetail(item, recipe) {

	//初期化
	clearRecipeDetail();

	//基本情報
	$("#recipe_detail_image").attr("src", createImageURL(item.img));
	$("#recipe_detail_product").text(item.name);
	$("#recipe_detail_type").text(recipe.type);
	$("#recipe_detail_class").text(recipe.category);
	$("#recipe_detail_lv").text(recipe.lv + recipe.mark);
	$("#recipe_detail_dur").text(recipe.dur);
	$("#recipe_detail_proc").text(recipe.p_cost);
	$("#recipe_detail_quality").text(recipe.q);

	//製作条件
	//HQ
	var buf = "";
	buf += ((recipe["a_flg"] & 1) == 1 ? ml_hq : ml_hq_invalid) + "<br>";
	//簡易製作
	buf += ((recipe["a_flg"] & 2) == 2 ? ml_sp : ml_sp_invalid) + "<br>";
	//蒐集品
	buf += ((recipe["a_flg"] & 4) == 4 ? ml_collectable + "<br>" : "");
	//作業精度
	if ("" != recipe["a_wk"]) {
		buf += sprintf(ml_work, [recipe["a_wk"]]) + "<br>";
	}
	//加工精度
	if ("" != recipe["a_ed"]) {
		buf += sprintf(ml_edit, [recipe["a_ed"]]) + "<br>";
	}
	//属性
	if ("" != recipe["a_at"]) {
		buf += ml_at_map[recipe["a_at"]][lang] + "<br>";
	}
	//その他
	var tmp = recipe["a_ot"].split(",");
	for (var i in tmp) {
		if (null != optionOtherText[tmp[i]]) {
			buf += optionOtherText[tmp[i]] + "<br>";
		}
	}

	if ("" != buf) {
		buf = "<div style=\"line-height:140%\">" + buf + "</div>";
	}
	$("#recipe_detail_condition").html(buf);

	//レシピ情報
	nodeIndex = 0;
	var treeHTML = createTreeHTML([{"id": recipe.rid, "data": recipe, "item": item, "count": 1}]);
	$("#recipe_tree").html(treeHTML);
	$("#recipe_tree").treeview({toggle: function(index, node){updateNodeText(index, node);}});
}

//ツリー生成
function createTreeHTML(dataList) {
	var ret = "";
	for (var i in dataList) {
		//対象データを抽出
		var id = dataList[i]["id"];
		var item = dataList[i]["item"];
		var data = dataList[i]["data"];
		var count = dataList[i]["count"];
		var countPerProduce = (null == data["product_count"] ? 1 : parseInt(data["product_count"]));

		//指定アイテム本体に関するHTMLを作成
		var mainHTML = sprintf(
				"<div class='tree_line_base' data-id='{3}' data-count='{2}' node-index='{4}' child-count-data=''>" +
					"<div class='tree_line_image_base'><img src='{0}' class='tree_line_image'></div>" +
					"<div class='tree_line_text'>&nbsp;{1}</a></div>" +
				"</div>",
				[
					createImageURL(item["img"]),
					item["name"],
					count * countPerProduce,
					id,
					nodeIndex
				]);
		nodeIndex++;

		//指定アイテムの材料に関するHTMLを作成
		var subHTML = createTreeHTMLHelper(data, 0, count);
		ret += sprintf("<li>{0}<ul>{1}</ul></li>", [mainHTML, subHTML]);
	}

	return ret;
}
function createTreeHTMLHelper(data, indent, itemCount) {
	var ret = "";
	var shards = [];

	//シャードも同じように扱えるようにする
	for (var key in data["shard"]) {
		var shardItemId = shardInfo[key];
		if (null == shardItemId) {
			continue;
		}
		var addMaterial = { "id": shardItemId, "count": data["shard"][key] };
		shards.push(addMaterial);
	}

	//シャード＋素材のループ
	var aryList = [shards, data["material"]];
	for (var i in aryList) {
		for (var j in aryList[i]) {
			//各要素の出力
			var buf = "";
			var itemBuf = "";
			var innerBuf = "";
			var obj = aryList[i][j];
			var id = obj["id"];
			var count = Number(obj["count"]) * itemCount;

			var item = itemData["data"][id];
			if (null == item) {
				continue;
			}

			//事前計算：子要素の生産回数、及び生産量を計算する
			var childProduceActionCount = 0;//生産回数
			var childProduceItemCount = 0;//生産量
			if (null != recipeData["data"][id]) {
				var childData = recipeData["data"][id][0];
				var childCount = count;
				var childCountPerProduce = (null == childData["product_count"] ? 1 : parseInt(childData["product_count"]));
				if (childCountPerProduce > 1) {
					childCount = Math.ceil(count / childCountPerProduce);
				}
				childProduceActionCount = childCount;
				childProduceItemCount = childCount * childCountPerProduce;
			}

			//ノード開閉決定
			var nodeStatusText = nodeStatusText = (0 == indent ? "" : " class='closed'");
			var isShowChildCount = (-1 != nodeStatusText.indexOf("closed"));


			//指定された素材のHTML
			baseText = 
				"<div class='tree_line_base' data-id='{2}' data-count='{4}' node-index='{5}' child-count-data='{6}'>" +
					"<div class='tree_line_image_base'><img src='{1}' class='tree_line_image'></div>" +
					"<div class='tree_line_text'>&nbsp;{3} x {4}{7}</div>" +
				"</div>";

			itemBuf = sprintf(
				baseText,
				[
					"",
					createImageURL(item["img"]),
					id,
					item["name"],
					count,
					nodeIndex,
					(0 == childProduceItemCount ? "" : " (" + childProduceItemCount + ")"),
					(0 == childProduceItemCount || isShowChildCount ? "" : " (" + childProduceItemCount + ")"),
				]);

			//ノードインデックスのインクリメント
			nodeIndex++;

			//指定素材を作るレシピがあるか？
			if (null != recipeData["data"][id]) {
				var childData = recipeData["data"][id][0];
				innerBuf = createTreeHTMLHelper(childData, indent + 1, childProduceActionCount);
				innerBuf = "<ul>" + innerBuf + "</ul>";
			}

			buf = sprintf("<li{0}>{1}{2}</li>", [
				nodeStatusText,
				itemBuf, 
				innerBuf
			]);
			ret += buf;
		}
	}

	return ret;
}
function updateNodeText(index, node) {
	var targetNode = $(node).parent()[0];
	var targetNodeClass = targetNode.className;
	var isExpanded = (-1 == targetNodeClass.indexOf("expandable"));

	//innerHTMLの更新
	var mainDivNode = $(".tree_line_base", targetNode)[0];
	var childCountText = $(mainDivNode).attr("child-count-data");
	var targetTextNode = $(".tree_line_text", targetNode)[0];
	var nodeIndex = $(mainDivNode).attr("node-index");
	var innerHTML = $(targetTextNode).html();

	innerHTML = innerHTML.replace(childCountText, "");
	if (isExpanded) {
		innerHTML += childCountText;
	}

	$(targetTextNode).html(innerHTML);

}


//レシピ詳細初期化
function clearRecipeDetail() {
	$("#recipe_tree").html("未选择制作物.");
	$("#recipe_detail_image").attr("src", "image/sys/clear.png");
	$("#recipe_detail_product").text("-");
	$("#recipe_detail_type").text("-");
	$("#recipe_detail_class").text("-");
	$("#recipe_detail_lv").text("-");
	$("#recipe_detail_dur").text("-");
	$("#recipe_detail_proc").text("-");
	$("#recipe_detail_quality").text("-");
	$("#recipe_detail_condition").text("-");
}


