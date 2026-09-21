import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { execSync } from 'child_process';
import { getStagedDiff } from '../git/utils';
import { complete } from '../ai/client';
import { buildCommitPrompt } from '../ai/prompts';

export default async function commitCmd(options: { model: string }) {
  const diff = getStagedDiff();

  if (!diff) {
    console.log(chalk.yellow('提示：当前没有已暂存 (staged) 的变更。请先运行 `git add`。'));
    return;
  }

  const spinner = ora('正在生成提交信息...').start();
  
  try {
    const prompt = buildCommitPrompt(diff);
    const message = await complete(prompt, options.model);
    spinner.succeed('生成成功！\n');
    
    console.log(chalk.green(message));
    console.log('\n');

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '请选择如何处理这个提交信息：',
        choices: [
          { name: '✅ 确认并提交 (Confirm & Commit)', value: 'commit' },
          { name: '✏️  编辑信息 (Edit)', value: 'edit' },
          { name: '❌ 取消 (Cancel)', value: 'cancel' }
        ]
      }
    ]);

    let finalMessage = message;

    if (action === 'edit') {
      const { editedMessage } = await inquirer.prompt([
        {
          type: 'editor',
          name: 'editedMessage',
          message: '请编辑您的提交信息',
          default: message
        }
      ]);
      finalMessage = editedMessage;
    } else if (action === 'cancel') {
      console.log(chalk.yellow('已取消提交。'));
      return;
    }

    if (finalMessage.trim() === '') {
      console.log(chalk.red('错误：提交信息不能为空。已取消提交。'));
      return;
    }

    // Execute git commit
    try {
      execSync(`git commit -m "${finalMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
      console.log(chalk.green('\n提交成功！'));
    } catch (err) {
      console.error(chalk.red('\n执行 git commit 时发生错误。'));
    }

  } catch (err) {
    spinner.fail('生成提交信息失败');
  }
}
