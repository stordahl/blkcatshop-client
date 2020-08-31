<script>
	export let segment;
</script>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" class="striped-d-orange" href=".">home</a></li>
		<li><a aria-current="{segment === 'shop' ? 'page' : undefined}" class="striped-l-orange" href="shop">shop</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" class="striped-d-blue" href="about">about</a></li>
	</ul>
</nav>
<div class="logo">
	<h1>Black Cat</h1>
	<h1 class="strike">Studio</h1>
	<h1>Shop</h1>
</div>

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
	nav {
		font-size:1.2rem;
		font-weight: 300;
		padding: 0 1em;
		position: absolute;
		top:1rem;
		left:1rem;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		max-width:max-content;
	}
	[aria-current] {
		position: relative;
		display: inline-block;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	a:hover{
		scale:1.1;
	}
	.striped-d-orange{
		background-color: var(--bg);
		background-image: linear-gradient(transparent 80%, var(--dark-orange) 20%);
		background-size: 80px 45px;
		padding-bottom: 10px;
	}
	.striped-l-orange{
		background-color: var(--bg);
		background-image: linear-gradient(transparent 80%, var(--light-orange) 20%);
		background-size: 80px 45px;
		padding-bottom: 10px;
	}
	.striped-d-blue{
		background-color: var(--bg);
		background-image: linear-gradient(transparent 80%, var(--dark-blue) 20%);
		background-size: 80px 45px;
		padding-bottom: 10px;
	}
	.logo{
		display:flex;
		flex-direction: column;
		align-items:flex-end;
		position:absolute;
		top:2rem;
		right:2rem;
	}
	h1{
		font-size:10rem;
		line-height:1;
		text-align:right;
		margin:0;
		padding:0;
	}
	.strike{
		position: relative;
	}
	.strike::after{
		content: '';
		border-bottom: 2rem solid var(--black);
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
	}
	
</style>


