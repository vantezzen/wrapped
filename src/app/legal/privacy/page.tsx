"use client";
import LegalPage from "@/components/LegalPage";
import Head from "next/head";
import React from "react";

function Terms() {
  return (
    <LegalPage>
      <Head>
        <title>Wrapped for TikTok - Privacy Policy</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="mx-auto max-w-lg">
        <h1>Privacy Policy</h1>

        <p>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit TrueShuffle (the “Site”).
        </p>
        <p>
          PERSONAL INFORMATION WE COLLECT When you visit the Site, we
          automatically collect certain information about your device, including
          information about your web browser, IP address, time zone, and some of
          the cookies that are installed on your device. Additionally, as you
          browse the Site, we collect information about the individual web pages
          or products that you view, what websites or search terms referred you
          to the Site, and information about how you interact with the Site. We
          refer to this automatically-collected information as “Device
          Information.”
        </p>
        <p>
          We collect Device Information using the following technologies: -
          “Cookies” are data files that are placed on your device or computer
          and often include an anonymous unique identifier. For more information
          about cookies, and how to disable cookies, visit
          http://www.allaboutcookies.org. - “Log files” track actions occurring
          on the Site, and collect data including your IP address, browser type,
          Internet service provider, referring/exit pages, and date/time stamps.
          - “Web beacons,” “tags,” and “pixels” are electronic files used to
          record information about how you browse the Site.
        </p>
        <p>
          Additionally when you make a purchase or attempt to make a purchase
          through the Site, we collect certain information from you, including
          your name, billing address, shipping address, payment information
          (including credit card numbers), email address, and phone number. We
          refer to this information as “Order Information.”
        </p>
        <p>
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </p>
        <p>
          HOW DO WE USE YOUR PERSONAL INFORMATION? We use the Order Information
          that we collect generally to fulfill any orders placed through the
          Site (including processing your payment information, arranging for
          shipping, and providing you with invoices and/or order confirmations).
          Additionally, we use this Order Information to: Communicate with you;
          Screen our orders for potential risk or fraud; and When in line with
          the preferences you have shared with us, provide you with information
          or advertising relating to our products or services.
        </p>
        <p>
          SHARING YOUR PERSONAL INFORMATION We share your Personal Information
          with third parties to help us use your Personal Information, as
          described above. For example: We use SimpleAnalytics to help us
          understand how our customers use the Site--you can read more about how
          SimpleAnalytics uses your Personal Information here:
          https://simpleanalytics.com/privacy-policy. We also use Vercel to host
          our website--you can read more about how Vercel uses your Personal
          Information here: https://vercel.com/legal/privacy-policy.
        </p>
      </div>
    </LegalPage>
  );
}

export default Terms;
