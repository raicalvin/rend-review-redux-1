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

  // This method is responsible for
  const subscribe = listener => {
    listeners.push(listener); // push the listener passed to subscribe() from user into the listeners array
  };

  // Whenever createStore() is invoked, we want to return an object where one of the properties on this object will allow the user to get the state
  return {
    getState
  };
}
