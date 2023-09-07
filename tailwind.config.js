/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,png,svg}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                default: '#186E25'
            },
            fontSize: {
                default: '16px',
            },
            colors: {
                // base: '#186E25'
            },
            width: {
                boxInput: '222px'
            },
            height: {
                input: '1.4375em',
            },
            padding: {
                small: '8.5px 14px',
                normal: '16.5px 14px',
                large: '7px 21px'
            },
            borderRadius: {
                default: '4px',
            },
            boxShadow: {
                default: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
            }
        },
    },
    plugins: [],
}