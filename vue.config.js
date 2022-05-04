module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  publicPath: '/dist',
  pluginOptions: {
    electronBuilder: {
      preload : 'src/preload.js',
    }
  }
}