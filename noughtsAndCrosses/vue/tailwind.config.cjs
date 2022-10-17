/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                pewterBlue: "#6A8C96",
                pewterBlueLight: "#799FAB",
                xanadu: "#616F67",
                frenchBistre: "#726953",
                vanDykeBrown: "#66462C",
            },
        },
    },
    plugins: [],
};
