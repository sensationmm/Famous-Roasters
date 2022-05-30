import React from 'react'

export enum IconName {
  Aeropress = 'Aeropress',
  Altitude = 'Altitude',
  BeanFill = 'BeanFill',
  BeanOutline = 'BeanOutline',
  Chemex = 'Chemex',
  Espresso = 'Espresso',
  FrenchPress = 'FrenchPress',
  Moka = 'Moka',
  Origin = 'Origin',
  Processing = 'Processing',
  Producer = 'Producer',
  Taste = 'Taste',
  V60 = 'V60',
  Variety = 'Variety',
  WholeBean = 'WholeBean',
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
  Aeropress:
    'M3.471 32h8.534a1.067 1.067 0 0 0 1.066-1.067v-1.6h1.067a1.6 1.6 0 0 0 1.6-1.6v-4.266a1.6 1.6 0 0 0-1.6-1.6h-1.066V20.8h1.6a.533.533 0 0 0 .533-.533v-2.134a.533.533 0 0 0-.534-.533h-1.066V5.333a.533.533 0 0 0-.534-.533h-1.6V1.067h2.134V0H1.87v1.067h2.134V4.8h-1.6a.533.533 0 0 0-.534.533V17.6H.805a.533.533 0 0 0-.534.533v2.134a.533.533 0 0 0 .534.533h1.6v10.133A1.067 1.067 0 0 0 3.47 32Zm0-1.067v-4.8h8.534v4.8H3.47Zm10.667-8a.533.533 0 0 1 .534.534v4.266a.533.533 0 0 1-.534.534h-1.066v-5.334h1.066Zm-2.133 2.134H3.47V20.8h8.534v4.267Zm-6.934-24h5.334V4.8H5.07V1.067Zm0 4.8h5.334v9.6H5.07v-9.6Zm-3.733 12.8h1.067a.533.533 0 0 0 .533-.534V5.867h1.067V16a.533.533 0 0 0 .533.533h6.4a.533.533 0 0 0 .534-.533V5.867h1.066v12.266a.533.533 0 0 0 .534.534h1.066v1.066h-12.8v-1.066Z M7.205 6.933h1.067V8H7.205V6.933ZM7.205 9.067h1.067v1.066H7.205V9.067ZM7.205 11.2h1.067v1.067H7.205V11.2ZM7.205 13.333h1.067V14.4H7.205v-1.067Z',
  Altitude:
    'm25.338 15.314-3.486-6.2a1.779 1.779 0 0 0-1.571-.914c-.657 0-1.258.343-1.572.914l-.543.915-3.628-8.915A1.806 1.806 0 0 0 12.852 0c-.743 0-1.4.428-1.686 1.143L8.31 8.314l-.657-1.343c-.314-.628-.943-1-1.629-1-.685 0-1.314.372-1.628 1l-4.2 8.4a1.784 1.784 0 0 0 .086 1.772c.342.543.914.857 1.542.857h21.943c.657 0 1.229-.343 1.572-.886.314-.571.343-1.228 0-1.8ZM12.252 1.543c.143-.4.514-.429.629-.429.114 0 .457.029.628.429l.915 2.228-2.03 1.172-1.056-1.057.914-2.343ZM1.823 16.857a.658.658 0 0 1-.57-.314.67.67 0 0 1-.03-.657l4.2-8.4a.666.666 0 0 1 .6-.372c.258 0 .486.143.6.372l4.687 9.371H1.823Zm10.772 0-3.6-7.2c.028-.028.028-.057.057-.086l1.8-4.514 1.029 1.029a.564.564 0 0 0 .4.171c.114 0 .2-.028.286-.086l2.285-1.314 4.915 12h-7.172Zm11.743-.314c-.057.085-.229.343-.572.343h-2.771l-2.257-5.543.971-1.657c.172-.315.486-.315.572-.343.114 0 .4.028.571.343l3.515 6.171c.171.314.028.572-.03.686Z',
  BeanFill:
    'M9.43099 2.83089C9.16185 1.75199 8.44466 1.02499 7.49819 0.676592C6.55171 0.328153 5.37668 0.354323 4.17978 0.765654C2.80827 1.23674 1.75907 1.88475 1.13637 2.64455C1.12738 2.65549 1.11957 2.66642 1.11098 2.67736C0.864095 2.97658 0.691445 3.29298 0.599644 3.62424C0.449254 4.12229 0.465264 4.64803 0.673864 5.18243C1.00667 6.03477 1.58168 6.76603 2.39187 7.18633C3.20242 7.60624 4.24618 7.71249 5.50708 7.32383C6.79418 6.92695 7.88439 6.25823 8.60009 5.46133C9.31579 4.66443 9.65675 3.73558 9.43099 2.83089ZM9.27631 2.48831C8.58919 3.06799 6.6775 4.4086 4.86649 4.3C3.36338 4.22227 2.10868 4.93945 0.907876 5.6059C0.832485 5.46254 0.764906 5.31449 0.705146 5.16176C0.679365 5.09574 0.65788 5.03012 0.637957 4.96449C1.94226 4.24457 3.29657 3.48399 4.90247 3.62149C6.79698 3.69493 7.83218 2.84025 8.99309 1.9192C9.10442 2.09303 9.19975 2.28245 9.27631 2.48831Z',
  BeanOutline:
    'M9.18843 2.89141L9.18843 2.8914C9.18764 2.88822 9.18684 2.88504 9.18604 2.88187C8.80763 3.17406 8.25235 3.55289 7.60442 3.87599C6.79638 4.27893 5.82012 4.60734 4.85262 4.54962C3.50616 4.4803 2.36492 5.08407 1.21503 5.72136C1.53211 6.24814 1.96482 6.68312 2.50687 6.96435L9.18843 2.89141ZM9.18843 2.89141C9.38777 3.69024 9.0944 4.5368 8.41409 5.29428C7.73414 6.05138 6.68586 6.69873 5.43341 7.08492M9.18843 2.89141L5.43341 7.08492M5.43341 7.08492C4.2242 7.45766 3.24977 7.34918 2.50699 6.96441L5.43341 7.08492ZM0.77406 4.60386C0.726227 4.29237 0.75066 3.98897 0.838971 3.6965L0.839034 3.69652L0.840564 3.691C0.92158 3.39866 1.07563 3.11303 1.30381 2.83647L1.30387 2.83651L1.30755 2.83182C1.31881 2.8175 1.32147 2.81377 1.32317 2.81139C1.32456 2.80945 1.32531 2.8084 1.32955 2.80323L1.32973 2.80302C1.91221 2.09229 2.91385 1.46482 4.26099 1.00209L4.26103 1.00208C5.41635 0.605041 6.53083 0.586871 7.41182 0.911199L7.41183 0.911202C7.92803 1.10122 8.36812 1.41118 8.69292 1.83824C7.59359 2.70994 6.63254 3.43669 4.91779 3.37189C3.33793 3.23867 1.99537 3.93171 0.77406 4.60386Z',
  Chemex:
    'M16.327 8.468a.32.32 0 0 1-.293-.452l2.976-6.65c.036-.086.026-.12.026-.12-.026-.048-.23-.11-.412-.103H4.404l-1.97.793 4.595 6.016a.322.322 0 0 1-.51.39L1.666 1.991a.322.322 0 0 1 .135-.494l2.42-.973A.32.32 0 0 1 4.341.5h14.275c.108-.005.693.002.951.383.097.143.181.387.03.74L16.621 8.28a.321.321 0 0 1-.294.19ZM18.747 32.5H4.392c-1.279 0-2.178-.412-2.673-1.225-1.304-2.14.807-6.284.898-6.46l3.661-7.614.58.279-3.666 7.623c-.024.048-2.04 4.007-.924 5.838.37.608 1.085.916 2.123.916h14.355c1.039 0 1.753-.308 2.124-.916 1.117-1.834-.9-5.79-.92-5.83l-3.67-7.631.58-.28 3.666 7.623c.086.168 2.197 4.313.894 6.452-.496.813-1.396 1.225-2.673 1.225Z M16.369 17.66H6.733c-.708 0-1.162-.2-1.346-.595-.32-.688.372-1.593.55-1.808 1.433-2.244.798-3.778-.043-5.28-.346-.617-.408-1.124-.185-1.505.31-.528 1.022-.555 1.161-.555h9.357c.146 0 .857.028 1.167.555.223.381.16.887-.186 1.506-.84 1.501-1.475 3.034-.042 5.28.178.215.87 1.12.55 1.807-.186.395-.638.595-1.347.595Zm-9.493-9.1c-.136 0-.499.043-.612.238-.097.164-.029.472.192.866.864 1.544 1.65 3.406.011 5.957a.361.361 0 0 1-.024.033c-.26.31-.59.888-.472 1.14.067.142.345.223.762.223h9.636c.419 0 .697-.082.764-.225.117-.25-.213-.827-.473-1.138a.31.31 0 0 1-.024-.033c-1.639-2.552-.853-4.413.012-5.957.22-.394.288-.702.192-.867-.115-.194-.477-.237-.607-.237H6.876ZM6.273 6.2a.321.321 0 0 1-.3-.207L4.493 2.12a.322.322 0 1 1 .6-.23l1.48 3.873a.321.321 0 0 1-.3.437Z M16.477 13.111H6.723a.321.321 0 1 1 0-.643h9.754a.322.322 0 1 1 0 .643Z M5.204 14.53a1.578 1.578 0 0 1-1.576-1.575c0-.869.707-1.576 1.576-1.576.868 0 1.575.707 1.575 1.575 0 .87-.706 1.576-1.575 1.576Zm0-2.508a.933.933 0 1 0 .001 1.867.933.933 0 0 0-.001-1.867Z M1.916 23.63a.32.32 0 0 1-.223-.553c.702-.678 1.539-4.548 2.066-7.716a27.7 27.7 0 0 0-2.132 4.891.322.322 0 0 1-.61-.2c1.317-4.012 2.975-6.301 3.045-6.397a.322.322 0 0 1 .578.237c-.125.86-1.255 8.447-2.5 9.648a.32.32 0 0 1-.224.09Z',
  Espresso:
    'M27.31 0H11.42a2.494 2.494 0 0 0-2.482 2.5v6c0 1.379 1.114 2.5 2.483 2.5h.496v.5H9.842a1.499 1.499 0 0 0-1.19-.985C8.504 10.494 5.024 10 1.985 10A1.995 1.995 0 0 0 0 12c0 1.103.89 2 1.986 2 3.039 0 6.519-.494 6.666-.515a1.5 1.5 0 0 0 1.19-.985h2.075v.5c0 .276.223.5.497.5h.727l.846 1.277c.092.14.247.223.413.223h.496v.5c0 .276.223.5.497.5a.499.499 0 0 0 .497-.5V15h.496c.166 0 .321-.084.413-.223l.846-1.277h.727a.499.499 0 0 0 .497-.5v-2h2.483a.5.5 0 0 1 .496.5v12a.5.5 0 0 1-.496.5h-2.495c.314-.419.509-.935.509-1.5V18c0-.276-.223-.5-.497-.5h-6.952a.499.499 0 0 0-.496.5v.092a1.464 1.464 0 0 0-.497-.092h-.993c-.821 0-1.49.673-1.49 1.5v2c0 .827.669 1.5 1.49 1.5h.993c.19 0 .37-.04.536-.104.066.41.23.785.47 1.104h-1.502a2.494 2.494 0 0 0-2.483 2.5v3c0 1.379 1.113 2.5 2.482 2.5H27.31a2.494 2.494 0 0 0 2.483-2.5v-27c0-1.379-1.114-2.5-2.483-2.5ZM8.513 12.495c-.144.02-3.557.505-6.526.505a.998.998 0 0 1-.993-1c0-.552.445-1 .993-1 2.97 0 6.382.484 6.526.505a.501.501 0 0 1 0 .99ZM11.42 1h15.89c.82 0 1.49.673 1.49 1.5H9.93c0-.827.668-1.5 1.49-1.5Zm4.7 13h-1.455l-.332-.5h2.117l-.33.5Zm1.755-1.5H12.91V11h4.966v1.5ZM10.924 22h-.993a.5.5 0 0 1-.497-.5v-2a.5.5 0 0 1 .497-.5h.993a.5.5 0 0 1 .497.5v2a.5.5 0 0 1-.497.5Zm1.49.5v-4h5.958v4c0 .827-.668 1.5-1.49 1.5h-2.979c-.82 0-1.49-.673-1.49-1.5ZM10.428 25h10.924c.821 0 1.49-.673 1.49-1.5v-12c0-.827-.669-1.5-1.49-1.5H11.42c-.822 0-1.49-.673-1.49-1.5v-5h18.87v25H8.937v-2c0-.827.668-1.5 1.49-1.5Zm16.882 6H10.428c-.822 0-1.49-.673-1.49-1.5H28.8c0 .827-.668 1.5-1.49 1.5Z',
  FrenchPress:
    'M16.73 14.35h-6.573v-1.196h5.975a.598.598 0 0 0 .598-.597c0-3.442-2.898-6.269-6.573-6.544V4.705a2.39 2.39 0 1 0-1.195 0v1.308c-3.675.275-6.574 3.102-6.574 6.573a.598.598 0 0 0 .598.598h5.976v1.195H.596a.598.598 0 0 0-.532.867l1.727 3.376c.387.756.592 1.594.597 2.444v11.808a1.793 1.793 0 0 0 1.793 1.793h10.756a1.793 1.793 0 0 0 1.793-1.793v-6.573a5.975 5.975 0 1 0 0-11.951ZM8.364 2.397a1.195 1.195 0 1 1 2.39 0 1.195 1.195 0 0 1-2.39 0Zm1.195 4.78c3.072 0 5.605 2.098 5.94 4.781H3.62c.335-2.683 2.869-4.78 5.94-4.78Zm5.976 25.696a.598.598 0 0 1-.598.597H4.181a.598.598 0 0 1-.597-.597V21.066a6.652 6.652 0 0 0-.718-2.988L1.57 15.544h7.392v13.147H5.376a.598.598 0 0 0 0 1.195h8.366a.598.598 0 0 0 0-1.195h-3.585V15.544h5.378v17.33Zm1.195-7.769v-9.56a4.78 4.78 0 0 1 0 9.56Z',
  Moka: 'M9.362 0a.572.572 0 0 0-.485.752l.99 2.973-5.734 3.13H.845a.57.57 0 0 0-.49.869l5.143 8.572.055-.033.439 2.083v2.16l-2.274 9.651a.563.563 0 0 0-.013.131c0 .94.772 1.712 1.712 1.712h12.57c.94 0 1.718-.772 1.718-1.712a.564.564 0 0 0-.018-.13l-2.27-9.652v-2.16l1.698-8.062h1.573c.313 0 .49.1.683.32.192.22.36.578.481.984 0 .002.005.002.005.004l1.324 6.737a1.726 1.726 0 0 0 2.11 1.249 1.727 1.727 0 0 0 1.214-2.102l-1.252-6.723a.59.59 0 0 0-.014-.05c-.271-.965-.675-1.914-1.315-2.65-.64-.735-1.567-1.239-2.688-1.194l.026-.004h-1.99L13.54 3.727l.993-2.975A.572.572 0 0 0 13.989 0H9.417a.487.487 0 0 0-.055 0Zm.852 1.143h2.982l-.761 2.287h-1.46l-.761-2.287Zm.489 3.43h2l4.182 2.281H6.522l4.18-2.281Zm-8.85 3.425h1.96l1.058 5.027-3.018-5.027Zm3.124 0h3.354l1.024 9.715H7.027l-2.05-9.715Zm4.506 0h4.446l-1.024 9.715h-2.4L9.484 7.998Zm5.592 0h3.355l-2.045 9.715h-2.333l1.023-9.715Zm4.522 0h1.686c.777-.03 1.31.266 1.78.807.468.537.825 1.335 1.067 2.193l1.262 6.732a.598.598 0 0 0 .009.042.559.559 0 0 1-.405.7.559.559 0 0 1-.7-.405l-1.33-6.749a.507.507 0 0 0-.012-.054c-.15-.502-.363-1-.722-1.409a2.064 2.064 0 0 0-1.544-.713h-1.332l.241-1.144ZM7.131 18.856h9.145v1.143H7.13v-1.143Zm-.116 2.287h2.34L8.33 30.857H5.418c-.32 0-.546-.241-.557-.557l2.154-9.157Zm3.491 0h2.398l1.023 9.714H9.484l1.022-9.714Zm3.546 0h2.343L18.55 30.3a.555.555 0 0 1-.562.557h-2.914l-1.022-9.714Z',
  Origin:
    'M8 0a7.983 7.983 0 0 0-5.143 1.87A8.005 8.005 0 0 0 1.071 12l5.846 8.376a1.253 1.253 0 0 0 2.166 0l5.845-8.376A8.005 8.005 0 0 0 13.142 1.87 7.984 7.984 0 0 0 8 0Zm0 .997c1.598 0 3.197.547 4.5 1.64a6.993 6.993 0 0 1 1.566 8.854l-5.85 8.384A.249.249 0 0 1 8 20a.249.249 0 0 1-.217-.125l-5.85-8.384A6.994 6.994 0 0 1 3.5 2.637 6.986 6.986 0 0 1 8 .997ZM8.01 4a.5.5 0 0 0-.301.093l-3.5 2.5a.5.5 0 0 0-.177.583l1.5 4A.5.5 0 0 0 6 11.5h4a.5.5 0 0 0 .467-.324l1.5-4a.5.5 0 0 0-.176-.583l-3.5-2.5A.5.5 0 0 0 8.009 4ZM8 5.115l2.897 2.069L9.653 10.5H6.346L5.102 7.184 8 5.115ZM3.75 18.25a.498.498 0 0 0-.208.046c-.903.422-1.6 1.037-1.896 1.717-.3.692-.13 1.505.43 2.124C3.196 23.374 5.476 24 7.999 24s4.803-.626 5.923-1.863c.56-.62.732-1.432.431-2.124-.293-.676-.998-1.295-1.892-1.715a.5.5 0 1 0-.419.906c.79.362 1.24.854 1.393 1.207.154.353.117.646-.254 1.055C12.441 22.284 10.338 23 8 23c-2.339 0-4.44-.716-5.181-1.534-.37-.41-.409-.702-.255-1.055.153-.353.604-.844 1.394-1.206a.501.501 0 0 0-.208-.955Z',
  Processing:
    'M21.429 4.714V2.143a.44.44 0 0 0-.504-.422.471.471 0 0 0-.353.474v.423a.434.434 0 0 1-.71.324A11.982 11.982 0 0 0 7.538.86a.43.43 0 0 0 .328.795A11.11 11.11 0 0 1 19.23 3.531a.434.434 0 0 1-.28.755h-.522a.436.436 0 0 0-.422.504.471.471 0 0 0 .474.353H21a.43.43 0 0 0 .428-.429ZM.857 12c0-2.652.949-5.217 2.675-7.23a.433.433 0 0 1 .754.279v.523a.436.436 0 0 0 .504.422.471.471 0 0 0 .353-.474V3a.429.429 0 0 0-.429-.428H2.143a.44.44 0 0 0-.422.504.471.471 0 0 0 .474.353h.423a.434.434 0 0 1 .324.71A11.982 11.982 0 0 0 .86 16.463a.43.43 0 0 0 .795-.328A10.973 10.973 0 0 1 .857 12Zm20.948 8.572h-.423a.434.434 0 0 1-.324-.71A11.982 11.982 0 0 0 23.14 7.538a.43.43 0 0 0-.795.328 11.111 11.111 0 0 1-1.876 11.365.434.434 0 0 1-.753-.28v-.522a.436.436 0 0 0-.505-.422.471.471 0 0 0-.353.474V21a.43.43 0 0 0 .429.428h2.571a.44.44 0 0 0 .422-.504.472.472 0 0 0-.473-.352ZM12 23.143c1.417.003 2.821-.268 4.135-.8a.43.43 0 1 1 .328.796 11.983 11.983 0 0 1-12.324-2.08.433.433 0 0 0-.71.323v.424a.471.471 0 0 1-.353.473.44.44 0 0 1-.504-.422v-2.571c0-.237.192-.429.428-.429h2.52a.471.471 0 0 1 .474.354.436.436 0 0 1-.422.504h-.523a.433.433 0 0 0-.28.753A11.111 11.111 0 0 0 12 23.143Zm5.447-15.455.003.002c.712.65 1.005 1.667.824 2.863-.176 1.166-.785 2.37-1.713 3.39-1.104 1.215-2.538 2.008-3.854 2.138-.141.16-.3.302-.475.423l-.003.002-.002.002a2.824 2.824 0 0 1-1.635.492c-.447 0-.92-.09-1.406-.27-1.117-.415-2.167-1.267-2.956-2.397-.788-1.13-1.226-2.41-1.23-3.601-.004-1.217.44-2.2 1.25-2.773a.186.186 0 0 1 .024-.016c.817-.565 1.894-.642 3.035-.217.738.274 1.446.738 2.069 1.348.913-.975 2.023-1.663 3.134-1.94 1.176-.295 2.218-.098 2.933.553l.002.001Zm-.64.077c-.579-.34-1.339-.413-2.187-.2v-.001c-1.036.258-2.074.907-2.934 1.831.208.23.401.474.579.728.61.874 1.009 1.837 1.16 2.78a2.908 2.908 0 0 0 .276-1.079c.007-.09.008-.18.007-.268v-.003c-.016-1.279.595-2.362 1.768-3.137a6.04 6.04 0 0 1 1.33-.65Zm-7.65.376A3.613 3.613 0 0 0 7.905 7.9c-.479 0-.917.118-1.292.351.023.564.133 1.12.324 1.65.435 1.18 1.228 1.889 2.355 2.108 1.277.247 2.208 1.078 2.692 2.402.168.467.276.955.322 1.45.043-.045.083-.09.122-.138.409-.498.627-1.186.624-1.998-.004-1.102-.413-2.293-1.15-3.349a6.95 6.95 0 0 0-.67-.82.336.336 0 0 1-.014-.015c-.614-.64-1.323-1.125-2.063-1.4ZM6.595 14.08c1.09 1.56 2.655 2.477 3.992 2.477h-.002c.47 0 .912-.113 1.296-.353a5.552 5.552 0 0 0-.32-1.65c-.436-1.18-1.228-1.889-2.356-2.107C7.93 12.198 7 11.367 6.514 10.044a5.914 5.914 0 0 1-.322-1.45c-.487.504-.75 1.247-.746 2.136.004 1.102.412 2.293 1.15 3.349Zm9.638-.434c.87-.957 1.438-2.078 1.602-3.158h-.001c.15-.996-.065-1.839-.603-2.39a5.664 5.664 0 0 0-1.521.698c-1.048.696-1.573 1.622-1.558 2.754a3.81 3.81 0 0 1-.05.664 3.368 3.368 0 0 1-.607 1.437v.073c.003.71-.148 1.34-.434 1.856 1.096-.225 2.251-.923 3.172-1.934Z',
  Producer:
    'M10.402 6.794a2.604 2.604 0 0 0 2.601 2.6c1.434 0 2.6-1.166 2.6-2.6 0-1.434-1.166-2.601-2.6-2.601a2.603 2.603 0 0 0-2.6 2.6Zm2.601-1.999c1.102 0 1.999.897 1.999 1.999a2.001 2.001 0 0 1-1.999 1.999 2 2 0 0 1-1.999-2c0-1.102.897-1.998 1.999-1.998ZM13.304 2.717V1.301a.3.3 0 1 0-.602 0v1.416a.3.3 0 1 0 .602 0ZM10.545 1.873a.3.3 0 1 0-.523.298l.701 1.23a.3.3 0 1 0 .523-.297l-.701-1.23ZM9.649 4.458 8.43 3.736a.3.3 0 1 0-.306.518l1.218.721a.299.299 0 0 0 .413-.105.301.301 0 0 0-.106-.412ZM7.512 6.401a.301.301 0 0 0-.006.602l1.416.024h.005a.301.301 0 0 0 .005-.602L7.517 6.4h-.005ZM9.284 8.49l-1.242.68a.3.3 0 1 0 .29.528l1.241-.681a.3.3 0 1 0-.29-.528ZM9.968 11.729a.3.3 0 0 0 .414-.1l.742-1.206a.3.3 0 1 0-.513-.315l-.741 1.207a.302.302 0 0 0 .098.414ZM12.567 10.858l-.047 1.416a.3.3 0 0 0 .29.31h.01a.3.3 0 0 0 .301-.29l.048-1.416a.3.3 0 0 0-.291-.31c-.16-.016-.306.124-.311.29ZM14.762 10.135a.301.301 0 0 0-.126.406l.66 1.253a.3.3 0 1 0 .532-.28l-.66-1.253a.301.301 0 0 0-.406-.126ZM16.186 8.825a.3.3 0 0 0 .091.416l1.194.762a.3.3 0 0 0 .324-.508L16.6 8.733a.301.301 0 0 0-.415.092ZM16.774 6.982a.301.301 0 0 0 .285.316l1.415.07.015.001a.301.301 0 0 0 .015-.602l-1.415-.07a.304.304 0 0 0-.315.285ZM17.77 4.047l-1.264.639a.3.3 0 1 0 .271.538l1.264-.64a.301.301 0 0 0-.272-.537ZM16.2 1.963a.3.3 0 0 0-.416.084l-.782 1.181a.301.301 0 0 0 .502.333l.781-1.181a.3.3 0 0 0-.084-.417ZM24.774 24.977a.3.3 0 0 0 .213-.514 31.467 31.467 0 0 0-4.081-3.43 42.335 42.335 0 0 1 3.94-1.185.301.301 0 0 0-.144-.584c-1.498.37-2.98.824-4.407 1.345a34.819 34.819 0 0 0-2.29-1.418 42.089 42.089 0 0 1 6.826-1.932.3.3 0 1 0-.114-.59 42.597 42.597 0 0 0-7.402 2.14 38.078 38.078 0 0 0-2.607-1.28 41.77 41.77 0 0 1 10.107-2.744.3.3 0 1 0-.082-.596 42.295 42.295 0 0 0-10.793 3.01 41.493 41.493 0 0 0-2.932-1.102c7.146-3.332 13.711-3.648 13.779-3.65a.3.3 0 0 0 .288-.314.297.297 0 0 0-.314-.288c-.07.003-7.107.338-14.589 3.983-4.99-1.55-8.786-1.74-8.858-1.742a.3.3 0 1 0-.025.601c.136.006 13.76.69 23.272 10.201.058.06.136.089.213.089Z M20.295 24.977a.3.3 0 0 0 .19-.535c-6.92-5.63-14.964-7.437-19.143-8.013a.301.301 0 0 0-.082.596c4.116.568 12.038 2.347 18.845 7.885a.3.3 0 0 0 .19.067ZM15.24 24.977a.301.301 0 0 0 .164-.554c-5.118-3.3-10.463-4.82-14.046-5.514a.3.3 0 1 0-.114.59c3.53.684 8.797 2.182 13.834 5.43a.3.3 0 0 0 .162.048ZM1.373 21.504a.302.302 0 0 0-.144.584 40.69 40.69 0 0 1 8.016 2.881.301.301 0 0 0 .263-.541 41.285 41.285 0 0 0-8.135-2.924Z',
  Taste:
    'M14.3625 7.545C14.9238 7.565 15.49 7.74125 16.0088 8.045C17.3313 8.8075 18.1238 10.2337 17.9125 11.9861L17.2088 17.8335C17.0113 19.4797 16.3938 20.6222 15.5001 21.3724C14.605 22.1199 13.4063 22.4849 11.9977 22.4849C10.5889 22.4849 9.39266 22.1199 8.49749 21.3724C7.60248 20.6223 6.98623 19.4799 6.78876 17.8335L6.08501 11.9836C5.83876 9.93857 6.83 8.71732 7.98751 8.04468C9.23 7.35969 10.6263 7.36344 11.6637 8.28968V13.5134C11.6474 13.9784 12.3524 13.9784 12.3362 13.5134L12.3337 8.29096C12.8599 7.80722 13.4824 7.57221 14.1212 7.54472C14.1999 7.54222 14.2799 7.54097 14.3624 7.54472L14.3625 7.545ZM9.31999 5.05374C10.1625 5.07249 11.035 5.29249 11.8537 5.69124C11.9488 5.73749 12.0562 5.73749 12.1488 5.69124C13.79 4.89499 15.6339 4.80625 17.0537 5.63374C17.5812 5.94124 18.6337 6.72625 18.9737 6.97749L17.5687 8.49624C17.2187 8.07749 16.8037 7.7275 16.3487 7.46248C14.9912 6.67122 13.2737 6.60497 11.9986 7.69623C10.7074 6.61873 9.06737 6.64625 7.65112 7.46248C7.19611 7.72498 6.77985 8.07374 6.43237 8.48872L5.02987 6.97745C5.37237 6.7237 6.42488 5.9412 6.95237 5.63371C7.65985 5.2212 8.47486 5.03621 9.31985 5.05371L9.31999 5.05374ZM9.04124 1.5139C9.27624 1.5139 9.50249 1.53765 9.71625 1.5839C10.5713 1.7714 11.2587 2.31388 11.7 3.1464C11.8262 3.3839 12.1662 3.3839 12.2925 3.1464C12.7325 2.31264 13.4212 1.77014 14.2775 1.5839C15.1325 1.3989 16.1725 1.5714 17.305 2.25641L22.0323 5.1214C22.5098 5.41015 22.6761 5.62016 22.7161 5.8239C22.7548 6.0289 22.6711 6.35139 22.3973 6.85264C21.5811 8.35638 20.1923 10.1477 18.6149 11.2952C18.5949 10.4602 18.3537 9.70144 17.9637 9.05644L19.7287 7.1527C19.8637 7.00645 19.8437 6.7752 19.6837 6.65644C19.6837 6.65644 18.1137 5.4752 17.3887 5.0527C15.7749 4.11145 13.765 4.23769 11.9973 5.0527C11.1361 4.65644 10.2248 4.39894 9.32229 4.38019C8.36978 4.36019 7.4373 4.56894 6.60853 5.0527C5.88229 5.4752 4.31352 6.65644 4.31352 6.65644C4.15478 6.77519 4.13478 7.00646 4.26853 7.1527L6.02603 9.04896C5.63352 9.6952 5.39227 10.4589 5.37227 11.2952C3.79601 10.1477 2.40853 8.35644 1.58987 6.85264C1.31737 6.35139 1.23486 6.02889 1.27362 5.8239C1.31237 5.62015 1.48112 5.41014 1.95861 5.1214L6.68245 2.25641C7.53871 1.7414 8.33621 1.51641 9.0412 1.51392L9.04124 1.5139ZM9.03999 0.843884C8.195 0.847634 7.275 1.11638 6.33999 1.68264L1.61359 4.54513C1.07109 4.87512 0.709846 5.22638 0.618582 5.69515C0.527318 6.16392 0.709834 6.62513 1.00732 7.17265C1.94233 8.89515 3.53356 10.9301 5.42364 12.1413L6.11989 17.9151C6.3349 19.6913 7.02489 21.0175 8.06489 21.885C9.10364 22.7562 10.4711 23.1562 11.9961 23.1562C13.5223 23.1562 14.8923 22.7562 15.9311 21.885C16.9699 21.0162 17.6586 19.69 17.8736 17.9151L18.5686 12.1413C20.4611 10.93 22.0538 8.89489 22.9885 7.17265C23.2872 6.62392 23.4685 6.16392 23.3772 5.69515C23.2847 5.22641 22.9234 4.87515 22.3797 4.54513L17.6559 1.68264C16.4084 0.92638 15.1884 0.698892 14.1359 0.928876C13.2396 1.12513 12.5246 1.62888 11.9971 2.39387C11.4696 1.62888 10.7559 1.12513 9.85836 0.928876C9.59461 0.871375 9.3221 0.843877 9.03961 0.843877L9.03999 0.843884Z',
  V60: 'M30.14 20.429h-6.035L33.39.929a.47.47 0 0 0 0-.62C33.236.156 33.08 0 32.925 0H5.533c-.31.155-.464.155-.619.464-.154.155-.154.31 0 .62l1.548 3.095c-.31 0-.62-.155-.929-.155A5.218 5.218 0 0 0 .271 9.286c0 2.94 2.322 5.416 5.262 5.416a5.408 5.408 0 0 0 3.405-1.238c.464-.464.929-.928 1.238-1.547l4.024 8.512H8.164c-2.785 0-4.952 2.166-4.952 4.952 0 .31.31.619.619.619h30.643c.31 0 .619-.31.619-.619 0-2.631-2.167-4.952-4.953-4.952Zm-7.428 0h-.774l6.5-19.036h3.405l-9.131 19.036Zm-2.94 0V1.393h7.273L20.7 20.429h-.928Zm-2.477 0L10.95 1.393h7.583v19.036h-1.238ZM5.533 13.464c-2.166 0-4.023-1.857-4.023-4.024 0-2.166 1.857-4.023 4.023-4.023.62 0 1.084.154 1.703.31l1.083 2.166 1.238 2.63c-.619 1.703-2.321 2.941-4.024 2.941Zm5.107-3.405L9.248 7.274 6.462 1.393h3.095l6.5 19.036h-.464l-4.953-10.37ZM4.45 24.762c.31-1.703 1.857-3.095 3.714-3.095h21.822c1.857 0 3.405 1.392 3.714 3.095H4.45Z',
  Variety:
    'M15.58 7.6c-.671 0-1.283-.208-1.77-.601-.699-.564-1.067-1.437-1.035-2.457.03-.963.416-1.951 1.088-2.784C14.752.658 16.001 0 17.206 0c.67 0 1.283.208 1.77.6 1.394 1.127 1.37 3.478-.053 5.242-.888 1.1-2.138 1.758-3.343 1.758Zm1.626-6.485c-.859 0-1.807.515-2.476 1.343-.52.644-.819 1.396-.841 2.118-.02.663.2 1.216.621 1.555.287.232.657.354 1.07.354.858 0 1.806-.514 2.475-1.343 1.038-1.285 1.137-2.933.22-3.674-.286-.231-.656-.353-1.07-.353Z M17.897 3.241c-.338.419-.897.528-1.248.245-.352-.284-.363-.853-.025-1.272.338-.419.896-.528 1.248-.244.351.283.363.853.025 1.271M15.546 13.232c-1.821 0-3.308-1.001-3.615-2.434-.188-.879.075-1.788.741-2.562.629-.73 1.551-1.255 2.598-1.479.36-.077.725-.116 1.085-.116 1.822 0 3.309 1 3.616 2.433.376 1.754-1.123 3.566-3.339 4.041-.36.078-.726.116-1.085.116Zm.809-5.476c-.282 0-.568.03-.852.091-.81.174-1.516.57-1.986 1.117-.434.503-.61 1.071-.496 1.6.195.915 1.234 1.553 2.525 1.553.282 0 .569-.03.852-.092 1.616-.346 2.73-1.565 2.483-2.717-.196-.914-1.235-1.553-2.526-1.553Z M17.47 10.446c-.526.113-1.03-.153-1.124-.595-.095-.441.255-.89.78-1.003.526-.113 1.03.153 1.124.595.095.441-.255.89-.78 1.003ZM10.453 9.608c-1.79 0-3.25-1.843-3.253-4.108-.002-1.07.317-2.082.898-2.85.616-.815 1.45-1.264 2.348-1.265 1.795 0 3.254 1.842 3.256 4.107.002 1.07-.317 2.082-.898 2.85-.615.815-1.449 1.265-2.347 1.266h-.004ZM10.45 2.5c-.544 0-1.062.293-1.462.822-.436.576-.675 1.35-.673 2.177.002 1.65.961 2.994 2.138 2.994v.558l.002-.558c.541 0 1.06-.293 1.46-.822.435-.576.674-1.349.673-2.177-.002-1.651-.961-2.994-2.138-2.994Z M11.267 4.117c0 .538-.366.974-.818.974-.45 0-.817-.436-.817-.974s.366-.974.817-.974c.452 0 .818.436.818.974ZM3.155 24a.744.744 0 0 1-.71-.965c.157-.503 3.935-12.36 11.348-16.523a.743.743 0 1 1 .727 1.296C7.618 11.685 3.9 23.361 3.863 23.48a.743.743 0 0 1-.709.521Z M10.03 21.383c-3.096 0-5.222-1.969-5.31-2.053a.744.744 0 0 1-.194-.781c.923-2.696 2.876-4.12 5.649-4.12 1.846 0 4.057.615 6.759 1.882a.742.742 0 0 1 .253 1.151c-2.19 2.602-4.598 3.922-7.157 3.922ZM6.117 18.55c.652.476 2.094 1.347 3.913 1.347 1.857 0 3.655-.891 5.355-2.653-2.08-.894-3.79-1.33-5.21-1.33-1.967.001-3.299.864-4.058 2.636Z M6.106 19.033a.556.556 0 0 1-.245-1.06c.069-.032 1.701-.806 4.653-.908a.557.557 0 0 1 .039 1.114c-2.695.092-4.192.792-4.207.8a.557.557 0 0 1-.24.054ZM6.025 15.943a.765.765 0 0 1-.175-.02c-.13-.032-3.187-.801-4.838-3.686-1.197-2.091-1.333-4.71-.404-7.78a.743.743 0 0 1 1.103-.416c3.779 2.342 5.82 4.629 6.24 6.99.28 1.573-.17 3.13-1.34 4.627a.744.744 0 0 1-.586.286ZM1.775 5.847c-.514 2.242-.338 4.14.527 5.652.99 1.732 2.64 2.53 3.438 2.829.685-1.021.93-2.019.748-3.037-.312-1.755-1.857-3.542-4.713-5.444Z M5.81 14.852a.557.557 0 0 1-.553-.486c-.004-.03-.24-1.662-1.627-3.959a.558.558 0 0 1 .955-.576c1.526 2.528 1.768 4.318 1.778 4.394a.558.558 0 0 1-.554.627Z',
  WholeBean:
    'M2.023 17.67c-.016.017-.035.03-.051.046-2.72 2.72-2.112 7.751 1.354 11.218a10.23 10.23 0 0 0 5.813 2.995c.344.046.69.069 1.036.07a6.05 6.05 0 0 0 4.289-1.646l.02-.017c.019-.018.041-.03.06-.048a6.291 6.291 0 0 0 1.642-5.404 10.24 10.24 0 0 0-2.995-5.814c-3.444-3.442-8.43-4.063-11.164-1.401l-.004.002Zm4.333-.48a8.75 8.75 0 0 1 5.997 2.718 9.043 9.043 0 0 1 2.658 5.128 5.46 5.46 0 0 1-.65 3.565 7.715 7.715 0 0 0-2.097-3.236 8.243 8.243 0 0 0-3.637-1.75 7.856 7.856 0 0 1-3.153-1.427 7.74 7.74 0 0 1-2.39-3.853 4.967 4.967 0 0 1 3.272-1.145Zm-1.63 5.918a8.937 8.937 0 0 0 3.585 1.649 7.175 7.175 0 0 1 3.163 1.492 6.857 6.857 0 0 1 1.969 3.404 5.178 5.178 0 0 1-4.15 1.1 9.038 9.038 0 0 1-5.129-2.657C1.488 25.42.73 21.741 2.186 19.372a8.555 8.555 0 0 0 2.54 3.737ZM32.253 22.776a10.228 10.228 0 0 0-2.288-6.126 6.33 6.33 0 0 0-5.106-2.418c-3.84.185-6.776 4.319-6.539 9.215a10.22 10.22 0 0 0 2.29 6.125 6.344 6.344 0 0 0 4.831 2.425c.092 0 .182-.002.273-.006 3.84-.186 6.775-4.32 6.54-9.215Zm-6.938 8.026a5.218 5.218 0 0 1-3.802-1.998 9.042 9.042 0 0 1-2.01-5.415c-.181-3.783 1.73-7.028 4.407-7.8a8.56 8.56 0 0 0-.638 4.485 8.944 8.944 0 0 0 1.545 3.63 7.172 7.172 0 0 1 1.34 3.232 6.877 6.877 0 0 1-.842 3.866Zm1.397-.183a7.713 7.713 0 0 0 .623-3.807 8.237 8.237 0 0 0-1.515-3.742 7.873 7.873 0 0 1-1.377-3.175 7.748 7.748 0 0 1 .827-4.468c1.49.09 2.87.814 3.79 1.99a9.04 9.04 0 0 1 2.01 5.415c.18 3.76-1.707 6.992-4.358 7.788ZM13.962.002c-4.91-.095-8.919 3.044-8.957 6.89-.038 3.846 3.922 7.013 8.823 7.06h.112c2.2.034 4.353-.644 6.136-1.933a6.303 6.303 0 0 0 2.703-4.884v-.006c0-.023.005-.045.005-.067.038-3.846-3.921-7.013-8.822-7.06Zm5.4 11.07a8.8 8.8 0 0 1-5.523 1.694c-3.761-.035-6.877-2.104-7.521-4.793a7.827 7.827 0 0 0 3.435.843c.11 0 .22-.002.328-.007a8.23 8.23 0 0 0 3.823-1.298 7.865 7.865 0 0 1 3.25-1.19 7.7 7.7 0 0 1 4.42 1.085 5.222 5.222 0 0 1-2.212 3.666Zm-2.32-5.931a8.94 8.94 0 0 0-3.712 1.332 7.17 7.17 0 0 1-3.305 1.151 6.776 6.776 0 0 1-3.808-1.06C6.48 3.557 9.8 1.187 13.85 1.187h.099c3.787.036 6.918 2.133 7.533 4.848a8.567 8.567 0 0 0-4.441-.894Z',
}

