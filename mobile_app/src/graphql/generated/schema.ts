import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  location: Scalars['String'];
  owner: User;
  picture: Scalars['String'];
  price: Scalars['Float'];
  tags: Array<Tag>;
  title: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['String'];
  createAd: Ad;
  createCategory: Category;
  createTag: Tag;
  createUser: User;
  deleteAd: Scalars['String'];
  deleteCategory: Scalars['String'];
  deleteTag: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  updateAd: Ad;
  updateCategory: Category;
  updateProfile: User;
  updateTag: Tag;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateAdArgs = {
  data: NewAdInput;
};


export type MutationCreateCategoryArgs = {
  data: NewCategoryInput;
};


export type MutationCreateTagArgs = {
  data: NewTagInput;
};


export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationDeleteAdArgs = {
  adId: Scalars['Float'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Float'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['Float'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateAdArgs = {
  adId: Scalars['Float'];
  data: UpdateAdInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['Float'];
  data: UpdateCategoryInput;
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
  tagId: Scalars['Float'];
};

export type NewAdInput = {
  category: ObjectId;
  description: Scalars['String'];
  location: Scalars['String'];
  picture: Scalars['String'];
  price: Scalars['Float'];
  tags?: InputMaybe<Array<ObjectId>>;
  title: Scalars['String'];
};

export type NewCategoryInput = {
  name: Scalars['String'];
};

export type NewTagInput = {
  name: Scalars['String'];
};

export type NewUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  ads: Array<Ad>;
  categories: Array<Category>;
  getAdById: Ad;
  profile: User;
  tags: Array<Tag>;
};


export type QueryAdsArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  tagsId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetAdByIdArgs = {
  adId: Scalars['Int'];
};


export type QueryTagsArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UpdateAdInput = {
  category?: InputMaybe<ObjectId>;
  city?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  tags?: InputMaybe<Array<ObjectId>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateTagInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  ads: Array<Ad>;
  avatar: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  nickname: Scalars['String'];
  role: Scalars['String'];
};

export type RecentAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentAdsQuery = { __typename?: 'Query', ads: Array<{ __typename?: 'Ad', id: number, title: string, price: number, picture: string }> };


export const RecentAdsDocument = gql`
    query RecentAds {
  ads {
    id
    title
    price
    picture
  }
}
    `;

/**
 * __useRecentAdsQuery__
 *
 * To run a query within a React component, call `useRecentAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentAdsQuery(baseOptions?: Apollo.QueryHookOptions<RecentAdsQuery, RecentAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentAdsQuery, RecentAdsQueryVariables>(RecentAdsDocument, options);
      }
export function useRecentAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentAdsQuery, RecentAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentAdsQuery, RecentAdsQueryVariables>(RecentAdsDocument, options);
        }
export type RecentAdsQueryHookResult = ReturnType<typeof useRecentAdsQuery>;
export type RecentAdsLazyQueryHookResult = ReturnType<typeof useRecentAdsLazyQuery>;
export type RecentAdsQueryResult = Apollo.QueryResult<RecentAdsQuery, RecentAdsQueryVariables>;