
//テンプレ適用
function applyTemplate() {
	//テンプレID取得
	var tplId = $("#senario_menu_template").val();
	if (0 == tplId) {
		return;
	}

	//シナリオリセット
	resetSenario(false);
	initSenario();

	if (1 == tplId) {
		applyTemplateFlawlessSet();
	} else if (2 == tplId) {
		applyTemplateHastySet();
	} else if (3 == tplId) {
		applyTemplateWasteNotHastySet();
	} else if (4 == tplId) {
		applyTemplateMuscleBrandSet();
	}

	//再計算
	updateSenario();

	//選択を元に戻す
	$("#senario_menu_template").val("0");
}
//テンプレ：確信＋ブランド
function applyTemplateMuscleBrandSet() {
	//使えるアート／ブランドを確認
	//なければ風を使う
	var actionArtId = 163;
	var actionBrandId = 5;
	var artIdList = [163, 164, 165, 166, 167, 168];
	var brandIdList = [5, 15, 25, 35, 45, 64];
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(jobName);

	for (var i in artIdList) {
		var tmpArtId = artIdList[i];
		var tmpBrandId = brandIdList[i];

		if (Number(crafterActionData[tmpArtId].job) == jobIndex) {
			actionArtId = tmpArtId;
		}
		if (Number(crafterActionData[tmpBrandId].job) == jobIndex) {
			actionBrandId = tmpBrandId;
		}
	}

	var isUseArt = false;

	//耐久確認
	var dur = senarioInfo.status.maxdur;

	//確信
	forceAddSenario(94, null, false);
	dur -= 10;

	//コンファ
	forceAddSenario(161, null, false);

	//インナー
	forceAddSenario(getActionFromEffectId(58).id, null, false);

	//アート
	forceAddSenario(actionArtId, null, false);
	isUseArt = true;

	//工面2
	forceAddSenario(158, null, false);

	//ステディ2
	forceAddSenario(157, null, false);

	//ブランド3回（仮）
	var brandCount = 0;
	for (var i = 0;i < 3;i++) {
		if (dur < 20) {
			break;
		}
		forceAddSenario(actionBrandId, null, false);
		dur -= 10;
		brandCount++;
	}

	//ステディが切れるまでヘイスティを入れる
	for (var i = 0;i < 5;i++) {
		if (dur < 20 || brandCount + i > 5) {
			break;
		}
		forceAddSenario(72, null, false);
		dur -= 10;
	}

	//最大耐久次第でマスターかマスター2
	//マスター2で10超過までは許容する
	if (dur + 60 <= senarioInfo.status.maxdur) {
		forceAddSenario(getActionFromEffectId(4).id, null, false);
		dur += 60;
		//マスター2の場合はコンファを入れる
		forceAddSenario(161, null, false);
	} else {
		forceAddSenario(getActionFromEffectId(2).id, null, false);
		dur += 30;
	}

	//ステディ2
	forceAddSenario(157, null, false);

	//耐久20もしくは5回までヘイスティ
	for (var i = 0;i < 5;i++) {
		if (dur <=  20) {
			break;
		}
		forceAddSenario(72, null, false);
		dur -= 10;
	}

	//ステディ2
	forceAddSenario(157, null, false);

	//グレスラ
	forceAddSenario(getActionFromEffectId(59).id, null, false);

	//イノベ
	forceAddSenario(159, null, false);

	//ビエルゴ
	forceAddSenario(8, null, false);

	//模範2
	forceAddSenario(48, null, false);

}

//テンプレ：堅実セット
function applyTemplateFlawlessSet() {
	//堅実心得追加
	forceAddSenario(136, null, false);

	//有効ターン数計算
	var turn = Math.floor(senarioInfo.status.maxproc / 100) + 1;
	for (var i = 1;i <= turn;i++) {
		//堅実追加
		forceAddSenario(58, null, false);
	}
}


