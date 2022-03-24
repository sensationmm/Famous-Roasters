import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { Typography, TypographySize, TypographyType } from '.'

describe('Typography component', () => {
  describe('Heading', () => {
    it('Renders correctly for size large', async () => {
      const { container } = render(
        <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Large}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size base', async () => {
      const { container } = render(
        <Typography as="h1" type={TypographyType.Heading}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size small', async () => {
      const { container } = render(
        <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Small}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size tiny', async () => {
      const { container } = render(
        <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Tiny}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })
  })

  describe('Label', () => {
    it('Renders correctly for size large', async () => {
      const { container } = render(
        <Typography as="span" type={TypographyType.Label} size={TypographySize.Large}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size base', async () => {
      const { container } = render(<Typography type={TypographyType.Label}>Text</Typography>)
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size small', async () => {
      const { container } = render(
        <Typography as="span" type={TypographyType.Label} size={TypographySize.Small}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size tiny', async () => {
      const { container } = render(
        <Typography as="span" type={TypographyType.Label} size={TypographySize.Tiny}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })
  })

  describe('Paragraph', () => {
    it('Renders correctly for size large', async () => {
      const { container } = render(
        <Typography as="p" type={TypographyType.Paragraph} size={TypographySize.Large}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size base', async () => {
      const { container } = render(<Typography as="p">Text</Typography>)
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size small', async () => {
      const { container } = render(
        <Typography as="p" type={TypographyType.Paragraph} size={TypographySize.Small}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })

    it('Renders correctly for size tiny', async () => {
      const { container } = render(
        <Typography as="p" type={TypographyType.Paragraph} size={TypographySize.Tiny}>
          Text
        </Typography>,
      )
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))
      expect(container).toMatchSnapshot()
    })
  })
})
