import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MyAroma } from './MyAroma'

export default {
  title: 'Components/MyAroma',
  component: MyAroma,
} as ComponentMeta<typeof MyAroma>

const Template: ComponentStory<typeof MyAroma> = (args) => <MyAroma {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'Coffee Lover',
  aroma: 'Fruchtig & lebhaft',
  tasteProfileResults: {
    acidity: 1,
    bitterness: 1,
    body: 1,
    sweetness: 1,
  },
  showGuide: true,
  showInfo: true,
  isProfile: false,
  headingAs: 'h1',
}
