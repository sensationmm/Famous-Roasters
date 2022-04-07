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
                border: '#F0F1F7',
            },
            brand: {
                black: '#212121',
                grey: {
                    mine: '#343434',
                    bombay: '#B4B5BC',
                    whisper: '#F0F1F7',
                },
                green: {
                    ash: '#B8C6B1',
                    club: '#43F067',
                    starship: '#BCF253',
                },
                brown: '#8E7C7A',
            },
        },
        fontFamily: {
            'sans': ['Open Sans', 'sans-serif'],
            'syne': ['Syne'],
        },
        screens: {
            md: '641px',
            xl: '1025px',
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}