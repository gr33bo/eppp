class AdminUpdateController < ApplicationController

  def index
    rows = []
   
   # sorter = ActiveSupport::JSON.decode(params["sort"])[0]

    @updates = Update.find(:all, :order => "created_at desc")

    @updates.each{|update|
      rows << {
          :id => update.id,
          :update_explanation => update.update_explanation,
          :created_at => update.created_at
        }
    }

    result = { 'success' => true, 'rows' => rows, 'total' => rows.size  }

    render(:json => result)

  end

  def create
    begin
      data = ActiveSupport::JSON.decode(request.body.read)
      data.delete('id')
data.delete('created_at')

      object = Update.create(data)

      render :json => { :success => true, :message => "Update created", :rows => [{
              :id => object.id,
:created_at => object.created_at
      }], :total => 1 }
    rescue
      render :json => { :success => false, :message => "#{$!.message}" }
    end
  end

  def update
    #update
    begin
      object = Update.find(params[:id])
      data = ActiveSupport::JSON.decode(request.body.read)

      data.delete('id')
data.delete('created_at')

      object.update_attributes(data);
      object.save

      render :json => { :success => true, :message => "Update updated"}
    rescue
      render :json => { :success => false, :message => "#{$!.message}" }
    end

  end

  def destroy
    begin
       object = Update.find(params[:id])
       object.destroy
       render :json => { :success => true, :message => "Update deleted" }
     rescue
       render :json => { :success => false, :message => "#{$!.message}" }
     end

  end

end
