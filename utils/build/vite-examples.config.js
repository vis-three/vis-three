const path = require('path')

export default {
  server: {
    open: '/examples/index.html'
  },
  build: {
    rollupOptions: {
      output: {
        index: path.resolve(__dirname, '../../examples/index.html')
      },
      plugins: [
      ]
    }
  }
}