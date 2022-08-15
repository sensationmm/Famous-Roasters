import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ProductTileLoader } from './ProductTileLoader'

export default {
  title: 'Components/ProductTileLoader',
  component: ProductTileLoader,
} as ComponentMeta<typeof ProductTileLoader>

const Template: ComponentStory<typeof ProductTileLoader> = (args) => <ProductTileLoader {...args} />

export const Default = Template.bind({})
