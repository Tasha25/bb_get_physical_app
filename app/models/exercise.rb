class Exercise < ActiveRecord::Base
  attr_accessible :calories, :difficulty, :name
  has_and_belongs_to_many :workouts
end
