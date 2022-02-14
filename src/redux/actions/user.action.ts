

export const USER = {
  SET_SOCKET_USER: 'SET_SOCKET_USER'
};

export function setSocket(socketUser: any) {
  return {
    type: USER.SET_SOCKET_USER,
    socketUser
  }
} 
