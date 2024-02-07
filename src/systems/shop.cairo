use starknet::ContractAddress;
use rollyourown::models::player::{Player};
use rollyourown::models::item::{ItemSlot, ItemStat};

const MAX_UPGRADE_COUNT: u8 = 3;

#[derive(Copy, Drop, Serde)]
struct AvailableItem {
    slot: ItemSlot,
    name: felt252,
    upgrade_name: felt252,
    upgrade_cost: u128,
    impacting_stat: ItemStat,
}

#[starknet::interface]
trait IShop<TContractState> {
    fn is_open(self: @TContractState, game_id: u32, player_id: ContractAddress) -> bool;
    fn skip(self: @TContractState, game_id: u32);
    fn buy_item(self: @TContractState, game_id: u32, item_slot: ItemSlot);
    fn available_items(
        self: @TContractState, game_id: u32, player_id: ContractAddress
    ) -> Span<AvailableItem>;
}

#[dojo::contract]
mod shop {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_contract_address;

    use rollyourown::constants::SCALING_FACTOR;
    use rollyourown::models::player::{Player, PlayerTrait, PlayerStatus, increase_player_stat};
    use rollyourown::models::location::{Location, LocationEnum};
    use rollyourown::models::game::{Game, GameTrait};
    use rollyourown::utils::settings::{ShopSettings, ShopSettingsImpl, getStatValueAndCost};
    use rollyourown::utils::random::{RandomImpl};
    use rollyourown::systems::travel::on_turn_end;
    use rollyourown::models::item::{
        NextItemTierImpl, ItemMetaImpl, get_items_for_player, ItemSlot, Item, get_stat_increase
    };

    use super::{IShop, AvailableItem, MAX_UPGRADE_COUNT};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        BoughtItem: BoughtItem,
    }

    #[derive(Drop, starknet::Event)]
    struct BoughtItem {
        #[key]
        game_id: u32,
        #[key]
        player_id: ContractAddress,
        item_slot: ItemSlot,
        level: u8,
        item_name: felt252,
        upgrade_name: felt252,
        cost: u32
    }

    #[external(v0)]
    impl ShopExternalImpl of IShop<ContractState> {
        fn skip(self: @ContractState, game_id: u32) {
            let world = self.world();
            let player_id = get_caller_address();
            let game = get!(world, game_id, (Game));
            let mut player = get!(world, (game_id, player_id), Player);
            let mut randomizer = RandomImpl::new(world);

            assert(player.status == PlayerStatus::AtPawnshop, 'not at pawnshop !');
            assert(self.is_open(game_id, player_id), 'pawnshop not open !');

            on_turn_end(world, ref randomizer, @game, ref player);
        }


        fn is_open(self: @ContractState, game_id: u32, player_id: ContractAddress) -> bool {
            let world = self.world();
            let game = get!(world, game_id, (Game));
            let player = get!(world, (game_id, player_id), Player);

            player.can_use_shop
        }

        fn buy_item(self: @ContractState, game_id: u32, item_slot: ItemSlot) {
            let world = self.world();
            let game = get!(world, game_id, (Game));
            let player_id = get_caller_address();
            let mut player = get!(world, (game_id, player_id), Player);

            let mut item = get!(world, (game_id, player_id, item_slot), (Item));
            let shop_settings = ShopSettingsImpl::get(game.game_mode);

            let (_, upgrade_cost) = getStatValueAndCost(item.stat, item.tier.nextTier());

            assert(item.times_upgraded < MAX_UPGRADE_COUNT, 'Item maxed out');

            assert(player.cash >= upgrade_cost, 'Can\'t afford upgrade');

            // pay item
            player.cash -= upgrade_cost;
            player.shop_last_used = player.turn;
            player.can_use_shop = false;

            let stat_increase = get_stat_increase(item);
            increase_player_stat(ref player, item.stat, stat_increase);

            set!(world, (player));

            let upgrade_name = item.name.nextUpgradeName(item.times_upgraded);

            // update item
            item.times_upgraded += 1;
            item.tier = item.tier.nextTier();
            set!(world, (item));

            // emit event
            emit!(
                self.world(),
                BoughtItem {
                    game_id,
                    player_id,
                    item_slot,
                    level: item.times_upgraded,
                    item_name: item.name.name(),
                    upgrade_name,
                    cost: (upgrade_cost / SCALING_FACTOR).try_into().unwrap()
                }
            );
        }

        fn available_items(
            self: @ContractState, game_id: u32, player_id: ContractAddress
        ) -> Span<AvailableItem> {
            let world = self.world();
            let game = get!(world, game_id, (Game));
            let player = get!(world, (game_id, player_id), Player);

            let mut available: Array<AvailableItem> = array![];

            if !self.is_open(game_id, player_id) {
                return available.span();
            };

            let mut player_items = get_items_for_player(world, game_id, player_id);

            loop {
                match player_items.pop_front() {
                    Option::Some(item) => {
                        if (item.times_upgraded >= MAX_UPGRADE_COUNT) {
                            continue;
                        };

                        let (_, upgrade_cost) = getStatValueAndCost(
                            item.stat, item.tier.nextTier()
                        );

                        available
                            .append(
                                AvailableItem {
                                    slot: item.slot,
                                    name: item.name.name(),
                                    upgrade_name: item.name.nextUpgradeName(item.times_upgraded),
                                    upgrade_cost: upgrade_cost / SCALING_FACTOR,
                                    impacting_stat: item.stat,
                                }
                            );
                    },
                    Option::None => { break; },
                };
            };

            available.span()
        }
    }
}

