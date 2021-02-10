import axios from 'axios';

class Services {
    get = async (args) => {
        // this.setValue(setLoading(args.loader));
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            };
            const response = await axios({
                headers,
                method: 'GET',
                url: args.endpoint,
                params: args.params,
            });
            // this.setValue(setLoading(false));
            args.then(response);
        } catch (err) {
            this.handleError(args, err);
        }
    };

    post = async (args) => {
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            };
            const response = await axios({
                headers,
                method: 'POST',
                url: args.endpoint,
                data: args.data,
            });
            if (args.then && typeof args.then === 'function') args.then(response);
        } catch (err) {
            this.handleError(args, err);
        }
    };
    patch = async (args) => {
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            };
            const response = await axios({
                headers,
                method: 'PATCH',
                url: args.endpoint,
                data: args.data,
            });
            if (args.then && typeof args.then === 'function') args.then(response);
        } catch (err) {
            this.handleError(args, err);
        }
    };

    delete = async (args) => {
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            };
            const response = await axios({
                headers,
                method: 'DELETE',
                url: args.endpoint,
                data: args.data,
            });
            args.then(response);
        } catch (err) {
            this.handleError(args, err);
        }
    };

    handleError = (args, err) => {
        const error = {
            text: '',
            title: '¡Error!',
            type: 'error',
        };
        // this.pushNotification(error);
        args.catch(err);
    }
}

export default new Services();
