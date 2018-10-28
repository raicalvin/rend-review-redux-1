// This is a pure function that takes in the state and the action that occurs and returns a new state
function todos(state = [], action) {
  if (action.todo === "ADD_TODO") {
    // modify the state by concatenating the todo to it
    // .concat() returns us a NEW array
    return state.concat([action.todo]);
  }
  return state;
}

// This function will create a brand new store
function createStore() {
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
    // dispatch() can call the pure reducer function, todos(), passing it the current state and the action
    state = todos(state, action);

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
