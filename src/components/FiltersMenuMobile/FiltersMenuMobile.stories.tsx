import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { FilterData } from '../index'
import { FiltersMenuMobile } from './FiltersMenuMobile'

const initialFilters: FilterData[] = [
  { key: 'vendor', isOpen: false, filterType: 'enum', filterValues: ['Rösttatte', '60beans'] },
  { key: 'packageSize', isOpen: false, filterType: 'enum', filterValues: ['100g', '250g', '500g', '1kg'] },
]

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
Default.args = {
  initialFilters,
  onUpdateFilters: () => null,
}
