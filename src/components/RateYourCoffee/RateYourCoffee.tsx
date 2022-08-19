import { useLazyQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Badge,
  Button,
  ButtonEmphasis,
  ButtonSize,
  Dialog,
  Drawer,
  IconName,
  Loader,
  OrderTileProps,
  ProductTile,
  Rating,
  RatingProps,
  TextArea,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { storeFrontClient } from 'src/config'
import { getSimplifiedProductId } from 'src/utils'
import { ProductCustom } from 'src/views/Product'

const RATE_PRODUCT = loader('src/graphql/queries/rateProduct.query.graphql')
const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')

type RateYourCoffeeProps = {
  productOrderTile: OrderTileProps
}

export const RateYourCoffee: React.FC<RateYourCoffeeProps> = ({ productOrderTile }) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState<RatingProps['value']>()
  const [comment, setComment] = useState<string>('')
  const [complete, setComplete] = useState<boolean>(false)
  let completeTimeout: ReturnType<typeof setTimeout>
  const storefrontClient = storeFrontClient()
  const [product, setProduct] = useState<ProductCustom>()
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true)

  const [rateProduct] = useLazyQuery(RATE_PRODUCT)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    storefrontClient
      .query({
        query: GET_PRODUCT,
        variables: {
          id: productOrderTile.productId,
        },
      })
      .then((res) => {
        setProduct(res.data.product)
        setLoadingProduct(false)
      })
      .catch(() => {
        setLoadingProduct(false)
      })

    return clearTimeout(completeTimeout)
  }, [])

  useEffect(() => {
    const commentInput = textAreaRef.current
    if (commentInput !== null) {
      commentInput?.focus()
      commentInput.selectionStart = commentInput.value.length
      commentInput.selectionEnd = commentInput.value.length
    }
  }, [comment])

  const submitRating = async () => {
    rateProduct({
      variables: { productID: getSimplifiedProductId(productOrderTile.productId), rating: rating, comment: comment },
    }).then(() => {
      setComplete(true)
    })
  }

  const FormContent = () => {
    const style = 'mb-8'
    return (
      <div className="px-5">
        <Typography size={TypographySize.Small}>{t('pages.rate.intro')}</Typography>

        <div className={style}>{loadingProduct ? <Loader /> : product && <ProductTile productNode={product} />}</div>

        <div className={style}>
          <Rating value={rating} setValue={setRating} />
        </div>

        <div className={style}>
          <TextArea
            ref={textAreaRef}
            id={`rating-comment-${productOrderTile.productId}`}
            value={comment}
            setValue={setComment}
            limit={500}
            placeholder={t('pages.rate.commentPlaceholder')}
          />
        </div>

        <div className="w-full flex">
          <Button
            data-testid="btn-submit-rating"
            emphasis={ButtonEmphasis.Secondary}
            fullWidth
            center
            onClick={submitRating}
            disabled={!rating}
          >
            {t('pages.rate.submit')}
          </Button>
        </div>
      </div>
    )
  }

  const Confirmation = () => {
    return (
      <div className="min-h-[50vh] mb-[10vh] px-[25%] flex flex-col justify-center items-center text-center">
        <Badge size={128} />
        <Typography type={TypographyType.Heading} size={TypographySize.Base} className="font-syne mt-12">
          {t('pages.rate.confirmation')}
        </Typography>
      </div>
    )
  }

  const closeButton = (onClick: () => void) => {
    const onClose = () => {
      completeTimeout = setTimeout(() => setComplete(false), 1000)
      onClick()
    }
    return (
      <Button data-testid="custom-close-btn" emphasis={ButtonEmphasis.Tertiary} fullWidth center onClick={onClose}>
        {t('pages.rate.doneCTA')}
      </Button>
    )
  }

  return (
    <>
      <Drawer
        trigger={
          <Button emphasis={ButtonEmphasis.Tertiary} size={ButtonSize.xs} hasArrow arrowOverride={IconName.ArrowRight}>
            {t('pages.rate.rateCoffee')}
          </Button>
        }
        title={complete ? '' : t('pages.rate.rateCoffee')}
        body={
          complete ? (
            <Confirmation />
          ) : (
            <>
              <Typography as="h3" type={TypographyType.Heading} size={TypographySize.Tiny} className="px-5 pt-5 pb-3">
                {t('pages.rate.howWasIt')}
              </Typography>
              <FormContent />
            </>
          )
        }
        className="flex md:hidden"
        closeButton={closeButton}
        showCloseButton={complete}
      />
      <Dialog
        trigger={
          <Button emphasis={ButtonEmphasis.Tertiary} size={ButtonSize.xs} hasArrow arrowOverride={IconName.ArrowRight}>
            {t('pages.rate.rateCoffee')}
          </Button>
        }
        overline={complete ? undefined : t('pages.rate.rateCoffee')}
        title={complete ? undefined : t('pages.rate.howWasIt')}
        body={complete ? <Confirmation /> : <FormContent />}
        className="hidden md:flex"
        closeButton={closeButton}
        showCloseButton={complete}
      />
    </>
  )
}
