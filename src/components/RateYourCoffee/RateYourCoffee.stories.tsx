import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { OrderMock } from 'src/_mocks'

import { RateYourCoffee } from './RateYourCoffee'

export default {
  title: 'Components/RateYourCoffee',
  component: RateYourCoffee,
  argTypes: {
    setValue: { action: 'clicked' },
  },
} as ComponentMeta<typeof RateYourCoffee>

const Template: ComponentStory<typeof RateYourCoffee> = (args) => <RateYourCoffee {...args} />

export const Default = Template.bind({})
Default.args = {
  productOrderTile: {
    productId: OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node.product.id,
    node: OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node,
  },
}

Default.parameters = {
  controls: { exclude: ['setValue'] },
}
