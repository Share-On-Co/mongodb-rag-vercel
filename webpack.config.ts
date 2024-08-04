// webpack.config.js
import path from 'path';

module.exports = {
  // ... other configurations ...
  externals: {
    'onnxruntime-node': 'commonjs onnxruntime-node'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
};