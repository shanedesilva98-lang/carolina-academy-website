export interface FAQ {
  id: string;
  question: string;
  answer: string;
  topic: "general" | "courses" | "pastry-bakery" | "study-abroad" | "south-korea" | "visa" | "fees" | "contact";
}