//テンプレ：ヘイスティ
function applyTemplateHastySet() {
	//耐久確認
	var dur = senarioInfo.status.maxdur;

	//確信
	forceAddSenario(94, null, false);
	dur -= 10;

	//コンファ
	forceAddSenario(161, null, false);

	//インナー
	forceAddSenario(getActionFromEffectId(58).id, null, false);

	//ステディ2
	forceAddSenario(157, null, false);

	//耐久10もしくは5回までヘイスティ
	for (var i = 0;i < 5;i++) {
		if (dur <= 10) {
			break;
		}
		forceAddSenario(72, null, false);
		dur -= 10;
	}

	//最大耐久次第でマスターかマスター2
	//マスター2で10超過までは許容する
	if (dur + 60 <= senarioInfo.status.maxdur) {
		forceAddSenario(getActionFromEffectId(4).id, null, false);
		dur += 60;
	} else {
		forceAddSenario(getActionFromEffectId(2).id, null, false);
		dur += 30;
	}

	//ステディ2
	forceAddSenario(157, null, false);

	//耐久30もしくは5回までヘイスティ
	for (var i = 0;i < 5;i++) {
		if (dur <= 30) {
			break;
		}
		forceAddSenario(72, null, false);
		dur -= 10;
	}

	//ステディ2
	forceAddSenario(157, null, false);

	//グレスラ
	forceAddSenario(getActionFromEffectId(59).id, null, false);

	//イノベ
	forceAddSenario(159, null, false);

	//ビエルゴ
	forceAddSenario(8, null, false);

	//模範2 x 2
	forceAddSenario(48, null, false);
	forceAddSenario(48, null, false);

}

//テンプレ：倹約ヘイスティ
function applyTemplateWasteNotHastySet() {
	//耐久確認
	var dur = senarioInfo.status.maxdur;

	//コンファ
	forceAddSenario(161, null, false);

	//インナー
	forceAddSenario(getActionFromEffectId(58).id, null, false);

	//倹約2
	forceAddSenario(160, null, false);

	//ステディ2
	forceAddSenario(157, null, false);

	//耐久5もしくは5回までヘイスティ
	for (var i = 0;i < 5;i++) {
		if (dur <= 5) {
			break;
		}
		forceAddSenario(72, null, false);
		dur -= 5;
	}

	//耐久が残っていたら模範2で消化。2回まで。
	for (var i = 0;i < 2;i++) {
		if (dur <= 5) {
			break;
		}
		forceAddSenario(48, null, false);
		dur -= 5;
	}


	//最大耐久次第でマスターかマスター2
	//マスター2で10超過までは許容する
	if (dur + 60 <= senarioInfo.status.maxdur) {
		forceAddSenario(getActionFromEffectId(4).id, null, false);
		dur += 60;
	} else {
		forceAddSenario(getActionFromEffectId(2).id, null, false);
		dur += 30;
	}

	//ステディ2
	forceAddSenario(157, null, false);

	//耐久20もしくは5回までヘイスティ
	for (var i = 0;i < 5;i++) {
		if (dur <= 20) {
			break;
		}
		forceAddSenario(72, null, false);
		dur -= 10;
	}

	//ステディ2
	forceAddSenario(157, null, false);

	//グレスラ
	forceAddSenario(getActionFromEffectId(59).id, null, false);

	//イノベ
	forceAddSenario(159, null, false);

	//ビエルゴ
	forceAddSenario(8, null, false);

	//模範2
	forceAddSenario(48, null, false);
}

//effectIdから現在の職のactionIdを取得
function getActionFromEffectId(effectId) {
	var jobName = $("#jqms_jobs").data("plugin_menuSelector").settings.base.selectedItem.title;
	var jobIndex = getJobIndex(jobName);

	var ret = null;
	for (var key in crafterActionData) {
		if (Number(crafterActionData[key].effectId) == effectId) {
			if (Number(crafterActionData[key].job) == jobIndex) {
				ret = crafterActionData[key];
				break;
			}
		}
	}

	return ret;
}

