/* Practical production sequence for the supplied character. */
window.PRODUCTION_MANUAL=[
{steps:[
['建立项目与版本','在 Maya 设置项目目录，把参考、场景、高模、低模、贴图与导出文件分开存放。约定单位、角色朝向、命名和版本号；原始设计图保留只读副本。','交付目录草案与命名表'],
['明确使用场景','记录目标平台、游戏镜头距离、同屏人数和动作范围。根据实测预算约定面数、材质数、贴图和 LOD；先把近景需要保留的面部、玫瑰和裙边列出。','资产规格表'],
['整理部件参考','完整图用于整体比例；发型正侧背图用于头部；礼裙四视图用于服装；头饰四视图用于佩戴和结构。标注大玫瑰所在侧、后颈发髻、高腰线、袖口和裙摆。','分组参考板'],
['校准视图','在 Maya 对应正交视口导入 Image Plane，保留图片宽高比，按地面、中心线、肩线及腰线等比例缩放和平移。头部图用下巴、眼线和耳位校准；将参考平面锁定。','参考场景'],
['规划制作与拆分','先用简模确定身体、裙装、发型、头饰的关系，写明哪些需换装，哪些可合并。约定 A-Pose / T-Pose、接口位置和骨架共享规则。当前 FBX 仅角色主网格和头饰独立，不能直接当成已拆分换装资产。','模块与接口规划'],
['冻结可执行设计','对比所有角度，记录视图冲突并确定主参考。确认正侧背轮廓、色彩和层级后保存评审截图，把尚未确定的问题留在清单中，解决后再进入细化。','G0 设计确认记录']
],notes:['头饰 faqia-Left 的图内标注是右视图，faqia-Right 的图内标注是左视图；必须用完整图再确认佩戴方向。','设计图有透视和灯光，不是严格正交蓝图；不要拉伸图片强行使每个细节重合。','不要从图片推断实际厘米尺寸；身高与比例由项目约定。','先定预算和换装要求再拆网格，避免后期为绑定重新返工。'],checks:['项目目录、单位、朝向、命名和版本规则已记录。','完整图与三组部件参考齐全，左右方向冲突已有处理说明。','正侧背比例基准、工作姿势和主参考已确认。','模块边界、接口、目标镜头与预算已有明确约定。','已保存设计确认截图与未决问题清单。'],deliver:'参考板、参考场景、资产规格表、模块规划、设计评审记录。'},
{steps:[
['搭建一级体块','根据完整图建立头、胸腔、骨盆和四肢，补上裙子的总体积。先在正侧背和 3/4 角度看剪影，确认头身关系、肩宽、高腰位置和落地高度。','Blockout 场景'],
['塑造脸部和头颈','对照无发饰正侧图调整眼窝、鼻口、下颌和颈部体积。先检查侧面深度再加入眼睑与唇缘；保持表情中性，为之后表情制作保留空间。','头部形体版本'],
['建立盘发与卷发','将发帽、主发束、后颈发髻和耳前螺旋卷发分组。正面定中分与波浪，侧面定颅顶和后脑厚度，背面定发束汇聚路径；用曲线建立卷发走势，再细化束状层次。','发型分组高模'],
['可选：用 MD 制作并模拟布料','可选使用 Marvelous Designer（MD）：按设计拆分胸衣、泡泡袖、裙片与手套纸样，设置缝合关系后在角色尺寸上模拟。检查人体碰撞、布料厚度与褶皱走向；满意后导出到 Maya/ZBrush，清理穿插、褶皱和边界并保存可编辑工程。也可跳过 MD，直接在 Maya/ZBrush 制作服装。','选用 MD：纸样与模拟工程、导出网格；跳过 MD：Maya/ZBrush 服装工程'],
['制作花饰和刺绣','用弧形底箍确定头饰贴合面，再布置珍珠、小花、玫瑰和叶片。刺绣按大图案到小纹理制作；将会影响轮廓的大花与可烘焙的表面纹样分开。','可独立调整的装饰部件'],
['合体检查并保存高模','将头饰装到头发上，检查耳侧、发髻和领口遮挡。去掉颜色看白模，确认轮廓成立；再以完整图检查风格。保留分层源文件和高模导出版本。','分层高模与多角度截图']
],notes:['现有网页白模来自用户 FBX，不是未提供的 ZBrush 高模工程。','大形不正确时不要用发丝、刺绣和毛孔掩盖问题。','不要将参考图中的高光、投影雕成凹凸。','花瓣与发束要有合理厚度和接触关系；非对称头饰不能整件镜像。'],checks:['灰模正侧背和 3/4 轮廓已与设计对照。','头部、盘发、服装和头饰分组清楚且可编辑。','主褶、次褶与装饰细节层级明确。','头箍、耳侧、领口和发髻的合体关系已检查。','高模源文件、导出版本和评审截图已保存。'],deliver:'Blockout、分层雕刻工程、高模导出文件、多视角形体验收截图。'},
{steps:[
['确认低模拆分范围','按照已确认的换装需求列出要保留的独立网格。身体与服装是否拆开、头部是否可替换、头饰如何挂接都要写明，不能仅凭部件设计图假定模型已拆分。','低模部件清单'],
['重建身体与脸部拓扑','在 Maya 将高模设为 Live Surface，用 Quad Draw 或其他重拓扑工具建立网格。眼口周围为表情保留连续环线，肩肘膝等区域按预期弯曲方向布线。','可变形基础网格'],
['处理服装与头发','领口、袖窿、腰带和裙摆保留控制轮廓与变形的环线。主卷发保留几何形态，细发是否转为发片取决于目标镜头；发片需要另外制作透明贴图与排序测试。','服装与发型游戏网格'],
['优化头饰与装饰','现有头饰为 50 万三角面，单独评估轮廓和远景需求。花瓣边缘保留必要几何，平坦细节准备烘焙；制作不同精度版本时逐级对比大花、珍珠和底箍。','头饰低模与 LOD 草案'],
['统一模块接口','可见接缝处对齐位置和法线，隐藏接口保留合理重叠及遮挡范围。所有换装部件遵循同一工作姿势与骨架约定；检查重叠身体面是否需要隐藏。','接口和遮挡规则'],
['清理并固定导出网格','清理重复面、非流形、零面积面和异常法线，检查负缩放与变换。先做简单弯曲或试绑验证，再固定用于烘焙和导出的三角化结果。','最终低模与拓扑检查记录']
],notes:['网页三角边图来自实际 FBX，并不表示当前布线就是理想四边形拓扑。','自动重拓扑可作为起点，不能替代变形区域的人工检查。','减面应以轮廓和镜头效果为依据，不只追求一个面数。','修改网格拓扑后，应重新核对 UV、蒙皮与烘焙兼容性。'],checks:['部件清单与实际网格结构一致。','眼口、肩肘、袖窿和裙摆满足预定变形需要。','接口位置、法线与遮挡范围已对照检查。','无明显非流形、重复面、反面或异常变换。','低模版本、三角化规则和 LOD 预算已记录。'],deliver:'游戏低模、部件命名表、接口规则、LOD 草案、拓扑与试变形截图。'},
{steps:[
['确定贴图集划分','按部件、材质和镜头重要性规划贴图集与分辨率。确认 Head、body 与头饰的材质对应；为非对称花朵、刺绣预留独立 UV 空间。','贴图集预算'],
['展开并整理 UV','在后脑、服装侧缝和配饰背面等位置安排接缝。头发顺发束方向展开，礼裙保持纵向花枝的方向和连续性；用棋盘格检查拉伸。','UV 展开版本'],
['统一密度与留边','按目标镜头确定 Texel Density，检查面部与裙身的密度差是否合理。按贴图尺寸、mip 和导出要求设置岛间距与 Padding；镜像或重叠区域单独标注。','UV 密度与重叠记录'],
['匹配高低模和 Cage','冻结用于烘焙的低模三角化与法线。高低模按部件对应命名，分别匹配身体、头发和头饰；检查 Cage 覆盖距离，避免花瓣烘到头发或裙子烘到身体。','烘焙匹配组和 Cage'],
['执行烘焙并逐区修复','先测试法线与 AO，再按材质工作流烘焙曲率、ID 等。放大发髻、花瓣夹层、袖口和领口，记录黑块、串烘、接缝与细节丢失；定位原因后重新烘焙。','烘焙贴图与问题清单'],
['在最终网格上回看','将贴图放回最终低模，在与 Unity 一致的法线格式和切线约定下检查。若改变拓扑、UV 或平滑方式，应重做受影响的烘焙，不直接沿用旧贴图。','可复现烘焙交付']
],notes:['网页 UV 图读取实际 UVMap，只说明坐标布局，不表示重叠和拉伸已验收。','当前没有提供高低模烘焙工程，不能把现有贴图认定为本次已重新烘焙。','法线贴图补不了花瓣或卷发缺失的外轮廓。','UV 留边没有适合所有项目的固定像素值，应结合分辨率与 mip 验证。'],checks:['UV 无非预期重叠，棋盘格拉伸可接受。','图案方向、接缝与 Texel Density 已检查。','高低模匹配、Cage 与最终三角化版本可追溯。','关键区域无明显串烘、黑块、法线翻转和接缝。','烘焙工程、贴图通道和重新烘焙说明齐全。'],deliver:'UV 低模、匹配高模、Cage、烘焙工程、Normal / AO 等贴图及检查记录。'},
{steps:[
['建立材质清单','以完整设计图确定红棕头发、紫罗兰礼裙、浅色手套、粉色花瓣和珍珠的关系。列出每类表面使用的 Shader、透明需求及贴图通道。','材质与 Shader 对照表'],
['绘制基础色','依据参考图建立不含强光照的底色，再加入雀斑、花纹、刺绣和自然色差。对照正背礼裙图检查花带连续性，不把肖像图直接贴到不匹配的 UV。','Base Color 分层工程'],
['调整粗糙度与法线','分开调整皮肤、头发、手套、布料、花瓣与珍珠的响应；在中性光下逐项检查。主褶来自几何，细纹可用法线或高度，避免多层细节叠加过强。','表面细节和粗糙度层'],
['处理透明与金属区域','普通布料、花瓣和珍珠使用非金属逻辑；只对确为金属的底箍等区域使用金属度。薄纱和发片按目标 Unity 管线选择透明或裁剪方案，检查背面与排序。','透明和特殊材质方案'],
['按目标模板导出','确认 Unity 使用的渲染管线和 Shader，再设置贴图打包模板。Base Color 与数据贴图分别核对 sRGB、法线类型、通道位置、压缩与尺寸。','引擎贴图集'],
['完成 Lookdev 对照','固定曝光和灯光，对照设计查看正侧背，再换一组光照检查材质稳定性。记录与设计的差异和修正项，不通过把底色涂亮来补偿灯光不足。','材质评审截图']
],notes:['设计参考已经包含光照与背景色，不可直接用作金属度、粗糙度或无光照基础色。','材质区域不一定等于独立网格，也不要求每种视觉表面都增加一个材质球。','透明纱、发片和多层花瓣容易增加过绘制，须在目标设备检查。','网页灯光用于观察，不代替 Unity 的实际材质验收。'],checks:['各材质及贴图通道与目标 Shader 对应。','基础色没有明显烘死的高光和投影。','法线方向、数据贴图色彩空间及通道打包正确。','透明排序、背面和接缝在目标镜头下可接受。','分层工程、导出贴图和固定灯光对照图已保存。'],deliver:'材质分层源文件、引擎贴图、Shader 对照表、Lookdev 截图。'},
{steps:[
['确认骨架标准','记录变形骨骼的名称、层级、朝向、单位和 Bind Pose。区分动画控制器与导出变形骨架；模块共享同一骨架约定。当前 FBX 有 36 根骨骼，应以源数据逐项核对。','骨架规范与参考姿势'],
['绑定身体与服装','为身体和礼裙建立蒙皮，先检查大范围权重，再处理肩袖、肘弯、腰带与裙摆。按目标引擎限制归一化并限制影响数；网页 GLB 保留每顶点最大的四个影响。','基础蒙皮'],
['处理头发和头饰','主盘发随头部运动，当前头饰使用 Head 刚性挂接。若耳前卷发需要摆动，再设计辅助骨骼或动力学；不要将静态挂接误认为柔性蒙皮。','附件挂接与动态方案'],
['验证表情与极限姿态','按项目需求检查眼睑闭合、嘴部张合、转头、抬臂、弯肘、下蹲与大步移动。未提供的表情或控制器功能需单独制作和验证，不假定现有 FBX 已包含。','姿态与表情测试清单'],
['逐个动作检查','播放待机、走路、跑步、转身等动作，暂停查看头饰、袖口、裙摆和腿部穿插。当前 13 个动作可在网页对照；检查循环接缝、脚底滑动与根运动，不只确认能播放。','逐动作问题与修复记录'],
['烘焙导出并回导','按约定帧率与范围烘焙变形骨架，排除不需要的控制器、相机和灯光。导出后重新导入验证骨架、蒙皮、附件和每段动画，并保存版本和参数。','绑定与动画交付版本']
],notes:['同名动画可能包含静止副本，必须确认关键帧数值实际变化。','裙装权重不能仅靠从腿部复制后直接交付，须测试步幅和下蹲。','启用骨骼优化或减少影响数后，要重新验证附件与极限变形。','动画播放成功不等于穿插、脚滑、表情和循环全部合格。'],checks:['骨架层级、Bind Pose 与模块规范一致。','身体与服装权重归一化，影响数符合目标要求。','头饰随 Head 正确运动，无漂浮或明显穿插。','约定动作与极限姿态已有逐项测试记录。','烘焙帧率、范围、根运动和回导结果已记录。'],deliver:'Rig 源文件、变形骨架、蒙皮模型、动画库、导出参数及动作测试记录。'},
{steps:[
['执行干净导出','从确认版本导出需要的模型与变形骨架，记录单位、朝向、缩放、三角化、动画与材质选项。排除参考平面、摄影棚背景、相机和灯光。','引擎输入包'],
['配置 Unity 导入','检查 Model 缩放与法线、Rig 类型与映射、Animation 范围和循环。贴图分别设置色彩空间、Normal Map 类型、尺寸与压缩；导入警告逐项处理。','导入预设与检查记录'],
['组装角色 Prefab','建立材质引用、Animator 和附件挂点，保存可复用 Prefab。若需换装，检查 SkinnedMeshRenderer 的骨骼引用与共享骨架兼容性，当前主网格需先完成真正拆分。','角色 Prefab'],
['按设计进行视觉验收','固定相机、曝光和灯光，拍正侧背与近景图，与完整设计和部件图并排比对。检查头饰方向、发型轮廓、领口、手套与裙边，记录可接受差异。','视觉验收对照图'],
['做运行与性能测试','在目标设备播放动作，检查 Bounds、阴影、透明排序、LOD 切换和附件。用 Profiler 记录帧耗时、绘制与内存；当前高精度头饰需要根据设备预算做优化。','目标设备性能记录'],
['整理并复验交付包','将源模型、贴图、Rig、动画、Prefab、参考图、版本说明和问题清单归档。在干净工程中重新导入或按约定方式复现，检查缺失引用，最后完成全站交付清单。','可复现最终交付包']
],notes:['网页和 Blender 渲染不是 Unity 项目截图，不能代替引擎验收。','启用 Optimize Game Objects 时须确认需暴露的挂点，并重新验证换装。','减少面数、材质或贴图后也需复查画质与动画，不能只看 Profiler 数值。','如果还有未解决的视觉或性能问题，要随包注明，不以“文件可打开”代表完成。'],checks:['模型、贴图和动画导入设置及警告已检查。','Prefab 引用完整，附件与换装逻辑按需求验证。','固定视角的设计对照与动作测试已完成。','LOD、Bounds、透明和性能在目标设备达到约定。','干净工程可复现，交付目录、版本和问题说明齐全。'],deliver:'模型与贴图、Rig / 动画、Unity Prefab 与依赖、性能报告、验收截图、版本说明。'}
];
const STEP_IMAGES=[
['real/tools-detail','design/full','real/design','design/dress-front','real/modular-detail','design/full'],
['real/clay','design/hair-front','design/hair-back','real/md-cloth-simulation','design/ornament-front','real/sculpt'],
['real/modular-detail','real/topology','design/dress-back','design/ornament-front','real/seam-detail','real/topology-board'],
['real/materials','real/uv-layout','real/uv-layout','real/bake','real/bake','real/front'],
['design/full','design/dress-front','real/materials','design/ornament-front','real/materials','real/front'],
['real/skeleton','real/rig','real/head','real/rig','real/front','real/rig'],
['real/pipeline-detail','real/unity','real/modular-detail','design/full','real/topology-board','real/pipeline-detail']
];
const TECH_LABELS={'tools-detail':'工具与交付对照','design':'本角色参考板','modular-detail':'实际模块与制作规划','clay':'现有 FBX 白模参考','sculpt':'形体制作参考图板','topology':'实际 FBX 三角边参考','seam-detail':'接口制作参考','md-cloth-simulation':'MD 布料模拟示意图（生成参考图）','topology-board':'当前模型拓扑与预算参考','materials':'材质制作参考图板','uv-layout':'实际 UV 布局（未自动验收）','bake':'烘焙流程参考（非实测结果）','front':'实际 FBX 正面','skeleton':'实际骨架参考','rig':'绑定与动作检查参考','head':'实际头部与头饰','pipeline-detail':'制作交付流程','unity':'Unity 验收流程（非引擎截图）'};
window.renderProductionManual=i=>{const m=PRODUCTION_MANUAL[i],refs=DESIGN_STEPS[i].ids;return `<section class="manual-section" id="make"><h3>01 / 怎么制作</h3><p class="manual-intro">按顺序执行，每一步保留对应产物，方便复查与交接。</p><ol class="production-steps">${m.steps.map(([title,body,out],j)=>{const path=STEP_IMAGES[i][j],id=path.split('/')[1],ref=DESIGN_REFS.find(r=>r[0]===id),label=path.startsWith('design/')?ref[1]:TECH_LABELS[id];return `<li><span class="production-number">${String(j+1).padStart(2,'0')}</span><div><h4>${title}</h4><p>${body}</p><p class="step-output"><b>本步产物：</b>${out}</p></div><figure class="source-figure step-reference"><img src="assets/${path}.webp" alt="${label}" loading="lazy"><figcaption>${label} · 点击放大</figcaption></figure></li>`;}).join('')}</ol><details class="reference-library"><summary>展开本阶段全部参考图（${refs.length} 张）</summary><div class="reference-grid">${refs.map(id=>{const r=DESIGN_REFS.find(x=>x[0]===id);return `<figure class="source-figure reference-card"><img src="assets/design/${id}.webp" alt="${r[1]}：${r[2]}" loading="lazy"><figcaption>${r[1]} · ${r[2]}</figcaption></figure>`;}).join('')}</div></details><details class="technical-board"><summary>查看实际模型与技术图板</summary><figure class="guide-figure"><img src="${STAGES[i].image}" alt="${STAGES[i].caption}"><figcaption>${STAGES[i].caption}</figcaption></figure></details></section><section class="manual-section" id="cautions"><h3>02 / 制作注意点</h3><ul class="production-notes">${m.notes.map(n=>`<li>${n}</li>`).join('')}</ul><p class="notice">${STAGES[i].note}</p></section><section class="manual-section" id="stage-check"><h3>03 / 交付自检</h3><p>这是人工自检记录，勾选不代表网站自动检测通过。</p><p class="stage-check-count" aria-live="polite"></p>${m.checks.map((c,j)=>`<label class="check-item"><input type="checkbox" data-stage-check="${i}-${j}"><span>${c}</span></label>`).join('')}<div class="gate-box"><b>应交付的文件与证据</b><p>${m.deliver}</p><b>${STAGES[i].gate}</b><p>${STAGES[i].pass}</p></div><button class="export-stage-checks" data-export-stage="${i}">导出本阶段自检记录</button><details class="chapter-links"><summary>查阅本阶段原文</summary><div class="related">${STAGES[i].chapters.map(id=>`<button data-chapter="${id}">原文 ${String(id).padStart(2,'0')} · ${CHAPTERS.find(c=>c.id===id).title}</button>`).join('')}</div></details></section>`;};
(()=>{let saved={};try{saved=JSON.parse(localStorage.getItem('stage-checks-v9')||'{}')||{};}catch(e){}function update(){const inputs=[...document.querySelectorAll('[data-stage-check]')];inputs.forEach(el=>el.checked=!!saved[el.dataset.stageCheck]);const count=document.querySelector('.stage-check-count');if(count)count.textContent=`${inputs.filter(e=>e.checked).length} / ${inputs.length} 项已人工检查`;}
window.addEventListener('stage-rendered',update);document.addEventListener('change',e=>{if(!e.target.matches('[data-stage-check]'))return;saved[e.target.dataset.stageCheck]=e.target.checked;try{localStorage.setItem('stage-checks-v9',JSON.stringify(saved));}catch(e){window.notifyUser('浏览器未允许保存，请导出自检记录');}update();});document.addEventListener('click',e=>{const b=e.target.closest('[data-export-stage]');if(!b)return;const i=Number(b.dataset.exportStage),m=PRODUCTION_MANUAL[i],txt=`# ${STAGES[i].name} · 人工交付自检\n\n导出时间：${new Date().toLocaleString('zh-CN')}\n勾选仅表示人工记录，不代表自动模型验收。\n\n`+m.checks.map((c,j)=>`- [${saved[i+'-'+j]?'x':' '}] ${c}`).join('\n')+'\n\n交付内容：'+m.deliver;const url=URL.createObjectURL(new Blob(['\ufeff'+txt],{type:'text/markdown;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`阶段${i+1}_交付自检.md`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});})();
