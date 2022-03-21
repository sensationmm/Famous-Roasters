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
            black: '#212121',
            grey: {
                mine: '#343434',
                bombay: '#B4B5BC',
                whisper: '#F0F1F7',
            },
            white: '#ffffff',
            green: {
                ash: '#B8C6B1',
                club: '#43F067',
                funky: '#D4FF81',
            },
            brown: '#8E7C7A',
        },
        fontFamily: {
            'sans': ['Open Sans', 'sans-serif'],
            'syne': ['Syne'],
        },
        screens: {
            md: '641px',
            xl: '1025px',
        },
        spacing: {
            '1': '8px',
            '2': '12px',
            '3': '16px',
            '4': '24px',
            '5': '32px',
            '6': '48px',
        },
    },
    plugins: [],
}
