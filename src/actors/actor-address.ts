export const ACTOR_ADDRESS = {
  CLOCK_ACTOR: "clock_actor",
  DATA_ACTOR: "data_actor",
  GET_RANDOM_NUMBERS_ACTOR: "get_random_numbers_actor",
} as const;

export type ActorAddressType =
  (typeof ACTOR_ADDRESS)[keyof typeof ACTOR_ADDRESS];
