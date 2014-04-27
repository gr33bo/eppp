class AdminAnswerController < ApplicationController

  def index
   rows = []

    @answers = Answer.find(:all, :conditions => ["question_id = ?", params[:question_id]])

    @answers.each{|answer|
      rows << {
          :id => answer.id,
          :answer_text => answer.answer_text,
          :is_correct_answer => answer.is_correct_answer,
          :answer_identifier => answer.answer_identifier
        }
    }

    result = { 'success' => true, 'rows' => rows, 'total' => rows.size  }

    render(:json => result)

  end

  def create
    begin
      data = ActiveSupport::JSON.decode(request.body.read)
      data.delete('id')

      object = Answer.create(data)

      render :json => { :success => true, :message => "Answer created", :rows => [{
              :id => object.id
      }], :total => 1 }
    rescue
      render :json => { :success => false, :message => "#{$!.message}" }
    end
  end

  def update
    #update
    begin
      object = Answer.find(params[:id])
      data = ActiveSupport::JSON.decode(request.body.read)

      data.delete('id')

      object.update_attributes(data);
      object.save

      render :json => { :success => true, :message => "Answer updated"}
    rescue
      render :json => { :success => false, :message => "#{$!.message}" }
    end

  end

  def destroy
    begin
       object = Answer.find(params[:id])
       object.destroy
       render :json => { :success => true, :message => "Answer deleted" }
     rescue
       render :json => { :success => false, :message => "#{$!.message}" }
     end

  end

end
