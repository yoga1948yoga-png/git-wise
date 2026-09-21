export function buildCommitPrompt(diff: string): string {
  return `根据以下代码的 diff 变更，生成一个符合 Conventional Commits 规范的 Git 提交信息 (commit message)。
只返回最终的 commit message，不要包含其他多余的解释。

规范格式如下：
<type>(<scope>): <subject>
<空行>
<body>

常见 type 包括：feat, fix, docs, style, refactor, perf, test, chore。

变更内容 (diff)：
${diff.slice(0, 5000)}`;
}

export function buildPRPrompt(diff: string, branchName: string, repoName: string): string {
  return `你现在是一名资深开发人员。请根据以下代码变更，为一个 Pull Request 生成标题和描述（格式为 Markdown）。
只输出最终的 Markdown 文本，不要有任何包装或多余解释。

信息：
仓库名：${repoName}
分支名：${branchName}

变更内容 (diff)：
${diff.slice(0, 10000)}

要求：
1. 第一行作为标题，使用 # 标题 格式。
2. 描述部分应该包含：背景/动机、变更详情、如何测试。`;
}

export function buildChangelogPrompt(commits: string, version: string): string {
  return `根据以下最近的 Git commit 记录，为版本 ${version} 生成一份 Markdown 格式的 CHANGELOG 更新日志。
请按功能（Features）、修复（Bug Fixes）、性能优化（Performance Improvements）等分类整理。

commit 记录：
${commits}

只输出 Markdown 内容。不要有多余解释。`;
}

export function buildReviewPrompt(diff: string): string {
  return `你是一名资深的工程师和 Code Reviewer。请根据以下代码变更提供一份代码审查（Code Review）摘要。
重点关注：
1. 潜在的 Bug 或逻辑错误。
2. 代码可读性和可维护性问题。
3. 安全风险。
4. 性能问题。

如果不涉及上述问题，请简单总结变更并给出 LGTM（Looks Good To Me）。

变更内容 (diff)：
${diff.slice(0, 10000)}

请使用 Markdown 格式返回你的审查意见，直接输出内容即可。`;
}
