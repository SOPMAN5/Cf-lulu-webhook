const buildPrintJobs = async(order)=>{
    const order_details = {};
	try {
		const {
			shipping_address_city,
			shipping_address_country,
			shipping_address_first_name,
			shipping_address_last_name,
			shipping_address_postal_code,
			shipping_address_street_one,
			shipping_address_region,
			order_number,
			phone_number,
		} = order.data.attributes;
		const total_amount = order.data.total_amount;
		//const line_items = order.data.data.relationships.line_items;
		const email = order.included[0].attributes.email_address;
		console.log(email,'email')
		const line_items = [];
		const event_type = order.data.event_type;
		const orders = order.included.filter(
			(e) => e.type === "orders/line_item"
		);
		orders.forEach((item) => {
			line_items.push({
				"external_id": "Item-"+String(item.attributes.original_product_id),
				"printable_normalization": {
				  "cover": {
					"source_url": "https://www.dropbox.com/scl/fi/auoo8pu6r5ayiwwb4tect/The-Protocol-Resized-Cover-2-Last-FB.pdf?rlkey=ocdr3gnc47moupcurvl6hap0m&dl=1"
				  },
				  "interior": {
					"source_url":"https://www.dropbox.com/scl/fi/9myj4n7wn0t3nhpdmb3jm/Final-Protocol-new-2.pdf?rlkey=gufhf0d84sck12nrv6c9egc8q&dl=1"
				  },
				  "pod_package_id": "0600X0900FCSTDCW080CW444GXX" 
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
			email:email,
			postcode: shipping_address_postal_code,
			state_code: shipping_address_region,
			street1: shipping_address_street_one,
		};
		order_details.shipping_address = shipping_details;
		// { "city": "Lübecfk",
		// "country_code": "GB",
		// "name": "Hans Dampf",
		// "phone_number": "844-212-0689",
		// "postcode": "PO1 3AXddd",
		// "state_code": "",
		// "street1": "Holstenstr. 48s"}
	   const data = JSON.stringify(order_details) 
		return data;
	} catch (error) {
		return false;
	}

};

module.exports = buildPrintJobs;

