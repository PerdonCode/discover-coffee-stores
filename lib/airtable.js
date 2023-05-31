const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);

const table = base('coffeeStores');

const getMinifiedRecord = (record) =>{
    return{
        // extract fields
        ...record.fields,
    }
}

const getMinifiedRecords = (records) =>{
    return records.map((record) => getMinifiedRecord(record));
}

export {table, getMinifiedRecords};
