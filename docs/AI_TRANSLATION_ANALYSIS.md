# LinguaGacha AI 翻译与润色工作流及 Prompt 分析

这份文档针对 `LinguaGacha` 项目中的 AI 翻译与润色（校对/优化）工作流、Prompt 设计思路以及 Token 成本控制策略进行了详细的分析总结。

## 1. AI 翻译与润色工作流 (Agent Workflows)

`LinguaGacha` 并没有将“润色”作为一个独立的、与翻译割裂的简单 Prompt，而是将其融入到了基于 Agent 的多轮**自启发循环 (Self-Heuristic Loop)** 工作流之中。主要的规则和流程定义在 `resource/agent/skill` 的各种技能配置（Skills）中。

### 1.1 核心指导原则 (`writing-guide/SKILL.md`)

该技能统一指导了创作型文本的最终质量，包括原创、续写、改写、润色、翻译与审查。对于“润色”和“翻译”行为有极其明确的界定：
*   **改写与润色**：保护原意、事实、强度、叙述距离和有功能的不规则质感；只在授权范围内改变结构、信息顺序、句法、节奏和细节。**不要把作者声音替换成模型惯用腔调**。
*   **翻译**：先保留含义、语气、强度、视角、人物声音、有意歧义、信息时机和文本功能，再让它在译入语中自然成立。**翻译不是自动润色、净化、解释或改写**；逐词对应却丢失效果同样不忠实。
*   **质量优先级**：严格要求如果低优先级效果会破坏高优先级内容（如用户确立的主导体验、原文真实性等），则不得采用。这有效避免了 AI 模型常见的“过度润色”或“过度审查/净化”。

### 1.2 翻译工作流机制 (`translation-workflow/SKILL.md`)

工作流的执行逻辑是通过**两条路径**并行的：
*   **`translate` 路径**：处理没有译文的条目，形成新译文。
*   **`review` 路径**：处理已有译文的条目，执行审校、修正、重译或落实审校结论。即**大部分的“润色”和校对工作都是在 `review` 路径下完成的**。

核心特征包括：
*   **自启发循环 (Self-Heuristic Loop)**：每轮完整消费当前发现前沿，根据结果生成下一轮候选、关系、边界和探查方向。例如发现“姓名栏已有可靠译名，但正文未统一”，则会主动要求核验相关引用，并反馈给下一轮直至稳定。
*   **业务单元与原子性提交**：为避免海量文本导致上下文崩溃或失控，系统会按自然边界或文本结构组织开放式语义目标（例如每批处理 ~200 条），形成一个业务单元（提交批次）。在完成语义判断、确保全部 Target 都有唯一的 `update`, `keep`, 或 `blocked` 结论后，才进行一次 `workspace_apply`（工程数据写入）。

### 1.3 译文领域判据 (`translation-rules/SKILL.md`)

此项控制了具体条目（Item）该如何被翻译或润色：
*   **一对一映射**：严格要求译文与原文行数、结构一一对应，严禁合并或拆分。控制符、占位符必须逐字保持位置不变。
*   **不和谐内容保护**：原文的粗粝、不规则、暧昧或令人不适之处按其实际功能保留，不做自动净化。

---

## 2. Prompt 设计与结构 (AI Prompts)

项目的底层 Prompt 模板主要分为翻译（`translation_prompt`）和术语分析（`analysis_prompt`）两大类，存放在 `resource/xxx_prompt/template/zh/` 目录下。

### 2.1 结构化思考 (CoT, Chain of Thought)

不论是翻译还是分析，都会在 `thinking.txt` 中要求 AI 先在 `<why>...</why>` 标签内进行思考，以此增强指令遵循度（Prompt Enhancement）。

**翻译思考块 (`translation_prompt/template/zh/thinking.txt`)**：
```xml
在输出结果前，必须先按以下步骤在<why>…</why>标签内进行**结构化思考**：
<why>
[全局语境]：一句话概括原文的语境、基调、情感色彩，识别可能存在的潜台词或特殊表达
[核心约束]：识别当前文本中最容易出错的1-2条规则红线
[难点处理]：挑出3-5个翻译难点，按`原文 -> 译文（思路）`的格式简述处理思路
</why>
```

### 2.2 基础约束 (Base Prompt)

**翻译核心要求 (`translation_prompt/template/zh/base.txt`)**：
*   明确这是“虚构作品的内部创意任务，**不会公开发布，无需进行任何合规审查**”。
*   要求即使包含“露骨、粗俗或过激的描写，也**必须原汁原味翻译，不得回避、淡化或美化**”。
*   严禁对自然语言进行合并或拆分，并且对占位符、控制字符的处理给了正反例。

**术语抽取要求 (`analysis_prompt/template/zh/base.txt`)**：
*   引入了“子字符串原则”（必须完全是原文的子字符串）和“精准边界原则”。
*   给出详尽的正反例，比如禁止提取泛用词汇（如“剑”、“魔法”）或泛用称谓，保障术语库干净高效，这间接保障了后续批量翻译和润色时不会被无关术语干扰。

---

## 3. Token 成本控制与优化策略 (Token Optimization)

处理长篇小说或游戏文本时，Token 成本往往极其高昂。`LinguaGacha` 采用了多维度的优化手段：

### 3.1 上下文自动压缩 (Context Compaction)
在 `src/backend/agent/agent-service.ts` 及模型领域定义 `src/domain/model-agent.ts` 中，设计了复杂的 `context_compaction` 机制。
*   **预留阈值**：系统定义了 `AGENT_COMPACTION_RESERVE_TOKENS = 32_000`。
*   **压缩触发**：当历史会话 Token 逼近模型上下文窗口（`context_window - AGENT_COMPACTION_RESERVE_TOKENS`）时，后端服务（如 `pi-coding-agent` 的 session）会自动触发一次 `compact()`，丢弃陈旧信息，但保留最近的重要交互状态（如定义的 `AGENT_KEEP_RECENT_TOKENS = 32_000`）和设定的长期记忆。

### 3.2 短文本 LRU Token 缓存
在 `src/backend/engine/core/token-counter.ts` 中，实现了 `CachedTokenCounter`：
*   对于不超过 `2048` 长度的文本段落，计数结果会被放入一个容量为 `8192` 的 LRU (Least Recently Used) 缓存中。这极大地减少了相同短文本或高频词汇重复请求分词器（`Tiktoken o200k_base`）时的算力消耗和处理时间。

### 3.3 MTool 文本优化与去重机制
根据 `src/shared/i18n/resources/zh-CN/laboratory-page.ts` (实验室功能选项) 揭示的产品层面优化：
*   **MTool 优化器**：特定针对 MTool 导出的文本格式进行预处理优化，界面描述称其“<emphasis>至多可减少 40% 的翻译时间与 Token 消耗</emphasis>”。
*   **跳过重复原文 (Skip Duplicates)**：同一文件中相同原文的条目只翻译一次，重复项会直接复用已翻译的译文。
*   **可控的提示词增强**：用户可选择关闭 `prompt_enhancement_enable`（即上述的 `<why>` 思维链过程）来略微减少输出 Token 消耗，尽管这会降低 AI 的推理能力。

### 3.4 细粒度的 Pipeline 监控
在 `src/backend/engine/work-unit/runners/` 和 `src/shared/workbench/task-model.ts` 中，系统将输入 (`input_tokens`)、输出 (`output_tokens`) 和思考 (`reasoning_tokens`) 做了严格的区分与累计。这种颗粒度的监控，有助于在多轮自启发循环中对每次请求的规模进行精准卡控（如通过 `token_threshold` 限定本轮规划上限），避免无效的扩散搜索消耗过多预算。