/* Applicazione statica: mouse, touch e tastiera usano lo stesso stato. */
(() => {
  'use strict';
  const M=window.TrigMath,$=id=>document.getElementById(id);
  const colors={sin:'#35a7ff',cos:'#43d17d',tan:'#ff9f43',cot:'#b084f5'};
  const kinds=['sin','cos','tan','cot'];
  const state={angle:0,speed:25,playing:false,visible:{sin:true,cos:true,tan:true,cot:true},converted:null};
  const svg=$('circle'),fixed=$('circle-static'),dynamic=$('circle-dynamic'),R=114;
  let dirty=true,lastFrame=0,drag=null,sliderBase=0;
  const NS='http://www.w3.org/2000/svg';
  const element=(name,attrs={},text)=>{const el=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;return el;};
  const add=(parent,name,attrs,text)=>{const el=element(name,attrs,text);parent.append(el);return el;};
  function line(parent,x1,y1,x2,y2,attrs={}){return add(parent,'line',{x1,y1,x2,y2,...attrs});}
  function circleBackground(){
    line(fixed,-157,0,157,0,{stroke:'#43505f','stroke-width':.7});line(fixed,0,-157,0,157,{stroke:'#43505f','stroke-width':.7});
    add(fixed,'circle',{cx:0,cy:0,r:R,fill:'none',stroke:'#d9e2ec','stroke-width':1.4});
    add(fixed,'text',{x:155,y:-5,fill:'#a6b3c1','font-size':8,'text-anchor':'end'},'x');
    add(fixed,'text',{x:5,y:-154,fill:'#a6b3c1','font-size':8},'y');
    const labels=element('g',{'aria-hidden':'true'});svg.append(labels);
    const notable=new Set([0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330]);
    for(let deg=0;deg<360;deg+=15){const rad=deg*Math.PI/180,c=Math.cos(rad),s=-Math.sin(rad),major=notable.has(deg);
      line(fixed,R*c,R*s,(R+(major?5:3))*c,(R+(major?5:3))*s,{class:'tick'+(major?' major':'')});
      if(major){const rr=deg%90===45?155:137,x=rr*c,y=rr*s,anchor=Math.abs(c)<.15?'middle':c>0?'start':'end';const text=add(labels,'text',{x,y:y-2,class:'angle-label'+([0,30,45,60,90,180,270].includes(deg)?' major':''),'text-anchor':anchor,style:'paint-order:stroke;stroke:#18212b;stroke-width:2.5px;stroke-linejoin:round'});
        add(text,'tspan',{x,dy:0,class:'degree-label'},deg+'°');add(text,'tspan',{x,dy:13},M.piFraction(deg));
        if(deg===0){add(text,'tspan',{x,dy:16},'360°');add(text,'tspan',{x,dy:13},'2π');}
      }
    }
  }
  function drawCircle(){
    dynamic.replaceChildren();const v=M.values(state.angle),x=v.cos*R,y=-v.sin*R;
    const angle=M.normalize(state.angle),rad=angle*Math.PI/180;
    if(angle>0){const r=22,ex=r*Math.cos(rad),ey=-r*Math.sin(rad);add(dynamic,'path',{d:`M ${r} 0 A ${r} ${r} 0 ${angle>180?1:0} 0 ${ex} ${ey}`,fill:'none',stroke:'#72d6ff','stroke-width':1.2});}
    add(dynamic,'text',{x:26,y:-10,fill:'#72d6ff','font-size':10},'α');
    line(dynamic,0,0,x,y,{stroke:'#e9eef5','stroke-width':1.4});
    if(state.visible.cos)line(dynamic,0,0,x,0,{stroke:colors.cos,'stroke-width':2,'stroke-linecap':'round'});
    if(state.visible.sin)line(dynamic,x,0,x,y,{stroke:colors.sin,'stroke-width':2,'stroke-linecap':'round'});
    for(const kind of ['tan','cot']){
      const notice=$('circle-'+kind);notice.hidden=!state.visible[kind];if(!state.visible[kind])continue;
      const isTan=kind==='tan',val=v[kind],color=colors[kind];
      if(isTan)line(dynamic,R,-151,R,151,{stroke:color,'stroke-width':.8,opacity:.3});else line(dynamic,-151,-R,151,-R,{stroke:color,'stroke-width':.8,opacity:.3});
      const arrow=(end,start)=>line(dynamic,start[0],start[1],end[0],end[1],{stroke:color,'stroke-width':2,'marker-end':`url(#arrow-${kind})`});
      if(val===null){
        for(const sign of [-1,1]){const end=isTan?[R,-sign*145]:[sign*145,-R],start=isTan?[R,-sign*112]:[sign*112,-R];arrow(end,start);add(dynamic,'text',{x:isTan?R+8:sign*145,y:isTan?-sign*147:-R-9,'text-anchor':isTan?'start':'middle',fill:color,'font-size':10,'font-weight':700},sign>0?'+∞':'−∞');}
      }else{
        const scaled=Math.max(-145,Math.min(145,val*R)),end=isTan?[R,-scaled]:[scaled,-R],base=isTan?[R,0]:[0,-R];
        line(dynamic,base[0],base[1],end[0],end[1],{stroke:color,'stroke-width':1.8});line(dynamic,0,0,end[0],end[1],{stroke:color,'stroke-width':.7,'stroke-dasharray':'3 3',opacity:.6});
        if(Math.abs(val*R)>145)arrow(end,isTan?[R,-scaled*.77]:[scaled*.77,-R]);else add(dynamic,'circle',{cx:end[0],cy:end[1],r:2.5,fill:color});
      }
      const info=M.status(kind,state.angle);notice.replaceChildren();const strong=document.createElement('strong');strong.textContent=info.undefined?kind+' α: NON DEFINITA':info.text;notice.append(strong);
      const message=info.limits||(val!==null&&Math.abs(val*R)>145?'Valore finito fuori scala sul cerchio':'');if(message)notice.append(document.createElement('br'),document.createTextNode(message));
    }
    add(dynamic,'circle',{cx:x,cy:y,r:13,fill:'transparent',id:'point-hit'});
    add(dynamic,'circle',{cx:x,cy:y,r:4.7,fill:'#72d6ff',stroke:'#fff','stroke-width':1,id:'point-p'});
    add(dynamic,'text',{x:x*.86,y:y*.86+3,fill:'#e9eef5','font-size':10,'font-weight':700,'text-anchor':'middle'},'P');
    $('point-coordinates').textContent=`P = (${M.fmt(v.cos,4)} ; ${M.fmt(v.sin,4)})`;
    svg.setAttribute('aria-label',`Angolo ${M.fmt(state.angle,2)} gradi, P uguale ${M.fmt(v.cos,3)}, ${M.fmt(v.sin,3)}. Trascina o usa le frecce.`);
  }
  function setAngle(value,{manual=false}={}){
    if(!Number.isFinite(value))throw new Error('Inserisci un numero finito.');
    if(manual&&Math.abs(value)>M.MAX_ANGLE)throw new Error('La circonferenza accetta angoli tra −36.000° e +36.000°.');
    state.angle=Math.round(Math.max(-M.MAX_ANGLE,Math.min(M.MAX_ANGLE,value))*10000)/10000;dirty=true;
    if(document.activeElement!==$('angle-input'))$('angle-input').value=M.fmt(state.angle,4);
    const n=M.normalize(state.angle);$('angle-slider').value=n;$('slider-output').value=M.fmt(n,2)+'°';
  }
  function playLabels(){for(const id of ['play','compact-play']){$(id).textContent=state.playing?'⏸ Pausa':'▶ Play';$(id).setAttribute('aria-pressed',String(state.playing));}}
  function pause(){state.playing=false;playLabels();lastFrame=0;}
  function play(){state.playing=true;playLabels();lastFrame=performance.now();}
  function renderValues(){const n=M.normalize(state.angle),v=M.values(state.angle);
    $('angle-display').textContent=M.fmt(state.angle,2)+'°';$('pi-display').textContent=M.radiansLabel(state.angle);
    $('pi-display').title='Angolo completo: '+M.fmt(state.angle,4)+'° = '+M.fmt(state.angle*Math.PI/180,8)+' rad (valore decimale arrotondato)';
    $('equivalent').textContent=M.fmt(n,2)+'°';$('turns').textContent=`${Math.floor(state.angle/360)} × 360° + ${M.fmt(n,2)}°`;
    $('radians').textContent=M.fmt(state.angle*Math.PI/180,6)+' rad';$('quadrant').textContent=M.quadrant(state.angle);
    for(const kind of kinds){const info=M.status(kind,state.angle);$('value-'+kind).textContent=v[kind]===null?'Non definita':M.fmt(v[kind],6);const status=$('status-'+kind);status.textContent=state.visible[kind]?(info.undefined?'NON DEFINITA · '+info.limits:info.text+(info.limits?' · '+info.limits:'')):'Funzione nascosta';}
  }
  function drawGraph(kind){
    const canvas=$('graph-'+kind),rect=canvas.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height),dpr=Math.min(devicePixelRatio||1,3);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    const left=29,right=w-12,top=12,bottom=h-39,pw=right-left,ph=bottom-top,color=colors[kind],limit=kind==='sin'||kind==='cos'?1.2:5.5;
    if(pw<=0||ph<=0)return;const [xmin,xmax]=M.graphRange(state.angle),span=xmax-xmin;
    const xx=a=>left+(a-xmin)/span*pw,yy=v=>top+(limit-v)/(2*limit)*ph;
    ctx.font='12px system-ui';ctx.textAlign='right';ctx.textBaseline='middle';
    for(const y of (limit<2?[-1,0,1]:[-5,0,5])){ctx.strokeStyle='#43505f';ctx.globalAlpha=y===0?.7:.3;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(left,yy(y));ctx.lineTo(right,yy(y));ctx.stroke();ctx.globalAlpha=1;ctx.fillStyle='#a6b3c1';ctx.fillText(String(y),left-6,yy(y));}
    const step=span<=360?90:span<=720?180:360*Math.ceil(span/1440);
    const ticks=[];for(let a=Math.ceil(xmin/step)*step;a<=xmax+.001;a+=step)ticks.push(a);
    // Sui grafici stretti mostra tre etichette, mantenendo la griglia a 90°.
    for(let i=0;i<ticks.length;i++){const a=ticks[i],x=xx(a);ctx.strokeStyle='#43505f';ctx.globalAlpha=.25;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);ctx.stroke();ctx.globalAlpha=1;if(w<265&&i%2===1&&i!==ticks.length-1)continue;ctx.textAlign=i===0?'left':i===ticks.length-1?'right':'center';ctx.fillStyle='#a6b3c1';ctx.fillText(a+'°',x,bottom+13);ctx.fillText(M.piFraction(a),x,bottom+28);}
    ctx.strokeStyle='#43505f';ctx.strokeRect(left,top,pw,ph);
    if(!state.visible[kind]){ctx.fillStyle='#a6b3c1';ctx.textAlign='center';ctx.fillText('nascosto',left+pw/2,top+ph/2);return;}
    ctx.save();ctx.beginPath();ctx.rect(left,top,pw,ph);ctx.clip();
    const offset=kind==='tan'?90:0,isPole=kind==='tan'||kind==='cot';
    if(isPole){ctx.strokeStyle=color;ctx.globalAlpha=.5;ctx.lineWidth=.8;ctx.setLineDash([4,4]);for(let pole=Math.ceil((xmin-offset)/180)*180+offset;pole<=xmax;pole+=180){ctx.beginPath();ctx.moveTo(xx(pole),top);ctx.lineTo(xx(pole),bottom);ctx.stroke();}ctx.setLineDash([]);ctx.globalAlpha=1;
      // Segni dei limiti a entrambi i lati, senza attribuire infinito al polo.
      const poleCount=Math.floor(span/180)+1;if(poleCount<=7){for(let pole=Math.ceil((xmin-offset)/180)*180+offset;pole<=xmax;pole+=180){for(const side of [-1,1]){const a=pole+side*span*.022;if(a<=xmin||a>=xmax)continue;const sign=kind==='tan'?-side:side,x=xx(a);ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,yy(sign*3.8));ctx.lineTo(x,yy(sign*5.2));ctx.stroke();const end=yy(sign*5.2);ctx.beginPath();ctx.moveTo(x-3,end+sign*4);ctx.lineTo(x,end);ctx.lineTo(x+3,end+sign*4);ctx.stroke();ctx.textAlign='center';ctx.font='11px system-ui';ctx.fillText(sign>0?'+∞':'−∞',x,yy(sign*3.25));}}}
    }
    ctx.strokeStyle=color;ctx.lineWidth=1.65;ctx.beginPath();
    const start=Math.min(0,state.angle),end=Math.max(0,state.angle),extent=end-start,samples=Math.min(24000,Math.max(Math.ceil(pw*3),Math.ceil(extent*3))),actual=Math.max(1,samples);
    let drawing=false,previousBranch=null;
    for(let i=0;i<=actual;i++){const a=start+extent*i/actual,value=M.values(a)[kind],branch=isPole?Math.floor((a-offset)/180):0;
      if(value===null||!Number.isFinite(value)||Math.abs(value)>limit+1||branch!==previousBranch&&previousBranch!==null){drawing=false;previousBranch=branch;if(value===null||Math.abs(value)>limit+1)continue;}
      const x=xx(a),y=yy(value);if(drawing)ctx.lineTo(x,y);else ctx.moveTo(x,y);drawing=true;previousBranch=branch;
    }ctx.stroke();
    const value=M.values(state.angle)[kind],currentX=xx(state.angle);ctx.strokeStyle='#e9eef5';ctx.globalAlpha=.6;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(currentX,top);ctx.lineTo(currentX,bottom);ctx.stroke();ctx.globalAlpha=1;
    if(value!==null){ctx.fillStyle=color;ctx.strokeStyle='#fff';ctx.lineWidth=.7;const y=yy(Math.max(-5.1,Math.min(5.1,value)));ctx.beginPath();if(isPole&&Math.abs(value)>5.1){const sign=Math.sign(value);ctx.moveTo(currentX,y);ctx.lineTo(currentX-4,y+sign*7);ctx.lineTo(currentX+4,y+sign*7);ctx.closePath();}else ctx.arc(currentX,yy(value),3.6,0,Math.PI*2);ctx.fill();ctx.stroke();}
    ctx.restore();canvas.setAttribute('aria-label',`Grafico ${kind}, da ${xmin} a ${xmax} gradi. ${M.status(kind,state.angle).text}.`);
  }
  function render(){renderValues();drawCircle();kinds.forEach(drawGraph);dirty=false;}
  function frame(timestamp){if(state.playing){const elapsed=Math.min((timestamp-lastFrame)/1000,.25);lastFrame=timestamp;setAngle(state.angle+state.speed*Math.max(0,elapsed));if(state.angle===M.MAX_ANGLE)pause();}if(dirty)render();requestAnimationFrame(frame);}
  function coordinates(event){const p=svg.createSVGPoint();p.x=event.clientX;p.y=event.clientY;const matrix=svg.getScreenCTM();return matrix?p.matrixTransform(matrix.inverse()):null;}
  const mouseAngle=p=>M.normalize(Math.atan2(-p.y,p.x)*180/Math.PI);
  svg.addEventListener('pointerdown',event=>{if(!event.isPrimary||(event.pointerType==='mouse'&&event.button!==0))return;const p=coordinates(event);if(!p)return;const v=M.values(state.angle),hit=Math.max(18,12*360/svg.getBoundingClientRect().width),pointNear=Math.hypot(p.x-v.cos*R,p.y+v.sin*R)<hit,ringNear=Math.abs(Math.hypot(p.x,p.y)-R)<hit;if(!pointNear&&!ringNear)return;pause();event.preventDefault();const a=mouseAngle(p);setAngle(M.unwrap(state.angle,M.normalize(state.angle),a));drag={id:event.pointerId,previous:a};svg.setPointerCapture(event.pointerId);svg.classList.add('dragging');});
  svg.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;const p=coordinates(event);if(!p||Math.hypot(p.x,p.y)<15)return;event.preventDefault();const a=mouseAngle(p);setAngle(M.unwrap(state.angle,drag.previous,a));drag.previous=a;});
  const endDrag=()=>{drag=null;svg.classList.remove('dragging');};svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);svg.addEventListener('lostpointercapture',endDrag);
  svg.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowDown','ArrowRight','ArrowUp'].includes(event.key)){event.preventDefault();pause();setAngle(state.angle+(['ArrowRight','ArrowUp'].includes(event.key)?1:-1)*(event.shiftKey?15:1));}});
  $('angle-form').addEventListener('submit',event=>{event.preventDefault();try{pause();setAngle(M.parseDecimal($('angle-input').value),{manual:true});$('angle-error').textContent='';$('angle-input').value=M.fmt(state.angle,4);}catch(error){$('angle-error').textContent=error.message;}});
  $('angle-slider').addEventListener('pointerdown',()=>{pause();sliderBase=Math.floor(state.angle/360)*360;});$('angle-slider').addEventListener('keydown',()=>{pause();sliderBase=Math.floor(state.angle/360)*360;});$('angle-slider').addEventListener('input',()=>setAngle(sliderBase+Number($('angle-slider').value)));
  $('minus-turn').addEventListener('click',()=>setAngle(state.angle-360));$('plus-turn').addEventListener('click',()=>setAngle(state.angle+360));
  $('play').addEventListener('click',()=>state.playing?pause():play());$('reset').addEventListener('click',()=>{pause();setAngle(0);$('angle-error').textContent='';});
  $('compact-play').addEventListener('click',()=>state.playing?pause():play());$('compact-reset').addEventListener('click',()=>{pause();setAngle(0);$('angle-error').textContent='';});
  document.querySelectorAll('[data-curve]').forEach(button=>button.addEventListener('click',()=>{const selected=button.dataset.curve;$('plots').dataset.selected=selected;document.querySelectorAll('[data-curve]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.curve===selected)));dirty=true;}));
  $('speed').addEventListener('input',()=>{state.speed=Number($('speed').value);$('speed-output').value=state.speed+'°/s';});
  document.querySelectorAll('[data-toggle]').forEach(input=>input.addEventListener('change',()=>{state.visible[input.dataset.toggle]=input.checked;dirty=true;}));
  function converterHint(){const mode=$('converter-mode').value,hints={degrees:['es. 13,17','Usa una virgola o un punto: 13,17 oppure 13.17.'],dms:['es. 15 30 0','Scrivi gradi, minuti e secondi: 15 30 0 oppure 15° 30′ 0″.'],radians:['es. 7pi/2 oppure 13pi/9','2 = 2 radianti. 7pi/2, 7/2pi o (7/2)*pi = 7π/2. Puoi usare anche π.']};$('converter-input').placeholder=hints[mode][0];$('converter-input').inputMode=mode==='degrees'?'decimal':'text';$('converter-hint').textContent=hints[mode][1];state.converted=null;$('use-converted').disabled=true;$('conversion-results').hidden=true;$('converter-error').textContent='';}
  $('converter-mode').addEventListener('change',converterHint);$('converter-input').addEventListener('input',()=>{state.converted=null;$('use-converted').disabled=true;$('conversion-results').hidden=true;$('converter-error').textContent='';});
  function doConvert(){try{const c=M.convert($('converter-mode').value,$('converter-input').value);state.converted=c;$('converted-degrees').textContent=M.fmt(c.degrees,10)+'°';$('converted-dms').textContent=c.dms;$('converted-radians').textContent=M.fmt(c.radians,10)+' rad';$('converted-pi').textContent=c.pi;$('conversion-results').hidden=false;$('use-converted').disabled=false;$('converter-error').textContent='';return c;}catch(error){state.converted=null;$('use-converted').disabled=true;$('conversion-results').hidden=true;$('converter-error').textContent=error.message;throw error;}}
  $('converter-form').addEventListener('submit',event=>{event.preventDefault();try{doConvert();}catch{}});
  $('use-converted').addEventListener('click',()=>{if(!state.converted)return;try{pause();setAngle(state.converted.degrees,{manual:true});$('converter-error').textContent='';$('circle-title').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}catch(error){$('converter-error').textContent=error.message;}});
  new ResizeObserver(()=>{dirty=true;}).observe(document.querySelector('.dashboard'));
  window.addEventListener('resize',()=>{dirty=true;});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  let installEvent=null;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;$('install').dataset.installable='true';$('install').title='Installazione disponibile in questo browser';});window.addEventListener('appinstalled',()=>{$('install').hidden=true;installEvent=null;});
  $('install').addEventListener('click',async()=>{if(installEvent){await installEvent.prompt();await installEvent.userChoice;installEvent=null;}else $('install-dialog').showModal();});$('close-install').addEventListener('click',()=>$('install-dialog').close());
  let waitingWorker=null;
  async function setupOffline(){
    if(!('serviceWorker' in navigator)||!window.isSecureContext||location.protocol==='file:'){$('offline-status').textContent='Offline disponibile dopo la pubblicazione HTTPS';return;}
    try{const registration=await navigator.serviceWorker.register('./service-worker.js');await navigator.serviceWorker.ready;$('offline-status').textContent='Disponibile offline';const showUpdate=()=>{if(registration.waiting&&navigator.serviceWorker.controller){waitingWorker=registration.waiting;$('update-app').hidden=false;}};showUpdate();registration.addEventListener('updatefound',()=>{const worker=registration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')showUpdate();});});$('update-app').addEventListener('click',()=>{waitingWorker?.postMessage({type:'SKIP_WAITING'});});let refreshing=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(waitingWorker&&!refreshing){refreshing=true;location.reload();}});}catch(error){$('offline-status').textContent='Offline non disponibile in questo browser';console.warn('Service worker non registrato:',error);}
  }
  // Integrazione opzionale: nessun effetto sui browser che non supportano WebMCP.
  if(document.modelContext?.registerTool){const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});for(const tool of [
    {name:'set_trigonometry_angle',title:'Imposta angolo',description:'Imposta e visualizza l’angolo totale in gradi.',inputSchema:{type:'object',properties:{degrees:{type:'number',minimum:-36000,maximum:36000}},required:['degrees'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||Object.keys(input).some(k=>k!=='degrees')||typeof input.degrees!=='number')throw new Error('Specificare degrees numerico.');pause();setAngle(input.degrees,{manual:true});render();return {degrees:state.angle,values:M.values(state.angle)};}},
    {name:'convert_trigonometry_angle',title:'Converti angolo',description:'Converte un angolo e mostra il risultato nel convertitore senza cambiare la circonferenza.',inputSchema:{type:'object',properties:{mode:{enum:['degrees','dms','radians']},text:{type:'string'}},required:['mode','text'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||!['degrees','dms','radians'].includes(input.mode)||typeof input.text!=='string'||Object.keys(input).some(k=>!['mode','text'].includes(k)))throw new Error('Specificare formato e testo validi.');M.convert(input.mode,input.text);$('converter-mode').value=input.mode;converterHint();$('converter-input').value=input.text;return doConvert();}}
  ]){try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}}}
  circleBackground();converterHint();setAngle(0);render();requestAnimationFrame(frame);setupOffline();
})();
