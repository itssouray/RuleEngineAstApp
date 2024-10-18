// models/Rule.js
const mongoose = require('mongoose');

// Define the schema for storing rules and their AST structure
const ruleSchema = new mongoose.Schema({
  ruleString: {
    type: String,
    required: true,
  },
  astStructure: {
    type: Object,  // Store the AST structure as a JSON object
    required: true,
  },
});

// Export the Rule model
module.exports = mongoose.model('Rule', ruleSchema);
