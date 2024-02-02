use rollyourown::models::itemNew::{ItemTier, ItemSlot, ItemNew};
use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
struct PowerStats {
    base_dmg_tier: u8,
    current_dmg_tier: u8,
    base_def_tier: u8,
    current_def_tier: u8,
    base_spd_tier: u8,
    current_spd_tier: u8,
    base_inv_tier: u8,
    current_inv_tier: u8,
}

#[starknet::interface]
trait IProfile<TContractState> {
    fn get_power_stats(
        self: @TContractState, game_id: u32, player_id: ContractAddress
    ) -> PowerStats;
}

#[dojo::contract]
mod profile {
    use starknet::ContractAddress;
    use super::{IProfile, PowerStats};
    use rollyourown::models::itemNew::{ItemTierIntoU8, ItemSlot, ItemNew};

    #[external(v0)]
    impl ProfileImpl of IProfile<ContractState> {
        fn get_power_stats(
            self: @ContractState, game_id: u32, player_id: ContractAddress
        ) -> PowerStats {
            let world = self.world();

            let weapon = get!(world, (game_id, player_id, ItemSlot::Weapon), (ItemNew));
            let base_dmg_tier: u8 = weapon.tier.into();
            let shirt = get!(world, (game_id, player_id, ItemSlot::Shirt), (ItemNew));
            let base_def_tier: u8 = shirt.tier.into();
            let shoe = get!(world, (game_id, player_id, ItemSlot::Shoe), (ItemNew));
            let base_spd_tier: u8 = shoe.tier.into();
            let bag = get!(world, (game_id, player_id, ItemSlot::Bag), (ItemNew));
            let base_inv_tier: u8 = bag.tier.into();

            PowerStats {
                base_dmg_tier,
                current_dmg_tier: base_dmg_tier + weapon.times_upgraded,
                base_def_tier,
                current_def_tier: base_def_tier + shirt.times_upgraded,
                base_spd_tier,
                current_spd_tier: base_spd_tier + shoe.times_upgraded,
                base_inv_tier,
                current_inv_tier: base_inv_tier + bag.times_upgraded,
            }
        }
    }
}
