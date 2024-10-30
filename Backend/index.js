
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

const apiKey = 'ff2ddf76-d5e9-45af-9e2e-6077469a22ae'; 


app.use(cors());


app.get('/cryptocurrencies', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: 1,
        limit: 100,
        convert: 'USD',
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });

    const topCryptos = response.data.data.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
    }));

    res.json(topCryptos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/convert', async (req, res) => {
  const { sourceCrypto, amount, targetCurrency } = req.query;

  if (!sourceCrypto || !amount || !targetCurrency) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const conversionRateResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
      params: {
        id: sourceCrypto,
        convert: targetCurrency,
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });

    const conversionRate = conversionRateResponse.data.data[sourceCrypto].quote[targetCurrency].price;
    const convertedAmount = amount * conversionRate;

    res.json({ convertedAmount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(` your Server is running on   http://localhost:${port}`);
});

console.log("connected");
