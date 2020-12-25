!function(e){const o={};var n;(n=e.LOGLEVEL||(e.LOGLEVEL={}))[n.SILENT=0]="SILENT",n[n.ERROR=1]="ERROR",n[n.INFO=80]="INFO",n[n.DEBUG=90]="DEBUG",n[n.TRACE=100]="TRACE";let r=e.LOGLEVEL.SILENT;let t=[];const s=(o,n,...s)=>{t.forEach(r=>r(e.LOGLEVEL.ERROR,o,n,...s)),r>=e.LOGLEVEL.ERROR&&console.error(n,o,...s)},a=(o,n,...s)=>{if(t.forEach(r=>r(e.LOGLEVEL.INFO,o,n,...s)),r>=e.LOGLEVEL.INFO){(r===e.LOGLEVEL.TRACE?console.trace:console.log)(n,o,...s)}},i=(o,n,...s)=>{if(t.forEach(r=>r(e.LOGLEVEL.DEBUG,o,n,...s)),r>=e.LOGLEVEL.DEBUG){(r===e.LOGLEVEL.TRACE?console.trace:console.log)(n,o,...s)}},c={queue:{},list:{}};function l(e){return e.reduce((e,o)=>`${e};${o.name};`,"")}const d=new class{constructor(){this.actionDictionary={}}on(e,o){if(Array.isArray(e)){const n=l(e);if(c.list[n])throw s("Hypothalamus.on",new Error("Cannot register the same list of hormones twice"),n),new Error("Cannot register the same list of hormones twice");a("[Hypothalamus.on] Adding new action when all in a list of hormones are released",n,e),c.list[n]={hormones:[...e],callback:o}}else a("Hypothalamus.on","Adding new action when a hormone is released",e.name),this.actionDictionary[e.name]=this.actionDictionary[e.name]||[],this.actionDictionary[e.name].push(o)}drop(e){Array.isArray(e)?(i("Hypothalamus.drop","Dropping a list of hormones",l(e),e),delete c.queue[l(e)],delete c.list[l(e)]):(i("Hypothalamus.drop","Dropping a hormone",e.name),this.actionDictionary[e.name]=[])}dropAll(){i("Hypothalamus.dropAll","Dropping all hormones"),this.actionDictionary={},c.queue={},c.list={}}orchestrate(e,o){this.actionDictionary[e.name]&&this.actionDictionary[e.name].forEach(e=>e(o));const n=Object.keys(c.queue).filter(o=>o.indexOf(`;${e.name};`)>-1),r=Object.keys(c.list).filter(o=>o.indexOf(`;${e.name};`)>-1&&n.every(e=>e!==o));r.forEach(e=>{c.queue[e]={hormones:[...c.list[e].hormones],values:{},callback:c.list[e].callback}});const t=[...new Set([...n,...r])];for(let n=0;n<t.length;n++){const r=t[n];c.queue[r].hormones=c.queue[r].hormones.filter(o=>o.name!==e.name),c.queue[r].values[e.name]=o,c.queue[r].hormones.length<1&&(c.queue[r].callback(c.queue[r].values),delete c.queue[r])}}};function m(e,n={}){if(o[e]&&!n.loadIfExists)throw s("hormone.defineHormone",new Error("Hormone already created"),e),new Error("Hormone already created");if(o[e]&&n.loadIfExists)return i("hormone.defineHormone","Hormone already created, reusing existing",e),{name:e};const{defaultValue:r,transformation:t,readOnce:a}=n;return o[e]={name:e,value:r,defaultValue:r,transformation:t,receptors:[],readOnce:null!=a&&a},{name:e}}e.defineHormone=m,e.defineSingleHormone=function(e,o={}){return m(e,Object.assign(Object.assign({},o),{readOnce:!0}))},e.hypothalamus=d,e.releaseHormone=async function(e,n){if(!e)throw s("hormone.releaseHormone",new Error("Hormone cannot be undefined")),new Error("Hormone cannot be undefined");const{name:r}=e;if(!o[r])throw s("hormone.releaseHormone",new Error("Hormone does not exist"),r),new Error("Hormone does not exist");var t;t=n,o[r].value=(void 0===t||t instanceof Function)&&n?n(o[r].value):n,a("hormone.releaseHormone","Releasing passed hormone",r,o[r].value);const{receptors:c,transformation:l}=o[r];l&&l(o[r].value);const m=o[r].value;return d.orchestrate({name:r},m),await Promise.all(c.filter(e=>{const o=void 0===e.onlyIf||e.onlyIf(m);return i("hormone.releaseHormone",o?"Keeping receptor because condition matched or no condition":"Filtered receptor from the triggers because condition not matched",e),o}).map(e=>null==e?void 0:e.onTriggered(m))),o[r].readOnce&&(i("hormone.releaseHormone","Resetting hormone because it is readOnce",r),o[r].value=o[r].defaultValue),Object.assign({},o[r])},e.setLoglevel=e=>r=e,e.useReceptor=function(n,{name:i},c,l){const d=null!=l?l:c,m=l?c:void 0;if(!o[i])throw s("receptor.useReceptor",new Error("Hormone is not defined"),i),new Error(`Hormone "${i}" is not defined`);((e,n,r)=>!o[n].receptors.some(o=>{var n;return o.parent===e&&(null===(n=o.onlyIf)||void 0===n?void 0:n.toString())===(null==r?void 0:r.toString())}))(n,i,m)?(a("receptor.useReceptor","Pushing new receptor to hormone",i,{parent:n}),o[i].receptors.push({parent:n,onlyIf:m,onTriggered:d}),void 0!==o[i].value?d(o[i].value):void 0!==o[i].defaultValue&&d(o[i].defaultValue)):((o,n,...s)=>{t.forEach(r=>r(e.LOGLEVEL.TRACE,o,n,...s)),r===e.LOGLEVEL.TRACE&&console.trace(n,o,...s)})("receptor.useReceptor","Receptor not pushed because already subscribed",i,{parent:n})}}({});
