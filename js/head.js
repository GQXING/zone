
var zone = function() {
    function id(name) {
        return document.getElementById(name);
    }

    //遍历函数，同时适应兼容性

    function each(arr, callback, thisp) {
        if (arr.forEach) {
         arr.forEach(callback, thisp);
          } 
        else {
            for (var i = 0, len = arr.length; i < len; i++) callback.call(thisp, arr[i], i, arr);
        }
    }

    //立即执行，使用for(){function}(i);
    function fadeIn(elem) {
        setOpacity(elem, 0)
        for (var i = 0; i < 20; i++) {
            (function() {
                var pos = i * 5;
                setTimeout(function() {
                    setOpacity(elem, pos)
                }, i * 25);
            })(i);
        }
    }
    //是图片缓慢加载出来，改变透明度的方式。
    function fadeOut(elem) {
        for (var i = 0; i <= 20; i++) {
            (function() {
                var pos = 100 - i * 5;
                setTimeout(function() {
                    setOpacity(elem, pos)
                }, i * 25);
            })(i);
        }
    }
    // 设置透明度
    function setOpacity(elem, level) {
        if (elem.filters) {
            elem.style.filter = "alpha(opacity=" + level + ")";
        } else {
            elem.style.opacity = level / 100;
        }
    }
    return {
        //count:图片数量，wrapId:包裹图片的DIV,ulId:按钮li标签,	infoId：信息栏
        scroll: function(count, wrapId, ulId, infoId) {
        	var idx=0;	//起始打开浏览器，默认的idx为0；
            var self = this;	//当前对象
            // console.log(self);
            var targetIdx = 0; //目标图片序号
            var curIndex = 0; //现在图片序号
            //添加Li按钮
            var frag = document.createDocumentFragment();
            this.num = []; //存储各个li的应用，为下面的添加事件做准备
            this.info = id(infoId);
            for (var i = 0; i < count; i++) {
                (this.num[i] = frag.appendChild(document.createElement("li"))).innerHTML = 1+i;
            }
            id(ulId).appendChild(frag);

            //初始化信息
            this.img = id(wrapId).getElementsByTagName("a");
            this.info.innerHTML = self.img[0].firstChild.title;
            this.num[0].className = "on";
            //将除了第一张外的所有图片设置为透明
            each(this.img, function(elem, idx, arr) {
                if (idx != 0) setOpacity(elem, 0);
            });

            //为所有的li添加点击事件
            each(this.num, function(elem, idx, arr) {
                elem.onclick = function() {
                    self.fade(idx, curIndex);
                    curIndex = idx;
                    targetIdx = idx;
                }
            });

            //自动轮播效果
            var itv = setInterval(function() {
                if (targetIdx < self.num.length - 1) {
                    targetIdx++;
                } else {
                    targetIdx = 0;
                }
                self.fade(targetIdx, curIndex);
                curIndex = targetIdx;
            }, 3000);
            id(ulId).onmouseover = function() { clearInterval(itv) };
            id(ulId).onmouseout = function() {
                itv = setInterval(function() {
                    if (targetIdx < self.num.length - 1) {
                        targetIdx++;
                    } else {
                        targetIdx = 0;
                    }
                    self.fade(targetIdx, curIndex);
                    curIndex = targetIdx;
                }, 3000);
            }
        },

        //设置轮播的当前和下一张的轮流关系
        fade: function(idx, lastIdx) {
            if (idx == lastIdx) return;
            var self = this;
            fadeOut(self.img[lastIdx]);
            fadeIn(self.img[idx]);
            each(self.num, function(elem, elemidx, arr) {
                if (elemidx != idx) {
                    self.num[elemidx].className = '';
                } else {
                    id("list").style.background = "";
                    self.num[elemidx].className = 'on';
                }
            });
            //为info添加相对应得文字效果。
             this.info.innerHTML = self.img[idx].firstChild.title;
        }
    }
}();
