import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Dialog } from './Dialog'

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />

export const Default = Template.bind({})
Default.args = {
  trigger: <button>CLick me</button>,
  title: 'Dialog title',
  body: <div>My contact</div>,
}
