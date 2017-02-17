// @flow

export const throttle = (callback: Function, limit: number): Function => {
    let wait: boolean = false;
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

export function sortBy(key: string): [] {
    return this.sort((a, b) => {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        } else {
            return 0;
        }
    });
}
