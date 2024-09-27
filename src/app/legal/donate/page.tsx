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
          we handle the data you choose to donate. By clicking the "Donate Data"
          button, you consent to the collection, use, and sharing of your data
          as described below.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
        <p className="mb-4">
          By donating your data, you voluntarily provide us with your TikTok
          usage data, which may include, but is not limited to, your viewing
          history, interaction data (such as likes, comments, and shares), and
          account metadata (such as user ID or account statistics). Before any
          data is uploaded, we will automatically delete the following
          categories from your TikTok download to ensure your privacy:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Login History</li>
          <li>TikTok Location Data</li>
          <li>Search History</li>
          <li>Block List</li>
          <li>Direct Messages</li>
          <li>
            Personal Profile Data (e.g., Username, Phone Number, Email, Uploaded
            Videos)
          </li>
          <li>TikTok Shopping</li>
        </ul>
        <p className="mb-4">
          This deletion process occurs locally on your device before the data is
          uploaded, ensuring that non-anonymized or personally identifiable
          information never leaves your device.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Purpose of Data Use</h2>
        <p className="mb-4">
          The donated data will be used for the following purposes:
          <ul className="list-disc pl-5 mb-2">
            <li>Conducting academic and market research</li>
            <li>Enhancing our service offerings and user experience</li>
            <li>
              Collaborating with third-party researchers (data will be
              anonymized)
            </li>
            <li>
              Publishing aggregated findings and insights (in anonymized form)
            </li>
          </ul>
          Your data will never be used for purposes beyond those specified
          without your explicit consent, and all data will be anonymized prior
          to sharing.
        </p>
        <p className="mb-4">
          Although we take steps to anonymize the data, we cannot guarantee that
          it will be completely anonymous, especially if your comments or other
          content includes personal information. Therefore, we advise users to
          avoid including sensitive personal details in public interactions
          (such as comments).
        </p>

        <h2 className="text-xl font-semibold mb-2">
          3. Data Storage and Security
        </h2>
        <p className="mb-4">
          We employ industry-standard security protocols to safeguard your
          donated data. It is stored on secure servers located in the European
          Union, and we implement strict access controls to ensure that only
          authorized personnel can access the data. Despite these measures, no
          system can be completely secure, and we cannot guarantee absolute
          protection.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
        <p className="mb-4">
          We may share anonymized data with third-party researchers,
          organizations, and academic institutions. The data will never be sold
          or shared in a non-anonymized form unless required by law or with your
          explicit consent. Third parties receiving the data are required to
          comply with data protection standards and to use the data solely for
          research or related purposes.
        </p>
        <p className="mb-4">
          Additionally, we will associate general user location data (such as
          country and region, e.g., "USA, California") with the uploaded data
          based on the IP address used when donating. This general location
          information helps contextualize the data for research purposes.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p className="mb-4">
          In accordance with the GDPR and other applicable privacy laws, you
          have the following rights regarding your donated data:
          <ul className="list-disc pl-5 mb-2">
            <li>Right to access the data you have provided</li>
            <li>Right to correct any inaccuracies in your data</li>
            <li>Right to request deletion of your data</li>
            <li>
              Right to withdraw your consent for data donation at any time
            </li>
          </ul>
          To exercise these rights, please contact us at wrapped@vantezzen.io.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
        <p className="mb-4">
          Your data will be retained for as long as necessary for the purposes
          stated above, or until you request its deletion. If you withdraw your
          consent, we will promptly delete your data, unless further retention
          is required by law.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          7. Legal Basis for Processing
        </h2>
        <p className="mb-4">
          We process your data based on your explicit consent provided when you
          click the "Donate Data" button. You may withdraw your consent at any
          time, which will not affect the legality of the data processing that
          occurred before withdrawal.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Policy
        </h2>
        <p className="mb-4">
          We reserve the right to modify this Data Donation Policy at any time.
          Any changes will be posted on this page, and significant changes will
          be communicated to you via email or through our service. Continued use
          of our services following these changes constitutes acceptance of the
          updated terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Disclaimer</h2>
        <p className="mb-4">
          While we take all reasonable steps to protect your data, no security
          measure is foolproof. In the unlikely event of a data breach, we will
          notify you and relevant authorities as required by applicable data
          protection laws.
        </p>

        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Data Donation Policy
          or wish to exercise your rights, please contact us at
          wrapped@vantezzen.io.
        </p>
      </div>
    </LegalPage>
  );
}

export default Terms;
