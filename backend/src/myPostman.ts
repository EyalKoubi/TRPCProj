import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "./api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
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
