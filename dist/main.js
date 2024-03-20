(()=>{"use strict";var n={365:(n,e,t)=>{t.d(e,{A:()=>d});var o=t(354),r=t.n(o),A=t(314),i=t.n(A)()(r());i.push([n.id,':root {    \n    font-size: 16px;\n    font-family: \'Courier New\', Courier, monospace;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    scrollbar-color: #2F4858 azure;\n    scrollbar-width: thin;\n}\n\nh1 {\n    line-height: 1.9rem;\n}\n\nbody {\n    background-color: #cadbe4;    \n    height: 100vh;\n    width: 100vw;    \n    display: flex;\n    flex-direction: column;    \n}\n\n#app-grid {\n    flex-grow: 1;\n    display: grid;\n    grid-template-columns: 58px minmax(275px, 20%) minmax(400px, 1fr) 58px;\n    grid-template-rows: 25px minmax(210px, 1fr) 20px 3fr 25px;\n    overflow: auto;\n}\n\n#app-grid > div {\n    display: flex;      \n}\n\n#header {\n    background-color: #80b3d1;    \n    grid-column: 1 / 5;\n    grid-row: 1 / 2;    \n}\n\n#upper-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 2 / 4;      \n    padding: 0 4px 0 4px; \n}\n\n#lower-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 4 / 5;      \n    padding: 0 4px 0 4px;   \n}\n\n#right-side {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 4 / 5;\n    grid-row: 2 / 5;\n    padding: 0.8em 4px 0 0px;\n    gap: 5px;  \n}\n\n#period {\n    background-color: #cadbe4;    \n    grid-column: 2 / 3;\n    grid-row: 2 / 3;    \n    flex-direction: column;\n    justify-content: space-between;    \n    padding: 0.8em 0 0.8em 0;             \n}\n\n#period div {\n    display: flex;\n    justify-content: space-between;\n    gap: 15px;    \n}\n\n#period div .period-btn {\n    flex-grow: 1;    \n}\n\n#period div .prio-btn {\n    width: 50px;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 75%;      \n}\n\n#period button {    \n    font-family: \'Courier New\', Courier, monospace;    \n    background-color: azure;\n    border: 2px outset #80b3d1;    \n    font-weight: 600;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    border-radius: 5px;\n    box-shadow: -1px 2px 3px 1px #9aafb9;\n    font-size: 1.2em;        \n}\n\n#period div:nth-child(2) button:first-child, \n#period div:nth-child(4) button:first-child {\n    background-size: 50%;\n}\n\n#collection-controls {    \n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 1em;    \n}\n\n.collection-control-btn,\n#to-do-controls button {\n    background-color: azure;\n    border-color: #80b3d1;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 30% 38%;    \n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    padding: 18px;       \n    box-shadow: -1px 2px 3px 1px #9aafb9;  \n}\n\n#collections-header {    \n    background-color: #cadbe4;\n    color: #2F4858;\n    grid-column: 2 / 3;\n    grid-row: 3 / 4;\n    display: flex;         \n}\n\n#collections-header div {\n    width: 95%;\n    display: flex;\n    justify-content: center;       \n}\n\n#collections {\n    background-color: #cadbe4;\n    grid-column: 2 / 3;\n    grid-row: 4 / 5; \n    flex-direction: column;    \n    align-items: flex-start;\n    gap: 0.6em;        \n    margin-bottom: 0.8em;\n    overflow: auto;  \n}\n\n.collection {\n    background-color: azure;\n    border: 2px outset #80b3d1;    \n    display: flex;\n    flex-direction: column;\n    width: 100%;    \n    border-radius: 5px; \n    padding: 0.3em;\n    gap: 2px;    \n    box-shadow: -1px 2px 3px 1px #9aafb9;       \n}\n\n.collection-header {       \n    display: flex;\n    align-items: center;         \n}\n\n.collection-header-txt {    \n    background-color: azure;    \n    font-size: 1.3rem;    \n    text-align: left;\n    padding: 0 3px 0 3px;         \n}\n\n.collection-header button {\n    background-color: azure;\n    border: 2px solid #80b3d1;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 30% 38%;    \n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    padding: 0px 6px 0px 6px;\n    margin-bottom: 2px;\n    font-size: 1.1rem;\n    font-weight: 800;    \n}\n\n[data="last-clicked-collection"] {\n    border: 2px dashed #80b3d1;\n    color: #80b3d1; \n    font-weight: 600;\n}\n\n.progress-div {\n    flex-grow: 1;\n    display: flex;\n    justify-content: flex-end;\n    padding-right: 6px;\n}\n\n.todo-div {\n    display: flex;\n    flex-direction: column;    \n}\n\n[minimize="yes"] .todo-div {\n    display: none;\n}\n\n.to-do {   \n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    border-bottom: 1px dashed #80b3d1;\n    padding: 4px 0 4px 0;       \n}\n\n.to-do p {     \n    display: flex;\n    align-items: center;    \n    max-height: 75px;\n    padding-left: 4px;\n    padding-right: 4px;\n    overflow-x: hidden;      \n}\n\n\n[data="last-clicked-todo"] p {\n    color: #2F4858;    \n    border-left: 2px solid #2F4858;        \n    border-right: 2px solid #2F4858;     \n}\n\n.todo-header-subject {\n    white-space: pre;\n}\n\n.to-do div {\n    min-width: 30px;\n    \n}\n\n.clock {\n    display: flex;\n    justify-content: center;\n    height: 25px;      \n}\n\n.circle {\n    display: flex;\n    justify-content: center;\n    height: 12px;    \n}\n\n.snail {\n    display: flex;\n    justify-content: center;    \n    height: 19px;   \n}\n\n.check {\n    display: flex;\n    justify-content: center;    \n    height: 13px;\n    margin-bottom: 3px;   \n}\n\n.priority-icon-container img {\n    height: 100%;\n    width: 100%;    \n}\n\n.empty {\n    color: lightslategray;\n    font-style: italic;\n    padding: 3px 0 0 3px;\n}\n\n[minimize="yes"] .empty {\n    display: none;\n}\n\n#content {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 3 / 4;\n    grid-row: 2 / 5;\n    padding: 0.8em 4px 0.8em 0.8em;\n}\n\n#content-area-header {\n    background-color: #80b3d1;\n    border: 2px solid #80b3d1;\n    box-shadow: -1px 2px 3px 1px #9aafb9;\n    border-radius: 5px;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;     \n    display: flex;\n    justify-content: center;\n    align-items: flex-end;\n    height: fit-content; \n}\n\n#content-area-header p {\n    min-height: 35px;\n}\n\n.content-container {\n    flex-grow: 1;\n    background-color: azure;\n    height: 100%;\n    width: 100%;\n    border: 2px outset #80b3d1;\n    border-top: none;\n    border-radius: 5px;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n    box-shadow: -1px 2px 3px 1px #9aafb9;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));;\n    overflow: auto; \n}\n\n.to-do-details {\n    border: 2px outset #80b3d1;\n    min-height: 300px;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 15px;\n    gap: 0.3em;\n    overflow: auto;    \n}\n\n#right-side p {\n    text-align: center;\n    color: #2F4858;\n}\n\n#to-do-controls {\n    display: flex;\n    flex-direction: column;\n    gap: 1em; \n}\n\n#footer {\n    background-color: #2F4858;     \n    grid-column: 1 / 5;\n    grid-row: 5 / 6;    \n}\n\n#dialog-new-todo {\n    border: 2px outset #80b3d1;\n    border-radius: 5px;\n    box-shadow: -1px 2px 3px 1px #9aafb9;   \n    width: 200px;\n    padding: 10px;\n    position: absolute; \n    top: 60px;\n    left: calc(100% - 200px - 60px);    \n}\n\n.dialog-header {\n    display: flex;\n    justify-content: space-between;\n}\n\ndialog h2 {\n    border-bottom: 1px solid black;\n}\n\ndialog form {\n    padding-top: 10px;    \n    display: flex;\n    flex-direction: column;\n    gap: 10px;    \n}\n\ndialog p {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n}\n\ndialog form > div {\n    display: flex;\n    flex-grow: 1;\n    justify-content: space-between;        \n}\n\ndialog button {\n    background-color: azure;\n    border-color: #80b3d1;   \n    border-radius: 5px;\n    padding: 2px 6px 2px 6px;    \n}\n\ndialog p button {\n    background-color: azure;\n    border-color: #80b3d1;   \n    border-radius: 5px;\n    width: 40%;    \n}\n\ndialog input {    \n    display: flex;\n    flex-direction: column;\n    width: 95%;\n    height: 1.4rem;\n}\n\ndialog textarea {\n    max-width: 95%;\n    min-width: 95%;\n    min-height: 1.4rem;\n    max-height: 200px;\n    padding: 5px;\n}\n',"",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"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",sourcesContent:[':root {    \n    font-size: 16px;\n    font-family: \'Courier New\', Courier, monospace;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    scrollbar-color: #2F4858 azure;\n    scrollbar-width: thin;\n}\n\nh1 {\n    line-height: 1.9rem;\n}\n\nbody {\n    background-color: #cadbe4;    \n    height: 100vh;\n    width: 100vw;    \n    display: flex;\n    flex-direction: column;    \n}\n\n#app-grid {\n    flex-grow: 1;\n    display: grid;\n    grid-template-columns: 58px minmax(275px, 20%) minmax(400px, 1fr) 58px;\n    grid-template-rows: 25px minmax(210px, 1fr) 20px 3fr 25px;\n    overflow: auto;\n}\n\n#app-grid > div {\n    display: flex;      \n}\n\n#header {\n    background-color: #80b3d1;    \n    grid-column: 1 / 5;\n    grid-row: 1 / 2;    \n}\n\n#upper-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 2 / 4;      \n    padding: 0 4px 0 4px; \n}\n\n#lower-left-side {\n    background-color: #cadbe4;\n    flex-direction: column;   \n    grid-column: 1 / 2;\n    grid-row: 4 / 5;      \n    padding: 0 4px 0 4px;   \n}\n\n#right-side {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 4 / 5;\n    grid-row: 2 / 5;\n    padding: 0.8em 4px 0 0px;\n    gap: 5px;  \n}\n\n#period {\n    background-color: #cadbe4;    \n    grid-column: 2 / 3;\n    grid-row: 2 / 3;    \n    flex-direction: column;\n    justify-content: space-between;    \n    padding: 0.8em 0 0.8em 0;             \n}\n\n#period div {\n    display: flex;\n    justify-content: space-between;\n    gap: 15px;    \n}\n\n#period div .period-btn {\n    flex-grow: 1;    \n}\n\n#period div .prio-btn {\n    width: 50px;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 75%;      \n}\n\n#period button {    \n    font-family: \'Courier New\', Courier, monospace;    \n    background-color: azure;\n    border: 2px outset #80b3d1;    \n    font-weight: 600;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    border-radius: 5px;\n    box-shadow: -1px 2px 3px 1px #9aafb9;\n    font-size: 1.2em;        \n}\n\n#period div:nth-child(2) button:first-child, \n#period div:nth-child(4) button:first-child {\n    background-size: 50%;\n}\n\n#collection-controls {    \n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 1em;    \n}\n\n.collection-control-btn,\n#to-do-controls button {\n    background-color: azure;\n    border-color: #80b3d1;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 30% 38%;    \n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    padding: 18px;       \n    box-shadow: -1px 2px 3px 1px #9aafb9;  \n}\n\n#collections-header {    \n    background-color: #cadbe4;\n    color: #2F4858;\n    grid-column: 2 / 3;\n    grid-row: 3 / 4;\n    display: flex;         \n}\n\n#collections-header div {\n    width: 95%;\n    display: flex;\n    justify-content: center;       \n}\n\n#collections {\n    background-color: #cadbe4;\n    grid-column: 2 / 3;\n    grid-row: 4 / 5; \n    flex-direction: column;    \n    align-items: flex-start;\n    gap: 0.6em;        \n    margin-bottom: 0.8em;\n    overflow: auto;  \n}\n\n.collection {\n    background-color: azure;\n    border: 2px outset #80b3d1;    \n    display: flex;\n    flex-direction: column;\n    width: 100%;    \n    border-radius: 5px; \n    padding: 0.3em;\n    gap: 2px;    \n    box-shadow: -1px 2px 3px 1px #9aafb9;       \n}\n\n.collection-header {       \n    display: flex;\n    align-items: center;         \n}\n\n.collection-header-txt {    \n    background-color: azure;    \n    font-size: 1.3rem;    \n    text-align: left;\n    padding: 0 3px 0 3px;         \n}\n\n.collection-header button {\n    background-color: azure;\n    border: 2px solid #80b3d1;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 30% 38%;    \n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    padding: 0px 6px 0px 6px;\n    margin-bottom: 2px;\n    font-size: 1.1rem;\n    font-weight: 800;    \n}\n\n[data="last-clicked-collection"] {\n    border: 2px dashed #80b3d1;\n    color: #80b3d1; \n    font-weight: 600;\n}\n\n.progress-div {\n    flex-grow: 1;\n    display: flex;\n    justify-content: flex-end;\n    padding-right: 6px;\n}\n\n.todo-div {\n    display: flex;\n    flex-direction: column;    \n}\n\n[minimize="yes"] .todo-div {\n    display: none;\n}\n\n.to-do {   \n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    border-bottom: 1px dashed #80b3d1;\n    padding: 4px 0 4px 0;       \n}\n\n.to-do p {     \n    display: flex;\n    align-items: center;    \n    max-height: 75px;\n    padding-left: 4px;\n    padding-right: 4px;\n    overflow-x: hidden;      \n}\n\n\n[data="last-clicked-todo"] p {\n    color: #2F4858;    \n    border-left: 2px solid #2F4858;        \n    border-right: 2px solid #2F4858;     \n}\n\n.todo-header-subject {\n    white-space: pre;\n}\n\n.to-do div {\n    min-width: 30px;\n    \n}\n\n.clock {\n    display: flex;\n    justify-content: center;\n    height: 25px;      \n}\n\n.circle {\n    display: flex;\n    justify-content: center;\n    height: 12px;    \n}\n\n.snail {\n    display: flex;\n    justify-content: center;    \n    height: 19px;   \n}\n\n.check {\n    display: flex;\n    justify-content: center;    \n    height: 13px;\n    margin-bottom: 3px;   \n}\n\n.priority-icon-container img {\n    height: 100%;\n    width: 100%;    \n}\n\n.empty {\n    color: lightslategray;\n    font-style: italic;\n    padding: 3px 0 0 3px;\n}\n\n[minimize="yes"] .empty {\n    display: none;\n}\n\n#content {\n    background-color: #cadbe4;\n    flex-direction: column;    \n    grid-column: 3 / 4;\n    grid-row: 2 / 5;\n    padding: 0.8em 4px 0.8em 0.8em;\n}\n\n#content-area-header {\n    background-color: #80b3d1;\n    border: 2px solid #80b3d1;\n    box-shadow: -1px 2px 3px 1px #9aafb9;\n    border-radius: 5px;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;     \n    display: flex;\n    justify-content: center;\n    align-items: flex-end;\n    height: fit-content; \n}\n\n#content-area-header p {\n    min-height: 35px;\n}\n\n.content-container {\n    flex-grow: 1;\n    background-color: azure;\n    height: 100%;\n    width: 100%;\n    border: 2px outset #80b3d1;\n    border-top: none;\n    border-radius: 5px;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n    box-shadow: -1px 2px 3px 1px #9aafb9;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));;\n    overflow: auto; \n}\n\n.to-do-details {\n    border: 2px outset #80b3d1;\n    min-height: 300px;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 15px;\n    gap: 0.3em;\n    overflow: auto;    \n}\n\n#right-side p {\n    text-align: center;\n    color: #2F4858;\n}\n\n#to-do-controls {\n    display: flex;\n    flex-direction: column;\n    gap: 1em; \n}\n\n#footer {\n    background-color: #2F4858;     \n    grid-column: 1 / 5;\n    grid-row: 5 / 6;    \n}\n\n#dialog-new-todo {\n    border: 2px outset #80b3d1;\n    border-radius: 5px;\n    box-shadow: -1px 2px 3px 1px #9aafb9;   \n    width: 200px;\n    padding: 10px;\n    position: absolute; \n    top: 60px;\n    left: calc(100% - 200px - 60px);    \n}\n\n.dialog-header {\n    display: flex;\n    justify-content: space-between;\n}\n\ndialog h2 {\n    border-bottom: 1px solid black;\n}\n\ndialog form {\n    padding-top: 10px;    \n    display: flex;\n    flex-direction: column;\n    gap: 10px;    \n}\n\ndialog p {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n}\n\ndialog form > div {\n    display: flex;\n    flex-grow: 1;\n    justify-content: space-between;        \n}\n\ndialog button {\n    background-color: azure;\n    border-color: #80b3d1;   \n    border-radius: 5px;\n    padding: 2px 6px 2px 6px;    \n}\n\ndialog p button {\n    background-color: azure;\n    border-color: #80b3d1;   \n    border-radius: 5px;\n    width: 40%;    \n}\n\ndialog input {    \n    display: flex;\n    flex-direction: column;\n    width: 95%;\n    height: 1.4rem;\n}\n\ndialog textarea {\n    max-width: 95%;\n    min-width: 95%;\n    min-height: 1.4rem;\n    max-height: 200px;\n    padding: 5px;\n}\n'],sourceRoot:""}]);const d=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,A){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var d=0;d<this.length;d++){var a=this[d][0];null!=a&&(i[a]=!0)}for(var c=0;c<n.length;c++){var l=[].concat(n[c]);o&&i[l[0]]||(void 0!==A&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=A),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},354:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),A="/*# ".concat(r," */");return[e].concat([A]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var A={},i=[],d=0;d<n.length;d++){var a=n[d],c=o.base?a[0]+o.base:a[0],l=A[c]||0,s="".concat(c," ").concat(l);A[c]=l+1;var p=t(s),u={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var B=r(u,o);o.byIndex=d,e.splice(d,0,{identifier:s,updater:B,references:1})}i.push(s)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var A=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<A.length;i++){var d=t(A[i]);e[d].references--}for(var a=o(n,r),c=0;c<A.length;c++){var l=t(A[c]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}A=a}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var A=t.sourceMap;A&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(A))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var A=e[o]={id:o,exports:{}};return n[o](A,A.exports,t),A.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!n||!/^http(s?):/.test(n));)n=o[r--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.nc=void 0,(()=>{var n=t(72),e=t.n(n),o=t(825),r=t.n(o),A=t(659),i=t.n(A),d=t(56),a=t.n(d),c=t(540),l=t.n(c),s=t(113),p=t.n(s),u=t(365),B={};B.styleTagTransform=p(),B.setAttributes=a(),B.insert=i().bind(null,"head"),B.domAPI=r(),B.insertStyleElement=l(),e()(u.A,B),u.A&&u.A.locals&&u.A.locals;const x=t.p+"b5e4c11a18a61d1885cb.png",g=t.p+"b9170b32c767015ba274.png";function C(n,e){return e.push(function(n){let e=n,t=[];return{name:e,todos:t,clearTodos:()=>t.length=0,short:()=>e.slice(0,25)+"...",progress:function(){let n=t.length;if(0!=n){let e=0;for(let o=0;o<n;o++)t[o].status&&(e+=1);return Math.trunc(e/n*100)+"%"}return""}}}(n))}function f(n,e=["No subject","","",0]){n.todos.push(function(n,e,t,o=0){let r=n,A=0!=e.length?e:"no date set";return{subject:r,date:A,notes:t,priority:o,status:!1,short:()=>r.slice(0,50)+"..."}}(e[0],e[1],e[2],e[3]))}const m=t.p+"fcd87e98ea251a69d287.png",b=t.p+"2857fc837507cadfb13e.png",I=t.p+"6417130d13ce1d80c4c6.png",h=t.p+"4450f33a3e8d84741124.png";function y(n,e,t,o=""){const r=document.createElement("button");return""!=n&&r.classList.add(n),r.textContent=e,""!=o&&(r.style.backgroundImage="url('"+o+"')"),r.addEventListener("click",t),r}function k(n,e){let t;switch(e){case"clock":t=m;break;case"circle":t=b;break;case"snail":t=I;break;case"check":t=h}n.style.backgroundImage="url('"+t+"')"}function w(n){const e=document.createElement("div");e.classList.add("to-do"),e.id=n.subject;const t=document.createElement("div"),o=new Image;if(n.status)o.src=h,t.classList.add("check");else{const e=function(n){return 2===n?[m,"clock"]:1===n?[b,"circle"]:[I,"snail"]}(n.priority);o.src=e[0],t.classList.add(e[1])}const r=document.createElement("p");return r.classList.add("todo-header-subject"),n.subject.length>50?r.textContent=n.short():r.textContent=n.subject,r.addEventListener("click",O),t.appendChild(o),e.appendChild(t),e.appendChild(r),e}function v(n){const e=document.createElement("div");e.classList.add("collection"),e.id=n.name,e.addEventListener("click",Z);const t=document.createElement("div");t.classList.add("collection-header"),e.appendChild(t);const o=document.createElement("p");o.classList.add("collection-header-txt"),n.name.length>25?o.textContent=n.short():o.textContent=n.name;const r=document.createElement("div");r.classList.add("progress-div");const A=document.createElement("button");if(A.textContent="-",A.addEventListener("click",Q),t.append(o,r,A),n.todos.length>0){const t=document.createElement("div");t.classList.add("todo-div"),e.appendChild(t);for(let e=0;e<n.todos.length;e++)t.appendChild(w(n.todos[e]));r.textContent=n.progress()}else e.appendChild(E());return e}function E(){const n=document.createElement("div");return n.classList.add("empty"),n.textContent="This collection is empty...",n}const j=document.querySelector("#content .content-container");function z(){j.querySelectorAll(".to-do-details").forEach((n=>{n.remove()}))}function S(n,e){const t=document.createElement("div");t.classList.add("to-do-details"),e&&t.addEventListener("click",_);const o=document.createElement("h2");o.classList.add("to-do-subject"),o.textContent=n.subject;const r=document.createElement("h3");r.classList.add("to-do-date"),r.textContent="Due date: "+n.date;const A=document.createElement("h4");A.textContent="Notes:";const i=document.createElement("p");i.classList.add("to-do-notes"),""===n.notes?i.textContent="No additional information":i.textContent=n.notes;const d=document.createElement("p");switch(d.classList.add("to-do-prio"),n.priority){case 1:d.textContent="Priority: Medium",d.style.color="darkorange";break;case 2:d.textContent="Priority: High",d.style.color="darkred";break;default:d.textContent="Priority: Low",d.style.color="darkgrey"}const a=document.createElement("p");return a.classList.add("to-do-status"),n.status?(a.textContent="Status: Done",a.style.color="Darkgreen",a.style.fontWeight="700",d.style.color="darkgrey"):(a.textContent="Status: Not done",a.style.fontWeight="400",a.style.color=0==n.priority?"darkgrey":"darkred"),t.append(o,r,d,a,A,i),t}function q(n){z(),j.appendChild(S(n,!1))}function L(n){z();for(let e=0;e<n.todos.length;e++)j.appendChild(S(n.todos[e],!0))}function Y(n,e=[],t=""){if(null===n)return"null";if(void 0===n)return"undefined";if(0===n.length)return"empty";if(0!=n.length&&0===n.trim().length)return"whitespace";{let o=!1;return e!=[]&&""!=t&&e.forEach((e=>{e[t].toLocaleLowerCase()===n.trim().toLocaleLowerCase()&&(o=!0)})),o?"duplicate":"valid"}}function N(n){localStorage.setItem("collections",JSON.stringify(n))}const F=document.querySelector("#collections");function T(){let n=prompt("Name of the new collection:"),e=Y(n,H,"name");"valid"===e?(C(n.trim(),H),F.appendChild(v(H[H.length-1])),N(H)):"valid"!=e&&"null"!=e&&alert("Adding the new collection failed.\nreason: "+e)}let U="",D="";function M(){if(""!=U){const e=prompt('Are you sure you want to delete the collection named: "'+U+'"?\nConfirm by writing "yes"');null!=e&&null!=e&&("yes"===e.toLocaleLowerCase()?(function(n,e){for(let t=0;t<e.length;t++)if(e[t].name===n)return e.splice(t,1),e}(U,H),n=U,document.querySelectorAll(".collection").forEach((e=>{e.id===n&&e.remove()})),z(),N(H),U="",D=""):alert("Confirmation did not match!"))}else alert("No collection selected!");var n}function Z(n){const e=n.target.closest(".collection");e.id!=U&&(U=e.id,D="",document.querySelectorAll(".collection, .to-do").forEach((n=>{"last-clicked-collection"!==n.getAttribute("data")&&"last-clicked-todo"!==n.getAttribute("data")||n.removeAttribute("data")})),e.setAttribute("data","last-clicked-collection")),function(n){const e=document.querySelector("#content"),t=document.querySelector("#content-area-header");if(console.log(t),0!=t&&null!=t)document.querySelector("#content-area-header").textContent=n;else{const t=document.createElement("div");t.id="content-area-header",t.textContent=n,e.insertBefore(t,j)}}(U),H.forEach((n=>{n.name===U&&L(n)})),document.querySelectorAll(".to-do").forEach((n=>{"last-clicked-collection"!==n.getAttribute("data")&&"last-clicked-todo"!==n.getAttribute("data")||n.removeAttribute("data")})),D=""}function Q(n){n.stopImmediatePropagation();const e=n.target.closest(".collection"),t=e.querySelector(".collection-header .progress-div"),o=e.querySelector(".collection-header button");if("yes"!=e.getAttribute("minimize")){e.setAttribute("minimize","yes"),e.querySelector(".collection-header button").textContent="+";const n=e.querySelectorAll(".todo-div .to-do");if(0!=n.length){const t=n.length;let o=0;n.forEach((n=>{n.querySelector("div").classList.contains("check")&&(o+=1)}));const r=o+"/"+t;e.querySelector(".collection-header .progress-div").textContent=r}}else{e.removeAttribute("minimize");const n=H.find((n=>n.name===e.id));t.textContent=n.progress(),o.textContent="-"}}function O(n){n.stopImmediatePropagation(),Z(n);const e=n.target.closest(".to-do");e.id!=D&&(D=e.id,document.querySelectorAll(".to-do").forEach((n=>{"last-clicked-todo"===n.getAttribute("data")&&n.removeAttribute("data")})),e.setAttribute("data","last-clicked-todo")),H.forEach((n=>{n.name===U&&n.todos.forEach((n=>{n.subject===D&&q(n)}))}))}function _(n){const e=n.target.closest(".to-do-details");let t;D=e.querySelector(".to-do-subject").textContent,document.querySelectorAll(".to-do").forEach((n=>{n.id===D&&(t=n)})),t.setAttribute("data","last-clicked-todo"),H.forEach((n=>{n.name===U&&n.todos.forEach((n=>{n.subject===D&&q(n)}))}))}function P(){0!=U.length?function(n,e){const t=document.querySelector("#dialog-new-todo");t.querySelector(".submit-cancel").addEventListener("click",(()=>{t.close()})),t.querySelector("form").addEventListener("submit",e),t.showModal()}(0,R):alert("No collection selected!")}function R(n){let e=H.find((n=>n.name===U));const t=new FormData(n.target),o=t.get("todo-subject"),r=Y(o,e.todos,"subject");if("valid"===r){const n=t.get("todo-notes");let r=0;switch(t.get("todo-priority")){case"Low":r=0;break;case"Medium":r=1;break;case"High":r=2}f(e,[o,"",n,r]),N(H)}else"valid"!=r&&"null"!=r&&alert("Adding the new to-do failed.\nreason: "+r)}function W(){if(""!=D){const n=prompt('Are you sure you want to delete the to-do named: "'+D+'"?\nConfirm by writing "yes"');if(null!=n&&null!=n)if("yes"===n.toLocaleLowerCase()){const n=H.find((n=>n.name===U)),e=document.querySelector(".collection#"+U),t=document.querySelector("[data=last-clicked-todo]");(function(n,e){for(let t=0;t<e.length;t++)if(e[t].subject===n)return e.splice(t,1),e;alert("No such to-do found")})(D,n.todos),t.remove(),N(H),D="",L(n),"yes"!=e.getAttribute("minimize")&&(e.querySelector(".collection-header .progress-div").textContent=n.progress()),0===n.todos.length&&e.appendChild(E())}else alert("Confirmation did not match!")}else alert("No to-do selected!")}let H=[];!function(){if(function(n){let e;try{e=window.localStorage;const n="__storage_test__";return e.setItem(n,n),e.removeItem(n),!0}catch(n){return n instanceof DOMException&&(22===n.code||1014===n.code||"QuotaExceededError"===n.name||"NS_ERROR_DOM_QUOTA_REACHED"===n.name)&&e&&0!==e.length}}())if(localStorage.getItem("collections")){H=function(n){n=[];const e=JSON.parse(localStorage.getItem("collections"));for(let t=0;t<e.length;t++)if(C(e[t].name,n),0!=e[t].todos.length)for(let o=0;o<e[t].todos.length;o++){const r=[e[t].todos[o].subject,e[t].todos[o].date,e[t].todos[o].notes,e[t].todos[o].priority,e[t].todos[o].status];f(n[n.length-1],r)}return n}(H);for(let n=0;n<H.length;n++)document.querySelector("#collections").appendChild(v(H[n]))}else localStorage.setItem("collections",[]);else alert("No local storage available!\nCollections and to-do's cannot be saved!");const n=document.querySelectorAll(".prio-btn");k(n[0],"clock"),k(n[1],"circle"),k(n[2],"snail"),k(n[3],"check");const e=document.querySelector("#collection-controls"),t=(e.appendChild(y("collection-control-btn","",T,x)),e.appendChild(y("collection-control-btn","",M,g)),document.querySelector("#to-do-controls"));t.appendChild(y("","",P,x)),t.appendChild(y("","",W,g))}()})()})();
//# sourceMappingURL=main.js.map