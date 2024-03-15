(()=>{"use strict";var n={365:(n,e,t)=>{t.d(e,{A:()=>c});var o=t(354),r=t.n(o),A=t(314),i=t.n(A)()(r());i.push([n.id,":root {    \n    font-size: 16px;\n    font-family: 'Courier New', Courier, monospace;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    scrollbar-color: #2F4858 azure;\n    scrollbar-width: thin;\n}\n\nh1 {\n    line-height: 1.9rem;\n}\n\nbody {    \n    height: 100vh;\n    width: 100vw;    \n    display: flex;\n    flex-direction: column;\n}\n\n#app-grid {\n    flex-grow: 1;\n    display: grid;\n    grid-template-columns: 58px minmax(250px, 20%) minmax(400px, 1fr) 58px;\n    grid-template-rows: 25px minmax(180px, 1fr) 3fr 25px;\n    overflow: auto;\n}\n\n#app-grid > div {\n    display: flex;      \n}\n\n#header {\n    background-color: #80b3d1;    \n    grid-column: 1 / 5;\n    grid-row: 1 / 2;    \n}\n\n#upper-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 2 / 3;      \n    padding: 0 4px 0 4px; \n}\n\n#lower-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 3 / 4;      \n    padding: 0 4px 0 4px;   \n}\n\n#collection-controls {    \n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 1em;\n}\n\n.collection-control-btn {\n    background-color: azure;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 40% 50%;    \n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    padding: 20px;   \n    box-shadow: -2px 2px 5px 1px #71abc9;  \n}\n\n#period {\n    background-color: #cadbe4;    \n    grid-column: 2 / 3;\n    grid-row: 2 / 3;    \n    flex-direction: column;\n    justify-content: space-evenly;    \n    padding: 5px;                \n}\n\n#period button {\n    font-family: 'Courier New', Courier, monospace;    \n    background-color: azure;\n    border: none;\n    font-size: 1.4rem;\n    font-weight: 600;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    border-radius: 5px;\n    box-shadow: -2px 2px 5px 1px #71abc9;    \n}\n\n#collections {\n    background-color: #cadbe4;\n    grid-column: 2 / 3;\n    grid-row: 3 / 4; \n    flex-direction: column;    \n    align-items: flex-start;\n    gap: 0.6em;\n    padding: 5px;\n    padding-top: 0;\n    overflow: auto;      \n}\n\n.collection {\n    background-color: azure;\n    display: flex;\n    flex-direction: column;\n    width: 100%;    \n    border-radius: 5px; \n    padding: 0.3em;\n    gap: 2px;    \n    box-shadow: -2px 2px 5px 1px #71abc9;       \n}\n\n.collection-header {\n    font-size: 0.9rem;\n    display: flex;\n    align-items: center;        \n}\n\n.collection-btn {\n    min-height: max-content;\n    background-color: azure;\n    border: none;\n    font-size: 1.4rem;\n    font-weight: 600;\n    text-align: left;\n    padding: 0 0 0 3px;     \n}\n\n.progress-div {\n    flex-grow: 1;\n    display: flex;\n    justify-content: flex-end;\n    padding-right: 6px;\n}\n\n#last-clicked {\n    color: #80b3d1;\n    border: 1px dashed #80b3d1;\n    margin: -1px;\n}\n\n.todo-div {\n    display: flex;\n    flex-direction: column;    \n}\n\n.to-do {   \n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    border-bottom: 1px dashed #80b3d1;\n    padding: 4px 0 4px 0;       \n}\n\n.to-do p {\n    display: flex;\n    align-items: center;       \n    width: 85%;\n}\n\n.to-do div {\n    flex-grow: 1;\n}\n\n.clock {\n    display: flex;\n    justify-content: center;\n    height: 25px;\n    width: 25px;      \n}\n\n.circle {\n    display: flex;\n    justify-content: center;\n    height: 12px;\n    width: 25px;    \n}\n\n.snail {\n    display: flex;\n    justify-content: center;    \n    height: 19px;    \n    width: 25px;      \n}\n\n.check {\n    display: flex;\n    justify-content: center;    \n    height: 13px;    \n    width: 25px;\n    margin-bottom: 3px;   \n}\n\n.priority-icon-container img {\n    height: 100%;\n    width: 100%;    \n}\n\n.empty {\n    color: lightslategray;\n    font-style: italic;\n    padding: 3px 0 0 3px;\n}\n\n#content {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 3 / 4;\n    grid-row: 2 / 4;\n}\n\n.content-container {\n\n}\n\n#right-side {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 4 / 5;\n    grid-row: 2 / 4;   \n}\n\n#footer {\n    background-color: #2F4858;     \n    grid-column: 1 / 5;\n    grid-row: 4 / 5;    \n}\n\n.test-btn {\n    height: 50px;\n}","",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"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",sourcesContent:[":root {    \n    font-size: 16px;\n    font-family: 'Courier New', Courier, monospace;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    scrollbar-color: #2F4858 azure;\n    scrollbar-width: thin;\n}\n\nh1 {\n    line-height: 1.9rem;\n}\n\nbody {    \n    height: 100vh;\n    width: 100vw;    \n    display: flex;\n    flex-direction: column;\n}\n\n#app-grid {\n    flex-grow: 1;\n    display: grid;\n    grid-template-columns: 58px minmax(250px, 20%) minmax(400px, 1fr) 58px;\n    grid-template-rows: 25px minmax(180px, 1fr) 3fr 25px;\n    overflow: auto;\n}\n\n#app-grid > div {\n    display: flex;      \n}\n\n#header {\n    background-color: #80b3d1;    \n    grid-column: 1 / 5;\n    grid-row: 1 / 2;    \n}\n\n#upper-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 2 / 3;      \n    padding: 0 4px 0 4px; \n}\n\n#lower-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 3 / 4;      \n    padding: 0 4px 0 4px;   \n}\n\n#collection-controls {    \n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 1em;\n}\n\n.collection-control-btn {\n    background-color: azure;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 40% 50%;    \n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    padding: 20px;   \n    box-shadow: -2px 2px 5px 1px #71abc9;  \n}\n\n#period {\n    background-color: #cadbe4;    \n    grid-column: 2 / 3;\n    grid-row: 2 / 3;    \n    flex-direction: column;\n    justify-content: space-evenly;    \n    padding: 5px;                \n}\n\n#period button {\n    font-family: 'Courier New', Courier, monospace;    \n    background-color: azure;\n    border: none;\n    font-size: 1.4rem;\n    font-weight: 600;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    border-radius: 5px;\n    box-shadow: -2px 2px 5px 1px #71abc9;    \n}\n\n#collections {\n    background-color: #cadbe4;\n    grid-column: 2 / 3;\n    grid-row: 3 / 4; \n    flex-direction: column;    \n    align-items: flex-start;\n    gap: 0.6em;\n    padding: 5px;\n    padding-top: 0;\n    overflow: auto;      \n}\n\n.collection {\n    background-color: azure;\n    display: flex;\n    flex-direction: column;\n    width: 100%;    \n    border-radius: 5px; \n    padding: 0.3em;\n    gap: 2px;    \n    box-shadow: -2px 2px 5px 1px #71abc9;       \n}\n\n.collection-header {\n    font-size: 0.9rem;\n    display: flex;\n    align-items: center;        \n}\n\n.collection-btn {\n    min-height: max-content;\n    background-color: azure;\n    border: none;\n    font-size: 1.4rem;\n    font-weight: 600;\n    text-align: left;\n    padding: 0 0 0 3px;     \n}\n\n.progress-div {\n    flex-grow: 1;\n    display: flex;\n    justify-content: flex-end;\n    padding-right: 6px;\n}\n\n#last-clicked {\n    color: #80b3d1;\n    border: 1px dashed #80b3d1;\n    margin: -1px;\n}\n\n.todo-div {\n    display: flex;\n    flex-direction: column;    \n}\n\n.to-do {   \n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    border-bottom: 1px dashed #80b3d1;\n    padding: 4px 0 4px 0;       \n}\n\n.to-do p {\n    display: flex;\n    align-items: center;       \n    width: 85%;\n}\n\n.to-do div {\n    flex-grow: 1;\n}\n\n.clock {\n    display: flex;\n    justify-content: center;\n    height: 25px;\n    width: 25px;      \n}\n\n.circle {\n    display: flex;\n    justify-content: center;\n    height: 12px;\n    width: 25px;    \n}\n\n.snail {\n    display: flex;\n    justify-content: center;    \n    height: 19px;    \n    width: 25px;      \n}\n\n.check {\n    display: flex;\n    justify-content: center;    \n    height: 13px;    \n    width: 25px;\n    margin-bottom: 3px;   \n}\n\n.priority-icon-container img {\n    height: 100%;\n    width: 100%;    \n}\n\n.empty {\n    color: lightslategray;\n    font-style: italic;\n    padding: 3px 0 0 3px;\n}\n\n#content {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 3 / 4;\n    grid-row: 2 / 4;\n}\n\n.content-container {\n\n}\n\n#right-side {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 4 / 5;\n    grid-row: 2 / 4;   \n}\n\n#footer {\n    background-color: #2F4858;     \n    grid-column: 1 / 5;\n    grid-row: 4 / 5;    \n}\n\n.test-btn {\n    height: 50px;\n}"],sourceRoot:""}]);const c=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,A){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var a=this[c][0];null!=a&&(i[a]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);o&&i[l[0]]||(void 0!==A&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=A),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},354:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),A="/*# ".concat(r," */");return[e].concat([A]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var A={},i=[],c=0;c<n.length;c++){var a=n[c],d=o.base?a[0]+o.base:a[0],l=A[d]||0,s="".concat(d," ").concat(l);A[d]=l+1;var p=t(s),u={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var g=r(u,o);o.byIndex=c,e.splice(c,0,{identifier:s,updater:g,references:1})}i.push(s)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var A=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<A.length;i++){var c=t(A[i]);e[c].references--}for(var a=o(n,r),d=0;d<A.length;d++){var l=t(A[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}A=a}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var A=t.sourceMap;A&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(A))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var A=e[o]={id:o,exports:{}};return n[o](A,A.exports,t),A.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!n||!/^http(s?):/.test(n));)n=o[r--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.nc=void 0,(()=>{var n=t(72),e=t.n(n),o=t(825),r=t.n(o),A=t(659),i=t.n(A),c=t(56),a=t.n(c),d=t(540),l=t.n(d),s=t(113),p=t.n(s),u=t(365),g={};g.styleTagTransform=p(),g.setAttributes=a(),g.insert=i().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=l(),e()(u.A,g),u.A&&u.A.locals&&u.A.locals;const f=t.p+"b5e4c11a18a61d1885cb.png",B=t.p+"b9170b32c767015ba274.png",C=t.p+"fcd87e98ea251a69d287.png",x=t.p+"2857fc837507cadfb13e.png",m=t.p+"6417130d13ce1d80c4c6.png",I=t.p+"4450f33a3e8d84741124.png",h=document.querySelector("#collections");function b(n){let e=[];return{name:n,todos:e,addTodo:n=>e.push(n),clearTodos:()=>e.length=0,progress:function(){let n=e.length,t=0;for(let o=0;o<n;o++)e[o].getStatus()&&(t+=1);return Math.trunc(t/n*100)+"%"}}}function y(n){return 2===n?[C,"clock"]:1===n?[x,"circle"]:[m,"snail"]}function v(n){const e=document.createElement("div");e.classList.add("collection");const t=document.createElement("div");t.classList.add("collection-header"),e.appendChild(t);const o=document.createElement("button");o.classList.add("collection-btn"),o.textContent=n.name,o.addEventListener("click",k);const r=document.createElement("div");if(r.classList.add("progress-div"),t.append(o,r),n.todos.length>0){const t=document.createElement("div");t.classList.add("todo-div"),e.appendChild(t);for(let e=0;e<n.todos.length;e++){const o=document.createElement("div");o.classList.add("to-do");const r=document.createElement("div"),A=new Image;if(n.todos[e].getStatus())A.src=I,r.classList.add("check");else{const t=y(n.todos[e].priority);A.src=t[0],r.classList.add(t[1])}const i=document.createElement("p");i.textContent=n.todos[e].subject,r.appendChild(A),o.appendChild(r),o.appendChild(i),t.appendChild(o)}r.textContent=n.progress()}else{const n=document.createElement("div");n.classList.add("empty"),n.textContent="This collection is empty...",e.appendChild(n)}h.appendChild(e)}let w="";function k(n){const e=h.querySelectorAll(".collection button");console.log(e),e.forEach((n=>{"last-clicked"===n.id&&n.removeAttribute("id")})),n.target.id="last-clicked",w=n.target.innerText}let E=[];function j(){let n=prompt("Name of the new collection:");0===n.trim().length?alert("Name was left blank!"):b(n.trim())}function z(){prompt("To-do to edit:")}function Y(){prompt("Collection to edit:")}function S(n,e,t,o=0){if(""!==n.length){let r=n,A=0!=e.length?e:"no date set",i=!1;return{subject:r,date:A,notes:t,priority:o,getStatus:()=>i,editStatus:()=>i=!i}}alert("Please add subject!")}!function(){const n=document.querySelector("#collection-controls"),e=n.querySelector(".collection-control-btn:first-child"),t=n.querySelector(".collection-control-btn:nth-child(2)");e.style.backgroundImage="url('"+f+"')",e.addEventListener("click",j),t.style.backgroundImage="url('"+B+"')",t.addEventListener("click",j);const o=document.createElement("button");o.classList.add("test-btn"),o.textContent="editTodo",o.addEventListener("click",z),n.append(o);const r=document.createElement("button");r.classList.add("test-btn"),r.textContent="editCollection",r.addEventListener("click",Y),n.append(r)}(),E.push(b("Studies")),E.push(b("Hobbies")),E.push(b("Work")),E.push(b("Misc")),E.push(b("Secret-project")),E[0].addTodo(S("Study math test","10.5.2024","Calculus",2)),E[0].addTodo(S("group project","20.5.2024","Finish the presentation...",2)),E[0].todos[0].editStatus(),E[1].addTodo(S("Learn programming","","Slow and steady...",0)),E[1].addTodo(S("Get new running shoes","","Nikes?",1)),E[3].addTodo(S("Car oil change","30.3.2024","change filters",1)),E[3].addTodo(S("Dentist appointment","","",1)),E[3].addTodo(S("Book flights","1.6.2024","",1)),E[4].addTodo(S("Secret...","25.5.2025","",1)),console.log(E[1]);for(let n=0;n<E.length;n++)v(E[n])})()})();
//# sourceMappingURL=main.js.map