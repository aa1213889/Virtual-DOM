const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"), // 定义输出文件夹dist路径
    },
    devServer: {
        contentBase: "dist",
        compress: false,
        port: 8080,
    },
    devtool: "source-map"
};