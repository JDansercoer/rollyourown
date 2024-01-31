use starknet::ContractAddress;
use dojo::database::introspect::{
    Enum, Member, Ty, Struct, Introspect, serialize_member, serialize_member_type
};

#[derive(Model, Copy, Drop, Serde)]
struct ItemNew {
    #[key]
    game_id: u32,
    #[key]
    player_id: ContractAddress,
    #[key]
    name: ItemName,
    tier: ItemTier,
    stat: ItemStat,
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


trait ItemMeta {
    fn initial_tier(self: ItemName) -> ItemTier;
    fn impacting_stat(self: ItemName) -> ItemStat;
    fn name(self: ItemName) -> felt252;
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
}
