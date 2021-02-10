import services from "./services";

export const register = (data) => {
    return new Promise((resolve, reject) => {
        const args = {
            data,
            endpoint: '/signup',
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.post(args);
    });
};
