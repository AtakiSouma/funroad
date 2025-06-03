import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.pinimg.com"],
  },
};

export default withPayload(withPayload(nextConfig));