const iconsViewBoxMap: { [name: string]: string } = {
  Aeropress: '-1 0 16 32',
  Altitude: '0 0 25 18',
  BeanFill: '0 0 10 8',
  BeanOutline: '0 0 10 8',
  Chemex: '-1 0 22 33',
  Espresso: '0 0 30 32',
  FrenchPress: '-1 0 23 35',
  Moka: '-1 0 27 32',
  Origin: '-1 0 18 26',
  Processing: '0 0 24 24',
  Producer: '0 0 26 26',
  Taste: '-1 0 24 24',
  V60: '-1 0 36 26',
  Variety: '-1 0 21 24',
  WholeBean: '-1 0 33 32',
}

const iconsFillMap: { [name: string]: string } = {
  Aeropress: '#212121',
  Altitude: '#212121',
  BeanFill: '#212121',
  BeanOutline: 'none',
  Chemex: '#212121',
  Espresso: '#212121',
  FrenchPress: '#212121',
  Moka: '#212121',
  Origin: '#212121',
  Processing: '#212121',
  Producer: '#212121',
  Taste: '#212121',
  V60: '#212121',
  Variety: '#212121',
  WholeBean: '#212121',
}

const iconsStrokeMap: { [name: string]: string } = {
  Aeropress: 'none',
  Altitude: '#212121',
  BeanFill: 'none',
  BeanOutline: '#212121',
  Chemex: '#212121',
  Espresso: '#212121',
  FrenchPress: '#212121',
  Moka: '#212121',
  Origin: '#212121',
  Processing: '#212121',
  Producer: '#212121',
  Taste: '#212121',
  V60: '#212121',
  Variety: 'none',
  WholeBean: '#212121',
}

const iconsStrokeWidthMap: { [name: string]: string } = {
  Aeropress: 'none',
  Altitude: '0.5',
  BeanFill: 'none',
  BeanOutline: '0.5',
  Chemex: '0.25',
  Espresso: '0.25',
  FrenchPress: '0.25',
  Moka: '0.25',
  Origin: '0.25',
  Processing: '0.25',
  Producer: '0.25',
  Taste: '0.75',
  V60: '0.25',
  Variety: 'none',
  WholeBean: '0.25',
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
