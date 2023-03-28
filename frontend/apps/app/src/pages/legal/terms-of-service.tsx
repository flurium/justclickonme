import { Navbar, GetStartedFooter, NavFooter } from "../../components/nav"
import Head from "next/head"

const TermsOfService = () => {
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
        <h1 className="m-auto my-16 text-center text-5xl lg:text-7xl font-black max-w-3xl">
          Terms of Service
        </h1>

        <div className="max-w-3xl m-auto">
          <h2 className="text-3xl font-semibold mb-3">1. Terms</h2>

          <p className="mb-10">
            By accessing this Website, accessible from https://app.justclickon.me, you are agreeing
            to be bound by these Website Terms and Conditions of Use and agree that you are
            responsible for the agreement with any applicable local laws. If you disagree with any
            of these terms, you are prohibited from accessing this site. The materials contained in
            this Website are protected by copyright and trade mark law.
          </p>

          <h2 className="text-3xl font-semibold mb-3">2. Use License</h2>

          <p className="mb-5">
            Permission is granted to temporarily download one copy of the materials on JustClickOnMe
            {"'"}s Website for personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you may not:
          </p>

          <ul className="list-disc ml-10">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>
              attempt to reverse engineer any software contained on JustClickOnMe{"'"}s Website
            </li>
            <li>remove any copyright or other proprietary notations from the materials</li>
            <li>
              transferring the materials to another person or {'"'}mirror{'"'} the materials on any
              other server.
            </li>
          </ul>

          <p className="mb-10 mt-5">
            This will let JustClickOnMe to terminate upon violations of any of these restrictions.
            Upon termination, your viewing right will also be terminated and you should destroy any
            downloaded materials in your possession whether it is printed or electronic format.
            These Terms of Service has been created with the help of the{" "}
            <a href="https://www.termsfeed.com/terms-service-generator/">
              Terms Of Service Generator
            </a>
            .
          </p>

          <h2 className="text-3xl font-semibold mb-3">3. Disclaimer</h2>

          <p className="mb-10">
            All the materials on JustClickOnMe{"'"}s Website are provided {'"'}as is{'"'}.
            JustClickOnMe makes no warranties, may it be expressed or implied, therefore negates all
            other warranties. Furthermore, JustClickOnMe does not make any representations
            concerning the accuracy or reliability of the use of the materials on its Website or
            otherwise relating to such materials or any sites linked to this Website.
          </p>

          <h2 className="text-3xl font-semibold mb-3">4. Limitations</h2>

          <p className="mb-10">
            JustClickOnMe or its suppliers will not be hold accountable for any damages that will
            arise with the use or inability to use the materials on JustClickOnMe{"'"}s Website,
            even if JustClickOnMe or an authorize representative of this Website has been notified,
            orally or written, of the possibility of such damage. Some jurisdiction does not allow
            limitations on implied warranties or limitations of liability for incidental damages,
            these limitations may not apply to you.
          </p>

          <h2 className="text-3xl font-semibold mb-3">5. Revisions and Errata</h2>

          <p className="mb-10">
            The materials appearing on JustClickOnMe{"'"}s Website may include technical,
            typographical, or photographic errors. JustClickOnMe will not promise that any of the
            materials in this Website are accurate, complete, or current. JustClickOnMe may change
            the materials contained on its Website at any time without notice. JustClickOnMe does
            not make any commitment to update the materials.
          </p>

          <h2 className="text-3xl font-semibold mb-3">6. Links</h2>

          <p className="mb-10">
            JustClickOnMe has not reviewed all of the sites linked to its Website and is not
            responsible for the contents of any such linked site. The presence of any link does not
            imply endorsement by JustClickOnMe of the site. The use of any linked website is at the
            user{"'"}s own risk.
          </p>

          <h2 className="text-3xl font-semibold mb-3">7. Site Terms of Use Modifications</h2>

          <p className="mb-10">
            JustClickOnMe may revise these Terms of Use for its Website at any time without prior
            notice. By using this Website, you are agreeing to be bound by the current version of
            these Terms and Conditions of Use.
          </p>

          <h2 className="text-3xl font-semibold mb-3">8. Your Privacy</h2>

          <p className="mb-10">Please read our Privacy Policy.</p>

          <h2 className="text-3xl font-semibold mb-3">9. Governing Law</h2>

          <p className="mb-10">
            Any claim related to JustClickOnMe{"'"}s Website shall be governed by the laws of ua
            without regards to its conflict of law provisions.
          </p>
        </div>

        <GetStartedFooter />
        <NavFooter />
      </main>
    </>
  )
}

export default TermsOfService
