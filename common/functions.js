function getBooleanValue(stringValue) {
    stringValue = String(stringValue).toLowerCase();
    if (stringValue === 'true' || stringValue === 'yes' || stringValue === 'y') {
        return true;
    }
    else if (stringValue === 'false' || stringValue === 'no' || stringValue === 'n') {
        return false;
    }
    throw new Error(`Can't understand '${stringValue}', should be one of true|yes|y|false|no|n`);
}

export function getBooleanAppParam(envValue, configValue, defaultValue = false) {
    return typeof envValue    !== 'undefined' ? getBooleanValue(envValue)
         : typeof configValue !== 'undefined' ? getBooleanValue(configValue)
         : defaultValue;
}
