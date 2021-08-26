function getBooleanValue(value) {
    const type = typeof value;
    if (type !== 'string') {
        throw new Error(`String expected, but '${value}' is '${type}'`);
    }

    value = value.toLowerCase();
    if (value === 'true' || value === 'yes' || value === 'y') {
        return true;
    }
    else if (value === 'false' || value === 'no' || value === 'n') {
        return false;
    }

    throw new Error(`Can't understand '${value}', should be one of true|yes|y|false|no|n`);
}

export function getBooleanAppParam(envValue, configValue, defaultValue = false) {
    if (typeof envValue !== 'undefined') {
        return getBooleanValue(envValue);
    }
    else if (typeof configValue !== 'undefined') {
        return getBooleanValue(configValue)
    }
    return defaultValue;
}
