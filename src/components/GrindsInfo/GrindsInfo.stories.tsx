import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { GrindsInfo } from './GrindsInfo'

export default {
  title: 'Components/GrindsInfo',
  component: GrindsInfo,
} as ComponentMeta<typeof GrindsInfo>

const Template: ComponentStory<typeof GrindsInfo> = (args) => <GrindsInfo {...args} />

export const Default = Template.bind({})
Default.args = {}
