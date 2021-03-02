const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
                exclude: /\.module\.css$/
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "index.js",
        libraryTarget: "commonjs",
    },
    target: "web"
};
