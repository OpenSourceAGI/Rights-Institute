export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  problem: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}