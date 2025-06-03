import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  // auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      label: "Store name",
      admin: {
        description: "This is the name of the store",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      index: true,
      unique: true,
      admin: {
        description: "this is subdomain for the store",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
        name: "stripeAccountId",
        type:"text",
        required: true,
        admin: {
            readOnly: true,

        }
    },{
        name: "stripeDetailsSubmitted",
        type:"checkbox",
        admin: {
            readOnly: true,
            description:"You can not create products until you receive Stripe Detail "
        }
    }
  ],
};
