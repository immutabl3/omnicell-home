// https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
// true on IE11
// false on Edge and other IEs/browsers.
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
isIE11 && document.documentElement.classList.add('ie11');