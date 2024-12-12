import { Brush, Mail, Package, Plus } from 'lucide-react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';

type StoryProps = ComponentProps<typeof Button> & {
  withIcon?: boolean;
  iconSide: 'left' | 'right';
};
type Story = StoryObj<StoryProps>;

const meta: Meta<StoryProps> = {
  title: 'Components/Button',
  component: Button,
  args: {
    onClick: fn()
  },
  argTypes: {
    children: { name: 'text' },
    size: {
      control: 'inline-radio',
      description: 'Defines the **size** of the button.'
    },
    variant: {
      description: 'Represents the **style** of the button.'
    },
    asChild: {
      description:
        'If **true**, replaces the parent element with the child element.'
    },
    onClick: {
      description: 'Callback function when the button is **clicked**.',
      table: {
        type: { summary: '() => {}' }
      }
    },
    isIcon: {
      description: 'If **true**, applies icon button styles.'
    }
  },
  parameters: {
    docs: {
      argTypes: { exclude: ['text'] },
      description: {
        component: 'Displays a button or a component that looks like a button.'
      }
    }
  }
};

const excludeArgTypes = {
  onClick: { table: { disable: true } },
  asChild: { table: { disable: true } }
};

const styles = {
  container: { display: 'flex', gap: '10px', flexDirection: 'column' as const },
  row: { display: 'flex', gap: '6px' }
};

const sizes = ['lg', 'md', 'sm'] as const;
const variants = [
  'primary',
  'primary-outline',
  'primary-dashed',
  'secondary',
  'secondary-outline',
  'secondary-dashed',
  'danger',
  'danger-outline',
  'danger-dashed',
  'ghost',
  'link'
] as const;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isIcon: false,
    disabled: false
  },
  argTypes: excludeArgTypes,
  render: ({ children, ...rest }) => {
    return <Button {...rest}>{rest.isIcon ? <Mail /> : children}</Button>;
  }
};

export const AsLink: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isIcon: false,
    disabled: false
  },
  argTypes: excludeArgTypes,
  render: ({ children, ...rest }) => {
    return (
      <Button asChild {...rest}>
        <a href='#'>{rest.isIcon ? <Mail /> : children}</a>
      </Button>
    );
  }
};

export const WithIcon: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconSide: 'left'
  },
  argTypes: {
    ...excludeArgTypes,
    isIcon: { table: { disable: true } },
    iconSide: { control: 'inline-radio', options: ['left', 'right'] }
  },
  render: ({ iconSide, children, ...rest }) => {
    return (
      <Button {...rest}>
        {iconSide === 'left' && <Brush />}
        {children}
        {iconSide === 'right' && <Brush />}
      </Button>
    );
  }
};

export const All: Story = {
  args: {
    children: 'Button',
    withIcon: false,
    disabled: false
  },
  argTypes: {
    ...excludeArgTypes,
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    isIcon: { table: { disable: true } }
  },
  parameters: { layout: 'padded' },
  render: ({ children, withIcon, ...rest }) => (
    <div style={styles.container}>
      {sizes.map((size) => (
        <div style={styles.row} key={size}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} size={size} {...rest}>
              {withIcon && <Package />}
              {children}
            </Button>
          ))}
        </div>
      ))}
      {sizes.map((size) => (
        <div style={styles.row} key={size}>
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size={size}
              isIcon
              {...rest}
            >
              <Plus />
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
};

export default meta;
