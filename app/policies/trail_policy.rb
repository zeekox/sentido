class TrailPolicy
  attr_reader :user, :record

  def initialize(user, record)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @record = record
  end

  def show?
    edit?
  end

  def edit?
    user.jedi?
  end
end

