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
export function replaceStrTemplate(str, params) {
  let result = str;
  if (/{|}/.test(str)) {
    result = str.replace(/\{.*?\}/g, tempStr => {
      const paramKey = tempStr.replace(/{|}/g, '');
      const paramVal = params[paramKey];
      return paramVal;
    });
  }
  return result;
}