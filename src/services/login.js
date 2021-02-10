import services from './services';

export const login = (data) => {
    return new Promise((resolve, reject) => {
        const args = {
            data,
            endpoint: '/login',
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.post(args);
    });
};
