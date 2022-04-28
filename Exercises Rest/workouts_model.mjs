import mongoose from 'mongoose'

mongoose.connect(
    'mongodb://localhost:27017/users_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filters
 * @param {String} projection
 * @param {Number} limit
 * @returns A promise. Resolves to the documents returned by filters.
 */
 const findExercises = async (filters, projection, limit) => {
    const query = Exercise.find()
        .select(projection)
        .limit(limit);
    if(filters.length > 0){
      query.and(filters);
    }
    return query.exec();
}

/**
 * Replace the name, reps, weight, unit, date properties of the workout with the id value provided
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
 const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({ _id: _id },
        { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount;
}

/**
 * Delete the exercise(s) with provided id, name, reps, weight, unit, or date value
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the count of deleted documents
 */
 const deleteExercise = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    // Return the count of deleted document.
    return result.deletedCount;
}

export {createExercise, findExercises, replaceExercise, deleteExercise};