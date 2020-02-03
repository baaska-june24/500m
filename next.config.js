const fs = require("fs");
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withImages = require("next-images");
const Dotenv = require("dotenv-webpack");
const lessToJS = require("less-vars-to-js");

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = () => {};
  require.extensions[".scss"] = () => {};
}

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./src/static/styles/antd-custom.less"),
    "utf8"
  )
);
const nextConfig = {
  // Баруун доод буланд гарч байгаа nextjs-н логог арилгана
  devIndicators: {
    autoPrerender: false
  },
  //antd
  webpack: (config, { isServer }) => {
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }
    return config;
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables
  }
};

module.exports = withPlugins(
  [
    [withCss],
    [withLess],
    [withImages],
    [
      withSass
      //   {
      //     cssModules: true,
      //     cssLoaderOptions: {
      //       importLoaders: 1,
      //       localIdentName: "[local]___[hash:base64:5]"
      //     }
      //   }
    ]
  ],

  nextConfig
);
