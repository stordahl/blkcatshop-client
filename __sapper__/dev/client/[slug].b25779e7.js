import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, m as validate_each_argument, v as validate_slots, e as element, t as text, f as claim_element, g as children, h as claim_text, a as detach_dev, j as add_location, k as insert_dev, l as append_dev, n as noop, b as space, q as query_selector_all, c as claim_space, p as attr_dev, r as set_data_dev, o as destroy_each } from './client.3b3b1075.js';
import { s as sanityClient } from './sanityClient.1932ff1a.js';

/* src/routes/shop/[slug].svelte generated by Svelte v3.24.1 */
const file = "src/routes/shop/[slug].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	return child_ctx;
}

// (70:4) {#each body as child}
function create_each_block(ctx) {
	let p;
	let t_value = /*child*/ ctx[16].children[0].text + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file, 70, 8, 1918);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(70:4) {#each body as child}",
		ctx
	});

	return block;
}

// (89:39) 
function create_if_block_1(ctx) {
	let button;
	let t;
	let button_data_item_url_value;

	const block = {
		c: function create() {
			button = element("button");
			t = text("Add to cart");
			this.h();
		},
		l: function claim(nodes) {
			button = claim_element(nodes, "BUTTON", {
				class: true,
				"data-item-id": true,
				"data-item-price": true,
				"data-item-url": true,
				"data-item-description": true,
				"data-item-image": true,
				"data-item-name": true,
				"data-item-file-guid": true
			});

			var button_nodes = children(button);
			t = claim_text(button_nodes, "Add to cart");
			button_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(button, "class", "snipcart-add-item");
			attr_dev(button, "data-item-id", /*slug*/ ctx[3]);
			attr_dev(button, "data-item-price", /*price*/ ctx[7]);
			attr_dev(button, "data-item-url", button_data_item_url_value = "https://blkcatshop-client.netlify.app/shop/" + /*slug*/ ctx[3]);
			attr_dev(button, "data-item-description", /*blurb*/ ctx[5]);
			attr_dev(button, "data-item-image", /*newImg*/ ctx[8]);
			attr_dev(button, "data-item-name", /*title*/ ctx[4]);
			attr_dev(button, "data-item-file-guid", /*productToken*/ ctx[2]);
			add_location(button, file, 89, 8, 2577);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(89:39) ",
		ctx
	});

	return block;
}

