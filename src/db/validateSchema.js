export default function validateSchema(data, schema) {
    // Helper functions
    const isAnyType = type => type === 'any';
    const isArrayType = type => Array.isArray(type) && typeof type[0] === 'object';
    const isEnumType = (type, value) => Array.isArray(type) && type.includes(value);
    const isObjectType = type => typeof type === 'object' && type !== null;
    const isPrimitiveArrayType = type => Array.isArray(type) && typeof type[0] === 'string';

    const validateArray = (value, schema) => Array.isArray(value) && value.every(item => validateSchema(item, schema[0]));
    const validateObject = (value, schema) => isObjectType(value) && validateSchema(value, schema);
    const validatePrimitive = (value, type) => typeof value === type;
    const validatePrimitiveArray = (value, schema) => Array.isArray(value) && value.every(item => typeof item === schema[0]);

    // Check for extra keys in data that are not in the schema, only for objects
    if (isObjectType(data) && !Array.isArray(data)) {
        const extraKeys = Object.keys(data).filter((key) => {
            return !schema.hasOwnProperty(key);
        });
        if (extraKeys.length > 0) {
            console.error(`Extra keys found: ${extraKeys}`);
            return false;
        }
    }

    // Array validation
    if (Array.isArray(data)) {
        return data.every(item => validateSchema(item, schema));
    }

    // Main validation logic
    return Object.keys(schema).every(key => {
        const firstKey = Object.keys(schema[key])[0];
        if (firstKey === 'any') {
            return true;
        }
        if (!data.hasOwnProperty(key)) return true;

        const expectedType = schema[key];
        const actualValue = data[key];

        if (isAnyType(expectedType)) return true;
        if (isEnumType(expectedType, actualValue)) return true;
        if (isArrayType(expectedType)) return validateArray(actualValue, expectedType);
        if (isObjectType(expectedType)) return validateObject(actualValue, expectedType);
        if (isPrimitiveArrayType(expectedType)) return validatePrimitiveArray(actualValue, expectedType);
        if (!validatePrimitive(actualValue, expectedType)) {
            console.error(`Primitive validation failed for key: ${key}`);
            return false;
        }
        return true;
    });
}
