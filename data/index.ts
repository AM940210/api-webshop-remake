/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  id: string;
  articleNumber: string;
  articleColorSize?: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    articleNumber: "A1001",
    articleColorSize: "Coral Red Marl/One Size",
    image: "/assets/images/1.jpg.webp",
    title: "Vital Seamless 2.0",
    description: "Vital Seamless 2.0 - Coral Red MarlGe din träning en stilfull boost med detta set i en livlig korallröd nyans. Den sömlösa designen erbjuder maximal komfort och rörelsefrihet, perfekt för allt från gympass till vardagsaktiviteter.",
    price: 549,
  },
  {
    id: "2",
    articleNumber: "A1002",
    articleColorSize: "Black",
    image: "/assets/images/2.jpg.webp",
    title: "Small Holdall",
    description: "Small Holdall - BlackEn stilren och praktisk träningsväska i svart. Perfekt för gymmet eller kortare resor, med ett rymligt huvudfack och bekväma handtag. Enkel och funktionell design som passar alla tillfällen.",
    price: 499,
  },
  {
    id: "3",
    articleNumber: "A1003",
    articleColorSize: "Rest Blue/One Size",
    image: "/assets/images/3.jpg.webp",
    title: "Crest T-Shirt",
    description: "Crest T-Shirt - Rest BlueEn stilren och bekväm t-shirt i en lugnande blå nyans. Perfekt för både träning och vardagsbruk, med en klassisk passform och mjukt material för maximal komfort.",
    price: 249,
  },
  {
    id: "4",
    articleNumber: "A1004",
    articleColorSize: "Light Blue",
    image: "/assets/images/4.jpg.webp",
    title: "1L Water Bottle",
    description: "1L Water Bottle - Light BlueHåll dig hydrerad under träningen med denna stilrena vattenflaska i ljusblått. Rymmer 1 liter och har ett smidigt handtag samt en robust skruvkork. Perfekt för gymmet eller vardagen.",
    price: 99,
  },
  {
    id: "5",
    articleNumber: "A1005",
    articleColorSize: "Grey & Pink/One Size",
    image: "/assets/images/5.jpg.webp",
    title: "Apex Long Top",
    description: "En snygg och funktionell långärmad topp i grått med rosa detaljer. Designad för att ge både stil och komfort under träningen, med ett unikt utskuret mönster framtill. Perfekt för en aktiv livsstil!",
    price: 439,
  },
   {
    id: "6",
    articleNumber: "A1006",
    articleColorSize: "Black/One Size",
    image: "/assets/images/6.jpg.webp",
    title: "Geo T-Shirt",
    description: "Geo T-Shirt - Black/Charcoal GreyEn stilren och funktionell t-shirt i svart och mörkgrått, designad för att ge optimal rörelsefrihet och komfort under träningen. Med ett diskret mönster och en atletisk passform passar den både på gymmet och till vardags.",
    price: 399,
  },
  // {
  //   id: "7",
  //   articleNumber: "A1005",
  //   image: "/assets/images/addnewitem.jpg.webp",
  //   title: "4K Monitor",
  //   description: "Stunning 4K resolution monitor with HDR support.",
  //   price: 3000,
  // },
];