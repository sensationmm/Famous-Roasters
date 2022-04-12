import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { FiltersMenu } from './FiltersMenu'

export default {
  title: 'Components/FiltersMenu',
  component: FiltersMenu,
} as ComponentMeta<typeof FiltersMenu>

const Template: ComponentStory<typeof FiltersMenu> = (args) => (
  <div className="w-80 h-48">
    <FiltersMenu {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
