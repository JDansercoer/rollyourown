use core::array::ArrayTrait;
use starknet::ContractAddress;
use dojo::database::introspect::{
    Enum, Member, Ty, Struct, Introspect, serialize_member, serialize_member_type
};
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use rollyourown::models::player::Player;
use rollyourown::utils::settings::getStatValueAndCost;

#[derive(Model, Copy, Drop, Serde)]
struct Item {
    #[key]
    game_id: u32,
    #[key]
    player_id: ContractAddress,
    #[key]
    slot: ItemSlot,
    name: ItemName,
    tier: ItemTier,
    stat: ItemStat,
    times_upgraded: u8,
}

#[derive(Copy, Drop, Serde, Introspect)]
enum ItemTier {
    Tier1,
    Tier2,
    Tier3,
    Tier4,
    Tier5,
    Tier6,
}

impl ItemTierIntoU8 of Into<ItemTier, u8> {
    fn into(self: ItemTier) -> u8 {
        match self {
            ItemTier::Tier1 => 1,
            ItemTier::Tier2 => 2,
            ItemTier::Tier3 => 3,
            ItemTier::Tier4 => 4,
            ItemTier::Tier5 => 5,
            ItemTier::Tier6 => 6,
        }
    }
}

trait NextItemTierTrait {
    fn nextTier(self: ItemTier) -> ItemTier;
}

impl NextItemTierImpl of NextItemTierTrait {
    fn nextTier(self: ItemTier) -> ItemTier {
        match self {
            ItemTier::Tier1 => ItemTier::Tier2,
            ItemTier::Tier2 => ItemTier::Tier3,
            ItemTier::Tier3 => ItemTier::Tier4,
            ItemTier::Tier4 => ItemTier::Tier5,
            ItemTier::Tier5 => ItemTier::Tier6,
            ItemTier::Tier6 => ItemTier::Tier6,
        }
    }
}

#[derive(Copy, Drop, Serde, Introspect)]
enum ItemStat {
    DMG,
    DEF,
    SPD,
    INV
}

#[derive(Copy, Drop, Serde, Introspect)]
enum ItemName {
    Chain,
    BaseballBat,
    AK47,
    BloodStainedShirt,
    TrenchCoat,
    BulletProofVest,
    AllBlackSneakers,
    AthleticTrainers,
    WorkBoots,
    PlasticBag,
}

#[derive(Copy, Drop, Serde, Introspect)]
enum ItemSlot {
    Weapon,
    Shirt,
    Shoe,
    Bag
}


trait ItemMeta {
    fn initial_tier(self: ItemName) -> ItemTier;
    fn impacting_stat(self: ItemName) -> ItemStat;
    fn name(self: ItemName) -> felt252;
    fn slot(self: ItemName) -> ItemSlot;
    fn nextUpgradeName(self: ItemName, timesUpgraded: u8) -> felt252;
}

impl ItemMetaImpl of ItemMeta {
    fn initial_tier(self: ItemName) -> ItemTier {
        match self {
            ItemName::Chain => ItemTier::Tier1,
            ItemName::BaseballBat => ItemTier::Tier2,
            ItemName::AK47 => ItemTier::Tier3,
            ItemName::BloodStainedShirt => ItemTier::Tier1,
            ItemName::TrenchCoat => ItemTier::Tier2,
            ItemName::BulletProofVest => ItemTier::Tier3,
            ItemName::AllBlackSneakers => ItemTier::Tier2,
            ItemName::AthleticTrainers => ItemTier::Tier2,
            ItemName::WorkBoots => ItemTier::Tier2,
            ItemName::PlasticBag => ItemTier::Tier2,
        }
    }

    fn impacting_stat(self: ItemName) -> ItemStat {
        match self {
            ItemName::Chain => ItemStat::DMG,
            ItemName::BaseballBat => ItemStat::DMG,
            ItemName::AK47 => ItemStat::DMG,
            ItemName::BloodStainedShirt => ItemStat::DEF,
            ItemName::TrenchCoat => ItemStat::DEF,
            ItemName::BulletProofVest => ItemStat::DEF,
            ItemName::AllBlackSneakers => ItemStat::SPD,
            ItemName::AthleticTrainers => ItemStat::SPD,
            ItemName::WorkBoots => ItemStat::SPD,
            ItemName::PlasticBag => ItemStat::INV,
        }
    }

    fn name(self: ItemName) -> felt252 {
        match self {
            ItemName::Chain => 'Chain',
            ItemName::BaseballBat => 'Baseball Bat',
            ItemName::AK47 => 'AK 47',
            ItemName::BloodStainedShirt => 'Blood Stained Shirt',
            ItemName::TrenchCoat => 'Trench Coat',
            ItemName::BulletProofVest => 'Bullet Proof Vest',
            ItemName::AllBlackSneakers => 'All-Black Sneakers',
            ItemName::AthleticTrainers => 'Athletic Trainers',
            ItemName::WorkBoots => 'Work Boots',
            ItemName::PlasticBag => 'Plastic Bag',
        }
    }

