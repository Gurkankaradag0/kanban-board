/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#796eff',
                backdrop: '#151b26',
                lighter: '#cbd4db',
                hover: '#cbd4db4d'
            },
            boxShadow: {
                box: '0 5px 20px 0 rgba(21, 7, 38, 0.08)',
                small: '0 1px 4px 0 rgba(21, 7, 38, 0.08)'
            }
        }
    },
    plugins: []
}
