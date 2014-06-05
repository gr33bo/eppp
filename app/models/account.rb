class Account < ActiveRecord::Base


  attr_accessible :username, :password, :password_salt
  attr_accessor :new_password



  def hash_new_password
    self.password_salt = SecureRandom.base64(9)
    self.password = Digest::SHA2.hexdigest(self.password_salt + @new_password)
  end
end
