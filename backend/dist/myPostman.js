"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
const client = (0, client_1.createTRPCProxyClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: "http://localhost:4000/trpc",
        }),
    ],
});
const fun = async () => {
    return await client.groups.groupHyrarchy.query({
        groupName: "srthrhr",
    });
};
const test = async () => {
    const result = await fun();
    console.log(`result: ${result}`);
};
test();
