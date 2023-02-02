import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

const getCssLoader = (isDev: boolean) => isDev ? 'style-loader' : MiniCssExtractPlugin.loader

//чтобы в деве были обычные названия 1)  пути до компонента, локальное название 2) хэш 8 символов
const getLocalIdentName = (isDev: boolean) => isDev ? '[path][name]__[local]' : '[hash:base64:8]'

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            getCssLoader(isDev) ,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.includes('.module.'),
                        localIdentName: getLocalIdentName(isDev) //генерируем имя для класса
                    },
                }
            },
            'sass-loader',
        ]
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}
