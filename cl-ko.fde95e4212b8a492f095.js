(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(e,t,n){"use strict";function a(e,[t,n],r,c){const o=r.findIndex(e=>1===e.length);if(!c(e,r,o))return!1;const l=[...r],s=l[o][0];l[o]=[s,e];return o+1===l.length||function([e,t],n,r){const c=n.findIndex(e=>!e.length),[o,...l]=t,s=[...n];return s[c]=[o],e.some(t=>a(t,[e,l],s,r))}([t.filter(t=>t!==e),n],l,c)}t.a=([e,t],n,r)=>e.map((e,t)=>t).filter(c=>a(e[c],[e,t],n,r))},107:function(e,t,n){"use strict";const a=n(1).d.div`
  margin-top: 10px;
  margin-bottom: 5px;
  user-select: none;
`;t.a=a},108:function(e,t,n){"use strict";var a=n(105),r=n(100);const c=[{countries:["Russia","Ukraine"],predicate:(o=2014,l=Number.MAX_SAFE_INTEGER,e=>e>=o&&e<=l)},{countries:["Azerbaijan","Armenia"]},{countries:["Serbia","Kosovo"]},{countries:["Bosnia & Herzegovina","Kosovo"]},{countries:["Spain","Gibraltar"]}];var o,l;const s={predicate:r};var u=c.map(e=>({...s,...e})),i=e=>{const t=(e=>{const t=new Map;for(const{countries:n,predicate:a}of u)a(e)&&(t.set(n[0],n[1]),t.set(n[1],n[0]));return t.get.bind(t)})(e);return e=>{const n=t(e.country);return void 0===n?a:e=>e.country===n}};t.a=e=>{const t=i(e),n=(e,n)=>{return 0===e.length||1===e.length&&(a=n,r=e[0],a.country!==r.country&&a.group!==r.group&&!t(a)(r));var a,r};return(e,t,a)=>n(t[a],e)}},109:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(1),o=n(65),l=n(63),s=n(60),u=n(91),i=n(71),m=n(66),p=n(72),d=n(80);const b=c.e`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`,f=c.c`
  animation: ${b} 5s normal forwards;
`;var E=Object(c.d)(s.a)`
  width: 150px;
  ${e=>e.hasTeam&&f};
  ${e=>e.styles};
`,g=n(62),h=e=>{var t;return null!==(t=e.country)&&void 0!==t?t:e.name in g?e.name:void 0};var j=Object(a.memo)(({team:e,containerStyles:t})=>{var n;const c=Object(i.a)(e),[o,l]=Object(a.useState)(e),s=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{l(e)},[e]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(E,{hasTeam:!!o,styles:t},o?r.a.createElement(m.a,{country:h(o)},null!==(n=o.shortName)&&void 0!==n?n:o.name):r.a.createElement(p.a,{ref:s})),e&&e!==c&&r.a.createElement(d.a,{from:`[data-cellid='${e.id}']`,to:s,duration:350,data:e,onAnimationEnd:u}))});const O=c.c`
  border-right: 1px solid rgba(0, 0, 0, 0);
`,v=c.c`
  border-left: 1px solid rgba(0, 0, 0, 0);
`,y=Object(c.d)(u.a)`
  justify-content: center;
  width: 26px;
  color: #444;

  &::before {
    content: 'v';
  }
`;var w=Object(a.memo)(({teams:e})=>{const[t,n]=null!=e?e:[];return r.a.createElement(l.a,null,r.a.createElement(j,{team:t,containerStyles:O}),r.a.createElement(s.a,null,r.a.createElement(y,null)),r.a.createElement(j,{team:n,containerStyles:v}))});const N=Object(c.d)(o.a)`
  width: auto;
  align-self: center;
  max-width: initial;
`,k=Object(a.forwardRef)(({matchups:e},t)=>r.a.createElement(N,{ref:t},r.a.createElement("tbody",null,null==e?void 0:e.map((e,t)=>r.a.createElement(w,{key:t,teams:e})))));t.a=Object(a.memo)(k)},93:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(61),o=n(70),l=n(106),s=n(108),u=n(64),i=n(68),m=n(77),p=n(109),d=n(73),b=n(74),f=n(81),E=n(107),g=n(76),h=n(75);function j(e){return{currentMatchupNum:0,currentPotNum:1,possiblePairings:null,pots:e.map(e=>o(e)),matchups:c(8).map(()=>[])}}t.default=Object(a.memo)(({season:e,pots:t})=>{const[n,c]=Object(u.a)(),o=Object(a.useMemo)(()=>Object(s.a)(e),[e]),[{currentMatchupNum:O,currentPotNum:v,possiblePairings:y,pots:w,matchups:N},k]=Object(a.useState)(()=>j(t));Object(a.useEffect)(()=>{k(j(t))},[t,n]);const[P]=Object(i.a)(),S=Object(a.useRef)(null),T=Object(a.useCallback)(e=>{const t=w[v],n=y?y[e]:e,a=t[n],r=w.slice();r[v]=r[v].filter((e,t)=>t!==n);const c=N.slice();c[O]=[...c[O],a];const s=1===v?Object(l.a)(r,c,o):null;k({currentPotNum:1-v,currentMatchupNum:O-v+1,possiblePairings:s,pots:r,matchups:c})},[o,w,N,v,O,y]),x=()=>{(1===(null==y?void 0:y.length)||1===v&&1===w[1].length)&&T(0)};Object(a.useEffect)(()=>{setTimeout(x,250)},[v]);const M=Object(a.useMemo)(()=>y&&w[0].filter((e,t)=>y.includes(t)),[y]),G=O>=t[0].length,R=y?y.map(e=>w[0][e]):[];return r.a.createElement(h.a,null,r.a.createElement(d.a,null,r.a.createElement(m.a,{selectedTeams:R,initialPots:t,pots:w,currentPotNum:v}),r.a.createElement(p.a,{ref:S,matchups:N})),r.a.createElement(b.a,null,!G&&r.a.createElement(E.a,null,"Runners-up"),r.a.createElement(f.a,{forceNoSelect:0===v,display:!G,displayTeams:P,selectedTeam:null,pot:w[1],onPick:T}),!G&&r.a.createElement(E.a,null,"Group Winners"),G&&r.a.createElement(g.a,{long:!1,completed:G,selectedTeam:null,pickedGroup:null,possibleGroups:null,numGroups:0,groupsElement:S,reset:c}),M&&r.a.createElement(f.a,{forceNoSelect:1===v,display:!G,displayTeams:P,selectedTeam:null,pot:M,onPick:T})))})}},0,[80]]);