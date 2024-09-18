# Vinu Shitcoin Lab
Vinu Shitcoin Lab is a service for creating and managing tokens on the Vinu network. It provides great flexibility,
and ease, because you don`t need to know how to code to make your token. The website is available [here](https://vinushitcoinlab.com/).


## License & contributing


This program is distributed under Apache License 2.0, [see license file](LICENSE.md).
All forms of contributing are welcome.


## How to build it?


First, download and configure [PostgreSQL](https://www.postgresql.org/). Next create a database and execute
[script.sql](script.sql). Then in the main project folder create an .env file with the following variables:

```env
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_RPC_URL=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=
DB_NAME=
```

Remember to provide your data there.

Then run:

```bash
npm run dev
```

And that's all.