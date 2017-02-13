export const goToTab = (id) => {
    chrome.tabs.update(id, { active: true });
    window.close();
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

export const moveTabs = (ids, index = -1, windowId = undefined) => {
    chrome.tabs.move(ids, { index, windowId });
};

export const createBookmarksFolder = (parentId, title) => new Promise((resolve) => {
    chrome.bookmarks.create({ parentId, title }, (bookmark) => resolve(bookmark.id));
});

export const getBookmarksById = (id) => new Promise((resolve) => {
    chrome.bookmarks.getSubTree(`${id}`, resolve);
});

export const getWindows = () => new Promise((resolve) => {
    chrome.windows.getAll({ populate: true, windowTypes: ['normal'] }, resolve);
});

export const moveTabsToNewWindow = (tabIds) => new Promise((resolve) => {
    chrome.windows.create(({ id }) => {
		moveTabs(tabIds, undefined, id);
		resolve();
    });
});