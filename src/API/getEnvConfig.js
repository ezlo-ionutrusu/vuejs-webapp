/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const getEnvConfig = (provider) => {
  try {
    const env = process.env.NODE_ENV;
    return require(`@/API/${provider}/config.${env}.json`);
  } catch (ex) {
    return require(`@/API/${provider}/config.json`);
  }
};

export default getEnvConfig;
