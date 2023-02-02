import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {

    //Если не используем ts - нужен babel-loader
    const typescriptLoader =      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        typescriptLoader,
    ]
}
