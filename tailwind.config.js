module.exports = {
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    corePlugins: {
        textOpacity: false,
    },
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            primary: '#D4FF81',
            white: '#FFFFFF',
            negative: '#F87171',
            warning: '#FBBF24',
            positive: '#71ED8A',
            coreUI: {
                background: {
                    primary: '#FFFFFF',
                    images: '#F0F1F7',
                },
                text: {
                    primary: '#212121',
                    secondary: '#646575',
                    tertiary: '#BEBFCD',
                },
                border: '#DADBE3',
            },
            brand: {
                black: '#212121',
                grey: {
                    mine: '#343434',
                    bombay: '#B4B5BC',
                    whisper: '#F0F1F7',
                    woodsmoke: '#08090B'
                },
                green: {
                    ash: '#B8C6B1',
                    club: '#43F067',
                    starship: '#BCF253',
                },
                brown: '#8E7C7A',
                blue: '#EFF6FF',
            },
            tags: {
                capeHoney: '#FFE7A9',
                cottonCandy: '#FFB5DE',
                melrose: '#CEBDFF',
                coldTurkey: '#C7B2B2',
                yourPink: '#FFC5C5',
                santasGray: '#9799A9',
                jacksonsBlue: '#1E3A8A',
            }
        },
        fontFamily: {
            'sans': ['Open Sans', 'sans-serif'],
            'syne': ['Syne'],
        },
        letterSpacing :{
            'tightest': '-.12em',
        },
        screens: {
            xs: '375px',
            sm: '480px',
            md: '641px',
            lg: '769px',
            xl: '1025px',
        },
        extend: {
          keyframes: {
            swipe: {
              '0%': { left: 0 },
              '50%': { left: '100%' } ,
              '100%': { left: '100%' } 
            },
            aeropressDown: {
              '0%': { top: '0px' },
              '50%': { top: '50px' },
              '100%': { top: '0px' },
            },
            aeropressUp: {
              '0%': { bottom: '0px' },
              '50%': { bottom: '25px' },
              '100%': { bottom: '0px' },
            }
          },
          animation: {
            swipe: 'swipe 3s ease-in-out infinite',
            aeropressDown: 'aeropressDown 4s ease-in-out infinite',
            aeropressUp: 'aeropressUp 4s ease-in-out infinite'
          }
        }
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}
