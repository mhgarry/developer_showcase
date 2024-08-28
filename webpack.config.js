const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./README.md",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.html", // Output as an HTML file
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                    {
                        loader: "markdown-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // This should be adapted to use the processed Markdown
            filename: "index.html", // Output HTML filename
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
        new CleanWebpackPlugin(),
    ],
};
