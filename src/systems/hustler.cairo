use rollyourown::models::itemNew::ItemTier;

#[derive(Copy, Drop, Serde, Introspect, PartialEq)]
enum Hustler {
    Dragon,
    Monkey,
    Rabbit,
}

#[derive(Copy, Drop, Serde)]
struct Items {
    attackItem: felt252,
    defenseItem: felt252,
    transportItem: felt252,
    speedItem: felt252,
}

#[derive(Copy, Drop, Serde)]
struct InitialTiers {
    attackTier: ItemTier,
    defenseTier: ItemTier,
    transportTier: ItemTier,
    speedTier: ItemTier,
}

#[derive(Copy, Drop, Serde)]
struct AvailableHustlers {
    hustler: Hustler,
    items: Items,
    initialTiers: InitialTiers,
}


#[starknet::interface]
trait IHustler<TContractState> {
    fn get_available_hustlers(self: @TContractState) -> Span<AvailableHustlers>;
}

#[dojo::contract]
mod hustler {
    use super::{IHustler, AvailableHustlers, Hustler, InitialTiers, Items};

    use rollyourown::utils::settings::HustlerImplementation;
    use rollyourown::models::itemNew::ItemMetaImpl;

    #[external(v0)]
    impl HustlerImpl of IHustler<ContractState> {
        fn get_available_hustlers(self: @ContractState) -> Span<AvailableHustlers> {
            let mut hustlers = array![Hustler::Dragon, Hustler::Monkey, Hustler::Rabbit];

            let mut available: Array<AvailableHustlers> = array![];

            loop {
                match hustlers.pop_front() {
                    Option::Some(hustler) => {
                        let initialItems = hustler.get_initial_items();
                        let attackItem = initialItems.Attack.name();
                        let defenseItem = initialItems.Defense.name();
                        let transportItem = initialItems.Transport.name();
                        let speedItem = initialItems.Speed.name();
                        let attackTier = initialItems.Attack.initial_tier();
                        let defenseTier = initialItems.Defense.initial_tier();
                        let transportTier = initialItems.Transport.initial_tier();
                        let speedTier = initialItems.Speed.initial_tier();

                        let available_hustler = AvailableHustlers {
                            hustler,
                            items: Items { attackItem, defenseItem, transportItem, speedItem, },
                            initialTiers: InitialTiers {
                                attackTier, defenseTier, transportTier, speedTier,
                            },
                        };

                        available.append(available_hustler);
                    },
                    Option::None => { break; },
                };
            };

            available.span()
        }
    }
}

