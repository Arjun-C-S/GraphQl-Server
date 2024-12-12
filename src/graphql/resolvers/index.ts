import { MovieModel } from '@/models/user.models.js';
import type { Movie } from '@/types/movie.types.js';
import { responseMessage } from '@/utils/responseMessage.js';

export const resolvers = {
    Query: {
        movies: async () => {
            return await MovieModel.find();
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

            return responseMessage.MOVIE.CREATED;
        },

        updateMovie: async (_: any, args: { movieId: Number; movie: Movie }) => {
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

        deleteMovie: async (_: any, args: { movieId: Number }) => {
            const deletedMovie = await MovieModel.findOneAndDelete({ movieId: args.movieId });

            if (!deletedMovie) return responseMessage.MOVIE.NOT_FOUND;

            return responseMessage.MOVIE.DELETED;
        },
    },
};
