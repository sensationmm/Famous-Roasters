import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Notification } from './Notification'

export default {
  title: 'Components/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />

export const Default = Template.bind({})
Default.args = {
  heading: 'Title',
  body: 'Content',
}
