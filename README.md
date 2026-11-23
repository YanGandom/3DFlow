# 角色工坊 · 游戏角色制作手册

根据完整角色设计与真实模型整理的中文制作手册，覆盖设计、雕刻、拓扑、UV/烘焙、材质、绑定动画和 Unity 交付。

当前版本 **v18 Web**，以用户周末优化的 v17 完整项目为基础。保留阶段总览图、可选 MD 制作说明和此前模型修复，修正 MD 配图位置。包含 21 章原文、7 阶段实操、自检清单与可交互角色展示。

## 本地预览

安装 Python 3，在仓库根目录运行：

```sh
python scripts/preview.py
```

打开 http://127.0.0.1:8766/ 。也可用 VS Code Live Server 打开 public/index.html。此发布版通过 HTTP 加载 GLB，不支持直接双击 HTML；原完整项目仍保留离线版。

## 上传 GitHub 并发布网站

详细步骤见 [部署说明](docs/部署说明.md)。无 npm 依赖、无构建步骤，网站目录为 `public/`。
GitHub Pages 工作流已配置；仓库 Settings → Pages → Source 选择 **GitHub Actions**，推送 main 分支后执行部署。

模型约 45.6 MB，超过 GitHub 浏览器单文件上传限制，请用 GitHub Desktop 或 Git 命令推送整个项目；没有使用 Git LFS。
只部署 public/，不会把原始 FBX、Blender 工程、旧电脑路径或交接资料作为网页资源发布。

## 开发位置

- public/index.html、style.css：页面与样式。
- public/app.js、navigation-v8.js、manual-v9.js：手册与交互。文件名版本是历史名称，不影响当前 v18。
- public/model-fbx.js、model-info.js：查看器与模型元数据。
- public/models/bridgerton-003.glb：最终修正版模型。
- public/assets：设计图、技术图板和本地 Three.js。
- docs/版本对比.md：周末改动与发布整理结果。

模型包含 539735 三角面、36 骨骼、13 动作。未进行几何简化，低性能设备仍可能较慢。动画选择后播放；绑定姿势停止；灯泡按钮调光，旋转模型时光源保持固定。

## 素材与许可

Three.js 许可证随 assets/vendor/THREE-LICENSE.txt 提供。角色设计、模型与正文素材由项目用户提供，本仓库未额外授予第三方再分发许可。发布网站前由素材所有者确认公开范围。网页资源可被访问者下载。
