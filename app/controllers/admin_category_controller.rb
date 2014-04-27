class AdminCategoryController < ApplicationController

  def index
   rows = []

    @categories = Category.find(:all)

    @categories.each{|category|
      rows << {
          :id => category.id,
          :name => category.name
        }
    }

    result = { 'success' => true, 'rows' => rows, 'total' => rows.size  }

    render(:json => result)

  end
end
