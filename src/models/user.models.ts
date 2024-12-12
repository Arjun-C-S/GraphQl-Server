import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
    {
        movieId: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [1, 'Title must be at least 1 character long'],
            maxlength: [100, 'Title must be less than 100 characters'],
        },
        director: {
            type: String,
            required: [true, 'Director is required'],
            trim: true,
            minlength: [1, 'Director must be at least 1 character long'],
            maxlength: [50, 'Director must be less than 50 characters'],
        },
        releaseYear: {
            type: Number,
            required: [true, 'Release year is required'],
            min: [1900, 'Release year must be after 1900'],
            max: [new Date().getFullYear(), 'Release year cannot be in the future'],
        },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
            trim: true,
            maxlength: [30, 'Genre must be less than 30 characters'],
        },
        rating: {
            type: Number,
            min: [0, 'Rating must be between 0 and 10'],
            max: [10, 'Rating must be between 0 and 10'],
        },
    },
    {
        timestamps: true,
    },
);

const MovieModel = model('movie', movieSchema);

export { MovieModel };
