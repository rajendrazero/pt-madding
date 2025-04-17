"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectInterceptors = void 0;
var axios_1 = require("axios");
var instance = axios_1.default.create({
    baseURL: 'https://pt-madding-api-production.up.railway.app/api',
});
var injectInterceptors = function (setLoading) {
    var reqCount = 0;
    instance.interceptors.request.use(function (config) {
        reqCount++;
        setLoading(true);
        return config;
    });
    instance.interceptors.response.use(function (res) {
        reqCount--;
        if (reqCount === 0)
            setLoading(false);
        return res;
    }, function (err) {
        reqCount--;
        if (reqCount === 0)
            setLoading(false);
        return Promise.reject(err);
    });
};
exports.injectInterceptors = injectInterceptors;
exports.default = instance;
