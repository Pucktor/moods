class UpdateToken
  def self.call(user)
    # token valid 3600 seconds but check at 3000 to be safe
    if Time.now - user.expires_on.to_time >= 3000
      url = 'https://accounts.spotify.com/api/token'
      headers = {
        content_type: 'application/x-www-form-urlencoded'
      }
      payload = {
        grant_type: 'refresh_token',
        refresh_token: user.refresh_token,
        client_id: ENV['SPOTIFY_CLIENT_ID'],
        client_secret: ENV['SPOTIFY_CLIENT_SECRET'],
      }
      response = JSON.parse(RestClient.post(url, payload, headers))
      user.update(
        token: response["access_token"],
        expires_on: Time.now
      )
    end
  end
end
