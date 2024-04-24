export const ACTOR_ADDRESS = {
  CLOCK_ACTOR: "clock_actor",
} as const;

export type ActorAddressType =
  (typeof ACTOR_ADDRESS)[keyof typeof ACTOR_ADDRESS];
