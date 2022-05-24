import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { OriginProductionSpecs } from './OriginProductionSpecs'

export default {
  title: 'Components/OriginProductionSpecs',
  component: OriginProductionSpecs,
} as ComponentMeta<typeof OriginProductionSpecs>

const Template: ComponentStory<typeof OriginProductionSpecs> = (args) => <OriginProductionSpecs {...args} />

export const Default = Template.bind({})
Default.args = {
  origin: 'CR',
  flavourNotes: 'Mango, Passionfruit, Honey',
  altitude: '500m',
  processing: 'Gewaschen',
  producer: 'WeBean',
  variety: 'Ethiopian Heirloom',
}
