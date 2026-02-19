# Auth0 Express Web App Sample

This sample demonstrates how to add authentication to an Express web application using Auth0 and the [express-openid-connect](https://github.com/auth0/express-openid-connect) SDK.

## Prerequisites

- Node.js v24 ([nvm](https://github.com/nvm-sh/nvm) recommended)
- An [Auth0 account](https://auth0.com/signup)

## Getting Started

1. Clone this repository and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your Auth0 credentials:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/          - Express application
quickstart/   - Quickstart configuration and documentation
tools/        - Tooling scripts
```
