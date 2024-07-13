const printJobs = require("../services/createOrder");

 const createOrder = async (req, res) => {
	const data = { data: req.body };
	const result = await printJobs.createOrder();
	const statusCode = result.status ? 201 : 400;
	return res.status(statusCode).json(result);
};
const createPrintJobs = async (req, res) => {
	const data =  req.body ;
	const funnelPageId = req.body.data.attributes.order_page.id;
	const allowedFunnelPages = [9240009,7083817,9241424,12538942];
	const allowedProductNames = ['1:1 Coaching call','Hard Copy'];
    const productName = req.body.included.filter(
		(e) => e.type === "orders/line_item"
	)[0];
	
   const isValidProductName = allowedProductNames.includes(productName.attributes.original_product_name);   
	const isValidFunnelPage = allowedFunnelPages.includes(funnelPageId);
     
	if(!isValidFunnelPage || !isValidProductName) return res.status(404).json({status:true,message:'Not matching funnel page'}); 
	const result = await printJobs.createPrintJobs(data);
	const statusCode = result.status ? 200 : 400;
	return res.status(statusCode).json(result);
};
module.exports = {createOrder,createPrintJobs}