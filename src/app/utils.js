export const throttle = (callback, limit) => {
    var wait = false;
    return function () {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(function () {
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
