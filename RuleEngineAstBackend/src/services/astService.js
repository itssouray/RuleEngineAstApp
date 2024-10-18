// astService.js

// Node class to represent an AST node
class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type; // "operator" (AND/OR) or "operand" (condition)
      this.left = left; // Left child node
      this.right = right; // Right child node
      this.value = value; // Optional value for conditions
    }
  }
  
  // Main function to create the AST from the rule string
  function createRuleAST(ruleString) {
    const tokens = tokenize(ruleString);
    return parseTokens(tokens);
  }
  
  // Tokenization function
  function tokenize(expression) {
    const regex = /\s*(=>|<=|>=|==|!=|[()<>]|AND|OR|[^()<> ]+)\s*/g;
    return expression.split(regex).filter(Boolean);
  }
  
  // Parsing function to build the AST
  function parseTokens(tokens) {
    let index = 0;
  
    function parseExpression() {
      let leftNode = parseTerm();
      
      while (index < tokens.length && tokens[index] === "OR") {
        const operator = tokens[index++];
        const rightNode = parseTerm();
        leftNode = new Node(operator, leftNode, rightNode);
      }
  
      return leftNode;
    }
  
    function parseTerm() {
      let leftNode = parseFactor();
      
      while (index < tokens.length && tokens[index] === "AND") {
        const operator = tokens[index++];
        const rightNode = parseFactor();
        leftNode = new Node(operator, leftNode, rightNode);
      }
  
      return leftNode;
    }
  
    function parseFactor() {
      if (tokens[index] === "(") {
        index++; // Skip '('
        const node = parseExpression();
        index++; // Skip ')'
        return node;
      } else {
        return parseCondition();
      }
    }
  
    function parseCondition() {
      const [key, operator, value] = tokens.slice(index, index + 3);
      if (!key || !operator || !value) throw new Error("Invalid condition");
      index += 3; // Move index past the condition
      return new Node("operand", null, null, `${key} ${operator} ${value}`);
    }
  
    return parseExpression();
  }
  
  // Function to combine multiple ASTs into one
  function combineASTs(astList) {
    if (astList.length === 0) return null; // Return null for empty input
    if (astList.length === 1) return astList[0]; // Return the single AST if only one is provided

    // Combine them using an OR operator for demonstration
    let combinedAST = astList[0];

    for (let i = 1; i < astList.length; i++) {
        // If the current combinedAST is already an OR node, just append the new AST
        if (combinedAST.type === "OR") {
            combinedAST.right = new Node("OR", combinedAST.right, astList[i]);
        } else {
            // Create a new OR node if combinedAST is not an OR
            combinedAST = new Node("OR", combinedAST, astList[i]);
        }
    }

    return combinedAST;
}

  
  // Function to evaluate the AST against user data
  function evaluateRuleAST(ast, userData) {
    if (!ast) return false; // If no AST is provided, return false by default
  
    if (ast.type === "operand") {
        // Evaluate the condition, e.g., "age > 30" against user data
        return evaluateCondition(ast.value, userData);
    } else if (ast.type === "AND") {
        // Both left and right must be true for AND
        return (
            evaluateRuleAST(ast.left, userData) &&
            evaluateRuleAST(ast.right, userData)
        );
    } else if (ast.type === "OR") {
        // Either left or right must be true for OR
        return (
            evaluateRuleAST(ast.left, userData) ||
            evaluateRuleAST(ast.right, userData)
        );
    }
}

// Helper function to evaluate a condition string against user data
function evaluateCondition(condition, userData) {
    const regex = /([a-zA-Z_]+)\s*([<>=]+)\s*(['"]?\d+['"]?|['"][a-zA-Z ]+['"]?)/; // Regex to match conditions
    const match = condition.match(regex);

    if (!match) {
        throw new Error(`Invalid condition: ${condition}`);
    }

    const key = match[1]; // The variable name (e.g., "age")
    const operator = match[2]; // The operator (e.g., ">", "<", "=")
    const value = match[3].replace(/['"]+/g, ""); // Remove quotes for strings and numbers

    // Check if the key exists in userData
    if (!(key in userData)) {
        console.error(`Key "${key}" does not exist in userData`);
        return false; // Or handle as needed
    }

    const userValue = userData[key];

    // Parse value to number if it is a numeric condition
    const isNumericValue = !isNaN(value);
    const parsedValue = isNumericValue ? Number(value) : value; // Convert string to number if applicable

    switch (operator) {
        case ">":
            return userValue > parsedValue;
        case "<":
            return userValue < parsedValue;
        case "=":
            return userValue == parsedValue; // Use == for loose comparison
        default:
            return false; // Invalid operator
    }
}


  
  module.exports = { createRuleAST, combineASTs, evaluateRuleAST };
  