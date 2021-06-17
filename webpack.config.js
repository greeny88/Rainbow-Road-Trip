const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const packageInfo = require('./package.json');

const dist = path.resolve(__dirname, 'dist');
const root = path.resolve(__dirname, 'src');
const paths = {
	app: path.resolve(root, 'app'),
	index: path.resolve(root, 'index.html'),
	entry: path.resolve(root, 'app/main.ts'),
	output: {
		css: 'assets/styles/[name].[chunkhash].css',
		js: 'assets/js/[name].[chunkhash].js'
	}
};

const extractSassPlugin = new MiniCssExtractPlugin({
	filename: paths.output.css,
	//chunkFilename: paths.output.css
});
const htmlPlugin = new HtmlWebpackPlugin({
	template: paths.index
});
const cleanDistPlugin = new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*', '!.git', '!.git/**/*']
});
const workboxPlugin = new WorkboxPlugin.GenerateSW({
	clientsClaim: true,
	maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6MB TODO: change to larger for dev and smaller for prod
	navigateFallback: 'index.html',
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/fonts\.gstatic\.com/,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'google-fonts-webfonts'
			}
		},
		{
			urlPattern: /^https:\/\/fonts\.googleapis\.com\/icon/,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'google-fonts-icons'
			}
		}
	],
	skipWaiting: true
});

const terserPlugin = new TerserPlugin({ 
	extractComments: false 
});

const scripts = {
	test: /(?<!\.spec)\.ts$/,
	exclude: /node_modules/,
	use: [
		'babel-loader',
		'ts-loader'
	]
};
const htmlLoader = {
	loader: 'html-loader',
	options: {
		minimize: {
			caseSensitive: true,
			collapseWhitespace: true,
			removeComments: true
		}
	}
};
const markup = {
	test: /\.html$/,
	exclude: /index\.html$/,
	use: [
		htmlLoader
	]
};
const cssLoader = {
	loader: 'css-loader',
	options: {
		importLoaders: 1
	}
};
const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				"postcss-import",
				"postcss-preset-env"
			]
		}
	}
};
const sassLoader = {
	loader: 'sass-loader',
	options: {
		sassOptions: {
			includePaths: ['./node_modules'],
			outputStyle: 'compressed'
		}
	}
};
const styles = {
	test: /\.scss$/,
	use: [
		MiniCssExtractPlugin.loader,
		cssLoader,
		postcssLoader,
		sassLoader
	]
};

// TODO: add rules for images
const images = {
	test: /\.(png|svg|jpg|jpeg|gif)$/i,
	type: 'asset/resource',
	generator: {
		filename: 'assets/images/[name][ext]'
	}
}

let config = {
	entry: {
		rrt: paths.entry
	},
	module: {
		rules: [
			scripts,
			markup,
			styles,
			images
		]
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `vendor.${packageName.replace('@', '')}`;
					}
				}
			}
		},
		minimizer: [
			terserPlugin
		]
	},
	plugins: [
		cleanDistPlugin,
		htmlPlugin,
		extractSassPlugin,
		workboxPlugin
	],
	resolve: {
		extensions: ['.ts', '.js', '*']
	},
	output: {
		chunkFilename: paths.output.js,
		filename: paths.output.js,
		path: dist,
		publicPath: ''
	},
	devServer: {
		contentBase: dist,
		port: 8092,
		publicPath: '',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 3000
		}
	},
	mode: 'development'
};

module.exports = (env, argv) => {
	if (argv.mode !== 'production') {
		config.devtool = 'source-map'
	}
	config.plugins.push(new webpack.DefinePlugin({
		PRODUCTION: (argv.mode === 'production') ? true : false
	}));
	// TODO: make devServer.port configurable
	return config;
};
