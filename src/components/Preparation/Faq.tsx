"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const items = [
  {
    question: "How can I get my TikTok data?",
    answer: (
      <>
        You can request your TikTok data export at{" "}
        <a
          href="https://www.tiktok.com/setting/download-your-data"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://www.tiktok.com/setting/download-your-data
        </a>{" "}
        or by opening TikTok, going to your profile and clicking on the three
        dots in the top right corner. Then, click on "Settings and privacy" and
        then on "Account". Then go to "Download your data".
        <br />
        <br />
        In both cases, you need to choose "
        <strong>JSON - Machine-readable file</strong>" as the file format,
        otherwise Wrapped for TikTok won't be able to read your data.
        <br />
        After clicking on "Request data" you'll need to wait until TikTok has
        prepared your data export. This may take a while, depending on how much
        data you have on TikTok.
        <br />
        <br />
        Once your data export is ready, you can go to "Download data" on the top
        row of the same page and download your data export. You'll need to
        upload this file to Wrapped for TikTok.
      </>
    ),
  },
  {
    question: "Which file should I use for Wrapped for TikTok?",
    answer: (
      <>
        After downloading your TikTok data export, you can choose the ZIP file
        you downloaded (it should be called "TikTok_Data_....zip"). Wrapped will
        the automatically extract the ZIP file and use the JSON file inside.
        Alternatively, you can extract the ZIP file yourself and upload file
        named "user_data.json" inside.
      </>
    ),
  },
  {
    question: "Is this safe? Is Wrapped for TikTok legit?",
    answer: (
      <>
        Wrapped for TikTok is safe and privacy-centered. If you know how to read
        code, you can look at Wrapped for TikTok's full source code at{" "}
        <a
          href="https://github.com/vantezzen/wrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://github.com/vantezzen/wrapped
        </a>
        . Your TikTok data is only used in your browser and never uploaded to
        any server. We will not store or process your data on our server in any
        way.
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        I always like Spotify Wrapped and wanted to have something similar for
        TikTok. So I built Wrapped for TikTok, a website that generates a
        personalized summary of your TikTok usage based on your TikTok data
        export.
        <br />
        <br />
        Wrapped for TikTok is simply a fun little project and doesn't currently
        have any monetization or business model behind it. It's just a fun
        project for me to work on in my free time.
      </>
    ),
  },
  {
    question: "Can you get access to my TikTok account with my data?",
    answer: (
      <>
        The short answer is <strong>no</strong>. Your TikTok data export only
        contains data about your account, not your login credentials!
        <br />
        You can <strong>verify this yourself</strong> by opening your TikTok
        data export and looking at the file "user_data.json" in a text editor.
        You can try searching for your TikTok password in the file and you'll
        see that it's not there.
        <br />
        In general, TikTok doesn't store your unencrypted password anywhere and
        only stores a hashed version of it. Due to this, it's impossible for the
        TikTok data export to contain your password.
        <br />
        Wrapped for TikTok will never ask you for your TikTok login credentials
        and doesn't require you to enter them anywhere.
        <br />
        <br />
        Depending on your TikTok account data, your data export may contain your
        email address or phone number. This data is{" "}
        <strong>not used or transferred</strong> by Wrapped for TikTok!
        <br />
        However, if you are concerned about this, you can open your export data
        in a text editor, search for your email address or phone number and
        delete it from the file before uploading it to Wrapped for TikTok.
      </>
    ),
  },
  {
    question: "Does my Wrapped contain my full TikTok history?",
    answer: (
      <>
        Unfortunately, no. TikTok only includes the watch history of the last
        6-12 months in the data export, depending on how much data you have on
        TikTok.
        <br />
        You will see the cutoff date in your wrapped, e.g. "Since 01/01/2022
        you've watched...".
        <br />
        Likes and comments however are complete in most cases, so you'll see
        your full like and comment history in your Wrapped.
      </>
    ),
  },
  {
    question:
      "How long do I have to wait for my TikTok data? Why isn't this faster?",
    answer: (
      <>
        TikTok needs to prepare your data export after you request it. This
        process can take anywhere from a few minutes to a few days, depending on
        how much data you have on TikTok.
        <br />
        Unfortunately, there is currently no other method for Wrapped for TikTok
        to access your TikTok data faster.
      </>
    ),
  },
  {
    question: "What counts as a 'watch session'?",
    answer: (
      <>
        Wrapped for TikTok will show you how many watch sessions you've had and
        how long your average and longest watch session was. A watch session is
        defined as continuously watching TikTok videos without a break of more
        than 5 minutes.
        <br />
        For example, if you watch TikTok videos for 10 minutes, then take a 10
        minute break and then watch TikTok videos for another 10 minutes, this
        will count as two watch sessions.
      </>
    ),
  },
  {
    question: "What counts as a 'view'?",
    answer: (
      <>
        On both videos and live stream, a view is counted as soon as the content
        is displayed - even if you scroll past it directly.
        <br />
        This is due to the way TikTok adds items to your watched list.
      </>
    ),
  },
  {
    question: "How does Wrapped for TikTok work?",
    answer: (
      <>
        Wrapped for TikTok uses your TikTok data export to calculate your
        Wrapped. This means that all statistics are generated locally in your
        browser and your data is never uploaded to any server.
      </>
    ),
  },
  {
    question: "How does the Spotify integration work?",
    answer: (
      <>
        If you want to, Wrapped for TikTok can play fitting songs in the
        background while you're looking at your Wrapped - similar to how Spotify
        Wrapped works.
        <br />
        To achieve this, Wrapped for TikTok uses{" "}
        <a
          href="https://developer.spotify.com/documentation/embeds"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          Spotify Embeds
        </a>{" "}
        to embed a Spotify player to the bottom right of the screen.
        <br />
        For this to work, you'll only need to be logged into Spotify in your
        browser - you don't need to connect your Spotify account to Wrapped for
        TikTok! Because Spotify is embedded using Spotify's build-in support for
        websites to do so, we don't have access to your Spotify account in any
        way.
      </>
    ),
  },
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
