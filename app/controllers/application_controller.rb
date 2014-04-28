class ApplicationController < ActionController::Base
  #protect_from_forgery

  def register
    uuid = params[:uuid]
    platform = params[:platform]

    if uuid == "anonymous"
      done = false
      while !done
        uuid = (0...40).map{(i = Kernel.rand(62); i += ((i < 10) ? 48 : ((i < 36) ? 55 : 61 ))).chr}.join
        existing = Device.find(:first, :conditions => ["uuid = ?", uuid])
        done = true if !existing
      end
    end

    device = Device.find(:first, :conditions => ["uuid = ?", uuid])
    if !device
      device = Device.create!(:uuid => uuid, :platform => platform)
    end

    session[:device_id] = device.id

    result = { 'success' => true, 'uuid' => uuid }
    render(:json => result)
  end

  def questions
    questions = []
    rows = []
    if params[:exam_id]

    elsif params[:ignore_seen]

    elsif params[:previously_got_wrong]

    else
      questions = Question.find(:all, :order => "rand()", :limit => 50)
    end

    questions.each_with_index{|question, index|
      category = nil
      
      if question.category
        category = question.category.name
      end

      answers = question.answers
      answer_rows = []
      answers.each{|a|
        answer_rows << {
          :id => a.id,
          :identifier => a.answer_identifier,
          :text => a.answer_text,
          :is_correct_answer => a.is_correct_answer ? true : false
        }
      }

      rows << {
        :id => question.id,
        :number => question.question_number,
        :text => question.question_text,
        :answer_explanation => question.answer_explanation,
        :category => category,
        :answers => answer_rows,
        :order_by => index
      }
      
    }

    
    result = { 'success' => true, 'rows' => rows }
    render(:json => result)
  end
end
