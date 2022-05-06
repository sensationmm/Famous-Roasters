import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/keyboard'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Image } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import React, { useState } from 'react'
import { A11y, Keyboard, Pagination, Swiper as SwiperNative, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

interface CarouselProps {
  images: Image[]
}

export const Carousel: React.FC<CarouselProps> = ({ images }: CarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperNative>()

  return (
    <div className="grid">
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
        className="w-full"
        style={{
          paddingBottom: 32,
        }}
      >
        {images.map((image, idx) => (
          <SwiperSlide key={`carousel-image-${idx}`} className="flex justify-center bg-brand-grey-whisper">
            <img src={image.url} alt={`carousel-image-${idx}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hidden md:grid grid-flow-col auto-cols-max gap-2">
        {images.map((image, idx) => (
          <div
            key={`carousel-image-tn-${idx}`}
            data-testid={`carousel-image-tn-${idx}`}
            className="w-full bg-brand-grey-whisper bg-center bg-cover cursor-pointer w-20 h-20"
            onClick={() => swiper && swiper.slideTo(idx)}
            style={{ backgroundImage: `url("${image.url}")` }}
          />
        ))}
      </div>
    </div>
  )
}
