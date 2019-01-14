/**
 @description 页面垂直平滑滚动到指定滚动高度
 @author zhangxinxu(.com)
*/
var scrollSmoothTo = function (position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};


/**
 * @description REM自适应JS - 这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
 * @author zhangxinxu(.com)  
 * @param {designWidth(设计稿的实际宽度值，需要根据实际设置), maxWidth(制作稿的最大宽度值，需要根据实际设置)} 
 */
;(function(designWidth, maxWidth) {
	var doc = document,
	win = window,
	docEl = doc.documentElement,
	remStyle = document.createElement("style"),
	tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width>maxWidth && (width=maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(750, 750);

/**
 @description 二维数组合并，可以是string，目前深度最多二维
 @author choujiaojiao
 @parmas {array - 目标数组}
*/
function mergeArray(array) {
    let prevAry = array[0]
    for (let i = 1; i < array.length; i++) {
      prevAry = mergeResArray(prevAry, array[i])
    }
    return prevAry

    function mergeResArray(prevAry, nextAry) {
      prevAry = Array.isArray(prevAry) ? prevAry : prevAry.split(' ')
      nextAry = Array.isArray(nextAry) ? nextAry : nextAry.split(' ')
      let resAry = []
      prevAry.forEach(prevItem => {
        nextAry.forEach(nextItem => {
          resAry.push(prevItem + nextItem)
        })
      })
      return resAry
    }
  }


/**
 @description 快速排序
 @author ruanyifeng(http://www.ruanyifeng.com)
 @parmas {ar - 目标数组}
*/
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};

/**
 @description 倒计时
 @author choujiaojiao
 @parmas {timestemp - 倒计时时间}
*/
function countDown(timestemp) {
	//获取时间差
	var timediff = Math.round(timestemp / 1000)
	//获取还剩多少天
	var day = parseInt(timediff / 3600 / 24)
	//获取还剩多少小时
	var hour = parseInt(timediff / 3600 % 24)
	//获取还剩多少分钟
	var minute = parseInt(timediff / 60 % 60)
	//获取还剩多少秒
	var second = timediff % 60
	//当前时间戳减去一秒钟
	timestemp = timestemp - 1000
	if (timestemp < 0) return
	setTimeout(function () {
	show(timestemp)
	}, 1000)
}

/**
 @description 简易版深拷贝
 @author yck 掘金小册
 @parmas {obj - 拷贝目标}
*/
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }
  if (!isObject(obj)) {
    throw new Error('非对象')
  }
  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}
