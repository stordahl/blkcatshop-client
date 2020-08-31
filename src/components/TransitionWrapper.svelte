<script>
    import { fly } from 'svelte/transition';

    let show = true;
</script>

{#if show}
<div in:fly="{{ x:-300, duration:600, delay:300 }}" out:fly="{{x:300, duration:300}}">
    <slot></slot>
</div>
{/if}