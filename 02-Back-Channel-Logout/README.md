# Express OpenID Connect Back-Channel Logout Example

This sample demonstrates Back-Channel Logout for an Express Node.js app with Auth0.

The sample demonstrates the following:

- Login to App A
- Login to App B
- Logout of App A
- Notice that you are automatically logged out of App B

### Screencast
![Screencast](./screencast.mp4)

## Running This Sample Locally

1. Install the dependencies with npm:

```bash
npm install
```

2. Rename `.env.example` to `.env` and replace or check the following values. 

- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `APP_A_CLIENT_ID` - your Auth0 application client id for App A
- `APP_A_SECRET` - A long, randomly-generated string to encrypt the session for App A
- `APP_A_PORT` - The port for App A
- `APP_B_CLIENT_ID` - your Auth0 application client id for App B
- `APP_B_SECRET` - A long, randomly-generated string to encrypt the session for App B
- `APP_B_PORT` - The port for App B

3. Run the sample app:

```bash
npm start
```

By default, App A will be served from `http://localhost:${APP_A_PORT}` and App B will be served from `http://localhost:@{APP_B_PORT}`.

4. You application needs to serve the `/backchannel-logout` webhook to the internet for your tenant to access it.
   Use something like Ngrok or LocalXpose to make `http://localhost:${APP_A_PORT}/backchannel-logout` and `http://localhost:@{APP_B_PORT}/backchannel-logout`
   available to your tenant. Then register the webhook URLs in your Tenant for each application at "Applications > Sessions > OpenID Connect Back-Channel Logout URL" 

5. Login to App A then Login to App B, then logout of App B and reload the page of App A. Notice that you are now logged out of App A as well.

## Support + Feedback

Please use the [Issues queue](https://github.com/auth0-samples/auth0-express-webapp-sample/issues) in this repo for questions and feedback.

## Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## What is Auth0?

Auth0 helps you to easily:

- implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)
- log in users with username/password databases, passwordless, or multi-factor authentication
- link multiple user accounts together
- generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely
- access demographics and analytics detailing how, when, and where users are logging in
- enrich user profiles from other data sources using customizable JavaScript rules

[Why Auth0?](https://auth0.com/why-auth0)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
