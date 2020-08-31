import { S as SvelteComponentDev, i as init, d as dispatch_dev, G as globals, s as safe_not_equal, m as validate_each_argument, v as validate_slots, e as element, t as text, f as claim_element, g as children, h as claim_text, a as detach_dev, j as add_location, k as insert_dev, l as append_dev, n as noop, b as space, q as query_selector_all, c as claim_space, o as attr_dev, p as set_data_dev, r as destroy_each } from './client.5b87d38d.js';
import { s as sanityClient } from './sanityClient.1932ff1a.js';

/* src/routes/shop/[slug].svelte generated by Svelte v3.24.1 */

const { console: console_1 } = globals;
const file = "src/routes/shop/[slug].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

// (73:4) {#each body as child}
function create_each_block(ctx) {
	let p;
	let t_value = /*child*/ ctx[17].children[0].text + "";
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
			add_location(p, file, 73, 8, 1940);
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
		source: "(73:4) {#each body as child}",
		ctx
	});

	return block;
}

// (92:39) 
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
			attr_dev(button, "data-item-id", /*prodID*/ ctx[2]);
			attr_dev(button, "data-item-price", /*price*/ ctx[8]);
			attr_dev(button, "data-item-url", button_data_item_url_value = "/shop/" + /*slug*/ ctx[3] + "}");
			attr_dev(button, "data-item-description", /*blurb*/ ctx[6]);
			attr_dev(button, "data-item-image", /*newImg*/ ctx[9]);
			attr_dev(button, "data-item-name", /*title*/ ctx[4]);
			attr_dev(button, "data-item-file-guid", /*productToken*/ ctx[5]);
			add_location(button, file, 92, 8, 2602);
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
		source: "(92:39) ",
		ctx
	});

	return block;
}

