import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { IconName } from 'src/components/Icon'

import { IconCheckbox } from './IconCheckbox'

export default {
  title: 'Components/IconCheckbox',
  component: IconCheckbox,
} as ComponentMeta<typeof IconCheckbox>

const Template: ComponentStory<typeof IconCheckbox> = (args) => <IconCheckbox {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'test',
  iconName: IconName.Espresso,
  text: 'Espresso Maschine',
}
