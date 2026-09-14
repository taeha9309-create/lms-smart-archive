import { defineManifest } from "@crxjs/vite-plugin";


export default defineManifest({
  manifest_version: 3,
  name: "LMS Smart Archive",
  version: "0.1.0",
  permissions: ["storage"],
  host_permissions: ["https://ecampus.kangnam.ac.kr/*"],
  content_scripts: [
    {
      matches: ["https://ecampus.kangnam.ac.kr/course/view.php*"],
      js: ["src/content/lmsContent.ts"],
      run_at: "document_idle",
    },
  ],
  action: {
    default_popup: "index.html",
  },
});
