export const setUser = (userDetails) => {
  return {
    type: 'SET_USER',
    payload: userDetails,
  };
};


export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
