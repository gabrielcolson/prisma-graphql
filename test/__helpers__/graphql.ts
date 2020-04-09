import { gql } from 'apollo-server-express';

export const CREATE_USER = gql`
    mutation createOneUser($username: String!, $email: String!) {
        createOneUser(username: $username, email: $email) {
            id
            username
            email
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_POST = gql`
    mutation createOnePost($title: String!, $content: String!, $authorId: ID!) {
        createOnePost(title: $title, content: $content, authorId: $authorId) {
            id
            title
            slug
            content
            author {
                username
                email
            }
            createdAt
            updatedAt
        }
    }
`;
