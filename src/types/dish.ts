export interface Dish {
    id: string;
    name: string;
    price: number;
    sharedBy: string[]; // IDs гостей, которые участвуют в оплате
}