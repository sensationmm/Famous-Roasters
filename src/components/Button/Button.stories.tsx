import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Button, Emphasis } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  emphasis: Emphasis.Primary,
  children: 'Button',
  hasArrow: false,
}

export const Primary = Template.bind({})
Primary.args = {
  emphasis: Emphasis.Primary,
  children: 'Button',
  hasArrow: false,
}

export const Secondary = Template.bind({})
Secondary.args = {
  emphasis: Emphasis.Secondary,
  children: 'Button',
  hasArrow: false,
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  emphasis: Emphasis.Tertiary,
  children: 'Button',
  hasArrow: false,
}
