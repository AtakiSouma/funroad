import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
