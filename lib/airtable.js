const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);

const table = base('coffeeStores');

  const getMinifiedRecord = (record) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  };
  
  const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
  };

  // find record by filter
  const findRecordByFilter =async (id) => {
    const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
    return getMinifiedRecords(findCoffeeStoreRecords);
  };
  // export the functions
export {table, getMinifiedRecords, findRecordByFilter};
