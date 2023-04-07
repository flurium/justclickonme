type Benefit = {
  icon: string
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: "#",
    title: "Memorable",
    description:
      "Links look like usual sentences. As a result, people can easily understand and keep them in mind.",
  },
  {
    icon: "!!!",
    title: "Encourage to click",
    description:
      'Our domain is excellent for creators to get attention. Because it calls to action: "Just click on me!"',
  },
  {
    icon: "</>",
    title: "Developer friendly",
    description:
      "We put effort to provide a good developer experience. In the future, there will be libraries for popular languages. Or communicate through API.",
  },
  {
    icon: "( )",
    title: "Open Source",
    description:
      "It's about trust. Anyone can look at our code and be sure that we don't do anything harmful to your information. You can even help us to improve service or suggest an idea!",
  },
]

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  return (
    <div className="px-8 py-6 bg-slate-900/50 rounded-lg">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-4xl">{benefit.icon}</span>
        <h3 className="text-2xl font-medium">{benefit.title}</h3>
      </div>

      <p>{benefit.description}</p>
    </div>
  )
}

export const Benefits = ({ className }: { className?: string }) => {
  return (
    <section className={className} id="benefits">
      <h2 className="text-center text-5xl font-bold mb-14">Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </section>
  )
}
