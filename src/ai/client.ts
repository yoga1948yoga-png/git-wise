import OpenAI from 'openai';
import chalk from 'chalk';

let openaiInstance: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error(chalk.red('错误：未找到 OPENAI_API_KEY 环境变量。'));
      console.error(chalk.yellow('请使用以下命令设置环境变量（或添加到您的 shell 配置文件中）：'));
      console.error(chalk.yellow('  export OPENAI_API_KEY="your_api_key_here"'));
      process.exit(1);
    }
    openaiInstance = new OpenAI({ apiKey });
  }
  return openaiInstance;
}

/**
 * 调用 OpenAI 获取补全内容
 */
export async function complete(prompt: string, model: string = 'gpt-4o-mini'): Promise<string> {
  const openai = getOpenAI();
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error: any) {
    console.error(chalk.red(`OpenAI API 调用失败: ${error.message}`));
    process.exit(1);
  }
}
