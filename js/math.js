/* Funzioni matematiche condivise da interfaccia e test; nessuna dipendenza. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TrigMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const MAX_ANGLE=36000;
  const normalize=a=>((a%360)+360)%360;
  const clean=v=>Math.abs(v)<1e-12?0:v;
  const fmt=(v,digits=6)=>v===null?'Non definita':Number(clean(v).toFixed(digits)).toLocaleString('it-IT',{useGrouping:false,maximumFractionDigits:digits});
  const finite=n=>{if(!Number.isFinite(n))throw new Error('Inserisci un numero finito.');return n;};
  function parseDecimal(text){const s=text.trim().replace(/−/g,'-').replace(/°\s*$/,'').replace(/,/g,'.');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s))throw new Error('Usa un numero, per esempio 15,5 oppure 15.5.');return finite(Number(s));}
  function gcd(a,b){while(b){const r=a%b;a=b;b=r;}return a||1;}
  function piFraction(degrees){
    const value=degrees/180;
    if(Math.abs(value)<1e-12)return '0';
    // Frazione continua con lo stesso limite di denominatore del desktop.
    const sign=value<0?'−':'';let x=Math.abs(value),p0=0,q0=1,p1=1,q1=0;
    for(let i=0;i<32;i++){const a=Math.floor(x),p2=a*p1+p0,q2=a*q1+q0;if(q2>100000){const k=Math.floor((100000-q0)/q1);const pn=k*p1+p0,qn=k*q1+q0;if(qn>0&&Math.abs(pn/qn-Math.abs(value))<Math.abs(p1/q1-Math.abs(value))){p1=pn;q1=qn;}break;}p0=p1;q0=q1;p1=p2;q1=q2;const rest=x-a;if(rest<1e-10)break;x=1/rest;}
    const d=gcd(p1,q1);p1/=d;q1/=d;
    return sign+(p1===1?'':p1)+'π'+(q1===1?'':'/'+q1);
  }
  function parseDMS(text){const parts=text.trim().replace(/−/g,'-').replace(/[°′'″"]/g,' ').replace(/,/g,'.').split(/\s+/).filter(Boolean);if(parts.length<1||parts.length>3)throw new Error('Usa gradi, minuti e secondi: per esempio 15 30 0.');const d=parseDecimal(parts[0]),m=parts.length>1?parseDecimal(parts[1]):0,s=parts.length>2?parseDecimal(parts[2]):0;if(m<0||m>=60||s<0||s>=60)throw new Error('Minuti e secondi devono essere tra 0 e 59,999…');return finite((parts[0].startsWith('-')?-1:1)*(Math.abs(d)+m/60+s/3600));}
  function formatDMS(degrees){let total=Math.round(Math.abs(degrees)*3600*10000)/10000;const d=Math.floor(total/3600);total-=d*3600;const m=Math.floor(total/60),s=total-m*60;return (degrees<0?'−':'')+d+'° '+String(m).padStart(2,'0')+'′ '+fmt(s,4)+'″';}
  function parseRadians(text){
    const s=text.toLowerCase().replace(/\s+/g,'').replace(/π/g,'pi').replace(/,/g,'.').replace(/−/g,'-');
    const number='(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?',signed='[+-]?'+number;
    const ratio=(a,b='1')=>{const n=finite(Number(a)),d=finite(Number(b));if(d===0)throw new Error('Il denominatore non può essere zero.');return finite(n/d);};
    if(new RegExp('^'+signed+'$').test(s))return ratio(s);
    let m=s.match(new RegExp('^([+-]?)(?:('+number+')\\*?)?pi(?:/('+signed+'))?$'));
    if(m)return finite((m[1]==='-'?-1:1)*ratio(m[2]||'1',m[3]||'1')*Math.PI);
    m=s.match(new RegExp('^('+signed+')/('+signed+')\\*?pi$'));if(m)return finite(ratio(m[1],m[2])*Math.PI);
    m=s.match(new RegExp('^([+-]?)\\(('+signed+')/('+signed+')\\)\\*?pi$'));if(m)return finite((m[1]==='-'?-1:1)*ratio(m[2],m[3])*Math.PI);
    m=s.match(new RegExp('^('+signed+')/('+signed+')$'));if(m)return ratio(m[1],m[2]);
    throw new Error('Scrivi per esempio 2, 7pi/2, 7/2pi, (7/2)*pi oppure 13π/9.');
  }
  function values(angle){const rad=normalize(angle)*Math.PI/180,s=clean(Math.sin(rad)),c=clean(Math.cos(rad));return {sin:s,cos:c,tan:Math.abs(c)<1e-10?null:clean(s/c),cot:Math.abs(s)<1e-10?null:clean(c/s)};}
  function status(kind,angle){const value=values(angle)[kind];if(value===null)return {value,undefined:true,near:false,sign:0,text:'NON DEFINITA',limits:kind==='tan'?'+∞ da sinistra · −∞ da destra':'−∞ da sinistra · +∞ da destra'};return {value,undefined:false,near:Math.abs(value)>=10,sign:Math.sign(value),text:kind+' α = '+fmt(value,6),limits:Math.abs(value)>=10?'Vicino all’asintoto: ramo '+(value>0?'+∞':'−∞'):Math.abs(value)>5?'Valore finito fuori scala':''};}
  function quadrant(angle){const n=normalize(angle);for(const [v,t] of [[0,'Asse +X'],[90,'Asse +Y'],[180,'Asse −X'],[270,'Asse −Y']])if(Math.abs(n-v)<1e-8)return t;return ['I quadrante','II quadrante','III quadrante','IV quadrante'][Math.floor(n/90)];}
  const unwrap=(total,previous,current)=>total+normalize(current-previous+180)-180;
  function graphRange(angle){return angle>=0?[0,Math.max(360,Math.ceil(Math.max(angle,1)/360)*360)]:[Math.min(-360,Math.floor(angle/360)*360),0];}
  function convert(mode,text){const degrees=mode==='degrees'?parseDecimal(text):mode==='dms'?parseDMS(text):mode==='radians'?parseRadians(text)*180/Math.PI:(()=>{throw new Error('Formato sconosciuto.');})();finite(degrees);return {degrees,radians:finite(degrees*Math.PI/180),dms:formatDMS(degrees),pi:piFraction(degrees)};}
  return {MAX_ANGLE,normalize,fmt,piFraction,parseDecimal,parseDMS,parseRadians,formatDMS,values,status,quadrant,unwrap,graphRange,convert};
});
