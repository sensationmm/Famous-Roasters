import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { ProductMock } from 'src/_mocks'

import { ProductTile } from './ProductTile'

export default {
  title: 'Components/ProductTile',
  component: ProductTile,
} as ComponentMeta<typeof ProductTile>

const Template: ComponentStory<typeof ProductTile> = (args) => <ProductTile {...args} />

export const Default = Template.bind({})
Default.args = {
  productNode: { ...ProductMock, pricePerKg: { value: '10.0' } },
}
