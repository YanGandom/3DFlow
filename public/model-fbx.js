/* Web edition: fetch the original GLB without Base64 duplication. Serve over HTTP(S). */
(()=>{'use strict';
const report=window.FBX_IMPORT_REPORT;const T=window.THREE,$=s=>document.querySelector(s),canvas=$('#model');let renderer;
try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,preserveDrawingBuffer:true});}catch(e){$('#webgl-fallback').hidden=false;$('#webgl-fallback').textContent='三维预览需要 WebGL 2。请使用新版 Chrome 或 Edge。';canvas.hidden=true;return;}
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.01,100),controls=new T.OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=.25;controls.maxDistance=8;controls.maxPolarAngle=Math.PI*.88;controls.autoRotate=false;controls.autoRotateSpeed=.55;controls.enableRotate=false;controls.mouseButtons.LEFT=null;controls.touches.ONE=null;let modelAuto=false;let dragging=null;canvas.addEventListener('pointerdown',e=>{if(e.button===0&&!e.shiftKey){dragging={id:e.pointerId,x:e.clientX};modelAuto=false;$('#rotate').checked=false;canvas.setPointerCapture(e.pointerId);}});canvas.addEventListener('pointermove',e=>{if(dragging&&dragging.id===e.pointerId){content.rotation.y+=(e.clientX-dragging.x)*.008;dragging.x=e.clientX;}});for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>dragging=null);canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){content.rotation.y+=(e.key==='ArrowLeft'?-.12:.12);modelAuto=false;$('#rotate').checked=false;e.preventDefault();}});
$('#rotate').checked=controls.autoRotate;const content=new T.Group();scene.add(content);
const ambient=new T.HemisphereLight(0xe5efff,0x77624f,.65);scene.add(ambient);const key=new T.DirectionalLight(0xffecd6,3.2);key.position.set(-2.5,4,4);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-1.8;key.shadow.camera.right=1.8;key.shadow.camera.top=2.8;key.shadow.camera.bottom=-1;key.shadow.bias=-.0003;key.shadow.normalBias=.015;scene.add(key);
const fill=new T.DirectionalLight(0xb9d4ff,1.3);fill.position.set(3,2,1);scene.add(fill);const rim=new T.DirectionalLight(0xe7d5ff,2.2);rim.position.set(-1,3,-3);scene.add(rim);
const stage=new T.Mesh(new T.CylinderGeometry(.68,.71,.035,80),new T.MeshStandardMaterial({color:0x29372b,roughness:.72,metalness:.15}));stage.position.y=-.026;stage.receiveShadow=true;scene.add(stage);
const trim=new T.Mesh(new T.TorusGeometry(.69,.003,8,80),new T.MeshStandardMaterial({color:0x879e60,metalness:.65,roughness:.4}));trim.rotation.x=Math.PI/2;trim.position.y=-.018;scene.add(trim);
let root,mixer,helper,meshes=[],clips=[],activeAction,playing=false,mode='material',height=1.75,foot=0,loaded=false;const originals=new Map(),variants=new Map();
const state={loaded:false,mode,animation:'rest',playing:false,source:'布里奇顿-003.fbx',errors:[]};
const overlay=document.createElement('div');overlay.className='fbx-loading';overlay.textContent='正在加载你的 FBX 角色与贴图…';$('.canvas-wrap').append(overlay);
const ui=document.createElement('div');ui.className='fbx-controls';ui.innerHTML='<div class="animation-row"><select id="animation-select" aria-label="选择动画" disabled><option value="rest">绑定姿势</option></select></div><div class="asset-facts" id="asset-facts">加载中</div>';
$('.view-modes').before(ui);
const lightDefaults={ambient:.65,key:3.2,fill:1.3,rim:2.2,exposure:1.1};
const lightSettings={...lightDefaults};
try{const stored=JSON.parse(localStorage.getItem('character-lighting-v10')||'{}');for(const name in lightDefaults){const max=name==='exposure'?2.5:5,min=name==='exposure'?.3:0;if(Number.isFinite(stored[name]))lightSettings[name]=Math.min(max,Math.max(min,stored[name]));}}catch(e){}
const lightPanel=document.createElement('div');lightPanel.className='light-panel';lightPanel.id='lighting-panel';lightPanel.hidden=true;
lightPanel.innerHTML=''+Object.entries({ambient:'环境光',key:'主光',fill:'补光',rim:'轮廓光',exposure:'曝光'}).map(([name,label])=>`<label class="light-control" for="light-${name}"><span>${label}</span><input id="light-${name}" data-light="${name}" type="range" min="${name==='exposure'?.3:0}" max="${name==='exposure'?2.5:5}" step="0.05" value="${lightSettings[name]}"><output for="light-${name}">${lightSettings[name].toFixed(2)}</output></label>`).join('')+'<button type="button" class="reset-lighting">恢复默认光照</button>';
$('.canvas-wrap').append(lightPanel);
const lightToggle=document.createElement('button');lightToggle.className='light-toggle';lightToggle.type='button';lightToggle.title='调节灯光';lightToggle.setAttribute('aria-label','调节灯光');lightToggle.setAttribute('aria-controls','lighting-panel');lightToggle.setAttribute('aria-expanded','false');lightToggle.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 18h6M9 21h6M8.5 15.5a6 6 0 1 1 7 0L15 18H9zM12 1v2M3 5l2 2M21 5l-2 2M1 12h2M21 12h2"/></svg>';
ui.querySelector('.animation-row').append(lightToggle);
function closeLighting(){lightPanel.hidden=true;lightToggle.setAttribute('aria-expanded','false');}
lightToggle.addEventListener('click',()=>{lightPanel.hidden=!lightPanel.hidden;lightToggle.setAttribute('aria-expanded',String(!lightPanel.hidden));});
document.addEventListener('click',e=>{if(!lightPanel.contains(e.target)&&!lightToggle.contains(e.target))closeLighting();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightPanel.hidden){e.preventDefault();e.stopImmediatePropagation();closeLighting();lightToggle.focus();}},true);
ui.querySelector('.animation-row').append($('#rotate').parentElement);
$('.canvas-wrap').append($('#asset-facts'));
function applyLighting(){ambient.intensity=lightSettings.ambient;key.intensity=lightSettings.key;fill.intensity=lightSettings.fill;rim.intensity=lightSettings.rim;renderer.toneMappingExposure=lightSettings.exposure;lightPanel.querySelectorAll('[data-light]').forEach(input=>{input.value=lightSettings[input.dataset.light];input.nextElementSibling.value=Number(input.value).toFixed(2);});}
function saveLighting(){try{localStorage.setItem('character-lighting-v10',JSON.stringify(lightSettings));}catch(e){}}
lightPanel.addEventListener('input',e=>{if(!e.target.dataset.light)return;lightSettings[e.target.dataset.light]=Number(e.target.value);applyLighting();saveLighting();});
lightPanel.querySelector('button').addEventListener('click',()=>{Object.assign(lightSettings,lightDefaults);applyLighting();saveLighting();});applyLighting();


