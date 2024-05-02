import {
  CategoriesDocument,
  AdDetailsDocument,
  ProfileDocument,
} from "@/graphql/generated/schema";

export const adminUserMock = {
  request: {
    query: ProfileDocument,
  },
  result: {
    data: {
      profile: {
        ads: [],
        id: 1,
        role: "admin",
        email: "admin@app.com",
        nickname: "admin",
        avatar: "https://img.com/i.png",
      },
    },
  },
};

export const visitorUserMock = {
  request: {
    query: ProfileDocument,
  },
  result: {
    data: {
      profile: {
        ads: [],
        id: 2,
        role: "visitor",
        email: "visitor@app.com",
        nickname: "visitor",
        avatar: "https://img.com/i.png",
      },
    },
  },
};

export const visitor2UserMock = {
  request: {
    query: ProfileDocument,
  },
  result: {
    data: {
      profile: {
        ads: [],
        id: 3,
        role: "visitor2",
        email: "visitor2@app.com",
        nickname: "visitor2",
        avatar: "https://img.com/i.png",
      },
    },
  },
};

export const categoriesMock = {
  request: {
    query: CategoriesDocument,
  },

  result: {
    data: {
      categories: [],
    },
  },
};

export const adDetailsMock = {
  request: {
    query: AdDetailsDocument,
    variables: { adId: 1 },
  },
  result: {
    data: {
      getAdById: {
        id: 1,
        title: "Clavier logitech",
        description:
          "Clavier Bluetooth® fin et minimaliste avec des touches personnalisables.",
        owner: {
          id: 2,
          email: "visitor@app.com",
          nickname: "visitor",
          avatar:
            "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
          role: "visitor",
        },
        price: 30,
        location: "Paris",
        picture:
          "https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/pebble-keys-2-k380s/gallery/pebble-keys-2-k380s-top-tonal-graphite-gallery-ch.png?v=1",
        createdAt: "1714649969953",
        category: {
          id: 1,
          name: "informatique",
        },
        tags: [
          {
            id: 1,
            name: "tag1",
          },
          {
            id: 2,
            name: "tag2",
          },
        ],
      },
    },
  },
};
