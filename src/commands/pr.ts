import chalk from 'chalk';
import ora from 'ora';
import { getBranchDiff, getCurrentBranch, getRepoName } from '../git/utils';
import { complete } from '../ai/client';
import { buildPRPrompt } from '../ai/prompts';

export default async function prCmd(options: { base: string, model: string }) {
  const diff = getBranchDiff(options.base);
  
  if (!diff) {
    console.log(chalk.yellow(`提示：当前分支与 ${options.base} 分支相比没有差异。`));
    return;
  }

  const branchName = getCurrentBranch();
  const repoName = getRepoName();

  const spinner = ora('正在生成 PR 描述...').start();

  try {
    const prompt = buildPRPrompt(diff, branchName, repoName);
    const prDescription = await complete(prompt, options.model);
    spinner.succeed('生成成功！\n');

    console.log(chalk.green(prDescription));
    console.log(chalk.yellow('\n提示：你可以将以上内容复制并粘贴到你的 PR 描述中。'));
    
  } catch (err) {
    spinner.fail('生成 PR 描述失败');
  }
}
