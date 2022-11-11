import { io } from 'socket.io-client';

const {REACT_APP_HOST} = process.env;
const socket = io(REACT_APP_HOST);

export default socket;


// socket is not implemented for the moment because i implement React 18
// and there is problems with versions yet