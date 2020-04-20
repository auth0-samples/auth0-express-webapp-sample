# Express OpenID Connect sample

See a detailed walk-through of this app on the [Express Quickstart](https://auth0.com/docs/quickstart/webapp/express).

## Set up a secure local server

Applications that handle sensitive data must be served over secure channels. This includes local applications as they may handle the same sensitive data and should be built as close to production-ready as possible.

Follow our [Secure Local Development guide](https://auth0.com/docs/libraries/secure-local-development) through the "Generate an SSL Certificate" section to create a `localhost.pem` certificate and a `localhost-key.pem` key. Make sure these are located in the application root (where `server.js` is located).

## Running the Sample

If you don't yet have an Auth0 account, [sign up](https://auth0.com/signup) for free.

Install the dependencies with npm:

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `CLIENT_ID` and `ISSUER_BASE_URL` with your Auth0 credentials:

```bash
mv .env.example .env
```

Run the app:

```bash
npm start
```

The app will be served at `localhost:3000`.

If you see en error like `no such file or directory, open './localhost-key.pem`, you either did not generate certificates or they are not in the right location. See the **Set up a secure local server** section above.

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
