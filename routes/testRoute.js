const express = require("express")
const router = express.Router()
const { testConn } = require("../controllers/testController")

router.get("/connection", testConn)

module.exports = router