import { anthropicClient } from '@/lib/anthropic';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const POST = async () => {
  const stream = anthropicClient.messages
    .stream({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content:
            'Write a 3-sentence story about a cat and a dog playing together.',
        },
      ],
    })
    .on('text', (text) => console.log(text));

  const final = await stream.finalMessage();
  console.log({ msg: 'final message', final });

  return NextResponse.json({
    message:
      final.type === 'message'
        ? final.content[0].type === 'text'
          ? final.content[0].text
          : 'No message'
        : 'No message',
  });
};
