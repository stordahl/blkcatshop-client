<script context="module">
    import sanityClient from '@sanity/client';
    
    const client = sanityClient({
        projectId: 'bnc9z6ut',
        dataset: 'production',
        token: '', // or leave blank to be anonymous user
        useCdn: false // `false` if you want to ensure fresh data
    });

    let product = [];

	export async function preload(page, session) {
        
        const { slug } = page.params;
        const query = `*[slug.current == "${slug}"]`;
		const res = await client.fetch(query).then(prod => {
            product = prod[0];
        });
        return { product };
    }
</script>

<script>

    export let product;

    let productType = product.product_type;
    let productToken = product.product_token;

    let prodID = product._id;
    let slug = product.slug.current;
    let title = product.title;

    let variants = product.variants;
    let defaultVariant = product.defaultProductVariant.title;

    let images = product.defaultProductVariant.images;

    // console.log(images);

    let blurb = product.blurb.en;
    let body = product.body.en;
    let price = product.defaultProductVariant.price.toFixed(2);
    let tags = product.tags;

    let imgPath = 'https://cdn.sanity.io/images/bnc9z6ut/production/' + product.defaultProductVariant.images[0].asset._ref;
    let newImg = imgPath.replace(/-png/g, ".png").replace(/-jpg/g, ".jpg").replace(/image-/g, "");

    let variantsArr = [];

    if(variants){
        variantsArr.push(defaultVariant);
        product.variants.forEach(variant => {
            variantsArr.push(variant.title);
        });
    }
    let variantsStr = variantsArr.toString().replace(/,/g, "|");
    
</script>

<svelte:head>
	<title>Black Cat Shop - { title }</title>
</svelte:head>

<div id="prod-cont">
    <h1>{product.title}</h1>
    <img src="{ newImg }" alt="{ title }">
    <p>${ price }</p>
    {#each body as child}
        <p>{ child.children[0].text }</p>
    {/each}

    {#if productType == 'physical'}
        <button class="snipcart-add-item"
            data-item-id="{ prodID }"
            data-item-price="{ price }"
            data-item-url="/shop/{ slug }"
            data-item-description="{ blurb }"
            data-item-image="{ newImg }"
            data-item-name="{ title }"
            data-item-custom1-name="Size"
            data-item-custom1-options="{ variantsStr }"
            data-item-custom1-required="true"
            data-item-custom1-value="xs"
            >
            Add to cart
        </button>
    {:else if productType == 'digital'}
        <button class="snipcart-add-item"
            data-item-id="{ prodID }"
            data-item-price="{ price }"
            data-item-url="/shop/{ slug }"
            data-item-description="{ blurb }"
            data-item-image="{ newImg }"
            data-item-name="{ title }"
            data-item-file-guid="{ productToken }"
            >
            Add to cart
        </button>
    {/if} 
</div>

<style>
    img{
        max-width:500px;
    }
</style>