// utils/validation.js

// Define allowed attributes
const allowedAttributes = ['age', 'department', 'salary', 'experience'];

// Function to validate attributes in a rule string
function validateAttributes(ruleString) {
  const regex = /([a-zA-Z_]+)\s*([<>=]+)\s*([\d]+|['"][a-zA-Z ]+['"])/g;
  let match;

  while ((match = regex.exec(ruleString)) !== null) {
    const attribute = match[1];  // The attribute name (e.g., "age")
    if (!allowedAttributes.includes(attribute)) {
      return false;  // Invalid attribute found
    }
  }
  
  return true;  // All attributes are valid
}

module.exports = validateAttributes;
