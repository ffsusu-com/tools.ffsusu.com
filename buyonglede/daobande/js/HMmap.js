function mark2(x, y) {
    var pos = document.getElementsByName("pos");
    var number = pos.length;
    for (var i = 0; i < number; i++) {
        var po = pos[i];
        if (po.title == "X:" + x + " , Y:" + y) {
            po.style.backgroundColor = 'rgba(255,0,0,0.5)';
        }
    }
}
function remark() {
    var pos = document.getElementsByName("pos");
    var number = pos.length;
    for (var i = 0; i < number; i++) {
        var po = pos[i];
        po.style.backgroundColor = 'rgba(255,0,0,0)';
    }
}
function mark4(str) {
    var label = document.getElementById(str).innerText;
    if (label == "清除") { remark(); }
    if (label == "B:克鲁泽") {
        mark2(33, 7); mark2(36, 9); mark2(28, 8); mark2(26, 11);
        mark2(30, 13); mark2(27, 17); mark2(31, 18); mark2(28, 22);
        mark2(28, 27); mark2(25, 32); mark2(17, 26); mark2(35, 12);
    }
    if (label == "B:阿尔提克") {
        mark2(6, 12); mark2(11, 13); mark2(18, 12); mark2(12, 17);
        mark2(17, 19); mark2(21, 22); mark2(23, 27); mark2(16, 29);
        mark2(19, 31); mark2(21, 17);
    }
    if (label == "A:米勒卡") {
        mark2(10, 12); mark2(11, 16); mark2(32, 18); mark2(30, 28);
    }
    if (label == "A:卢芭") {
        mark2(17, 18); mark2(21, 19); mark2(35, 12); mark2(34, 21);
        mark2(15, 31); mark2(19, 31); mark2(28, 26); mark2(30, 27);
        mark2(36, 30); mark2(37, 36);
    }

    if (label == "B:提克斯塔") {
        mark2(27, 7);mark2(34, 10);mark2(35, 15);mark2(32, 17);
        mark2(21, 20);mark2(28, 22);mark2(26, 25);mark2(38, 26);
        mark2(35, 29);
    }
    if (label == "B:骨颌彗星兵") {
        mark2(12, 28);mark2(13, 32);mark2(10, 35);mark2(14, 36);
        mark2(19, 30);mark2(21, 33);mark2(25, 32);mark2(28, 30);
        mark2(27, 38);mark2(16, 36);
    }
    if (label == "A:双足飞龙之王") {
        mark2(17, 11);
        mark2(26, 8);
        mark2(33, 8);
        mark2(20, 20);
        mark2(26, 25);
        mark2(27, 30);
        mark2(24, 32);
        mark2(21, 32);
        mark2(21, 35);
        mark2(18, 33);
        mark2(16, 36);
        mark2(14, 30);
    }
    if (label == "A:派拉斯特暴龙") {
        mark2(13, 15);
        mark2(17, 11);
        mark2(29, 21);
        mark2(19, 30);
        mark2(18, 39);
        mark2(10, 35);
        mark2(20, 34);
    }

    if (label == "B:斯奇塔利斯") {
        mark2(25, 7);
        mark2(28, 10);
        mark2(28, 20);
        mark2(25, 20);
        mark2(33, 20);
        mark2(35, 21);
        mark2(26, 27);
        mark2(22, 30);
        mark2(31, 32);
        mark2(37, 25);
        mark2(38, 28);
    }
    if (label == "B:惊慌稻草龙") {
        mark2(13, 8);
        mark2(7, 11);
        mark2(7, 15);
        mark2(6, 20);
        mark2(15, 14);
        mark2(12, 19);
        mark2(11, 20);
        mark2(13, 23);
        mark2(17, 25);
        mark2(16, 30);
        mark2(6, 36);
        mark2(10, 38);
    }
    if (label == "A:布涅") {
        mark2(6, 12);
        mark2(8, 17);
        mark2(14, 14);
        mark2(13, 20);
        mark2(14, 30);
        mark2(14, 24);
        mark2(35, 29);
        mark2(16, 27);
    }
    if (label == "A:阿伽托斯") {
        mark2(27, 11);
        mark2(33, 20);
        mark2(35, 28);
        mark2(32, 33);
        mark2(10, 38);
        mark2(28, 20);
        mark2(23, 31);
    }

    if (label == "B:斯奎克") {
        mark2(8, 26);
        mark2(15, 23);
        mark2(20, 21);
        mark2(25, 25);
        mark2(31, 19);
        mark2(38, 14);
        mark2(36, 21);
        mark2(13, 29);
        mark2(18, 31);
        mark2(26, 29);
        mark2(31, 36);
        mark2(36, 38);
    }
    if (label == "B:飞舞翼 萨努瓦力") {
        mark2(6, 7);
        mark2(15, 7);
        mark2(22, 7);
        mark2(29, 7);
        mark2(36, 9);
        mark2(38, 15);
        mark2(25, 13);
        mark2(23, 10);
        mark2(21, 15);
        mark2(17, 9);
        mark2(15, 14);
        mark2(11, 14);
        mark2(13, 28);
        mark2(26, 28);
        mark2(7, 19);
    }
    if (label == "A:西斯尤") {
        mark2(15, 7);
        mark2(29, 6);
        mark2(15, 14);
        mark2(24, 13);
        mark2(21, 16);
        mark2(27, 14);
        mark2(36, 21);
    }
    if (label == "A:恩克拉多斯") {
        mark2(19, 10);
        mark2(15, 23);
        mark2(30, 20);
        mark2(25, 25);
        mark2(26, 26);
        mark2(19, 31);
        mark2(33, 31);
        mark2(35, 32);
        mark2(31, 36);
        mark2(9, 16);
    }

    if (label == "B:布拉巨猿") {
        mark2(26, 16);
        mark2(25, 20);
        mark2(25, 23);
        mark2(27, 25);
        mark2(27, 30);
        mark2(26, 36);
        mark2(31, 19);
        mark2(35, 22);
        mark2(33, 26);
        mark2(38, 28);
    }
    if (label == "B:翼肢鲎") {
        mark2(5, 22);
        mark2(9, 21);
        mark2(15, 22);
        mark2(14, 25);
        mark2(9, 27);
        mark2(13, 29);
        mark2(8, 33);
        mark2(15, 35);
        mark2(16, 38);
        mark2(15, 32);
    }
    if (label == "A:斯特拉斯") {
        mark2(27, 19);
        mark2(24, 22);
        mark2(13, 25);
        mark2(19, 34);
        mark2(35, 23);
        mark2(33, 24);
    }
    if (label == "A:机工兵") {
        mark2(12, 16);
        mark2(13, 26);
        mark2(9, 30);
        mark2(8, 33);
        mark2(26, 35);
        mark2(27, 20);
        mark2(27, 25);
        mark2(33, 24);
        mark2(32, 27);
        mark2(38, 28);
        mark2(5, 22);
    }

    if (label == "B:利西达斯") {
        mark2(17, 8);
        mark2(18, 13);
        mark2(14, 16);
        mark2(34, 26);
        mark2(29, 29);
        mark2(38, 27);
        mark2(35, 30);
        mark2(30, 35);
        mark2(35, 33);
        mark2(36, 37);
    }
    if (label == "B:全能机甲") {
        mark2(33, 6);
        mark2(37, 6);
        mark2(27, 11);
        mark2(33, 13);
        mark2(28, 15);
        mark2(9, 26);
        mark2(8, 33);
        mark2(12, 37);
        mark2(16, 28);
        mark2(11, 30);
    }
    if (label == "A:坎帕提") {
        mark2(15, 8);
        mark2(32, 6);
        mark2(28, 11);
        mark2(9, 27);
        mark2(16, 29);
        mark2(12, 38);
        mark2(24, 26);
        mark2(38, 27);
        mark2(35, 35);
        mark2(36, 37);
    }
    if (label == "A:恶臭狂花") {
        mark2(13, 16);
        mark2(10, 26);
        mark2(15, 29);
        mark2(30, 29);
        mark2(39, 27);
        mark2(36, 30);
        mark2(37, 36);
    }
}