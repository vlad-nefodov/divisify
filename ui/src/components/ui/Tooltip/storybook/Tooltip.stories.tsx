import { ComponentProps, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/Button';
import { Info } from 'lucide-react';
import { ScrollableContainer } from './ScrollableContainer';
import { Tooltip } from '../Tooltip';

Tooltip.Trigger.displayName = 'Tooltip.Trigger';
Tooltip.Content.displayName = 'Tooltip.Content';
Tooltip.Portal.displayName = 'Tooltip.Portal';

type StoryProps = ComponentProps<typeof Tooltip> &
  ComponentProps<typeof Tooltip.Trigger> &
  ComponentProps<typeof Tooltip.Portal> & {
    text: string;
  };
type Story = StoryObj<StoryProps>;

const meta: Meta<StoryProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    placement: 'top',
    text: 'Very helpful tooltip text'
  },
  argTypes: {
    id: {
      description: `Specifies the **id** of the **clipping container** the 
      **portal container** will be appended to.`,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'document.body' }
      }
    },
    root: {
      description: `Specifies the **clipping container** the 
      **portal container** will be appended to.`,
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' }
      }
    },
    asChild: {
      description:
        'If **true**, replaces the parent element with the child element.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    initialOpen: {
      description:
        'If **true**, shows the tooltip when the element first rendered.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    onOpenChange: {
      description:
        'Callback function when the tooltip is **opened** or **closed**.'
    },
    open: {
      description: 'If **true**, shows the tooltip.'
    },
    placement: {
      description: 'Represents the **initial position** of the tooltip.',
      table: {
        defaultValue: { summary: 'top' }
      },
      control: 'inline-radio'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `A popup that displays information related to an element 
        when the element receives keyboard focus or the mouse hovers over it.`
      }
    }
  }
};

const controlledDocsSourceCode = `
({ text, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <ScrollableContainer
      id='controlled-container-id'
      outer={{ width: 800, height: 300 }}
      inner={{ width: 1600, height: 600 }}
    >
      <Tooltip {...rest} open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger onClick={() => setOpen((prev) => !prev)}>
          Click me
        </Tooltip.Trigger>
        <Tooltip.Portal id='controlled-container-id'>
          <Tooltip.Content>{text}</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
    </ScrollableContainer>
  );
}
`;

const usingPortalRootSourceCode = `
({ text, ...rest }) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  return (
    <ScrollableContainer
      ref={(current) => setRootRef(current)}
      outer={{ width: 800, height: 300 }}
      inner={{ width: 1600, height: 600 }}
    >
      <Tooltip {...rest}>
        <Tooltip.Trigger>
          <Info />
        </Tooltip.Trigger>
        <Tooltip.Portal root={rootRef}>
          <Tooltip.Content>{text}</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
    </ScrollableContainer>
  ); 
}
`;

const placements = ['top', 'bottom', 'left', 'right'] as const;

const excludeArgTypes = {
  initialOpen: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
  id: { table: { disable: true } },
  root: { table: { disable: true } },
  asChild: { table: { disable: true } }
};

export const Default: Story = {
  args: {
    initialOpen: false
  },
  argTypes: excludeArgTypes,
  render: ({ text, ...rest }) => {
    return (
      <ScrollableContainer
        id='clipping-container-id'
        outer={{ width: 800, height: 300 }}
        inner={{ width: 1600, height: 600 }}
      >
        <Tooltip {...rest}>
          <Tooltip.Trigger>
            <Info />
          </Tooltip.Trigger>
          <Tooltip.Portal id='clipping-container-id'>
            <Tooltip.Content>{text}</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      </ScrollableContainer>
    );
  }
};

export const InitiallyOpen: Story = {
  args: {
    initialOpen: true
  },
  argTypes: excludeArgTypes,
  render: ({ text, ...rest }) => {
    return (
      <ScrollableContainer
        id='initially-open-container-id'
        outer={{ width: 800, height: 300 }}
        inner={{ width: 1600, height: 600 }}
      >
        <Tooltip {...rest}>
          <Tooltip.Trigger>
            <Info />
          </Tooltip.Trigger>
          <Tooltip.Portal id='initially-open-container-id'>
            <Tooltip.Content>{text}</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      </ScrollableContainer>
    );
  }
};

export const Controlled: Story = {
  argTypes: { ...excludeArgTypes, open: { table: { disable: true } } },
  render: ({ text, ...rest }) => {
    const [open, setOpen] = useState(false);

    return (
      <ScrollableContainer
        id='controlled-container-id'
        outer={{ width: 800, height: 300 }}
        inner={{ width: 1600, height: 600 }}
      >
        <Tooltip {...rest} open={open} onOpenChange={setOpen}>
          <Tooltip.Trigger onClick={() => setOpen((prev) => !prev)}>
            Click me
          </Tooltip.Trigger>
          <Tooltip.Portal id='controlled-container-id'>
            <Tooltip.Content>{text}</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      </ScrollableContainer>
    );
  },
  parameters: {
    docs: {
      source: {
        code: controlledDocsSourceCode
      }
    }
  }
};

export const Placements: Story = {
  args: {
    initialOpen: true,
    text: ''
  },
  argTypes: { ...excludeArgTypes, placement: { table: { disable: true } } },
  render: ({ text, ...rest }) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}
      >
        {placements.map((placement) => (
          <ScrollableContainer
            key={placement}
            id={`placement-${placement}-container-id`}
            outer={{ width: 300, height: 300 }}
            inner={{ width: 600, height: 600 }}
          >
            <Tooltip {...rest} placement={placement}>
              <Tooltip.Trigger>
                <Info />
              </Tooltip.Trigger>
              <Tooltip.Portal id={`placement-${placement}-container-id`}>
                <Tooltip.Content>
                  {text.length > 0 ? text : placement}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip>
          </ScrollableContainer>
        ))}
      </div>
    );
  }
};

export const ButtonTrigger: Story = {
  argTypes: excludeArgTypes,
  render: ({ text, ...rest }) => {
    return (
      <ScrollableContainer
        id='button-trigger-container-id'
        outer={{ width: 800, height: 300 }}
        inner={{ width: 1600, height: 600 }}
      >
        <Tooltip {...rest}>
          <Tooltip.Trigger asChild>
            <Button>Button</Button>
          </Tooltip.Trigger>
          <Tooltip.Portal id='button-trigger-container-id'>
            <Tooltip.Content>{text}</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      </ScrollableContainer>
    );
  }
};

export const UsingPortalRoot: Story = {
  argTypes: excludeArgTypes,
  render: ({ text, ...rest }) => {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

    return (
      <ScrollableContainer
        ref={(current) => setRootRef(current)}
        outer={{ width: 800, height: 300 }}
        inner={{ width: 1600, height: 600 }}
      >
        <Tooltip {...rest}>
          <Tooltip.Trigger>
            <Info />
          </Tooltip.Trigger>
          <Tooltip.Portal root={rootRef}>
            <Tooltip.Content>{text}</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      </ScrollableContainer>
    );
  },
  parameters: {
    docs: {
      source: {
        code: usingPortalRootSourceCode
      }
    }
  }
};

export default meta;
