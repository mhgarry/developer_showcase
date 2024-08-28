const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./README.md", // Markdown as the entry point
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js", // This will not be used as a script in HTML
    },
    module: {
        rules: [
            {
                test: /\.md$/, // Match markdown files
                use: [
                    {
                        loader: "html-loader", // Convert HTML to a string
                    },
                    {
                        loader: "markdown-loader", // Convert markdown to HTML
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // CSS handling
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: ({ htmlWebpackPlugin }) => `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Developer Showcase</title>
                    <link rel="stylesheet" href="styles.css" />
                </head>
                <body>
                    <div id="app">
                        ${htmlWebpackPlugin.tags.headTags}
                    </div>
                </body>
            </html>
            `,
            inject: false, // We manually handle the injection
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css", // Output CSS file
        }),
        new CleanWebpackPlugin(), // Clean up output directory before build
    ],
};
