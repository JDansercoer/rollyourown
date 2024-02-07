import {
  Player,
  Drug as DrugType,
  usePlayerEntityQuery,
  World__EntityEdge,
  Item as ItemType,
  Encounter,
} from "@/generated/graphql";
import { useEffect, useMemo, useState } from "react";
import { REFETCH_INTERVAL, SCALING_FACTOR } from "../constants";
import { PlayerStatus, ItemEnum, ItemTextEnum, Hustler } from "../types";
import { shortString } from "starknet";
import { profanity } from "@2toad/profanity";

type Drug = {
  id: string;
  quantity: number;
};

export type ShopItem = {
  id: ItemTextEnum; // ItemEnum as string
  level: number;
  name: string;
  value: number;
};

export class PlayerEntity {
  name: string;
  avatarId: number;
  cash: number;
  health: number;
  turn: number;
  maxTurns: number;
  maxItems: number;
  drugCount: number;
  hoodId: string;
  locationId: string;
  nextLocationId?: string;
  status: PlayerStatus;
  hustler: Hustler;

  drugs: Drug[];
  encounters: Encounter[];

  attack: number;
  defense: number;
  transport: number;
  speed: number;

  wanted: number;
  gameOver: boolean;

  canUseShop: boolean;

  constructor(player: Player, drugs: Drug[], encounters: Encounter[]) {
    this.name = profanity.censor(shortString.decodeShortString(player.name));
    this.avatarId = player.avatar_id;
    this.cash = Number(player.cash) / SCALING_FACTOR;
    this.health = player.health;
    this.turn = player.turn;
    this.maxTurns = player.max_turns;
    this.maxItems = player.max_items;
    this.hustler = Hustler[player.hustler as keyof typeof Hustler];

    this.drugCount = player.drug_count;

    this.hoodId = player.hood_id === "Home" ? undefined : player.hood_id;
    this.locationId = player.location_id === "Home" ? undefined : player.location_id;
    this.nextLocationId = player.next_location_id === "Home" ? undefined : player.next_location_id;
    this.status = player.status;

    this.attack = player.attack;
    this.defense = player.defense;
    this.transport = player.transport;
    this.speed = player.speed;

    this.wanted = player.wanted;
    this.gameOver = player.game_over;

    this.drugs = drugs;
    this.encounters = encounters;

    this.canUseShop = player.can_use_shop;
  }

  update(player: Player) {
    this.cash = Number(player.cash) / SCALING_FACTOR;
    this.health = player.health;
    this.turn = player.turn;
    this.drugCount = player.drug_count;

    this.attack = player.attack;
    this.defense = player.defense;
    this.transport = player.transport;
    this.speed = player.speed;

    this.hoodId = player.hood_id;
    this.locationId = player.location_id === "Home" ? undefined : player.location_id;
    this.status = player.status;
    this.wanted = player.wanted;
    this.gameOver = player.game_over;

    this.canUseShop = player.can_use_shop;
    return this;
  }

  updateDrug(newDrug: DrugType) {
    const drug = this.drugs.find((i) => i.id === newDrug.drug_id);
    if (drug) {
      drug.quantity = newDrug.quantity;
    } else {
      this.drugs.push({
        id: newDrug.drug_id,
        quantity: newDrug.quantity,
      });
    }
    return this;
  }

  updateEncounter(newEncounter: Encounter) {
    const encounter = this.encounters.find((i) => i.encounter_id === newEncounter.encounter_id);
    if (encounter) {
      encounter.level = newEncounter.level;
      encounter.health = newEncounter.health;
      encounter.payout = Number(newEncounter.payout) / SCALING_FACTOR;
    } else {
      this.encounters.push({
        ...newEncounter,
        payout: Number(newEncounter.payout) / SCALING_FACTOR,
      });
    }
    return this;
  }

  static create(edges: World__EntityEdge[]): PlayerEntity | undefined {
    if (!edges || edges.length === 0) return undefined;
    // player model
    const playerModel = edges.find((edge) => {
      return edge.node?.models?.some((model) => model?.__typename === "Player");
    })?.node?.models?.[0] as Player;

    // TODO: create helpers
    // drug entities
    const drugEdges = edges.filter((edge) => edge.node?.models?.find((model) => model?.__typename === "Drug"));

    const drugs: Drug[] = drugEdges.map((edge) => {
      const drugModel = edge.node?.models?.find((model) => model?.__typename === "Drug") as DrugType;

      return {
        id: drugModel.drug_id,
        quantity: drugModel.quantity,
      };
    });

    // encounters
    const encounterEdges = edges.filter((edge) =>
      edge.node?.models?.find((model) => model?.__typename === "Encounter"),
    );

    const encounters: Encounter[] = encounterEdges.map((edge) => {
      const encounterModel = edge.node?.models?.find((model) => model?.__typename === "Encounter") as Encounter;
      return {
        ...encounterModel,
        payout: Number(encounterModel.payout) / SCALING_FACTOR,
      };
    });

    if (!playerModel) return undefined;

    return new PlayerEntity(playerModel, drugs, encounters);
  }
}
