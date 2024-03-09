export const constants = {
  CURENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:3001';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiUrl}/login`,
    logout: `${apiUrl}/logout`,
    loggedUser: `${apiUrl}/loguser`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiUrl}/todo`,
    addTodo: `${apiUrl}/todo`,
    updateTodo: `${apiUrl}/todo`,
  },
};
