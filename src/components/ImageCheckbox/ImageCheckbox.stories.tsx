import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ImageCheckbox } from './ImageCheckbox'

export default {
  title: 'Components/ImageCheckbox',
  component: ImageCheckbox,
} as ComponentMeta<typeof ImageCheckbox>

const Template: ComponentStory<typeof ImageCheckbox> = (args) => <ImageCheckbox {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'test',
  imageSrc: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/19grams_Wild_At_Heart_copy.webp?v=1652256584',
  text: 'Dieser Kaffee ist lekka',
}
