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
