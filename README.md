# Assignment 3 — To-Do List Application

A simple CRUD To-Do List built with HTML, CSS and JavaScript.

## Features
- Add new tasks (Create)
- View all tasks (Read)
- Edit task names and mark tasks complete (Update)
- Delete tasks (Delete)
- Save tasks in browser local storage
- Responsive layout for desktop and mobile

## How to run
1. Extract the ZIP file.
2. Open `index.html` in a web browser.
3. Type a task and select **Add task**.
4. Use **Edit**, the checkbox, or **Delete** to manage tasks.

No installation or server is required.

## Task object structure
Each task is stored as a JavaScript object:
```js
{
  id: 1720000000000,
  title: "Complete assignment",
  completed: false
}
```
The `id` uniquely identifies the task, `title` stores its text, and `completed` stores its status.
