class UpdateUserAccountType
  def self.call(user)
    url = 'https://api.spotify.com/v1/me'
    headers = {
      content_type: 'application/x-www-form-urlencoded',
      Authorization: "Bearer BQClj_k07CTG7xIgcBmK_q5UaXlIO-VIWPnvkcote1L05lYOgoUkJNhPaFbKoFWuTvWrhKtKDw-2e4aTxC7w9FWp_P1dgH94vpDgfc9oVaNnzW4VEaL54GOdIaiVbbmv1oFFh6QpREmhLpAoJyyxodizMhqlWwGxIJZOFY-YRZzMiT58iouzMihe4iBPQLKBD_KsGW7B5-in0acv1C5FK4ucFRP8Hq_Q1aQVDpNfaPR_cOzI51ElbgZIyJrJRx_KYA"
    }
    response = JSON.parse(RestClient.get(url, headers))
    if response['product'] == 'premium'
      user.update(account_type: response["product"])
    end
    user
  end
end
