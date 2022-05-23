import React from 'react'

export enum IconName {
  Altitude = 'Altitude',
  BeanFill = 'BeanFill',
  BeanOutline = 'BeanOutline',
  Origin = 'Origin',
  Processing = 'Processing',
  Producer = 'Producer',
  Taste = 'Taste',
  Variety = 'Variety',
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
  Altitude:
    'm25.338 15.314-3.486-6.2a1.779 1.779 0 0 0-1.571-.914c-.657 0-1.258.343-1.572.914l-.543.915-3.628-8.915A1.806 1.806 0 0 0 12.852 0c-.743 0-1.4.428-1.686 1.143L8.31 8.314l-.657-1.343c-.314-.628-.943-1-1.629-1-.685 0-1.314.372-1.628 1l-4.2 8.4a1.784 1.784 0 0 0 .086 1.772c.342.543.914.857 1.542.857h21.943c.657 0 1.229-.343 1.572-.886.314-.571.343-1.228 0-1.8ZM12.252 1.543c.143-.4.514-.429.629-.429.114 0 .457.029.628.429l.915 2.228-2.03 1.172-1.056-1.057.914-2.343ZM1.823 16.857a.658.658 0 0 1-.57-.314.67.67 0 0 1-.03-.657l4.2-8.4a.666.666 0 0 1 .6-.372c.258 0 .486.143.6.372l4.687 9.371H1.823Zm10.772 0-3.6-7.2c.028-.028.028-.057.057-.086l1.8-4.514 1.029 1.029a.564.564 0 0 0 .4.171c.114 0 .2-.028.286-.086l2.285-1.314 4.915 12h-7.172Zm11.743-.314c-.057.085-.229.343-.572.343h-2.771l-2.257-5.543.971-1.657c.172-.315.486-.315.572-.343.114 0 .4.028.571.343l3.515 6.171c.171.314.028.572-.03.686Z',
  BeanFill:
    'M9.43099 2.83089C9.16185 1.75199 8.44466 1.02499 7.49819 0.676592C6.55171 0.328153 5.37668 0.354323 4.17978 0.765654C2.80827 1.23674 1.75907 1.88475 1.13637 2.64455C1.12738 2.65549 1.11957 2.66642 1.11098 2.67736C0.864095 2.97658 0.691445 3.29298 0.599644 3.62424C0.449254 4.12229 0.465264 4.64803 0.673864 5.18243C1.00667 6.03477 1.58168 6.76603 2.39187 7.18633C3.20242 7.60624 4.24618 7.71249 5.50708 7.32383C6.79418 6.92695 7.88439 6.25823 8.60009 5.46133C9.31579 4.66443 9.65675 3.73558 9.43099 2.83089ZM9.27631 2.48831C8.58919 3.06799 6.6775 4.4086 4.86649 4.3C3.36338 4.22227 2.10868 4.93945 0.907876 5.6059C0.832485 5.46254 0.764906 5.31449 0.705146 5.16176C0.679365 5.09574 0.65788 5.03012 0.637957 4.96449C1.94226 4.24457 3.29657 3.48399 4.90247 3.62149C6.79698 3.69493 7.83218 2.84025 8.99309 1.9192C9.10442 2.09303 9.19975 2.28245 9.27631 2.48831Z',
  BeanOutline:
    'M9.18843 2.89141L9.18843 2.8914C9.18764 2.88822 9.18684 2.88504 9.18604 2.88187C8.80763 3.17406 8.25235 3.55289 7.60442 3.87599C6.79638 4.27893 5.82012 4.60734 4.85262 4.54962C3.50616 4.4803 2.36492 5.08407 1.21503 5.72136C1.53211 6.24814 1.96482 6.68312 2.50687 6.96435L9.18843 2.89141ZM9.18843 2.89141C9.38777 3.69024 9.0944 4.5368 8.41409 5.29428C7.73414 6.05138 6.68586 6.69873 5.43341 7.08492M9.18843 2.89141L5.43341 7.08492M5.43341 7.08492C4.2242 7.45766 3.24977 7.34918 2.50699 6.96441L5.43341 7.08492ZM0.77406 4.60386C0.726227 4.29237 0.75066 3.98897 0.838971 3.6965L0.839034 3.69652L0.840564 3.691C0.92158 3.39866 1.07563 3.11303 1.30381 2.83647L1.30387 2.83651L1.30755 2.83182C1.31881 2.8175 1.32147 2.81377 1.32317 2.81139C1.32456 2.80945 1.32531 2.8084 1.32955 2.80323L1.32973 2.80302C1.91221 2.09229 2.91385 1.46482 4.26099 1.00209L4.26103 1.00208C5.41635 0.605041 6.53083 0.586871 7.41182 0.911199L7.41183 0.911202C7.92803 1.10122 8.36812 1.41118 8.69292 1.83824C7.59359 2.70994 6.63254 3.43669 4.91779 3.37189C3.33793 3.23867 1.99537 3.93171 0.77406 4.60386Z',
  Origin:
    'M13.4996 3.63672L13.4192 3.73248C12.1398 2.65894 10.57 2.12215 8.9998 2.12211L13.4996 3.63672ZM13.4996 3.63672L13.4192 3.73248C15.9744 5.87638 16.6218 9.53328 14.9604 12.4243L9.11398 20.8035L9.11361 20.8032M13.4996 3.63672L9.11361 20.8032M9.11361 20.8032L9.10824 20.8125M9.11361 20.8032L9.10824 20.8125M9.10824 20.8125C9.08557 20.8518 9.04535 20.8751 8.9997 20.8751C8.95406 20.8751 8.91383 20.8518 8.89116 20.8125L8.89156 20.8123M9.10824 20.8125L8.89156 20.8123M8.89156 20.8123L8.88542 20.8035M8.89156 20.8123L8.88542 20.8035M8.88542 20.8035L3.03901 12.4243M8.88542 20.8035L3.03901 12.4243M3.03901 12.4243C1.37761 9.53368 2.02493 5.87676 4.58019 3.73248C5.8596 2.65894 7.42941 2.12215 8.9996 2.12211L3.03901 12.4243ZM1.96268 13.0614L1.96229 13.0617L1.96843 13.0705L7.8111 21.4421C8.05694 21.8641 8.511 22.1248 8.9996 22.1248C9.4882 22.1248 9.94222 21.8641 10.1881 21.4421L16.0308 13.0705L16.0311 13.0707L16.0365 13.0614C18.0068 9.64931 17.241 5.30679 14.2225 2.77439C12.7133 1.50799 10.8567 0.875 8.99977 0.875H8.9996C7.14259 0.875 5.28597 1.50799 3.77686 2.77438C0.758357 5.30696 -0.00739348 9.64934 1.96268 13.0614ZM9.0093 4.87491L9.00816 4.99989L4.91485 8.21976L6.41477 12.2197L6.41482 12.2198C6.50646 12.4633 6.73934 12.6247 6.99945 12.6249H6.99955H10.9996H10.9997C11.2599 12.6247 11.4927 12.4633 11.5844 12.2198L11.5844 12.2197L13.0843 8.21976C13.1842 7.95485 13.0935 7.65605 12.8634 7.49114L12.8632 7.49103L9.36325 4.99114C9.26039 4.91761 9.13772 4.87724 9.01159 4.87493L9.00931 4.99981L9.0093 4.87491ZM9.01057 4.99994L9.01183 4.87494C8.8774 4.87222 8.74552 4.91278 8.63593 4.99115L5.13596 7.49103L5.13582 7.49113C4.90571 7.65597 4.81508 7.9547 4.91478 8.21958L9.01057 4.99994ZM5.37421 19.75C5.37421 19.4051 5.09467 19.1252 4.74957 19.1249L3.91019 22.382C3.73239 22.1854 3.64593 22.0293 3.61584 21.8909C3.58645 21.7558 3.60749 21.6218 3.67737 21.461L3.67738 21.461C3.81519 21.1438 4.23805 20.6719 5.00929 20.3186C5.23157 20.217 5.374 19.994 5.37421 19.7501V19.75ZM4.74915 19.1249C4.65926 19.1252 4.57074 19.1449 4.48927 19.1825L4.48875 19.1827C3.56995 19.6119 2.84336 20.2452 2.53145 20.963L2.64609 21.0128L2.53144 20.963C2.20826 21.7069 2.39554 22.5713 2.98314 23.2206C3.56348 23.862 4.43693 24.3371 5.47532 24.6521C6.51499 24.9675 7.72855 25.125 8.99949 25.125C10.2704 25.125 11.4838 24.9675 12.5232 24.6521C13.5614 24.3371 14.4346 23.862 15.015 23.2206C15.6025 22.5714 15.7909 21.707 15.4677 20.963L15.4677 20.963C15.1577 20.2496 14.4237 19.6126 13.5145 19.1847L13.5136 19.1843C13.4333 19.1473 13.3409 19.1254 13.2501 19.1249H13.2495C12.9042 19.1249 12.6245 19.4049 12.6245 19.75V19.7502C12.6249 19.9947 12.7679 20.2165 12.9904 20.3177C13.7613 20.6707 14.1824 21.1435 14.3203 21.461L14.3203 21.4611C14.3903 21.622 14.4116 21.756 14.3824 21.8911C14.3525 22.0295 14.2662 22.1855 14.0885 22.382C13.7405 22.7665 13.0554 23.1416 12.1528 23.4204C11.2546 23.6979 10.1567 23.875 8.99934 23.875C7.84194 23.875 6.74419 23.6979 5.84606 23.4204C4.9435 23.1416 4.25835 22.7665 3.91022 22.382L4.74915 19.1249ZM8.9996 6.26876L11.7462 8.2295L10.5663 11.3749H7.43288L6.25284 8.2295L8.9996 6.26876Z',
  Processing:
    'M18.398 10.572c-.18 1.194-.802 2.42-1.744 3.456-1.107 1.217-2.547 2.025-3.887 2.173a2.81 2.81 0 0 1-.463.406l-.032.022h-.001c-.488.33-1.061.496-1.68.496-.463 0-.951-.093-1.449-.278-1.144-.425-2.213-1.295-3.014-2.443-.801-1.148-1.248-2.451-1.253-3.672-.005-1.245.45-2.27 1.3-2.873a.312.312 0 0 1 .031-.021c.859-.591 1.979-.664 3.147-.23.72.268 1.41.711 2.02 1.288.911-.94 2.006-1.608 3.109-1.884 1.205-.301 2.293-.104 3.047.582l.005.004c.751.686 1.049 1.749.864 2.974Zm0 0-.124-.018.124.018ZM14.555 7.71c-.946.258-1.895.85-2.7 1.688.183.209.354.427.512.654a7.1 7.1 0 0 1 1.097 2.402c.032-.11.058-.221.077-.334l1.014-4.41Zm0 0 .095-.024c.705-.176 1.336-.148 1.843.063-.38.15-.743.34-1.085.563-1.205.795-1.842 1.916-1.825 3.241v.005c.001.085 0 .171-.007.256v.002a3.23 3.23 0 0 1-.023.224l1.002-4.33Zm-6.649.315c-.43 0-.824.1-1.163.295.029.525.134 1.044.312 1.539.422 1.142 1.182 1.817 2.262 2.027l-1.41-3.861Zm0 0c.377 0 .784.077 1.207.234.719.267 1.412.74 2.015 1.368l.015.015c.24.252.459.521.657.806.726 1.039 1.124 2.204 1.128 3.277.003.745-.185 1.372-.53 1.835L7.906 8.025Zm1.276 4.543c-1.324-.257-2.287-1.12-2.785-2.482A6.04 6.04 0 0 1 6.1 8.894c-.345.463-.533 1.092-.53 1.836h-.125.125c.004 1.072.402 2.239 1.127 3.277 1.074 1.537 2.605 2.423 3.888 2.424.425 0 .82-.096 1.168-.296m-2.572-3.567.024-.122-.024.122Zm0 0c1.08.21 1.84.885 2.262 2.027m0 0c.177.496.282 1.014.31 1.54m-.31-1.54.117-.043-.117.044v-.001Zm.31 1.54a1.97 1.97 0 0 0 .062-.038l.066.106-.125.006a4.554 4.554 0 0 0-.003-.074Zm5.942-5.567.015-.1c.142-.936-.051-1.713-.518-2.229a5.539 5.539 0 0 0-1.41.658l-.003.002c-1.018.676-1.516 1.565-1.502 2.648l3.418-.979Zm0 0c-.178 1.021-.725 2.08-1.555 2.992l.093.085-.093-.085c-.833.917-1.859 1.567-2.848 1.835.219-.486.33-1.052.328-1.672h-.023m4.098-3.155-4.075 3.155h-.023m0 0h-.002m.002 0v.001h-.002m.002-.001.023-.032v-.04h-.125l.1.072m.002 0h-.003m0 0h-.099.1m0 0 M.857 12c0-2.652.949-5.217 2.675-7.23a.433.433 0 0 1 .754.279v.523a.436.436 0 0 0 .504.422.471.471 0 0 0 .353-.474V3a.429.429 0 0 0-.429-.428H2.143a.44.44 0 0 0-.422.504.471.471 0 0 0 .474.353h.423a.434.434 0 0 1 .324.71A11.982 11.982 0 0 0 .86 16.463a.43.43 0 0 0 .795-.328A10.973 10.973 0 0 1 .857 12ZM21.805 20.572h-.423a.434.434 0 0 1-.324-.71A11.982 11.982 0 0 0 23.14 7.538a.43.43 0 0 0-.795.328 11.111 11.111 0 0 1-1.876 11.365.434.434 0 0 1-.753-.28v-.522a.436.436 0 0 0-.505-.422.471.471 0 0 0-.353.474V21a.43.43 0 0 0 .429.428h2.571a.44.44 0 0 0 .422-.504.472.472 0 0 0-.473-.352ZM16.135 22.344A11.111 11.111 0 0 1 4.77 20.468a.433.433 0 0 1 .279-.753h.523a.436.436 0 0 0 .422-.505.471.471 0 0 0-.474-.353H3a.429.429 0 0 0-.428.429v2.571a.44.44 0 0 0 .504.422.471.471 0 0 0 .353-.473v-.424a.434.434 0 0 1 .71-.324 11.983 11.983 0 0 0 12.324 2.081.43.43 0 0 0-.328-.795ZM21.429 4.714V2.143a.44.44 0 0 0-.504-.422.471.471 0 0 0-.353.474v.423a.434.434 0 0 1-.71.324A11.982 11.982 0 0 0 7.538.86a.43.43 0 0 0 .328.795A11.11 11.11 0 0 1 19.23 3.531a.434.434 0 0 1-.28.755h-.522a.436.436 0 0 0-.422.504.471.471 0 0 0 .474.353H21a.43.43 0 0 0 .428-.429Z',
  Producer:
    'M13.003 9.52a2.729 2.729 0 0 1-2.726-2.726 2.728 2.728 0 0 1 2.726-2.726V9.52Zm0 0a2.729 2.729 0 0 0 2.726-2.726M13.003 9.52l2.726-2.726m0 0a2.728 2.728 0 0 0-2.726-2.726l2.726 2.726ZM13.003 4.92c1.033 0 1.874.84 1.874 1.874 0 1.033-.84 1.874-1.874 1.874a1.876 1.876 0 0 1-1.874-1.874c0-1.033.841-1.874 1.874-1.874ZM13.43 2.717V1.301a.426.426 0 1 0-.853 0v1.416a.426.426 0 1 0 .852 0ZM11.195 3.623a.426.426 0 0 0 .16-.581l-.11.062.11-.062-1.442-.809.701 1.23a.426.426 0 0 0 .581.16Zm0 0-.062-.109.062.109Zm-1.123-1.97a.426.426 0 0 0-.159.58l.74-.421-.108.061.108-.062a.426.426 0 0 0-.58-.159ZM9.524 4.238l.189.112c.202.12.269.381.15.584l-.339-.696Zm0 0-1.03-.61a.426.426 0 0 0-.583.15l1.613.46Zm-1.464.123a.426.426 0 0 1-.15-.583l.15.583Zm0 0 1.219.722.063-.108c.048.029.101.043.154.043L8.06 4.36ZM7.086 6.695a.426.426 0 0 0 .418.433l1.416.024h.007a.426.426 0 0 0 .007-.852L7.52 6.276h-.007a.426.426 0 0 0-.426.419ZM7.813 9.639a.426.426 0 0 0 .579.168l1.241-.68a.426.426 0 0 0 .169-.579l-.11.06.11-.06a.425.425 0 0 0-.579-.168l-1.241.68a.426.426 0 0 0-.169.579Zm0 0 .11-.06-.11.06ZM11.026 10.01l.065-.107a.426.426 0 0 0-.586.14l-.742 1.206a.427.427 0 0 0 .08.542l.125-.062a.3.3 0 0 0 .414-.1m.644-1.62.065-.106c.2.123.263.386.14.586l-.742 1.206-.107-.065m.644-1.62a.3.3 0 0 1 .098.413l-.742 1.207m.644-1.62a.3.3 0 0 0-.415.098l-.229 1.522M13.246 12.297a.426.426 0 0 1-.425.412l.425-.412Zm0 0 .047-1.415a.425.425 0 0 0-.407-.44l.36 1.855Zm-.851-.028.047-1.415.125.004-.172 1.411Zm0 0a.425.425 0 0 0 .41.44l-.41-.44ZM14.525 10.6l.66 1.253a.426.426 0 0 0 .575.178.426.426 0 0 0 .18-.575h-.001l-.66-1.253a.426.426 0 0 0-.575-.18l-.067.036v.009a.426.426 0 0 0-.112.531ZM16.31 8.396v.185a.425.425 0 0 1 .358.047l1.194.762-.067.105a.3.3 0 0 1 .092.416L16.31 8.396Zm0 0-.23.362a.426.426 0 0 0-.02.424m.25-.786-.25.786m0 0v.07l.022-.033c.032.05.075.093.128.127l-.15-.164ZM16.663 7.107c.046.174.2.306.39.316l1.414.07h.002l.02.001a.426.426 0 0 0 .021-.851l-1.414-.071-.006.125-.427.41ZM16.834 5.335a.426.426 0 0 1-.573-.188l.573.188Zm0 0 1.264-.639a.426.426 0 0 0 .187-.572m-1.451 1.211 1.451-1.212m0 0a.426.426 0 0 0-.573-.187m.573.187-.573-.187m0 0-1.263.638a.426.426 0 0 0-.188.573l1.451-1.211ZM16.27 1.858c.196.13.25.395.12.59l-.782 1.181-.104-.068a.3.3 0 1 1-.502-.333l1.268-1.37Zm0 0-.194-.128v.06l.194.068Zm-.59.12-.782 1.181.781-1.18ZM24.753 25.102h-.002a.422.422 0 0 1-.279-.126C15 15.504 1.425 14.818 1.283 14.812l.006-.125A.3.3 0 0 1 1 14.374l23.752 10.728Zm0 0h.021a.425.425 0 0 0 .301-.727m-.322.727-3.578-4.032m3.657-6.161a.425.425 0 1 0-.117-.844 42.425 42.425 0 0 0-10.775 2.998 41.54 41.54 0 0 0-2.595-.983c7.01-3.198 13.382-3.506 13.447-3.509l-.12 6.571a42.982 42.982 0 0 0-4.36 1.328 34.745 34.745 0 0 0-2.014-1.255 41.96 41.96 0 0 1 6.557-1.833.426.426 0 1 0-.162-.836 42.734 42.734 0 0 0-7.37 2.125 38.131 38.131 0 0 0-2.298-1.136 41.663 41.663 0 0 1 9.807-2.626Zm0 0-.017-.124m.017.124-.017-.124m0 0a.3.3 0 0 0 .257-.34l-.257.34Zm.26 9.59a31.51 31.51 0 0 0-3.9-3.305m3.9 3.305-.088.088.088-.088Zm-3.9-3.305c1.207-.42 2.448-.79 3.701-1.1a.426.426 0 0 0-.205-.827l-3.496 1.927ZM1.32 13.96a.425.425 0 0 0-.445.408l23.91-1.922a.3.3 0 0 0 .288-.313.297.297 0 0 0-.313-.288l-.005-.125h-.002c-.164.008-7.151.361-14.592 3.974-4.952-1.532-8.722-1.728-8.841-1.733Z m20.44 25.076.006.026h-.151a.423.423 0 0 1-.269-.096c-6.782-5.517-14.677-7.29-18.783-7.857l19.198 7.927Zm0 0a.423.423 0 0 0 .185-.132m-.184.132.122-.73m.062.598-.097-.078.097.078Zm0 0a.426.426 0 0 0-.062-.598m0 0-.078.096.078-.097c-6.944-5.65-15.014-7.462-19.203-8.04a.425.425 0 0 0-.481.364l19.684 7.677ZM.88 16.669a.426.426 0 0 0 .364.48l-.364-.48ZM15.471 24.318a.426.426 0 0 1-.223.784h-.008a.425.425 0 0 1-.23-.068c-5.02-3.237-10.269-4.73-13.79-5.412l.024-.123a.3.3 0 0 1-.238-.352l14.465 5.17Zm0 0c-5.135-3.311-10.497-4.836-14.089-5.532l14.09 5.532ZM.888 21.694a.426.426 0 0 0 .31.516 40.564 40.564 0 0 1 7.992 2.872.426.426 0 0 0 .569-.197.426.426 0 0 0-.196-.57 41.417 41.417 0 0 0-8.16-2.932l-.001.006v-.006a.426.426 0 0 0-.514.311Zm0 0 .12.03-.12-.03Z',
  Taste:
    'M14.3625 7.545C14.9238 7.565 15.49 7.74125 16.0088 8.045C17.3313 8.8075 18.1238 10.2337 17.9125 11.9861L17.2088 17.8335C17.0113 19.4797 16.3938 20.6222 15.5001 21.3724C14.605 22.1199 13.4063 22.4849 11.9977 22.4849C10.5889 22.4849 9.39266 22.1199 8.49749 21.3724C7.60248 20.6223 6.98623 19.4799 6.78876 17.8335L6.08501 11.9836C5.83876 9.93857 6.83 8.71732 7.98751 8.04468C9.23 7.35969 10.6263 7.36344 11.6637 8.28968V13.5134C11.6474 13.9784 12.3524 13.9784 12.3362 13.5134L12.3337 8.29096C12.8599 7.80722 13.4824 7.57221 14.1212 7.54472C14.1999 7.54222 14.2799 7.54097 14.3624 7.54472L14.3625 7.545ZM9.31999 5.05374C10.1625 5.07249 11.035 5.29249 11.8537 5.69124C11.9488 5.73749 12.0562 5.73749 12.1488 5.69124C13.79 4.89499 15.6339 4.80625 17.0537 5.63374C17.5812 5.94124 18.6337 6.72625 18.9737 6.97749L17.5687 8.49624C17.2187 8.07749 16.8037 7.7275 16.3487 7.46248C14.9912 6.67122 13.2737 6.60497 11.9986 7.69623C10.7074 6.61873 9.06737 6.64625 7.65112 7.46248C7.19611 7.72498 6.77985 8.07374 6.43237 8.48872L5.02987 6.97745C5.37237 6.7237 6.42488 5.9412 6.95237 5.63371C7.65985 5.2212 8.47486 5.03621 9.31985 5.05371L9.31999 5.05374ZM9.04124 1.5139C9.27624 1.5139 9.50249 1.53765 9.71625 1.5839C10.5713 1.7714 11.2587 2.31388 11.7 3.1464C11.8262 3.3839 12.1662 3.3839 12.2925 3.1464C12.7325 2.31264 13.4212 1.77014 14.2775 1.5839C15.1325 1.3989 16.1725 1.5714 17.305 2.25641L22.0323 5.1214C22.5098 5.41015 22.6761 5.62016 22.7161 5.8239C22.7548 6.0289 22.6711 6.35139 22.3973 6.85264C21.5811 8.35638 20.1923 10.1477 18.6149 11.2952C18.5949 10.4602 18.3537 9.70144 17.9637 9.05644L19.7287 7.1527C19.8637 7.00645 19.8437 6.7752 19.6837 6.65644C19.6837 6.65644 18.1137 5.4752 17.3887 5.0527C15.7749 4.11145 13.765 4.23769 11.9973 5.0527C11.1361 4.65644 10.2248 4.39894 9.32229 4.38019C8.36978 4.36019 7.4373 4.56894 6.60853 5.0527C5.88229 5.4752 4.31352 6.65644 4.31352 6.65644C4.15478 6.77519 4.13478 7.00646 4.26853 7.1527L6.02603 9.04896C5.63352 9.6952 5.39227 10.4589 5.37227 11.2952C3.79601 10.1477 2.40853 8.35644 1.58987 6.85264C1.31737 6.35139 1.23486 6.02889 1.27362 5.8239C1.31237 5.62015 1.48112 5.41014 1.95861 5.1214L6.68245 2.25641C7.53871 1.7414 8.33621 1.51641 9.0412 1.51392L9.04124 1.5139ZM9.03999 0.843884C8.195 0.847634 7.275 1.11638 6.33999 1.68264L1.61359 4.54513C1.07109 4.87512 0.709846 5.22638 0.618582 5.69515C0.527318 6.16392 0.709834 6.62513 1.00732 7.17265C1.94233 8.89515 3.53356 10.9301 5.42364 12.1413L6.11989 17.9151C6.3349 19.6913 7.02489 21.0175 8.06489 21.885C9.10364 22.7562 10.4711 23.1562 11.9961 23.1562C13.5223 23.1562 14.8923 22.7562 15.9311 21.885C16.9699 21.0162 17.6586 19.69 17.8736 17.9151L18.5686 12.1413C20.4611 10.93 22.0538 8.89489 22.9885 7.17265C23.2872 6.62392 23.4685 6.16392 23.3772 5.69515C23.2847 5.22641 22.9234 4.87515 22.3797 4.54513L17.6559 1.68264C16.4084 0.92638 15.1884 0.698892 14.1359 0.928876C13.2396 1.12513 12.5246 1.62888 11.9971 2.39387C11.4696 1.62888 10.7559 1.12513 9.85836 0.928876C9.59461 0.871375 9.3221 0.843877 9.03961 0.843877L9.03999 0.843884Z',
  Variety:
    'M15.58 7.6c-.671 0-1.283-.208-1.77-.601-.699-.564-1.067-1.437-1.035-2.457.03-.963.416-1.951 1.088-2.784C14.752.658 16.001 0 17.206 0c.67 0 1.283.208 1.77.6 1.394 1.127 1.37 3.478-.053 5.242-.888 1.1-2.138 1.758-3.343 1.758Zm1.626-6.485c-.859 0-1.807.515-2.476 1.343-.52.644-.819 1.396-.841 2.118-.02.663.2 1.216.621 1.555.287.232.657.354 1.07.354.858 0 1.806-.514 2.475-1.343 1.038-1.285 1.137-2.933.22-3.674-.286-.231-.656-.353-1.07-.353Z M17.897 3.241c-.338.419-.897.528-1.248.245-.352-.284-.363-.853-.025-1.272.338-.419.896-.528 1.248-.244.351.283.363.853.025 1.271M15.546 13.232c-1.821 0-3.308-1.001-3.615-2.434-.188-.879.075-1.788.741-2.562.629-.73 1.551-1.255 2.598-1.479.36-.077.725-.116 1.085-.116 1.822 0 3.309 1 3.616 2.433.376 1.754-1.123 3.566-3.339 4.041-.36.078-.726.116-1.085.116Zm.809-5.476c-.282 0-.568.03-.852.091-.81.174-1.516.57-1.986 1.117-.434.503-.61 1.071-.496 1.6.195.915 1.234 1.553 2.525 1.553.282 0 .569-.03.852-.092 1.616-.346 2.73-1.565 2.483-2.717-.196-.914-1.235-1.553-2.526-1.553Z M17.47 10.446c-.526.113-1.03-.153-1.124-.595-.095-.441.255-.89.78-1.003.526-.113 1.03.153 1.124.595.095.441-.255.89-.78 1.003ZM10.453 9.608c-1.79 0-3.25-1.843-3.253-4.108-.002-1.07.317-2.082.898-2.85.616-.815 1.45-1.264 2.348-1.265 1.795 0 3.254 1.842 3.256 4.107.002 1.07-.317 2.082-.898 2.85-.615.815-1.449 1.265-2.347 1.266h-.004ZM10.45 2.5c-.544 0-1.062.293-1.462.822-.436.576-.675 1.35-.673 2.177.002 1.65.961 2.994 2.138 2.994v.558l.002-.558c.541 0 1.06-.293 1.46-.822.435-.576.674-1.349.673-2.177-.002-1.651-.961-2.994-2.138-2.994Z M11.267 4.117c0 .538-.366.974-.818.974-.45 0-.817-.436-.817-.974s.366-.974.817-.974c.452 0 .818.436.818.974ZM3.155 24a.744.744 0 0 1-.71-.965c.157-.503 3.935-12.36 11.348-16.523a.743.743 0 1 1 .727 1.296C7.618 11.685 3.9 23.361 3.863 23.48a.743.743 0 0 1-.709.521Z M10.03 21.383c-3.096 0-5.222-1.969-5.31-2.053a.744.744 0 0 1-.194-.781c.923-2.696 2.876-4.12 5.649-4.12 1.846 0 4.057.615 6.759 1.882a.742.742 0 0 1 .253 1.151c-2.19 2.602-4.598 3.922-7.157 3.922ZM6.117 18.55c.652.476 2.094 1.347 3.913 1.347 1.857 0 3.655-.891 5.355-2.653-2.08-.894-3.79-1.33-5.21-1.33-1.967.001-3.299.864-4.058 2.636Z M6.106 19.033a.556.556 0 0 1-.245-1.06c.069-.032 1.701-.806 4.653-.908a.557.557 0 0 1 .039 1.114c-2.695.092-4.192.792-4.207.8a.557.557 0 0 1-.24.054ZM6.025 15.943a.765.765 0 0 1-.175-.02c-.13-.032-3.187-.801-4.838-3.686-1.197-2.091-1.333-4.71-.404-7.78a.743.743 0 0 1 1.103-.416c3.779 2.342 5.82 4.629 6.24 6.99.28 1.573-.17 3.13-1.34 4.627a.744.744 0 0 1-.586.286ZM1.775 5.847c-.514 2.242-.338 4.14.527 5.652.99 1.732 2.64 2.53 3.438 2.829.685-1.021.93-2.019.748-3.037-.312-1.755-1.857-3.542-4.713-5.444Z M5.81 14.852a.557.557 0 0 1-.553-.486c-.004-.03-.24-1.662-1.627-3.959a.558.558 0 0 1 .955-.576c1.526 2.528 1.768 4.318 1.778 4.394a.558.558 0 0 1-.554.627Z',
}

const iconsViewBoxMap: { [name: string]: string } = {
  Altitude: '0 0 25 18',
  BeanFill: '0 0 10 8',
  BeanOutline: '0 0 10 8',
  Origin: '0 0 18 26',
  Processing: '-1 -1 26 26',
  Producer: '-1 0 26 26',
  Taste: '-1 0 24 24',
  Variety: '-1 0 21 24',
}

const iconsFillMap: { [name: string]: string } = {
  Altitude: '#212121',
  BeanFill: '#212121',
  BeanOutline: 'none',
  Origin: '#212121',
  Processing: '#212121',
  Producer: '#212121',
  Taste: '#212121',
  Variety: '#212121',
}

const iconsStrokeMap: { [name: string]: string } = {
  Altitude: '#212121',
  BeanFill: 'none',
  BeanOutline: '#212121',
  Origin: '#212121',
  Processing: '#212121',
  Producer: '#212121',
  Taste: '#212121',
  Variety: 'none',
}

const iconsStrokeWidthMap: { [name: string]: string } = {
  Altitude: '0.5',
  BeanFill: 'none',
  BeanOutline: '0.5',
  Origin: '0.25',
  Processing: '0.25',
  Producer: '0.25',
  Taste: '0.75',
  Variety: 'none',
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
