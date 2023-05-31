const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);

const table = base('coffeeStores');