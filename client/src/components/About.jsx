import React, { useState } from "react";
import "./about.css";
import Hero from "./Hero";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Hero title="About Pet Rescue" />
      <section className="about-main-div">
        <div className="about-div">
          <h1>About us</h1>
          <p>
            Pet Adoption Website is Ireland and Northern Ireland’s largest animal adoption portal, bringing together dogs, cats, and other animals available to adopt from rescues across Ireland.
            This means the public can view and apply to available animals in one place, rather than having to check each rescue individually.
          </p>
        </div>
        <div className="faq-div">
          <h1>FAQs</h1>
          {faqData.map((faq, index) => (
            <div key={index} className="accordion" onClick={() => toggleAccordion(index)}>
              <button className="accordion-header">
                <span>{faq.question}</span>
                <svg className="arrow" viewBox="0 0 320 512" width="16" title="angle-down">
                  <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                </svg>
              </button>
              <div className={`accordion-body ${activeIndex === index ? "active" : ""}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mission-div">
          <h2>Our Mission</h2>
          <p>To put an end to puppy farming in Ireland by making adopt don't shop so simple that it is the default for anyone looking for a pet.</p>
        </div>
        <div className="mission-div">
          <h2>The Team</h2>
          <p>The team behind PAW are seasoned fosterers who saw first hand the burden the rescues were under. We created PAW to help the rescues, but also to help the public find the right animal in order to reduce the demand for puppy farms and breeders.</p>
        </div>
        <div className="mission-div">
          <h2>About the Pet Rescuep</h2>
          <p>Pet Adoption Website is the public-facing side of the PAW group. We also provide a full solution for animal rescues to manage their animals and streamline their admin. For more information on Paw Rescue Manager visit: www.pawrescuemanager.com</p>
        </div>
      </section>
    </>
  );
};

const faqData = [
  {
    question: "How often is it updated?",
    answer: "It pulls directly from the rescue's own admin so it's updated in real time as the rescues make their changes."
  },
  {
    question: "Does it cost anything?",
    answer: "No, it's free to use for the public and free for the rescues to join."
  },
  {
    question: "How do I know the status of my application?",
    answer: "You will be contacted when a successful applicant is chosen. The animal's profile will update to tell you whether it is processing (i.e. the rescues are working through the applications) or if it has been reserved or adopted."
  },
  {
    question: "How do I donate?",
    answer: "Each rescue has an individual donate button on their profiles that you can use to support them."
  },
  {
    question: "Can I add my animal rescue?",
    answer: "Of course, go to www.petrescue.com to create your free PAW rescue manager account."
  }
];

export default About;
