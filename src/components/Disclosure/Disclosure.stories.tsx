import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Disclosure } from './Disclosure'

export default {
  title: 'Components/Disclosure',
  component: Disclosure,
} as ComponentMeta<typeof Disclosure>

const Template: ComponentStory<typeof Disclosure> = (args) => (
  <Disclosure className="border-t border-b border-coreUI-border px-2" {...args} />
)

export const Default = Template.bind({})
Default.args = {
  buttonChildren: <span>Click here to show / hide</span>,
  panelChildren: <span>This is now visible</span>,
}
