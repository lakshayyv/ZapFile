import { AUTH_OPTIONS } from "@/lib/auth";
import { initEdgeStore } from "@edgestore/server";
import {
  type CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { getServerSession } from "next-auth";

type Context = {
  userId: string | null;
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  const session = await getServerSession(AUTH_OPTIONS);
  return {
    userId: session?.user?.public_token || null,
  };
}

// Initialize Edge Store with context
const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    .path(({ ctx }) => [{ author: ctx.userId }])
    .beforeDelete(({ ctx, fileInfo }) => {
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
