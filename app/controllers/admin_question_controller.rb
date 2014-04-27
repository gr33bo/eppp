class AdminQuestionController < ApplicationController

  def index
    rows = []
   
    sorter = ActiveSupport::JSON.decode(params["sort"])[0]

    @questions = Question.find(:all, :conditions =>["exam_id = ?", params[:exam_id]], :order => "#{sorter['property']} #{sorter['direction']}")

    @questions.each{|question|
      rows << {
          :id => question.id,
          :question_number => question.question_number,
          :question_text => question.question_text,
          :category_id => question.category_id,
          :answer_explanation => question.answer_explanation
        }
    }

    result = { 'success' => true, 'rows' => rows, 'total' => rows.size  }

    render(:json => result)

  end

  def create
    begin
      data = ActiveSupport::JSON.decode(request.body.read)
      data.delete('id')

      object = Question.create(data)

      render :json => { :success => true, :message => "Question created", :rows => [{
              :id => object.id
      }], :total => 1 }
    rescue
      render :json => { :success => false, :message => "#{$!.message}" }
    end
  end

  def update
    #update
    begin
      object = Question.find(params[:id])
      data = ActiveSupport::JSON.decode(request.body.read)

      data.delete('id')

      object.update_attributes(data);
      object.save

      render :json => { :success => true, :message => "Question updated"}
    rescue
      render :json => { :success => false, :message => "#{$!.message}" }
    end

  end

  def destroy
    begin
       object = Question.find(params[:id])
       object.destroy
       render :json => { :success => true, :message => "Question deleted" }
     rescue
       render :json => { :success => false, :message => "#{$!.message}" }
     end

  end

end
