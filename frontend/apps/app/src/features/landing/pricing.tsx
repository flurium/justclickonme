import { useState } from "react"
import { PeriodSwitch, PricingPlan, businessPlan, hobbyPlan, PeriodType, proPlan } from "../pricing"

export const Pricing = ({ className }: { className: string }) => {
  const [period, setPeriod] = useState<PeriodType>("annually")

  return (
    <section className={className} id="pricing">
      <h1 className="text-4xl text-center lg:text-6xl font-bold mt-12">Pricing</h1>

      <div className="flex justify-center">
        <PeriodSwitch period={period} setPeriod={setPeriod} />
      </div>

      <div className="grid  lg:grid-cols-3 lg:gap-10">
        <PricingPlan period={period} plan={hobbyPlan} className="mt-10" />

        <div className=" order-first lg:order-none">
          <div className="bg-white rounded-lg text-slate-900 mb-2 h-8 flex justify-center items-center ">
            most popular
          </div>
          <PricingPlan period={period} annualSale={84} plan={proPlan} />
        </div>

        <PricingPlan period={period} plan={businessPlan} className="mt-10" annualSale={300} />
      </div>
    </section>
  )
}
