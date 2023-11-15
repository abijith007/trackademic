const initialState = {
  userDetails: null,
  isLoggedIn: false,
  message: ''
};

const userReducer = (state = initialState, action) => {    
  switch (action.type) {    
    case 'SET_USER':
      return {
        ...state,
        userDetails: action.payload,        
        isLoggedIn: true,                 
      };
    case 'LOGOUT':
      return {
        ...state,
        userDetails: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
