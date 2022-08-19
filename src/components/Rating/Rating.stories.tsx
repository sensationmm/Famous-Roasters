import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Rating } from './Rating'

export default {
  title: 'Components/Rating',
  component: Rating,
  argTypes: {
    setValue: { action: 'clicked' },
  },
} as ComponentMeta<typeof Rating>

const Template: ComponentStory<typeof Rating> = (args) => <Rating {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 1,
}

Default.parameters = {
  controls: { exclude: ['setValue'] },
}
