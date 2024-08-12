import { UseGuards } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { WsJwtGuard } from "../../auth/guards";

@WebSocketGateway({
  cors: {
    origin: [process.env.CLIENT_URL],
  },
})
@UseGuards(WsJwtGuard)
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private readonly server: Server;

  emit(event: string, args: any): void {
    this.server.emit(event, args);
  }

  handleConnection(client: Socket): void {
    this.emit("connection", `Hello, ${client.id}, nice to meet you!`);
  }

  handleDisconnect(client: Socket): void {
    this.emit("disconnection", `Client ${client.id} disconnected`);
  }
}
