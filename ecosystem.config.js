module.exports = {
  apps: [
    {
      name: "strata-marketing",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
