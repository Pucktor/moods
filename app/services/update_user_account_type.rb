class UpdateUserAccountType
  def self.call(user)
    url = 'https://api.spotify.com/v1/me'
    headers = {
      content_type: 'application/x-www-form-urlencoded',
      Authorization: "Bearer #{user.token}"
    }
    response = JSON.parse(RestClient.get(url, headers))
    if response['product'] == 'premium'
      user.update(account_type: response["product"])
    end
    user
  end
end
