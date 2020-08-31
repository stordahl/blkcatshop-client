<svelte:head>
	<title>Black Cat Shop - Shop</title>
</svelte:head>

<script>
	import Products from '../../components/ProductList.svelte';

	const query = '*[_type == "product"]';
</script>

<Products query={ query }/>