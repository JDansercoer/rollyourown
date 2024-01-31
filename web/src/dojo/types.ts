import { Market } from "@/generated/graphql";

// must have same order than cairo enum
export enum Location {
  Home,
  Queens,
  Bronx,
  Brooklyn,
  Jersey,
  Central,
  Coney,
}

// must have same order than cairo enum
export enum Drug {
  Ludes,
  Speed,
  Weed,
  Acid,
  Heroin,
  Cocaine,
}

export enum ItemEnum {
  Attack,
  Defense,
  Transport,
  Speed,
}

export enum ItemTextEnum {
  Attack = "Attack",
  Defense = "Defense",
  Transport = "Transport",
  Speed = "Speed",
}

export enum PlayerStatus {
  Normal = "Normal",
  BeingMugged = "BeingMugged",
  BeingArrested = "BeingArrested",
  AtPawnshop = "AtPawnshop",
}

export enum Action {
  Run,
  Pay,
  Fight,
}

export enum Outcome {
  Died,
  Paid,
  Escaped,
  Captured,
  Victorious,
}

export enum GameMode {
  Test,
  Unlimited,
}

export enum Hustler {
  Dragon,
  Monkey,
  Rabbit,
}

export enum ItemSlot {
  Weapon,
  Shirt,
  Shoe,
  Bag,
}

export interface LocationInfo {
  type: Location;
  name: string;
  slug: string;
  id: string;
  icon: React.FC;
}

export interface DrugInfo {
  type: Drug;
  name: string;
  slug: string;
  id: string;
  icon: React.FC;
}

export interface ShopItemInfo {
  impacting_stat: string;
  name: string;
  slot: string;
  upgrade_cost: number;
}

export interface OutcomeInfo {
  title: string;
  type: Outcome;
  status: PlayerStatus;
  name: string;
  imageSrc: string;
  description?: string;
  getResponse: (isInitial: boolean) => string;
  color: string;
}

export type DrugMarket = {
  id: string; // id is hex encoded drug name
  type: Drug;
  price: number;
  marketPool: Market;
};

export type LocationPrices = Map<string, DrugMarket[]>;
