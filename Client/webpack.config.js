const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/OinkyParty.js",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "oinkyalarm.js",
    },
}
