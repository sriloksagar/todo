# Todo Calendar App

A React-based todo list calendar application with MongoDB backend.

## Project Structure

```
todo-calendar-app/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar.js
│   │   │   ├── TodoItem.js
│   │   │   └── ColorPicker.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── package.json
│   └── README.md
├── server/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── index.js
│   ├── package.json
│   └── README.md
├── .gitignore
├── README.md
└── package.json

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-calendar-app.git
   cd todo-calendar-app
   ```

2. Install dependencies:
   ```
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up MongoDB:
   - Install MongoDB if you haven't already
   - Create a new database named `todolist`

4. Start the server:
   ```
   cd server
   npm start
   ```

5. Start the client:
   ```
   cd client
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Features

- Weekly calendar view
- Add, edit, and delete todos
- Drag and drop todos between days
- Color-code todos
- Data persistence with MongoDB

## Technologies Used

- Frontend: React, react-beautiful-dnd, react-color
- Backend: Node.js, Express
- Database: MongoDB
- State Management: React Hooks

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
