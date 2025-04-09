import Header from '../components/Header';
import './PrivacyPage.css';

function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="privacy-page">
        <h1>CineNiche Privacy Policy</h1>
        <p className="last-updated">Last Updated: April 9, 2025</p>

        <p>
          Welcome to CineNiche! We care about your privacy. This Privacy Policy
          outlines how we collect, use, and protect your personal information
          when you use CineNiche, our movie streaming platform. It also explains
          the choices you have about your information.
        </p>

        <h2>Contacting Us</h2>
        <p>
          If you have questions about this Privacy Policy, our data practices,
          or your rights, please reach out to us at{' '}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>. For
          general support, visit our Help Center.
        </p>

        <h2>Section A: Information We Collect & Why</h2>
        <h3>What We Collect:</h3>
        <ul>
          <li>
            Account Info: Email, password, name, phone number, and billing
            address.
          </li>
          <li>
            Payment Info: Credit card details, payment history, and subscription
            status.
          </li>
          <li>
            Profile Info: Profiles you create on your account, watch history,
            favorites list, and viewing preferences.
          </li>
          <li>
            Usage Info: How you interact with our platform—what you watch,
            search for, and your interactions with features.
          </li>
          <li>
            Device & Network Info: Your device type, operating system, browser,
            IP address, and general location.
          </li>
          <li>
            Communication: Emails, support chats, and surveys you respond to.
          </li>
        </ul>

        <h3>Why We Collect It:</h3>
        <ul>
          <li>To deliver and improve the CineNiche streaming experience.</li>
          <li>To personalize your recommendations and settings.</li>
          <li>To process payments and manage your subscription.</li>
          <li>To communicate with you about your account or new content.</li>
          <li>To monitor platform performance and prevent fraud or abuse.</li>
        </ul>

        <h2>Section B: Your Choices & Rights</h2>
        <p>Depending on your location, you may have rights to:</p>
        <ul>
          <li>Access or request a copy of your personal data.</li>
          <li>Correct, delete, or restrict use of your data.</li>
          <li>
            Opt out of certain data uses, like marketing emails or targeted ads.
          </li>
          <li>Cancel your account at any time.</li>
        </ul>
        <p>
          You can manage most of these settings from your Account page or by
          contacting us directly.
        </p>

        <h2>Section C: Account Access & Profiles</h2>
        <p>
          If you share your CineNiche account with others, they may be able to
          view watch history and make changes to shared profiles. You can create
          and customize individual profiles and add PIN protection if desired.
        </p>

        <h2>Section D: Cookies & Internet Advertising</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Keep you logged in</li>
          <li>Remember your preferences</li>
          <li>Provide relevant recommendations</li>
          <li>Measure and improve our platform</li>
          <li>Show you personalized ads (if you're on an ad-supported plan)</li>
        </ul>
        <p>
          You can manage cookie preferences in your browser settings or via our{' '}
          <a href="#">Cookie Preferences</a> page.
        </p>

        <h2>Section E: Sharing Your Data</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Service Providers (like payment processors and cloud storage)</li>
          <li>
            Partners (if you signed up through a bundle or device promotion)
          </li>
          <li>
            Advertisers (for ad-supported plans only—never your watch history)
          </li>
          <li>
            Authorities, if required by law or to protect CineNiche and our
            users
          </li>
        </ul>
        <p>We never sell your personal information.</p>

        <h2>Section F: Data Security & Retention</h2>
        <p>
          We use industry-standard measures to protect your data. While no
          system is 100% secure, we’re committed to protecting your info. We
          retain your personal data only as long as necessary to provide
          services, comply with the law, and fulfill the purposes outlined here.
          If you close your account, we delete or anonymize your data unless we
          need to keep it for legal reasons.
        </p>

        <h2>Children’s Privacy</h2>
        <p>
          CineNiche is intended for users age 13 and up. Kids under 13 must use
          the platform with parental supervision. We offer parental controls and
          kid-safe profiles.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make
          significant changes, we’ll notify you. Your continued use of CineNiche
          after updates means you accept the changes.
        </p>

        <p>
          Thanks for streaming with CineNiche. Your privacy is part of our
          story.
        </p>
      </div>
    </>
  );
}

export default PrivacyPage;
