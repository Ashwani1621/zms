const { customAlphabet } = require('nanoid');
const nano = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 10);

const genTicketId = () => `TICK-${nano()}`;

module.exports = { genTicketId };
