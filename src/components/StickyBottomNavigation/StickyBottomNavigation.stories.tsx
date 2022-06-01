import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { StickyBottomNavigation } from './StickyBottomNavigation'

export default {
  title: 'Components/StickyBottomNavigation',
  component: StickyBottomNavigation,
} as ComponentMeta<typeof StickyBottomNavigation>

const Template: ComponentStory<typeof StickyBottomNavigation> = (args) => <StickyBottomNavigation {...args} />

export const Default = Template.bind({})
Default.args = {}
