"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    server: {
        proxy: {
            '/api': {
                target: 'https://pt-madding-api-production.up.railway.app',
                changeOrigin: true,
                secure: false, // Set ke false jika API menggunakan HTTPS dengan sertifikat tidak valid
            },
        },
    },
});
