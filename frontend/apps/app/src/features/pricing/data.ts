export type PricingPlanType = {
  title: string
  description: string
  price: {
    monthly: number
    annually: number
  }
  features: string[]
}

export type PeriodType = "annually" | "monthly"

export const hobbyPlan = {
  title: "Hobby",
  description: "Perfect to get started, look features and build trust.",
  price: {
    monthly: 0,
    annually: 0,
  },
  features: ["Up to 15 links/month", "Customer support"],
}

export const proPlan = {
  title: "Pro",
  description:
    "For professional creators, developers or any person who wants to get the full potential.",
  price: {
    monthly: 7,
    annually: 70,
  },
  features: ["Up to 250 links/month", "Top level links", "Customer support"],
}

export const businessPlan = {
  title: "Business",
  description: "Plan for business or any person who wants to get unlimited in the usage.",
  price: {
    monthly: 25,
    annually: 250,
  },
  features: ["Up to unlimited links/month", "Top level links", "Customer support"],
}
