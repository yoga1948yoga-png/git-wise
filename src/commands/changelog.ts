import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import { getRecentCommits } from '../git/utils';
import { complete } from '../ai/client';
import { buildChangelogPrompt } from '../ai/prompts';
import inquirer from 'inquirer';

export default async function changelogCmd(options: { versionName: string, number: string, model: string }) {
  const numCommits = parseInt(options.number, 10);
  if (isNaN(numCommits) || numCommits <= 0) {
    console.log(chalk.red('错误：-n, --number 参数必须是正整数。'));
    return;
  }

  const commits = getRecentCommits(numCommits);
  if (!commits) {
    console.log(chalk.yellow('提示：未找到任何提交记录。'));
    return;
  }

  const spinner = ora('正在生成 CHANGELOG...').start();

  try {
    const prompt = buildChangelogPrompt(commits, options.versionName);
    const changelog = await complete(prompt, options.model);
    spinner.succeed('生成成功！\n');

    console.log(chalk.green(changelog));
    console.log('\n');

    const { write } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'write',
        message: '是否将以上内容追加/写入到当前目录的 CHANGELOG.md 文件中？',
        default: false
      }
    ]);

    if (write) {
      let existingContent = '';
      if (fs.existsSync('CHANGELOG.md')) {
        existingContent = fs.readFileSync('CHANGELOG.md', 'utf-8');
      }
      fs.writeFileSync('CHANGELOG.md', changelog + '\n\n' + existingContent);
      console.log(chalk.green('✅ 已成功写入 CHANGELOG.md 文件！'));
    }

  } catch (err) {
    spinner.fail('生成 CHANGELOG 失败');
  }
}
