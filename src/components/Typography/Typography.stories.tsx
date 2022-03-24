import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Size, Type, Typography } from './Typography'

export default {
  title: 'Components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
  type: Type.Paragraph,
  size: Size.Base,
  children: 'Text',
}

export const HeadingLarge = Template.bind({})
HeadingLarge.args = {
  type: Type.Heading,
  size: Size.Large,
  children: 'Heading Large',
}

export const HeadingBase = Template.bind({})
HeadingBase.args = {
  type: Type.Heading,
  size: Size.Base,
  children: 'Heading Base',
}

export const HeadingSmall = Template.bind({})
HeadingSmall.args = {
  type: Type.Heading,
  size: Size.Small,
  children: 'Heading Small',
}

export const HeadingTiny = Template.bind({})
HeadingTiny.args = {
  type: Type.Heading,
  size: Size.Tiny,
  children: 'Heading Tiny',
}

export const LabelLarge = Template.bind({})
LabelLarge.args = {
  type: Type.Label,
  size: Size.Large,
  children: 'Label Large',
}

export const LabelBase = Template.bind({})
LabelBase.args = {
  type: Type.Label,
  size: Size.Base,
  children: 'Label Base',
}

export const LabelSmall = Template.bind({})
LabelSmall.args = {
  type: Type.Label,
  size: Size.Small,
  children: 'Label Small',
}

export const LabelTiny = Template.bind({})
LabelTiny.args = {
  type: Type.Label,
  size: Size.Tiny,
  children: 'Label Tiny',
}

export const ParagraphLarge = Template.bind({})
ParagraphLarge.args = {
  type: Type.Paragraph,
  size: Size.Large,
  children: 'Paragraph Large',
}

export const ParagraphBase = Template.bind({})
ParagraphBase.args = {
  type: Type.Paragraph,
  size: Size.Base,
  children: 'Paragraph Base',
}

export const ParagraphSmall = Template.bind({})
ParagraphSmall.args = {
  type: Type.Paragraph,
  size: Size.Small,
  children: 'Paragraph Small',
}

export const ParagraphTiny = Template.bind({})
ParagraphTiny.args = {
  type: Type.Paragraph,
  size: Size.Tiny,
  children: 'Paragraph Tiny',
}
