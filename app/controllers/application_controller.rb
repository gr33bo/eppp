class ApplicationController < ActionController::Base
  #protect_from_forgery

  def index

    redirect_to "/testapp/build/production/TestApp/"
  end
  #def self.authenticate(user, password)
  #  if user.password == Digest::SHA2.hexdigest(user.password_salt + password)
  #    return user
  #  end
  #  return nil
  #end
  def register
    begin
      username = params[:username]
      password=  params[:password]

      existing = Account.find(:first, :conditions => ["username = ?", username])

      raise "Username already taken" if existing
      
      account = Account.new
      account.username = username.strip.downcase
      account.new_password = password.strip
      account.hash_new_password
      account.save

      
      result = { 'success' => true, 'account_id' => account.id, 'username' => account.username }
  
      render(:json => result)
    rescue

      result = { 'success' => false, 'message' => $!.message }
  
      render(:json => result)
    end
  end

  def sign_in
    begin
      username = params[:username]
      password=  params[:password]

      account = Account.find(:first, :conditions => ["username = ?", username])

      raise "Account not found" if !account
      
      if account.password != Digest::SHA2.hexdigest(account.password_salt + password)
        raise "Password is incorrect"
      end

      
      result = { 'success' => true, 'account_id' => account.id, 'username' => account.username }
  
      render(:json => result)
    rescue

      result = { 'success' => false, 'message' => $!.message }
  
      render(:json => result)
    end
  end

  def questions
    questions = []
    rows = []
    if params[:exam_id]

    elsif params[:ignore_seen]

    elsif params[:previously_got_wrong]

    else
      questions = Question.find(:all, :conditions => "problem_reported is not true", :order => "rand()", :limit => 20)
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

  def report_question
    question = Question.find(params[:question_id])

    question.problem_reported=true
    
    report = Report.create!({:question_id => params[:question_id], :reason => params[:reason]})

    question.save

    result = { 'success' => true }
    render(:json => result)
  end
end
