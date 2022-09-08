import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ErrorBox } from './ErrorBox'

export default {
  title: 'Components/ErrorBox',
  component: ErrorBox,
} as ComponentMeta<typeof ErrorBox>

const Template: ComponentStory<typeof ErrorBox> = (args) => <ErrorBox {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text goes here',
}
