require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, "99b2d888ddd94505a2e4d3e02c68fe47", "131ff6e9a9644e0595d01a0492c41eab", scope: 'user-read-email playlist-modify-public user-library-read user-library-modify'
end
