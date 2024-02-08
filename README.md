# Playwright Testing PoC for GraphQL APIs

## Table of Contents

- [Playwright Testing PoC for GraphQL APIs](#playwright-testing-poc-for-graphql-apis)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Run `fns-regulatory` locally](#run-fns-regulatory-locally)
  - [Running the Tests](#running-the-tests)
  - [End-to-end (E2E) Testing Explanation \& Good Practices](#end-to-end-e2e-testing-explanation--good-practices)
    - [E2E Testing Good Practices:](#e2e-testing-good-practices)

## About

This repository contains a Proof of Concept (PoC) for testing GraphQL APIs using [Playwright](https://playwright.dev/). The powerful features of Playwright are leveraged to test GraphQL APIs, which includes both schema and data validation. The PoC involves the script-based generation of API requests and automated comparison of responses against expected outputs.

The repository link is [https://github.com/juanzitellifns/playwright-e2e-poc](https://github.com/juanzitellifns/playwright-e2e-poc).

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/) - A strongly typed superset of JavaScript providing optional static typing.
- [Yarn](https://yarnpkg.com/) - A fast, reliable, and secure dependency management system.
- [Playwright](https://playwright.dev/) - A robust framework for browser automation, and in our case, adapted for GraphQL API testing.

## Installation

Before you start, ensure that you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/juanzitellifns/playwright-e2e-poc.git
```

2. Navigate to the project directory and install the necessary dependencies:

```bash
cd playwright-e2e-poc
yarn install
```

3. Add environment variables

To be able to authenticate against Auth0 to perform requests, make sure to define the following environment variables in your untracked `.env` file

- AUTH0_AUDIENCE
- AUTH0_ISSUER_URL
- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET
- AUTH0_BASIC_AUTH_SECRET
- CI (optional)

## Run `fns-regulatory` locally

> Make sure you've cloned and ran the `fns-regulatory` project since this is a local-env-focused PoC. Also make sure you've connected your fns-regulatory to a valid mongodb instance.

You should have a `packages/prisma-clients/fns-regulatory/prisma/.env` file with the following environment variable pointing to the previously mentioned running mongodb instance:

- `FNS_REGULATORY_MONGODB_URL`

After the corresponding migration has been run, you should be able to run the tests successfully.

## Running the Tests

To run the tests, use the following command:

```bash
yarn test

# This will run `npx playwright test` under the hood.
```
## End-to-end (E2E) Testing Explanation & Good Practices
    
End-to-end (E2E) testing is a strategy used to validate the correctness of a system flow from start to finish. In the context of web APIs, this could mean testing a complete flow of events such as user registration, login, performing some action, and then logging out.

The goal of E2E testing is to simulate real user scenarios, ensuring the system behaves as expected.

E2E testing offers many benefits:
* It validates business processes work as expected.
* It ensures all integrated components work in harmony.
* It tests the application in a real-world scenario like a real user would.

### E2E Testing Good Practices:

1. **Test the critical paths**: Prioritize testing the most critical and frequently used functionalities that could prevent users from using an application if they do not work as expected.

2. **Keep tests as simple as possible**: Avoid over-complicating E2E tests. A simple, well-structured test can help in maintaining and understanding the test code.

3. **Define a clear test scope**: Avoid broadening the scope of the E2E test. It should focus on the journey from the beginning to the end, and should not aim to cover every possible permutation inside that journey.

4. **Choose the right tools**: Select your testing tools based on your application requirements. Different applications might require different testing strategies and tools.

5. **Continuous Testing and Integration**: Implement continuous testing to get quick feedback whenever new code changes are integrated.

6. **Data Management**: Have a strategy for test data cleanup and setup. Specific data sets might be needed to run certain tests, and you might want to clean up the data from previous tests.

7. **Regular Monitoring**: Regularly monitor and maintain your tests to keep them relevant and beneficial.
