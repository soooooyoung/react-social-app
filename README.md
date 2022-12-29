# SNSUS - React Social Media App (FE)

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [React Query](https://react-query-v3.tanstack.com/)
- [React Router](https://reactrouter.com/en/main)
- [React Redux & Redux](https://react-redux.js.org/)
- [Ant Design](https://ant.design/)
- [Redux Persist](https://www.npmjs.com/package/redux-persist)
- [DayJS](https://day.js.org/)

## Project Timeline

### Project Data, Folder Structures and Utilities

✔️ Data models and response handling utilities

### Library Implementations

✔️ React Router: Authentication check and page transitions  
✔️ Redux: Structure establishment and authentication state management

### Login Page

✔️ Handle log-in, log-out process

✔️ Cookie Handled with HTTP only

### Signup Page

❌ ~~Handle sign up process~~ Postponed until deployment

### Dashboard Page

✔️ Create, read, update, delete posts  
❌ ~~Like, comments on posts~~ Postponed until deployment  
❌ ~~Follow, unfollow users~~ Postponed until deployment

### Deployment

✔️ Purchase, connect DNS  
✔️ Install SSL certificate  
👉 Configure Nginx  

## Functionality

### Protected Routes

Implementation of protected Route components to only grant access to autorized users. Authorization check request is sent to server on every Route transitions.

### Authtoken

Every request to server is sent using HTTP only Cookies.

### Login

![](https://github.com/soooooyoung/react-social-app/src/assets/prev_login.gif)

### Create, read, update, delete posts using generic implementation of React Query.

#### Write Post

![](https://github.com/soooooyoung/react-social-app/src/assets/prev_write.gif)

#### Edit Post

![](https://github.com/soooooyoung/react-social-app/src/assets/prev_edit.gif)

#### Delete Post

![](https://github.com/soooooyoung/react-social-app/src/assets/prev_delete.gif)
