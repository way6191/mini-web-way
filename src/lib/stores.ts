import { writable } from 'svelte/store';

export const storeCurrentUrl: Writable<string | undefined> = writable(undefined);
