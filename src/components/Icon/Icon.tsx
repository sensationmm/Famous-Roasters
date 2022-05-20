import React from 'react'

export enum IconName {
  BeanFill = 'BeanFill',
  BeanOutline = 'BeanOutline',
}

export enum IconSize {
  sm = 'sm',
  md = 'md',
}

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconName | string
  size?: IconSize
}

const iconsMap: { [name: string]: string } = {
  BeanFill:
    'M9.43099 2.83089C9.16185 1.75199 8.44466 1.02499 7.49819 0.676592C6.55171 0.328153 5.37668 0.354323 4.17978 0.765654C2.80827 1.23674 1.75907 1.88475 1.13637 2.64455C1.12738 2.65549 1.11957 2.66642 1.11098 2.67736C0.864095 2.97658 0.691445 3.29298 0.599644 3.62424C0.449254 4.12229 0.465264 4.64803 0.673864 5.18243C1.00667 6.03477 1.58168 6.76603 2.39187 7.18633C3.20242 7.60624 4.24618 7.71249 5.50708 7.32383C6.79418 6.92695 7.88439 6.25823 8.60009 5.46133C9.31579 4.66443 9.65675 3.73558 9.43099 2.83089ZM9.27631 2.48831C8.58919 3.06799 6.6775 4.4086 4.86649 4.3C3.36338 4.22227 2.10868 4.93945 0.907876 5.6059C0.832485 5.46254 0.764906 5.31449 0.705146 5.16176C0.679365 5.09574 0.65788 5.03012 0.637957 4.96449C1.94226 4.24457 3.29657 3.48399 4.90247 3.62149C6.79698 3.69493 7.83218 2.84025 8.99309 1.9192C9.10442 2.09303 9.19975 2.28245 9.27631 2.48831Z',
  BeanOutline:
    'M9.18843 2.89141L9.18843 2.8914C9.18764 2.88822 9.18684 2.88504 9.18604 2.88187C8.80763 3.17406 8.25235 3.55289 7.60442 3.87599C6.79638 4.27893 5.82012 4.60734 4.85262 4.54962C3.50616 4.4803 2.36492 5.08407 1.21503 5.72136C1.53211 6.24814 1.96482 6.68312 2.50687 6.96435L9.18843 2.89141ZM9.18843 2.89141C9.38777 3.69024 9.0944 4.5368 8.41409 5.29428C7.73414 6.05138 6.68586 6.69873 5.43341 7.08492M9.18843 2.89141L5.43341 7.08492M5.43341 7.08492C4.2242 7.45766 3.24977 7.34918 2.50699 6.96441L5.43341 7.08492ZM0.77406 4.60386C0.726227 4.29237 0.75066 3.98897 0.838971 3.6965L0.839034 3.69652L0.840564 3.691C0.92158 3.39866 1.07563 3.11303 1.30381 2.83647L1.30387 2.83651L1.30755 2.83182C1.31881 2.8175 1.32147 2.81377 1.32317 2.81139C1.32456 2.80945 1.32531 2.8084 1.32955 2.80323L1.32973 2.80302C1.91221 2.09229 2.91385 1.46482 4.26099 1.00209L4.26103 1.00208C5.41635 0.605041 6.53083 0.586871 7.41182 0.911199L7.41183 0.911202C7.92803 1.10122 8.36812 1.41118 8.69292 1.83824C7.59359 2.70994 6.63254 3.43669 4.91779 3.37189C3.33793 3.23867 1.99537 3.93171 0.77406 4.60386Z',
}

const iconsViewBoxMap: { [name: string]: string } = {
  BeanFill: '0 0 10 8',
  BeanOutline: '0 0 10 8',
}

const iconsFillMap: { [name: string]: string } = {
  BeanFill: '#212121',
  BeanOutline: 'none',
}

const iconsStrokeMap: { [name: string]: string } = {
  BeanFill: 'none',
  BeanOutline: '#212121',
}

const iconsStrokeWidthMap: { [name: string]: string } = {
  BeanFill: 'none',
  BeanOutline: '0.5',
}

export const Icon: React.FC<IconProps> = ({ name, size = IconSize.md, className }: IconProps) => {
  return (
    <svg
      width={size === IconSize.sm ? 10 : 24}
      height={size === IconSize.sm ? 10 : 24}
      viewBox={iconsViewBoxMap[name]}
      className={className}
    >
      <path
        d={iconsMap[name]}
        fill={iconsFillMap[name]}
        stroke={iconsStrokeMap[name]}
        strokeWidth={iconsStrokeWidthMap[name]}
      />
    </svg>
  )
}