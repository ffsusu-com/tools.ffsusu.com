//係数定義
var progressMap = {
	//作業
	"progress": [
		{"lv": 60, "recipeLv": 60.4, "ingType": 0, "formula": "y = 0.15115904700579524 * x -35.703155183515776"},
		{"lv": 60, "recipeLv": 60.4, "ingType": 1, "formula": "y = 0.169774035570066   * x -9.279577283271760"},
		{"lv": 60, "recipeLv": 60.4, "ingType": 2, "formula": "y = 0.16977403557006615 * x -9.27957728327176"},
	],

	//加工
	"quality": [
		{"lv": 60, "recipeLv": 60.4, "ingType": 0, "formula": "y = 0.3092749700686221  * x -21.74836438348518"},
		{"lv": 60, "recipeLv": 60.4, "ingType": 1, "formula": "y = 0.338413679735794   * x -25.618945279586300"},
		{"lv": 60, "recipeLv": 60.4, "ingType": 2, "formula": "y = 0.36755238940296614 * x -29.489526175687665"},
	],
};

//計算式取得
function getAnalylzedProgress(isProgress, lv, recipeLv, ingType) {
	var key = (isProgress ? "progress" : "quality");

	var ret = null;

	for (var i in progressMap[key]) {
		var d = progressMap[key][i];
		if (d.lv == lv && d.recipeLv == recipeLv && d.ingType == ingType) {
			ret = d;
			break;
		}
	}


	return ret;
}