Object.defineProperty(exports,"o",{value:!0});const e={};var o;(o=exports.LOGLEVEL||(exports.LOGLEVEL={}))[o.SILENT=0]="SILENT",o[o.ERROR=1]="ERROR",o[o.INFO=80]="INFO",o[o.DEBUG=90]="DEBUG",o[o.TRACE=100]="TRACE";let r=exports.LOGLEVEL.SILENT;let n=[];const t=(e,o,...t)=>{n.forEach(r=>r(exports.LOGLEVEL.ERROR,e,o,...t)),r>=exports.LOGLEVEL.ERROR&&console.error(o,e,...t)},s=(e,o,...t)=>{if(n.forEach(r=>r(exports.LOGLEVEL.INFO,e,o,...t)),r>=exports.LOGLEVEL.INFO){(r===exports.LOGLEVEL.TRACE?console.trace:console.log)(o,e,...t)}},a=(e,o,...t)=>{if(n.forEach(r=>r(exports.LOGLEVEL.DEBUG,e,o,...t)),r>=exports.LOGLEVEL.DEBUG){(r===exports.LOGLEVEL.TRACE?console.trace:console.log)(o,e,...t)}},i={queue:{},list:{}};function c(e){return e.reduce((e,o)=>`${e};${o.name};`,"")}const l=new class{constructor(){this.actionDictionary={}}on(e,o){if(Array.isArray(e)){const r=c(e);if(i.list[r])throw t("Hypothalamus.on",new Error("Cannot register the same list of hormones twice"),r),new Error("Cannot register the same list of hormones twice");s("[Hypothalamus.on] Adding new action when all in a list of hormones are released",r,e),i.list[r]={hormones:[...e],callback:o}}else s("Hypothalamus.on","Adding new action when a hormone is released",e.name),this.actionDictionary[e.name]=this.actionDictionary[e.name]||[],this.actionDictionary[e.name].push(o)}drop(e){Array.isArray(e)?(a("Hypothalamus.drop","Dropping a list of hormones",c(e),e),delete i.queue[c(e)],delete i.list[c(e)]):(a("Hypothalamus.drop","Dropping a hormone",e.name),this.actionDictionary[e.name]=[])}dropAll(){a("Hypothalamus.dropAll","Dropping all hormones"),this.actionDictionary={},i.queue={},i.list={}}orchestrate(e,o){this.actionDictionary[e.name]&&this.actionDictionary[e.name].forEach(e=>e(o));const r=Object.keys(i.queue).filter(o=>o.indexOf(`;${e.name};`)>-1),n=Object.keys(i.list).filter(o=>o.indexOf(`;${e.name};`)>-1&&r.every(e=>e!==o));n.forEach(e=>{i.queue[e]={hormones:[...i.list[e].hormones],values:{},callback:i.list[e].callback}});const t=[...new Set([...r,...n])];for(let r=0;r<t.length;r++){const n=t[r];i.queue[n].hormones=i.queue[n].hormones.filter(o=>o.name!==e.name),i.queue[n].values[e.name]=o,i.queue[n].hormones.length<1&&(i.queue[n].callback(i.queue[n].values),delete i.queue[n])}}};function d(o,r={}){if(e[o]&&!r.loadIfExists)throw t("hormone.defineHormone",new Error("Hormone already created"),o),new Error("Hormone already created");if(e[o]&&r.loadIfExists)return a("hormone.defineHormone","Hormone already created, reusing existing",o),{name:o};const{defaultValue:n,transformation:s,readOnce:i}=r;return e[o]={name:o,value:n,defaultValue:n,transformation:s,receptors:[],readOnce:null!=i&&i},{name:o}}exports.defineHormone=d,exports.defineSingleHormone=function(e,o={}){return d(e,Object.assign(Object.assign({},o),{readOnce:!0}))},exports.hypothalamus=l,exports.releaseHormone=async function(o,r){if(!o)throw t("hormone.releaseHormone",new Error("Hormone cannot be undefined")),new Error("Hormone cannot be undefined");const{name:n}=o;if(!e[n])throw t("hormone.releaseHormone",new Error("Hormone does not exist"),n),new Error("Hormone does not exist");var i;i=r,e[n].value=(void 0===i||i instanceof Function)&&r?r(e[n].value):r,s("hormone.releaseHormone","Releasing passed hormone",n,e[n].value);const{receptors:c,transformation:d}=e[n];return d&&d(e[n].value),l.orchestrate({name:n},e[n].value),await Promise.all(c.filter(o=>{const r=void 0===o.onlyIf||o.onlyIf(e[n].value);return a("hormone.releaseHormone",r?"Keeping receptor because condition matched or no condition":"Filtered receptor from the triggers because condition not matched",o),r}).map(o=>null==o?void 0:o.onTriggered(e[n].value))),e[n].readOnce&&(a("hormone.releaseHormone","Resetting hormone because it is readOnce",n),e[n].value=e[n].defaultValue),Object.assign({},e[n])},exports.setLoglevel=e=>r=e,exports.useReceptor=function(o,{name:a},i,c){const l=null!=c?c:i,d=c?i:void 0;if(!e[a])throw t("receptor.useReceptor",new Error("Hormone is not defined"),a),new Error(`Hormone "${a}" is not defined`);((o,r,n)=>!e[r].receptors.some(e=>{var r;return e.parent===o&&(null===(r=e.onlyIf)||void 0===r?void 0:r.toString())===(null==n?void 0:n.toString())}))(o,a,d)?(s("receptor.useReceptor","Pushing new receptor to hormone",a,{parent:o}),e[a].receptors.push({parent:o,onlyIf:d,onTriggered:l}),void 0!==e[a].value?l(e[a].value):void 0!==e[a].defaultValue&&l(e[a].defaultValue)):((e,o,...t)=>{n.forEach(r=>r(exports.LOGLEVEL.TRACE,e,o,...t)),r===exports.LOGLEVEL.TRACE&&console.trace(o,e,...t)})("receptor.useReceptor","Receptor not pushed because already subscribed",a,{parent:o})};
