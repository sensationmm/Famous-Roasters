import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Listbox } from './Listbox'

export default {
  title: 'Components/Listbox',
  component: Listbox,
} as ComponentMeta<typeof Listbox>

const Template: ComponentStory<typeof Listbox> = (args) => (
  <div className="w-80 h-48">
    <Listbox {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    { name: 'priceAsc', value: 'priceAsc' },
    { name: 'priceDesc', value: 'priceDesc' },
    { name: 'newDesc', value: 'newDesc' },
  ],
  translationPrefix: 'pages.catalogue.filters.sort',
  hasNoneItem: true,
}
