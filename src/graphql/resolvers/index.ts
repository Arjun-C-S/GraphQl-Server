import type { Request } from 'express';
import { GraphQLError } from 'graphql';

import { getSocket } from '@/middlewares/socket.js';
import { MovieModel } from '@/models/user.models.js';
import type { Movie } from '@/types/movie.types.js';
import { responseMessage } from '@/utils/responseMessage.js';

/**
 * GraphQL resolvers for movie management.
 *
 * The resolvers handle queries and mutations for managing movies, including:
 * - Query for fetching a list of movies with optional filters (genre, director) and pagination.
 * - Mutation for creating a new movie and emitting a real-time event for movie creation.
 * - Mutation for updating an existing movie by its ID.
 * - Mutation for deleting a movie, restricted to admin users only.
 *
 */

export const resolvers = {
    Query: {
        movies: async (_: any, args: { limit: number; offset: number; genre: string; director: string }) => {
            const query: { genre?: string; director?: string } = {};

            // Apply filters if genre or director is provided
            if (args.genre) query.genre = args.genre;
            if (args.director) query.director = args.director;

            return await MovieModel.find(query)
                .skip(args.offset || 0)
                .limit(args.limit || 10);
        },
    },

    Mutation: {
        createMovie: async (_: any, args: { movie: Movie }) => {
            const movie = new MovieModel({
                movieId: Math.floor(100000 + Math.random() * 900000),
                title: args.movie.title,
                director: args.movie.director,
                releaseYear: args.movie.releaseYear,
                genre: args.movie.genre,
                rating: args.movie.rating,
            });

            await movie.save();

            const io = getSocket();
            io.to('movie_creation').emit('movie_creation', JSON.stringify(movie));

            return responseMessage.MOVIE.CREATED;
        },

        updateMovie: async (_: any, args: { movieId: number; movie: Movie }) => {
            const updatedMovie = await MovieModel.findOneAndUpdate(
                { movieId: args.movieId },
                {
                    title: args.movie.title,
                    director: args.movie.director,
                    releaseYear: args.movie.releaseYear,
                    genre: args.movie.genre,
                    rating: args.movie.rating,
                },
                { new: true },
            );

            if (!updatedMovie) return responseMessage.MOVIE.NOT_FOUND;

            return responseMessage.MOVIE.UPDATED;
        },

        deleteMovie: async (_: any, args: { movieId: number }, { req }: { req: Request }) => {
            // Only admin can delete movies
            if (req.user !== 'admin@gmail.com') {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }

            const deletedMovie = await MovieModel.findOneAndDelete({ movieId: args.movieId });

            if (!deletedMovie) return responseMessage.MOVIE.NOT_FOUND;

            return responseMessage.MOVIE.DELETED;
        },
    },
};
