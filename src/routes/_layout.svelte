<script>
	import ShopNav from '../components/ShopNav.svelte';
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import FooterAbsolute from '../components/FooterAbsolute.svelte';
	

	export let segment;
</script>

<style>
:root {
		--bg: #E0DCD8;
		--light-orange: #DDA788;
		--dark-orange:#BB5215;
		--light-blue:#E6F2FF;
		--dark-blue:#A5C4E7;
		--light-green: #999E90;
		--dark-green:#4E563E;
		--black:#1F1F1F;
	}
	main {
		position: relative;
		max-width: 66em;
		padding-top:0;
		margin: 0 0 0 auto;
		box-sizing: border-box;
	}
</style>

{#if segment === undefined}
  <Nav {segment}/>
{:else}
  <ShopNav {segment}/>
{/if}


<main>
	<slot></slot>
</main>


{#if segment === undefined }
  <FooterAbsolute {segment}/>
{:else if segment === 'about' }
  <FooterAbsolute {segment}/>
{:else}
  <Footer {segment}/>
{/if}
