import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { InfoBox } from './InfoBox'

export default {
  title: 'Components/InfoBox',
  component: InfoBox,
} as ComponentMeta<typeof InfoBox>

const Template: ComponentStory<typeof InfoBox> = (args) => <InfoBox {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Info box title goes here',
  text: 'Some information you want to convey',
}
