import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session.isAdmin);
  console.log(session.isUpcycler);
  console.log(session);
  if (session) {
    res.send({
      content: 'Welcome to the secret page',
    });
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    });
  }
}
