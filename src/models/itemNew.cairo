use core::array::ArrayTrait;
use starknet::ContractAddress;
use dojo::database::introspect::{
    Enum, Member, Ty, Struct, Introspect, serialize_member, serialize_member_type
};
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use rollyourown::models::player::Player;
use rollyourown::utils::settings::getStatValueAndCost;

#[derive(Model, Copy, Drop, Serde)]
struct ItemNew {
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
}

fn get_items_for_player(
    world: IWorldDispatcher, game_id: u32, player_id: ContractAddress
) -> Array<ItemNew> {
    let mut items: Array<ItemNew> = array![];

    let weapon = get!(world, (game_id, player_id, ItemSlot::Weapon), (ItemNew));
    items.append(weapon);

    let shirt = get!(world, (game_id, player_id, ItemSlot::Shirt), (ItemNew));
    items.append(shirt);

    let shoe = get!(world, (game_id, player_id, ItemSlot::Shoe), (ItemNew));
    items.append(shoe);

    let bag = get!(world, (game_id, player_id, ItemSlot::Bag), (ItemNew));
    items.append(bag);

    items
}

fn get_stat_increase(item: ItemNew) -> usize {
    let (currentStat, _) = getStatValueAndCost(item.stat, item.tier);
    let (nextStat, _) = getStatValueAndCost(item.stat, item.tier.nextTier());

    nextStat - currentStat
}
