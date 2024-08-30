import type { Cookies } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

export const setFlashSuccess = (message: string, cookies: Cookies) => {
	setFlash({ type: 'success', message }, cookies);
};

export const setFlashError = (message: string, cookies: Cookies) => {
	setFlash({ type: 'error', message }, cookies);
};
