import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import SingleSelect from './SingleSelect'

export default {
  title: 'Components/AlgoliaSearch/SingleSelect',
  component: SingleSelect,
} as ComponentMeta<typeof SingleSelect>

const items = [
  { label: 'Alle Kaffees', value: '' },
  { label: 'Espresso', value: 'espresso' },
  { label: 'Filter', value: 'filter' },
  { label: 'Omni', value: 'omni' },
]

const Template: ComponentStory<typeof SingleSelect> = (args) => {
  const [selected, setSelected] = useState(items[0])
  return (
    <div className="w-80 h-48">
      <SingleSelect {...args} value={selected} onChange={(option) => setSelected(option)} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  items,
}

export const Big = Template.bind({})
Big.args = {
  items,
  big: true,
}
