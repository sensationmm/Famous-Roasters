import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import image1 from 'src/assets/images/tasteFinder/01-chocolate-leicht.webp'
import image2 from 'src/assets/images/tasteFinder/02-chocolate-mittel.webp'
import image3 from 'src/assets/images/tasteFinder/03-chocolate-hoch.webp'

import { Guide } from './Guide'

export default {
  title: 'Components/Guide',
  component: Guide,
} as ComponentMeta<typeof Guide>

const Template: ComponentStory<typeof Guide> = (args) => <Guide {...args} />

export const Default = Template.bind({})
Default.args = {
  screenKey: 'bitterness',
  images: [image1, image2, image3],
}
