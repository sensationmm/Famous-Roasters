import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Drawer } from './Drawer'

export default {
  title: 'Components/Drawer',
  component: Drawer,
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />

export const Default = Template.bind({})
Default.args = {
  trigger: <button>CLick me</button>,
  title: 'Drawer title',
  body: <div>My contact</div>,
}
