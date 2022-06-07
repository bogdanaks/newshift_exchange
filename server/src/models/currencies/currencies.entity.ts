import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'currencies' })
export class Currency {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    ticker: string

    @Column()
    name: string

    @Column()
    image: string

    @Column()
    has_external_id: boolean

    @Column()
    is_fiat: boolean

    @Column()
    featured: boolean

    @Column()
    is_stable: boolean

    @Column()
    supports_fixed_rate: boolean

    @Column()
    network: string

    @Column()
    token_contract: string

    @Column()
    buy: boolean

    @Column()
    sell: boolean

    @Column()
    legacy_ticker: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date
}
