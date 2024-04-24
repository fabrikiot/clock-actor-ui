import { createContext, useContext, useEffect, useRef } from "react";
import { ActorSystem } from "actor-system";
import { ActorAddressType } from "../actors/actor-address";

export type ActorSysI = typeof ActorSystem | null;
interface IAppContext {
  actorSysI: ActorSysI;
}

const DefaultAppContextValue: IAppContext = {
  actorSysI: null,
};

const AppContext = createContext(DefaultAppContextValue);
export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Components must be used within a <Dropdown/>");
  }
  return context;
};

export const useActorRef = (address: ActorAddressType, debugId?: string) => {
  const { actorSysI } = useContext(AppContext);
  const actorRef = useRef<ActorSysI>(null);

  useEffect(() => {
    actorRef.current = actorSysI?.actorOf?.(address, debugId);
    return () => {
      actorRef?.current?.close?.();
    };
  }, [address, debugId, actorSysI]);

  return actorRef;
};
