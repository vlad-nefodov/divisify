import '@/styles/_storybook.scss';

import type { Preview } from '@storybook/react';
import docsTemplate from './docsTemplate.mdx';

const preview: Preview = {
  parameters: {
    docs: {
      page: docsTemplate,
      source: {
        language: 'tsx'
      }
    },
    options: {
      storySort: {
        order: ['Components', 'Utils']
      }
    },
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default preview;
