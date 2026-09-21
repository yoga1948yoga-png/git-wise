import { Command } from 'commander';
import commitCmd from './commands/commit';
import prCmd from './commands/pr';
import changelogCmd from './commands/changelog';
import reviewCmd from './commands/review';

const program = new Command();

program
  .name('gitwise')
  .description('A CLI tool that uses OpenAI API to automate Git workflows')
  .version('1.0.0');

program
  .command('commit')
  .description('Generate a commit message based on staged changes')
  .option('-m, --model <model>', 'OpenAI model to use', 'gpt-4o-mini')
  .action(commitCmd);

program
  .command('pr')
  .description('Generate a PR description')
  .option('-b, --base <branch>', 'Base branch to compare against', 'main')
  .option('-m, --model <model>', 'OpenAI model to use', 'gpt-4o-mini')
  .action(prCmd);

program
  .command('changelog')
  .description('Generate a CHANGELOG from recent commits')
  .option('-v, --version-name <version>', 'Version name for the changelog', 'Unreleased')
  .option('-n, --number <number>', 'Number of recent commits to analyze', '50')
  .option('-m, --model <model>', 'OpenAI model to use', 'gpt-4o-mini')
  .action(changelogCmd);

program
  .command('review')
  .description('Generate a code review summary for changes')
  .option('-b, --base <branch>', 'Base branch to compare against (if omitted, uses staged diff)')
  .option('-m, --model <model>', 'OpenAI model to use', 'gpt-4o-mini')
  .action(reviewCmd);

program.parse(process.argv);
