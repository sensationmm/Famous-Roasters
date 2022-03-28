import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ErrorPrompt } from './ErrorPrompt'

export default {
  title: 'Components/ErrorPrompt',
  component: ErrorPrompt,
} as ComponentMeta<typeof ErrorPrompt>

const Template: ComponentStory<typeof ErrorPrompt> = (args) => <ErrorPrompt {...args} />

export const Default = Template.bind({})
Default.args = {
  promptAction: () => alert('Hello world!'),
}
