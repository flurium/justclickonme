import { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { Navbar, NavFooter } from "../components/nav"
import {
  PeriodSwitch,
  PricingPlan,
  businessPlan,
  hobbyPlan,
  PeriodType,
  proPlan,
} from "../features/pricing"

const PricingPage: NextPage = () => {
  const [period, setPeriod] = useState<PeriodType>("annually")

  return (
    <>
      <Head>
        <title>Predictable pricing, no surprises | JustClickOnMe</title>
        <meta name="description" content="Predictable pricing, no surprises at JustClickOnMe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mt-12">Pricing</h1>
          <p className="text-xl mt-5 text-gray-400">Predictable pricing, no surprises</p>
        </div>

        <PeriodSwitch period={period} setPeriod={setPeriod} />

        <div className="grid  lg:grid-cols-3 lg:gap-10">
          <PricingPlan period={period} plan={hobbyPlan} className="mt-8" />

          <div className=" order-first lg:order-none">
            <div className="bg-[#21a500] text-white h-8 flex justify-center items-center ">
              Most popular
            </div>
            <PricingPlan
              period={period}
              annualSale={84}
              plan={proPlan}
              className="border-[#21a500]"
            />
          </div>

          <PricingPlan period={period} plan={businessPlan} className="mt-8" annualSale={300} />
        </div>

        <NavFooter />
      </main>
    </>
  )
}

export default PricingPage
