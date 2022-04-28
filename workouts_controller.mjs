import express from 'express';
import * as exercises from './workouts_model.mjs';

const app = express();

app.use(express.json());

const PORT = 3000;


/** 
 * Create exercise. All parameters are required.
 */
app.post("/exercises", (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request Failed'});
        });
});

/** 
 * Retrive all exercises
 */
app.get("/exercises", (req, res) => {
    const filter = [req.query];
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request Failed'});
        });

});

/**
 * Update exercise. Exercise must be updated by filtering for id
 */
app.put("/exercises/:_id", (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, 
        req.body.unit, req.body.date)
        .then(modifiedCount => {
            if (modifiedCount === 1){
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, 
                    weight: req.body.weight, unit: req.body.unit, date: req.body.date });

            } 
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request Failed'});
        });
});

/**
 * Delete exercise. Exercise to delete is requested by _id
 */
app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1){
                console.log("deleted")
                res.status(204).send();
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request Failed'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});