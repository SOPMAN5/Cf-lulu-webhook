const express = require('express');
const {createOrder,createPrintJobs} = require('../controllers/createOrder');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
      hello: "hi!"
    });
  });
router.get("/funnel_webhooks/test",async(req,res)=>{
    res.setHeader('Content-Type',"application/json");
    res.status(200).json({"time":new Date().toISOString()})
}) 
router.post("/funnel_webhooks/print_jobs",createPrintJobs); 
router.get("/print-jobs",createOrder)
router.use(`/.netlify/functions/api`, router);

module.exports = router