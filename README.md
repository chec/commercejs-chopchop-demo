<p align="center">
  <img src="https://raw.githubusercontent.com/chec/commercejs-examples/master/assets/logo.svg" width="380" height="100" />
</p>
<p align="center">
A beautifully designed, elegantly developed commerce demo. An open source storefront, cart and checkout experience.
</p>

<p align="center">
  <a href="https://github.com/chec/commercejs-chopchop-demo/blob/main/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@chec/commerce.js.svg" alt="License" />
  </a>
  <br>
  <a href="https://commercejs.com">commercejs.com</a> | <a href="https://twitter.com/commercejs">@commercejs</a> | <a href="http://slack.commercejs.com">Slack</a>
</p>

## Introduction

Chop Chop is built with the following technologies:

* [Next.js](https://nextjs.org/)
* [Commerce.js](https://commercejs.com)
* [Tailwind CSS](https://tailwindcss.com/)
* [Stripe](https://stripe.com)

## Live demo

Check out https://commercejs-chopchop-demo.vercel.app to see this project in action.

## Getting started

### Use the Chec CLI

You can use the [Chec CLI](https://github.com/chec/cli) to quickly and easily install demo stores like this, and also
to install sample data into your account. To install the Chec CLI, run `npm install -g @chec/cli` (or `yarn global add @chec/cli`).

* Navigate to your projects folder: `cd ~/Projects`
* Install the Chop Chop demo store: `chec demo-store`
  * Choose "Chop Chop demo store (Next.js)" from the list
  * This will install dependencies and sample data, then start your dev server
  * Stop the server, open `.env.local` and add your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` for using Stripe, then re-run `npm run dev`
* Open [http://localhost:3000](http://localhost:3000) and get started!

### Manual installation

Clone the project, then get started by installing the dependencies, and starting the dev server.

```
npm install
npm run dev
```

Once the server is running, open it up in your browser, start editing the code, and enjoy!

### Sample data

This repository comes with some sample products and images for you to use if you want to get up and running quickly.
To install sample data, first copy `.env.development` to `.env.local`, then edit `.env.local` and fill out the
following variables:

* `NEXT_PUBLIC_CHEC_PUBLIC_API_KEY`: Your Chec public/sandbox API key, available from the Chec Dashboard under
  Developers > API keys
* `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe test publishable key, available from the Stripe dashboard
* `CHEC_SECRET_KEY`: Your Chec secret API key, used for seeding

Once this is done, save and close your file. You can now run the seeder to install sample data:

```
npm run seed
...
✔ Completed seeding
Added:
  3 categories
  6 products
  9 assets
```

And you're ready to go!

#### Caveats for sample data

To make your Chop Chop experience even better, there are a couple of things you can do that are not included with
the sample data:

* **Add related products:** Go into the [Chec Dashboard](https://dashboard.chec.io) and set related products for each
  of your new products. This helps to provide upsell suggestions on your website.
* **Set up shipping rates:** Also in the dashboard, set up some shipping zones and rates in Settings > Shipping, then
  enable them on each of your products. This will enable the "Shipping" checkout screen, and allow you to charge
  shipping for your customers as well.

## License

This project is licensed under [BSD-3-Clause](LICENSE.md).
