export {useTimeConverter}

function useTimeConverter() {
    return {
        createUtcDateTime,
        createUtcDate,
        createUtcDateString,
        createUtcDateStringInput
    }

    function createUtcDateTime(str)
    {
        const parts = str.split(/[-T:]+/).map(x => parseInt(x));
        return new Date(Date.UTC(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]));
    }

    function createUtcDateString(str)
    {
        //parameters set to avoid date chanches due to timezones conversion
        return createUtcDate(str).toLocaleDateString(undefined, {timeZone:'UTC'});
    }

    function createUtcDateStringInput(str)
    {
        //parameters set to avoid date chanches due to timezones conversion
        return createUtcDate(str).toLocaleDateString('en-CA', {timeZone:'UTC'});
    }

    function createUtcDate(str)
    {
        const parts = str.split(/[-T]+/,3).map(x => parseInt(x));
        const date = new Date(Date.UTC(parts[0], parts[1]-1, parts[2], 0, 0, 0));
        return date;
    }

    

}