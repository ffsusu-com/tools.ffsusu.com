        function markR(x, y,t) {
            var pos = document.getElementsByName("pos");
            var number = pos.length;
            for (var i = 0; i < number; i++) {
                var po = pos[i];
                if (po.title == "X:" + x + " , Y:" + y) {
                    po.style.backgroundColor = 'rgba(255,0,0,' + t + ')';
                }
            }
        }
        function markB(x, y, t) {
            var pos = document.getElementsByName("pos");
            var number = pos.length;
            for (var i = 0; i < number; i++) {
                var po = pos[i];
                if (po.title == "X:" + x + " , Y:" + y) {
                    po.style.backgroundColor = 'rgba(0,0,255,' + t + ')';
                }
            }
        }
        function remark() {
            var pos = document.getElementsByName("pos");
            var number = pos.length;
            for (var i = 0; i < number; i++) {
                var po = pos[i];
                po.style.backgroundColor = '';
            }
        }
        function mark4(str) {
            var url = 'https://api.ffxiv.cn/ajax/hunt/Analysis/';
            var label = document.getElementById(str).innerText;
            var max = 0;
            if (label == "清除") { remark(); }
            else {
                remark();                
                $.get(url + label, function (data) {
                    $.each(data, function (infoIndex, info) {
                        if (parseInt(info["Counts"]) >= max) { max = parseInt(info["Counts"]); }
                    })           

                    $.each(data, function (infoIndex, info) {
                        if (infoIndex == 0) {
                            markB(parseInt(info["X"]), parseInt(info["Y"]), "1");
                        }
                        else if (parseInt(info["Counts"]) > 3 * max / 4) {
                            markR(parseInt(info["X"]), parseInt(info["Y"]), "0.7");
                        }
                        else if (parseInt(info["Counts"]) > 2 * max / 4 && parseInt(info["Counts"]) < 3 * max / 4) {
                            markR(parseInt(info["X"]), parseInt(info["Y"]), "0.5");
                        }
                        else if (parseInt(info["Counts"]) > 1 * max / 4 && parseInt(info["Counts"]) < 2 * max / 4) {
                            markR(parseInt(info["X"]), parseInt(info["Y"]), "0.3");
                        }
                        else if (parseInt(info["Counts"]) < 1 * max / 4) {
                            markR(parseInt(info["X"]), parseInt(info["Y"]), "0.1");
                        }
                    })
                });
                max = 0;  
            }
        }