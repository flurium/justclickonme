export const env = {
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  paddleVendorId: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID ?? "",
}

export const routes = {
  home: "/",
  auth: "/auth",
  manage: "/manage",
  pricing: "/pricing",
  benefits: "/#benefits",
  terms: "/legal/terms-of-service",
  policy: "/legal/privacy-policy",

  // my third-party
  github: "https://github.com/paragoda",
  discord: "https://discord.gg/8HnMGdfA",

  // third-party
  shopifyPolicyGenerator: "https://www.shopify.com/tools/policy-generator",
}

export const constants = {
  refreshTokenCookie: "freshme",
}
