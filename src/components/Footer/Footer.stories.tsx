import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Footer } from './Footer'

export default {
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {}
