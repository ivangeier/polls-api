# Polls-API

PollAPI with Real-Time Results is an advanced API designed to manage polls with unlimited options for voting, now with the added capability of real-time result updates via WebSockets.

This project simplifies the process of creating, retrieving, and managing polls through a RESTful interface while providing users with the ability to follow poll results in real-time.

Built with integration to PostgreSQL and Redis, and developed with Node.js, it ensures seamless data storage, retrieval, and WebSocket functionality for an enhanced polling experience.

## Technologies

1. Node
2. Fastify
3. PostgresSQL
4. Redis
5. Websocket
6. Docker

## Key Features

- Poll Creation: Easily create polls with any number of options for users to vote on. The API supports dynamic creation of polls, allowing flexibility in designing your voting scenarios.
- Voting System: Users can cast their votes for their preferred options in the poll. The system ensures fairness and accuracy in tallying votes, enabling a smooth voting experience for participants.
- Retrieval of Polls: Retrieve individual polls by their unique identifiers or fetch a list of all available polls. This feature facilitates easy access to poll information for analysis or presentation purposes.
- Real-Time Result Updates: WebSocket integration allows users to follow poll results in real-time. As votes are cast, the WebSocket connection provides immediate updates on the current state of the poll, enhancing user engagement and interactivity.
- Integration with PostgreSQL: Leveraging the power and reliability of PostgreSQL, the API ensures robust data storage and management. PostgreSQL serves as the primary database for storing poll configurations and metadata.
- Redis Integration for Vote Counting: Utilizing Redis, the API efficiently stores and updates the total number of votes for each poll. Redis acts as a high-performance in-memory data store, optimizing the process of tallying and retrieving poll vote counts.
- Scalability and Performance: With PostgreSQL, Redis, and Node.js, the API guarantees scalability and performance, enabling seamless handling of high volumes of poll data, concurrent user interactions, and real-time updates.

## Instalation

Clone the poject
````
git clone https://github.com/ivangeier/polls-api.git)https://github.com/ivangeier/polls-api.git
````

Install dependecies
````
npm install
````

You can use docker to provide PostgresSQL and Redis services if you don't have in your PC.
````
docker compose up
````

Run the project in dev mode
````
npm run dev
````

## TODOS
Here some features and improviments that I want to add in this project:

1. Swagger documentation
2. User login system

## Contribution:

Contributions to PollAPI with Real-Time Results are welcome! Feel free to fork the repository, make improvements, and submit pull requests to enhance the functionality or fix any issues.

## License:

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact:

For any inquiries or support, please contact vilajr.ivanQ@gmail.com.


