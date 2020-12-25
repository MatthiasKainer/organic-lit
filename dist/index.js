const e={};var o;!function(e){e[e.SILENT=0]="SILENT",e[e.ERROR=1]="ERROR",e[e.INFO=80]="INFO",e[e.DEBUG=90]="DEBUG",e[e.TRACE=100]="TRACE"}(o||(o={}));let n=o.SILENT;const r=e=>n=e;let t=[];const s=(e,r,...s)=>{t.forEach(n=>n(o.ERROR,e,r,...s)),n>=o.ERROR&&console.error(r,e,...s)},a=(e,r,...s)=>{if(t.forEach(n=>n(o.INFO,e,r,...s)),n>=o.INFO){(n===o.TRACE?console.trace:console.log)(r,e,...s)}},i=(e,r,...s)=>{if(t.forEach(n=>n(o.DEBUG,e,r,...s)),n>=o.DEBUG){(n===o.TRACE?console.trace:console.log)(r,e,...s)}},c={queue:{},list:{}};function l(e){return e.reduce((e,o)=>`${e};${o.name};`,"")}const d=new class{constructor(){this.actionDictionary={}}on(e,o){if(Array.isArray(e)){const n=l(e);if(c.list[n])throw s("Hypothalamus.on",new Error("Cannot register the same list of hormones twice"),n),new Error("Cannot register the same list of hormones twice");a("[Hypothalamus.on] Adding new action when all in a list of hormones are released",n,e),c.list[n]={hormones:[...e],callback:o}}else a("Hypothalamus.on","Adding new action when a hormone is released",e.name),this.actionDictionary[e.name]=this.actionDictionary[e.name]||[],this.actionDictionary[e.name].push(o)}drop(e){Array.isArray(e)?(i("Hypothalamus.drop","Dropping a list of hormones",l(e),e),delete c.queue[l(e)],delete c.list[l(e)]):(i("Hypothalamus.drop","Dropping a hormone",e.name),this.actionDictionary[e.name]=[])}dropAll(){i("Hypothalamus.dropAll","Dropping all hormones"),this.actionDictionary={},c.queue={},c.list={}}orchestrate(e,o){this.actionDictionary[e.name]&&this.actionDictionary[e.name].forEach(e=>e(o));const n=Object.keys(c.queue).filter(o=>o.indexOf(`;${e.name};`)>-1),r=Object.keys(c.list).filter(o=>o.indexOf(`;${e.name};`)>-1&&n.every(e=>e!==o));r.forEach(e=>{c.queue[e]={hormones:[...c.list[e].hormones],values:{},callback:c.list[e].callback}});const t=[...new Set([...n,...r])];for(let n=0;n<t.length;n++){const r=t[n];c.queue[r].hormones=c.queue[r].hormones.filter(o=>o.name!==e.name),c.queue[r].values[e.name]=o,c.queue[r].hormones.length<1&&(c.queue[r].callback(c.queue[r].values),delete c.queue[r])}}};function m(e,o={}){return h(e,Object.assign(Object.assign({},o),{readOnce:!0}))}function h(o,n={}){if(e[o]&&!n.loadIfExists)throw s("hormone.defineHormone",new Error("Hormone already created"),o),new Error("Hormone already created");if(e[o]&&n.loadIfExists)return i("hormone.defineHormone","Hormone already created, reusing existing",o),{name:o};const{defaultValue:r,transformation:t,readOnce:a}=n;return e[o]={name:o,value:r,defaultValue:r,transformation:t,receptors:[],readOnce:null!=a&&a},{name:o}}async function u(o,n){if(!o)throw s("hormone.releaseHormone",new Error("Hormone cannot be undefined")),new Error("Hormone cannot be undefined");const{name:r}=o;if(!e[r])throw s("hormone.releaseHormone",new Error("Hormone does not exist"),r),new Error("Hormone does not exist");var t;t=n,e[r].value=(void 0===t||t instanceof Function)&&n?n(e[r].value):n,a("hormone.releaseHormone","Releasing passed hormone",r,e[r].value);const{receptors:c,transformation:l}=e[r];l&&l(e[r].value);const m=e[r].value;return d.orchestrate({name:r},m),await Promise.all(c.filter(e=>{const o=void 0===e.onlyIf||e.onlyIf(m);return i("hormone.releaseHormone",o?"Keeping receptor because condition matched or no condition":"Filtered receptor from the triggers because condition not matched",e),o}).map(e=>null==e?void 0:e.onTriggered(m))),e[r].readOnce&&(i("hormone.releaseHormone","Resetting hormone because it is readOnce",r),e[r].value=e[r].defaultValue),Object.assign({},e[r])}function p(r,{name:i},c,l){const d=null!=l?l:c,m=l?c:void 0;if(!e[i])throw s("receptor.useReceptor",new Error("Hormone is not defined"),i),new Error(`Hormone "${i}" is not defined`);((o,n,r)=>!e[n].receptors.some(e=>{var n;return e.parent===o&&(null===(n=e.onlyIf)||void 0===n?void 0:n.toString())===(null==r?void 0:r.toString())}))(r,i,m)?(a("receptor.useReceptor","Pushing new receptor to hormone",i,{parent:r}),e[i].receptors.push({parent:r,onlyIf:m,onTriggered:d}),void 0!==e[i].value?d(e[i].value):void 0!==e[i].defaultValue&&d(e[i].defaultValue)):((e,r,...s)=>{t.forEach(n=>n(o.TRACE,e,r,...s)),n===o.TRACE&&console.trace(r,e,...s)})("receptor.useReceptor","Receptor not pushed because already subscribed",i,{parent:r})}export{o as LOGLEVEL,h as defineHormone,m as defineSingleHormone,d as hypothalamus,u as releaseHormone,r as setLoglevel,p as useReceptor};
