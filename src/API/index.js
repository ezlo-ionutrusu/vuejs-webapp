import storage from './storage';
import nmaProvider from './nmaProvider';
import getAuthProvider from './getAuthProvider';

const getProvider = () => nmaProvider;

export default getProvider;

export { getProvider, getAuthProvider, storage };
