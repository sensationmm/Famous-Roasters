import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Tag, TagType } from './Tag'

export default {
  title: 'Components/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 'This is a generic tag',
}

export const Aroma1 = Template.bind({})
Aroma1.args = {
  type: TagType.Aroma,
  value: 'experimentell & komplex',
}

export const Aroma2 = Template.bind({})
Aroma2.args = {
  type: TagType.Aroma,
  value: 'fruchtig & lebhaft',
}

export const Aroma3 = Template.bind({})
Aroma3.args = {
  type: TagType.Aroma,
  value: 'floral & leicht',
}

export const Aroma4 = Template.bind({})
Aroma4.args = {
  type: TagType.Aroma,
  value: 'nussig & schokoladig',
}

export const Aroma5 = Template.bind({})
Aroma5.args = {
  type: TagType.Aroma,
  value: 'würzig & kräftig',
}
