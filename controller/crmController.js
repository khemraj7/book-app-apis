const CRM = require('../model/enquiryForm')

const createEnq = async (req, res) => {
  try {
    const result = await CRM.create(req.body)
    res.json({
      status: 201,
      enquiry: result,
    })
  } catch (error) {
    res.json({
      status: 404,
      error: error.message,
    })
  }
}
const getallEnq = async (req, res) => {
  try {
    const result = await CRM.find({})
    res.json({
      status: 200,
      enquiry: result,
    })
  } catch (error) {
    res.json({
      status: 404,
      error: error.message,
    })
  }
}
const fetchLeads = async (req, res) => {
  try {
    let lead
    if (req.query.leads === 'claim') {
      lead = req.query.leads
    } else {
      lead = req.query.leads
    }

    const result = await CRM.find({ leads: lead }).sort()
    res.json({
      status: 200,
      enquiry: result,
    })
  } catch (error) {
    res.json({
      status: 404,
      error: error.message,
    })
  }
}
const loggedIn = async (req, res) => {
  try {
    let lead
    if (req.query.leads === 'claim') {
      lead = req.query.leads
    }
    const result = await CRM.find({ leads: lead }).sort()
    res.json({
      status: 200,
      enquiry: result,
    })
  } catch (error) {
    res.json({
      status: 404,
      error: error.message,
    })
  }
}

module.exports = { createEnq, getallEnq, fetchLeads, loggedIn }
