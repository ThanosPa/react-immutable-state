import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

let id = initialWorkouts.length

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [checkedDoneWorkouts, setCheckedDoneWorkouts] =useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    const newWorkOuts = [...workouts, newWorkout]
    setWorkouts(newWorkOuts)
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (deletedWorkout) => {

    const remainingWorkouts = workouts.filter(workout=>workout!==deletedWorkout)
    setWorkouts(remainingWorkouts)
    console.log("deleteWorkout:", deletedWorkout)
  }

  const completeWorkout = (completedWorkout) => {

    const updatedWorkouts = workouts.map(workout=>{
      if(workout===completedWorkout)
        workout.done = true
      return workout
    })
    setWorkouts(updatedWorkouts)

    console.log("completeWorkout:", completedWorkout)
  }

  const handleChange = (event) => {

    const { checked } = event.target
    setCheckedDoneWorkouts(checked)

  }
  const randomWorkout = (workoutToUpdate) => {
    const newWorkout = generateWorkout()
    const updatedWorkouts = workouts.map(workout=>{
      if(workout===workoutToUpdate)
        workout = newWorkout
      return workout
    })
    setWorkouts(updatedWorkouts)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>Show Done Only</label>
      <input
          type="checkbox"
          onChange={handleChange}
        />
      <ul>
        
        {
          checkedDoneWorkouts ?
          workouts.map((workout, index) => (
            workout.done?(
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>randomWorkout(workout)}>Random</button>

          </li>):<></>
        )): workouts.map((workout, index) => (
          
        <li key={index}>
          <p>
            {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
          </p>
          {!workout.done && 
            <button onClick={e=>completeWorkout(workout)}>Done</button>}
          {workout.done && 
           <p>✅</p>}
          <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          <button onClick={e=>randomWorkout(workout)}>Random</button>

        </li>
        ))
        }
      </ul>
      
    </div>
  )
}

export default App
