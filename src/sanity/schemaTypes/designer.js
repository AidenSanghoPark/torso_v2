export default {
  name: "designer",
  title: "Designer",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^[0-9]{10,11}$/, {
          message: "Please enter a valid phone number (10-11 digits)",
        }),
    },
  ],
};