canvas.setAttribute('aria-label','用户提供的布里奇顿角色。拖拽旋转，滚轮缩放，右键平移，左右方向键旋转角色。');
document.querySelector('[data-mode="parts"]').textContent='分区';const explode=$('#explode');explode.checked=false;explode.disabled=true;explode.parentElement.title='当前为角色主网格与独立头饰；未提供身体、衣服、头发的独立换装模块';explode.parentElement.lastChild.textContent=' 角色＋头饰';explode.parentElement.hidden=true;
function fit(preset='full'){
 content.rotation.set(0,0,0);const h=height,aspect=Math.max(.5,canvas.clientWidth/canvas.clientHeight);let y=.52*h,dist=h/(2*Math.tan(T.MathUtils.degToRad(17.5)))*1.24/Math.min(1,aspect*1.18),angle=.15,up=.07;
 if(preset==='face'){y=.90*h;dist=h*.52;angle=.12;up=.015;}
 if(preset==='hair'){y=.91*h;dist=h*.55;angle=.12;content.rotation.y=2.7;up=.10;}
 if(preset==='dress'){y=.43*h;dist=h*1.35;angle=-.15;up=.045;}
 controls.target.set(0,y,0);camera.position.set(Math.sin(angle)*dist,y+up*dist,Math.cos(angle)*dist);camera.lookAt(controls.target);controls.update();controls.saveState();
 document.querySelectorAll('[data-camera]').forEach(b=>b.classList.toggle('selected',b.dataset.camera===preset));
}
function applyMode(next){mode=next;state.mode=next;document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===next);b.setAttribute('aria-pressed',String(b.dataset.mode===next));});if(!loaded)return;
 for(const mesh of meshes){if(next==='material'){mesh.material=originals.get(mesh);continue;}const cacheKey=mesh.uuid+next;if(!variants.has(cacheKey)){const mats=(Array.isArray(originals.get(mesh))?originals.get(mesh):[originals.get(mesh)]).map((m,i)=>{let c=new T.MeshStandardMaterial({color:next==='parts'?(m.name.toLowerCase().includes('head')?0xdba995:m.name==='body'?0x92b5ba:0xe6bf60):0xc1c8bf,roughness:.75,metalness:0,side:T.DoubleSide,wireframe:next==='wire'});if(next==='rig'){c.transparent=true;c.opacity=.24;c.depthWrite=false;}return c;});variants.set(cacheKey,Array.isArray(originals.get(mesh))?mats:mats[0]);}mesh.material=variants.get(cacheKey);}
 helper.visible=next==='rig';
}
function selectClip(value){if(!loaded)return;mixer.stopAllAction();root.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.pose();});root.updateMatrixWorld(true);activeAction=null;playing=false;state.animation=value;
 if(value!=='rest'&&!report.static_animations?.includes(clips[Number(value)].name)){const clip=clips[Number(value)];activeAction=mixer.clipAction(clip);activeAction.reset().setLoop(T.LoopRepeat,Infinity).play();playing=true;mixer.update(0);}
 state.playing=playing;
}
async function load(){try{if(location.protocol==='file:')throw new Error('请通过本地服务器或网站地址打开此发布版');
 const response=await fetch(new URL('models/bridgerton-003.glb',document.baseURI));
 if(!response.ok)throw new Error('模型请求失败 HTTP '+response.status);
 const total=Number(response.headers.get('content-length'))||0;let bytes;
 if(response.body){const reader=response.body.getReader(),chunks=[];let received=0;while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);received+=value.length;overlay.textContent=total?'模型加载 '+Math.min(100,Math.round(received/total*100))+'%':'模型加载 '+(received/1048576).toFixed(1)+' MB';}bytes=new Uint8Array(received);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}}
 else bytes=new Uint8Array(await response.arrayBuffer());
 overlay.textContent='正在准备模型与贴图…';window.CHARACTER_GLB_BYTES=bytes;

 const result=await new Promise((resolve,reject)=>new T.GLTFLoader().parse(bytes.buffer,'',resolve,reject));root=result.scene;clips=result.animations;content.add(root);root.updateMatrixWorld(true);
 const box=new T.Box3();root.traverse(o=>{if(o.isMesh){o.geometry.computeBoundingBox();box.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld));}});const center=box.getCenter(new T.Vector3());height=box.max.y-box.min.y;foot=box.min.y;root.position.x-=center.x;root.position.z-=center.z;root.position.y-=foot;root.updateMatrixWorld(true);
 root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=false;o.frustumCulled=false;meshes.push(o);originals.set(o,o.material);for(const m of Array.isArray(o.material)?o.material:[o.material]){m.side=T.DoubleSide;if(m.name==='Head'){m.normalMap=null;m.normalScale.set(0,0);m.needsUpdate=true;}if(m.map)m.map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());}}});
 helper=new T.SkeletonHelper(root);helper.material.depthTest=false;helper.material.transparent=true;helper.material.opacity=.95;helper.renderOrder=10;helper.visible=false;scene.add(helper);mixer=new T.AnimationMixer(root);
 const labels={Unnamed_Action:'未命名动作',Idle:'待机',Walk:'走路',Run:'跑步',Wave:'挥手',Talk:'交谈',Dance:'舞蹈',Cheer:'欢呼',Jump:'跳跃',Attack:'攻击',Hit:'受击',Death:'倒地',PickUp:'拾取','mixamo.com.001':'长动作'};
 for(let i=0;i<clips.length;i++){const option=document.createElement('option');option.value=i;option.textContent=(labels[clips[i].name]||clips[i].name)+(report.static_animations?.includes(clips[i].name)?' · 静止片段':' · '+clips[i].duration.toFixed(1)+'s');$('#animation-select').append(option);}
 loaded=true;state.loaded=true;state.animations=clips.map(c=>({name:c.name,duration:c.duration,tracks:c.tracks.length}));state.meshes=meshes.length;state.height=height;state.bones=report.bones;$('#animation-select').disabled=false;$('#animation-select').title='选择动作后自动播放；选择绑定姿势可停止动画。';$('#asset-facts').textContent=report.triangles.toLocaleString()+' 三角面 · '+report.bones+' 骨骼 · '+report.materials.length+' 材质 · '+clips.length+' 动作';overlay.remove();fit();applyMode('material');
 window.MODEL_INFO={meshes:meshes.length,triangles:report.triangles,bones:report.bones,animations:state.animations,getState:()=>({...state,time:activeAction?.time||0,auto:modelAuto,modelYaw:content.rotation.y,lights:[key,fill,rim].map(l=>l.position.toArray())})};window.FBX_VIEWER={root,meshes,mixer,renderer,scene,camera,controls,clips,state,fit,selectClip};
 }catch(e){state.errors.push(e.message);overlay.textContent='模型加载失败：'+e.message+'。';const retry=document.createElement('button');retry.textContent='重新加载';retry.onclick=()=>location.reload();overlay.append(retry);console.error(e);}}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>applyMode(b.dataset.mode)));document.querySelectorAll('[data-camera]').forEach(b=>b.addEventListener('click',()=>{fit(b.dataset.camera);controls.autoRotate=false;modelAuto=false;$('#rotate').checked=false;}));$('#rotate').addEventListener('change',e=>modelAuto=e.target.checked);controls.addEventListener('start',()=>{controls.autoRotate=false;modelAuto=false;$('#rotate').checked=false;});
$('#animation-select').addEventListener('change',e=>selectClip(e.target.value));


let last=performance.now();function frame(now){const dt=Math.min((now-last)/1000,.05);last=now;const w=canvas.clientWidth,h=canvas.clientHeight;if(w&&h){const size=renderer.getSize(new T.Vector2());if(size.x!==w||size.y!==h){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}if(mixer&&playing&&!document.hidden)mixer.update(dt);if(modelAuto&&!document.hidden)content.rotation.y+=dt*.25;controls.update(dt);renderer.render(scene,camera);}requestAnimationFrame(frame);}requestAnimationFrame(frame);load();
})();
