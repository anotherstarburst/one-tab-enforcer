!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("OneTabEnforcer",[],n):"object"==typeof exports?exports.OneTabEnforcer=n():e.OneTabEnforcer=n()}(this,(()=>(()=>{"use strict";var e={};return(()=>{var n=e;Object.defineProperty(n,"__esModule",{value:!0});var t='\n  <div style="display: flex; justify-content: center; flex-direction: column; height: 100vh; text-align: center;" >\n    <h1>\n      ⚠️ This is a duplicate tab - please shut it down.\n    </h1>\n  </div>\n';n.default=function(e,n){void 0===e&&(e={});var o,i=e.appID,r=void 0===i?"some-unique-name":i,a=e.timeout,u=void 0===a?50:a,c=e.warningQuerySelector,d=void 0===c?"":c,s=e.warningMarkup,f=void 0===s?"":s,l=null;function p(){return null===l&&(l=!1,n(),!0)}(o=new BroadcastChannel(r)).onmessage=function(e){"pong"===e.data?(l=!0,function(e,n){var o,i=e||t;if(n){if(!(o=document.querySelector(n)))return}else o=document.createElement("div"),document.body.prepend(o);o.innerHTML=i}(f,d),o.close()):o.postMessage("pong")},o.postMessage("ping"),setTimeout(p,u)}})(),e})()));
//# sourceMappingURL=index.js.map