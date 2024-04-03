export default async function handler(req, res) {
  if (req.method !== 'POST') {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    console.log(req.body);

    const crypto = require('crypto');

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    console.log(digest, req.headers['x-razorpay-signature']);

    if (digest === req.headers['x-razorpay-signature']) {
      console.log('request is legit');
      // process it
      console.log(req.body);
    } else {
      // pass it
    }
    res.json({ status: 'ok' });
  }
  res.status(405).json({ message: 'Method not allowed' });
}
