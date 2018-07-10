/**
 * Stores a value in localStorage
 *
 * @param {string} key
 * @param {string} value
 */
export const storeLocalValue = (key: string, value: string) => {
	localStorage.setItem(key, value);
};

/**
 * Remove localStorage value
 *
 * @param {string} key
 */
export const removeLocalValue = (key: string) => {
	localStorage.removeItem(key);
};

/**
 * Gets the value for the specified key from localStorage
 *
 * @param {string} key
 * @returns {string|null} the value in the store, else null
 */
export const retrieveLocalValue = (key: string): string | null => {
	return localStorage.getItem(key);
};
