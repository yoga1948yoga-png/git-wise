import chalk from 'chalk';
import ora from 'ora';
import { getStagedDiff, getBranchDiff } from '../git/utils';
import { complete } from '../ai/client';
import { buildReviewPrompt } from '../ai/prompts';

export default async function reviewCmd(options: { base?: string, model: string }) {
  let diff = '';

  if (options.base) {
    diff = getBranchDiff(options.base);
    if (!diff) {
      console.log(chalk.yellow(`提示：当前分支与 ${options.base} 相比没有差异。`));
      return;
    }
  } else {
    diff = getStagedDiff();
    if (!diff) {
      console.log(chalk.yellow('提示：当前没有已暂存 (staged) 的变更。若要对比分支，请使用 -b <branch>。'));
      return;
    }
  }

  const spinner = ora('正在生成代码审查摘要...').start();

  try {
    const prompt = buildReviewPrompt(diff);
    const review = await complete(prompt, options.model);
    spinner.succeed('代码审查完成！\n');

    console.log(chalk.green(review));
  } catch (err) {
    spinner.fail('生成代码审查摘要失败');
  }
}
