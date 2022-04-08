import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Pagination } from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {}
