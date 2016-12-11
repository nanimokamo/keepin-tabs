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

export const goToTab = (id) => {
    chrome.tabs.update(id, {active: true});
};

export const pinTab = (id, pinned) => {
    chrome.tabs.update(id, { pinned });
};

export const refreshTab = (id) => {
    chrome.tabs.reload(id);
};

export const closeTab = (id) => {
    chrome.tabs.remove(id);
};

export const moveTab = () => {
    chrome.tabs.move(tab.id, {index: i})
};