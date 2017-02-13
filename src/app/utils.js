export const throttle = (callback, limit) => {
    let wait = false;
    return () => {
        if (!wait) {
            callback.call();
            wait = true;
            window.setTimeout(() => {
				wait = false;
            }, limit);
        }
    }
};

export const sortBy = (array, key) => {
    return array.sort((a, b) => {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        } else {
            return 0;
        }
    });
};
