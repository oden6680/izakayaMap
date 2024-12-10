import axios from 'axios';
import * as cheerio from 'cheerio';

export const getAddressFromURL = async (url: string): Promise<string> => {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const address = $('セレクタ').text().trim();

  return address;
};
