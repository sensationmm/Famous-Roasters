import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ImageCheckbox } from './ImageCheckbox'

export default {
  title: 'Components/ImageCheckbox',
  component: ImageCheckbox,
} as ComponentMeta<typeof ImageCheckbox>

const Template: ComponentStory<typeof ImageCheckbox> = (args) => <ImageCheckbox {...args} />

export const Default = Template.bind({})
Default.args = {}
