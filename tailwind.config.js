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
      '4': '1rem',
      '8': '2rem'
    }
  }
};