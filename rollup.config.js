import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import res from 'express/lib/response'
export default {
  input:'./src/index.js', //入口
  output:{
    file:'./dist/vue.js',  // 出口
    name:'Vue',
    format:'umd',
    sourcemap:true
  },
  plugins:[
    babel({
      exclude:'node_modules/**'
    }),
    resolve()
  ]
}