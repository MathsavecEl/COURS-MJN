/* MJN COURS — calculatrice scientifique intégrée */
(() => {
  if (window.__mjnCalculatorLoaded) return;
  window.__mjnCalculatorLoaded = true;
  const css = '#mjnCalcToggle{position:fixed;right:16px;bottom:82px;z-index:9998;border:0;border-radius:999px;padding:12px 16px;background:#174ea6;color:#fff;font:600 15px system-ui;box-shadow:0 3px 12px #0003;cursor:pointer}#mjnCalcPanel{position:fixed;right:14px;bottom:140px;z-index:9999;width:min(340px,calc(100vw - 28px));background:#fff;color:#172033;border:1px solid #cbd5e1;border-radius:16px;box-shadow:0 12px 40px #0004;padding:12px;font-family:system-ui,sans-serif;display:none}#mjnCalcPanel.open{display:block}#mjnCalcPanel *{box-sizing:border-box}#mjnCalcPanel .mjnCalcTop{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px;font-weight:700}#mjnCalcPanel button{border:1px solid #d5dce7;border-radius:9px;background:#f4f7fb;color:#172033;min-height:38px;font-size:15px;cursor:pointer}#mjnCalcPanel button:active{background:#dce8fa}#mjnCalcPanel .mjnCalcClose{padding:4px 10px;min-height:32px}#mjnCalcPanel .mjnCalcScreen{width:100%;height:54px;margin-bottom:8px;border:1px solid #b9c7d9;border-radius:9px;padding:8px 10px;text-align:right;font-size:23px;background:#fff;color:#111827}#mjnCalcPanel .mjnCalcModes{display:flex;gap:7px;margin-bottom:8px}#mjnCalcPanel .mjnCalcModes button{flex:1;min-height:32px;font-size:13px}#mjnCalcPanel .mjnCalcKeys{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}#mjnCalcPanel .mjnCalcKeys button{padding:5px 1px}#mjnCalcPanel .mjnCalcKeys .mjnCalcPrimary{background:#e5efff;border-color:#b9d1ff}#mjnCalcPanel .mjnCalcKeys .mjnCalcEquals{background:#174ea6;color:#fff;border-color:#174ea6}#mjnCalcPanel .mjnCalcHint{font-size:11px;color:#596579;margin-top:8px}@media(max-width:480px){#mjnCalcToggle{right:10px;bottom:72px;padding:11px 13px}#mjnCalcPanel{right:8px;bottom:126px}}@media print{#mjnCalcToggle,#mjnCalcPanel{display:none!important}}';
  const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  const toggle=document.createElement('button');toggle.id='mjnCalcToggle';toggle.type='button';toggle.textContent='🧮 Calculatrice';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','mjnCalcPanel');
  const panel=document.createElement('section');panel.id='mjnCalcPanel';panel.setAttribute('aria-label','Calculatrice scientifique');
  panel.innerHTML='<div class="mjnCalcTop"><span>Calculatrice scientifique</span><button type="button" class="mjnCalcClose" aria-label="Fermer la calculatrice">✕</button></div><input class="mjnCalcScreen" aria-label="Affichage de la calculatrice" readonly autocomplete="off" spellcheck="false" value="" placeholder="0"><div class="mjnCalcModes"><button type="button" data-mode="DEG" aria-pressed="true">✓ Degrés (DEG)</button><button type="button" data-mode="RAD" aria-pressed="false">Radians (RAD)</button></div><div class="mjnCalcKeys"></div><div class="mjnCalcHint">Entrée : calculer · Échap : fermer · × pour multiplier</div>';
  const keys=[['sin(','f'],['cos(','f'],['tan(','f'],['√(','f'],['x²','f'],['asin(','f'],['acos(','f'],['atan(','f'],['ln(','f'],['log(','f'],['(',''],[')',''],['π','f'],['e','f'],['÷','f'],['7',''],['8',''],['9',''],['×','f'],['⌫','f'],['4',''],['5',''],['6',''],['-','f'],['AC','f'],['1',''],['2',''],['3',''],['+','f'],['Ans','f'],['±','f'],['0',''],['.',''],['^','f'],['=','eq']];
  const grid=panel.querySelector('.mjnCalcKeys');
  keys.forEach(([label,cls])=>{const b=document.createElement('button');b.type='button';b.textContent=label;if(cls)b.classList.add(cls==='eq'?'mjnCalcEquals':'mjnCalcPrimary');b.dataset.key=label;grid.appendChild(b)});
  document.body.append(toggle,panel);
  const screen=panel.querySelector('.mjnCalcScreen');let mode='DEG',ans=0;
  const insert=s=>{const a=screen.selectionStart??screen.value.length,b=screen.selectionEnd??a;screen.value=screen.value.slice(0,a)+s+screen.value.slice(b);screen.focus();screen.setSelectionRange(a+s.length,a+s.length)};
  function calculate(){
    let s=screen.value.trim();if(!s)return;
    s=s.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/π/g,'pi').replace(/√\(/g,'sqrt(').replace(/\bAns\b/g,'('+String(ans)+')').replace(/\^/g,'**');
    if(!/^[0-9+\-*/().,\sA-Za-z_*]+$/.test(s)){screen.value='Erreur';return}
    const names=['sin','cos','tan','asin','acos','atan','sqrt','ln','log','pi','e'];
    const words=s.match(/[A-Za-z_]+/g)||[];if(words.some(w=>!names.includes(w))){screen.value='Erreur';return}
    try{
      const trig=(fn,x)=>mode==='DEG'?fn(x*Math.PI/180):fn(x);
      const inv=(fn,x)=>{const v=fn(x);return mode==='DEG'?v*180/Math.PI:v};
      const fn=new Function('sin','cos','tan','asin','acos','atan','sqrt','ln','log','pi','e','return ('+s+');');
      const value=fn(x=>trig(Math.sin,x),x=>trig(Math.cos,x),x=>trig(Math.tan,x),x=>inv(Math.asin,x),x=>inv(Math.acos,x),x=>inv(Math.atan,x),Math.sqrt,Math.log,Math.log10,Math.PI,Math.E);
      if(typeof value!=='number'||!Number.isFinite(value))throw Error();ans=value;screen.value=String(Number(value.toPrecision(12)));
    }catch(_){screen.value='Erreur'}
  }
  toggle.addEventListener('click',()=>{const open=!panel.classList.contains('open');panel.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));/* Ne pas ouvrir le clavier Android : la saisie se fait avec les touches de la calculatrice. */});
  panel.querySelector('.mjnCalcClose').addEventListener('click',()=>{panel.classList.remove('open');toggle.setAttribute('aria-expanded','false')});
  panel.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;panel.querySelectorAll('[data-mode]').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.textContent=(x.dataset.mode===mode?'✓ ':'')+(x.dataset.mode==='DEG'?'Degrés (DEG)':'Radians (RAD)')})}));
  grid.addEventListener('click',e=>{const b=e.target.closest('button[data-key]');if(!b)return;const k=b.dataset.key;
    if(k==='='){calculate();return}if(k==='AC'){screen.value='';screen.focus();return}
    if(k==='⌫'){const a=screen.selectionStart??screen.value.length,z=screen.selectionEnd??a;if(a===z&&a>0){screen.value=screen.value.slice(0,a-1)+screen.value.slice(z);screen.setSelectionRange(a-1,a-1)}else{screen.value=screen.value.slice(0,a)+screen.value.slice(z);screen.setSelectionRange(a,a)}screen.focus();return}
    if(k==='x²'){insert('^2');return}if(k==='±'){screen.value=screen.value.startsWith('-')?screen.value.slice(1):'-('+screen.value+')';screen.focus();return}
    if(k==='Ans'){insert('Ans');return}insert(k);
  });
  screen.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();calculate()}if(e.key==='Escape'){panel.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
})();