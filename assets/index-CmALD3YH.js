(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const N={checkmark:`
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
  `};function d(o,e=""){const t=N[o];if(!t)return console.warn(`SVG icon '${o}' not found`),"";const i=document.createElement("span");return i.className=`svg-icon ${e}`,i.innerHTML=t,i.outerHTML}const h={brochures:{name:"Brochures",description:"Tri-fold and bi-fold brochures",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:d("brochure"),sizes:{small:{name:'8.5" x 11"',imposition:2},medium:{name:'11" x 17"',imposition:1},large:{name:'12" x 18"',imposition:1}},finishingOptions:[{name:"Folding",description:"Machine folding service (per piece)",cost:.2},{name:"Scoring",description:"Crease lines for clean folding (per piece)",cost:.1}]},postcards:{name:"Postcards",description:"Marketing postcards and mailers",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:d("postcard"),sizes:{small:{name:'4" x 6"',imposition:8},medium:{name:'5" x 7"',imposition:4},large:{name:'6" x 9"',imposition:2}},finishingOptions:[]},flyers:{name:"Flyers",description:"Single-sheet promotional flyers",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:d("flyer"),sizes:{small:{name:'5.5" x 8.5"',imposition:4},medium:{name:'8.5" x 11"',imposition:2},large:{name:'8.5" x 14"',imposition:1},xlarge:{name:'11" x 17"',imposition:1}},finishingOptions:[{name:"Scoring",description:"Crease lines for clean folding",cost:15}]},bookmarks:{name:"Bookmarks",description:"Custom printed bookmarks",pricing:{setupFee:30,overhead:{k:1.5,e:.75},variableCost:null},icon:d("bookmark"),sizes:{standard:{name:'2" x 6"',imposition:10},tall:{name:'2" x 7"',imposition:10},extra_tall:{name:'2" x 8"',imposition:10}},finishingOptions:[]},table_tents:{name:"Table Tent Cards",description:"Folded table display cards with scoring, folding & tape",pricing:{setupFee:75,overhead:{k:1.5,e:.85},variableCost:null},icon:d("table_tent"),sizes:{small:{name:'4" x 6"',imposition:2},medium:{name:'5" x 7"',imposition:2}},finishingOptions:[{name:"Scoring",description:"Crease lines for folding (per piece)",cost:.1},{name:"Folding",description:"Machine folding service (per piece)",cost:.2},{name:"Double-Sided Tape",description:"Assembly tape application (per piece)",cost:.2}]}},y={minimumOrder:5,rushOrderMultiplier:1.5},p={LYNODI312FSC:{brand:"Lynx",type:"text_stock",finish:"Uncoated",size:"13x19",weight:"60#",costPerSheet:.08548,displayName:"60# Text Uncoated"},LYNO416FSC:{brand:"Lynx",type:"text_stock",finish:"Uncoated",size:"13x19",weight:"80#",costPerSheet:.11397,displayName:"80# Text Uncoated"},LYNOC76FSC:{brand:"Lynx",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"80#",costPerSheet:.22408,displayName:"80# Cover Uncoated"},LYNOC95FSC:{brand:"Lynx",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"100#",costPerSheet:.2801,displayName:"100# Cover Uncoated"},LYNODIC11413FSC:{brand:"Lynx",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"120#",costPerSheet:.38147,displayName:"120# Cover Uncoated"},COUDCCDIC123513FSC:{brand:"Cougar",type:"cover_stock",finish:"Uncoated",size:"13x19",weight:"130#",costPerSheet:.538,displayName:"130# Cover Uncoated"},PACDIS42FSC:{brand:"Pacesetter",type:"text_stock",finish:"Silk",size:"13x19",weight:"80#",costPerSheet:.07702,displayName:"80# Text Silk"},PACDIS52FSC:{brand:"Pacesetter",type:"text_stock",finish:"Silk",size:"13x19",weight:"100#",costPerSheet:.09536,displayName:"100# Text Silk"},PACDISC7613FSC:{brand:"Pacesetter",type:"cover_stock",finish:"Silk",size:"13x19",weight:"80#",costPerSheet:.14204,displayName:"80# Cover Silk"},PACDISC9513FSC:{brand:"Pacesetter",type:"cover_stock",finish:"Silk",size:"13x19",weight:"100#",costPerSheet:.17756,displayName:"100# Cover Silk"},PACDISC12413FSC:{brand:"Pacesetter",type:"cover_stock",finish:"Silk",size:"13x19",weight:"130#",costPerSheet:.23176,displayName:"130# Cover Silk"}},k={brochures:{displayName:"Brochures",allowedTypes:["text_stock","cover_stock"],allowedWeights:null,defaultPaper:"PACDIS42FSC"},postcards:{displayName:"Postcards",allowedTypes:["cover_stock"],allowedWeights:null,defaultPaper:"LYNOC95FSC"},flyers:{displayName:"Flyers",allowedTypes:["text_stock","cover_stock"],allowedWeights:null,defaultPaper:"PACDIS42FSC"},bookmarks:{displayName:"Bookmarks",allowedTypes:["cover_stock"],allowedWeights:["80#","100#","120#","130#"],defaultPaper:"LYNODIC11413FSC"},table_tents:{displayName:"Table Tent Cards",allowedTypes:["cover_stock"],allowedWeights:["80#","100#","120#","130#"],defaultPaper:"PACDISC9513FSC"}};function P(o){const e=k[o];return e?Object.entries(p).filter(([t,i])=>!(!e.allowedTypes.includes(i.type)||e.allowedWeights&&!e.allowedWeights.includes(i.weight))).map(([t,i])=>({id:t,...i})):[]}function b(o){const e=k[o];return!e||!e.defaultPaper?null:{id:e.defaultPaper,...p[e.defaultPaper]}}const O=.1;function Q(o){const e=k[o];return e?e.allowedTypes.map(t=>({key:t,name:t==="text_stock"?"Text Stock":"Cover Stock",description:t==="text_stock"?"Lighter weight, flexible paper for flyers and brochures":"Heavier weight, durable paper for postcards and premium materials"})):[]}function D(o,e){const t=P(o),i=new Set;return t.filter(s=>s.type===e).forEach(s=>i.add(s.weight)),Array.from(i).sort((s,r)=>{const n=parseInt(s.replace("#","")),a=parseInt(r.replace("#",""));return n-a})}function B(o,e,t){const i=P(o),s=new Set;return i.filter(r=>r.type===e&&r.weight===t).forEach(r=>s.add(r.finish)),Array.from(s).sort()}function j(o,e,t,i){return P(o).find(r=>r.type===e&&r.weight===t&&r.finish===i)}function F(o){const e=p[o];return e?e.type:null}function T(o){const e=p[o];return e?e.weight:null}function M(o){const e=p[o];return e?e.finish:null}class V{constructor(e=null){this.settingsService=e,this.settings=y,this.impositionLookup={"3.5x2":21,'3.5"x2"':21,"3x4":12,'3"x4"':12,"2x6":10,'2"x6"':10,"2x8":10,'2"x8"':10,"2x7":10,'2"x7"':10,"4x6":8,'4"x6"':8,"5x7":4,'5"x7"':4,"5.5x8.5":4,'5.5"x8.5"':4,"6x9":2,'6"x9"':2,"8.5x11":2,'8.5"x11"':2,"8.5x14":1,'8.5"x14"':1,"11x17":1,'11"x17"':1,"12x18":1,'12"x18"':1}}getEffectiveSettings(){return this.settingsService?this.settingsService.getSettings():this.settings}updateSettings(e){this.settingsService||(this.settings={...this.settings,...e})}getImposition(e){if(e&&e.imposition&&e.imposition>0)return e.imposition;if(e&&e.name){const t=e.name.toLowerCase().replace(/\s+/g,""),i=Object.keys(this.impositionLookup).find(s=>s.toLowerCase().replace(/\s+/g,"")===t);if(i)return this.impositionLookup[i]}return 2}calculateJobCost(e,t){if(!e||t<=0)return{setupFee:0,productionCost:0,materialsCost:0,totalCost:0};const{setupFee:i,overhead:s,variableCost:r}=e,n=Math.pow(t,s.e)*s.k,a=t*r,c=i+n+a;return{setupFee:i,productionCost:n,materialsCost:a,totalCost:c}}applyOptionMultipliers(e,t=[],i){let s=1;t&&t.length>0&&(s=t.reduce((a,c)=>c.modifier&&!c.cost?a*c.modifier:a,1));const r=e.materialsCost*s,n=e.setupFee+e.productionCost+r;return{setupFee:e.setupFee,productionCost:e.productionCost,materialsCost:r,totalCost:n,optionModifier:s}}calculatePrice(e,t,i,s,r=null){if(!e||!e.pricing||s<=0)return{setupFee:0,unitPrice:0,subtotal:0,tax:0,total:0,breakdown:{setupFee:0,baseUnitCost:0,sizeModifier:1,optionModifiers:[],finalUnitPrice:0,overheadPerPiece:0,variableCost:0}};const n=this.getEffectiveSettings();let a={...e.pricing};n.setupFees&&n.setupFees[e.key]&&(a.setupFee=n.setupFees[e.key]),n.productionRates&&n.productionRates[e.key]&&(a.overhead.k=n.productionRates[e.key]),n.volumeExponents&&n.volumeExponents[e.key]&&(a.overhead.e=n.volumeExponents[e.key]);const c=this.getImposition(t),u=n.clickCost||O;if(r&&t&&c>0){const g=(n.paperCosts&&n.paperCosts[r.id]?n.paperCosts[r.id]:r.costPerSheet)+u;a.variableCost=g*1.5/c}else a.variableCost=(.1+u)*1.5/c;const v=this.calculateJobCost(a,s),m=this.applyOptionMultipliers(v,i,s),w=i?i.reduce((l,g)=>{if(g.cost){const L=g.name.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,""),H=n.finishingCosts&&n.finishingCosts[L]?n.finishingCosts[L]:g.cost;return l+H*s}return l},0):0,f=m.setupFee,S=m.productionCost,C=m.materialsCost,x=f+S+C+w,E=x,q=s>0?(S+C)/s:0,$=n.minimumOrder||this.settings.minimumOrder,z=E<$,I=Math.max(E,$);return{setupFee:Math.round(f*100)/100,unitPrice:Math.round(q*100)/100,subtotal:Math.round(x*100)/100,tax:0,total:Math.round(I*100)/100,breakdown:{setupFee:Math.round(f*100)/100,productionCost:Math.round(S*100)/100,materialsCost:Math.round(C*100)/100,finishingCost:Math.round(w*100)/100,optionModifiers:i.filter(l=>l.modifier&&!l.cost).map(l=>({name:l.name,modifier:l.modifier})),finishingOptions:i.filter(l=>l.cost).map(l=>({name:l.name,cost:l.cost})),variableCostPerPiece:Math.round(a.variableCost*100)/100,minimumApplied:z}}}formatPrice(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)}calculateRushOrder(e){const i=this.getEffectiveSettings().rushOrderMultiplier||this.settings.rushOrderMultiplier;return{unitPrice:Math.round(e.unitPrice*i*100)/100,subtotal:Math.round(e.subtotal*i*100)/100,tax:Math.round(e.subtotal*i*this.settings.taxRate*100)/100,total:Math.round(e.subtotal*i*(1+this.settings.taxRate)*100)/100,breakdown:{...e.breakdown,rushOrder:!0,rushMultiplier:i}}}}class R{constructor(e){this.pricingEngine=e}generateQuote(e){const{product:t,size:i,options:s,quantity:r,pricing:n,customerInfo:a={},rushOrder:c=!1}=e,u=this.generateQuoteNumber(),v=new Date().toLocaleDateString();return{quoteNumber:u,date:v,customer:{name:a.name||"Walk-in Customer",phone:a.phone||"",email:a.email||""},items:[{description:this.buildItemDescription(t,i,s),quantity:r,unitPrice:n.unitPrice,total:n.subtotal}],subtotal:n.subtotal,tax:n.tax,total:n.total,rushOrder:c,notes:this.buildNotes(t,i,s,c)}}buildItemDescription(e,t,i){let s=e.name;if(t&&(s+=` - ${t.name}`),i&&i.length>0){const r=i.map(n=>n.name).join(", ");s+=` (${r})`}return s}buildNotes(e,t,i,s){const r=[];return e.description&&r.push(`Product: ${e.description}`),s&&r.push("RUSH ORDER - Expedited processing requested"),r.push("Quote valid for 30 days"),r.push("Payment required at time of order"),r}generateQuoteNumber(){const e=new Date,t=e.getFullYear().toString().slice(-2),i=(e.getMonth()+1).toString().padStart(2,"0"),s=e.getDate().toString().padStart(2,"0"),r=e.getTime().toString().slice(-4);return`Q${t}${i}${s}-${r}`}formatQuoteHTML(e){return`
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
    `),t.document.close(),t.print()}}class _{constructor(e=null){this.items=[],this.listeners=[],this.pricingEngine=e,this.loadFromStorage()}setPricingEngine(e){this.pricingEngine=e}addItem(e,t,i,s,r,n=null){const a=this.generateItemId(e,t,i),c=this.items.find(u=>u.id===a);if(c){const u=c.quantity+s;c.quantity=u,this.pricingEngine?c.pricing=this.pricingEngine.calculatePrice(c.product,c.size,c.options,u,c.paper||null):c.pricing=r}else this.items.push({id:a,product:{...e},size:{...t},options:[...i],quantity:s,pricing:r,paper:n?{...n}:null,dateAdded:new Date().toISOString()});this.saveToStorage(),this.notifyListeners()}removeItem(e){this.items=this.items.filter(t=>t.id!==e),this.saveToStorage(),this.notifyListeners()}updateQuantity(e,t){const i=this.items.find(s=>s.id===e);i&&(t<=0?this.removeItem(e):(i.quantity=t,this.pricingEngine&&(i.pricing=this.pricingEngine.calculatePrice(i.product,i.size,i.options,t,i.paper||null)),this.saveToStorage(),this.notifyListeners()))}clearCart(){this.items=[],this.saveToStorage(),this.notifyListeners()}getItems(){return[...this.items]}getItemCount(){return this.items.reduce((e,t)=>e+t.quantity,0)}getTotalPrice(){return this.items.reduce((e,t)=>e+t.pricing.total,0)}getSubtotal(){return this.items.reduce((e,t)=>e+t.pricing.subtotal,0)}getTotalTax(){return this.items.reduce((e,t)=>e+t.pricing.tax,0)}generateItemId(e,t,i){const s=i.map(r=>r.key).sort().join(",");return`${e.key}_${t.key}_${s}`}getItemDescription(e){let t=`${e.product.name}`;if(e.size&&(t+=` - ${e.size.name}`),e.options.length>0){const i=e.options.map(s=>s.name).join(", ");t+=` (${i})`}return t}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(t=>t!==e)}notifyListeners(){this.listeners.forEach(e=>e(this.getCartSummary()))}getCartSummary(){return{items:this.getItems(),count:this.getItemCount(),subtotal:this.getSubtotal(),tax:this.getTotalTax(),total:this.getTotalPrice()}}saveToStorage(){try{localStorage.setItem("printShopCart",JSON.stringify(this.items))}catch(e){console.error("Failed to save cart to storage:",e)}}loadFromStorage(){try{const e=localStorage.getItem("printShopCart");e&&(this.items=JSON.parse(e))}catch(e){console.error("Failed to load cart from storage:",e),this.items=[]}}generateQuoteData(){return{items:this.items.map(e=>({description:this.getItemDescription(e),quantity:e.quantity,unitPrice:e.pricing.unitPrice,total:e.pricing.total})),subtotal:this.getSubtotal(),tax:this.getTotalTax(),total:this.getTotalPrice(),dateGenerated:new Date().toISOString(),itemCount:this.getItemCount()}}}class A{constructor(){this.eventTarget=new EventTarget,this.storageKey="instant-quote-settings",this.settings=this.loadSettings()}loadSettings(){try{const e=localStorage.getItem(this.storageKey);if(e){const t=JSON.parse(e);return{...this.getDefaultSettings(),...t}}}catch(e){console.warn("Failed to load settings from localStorage:",e)}return this.getDefaultSettings()}saveSettings(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.settings))}catch(e){console.warn("Failed to save settings to localStorage:",e)}}getDefaultSettings(){const e={};Object.keys(h).forEach(n=>{e[n]=h[n].pricing.setupFee});const t={},i={};Object.keys(h).forEach(n=>{t[n]=h[n].pricing.overhead.k,i[n]=h[n].pricing.overhead.e});const s={};Object.keys(h).forEach(n=>{const a=h[n];a.finishingOptions&&a.finishingOptions.length>0&&a.finishingOptions.forEach(c=>{const u=c.name.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");s[u]=c.cost})});const r={};return Object.keys(p).forEach(n=>{r[n]=p[n].costPerSheet}),{setupFees:e,productionRates:t,volumeExponents:i,finishingCosts:s,paperCosts:r,clickCost:O,minimumOrder:y.minimumOrder,rushOrderMultiplier:y.rushOrderMultiplier}}getSettings(){return{...this.settings}}getSetting(e,t=null){return t?this.settings[e]&&this.settings[e][t]:this.settings[e]}updateSetting(e,t,i=null){i?(this.settings[e]||(this.settings[e]={}),this.settings[e][i]=t):this.settings[e]=t,this.saveSettings(),this.dispatchEvent("settingsChanged",{key:e,value:t,subKey:i})}resetToDefaults(){this.settings=this.getDefaultSettings(),this.saveSettings(),this.dispatchEvent("settingsChanged",{reset:!0})}addEventListener(e,t){this.eventTarget.addEventListener(e,t)}removeEventListener(e,t){this.eventTarget.removeEventListener(e,t)}dispatchEvent(e,t){this.eventTarget.dispatchEvent(new CustomEvent(e,{detail:t}))}exportSettings(){return JSON.stringify(this.settings,null,2)}importSettings(e){try{const t=JSON.parse(e);return this.settings={...this.getDefaultSettings(),...t},this.saveSettings(),this.dispatchEvent("settingsChanged",{imported:!0}),!0}catch(t){return console.error("Failed to import settings:",t),!1}}}class W{constructor(e,t,i){this.container=e,this.products=t,this.onProductSelect=i,this.selectedProduct=null,this.render()}render(){this.container.innerHTML="",Object.entries(this.products).forEach(([e,t])=>{const i=this.createProductCard(e,t);this.container.appendChild(i)})}createProductCard(e,t){const i=document.createElement("div");return i.className="product-card",i.dataset.productKey=e,i.innerHTML=`
      <div class="product-icon">${t.icon}</div>
      <div class="product-info">
        <h3 class="product-name">${t.name}</h3>
        <p class="product-description">${t.description}</p>
      </div>
      <div class="product-indicator">
        ${d("checkmark","checkmark")}
      </div>
    `,i.addEventListener("click",()=>this.selectProduct(e,t)),i}selectProduct(e,t){const i=this.container.querySelector(".product-card.selected");i&&i.classList.remove("selected"),this.container.querySelector(`[data-product-key="${e}"]`).classList.add("selected"),this.selectedProduct={key:e,...t},this.onProductSelect&&this.onProductSelect(this.selectedProduct)}getSelectedProduct(){return this.selectedProduct}reset(){const e=this.container.querySelector(".product-card.selected");e&&e.classList.remove("selected"),this.selectedProduct=null}}class U{constructor(e,t,i){this.sizeContainer=e,this.optionsContainer=t,this.onSelectionChange=i,this.selectedSize=null,this.selectedOptions=[],this.selectedPaper=null,this.currentProduct=null,this.currentProductKey=null,this.recommendedSizes={brochures:"small",postcards:"medium",flyers:"medium",bookmarks:"tall",table_tents:"small"},this.selectedPaperType=null,this.selectedWeight=null,this.selectedFinish=null,this.paperSelectionStep=1,this.paperContainer=this.findOrCreatePaperContainer()}findOrCreatePaperContainer(){let e=document.querySelector(".paper-grid");if(!e){e=document.createElement("div"),e.className="paper-grid",this.optionsContainer.parentNode.insertBefore(e,this.optionsContainer.nextSibling);const t=document.createElement("h3");t.textContent="Paper Type",this.optionsContainer.parentNode.insertBefore(t,e)}return e}updateProduct(e,t=null){this.currentProduct=e,this.currentProductKey=t,this.selectedSize=null,this.selectedOptions=[],this.selectedPaper=null,this.renderSizes(),this.renderOptions(),this.renderPapers(),this.autoSelectRecommendedSize()}renderSizes(){if(!this.currentProduct||!this.currentProduct.sizes){this.sizeContainer.innerHTML="<p>No sizes available</p>";return}this.sizeContainer.innerHTML="";const e=this.recommendedSizes[this.currentProductKey],t=Object.entries(this.currentProduct.sizes),i=[];if(t.forEach(([s,r])=>{if(s!==e){const n=this.createSizeCard(s,r);i.push({key:s,element:n,isRecommended:!1})}}),e&&this.currentProduct.sizes[e]){const s=this.currentProduct.sizes[e],r=this.createRecommendedSizeCard(e,s),n=t.findIndex(([a])=>a===e);i.splice(n,0,{key:e,element:r,isRecommended:!0})}i.forEach(({element:s})=>{this.sizeContainer.appendChild(s)})}createRecommendedSizeCard(e,t){const i=document.createElement("div");return i.className="size-card size-recommended",i.dataset.sizeKey=e,i.innerHTML=`
      <div class="size-name">Recommended Size</div>
      <div class="size-dimensions">${t.name}</div>
      <div class="size-indicator">
        ${d("checkmark","checkmark")}
      </div>
    `,i.addEventListener("click",()=>this.selectSize(e,t)),i}createSizeCard(e,t){const i=document.createElement("div");return i.className="size-card",i.dataset.sizeKey=e,i.innerHTML=`
      <div class="size-name">${t.name}</div>
      <div class="size-indicator">
        ${d("checkmark","checkmark")}
      </div>
    `,i.addEventListener("click",()=>this.selectSize(e,t)),i}selectSize(e,t){const i=this.sizeContainer.querySelector(".size-card.selected");i&&i.classList.remove("selected"),this.sizeContainer.querySelector(`[data-size-key="${e}"]`).classList.add("selected"),this.selectedSize={key:e,...t},this.triggerChange()}renderOptions(){if(this.optionsContainer.innerHTML="",this.currentProduct&&this.currentProduct.options&&(this.optionsContainer.innerHTML="<h3>Add-on Options</h3>",Object.entries(this.currentProduct.options).forEach(([e,t])=>{const i=this.createOptionCard(e,t);this.optionsContainer.appendChild(i)})),this.currentProduct&&this.currentProduct.finishingOptions&&this.currentProduct.finishingOptions.length>0){if(!this.optionsContainer.innerHTML)this.optionsContainer.innerHTML="<h3>Finishing Options</h3>";else{const e=document.createElement("h3");e.textContent="Finishing Options",e.style.marginTop="20px",this.optionsContainer.appendChild(e)}this.currentProduct.finishingOptions.forEach((e,t)=>{const i=`finishing_${t}`,s=this.createOptionCard(i,e);this.optionsContainer.appendChild(s)})}}renderPapers(){if(!this.currentProduct||!this.currentProductKey){this.paperContainer.innerHTML="<p>No product selected</p>";return}const e=b(this.currentProductKey);e&&(this.selectedPaperType=F(e.id),this.selectedWeight=T(e.id),this.selectedFinish=M(e.id),this.selectedPaper=e,this.triggerChange()),this.paperSelectionStep=1,this.renderPaperSelector()}renderPaperSelector(){this.paperContainer.innerHTML="";const e=this.createStepIndicator();switch(this.paperContainer.appendChild(e),this.paperSelectionStep){case 1:this.renderPaperTypes();break;case 2:this.renderWeights();break;case 3:this.renderFinishes();break;case 4:this.renderFinalSelection();break}}createStepIndicator(){const e=document.createElement("div");e.className="paper-step-indicator";let t="";switch(this.paperSelectionStep){case 1:t="Step 1 of 3: Choose Paper Type";break;case 2:t="Step 2 of 3: Choose Weight";break;case 3:t="Step 3 of 3: Choose Finish";break;case 4:t="Paper Selected (Default)";break}e.innerHTML=`
      <div class="step-text">${t}</div>
      ${this.paperSelectionStep>1?'<button class="back-step-btn">← Back</button>':""}
    `;const i=e.querySelector(".back-step-btn");return i&&i.addEventListener("click",()=>this.goBackStep()),e}renderPaperTypes(){const e=b(this.currentProductKey);if(e){const i=this.createRecommendedCard(e);this.paperContainer.appendChild(i)}Q(this.currentProductKey).forEach(i=>{const s=this.createPaperTypeCard(i);this.paperContainer.appendChild(s)})}renderWeights(){D(this.currentProductKey,this.selectedPaperType).forEach(t=>{const i=this.createWeightCard(t);this.paperContainer.appendChild(i)})}renderFinishes(){B(this.currentProductKey,this.selectedPaperType,this.selectedWeight).forEach(t=>{const i=this.createFinishCard(t);this.paperContainer.appendChild(i)})}renderFinalSelection(){if(!this.selectedPaper)return;const e=this.createFinalPaperCard(this.selectedPaper);this.paperContainer.appendChild(e);const t=document.createElement("button");t.className="change-paper-btn",t.textContent="Change Paper",t.addEventListener("click",()=>{this.paperSelectionStep=1,this.selectedPaperType=null,this.selectedWeight=null,this.selectedFinish=null,this.renderPaperSelector()}),this.paperContainer.appendChild(t)}createRecommendedCard(e){const t=document.createElement("div");return t.className="paper-recommended-card",t.innerHTML=`
      <div class="selection-name">Recommended Stock</div>
      <div class="selection-description">${e.displayName}</div>
    `,t.addEventListener("click",()=>this.selectRecommendedPaper(e)),t}createPaperTypeCard(e){const t=document.createElement("div");return t.className="paper-selection-card",t.innerHTML=`
      <div class="selection-name">${e.name}</div>
      <div class="selection-description">${e.description}</div>
    `,t.addEventListener("click",()=>this.selectPaperType(e.key)),t}createWeightCard(e){const t=document.createElement("div");return t.className="paper-selection-card",t.innerHTML=`
      <div class="selection-name">${e}</div>
      <div class="selection-description">Paper weight</div>
    `,t.addEventListener("click",()=>this.selectWeight(e)),t}createFinishCard(e){const t=document.createElement("div");t.className="paper-selection-card";const i=e==="Uncoated"?"Natural matte finish":"Smooth professional finish";return t.innerHTML=`
      <div class="selection-name">${e}</div>
      <div class="selection-description">${i}</div>
    `,t.addEventListener("click",()=>this.selectFinish(e)),t}createFinalPaperCard(e){const t=document.createElement("div");return t.className="paper-final-card",t.innerHTML=`
      <div class="paper-name">${e.displayName}</div>
      <div class="paper-details">
        <span class="paper-brand">${e.brand}</span>
        <span class="paper-finish">${e.finish}</span>
      </div>
      <div class="paper-cost">$${e.costPerSheet.toFixed(3)}/sheet</div>
      <div class="paper-indicator">
        ${d("checkmark","checkmark")}
      </div>
    `,t}selectRecommendedPaper(e){this.selectedPaperType=F(e.id),this.selectedWeight=T(e.id),this.selectedFinish=M(e.id),this.selectedPaper=e,this.paperSelectionStep=4,this.renderPaperSelector(),this.triggerChange()}selectPaperType(e){this.selectedPaperType=e,this.paperSelectionStep=2,this.renderPaperSelector()}selectWeight(e){this.selectedWeight=e,this.paperSelectionStep=3,this.renderPaperSelector()}selectFinish(e){this.selectedFinish=e;const t=j(this.currentProductKey,this.selectedPaperType,this.selectedWeight,this.selectedFinish);t&&(this.selectedPaper=t,this.paperSelectionStep=4,this.renderPaperSelector(),this.triggerChange())}goBackStep(){this.paperSelectionStep>1&&(this.paperSelectionStep--,this.paperSelectionStep===1?this.selectedPaperType=null:this.paperSelectionStep===2?this.selectedWeight=null:this.paperSelectionStep===3&&(this.selectedFinish=null),this.renderPaperSelector())}selectPaper(e){const t=this.paperContainer.querySelector(".paper-card.selected");t&&t.classList.remove("selected");const i=this.paperContainer.querySelector(`[data-paper-id="${e.id}"]`);i&&i.classList.add("selected"),this.selectedPaper=e,this.triggerChange()}createOptionCard(e,t){const i=document.createElement("div");i.className="option-card",i.dataset.optionKey=e;const s=t.modifier!==1?` (+${Math.round((t.modifier-1)*100)}%)`:"",r=t.cost&&t.cost>0?` (+$${t.cost.toFixed(2)}/pc)`:"";i.innerHTML=`
      <div class="option-checkbox">
        <input type="checkbox" id="option-${e}" class="option-input">
        <label for="option-${e}" class="option-label">
          <span class="option-name">${t.name}</span>
          <span class="option-modifier">${s}${r}</span>
        </label>
      </div>
    `;const n=i.querySelector(".option-input");return n.addEventListener("change",()=>this.toggleOption(e,t,n.checked)),i}toggleOption(e,t,i){i?this.selectedOptions.find(s=>s.key===e)||this.selectedOptions.push({key:e,...t}):this.selectedOptions=this.selectedOptions.filter(s=>s.key!==e),this.triggerChange()}triggerChange(){this.onSelectionChange&&this.onSelectionChange({size:this.selectedSize,options:this.selectedOptions,paper:this.selectedPaper})}getSelectedSize(){return this.selectedSize}getSelectedOptions(){return this.selectedOptions}autoSelectRecommendedSize(){const e=this.recommendedSizes[this.currentProductKey];if(e&&this.currentProduct&&this.currentProduct.sizes){const t=this.currentProduct.sizes[e];t&&setTimeout(()=>{this.selectSize(e,t),this.autoSelectDefaultPaper(),this.autoSelectMandatoryFinishing()},100)}}autoSelectDefaultPaper(){if(this.currentProductKey){const e=b(this.currentProductKey);e&&(this.selectedPaper=e,this.selectedPaperType=e.type,this.selectedWeight=e.weight,this.selectedFinish=e.finish,this.paperSelectionStep=4,this.renderPaperSelector(),this.triggerChange())}}reset(){const e=this.sizeContainer.querySelector(".size-card.selected");e&&e.classList.remove("selected"),this.optionsContainer.querySelectorAll(".option-input").forEach(s=>{s.checked=!1});const i=this.paperContainer.querySelector(".paper-card.selected");i&&i.classList.remove("selected"),this.selectedSize=null,this.selectedOptions=[],this.selectedPaper=null,this.currentProduct=null,this.selectedPaperType=null,this.selectedWeight=null,this.selectedFinish=null,this.paperSelectionStep=1,this.sizeContainer.innerHTML="",this.optionsContainer.innerHTML="",this.paperContainer.innerHTML=""}autoSelectMandatoryFinishing(){this.currentProductKey==="table_tents"&&this.currentProduct&&this.currentProduct.finishingOptions&&(this.selectedOptions=[],this.currentProduct.finishingOptions.forEach((e,t)=>{const i=`finishing_${t}`;this.selectedOptions.push({key:i,...e}),setTimeout(()=>{const s=this.optionsContainer.querySelector(`#option-${i}`);s&&(s.checked=!0)},150)}),this.triggerChange())}}class Y{constructor(e,t,i){this.container=e,this.pricingEngine=t,this.onQuantityChange=i,this.quantity=50,this.minQuantity=50,this.maxQuantity=1e4,this.stepSize=25,this.productQuantities={table_tents:[10,25,50,75,100],default:[50,75,100,125,150,200,250,500,750,1e3]},this.currentProduct=null,this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.init()}init(){this.render()}getQuantitiesForProduct(){return this.currentProduct&&this.currentProduct.name==="Table Tent Cards"?this.productQuantities.table_tents:this.productQuantities.default}render(){let e="";this.getQuantitiesForProduct().forEach(i=>{const s=i===this.quantity,r=this.calculatePricingForQuantity(i);e+=`
        <button class="quantity-btn ${s?"selected":""}" data-quantity="${i}">
          <div class="quantity-number">${i}</div>
          <div class="quantity-pricing">
            <div class="total-cost">${this.formatPrice(r.total)}</div>
            <div class="unit-cost">${this.formatPrice(r.unitPrice)}/ea</div>
          </div>
        </button>
      `}),this.container.innerHTML=`
      <div class="quantity-selector">
        <h3>Select Quantity</h3>
        <div class="quantity-grid">
          ${e}
        </div>
      </div>
    `,this.setupEventListeners()}setupEventListeners(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler),this.clickHandler=e=>{const t=e.target.closest(".quantity-btn");if(t){const i=t.dataset.quantity;i&&this.selectQuantity(parseInt(i))}},this.container.addEventListener("click",this.clickHandler)}calculatePricingForQuantity(e){if(!this.currentProduct||!e)return{total:0,unitPrice:0};try{return this.pricingEngine.calculatePrice(this.currentProduct,this.currentSize,this.currentOptions,e,this.currentPaper)}catch{return{total:0,unitPrice:0}}}formatPrice(e){return typeof e!="number"||isNaN(e)?"$0.00":`$${e.toFixed(2)}`}selectQuantity(e){this.quantity=e,this.render(),this.triggerChange()}updatePricingContext(e,t,i,s){if(this.currentProduct=e,this.currentSize=t,this.currentOptions=i||[],this.currentPaper=s,e&&e.name==="Table Tent Cards"){this.minQuantity=10,this.quantity<10&&(this.quantity=10);const r=this.getQuantitiesForProduct();r.includes(this.quantity)||(this.quantity=r[0])}else{this.minQuantity=50,this.quantity<50&&(this.quantity=50);const r=this.getQuantitiesForProduct();r.includes(this.quantity)||(this.quantity=r[0])}this.render()}triggerChange(){this.onQuantityChange&&this.onQuantityChange(this.quantity)}setQuantity(e){const t=parseInt(e,10);isNaN(t)||(this.quantity=Math.max(this.minQuantity,Math.min(this.maxQuantity,t)),this.quantity=Math.ceil(this.quantity/this.stepSize)*this.stepSize,this.quantity<this.minQuantity&&(this.quantity=this.minQuantity),this.render(),this.triggerChange())}getQuantity(){return this.quantity}reset(){this.quantity=50,this.currentProduct=null,this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.render()}destroy(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler)}}class J{constructor(e,t,i=null){this.container=e,this.pricingEngine=t,this.cartService=i,this.unitPriceElement=e.querySelector("#unit-price"),this.totalPriceElement=e.querySelector("#total-price"),this.currentPricing=null,this.currentProduct=null,this.currentSize=null,this.currentOptions=null,this.currentQuantity=null,this.currentPaper=null,this.init()}init(){if(!this.unitPriceElement||!this.totalPriceElement){console.error("PriceDisplay: Required elements not found");return}this.reset(),this.attachEventListeners()}attachEventListeners(){this.cartService&&this.addCartButton()}addCartButton(){let e=this.container.querySelector("#add-to-cart");e||(e=document.createElement("button"),e.id="add-to-cart",e.className="btn btn-primary add-to-cart-btn",e.innerHTML=`
        ${d("plus")}
        <span>Add to Cart</span>
      `,this.container.appendChild(e),e.addEventListener("click",()=>this.addToCart()))}addToCart(){if(!this.cartService||!this.currentPricing||!this.currentProduct){console.warn("Cannot add to cart: missing cart service or product data");return}this.cartService.addItem(this.currentProduct,this.currentSize,this.currentOptions||[],this.currentQuantity,this.currentPricing,this.currentPaper);const e=this.container.querySelector("#add-to-cart"),t=e.innerHTML;e.innerHTML=`${d("checkmark")} <span>Added!</span>`,e.disabled=!0,setTimeout(()=>{e.innerHTML=t,e.disabled=!1},1500)}updatePricing(e,t,i,s,r=null){if(!e||!s||s<=0){this.reset();return}try{this.currentPricing=this.pricingEngine.calculatePrice(e,t,i,s,r),this.currentProduct=e,this.currentSize=t,this.currentOptions=i,this.currentQuantity=s,this.currentPaper=r,this.render(),this.animateUpdate()}catch(n){console.error("Error calculating pricing:",n),this.reset()}}render(){if(!this.currentPricing){this.reset();return}this.unitPriceElement.textContent=this.pricingEngine.formatPrice(this.currentPricing.unitPrice),this.totalPriceElement.textContent=this.pricingEngine.formatPrice(this.currentPricing.total),this.updateSetupFeeDisplay(),this.updateBreakdown(),this.cartService&&this.currentProduct&&this.addCartButton()}updateSetupFeeDisplay(){if(!this.currentPricing||!this.currentPricing.setupFee)return;let e=this.container.querySelector(".setup-fee");if(!e){e=document.createElement("div"),e.className="setup-fee";const t=this.container.querySelector(".price-container"),i=t.querySelector(".total-price");t.insertBefore(e,i)}e.innerHTML=`
      <span class="label">Setup:</span>
      <span class="value">${this.pricingEngine.formatPrice(this.currentPricing.setupFee)}</span>
    `}updateBreakdown(){if(!this.currentPricing||!this.currentPricing.breakdown)return;let e=this.container.querySelector(".price-breakdown");e||(e=document.createElement("div"),e.className="price-breakdown",this.container.appendChild(e));const t=this.currentPricing.breakdown,i=this.currentQuantity,s=this.currentPaper?this.currentPaper.costPerSheet:0,r=.1,n=this.currentSize&&this.currentSize.imposition?this.currentSize.imposition:1;e.innerHTML=`
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
            <span class="var-value">$1.50</span>
          </div>
          <div class="variable-row">
            <span class="var-name">e (Exponent):</span>
            <span class="var-value">${this.currentProduct&&this.currentProduct.pricing&&this.currentProduct.pricing.overhead?this.currentProduct.pricing.overhead.e:"0.75"}</span>
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
            v = ($${s.toFixed(3)} + $${r}) × 1.5 / ${n} = $${t.variableCostPerPiece}
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
            Production: ${i}<sup>0.75</sup> × $1.50 = $${t.productionCost}
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
    `}animateUpdate(){this.container.classList.add("price-updated"),setTimeout(()=>{this.container.classList.remove("price-updated")},300)}getCurrentPricing(){return this.currentPricing}reset(){this.currentPricing=null,this.unitPriceElement.textContent="$0.00",this.totalPriceElement.textContent="$0.00";const e=this.container.querySelector(".setup-fee");e&&e.remove();const t=this.container.querySelector(".price-breakdown");t&&t.remove()}showRushOrderPricing(e=!1){if(this.currentPricing)if(e){const t=this.pricingEngine.calculateRushOrder(this.currentPricing);this.unitPriceElement.textContent=this.pricingEngine.formatPrice(t.unitPrice),this.totalPriceElement.textContent=this.pricingEngine.formatPrice(t.total),this.container.classList.add("rush-order-pricing"),this.currentPricing=t,this.updateBreakdown()}else this.container.classList.remove("rush-order-pricing")}formatQuantityBreaks(e,t,i){if(!e||!e.formula)return"";const s=[25,50,100,250,500,1e3,2500,5e3];let r='<div class="quantity-breaks"><h4>Quantity Pricing</h4><table>';return s.forEach(n=>{const a=this.pricingEngine.calculatePrice(e,t,i,n);r+=`
        <tr>
          <td>${n}</td>
          <td>${this.pricingEngine.formatPrice(a.unitPrice)}</td>
          <td>${this.pricingEngine.formatPrice(a.total)}</td>
        </tr>
      `}),r+="</table></div>",r}}class K{constructor(e,t,i){this.container=e,this.cartService=t,this.pricingEngine=i,this.isVisible=!1,this.init()}init(){this.render(),this.attachEventListeners(),this.cartService.addListener(e=>{this.updateDisplay(e)})}render(){this.container.innerHTML=`
      <div class="cart-wrapper">
        <button class="cart-toggle" id="cart-toggle">
          <span class="cart-icon">${d("cart")}</span>
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
              ${d("minus")}
            </button>
            <span class="quantity">${i.quantity}</span>
            <button class="qty-btn" data-action="increase" data-item-id="${i.id}">
              ${d("plus")}
            </button>
          </div>
          <div class="item-total">${this.pricingEngine.formatPrice(i.pricing.total)}</div>
          <button class="remove-btn" data-item-id="${i.id}">
            ${d("trash")}
          </button>
        </div>
      </div>
    `).join(""),this.attachItemEventListeners()}attachItemEventListeners(){this.container.querySelector("#cart-items").addEventListener("click",t=>{const i=t.target.closest("button");if(!i)return;const s=i.dataset.itemId,r=i.dataset.action;if(r==="increase"){const n=this.cartService.getItems().find(a=>a.id===s);n&&this.cartService.updateQuantity(s,n.quantity+25)}else if(r==="decrease"){const n=this.cartService.getItems().find(a=>a.id===s);if(n){const a=Math.max(25,n.quantity-25);this.cartService.updateQuantity(s,a)}}else i.classList.contains("remove-btn")&&this.cartService.removeItem(s)})}updateSummary(e){this.container.querySelector("#cart-total").textContent=this.pricingEngine.formatPrice(e.total)}clearCart(){confirm("Are you sure you want to clear your cart?")&&this.cartService.clearCart()}generateQuote(){const e=this.cartService.generateQuoteData();console.log("Quote Data:",e);const t=`
Quote Summary:
Items: ${e.itemCount}
Total: ${this.pricingEngine.formatPrice(e.total)}
    `.trim();alert(t),confirm("Quote generated! Clear cart?")&&(this.cartService.clearCart(),this.hideCart())}}class Z{constructor(e,t){this.container=e,this.onToggle=t,this.isOpen=!1,this.init()}init(){this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
      <button class="hamburger-menu" id="hamburger-menu" aria-label="Open Settings Menu">
        <div class="hamburger-icon">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </div>
      </button>
    `}setupEventListeners(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler),this.clickHandler=e=>{e.target.closest(".hamburger-menu")&&this.toggle()},this.container.addEventListener("click",this.clickHandler)}toggle(){this.isOpen=!this.isOpen,this.updateIcon(),this.onToggle&&this.onToggle(this.isOpen)}updateIcon(){const e=this.container.querySelector(".hamburger-menu"),t=this.container.querySelector(".hamburger-icon");this.isOpen?(e.classList.add("open"),t.classList.add("open"),e.setAttribute("aria-label","Close Settings Menu")):(e.classList.remove("open"),t.classList.remove("open"),e.setAttribute("aria-label","Open Settings Menu"))}setOpen(e){this.isOpen=e,this.updateIcon()}destroy(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler)}}class G{constructor(e,t){this.container=e,this.settingsService=t,this.isVisible=!1,this.activeTab="overview",this.init()}init(){this.render(),this.setupEventListeners()}render(){this.container.innerHTML=`
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
      </div>`).join("")}setupEventListeners(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler),this.clickHandler=e=>{if(e.target.id==="settings-close")this.hide();else if(e.target.classList.contains("tab-btn"))this.switchTab(e.target.dataset.tab);else if(e.target.id==="reset-settings")this.resetSettings();else if(e.target.id==="export-settings")this.exportSettings();else if(e.target.id==="import-settings")this.importSettings();else if(e.target.id==="load-settings-file")this.loadSettingsFile();else if(e.target.id==="save-minimum-order")this.saveMinimumOrder();else if(e.target.id.startsWith("save-setup-fee-")){const t=e.target.id.replace("save-setup-fee-","");this.saveSetupFee(t)}else if(e.target.id.startsWith("save-production-rate-")){const t=e.target.id.replace("save-production-rate-","");this.saveProductionRate(t)}else if(e.target.id.startsWith("save-volume-exponent-")){const t=e.target.id.replace("save-volume-exponent-","");this.saveVolumeExponent(t)}else if(e.target.id.startsWith("save-finishing-cost-")){const t=e.target.id.replace("save-finishing-cost-","");this.saveFinishingCost(t)}else if(e.target.id.startsWith("save-paper-cost-")){const t=e.target.id.replace("save-paper-cost-","");this.savePaperCost(t)}else e.target.id==="save-click-cost"&&this.saveClickCost()},this.container.addEventListener("click",this.clickHandler),this.backdropHandler=e=>{e.target.classList.contains("settings-panel")&&this.hide()},this.container.addEventListener("click",this.backdropHandler)}show(){this.isVisible=!0,this.render(),this.setupEventListeners()}hide(){this.isVisible=!1,this.render(),this.setupEventListeners()}toggle(){this.isVisible?this.hide():this.show()}resetSettings(){confirm("Are you sure you want to reset all settings to default values? This action cannot be undone.")&&(this.settingsService.resetToDefaults(),this.refreshDisplay())}exportSettings(){const e=this.settingsService.exportSettings(),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=`pricing-settings-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}saveMinimumOrder(){const e=this.container.querySelector("#minimum-order-input");if(e){const t=parseFloat(e.value),i=this.validateInput(t,"minimumOrder");i.isValid?(this.settingsService.updateSetting("minimumOrder",t),this.refreshDisplay(),this.showSuccessFeedback("#save-minimum-order"),this.clearErrorMessage("#minimum-order-input")):(this.showErrorMessage("#minimum-order-input",i.message),this.showErrorFeedback("#save-minimum-order"))}}saveSetupFee(e){const t=this.container.querySelector(`#setup-fee-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"setupFee");s.isValid?(this.settingsService.updateSetting("setupFees",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-setup-fee-${e}`),this.clearErrorMessage(`#setup-fee-${e}`)):(this.showErrorMessage(`#setup-fee-${e}`,s.message),this.showErrorFeedback(`#save-setup-fee-${e}`))}}saveProductionRate(e){const t=this.container.querySelector(`#production-rate-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"productionRate");s.isValid?(this.settingsService.updateSetting("productionRates",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-production-rate-${e}`),this.clearErrorMessage(`#production-rate-${e}`)):(this.showErrorMessage(`#production-rate-${e}`,s.message),this.showErrorFeedback(`#save-production-rate-${e}`))}}saveVolumeExponent(e){const t=this.container.querySelector(`#volume-exponent-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"volumeExponent");s.isValid?(this.settingsService.updateSetting("volumeExponents",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-volume-exponent-${e}`),this.clearErrorMessage(`#volume-exponent-${e}`)):(this.showErrorMessage(`#volume-exponent-${e}`,s.message),this.showErrorFeedback(`#save-volume-exponent-${e}`))}}saveFinishingCost(e){const t=this.container.querySelector(`#finishing-cost-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"finishingCost");s.isValid?(this.settingsService.updateSetting("finishingCosts",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-finishing-cost-${e}`),this.clearErrorMessage(`#finishing-cost-${e}`)):(this.showErrorMessage(`#finishing-cost-${e}`,s.message),this.showErrorFeedback(`#save-finishing-cost-${e}`))}}savePaperCost(e){const t=this.container.querySelector(`#paper-cost-${e}`);if(t){const i=parseFloat(t.value),s=this.validateInput(i,"paperCost");s.isValid?(this.settingsService.updateSetting("paperCosts",i,e),this.refreshDisplay(),this.showSuccessFeedback(`#save-paper-cost-${e}`),this.clearErrorMessage(`#paper-cost-${e}`)):(this.showErrorMessage(`#paper-cost-${e}`,s.message),this.showErrorFeedback(`#save-paper-cost-${e}`))}}saveClickCost(){const e=this.container.querySelector("#click-cost-input");if(e){const t=parseFloat(e.value),i=this.validateInput(t,"clickCost");i.isValid?(this.settingsService.updateSetting("clickCost",t),this.refreshDisplay(),this.showSuccessFeedback("#save-click-cost"),this.clearErrorMessage("#click-cost-input")):(this.showErrorMessage("#click-cost-input",i.message),this.showErrorFeedback("#save-click-cost"))}}switchTab(e){this.activeTab=e,this.render(),this.setupEventListeners()}importSettings(){const e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=t=>{const i=t.target.files[0];if(i){const s=new FileReader;s.onload=r=>{try{this.settingsService.importSettings(r.target.result)?(this.refreshDisplay(),alert("Settings imported successfully!")):alert("Failed to import settings. Please check the file format.")}catch{alert("Failed to import settings. Invalid file format.")}},s.readAsText(i)}},e.click()}loadSettingsFile(){const e=this.container.querySelector("#settings-file-input");if(e&&e.files.length>0){const t=e.files[0],i=new FileReader;i.onload=s=>{try{this.settingsService.importSettings(s.target.result)?(this.refreshDisplay(),alert("Settings loaded successfully!"),e.value=""):alert("Failed to load settings. Please check the file format.")}catch{alert("Failed to load settings. Invalid file format.")}},i.readAsText(t)}else alert("Please select a settings file first.")}refreshDisplay(){const e=this.container.querySelector(".tab-content");e&&(e.innerHTML=this.renderTabContent())}destroy(){this.clickHandler&&this.container.removeEventListener("click",this.clickHandler),this.backdropHandler&&this.container.removeEventListener("click",this.backdropHandler)}}class X{constructor(){this.settingsService=new A,this.pricingEngine=new V(this.settingsService),this.quoteService=new R(this.pricingEngine),this.cartService=new _(this.pricingEngine),this.currentProduct=null,this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.currentQuantity=50,this.currentPricing=null,this.init()}init(){this.initializeComponents(),this.setupEventListeners(),this.updateCalculation()}initializeComponents(){const e=document.getElementById("product-grid");this.productSelector=new W(e,h,c=>this.handleProductSelection(c));const t=document.getElementById("size-grid"),i=document.getElementById("options-list");this.sizeSelector=new U(t,i,c=>this.handleSizeOptionSelection(c)),this.quantitySelector=null;const s=document.getElementById("price-display");this.priceDisplay=new J(s,this.pricingEngine,this.cartService);const r=document.getElementById("cart-container");r&&(this.cartDisplay=new K(r,this.cartService,this.pricingEngine));const n=document.getElementById("hamburger-menu-container");n&&(this.hamburgerMenu=new Z(n,c=>this.handleMenuToggle(c)));const a=document.getElementById("settings-panel-container");a&&(this.settingsPanel=new G(a,this.settingsService))}setupEventListeners(){const e=document.getElementById("back-to-products");e&&e.addEventListener("click",()=>this.goBackToProducts());const t=document.getElementById("print-quote"),i=document.getElementById("close-modal"),s=document.getElementById("quote-modal");t.addEventListener("click",()=>this.printQuote()),i.addEventListener("click",()=>this.closeModal()),s.addEventListener("click",r=>{r.target===s&&this.closeModal()}),document.addEventListener("keydown",r=>this.handleKeyboard(r)),this.settingsService.addEventListener("settingsChanged",()=>this.updateCalculation()),this.settingsPanel&&this.settingsPanel.container.addEventListener("click",r=>{(r.target.id==="settings-close"||r.target.classList.contains("settings-panel"))&&this.hamburgerMenu&&this.hamburgerMenu.setOpen(!1)}),this.setupStepNavigation()}setupStepNavigation(){}handleProductSelection(e){this.currentProduct=e,this.sizeSelector.updateProduct(e,e.key);const t=document.getElementById("product-name"),i=document.getElementById("product-description");t&&i&&(t.textContent=`${e.name} - Select a Size`,i.textContent=e.description),this.showStep("size-selector"),this.initializeQuantitySelector(),this.updateCalculation()}initializeQuantitySelector(){if(!this.quantitySelector){const e=document.querySelector("#quantity-selector");e&&(this.quantitySelector=new Y(e,this.pricingEngine,t=>this.handleQuantityChange(t)))}}handleSizeOptionSelection(e){this.currentSize=e.size,this.currentOptions=e.options,this.currentPaper=e.paper,this.updateCalculation()}handleQuantityChange(e){this.currentQuantity=e,this.updateCalculation()}updateCalculation(){this.priceDisplay.updatePricing(this.currentProduct,this.currentSize,this.currentOptions,this.currentQuantity,this.currentPaper),this.quantitySelector&&this.quantitySelector.updatePricingContext(this.currentProduct,this.currentSize,this.currentOptions,this.currentPaper),this.currentPricing=this.priceDisplay.getCurrentPricing()}showStep(e){document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));const i=document.getElementById(e);i&&i.classList.add("active")}goBackToProducts(){this.currentSize=null,this.currentOptions=[],this.currentPaper=null,this.sizeSelector.reset();const e=document.getElementById("product-name"),t=document.getElementById("product-description");e&&t&&(e.textContent="Choose Size & Options",t.textContent=""),this.showStep("product-selector"),this.updateCalculation()}handleMenuToggle(e){this.settingsPanel&&(e?this.settingsPanel.show():this.settingsPanel.hide())}displayQuote(e){const t=document.getElementById("quote-content"),i=this.quoteService.formatQuoteHTML(e);t.innerHTML=i,document.getElementById("quote-modal").classList.add("active"),this.currentQuote=e}printQuote(){if(this.currentQuote){const e=this.quoteService.formatQuoteHTML(this.currentQuote);this.quoteService.printQuote(e)}}closeModal(){document.getElementById("quote-modal").classList.remove("active"),this.currentQuote=null}handleKeyboard(e){if(e.ctrlKey||e.metaKey)switch(e.key){case"p":e.preventDefault(),this.currentQuote&&this.printQuote();break}e.key==="Escape"&&this.closeModal()}loadQuoteHistory(){return this.quoteService.getSavedQuotes()}toggleRushOrder(e){this.priceDisplay.showRushOrderPricing(e),this.updateCalculation()}}document.addEventListener("DOMContentLoaded",()=>{window.instantQuoteApp=new X});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(o=>{console.log("SW registered: ",o)}).catch(o=>{console.log("SW registration failed: ",o)})});
