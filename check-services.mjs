import { getServices } from "@remotion/cloudrun";

const main = async () => {
  const services = await getServices({
    region: "us-east1",
    compatibleOnly: true,
  });

  console.log("🔍 Services found:", services);
};

main().catch((err) => console.error(err));
