export default {
  inserted(el, bind) {
    const { value = {} } = bind;
    el.__FPS = value.FPS ? value.FPS : 60;
    el.__delay = value.delay ? value.delay : 1500;
    el.__interval = 1000 / el.__FPS;
    el.__timer = setTimeout(() => {
      el.__scrollWrap = el.querySelector('.el-table__body-wrapper');
      el.__scrollBody = el.__scrollWrap.querySelector('.el-table__body');
      el.__originScrollTop = el.__scrollWrap.scrollTop;

      el.__animate = function() {
        // 满足内容大于容器再执行动画
        if (el.__scrollWrap.scrollHeight > el.__scrollWrap.clientHeight) {
          // 按指定FPS运行
          if (!el.__animateForwradTime) {
            el.__animateForwradTime = new Date().getTime();
          }
          if (new Date().getTime() - el.__animateForwradTime >= el.__interval) {
            el.__animateForwradTime = null;
            let scrollTop = el.__scrollWrap.scrollTop + 1;
            el.__scrollWrap.scrollTop = scrollTop;
            if (el.__scrollWrap.clientHeight + el.__scrollWrap.scrollTop >= el.__scrollWrap.scrollHeight) {
              if (!el.__scrollToBottomTime) {
                el.__scrollToBottomTime = new Date().getTime();
              }
              if (new Date().getTime() - el.__scrollToBottomTime >= el.__delay) {
                el.__scrollToBottomTime = null;
                el.__scrollWrap.scrollTop = 0;
              }
            }
          }
        };
        el.__frame = requestAnimationFrame(el.__animate);
      };

      el.__frame = requestAnimationFrame(el.__animate);

      // 鼠标 触摸暂停 离开滚动
      el.__stopAnimate = function(e) {
        e.preventDefault();
        el.__frame && cancelAnimationFrame(el.__frame);
      }
      el.__startAnimate = function(e) {
        e.preventDefault();
        el.__frame = requestAnimationFrame(el.__animate);
      }
      el.addEventListener('mouseenter', el.__stopAnimate);
      el.addEventListener('mouseleave', el.__startAnimate);
    }, el.__delay)
  },
  unbind(el) {
    clearTimeout(el.__timer);
    el.__frame && cancelAnimationFrame(el.__frame);
    el.__stopAnimate && el.removeEventListener('mouseenter', el.__stopAnimate)
    el.__startAnimate && el.removeEventListener('mouseleave', el.__startAnimate)
  }
}