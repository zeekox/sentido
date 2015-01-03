require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "the truth" do
     assert !User.new.jedi?
  end
end
