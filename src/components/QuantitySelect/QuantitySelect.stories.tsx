import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { QuantitySelect } from './QuantitySelect'

export default {
  title: 'Components/QuantitySelect',
  component: QuantitySelect,
} as ComponentMeta<typeof QuantitySelect>

const Template: ComponentStory<typeof QuantitySelect> = (args) => <QuantitySelect {...args} />

export const Default = Template.bind({})
Default.args = {
  min: 1,
  max: 10,
}
