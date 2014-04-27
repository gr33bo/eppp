class AdminExamController < ApplicationController

  def index
   rows = []

    @exams = Exam.find(:all)

    @exams.each{|exam|
      rows << {
          :id => exam.id,
          :name => exam.name
        }
    }

    result = { 'success' => true, 'rows' => rows, 'total' => rows.size  }

    render(:json => result)

  end
end
