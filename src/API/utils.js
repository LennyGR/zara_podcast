export const b64ToUtf8 = (str) => decodeURIComponent(escape(window.atob(str)));
export const wrapProxy = (url) =>
	`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
