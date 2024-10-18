const {
  createRuleAST,
  combineASTs,
  evaluateRuleAST,
} = require("../services/astService");
const Rule = require("../model/Rule");
const validateAttributes = require("../utils/validation.js");

const createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    console.log(ruleString);

    if (!validateAttributes(ruleString)) {
      return res
        .status(400)
        .json({ message: "Invalid attributes in the rule string" });
    }

    const ast = createRuleAST(ruleString);

    const newRule = new Rule({
      ruleString,
      astStructure: ast,
    });

    await newRule.save();

    res
      .status(201)
      .json({ message: "Rule created successfully", rule: newRule });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create rule", error: error.message });
  }
};

const combineRules = async (req, res) => {
  try {
    const { ruleIds } = req.body;

    const rules = await Rule.find({ _id: { $in: ruleIds } });

    for (const rule of rules) {
      if (!validateAttributes(rule.ruleString)) {
        return res
          .status(400)
          .json({ message: `Invalid attributes in rule: ${rule._id}` });
      }
    }

    const astList = rules.map((rule) => rule.astStructure);

    const combinedAST = combineASTs(astList);

    const combinedRule = new Rule({
      ruleString: "Combined Rule",
      astStructure: combinedAST,
    });

    await combinedRule.save();

    res.status(200).json({
      status: 200,
      combinedRule: {
        ruleString: "Combined Rule",
        astStructure: combinedAST,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to combine rules", error: error.message });
  }
};

const evaluateRule = async (req, res) => {
  try {
    const { ruleId, userData } = req.body;

    console.log("user data : ", userData);

    const rule = await Rule.findById(ruleId);

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    const result = evaluateRuleAST(rule.astStructure, userData);

    res.status(200).json({ message: "Rule evaluation successful", result });
  } catch (error) {
    res
      .status(500)
      .json({status: 200, message: "Failed to evaluate rule", error: error.message });
  }
};

const updateRule = async (req, res) => {
  try {
    const { ruleId, ruleString } = req.body;

    if (!validateAttributes(ruleString)) {
      return res
        .status(400)
        .json({ message: "Invalid attributes in the rule string" });
    }
    const ast = createRuleAST(ruleString);

    const updatedRule = await Rule.findByIdAndUpdate(
      ruleId,
      {
        ruleString,
        astStructure: ast,
      },
      { new: true }
    );

    if (!updatedRule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    res
      .status(200)
      .json({ message: "Rule updated successfully", rule: updatedRule });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update rule", error: error.message });
  }
};

const deleteRule = async (req, res) => {
  const { id } = req.params;

  try {
    const rule = await Rule.findByIdAndDelete(id);

    if (!rule) {
      return res
        .status(404)
        .json({ success: false, message: "Rule not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Rule deleted successfully" });
  } catch (error) {
    console.error("Error deleting rule:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const viewRuleAst = async (req, res) => {
  const { ruleId } = req.params;
  console.log("rule id : ", ruleId);
  try {
    const rule = await Rule.findById(ruleId);
    if (!rule) {
      res.status(404).send("No rule is found!");
    } else {
      res.status(200).json(rule.astStructure);
    }
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send("Server Error");
  }
};

const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.status(200).json({ success: true, rules });
  } catch (error) {
    console.error("Error fetching rules:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Export the updated controller functions
module.exports = {
  createRule,
  combineRules,
  evaluateRule,
  updateRule,
  getAllRules,
  deleteRule,
  viewRuleAst,
};
