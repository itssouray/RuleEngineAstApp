const express = require("express");
const {
  createRule,
  combineRules,
  evaluateRule,
  updateRule,
  getAllRules,
  deleteRule,
  viewRuleAst,
} = require("../controller/rule.controller");
const router = express.Router();

// Route to create a rule
router.post("/create", createRule);

// Route to combine multiple rules
router.post("/combine", combineRules);

// Route to evaluate a rule
router.post("/evaluate", evaluateRule);

// Route to update an existing rule
router.put("/update", updateRule);

// Route to delete rule
router.delete("/delete-rule/:id", deleteRule);

// route to get ast structure
router.get("/view-ast/:ruleId", viewRuleAst);

// route to get all rules
router.get("/get-all-rules", getAllRules);

module.exports = router;
