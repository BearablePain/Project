import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const getCssLoader = (isDev: boolean) => (isDev ? 'style-loader' : MiniCssExtractPlugin.loader);

const getLocalIdentName = (isDev: boolean) => (isDev ? '[path][name]__[local]' : '[hash:base64:8]');

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      getCssLoader(isDev),
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: getLocalIdentName(isDev),
          },
        },
      },
      'sass-loader',
    ],
  };
}
