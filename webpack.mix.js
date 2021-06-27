const mix = require('laravel-mix');
const path = require('path');
require('laravel-mix-svg-vue');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .disableNotifications()
    .disableSuccessNotifications()
    .js('resources/js/app.js', 'public/js')
    .svgVue(
        {
            // svgPath: 'resources/svg',
            svgPath: 'resources/assets/images/svg-icons',
            extract: false,
            svgoSettings: [
                { removeTitle: true },
                { removeViewBox: false },
                { removeDimensions: true }
            ]
        }
    )
    .webpackConfig({
        module: {
            rules: [
                // {
                //     test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
                //     loaders: {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[path][name].[ext]?[hash]',
                //             context: 'resources/assets',
                //         }
                //     },
                // },
                {
                    enforce: 'pre',
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    test: /\.(js|vue)?$/
                },
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve('resources/assets/sass'),
            }
        },
    })
    .sass('resources/assets/sass/app.scss', 'public/css')
    .copy('resources/assets/images', 'public/images')
    .vue()
    // .postCss('resources/css/app.css', 'public/css', [
    //
    // ]);
