import { PeriodType, PricingPlanType } from "./data"
import { CheckIcon } from "../../shared/ui/icons"
import Link from "next/link"
import { routes } from "../../shared/utils/helpers"

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
    <div className={`border p-8 flex flex-col justify-between ${className}`}>
      <div>
        <div className="text-center mb-5">
          <h2 className=" text-4xl font-medium">{title}</h2>
          <p className=" text-gray-400 mt-3">{description}</p>
        </div>

        <div>
          <h3 className="text-5xl font-medium inline mr-5">
            ${period == "annually" ? price.annually : price.monthly}
            <span className=" text-gray-400 text-lg font-normal">
              /{period == "annually" ? "year" : "month"}
            </span>
          </h3>
          {annualSale && period == "annually" ? (
            <h3 className="text-gray-400 inline">
              <span className="text-3xl line-through">${annualSale}</span>
              <span className="text-lg font-normal">/year</span>
            </h3>
          ) : (
            <></>
          )}
        </div>

        <ul className="mt-7 gap-2 flex flex-col">
          <span className=" text-gray-400">Get started with:</span>
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
        className="w-full border text-center border-blue-300 text-blue-700 py-3 mt-10"
      >
        Get Started
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
    <div className=" my-7">
      <div className="text-[#21a500] text-center font-medium lg:hidden mb-3">
        Get free 2 months when you pay annually
      </div>
      <div className="flex gap-10 justify-center">
        <div className="flex-1 text-right ">
          <span className="text-[#21a500] mr-5 lg:inline font-medium hidden">
            Get free 2 months when you pay annually
          </span>
          <span
            className={period == "annually" ? "underline cursor-pointer " : "cursor-pointer"}
            onClick={() => setPeriod("annually")}
          >
            Annually
          </span>
        </div>
        <div className="flex-1">
          <span
            className={period == "monthly" ? "underline cursor-pointer" : "cursor-pointer"}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </span>
        </div>
      </div>
    </div>
  )
}
