module.exports = {
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    })
  ],
  variants: {
    margin: ['responsive', 'last']
  },
  theme: {
    inset: {
      '0': '0rem',
      '4': '1rem',
      '8': '2rem',
      '12': '3rem'
    }
  }
};