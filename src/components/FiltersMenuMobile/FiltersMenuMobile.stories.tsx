import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { FiltersMenuMobile } from './FiltersMenuMobile'

export default {
  title: 'Components/FiltersMenuMobile',
  component: FiltersMenuMobile,
} as ComponentMeta<typeof FiltersMenuMobile>

const Template: ComponentStory<typeof FiltersMenuMobile> = (args) => (
  <div className="w-80 h-48">
    <FiltersMenuMobile {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
