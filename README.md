<h1>NFT Marketplace - Admin</h1>

![tw-banner](https://github.com/VanChung369/admin/blob/develop/public/assets/image.png)

## Introduction

The Admin Panel is a powerful dashboard that allows administrators to manage NFTs, collections, sales transactions, and system-wide configurations.

## ✨ Features

- 🔑 Admin Authentication - Secure login for admin users.
- 📦 Manage NFTs - View, create, edit, or delete NFTs on the marketplace.
- 🖼 Manage Collections - Create, modify, and remove NFT collections.
- 🏷 Manage Tags - Add, update, or delete tags for better categorization.
- 💰 Manage Sales Orders - Monitor and control all NFT buy/sell transactions.
- 📊 View Revenue Reports - Track total earnings, transaction history, and user activity.
- 🔔 User Notifications - View and manage messages or alerts from users.
- ...

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

- `PORT` - Your app port.
- `UMI_APP_PUBLIC_DOMAIN_ADMIN` - Your domain admin.
- `UMI_APP_PUBLIC_DOMAIN_USER` - Your domain user.
- `UMI_APP_PUBLIC_TEMPLATE_CLIENT_ID` - Client ID for thirdweb API.
- `UMI_APP_CHAIN_ID` - Blockchain chain ID.
- `UMI_APP_RPC` - RPC URL for interacting with the blockchain.
- `UMI_APP_API_URL` - Backend API endpoint.
- `UMI_APP_ERC_721` - Smart contract address for ERC-721 NFTs.
- `UMI_APP_ERC_1155` - Smart contract address for ERC-1155 NFTs.
- `NEXT_PUBLIC_ERC_20` - ERC-20 token contract address for transactions.
- `UMI_APP_PROXY_ADDRESS` - Proxy contract address.
- `UMI_APP_MAX_PER_TRANSACTIONS` - Number max per transactions.

To learn how to create a client ID, refer to the [client documentation](https://portal.thirdweb.com/typescript/v5/client).

## 📦 Run locally

using node js 18 or later. I recommend you using node js 20

Install dependencies

```bash
yarn install # or npm install
```

Start development server

```bash
yarn start:dev # or npm run start:dev
```

Create a production build

```bash
yarn build # or npm run build
```

Preview the production build

```bash
yarn start # or npm run start
```

## Need help?

- git for user - https://github.com/VanChung369/user
