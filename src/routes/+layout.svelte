<script>
	import '../app.css';
	import { toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { Toaster } from '$lib/components/ui/sonner';

	const flash = getFlash(page);
	flash.subscribe(($flash) => {
		if (!$flash) return;

		if ($flash.type === 'error') {
			toast.error($flash.message);
		} else if ($flash.type === 'success') {
			toast.success($flash.message);
		} else {
			toast($flash.message);
		}

		// Clearing the flash message could sometimes
		// be needed here to avoid double-toasting.
		flash.set(undefined);
	});
</script>

<Toaster position="bottom-center" />
<section class="container flex h-screen max-w-[30rem] flex-col justify-center">
	<slot />
</section>
