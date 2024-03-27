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

export type AuthenticationExtensionsClientInputs = {
  __typename?: 'AuthenticationExtensionsClientInputs';
  appid?: Maybe<Scalars['String']>;
  credProps?: Maybe<Scalars['Boolean']>;
  hmacCreateSecret?: Maybe<Scalars['Boolean']>;
};

export type AuthenticationExtensionsClientOutputs = {
  appid?: InputMaybe<Scalars['Boolean']>;
  credProps?: InputMaybe<CredentialPropertiesOutput>;
  hmacCreateSecret?: InputMaybe<Scalars['Boolean']>;
};

export type AuthenticatorAssertionResponseJson = {
  authenticatorData: Scalars['String'];
  clientDataJSON: Scalars['String'];
  signature: Scalars['String'];
  userHandle?: InputMaybe<Scalars['String']>;
};

export type AuthenticatorAttestationResponseJson = {
  attestationObject: Scalars['String'];
  authenticatorData?: InputMaybe<Scalars['String']>;
  clientDataJSON: Scalars['String'];
  publicKey?: InputMaybe<Scalars['String']>;
  publicKeyAlgorithm?: InputMaybe<Scalars['Int']>;
  transports?: InputMaybe<Array<Scalars['String']>>;
};

export type AuthenticatorSelectionCriteria = {
  __typename?: 'AuthenticatorSelectionCriteria';
  authenticatorAttachment?: Maybe<Scalars['String']>;
  requireResidentKey?: Maybe<Scalars['Boolean']>;
  residentKey?: Maybe<Scalars['String']>;
  userVerification?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CredentialAuthInput = {
  authenticatorAttachment?: InputMaybe<Scalars['String']>;
  clientExtensionResults: AuthenticationExtensionsClientOutputs;
  id: Scalars['String'];
  rawId: Scalars['String'];
  response: AuthenticatorAssertionResponseJson;
  type: Scalars['String'];
};

export type CredentialInput = {
  authenticatorAttachment?: InputMaybe<Scalars['String']>;
  clientExtensionResults: AuthenticationExtensionsClientOutputs;
  id: Scalars['String'];
  rawId: Scalars['String'];
  response: AuthenticatorAttestationResponseJson;
  type: Scalars['String'];
};

export type CredentialPropertiesOutput = {
  rk?: InputMaybe<Scalars['Boolean']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authWebAuthnCredential: Scalars['String'];
  authWebAuthnCredentialOptions: PublicKeyCredentialRequestOptionsJson;
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
  registerWebAuthnCredential: Scalars['Boolean'];
  registerWebAuthnCredentialOptions: PublicKeyCredentialCreationOptionsJson;
  updateAd: Ad;
  updateCategory: Category;
  updateProfile: User;
  updateTag: Tag;
};


export type MutationAuthWebAuthnCredentialArgs = {
  challenge: Scalars['String'];
  credential: CredentialAuthInput;
  username: Scalars['String'];
};


export type MutationAuthWebAuthnCredentialOptionsArgs = {
  username: Scalars['String'];
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


export type MutationRegisterWebAuthnCredentialArgs = {
  challenge: Scalars['String'];
  credential: CredentialInput;
  displayname: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterWebAuthnCredentialOptionsArgs = {
  displayname: Scalars['String'];
  username: Scalars['String'];
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

export type PublicKeyCredentialCreationOptionsJson = {
  __typename?: 'PublicKeyCredentialCreationOptionsJSON';
  attestation?: Maybe<Scalars['String']>;
  authenticatorSelection: AuthenticatorSelectionCriteria;
  challenge: Scalars['String'];
  excludeCredentials: Array<Maybe<PublicKeyCredentialDescriptorJson>>;
  extensions?: Maybe<AuthenticationExtensionsClientInputs>;
  pubKeyCredParams: Array<PublicKeyCredentialParameters>;
  rp: PublicKeyCredentialRpEntity;
  timeout?: Maybe<Scalars['Int']>;
  user: PublicKeyCredentialUserEntityJson;
};

export type PublicKeyCredentialDescriptorJson = {
  __typename?: 'PublicKeyCredentialDescriptorJSON';
  id: Scalars['String'];
  transports: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type PublicKeyCredentialParameters = {
  __typename?: 'PublicKeyCredentialParameters';
  alg: Scalars['Int'];
  type: Scalars['String'];
};

export type PublicKeyCredentialRequestOptionsJson = {
  __typename?: 'PublicKeyCredentialRequestOptionsJSON';
  allowCredentials: Array<PublicKeyCredentialDescriptorJson>;
  challenge: Scalars['String'];
  extensions?: Maybe<AuthenticationExtensionsClientInputs>;
  rpId?: Maybe<Scalars['String']>;
  timeout?: Maybe<Scalars['Int']>;
  userVerification?: Maybe<Scalars['String']>;
};

export type PublicKeyCredentialRpEntity = {
  __typename?: 'PublicKeyCredentialRpEntity';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type PublicKeyCredentialUserEntityJson = {
  __typename?: 'PublicKeyCredentialUserEntityJSON';
  displayName: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
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

export type AdDetailsQueryVariables = Exact<{
  adId: Scalars['Int'];
}>;


export type AdDetailsQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, price: number, location: string, picture: string, owner: { __typename?: 'User', id: number, nickname: string, avatar: string }, category: { __typename?: 'Category', id: number, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type AuthWebAuthnCredentialMutationVariables = Exact<{
  credential: CredentialAuthInput;
  challenge: Scalars['String'];
  username: Scalars['String'];
}>;


export type AuthWebAuthnCredentialMutation = { __typename?: 'Mutation', authWebAuthnCredential: string };

export type AuthWebAuthnCredentialOptionsMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type AuthWebAuthnCredentialOptionsMutation = { __typename?: 'Mutation', authWebAuthnCredentialOptions: { __typename?: 'PublicKeyCredentialRequestOptionsJSON', challenge: string, rpId?: string | null, timeout?: number | null, userVerification?: string | null, allowCredentials: Array<{ __typename?: 'PublicKeyCredentialDescriptorJSON', id: string, transports: Array<string>, type: string }>, extensions?: { __typename?: 'AuthenticationExtensionsClientInputs', appid?: string | null, hmacCreateSecret?: boolean | null, credProps?: boolean | null } | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: string };

export type CreateAdMutationVariables = Exact<{
  data: NewAdInput;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd: { __typename?: 'Ad', id: number } };

export type CreateCategoryMutationVariables = Exact<{
  data: NewCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', name: string, id: number } };

export type CreateTagMutationVariables = Exact<{
  data: NewTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', name: string } };

export type DeleteAdMutationVariables = Exact<{
  adId: Scalars['Float'];
}>;


export type DeleteAdMutation = { __typename?: 'Mutation', deleteAd: string };

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['Float'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type DeleteTagMutationVariables = Exact<{
  tagId: Scalars['Float'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: string };

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: number, name: string }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email: string, avatar: string, nickname: string, role: string, ads: Array<{ __typename?: 'Ad', id: number, title: string, picture: string, price: number }> } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RecentAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentAdsQuery = { __typename?: 'Query', ads: Array<{ __typename?: 'Ad', id: number, title: string, price: number, picture: string }> };

export type RegisterWebAuthnCredentialMutationVariables = Exact<{
  challenge: Scalars['String'];
  credential: CredentialInput;
  username: Scalars['String'];
  displayname: Scalars['String'];
}>;


export type RegisterWebAuthnCredentialMutation = { __typename?: 'Mutation', registerWebAuthnCredential: boolean };

export type RegisterWebAuthnCredentialOptionsMutationVariables = Exact<{
  displayname: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterWebAuthnCredentialOptionsMutation = { __typename?: 'Mutation', registerWebAuthnCredentialOptions: { __typename?: 'PublicKeyCredentialCreationOptionsJSON', challenge: string, timeout?: number | null, attestation?: string | null, rp: { __typename?: 'PublicKeyCredentialRpEntity', id?: string | null, name: string }, user: { __typename?: 'PublicKeyCredentialUserEntityJSON', displayName: string, id: string, name: string }, pubKeyCredParams: Array<{ __typename?: 'PublicKeyCredentialParameters', alg: number, type: string }>, excludeCredentials: Array<{ __typename?: 'PublicKeyCredentialDescriptorJSON', type: string, id: string, transports: Array<string> } | null>, authenticatorSelection: { __typename?: 'AuthenticatorSelectionCriteria', authenticatorAttachment?: string | null, requireResidentKey?: boolean | null, residentKey?: string | null, userVerification?: string | null }, extensions?: { __typename?: 'AuthenticationExtensionsClientInputs', appid?: string | null, credProps?: boolean | null, hmacCreateSecret?: boolean | null } | null } };

export type SearchAdsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['Int']>;
}>;


export type SearchAdsQuery = { __typename?: 'Query', ads: Array<{ __typename?: 'Ad', id: number, picture: string, title: string, price: number }> };

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, nickname: string, email: string, avatar: string } };

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
  adId: Scalars['Float'];
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: { __typename?: 'Ad', id: number } };

export type UpdateCategoryMutationVariables = Exact<{
  data: UpdateCategoryInput;
  categoryId: Scalars['Float'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string } };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: number, email: string, nickname: string, avatar: string } };

export type UpdateTagMutationVariables = Exact<{
  data: UpdateTagInput;
  tagId: Scalars['Float'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', name: string, id: number } };


export const AdDetailsDocument = gql`
    query AdDetails($adId: Int!) {
  getAdById(adId: $adId) {
    id
    title
    description
    owner {
      id
      nickname
      avatar
    }
    price
    location
    picture
    category {
      id
      name
    }
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
export const AuthWebAuthnCredentialDocument = gql`
    mutation AuthWebAuthnCredential($credential: CredentialAuthInput!, $challenge: String!, $username: String!) {
  authWebAuthnCredential(
    credential: $credential
    challenge: $challenge
    username: $username
  )
}
    `;
export type AuthWebAuthnCredentialMutationFn = Apollo.MutationFunction<AuthWebAuthnCredentialMutation, AuthWebAuthnCredentialMutationVariables>;

/**
 * __useAuthWebAuthnCredentialMutation__
 *
 * To run a mutation, you first call `useAuthWebAuthnCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthWebAuthnCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authWebAuthnCredentialMutation, { data, loading, error }] = useAuthWebAuthnCredentialMutation({
 *   variables: {
 *      credential: // value for 'credential'
 *      challenge: // value for 'challenge'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAuthWebAuthnCredentialMutation(baseOptions?: Apollo.MutationHookOptions<AuthWebAuthnCredentialMutation, AuthWebAuthnCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthWebAuthnCredentialMutation, AuthWebAuthnCredentialMutationVariables>(AuthWebAuthnCredentialDocument, options);
      }
export type AuthWebAuthnCredentialMutationHookResult = ReturnType<typeof useAuthWebAuthnCredentialMutation>;
export type AuthWebAuthnCredentialMutationResult = Apollo.MutationResult<AuthWebAuthnCredentialMutation>;
export type AuthWebAuthnCredentialMutationOptions = Apollo.BaseMutationOptions<AuthWebAuthnCredentialMutation, AuthWebAuthnCredentialMutationVariables>;
export const AuthWebAuthnCredentialOptionsDocument = gql`
    mutation AuthWebAuthnCredentialOptions($username: String!) {
  authWebAuthnCredentialOptions(username: $username) {
    challenge
    rpId
    timeout
    allowCredentials {
      id
      transports
      type
    }
    extensions {
      appid
      hmacCreateSecret
      credProps
    }
    userVerification
  }
}
    `;
export type AuthWebAuthnCredentialOptionsMutationFn = Apollo.MutationFunction<AuthWebAuthnCredentialOptionsMutation, AuthWebAuthnCredentialOptionsMutationVariables>;

/**
 * __useAuthWebAuthnCredentialOptionsMutation__
 *
 * To run a mutation, you first call `useAuthWebAuthnCredentialOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthWebAuthnCredentialOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authWebAuthnCredentialOptionsMutation, { data, loading, error }] = useAuthWebAuthnCredentialOptionsMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAuthWebAuthnCredentialOptionsMutation(baseOptions?: Apollo.MutationHookOptions<AuthWebAuthnCredentialOptionsMutation, AuthWebAuthnCredentialOptionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthWebAuthnCredentialOptionsMutation, AuthWebAuthnCredentialOptionsMutationVariables>(AuthWebAuthnCredentialOptionsDocument, options);
      }
export type AuthWebAuthnCredentialOptionsMutationHookResult = ReturnType<typeof useAuthWebAuthnCredentialOptionsMutation>;
export type AuthWebAuthnCredentialOptionsMutationResult = Apollo.MutationResult<AuthWebAuthnCredentialOptionsMutation>;
export type AuthWebAuthnCredentialOptionsMutationOptions = Apollo.BaseMutationOptions<AuthWebAuthnCredentialOptionsMutation, AuthWebAuthnCredentialOptionsMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
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
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: NewCategoryInput!) {
  createCategory(data: $data) {
    name
    id
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($data: NewTagInput!) {
  createTag(data: $data) {
    name
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteAdDocument = gql`
    mutation DeleteAd($adId: Float!) {
  deleteAd(adId: $adId)
}
    `;
export type DeleteAdMutationFn = Apollo.MutationFunction<DeleteAdMutation, DeleteAdMutationVariables>;

/**
 * __useDeleteAdMutation__
 *
 * To run a mutation, you first call `useDeleteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
 *   variables: {
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useDeleteAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdMutation, DeleteAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(DeleteAdDocument, options);
      }
export type DeleteAdMutationHookResult = ReturnType<typeof useDeleteAdMutation>;
export type DeleteAdMutationResult = Apollo.MutationResult<DeleteAdMutation>;
export type DeleteAdMutationOptions = Apollo.BaseMutationOptions<DeleteAdMutation, DeleteAdMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($categoryId: Float!) {
  deleteCategory(categoryId: $categoryId)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteTagDocument = gql`
    mutation DeleteTag($tagId: Float!) {
  deleteTag(tagId: $tagId)
}
    `;
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, options);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>;
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
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    email
    avatar
    nickname
    role
    ads {
      id
      title
      picture
      price
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const RegisterWebAuthnCredentialDocument = gql`
    mutation RegisterWebAuthnCredential($challenge: String!, $credential: CredentialInput!, $username: String!, $displayname: String!) {
  registerWebAuthnCredential(
    challenge: $challenge
    credential: $credential
    username: $username
    displayname: $displayname
  )
}
    `;
export type RegisterWebAuthnCredentialMutationFn = Apollo.MutationFunction<RegisterWebAuthnCredentialMutation, RegisterWebAuthnCredentialMutationVariables>;

/**
 * __useRegisterWebAuthnCredentialMutation__
 *
 * To run a mutation, you first call `useRegisterWebAuthnCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWebAuthnCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWebAuthnCredentialMutation, { data, loading, error }] = useRegisterWebAuthnCredentialMutation({
 *   variables: {
 *      challenge: // value for 'challenge'
 *      credential: // value for 'credential'
 *      username: // value for 'username'
 *      displayname: // value for 'displayname'
 *   },
 * });
 */
export function useRegisterWebAuthnCredentialMutation(baseOptions?: Apollo.MutationHookOptions<RegisterWebAuthnCredentialMutation, RegisterWebAuthnCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterWebAuthnCredentialMutation, RegisterWebAuthnCredentialMutationVariables>(RegisterWebAuthnCredentialDocument, options);
      }
export type RegisterWebAuthnCredentialMutationHookResult = ReturnType<typeof useRegisterWebAuthnCredentialMutation>;
export type RegisterWebAuthnCredentialMutationResult = Apollo.MutationResult<RegisterWebAuthnCredentialMutation>;
export type RegisterWebAuthnCredentialMutationOptions = Apollo.BaseMutationOptions<RegisterWebAuthnCredentialMutation, RegisterWebAuthnCredentialMutationVariables>;
export const RegisterWebAuthnCredentialOptionsDocument = gql`
    mutation RegisterWebAuthnCredentialOptions($displayname: String!, $username: String!) {
  registerWebAuthnCredentialOptions(
    displayname: $displayname
    username: $username
  ) {
    rp {
      id
      name
    }
    user {
      displayName
      id
      name
    }
    challenge
    pubKeyCredParams {
      alg
      type
    }
    timeout
    excludeCredentials {
      type
      id
      transports
    }
    authenticatorSelection {
      authenticatorAttachment
      requireResidentKey
      residentKey
      userVerification
    }
    attestation
    extensions {
      appid
      credProps
      hmacCreateSecret
    }
  }
}
    `;
export type RegisterWebAuthnCredentialOptionsMutationFn = Apollo.MutationFunction<RegisterWebAuthnCredentialOptionsMutation, RegisterWebAuthnCredentialOptionsMutationVariables>;

/**
 * __useRegisterWebAuthnCredentialOptionsMutation__
 *
 * To run a mutation, you first call `useRegisterWebAuthnCredentialOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWebAuthnCredentialOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWebAuthnCredentialOptionsMutation, { data, loading, error }] = useRegisterWebAuthnCredentialOptionsMutation({
 *   variables: {
 *      displayname: // value for 'displayname'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterWebAuthnCredentialOptionsMutation(baseOptions?: Apollo.MutationHookOptions<RegisterWebAuthnCredentialOptionsMutation, RegisterWebAuthnCredentialOptionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterWebAuthnCredentialOptionsMutation, RegisterWebAuthnCredentialOptionsMutationVariables>(RegisterWebAuthnCredentialOptionsDocument, options);
      }
export type RegisterWebAuthnCredentialOptionsMutationHookResult = ReturnType<typeof useRegisterWebAuthnCredentialOptionsMutation>;
export type RegisterWebAuthnCredentialOptionsMutationResult = Apollo.MutationResult<RegisterWebAuthnCredentialOptionsMutation>;
export type RegisterWebAuthnCredentialOptionsMutationOptions = Apollo.BaseMutationOptions<RegisterWebAuthnCredentialOptionsMutation, RegisterWebAuthnCredentialOptionsMutationVariables>;
export const SearchAdsDocument = gql`
    query SearchAds($title: String, $categoryId: Int) {
  ads(title: $title, categoryId: $categoryId) {
    id
    picture
    title
    price
  }
}
    `;

/**
 * __useSearchAdsQuery__
 *
 * To run a query within a React component, call `useSearchAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAdsQuery({
 *   variables: {
 *      title: // value for 'title'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useSearchAdsQuery(baseOptions?: Apollo.QueryHookOptions<SearchAdsQuery, SearchAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAdsQuery, SearchAdsQueryVariables>(SearchAdsDocument, options);
      }
export function useSearchAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAdsQuery, SearchAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAdsQuery, SearchAdsQueryVariables>(SearchAdsDocument, options);
        }
export type SearchAdsQueryHookResult = ReturnType<typeof useSearchAdsQuery>;
export type SearchAdsLazyQueryHookResult = ReturnType<typeof useSearchAdsLazyQuery>;
export type SearchAdsQueryResult = Apollo.QueryResult<SearchAdsQuery, SearchAdsQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($data: NewUserInput!) {
  createUser(data: $data) {
    id
    nickname
    email
    avatar
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateAdDocument = gql`
    mutation UpdateAd($data: UpdateAdInput!, $adId: Float!) {
  updateAd(data: $data, adId: $adId) {
    id
  }
}
    `;
export type UpdateAdMutationFn = Apollo.MutationFunction<UpdateAdMutation, UpdateAdMutationVariables>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useUpdateAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdMutation, UpdateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UpdateAdDocument, options);
      }
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<UpdateAdMutation, UpdateAdMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($data: UpdateCategoryInput!, $categoryId: Float!) {
  updateCategory(data: $data, categoryId: $categoryId) {
    id
    name
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: UpdateUserInput!) {
  updateProfile(data: $data) {
    id
    email
    nickname
    avatar
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateTagDocument = gql`
    mutation UpdateTag($data: UpdateTagInput!, $tagId: Float!) {
  updateTag(data: $data, tagId: $tagId) {
    name
    id
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;