import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { BeanScaleTag } from './BeanScaleTag'

export default {
  title: 'Components/BeanScaleTag',
  component: BeanScaleTag,
} as ComponentMeta<typeof BeanScaleTag>

const Template: ComponentStory<typeof BeanScaleTag> = (args) => <BeanScaleTag {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 2,
}

export const Outline = Template.bind({})
Outline.args = {
  value: 2,
  variant: 'outline',
}

export const Solid = Template.bind({})
Solid.args = {
  value: 2,
  variant: 'solid',
}
