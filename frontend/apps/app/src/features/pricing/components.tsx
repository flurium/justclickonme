import { PeriodType, PricingPlanType } from "./data"
import { CheckIcon } from "../../shared/ui/icons"
import Link from "next/link"
import { routes } from "../../shared/utils/helpers"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export const PricingPlan = ({
  className,
  period,
  annualSale,
  plan: { price, title, description, features },
}: {
  className?: string
  plan: PricingPlanType
  annualSale?: number
  period: PeriodType
}) => {
  return (
    <div className={` bg-slate-900/50 rounded-lg p-8 flex flex-col justify-between  ${className}`}>
      <div>
        <div className="text-center">
          <h2 className=" text-4xl font-bold">{title}</h2>
          <p className="mt-3 text-white/75">{description}</p>
        </div>

        <div className="my-8">
          <h3 className="text-5xl font-medium inline mr-5">
            ${period == "annually" ? price.annually : price.monthly}
            <span className=" text-white/50 text-lg font-normal">
              /{period == "annually" ? "year" : "month"}
            </span>
          </h3>
          {annualSale && period == "annually" ? (
            <h3 className=" inline">
              <span className="text-3xl line-through">${annualSale}</span>
              <span className="text-lg text-white/50 font-normal">/year</span>
            </h3>
          ) : (
            <></>
          )}
        </div>

        <ul className="mt-7 gap-3 flex flex-col">
          <span className=" text-white/50">Get started with:</span>
          {features.map((feature) => (
            <li key={feature}>
              <CheckIcon className="inline mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={routes.auth}
        className="w-full border-2 text-center border-white rounded-lg py-3 mt-10"
      >
        GET STARTED
      </Link>
    </div>
  )
}

export const PeriodSwitch = ({
  period,
  setPeriod,
}: {
  period: PeriodType
  setPeriod: (val: PeriodType) => void
}) => {
  return (
    <div className="my-7 border-white border-2 p-2 rounded-lg w-fit">
      <div className="flex gap-2 justify-center">
        <div className="flex-1 text-right ">
          <button
            className={`px-5 py-3 rounded-lg ${period == "annually" ? "bg-slate-900" : ""}`}
            onClick={() => setPeriod("annually")}
          >
            Annually
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`px-5 py-3 rounded-lg ${period == "monthly" ? "bg-slate-900" : ""}`}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
    </div>
  )
}
