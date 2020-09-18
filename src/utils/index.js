export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function camelToCrossLine(str) {
	var temp = str.replace(/[A-Z]/g, function (match) {	
		return "-" + match.toLowerCase();
  });
  if (temp.slice(0,1) === '-') { 
    temp = temp.slice(1);
  }
	return temp;
};

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    let last = +new Date() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = +new Date();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    let callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

export function throttle(func, delay) {     
  var timer = null;     
  var startTime = Date.now();     
  return function() {             
      var curTime = Date.now();             
      var remaining = delay - (curTime - startTime);             
      var context = this;             
      var args = arguments;             
      clearTimeout(timer);              
      if (remaining <= 0) {                    
          func.apply(context, args);                    
          startTime = Date.now();              
      } else {                    
          timer = setTimeout(func, remaining);              
      }      
  }
};

// 字符串模板替换
export function replaceStrTemplate(str, temp) {
  let result = str;
  if (/{|}/.test(str)) {
    result = str.replace(/\{(.+?)\}/g, (_, key) => {
      return temp[key];
    });
  }
  return result;
}

export function trim(str, char, type) {
  if (char) {
    if (type == 'left') {
      return str.replace(new RegExp('^\\'+char+'+', 'g'), '');
    } else if (type == 'right') {
      return str.replace(new RegExp('\\'+char+'+$', 'g'), '');
    }
    return str.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
  }
  return str.replace(/^\s+|\s+$/g, '');
};

export function transFormData(obj) {
  let formData = new FormData();
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key]);
  });
  return formData;
}

// 16进制 颜色转为 RGB 格式
export function colorRGBA(sColor, opacity) {
	sColor = sColor.toLowerCase();
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
		}
		return "RGBA(" + sColorChange.join(",") + ", "+ opacity + ")";
	} else{
		return sColor;	
	}
};