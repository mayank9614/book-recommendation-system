# Interactive Book Recommendation System

A personalized book recommendation system that helps users discover new books based on their preferences, reading history, and similar users' interests.

## Features (Planned)

- User authentication and profiles
- Book search and browsing
- Rating and review system
- Personalized recommendations using:
  - Collaborative filtering
  - Content-based filtering
  - Machine learning models
- Reading progress tracker
- Social features (sharing, following)
- Integration with external book APIs

## Technical Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- ML Framework: TensorFlow/scikit-learn
- Cloud: AWS/Google Cloud

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the detailed development plan.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Environment Setup
1. Clone this repository
2. Copy the `.env.example` file to a new file named `.env`
3. Update the `.env` file with your own configuration values:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `NODE_ENV`: Set to `development`, `test`, or `production`

### Installation
1. Install server dependencies:
   ```
   npm install
   ```
2. Install client dependencies:
   ```
   cd client
   npm install
   ```

### Running the Application
1. Start the server:
   ```
   npm run server
   ```
2. Start the client:
   ```
   cd client
   npm start
   ```
3. For development (running both server and client):
   ```
   npm run dev
   ```

## Contributing

Guidelines for contributing to this project will be added soon.

## License

MIT 