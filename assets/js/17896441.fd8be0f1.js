(self.webpackChunk=self.webpackChunk||[]).push([[918],{5166:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Xt});var s=n(2735),o=n(5956),a=n(9224),i=n(4512);const l=s.createContext(null);function r(e){let{children:t,content:n}=e;const o=function(e){return(0,s.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,i.jsx)(l.Provider,{value:o,children:t})}function c(){const e=(0,s.useContext)(l);if(null===e)throw new a.i6("DocProvider");return e}function d(){const{metadata:e,frontMatter:t,assets:n}=c();return(0,i.jsx)(o.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var u=n(45),m=n(6485),h=n(550),p=n(8792);function f(e){const{permalink:t,title:n,subLabel:s,isNext:o}=e;return(0,i.jsxs)(p.Z,{className:(0,u.Z)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[s&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:s}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}function g(e){const{previous:t,next:n}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(f,{...t,subLabel:(0,i.jsx)(h.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,i.jsx)(f,{...n,subLabel:(0,i.jsx)(h.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function x(){const{metadata:e}=c();return(0,i.jsx)(g,{previous:e.previous,next:e.next})}var b=n(7259),v=n(6621),j=n(8846),y=n(9805),k=n(6698);const N={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,i.jsx)(h.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,i.jsx)(h.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function C(e){const t=N[e.versionMetadata.banner];return(0,i.jsx)(t,{...e})}function L(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,i.jsx)(h.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,i.jsx)("b",{children:(0,i.jsx)(p.Z,{to:n,onClick:s,children:(0,i.jsx)(h.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function w(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:s}}=(0,b.Z)(),{pluginId:o}=(0,v.gA)({failfast:!0}),{savePreferredVersionName:a}=(0,y.J)(o),{latestDocSuggestion:l,latestVersionSuggestion:r}=(0,v.Jo)(o),c=l??(d=r).docs.find((e=>e.id===d.mainDocId));var d;return(0,i.jsxs)("div",{className:(0,u.Z)(t,j.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,i.jsx)("div",{children:(0,i.jsx)(C,{siteTitle:s,versionMetadata:n})}),(0,i.jsx)("div",{className:"margin-top--md",children:(0,i.jsx)(L,{versionLabel:r.label,to:c.path,onClick:()=>a(r.name)})})]})}function _(e){let{className:t}=e;const n=(0,k.E)();return n.banner?(0,i.jsx)(w,{className:t,versionMetadata:n}):null}function B(e){let{className:t}=e;const n=(0,k.E)();return n.badge?(0,i.jsx)("span",{className:(0,u.Z)(t,j.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,i.jsx)(h.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}function T(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return(0,i.jsx)(h.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,i.jsx)("b",{children:(0,i.jsx)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function Z(e){let{lastUpdatedBy:t}=e;return(0,i.jsx)(h.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,i.jsx)("b",{children:t})},children:" by {user}"})}function E(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:s}=e;return(0,i.jsxs)("span",{className:j.k.common.lastUpdated,children:[(0,i.jsx)(h.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,i.jsx)(T,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:s?(0,i.jsx)(Z,{lastUpdatedBy:s}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const H={iconEdit:"iconEdit_ayDX"};function A(e){let{className:t,...n}=e;return(0,i.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,u.Z)(H.iconEdit,t),"aria-hidden":"true",...n,children:(0,i.jsx)("g",{children:(0,i.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function I(e){let{editUrl:t}=e;return(0,i.jsxs)(p.Z,{to:t,className:j.k.common.editThisPage,children:[(0,i.jsx)(A,{}),(0,i.jsx)(h.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}const M={tag:"tag_vGdz",tagRegular:"tagRegular_nwg7",tagWithCount:"tagWithCount_k49s"};function S(e){let{permalink:t,label:n,count:s}=e;return(0,i.jsxs)(p.Z,{href:t,className:(0,u.Z)(M.tag,s?M.tagWithCount:M.tagRegular),children:[n,s&&(0,i.jsx)("span",{children:s})]})}const U={tags:"tags_pnIT",tag:"tag_qqdV"};function z(e){let{tags:t}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:(0,i.jsx)(h.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,i.jsx)("ul",{className:(0,u.Z)(U.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:n}=e;return(0,i.jsx)("li",{className:U.tag,children:(0,i.jsx)(S,{label:t,permalink:n})},n)}))})]})}const O={lastUpdated:"lastUpdated_qB_V"};function P(e){return(0,i.jsx)("div",{className:(0,u.Z)(j.k.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(z,{...e})})})}function D(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,formattedLastUpdatedAt:o}=e;return(0,i.jsxs)("div",{className:(0,u.Z)(j.k.docs.docFooterEditMetaRow,"row"),children:[(0,i.jsx)("div",{className:"col",children:t&&(0,i.jsx)(I,{editUrl:t})}),(0,i.jsx)("div",{className:(0,u.Z)("col",O.lastUpdated),children:(n||s)&&(0,i.jsx)(E,{lastUpdatedAt:n,formattedLastUpdatedAt:o,lastUpdatedBy:s})})]})}function V(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:s,lastUpdatedBy:o,tags:a}=e,l=a.length>0,r=!!(t||n||o);return l||r?(0,i.jsxs)("footer",{className:(0,u.Z)(j.k.docs.docFooter,"docusaurus-mt-lg"),children:[l&&(0,i.jsx)(P,{tags:a}),r&&(0,i.jsx)(D,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:o,formattedLastUpdatedAt:s})]}):null}var R=n(9831),W=n(8669);function F(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t}));const s=[];return t.forEach((e=>{const{parentIndex:n,...o}=e;n>=0?t[n].children.push(o):s.push(o)})),s}function $(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return t.flatMap((e=>{const t=$({toc:e.children,minHeadingLevel:n,maxHeadingLevel:s});return function(e){return e.level>=n&&e.level<=s}(e)?[{...e,children:t}]:t}))}function q(e){const t=e.getBoundingClientRect();return t.top===t.bottom?q(e.parentNode):t}function J(e,t){let{anchorTopOffset:n}=t;const s=e.find((e=>q(e).top>=n));if(s){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(q(s))?s:e[e.indexOf(s)-1]??null}return e[e.length-1]??null}function K(){const e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,W.L)();return(0,s.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function X(e){const t=(0,s.useRef)(void 0),n=K();(0,s.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:s,linkActiveClassName:o,minHeadingLevel:a,maxHeadingLevel:i}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(s),l=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const s=[];for(let o=t;o<=n;o+=1)s.push(`h${o}.anchor`);return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:a,maxHeadingLevel:i}),r=J(l,{anchorTopOffset:n.current}),c=e.find((e=>r&&r.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(o),e.classList.add(o),t.current=e):e.classList.remove(o)}(e,e===c)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,n])}function G(e){let{toc:t,className:n,linkClassName:s,isChild:o}=e;return t.length?(0,i.jsx)("ul",{className:o?void 0:n,children:t.map((e=>(0,i.jsxs)("li",{children:[(0,i.jsx)(p.Z,{to:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,i.jsx)(G,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id)))}):null}const Q=s.memo(G);function Y(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:a,minHeadingLevel:l,maxHeadingLevel:r,...c}=e;const d=(0,W.L)(),u=l??d.tableOfContents.minHeadingLevel,m=r??d.tableOfContents.maxHeadingLevel,h=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:o}=e;return(0,s.useMemo)((()=>$({toc:F(t),minHeadingLevel:n,maxHeadingLevel:o})),[t,n,o])}({toc:t,minHeadingLevel:u,maxHeadingLevel:m});return X((0,s.useMemo)((()=>{if(o&&a)return{linkClassName:o,linkActiveClassName:a,minHeadingLevel:u,maxHeadingLevel:m}}),[o,a,u,m])),(0,i.jsx)(Q,{toc:h,className:n,linkClassName:o,...c})}const ee={tocCollapsibleButton:"tocCollapsibleButton_niV5",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_wiK7"};function te(e){let{collapsed:t,...n}=e;return(0,i.jsx)("button",{type:"button",...n,className:(0,u.Z)("clean-btn",ee.tocCollapsibleButton,!t&&ee.tocCollapsibleButtonExpanded,n.className),children:(0,i.jsx)(h.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const ne={tocCollapsible:"tocCollapsible_Wlpy",tocCollapsibleContent:"tocCollapsibleContent_WS9w",tocCollapsibleExpanded:"tocCollapsibleExpanded_Tetm"};function se(e){let{toc:t,className:n,minHeadingLevel:s,maxHeadingLevel:o}=e;const{collapsed:a,toggleCollapsed:l}=(0,R.u)({initialState:!0});return(0,i.jsxs)("div",{className:(0,u.Z)(ne.tocCollapsible,!a&&ne.tocCollapsibleExpanded,n),children:[(0,i.jsx)(te,{collapsed:a,onClick:l}),(0,i.jsx)(R.z,{lazy:!0,className:ne.tocCollapsibleContent,collapsed:a,children:(0,i.jsx)(Y,{toc:t,minHeadingLevel:s,maxHeadingLevel:o})})]})}const oe={tocMobile:"tocMobile_qs2S"};function ae(){const{toc:e,frontMatter:t}=c();return(0,i.jsx)(se,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,u.Z)(j.k.docs.docTocMobile,oe.tocMobile)})}const ie={tableOfContents:"tableOfContents_zXaw",docItemContainer:"docItemContainer_p3xW"},le="table-of-contents__link toc-highlight",re="table-of-contents__link--active";function ce(e){let{className:t,...n}=e;return(0,i.jsx)("div",{className:(0,u.Z)(ie.tableOfContents,"thin-scrollbar",t),children:(0,i.jsx)(Y,{...n,linkClassName:le,linkActiveClassName:re})})}function de(){const{toc:e,frontMatter:t}=c();return(0,i.jsx)(ce,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:j.k.docs.docTocDesktop})}var ue=n(5647),me=n(3250),he=n(4885),pe=n(8677),fe=n(8379);function ge(){const{prism:e}=(0,W.L)(),{colorMode:t}=(0,fe.I)(),n=e.theme,s=e.darkTheme||n;return"dark"===t?s:n}var xe=n(5625),be=n.n(xe);const ve=/title=(?<quote>["'])(?<title>.*?)\1/,je=/\{(?<range>[\d,-]+)\}/,ye={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"},lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""}};function ke(e,t){const n=e.map((e=>{const{start:n,end:s}=ye[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${s})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function Ne(e,t){let n=e.replace(/\n$/,"");const{language:s,magicComments:o,metastring:a}=t;if(a&&je.test(a)){const e=a.match(je).groups.range;if(0===o.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${a}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=o[0].className,s=be()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(s),code:n}}if(void 0===s)return{lineClassNames:{},code:n};const i=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return ke(["js","jsBlock"],t);case"jsx":case"tsx":return ke(["js","jsBlock","jsx"],t);case"html":return ke(["js","jsBlock","html"],t);case"python":case"py":case"bash":return ke(["bash"],t);case"markdown":case"md":return ke(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return ke(["tex"],t);case"lua":case"haskell":case"sql":return ke(["lua"],t);case"wasm":return ke(["wasm"],t);default:return ke(Object.keys(ye).filter((e=>!["lua","wasm","tex","latex","matlab"].includes(e))),t)}}(s,o),l=n.split("\n"),r=Object.fromEntries(o.map((e=>[e.className,{start:0,range:""}]))),c=Object.fromEntries(o.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),d=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),u=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let h=0;h<l.length;){const e=l[h].match(i);if(!e){h+=1;continue}const t=e.slice(1).find((e=>void 0!==e));c[t]?r[c[t]].range+=`${h},`:d[t]?r[d[t]].start=h:u[t]&&(r[u[t]].range+=`${r[u[t]].start}-${h-1},`),l.splice(h,1)}n=l.join("\n");const m={};return Object.entries(r).forEach((e=>{let[t,{range:n}]=e;be()(n).forEach((e=>{m[e]??=[],m[e].push(t)}))})),{lineClassNames:m,code:n}}const Ce={codeBlockContainer:"codeBlockContainer_zbXh"};function Le(e){let{as:t,...n}=e;const s=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[s,o]=e;const a=t[s];a&&"string"==typeof o&&(n[a]=o)})),n}(ge());return(0,i.jsx)(t,{...n,style:s,className:(0,u.Z)(n.className,Ce.codeBlockContainer,j.k.common.codeBlock)})}const we={codeBlockContent:"codeBlockContent_RFcP",codeBlockTitle:"codeBlockTitle_LVEf",codeBlock:"codeBlock_hldk",codeBlockStandalone:"codeBlockStandalone_mOQe",codeBlockLines:"codeBlockLines_aHhF",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_wXty",buttonGroup:"buttonGroup_oDVH"};function _e(e){let{children:t,className:n}=e;return(0,i.jsx)(Le,{as:"pre",tabIndex:0,className:(0,u.Z)(we.codeBlockStandalone,"thin-scrollbar",n),children:(0,i.jsx)("code",{className:we.codeBlockLines,children:t})})}const Be={attributes:!0,characterData:!0,childList:!0,subtree:!0};function Te(e,t){const[n,o]=(0,s.useState)(),i=(0,s.useCallback)((()=>{o(e.current?.closest("[role=tabpanel][hidden]"))}),[e,o]);(0,s.useEffect)((()=>{i()}),[i]),function(e,t,n){void 0===n&&(n=Be);const o=(0,a.zX)(t),i=(0,a.Ql)(n);(0,s.useEffect)((()=>{const t=new MutationObserver(o);return e&&t.observe(e,i),()=>t.disconnect()}),[e,o,i])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),i())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}const Ze={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var Ee={Prism:n(9697).Z,theme:Ze};function He(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ae(){return Ae=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},Ae.apply(this,arguments)}var Ie=/\r\n|\r|\n/,Me=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},Se=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)};function Ue(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&-1===t.indexOf(s)&&(n[s]=e[s]);return n}var ze=function(e){function t(){for(var t=this,n=[],s=arguments.length;s--;)n[s]=arguments[s];e.apply(this,n),He(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?function(e,t){var n=e.plain,s=Object.create(null),o=e.styles.reduce((function(e,n){var s=n.languages,o=n.style;return s&&!s.includes(t)||n.types.forEach((function(t){var n=Ae({},e[t],o);e[t]=n})),e}),s);return o.root=n,o.plain=Ae({},n,{backgroundColor:null}),o}(e.theme,e.language):void 0;return t.themeDict=n})),He(this,"getLineProps",(function(e){var n=e.key,s=e.className,o=e.style,a=Ae({},Ue(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),i=t.getThemeDict(t.props);return void 0!==i&&(a.style=i.plain),void 0!==o&&(a.style=void 0!==a.style?Ae({},a.style,o):o),void 0!==n&&(a.key=n),s&&(a.className+=" "+s),a})),He(this,"getStyleForToken",(function(e){var n=e.types,s=e.empty,o=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===o&&"plain"===n[0])return s?{display:"inline-block"}:void 0;if(1===o&&!s)return a[n[0]];var i=s?{display:"inline-block"}:{},l=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[i].concat(l))}})),He(this,"getTokenProps",(function(e){var n=e.key,s=e.className,o=e.style,a=e.token,i=Ae({},Ue(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==o&&(i.style=void 0!==i.style?Ae({},i.style,o):o),void 0!==n&&(i.key=n),s&&(i.className+=" "+s),i})),He(this,"tokenize",(function(e,t,n,s){var o={code:t,grammar:n,language:s,tokens:[]};e.hooks.run("before-tokenize",o);var a=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,s=e.code,o=e.children,a=this.getThemeDict(this.props),i=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],s=[0],o=[e.length],a=0,i=0,l=[],r=[l];i>-1;){for(;(a=s[i]++)<o[i];){var c=void 0,d=t[i],u=n[i][a];if("string"==typeof u?(d=i>0?d:["plain"],c=u):(d=Se(d,u.type),u.alias&&(d=Se(d,u.alias)),c=u.content),"string"==typeof c){var m=c.split(Ie),h=m.length;l.push({types:d,content:m[0]});for(var p=1;p<h;p++)Me(l),r.push(l=[]),l.push({types:d,content:m[p]})}else i++,t.push(d),n.push(c),s.push(0),o.push(c.length)}i--,t.pop(),n.pop(),s.pop(),o.pop()}return Me(l),r}(void 0!==i?this.tokenize(t,s,i,n):[s]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(s.Component);const Oe=ze,Pe={codeLine:"codeLine_ofYK",codeLineNumber:"codeLineNumber_jCWb",codeLineContent:"codeLineContent_SN3N"};function De(e){let{line:t,classNames:n,showLineNumbers:s,getLineProps:o,getTokenProps:a}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const l=o({line:t,className:(0,u.Z)(n,s&&Pe.codeLine)}),r=t.map(((e,t)=>(0,i.jsx)("span",{...a({token:e,key:t})},t)));return(0,i.jsxs)("span",{...l,children:[s?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:Pe.codeLineNumber}),(0,i.jsx)("span",{className:Pe.codeLineContent,children:r})]}):r,(0,i.jsx)("br",{})]})}function Ve(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function Re(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const We={copyButtonCopied:"copyButtonCopied_MdZJ",copyButtonIcons:"copyButtonIcons_hTZm",copyButtonIcon:"copyButtonIcon_xA0c",copyButtonSuccessIcon:"copyButtonSuccessIcon_ZIiU"};function Fe(e){let{code:t,className:n}=e;const[o,a]=(0,s.useState)(!1),l=(0,s.useRef)(void 0),r=(0,s.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const s=document.createElement("textarea"),o=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";const a=document.getSelection(),i=a.rangeCount>0&&a.getRangeAt(0);n.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;let l=!1;try{l=document.execCommand("copy")}catch{}s.remove(),i&&(a.removeAllRanges(),a.addRange(i)),o&&o.focus()}(t),a(!0),l.current=window.setTimeout((()=>{a(!1)}),1e3)}),[t]);return(0,s.useEffect)((()=>()=>window.clearTimeout(l.current)),[]),(0,i.jsx)("button",{type:"button","aria-label":o?(0,h.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,h.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,h.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,u.Z)("clean-btn",n,We.copyButton,o&&We.copyButtonCopied),onClick:r,children:(0,i.jsxs)("span",{className:We.copyButtonIcons,"aria-hidden":"true",children:[(0,i.jsx)(Ve,{className:We.copyButtonIcon}),(0,i.jsx)(Re,{className:We.copyButtonSuccessIcon})]})})}function $e(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const qe={wordWrapButtonIcon:"wordWrapButtonIcon_gN8n",wordWrapButtonEnabled:"wordWrapButtonEnabled_KFgx"};function Je(e){let{className:t,onClick:n,isEnabled:s}=e;const o=(0,h.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,i.jsx)("button",{type:"button",onClick:n,className:(0,u.Z)("clean-btn",t,s&&qe.wordWrapButtonEnabled),"aria-label":o,title:o,children:(0,i.jsx)($e,{className:qe.wordWrapButtonIcon,"aria-hidden":"true"})})}function Ke(e){let{children:t,className:n="",metastring:o,title:a,showLineNumbers:l,language:r}=e;const{prism:{defaultLanguage:c,magicComments:d}}=(0,W.L)(),m=r??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}(n)??c,h=ge(),p=function(){const[e,t]=(0,s.useState)(!1),[n,o]=(0,s.useState)(!1),a=(0,s.useRef)(null),i=(0,s.useCallback)((()=>{const n=a.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[a,e]),l=(0,s.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=a.current,n=e>t||a.current.querySelector("code").hasAttribute("style");o(n)}),[a]);return Te(a,l),(0,s.useEffect)((()=>{l()}),[e,l]),(0,s.useEffect)((()=>(window.addEventListener("resize",l,{passive:!0}),()=>{window.removeEventListener("resize",l)})),[l]),{codeBlockRef:a,isEnabled:e,isCodeScrollable:n,toggle:i}}(),f=function(e){return e?.match(ve)?.groups.title??""}(o)||a,{lineClassNames:g,code:x}=Ne(t,{metastring:o,language:m,magicComments:d}),b=l??function(e){return Boolean(e?.includes("showLineNumbers"))}(o);return(0,i.jsxs)(Le,{as:"div",className:(0,u.Z)(n,m&&!n.includes(`language-${m}`)&&`language-${m}`),children:[f&&(0,i.jsx)("div",{className:we.codeBlockTitle,children:f}),(0,i.jsxs)("div",{className:we.codeBlockContent,children:[(0,i.jsx)(Oe,{...Ee,theme:h,code:x,language:m??"text",children:e=>{let{className:t,tokens:n,getLineProps:s,getTokenProps:o}=e;return(0,i.jsx)("pre",{tabIndex:0,ref:p.codeBlockRef,className:(0,u.Z)(t,we.codeBlock,"thin-scrollbar"),children:(0,i.jsx)("code",{className:(0,u.Z)(we.codeBlockLines,b&&we.codeBlockLinesWithNumbering),children:n.map(((e,t)=>(0,i.jsx)(De,{line:e,getLineProps:s,getTokenProps:o,classNames:g[t],showLineNumbers:b},t)))})})}}),(0,i.jsxs)("div",{className:we.buttonGroup,children:[(p.isEnabled||p.isCodeScrollable)&&(0,i.jsx)(Je,{className:we.codeButton,onClick:()=>p.toggle(),isEnabled:p.isEnabled}),(0,i.jsx)(Fe,{className:we.codeButton,code:x})]})]})]})}function Xe(e){let{children:t,...n}=e;const o=(0,pe.Z)(),a=function(e){return s.Children.toArray(e).some((e=>(0,s.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),l="string"==typeof a?Ke:_e;return(0,i.jsx)(l,{...n,children:a},String(o))}const Ge={details:"details_CLKC",isBrowser:"isBrowser_ZW3Y",collapsibleContent:"collapsibleContent_DD2J"};function Qe(e){return!!e&&("SUMMARY"===e.tagName||Qe(e.parentElement))}function Ye(e,t){return!!e&&(e===t||Ye(e.parentElement,t))}function et(e){let{summary:t,children:n,...o}=e;const a=(0,pe.Z)(),l=(0,s.useRef)(null),{collapsed:r,setCollapsed:c}=(0,R.u)({initialState:!o.open}),[d,m]=(0,s.useState)(o.open),h=s.isValidElement(t)?t:(0,i.jsx)("summary",{children:t??"Details"});return(0,i.jsxs)("details",{...o,ref:l,open:d,"data-collapsed":r,className:(0,u.Z)(Ge.details,a&&Ge.isBrowser,o.className),onMouseDown:e=>{Qe(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;Qe(t)&&Ye(t,l.current)&&(e.preventDefault(),r?(c(!1),m(!0)):c(!0))},children:[h,(0,i.jsx)(R.z,{lazy:!1,collapsed:r,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{c(e),m(!e)},children:(0,i.jsx)("div",{className:Ge.collapsibleContent,children:n})})]})}const tt={details:"details_hTlw"},nt="alert alert--info";function st(e){let{...t}=e;return(0,i.jsx)(et,{...t,className:(0,u.Z)(nt,tt.details,t.className)})}function ot(e){return(0,i.jsx)(ue.Z,{...e})}const at={containsTaskList:"containsTaskList_NqrU"};const it={img:"img_k8mF"};function lt(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=s.Children.toArray(e),n=t.find((e=>s.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),o=t.filter((e=>e!==n)),a=n?.props.children;return{mdxAdmonitionTitle:a,rest:o.length>0?(0,i.jsx)(i.Fragment,{children:o}):null}}(e.children),o=e.title??t;return{...e,...o&&{title:o},children:n}}const rt={admonition:"admonition_zQfS",admonitionHeading:"admonitionHeading_fDJb",admonitionIcon:"admonitionIcon_zswr",admonitionContent:"admonitionContent_oqKK"};function ct(e){let{type:t,className:n,children:s}=e;return(0,i.jsx)("div",{className:(0,u.Z)(j.k.common.admonition,j.k.common.admonitionType(t),rt.admonition,n),children:s})}function dt(e){let{icon:t,title:n}=e;return(0,i.jsxs)("div",{className:rt.admonitionHeading,children:[(0,i.jsx)("span",{className:rt.admonitionIcon,children:t}),n]})}function ut(e){let{children:t}=e;return t?(0,i.jsx)("div",{className:rt.admonitionContent,children:t}):null}function mt(e){const{type:t,icon:n,title:s,children:o,className:a}=e;return(0,i.jsxs)(ct,{type:t,className:a,children:[(0,i.jsx)(dt,{title:s,icon:n}),(0,i.jsx)(ut,{children:o})]})}function ht(e){return(0,i.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const pt={icon:(0,i.jsx)(ht,{}),title:(0,i.jsx)(h.Z,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function ft(e){return(0,i.jsx)(mt,{...pt,...e,className:(0,u.Z)("alert alert--secondary",e.className),children:e.children})}function gt(e){return(0,i.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const xt={icon:(0,i.jsx)(gt,{}),title:(0,i.jsx)(h.Z,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function bt(e){return(0,i.jsx)(mt,{...xt,...e,className:(0,u.Z)("alert alert--success",e.className),children:e.children})}function vt(e){return(0,i.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const jt={icon:(0,i.jsx)(vt,{}),title:(0,i.jsx)(h.Z,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function yt(e){return(0,i.jsx)(mt,{...jt,...e,className:(0,u.Z)("alert alert--info",e.className),children:e.children})}function kt(e){return(0,i.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const Nt={icon:(0,i.jsx)(kt,{}),title:(0,i.jsx)(h.Z,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};function Ct(e){return(0,i.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const Lt={icon:(0,i.jsx)(Ct,{}),title:(0,i.jsx)(h.Z,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};function wt(e){return(0,i.jsx)(mt,{...Lt,...e,className:(0,u.Z)("alert alert--danger",e.className),children:e.children})}const _t={...{note:ft,tip:bt,info:yt,caution:function(e){return(0,i.jsx)(mt,{...Nt,...e,className:(0,u.Z)("alert alert--warning",e.className),children:e.children})},danger:wt},...{secondary:e=>(0,i.jsx)(ft,{title:"secondary",...e}),important:e=>(0,i.jsx)(yt,{title:"important",...e}),success:e=>(0,i.jsx)(bt,{title:"success",...e}),warning:e=>(0,i.jsx)(wt,{title:"warning",...e})}};function Bt(e){const t=lt(e),n=(s=t.type,_t[s]||(console.warn(`No admonition component found for admonition type "${s}". Using Info as fallback.`),_t.info));var s;return(0,i.jsx)(n,{...t})}var Tt=n(2607);const Zt={Head:he.Z,Details:function(e){const t=s.Children.toArray(e.children),n=t.find((e=>s.isValidElement(e)&&"summary"===e.type)),o=(0,i.jsx)(i.Fragment,{children:t.filter((e=>e!==n))});return(0,i.jsx)(st,{...e,summary:n,children:o})},code:function(e){return s.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")))?(0,i.jsx)("code",{...e}):(0,i.jsx)(Xe,{...e})},a:function(e){return(0,i.jsx)(p.Z,{...e})},pre:function(e){return(0,i.jsx)(i.Fragment,{children:e.children})},ul:function(e){return(0,i.jsx)("ul",{...e,className:(t=e.className,(0,u.Z)(t,t?.includes("contains-task-list")&&at.containsTaskList))});var t},img:function(e){return(0,i.jsx)("img",{loading:"lazy",...e,className:(t=e.className,(0,u.Z)(t,it.img))});var t},h1:e=>(0,i.jsx)(ot,{as:"h1",...e}),h2:e=>(0,i.jsx)(ot,{as:"h2",...e}),h3:e=>(0,i.jsx)(ot,{as:"h3",...e}),h4:e=>(0,i.jsx)(ot,{as:"h4",...e}),h5:e=>(0,i.jsx)(ot,{as:"h5",...e}),h6:e=>(0,i.jsx)(ot,{as:"h6",...e}),admonition:Bt,mermaid:Tt.Z};function Et(e){let{children:t}=e;return(0,i.jsx)(me.Zo,{components:Zt,children:t})}function Ht(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=c();return t.hide_title||void 0!==n?null:e.title}();return(0,i.jsxs)("div",{className:(0,u.Z)(j.k.docs.docMarkdown,"markdown"),children:[n&&(0,i.jsx)("header",{children:(0,i.jsx)(ue.Z,{as:"h1",children:n})}),(0,i.jsx)(Et,{children:t})]})}var At=n(6031),It=n(5966),Mt=n(1010);function St(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const Ut={breadcrumbHomeIcon:"breadcrumbHomeIcon_yapy"};function zt(){const e=(0,Mt.Z)("/");return(0,i.jsx)("li",{className:"breadcrumbs__item",children:(0,i.jsx)(p.Z,{"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,i.jsx)(St,{className:Ut.breadcrumbHomeIcon})})})}const Ot={breadcrumbsContainer:"breadcrumbsContainer_tVzI"};function Pt(e){let{children:t,href:n,isLast:s}=e;const o="breadcrumbs__link";return s?(0,i.jsx)("span",{className:o,itemProp:"name",children:t}):n?(0,i.jsx)(p.Z,{className:o,href:n,itemProp:"item",children:(0,i.jsx)("span",{itemProp:"name",children:t})}):(0,i.jsx)("span",{className:o,children:t})}function Dt(e){let{children:t,active:n,index:s,addMicrodata:o}=e;return(0,i.jsxs)("li",{...o&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,u.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,i.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function Vt(){const e=(0,At.s1)(),t=(0,It.Ns)();return e?(0,i.jsx)("nav",{className:(0,u.Z)(j.k.docs.docBreadcrumbs,Ot.breadcrumbsContainer),"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,i.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,i.jsx)(zt,{}),e.map(((t,n)=>{const s=n===e.length-1,o="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,i.jsx)(Dt,{active:s,index:n,addMicrodata:!!o,children:(0,i.jsx)(Pt,{href:o,isLast:s,children:t.label})},n)}))]})}):null}function Rt(){return(0,i.jsx)(h.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function Wt(){return(0,i.jsx)(h.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function Ft(){return(0,i.jsx)(he.Z,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function $t(e){let{className:t}=e;return(0,i.jsx)(Bt,{type:"caution",title:(0,i.jsx)(Rt,{}),className:(0,u.Z)(t,j.k.common.unlistedBanner),children:(0,i.jsx)(Wt,{})})}function qt(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(Ft,{}),(0,i.jsx)($t,{...e})]})}const Jt={docItemContainer:"docItemContainer_JFP9",docItemCol:"docItemCol_Xiwq"};function Kt(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=c(),n=(0,m.i)(),s=e.hide_table_of_contents,o=!s&&t.length>0;return{hidden:s,mobile:o?(0,i.jsx)(ae,{}):void 0,desktop:!o||"desktop"!==n&&"ssr"!==n?void 0:(0,i.jsx)(de,{})}}(),{metadata:{unlisted:s}}=c();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,u.Z)("col",!n.hidden&&Jt.docItemCol),children:[s&&(0,i.jsx)(qt,{}),(0,i.jsx)(_,{}),(0,i.jsxs)("div",{className:Jt.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(Vt,{}),(0,i.jsx)(B,{}),n.mobile,(0,i.jsx)(Ht,{children:t}),(0,i.jsx)(V,{})]}),(0,i.jsx)(x,{})]})]}),n.desktop&&(0,i.jsx)("div",{className:"col col--3",children:n.desktop})]})}function Xt(e){const t=`docs-doc-id-${e.content.metadata.unversionedId}`,n=e.content;return(0,i.jsx)(r,{content:e.content,children:(0,i.jsxs)(o.FG,{className:t,children:[(0,i.jsx)(d,{}),(0,i.jsx)(Kt,{children:(0,i.jsx)(n,{})})]})})}},5625:(e,t)=>{function n(e){let t,n=[];for(let s of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(s))n.push(parseInt(s,10));else if(t=s.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,s,o,a]=t;if(s&&a){s=parseInt(s),a=parseInt(a);const e=s<a?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(a+=e);for(let t=s;t!==a;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},3250:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>l,ah:()=>a});var s=n(2735);const o=s.createContext({});function a(e){const t=s.useContext(o);return s.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const i={};function l({components:e,children:t,disableParentContext:n}){let l;return l=n?"function"==typeof e?e({}):e||i:a(e),s.createElement(o.Provider,{value:l},t)}}}]);