// About.js

import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h2 className="text-center mt-4">Welcome to E-Diary!</h2>

      <section className="my-4">
        <h3>Our Mission</h3>
        <p>
          At E-diary, we're committed to providing you with a secure platform for journaling and self-reflection. We aim to facilitate personal growth and mental well-being through our intuitive diary system.
        </p>
      </section>

      <section className="my-4">
        <h3>Features</h3>
        <ul>
          <li>Secure and Private entries</li>
          <li>Customizable entries with photos and tags</li>
          <li>Daily Reminders for consistent journaling</li>
          <li>Search and Organization options</li>
          <li>Mood Tracking for emotional insights</li>
          <li>Export and Backup capabilities</li>
        </ul>
      </section>

      <section className="my-4">
        <h3>Our Team</h3>
        <p>
          Meet the passionate individuals behind E-Diary . We're dedicated to creating an exceptional user experience and continually improving our platform to meet your needs.
        </p>
      </section>

      <section className="my-4">
        <h3>Contact Us</h3>
        <p>
          We value your feedback! Feel free to contact us at jadhavnayak000@gmail.com with any questions, suggestions, or feedback you may have.
        </p>
      </section>

      <section className="my-4">
        <h3>Get Started</h3>
        <p>
          Sign up today and embark on your journey of self-discovery and personal reflection with E-Diary .
        </p>
      </section>
    </div>
  );
};

export default About;
