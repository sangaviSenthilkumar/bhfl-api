require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const FULL_NAME = process.env.FULL_NAME || 'john doe';
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '01011990';
const EMAIL = process.env.EMAIL || 'john@example.com';
const ROLL_NO = process.env.ROLL_NO || 'ROLL123';

const isDigits = (s) => /^[0-9]+$/.test(s);
const isAlpha  = (s) => /^[A-Za-z]+$/.test(s);

function buildConcatString(letterChars) {
  const joined = letterChars.join('');
  const rev = joined.split('').reverse();
  return rev.map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join('');
}

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body && req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "'data' must be an array" });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const letterChars = [];
    let sum = BigInt(0);

    for (const item of data) {
      const s = String(item);
      if (s.length === 0) continue;
      if (isDigits(s)) {
        const n = BigInt(s);
        if (n % BigInt(2) === BigInt(0)) even_numbers.push(s);
        else odd_numbers.push(s);
        sum += n;
      } else if (isAlpha(s)) {
        const upper = s.toUpperCase();
        alphabets.push(upper);
        for (const ch of upper) letterChars.push(ch);
      } else {
        special_characters.push(s);
      }
    }

    const payload = {
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase().trim().split(/\s+/).join('_')}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NO,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string: buildConcatString(letterChars)
    };

    return res.status(200).json(payload);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

app.get('/', (_req, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
