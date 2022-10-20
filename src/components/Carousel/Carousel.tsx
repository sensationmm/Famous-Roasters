import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Image } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import React, { ReactNode, useState } from 'react'
import { A11y, Keyboard, Pagination, Swiper as SwiperNative, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

interface CarouselProps {
  images?: Image[]
  slides?: ReactNode[]
  tile?: boolean
}

export const Carousel: React.FC<CarouselProps> = ({ images = [], slides, tile = false }: CarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperNative>()

  if (!images && !slides) {
    throw new Error('Either images or slides must be defined')
  }

  const content = slides || images
  const isImages = images.length > 0

  return (
    <div className="grid h-fit">
      <Swiper
        modules={[A11y, Keyboard, Pagination, Thumbs]}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
        }}
        a11y={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        onSwiper={(swiperElement) => setSwiper(swiperElement)}
        className="w-full h-fit"
        style={{
          paddingBottom: 32,
        }}
        breakpoints={{
          640: {
            slidesPerView: !tile ? 1 : 2,
          },
          1024: {
            slidesPerView: !tile ? 1 : 3,
          },
        }}
      >
        {content.map((slide, idx) => {
          return (
            <SwiperSlide
              key={`carousel-image-${idx}`}
              className={`flex w-full justify-center ${isImages && 'bg-brand-grey-whisper'}`}
            >
              {images.length > 0 ? (
                <img
                  className="w-full"
                  src={`${(slide as Image).url}&width=600&height=600`}
                  alt={`carousel-image-${idx}`}
                  width="600px"
                  height="600px"
                />
              ) : (
                (slide as ReactNode)
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className="hidden md:grid grid-cols-7 gap-2">
        {images.map((image, idx) => (
          <div
            key={`carousel-image-tn-${idx}`}
            data-testid={`carousel-image-tn-${idx}`}
            className="bg-brand-grey-whisper bg-center bg-cover cursor-pointer aspect-w-1 aspect-h-1"
            onClick={() => swiper && swiper.slideTo(idx)}
            style={{ backgroundImage: `url("${image.url}&width=150&height=150")` }}
          />
        ))}
      </div>
    </div>
  )
}
