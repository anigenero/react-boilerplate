import { removeLocalValue, retrieveLocalValue, storeLocalValue } from '../store.util';

describe('Store Util', () => {

	const KEY = 'foobar';

	beforeEach(() => {
		localStorage.clear();
	});

	test('store localStorage value', () => {

		const value = '123';

		expect(localStorage.__STORE__[KEY]).toBeUndefined();

		storeLocalValue(KEY, value);

		expect(localStorage.__STORE__[KEY]).toBe(value);

	});

	test('get localStorage value', () => {

		const value = '123';

		expect(localStorage.__STORE__[KEY]).toBeUndefined();

		storeLocalValue(KEY, value);
		const result = retrieveLocalValue(KEY);

		expect(localStorage.__STORE__[KEY]).toBe(result);

	});

	test('remove localStorage value', () => {

		const value = '123';

		expect(localStorage.__STORE__[KEY]).toBeUndefined();

		storeLocalValue(KEY, value);
		removeLocalValue(KEY);

		expect(localStorage.__STORE__[KEY]).toBeUndefined();

		const result = retrieveLocalValue(KEY);

		expect(result).toBeNull();

	});

});
