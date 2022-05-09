import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TasteProfile } from './TasteProfile'

export default {
  title: 'Components/TasteProfile',
  component: TasteProfile,
} as ComponentMeta<typeof TasteProfile>

const Template: ComponentStory<typeof TasteProfile> = (args) => <TasteProfile {...args} />

export const Default = Template.bind({})
Default.args = {
  sweetness: 1,
  body: 3,
  bitterness: 2,
  acidity: 2,
}
