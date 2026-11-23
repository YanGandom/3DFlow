(()=>{'use strict';
const $=s=>document.querySelector(s),book=window.HANDBOOK;let returnFocus=null,returnScroll=0;
const viewer=$('#viewer'),home=document.createElement('div');viewer.before(home);home.id='viewer-home-anchor';
const dialog=document.createElement('dialog');dialog.className='model-dialog';dialog.setAttribute('aria-label','模型对照窗口');dialog.innerHTML='<header><strong>模型对照 · 固定灯光</strong><button class="model-close">返回阅读 ×</button></header><div class="model-mount"></div>';document.body.append(dialog);
function closeModel(){dialog.close();}
dialog.querySelector('button').onclick=closeModel;
dialog.addEventListener('close',()=>{home.after(viewer);window.scrollTo(0,returnScroll);returnFocus?.focus({preventScroll:true});});
function model(){returnFocus=document.activeElement;returnScroll=scrollY;dialog.querySelector('.model-mount').append(viewer);dialog.showModal();dialog.querySelector('button').focus();}
function go(i,scroll=true){book.stage(Math.max(0,Math.min(6,i)));history.replaceState(null,'','#stage-'+(i+1));if(scroll){$('#reading').scrollIntoView({block:'start'});$('#guide-panel h2').tabIndex=-1;$('#guide-panel h2').focus({preventScroll:true});}}
function enhance(){const i=book.getStage();
const cards=$('#stage-cards'),selected=cards.querySelector('.selected');if(selected&&cards.scrollWidth>cards.clientWidth){cards.scrollLeft=selected.offsetLeft-cards.offsetLeft-(cards.clientWidth-selected.offsetWidth)/2;}
const panel=$('#guide-panel');if(!panel.querySelector('.stage-toolbar')){panel.insertAdjacentHTML('afterbegin',`<div class="stage-toolbar"><span class="stage-position">步骤 ${i+1} / 7</span><button data-model-open>模型对照</button><button data-reference-open>参考图集</button></div>`);panel.insertAdjacentHTML('beforeend',`<nav class="stage-pager" aria-label="阶段翻页"><button data-go-stage="${i-1}" ${i===0?'disabled':''}>← 上一阶段</button><button data-go-stage="${i+1}" ${i===6?'disabled':''}>下一阶段 →</button></nav>`);}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go-stage],[data-model-open],[data-reference-open],[data-back-guide]');if(!b)return;if(b.hasAttribute('data-go-stage'))go(Number(b.dataset.goStage));if(b.hasAttribute('data-model-open'))model();if(b.hasAttribute('data-reference-open')){const ref=$('.reference-library');ref.open=true;ref.scrollIntoView({block:'start'});}if(b.hasAttribute('data-back-guide'))go(book.getStage());});
window.addEventListener('stage-rendered',enhance);
$('#source-panel').insertAdjacentHTML('afterbegin','<div class="stage-toolbar"><button data-back-guide>← 返回当前阶段指南</button><button data-model-open>模型对照</button></div>');
document.querySelectorAll('#stage-cards [data-stage]').forEach(b=>b.addEventListener('click',()=>{history.replaceState(null,'','#stage-'+(Number(b.dataset.stage)+1));$('#reading').scrollIntoView({block:'start'});}));
function route(){const m=location.hash.match(/^#stage-([1-7])$/);if(m)go(Number(m[1])-1);}
window.addEventListener('hashchange',route);enhance();window.dispatchEvent(new CustomEvent('stage-rendered',{detail:book.getStage()}));route();
})();
