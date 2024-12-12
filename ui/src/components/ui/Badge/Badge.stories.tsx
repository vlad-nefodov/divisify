import { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Badge>;
type Story = StoryObj<StoryProps>;

const meta: Meta<StoryProps> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    children: { name: 'text' },
    asChild: {
      description:
        'If **true**, replaces the parent element with the child element.'
    },
    variant: {
      description: 'Represents the **style** of the badge.',
      control: 'select'
    },
    decorated: {
      description: 'If **true**, applies decorative element.',
      table: {
        defaultValue: { summary: 'false' }
      }
    }
  },
  parameters: {
    docs: {
      argTypes: { exclude: ['text'] },
      description: {
        component: 'Displays a badge or a component that looks like a badge.'
      }
    }
  }
};

const styles = {
  container: { display: 'flex', gap: '10px', flexDirection: 'column' as const },
  row: { display: 'flex', gap: '6px' }
};

const excludeArgTypes = {
  asChild: { table: { disable: true } }
};

const variants = ['primary', 'secondary', 'danger'] as const;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
    decorated: false
  },
  argTypes: excludeArgTypes
};

export const AsDiv: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
    decorated: false,
    asChild: true
  },
  argTypes: excludeArgTypes,
  render: ({ children, ...rest }) => {
    return (
      <Badge asChild {...rest}>
        <div>{children}</div>
      </Badge>
    );
  }
};

export const All: Story = {
  args: {
    children: 'Badge'
  },
  argTypes: {
    ...excludeArgTypes,
    variant: { table: { disable: true } },
    decorated: { table: { disable: true } }
  },
  render: ({ children, ...rest }) => (
    <div style={styles.container}>
      <div style={styles.row}>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant} decorated {...rest}>
            {children}
          </Badge>
        ))}
      </div>
      <div style={styles.row}>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant} {...rest}>
            {children}
          </Badge>
        ))}
      </div>
    </div>
  )
};

export default meta;
