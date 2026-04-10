'use client';

import { BUILDER_PAGE_MODEL } from '@/lib/builder';
import { builder, BuilderComponent } from '@builder.io/react';
import type { BuilderContent } from '@builder.io/sdk';

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (apiKey) {
  builder.init(apiKey);
}

type Props = {
  content: BuilderContent | null;
};

export function BuilderPage({ content }: Props) {
  if (!apiKey) {
    return <p>Set NEXT_PUBLIC_BUILDER_API_KEY in .env.local</p>;
  }

  if (!content) {
    return <p>No Builder content for this URL. Create a page targeting “/” in Builder.</p>;
  }

  return <BuilderComponent model="page" content={content} />;
}
