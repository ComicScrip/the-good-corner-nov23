import { execute } from "../jest.setup";
import Tag from "../src/entities/Tag";
import addTag from "./operations/addTag";
import getTags from "./operations/getTags";
import getAdminContext from "./helpers/getAdminContext";

describe("TagsResolver", () => {
  it("should read tags", async () => {
    await Tag.create({ name: "tag1" }).save();
    await Tag.create({ name: "tag2" }).save();
    const res = await execute(getTags);
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "tags": [
      {
        "id": 2,
        "name": "tag2",
      },
      {
        "id": 1,
        "name": "tag1",
      },
    ],
  },
}
`);
  });

  it("should create a tag with admin jwt", async () => {
    const res = await execute(
      addTag,
      {
        data: {
          name: "tag4",
        },
      },
      await getAdminContext()
    );
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "createTag": {
      "id": 1,
      "name": "tag4",
    },
  },
}
`);
    const tagInDB = await Tag.findOneBy({ name: "tag4" });
    expect(tagInDB).toMatchInlineSnapshot(`
Tag {
  "ads": undefined,
  "id": 1,
  "name": "tag4",
}
`);
  });

  it("should not create a tag without admin jwt", async () => {
    const res = await execute(addTag, {
      data: {
        name: "tag4",
      },
    });
    expect(res).toMatchInlineSnapshot(`
{
  "data": null,
  "errors": [
    [GraphQLError: Access denied! You don't have permission for this action!],
  ],
}
`);
    const tagInDB = await Tag.findOneBy({ name: "tag4" });
    expect(tagInDB).toMatchInlineSnapshot(`null`);
  });
});
