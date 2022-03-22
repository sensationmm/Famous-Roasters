import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Navigation } from './Navigation'

export default {
  title: 'Components/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation {...args} />

export const Default = Template.bind({})
Default.args = {}
