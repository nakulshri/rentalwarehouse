export type ProductType = {
  id: number;
  name: string;
  description: string;
  image: string;
  rentalPrice: number;
  salePrice: number;
  category: string;
};

export const products: ProductType[] = [
  {
    id: 1,
    name: "Crystal Chandelier",
    description: "Elegant crystal lighting fixture for premium events",
    image: "https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    rentalPrice: 299,
    salePrice: 1299,
    category: "lighting"
  },
  {
    id: 2,
    name: "Gold Rimmed Plates",
    description: "Luxurious dinnerware set with gold accents",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    rentalPrice: 89,
    salePrice: 299,
    category: "crockery"
  },
  {
    id: 3,
    name: "Vintage Stage Backdrop",
    description: "Classic wooden backdrop for photo sessions",
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    rentalPrice: 450,
    salePrice: 2199,
    category: "stages"
  },
  {
    id: 4,
    name: "Floral Centerpieces",
    description: "Beautiful seasonal flower arrangements",
    image: "https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    rentalPrice: 125,
    salePrice: 399,
    category: "decor"
  },
  {
    id: 5,
    name: "LED Strip Lighting",
    description: "Customizable ambient lighting solution",
    image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    rentalPrice: 199,
    salePrice: 799,
    category: "lighting"
  },
  {
    id: 6,
    name: "Silver Cutlery Set",
    description: "Professional grade silverware collection",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    rentalPrice: 75,
    salePrice: 249,
    category: "crockery"
  }
]; 