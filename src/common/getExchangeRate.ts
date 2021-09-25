import { ExchangeRate } from "../domain/ExchangeRate";

const getExchangeRate = async (coin: string): Promise<ExchangeRate> => {
  const resposne = await fetch(`https://bitpay.com/api/rates/${coin}/USD `);
  const data = await resposne.json();

  return data;
};

export default getExchangeRate;
