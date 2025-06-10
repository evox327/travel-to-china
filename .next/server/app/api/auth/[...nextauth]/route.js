"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_luxiang_Cursor_AI_project_travel_to_china_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/luxiang/Cursor/AI-project/travel-to-china/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_luxiang_Cursor_AI_project_travel_to_china_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmx1eGlhbmclMkZDdXJzb3IlMkZBSS1wcm9qZWN0JTJGdHJhdmVsLXRvLWNoaW5hJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmx1eGlhbmclMkZDdXJzb3IlMkZBSS1wcm9qZWN0JTJGdHJhdmVsLXRvLWNoaW5hJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNvQztBQUNqSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYXZlbC10by1jaGluYS8/NTlmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbHV4aWFuZy9DdXJzb3IvQUktcHJvamVjdC90cmF2ZWwtdG8tY2hpbmEvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2x1eGlhbmcvQ3Vyc29yL0FJLXByb2plY3QvdHJhdmVsLXRvLWNoaW5hL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUNRO0FBRXhDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYXZlbC10by1jaGluYS8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH0iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJhdXRoT3B0aW9ucyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/facebook */ \"(rsc)/./node_modules/next-auth/providers/facebook.js\");\n/* harmony import */ var next_auth_providers_twitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/twitter */ \"(rsc)/./node_modules/next-auth/providers/twitter.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                await (0,_mongodb__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOne({\n                    email: credentials.email\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                if (!user.isActive) {\n                    throw new Error(\"Account is disabled\");\n                }\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name,\n                    image: user.image,\n                    role: user.role\n                };\n            }\n        }),\n        (0,next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.FACEBOOK_CLIENT_ID,\n            clientSecret: process.env.FACEBOOK_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_twitter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            clientId: process.env.TWITTER_CLIENT_ID,\n            clientSecret: process.env.TWITTER_CLIENT_SECRET,\n            version: \"2.0\"\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            if (account?.provider === \"credentials\") {\n                return true;\n            }\n            // Handle social login\n            if (account?.provider && [\n                \"facebook\",\n                \"twitter\"\n            ].includes(account.provider)) {\n                await (0,_mongodb__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n                const existingUser = await _models_User__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOne({\n                    $or: [\n                        {\n                            email: user.email\n                        },\n                        {\n                            provider: account.provider,\n                            providerId: account.providerAccountId\n                        }\n                    ]\n                });\n                if (existingUser) {\n                    // Update existing user\n                    existingUser.name = user.name || existingUser.name;\n                    existingUser.image = user.image || existingUser.image;\n                    existingUser.provider = account.provider;\n                    existingUser.providerId = account.providerAccountId;\n                    await existingUser.save();\n                } else {\n                    // Create new user\n                    await _models_User__WEBPACK_IMPORTED_MODULE_5__[\"default\"].create({\n                        name: user.name,\n                        email: user.email,\n                        image: user.image,\n                        provider: account.provider,\n                        providerId: account.providerAccountId,\n                        emailVerified: new Date()\n                    });\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\"\n    },\n    session: {\n        strategy: \"jwt\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUs7d0JBQ2pCYyxPQUFPVCxLQUFLUyxLQUFLO3dCQUNqQmUsVUFBVUYsUUFBUUUsUUFBUTt3QkFDMUJJLFlBQVlOLFFBQVFPLGlCQUFpQjt3QkFDckNHLGVBQWUsSUFBSUM7b0JBQ3JCO2dCQUNGO1lBQ0Y7WUFFQSxPQUFPO1FBQ1Q7UUFDQSxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRW5DLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSbUMsTUFBTXpCLElBQUksR0FBR1YsS0FBS1UsSUFBSTtZQUN4QjtZQUNBLE9BQU95QjtRQUNUO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRTtZQUM5QixJQUFJQyxRQUFRcEMsSUFBSSxFQUFFO2dCQUNoQm9DLFFBQVFwQyxJQUFJLENBQUNNLEVBQUUsR0FBRzZCLE1BQU1FLEdBQUc7Z0JBQzNCRCxRQUFRcEMsSUFBSSxDQUFDVSxJQUFJLEdBQUd5QixNQUFNekIsSUFBSTtZQUNoQztZQUNBLE9BQU8wQjtRQUNUO0lBQ0Y7SUFDQUUsT0FBTztRQUNMakIsUUFBUTtJQUNWO0lBQ0FlLFNBQVM7UUFDUEcsVUFBVTtJQUNaO0FBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYXZlbC10by1jaGluYS8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCBGYWNlYm9va1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZmFjZWJvb2snXG5pbXBvcnQgVHdpdHRlclByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvdHdpdHRlcidcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gJy4vbW9uZ29kYidcbmltcG9ydCBVc2VyIGZyb20gJ0AvbW9kZWxzL1VzZXInXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZGJDb25uZWN0KClcblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pXG5cbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxuXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXNlci5pc0FjdGl2ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQWNjb3VudCBpcyBkaXNhYmxlZCcpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICBGYWNlYm9va1Byb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5GQUNFQk9PS19DTElFTlRfU0VDUkVUISxcbiAgICB9KSxcbiAgICBUd2l0dGVyUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LlRXSVRURVJfQ0xJRU5UX0lEISxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuVFdJVFRFUl9DTElFTlRfU0VDUkVUISxcbiAgICAgIHZlcnNpb246IFwiMi4wXCIsXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQsIHByb2ZpbGUgfSkge1xuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSAnY3JlZGVudGlhbHMnKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBzb2NpYWwgbG9naW5cbiAgICAgIGlmIChhY2NvdW50Py5wcm92aWRlciAmJiBbJ2ZhY2Vib29rJywgJ3R3aXR0ZXInXS5pbmNsdWRlcyhhY2NvdW50LnByb3ZpZGVyKSkge1xuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKVxuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgJG9yOiBbXG4gICAgICAgICAgICB7IGVtYWlsOiB1c2VyLmVtYWlsIH0sXG4gICAgICAgICAgICB7IHByb3ZpZGVyOiBhY2NvdW50LnByb3ZpZGVyLCBwcm92aWRlcklkOiBhY2NvdW50LnByb3ZpZGVyQWNjb3VudElkIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGV4aXN0aW5nVXNlcikge1xuICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyB1c2VyXG4gICAgICAgICAgZXhpc3RpbmdVc2VyLm5hbWUgPSB1c2VyLm5hbWUgfHwgZXhpc3RpbmdVc2VyLm5hbWVcbiAgICAgICAgICBleGlzdGluZ1VzZXIuaW1hZ2UgPSB1c2VyLmltYWdlIHx8IGV4aXN0aW5nVXNlci5pbWFnZVxuICAgICAgICAgIGV4aXN0aW5nVXNlci5wcm92aWRlciA9IGFjY291bnQucHJvdmlkZXJcbiAgICAgICAgICBleGlzdGluZ1VzZXIucHJvdmlkZXJJZCA9IGFjY291bnQucHJvdmlkZXJBY2NvdW50SWRcbiAgICAgICAgICBhd2FpdCBleGlzdGluZ1VzZXIuc2F2ZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIG5ldyB1c2VyXG4gICAgICAgICAgYXdhaXQgVXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgICAgIHByb3ZpZGVyOiBhY2NvdW50LnByb3ZpZGVyLFxuICAgICAgICAgICAgcHJvdmlkZXJJZDogYWNjb3VudC5wcm92aWRlckFjY291bnRJZCxcbiAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuXG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5zdWIhXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvYXV0aC9zaWduaW4nLFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICB9LFxufVxuXG5kZWNsYXJlIG1vZHVsZSAnbmV4dC1hdXRoJyB7XG4gIGludGVyZmFjZSBVc2VyIHtcbiAgICByb2xlPzogc3RyaW5nXG4gIH1cbiAgXG4gIGludGVyZmFjZSBTZXNzaW9uIHtcbiAgICB1c2VyOiB7XG4gICAgICBpZDogc3RyaW5nXG4gICAgICBlbWFpbDogc3RyaW5nXG4gICAgICBuYW1lOiBzdHJpbmdcbiAgICAgIGltYWdlPzogc3RyaW5nXG4gICAgICByb2xlPzogc3RyaW5nXG4gICAgfVxuICB9XG59Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJGYWNlYm9va1Byb3ZpZGVyIiwiVHdpdHRlclByb3ZpZGVyIiwiYmNyeXB0IiwiZGJDb25uZWN0IiwiVXNlciIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kT25lIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlzQWN0aXZlIiwiRXJyb3IiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwiaW1hZ2UiLCJyb2xlIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiRkFDRUJPT0tfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiRkFDRUJPT0tfQ0xJRU5UX1NFQ1JFVCIsIlRXSVRURVJfQ0xJRU5UX0lEIiwiVFdJVFRFUl9DTElFTlRfU0VDUkVUIiwidmVyc2lvbiIsImNhbGxiYWNrcyIsInNpZ25JbiIsImFjY291bnQiLCJwcm9maWxlIiwicHJvdmlkZXIiLCJpbmNsdWRlcyIsImV4aXN0aW5nVXNlciIsIiRvciIsInByb3ZpZGVySWQiLCJwcm92aWRlckFjY291bnRJZCIsInNhdmUiLCJjcmVhdGUiLCJlbWFpbFZlcmlmaWVkIiwiRGF0ZSIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInN1YiIsInBhZ2VzIiwic3RyYXRlZ3kiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFFQSxJQUFJQyxTQUFTQyxPQUFPTixRQUFRO0FBRTVCLElBQUksQ0FBQ0ssUUFBUTtJQUNYQSxTQUFTQyxPQUFPTixRQUFRLEdBQUc7UUFBRU8sTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDekQ7QUFFQSxlQUFlQztJQUNiLElBQUlKLE9BQU9FLElBQUksRUFBRTtRQUNmLE9BQU9GLE9BQU9FLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBTixPQUFPRyxPQUFPLEdBQUdSLHVEQUFnQixDQUFDQyxhQUFhUyxNQUFNRyxJQUFJLENBQUMsQ0FBQ2I7WUFDekQsT0FBT0E7UUFDVDtJQUNGO0lBRUEsSUFBSTtRQUNGSyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9NLEdBQUc7UUFDVlQsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1NO0lBQ1I7SUFFQSxPQUFPVCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmF2ZWwtdG8tY2hpbmEvLi9saWIvbW9uZ29kYi50cz8wNWJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSFcblxuaWYgKCFNT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJylcbn1cblxubGV0IGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZVxuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2UgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XG4gIGlmIChjYWNoZWQuY29ubikge1xuICAgIHJldHVybiBjYWNoZWQuY29ublxuICB9XG5cbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgfVxuXG4gICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJLCBvcHRzKS50aGVuKChtb25nb29zZSkgPT4ge1xuICAgICAgcmV0dXJuIG1vbmdvb3NlXG4gICAgfSlcbiAgfVxuXG4gIHRyeSB7XG4gICAgY2FjaGVkLmNvbm4gPSBhd2FpdCBjYWNoZWQucHJvbWlzZVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsXG4gICAgdGhyb3cgZVxuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRiQ29ubmVjdCJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25uZWN0IiwidGhlbiIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true,\n        trim: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        required: function() {\n            return this.provider === \"credentials\";\n        }\n    },\n    image: {\n        type: String\n    },\n    provider: {\n        type: String,\n        enum: [\n            \"credentials\",\n            \"facebook\",\n            \"twitter\"\n        ],\n        default: \"credentials\"\n    },\n    providerId: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"user\",\n            \"admin\"\n        ],\n        default: \"user\"\n    },\n    isActive: {\n        type: Boolean,\n        default: true\n    },\n    emailVerified: {\n        type: Date\n    },\n    verificationToken: {\n        type: String\n    },\n    resetPasswordToken: {\n        type: String\n    },\n    resetPasswordExpires: {\n        type: Date\n    }\n}, {\n    timestamps: true\n});\n// Index for faster queries\nUserSchema.index({\n    email: 1\n});\nUserSchema.index({\n    provider: 1,\n    providerId: 1\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFtQnJELE1BQU1FLGFBQWEsSUFBSUQsNENBQU1BLENBQVE7SUFDbkNFLE1BQU07UUFDSkMsTUFBTUM7UUFDTkMsVUFBVTtRQUNWQyxNQUFNO0lBQ1I7SUFDQUMsT0FBTztRQUNMSixNQUFNQztRQUNOQyxVQUFVO1FBQ1ZHLFFBQVE7UUFDUkMsV0FBVztRQUNYSCxNQUFNO0lBQ1I7SUFDQUksVUFBVTtRQUNSUCxNQUFNQztRQUNOQyxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUNNLFFBQVEsS0FBSztRQUMzQjtJQUNGO0lBQ0FDLE9BQU87UUFDTFQsTUFBTUM7SUFDUjtJQUNBTyxVQUFVO1FBQ1JSLE1BQU1DO1FBQ05TLE1BQU07WUFBQztZQUFlO1lBQVk7U0FBVTtRQUM1Q0MsU0FBUztJQUNYO0lBQ0FDLFlBQVk7UUFDVlosTUFBTUM7SUFDUjtJQUNBWSxNQUFNO1FBQ0piLE1BQU1DO1FBQ05TLE1BQU07WUFBQztZQUFRO1NBQVE7UUFDdkJDLFNBQVM7SUFDWDtJQUNBRyxVQUFVO1FBQ1JkLE1BQU1lO1FBQ05KLFNBQVM7SUFDWDtJQUNBSyxlQUFlO1FBQ2JoQixNQUFNaUI7SUFDUjtJQUNBQyxtQkFBbUI7UUFDakJsQixNQUFNQztJQUNSO0lBQ0FrQixvQkFBb0I7UUFDbEJuQixNQUFNQztJQUNSO0lBQ0FtQixzQkFBc0I7UUFDcEJwQixNQUFNaUI7SUFDUjtBQUNGLEdBQUc7SUFDREksWUFBWTtBQUNkO0FBRUEsMkJBQTJCO0FBQzNCdkIsV0FBV3dCLEtBQUssQ0FBQztJQUFFbEIsT0FBTztBQUFFO0FBQzVCTixXQUFXd0IsS0FBSyxDQUFDO0lBQUVkLFVBQVU7SUFBR0ksWUFBWTtBQUFFO0FBRTlDLGlFQUFlaEIsd0RBQWUsQ0FBQzRCLElBQUksSUFBSTVCLHFEQUFjLENBQVEsUUFBUUUsV0FBV0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYXZlbC10by1jaGluYS8uL21vZGVscy9Vc2VyLnRzPzZkYzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IERvY3VtZW50LCBTY2hlbWEgfSBmcm9tICdtb25nb29zZSdcblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciBleHRlbmRzIERvY3VtZW50IHtcbiAgbmFtZTogc3RyaW5nXG4gIGVtYWlsOiBzdHJpbmdcbiAgcGFzc3dvcmQ/OiBzdHJpbmdcbiAgaW1hZ2U/OiBzdHJpbmdcbiAgcHJvdmlkZXI/OiAnY3JlZGVudGlhbHMnIHwgJ2ZhY2Vib29rJyB8ICd0d2l0dGVyJ1xuICBwcm92aWRlcklkPzogc3RyaW5nXG4gIHJvbGU6ICd1c2VyJyB8ICdhZG1pbidcbiAgaXNBY3RpdmU6IGJvb2xlYW5cbiAgZW1haWxWZXJpZmllZD86IERhdGVcbiAgdmVyaWZpY2F0aW9uVG9rZW4/OiBzdHJpbmdcbiAgcmVzZXRQYXNzd29yZFRva2VuPzogc3RyaW5nXG4gIHJlc2V0UGFzc3dvcmRFeHBpcmVzPzogRGF0ZVxuICBjcmVhdGVkQXQ6IERhdGVcbiAgdXBkYXRlZEF0OiBEYXRlXG59XG5cbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hPElVc2VyPih7XG4gIG5hbWU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHJpbTogdHJ1ZSxcbiAgfSxcbiAgZW1haWw6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdW5pcXVlOiB0cnVlLFxuICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICB0cmltOiB0cnVlLFxuICB9LFxuICBwYXNzd29yZDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm92aWRlciA9PT0gJ2NyZWRlbnRpYWxzJ1xuICAgIH0sXG4gIH0sXG4gIGltYWdlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICB9LFxuICBwcm92aWRlcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBlbnVtOiBbJ2NyZWRlbnRpYWxzJywgJ2ZhY2Vib29rJywgJ3R3aXR0ZXInXSxcbiAgICBkZWZhdWx0OiAnY3JlZGVudGlhbHMnLFxuICB9LFxuICBwcm92aWRlcklkOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICB9LFxuICByb2xlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGVudW06IFsndXNlcicsICdhZG1pbiddLFxuICAgIGRlZmF1bHQ6ICd1c2VyJyxcbiAgfSxcbiAgaXNBY3RpdmU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gIH0sXG4gIGVtYWlsVmVyaWZpZWQ6IHtcbiAgICB0eXBlOiBEYXRlLFxuICB9LFxuICB2ZXJpZmljYXRpb25Ub2tlbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgfSxcbiAgcmVzZXRQYXNzd29yZFRva2VuOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICB9LFxuICByZXNldFBhc3N3b3JkRXhwaXJlczoge1xuICAgIHR5cGU6IERhdGUsXG4gIH0sXG59LCB7XG4gIHRpbWVzdGFtcHM6IHRydWUsXG59KVxuXG4vLyBJbmRleCBmb3IgZmFzdGVyIHF1ZXJpZXNcblVzZXJTY2hlbWEuaW5kZXgoeyBlbWFpbDogMSB9KVxuVXNlclNjaGVtYS5pbmRleCh7IHByb3ZpZGVyOiAxLCBwcm92aWRlcklkOiAxIH0pXG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsPElVc2VyPignVXNlcicsIFVzZXJTY2hlbWEpIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiVXNlclNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ0cmltIiwiZW1haWwiLCJ1bmlxdWUiLCJsb3dlcmNhc2UiLCJwYXNzd29yZCIsInByb3ZpZGVyIiwiaW1hZ2UiLCJlbnVtIiwiZGVmYXVsdCIsInByb3ZpZGVySWQiLCJyb2xlIiwiaXNBY3RpdmUiLCJCb29sZWFuIiwiZW1haWxWZXJpZmllZCIsIkRhdGUiLCJ2ZXJpZmljYXRpb25Ub2tlbiIsInJlc2V0UGFzc3dvcmRUb2tlbiIsInJlc2V0UGFzc3dvcmRFeHBpcmVzIiwidGltZXN0YW1wcyIsImluZGV4IiwibW9kZWxzIiwiVXNlciIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluxiang%2FCursor%2FAI-project%2Ftravel-to-china&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();