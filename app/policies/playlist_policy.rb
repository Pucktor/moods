class PlaylistPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user_id: user.id)
    end
  end

  def show?
    record.user == user
  end

  def create?
    true
  end

  def show?
    record.user == user
  end
end
