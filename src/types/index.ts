export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  isError?: boolean;
}