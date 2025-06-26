import { gql } from '@apollo/client/core'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
        user {
          id
        }
      }
    }
  }
`

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
      }
    }
  }
`;