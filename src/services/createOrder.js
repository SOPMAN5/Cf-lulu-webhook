const cofig = require("dotenv").config();
const myCache = require("../utils/cache");
const axios = require("axios");
const customAxios = require("../utils/axiosInterceptors");
const buildPrintJobs = require("../utils/buildPrintJob");

const handler = {};
const BASE_URL = "https://api.sandbox.lulu.com";
handler.refreshAccessToken = async (req, res) => {
	const response = await axios.post(
		"https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token",
		new URLSearchParams({
			grant_type: "client_credentials",
		}),
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${process.env.ACCESS_TOKEN}`,
			},
		}
	);
	const { data } = response;
	return data;
};

handler.createOrder = async (req, res) => {
	let accessToken = myCache.get("accesstoken");
	if (accessToken === undefined) {
		let { access_token } = await handler.refreshAccessToken();

		myCache.set("accesstoken", access_token);
	}
	const url = BASE_URL + "/" + "print-jobs";
	try {
		const result = await customAxios().get(url);
		console.log(result);
		return {
			data: result.data,
			status: true,
		};
	} catch (error) {
		console.log(error.message);
		return {
			status: false,
		};
	}
};

handler.createPrintJobs = async (order) => {
	console.log(process.env.ACCESS_TOKEN);
	// console.log(JSON.stringify(data));
    let accessToken = myCache.get("accesstoken");
	if (accessToken === undefined) {
		let { access_token } = await handler.refreshAccessToken();

		myCache.set("accesstoken", access_token);
	}
    const url = 'https://api.sandbox.lulu.com' + '/'+ 'print-jobs/'
	
	const order_detail = await buildPrintJobs(order);
    try {
      const result = await customAxios('application/json').post(url,order_detail);
      console.log(result.data)
      return {
		status: true,
		data: {},
	};  
    } catch (error) {
        console.log(JSON.stringify(error))
        return {
            status: false,
            data:error,
        };
    }
	
};
module.exports = handler;
