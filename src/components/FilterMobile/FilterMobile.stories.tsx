import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { FilterMobile } from './FilterMobile'

export default {
  title: 'Components/FilterMobile',
  component: FilterMobile,
} as ComponentMeta<typeof FilterMobile>

const Template: ComponentStory<typeof FilterMobile> = (args) => (
  <div className="w-80 h-48">
    <FilterMobile {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  filter: {
    key: 'vendor',
    filterType: 'enum',
    filterValues: ['Roaster A', 'Roaster B'],
    isOpen: true,
  },
  show: true,
  back: () => alert('back!'),
  update: () => null,
}
