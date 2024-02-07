import { Home } from "@/components/icons";
import { AK47, BaseballBat, Chain, Kevlar, Leatherjacket, PlasticBag, Shoe, TShirt } from "@/components/icons/items";

export const getIconForItem = (item: string) => {
  switch (item) {
    case "AK 47":
      return AK47;
    case "Chain":
      return Chain;
    case "Baseball Bat":
      return BaseballBat;
    case "Blood Stained Shirt":
      return TShirt;
    case "Trench Coat":
      return Leatherjacket;
    case "Bullet Proof Vest":
      return Kevlar;
    case "All-Black Sneakers":
    case "Athletic Trainers":
    case "Work Boots":
      return Shoe;
    case "Plastic Bag":
      return PlasticBag;
    default:
      return Home;
  }
};

export const getUnlockedUpgrades = (item: string, times_upgraded: number): Record<string, boolean> => {
  switch (item) {
    case "AK 47": {
      return {
        "Extended Mag": times_upgraded >= 1,
        "Recoil Compensator": times_upgraded >= 2,
        "Laser Sight": times_upgraded >= 3,
      };
    }
    case "Chain": {
      return {
        "Tactical Grip": times_upgraded >= 1,
        "Reinforced Links": times_upgraded >= 2,
        "Spiked End": times_upgraded >= 3,
      };
    }
    case "Baseball Bat": {
      return {
        "Grip Tape": times_upgraded >= 1,
        "Corked Bat": times_upgraded >= 2,
        "Aluminum Bat": times_upgraded >= 3,
      };
    }
    case "Blood Stained Shirt": {
      return {
        "Reinforced Stitching": times_upgraded >= 1,
        "Polyester Blend": times_upgraded >= 2,
        "More Blood": times_upgraded >= 3,
      };
    }
    case "Bullet Proof Vest": {
      return {
        "Shoulder Straps": times_upgraded >= 1,
        "Thermal Ventilation": times_upgraded >= 2,
        "Ceramic Plate Inserts": times_upgraded >= 3,
      };
    }
    case "Trench Coat": {
      return {
        "Tailor Fitting": times_upgraded >= 1,
        "Treated Leather": times_upgraded >= 2,
        "Ballistic Inserts": times_upgraded >= 3,
      };
    }
    case "All-Black Sneakers": {
      return {
        "Fresh Laces": times_upgraded >= 1,
        "Ventilated Mesh": times_upgraded >= 2,
        "Memory Foam Insoles": times_upgraded >= 3,
      };
    }
    case "Athletic Trainers": {
      return {
        "Quick-Lace System": times_upgraded >= 1,
        "Anti-Slip Outsoles": times_upgraded >= 2,
        "Memory Foam Insoles": times_upgraded >= 3,
      };
    }
    case "Work Boots": {
      return {
        "Locking Laces": times_upgraded >= 1,
        "Shock-Absorbing Insoles": times_upgraded >= 2,
        "Steel-toed Cap": times_upgraded >= 3,
      };
    }
    case "Plastic Bag": {
      return {
        "Fanny Pack": times_upgraded >= 1,
        Backpack: times_upgraded >= 2,
        "Duffel Bag": times_upgraded >= 3,
      };
    }
    default: {
      return {};
    }
  }
};
