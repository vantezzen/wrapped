"use client";
import LegalPage from "@/components/LegalPage";
import Head from "next/head";
import React from "react";

function Terms() {
  return (
    <LegalPage>
      <Head>
        <title>Wrapped for TikTok - Data Donation Policy</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Data Donation Policy</h1>
        <p className="mb-4">
          Welcome to Wrapped for TikTok. This Data Donation Policy explains how
          we handle the data you choose to donate to us. By clicking the "Donate
          Data" button, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
        <p className="mb-4">
          When you choose to donate your data, we collect the TikTok usage data
          you've uploaded to our service. This may include, but is not limited
          to, viewing history, interaction data, and account information.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Use of Data</h2>
        <p className="mb-4">
          We may use the donated data for:
          <ul className="list-disc pl-5 mb-2">
            <li>Research purposes</li>
            <li>Improving our services</li>
            <li>Sharing with third-party researchers (in anonymized form)</li>
          </ul>
          Your data will always be anonymized before being used for these
          purposes.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          3. Data Storage and Security
        </h2>
        <p className="mb-4">
          We store your donated data on secure servers in the European Union and
          implement appropriate technical and organizational measures to protect
          it against unauthorized access, alteration, disclosure, or
          destruction.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
        <p className="mb-4">
          We may share anonymized data with third-party researchers. We will
          never sell your personal data or share it in a non-anonymized form
          without your explicit consent.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p className="mb-4">
          Under GDPR and other applicable laws, you have the right to:
          <ul className="list-disc pl-5 mb-2">
            <li>Access your donated data</li>
            <li>Request correction of your data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw your consent at any time</li>
          </ul>
          To exercise these rights, please contact us at wrapped@vantezzen.io.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
        <p className="mb-4">
          We will retain your donated data indefinitely unless you request its
          deletion.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          7. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Data Donation Policy from time to time. We will
          notify you of any changes by posting the new policy on this page.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Consent</h2>
        <p className="mb-4">
          By clicking the "Donate Data" button, you consent to the collection,
          use, and sharing of your data as described in this policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Disclaimer</h2>
        <p className="mb-4">
          While we take all reasonable precautions to protect your data, we
          cannot guarantee its absolute security. In the event of a data breach,
          we will notify affected users and relevant authorities as required by
          law.
        </p>

        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Data Donation Policy, please
          contact us at wrapped@vantezzen.io.
        </p>
      </div>
    </LegalPage>
  );
}

export default Terms;
