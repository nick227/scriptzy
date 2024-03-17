import Command from "../Command.js";

export default class ExtractAndSanitizeJSONCommand extends Command {
  execute(input) {
    if (!input) {
      return input;
    }
    return typeof input === 'object' ? input : extractAndSanitizeJSON(input);
  }
}

function extractAndSanitizeJSON(input) {
  try {
    const parsed = JSON.parse(input);
    return parsed;
  } catch (e) {
    const firstCurly = input.indexOf('{');
    const lastCurly = input.lastIndexOf('}');

    if (firstCurly === -1 || lastCurly === -1 || firstCurly >= lastCurly) {
      return input;
    }

    const extracted = input.substring(firstCurly, lastCurly + 1);

    try {
      return JSON.parse(extracted);
    } catch (e) {
      return sanitizeJSON(extracted);
    }
  }
}

function sanitizeJSON(input) {
  try {
    return JSON.parse(input);
  } catch (initialError) {
    let sanitized = input
      .replace(/\/\/[^\n]*\n/g, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/(\w+):/g, '"$1":') // Add quotes around unquoted property names
      .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
      .replace(/:\s*([a-zA-Z_$][\w]*)/g, ':"$1"') // Quote unquoted string values
      .replace(/:\s*undefined/g, ':null'); // Replace undefined with null

    try {
      return JSON.parse(sanitized);
    } catch (finalError) {
      console.error("Initial error:", initialError.message);
      console.error("Final error:", finalError.message);
      console.error("Sanitized input:", sanitized);
      return input;
    }
  }
}