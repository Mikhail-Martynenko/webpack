# Сборка webpack для простого проекта React+Typescript

В самом проекте предусмотрена одна страница с текстом, картинкой и с минимальными стилями.

## Для создания сборки webpack для React+TypeScript проекта, мне понадобилось выполнить несколько шагов:

### 1. Создать новый проект и установить необходимые зависимости

    npm init -y
    npm install webpack webpack-cli webpack-dev-server typescript react react-dom @types/react @types/react-dom babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript css-loader style-loader html-webpack-plugin clean-webpack-plugin --save-dev

### 2. Создать файл конфигурации webpack.config.js в корне проекта со следующим содержимым:

<pre>
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.tsx',
    devtool: isDevelopment ? 'inline-source-map' : false,
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      isDevelopment ? undefined : new CleanWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
      static: './public',
      port: 3000,
    },
  };
};
</pre>

### 3. Создать файл index.html в папке src со следующим содержимым:
    <!DOCTYPE html>
        <html lang="en">
         <head>
            <meta charset="utf-8" />
            <title>React TypeScript App</title>
        </head>
        <body>
            <div id="root"></div>
        </body>
    </html>

### 4. Создать файл index.tsx в папке src со следующим содержимым:
    import React from 'react';
    import ReactDOM from 'react-dom';

    const App = () => {
    return <div>Hello React TypeScript App!</div>;
    };

    ReactDOM.render(<App />, document.getElementById('root'));

### 5. Добавить скрипты в package.json для сборки проекта в dev- и prod-режимах и очистки папки с готовыми бандлами:

    "scripts": {
    "start": "webpack serve --mode development --open",
    "clean": "rm -rf dist/*",
    "dev": "webpack serve --config webpack.config.js --mode development --open",
    "build": "webpack --config webpack.config.js --mode production"
    },

### 6. Создать файл tsconfig.json и включить опцию esModuleInterop в конфигурации TypeScript и добавить параметр 
"jsx": "react" - , который указывает, какой синтаксис использовать для JSX-выражений в TypeScript.

    {
    "compilerOptions": {
    "esModuleInterop": true,
    "jsx": "react" 
    }
    }
