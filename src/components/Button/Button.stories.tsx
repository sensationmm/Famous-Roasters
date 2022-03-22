import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Button, Color, Emphasis } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  emphasis: Emphasis.Contained,
  color: Color.Primary,
  children: 'Button',
}

export const PrimaryContained = Template.bind({})
PrimaryContained.args = {
  emphasis: Emphasis.Contained,
  color: Color.Primary,
  children: 'Button',
}

export const SecondaryContained = Template.bind({})
SecondaryContained.args = {
  emphasis: Emphasis.Contained,
  color: Color.Secondary,
  children: 'Button',
}

export const Outlined = Template.bind({})
Outlined.args = {
  emphasis: Emphasis.Outlined,
  children: 'Button',
}

export const TextButton = Template.bind({})
TextButton.args = {
  emphasis: Emphasis.Text,
  children: 'Button',
}
