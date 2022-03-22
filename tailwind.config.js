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
            primary: '#212121',
            secondary: '#D4FF81',
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
    },
    plugins: [],
}
