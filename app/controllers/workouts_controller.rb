class WorkoutsController < ApplicationController
  def create
    workout = Workout.new
    workout.exercise_ids = params[:exercise_ids]
    workout.save
    render json: workout
  end
end
