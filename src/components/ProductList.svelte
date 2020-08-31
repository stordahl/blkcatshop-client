<script>
    import Card from './Card.svelte';
    import sanityClient from '@sanity/client';
    
    export let query;

    const client = sanityClient({
        projectId: 'bnc9z6ut',
        dataset: 'production',
        token: '', // or leave blank to be anonymous user
        useCdn: false // `false` if you want to ensure fresh data
    });
        
    let prodsArr = [];

    client.fetch(query).then(prods => {
        prodsArr = prods;
    });

</script>

<ul>
    {#each prodsArr as prod}
        <li>
            <Card {...prod}/>
        </li>
    {/each}
</ul>

<style>
    ul{
        list-style: none;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        /* background-color: rgba(209, 209, 209, 0.829); */
        margin:0;
        padding:2rem;
    }
</style>