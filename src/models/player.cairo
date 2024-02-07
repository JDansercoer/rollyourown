use starknet::ContractAddress;
use dojo::database::introspect::{
    Enum, Member, Ty, Struct, Introspect, serialize_member, serialize_member_type
};
use dojo::world::{IWorld, IWorldDispatcher, IWorldDispatcherTrait};

use rollyourown::models::location::LocationEnum;
use rollyourown::models::item::ItemStat;
use rollyourown::systems::hustler::Hustler;

#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    game_id: u32,
    #[key]
    player_id: ContractAddress,
    mainnet_address: ContractAddress,
    name: felt252,
    avatar_id: u8,
    status: PlayerStatus,
    hood_id: LocationEnum,
    location_id: LocationEnum,
    next_location_id: LocationEnum,
    turn: usize,
    max_turns: usize,
    max_items: u8,
    cash: u128,
    health: u8,
    drug_count: usize,
    attack: usize,
    defense: usize,
    transport: usize,
    speed: usize,
    wanted: u8,
    leaderboard_version: u32,
    game_over: bool,
    hustler: Hustler,
    can_use_shop: bool,
    shop_last_used: usize,
}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    #[inline(always)]
    fn can_continue(self: Player) -> bool {
        if self.game_over {
            return false;
        }
        if self.health == 0 {
            return false;
        }
        if self.max_turns != 0 && self.turn == self.max_turns {
            return false;
        }
        if self.status != PlayerStatus::Normal {
            return false;
        }

        true
    }
}


#[derive(Copy, Drop, Serde, PartialEq)]
enum PlayerStatus {
    Normal: (),
    BeingMugged: (),
    BeingArrested: (),
    AtPawnshop: (),
}

impl PlayerStatusIntrospectionImpl of Introspect<PlayerStatus> {
    #[inline(always)]
    fn size() -> usize {
        1
    }

    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'PlayerStatus',
                attrs: array![].span(),
                children: array![
                    ('Normal', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('BeingMugged', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('BeingArrested', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('AtPawnshop', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                    .span()
            }
        )
    }
}


impl PlayerStatusIntoFelt252 of Into<PlayerStatus, felt252> {
    fn into(self: PlayerStatus) -> felt252 {
        match self {
            PlayerStatus::Normal => 'Normal',
            PlayerStatus::BeingMugged => 'BeingMugged',
            PlayerStatus::BeingArrested => 'BeingArrested',
            PlayerStatus::AtPawnshop => 'AtPawnshop',
        }
    }
}

fn increase_player_stat(ref player: Player, stat: ItemStat, value: usize) {
    match stat {
        ItemStat::DMG => player.attack += value,
        ItemStat::DEF => player.defense += value,
        ItemStat::SPD => player.speed += value,
        ItemStat::INV => player.transport += value,
    }
}