    fn slot(self: ItemName) -> ItemSlot {
        match self {
            ItemName::Chain => ItemSlot::Weapon,
            ItemName::BaseballBat => ItemSlot::Weapon,
            ItemName::AK47 => ItemSlot::Weapon,
            ItemName::BloodStainedShirt => ItemSlot::Shirt,
            ItemName::TrenchCoat => ItemSlot::Shirt,
            ItemName::BulletProofVest => ItemSlot::Shirt,
            ItemName::AllBlackSneakers => ItemSlot::Shoe,
            ItemName::AthleticTrainers => ItemSlot::Shoe,
            ItemName::WorkBoots => ItemSlot::Shoe,
            ItemName::PlasticBag => ItemSlot::Bag,
        }
    }

    fn nextUpgradeName(self: ItemName, timesUpgraded: u8) -> felt252 {
        match self {
            ItemName::Chain => {
                if (timesUpgraded == 0) {
                    return 'Tactical Grip';
                } else if (timesUpgraded == 1) {
                    return 'Reinforced Links';
                } else {
                    return 'Spiked End';
                }
            },
            ItemName::BaseballBat => {
                if (timesUpgraded == 0) {
                    return 'Grip Tape';
                } else if (timesUpgraded == 1) {
                    return 'Corked Bat';
                } else {
                    return 'Aluminum Bat';
                }
            },
            ItemName::AK47 => {
                if (timesUpgraded == 0) {
                    return 'Extended Mag';
                } else if (timesUpgraded == 1) {
                    return 'Recoil Compensator';
                } else {
                    return 'Laser Sight';
                }
            },
            ItemName::BloodStainedShirt => {
                if (timesUpgraded == 0) {
                    return 'Reinforced Stitching';
                } else if (timesUpgraded == 1) {
                    return 'Polyester Blend';
                } else {
                    return 'More Blood';
                }
            },
            ItemName::TrenchCoat => {
                if (timesUpgraded == 0) {
                    return 'Tailor Fitting';
                } else if (timesUpgraded == 1) {
                    return 'Treated Leather';
                } else {
                    return 'Ballistic Inserts';
                }
            },
            ItemName::BulletProofVest => {
                if (timesUpgraded == 0) {
                    return 'Shoulder Straps';
                } else if (timesUpgraded == 1) {
                    return 'Thermal Ventilation';
                } else {
                    return 'Ceramic Plate Inserts';
                }
            },
            ItemName::AllBlackSneakers => {
                if (timesUpgraded == 0) {
                    return 'Fresh Laces';
                } else if (timesUpgraded == 1) {
                    return 'Ventilated Mesh';
                } else {
                    return 'Memory Foam Insoles';
                }
            },
            ItemName::AthleticTrainers => {
                if (timesUpgraded == 0) {
                    return 'Quick-Lace System';
                } else if (timesUpgraded == 1) {
                    return 'Anti-Slip Outsoles';
                } else {
                    return 'Memory Foam Insoles';
                }
            },
            ItemName::WorkBoots => {
                if (timesUpgraded == 0) {
                    return 'Locking Laces';
                } else if (timesUpgraded == 1) {
                    return 'Shock-Absorbing Insoles';
                } else {
                    return 'Steel-toed Cap';
                }
            },
            ItemName::PlasticBag => {
                if (timesUpgraded == 0) {
                    return 'Fanny Pack';
                } else if (timesUpgraded == 1) {
                    return 'Backpack';
                } else {
                    return 'Duffel Bag';
                }
            },
        }
    }
}

fn get_items_for_player(
    world: IWorldDispatcher, game_id: u32, player_id: ContractAddress
) -> Array<Item> {
    let mut items: Array<Item> = array![];

    let weapon = get!(world, (game_id, player_id, ItemSlot::Weapon), (Item));
    items.append(weapon);

    let shirt = get!(world, (game_id, player_id, ItemSlot::Shirt), (Item));
    items.append(shirt);

    let shoe = get!(world, (game_id, player_id, ItemSlot::Shoe), (Item));
    items.append(shoe);

    let bag = get!(world, (game_id, player_id, ItemSlot::Bag), (Item));
    items.append(bag);

    items
}

fn get_stat_increase(item: Item) -> usize {
    let (currentStat, _) = getStatValueAndCost(item.stat, item.tier);
    let (nextStat, _) = getStatValueAndCost(item.stat, item.tier.nextTier());

    nextStat - currentStat
}
