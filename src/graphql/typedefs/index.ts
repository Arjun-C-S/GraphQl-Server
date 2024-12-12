export const typeDefs = `#graphql
    type Movie {
        movieId: Int!
        title: String!
        director: String!
        releaseYear: Int!
        genre: String!
        rating: Float!
    }

    # Define an Input type for creating movie
    input movieInput {
        title: String!
        director: String!
        releaseYear: Int!
        genre: String!
        rating: Float!
    }

    # Define an Input type for editing movie
    input updateMovie {
        title: String
        director: String
        releaseYear: Int
        genre: String
        rating: Float
    }

    type Query {
        movies(limit: Int, offset: Int, genre: String, director: String): [Movie]
    }

    type Mutation {
        createMovie(movie: movieInput!): String
        updateMovie(movieId: Int!, movie: updateMovie!): String
        deleteMovie(movieId: Int!): String
    }
`;
