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
  owner: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  createTag: Tag;
  deleteAd: Scalars['String'];
  deleteTag: Scalars['String'];
  updateAd: Ad;
  updateTag: Tag;
};


export type MutationCreateAdArgs = {
  data: NewAdInput;
};


export type MutationCreateTagArgs = {
  data: NewTagInput;
};


export type MutationDeleteAdArgs = {
  adId: Scalars['Float'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['Float'];
};


export type MutationUpdateAdArgs = {
  adId: Scalars['Float'];
  data: UpdateAdInput;
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
  tagId: Scalars['Float'];
};

export type NewAdInput = {
  category: ObjectId;
  description: Scalars['String'];
  location: Scalars['String'];
  owner: Scalars['String'];
  picture: Scalars['String'];
  price: Scalars['Float'];
  tags?: InputMaybe<Array<ObjectId>>;
  title: Scalars['String'];
};

export type NewTagInput = {
  name: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  ads: Array<Ad>;
  getAdById: Ad;
  tags: Array<Tag>;
};


export type QueryAdsArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  tagsId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
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
  owner?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  tags?: InputMaybe<Array<ObjectId>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTagInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type AdDetailsQueryVariables = Exact<{
  adId: Scalars['Int'];
}>;


export type AdDetailsQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, picture: string, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type CreateAdMutationVariables = Exact<{
  data: NewAdInput;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd: { __typename?: 'Ad', id: number } };

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: number, name: string }> };

export type RecentAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentAdsQuery = { __typename?: 'Query', ads: Array<{ __typename?: 'Ad', id: number, title: string, price: number, picture: string }> };


export const AdDetailsDocument = gql`
    query AdDetails($adId: Int!) {
  getAdById(adId: $adId) {
    id
    title
    description
    owner
    price
    location
    picture
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useAdDetailsQuery__
 *
 * To run a query within a React component, call `useAdDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdDetailsQuery({
 *   variables: {
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useAdDetailsQuery(baseOptions: Apollo.QueryHookOptions<AdDetailsQuery, AdDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdDetailsQuery, AdDetailsQueryVariables>(AdDetailsDocument, options);
      }
export function useAdDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdDetailsQuery, AdDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdDetailsQuery, AdDetailsQueryVariables>(AdDetailsDocument, options);
        }
export type AdDetailsQueryHookResult = ReturnType<typeof useAdDetailsQuery>;
export type AdDetailsLazyQueryHookResult = ReturnType<typeof useAdDetailsLazyQuery>;
export type AdDetailsQueryResult = Apollo.QueryResult<AdDetailsQuery, AdDetailsQueryVariables>;
export const CreateAdDocument = gql`
    mutation CreateAd($data: NewAdInput!) {
  createAd(data: $data) {
    id
  }
}
    `;
export type CreateAdMutationFn = Apollo.MutationFunction<CreateAdMutation, CreateAdMutationVariables>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdMutation, CreateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(CreateAdDocument, options);
      }
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<CreateAdMutation, CreateAdMutationVariables>;
export const AllTagsDocument = gql`
    query AllTags {
  tags {
    id
    name
  }
}
    `;

/**
 * __useAllTagsQuery__
 *
 * To run a query within a React component, call `useAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
      }
export function useAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
        }
export type AllTagsQueryHookResult = ReturnType<typeof useAllTagsQuery>;
export type AllTagsLazyQueryHookResult = ReturnType<typeof useAllTagsLazyQuery>;
export type AllTagsQueryResult = Apollo.QueryResult<AllTagsQuery, AllTagsQueryVariables>;
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