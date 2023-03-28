import { Navbar, GetStartedFooter, NavFooter } from "../../components/nav"
import { routes } from "../../shared/utils/helpers"
import Head from "next/head"
import Link from "next/link"

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | JustClickOnMe</title>
        <meta name="description" content="Terms of Service for JustClickOnMe app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="m-auto my-16 text-center max-w-3xl">
          <h1 className="text-5xl lg:text-7xl font-black mb-8">Privacy Policy</h1>
          <div className="text-gray-500">
            *Made with{" "}
            <Link href={routes.shopifyPolicyGenerator} className="hover:underline ">
              Shopify privacy policy generator
            </Link>
          </div>
        </div>

        <div className="max-w-3xl m-auto">
          <p className="mb-10">
            This Privacy Policy describes how your personal information is collected, used, and
            shared when you visit or make a purchase from app.justclickon.me (the “Site”).
          </p>
          <h2 className="text-3xl font-semibold mb-3">1. Personal information we collect</h2>
          <p className="mb-10">
            When you visit the Site, we automatically collect certain information about your device,
            including information about your web browser, IP address, time zone, and some of the
            cookies that are installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that you view, what
            websites or search terms referred you to the Site, and information about how you
            interact with the Site. We refer to this automatically-collected information as “Device
            Information.” We collect Device Information using the following technologies: -
            “Cookies” are data files that are placed on your device or computer and often include an
            anonymous unique identifier. For more information about cookies, and how to disable
            cookies, visit http://www.allaboutcookies.org. - “Log files” track actions occurring on
            the Site, and collect data including your IP address, browser type, Internet service
            provider, referring/exit pages, and date/time stamps. - “Web beacons,” “tags,” and
            “pixels” are electronic files used to record information about how you browse the Site.
            Additionally when you make a purchase or attempt to make a purchase through the Site, we
            collect certain information from you, including your email address. We refer to this
            information as “Order Information.” When we talk about “Personal Information” in this
            Privacy Policy, we are talking both about Device Information and Order Information.
          </p>
          <h2 className="text-3xl font-semibold mb-3">
            2. How do we use your personal information?
          </h2>
          <p className="mb-10">
            We use the Order Information that we collect generally to fulfill any orders placed
            through the Site (including processing your payment information, arranging for shipping,
            and providing you with invoices and/or order confirmations). Additionally, we use this
            Order Information to: Communicate with you; Screen our orders for potential risk or
            fraud; and When in line with the preferences you have shared with us, provide you with
            information or advertising relating to our products or services. We use the Device
            Information that we collect to help us screen for potential risk and fraud (in
            particular, your IP address), and more generally to improve and optimize our Site (for
            example, by generating analytics about how our customers browse and interact with the
            Site, and to assess the success of our marketing and advertising campaigns).
          </p>
          <h2 className="text-3xl font-semibold mb-3">3. Sharing your personal information</h2>
          <p className="mb-10">
            We share your Personal Information with third parties to help us use your Personal
            Information, as described above. Finally, we may also share your Personal Information to
            comply with applicable laws and regulations, to respond to a subpoena, search warrant or
            other lawful request for information we receive, or to otherwise protect our rights.
          </p>
          <h2 className="text-3xl font-semibold mb-3">4. Your rights</h2>
          <p className="mb-10">
            If you are a European resident, you have the right to access personal information we
            hold about you and to ask that your personal information be corrected, updated, or
            deleted. If you would like to exercise this right, please contact us through the contact
            information below. Additionally, if you are a European resident we note that we are
            processing your information in order to fulfill contracts we might have with you (for
            example if you make an order through the Site), or otherwise to pursue our legitimate
            business interests listed above. Additionally, please note that your information will be
            transferred outside of Europe, including to Canada and the United States.
          </p>
          <h2 className="text-3xl font-semibold mb-3">5. Data retention</h2>
          <p className="mb-10">
            When you place an order through the Site, we will maintain your Order Information for
            our records unless and until you ask us to delete this information.
          </p>
          <h2 className="text-3xl font-semibold mb-3">6. Changes</h2>
          <p className="mb-10">
            We may update this privacy policy from time to time in order to reflect, for example,
            changes to our practices or for other operational, legal or regulatory reasons.
          </p>
          <h2 className="text-3xl font-semibold mb-3">7. Contact us</h2>
          <p className="mb-10">
            For more information about our privacy practices, if you have questions, or if you would
            like to make a complaint, please contact us by e-mail at romankoshchei@gmail.com.
          </p>
        </div>

        <GetStartedFooter />
        <NavFooter />
      </main>
    </>
  )
}

export default Privacy
