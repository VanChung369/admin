import io from 'socket.io-client';

let socketIo: any;

export default class Socket {
  getInstance = (address: string) => {
    if (socketIo == null) {
      socketIo = io(`${process.env.UMI_APP_API_URL}`, {
        secure: true,
        reconnection: true,
        rejectUnauthorized: false,
        transports: ['websocket'],
        query: {
          address,
        },
      });

      socketIo.on('connect', () => {
        console.log('connect socket...');
      });
      socketIo.on('disconnect', () => {
        console.log('disconnect socket...');
      });
    }
    return socketIo;
  };

  removeInstance = () => {
    socketIo = null;
  };
}
