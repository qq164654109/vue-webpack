export default {
  inserted(el, bind) {
    if (bind.value) {
      el.querySelector(bind.value).focus();
    } else {
      el.focus();
    }
  }
}
