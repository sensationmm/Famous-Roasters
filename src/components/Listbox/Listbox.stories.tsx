import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Listbox } from './Listbox'

export default {
  title: 'Components/Listbox',
  component: Listbox,
} as ComponentMeta<typeof Listbox>

const Template: ComponentStory<typeof Listbox> = (args) => <Listbox {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [{ name: 'option 1' }, { name: 'option 2' }, { name: 'option 3' }],
}
