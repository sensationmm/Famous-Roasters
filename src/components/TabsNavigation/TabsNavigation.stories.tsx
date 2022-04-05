import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { TabsNavigation } from './TabsNavigation'

export default {
  title: 'Components/TabsNavigation',
  component: TabsNavigation,
} as ComponentMeta<typeof TabsNavigation>

const Template: ComponentStory<typeof TabsNavigation> = (args) => <TabsNavigation {...args} />

export const Default = Template.bind({})
Default.args = {
  tabsData: [
    { key: 'forYou', translationKey: 'pages.catalogue.tabs.forYou' },
    { key: 'discover', translationKey: 'pages.catalogue.tabs.discover' },
  ],
  initialActiveTabKey: 'discover',
  setParentActiveTab: () => null,
}
