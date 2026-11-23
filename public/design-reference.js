/* User-supplied design references and practical production notes. */
(()=>{
const refs=[
['full','完整角色设计','整体比例、帝政高腰线、紫罗兰配色与花饰位置。'],
['hair-front','无发饰头部 · 正面','中分发际线、额前波浪、两侧螺旋发束与脸部比例。'],
['hair-side','无发饰头部 · 侧面','头顶高度、后脑体积、低盘发位置及耳前卷发。'],
['hair-back','无发饰头部 · 背面','发束汇聚方向、交叠层次与后颈发髻轮廓。'],
['dress-front','礼裙 · Front','方领、泡泡袖、高腰花带、手套长度与裙摆宽度。'],
['dress-back','礼裙 · Back','后领深度、后腰连续性与背部裙褶分布。'],
['dress-left','礼裙 · Left（按文件名）','侧面胸背厚度、腰线与裙摆前后体积。'],
['dress-right','礼裙 · Right（按文件名）','另一侧轮廓与袖窿空间；避免只从正面塑形。'],
['ornament-front','头饰 · 前视图','非对称大玫瑰、双排珍珠与小花的排列。'],
['ornament-back','头饰 · 后视图','弧形底箍、内侧接触面与两端收口。'],
['ornament-left-file','头饰 · 图内“右视图”','原文件 faqia-Left.webp；文件名与图内方向相反。'],
['ornament-right-file','头饰 · 图内“左视图”','原文件 faqia-Right.webp；文件名与图内方向相反。']
];
const stages=[
{title:'先把设计图变成可执行的建模参考',ids:refs.map(r=>r[0]),steps:[
['确定整体基准','以完整角色图确认视觉目标：头身比例、高腰位置、裙摆外轮廓、发髻与花饰的关系。先在参考板上标出头顶、下巴、肩、腰线与地面，角色身高由项目约定，不能从图片推断真实尺寸。'],
['分成三个制作组','头部/发型使用无发饰正、侧、背图；礼裙使用 Front、Back、Left、Right；头饰使用 faqia 四张图。完整图用于最终装配对照，不用它替代被遮挡部件的结构参考。'],
['建立 Maya 参考平面','在对应正交视口通过 View → Image Plane → Import Image 导入正、背和侧图，保持图片纵横比，以共同地面、中心线和关键高度做等比缩放及平移。把参考放到独立显示层并锁定，避免选中移动。头部图另按下巴、眼线和耳位对齐。'],
['先处理视图冲突','这些图有渲染光影与透视，不是严格工程正投影。不同视图不一致时先定主参考、记录差异，再在三维中协调轮廓，不拉伸图片硬对齐。头饰按图内方向展示，制作前再用大玫瑰所在侧与完整图确认佩戴方向。']
],out:'产出：分组参考板、比例基准、方向约定和视图差异记录。检查：正侧背共同高度一致，头饰大花没有因文件名而被镜像。'},
{title:'用部件多视图建立体块，再雕刻细节',ids:['full','hair-front','hair-side','hair-back','dress-front','dress-back','dress-left','dress-right','ornament-front','ornament-back','ornament-left-file','ornament-right-file'],steps:[
['头部与盘发','在 Maya 建头部和发型大体块，ZBrush 中将头、发帽、主发束和发髻分为 SubTool。正面控制中分与额前弧线，侧面控制颅顶和后脑厚度，背面控制发束汇入发髻的路径；先建立大束交叠，再加沟槽。螺旋发丝先用曲线定义弯曲路径与逐渐变细的截面。'],
['礼裙与袖子','先用低分段网格做胸衣、泡泡袖和高腰长裙。正背图校准领口与花带高度，双侧图核对胸背、袖窿和裙摆体积。确定重力方向与褶皱受力点后再雕刻；把主褶、细褶和刺绣分开处理。'],
['头饰与花朵','用曲线或条带建立底箍，前后图控制开口和弧度，两侧图控制厚度与玫瑰凸出量。珍珠沿弧线排列，大花、小花和叶片分组；大玫瑰具有非对称位置，不能整件镜像复制。'],
['合体检查','将头饰套到发型上，检查耳侧收口、发束遮挡和头箍悬空。用完整设计图核对整体识别特征；旋转三维模型检查图片未展示的过渡区域。不要把渲染高光或阴影直接雕成几何凹凸。']
],out:'产出：分层高模与正侧背灰模截图。检查：去掉纹理仍能读出发型、泡泡袖、高腰和裙摆轮廓。'},
{title:'依据轮廓和动作需求决定拓扑与拆分',ids:['hair-side','hair-back','dress-front','dress-back','ornament-front','ornament-back'],steps:[
['规划边界','以发际线、袖口、领口和头箍内侧等位置规划接缝。制作规划可拆为身体、礼裙、发型、头饰；当前导入 FBX 实际只有角色主网格和独立头饰，设计图的部件拆分不等于现有网格已经拆好。'],
['重新布线','在 Maya 用高模作为 Live Surface，通过 Quad Draw 重拓扑。领口、袖窿、肩肘和裙摆为变形预留环线；发髻外轮廓与玫瑰花瓣边缘保留必要面数，平坦刺绣优先交给烘焙。'],
['处理细发与配饰','近景主卷发保留几何轮廓；细碎发可按目标平台选择发片。头饰单独评估 LOD，当前头饰有 50 万三角面，不能把设计细节丰富理解为必须保留全部高模面数。'],
['对照验收','在相同观察角度对照高模与参考图，先看外轮廓和负空间，再看线流。转肩、抬臂和迈步检查袖子、腋下和裙子，图片只能指导外观，不能证明拓扑或蒙皮合格。']
],out:'产出：低模部件、LOD 计划、接缝与共享骨架约定。检查：轮廓保真，接口隐藏，动作区域有足够支撑。'},
{title:'把设计细节转成 UV 与烘焙任务',ids:['hair-back','dress-front','dress-back','ornament-front','ornament-right-file'],steps:[
['安排 UV 接缝','裙装沿侧缝或后侧隐蔽区域展开，保证纵向花枝和花带衔接；头发 UV 顺主要发束走向；头饰将底箍、花瓣与珍珠分组。设计图用于确认连续图案的位置，不直接当 UV 图集。'],
['分配像素密度','按游戏镜头分配面部、玫瑰、袖口和裙边的密度，以棋盘格检查拉伸。非对称花饰和不重复刺绣不要盲目镜像重叠 UV。'],
['分组烘焙','高低模对应命名，按部件隔离投射，先烘法线与 AO，再检查花瓣夹层、珍珠间隙和发束交叠。调 cage 距离，防止头饰烘到头发、裙装烘到身体。'],
['回到最终网格验证','使用确定的三角化结果和与 Unity 一致的切线空间检查法线接缝。对照花朵大小、发束方向和裙摆层次；缺失轮廓应补几何，不能靠法线贴图补救。']
],out:'产出：UV 图集、烘焙贴图与问题记录。检查：花带不断裂、法线无投射串色、图案没有明显拉伸。'},
{title:'用参考图确定材质层次，而不是复制灯光',ids:['full','hair-front','dress-front','dress-back','ornament-front','ornament-back'],steps:[
['拆分材质目标','从完整图确定红棕发色、紫罗兰纱裙、浅色手套和粉色花饰的配色关系。分别建立头发、皮肤、纱布、刺绣、珍珠、花瓣与底箍的材质区域；区域数量按实际 Shader 和性能预算决定。'],
['制作基础色','参考图中的亮斑、投影与环境色属于渲染效果，不能直接作为 Base Color。依据无强光区域建立底色，再绘制雀斑、花纹和色差；不把肖像直接贴到未匹配的 UV 上。'],
['区分表面响应','用粗糙度表现手套、纱裙和珍珠差异，普通珍珠、花瓣、布料按非金属处理。金属度只用于确为金属的底箍等区域。薄纱先验证目标 Unity 渲染管线支持的透明方式，再检查排序与背面。'],
['中性光下比较','用固定曝光与中性灯光看正侧背，再回到最终场景检查。对照大花位置、刺绣疏密和盘发层次，避免为了接近参考图灯光而把材质涂得过亮或过暗。']
],out:'产出：分层材质、贴图与 Unity Shader 对应表。检查：换灯光后仍有正确配色与材质区别。'},
{title:'把部件设计转成绑定和动画检查项',ids:['full','hair-side','dress-left','dress-right','ornament-back'],steps:[
['定义运动方式','身体与礼裙按实际需要蒙皮；当前头饰采用 Head 骨骼刚性挂接。盘发主块通常随头部运动，耳前长卷发是否增加辅助骨骼或动力学由镜头与项目需求决定。'],
['测试衣服空间','用礼裙两侧图确认静止时胸背、袖窿和裙摆空间，再播放走路、跑步、抬臂、转身和下蹲。重点检查手套肘弯、泡泡袖塌陷、腿穿裙和高腰花带拉伸。'],
['测试头饰接触','对照头饰后视图的底箍位置，播放点头与转头，检查其是否跟随头部，以及玫瑰、珍珠与发丝是否穿插。参考图只提供静态佩戴关系，极限角度必须在模型上实测。'],
['网页快速复核','在模型实验室选择待机、走路或跑步，结合骨架模式观察，暂停后旋转查看局部。当前已有 13 个可播放动作；通过播放检查不代表所有服装穿插都已修复。']
],out:'产出：绑定模型与逐动作问题清单。检查：头饰不漂浮，袖口和裙摆在目标动作范围内可接受。'},
{title:'在 Unity 中用原始设计完成最终对照',ids:['full','hair-front','hair-back','dress-front','dress-back','ornament-front'],steps:[
['搭建对照场景','按约定单位导入模型，设置固定相机、光照和曝光。分别拍正面、背面与侧面截图，与对应设计图并排；尽量匹配投影方式，避免把相机透视差当成模型错误。'],
['检查装配','确认头饰挂接位置、材质引用、动画控制器和骨架映射；裙装、头部和手套的接缝在目标游戏距离不能突兀。整体以完整设计图检查识别度，局部以部件图定位问题。'],
['检查目标设备','逐级查看 LOD 下的花瓣、卷发、珍珠和裙边。测量绘制开销、贴图显存与透明层叠；本模型头饰面数高，应在发布前完成适合目标平台的优化。'],
['保存可复查结果','把这 12 张参考图、左右方向说明、最终模型截图、动作问题记录和资源版本一同归档。参考图用于人工外观验收，性能与绑定结果另以引擎测试记录为准。']
],out:'产出：Prefab、目标设备测试记录与参考对照图。检查：造型、材质、装配和性能都有可复查的依据。'}
];
window.DESIGN_REFS=refs;window.DESIGN_STEPS=stages;window.renderDesignReferences=i=>{const s=stages[i];return `<section class="design-reference"><div class="eyebrow">本角色实操 · 用户提供设计图</div><h3>${s.title}</h3><p>以下为结合本角色新增的操作指南，不属于原文。点击图片可放大查看。</p>${i===0?'<div class="notice">方向核对：faqia-Left.webp 图内写“右视图”，faqia-Right.webp 图内写“左视图”。此处按图内标注展示并保留原文件名；最终佩戴侧需与完整角色图核对。多视图存在透视和细节差异，不能直接视作严格正交蓝图。</div>':''}<ol class="reference-steps">${s.steps.map(([t,b],j)=>{const ids=[['full','hair-back','dress-front','ornament-right-file'],['hair-side','dress-front','ornament-front','full'],['dress-back','hair-side','ornament-front','full'],['dress-back','hair-back','ornament-front','dress-front'],['full','hair-front','ornament-front','dress-front'],['ornament-back','dress-left','hair-side','full'],['full','ornament-front','hair-back','dress-back']];const ref=refs.find(r=>r[0]===ids[i][j]);return `<li><div class="step-copy"><h4>${t}</h4><p>${b}</p></div><figure class="source-figure step-reference"><img src="assets/design/${ref[0]}.webp" alt="${ref[1]}：${ref[2]}" loading="lazy"><figcaption>${ref[1]}</figcaption></figure></li>`;}).join('')}</ol><details class="reference-library"><summary>查看本阶段参考图（${s.ids.length} 张）</summary><div class="reference-grid">${s.ids.map(id=>{const r=refs.find(x=>x[0]===id);return `<figure class="source-figure reference-card"><img src="assets/design/${id}.webp" alt="${r[1]}：${r[2]}" loading="lazy" width="400" height="520"><figcaption><strong>${r[1]}</strong><span>${r[2]}</span></figcaption></figure>`;}).join('')}</div></details><div class="gate-box"><p>${s.out}</p></div></section>`;};
})();
