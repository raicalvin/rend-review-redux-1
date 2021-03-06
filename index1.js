/*
    LIBRARY CODE ====================================================
*/

// This function will create a brand new store
function createStore(reducer) {
  // The store will have four parts:
  // 1. The state
  // 2. Getting the state
  // 3. Listen to changes on the state
  // 4. Update the state

  // ITEM 1: Having the state in the store. This is the central location for all the data within the app.
  let state;

  // ITEM 2: Returning the state of the application when requested.
  const getState = () => state;

  // Every time subscribe() is invoked, the function passed to it will be stored in this array:
  let listeners = [];

  // ITEM 3: Listen for changes of the state using the subscribe() function

  // This method is responsible for taking the listner passed into it and managing it
  const subscribe = listener => {
    // push the listener passed to subscribe() from user into the listeners array:
    listeners.push(listener);
    /*
          Now we want to create a way for the user to unsubscribe from certain subscribe calls. Return a function to the user that let's them do this. When the user invokes this function, call the filter() function to filter out the listener they want to unsibscribe from, in this case 'listener':
      */
    return () => {
      listeners = listeners.filter(l => l !== listener);
      // The user can store this returned function into a variable when they call store.subscribe(...) and invoke it to remove the listener they passed into the subscribe() method call.
    };
  };

  // ITEM 4: The dispatch() function is responsible for updating the state in our store using the action that occured
  const dispatch = action => {
    // dispatch() can call the pure reducer function, reducer() that was passed into createStore() by the user, passing it the current state and the action
    state = reducer(state, action);

    // Since the state potentially changed, make sure to loop through the listeners and invoke each one of them
    listeners.forEach(listener => listener());
  };

  // Whenever createStore() is invoked, we want to return an object where one of the properties on this object will allow the user to get the state
  return {
    getState,
    subscribe,
    dispatch
  };
}

/*
    APP CODE ====================================================
*/

// Create constants for the action types instead of string literals throughout the code
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// Action creator functions that return action objects with the type
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}

// This is a pure function that takes in the state and the action that occurs and returns a new state
function todos(state = [], action) {
  // Remember, this is a PURE FUNCTION so it can only used the arguments passed into it to create a new array or modify the passed-in state and return it
  switch (action.type) {
    case ADD_TODO:
      // modify the state by concatenating the todo to it
      // .concat() returns us a NEW array
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id !== action.id
            ? todo
            : Object.assign({}, todo, { complete: !todo.compelte })
      );
    default:
      return state;
  }
}

// Let's add another list of goals for long-term goals. Now we have two reducers!
// Remember: REDUCERS are pure functions that take in a state and action and return a new/modified state
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

// Create a new root reducer for the app
// This returns an object representing the state of our ENTIRE application. Within this new state object, we have state pieces for the todos and goals portions of our app
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

// EXAMPLE = = = = = = = = = = = = =

// We can create a store object by calling createStore() and passing in the root reducer pure function above
// All a reducer function does is take in the state and the action that occurred and returns a modified new state
const store = createStore(app);

// We can call store.subscribe() and pass it a LISTENER function to run whenever the state changes
let unsubscribe = store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

console.log(unsubscribe);

// Next, we can call dispatch() and pass it an ACTION so we can see how the store will change
store.dispatch(
  addTodoAction({
    id: 0,
    name: "Walk the dog",
    complete: false
  })
);

// So anytime we need to update the state, we can call the dispatch() function passing it the action that occurred.
store.dispatch(
  addTodoAction({
    id: 1,
    name: "Read a book",
    complete: true
  })
);

store.dispatch(
  addGoalAction({
    id: 0,
    name: "Learn Redux"
  })
);
