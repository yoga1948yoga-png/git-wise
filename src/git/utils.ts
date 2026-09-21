import { execSync } from 'child_process';

/**
 * Runs a git command and returns its output as a string.
 */
function runGitCmd(args: string): string {
  try {
    return execSync(`git ${args}`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (error) {
    return '';
  }
}

/**
 * 获取 staged 变更
 */
export function getStagedDiff(): string {
  return runGitCmd('diff --cached');
}

/**
 * 获取当前 branch 与 base 的 diff
 */
export function getBranchDiff(baseBranch: string): string {
  const current = getCurrentBranch();
  // using triple dot to get diff from merge base
  return runGitCmd(`diff ${baseBranch}...${current}`);
}

/**
 * 获取最近 n 条 commit log
 */
export function getRecentCommits(n: number): string {
  return runGitCmd(`log -n ${n} --oneline --no-decorate`);
}

/**
 * 获取当前分支名
 */
export function getCurrentBranch(): string {
  return runGitCmd('branch --show-current');
}

/**
 * 从 git remote 获取仓库名
 */
export function getRepoName(): string {
  const remoteUrl = runGitCmd('config --get remote.origin.url');
  if (!remoteUrl) return 'unknown-repo';
  // handle git@github.com:user/repo.git or https://github.com/user/repo.git
  const match = remoteUrl.match(/([^\/:]+\/[^\/:]+)\.git$/);
  if (match) {
    return match[1];
  }
  return 'unknown-repo';
}
