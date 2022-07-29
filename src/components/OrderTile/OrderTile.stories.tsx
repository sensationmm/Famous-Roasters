import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { OrderMock } from 'src/_mocks'

import { OrderTile } from './OrderTile'

export default {
  title: 'Components/OrderTile',
  component: OrderTile,
} as ComponentMeta<typeof OrderTile>

const Template: ComponentStory<typeof OrderTile> = (args) => <OrderTile {...args} />

export const Default = Template.bind({})
Default.args = {
  node: { ...OrderMock.result.data.order.lineItems.edges[0].node },
}
