class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def spotify
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    # Store the spotify auth info in the session in order to instantiate a Rspotify User in the future if needed
    session[:spotify_auth] = request.env['omniauth.auth']
    @user.update(
      token: request.env['omniauth.auth'].credentials.token,
      refresh_token: request.env['omniauth.auth'].credentials.refresh_token,
      expires_on: (Time.now + 3600).to_datetime
    )
    if @user.persisted?
      UpdateUserAccountType.call(@user)
      sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, kind: "Spotify") if is_navigational_format?
    else
      session["devise.spotify_data"] = request.env["omniauth.auth"]
      redirect_to root_url
      flash[:notice] = "Sorry you need to have a Spotify account to continue"
    end
  end
  def failure
    redirect_to root_path
  end
end
