import services from './services';

export const getUserData = (params) => {
    const endpoint = `/user`;
    return new Promise((resolve, reject) => {
        const args = {
            params,
            endpoint,
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.get(args);
    });
};

export const uploadImage = (data) => {
    return new Promise((resolve, reject) => {
        const args = {
            data,
            endpoint: '/user/image',
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.post(args);
    });
};

export const editUserDetails = (data) => {
    return new Promise((resolve, reject) => {
        const args = {
            data,
            endpoint: '/user',
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.post(args);
    });
};
