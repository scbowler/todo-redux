export default (store) => (next) => async (action) => {
    // Code goes here
    if(!action.payload || !action.payload.then){
        return next(action);
    }
    const resp = await action.payload;

    store.dispatch({
        ...action,
        payload: resp
    });
}
