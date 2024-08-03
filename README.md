# Project Name

Welcome to our project, which is built with Node.js and Expo, uses Jest for testing, Prisma as the ORM, and follows the MVC architecture pattern.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is designed to provide a robust and scalable solution using Node.js for the backend and Expo for the frontend. It utilizes Prisma as the ORM to interact with the database and follows the MVC architecture for better code organization and maintainability. Jest is used for writing and running tests to ensure code quality and reliability.

## Features

- RESTful API built with Node.js and Express
- Frontend developed with Expo
- Database management using Prisma ORM
- Comprehensive testing with Jest
- MVC architecture for clean and maintainable code

## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Expo](https://expo.dev/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [MVC Architecture](https://en.wikipedia.org/wiki/Model–view–controller)

## Architecture

The project follows the MVC (Model-View-Controller) architecture:

- **Models**: Defines the structure of the database using Prisma ORM.
- **Views**: Managed by the frontend (Expo).
- **Controllers**: Handles the logic and communication between the Model and View.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-project.git
    cd your-project
    ```

2. **Install backend dependencies**:
    ```bash
    cd BACK
    yarn install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../ReSourcesRelationnelles
    yarn install
    ```

5. **Run Prisma migrations**:
    ```bash
    cd BACK
    npx prisma migrate dev
    ```

## Usage

### Backend

To start the backend server:

```bash
cd BACK
yarn start
