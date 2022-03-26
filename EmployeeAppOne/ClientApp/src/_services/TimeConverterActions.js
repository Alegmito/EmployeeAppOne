export {useTimeConverter}

function useTimeConverter() {
    return {
        createUtcDateTime,
        createUtcDate
    }

    function createUtcDateTime(str)
    {
        const parts = str.split(/[-T:]+/).map(x => parseInt(x));
        return new Date(Date.UTC(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]));
    }

    function createUtcDate(str)
    {
        const parts = str.split(/[-T]+/,3).map(x => parseInt(x));
        const date = new Date(Date.UTC(parts[0], parts[1]-1, parts[2], 0, 0, 0));
        return date;
    }
}