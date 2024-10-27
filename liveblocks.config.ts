// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";

import { Layer,Color } from "./types/canvas";

type UserInfo = {
  name: string;
  color: string;
  picture: string;
};

export type UserAwareness = {
  user?: UserInfo;
};
export type AwarenessList = [number, UserAwareness][];

export const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      cursor: { x: number; y: number } | null;
      selection: string[];
      pencilDraft: [x: number, y: number, pressure: number][] | null;
      pencilColor: Color | null;
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      layers: LiveMap<string, LiveObject<Layer>>;
      layerIds: LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id?: string;
      info: {
        color?: string;
        
        name: string;
        picture: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
      // Example has two events, using a union
      // | { type: "PLAY" } 
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}



export {};
