"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../style/index");
if (process.env.NODE_ENV === 'dev') {
    require('./index.dev.scss');
}
else {
    require('./index.scss');
}
