const printJobs = require("../services/createOrder");

 const createOrder = async (req, res) => {
	const data = { data: req.body };
	const result = await printJobs.createOrder();
	const statusCode = result.status ? 201 : 400;
	return res.status(statusCode).json(result);
};
const createPrintJobs = async (req, res) => {
	const data = { data: req.body };
	const result = await printJobs.createPrintJobs();
	const statusCode = result.status ? 200 : 400;
	return res.status(statusCode).json(result);
};
module.exports = {createOrder,createPrintJobs}