/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const getAuthProvider = () => {
  try {
    const authType = process.env.VUE_APP_ENV;
    return require(`@/API/${authType}Provider`).default;
  } catch (ex) {
    return require('@/API/authProvider').default;
  }
};

export default getAuthProvider;
