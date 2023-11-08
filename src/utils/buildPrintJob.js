const buildPrintJobs = async(order)=>{
    const order_details = {};
	const {
		shipping_address_city,
		shipping_address_country,
		shipping_address_firstname,
		shipping_address_lastname,
		shipping_address_postal_code,
		shipping_address_street_one,
		order_number,
		phone_number,
	} = order.data.data.attributes;
	const total_amount = order.data.data.total_amount;
	//const line_items = order.data.data.relationships.line_items;
	const line_items = [];
	const event_type = order.data.event_type;
	const orders = order.data.included.filter(
		(e) => e.type === "orders/line_item"
	);
	orders.forEach((item) => {
		line_items.push({
			external_id: item.attributes.original_product_id,
			printable_normalization: {
				cover: {
					source_url:
						"https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1",
				},
				interior: {
					source_url:
						"https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1",
				},
				pod_package_id: "0600X0900BWSTDPB060UW444MXX",
			},
			quantity: item.attributes.quantity,
			title: item.attributes.original_product_name,
		});
	});
	(order_details.external_id = order_number),
		(order_details.line_items = line_items);
	order_details.contact_email = "test@gmail.com";
	order_details.production_delay = 120;
	order_details.shipping_level = "MAIL";
	order_details.shipping_address = {
		city: shipping_address_city,
		country_code: shipping_address_country,
		name: `${shipping_address_firstname} ${shipping_address_lastname}`,
		phone_number: phone_number,
		postcode: shipping_address_postal_code,
		state_code: "",
		street1: shipping_address_street_one,
	};

	console.log(order_details);
    return order_details 

};

module.exports = buildPrintJobs;
