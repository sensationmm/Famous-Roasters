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
