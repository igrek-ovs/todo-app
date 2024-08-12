import { setOnline } from '../store/reducers/OnlineSlice';
import { useAppDispatch } from '../hooks/redux';
import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket?: Socket;
}

const WebSocketContext = createContext<ISocketContext>({});

export { WebSocketContext };

let socket: Socket | undefined = undefined;
let ws: ISocketContext = {
  socket: undefined,
};

export default ({ children }: any) => {
  const token = localStorage.getItem('refreshToken');

  const dispatch = useAppDispatch();

  if (!socket && token) {
    const token = localStorage.getItem('refreshToken');

    socket = io(`${process.env.REACT_APP_API_PATH}`, {
      withCredentials: true,
      transports: ['websocket'],
      extraHeaders: {
        authorization: token,
      },
    });

    socket.on('connection', function () {
      console.log('Socket connected');
      dispatch(setOnline(true));
    });

    socket.on('disconnection', function () {
      console.log('Socket disconnected');
      dispatch(setOnline(false));
    });

    ws = {
      socket: socket,
    };
  }

  return (
    <WebSocketContext.Provider value={ws as ISocketContext}>
      {children}
    </WebSocketContext.Provider>
  );
};
