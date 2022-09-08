import { Item } from '../instances/sequelize';

export class ItemService {
    static get itemAttributes() {
        return ['id', 'name', 'description', 'eta', 'price', 'status'];
    }
    private static _item;
    static get item() {
        return ItemService._item;
    }

    add({ id, parlorId, name, description, category, eta, price, status }: any) {
        if (!name || !parlorId || !eta || !price) return null;
        return Item.create({
            id,
            parlorId,
            name,
            description,
            category,
            eta,
            price,
            status,
        }).then((u) => this.getItemById(u!.id));
    }

    read({ parlorId, offset, limit }: any) {
        return Item.findAll({
            where: { parlorId: parlorId },
            attributes: ItemService.itemAttributes,
            offset: offset || 0,
            limit: limit || 10,
        });
    }

    getItemById(id: string) {
        return Item.findByPk(id, {
            attributes: ItemService.itemAttributes,
        });
    }
}
