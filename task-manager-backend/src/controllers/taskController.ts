import { Request, Response } from 'express';
import openai from '../utils/openai';

export const suggestPriority = async (req: Request, res: Response) => {
  const { title, description, dueDate, workload } = req.body;

  const prompt = `
    You are a task prioritization assistant. Based on the following:
    Task: ${title}
    Description: ${description}
    Due Date: ${dueDate}
    Workload: ${workload}
    
    Suggest a priority: High, Medium, or Low.
  `;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const priority = response.data.choices[0].message?.content?.trim();
    res.json({ priority });
  } catch (error) {
    res.status(500).json({ error: 'OpenAI API error' });
  }
};
