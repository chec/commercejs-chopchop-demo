<p align="center">
  <img src="https://raw.githubusercontent.com/chec/commercejs-examples/master/assets/logo.svg" width="380" height="100" />
</p>
<p align="center">
A Next.js, Commerce.js, Stripe, and Vercel powered, open source storefront, cart and checkout experience.
</p>

<p align="center">
  <a href="https://github.com/chec/commercejs-chopchop-demo/blob/main/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@chec/commerce.js.svg" alt="License" />
  </a>
  <br>
  <a href="https://commercejs.com">commercejs.com</a> | <a href="https://twitter.com/commercejs">@commercejs</a> | <a href="http://slack.commercejs.com">Slack</a>
  <br />
  <br />
  <a href="https://commercejs-chopchop-demo.vercel.app">
    <img src="https://cdn.chec.io/email/assets/marketing/chec-demo-btn_gray.svg" alt="View demo" />
  </a>
  <br />
  <br />
  <a href="https://commercejs-chopchop-demo.vercel.app">
    <img src="https://images.ctfassets.net/u77gi3ejnmxq/60D21gkBJHgH9YI3bizA3Q/c81183ac0cccb0ece6547da5021dc8b9/Group_558.png" alt="View demo" width="600" />
  </a>
</p>

## Introduction

ChopChop is our beautifully designed, elegantly developed demo store and starter kit that sells fine tools for thoughtful cooks. We’ve created a premium brand with a commerce experience to match. Read more about this resource on the [Commerce.js blog](https://commercejs.com/blog/chopchop-nextjs-starter-commerce/).


## 🥞 ChopChop Stack

* [Next.js](https://nextjs.org/)
* [Commerce.js](https://commercejs.com)
* [Tailwind CSS](https://tailwindcss.com/)
* [Stripe](https://stripe.com)
* [Vercel](https://vercel.com/)

## Live demo

Check out https://commercejs-chopchop-demo.vercel.app to see this project in action.

## Getting started

### Use the Chec CLI

You can use the [Chec CLI](https://github.com/chec/cli) to quickly and easily install demo stores like this, and also
to install sample data into your account. To install the Chec CLI, run `npm install -g @chec/cli` (or `yarn global add @chec/cli`).

* Navigate to your projects folder: `cd ~/Projects`
* Install the ChopChop demo store: `chec demo-store`
  * Choose "Chop Chop demo store (Next.js)" from the list
  * This will install dependencies and sample data, then start your dev server
  * Stop the server, open `.env` and add your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` for using Stripe, then re-run `npm run dev`
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
To install sample data, first copy `.env.example` to `.env`, then edit `.env` and fill out the
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

### Deploying to Vercel (with one click)

The one-click deploy allows you to add the Vercel application to your GitHub account to clone this repository and deploy it automatically. Be sure to go to [Vercel](https://vercel.com/signup) and sign up for an account with Github, GitLab, or GitBucket before clicking the deploy button.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/chec/commercejs-chopchop-demo)

Please make sure that you enter the required environment variables listed above during deployment.

#### Caveats for sample data

To make your ChopChop experience even better, there are a couple of things you can do that are not included with
the sample data:

* **Add related products:** Go into the [Chec Dashboard](https://dashboard.chec.io) and set related products for each
  of your new products. This helps to provide upsell suggestions on your website.
* **Set up shipping rates:** Also in the dashboard, set up some shipping zones and rates in Settings > Shipping, then
  enable them on each of your products. This will enable the "Shipping" checkout screen, and allow you to charge
  shipping for your customers as well.

## Customizations and Extendability 

- Integrate another payment gateway, either one of our supported gateways or your own with our [manual gateway API](https://commercejs.com/docs/guides/manual-payment-integration)
- Integrate with the Google Calendar API to automatically add ticketed items to a customer’s calendars
- Suggest products from other sources based on items purchased, i.e. a book on knife skills if you buy the knife set
- Add [Algolia](https://www.algolia.com/) for integrated search
- Add additional modules to the checkout flow to handle other content types, like booking a time to pickup in-store purchases
- Integrate with a headless CMS to make the content editable
- Create a customers login section using our [customers endpoint](https://commercejs.com/docs/api/#customers)
- Use webhooks to deliver SMS notifications about orders

## License

This project is licensed under [BSD-3-Clause](LICENSE.md).
