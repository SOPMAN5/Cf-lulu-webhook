const buildPrintJobs = async(order)=>{
    const order_details = {};
	const {
		shipping_address_city,
		shipping_address_country,
		shipping_address_first_name,
		shipping_address_last_name,
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
			"external_id": "Item-"+String(item.attributes.original_product_id),
			"printable_normalization": {
			  "cover": {
				"source_url": "https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1"
			  },
			  "interior": {
				"source_url": "https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1"
			  },
			  "pod_package_id": "0600X0900BWSTDPB060UW444MXX"
			},
			"quantity": item.attributes.quantity,
			"title":item.attributes.original_product_name
		  });
	
	 });
	
	(order_details.external_id = "ORD-" + String(order_number)),
		(order_details.line_items = line_items);
	order_details.contact_email = "test@test.com"
	order_details.production_delay = 120;
	order_details.shipping_level = "MAIL";
	const shipping_details = {
		city: shipping_address_city,
		country_code: shipping_address_country,
		name: `${shipping_address_first_name} ${shipping_address_last_name}`,
		phone_number: phone_number,
		postcode: shipping_address_postal_code,
		
		street1: shipping_address_street_one,
	};
	order_details.shipping_address = shipping_details
	// { "city": "Lübeck",
	// "country_code": "GB",
	// "name": "Hans Dampf",
	// "phone_number": "844-212-0689",
	// "postcode": "PO1 3AX",
	// "state_code": "",
	// "street1": "Holstenstr. 48"}
   const data = JSON.stringify(order_details) 
    return data

};

module.exports = buildPrintJobs;

