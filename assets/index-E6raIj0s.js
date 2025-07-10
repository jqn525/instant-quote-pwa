(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"})});const g={brochures:{key:"brochures",name:"Brochures",description:"Tri-fold and bi-fold brochures",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:null,sizes:{small:{name:'8.5" x 11"',imposition:2},medium:{name:'11" x 17"',imposition:1},large:{name:'12" x 18"',imposition:1}},finishingOptions:[{name:"Scoring",description:"Creased, shipped flat",cost:.1},{name:"Folding",description:"Fold to final size",cost:.2}]},postcards:{key:"postcards",name:"Postcards",description:"Marketing postcards and mailers",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:null,sizes:{small:{name:'4" x 6"',imposition:8},medium:{name:'5" x 7"',imposition:4},large:{name:'6" x 9"',imposition:2}},finishingOptions:[]},flyers:{key:"flyers",name:"Flyers",description:"Single-sheet promotional flyers",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:null,sizes:{small:{name:'5.5" x 8.5"',imposition:4},medium:{name:'8.5" x 11"',imposition:2},large:{name:'8.5" x 14"',imposition:1},xlarge:{name:'11" x 17"',imposition:1}},finishingOptions:[]},bookmarks:{key:"bookmarks",name:"Bookmarks",description:"Custom printed bookmarks",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:null,sizes:{standard:{name:'2" x 6"',imposition:10},tall:{name:'2" x 7"',imposition:10},extra_tall:{name:'2" x 8"',imposition:10}},finishingOptions:[]},table_tents:{key:"table_tents",name:"Table Tent Cards",description:"Folded table display cards with scoring, folding & tape",pricing:{setupFee:75,overhead:{k:1.5,e:.85},variableCost:null},icon:null,sizes:{small:{name:'4" x 6"',imposition:2},medium:{name:'5" x 7"',imposition:2}},finishingOptions:[{name:"Scoring",description:"Creased, shipped flat",cost:.1},{name:"Folding",description:"Fold to final size",cost:.2},{name:"Double-Sided Tape",description:"Assembly tape application",cost:.2}]},magnets:{key:"magnets",name:"Magnets",description:"Custom printed magnets",isExternal:!0,pricing:{type:"interpolation",markup:1.25,minQuantity:25,quantityIncrement:5,supplierCosts:{"2X2":{brackets:[25,50,100,250,500,1e3],costs:[41,61,101,173,293,533]},"3X3":{brackets:[25,50,100,250,500,1e3],costs:[53,85,150,295,538,1023]},"4X4":{brackets:[25,50,100,250,500,1e3],costs:[69,118,216,460,867,1680]},"5X5":{brackets:[25,50,100,250,500,1e3],costs:[90,159,298,666,1279,2504]}}},icon:null,sizes:{"2X2":{key:"2X2",name:'2" × 2"',description:"Small square magnet"},"3X3":{key:"3X3",name:'3" × 3"',description:"Medium square magnet"},"4X4":{key:"4X4",name:'4" × 4"',description:"Large square magnet"},"5X5":{key:"5X5",name:'5" × 5"',description:"Extra large square magnet"}},finishingOptions:[],workflow:"simplified",orderRules:{minQuantity:25,quantityIncrement:5,orderNotes:["Minimum order: 25 pieces per artwork","Orders must be in increments of 5 pieces","Each artwork is priced separately (no bundling)","Custom sizes round up to next standard size"]},recommendedSize:"3X3",standardQuantities:[25,50,75,100,125,150,175,200,250,275]},stickers:{key:"stickers",name:"Stickers",description:"Custom die cut stickers (external supplier)",isExternal:!0,pricing:{type:"interpolation",markup:1.25,minQuantity:25,quantityIncrement:5,supplierCosts:{"2X2":{brackets:[25,50,100,250,500,1e3],costs:[35,52,86,147,249,453]},"3X3":{brackets:[25,50,100,250,500,1e3],costs:[45,72,128,251,458,870]},"4X4":{brackets:[25,50,100,250,500,1e3],costs:[59,100,184,391,737,1428]},"5X5":{brackets:[25,50,100,250,500,1e3],costs:[77,135,253,566,1087,2128]}}},icon:null,sizes:{"2X2":{key:"2X2",name:'2" × 2"',description:"Small custom die cut sticker"},"3X3":{key:"3X3",name:'3" × 3"',description:"Medium custom die cut sticker"},"4X4":{key:"4X4",name:'4" × 4"',description:"Large custom die cut sticker"},"5X5":{key:"5X5",name:'5" × 5"',description:"Extra large custom die cut sticker"}},finishingOptions:[],workflow:"simplified",orderRules:{minQuantity:25,quantityIncrement:5,orderNotes:["Minimum order: 25 pieces per artwork","Orders must be in increments of 5 pieces","Each artwork is priced separately (no bundling)","Custom sizes round up to next standard size"]},recommendedSize:"3X3",standardQuantities:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1e3]},sticker_sheets:{key:"sticker_sheets",name:"Sticker Sheets",description:"Custom kiss cut sticker sheets (external supplier)",isExternal:!0,pricing:{type:"interpolation",markup:1.25,minQuantity:25,quantityIncrement:5,supplierCosts:{"4X6":{brackets:[25,50,100,250,500,1e3],costs:[48,79,140,275,502,954]},"5X7":{brackets:[25,50,100,250,500,1e3],costs:[62,105,192,408,769,1490]},"5.5X8.5":{brackets:[25,50,100,250,500,1e3],costs:[75,132,247,552,1061,2077]}}},icon:null,sizes:{"4X6":{key:"4X6",name:'4" × 6"',description:"Small kiss cut sticker sheet"},"5X7":{key:"5X7",name:'5" × 7"',description:"Medium kiss cut sticker sheet"},"5.5X8.5":{key:"5.5X8.5",name:'5.5" × 8.5"',description:"Large kiss cut sticker sheet"}},finishingOptions:[],workflow:"simplified",orderRules:{minQuantity:25,quantityIncrement:5,orderNotes:["Minimum order: 25 pieces per artwork","Orders must be in increments of 5 pieces","Each artwork is priced separately (no bundling)","Custom sizes round up to next standard size"]},recommendedSize:"5X7",standardQuantities:[25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,125,150,175,200,250,300,350,400,450,500,600,700,800,900,1e3]}},x={minimumOrder:5,rushOrderMultiplier:1.5};console.log("🔍 Products.js loaded with products:",Object.keys(g));console.log("🔍 Magnets exists:",g.magnets?"YES":"NO");g.magnets&&console.log("🔍 Magnets pricing type:",g.magnets.pricing.type);const v={LYNODI312FSC:{brand:"Lynx",type:"text_stock",finish:"Uncoated",size:"13x19",weight:"60#",costPerSheet:.08548,displayName:"60# Text Uncoated"},LYNO416FSC:{brand:"Lynx",type:"text_stock",finish:"Uncoated",size:"13x19",weight:"80#",costPerSheet:.11397,displayName:"80# Text Uncoated"},LYNOC76FSC:{brand:"Lynx",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"80#",costPerSheet:.22408,displayName:"80# Cover Uncoated"},LYNOC95FSC:{brand:"Lynx",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"100#",costPerSheet:.2801,displayName:"100# Cover Uncoated"},LYNODIC11413FSC:{brand:"Lynx",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"120#",costPerSheet:.38147,displayName:"120# Cover Uncoated"},COUDCCDIC123513FSC:{brand:"Cougar",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"130#",costPerSheet:.538,displayName:"130# Cover Uncoated"},PACDIS42FSC:{brand:"Pacesetter",type:"text_stock",finish:"Silk",size:"13x19",weight:"80#",costPerSheet:.07702,displayName:"80# Text Silk"},PACDIS52FSC:{brand:"Pacesetter",type:"text_stock",finish:"Silk",size:"13x19",weight:"100#",costPerSheet:.09536,displayName:"100# Text Silk"},PACDISC7613FSC:{brand:"Pacesetter",type:"cover_stock",finish:"Silk",size:"13x19",weight:"80#",costPerSheet:.14204,displayName:"80# Cover Silk"},PACDISC9513FSC:{brand:"Pacesetter",type:"cover_stock",finish:"Silk",size:"13x19",weight:"100#",costPerSheet:.17756,displayName:"100# Cover Silk"},PACDISC12413FSC:{brand:"Pacesetter",type:"cover_stock",finish:"Silk",size:"13x19",weight:"130#",costPerSheet:.23176,displayName:"130# Cover Silk"}},L={brochures:{displayName:"Brochures",allowedTypes:["text_stock","cover_stock"],allowedWeights:null,defaultPaper:"PACDIS42FSC"},postcards:{displayName:"Postcards",allowedTypes:["cover_stock"],allowedWeights:null,defaultPaper:"LYNOC95FSC"},flyers:{displayName:"Flyers",allowedTypes:["text_stock","cover_stock"],allowedWeights:null,defaultPaper:"PACDIS42FSC"},bookmarks:{displayName:"Bookmarks",allowedTypes:["cover_stock"],allowedWeights:["80#","100#","120#","130#"],defaultPaper:"LYNODIC11413FSC"},table_tents:{displayName:"Table Tent Cards",allowedTypes:["cover_stock"],allowedWeights:["80#","100#","120#","130#"],defaultPaper:"PACDISC9513FSC"}};function $(l){const e=L[l];return e?Object.entries(v).filter(([t,i])=>!(!e.allowedTypes.includes(i.type)||e.allowedWeights&&!e.allowedWeights.includes(i.weight))).map(([t,i])=>({id:t,...i})):[]}function E(l){const e=L[l];return!e||!e.defaultPaper?null:{id:e.defaultPaper,...v[e.defaultPaper]}}const V=.1;function W(l){const e=L[l];return e?e.allowedTypes.map(t=>({key:t,name:t==="text_stock"?"Text Stock":"Cover Stock",description:t==="text_stock"?"Lighter weight, flexible paper for flyers and brochures":"Heavier weight, durable paper for postcards and premium materials"})):[]}function _(l,e){const t=$(l),i=new Set;return t.filter(s=>s.type===e).forEach(s=>i.add(s.weight)),Array.from(i).sort((s,r)=>{const n=parseInt(s.replace("#","")),o=parseInt(r.replace("#",""));return n-o})}function U(l,e,t){const i=$(l),s=new Set;return i.filter(r=>r.type===e&&r.weight===t).forEach(r=>s.add(r.finish)),Array.from(s).sort()}function K(l,e,t,i){return $(l).find(r=>r.type===e&&r.weight===t&&r.finish===i)}function z(l){const e=v[l];return e?e.type:null}function Q(l){const e=v[l];return e?e.weight:null}function N(l){const e=v[l];return e?e.finish:null}const H={pricingCache:{maxSize:100},mathCache:{maxSize:50}},S={JAVASCRIPT:"javascript",PROMISE:"promise",NETWORK:"network",VALIDATION:"validation",COMPONENT:"component",SERVICEWORKER:"serviceworker",INITIALIZATION:"initialization",CALCULATION:"calculation",STORAGE:"storage"};new Date().toISOString();const X=(l,e="USD")=>typeof l!="number"||isNaN(l)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:e,minimumFractionDigits:2,maximumFractionDigits:2}).format(l);class J{constructor(){this.errorLog=[],this.maxLogSize=100,this.userNotificationThreshold=3,this.errorCounts=new Map,this.setupGlobalErrorHandlers()}setupGlobalErrorHandlers(){window.addEventListener("error",e=>{var t;this.handleError({type:"javascript",message:e.message,filename:e.filename,line:e.lineno,column:e.colno,error:e.error,stack:(t=e.error)==null?void 0:t.stack})}),window.addEventListener("unhandledrejection",e=>{var t,i;this.handleError({type:"promise",message:((t=e.reason)==null?void 0:t.message)||"Unhandled promise rejection",error:e.reason,stack:(i=e.reason)==null?void 0:i.stack})}),"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("error",e=>{this.handleError({type:"serviceworker",message:"Service worker error",error:e.error})})}handleError(e,t={}){const{component:i="unknown",severity:s="error",userMessage:r=null,recoveryAction:n=null,suppressNotification:o=!1}=t,a={id:this.generateErrorId(),timestamp:new Date().toISOString(),type:e.type||"application",component:i,severity:s,message:e.message||"Unknown error",stack:e.stack,userAgent:navigator.userAgent,url:window.location.href,...e};if(this.logError(a),this.trackErrorFrequency(i,a.message),n&&typeof n=="function")try{n(a)}catch(c){this.logError({...a,id:this.generateErrorId(),type:"recovery",message:`Recovery failed: ${c.message}`,originalError:a})}!o&&this.shouldNotifyUser(i)&&this.showUserNotification(r||this.getDefaultUserMessage(s),s)}logError(e){if(this.errorLog.unshift(e),this.errorLog.length>this.maxLogSize&&(this.errorLog=this.errorLog.slice(0,this.maxLogSize)),e.severity==="critical")try{const t=JSON.parse(localStorage.getItem("instant-quote-critical-errors")||"[]");t.unshift(e),localStorage.setItem("instant-quote-critical-errors",JSON.stringify(t.slice(0,10)))}catch(t){console.warn("Failed to store critical error:",t)}}trackErrorFrequency(e,t){const i=`${e}:${t}`,s=this.errorCounts.get(i)||0;this.errorCounts.set(i,s+1),s>=5&&this.handleError({type:"pattern",message:`Recurring error detected in ${e}: ${t}`,frequency:s+1},{severity:"critical",component:"errorHandler"})}shouldNotifyUser(e){return this.errorLog.filter(i=>i.component===e&&Date.now()-new Date(i.timestamp).getTime()<6e4).length>=this.userNotificationThreshold}showUserNotification(e,t="error"){const i=document.createElement("div");i.className=`error-notification error-${t}`,i.innerHTML=`
      <div class="error-content">
        <div class="error-icon">${this.getErrorIcon(t)}</div>
        <div class="error-message">${e}</div>
        <button class="error-dismiss" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `,this.ensureNotificationStyles(),document.body.appendChild(i),setTimeout(()=>{i.parentElement&&i.remove()},t==="critical"?1e4:5e3)}getErrorIcon(e){switch(e){case"critical":return"⚠️";case"error":return"❌";case"warning":return"⚠️";default:return"ℹ️"}}getDefaultUserMessage(e){switch(e){case"critical":return"A critical error occurred. Please refresh the page. If the problem persists, contact support.";case"error":return"An error occurred. The application may not function correctly. Please try again.";case"warning":return"A minor issue was detected. Functionality may be limited.";default:return"Something unexpected happened. Please try again."}}ensureNotificationStyles(){if(document.getElementById("error-notification-styles"))return;const e=document.createElement("style");e.id="error-notification-styles",e.textContent=`
      .error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
      }
      
      .error-notification.error-critical {
        border-left: 4px solid #dc2626;
      }
      
      .error-notification.error-error {
        border-left: 4px solid #f59e0b;
      }
      
      .error-notification.error-warning {
        border-left: 4px solid #10b981;
      }
      
      .error-content {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 12px;
      }
      
      .error-icon {
        font-size: 20px;
        flex-shrink: 0;
      }
      
      .error-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: #374151;
      }
      
      .error-dismiss {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        flex-shrink: 0;
      }
      
      .error-dismiss:hover {
        color: #374151;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,document.head.appendChild(e)}generateErrorId(){return`err_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}wrapMethod(e,t,i){return function(...s){try{return e.apply(t,s)}catch(r){return m.handleError({type:"component",message:r.message,stack:r.stack,method:e.name},{component:i,severity:"error",recoveryAction:()=>{t.init&&typeof t.init=="function"&&t.init()}}),null}}}getErrorStats(){const e=Date.now(),t=this.errorLog.filter(i=>e-new Date(i.timestamp).getTime()<24*60*60*1e3);return{totalErrors:this.errorLog.length,last24Hours:t.length,byComponent:this.groupErrorsByComponent(),bySeverity:this.groupErrorsBySeverity(),topErrors:this.getTopErrors()}}groupErrorsByComponent(){const e={};for(const t of this.errorLog)e[t.component]=(e[t.component]||0)+1;return e}groupErrorsBySeverity(){const e={};for(const t of this.errorLog)e[t.severity]=(e[t.severity]||0)+1;return e}getTopErrors(){const e={};for(const t of this.errorLog){const i=`${t.component}: ${t.message}`;e[i]=(e[i]||0)+1}return Object.entries(e).sort(([,t],[,i])=>i-t).slice(0,5).map(([t,i])=>({error:t,count:i}))}clearErrorLog(){this.errorLog=[],this.errorCounts.clear(),localStorage.removeItem("instant-quote-critical-errors")}}const m=new J;class D{constructor(){this.cache=new Map,this.cacheMaxSize=100}calculatePrice(e,t,i){try{if(!e||!t||!i)return this.getEmptyPricingResult();const s=`${e.key||"unknown"}:${t}:${i}`;if(this.cache.has(s))return this.cache.get(s);const r=e.pricing.supplierCosts[t];if(!r)return console.warn(`No pricing data found for size: ${t}`),this.getEmptyPricingResult();const n=this.validateQuantity(i,e.pricing.minQuantity,e.pricing.quantityIncrement),o=this.getSupplierCost(r.brackets,r.costs,n),a=e.pricing.markup||1.25,c=o*a,d=c/n,p={setupFee:0,unitPrice:Math.round(d*100)/100,subtotal:Math.round(c*100)/100,tax:0,total:Math.round(c*100)/100,breakdown:{supplierCost:Math.round(o*100)/100,markup:a,customerPrice:Math.round(c*100)/100,validatedQuantity:n,originalQuantity:i,quantityAdjusted:i!==n,minimumApplied:n===e.pricing.minQuantity&&i<e.pricing.minQuantity}};return this.setCachedPrice(s,p),p}catch(s){return console.error("External pricing calculation failed:",s),this.getEmptyPricingResult()}}validateQuantity(e,t=25,i=5){if(e<t)return t;const s=e%i;return s===0?e:e+(i-s)}getSupplierCost(e,t,i){if(!e||!t||e.length!==t.length)throw new Error("Invalid brackets or costs data");const s=e.findIndex(r=>r===i);if(s!==-1)return t[s];if(i<=e[0])return t[0];if(i>e[e.length-1])return this.extrapolateAbove1000(i,e,t);for(let r=0;r<e.length-1;r++)if(i>e[r]&&i<=e[r+1]){const n=e[r],o=e[r+1],a=t[r],c=t[r+1];return a+(i-n)*(c-a)/(o-n)}return t[t.length-1]}extrapolateAbove1000(e,t,i){const s=t[t.length-1],r=i[i.length-1],n=t[t.length-2],o=i[i.length-2],a=(r-o)/(s-n),c=e-s;return r+c*a}getEmptyPricingResult(){return{setupFee:0,unitPrice:0,subtotal:0,tax:0,total:0,breakdown:{supplierCost:0,markup:1.25,customerPrice:0,validatedQuantity:0,originalQuantity:0,quantityAdjusted:!1,minimumApplied:!1}}}setCachedPrice(e,t){if(this.cache.size>=this.cacheMaxSize){const i=this.cache.keys().next().value;this.cache.delete(i)}this.cache.set(e,t)}clearCache(){this.cache.clear()}getValidQuantityOptions(e,t=1e3){const i=[],s=e.pricing.minQuantity||25,r=e.pricing.quantityIncrement||5;for(let n=s;n<=t;n+=r)i.push(n);return i}formatPrice(e){return typeof e!="number"||isNaN(e)?"$0.00":new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}).format(e)}}class G{constructor(e=null){this.settingsService=e,this.settings=x,this.externalPricingEngine=new D,this.pricingCache=new Map,this.cacheMaxSize=H.pricingCache.maxSize,this.mathPowCache=new Map,this.mathPowCacheMaxSize=H.mathCache.maxSize,this.settingsService&&this.settingsService.addEventListener&&this.settingsService.addEventListener("settingsChanged",()=>{this.clearCache()}),this.impositionLookup={"3.5x2":21,'3.5"x2"':21,"3x4":12,'3"x4"':12,"2x6":10,'2"x6"':10,"2x8":10,'2"x8"':10,"2x7":10,'2"x7"':10,"4x6":8,'4"x6"':8,"5x7":4,'5"x7"':4,"5.5x8.5":4,'5.5"x8.5"':4,"6x9":2,'6"x9"':2,"8.5x11":2,'8.5"x11"':2,"8.5x14":1,'8.5"x14"':1,"11x17":1,'11"x17"':1,"12x18":1,'12"x18"':1}}getEmptyPricingResult(){return{setupFee:0,unitPrice:0,subtotal:0,tax:0,total:0,breakdown:{setupFee:0,productionCost:0,materialsCost:0,finishingCost:0,optionModifiers:[],finishingOptions:[],variableCostPerPiece:0,minimumApplied:!1}}}generateCacheKey(e,t,i,s,r){const n=(e==null?void 0:e.name)||"unknown",o=(t==null?void 0:t.name)||"unknown",a=(i==null?void 0:i.map(p=>p.key||p.name).sort().join(","))||"none",c=(r==null?void 0:r.id)||"default",d=this.getSettingsHash();return`${n}:${o}:${a}:${s}:${c}:${d}`}getSettingsHash(){const e=this.getEffectiveSettings();return`${e.minimumOrder}:${JSON.stringify(e.setupFees)}:${JSON.stringify(e.volumeExponents)}`.replace(/[^a-zA-Z0-9]/g,"").substring(0,10)}getCachedPrice(e){return this.pricingCache.get(e)||null}setCachedPrice(e,t){if(this.pricingCache.size>=this.cacheMaxSize){const i=this.pricingCache.keys().next().value;this.pricingCache.delete(i)}this.pricingCache.set(e,t)}clearCache(){this.pricingCache.clear(),this.mathPowCache.clear(),this.externalPricingEngine&&this.externalPricingEngine.clearCache()}memoizedPow(e,t){const i=`${e}^${t}`;if(this.mathPowCache.has(i))return this.mathPowCache.get(i);const s=Math.pow(e,t);if(this.mathPowCache.size>=this.mathPowCacheMaxSize){const r=this.mathPowCache.keys().next().value;this.mathPowCache.delete(r)}return this.mathPowCache.set(i,s),s}getEffectiveSettings(){return this.settingsService?this.settingsService.getSettings():this.settings}updateSettings(e){this.settingsService||(this.settings={...this.settings,...e},this.clearCache())}getImposition(e){if(e&&e.imposition&&e.imposition>0)return e.imposition;if(e&&e.name){const t=e.name.toLowerCase().replace(/\s+/g,""),i=Object.keys(this.impositionLookup).find(s=>s.toLowerCase().replace(/\s+/g,"")===t);if(i)return this.impositionLookup[i]}return 2}calculateJobCost(e,t){if(!e||t<=0)return{setupFee:0,productionCost:0,materialsCost:0,totalCost:0};const{setupFee:i,overhead:s,variableCost:r}=e;if(!s||typeof s.e!="number"||typeof s.k!="number")return console.warn("Invalid overhead data in pricing calculation",{overhead:s,pricing:e}),{setupFee:i||0,productionCost:0,materialsCost:r?t*r:0,totalCost:(i||0)+(r?t*r:0)};const n=this.memoizedPow(t,s.e)*s.k,o=t*r,a=i+n+o;return{setupFee:i,productionCost:n,materialsCost:o,totalCost:a}}applyOptionMultipliers(e,t=[],i){let s=1;t&&t.length>0&&(s=t.reduce((o,a)=>a.modifier&&!a.cost?o*a.modifier:o,1));const r=e.materialsCost*s,n=e.setupFee+e.productionCost+r;return{setupFee:e.setupFee,productionCost:e.productionCost,materialsCost:r,totalCost:n,optionModifier:s}}async calculatePrice(e,t,i,s,r=null){try{if(!e||!e.pricing)return m.handleError({type:S.VALIDATION,message:"Invalid product provided to calculatePrice",context:{product:(e==null?void 0:e.name)||"undefined"}},{component:"PricingEngine",severity:"warning",suppressNotification:!0}),this.getEmptyPricingResult();if(!s||s<=0)return m.handleError({type:S.VALIDATION,message:"Invalid quantity provided to calculatePrice",context:{quantity:s,product:e.name}},{component:"PricingEngine",severity:"warning",suppressNotification:!0}),this.getEmptyPricingResult();if(e.isExternal||e.pricing.type==="interpolation"){let u=(t==null?void 0:t.key)||(t==null?void 0:t.name);return u&&u.includes('"')&&(u=u.replace(/"/g,"").replace(/\s*[x×]\s*/i,"X")),this.externalPricingEngine.calculatePrice(e,u,s)}const n=this.generateCacheKey(e,t,i,s,r),o=this.getCachedPrice(n);if(o)return o;const a=this.getEffectiveSettings();let c={...e.pricing};a.setupFees&&a.setupFees[e.key]&&(c.setupFee=a.setupFees[e.key]),a.productionRates&&a.productionRates[e.key]&&c.overhead&&(c.overhead.k=a.productionRates[e.key]),a.volumeExponents&&a.volumeExponents[e.key]&&c.overhead&&(c.overhead.e=a.volumeExponents[e.key]);const d=this.getImposition(t),p=a.clickCost||V;if(r&&t&&d>0){const y=(a.paperCosts&&a.paperCosts[r.id]?a.paperCosts[r.id]:r.costPerSheet)+p;c.variableCost=y*1.5/d}else c.variableCost=(.1+p)*1.5/d;const f=this.calculateJobCost(c,s),b=this.applyOptionMultipliers(f,i,s),M=i?i.reduce((u,y)=>{if(y.cost){const I=y.name.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,""),B=a.finishingCosts&&a.finishingCosts[I]?a.finishingCosts[I]:y.cost;return u+B*s}return u},0):0,k=b.setupFee,P=b.productionCost,w=b.materialsCost,T=k+P+w+M,O=T,R=s>0?(P+w)/s:0,q=a.minimumOrder||this.settings.minimumOrder,j=O<q,A=Math.max(O,q),F={setupFee:Math.round(k*100)/100,unitPrice:Math.round(R*100)/100,subtotal:Math.round(T*100)/100,tax:0,total:Math.round(A*100)/100,breakdown:{setupFee:Math.round(k*100)/100,productionCost:Math.round(P*100)/100,materialsCost:Math.round(w*100)/100,finishingCost:Math.round(M*100)/100,optionModifiers:i.filter(u=>u.modifier&&!u.cost).map(u=>({name:u.name,modifier:u.modifier})),finishingOptions:i.filter(u=>u.cost).map(u=>({name:u.name,cost:u.cost})),variableCostPerPiece:Math.round(c.variableCost*100)/100,minimumApplied:j}};return this.setCachedPrice(n,F),F}catch(n){return m.handleError({type:S.CALCULATION,message:`Pricing calculation failed: ${n.message}`,stack:n.stack,context:{product:e==null?void 0:e.name,size:t==null?void 0:t.name,quantity:s,paperType:r==null?void 0:r.type}},{component:"PricingEngine",severity:"error",userMessage:"Price calculation failed. Please try again or contact support.",recoveryAction:()=>this.getEmptyPricingResult()}),this.getEmptyPricingResult()}}formatPrice(e){try{return X(e)}catch{return m.handleError({type:S.COMPONENT,message:"Price formatting failed",context:{price:e}},{component:"PricingEngine",severity:"warning",suppressNotification:!0}),"$0.00"}}calculateRushOrder(e){const i=this.getEffectiveSettings().rushOrderMultiplier||this.settings.rushOrderMultiplier;return{unitPrice:Math.round(e.unitPrice*i*100)/100,subtotal:Math.round(e.subtotal*i*100)/100,tax:Math.round(e.subtotal*i*this.settings.taxRate*100)/100,total:Math.round(e.subtotal*i*(1+this.settings.taxRate)*100)/100,breakdown:{...e.breakdown,rushOrder:!0,rushMultiplier:i}}}}class Y{constructor(e){this.pricingEngine=e}generateQuote(e){const{product:t,size:i,options:s,quantity:r,pricing:n,customerInfo:o={},rushOrder:a=!1}=e,c=this.generateQuoteNumber(),d=new Date().toLocaleDateString();return{quoteNumber:c,date:d,customer:{name:o.name||"Walk-in Customer",phone:o.phone||"",email:o.email||""},items:[{description:this.buildItemDescription(t,i,s),quantity:r,unitPrice:n.unitPrice,total:n.subtotal}],subtotal:n.subtotal,tax:n.tax,total:n.total,rushOrder:a,notes:this.buildNotes(t,i,s,a)}}buildItemDescription(e,t,i){let s=e.name;if(t&&(s+=` - ${t.name}`),i&&i.length>0){const r=i.map(n=>n.name).join(", ");s+=` (${r})`}return s}buildNotes(e,t,i,s){const r=[];return e.description&&r.push(`Product: ${e.description}`),s&&r.push("RUSH ORDER - Expedited processing requested"),r.push("Quote valid for 30 days"),r.push("Payment required at time of order"),r}generateQuoteNumber(){const e=new Date,t=e.getFullYear().toString().slice(-2),i=(e.getMonth()+1).toString().padStart(2,"0"),s=e.getDate().toString().padStart(2,"0"),r=e.getTime().toString().slice(-4);return`Q${t}${i}${s}-${r}`}formatQuoteHTML(e){return`
      <div class="quote-header">
        <h2>Print Shop Quote</h2>
        <div class="quote-meta">
          <p><strong>Quote #:</strong> ${e.quoteNumber}</p>
          <p><strong>Date:</strong> ${e.date}</p>
          ${e.rushOrder?'<p class="rush-order"><strong>RUSH ORDER</strong></p>':""}
        </div>
      </div>
      
      <div class="customer-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${e.customer.name}</p>
        ${e.customer.phone?`<p><strong>Phone:</strong> ${e.customer.phone}</p>`:""}
        ${e.customer.email?`<p><strong>Email:</strong> ${e.customer.email}</p>`:""}
      </div>
      
      <div class="quote-items">
        <h3>Items</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${e.items.map(t=>`
              <tr>
                <td>${t.description}</td>
                <td>${t.quantity}</td>
                <td>${this.pricingEngine.formatPrice(t.unitPrice)}</td>
                <td>${this.pricingEngine.formatPrice(t.total)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      
      <div class="quote-totals">
        <div class="totals-row total">
          <span><strong>Total:</strong></span>
          <span><strong>${this.pricingEngine.formatPrice(e.total)}</strong></span>
        </div>
      </div>
      
      ${e.notes.length>0?`
        <div class="quote-notes">
          <h3>Notes</h3>
          <ul>
            ${e.notes.map(t=>`<li>${t}</li>`).join("")}
          </ul>
        </div>
      `:""}
    `}saveQuote(e){const t=this.getSavedQuotes();t.unshift(e),t.length>50&&t.splice(50),localStorage.setItem("instant-quote-history",JSON.stringify(t))}getSavedQuotes(){try{const e=localStorage.getItem("instant-quote-history");return e?JSON.parse(e):[]}catch(e){return console.error("Error loading saved quotes:",e),[]}}printQuote(e){const t=window.open("","_blank");t.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Quote</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .quote-header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .quote-meta { display: flex; gap: 20px; margin-top: 10px; }
          .rush-order { color: red; font-weight: bold; }
          .quote-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          .quote-table th, .quote-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .quote-table th { background-color: #f5f5f5; }
          .quote-totals { margin-top: 20px; }
          .totals-row { display: flex; justify-content: space-between; padding: 5px 0; }
          .totals-row.total { border-top: 2px solid #333; font-weight: bold; }
          .quote-notes ul { margin: 0; padding-left: 20px; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${e}
      </body>
      </html>
    `),t.document.close(),t.print()}}class Z{constructor(e=null){this.items=[],this.listeners=[],this.pricingEngine=e,this.loadFromStorage()}setPricingEngine(e){this.pricingEngine=e}addItem(e,t,i,s,r,n=null){const o=this.generateItemId(e,t,i),a=this.items.find(c=>c.id===o);if(a){const c=a.quantity+s;a.quantity=c,this.pricingEngine?a.pricing=this.pricingEngine.calculatePrice(a.product,a.size,a.options,c,a.paper||null):a.pricing=r}else this.items.push({id:o,product:{...e},size:{...t},options:[...i],quantity:s,pricing:r,paper:n?{...n}:null,dateAdded:new Date().toISOString()});this.saveToStorage(),this.notifyListeners()}removeItem(e){this.items=this.items.filter(t=>t.id!==e),this.saveToStorage(),this.notifyListeners()}updateQuantity(e,t){const i=this.items.find(s=>s.id===e);i&&(t<=0?this.removeItem(e):(i.quantity=t,this.pricingEngine&&(i.pricing=this.pricingEngine.calculatePrice(i.product,i.size,i.options,t,i.paper||null)),this.saveToStorage(),this.notifyListeners()))}clearCart(){this.items=[],this.saveToStorage(),this.notifyListeners()}getItems(){return[...this.items]}getItemCount(){return this.items.reduce((e,t)=>e+t.quantity,0)}getTotalPrice(){return this.items.reduce((e,t)=>e+t.pricing.total,0)}getSubtotal(){return this.items.reduce((e,t)=>e+t.pricing.subtotal,0)}getTotalTax(){return this.items.reduce((e,t)=>e+t.pricing.tax,0)}generateItemId(e,t,i){const s=i.map(r=>r.key).sort().join(",");return`${e.key}_${t.key}_${s}`}getItemDescription(e){let t=`${e.product.name}`;if(e.size&&(t+=` - ${e.size.name}`),e.options.length>0){const i=e.options.map(s=>s.name).join(", ");t+=` (${i})`}return t}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notifyListeners(){this.listeners.forEach(e=>e(this.getCartSummary()))}getCartSummary(){return{items:this.getItems(),count:this.getItemCount(),subtotal:this.getSubtotal(),tax:this.getTotalTax(),total:this.getTotalPrice()}}saveToStorage(){try{localStorage.setItem("printShopCart",JSON.stringify(this.items))}catch(e){console.error("Failed to save cart to storage:",e)}}loadFromStorage(){try{const e=localStorage.getItem("printShopCart");e&&(this.items=JSON.parse(e))}catch(e){console.error("Failed to load cart from storage:",e),this.items=[]}}generateQuoteData(){return{items:this.items.map(e=>({description:this.getItemDescription(e),quantity:e.quantity,unitPrice:e.pricing.unitPrice,total:e.pricing.total})),subtotal:this.getSubtotal(),tax:this.getTotalTax(),total:this.getTotalPrice(),dateGenerated:new Date().toISOString(),itemCount:this.getItemCount()}}}class ee{constructor(){this.rateLimitMap=new Map,this.defaultRateLimit=100,this.rateLimitWindow=6e4}sanitizeString(e,t={}){if(typeof e!="string")return"";const{maxLength:i=1e3,allowHtml:s=!1,allowLineBreaks:r=!0}=t;let n=e.trim().slice(0,i);return s||(n=n.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/<[^>]*>/g,"").replace(/&(?:lt|gt|quot|amp|#x?\d+);/g,"")),r||(n=n.replace(/[\r\n]/g," ")),n=n.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,""),n}validateNumber(e,t={}){const{min:i=Number.NEGATIVE_INFINITY,max:s=Number.POSITIVE_INFINITY,allowFloat:r=!0,required:n=!1}=t,o={isValid:!1,value:null,errors:[]};if(e==null)return n?o.errors.push("Value is required"):(o.isValid=!0,o.value=null),o;const a=Number(e);return isNaN(a)||!isFinite(a)?(o.errors.push("Must be a valid number"),o):!r&&!Number.isInteger(a)?(o.errors.push("Must be a whole number"),o):a<i?(o.errors.push(`Must be at least ${i}`),o):a>s?(o.errors.push(`Must be no more than ${s}`),o):(o.isValid=!0,o.value=a,o)}validatePricingParameter(e,t,i=null){const s={isValid:!1,value:null,errors:[]};try{switch(e){case"setupFees":const r=this.validateNumber(t,{min:0,max:1e3,allowFloat:!0,required:!0});if(!r.isValid)return s.errors=r.errors,s;s.value=Math.round(r.value*100)/100;break;case"productionRates":const n=this.validateNumber(t,{min:.01,max:100,allowFloat:!0,required:!0});if(!n.isValid)return s.errors=n.errors,s;s.value=Math.round(n.value*100)/100;break;case"volumeExponents":const o=this.validateNumber(t,{min:.1,max:1.5,allowFloat:!0,required:!0});if(!o.isValid)return s.errors=o.errors,s;s.value=Math.round(o.value*1e3)/1e3;break;case"finishingCosts":const a=this.validateNumber(t,{min:0,max:50,allowFloat:!0,required:!0});if(!a.isValid)return s.errors=a.errors,s;s.value=Math.round(a.value*100)/100;break;case"paperCosts":const c=this.validateNumber(t,{min:0,max:10,allowFloat:!0,required:!0});if(!c.isValid)return s.errors=c.errors,s;s.value=Math.round(c.value*100)/100;break;case"clickCost":const d=this.validateNumber(t,{min:0,max:5,allowFloat:!0,required:!0});if(!d.isValid)return s.errors=d.errors,s;s.value=Math.round(d.value*100)/100;break;case"minimumOrder":const p=this.validateNumber(t,{min:0,max:100,allowFloat:!0,required:!0});if(!p.isValid)return s.errors=p.errors,s;s.value=Math.round(p.value*100)/100;break;case"rushOrderMultiplier":const f=this.validateNumber(t,{min:1,max:5,allowFloat:!0,required:!0});if(!f.isValid)return s.errors=f.errors,s;s.value=Math.round(f.value*100)/100;break;default:return s.errors.push(`Unknown parameter: ${e}`),s}return s.isValid=!0,s}catch{return s.errors.push("Validation error occurred"),s}}safeJsonParse(e,t=null){try{return typeof e!="string"?t:e.includes("function")||e.includes("eval")||e.includes("script")?(console.warn("Potentially unsafe JSON content detected"),t):JSON.parse(e)}catch(i){return console.warn("JSON parsing failed:",i),t}}checkRateLimit(e,t=this.defaultRateLimit,i=this.rateLimitWindow){const s=Date.now(),r=s-i;this.rateLimitMap.has(e)||this.rateLimitMap.set(e,[]);const o=this.rateLimitMap.get(e).filter(a=>a>r);return this.rateLimitMap.set(e,o),o.length>=t?!1:(o.push(s),this.rateLimitMap.set(e,o),!0)}validateSettingsStructure(e){const t={isValid:!0,sanitizedSettings:{},errors:[]};if(!e||typeof e!="object")return t.isValid=!1,t.errors.push("Settings must be an object"),t;const i=["setupFees","productionRates","volumeExponents","finishingCosts","paperCosts","clickCost","minimumOrder","rushOrderMultiplier"];for(const s of i)s in e||(t.errors.push(`Missing required setting: ${s}`),t.isValid=!1);for(const[s,r]of Object.entries(e))if(typeof r=="object"&&r!==null){t.sanitizedSettings[s]={};for(const[n,o]of Object.entries(r)){const a=this.validatePricingParameter(s,o,n);a.isValid?t.sanitizedSettings[s][n]=a.value:(t.errors.push(`${s}.${n}: ${a.errors.join(", ")}`),t.isValid=!1)}}else{const n=this.validatePricingParameter(s,r);n.isValid?t.sanitizedSettings[s]=n.value:(t.errors.push(`${s}: ${n.errors.join(", ")}`),t.isValid=!1)}return t}cleanupRateLimitMap(){const e=Date.now();for(const[t,i]of this.rateLimitMap.entries()){const s=i.filter(r=>r>e-this.rateLimitWindow);s.length===0?this.rateLimitMap.delete(t):this.rateLimitMap.set(t,s)}}}const C=new ee;class te{constructor(){this.eventTarget=new EventTarget,this.storageKey="instant-quote-settings",this.settings=this.loadSettings()}loadSettings(){try{const e=localStorage.getItem(this.storageKey);if(e){const t=C.safeJsonParse(e,null);if(t){const i=C.validateSettingsStructure(t);if(i.isValid)return{...this.getDefaultSettings(),...i.sanitizedSettings};console.warn("Invalid settings detected, using defaults:",i.errors),localStorage.removeItem(this.storageKey)}}}catch(e){console.warn("Failed to load settings from localStorage:",e),localStorage.removeItem(this.storageKey)}return this.getDefaultSettings()}saveSettings(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.settings))}catch(e){console.warn("Failed to save settings to localStorage:",e)}}getDefaultSettings(){const e={};Object.keys(g).forEach(n=>{const o=g[n];o.isExternal||o.pricing.type==="interpolation"||(o.pricing&&typeof o.pricing.setupFee=="number"?e[n]=o.pricing.setupFee:console.warn(`Product ${n} missing setup fee`))});const t={},i={};Object.keys(g).forEach(n=>{const o=g[n];o.isExternal||o.pricing.type==="interpolation"||(o.pricing&&o.pricing.overhead?(t[n]=o.pricing.overhead.k,i[n]=o.pricing.overhead.e):console.warn(`Product ${n} missing overhead pricing structure`))});const s={};Object.keys(g).forEach(n=>{const o=g[n];o.finishingOptions&&o.finishingOptions.length>0&&o.finishingOptions.forEach(a=>{const c=a.name.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");s[c]=a.cost})});const r={};return Object.keys(v).forEach(n=>{r[n]=v[n].costPerSheet}),{setupFees:e,productionRates:t,volumeExponents:i,finishingCosts:s,paperCosts:r,clickCost:V,minimumOrder:x.minimumOrder,rushOrderMultiplier:x.rushOrderMultiplier}}getSettings(){return{...this.settings}}getSetting(e,t=null){return t?this.settings[e]&&this.settings[e][t]:this.settings[e]}updateSetting(e,t,i=null){const s={success:!1,errors:[]};try{const r=`settings_update_${e}_${i||"root"}`;if(!C.checkRateLimit(r,50,6e4))return s.errors.push("Too many updates. Please wait before making more changes."),s;const n=C.validatePricingParameter(e,t,i);return n.isValid?(i?(this.settings[e]||(this.settings[e]={}),this.settings[e][i]=n.value):this.settings[e]=n.value,this.saveSettings(),console.log("⚙️ SettingsService: Setting changed",{key:e,value:n.value,subKey:i,newSettings:this.settings,timestamp:new Date().toISOString()}),this.dispatchEvent("settingsChanged",{key:e,value:n.value,subKey:i}),s.success=!0,s):(s.errors=n.errors,s)}catch(r){return console.error("Error updating setting:",r),s.errors.push("An error occurred while updating the setting"),s}}resetToDefaults(){this.settings=this.getDefaultSettings(),this.saveSettings(),this.dispatchEvent("settingsChanged",{reset:!0})}addEventListener(e,t){this.eventTarget.addEventListener(e,t)}removeEventListener(e,t){this.eventTarget.removeEventListener(e,t)}dispatchEvent(e,t){this.eventTarget.dispatchEvent(new CustomEvent(e,{detail:t}))}exportSettings(){return JSON.stringify(this.settings,null,2)}importSettings(e){try{const t=JSON.parse(e);return this.settings={...this.getDefaultSettings(),...t},this.saveSettings(),this.dispatchEvent("settingsChanged",{imported:!0}),!0}catch(t){return console.error("Failed to import settings:",t),!1}}}const ie={checkmark:`
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,brochure:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,postcard:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,poster:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
      <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,businessCard:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6H4C2.9 6 2 6.9 2 8V16C2 17.1 2.9 18 4 18H20C21.1 18 22 17.1 22 16V8C22 6.9 21.1 6 20 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 10H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 14H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="17" cy="12" r="2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,banner:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 15S5 14 8 14S12 15 12 15S13 14 16 14S20 15 20 15V3S19 4 16 4S12 3 12 3S11 4 8 4S4 3 4 3V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 22V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,flyer:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 16H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8H16" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,bookmark:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,table_tent:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20L12 8L21 20H3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8V20" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
    </svg>
  `,cart:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="21" r="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="21" r="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,plus:`
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,minus:`
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,trash:`
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.5 4V13C12.5 13.5304 12.2893 14.0391 11.9142 14.4142C11.5391 14.7893 11.0304 15 10.5 15H5.5C4.96957 15 4.46086 14.7893 4.08579 14.4142C3.71071 14.0391 3.5 13.5304 3.5 13V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.5 4V2.5C5.5 2.23478 5.60536 1.98043 5.79289 1.79289C5.98043 1.60536 6.23478 1.5 6.5 1.5H9.5C9.76522 1.5 10.0196 1.60536 10.2071 1.79289C10.3946 1.98043 10.5 2.23478 10.5 2.5V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,magnet:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 15C6 16.6569 7.34315 18 9 18C10.6569 18 12 16.6569 12 15V9H6V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 15C12 16.6569 13.3431 18 15 18C16.6569 18 18 16.6569 18 15V9H12V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9V6C6 3.79086 7.79086 2 10 2H14C16.2091 2 18 3.79086 18 6V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,sticker:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="9" cy="9" r="1" fill="currentColor"/>
      <circle cx="15" cy="9" r="1" fill="currentColor"/>
      <path d="M16 20L20 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,sticker_sheet:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
      <rect x="6" y="6" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <rect x="13" y="6" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <rect x="6" y="13" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <rect x="13" y="13" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `};function h(l,e=""){const t=ie[l];if(!t)return console.warn(`SVG icon '${l}' not found`),"";const i=document.createElement("span");return i.className=`svg-icon ${e}`,i.innerHTML=t,i.outerHTML}class se{constructor(e,t,i){this.container=e,this.products=t,this.onProductSelect=i,this.selectedProduct=null,this.eventListeners=[],this.render()}render(){if(this.cleanup(),!this.container){console.error("❌ ProductSelector: Container element not found");return}if(!this.products||Object.keys(this.products).length===0){console.error("❌ ProductSelector: No products provided");return}this.container.innerHTML="",console.log("🔍 ProductSelector.render() - Starting render process"),console.log("🔍 Products to render:",Object.keys(this.products)),console.log("🔍 Container element:",this.container);let e=0;Object.entries(this.products).forEach(([t,i])=>{try{e++,console.log(`🔍 Creating card ${e} for product: ${t} - ${i.name}`);const s=this.createProductCard(t,i);console.log(`🔍 Product card created for ${t}:`,s),this.container.appendChild(s),console.log(`🔍 Product card appended to container for ${t}`),t==="magnets"&&(console.log("🧲 MAGNETS DEBUGGING:"),console.log("🧲 Product object:",i),console.log("🧲 Card element:",s),console.log("🧲 Card innerHTML:",s.innerHTML),console.log("🧲 Card in DOM:",document.contains(s)),console.log("🧲 Card visibility:",window.getComputedStyle(s).display))}catch(s){console.error(`❌ Error creating product card for ${t}:`,s)}}),console.log(`🔍 Total cards rendered: ${e}`),console.log("🔍 Cards in container:",this.container.children.length),e===0&&(this.container.innerHTML='<p style="color: red; padding: 20px; text-align: center;">No products could be rendered. Check console for errors.</p>')}addEventListenerWithCleanup(e,t,i){e.addEventListener(t,i),this.eventListeners.push({element:e,event:t,handler:i})}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.container=null,this.onProductSelect=null}createProductCard(e,t){const i=document.createElement("div");i.className="product-card",i.dataset.productKey=e;let s=t.icon;if(!s)try{switch(e){case"brochures":s=h("brochure");break;case"postcards":s=h("postcard");break;case"flyers":s=h("flyer");break;case"bookmarks":s=h("bookmark");break;case"table_tents":s=h("table_tent");break;case"magnets":s=h("magnet");break;case"stickers":s=h("sticker");break;case"sticker_sheets":s=h("sticker_sheet");break;default:s=h("businessCard")}}catch(r){console.error(`❌ Error creating icon for ${e}:`,r),s='<div class="icon-placeholder">📄</div>'}try{i.innerHTML=`
        <div class="product-icon">${s}</div>
        <div class="product-info">
          <h3 class="product-name">${t.name||"Unknown Product"}</h3>
          <p class="product-description">${t.description||"No description"}</p>
        </div>
        <div class="product-indicator">
          ${h("checkmark","checkmark")}
        </div>
      `}catch(r){console.error(`❌ Error setting innerHTML for ${e}:`,r),i.innerHTML=`
        <div class="product-info">
          <h3 class="product-name">${t.name||"Unknown Product"}</h3>
          <p class="product-description">${t.description||"No description"}</p>
        </div>
      `}return this.addEventListenerWithCleanup(i,"click",()=>this.selectProduct(e,t)),i}selectProduct(e,t){const i=this.container.querySelector(".product-card.selected");i&&i.classList.remove("selected"),this.container.querySelector(`[data-product-key="${e}"]`).classList.add("selected"),this.selectedProduct={key:e,...t},this.onProductSelect&&this.onProductSelect(this.selectedProduct)}getSelectedProduct(){return this.selectedProduct}reset(){this.cleanup();const e=this.container.querySelector(".product-card.selected");e&&e.classList.remove("selected"),this.selectedProduct=null}}class re{constructor(e,t,i){this.sizeContainer=e,this.optionsContainer=t,this.onSelectionChange=i,this.selectedSize=null,this.selectedOptions=[],this.selectedPaper=null,this.currentProduct=null,this.currentProductKey=null,this.recommendedSizes={brochures:"small",postcards:"medium",flyers:"medium",bookmarks:"tall",table_tents:"small"},this.selectedPaperType=null,this.selectedWeight=null,this.selectedFinish=null,this.paperSelectionStep=1,this.eventListeners=[],this.paperContainer=this.findOrCreatePaperContainer()}hideExistingPaperUI(){const e=document.querySelector(".paper-grid");e&&(e.style.display="none"),document.querySelectorAll("h3").forEach(i=>{i.textContent==="Paper Type"&&(i.style.display="none")})}findOrCreatePaperContainer(){if(this.currentProduct&&this.currentProduct.isExternal)return null;let e=document.querySelector(".paper-grid");if(e)e.style.display="block",document.querySelectorAll("h3").forEach(i=>{i.textContent==="Paper Type"&&(i.style.display="block")});else{e=document.createElement("div"),e.className="paper-grid",this.optionsContainer.parentNode.insertBefore(e,this.optionsContainer.nextSibling);const t=document.createElement("h3");t.textContent="Paper Type",this.optionsContainer.parentNode.insertBefore(t,e)}return e}addEventListenerWithCleanup(e,t,i){e.addEventListener(t,i),this.eventListeners.push({element:e,event:t,handler:i})}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.sizeContainer=null,this.optionsContainer=null,this.paperContainer=null,this.onSelectionChange=null}updateProduct(e,t=null){this.cleanup(),this.currentProduct=e,this.currentProductKey=t,this.selectedSize=null,this.selectedOptions=[],this.selectedPaper=null,this.currentProduct&&this.currentProduct.isExternal&&this.hideExistingPaperUI(),this.paperContainer=this.findOrCreatePaperContainer(),this.renderSizes(),this.renderOptions(),this.renderPapers(),this.autoSelectRecommendedSize()}renderSizes(){if(!this.currentProduct||!this.currentProduct.sizes){this.sizeContainer.innerHTML="<p>No sizes available</p>";return}this.sizeContainer.innerHTML="";const e=this.recommendedSizes[this.currentProductKey],t=Object.entries(this.currentProduct.sizes),i=[];if(t.forEach(([s,r])=>{if(s!==e){const n=this.createSizeCard(s,r);i.push({key:s,element:n,isRecommended:!1})}}),e&&this.currentProduct.sizes[e]){const s=this.currentProduct.sizes[e],r=this.createRecommendedSizeCard(e,s),n=t.findIndex(([o])=>o===e);i.splice(n,0,{key:e,element:r,isRecommended:!0})}i.forEach(({element:s})=>{this.sizeContainer.appendChild(s)})}createRecommendedSizeCard(e,t){const i=document.createElement("div");return i.className="size-card size-recommended",i.dataset.sizeKey=e,i.innerHTML=`
      <div class="size-name">Recommended Size</div>
      <div class="size-dimensions">${t.name}</div>
      <div class="size-indicator">
        ${h("checkmark","checkmark")}
      </div>
    `,this.addEventListenerWithCleanup(i,"click",()=>this.selectSize(e,t)),i}createSizeCard(e,t){const i=document.createElement("div");return i.className="size-card",i.dataset.sizeKey=e,i.innerHTML=`
      <div class="size-name">${t.name}</div>
      <div class="size-indicator">
        ${h("checkmark","checkmark")}
      </div>
    `,this.addEventListenerWithCleanup(i,"click",()=>this.selectSize(e,t)),i}selectSize(e,t){const i=this.sizeContainer.querySelector(".size-card.selected");i&&i.classList.remove("selected"),this.sizeContainer.querySelector(`[data-size-key="${e}"]`).classList.add("selected"),this.selectedSize={key:e,...t},this.triggerChange()}renderOptions(){if(this.optionsContainer.innerHTML="",this.currentProduct&&this.currentProduct.options&&(this.optionsContainer.innerHTML="<h3>Add-on Options</h3>",Object.entries(this.currentProduct.options).forEach(([e,t])=>{const i=this.createOptionCard(e,t);this.optionsContainer.appendChild(i)})),this.currentProduct&&this.currentProduct.finishingOptions&&this.currentProduct.finishingOptions.length>0){if(!this.optionsContainer.innerHTML)this.optionsContainer.innerHTML="<h3>Finishing Options</h3>";else{const e=document.createElement("h3");e.textContent="Finishing Options",e.style.marginTop="20px",this.optionsContainer.appendChild(e)}this.currentProduct.finishingOptions.forEach((e,t)=>{const i=`finishing_${t}`,s=this.createOptionCard(i,e);this.optionsContainer.appendChild(s)})}}renderPapers(){if(this.currentProduct&&this.currentProduct.isExternal)return;if(!this.currentProduct||!this.currentProductKey||!this.paperContainer){this.paperContainer&&(this.paperContainer.innerHTML="<p>No product selected</p>");return}const e=E(this.currentProductKey);e&&(this.selectedPaperType=z(e.id),this.selectedWeight=Q(e.id),this.selectedFinish=N(e.id),this.selectedPaper=e,this.triggerChange()),this.paperSelectionStep=1,this.renderPaperSelector()}renderPaperSelector(){if(!this.paperContainer)return;this.paperContainer.innerHTML="";const e=this.createStepIndicator();switch(this.paperContainer.appendChild(e),this.paperSelectionStep){case 1:this.renderPaperTypes();break;case 2:this.renderWeights();break;case 3:this.renderFinishes();break;case 4:this.renderFinalSelection();break}}createStepIndicator(){const e=document.createElement("div");e.className="paper-step-indicator";let t="";switch(this.paperSelectionStep){case 1:t="Step 1 of 3: Choose Paper Type";break;case 2:t="Step 2 of 3: Choose Weight";break;case 3:t="Step 3 of 3: Choose Finish";break;case 4:t="Paper Selected (Default)";break}e.innerHTML=`
      <div class="step-text">${t}</div>
      ${this.paperSelectionStep>1?'<button class="back-step-btn">← Back</button>':""}
    `;const i=e.querySelector(".back-step-btn");return i&&this.addEventListenerWithCleanup(i,"click",()=>this.goBackStep()),e}renderPaperTypes(){const e=E(this.currentProductKey);if(e){const i=this.createRecommendedCard(e);this.paperContainer.appendChild(i)}W(this.currentProductKey).forEach(i=>{const s=this.createPaperTypeCard(i);this.paperContainer.appendChild(s)})}renderWeights(){_(this.currentProductKey,this.selectedPaperType).forEach(t=>{const i=this.createWeightCard(t);this.paperContainer.appendChild(i)})}renderFinishes(){U(this.currentProductKey,this.selectedPaperType,this.selectedWeight).forEach(t=>{const i=this.createFinishCard(t);this.paperContainer.appendChild(i)})}renderFinalSelection(){if(!this.selectedPaper)return;const e=this.createFinalPaperCard(this.selectedPaper);this.paperContainer.appendChild(e);const t=document.createElement("button");t.className="change-paper-btn",t.textContent="Change Paper",this.addEventListenerWithCleanup(t,"click",()=>{this.paperSelectionStep=1,this.selectedPaperType=null,this.selectedWeight=null,this.selectedFinish=null,this.renderPaperSelector()}),this.paperContainer.appendChild(t)}createRecommendedCard(e){const t=document.createElement("div");return t.className="paper-recommended-card",t.innerHTML=`
      <div class="selection-name">Recommended Stock</div>
      <div class="selection-description">${e.displayName}</div>
    `,this.addEventListenerWithCleanup(t,"click",()=>this.selectRecommendedPaper(e)),t}createPaperTypeCard(e){const t=document.createElement("div");return t.className="paper-selection-card",t.innerHTML=`
      <div class="selection-name">${e.name}</div>
      <div class="selection-description">${e.description}</div>
    `,this.addEventListenerWithCleanup(t,"click",()=>this.selectPaperType(e.key)),t}createWeightCard(e){const t=document.createElement("div");return t.className="paper-selection-card",t.innerHTML=`
      <div class="selection-name">${e}</div>
      <div class="selection-description">Paper weight</div>
    `,this.addEventListenerWithCleanup(t,"click",()=>this.selectWeight(e)),t}createFinishCard(e){const t=document.createElement("div");t.className="paper-selection-card";const i=e==="Uncoated"?"Natural matte finish":"Smooth professional finish";return t.innerHTML=`
      <div class="selection-name">${e}</div>
      <div class="selection-description">${i}</div>
    `,this.addEventListenerWithCleanup(t,"click",()=>this.selectFinish(e)),t}createFinalPaperCard(e){const t=document.createElement("div");return t.className="paper-final-card",t.innerHTML=`
      <div class="paper-name">${e.displayName}</div>
      <div class="paper-details">
        <span class="paper-brand">${e.brand}</span>
        <span class="paper-finish">${e.finish}</span>
      </div>
      <div class="paper-cost">$${e.costPerSheet.toFixed(3)}/sheet</div>
      <div class="paper-indicator">
        ${h("checkmark","checkmark")}
      </div>
    `,t}selectRecommendedPaper(e){this.selectedPaperType=z(e.id),this.selectedWeight=Q(e.id),this.selectedFinish=N(e.id),this.selectedPaper=e,this.paperSelectionStep=4,this.renderPaperSelector(),this.triggerChange()}selectPaperType(e){this.selectedPaperType=e,this.paperSelectionStep=2,this.renderPaperSelector()}selectWeight(e){this.selectedWeight=e,this.paperSelectionStep=3,this.renderPaperSelector()}selectFinish(e){this.selectedFinish=e;const t=K(this.currentProductKey,this.selectedPaperType,this.selectedWeight,this.selectedFinish);t&&(this.selectedPaper=t,this.paperSelectionStep=4,this.renderPaperSelector(),this.triggerChange())}goBackStep(){this.paperSelectionStep>1&&(this.paperSelectionStep--,this.paperSelectionStep===1?this.selectedPaperType=null:this.paperSelectionStep===2?this.selectedWeight=null:this.paperSelectionStep===3&&(this.selectedFinish=null),this.renderPaperSelector())}selectPaper(e){const t=this.paperContainer.querySelector(".paper-card.selected");t&&t.classList.remove("selected");const i=this.paperContainer.querySelector(`[data-paper-id="${e.id}"]`);i&&i.classList.add("selected"),this.selectedPaper=e,this.triggerChange()}createOptionCard(e,t){const i=document.createElement("div");i.className="option-card",i.dataset.optionKey=e;const s=t.modifier!==1?` (+${Math.round((t.modifier-1)*100)}%)`:"",r=t.cost&&t.cost>0?` (+$${t.cost.toFixed(2)}/pc)`:"";i.innerHTML=`
      <div class="option-checkbox">
        <input type="checkbox" id="option-${e}" class="option-input">
        <label for="option-${e}" class="option-label">
          <span class="option-name">${t.name}</span>
          <span class="option-modifier">${s}${r}</span>
        </label>
      </div>
    `;const n=i.querySelector(".option-input");return this.addEventListenerWithCleanup(n,"change",()=>this.toggleOption(e,t,n.checked)),i}toggleOption(e,t,i){i?this.selectedOptions.find(s=>s.key===e)||this.selectedOptions.push({key:e,...t}):this.selectedOptions=this.selectedOptions.filter(s=>s.key!==e),this.triggerChange()}triggerChange(){this.onSelectionChange&&this.onSelectionChange({size:this.selectedSize,options:this.selectedOptions,paper:this.selectedPaper})}getSelectedSize(){return this.selectedSize}getSelectedOptions(){return this.selectedOptions}autoSelectRecommendedSize(){const e=this.recommendedSizes[this.currentProductKey];if(e&&this.currentProduct&&this.currentProduct.sizes){const t=this.currentProduct.sizes[e];t&&setTimeout(()=>{this.selectSize(e,t),this.autoSelectDefaultPaper(),this.autoSelectMandatoryFinishing()},100)}}autoSelectDefaultPaper(){if(!(this.currentProduct&&this.currentProduct.isExternal)&&this.currentProductKey){const e=E(this.currentProductKey);e&&(this.selectedPaper=e,this.selectedPaperType=e.type,this.selectedWeight=e.weight,this.selectedFinish=e.finish,this.paperSelectionStep=4,this.renderPaperSelector(),this.triggerChange())}}reset(){this.cleanup();const e=this.sizeContainer.querySelector(".size-card.selected");e&&e.classList.remove("selected"),this.optionsContainer.querySelectorAll(".option-input").forEach(s=>{s.checked=!1});const i=this.paperContainer.querySelector(".paper-card.selected");i&&i.classList.remove("selected"),this.selectedSize=null,this.selectedOptions=[],this.selectedPaper=null,this.currentProduct=null,this.selectedPaperType=null,this.selectedWeight=null,this.selectedFinish=null,this.paperSelectionStep=1,this.sizeContainer.innerHTML="",this.optionsContainer.innerHTML="",this.paperContainer.innerHTML=""}autoSelectMandatoryFinishing(){if(this.currentProductKey==="table_tents"&&this.currentProduct&&this.currentProduct.finishingOptions&&(this.selectedOptions=[],this.currentProduct.finishingOptions.forEach((e,t)=>{const i=`finishing_${t}`;this.selectedOptions.push({key:i,...e}),setTimeout(()=>{const s=this.optionsContainer.querySelector(`#option-${i}`);s&&(s.checked=!0)},150)}),this.triggerChange()),this.currentProductKey==="brochures"&&this.currentProduct&&this.currentProduct.finishingOptions){const e=this.currentProduct.finishingOptions.find(t=>t.name.toLowerCase().includes("scoring"));if(e){const i=`finishing_${this.currentProduct.finishingOptions.indexOf(e)}`;this.selectedOptions.some(r=>r.key===i)||(this.selectedOptions.push({key:i,...e}),setTimeout(()=>{const r=this.optionsContainer.querySelector(`#option-${i}`);r&&(r.checked=!0)},150),this.triggerChange())}}}}class ne{constructor(e,t,i){this.container=e,this.pricingEngine=t,this.onQuantityChange=i,this.quantity=50,this.minQuantity=50,this.maxQuantity=1e4,this.stepSize=25,this.productQuantities={table_tents:[10,25,50,75,100],default:[50,75,100,125,150,200,250,500,750,1e3]},this.currentProduct=null,this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.eventListeners=[],this.lastRenderedState=null,this.init()}async init(){await this.render()}generateStateKey(){var r,n,o,a;const e=((r=this.currentProduct)==null?void 0:r.name)||"none",t=((n=this.currentSize)==null?void 0:n.name)||"none",i=((o=this.currentPaper)==null?void 0:o.id)||"none",s=((a=this.currentOptions)==null?void 0:a.map(c=>c.name).sort().join(","))||"none";return`${e}:${t}:${i}:${s}`}updateSelectionOnly(){this.container.querySelectorAll(".quantity-btn").forEach(t=>{parseInt(t.dataset.quantity)===this.quantity?t.classList.add("selected"):t.classList.remove("selected")})}getQuantitiesForProduct(){return this.currentProduct&&this.currentProduct.name==="Table Tent Cards"?this.productQuantities.table_tents:this.productQuantities.default}async render(){const e=this.generateStateKey();if(this.lastRenderedState===e){this.updateSelectionOnly();return}let t="";const i=this.getQuantitiesForProduct();for(const s of i){const r=s===this.quantity,n=await this.calculatePricingForQuantity(s);t+=`
        <button class="quantity-btn ${r?"selected":""}" data-quantity="${s}">
          <div class="quantity-number">${s}</div>
          <div class="quantity-pricing">
            <div class="total-cost">${this.formatPrice(n.total)}</div>
            <div class="unit-cost">${this.formatPrice(n.unitPrice)}/ea</div>
          </div>
        </button>
      `}this.container.innerHTML=`
      <div class="quantity-selector">
        <h3>Select Quantity</h3>
        <div class="quantity-grid">
          ${t}
        </div>
      </div>
    `,this.lastRenderedState=e,this.setupEventListeners()}setupEventListeners(){this.cleanup(),this.clickHandler=async e=>{const t=e.target.closest(".quantity-btn");if(t&&this.container.contains(t)){const i=t.dataset.quantity;i&&(e.preventDefault(),e.stopPropagation(),await this.selectQuantity(parseInt(i)))}},this.addEventListenerWithCleanup(this.container,"click",this.clickHandler)}addEventListenerWithCleanup(e,t,i){e.addEventListener(t,i),this.eventListeners.push({element:e,event:t,handler:i})}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.container=null,this.pricingEngine=null,this.onQuantityChange=null}async calculatePricingForQuantity(e){if(!this.currentProduct||!e)return{total:0,unitPrice:0};try{return await this.pricingEngine.calculatePrice(this.currentProduct,this.currentSize,this.currentOptions,e,this.currentPaper)}catch{return{total:0,unitPrice:0}}}formatPrice(e){return typeof e!="number"||isNaN(e)?"$0.00":`$${e.toFixed(2)}`}async selectQuantity(e){this.quantity=e;const t=this.generateStateKey();this.lastRenderedState===t?this.updateSelectionOnly():await this.render(),this.triggerChange()}async updatePricingContext(e,t,i,s){if(this.currentProduct=e,this.currentSize=t,this.currentOptions=i||[],this.currentPaper=s,e&&e.name==="Table Tent Cards"){this.minQuantity=10,this.quantity<10&&(this.quantity=10);const r=this.getQuantitiesForProduct();r.includes(this.quantity)||(this.quantity=r[0])}else{this.minQuantity=50,this.quantity<50&&(this.quantity=50);const r=this.getQuantitiesForProduct();r.includes(this.quantity)||(this.quantity=r[0])}this.render()}triggerChange(){this.onQuantityChange&&this.onQuantityChange(this.quantity)}async setQuantity(e){const t=parseInt(e,10);isNaN(t)||(this.quantity=Math.max(this.minQuantity,Math.min(this.maxQuantity,t)),this.quantity=Math.ceil(this.quantity/this.stepSize)*this.stepSize,this.quantity<this.minQuantity&&(this.quantity=this.minQuantity),await this.render(),this.triggerChange())}getQuantity(){return this.quantity}async reset(){this.quantity=50,this.currentProduct=null,this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.render()}destroy(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler)}}class oe{constructor(e,t,i,s){this.container=e,this.product=t,this.size=i,this.onQuantityChange=s,this.selectedQuantity=null,this.pricingEngine=new D,this.eventListeners=[],this.lastRenderedState=null,this.render()}generateStateKey(){var i,s;const e=((i=this.product)==null?void 0:i.key)||"none",t=((s=this.size)==null?void 0:s.key)||"none";return`${e}:${t}`}render(){const e=this.generateStateKey();if(this.lastRenderedState===e){this.updateSelectionOnly();return}if(this.cleanup(),!this.product||!this.size){this.container.innerHTML='<p class="no-selection">Please select a product and size first.</p>';return}const t=this.getValidQuantities();this.container.innerHTML=`
      <div class="external-quantity-selector">
        <div class="quantity-header">
          <h3>Select Quantity</h3>
          <div class="quantity-constraints">
            <span class="constraint-item">
              <strong>Minimum:</strong> ${this.product.pricing.minQuantity} pieces
            </span>
            <span class="constraint-item">
              <strong>Increments:</strong> ${this.product.pricing.quantityIncrement} pieces
            </span>
          </div>
        </div>
        
        <div class="quantity-grid">
          ${t.map(i=>this.createQuantityButton(i)).join("")}
        </div>
        
        <div class="custom-quantity-section">
          <label class="custom-quantity-label">
            Custom Quantity (for orders over 1000):
          </label>
          <div class="custom-quantity-input">
            <input 
              type="number" 
              id="custom-quantity-input"
              min="${this.product.pricing.minQuantity}"
              step="${this.product.pricing.quantityIncrement}"
              placeholder="Enter quantity"
            >
            <button id="custom-quantity-btn" class="btn-secondary">Calculate</button>
          </div>
        </div>
        
        <div class="order-notes">
          <h4>Order Requirements:</h4>
          <ul>
            ${this.product.orderRules.orderNotes.map(i=>`<li>${i}</li>`).join("")}
          </ul>
        </div>
      </div>
    `,this.setupEventListeners(),this.lastRenderedState=e}getValidQuantities(){if(this.product.standardQuantities)return this.product.standardQuantities.slice(0,16);const e=[],t=this.product.pricing.minQuantity,i=this.product.pricing.quantityIncrement;for(let s=t;s<=1e3&&(e.push(s),!(e.length>=16));s+=i);return e}createQuantityButton(e){const t=this.pricingEngine.calculatePrice(this.product,this.size.key,e),i=t.unitPrice,s=t.total;return`
      <button 
        class="quantity-btn ${this.selectedQuantity===e?"selected":""}" 
        data-quantity="${e}"
        data-unit-price="${i}"
        data-total-price="${s}"
      >
        <div class="quantity-amount">${e}</div>
        <div class="quantity-pricing">
          <div class="unit-price">${this.pricingEngine.formatPrice(i)}/pc</div>
          <div class="total-price">${this.pricingEngine.formatPrice(s)}</div>
        </div>
      </button>
    `}setupEventListeners(){this.quantityClickHandler=i=>{const s=i.target.closest(".quantity-btn");if(s&&this.container.contains(s)){const r=parseInt(s.dataset.quantity),n=parseFloat(s.dataset.unitPrice),o=parseFloat(s.dataset.totalPrice);this.selectQuantity(r,n,o)}},this.customQuantityHandler=()=>{const i=this.container.querySelector("#custom-quantity-input"),s=parseInt(i.value);if(s&&s>=this.product.pricing.minQuantity){const r=this.pricingEngine.validateQuantity(s,this.product.pricing.minQuantity,this.product.pricing.quantityIncrement),n=this.pricingEngine.calculatePrice(this.product,this.size.key,r);this.selectQuantity(r,n.unitPrice,n.total),i.value=r}},this.container.addEventListener("click",this.quantityClickHandler);const e=this.container.querySelector("#custom-quantity-btn");e&&e.addEventListener("click",this.customQuantityHandler);const t=this.container.querySelector("#custom-quantity-input");t&&t.addEventListener("keypress",i=>{i.key==="Enter"&&this.customQuantityHandler()}),this.eventListeners.push({element:this.container,event:"click",handler:this.quantityClickHandler},{element:e,event:"click",handler:this.customQuantityHandler})}selectQuantity(e,t,i){const s=this.container.querySelector(".quantity-btn.selected");s&&s.classList.remove("selected");const r=this.container.querySelector(`[data-quantity="${e}"]`);r&&r.classList.add("selected"),this.selectedQuantity=e;const n=this.pricingEngine.calculatePrice(this.product,this.size.key,e);this.onQuantityChange&&this.onQuantityChange({quantity:e,unitPrice:t,totalPrice:i,pricing:n})}updateSelectionOnly(){this.container.querySelectorAll(".quantity-btn").forEach(t=>{parseInt(t.dataset.quantity)===this.selectedQuantity?t.classList.add("selected"):t.classList.remove("selected")})}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.container=null,this.onQuantityChange=null,this.pricingEngine=null}getSelectedQuantity(){return this.selectedQuantity}updateProductSize(e,t){this.product=e,this.size=t,this.selectedQuantity=null,this.render()}reset(){this.selectedQuantity=null,this.updateSelectionOnly()}}class ae{constructor(e,t,i=null,s=null){this.container=e,this.pricingEngine=t,this.cartService=i,this.settingsService=s,this.unitPriceElement=e.querySelector("#unit-price"),this.totalPriceElement=e.querySelector("#total-price"),this.currentPricing=null,this.currentProduct=null,this.currentSize=null,this.currentOptions=null,this.currentQuantity=null,this.currentPaper=null,this.eventListeners=[],this.init()}init(){if(!this.unitPriceElement||!this.totalPriceElement){console.error("PriceDisplay: Required elements not found");return}this.reset(),this.attachEventListeners()}attachEventListeners(){if(this.cartService&&this.addCartButton(),this.settingsService&&this.settingsService.addEventListener){const e=async()=>{console.log("🔄 PriceDisplay: Settings changed event received"),this.currentProduct&&this.currentQuantity?(console.log("🔄 PriceDisplay: Triggering full recalculation due to settings change"),await this.updatePricing(this.currentProduct,this.currentSize,this.currentOptions,this.currentQuantity,this.currentPaper)):this.currentPricing&&(console.log("🔄 PriceDisplay: Updating breakdown only (limited context)"),this.updateBreakdown())};this.settingsService.addEventListener("settingsChanged",e),this.eventListeners.push({element:this.settingsService,event:"settingsChanged",handler:e})}}addEventListenerWithCleanup(e,t,i){e&&e.addEventListener&&(e.addEventListener(t,i),this.eventListeners.push({element:e,event:t,handler:i}))}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.container=null,this.pricingEngine=null,this.cartService=null,this.settingsService=null}addCartButton(){let e=this.container.querySelector("#add-to-cart");e||(e=document.createElement("button"),e.id="add-to-cart",e.className="btn btn-primary add-to-cart-btn",e.innerHTML=`
        ${h("plus")}
        <span>Add to Cart</span>
      `,this.container.appendChild(e),e.addEventListener("click",()=>this.addToCart()))}addToCart(){if(!this.cartService||!this.currentPricing||!this.currentProduct){console.warn("Cannot add to cart: missing cart service or product data");return}this.cartService.addItem(this.currentProduct,this.currentSize,this.currentOptions||[],this.currentQuantity,this.currentPricing,this.currentPaper);const e=this.container.querySelector("#add-to-cart"),t=e.innerHTML;e.innerHTML=`${h("checkmark")} <span>Added!</span>`,e.disabled=!0,setTimeout(()=>{e.innerHTML=t,e.disabled=!1},1500)}async updatePricing(e,t,i,s,r=null){if(!e||!s||s<=0){this.reset();return}try{this.currentPricing=await this.pricingEngine.calculatePrice(e,t,i,s,r),this.currentProduct=e,this.currentSize=t,this.currentOptions=i,this.currentQuantity=s,this.currentPaper=r,this.render(),this.animateUpdate()}catch(n){console.error("Error calculating pricing:",n),this.reset()}}render(){if(!this.currentPricing){this.reset();return}this.unitPriceElement.textContent=this.pricingEngine.formatPrice(this.currentPricing.unitPrice),this.totalPriceElement.textContent=this.pricingEngine.formatPrice(this.currentPricing.total),this.updateSetupFeeDisplay(),this.updateBreakdown(),this.cartService&&this.currentProduct&&this.addCartButton()}updateSetupFeeDisplay(){if(!this.currentPricing||!this.currentPricing.setupFee)return;let e=this.container.querySelector(".setup-fee");if(!e){e=document.createElement("div"),e.className="setup-fee";const t=this.container.querySelector(".price-container"),i=t.querySelector(".total-price");t.insertBefore(e,i)}e.innerHTML=`
      <span class="label">Setup:</span>
      <span class="value">${this.pricingEngine.formatPrice(this.currentPricing.setupFee)}</span>
    `}updateBreakdown(){if(!this.currentPricing||!this.currentPricing.breakdown)return;let e=this.container.querySelector(".price-breakdown");e||(e=document.createElement("div"),e.className="price-breakdown",this.container.appendChild(e));const t=this.currentPricing.breakdown,i=this.currentQuantity,s=this.currentPaper?this.currentPaper.costPerSheet:0,r=this.currentSize&&this.currentSize.imposition?this.currentSize.imposition:1,n=this.pricingEngine.getEffectiveSettings();console.log("🔍 PriceDisplay.updateBreakdown() - Debug Info:",{productKey:this.currentProduct?this.currentProduct.key:"none",effectiveSettings:n,hasSettingsService:!!this.settingsService,timestamp:new Date().toISOString()});const o=n.clickCost||.1,a=this.currentProduct?this.currentProduct.key:"default",c=n.productionRates&&n.productionRates[a]?n.productionRates[a]:this.currentProduct&&this.currentProduct.pricing&&this.currentProduct.pricing.overhead?this.currentProduct.pricing.overhead.k:1.5,d=n.volumeExponents&&n.volumeExponents[a]?n.volumeExponents[a]:this.currentProduct&&this.currentProduct.pricing&&this.currentProduct.pricing.overhead?this.currentProduct.pricing.overhead.e:.75;console.log("📊 Formula Values Used:",{productKey:a,currentClickCost:o,currentProductionRate:c,currentVolumeExponent:d,fromSettings:{clickCost:n.clickCost,productionRate:n.productionRates?n.productionRates[a]:"not found",volumeExponent:n.volumeExponents?n.volumeExponents[a]:"not found"}}),e.innerHTML=`
      <div class="formula-breakdown">
        <h4>Formula Breakdown (Testing)</h4>
        <div class="formula-display">
          <strong>C(Q) = S + Q<sup>e</sup> × k + Q × v + Ff</strong>
        </div>
        
        <div class="variables-grid">
          <div class="variable-row">
            <span class="var-name">Q (Quantity):</span>
            <span class="var-value">${i}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">S (Setup Fee):</span>
            <span class="var-value">$${t.setupFee}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">k (Production Rate):</span>
            <span class="var-value">$${c.toFixed(2)}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">e (Exponent):</span>
            <span class="var-value">${d.toFixed(2)}</span>
          </div>
          <div class="variable-row">
            <span class="var-name">v (Variable Cost):</span>
            <span class="var-value">$${t.variableCostPerPiece}</span>
          </div>
          ${t.finishingCost>0?`
          <div class="variable-row">
            <span class="var-name">Ff (Finishing):</span>
            <span class="var-value">$${t.finishingCost}</span>
          </div>
          `:""}
        </div>
        
        <div class="calculation-steps">
          <h5>Variable Cost Calculation:</h5>
          <div class="calc-step">
            v = (paper + clicks) × 1.5 / imposition
          </div>
          <div class="calc-step">
            v = ($${s.toFixed(3)} + $${o.toFixed(2)}) × 1.5 / ${r} = $${t.variableCostPerPiece}
          </div>
          <div class="calc-step" style="font-size: 0.75rem; color: #666;">
            Debug: paper=${this.currentPaper?"YES":"NO"}, size=${this.currentSize?"YES":"NO"}, imposition=${this.currentSize?this.currentSize.imposition:"undefined"}
          </div>
          <div class="calc-step" style="font-size: 0.75rem; color: #666;">
            Size object: ${this.currentSize?JSON.stringify(this.currentSize):"null"}
          </div>
          <div class="calc-step" style="font-size: 0.75rem; color: #666;">
            Paper: ${this.currentPaper?`${this.currentPaper.displayName} ($${this.currentPaper.costPerSheet})`:"none"}
          </div>
          
          <h5>Final Calculation:</h5>
          <div class="calc-step">
            Setup: $${t.setupFee}
          </div>
          <div class="calc-step">
            Production: ${i}<sup>${d.toFixed(2)}</sup> × $${c.toFixed(2)} = $${t.productionCost}
          </div>
          <div class="calc-step">
            Materials: ${i} × $${t.variableCostPerPiece} = $${t.materialsCost}
          </div>
          ${t.finishingCost>0?`
          <div class="calc-step">
            Finishing: $${t.finishingCost}
          </div>
          `:""}
          <div class="calc-step total-calc">
            <strong>Total: $${this.currentPricing.total}</strong>
          </div>
        </div>
      </div>
    `}animateUpdate(){this.container.classList.add("price-updated"),setTimeout(()=>{this.container.classList.remove("price-updated")},300)}getCurrentPricing(){return this.currentPricing}reset(){this.currentPricing=null,this.unitPriceElement.textContent="$0.00",this.totalPriceElement.textContent="$0.00";const e=this.container.querySelector(".setup-fee");e&&e.remove();const t=this.container.querySelector(".price-breakdown");t&&t.remove()}showRushOrderPricing(e=!1){if(this.currentPricing)if(e){const t=this.pricingEngine.calculateRushOrder(this.currentPricing);this.unitPriceElement.textContent=this.pricingEngine.formatPrice(t.unitPrice),this.totalPriceElement.textContent=this.pricingEngine.formatPrice(t.total),this.container.classList.add("rush-order-pricing"),this.currentPricing=t,this.updateBreakdown()}else this.container.classList.remove("rush-order-pricing")}formatQuantityBreaks(e,t,i){if(!e||!e.formula)return"";const s=[25,50,100,250,500,1e3,2500,5e3];let r='<div class="quantity-breaks"><h4>Quantity Pricing</h4><table>';return s.forEach(n=>{const o=this.pricingEngine.calculatePrice(e,t,i,n);r+=`
        <tr>
          <td>${n}</td>
          <td>${this.pricingEngine.formatPrice(o.unitPrice)}</td>
          <td>${this.pricingEngine.formatPrice(o.total)}</td>
        </tr>
      `}),r+="</table></div>",r}updateExternalPricing(e){if(!e){this.reset();return}this.unitPriceElement.textContent=this.pricingEngine.formatPrice(e.unitPrice),this.totalPriceElement.textContent=this.pricingEngine.formatPrice(e.total),this.currentPricing=e,this.updateExternalBreakdown(e)}updateExternalBreakdown(e){const t=this.container.querySelector("#price-breakdown");if(!t)return;const i=e.breakdown;t.innerHTML=`
      <div class="breakdown-section">
        <h4>External Product Pricing</h4>
        <div class="breakdown-item">
          <span class="label">Supplier Cost:</span>
          <span class="value">${this.pricingEngine.formatPrice(i.supplierCost)}</span>
        </div>
        <div class="breakdown-item">
          <span class="label">Markup (${((i.markup-1)*100).toFixed(0)}%):</span>
          <span class="value">${this.pricingEngine.formatPrice(i.customerPrice-i.supplierCost)}</span>
        </div>
        <div class="breakdown-item total">
          <span class="label">Total:</span>
          <span class="value">${this.pricingEngine.formatPrice(i.customerPrice)}</span>
        </div>
        ${i.quantityAdjusted?`
          <div class="breakdown-note">
            <small>Quantity adjusted from ${i.originalQuantity} to ${i.validatedQuantity} (minimum/increment requirement)</small>
          </div>
        `:""}
        ${i.minimumApplied?`
          <div class="breakdown-note">
            <small>Minimum order quantity applied</small>
          </div>
        `:""}
      </div>
    `}}class ce{constructor(e,t,i){this.container=e,this.cartService=t,this.pricingEngine=i,this.isVisible=!1,this.eventListeners=[],this.init()}init(){this.render(),this.attachEventListeners(),this.cartService.addListener(e=>{this.updateDisplay(e)})}render(){this.container.innerHTML=`
      <div class="cart-wrapper">
        <button class="cart-toggle" id="cart-toggle">
          <span class="cart-icon">${h("cart")}</span>
          <span class="cart-count" id="cart-count">0</span>
        </button>
        
        <div class="cart-panel" id="cart-panel">
          <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button class="cart-close" id="cart-close">&times;</button>
          </div>
          
          <div class="cart-items" id="cart-items">
            <div class="cart-empty">Your cart is empty</div>
          </div>
          
          <div class="cart-summary" id="cart-summary" style="display: none;">
            <div class="summary-row total">
              <span>Total:</span>
              <span id="cart-total">$0.00</span>
            </div>
          </div>
          
          <div class="cart-actions" id="cart-actions" style="display: none;">
            <button class="btn btn-secondary" id="clear-cart">Clear Cart</button>
            <button class="btn btn-primary" id="generate-quote">Generate Quote</button>
          </div>
        </div>
      </div>
    `}attachEventListeners(){const e=this.container.querySelector("#cart-toggle"),t=this.container.querySelector("#cart-close"),i=this.container.querySelector("#clear-cart"),s=this.container.querySelector("#generate-quote");this.container.querySelector("#cart-panel"),e.addEventListener("click",()=>this.toggleCart()),t.addEventListener("click",()=>this.hideCart()),i.addEventListener("click",()=>this.clearCart()),s.addEventListener("click",()=>this.generateQuote()),document.addEventListener("click",r=>{this.isVisible&&!this.container.contains(r.target)&&this.hideCart()})}toggleCart(){this.isVisible?this.hideCart():this.showCart()}showCart(){this.container.querySelector("#cart-panel").classList.add("active"),this.isVisible=!0}hideCart(){this.container.querySelector("#cart-panel").classList.remove("active"),this.isVisible=!1}updateDisplay(e){const t=this.container.querySelector("#cart-count"),i=this.container.querySelector("#cart-items"),s=this.container.querySelector("#cart-summary"),r=this.container.querySelector("#cart-actions");t.textContent=e.count,t.style.display=e.count>0?"inline":"none",e.items.length===0?(i.innerHTML='<div class="cart-empty">Your cart is empty</div>',s.style.display="none",r.style.display="none"):(this.renderCartItems(e.items),this.updateSummary(e),s.style.display="block",r.style.display="flex")}renderCartItems(e){const t=this.container.querySelector("#cart-items");t.innerHTML=e.map(i=>`
      <div class="cart-item" data-item-id="${i.id}">
        <div class="item-info">
          <div class="item-name">${this.cartService.getItemDescription(i)}</div>
          <div class="item-price">${this.pricingEngine.formatPrice(i.pricing.unitPrice)} each</div>
        </div>
        <div class="item-controls">
          <div class="quantity-controls">
            <button class="qty-btn" data-action="decrease" data-item-id="${i.id}">
              ${h("minus")}
            </button>
            <span class="quantity">${i.quantity}</span>
            <button class="qty-btn" data-action="increase" data-item-id="${i.id}">
              ${h("plus")}
            </button>
          </div>
          <div class="item-total">${this.pricingEngine.formatPrice(i.pricing.total)}</div>
          <button class="remove-btn" data-item-id="${i.id}">
            ${h("trash")}
          </button>
        </div>
      </div>
    `).join(""),this.attachItemEventListeners()}attachItemEventListeners(){this.container.querySelector("#cart-items").addEventListener("click",t=>{const i=t.target.closest("button");if(!i)return;const s=i.dataset.itemId,r=i.dataset.action;if(r==="increase"){const n=this.cartService.getItems().find(o=>o.id===s);n&&this.cartService.updateQuantity(s,n.quantity+25)}else if(r==="decrease"){const n=this.cartService.getItems().find(o=>o.id===s);if(n){const o=Math.max(25,n.quantity-25);this.cartService.updateQuantity(s,o)}}else i.classList.contains("remove-btn")&&this.cartService.removeItem(s)})}updateSummary(e){this.container.querySelector("#cart-total").textContent=this.pricingEngine.formatPrice(e.total)}clearCart(){confirm("Are you sure you want to clear your cart?")&&this.cartService.clearCart()}generateQuote(){const e=this.cartService.generateQuoteData(),t=`
Quote Summary:
Items: ${e.itemCount}
Total: ${this.pricingEngine.formatPrice(e.total)}
    `.trim();alert(t),confirm("Quote generated! Clear cart?")&&(this.cartService.clearCart(),this.hideCart())}}class le{constructor(e,t){this.container=e,this.onToggle=t,this.isOpen=!1,this.init()}init(){this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
      <button class="hamburger-menu" id="hamburger-menu" aria-label="Open Settings Menu">
        <div class="hamburger-icon">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </div>
      </button>
    `}setupEventListeners(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler),this.clickHandler=e=>{e.target.closest(".hamburger-menu")&&this.toggle()},this.container.addEventListener("click",this.clickHandler)}toggle(){this.isOpen=!this.isOpen,this.updateIcon(),this.onToggle&&this.onToggle(this.isOpen)}updateIcon(){const e=this.container.querySelector(".hamburger-menu"),t=this.container.querySelector(".hamburger-icon");this.isOpen?(e.classList.add("open"),t.classList.add("open"),e.setAttribute("aria-label","Close Settings Menu")):(e.classList.remove("open"),t.classList.remove("open"),e.setAttribute("aria-label","Open Settings Menu"))}setOpen(e){this.isOpen=e,this.updateIcon()}destroy(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler)}}class de{constructor(e,t){this.container=e,this.settingsService=t,this.isVisible=!1,this.activeTab="overview",this.eventListeners=[],this.init()}init(){this.render(),this.setupEventListeners()}addEventListenerWithCleanup(e,t,i){e.addEventListener(t,i),this.eventListeners.push({element:e,event:t,handler:i})}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.container=null,this.settingsService=null}showModal(e,t,i=[{text:"OK",primary:!0}]){return new Promise(s=>{const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
        <div class="modal-content">
          <div class="modal-header">
            <h3>${e}</h3>
          </div>
          <div class="modal-body">
            <p>${t}</p>
          </div>
          <div class="modal-footer">
            ${i.map((o,a)=>`<button class="modal-btn ${o.primary?"modal-btn-primary":"modal-btn-secondary"}" 
                      data-result="${o.result||a}">${o.text}</button>`).join("")}
          </div>
        </div>
      `;const n=o=>{if(o.target.classList.contains("modal-btn")){const a=o.target.dataset.result;document.body.removeChild(r),s(a)}else o.target.classList.contains("modal-overlay")&&(document.body.removeChild(r),s(null))};r.addEventListener("click",n),document.body.appendChild(r)})}showConfirmation(e,t){return this.showModal(e,t,[{text:"Cancel",result:"cancel"},{text:"Confirm",result:"confirm",primary:!0}])}showSuccess(e,t){return this.showModal(e,t,[{text:"OK",result:"ok",primary:!0}])}showError(e,t){return this.showModal(e,t,[{text:"OK",result:"ok",primary:!0}])}render(){this.container.innerHTML=`
      <div class="settings-panel ${this.isVisible?"active":""}">
        <div class="settings-panel-content">
          <div class="settings-header">
            <h3>Settings</h3>
            <button class="settings-close" id="settings-close" aria-label="Close Settings">×</button>
          </div>
          
          <div class="settings-body">
            <div class="settings-tabs">
              <button class="tab-btn ${this.activeTab==="overview"?"active":""}" data-tab="overview">Overview</button>
              <button class="tab-btn ${this.activeTab==="formula"?"active":""}" data-tab="formula">Formula Parameters</button>
              <button class="tab-btn ${this.activeTab==="costs"?"active":""}" data-tab="costs">Costs & Materials</button>
              <button class="tab-btn ${this.activeTab==="actions"?"active":""}" data-tab="actions">Actions</button>
            </div>
            
            <div class="tab-content">
              ${this.renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    `}renderTabContent(){switch(this.activeTab){case"overview":return this.renderOverviewTab();case"formula":return this.renderFormulaTab();case"costs":return this.renderCostsTab();case"actions":return this.renderActionsTab();default:return this.renderOverviewTab()}}renderOverviewTab(){const e=this.settingsService.getSettings();return`
      <div class="settings-section">
        <h4>Current Settings Overview</h4>
        <div class="settings-display">
          <div class="settings-group">
            <h5>Setup Fees</h5>
            <div class="settings-values">
              ${Object.entries(e.setupFees).map(([t,i])=>`<div class="setting-item">
                  <span class="setting-label">${this.formatProductName(t)}:</span>
                  <span class="setting-value">$${i.toFixed(2)}</span>
                </div>`).join("")}
            </div>
          </div>

          <div class="settings-group">
            <h5>Production Rates</h5>
            <div class="settings-values">
              ${Object.entries(e.productionRates).map(([t,i])=>`<div class="setting-item">
                  <span class="setting-label">${this.formatProductName(t)}:</span>
                  <span class="setting-value">$${i.toFixed(2)}</span>
                </div>`).join("")}
            </div>
          </div>

          <div class="settings-group">
            <h5>Volume Exponents</h5>
            <div class="settings-values">
              ${Object.entries(e.volumeExponents).map(([t,i])=>`<div class="setting-item">
                  <span class="setting-label">${this.formatProductName(t)}:</span>
                  <span class="setting-value">${i.toFixed(2)}</span>
                </div>`).join("")}
            </div>
          </div>

          <div class="settings-group">
            <h5>Other Settings</h5>
            <div class="settings-values">
              <div class="setting-item">
                <span class="setting-label">Click Cost:</span>
                <span class="setting-value">$${e.clickCost.toFixed(2)}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Minimum Order:</span>
                <span class="setting-value">$${e.minimumOrder.toFixed(2)}</span>
              </div>
              <div class="setting-item">
                <span class="setting-label">Rush Order Multiplier:</span>
                <span class="setting-value">${e.rushOrderMultiplier.toFixed(1)}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}renderFormulaTab(){return`
      <div class="settings-section">
        <h4>Formula Parameters</h4>
        <p class="tab-description">Edit the core pricing formula parameters: C(Q) = S + Q^e × k + Q × v + Ff</p>
        <div class="settings-edit">
          <div class="edit-group">
            <h5>Setup Fees (S - $ per job)</h5>
            ${this.renderSetupFeeInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Production Rates (k - $ per sheet)</h5>
            ${this.renderProductionRateInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Volume Exponents (e - scaling factor)</h5>
            ${this.renderVolumeExponentInputs()}
          </div>
          
          <div class="edit-group">
            <h5>General Settings</h5>
            <div class="input-group">
              <label for="minimum-order-input">Minimum Order ($):</label>
              <input type="number" id="minimum-order-input" step="0.01" min="0" value="${this.settingsService.getSetting("minimumOrder")}" />
              <button class="save-btn" id="save-minimum-order">Save</button>
            </div>
          </div>
        </div>
      </div>
    `}renderCostsTab(){return`
      <div class="settings-section">
        <h4>Costs & Materials</h4>
        <p class="tab-description">Edit material costs and finishing options that affect variable costs (v) and finishing fees (Ff)</p>
        <div class="settings-edit">
          <div class="edit-group">
            <h5>Finishing Costs ($ per piece)</h5>
            ${this.renderFinishingCostInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Paper Costs ($ per sheet)</h5>
            ${this.renderPaperCostInputs()}
          </div>
          
          <div class="edit-group">
            <h5>Other Material Costs</h5>
            <div class="input-group">
              <label for="click-cost-input">Click Cost ($ per piece):</label>
              <input type="number" id="click-cost-input" step="0.01" min="0" value="${this.settingsService.getSetting("clickCost")}" />
              <button class="save-btn" id="save-click-cost">Save</button>
            </div>
          </div>
        </div>
      </div>
    `}renderActionsTab(){return`
      <div class="settings-section">
        <h4>Settings Management</h4>
        <p class="tab-description">Backup, restore, and reset your pricing settings</p>
        <div class="settings-actions">
          <button class="settings-btn" id="export-settings">📥 Export Settings</button>
          <button class="settings-btn" id="import-settings">📤 Import Settings</button>
          <button class="settings-btn warning" id="reset-settings">🔄 Reset to Defaults</button>
        </div>
        
        <div class="import-section" style="margin-top: var(--spacing-lg);">
          <h5>📁 Import Settings from File</h5>
          <input type="file" id="settings-file-input" accept=".json" style="margin-bottom: var(--spacing-sm);" />
          <button class="settings-btn" id="load-settings-file">Load Settings File</button>
        </div>
        
        <div class="settings-info" style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: var(--background-color); border-radius: var(--border-radius); border-left: 4px solid var(--success-color);">
          <h5>✅ Implementation Complete</h5>
          <p style="margin: var(--spacing-sm) 0; color: var(--text-secondary); font-size: 0.875rem;">
            All pricing parameters are now fully editable with real-time updates, validation, and persistence. 
            Your changes automatically save to localStorage and affect pricing calculations immediately.
          </p>
          <ul style="margin: var(--spacing-sm) 0; color: var(--text-secondary); font-size: 0.875rem; padding-left: var(--spacing-lg);">
            <li>✓ Setup fees for all product types</li>
            <li>✓ Production rates and volume exponents</li>
            <li>✓ Finishing costs and paper costs</li>
            <li>✓ Click cost and minimum order</li>
            <li>✓ Form validation and error handling</li>
            <li>✓ Export/import for backup and sharing</li>
          </ul>
        </div>
      </div>
    `}formatProductName(e){return e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}formatFinishingName(e){return e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}formatPaperName(e){return e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}validateInput(e,t){if(isNaN(e))return{isValid:!1,message:"Please enter a valid number"};switch(t){case"minimumOrder":if(e<0)return{isValid:!1,message:"Minimum order must be 0 or greater"};if(e>1e3)return{isValid:!1,message:"Minimum order cannot exceed $1000"};break;case"setupFee":if(e<0)return{isValid:!1,message:"Setup fee must be 0 or greater"};if(e>500)return{isValid:!1,message:"Setup fee cannot exceed $500"};break;case"productionRate":if(e<0)return{isValid:!1,message:"Production rate must be 0 or greater"};if(e>50)return{isValid:!1,message:"Production rate cannot exceed $50"};break;case"volumeExponent":if(e<.1)return{isValid:!1,message:"Volume exponent must be at least 0.1"};if(e>2)return{isValid:!1,message:"Volume exponent cannot exceed 2.0"};break;case"finishingCost":if(e<0)return{isValid:!1,message:"Finishing cost must be 0 or greater"};if(e>10)return{isValid:!1,message:"Finishing cost cannot exceed $10 per piece"};break;case"paperCost":if(e<0)return{isValid:!1,message:"Paper cost must be 0 or greater"};if(e>5)return{isValid:!1,message:"Paper cost cannot exceed $5 per sheet"};break;case"clickCost":if(e<0)return{isValid:!1,message:"Click cost must be 0 or greater"};if(e>1)return{isValid:!1,message:"Click cost cannot exceed $1 per piece"};break}return{isValid:!0,message:null}}showErrorMessage(e,t){const i=this.container.querySelector(e);if(i){this.clearErrorMessage(e),i.style.borderColor="var(--error-color)",i.style.boxShadow="0 0 0 3px rgba(220, 38, 38, 0.1)";const s=document.createElement("div");s.className="error-message",s.textContent=t,s.style.color="var(--error-color)",s.style.fontSize="0.75rem",s.style.marginTop="var(--spacing-xs)",i.parentNode.appendChild(s)}}clearErrorMessage(e){const t=this.container.querySelector(e);if(t){t.style.borderColor="",t.style.boxShadow="";const i=t.parentNode.querySelector(".error-message");i&&i.remove()}}showSuccessFeedback(e){const t=this.container.querySelector(e);if(t){const i=t.textContent;t.textContent="Saved!",t.style.background="var(--success-color)",t.style.color="white",t.classList.add("success"),setTimeout(()=>{t.textContent=i,t.style.background="",t.style.color="",t.classList.remove("success")},1500)}}showErrorFeedback(e){const t=this.container.querySelector(e);if(t){const i=t.textContent,s=t.style.background,r=t.style.color;t.textContent="Error!",t.style.background="var(--error-color)",t.style.color="white",setTimeout(()=>{t.textContent=i,t.style.background=s,t.style.color=r},1500)}}renderSetupFeeInputs(){const e=this.settingsService.getSettings();return Object.entries(e.setupFees).map(([t,i])=>`<div class="input-group">
        <label for="setup-fee-${t}">${this.formatProductName(t)}:</label>
        <input type="number" id="setup-fee-${t}" step="0.01" min="0" value="${i}" />
        <button class="save-btn" id="save-setup-fee-${t}">Save</button>
      </div>`).join("")}renderProductionRateInputs(){const e=this.settingsService.getSettings();return Object.entries(e.productionRates).map(([t,i])=>`<div class="input-group">
        <label for="production-rate-${t}">${this.formatProductName(t)}:</label>
        <input type="number" id="production-rate-${t}" step="0.01" min="0" value="${i}" />
        <button class="save-btn" id="save-production-rate-${t}">Save</button>
      </div>`).join("")}renderVolumeExponentInputs(){const e=this.settingsService.getSettings();return Object.entries(e.volumeExponents).map(([t,i])=>`<div class="input-group">
        <label for="volume-exponent-${t}">${this.formatProductName(t)}:</label>
        <input type="number" id="volume-exponent-${t}" step="0.01" min="0.1" max="2.0" value="${i}" />
        <button class="save-btn" id="save-volume-exponent-${t}">Save</button>
      </div>`).join("")}renderFinishingCostInputs(){const e=this.settingsService.getSettings();return Object.entries(e.finishingCosts).map(([t,i])=>`<div class="input-group">
        <label for="finishing-cost-${t}">${this.formatFinishingName(t)}:</label>
        <input type="number" id="finishing-cost-${t}" step="0.01" min="0" value="${i}" />
        <button class="save-btn" id="save-finishing-cost-${t}">Save</button>
      </div>`).join("")}renderPaperCostInputs(){const e=this.settingsService.getSettings();return Object.entries(e.paperCosts).map(([t,i])=>`<div class="input-group">
        <label for="paper-cost-${t}">${this.formatPaperName(t)}:</label>
        <input type="number" id="paper-cost-${t}" step="0.01" min="0" value="${i}" />
        <button class="save-btn" id="save-paper-cost-${t}">Save</button>
      </div>`).join("")}setupEventListeners(){this.cleanup(),this.clickHandler=e=>{if(e.target.id==="settings-close")this.hide();else if(e.target.classList.contains("tab-btn"))this.switchTab(e.target.dataset.tab);else if(e.target.id==="reset-settings")this.resetSettings();else if(e.target.id==="export-settings")this.exportSettings();else if(e.target.id==="import-settings")this.importSettings();else if(e.target.id==="load-settings-file")this.loadSettingsFile();else if(e.target.id==="save-minimum-order")this.saveMinimumOrder();else if(e.target.id.startsWith("save-setup-fee-")){const t=e.target.id.replace("save-setup-fee-","");this.saveSetupFee(t)}else if(e.target.id.startsWith("save-production-rate-")){const t=e.target.id.replace("save-production-rate-","");this.saveProductionRate(t)}else if(e.target.id.startsWith("save-volume-exponent-")){const t=e.target.id.replace("save-volume-exponent-","");this.saveVolumeExponent(t)}else if(e.target.id.startsWith("save-finishing-cost-")){const t=e.target.id.replace("save-finishing-cost-","");this.saveFinishingCost(t)}else if(e.target.id.startsWith("save-paper-cost-")){const t=e.target.id.replace("save-paper-cost-","");this.savePaperCost(t)}else e.target.id==="save-click-cost"&&this.saveClickCost()},this.addEventListenerWithCleanup(this.container,"click",this.clickHandler),this.backdropHandler=e=>{e.target.classList.contains("settings-panel")&&this.hide()},this.addEventListenerWithCleanup(this.container,"click",this.backdropHandler)}show(){this.isVisible=!0,this.render(),this.setupEventListeners()}hide(){this.isVisible=!1,this.render(),this.setupEventListeners()}toggle(){this.isVisible?this.hide():this.show()}async resetSettings(){await this.showConfirmation("Reset Settings","Are you sure you want to reset all settings to default values? This action cannot be undone.")==="confirm"&&(this.settingsService.resetToDefaults(),this.refreshDisplay())}exportSettings(){const e=this.settingsService.exportSettings(),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=`pricing-settings-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}saveMinimumOrder(){const e=this.container.querySelector("#minimum-order-input");if(e){const t=parseFloat(e.value),i=this.validateInput(t,"minimumOrder");i.isValid?(this.settingsService.updateSetting("minimumOrder",t),this.refreshDisplay(),this.showSuccessFeedback("#save-minimum-order"),this.clearErrorMessage("#minimum-order-input")):(this.showErrorMessage("#minimum-order-input",i.message),this.showErrorFeedback("#save-minimum-order"))}}saveSetupFee(e){const t=this.container.querySelector(`#setup-fee-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"setupFee");if(s.isValid){const r=this.settingsService.updateSetting("setupFees",i,e);if(r.success)this.refreshDisplay(),this.showSuccessFeedback(`#save-setup-fee-${e}`),this.clearErrorMessage(`#setup-fee-${e}`);else{const n=r.errors.join(", ");this.showErrorMessage(`#setup-fee-${e}`,n),this.showErrorFeedback(`#save-setup-fee-${e}`)}}else this.showErrorMessage(`#setup-fee-${e}`,s.message),this.showErrorFeedback(`#save-setup-fee-${e}`)}}saveProductionRate(e){const t=this.container.querySelector(`#production-rate-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"productionRate");s.isValid?(this.settingsService.updateSetting("productionRates",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-production-rate-${e}`),this.clearErrorMessage(`#production-rate-${e}`)):(this.showErrorMessage(`#production-rate-${e}`,s.message),this.showErrorFeedback(`#save-production-rate-${e}`))}}saveVolumeExponent(e){const t=this.container.querySelector(`#volume-exponent-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"volumeExponent");s.isValid?(this.settingsService.updateSetting("volumeExponents",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-volume-exponent-${e}`),this.clearErrorMessage(`#volume-exponent-${e}`)):(this.showErrorMessage(`#volume-exponent-${e}`,s.message),this.showErrorFeedback(`#save-volume-exponent-${e}`))}}saveFinishingCost(e){const t=this.container.querySelector(`#finishing-cost-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"finishingCost");s.isValid?(this.settingsService.updateSetting("finishingCosts",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-finishing-cost-${e}`),this.clearErrorMessage(`#finishing-cost-${e}`)):(this.showErrorMessage(`#finishing-cost-${e}`,s.message),this.showErrorFeedback(`#save-finishing-cost-${e}`))}}savePaperCost(e){const t=this.container.querySelector(`#paper-cost-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"paperCost");s.isValid?(this.settingsService.updateSetting("paperCosts",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-paper-cost-${e}`),this.clearErrorMessage(`#paper-cost-${e}`)):(this.showErrorMessage(`#paper-cost-${e}`,s.message),this.showErrorFeedback(`#save-paper-cost-${e}`))}}saveClickCost(){const e=this.container.querySelector("#click-cost-input");if(e){const t=parseFloat(e.value),i=this.validateInput(t,"clickCost");i.isValid?(this.settingsService.updateSetting("clickCost",t),this.refreshDisplay(),this.showSuccessFeedback("#save-click-cost"),this.clearErrorMessage("#click-cost-input")):(this.showErrorMessage("#click-cost-input",i.message),this.showErrorFeedback("#save-click-cost"))}}switchTab(e){this.activeTab=e,this.render(),this.setupEventListeners()}importSettings(){const e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=t=>{const i=t.target.files[0];if(i){const s=new FileReader;s.onload=async r=>{try{this.settingsService.importSettings(r.target.result)?(this.refreshDisplay(),await this.showSuccess("Success","Settings imported successfully!")):await this.showError("Error","Failed to import settings. Please check the file format.")}catch{await this.showError("Error","Failed to import settings. Invalid file format.")}},s.readAsText(i)}},e.click()}async loadSettingsFile(){const e=this.container.querySelector("#settings-file-input");if(e&&e.files.length>0){const t=e.files[0],i=new FileReader;i.onload=async s=>{try{this.settingsService.importSettings(s.target.result)?(this.refreshDisplay(),await this.showSuccess("Success","Settings loaded successfully!"),e.value=""):await this.showError("Error","Failed to load settings. Please check the file format.")}catch{await this.showError("Error","Failed to load settings. Invalid file format.")}},i.readAsText(t)}else await this.showError("Error","Please select a settings file first.")}refreshDisplay(){const e=this.container.querySelector(".tab-content");e&&(e.innerHTML=this.renderTabContent())}destroy(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler),this.backdropHandler&&this.container.removeEventListener("click",this.backdropHandler)}}class ue{constructor(e){this.container=e,this.version="1.0.1",this.buildTime="2025-07-10T02:28:27.580Z",this.init()}init(){this.render()}formatBuildDate(){try{return new Date(this.buildTime).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}catch{return"Unknown"}}render(){const e=this.formatBuildDate();this.container.innerHTML=`
      <div class="version-tag">
        <span class="version-text">v${this.version}</span>
        <span class="version-separator">•</span>
        <span class="build-time">Last updated: ${e}</span>
      </div>
    `}getVersionInfo(){return{version:this.version,buildTime:this.buildTime,formattedBuildTime:this.formatBuildDate()}}destroy(){this.container&&(this.container.innerHTML="")}}class he{constructor(){this.settingsService=new te,this.pricingEngine=new G(this.settingsService),this.quoteService=new Y(this.pricingEngine),this.cartService=new Z(this.pricingEngine),this.currentProduct=null,this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.currentQuantity=50,this.currentPricing=null,this.eventListeners=[],this.domCache={},this.debouncedUpdateCalculation=this.debounce(this.updateCalculation.bind(this),150),this.init()}init(){try{this.initializeComponents(),this.setupEventListeners(),this.updateCalculation()}catch(e){m.handleError({type:"initialization",message:e.message,stack:e.stack},{component:"InstantQuoteApp",severity:"critical",userMessage:"Failed to initialize the application. Please refresh the page.",recoveryAction:()=>{setTimeout(()=>{try{this.init()}catch(t){m.handleError({type:"initialization_retry",message:t.message,stack:t.stack},{component:"InstantQuoteApp",severity:"critical"})}},2e3)}})}}addEventListenerWithCleanup(e,t,i){e&&e.addEventListener&&(e.addEventListener(t,i),this.eventListeners.push({element:e,event:t,handler:i}))}getElement(e){return this.domCache[e]||(this.domCache[e]=document.getElementById(e)),this.domCache[e]}clearDomCache(){this.domCache={}}debounce(e,t){let i;return(...s)=>{clearTimeout(i),i=setTimeout(()=>e.apply(this,s),t)}}cleanup(){this.eventListeners.forEach(({element:e,event:t,handler:i})=>{e&&e.removeEventListener&&e.removeEventListener(t,i)}),this.eventListeners=[]}destroy(){this.cleanup(),this.clearDomCache(),this.productSelector&&this.productSelector.destroy&&this.productSelector.destroy(),this.sizeSelector&&this.sizeSelector.destroy&&this.sizeSelector.destroy(),this.quantitySelector&&this.quantitySelector.destroy&&this.quantitySelector.destroy(),this.priceDisplay&&this.priceDisplay.destroy&&this.priceDisplay.destroy(),this.cartDisplay&&this.cartDisplay.destroy&&this.cartDisplay.destroy(),this.hamburgerMenu&&this.hamburgerMenu.destroy&&this.hamburgerMenu.destroy(),this.settingsPanel&&this.settingsPanel.destroy&&this.settingsPanel.destroy(),this.versionTag&&this.versionTag.destroy&&this.versionTag.destroy(),this.settingsService=null,this.pricingEngine=null,this.quoteService=null,this.cartService=null}initializeComponents(){console.log("🏠 Initializing components..."),console.log("🏠 Initializing ProductSelector...");const e=this.getElement("product-grid");if(console.log("🏠 Product grid element:",e),console.log("🏠 Product types:",g),!e)throw new Error("Product grid element not found");this.productSelector=new se(e,g,c=>this.handleProductSelection(c)),console.log("✅ ProductSelector initialized"),console.log("🏠 Initializing SizeSelector...");const t=this.getElement("size-grid"),i=this.getElement("options-list");this.sizeSelector=new re(t,i,c=>this.handleSizeOptionSelection(c)),console.log("✅ SizeSelector initialized"),this.quantitySelector=null,console.log("🏠 Initializing PriceDisplay...");const s=this.getElement("price-display");this.priceDisplay=new ae(s,this.pricingEngine,this.cartService,this.settingsService),console.log("✅ PriceDisplay initialized"),console.log("🏠 Initializing CartDisplay...");const r=this.getElement("cart-container");r?(this.cartDisplay=new ce(r,this.cartService,this.pricingEngine),console.log("✅ CartDisplay initialized")):console.warn("⚠️ Cart container not found"),console.log("🏠 Initializing HamburgerMenu...");const n=this.getElement("hamburger-menu-container");n?(this.hamburgerMenu=new le(n,c=>this.handleMenuToggle(c)),console.log("✅ HamburgerMenu initialized")):console.warn("⚠️ Hamburger container not found"),console.log("🏠 Initializing SettingsPanel...");const o=this.getElement("settings-panel-container");o?(this.settingsPanel=new de(o,this.settingsService),console.log("✅ SettingsPanel initialized")):console.warn("⚠️ Settings container not found"),console.log("🏠 Initializing VersionTag...");const a=this.getElement("version-tag-container");a?(this.versionTag=new ue(a),console.log("✅ VersionTag initialized")):console.warn("⚠️ Version tag container not found"),console.log("✅ All components initialized successfully")}setupEventListeners(){this.cleanup();const e=this.getElement("back-to-products");this.addEventListenerWithCleanup(e,"click",()=>this.goBackToProducts());const t=this.getElement("print-quote"),i=this.getElement("close-modal"),s=this.getElement("quote-modal");this.addEventListenerWithCleanup(t,"click",()=>this.printQuote()),this.addEventListenerWithCleanup(i,"click",()=>this.closeModal()),this.addEventListenerWithCleanup(s,"click",r=>{r.target===s&&this.closeModal()}),this.addEventListenerWithCleanup(document,"keydown",r=>this.handleKeyboard(r)),this.addEventListenerWithCleanup(this.settingsService,"settingsChanged",()=>{console.log("🏠 App.js: Settings changed, triggering debounced calculation update"),this.debouncedUpdateCalculation()}),this.settingsPanel&&this.addEventListenerWithCleanup(this.settingsPanel.container,"click",r=>{(r.target.id==="settings-close"||r.target.classList.contains("settings-panel"))&&this.hamburgerMenu&&this.hamburgerMenu.setOpen(!1)}),this.setupStepNavigation()}setupStepNavigation(){}handleProductSelection(e){this.currentProduct=e,e.pricing.type==="interpolation"?this.handleInterpolationProduct(e):this.handleStandardProduct(e)}handleStandardProduct(e){this.sizeSelector.updateProduct(e,e.key);const t=document.getElementById("product-name"),i=document.getElementById("product-description");t&&i&&(t.textContent=`${e.name} - Select a Size`,i.textContent=e.description);const s=this.getElement("options-list");s&&(s.style.display="block");const r=document.querySelector(".paper-grid");r&&(r.style.display="block"),document.querySelectorAll("h3").forEach(o=>{o.textContent==="Paper Type"&&(o.style.display="block")}),this.showStep("size-selector"),this.initializeQuantitySelector(),this.updateCalculation()}handleInterpolationProduct(e){const t=document.getElementById("product-name"),i=document.getElementById("product-description");t&&i&&(t.textContent=`${e.name} - Select Size & Quantity`,i.textContent=e.description);const s=this.getElement("size-grid");s&&(s.innerHTML="",Object.entries(e.sizes).forEach(([a,c])=>{const d=document.createElement("div");d.className="size-card",d.dataset.sizeKey=c.key,d.innerHTML=`
          <h3>${c.name}</h3>
          <p>Custom printed ${e.name.toLowerCase()}</p>
        `,d.addEventListener("click",()=>this.handleInterpolationSizeSelection(c)),s.appendChild(d)}));const r=this.getElement("options-list");r&&(r.style.display="none");const n=document.querySelector(".paper-grid");n&&(n.style.display="none"),document.querySelectorAll("h3").forEach(a=>{a.textContent==="Paper Type"&&(a.style.display="none")}),this.showStep("size-selector")}handleInterpolationSizeSelection(e){this.currentSize=e,this.currentOptions=[],this.currentPaper=null;const t=document.querySelector(".size-card.selected");t&&t.classList.remove("selected");const i=document.querySelector(`[data-size-key="${e.key}"]`);i&&i.classList.add("selected"),this.initializeInterpolationQuantitySelector()}initializeInterpolationQuantitySelector(){this.quantitySelector&&this.quantitySelector.destroy&&this.quantitySelector.destroy();const e=document.querySelector("#quantity-selector");e&&this.currentProduct&&this.currentSize&&(this.quantitySelector=new oe(e,this.currentProduct,this.currentSize,t=>this.handleInterpolationQuantityChange(t)))}handleInterpolationQuantityChange(e){this.currentQuantity=e.quantity,this.currentPricing=e.pricing,this.priceDisplay&&this.priceDisplay.updateExternalPricing(this.currentPricing)}initializeQuantitySelector(){if(!this.quantitySelector){const e=document.querySelector("#quantity-selector");e&&(this.quantitySelector=new ne(e,this.pricingEngine,t=>this.handleQuantityChange(t)))}}handleSizeOptionSelection(e){this.currentSize=e.size,this.currentOptions=e.options,this.currentPaper=e.paper,this.debouncedUpdateCalculation()}handleQuantityChange(e){this.currentQuantity=e,this.debouncedUpdateCalculation()}async updateCalculation(){var e,t;try{await this.priceDisplay.updatePricing(this.currentProduct,this.currentSize,this.currentOptions,this.currentQuantity,this.currentPaper),this.quantitySelector&&this.quantitySelector.updatePricingContext(this.currentProduct,this.currentSize,this.currentOptions,this.currentPaper),this.currentPricing=this.priceDisplay.getCurrentPricing()}catch(i){m.handleError({type:"calculation",message:i.message,stack:i.stack,context:{product:(e=this.currentProduct)==null?void 0:e.name,size:(t=this.currentSize)==null?void 0:t.name,quantity:this.currentQuantity}},{component:"InstantQuoteApp",severity:"error",userMessage:"Price calculation failed. Some pricing may be incorrect.",recoveryAction:()=>{this.currentQuantity=50,setTimeout(()=>this.updateCalculation(),100)}})}}showStep(e){document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));const i=document.getElementById(e);i&&i.classList.add("active")}goBackToProducts(){this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.sizeSelector.reset();const e=document.getElementById("product-name"),t=document.getElementById("product-description");e&&t&&(e.textContent="Choose Size & Options",t.textContent=""),this.showStep("product-selector"),this.updateCalculation()}handleMenuToggle(e){this.settingsPanel&&(e?this.settingsPanel.show():this.settingsPanel.hide())}displayQuote(e){const t=document.getElementById("quote-content"),i=this.quoteService.formatQuoteHTML(e);t.innerHTML=i,document.getElementById("quote-modal").classList.add("active"),this.currentQuote=e}printQuote(){if(this.currentQuote){const e=this.quoteService.formatQuoteHTML(this.currentQuote);this.quoteService.printQuote(e)}}closeModal(){document.getElementById("quote-modal").classList.remove("active"),this.currentQuote=null}handleKeyboard(e){if(e.ctrlKey||e.metaKey)switch(e.key){case"p":e.preventDefault(),this.currentQuote&&this.printQuote();break}e.key==="Escape"&&this.closeModal()}loadQuoteHistory(){return this.quoteService.getSavedQuotes()}toggleRushOrder(e){this.priceDisplay.showRushOrderPricing(e),this.updateCalculation()}}document.addEventListener("DOMContentLoaded",()=>{try{console.log("🏠 DOM loaded, initializing app..."),window.instantQuoteApp=new he,console.log("✅ App initialized successfully")}catch(l){console.error("❌ Failed to initialize app:",l);const e=document.createElement("div");e.style.cssText="position: fixed; top: 20px; left: 20px; right: 20px; background: #ffebee; border: 1px solid #f44336; padding: 20px; border-radius: 8px; color: #c62828; z-index: 9999;",e.innerHTML=`
      <h3>Application Error</h3>
      <p>Failed to initialize the application. Please check the console for details.</p>
      <p><strong>Error:</strong> ${l.message}</p>
      <button onclick="location.reload()" style="background: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Reload Page</button>
    `,document.body.appendChild(e)}});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(l=>{console.log("SW registered: ",l)}).catch(l=>{console.log("SW registration failed: ",l)})});
