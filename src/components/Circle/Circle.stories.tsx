import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Circle, CircleType } from './Circle'

export default {
  title: 'Components/Circle',
  component: Circle,
} as ComponentMeta<typeof Circle>

const Template: ComponentStory<typeof Circle> = (args) => <Circle {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 'This is a generic tag',
}

export const Aroma1 = Template.bind({})
Aroma1.args = {
  type: CircleType.Aroma,
  value: 'experimentell & komplex',
}

export const Aroma2 = Template.bind({})
Aroma2.args = {
  type: CircleType.Aroma,
  value: 'fruchtig & lebhaft',
}

export const Aroma3 = Template.bind({})
Aroma3.args = {
  type: CircleType.Aroma,
  value: 'floral & leicht',
}

export const Aroma4 = Template.bind({})
Aroma4.args = {
  type: CircleType.Aroma,
  value: 'nussig & schokoladig',
}

export const Aroma5 = Template.bind({})
Aroma5.args = {
  type: CircleType.Aroma,
  value: 'würzig & kräftig',
}
