import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { ProductMockData } from 'src/_mocks'

import { Carousel } from './Carousel'

export default {
  title: 'Components/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />

export const Default = Template.bind({})
Default.args = {
  images: ProductMockData.images.nodes,
}
