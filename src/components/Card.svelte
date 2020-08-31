<script>
    export let title;
    export let blurb;
    export let defaultProductVariant;
    export let tags;
    export let slug;

    let imgPath = defaultProductVariant.images[0].asset._ref;
    let newImg = imgPath.replace(/-png/g, ".png").replace(/-jpg/g, ".jpg").replace(/image-/g, "");
</script>

<div class="card">
    <img src="https://cdn.sanity.io/images/bnc9z6ut/production/{ newImg }" alt="">
    <a href="shop/{ slug.current }"><h3>{ title }</h3></a>
    <p>${ defaultProductVariant.price }</p>
    <p>{ blurb.en }</p>
    {#if tags}
        <ul>
            {#each tags as tag}
                <li><a href="/">{ tag }</a></li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .card{
        /* border: 2px solid black; */
        margin:1rem;
        padding:.5rem;
        box-shadow: 3px 0px 15px rgba(0, 0, 0, 0.445);
    }
    img{
        max-width:100%;
    }
</style>

<!-- todo -->
<!-- 
    refine styling
    animations/transitions
    image cropping


-->