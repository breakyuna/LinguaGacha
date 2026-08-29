<div align=center><img src="https://github.com/user-attachments/assets/cdf990fb-cf03-4370-a402-844f87b2fab8" width="256px;"></div>
<div align=center><img src="https://img.shields.io/github/v/release/neavo/LinguaGacha"/>   <img src="https://img.shields.io/github/license/neavo/LinguaGacha"/>   <img src="https://img.shields.io/github/stars/neavo/LinguaGacha"/></div>
<p align='center'>使用 AI 能力一键翻译 小说、游戏、字幕 等文本内容的次世代文本翻译器</p>

## README 🌍
- [ [中文](./README.md) ] | [ [English](./README_EN.md) ] | [ [日本語](./README_JA.md) ]

## 概述 📢
- [LinguaGacha](https://github.com/neavo/LinguaGacha) (/ˈlɪŋɡwə ˈɡɑːtʃə/)，使用 AI 技术次世代文本翻译器
- 开箱即用，（几乎）无需设置，功能的强大，不需要通过繁琐的设置来体现
- 支持 `中` `英` `日` `韩` `俄` `德` `法` `意` 等 16 种语言的一键互译
- 支持 `字幕`、`电子书`、`游戏文本` 等多种文本类型与文本格式
- 支持 `OpenAI` `Google` `Anthropic` `SakuraLLM` 等各种本地或在线接口

> <img width="2562" height="1602" alt="01" src="https://github.com/user-attachments/assets/9ab0ef8f-136b-4b45-9640-d16b451acde7" />

> <img width="2570" height="1605" alt="02" src="https://github.com/user-attachments/assets/7f6d6556-d6b2-4fb1-b509-2d8272814290" />

## 如何运行 🚀

从 [发布页](https://github.com/neavo/LinguaGacha/releases) 下载适合您平台的版本即可直接运行，也支持在手机端借助 Termux 进行运行。

### Windows
- 根据 CPU 类型下载 `*_Windows_x64.zip` 或 `*_Windows_arm64.zip`
- 解压后双击 `app.exe` 启动即可

### macOS
- 根据 CPU 类型下载 `*_macOS_x64.dmg` 或 `*_macOS_arm64.dmg`
- 拖拽到应用程序文件夹，**先不要启动**
- 打开终端输入 `sudo xattr -rd com.apple.quarantine /Applications/LinguaGacha.app` 然后回车
- 输入系统密码，关闭终端，现在可以正常运行了

### Linux
- 根据 CPU 类型下载 `*_Linux_x64.AppImage` 或 `*_Linux_arm64.AppImage`
- 添加执行权限：`chmod +x LinguaGacha*.AppImage`
- 运行：`./LinguaGacha*.AppImage`

### Android (Termux)
得益于基于 Web 的架构，您可以直接在 Android 设备的 Termux 中运行 LinguaGacha 服务，并在手机浏览器中使用：
1. 从 F-Droid 下载并安装 [Termux](https://f-droid.org/packages/com.termux/)。
2. 打开 Termux 并安装必要的依赖（Node.js 与 Git）：
   ```bash
   pkg update && pkg upgrade
   pkg install git nodejs
   ```
3. 克隆本项目代码并进入目录：
   ```bash
   git clone https://github.com/neavo/LinguaGacha.git
   cd LinguaGacha
   ```
4. 安装依赖并启动开发服务器：
   ```bash
   npm install
   npm run dev
   ```
5. 启动完成后，在手机浏览器中访问终端输出的本地地址（通常是 `http://127.0.0.1:5173`）即可使用。

## 特别说明 ⚠️
- 如您在翻译过程中使用了 [LinguaGacha](https://github.com/neavo/LinguaGacha) ，请在作品信息或发布页面的显要位置进行说明！
- 如您的项目涉及任何商业行为或者商业收益，在使用 [LinguaGacha](https://github.com/neavo/LinguaGacha) 前，请先与作者联系以获得授权！

## 功能优势 📌
- 内置 `AGENT` 模式，通过对话自动完成各种任务　`👈👈 独家绝技`
- 极快的翻译速度，十秒钟一份字幕，一分钟一本小说，五分钟一部游戏
- 一键生成术语表，保证角色姓名等专有名词在整部作品中的译名统一
- 最优的翻译质量，无论是 旗舰模型 `诸如 DeepSeek-R1` 还是 本地小模型　`诸如 Qwen2.5-7B`
- 同类应用中最强的样式与代码保留能力，显著减少后期工作量，是制作内嵌汉化的最佳选择
  - `.md` `.ass` `.epub` 格式几乎可以保留所有原有样式
  - 大部分的 `WOLF`、`RenPy`、`RPGMaker`、`Kirikiri` 引擎游戏无需人工处理，即翻即玩

## 使用教程 📝
- 综合
  - [基础教程](https://github.com/neavo/LinguaGacha/wiki/BasicTutorial)　`👈👈 手把手教学，有手就行，新手必看`
  - [高质量翻译 WOLF 引擎游戏的最佳实践](https://github.com/neavo/LinguaGacha/wiki/BestPracticeForWOLF)
  - [高质量翻译 RenPy 引擎游戏的最佳实践](https://github.com/neavo/LinguaGacha/wiki/BestPracticeForRenPy)
  - [高质量翻译 RPGMaker 系列引擎游戏的最佳实践](https://github.com/neavo/LinguaGacha/wiki/BestPracticeForRPGMaker)
- 视频教程
  - [How to Translate RPGMV with LinguaGacha and Translator++ (English)](https://www.youtube.com/watch?v=wtV_IODzi8I)
- 功能说明
  - [命令行模式](https://github.com/neavo/LinguaGacha/wiki/CLIMode)
  - [术语表](https://github.com/neavo/LinguaGacha/wiki/Glossary)　　[文本保护](https://github.com/neavo/LinguaGacha/wiki/TextPreserve)　　[文本替换](https://github.com/neavo/LinguaGacha/wiki/Replacement)　　
  - [MTool 优化器](https://github.com/neavo/LinguaGacha/wiki/MToolOptimizer)　　[百宝箱 - 繁简转换](https://github.com/neavo/LinguaGacha/wiki/TSConversion)
- 你可以在 [Wiki](https://github.com/neavo/LinguaGacha/wiki) 找到各项功能的更详细介绍，也欢迎在 [讨论区](https://github.com/neavo/LinguaGacha/discussions) 投稿你的使用心得

## 文本格式 🏷️
- 字幕（.srt .ass）
- 电子书（.txt .epub）
- Markdown（.md）
- [RenPy](https://www.renpy.org) 导出游戏文本（.rpy）
- [MTool](https://mtool.app) 导出游戏文本（.json）
- [SExtractor](https://github.com/satan53x/SExtractor) 导出游戏文本（.txt .json .xlsx）
- [VNTextPatch](https://github.com/arcusmaximus/VNTranslationTools) 导出游戏文本（.json）
- [Translator++](https://dreamsavior.net/translator-plusplus) 项目文件（.trans）
- [Translator++](https://dreamsavior.net/translator-plusplus) 导出游戏文本（.xlsx）
- [WOLF 官方翻译工具](https://silversecond.booth.pm/items/5151747) 导出游戏文本（.xlsx）
- 具体示例可见 [Wiki - 支持的文件格式](https://github.com/neavo/LinguaGacha/wiki/%E6%94%AF%E6%8C%81%E7%9A%84%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F)，更多格式将持续添加，你也可以在 [ISSUES](https://github.com/neavo/LinguaGacha/issues) 中提出你的需求

## 近期更新 📅
- 20260827 v0.117.1
  - 调整与改进 [#808](https://github.com/neavo/LinguaGacha/issues/808) [#810](https://github.com/neavo/LinguaGacha/issues/810) [#811](https://github.com/neavo/LinguaGacha/issues/811) [#812](https://github.com/neavo/LinguaGacha/issues/812) [#814](https://github.com/neavo/LinguaGacha/issues/814) [#815](https://github.com/neavo/LinguaGacha/issues/815) [#817](https://github.com/neavo/LinguaGacha/issues/817)

- 20260825 v0.117.0
  - `AGENT` - 自动写入审批 [#806](https://github.com/neavo/LinguaGacha/issues/806)
  - 调整与改进 [#795](https://github.com/neavo/LinguaGacha/issues/795) [#797](https://github.com/neavo/LinguaGacha/issues/797) [#801](https://github.com/neavo/LinguaGacha/issues/801) [#804](https://github.com/neavo/LinguaGacha/issues/804)

## 开发指南 🛠️
- 安装 [ [Go](https://go.dev) ] 和 [ [`Node.js`](https://nodejs.org) ]，然后 `npm install`
- 更新依赖 `npm ci`
- 运行应用 `npm run dev`
- 提交 PR 前请根据改动范围执行 [`docs/WORKFLOW.md`](./docs/WORKFLOW.md) 中的对应验证
- 非开发者请直接在 [发布页](https://github.com/neavo/LinguaGacha/releases) 下载打包版本

## 问题反馈 😥
- 运行时的日志保存在应用根目录下的 `log` 等文件夹
- 反馈问题的时候请附上这些日志文件
- 你也可以来群组讨论与反馈
  - QQ - 41763231⑥
  - Discord - https://discord.gg/pyMRBGse75