// (77:4) {#if productType == 'physical'}
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
			attr_dev(button, "data-item-id", /*prodID*/ ctx[2]);
			attr_dev(button, "data-item-price", /*price*/ ctx[8]);
			attr_dev(button, "data-item-url", button_data_item_url_value = "/shop/" + /*slug*/ ctx[3] + "}");
			attr_dev(button, "data-item-description", /*blurb*/ ctx[6]);
			attr_dev(button, "data-item-image", /*newImg*/ ctx[9]);
			attr_dev(button, "data-item-name", /*title*/ ctx[4]);
			attr_dev(button, "data-item-custom1-name", "Size");
			attr_dev(button, "data-item-custom1-options", /*variantsStr*/ ctx[10]);
			attr_dev(button, "data-item-custom1-required", "true");
			attr_dev(button, "data-item-custom1-value", "xs");
			add_location(button, file, 77, 8, 2031);
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
		source: "(77:4) {#if productType == 'physical'}",
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
	let each_value = /*body*/ ctx[7];
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
			t5 = text(/*price*/ ctx[8]);
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
			t5 = claim_text(p_nodes, /*price*/ ctx[8]);
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
			add_location(h1, file, 69, 4, 1816);
			if (img.src !== (img_src_value = /*newImg*/ ctx[9])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", /*title*/ ctx[4]);
			attr_dev(img, "class", "svelte-1uz4c67");
			add_location(img, file, 70, 4, 1845);
			add_location(p, file, 71, 4, 1888);
			attr_dev(div, "id", "prod-cont");
			add_location(div, file, 68, 0, 1791);
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

			if (dirty & /*body*/ 128) {
				each_value = /*body*/ ctx[7];
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

	// console.log(productType);
	let prodID = product._id;

	let slug = product.slug.current;
	let title = product.title;
	let variants = product.variants;
	let defaultVariant = product.defaultProductVariant.title;
	let productToken = product.product_token;
	let images = product.defaultProductVariant.images;
	console.log(images);
	let blurb = product.blurb.en;
	let body = product.body.en;
	let price = product.defaultProductVariant.price;
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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
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
		prodID,
		slug,
		title,
		variants,
		defaultVariant,
		productToken,
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
		if ("prodID" in $$props) $$invalidate(2, prodID = $$props.prodID);
		if ("slug" in $$props) $$invalidate(3, slug = $$props.slug);
		if ("title" in $$props) $$invalidate(4, title = $$props.title);
		if ("variants" in $$props) variants = $$props.variants;
		if ("defaultVariant" in $$props) defaultVariant = $$props.defaultVariant;
		if ("productToken" in $$props) $$invalidate(5, productToken = $$props.productToken);
		if ("images" in $$props) images = $$props.images;
		if ("blurb" in $$props) $$invalidate(6, blurb = $$props.blurb);
		if ("body" in $$props) $$invalidate(7, body = $$props.body);
		if ("price" in $$props) $$invalidate(8, price = $$props.price);
		if ("tags" in $$props) tags = $$props.tags;
		if ("imgPath" in $$props) imgPath = $$props.imgPath;
		if ("newImg" in $$props) $$invalidate(9, newImg = $$props.newImg);
		if ("variantsArr" in $$props) variantsArr = $$props.variantsArr;
		if ("variantsStr" in $$props) $$invalidate(10, variantsStr = $$props.variantsStr);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		product,
		productType,
		prodID,
		slug,
		title,
		productToken,
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
			console_1.warn("<U5Bslugu5D> was created without expected prop 'product'");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3NsdWddLjJlOTU4OTZiLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3Nob3AvW3NsdWddLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgc2FuaXR5Q2xpZW50IGZyb20gJ0BzYW5pdHkvY2xpZW50JztcbiAgICBcbiAgICBjb25zdCBjbGllbnQgPSBzYW5pdHlDbGllbnQoe1xuICAgICAgICBwcm9qZWN0SWQ6ICdibmM5ejZ1dCcsXG4gICAgICAgIGRhdGFzZXQ6ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgdG9rZW46ICcnLCAvLyBvciBsZWF2ZSBibGFuayB0byBiZSBhbm9ueW1vdXMgdXNlclxuICAgICAgICB1c2VDZG46IGZhbHNlIC8vIGBmYWxzZWAgaWYgeW91IHdhbnQgdG8gZW5zdXJlIGZyZXNoIGRhdGFcbiAgICB9KTtcblxuICAgIGxldCBwcm9kdWN0ID0gW107XG5cblx0ZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQocGFnZSwgc2Vzc2lvbikge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgeyBzbHVnIH0gPSBwYWdlLnBhcmFtcztcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgKltzbHVnLmN1cnJlbnQgPT0gXCIke3NsdWd9XCJdYDtcblx0XHRjb25zdCByZXMgPSBhd2FpdCBjbGllbnQuZmV0Y2gocXVlcnkpLnRoZW4ocHJvZCA9PiB7XG4gICAgICAgICAgICBwcm9kdWN0ID0gcHJvZFswXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IHByb2R1Y3QgfTtcbiAgICB9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblxuICAgIGV4cG9ydCBsZXQgcHJvZHVjdDtcblxuICAgIGxldCBwcm9kdWN0VHlwZSA9IHByb2R1Y3QucHJvZHVjdF90eXBlO1xuXG4gICAgLy8gY29uc29sZS5sb2cocHJvZHVjdFR5cGUpO1xuXG4gICAgbGV0IHByb2RJRCA9IHByb2R1Y3QuX2lkO1xuICAgIGxldCBzbHVnID0gcHJvZHVjdC5zbHVnLmN1cnJlbnQ7XG4gICAgbGV0IHRpdGxlID0gcHJvZHVjdC50aXRsZTtcblxuICAgIGxldCB2YXJpYW50cyA9IHByb2R1Y3QudmFyaWFudHM7XG4gICAgbGV0IGRlZmF1bHRWYXJpYW50ID0gcHJvZHVjdC5kZWZhdWx0UHJvZHVjdFZhcmlhbnQudGl0bGU7XG5cbiAgICBsZXQgcHJvZHVjdFRva2VuID0gcHJvZHVjdC5wcm9kdWN0X3Rva2VuO1xuICAgIFxuICAgIGxldCBpbWFnZXMgPSBwcm9kdWN0LmRlZmF1bHRQcm9kdWN0VmFyaWFudC5pbWFnZXM7XG5cbiAgICBjb25zb2xlLmxvZyhpbWFnZXMpO1xuXG4gICAgbGV0IGJsdXJiID0gcHJvZHVjdC5ibHVyYi5lbjtcbiAgICBsZXQgYm9keSA9IHByb2R1Y3QuYm9keS5lbjtcbiAgICBsZXQgcHJpY2UgPSBwcm9kdWN0LmRlZmF1bHRQcm9kdWN0VmFyaWFudC5wcmljZTtcbiAgICBsZXQgdGFncyA9IHByb2R1Y3QudGFncztcblxuICAgIGxldCBpbWdQYXRoID0gJ2h0dHBzOi8vY2RuLnNhbml0eS5pby9pbWFnZXMvYm5jOXo2dXQvcHJvZHVjdGlvbi8nICsgcHJvZHVjdC5kZWZhdWx0UHJvZHVjdFZhcmlhbnQuaW1hZ2VzWzBdLmFzc2V0Ll9yZWY7XG4gICAgbGV0IG5ld0ltZyA9IGltZ1BhdGgucmVwbGFjZSgvLXBuZy9nLCBcIi5wbmdcIikucmVwbGFjZSgvLWpwZy9nLCBcIi5qcGdcIikucmVwbGFjZSgvaW1hZ2UtL2csIFwiXCIpO1xuXG4gICAgbGV0IHZhcmlhbnRzQXJyID0gW107XG5cbiAgICBpZih2YXJpYW50cyl7XG4gICAgICAgIHZhcmlhbnRzQXJyLnB1c2goZGVmYXVsdFZhcmlhbnQpO1xuICAgICAgICBwcm9kdWN0LnZhcmlhbnRzLmZvckVhY2godmFyaWFudCA9PiB7XG4gICAgICAgICAgICB2YXJpYW50c0Fyci5wdXNoKHZhcmlhbnQudGl0bGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHZhcmlhbnRzU3RyID0gdmFyaWFudHNBcnIudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2csIFwifFwiKTtcbiAgICBcbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5CbGFjayBDYXQgU2hvcCAtIHsgdGl0bGUgfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48ZGl2IGlkPVwicHJvZC1jb250XCI+XG4gICAgPGgxPntwcm9kdWN0LnRpdGxlfTwvaDE+XG4gICAgPGltZyBzcmM9XCJ7IG5ld0ltZyB9XCIgYWx0PVwieyB0aXRsZSB9XCI+XG4gICAgPHA+JHsgcHJpY2UgfTwvcD5cbiAgICB7I2VhY2ggYm9keSBhcyBjaGlsZH1cbiAgICAgICAgPHA+eyBjaGlsZC5jaGlsZHJlblswXS50ZXh0IH08L3A+XG4gICAgey9lYWNofVxuXG4gICAgeyNpZiBwcm9kdWN0VHlwZSA9PSAncGh5c2ljYWwnfVxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwic25pcGNhcnQtYWRkLWl0ZW1cIlxuICAgICAgICAgICAgZGF0YS1pdGVtLWlkPVwieyBwcm9kSUQgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tcHJpY2U9XCJ7IHByaWNlIH1cIlxuICAgICAgICAgICAgZGF0YS1pdGVtLXVybD1cIi9zaG9wL3sgc2x1ZyB9fVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tZGVzY3JpcHRpb249XCJ7IGJsdXJiIH1cIlxuICAgICAgICAgICAgZGF0YS1pdGVtLWltYWdlPVwieyBuZXdJbWcgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tbmFtZT1cInsgdGl0bGUgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tY3VzdG9tMS1uYW1lPVwiU2l6ZVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tY3VzdG9tMS1vcHRpb25zPVwieyB2YXJpYW50c1N0ciB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1jdXN0b20xLXJlcXVpcmVkPVwidHJ1ZVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tY3VzdG9tMS12YWx1ZT1cInhzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIEFkZCB0byBjYXJ0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIHs6ZWxzZSBpZiBwcm9kdWN0VHlwZSA9PSAnZGlnaXRhbCd9XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJzbmlwY2FydC1hZGQtaXRlbVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0taWQ9XCJ7IHByb2RJRCB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1wcmljZT1cInsgcHJpY2UgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0tdXJsPVwiL3Nob3AveyBzbHVnIH19XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1kZXNjcmlwdGlvbj1cInsgYmx1cmIgfVwiXG4gICAgICAgICAgICBkYXRhLWl0ZW0taW1hZ2U9XCJ7IG5ld0ltZyB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1uYW1lPVwieyB0aXRsZSB9XCJcbiAgICAgICAgICAgIGRhdGEtaXRlbS1maWxlLWd1aWQ9XCJ7IHByb2R1Y3RUb2tlbiB9XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIEFkZCB0byBjYXJ0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIHsvaWZ9IFxuPC9kaXY+XG5cbjxzdHlsZT5cbiAgICBpbWd7XG4gICAgICAgIG1heC13aWR0aDo1MDBweDtcbiAgICB9XG48L3N0eWxlPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozt5QkF5RWEsR0FBSyxLQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0NBb0JQLEdBQU07aURBQ0gsR0FBSztzRkFDRCxHQUFJO3VEQUNGLEdBQUs7a0RBQ1gsR0FBTTtnREFDUCxHQUFLOzREQUNBLEdBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
