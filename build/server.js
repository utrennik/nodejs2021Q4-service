"use strict";
const { PORT } = require('./common/config');
const app = require('./app');
app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`) // eslint-disable-line no-console
);
