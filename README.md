# gitwise

**AI-powered Git workflow CLI** — generate commit messages, PR descriptions, changelogs, and code review summaries directly from your terminal, powered by OpenAI.

[![npm version](https://badge.fury.io/js/git-wise.svg)](https://www.npmjs.com/package/git-wise)
[![npm downloads](https://img.shields.io/npm/dm/git-wise.svg)](https://www.npmjs.com/package/git-wise)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yoga1948yoga-png/git-wise?style=social)](https://github.com/yoga1948yoga-png/git-wise)

---

## Why gitwise?

Writing good commit messages, PR descriptions, and changelogs takes time and mental energy. `gitwise` reads your actual code changes and generates precise, professional content — so you can focus on shipping.

## Features

| Command | What it does |
|---|---|
| `gitwise commit` | Reads staged diff → generates a [Conventional Commits](https://www.conventionalcommits.org/) message → confirms before committing |
| `gitwise pr` | Reads branch diff → generates PR title + full description in Markdown |
| `gitwise changelog` | Reads recent git log → generates a categorized CHANGELOG |
| `gitwise review` | Reads diff → outputs bugs, security risks, and performance notes |

## Installation

```bash
# Install globally
npm install -g gitwise

# Or run without installing
npx gitwise <command>
```

**Requirements:** Node.js ≥ 16, git installed

## Setup

Set your OpenAI API key:

```bash
export OPENAI_API_KEY="sk-..."
```

Add this to your `~/.bashrc` or `~/.zshrc` to persist it.

## Usage

### Generate a commit message

```bash
git add .
gitwise commit
```

gitwise will show you the generated message, then ask: **Confirm**, **Edit**, or **Cancel**.

```bash
# Use a specific model
gitwise commit --model gpt-4o
```

### Generate a PR description

```bash
gitwise pr
# Compare against a specific base branch
gitwise pr --base develop
```

Outputs a Markdown PR description ready to paste into GitHub.

### Generate a CHANGELOG

```bash
gitwise changelog --version-name v1.2.0
# Customize how many commits to include
gitwise changelog --version-name v1.2.0 --number 30
```

### Code review

```bash
# Review staged changes
gitwise review

# Review changes against a branch
gitwise review --base main
```

## Options

| Flag | Default | Description |
|---|---|---|
| `--model, -m` | `gpt-4o-mini` | OpenAI model to use |
| `pr --base, -b` | `main` | Base branch for diff |
| `changelog --version-name, -v` | required | Version label for changelog |
| `changelog --number, -n` | `50` | Number of commits to analyze |
| `review --base, -b` | _(staged)_ | Base branch for review diff |

## Contributing

Issues and PRs are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © [gitwise contributors](LICENSE)