// (74:4) {#if productType == 'physical'}
function create_if_block(ctx) {
	let button;
	let t;
	let button_data_item_url_value;

	const block = {
		c: function create() {
			button = element("button");
			t = text("Add to cart");
			this.h();
		},
		l: function claim(nodes) {
			button = claim_element(nodes, "BUTTON", {
				class: true,
				"data-item-id": true,
				"data-item-price": true,
				"data-item-url": true,
				"data-item-description": true,
				"data-item-image": true,
				"data-item-name": true,
				"data-item-custom1-name": true,
				"data-item-custom1-options": true,
				"data-item-custom1-required": true,
				"data-item-custom1-value": true
			});

			var button_nodes = children(button);
			t = claim_text(button_nodes, "Add to cart");
			button_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(button, "class", "snipcart-add-item");
			attr_dev(button, "data-item-id", /*slug*/ ctx[3]);
			attr_dev(button, "data-item-price", /*price*/ ctx[7]);
			attr_dev(button, "data-item-url", button_data_item_url_value = "/shop/" + /*slug*/ ctx[3]);
			attr_dev(button, "data-item-description", /*blurb*/ ctx[5]);
			attr_dev(button, "data-item-image", /*newImg*/ ctx[8]);
			attr_dev(button, "data-item-name", /*title*/ ctx[4]);
			attr_dev(button, "data-item-custom1-name", "Size");
			attr_dev(button, "data-item-custom1-options", /*variantsStr*/ ctx[9]);
			attr_dev(button, "data-item-custom1-required", "true");
			attr_dev(button, "data-item-custom1-value", "xs");
			add_location(button, file, 74, 8, 2009);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(74:4) {#if productType == 'physical'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let title_value;
	let t0;
	let div;
	let h1;
	let t1_value = /*product*/ ctx[0].title + "";
	let t1;
	let t2;
	let img;
	let img_src_value;
	let t3;
	let p;
	let t4;
	let t5;
	let t6;
	let t7;
	document.title = title_value = "Black Cat Shop - " + /*title*/ ctx[4];
	let each_value = /*body*/ ctx[6];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	function select_block_type(ctx, dirty) {
		if (/*productType*/ ctx[1] == "physical") return create_if_block;
		if (/*productType*/ ctx[1] == "digital") return create_if_block_1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
		c: function create() {
			t0 = space();
			div = element("div");
			h1 = element("h1");
			t1 = text(t1_value);
			t2 = space();
			img = element("img");
			t3 = space();
			p = element("p");
			t4 = text("$");
			t5 = text(/*price*/ ctx[7]);
			t6 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t7 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1b319bu\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { id: true });
			var div_nodes = children(div);
			h1 = claim_element(div_nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, t1_value);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(div_nodes);
			img = claim_element(div_nodes, "IMG", { src: true, alt: true, class: true });
			t3 = claim_space(div_nodes);
			p = claim_element(div_nodes, "P", {});
			var p_nodes = children(p);
			t4 = claim_text(p_nodes, "$");
			t5 = claim_text(p_nodes, /*price*/ ctx[7]);
			p_nodes.forEach(detach_dev);
			t6 = claim_space(div_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			t7 = claim_space(div_nodes);
			if (if_block) if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file, 66, 4, 1794);
			if (img.src !== (img_src_value = /*newImg*/ ctx[8])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", /*title*/ ctx[4]);
			attr_dev(img, "class", "svelte-1uz4c67");
			add_location(img, file, 67, 4, 1823);
			add_location(p, file, 68, 4, 1866);
			attr_dev(div, "id", "prod-cont");
			add_location(div, file, 65, 0, 1769);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, h1);
			append_dev(h1, t1);
			append_dev(div, t2);
			append_dev(div, img);
			append_dev(div, t3);
			append_dev(div, p);
			append_dev(p, t4);
			append_dev(p, t5);
			append_dev(div, t6);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append_dev(div, t7);
			if (if_block) if_block.m(div, null);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*title*/ 16 && title_value !== (title_value = "Black Cat Shop - " + /*title*/ ctx[4])) {
				document.title = title_value;
			}

			if (dirty & /*product*/ 1 && t1_value !== (t1_value = /*product*/ ctx[0].title + "")) set_data_dev(t1, t1_value);

			if (dirty & /*body*/ 64) {
				each_value = /*body*/ ctx[6];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, t7);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (if_block) if_block.p(ctx, dirty);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);

			if (if_block) {
				if_block.d();
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const client = sanityClient({
	projectId: "bnc9z6ut",
	dataset: "production",
	token: "", // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
	
});

let product = [];

async function preload(page, session) {
	const { slug } = page.params;
	const query = `*[slug.current == "${slug}"]`;

	const res = await client.fetch(query).then(prod => {
		product = prod[0];
	});

	return { product };
}

function instance($$self, $$props, $$invalidate) {
	let { product } = $$props;
	let productType = product.product_type;
	let productToken = product.product_token;

	// let prodID = product._id;
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
	let imgPath = "https://cdn.sanity.io/images/bnc9z6ut/production/" + product.defaultProductVariant.images[0].asset._ref;
	let newImg = imgPath.replace(/-png/g, ".png").replace(/-jpg/g, ".jpg").replace(/image-/g, "");
	let variantsArr = [];

	if (variants) {
		variantsArr.push(defaultVariant);

		product.variants.forEach(variant => {
			variantsArr.push(variant.title);
		});
	}

	let variantsStr = variantsArr.toString().replace(/,/g, "|");
	const writable_props = ["product"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("U5Bslugu5D", $$slots, []);

	$$self.$$set = $$props => {
		if ("product" in $$props) $$invalidate(0, product = $$props.product);
	};

	$$self.$capture_state = () => ({
		sanityClient,
		client,
		product,
		preload,
		product,
		productType,
		productToken,
		slug,
		title,
		variants,
		defaultVariant,
		images,
		blurb,
		body,
		price,
		tags,
		imgPath,
		newImg,
		variantsArr,
		variantsStr
	});

	$$self.$inject_state = $$props => {
		if ("product" in $$props) $$invalidate(0, product = $$props.product);
		if ("productType" in $$props) $$invalidate(1, productType = $$props.productType);
		if ("productToken" in $$props) $$invalidate(2, productToken = $$props.productToken);
		if ("slug" in $$props) $$invalidate(3, slug = $$props.slug);
		if ("title" in $$props) $$invalidate(4, title = $$props.title);
		if ("variants" in $$props) variants = $$props.variants;
		if ("defaultVariant" in $$props) defaultVariant = $$props.defaultVariant;
		if ("images" in $$props) images = $$props.images;
		if ("blurb" in $$props) $$invalidate(5, blurb = $$props.blurb);
		if ("body" in $$props) $$invalidate(6, body = $$props.body);
		if ("price" in $$props) $$invalidate(7, price = $$props.price);
		if ("tags" in $$props) tags = $$props.tags;
		if ("imgPath" in $$props) imgPath = $$props.imgPath;
		if ("newImg" in $$props) $$invalidate(8, newImg = $$props.newImg);
		if ("variantsArr" in $$props) variantsArr = $$props.variantsArr;
		if ("variantsStr" in $$props) $$invalidate(9, variantsStr = $$props.variantsStr);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		product,
		productType,
		productToken,
		slug,
		title,
		blurb,
		body,
		price,
		newImg,
		variantsStr
	];
}

class U5Bslugu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { product: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bslugu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*product*/ ctx[0] === undefined && !("product" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'product'");
		}
	}

	get product() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set product(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bslugu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3NsdWddLmIyNTc3OWU3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Nob3AvW3NsdWddLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgc2FuaXR5Q2xpZW50IGZyb20gJ0BzYW5pdHkvY2xpZW50JztcbiAgICBcbiAgICBjb25zdCBjbGllbnQgPSBzYW5pdHlDbGllbnQoe1xuICAgICAgICBwcm9qZWN0SWQ6ICdibmM5ejZ1dCcsXG4gICAgICAgIGRhdGFzZXQ6ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgdG9rZW46ICcnLCAvLyBvciBsZWF2ZSBibGFuayB0byBiZSBhbm9ueW1vdXMgdXNlclxuICAgICAgICB1c2VDZG46IGZhbHNlIC8vIGBmYWxzZWAgaWYgeW91IHdhbnQgdG8gZW5zdXJlIGZyZXNoIGRhdGFcbiAgICB9KTtcblxuICAgIGxldCBwcm9kdWN0ID0gW107XG5cblx0ZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQocGFnZSwgc2Vzc2lvbikge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgeyBzbHVnIH0gPSBwYWdlLnBhcmFtcztcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgKltzbHVnLmN1cnJlbnQgPT0gXCIke3NsdWd9XCJdYDtcblx0XHRjb25zdCByZXMgPSBhd2FpdCBjbGllbnQuZmV0Y2gocXVlcnkpLnRoZW4ocHJvZCA9PiB7XG4gICAgICAgICAgICBwcm9kdWN0ID0gcHJvZFswXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IHByb2R1Y3QgfTtcbiAgICB9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblxuICAgIGV4cG9ydCBsZXQgcHJvZHVjdDtcblxuICAgIGxldCBwcm9kdWN0VHlwZSA9IHByb2R1Y3QucHJvZHVjdF90eXBlO1xuICAgIGxldCBwcm9kdWN0VG9rZW4gPSBwcm9kdWN0LnByb2R1Y3RfdG9rZW47XG5cbiAgICAvLyBsZXQgcHJvZElEID0gcHJvZHVjdC5faWQ7XG4gICAgbGV0IHNsdWcgPSBwcm9kdWN0LnNsdWcuY3VycmVudDtcbiAgICBsZXQgdGl0bGUgPSBwcm9kdWN0LnRpdGxlO1xuXG4gICAgbGV0IHZhcmlhbnRzID0gcHJvZHVjdC52YXJpYW50cztcbiAgICBsZXQgZGVmYXVsdFZhcmlhbnQgPSBwcm9kdWN0LmRlZmF1bHRQcm9kdWN0VmFyaWFudC50aXRsZTtcblxuICAgIGxldCBpbWFnZXMgPSBwcm9kdWN0LmRlZmF1bHRQcm9kdWN0VmFyaWFudC5pbWFnZXM7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhpbWFnZXMpO1xuXG4gICAgbGV0IGJsdXJiID0gcHJvZHVjdC5ibHVyYi5lbjtcbiAgICBsZXQgYm9keSA9IHByb2R1Y3QuYm9keS5lbjtcbiAgICBsZXQgcHJpY2UgPSBwcm9kdWN0LmRlZmF1bHRQcm9kdWN0VmFyaWFudC5wcmljZS50b0ZpeGVkKDIpO1xuICAgIGxldCB0YWdzID0gcHJvZHVjdC50YWdzO1xuXG4gICAgbGV0IGltZ1BhdGggPSAnaHR0cHM6Ly9jZG4uc2FuaXR5LmlvL2ltYWdlcy9ibmM5ejZ1dC9wcm9kdWN0aW9uLycgKyBwcm9kdWN0LmRlZmF1bHRQcm9kdWN0VmFyaWFudC5pbWFnZXNbMF0uYXNzZXQuX3JlZjtcbiAgICBsZXQgbmV3SW1nID0gaW1nUGF0aC5yZXBsYWNlKC8tcG5nL2csIFwiLnBuZ1wiKS5yZXBsYWNlKC8tanBnL2csIFwiLmpwZ1wiKS5yZXBsYWNlKC9pbWFnZS0vZywgXCJcIik7XG5cbiAgICBsZXQgdmFyaWFudHNBcnIgPSBbXTtcblxuICAgIGlmKHZhcmlhbnRzKXtcbiAgICAgICAgdmFyaWFudHNBcnIucHVzaChkZWZhdWx0VmFyaWFudCk7XG4gICAgICAgIHByb2R1Y3QudmFyaWFudHMuZm9yRWFjaCh2YXJpYW50ID0+IHtcbiAgICAgICAgICAgIHZhcmlhbnRzQXJyLnB1c2godmFyaWFudC50aXRsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgdmFyaWFudHNTdHIgPSB2YXJpYW50c0Fyci50b1N0cmluZygpLnJlcGxhY2UoLywvZywgXCJ8XCIpO1xuICAgIFxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkJsYWNrIENhdCBTaG9wIC0geyB0aXRsZSB9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxkaXYgaWQ9XCJwcm9kLWNvbnRcIj5cbiAgICA8aDE+e3Byb2R1Y3QudGl0bGV9PC9oMT5cbiAgICA8aW1nIHNyYz1cInsgbmV3SW1nIH1cIiBhbHQ9XCJ7IHRpdGxlIH1cIj5cbiAgICA8cD4keyBwcmljZSB9PC9wPlxuICAgIHsjZWFjaCBib2R5IGFzIGNoaWxkfVxuICAgICAgICA8cD57IGNoaWxkLmNoaWxkcmVuWzBdLnRleHQgfTwvcD5cbiAgICB7L2VhY2h9XG5cbiAgICB7I2lmIHByb2R1Y3RUeXBlID09ICdwaHlzaWNhbCd9XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJzbmlwY2FydC1hZGQtaXRlbVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0taWQ9XCJ7IHNsdWcgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tcHJpY2U9XCJ7IHByaWNlIH1cIlxuICAgICAgICAgICAgZGF0YS1pdGVtLXVybD1cIi9zaG9wL3sgc2x1ZyB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1kZXNjcmlwdGlvbj1cInsgYmx1cmIgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0taW1hZ2U9XCJ7IG5ld0ltZyB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1uYW1lPVwieyB0aXRsZSB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1jdXN0b20xLW5hbWU9XCJTaXplXCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1jdXN0b20xLW9wdGlvbnM9XCJ7IHZhcmlhbnRzU3RyIH1cIlxuICAgICAgICAgICAgZGF0YS1pdGVtLWN1c3RvbTEtcmVxdWlyZWQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1jdXN0b20xLXZhbHVlPVwieHNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgQWRkIHRvIGNhcnRcbiAgICAgICAgPC9idXR0b24+XG4gICAgezplbHNlIGlmIHByb2R1Y3RUeXBlID09ICdkaWdpdGFsJ31cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNuaXBjYXJ0LWFkZC1pdGVtXCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1pZD1cInsgc2x1ZyB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1wcmljZT1cInsgcHJpY2UgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tdXJsPVwiaHR0cHM6Ly9ibGtjYXRzaG9wLWNsaWVudC5uZXRsaWZ5LmFwcC9zaG9wL3sgc2x1ZyB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1kZXNjcmlwdGlvbj1cInsgYmx1cmIgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0taW1hZ2U9XCJ7IG5ld0ltZyB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1uYW1lPVwieyB0aXRsZSB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1maWxlLWd1aWQ9XCJ7IHByb2R1Y3RUb2tlbiB9XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIEFkZCB0byBjYXJ0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIHsvaWZ9IFxuPC9kaXY+XG5cbjxzdHlsZT5cbiAgICBpbWd7XG4gICAgICAgIG1heC13aWR0aDo1MDBweDtcbiAgICB9XG48L3N0eWxlPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7eUJBc0VhLEdBQUssS0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZDQW9CUCxHQUFJO2lEQUNELEdBQUs7MkhBQ29DLEdBQUk7dURBQ3ZDLEdBQUs7a0RBQ1gsR0FBTTtnREFDUCxHQUFLOzREQUNBLEdBQVk7Ozs7Ozs7Ozs7Ozs7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
