import '../src/index.css'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";
import {i18n} from './i18next.js';

addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'de',
  locales: {
    de: 'Deutsch',
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    storySort: {
      order: ['DesignSystem', ['About', 'Overrides', 'Colors'], 'Components'],
    },
  },
}
