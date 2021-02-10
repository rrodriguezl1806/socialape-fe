import services from "./services";

export const getAllScreams = (params) => {
    const endpoint = `/screams`;
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

export const postNewScream = (data) => {
    return new Promise((resolve, reject) => {
        const args = {
            data,
            endpoint: '/scream',
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.post(args);
    });
}

export const getLike = (params) => {
    return new Promise((resolve, reject) => {
        const args = {
            params,
            endpoint: `/scream/${params}/like`,
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.get(args);
    });
};

export const getUnlike = (params) => {
    return new Promise((resolve, reject) => {
        const args = {
            params,
            endpoint: `/scream/${params}/unlike`,
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.get(args);
    });
};

export const deleteScream = (id) => {
    return new Promise((resolve, reject) => {
        const args = {
            endpoint: `scream/${id}`,
            then: resolve,
            catch: reject,
            loader: true,
        };
        services.delete(args);
    });
}
