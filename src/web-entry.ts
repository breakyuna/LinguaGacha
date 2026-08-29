import path from "node:path";

import { BackendRuntimeClient } from "./backend/runtime/backend-runtime-client";
import * as AppErrors from "./shared/error";

/**
 * Web 端启动入口
 */
export async function run_web_entry(): Promise<void> {
  const app_root = process.cwd();

  const workerEntryUrl = new URL(
    "file://" + path.join(app_root, "build", "dist-server", "backend", "bootstrap", "backend-runtime-worker-entry.js")
  );

  const backend_runtime = new BackendRuntimeClient({
    workerEntryUrl,
    appRoot: app_root,
    resolveProxy: async (_url: string) => { return "DIRECT"; },
    openOutputFolder: async (output_path: string) => {
       console.log("Web mode: output folder opened", output_path);
    },
    runAgentWorkspace: async (_request: any, _signal: any) => {
        throw new AppErrors.AppError("runtime.internal_invariant", {
            diagnostic_context: { reason: "agent_workspace_unsupported_in_web_mode" },
        });
    },
    onUnexpectedExit: (error: Error) => {
      console.error("Backend unexpected exit:", error);
      process.exit(1);
    },
  });

  try {
    const backend_start_result = await backend_runtime.start();
    console.log(`Web Server started at: ${backend_start_result.apiBaseUrl}`);
    console.log(`You can access the UI at: ${backend_start_result.apiBaseUrl.replace('/api', '/')}`);

    process.on("SIGINT", async () => {
      console.log("Shutting down...");
      await backend_runtime.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start web entry:", error);
    process.exit(1);
  }
}
