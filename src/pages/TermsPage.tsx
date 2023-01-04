import { List } from "antd";
import React from "react";

const terms: Array<{
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}> = [
  {
    title: <h1>Snsus Terms of Service</h1>,
    description: "Effective Date: January 2, 2023",
  },
  {
    title: "1. Agreement to Terms",
    description: (
      <p>
        By using our Services, you agree to be bound by these Terms. If you
        don’t agree to be bound by these Terms, do not use the Services. If you
        are accessing and using the Services on behalf of a company (such as
        your employer) or other legal entity (an “Organization”), you represent
        and warrant that you have the authority to bind that Organization to
        these Terms. In that case, “you” and “your” will refer to you and that
        Organization, unless context requires otherwise. If you are accepting
        these Terms on behalf of an Organization as an “Administrator” (defined
        as an authorized administrator of the Services for the Organization,
        which may include the management of Payment Information), you represent
        and warrant that you have the authority to manage your Organization’s
        use of the Services under these Terms. You further agree that, if you
        have purchased a Snsus Enterprise Plan, then the Snsus Terms of Service
        for Enterprise(to be announced) apply with respect to any provisions
        that conflict with these Terms, absent another agreement between you and
        Snsus.
        <br /> <br />
        IMPORTANT NOTICE REGARDING ARBITRATION: WHEN YOU AGREE TO THESE TERMS
        YOU ARE AGREEING (WITH LIMITED EXCEPTION) TO RESOLVE ANY DISPUTE BETWEEN
        YOU AND SNSUS THROUGH BINDING, INDIVIDUAL ARBITRATION RATHER THAN IN
        COURT. PLEASE REVIEW CAREFULLY SECTION 17 “DISPUTE RESOLUTION” BELOW FOR
        DETAILS REGARDING ARBITRATION (INCLUDING THE PROCEDURE TO OPT OUT OF
        ARBITRATION).
      </p>
    ),
  },
  {
    title: "2. Privacy Policy",
    description:
      "Please refer to our Privacy Policy available at https://snsus.click/privacy for information on how we collect, use and disclose information from our users. You acknowledge and agree that your use of the Services is subject to our Privacy Policy.",
  },
  {
    title: "3. Changes to Terms or Services",
    description:
      "We may update the Terms at any time, at our sole discretion. If we make material changes to the Terms, we’ll let you know ahead of time either by posting the updated Terms on the Site or through other communications. It’s important that you review the Terms whenever we update them as they govern your use of the Services. The changes will not be retroactive, and if you continue to use the Services after we have posted updated Terms, you are agreeing to be bound by the updated Terms. If you don’t agree to be bound by the updated Terms, then, except as otherwise provided in Section 17(f) “Effect of Changes on Arbitration,” you may not use the Services anymore. Because our Services are evolving over time we may change or discontinue all or any part of the Services, including the types of subscription plans we offer and the pricing for such plans, at any time, at our sole discretion.",
  },
  {
    title: "4. Description of Services",
    description:
      "Snsus provides you the functionality to connect to people and express yourself freely online. Your experience on Snsus may include viewing posts, stories, events, ads, and other content you see in News Feed or other Snsus Pages. Snsus use data about the connections you make, the choices and settings you select, and what you share and do on and off our Products - to personalize your experience.",
  },
  {
    title:
      "5. Eligibility for, Access to, and Restrictions on, Use of Services",
    description: (
      <ol type="a">
        <li>
          Create only one account (your own) and use it for personal purposes.
        </li>
        <li>
          Do not share your password, give access to your Facebook account to
          others, or transfer your account to anyone else (without our
          permission)
        </li>
        <li>
          You cannot use Snsus if you're
          <ul>
            <li>under 14 years old</li>
            <li>convicted sex offender</li>
            <li>
              previously disabled account user for violations of our Terms the
              Community Standards, or other terms and policies that apply to
              your use of Snsus. If we disable your account for a violation of
              our Terms, the Community Standards, or other terms and policies,
              you agree not to create another account without our permission.
              Receiving permission to create a new account is provided at our
              sole discretion, and does not mean or imply that the disciplinary
              action was wrong or without cause
            </li>
          </ul>
        </li>
        <li>
          What you can share and do on Snsus Products
          <ul>
            You may not use our Products to do or share anything:
            <li>
              That violates these Terms, the Community Standards, or other terms
              and policies that apply to your use of our Products.
            </li>
            <li>
              That is unlawful, misleading, discriminatory or fraudulent (or
              assists someone else in using our Products in such a way).
            </li>
            <li>That you do not own or have the necessary rights to share.</li>
            <li>
              That infringes or violates someone else's rights, including their
              intellectual property rights (such as by infringing another’s
              copyright or trademark, or distributing or selling counterfeit or
              pirated goods), unless an exception or limitation applies under
              applicable law.
            </li>
          </ul>
        </li>
        <ul>
          Restrictions. You shall not, directly or indirectly, and shall not
          permit any Authorized User or third party to:
          <li>
            reverse engineer, decompile, disassemble or otherwise attempt to
            discover the object code, source code or underlying ideas or
            algorithms of the Services
          </li>
          <li>
            modify, translate, or create derivative works based on any element
            of the Services or any related documentation; (iii) rent, lease,
            distribute, sell, resell, assign, or otherwise transfer your rights
            to use the Services
          </li>
          <li>
            use the Services for timesharing or service bureau purposes or
            otherwise for the benefit of any person or entity other than for
            your own benefit
          </li>
          <li>
            remove any proprietary notices from Snsus materials furnished or
            made available to you
          </li>
          <li>
            publish or disclose to third parties any evaluation or benchmarking
            of the Services without Snsus’s prior written consent; or
          </li>
          <li>
            use the Services for any purpose other than its intended purpose.
            You agree that you will be directly responsible and liable to us
            for:
            <ul>
              <li>
                ensuring that your Authorized Users agree to, and comply with,
                our Terms, and
              </li>
              <li>
                Any violation of these Terms or applicable law by any Authorized
                User.
              </li>
            </ul>
          </li>
        </ul>
      </ol>
    ),
  },
  {
    title: "6. Confidentiality and Feedback",
    description: (
      <ol type="a">
        <li>
          Confidentiality. “Confidential Information” means all information
          disclosed by us to you, whether orally or in writing, that is
          designated as confidential or that reasonably should be understood to
          be confidential given the non-public nature of the information and the
          circumstances of disclosure. Snsus’s Confidential Information may
          include, but is not limited to, the Services, Snsus Content, and Beta
          Services (as defined below). You will use a reasonable degree of care
          to protect the Confidential Information. You will not use any
          Confidential Information for any purpose outside the scope of these
          Terms or disclose Confidential Information to any third party.
        </li>
        <li>
          Feedback. We welcome feedback, comments and suggestions for
          improvements to the Services (“Feedback”). You can submit Feedback by
          emailing us at support@snsus.click. You grant to us a non-exclusive,
          transferable, worldwide, perpetual, irrevocable, fully-paid,
          royalty-free license, with the right to sublicense, under any and all
          intellectual property rights that you own or control to use, copy,
          modify, create derivative works based upon and otherwise exploit the
          Feedback for any purpose.
        </li>
      </ol>
    ),
  },
  {
    title: "7. Payments and Subscription",
    description: (
      <ol type="a">
        Snsus may provide the Services for free, or it may require you to pay
        for the Services based on the type of Services, number of Authorized
        Users, number of active Projects, and other criteria presented on our
        pricing page available at ""(to be announced) that you opt for.
        Accordingly, you may choose the type of subscription you want to avail.
        You will be liable to pay Snsus in accordance with your Subscription
        Plan. You may increase the number of Authorized Users under your
        Subscription Plan at any time during the term of your Subscription by
        increasing the number of Authorized Users under your Account and payment
        of the necessary fee for the additional Authorized Users in accordance
        with Section 7(b).
        <li>
          General. When you purchase a subscription (“Subscription”), you
          expressly authorize us (or our third-party payment processor) to
          charge you for the term of your Subscription each time your payment is
          due in accordance with your Subscription Plan (each, a “Transaction”).
          We may ask you to supply additional information relevant to your
          Transaction, including your credit card number (or other payment
          information), the expiration date of your credit card and your email
          and postal addresses for billing and notification (such information,
          “Payment Information”). You represent and warrant that you have the
          legal right to use all payment method(s) represented by any such
          Payment Information. When you initiate a Transaction, you authorize us
          to provide your Payment Information to third parties so we can
          complete your Transaction and to charge your payment method for the
          type of Transaction you have selected (plus any applicable taxes and
          other charges). You may need to provide additional information to
          verify your identity before completing your Transaction (such
          information is included within the definition of Payment Information).
        </li>
        <li>
          Subscriptions. If you purchase a Subscription, you will be charged the
          monthly or annual (as applicable) Subscription fee, plus any
          applicable taxes, and other charges (“Subscription Fee”), at the
          beginning of your Subscription and each month or year (as applicable)
          thereafter, at the then-current Subscription Fee. Similarly, if you
          agree to a Subscription Fee, that will remain your price for the
          duration of the Subscription period; however, prices are subject to
          change at the end of a Subscription period. If you purchase a
          Subscription, we (or our third-party payment processor) will
          automatically charge you each month or year on the anniversary of the
          commencement of your Subscription, using the Payment Information you
          have provided until you cancel your Subscription. By agreeing to these
          Terms and electing to purchase a Subscription, you acknowledge that
          your Subscription has recurring payment features and you accept
          responsibility for all recurring payment obligations prior to
          cancellation of your Subscription by you or Snsus. Your Subscription
          continues until canceled by you or we terminate your access to or use
          of the Services or Subscription in accordance with these Terms. If you
          increase the number of Authorized Users by changing the number of
          Authorized Users under your Account, you expressly authorize us (or
          our third party processor) to charge your credit card on file for the
          pro-rated Subscription Fee corresponding to the additional Authorized
          Users for the remainder of your Subscription term.
        </li>
        <li>
          Effect of Termination on Subscription. Our general policy is that YOUR
          PURCHASE IS FINAL AND YOU WILL NOT BE ABLE TO CANCEL THE PURCHASE
          AND/OR RECEIVE A REFUND OF YOUR SUBSCRIPTION FEE AT ANY TIME. In
          addition, if something unexpected happens in the course of completing
          a Transaction, we reserve the right to cancel your Transaction or
          terminate your access to Services to address such payment issue; if we
          cancel your Transaction or your access to Services, we’ll refund any
          pro-rated payment you have already remitted to us for such Transaction
          or access to Services. Without limiting the foregoing, you may cancel
          your Subscription by visiting contatcting our support page at "" (to
          be announced) and following the instructions to cancel your
          Subscription. Upon such cancellation, we will: (i) terminate your
          access to the Services and (ii) cease billing for all Subscription
          Fees, in each case at the end of the then-current Subscription period.
          EXCEPT AS SET FORTH ABOVE, YOU WILL NOT RECEIVE A REFUND OF ANY
          PORTION OF THE SUBSCRIPTION FEE PAID FOR THE THEN-CURRENT SUBSCRIPTION
          PERIOD AT THE TIME OF CANCELLATION. You will be responsible for all
          Subscription Fees (plus any applicable taxes and other charges)
          incurred for the then-current Subscription period.
        </li>
        <li>
          Evaluations, Trials, and Betas. We may offer certain Services to you
          at no charge, including trial use and beta versions (“Beta Services”).
          Your use of Beta Services is subject to any additional terms that we
          specify and is only permitted during the term we designate (or, if not
          designated, until terminated in accordance with these Terms). These
          Terms fully apply to Beta Services and we may modify or terminate your
          right to use Beta Services at any time and for any reason in our sole
          discretion, without liability to you. You understand that any Beta
          Services and their features and functionality are still under
          development, may be inoperable or incomplete and are likely to contain
          more errors and bugs than generally available Services. We make no
          promises that any Beta Services will ever be made generally available.
          All information regarding the characteristics, features or performance
          of any Beta Services, and any communication that we may engage in with
          you relating to the Beta Services, constitutes our Confidential
          Information, and may not be disclosed to any third party without our
          written permission. To the maximum extent permitted by applicable law,
          we disclaim all obligations or liabilities with respect to Beta
          Services.
        </li>
      </ol>
    ),
  },
  {
    title: "8. Content Ownership, Responsibility and Removal",
    description: (
      <ol type="a">
        <li>
          Definitions. For purposes of these Terms: (i) “Content” means text,
          graphics, images, music, software, audio, video, designs, interactive
          features, works of authorship of any kind, and information or other
          materials that are posted, generated, provided or otherwise made
          available through the Services; (ii) “Snsus Content” means any Content
          that Snsus makes available through the Services (excluding User
          Content); and (iii) “User Content” means any Content that Account
          holders (including you and your Authorized Users) provide to be made
          available through the Services, including but not limited to
          identifying information (such as your email address or name) and
          Payment Information.
        </li>
        <li>
          Ownership. Snsus does not claim any ownership rights in any User
          Content and nothing in these Terms will be deemed to restrict any
          rights that you may have to use and exploit your User Content, subject
          to Section 8(g) below. Subject to the foregoing, Snsus and its
          licensors exclusively own all right, title and interest in and to the
          Services and Snsus Content, including all associated intellectual
          property rights. You acknowledge that the Services and Snsus Content
          are protected by copyright, trademark, and other laws of the United
          States and foreign countries. You agree not to remove, alter or
          obscure any copyright, trademark, service mark or other proprietary
          rights notices incorporated in or accompanying the Services or Snsus
          Content. In addition, Snsus may monitor your use of the Services and
          use data and information related to such User Content in an aggregate
          and anonymous manner, including to compile statistical and performance
          information related to the provision and operation of the Services
          (“Aggregate Data”). As between Snsus and you, all right, title and
          interest in the Aggregate Data and all intellectual property rights
          therein, belong to and are retained solely by Snsus, and Snsus may
          make such Aggregate Data publicly available, and use such information
          to the extent and in the manner it deems fit including without
          limitation, as required by applicable law or regulation and for
          purposes of data gathering, analysis, service enhancement, service
          improvement, and marketing, provided that no such Aggregate Data
          identifies you or any Authorized User.
        </li>
        <li>
          Rights in User Content Granted by You. By making any User Content
          available through the Services you hereby grant to Snsus a
          non-exclusive, transferable, worldwide, irrevocable, royalty-free
          license, with the right to sublicense, to use, copy, access, process,
          save, store, modify, create derivative works based upon, distribute,
          transmit, publicly display, and publicly perform your User Content
          solely in connection with operating and providing the Services and
          Content to you and to other Account holders during the term of you
          Subscription, including the provision of requested technical support,
          if any.
        </li>
        <li>
          Your Responsibility for User Content. You are solely responsible for
          all your User Content. You represent and warrant that: (i) you own all
          your User Content or you have all rights that are necessary to grant
          us the license rights in your User Content under these Terms; (ii) you
          have obtained all consents and permissions from all Authorized Users
          and others, for your collection of the User Content contributed by
          them, and transmission and use thereof to Snsus as contemplated
          herein; and (iii) neither your User Content, nor your use and
          provision of your User Content to be made available through the
          Services, nor any use of your User Content by Snsus on or through the
          Services will infringe, misappropriate or violate a third party’s
          intellectual property rights, or rights of publicity or privacy, or
          result in the violation of any applicable law or regulation
          (including, any applicable local, national and international laws).
        </li>
        <li>
          Removal of User Content. You can remove your User Content by
          specifically deleting it or deleting your Account. However, in certain
          instances, some of your User Content (such as archived copies of your
          Projects or Projects shared with other Team Members who are still
          working on it) may not be completely removed and copies of your User
          Content may continue to exist on the Services. We are not responsible
          or liable for the removal or deletion of (or the failure to remove or
          delete) any of your User Content.
        </li>
        <li>
          Rights in Content Granted by Snsus. Subject to your compliance with
          these Terms, Snsus grants to you a limited, non-exclusive,
          non-transferable license, with no right to sublicense, to download,
          view, copy, display and print the Snsus Content solely in connection
          with your permitted use of the Services and solely for your personal
          and internal business purposes only.
        </li>
        <li>
          Content and Use Managed by An Organization. If you have been added or
          invited to use the Services on behalf of an Organization, you
          acknowledge and agree that such Organization’s Administrator may
          manage your use of the Services or such Organization’s Workspace, as
          applicable, including but not limited to, adding or removing you from
          the Services or such Organization’s Workspace, enabling or disabling
          third-party integrations, and managing permissions. Any User Content
          that you submit or upload to the Services on behalf of an
          Organization, or that you submit to an Organization’s Workspace, may
          be monitored, retained, accessed, used, modified, shared, or removed
          by the Administrator on behalf of such Organization in order
          facilitate its access and use of the Services under these Terms. You
          further acknowledge that your Account or User Content can become
          managed by any Organization (including your employer) that: (i) owns
          or controls the email address associated with the proprietary
          registered domain with which your Account was created or registered;
          or (ii) pays the Subscription Fees for your Subscription. You also
          acknowledge that any User Content that you make available to a
          Workspace will become managed by the Organization that manages such
          Workspace. If you are an Administrator for your Organization’s
          Workspace, you acknowledge and agree that Snsus may share your contact
          information with Authorized Users in your Organization in order to
          facilitate their use of the Services.
        </li>
        <li>
          Storage. SNSUS IS NOT RESPONSIBLE FOR STORING ANY USER CONTENT, AND WE
          RECOMMEND THAT YOU APPROPRIATELY BACK-UP ALL YOUR USER CONTENT. IN THE
          EVENT OF ANY LOSS OR CORRUPTION OF USER CONTENT, SNSUS WILL USE ITS
          COMMERCIALLY REASONABLE EFFORTS TO RESTORE THE LOST OR CORRUPTED USER
          CONTENT FROM THE LATEST BACKUP OF SUCH USER CONTENT MAINTAINED BY
          SNSUS IN THE NORMAL COURSE OF BUSINESS USING ITS STANDARD ARCHIVAL
          PROCEDURES. SNSUS WILL NOT BE RESPONSIBLE FOR ANY LOSS, DESTRUCTION,
          ALTERATION, UNAUTHORIZED DISCLOSURE OR CORRUPTION OF ANY USER CONTENT.
          SNSUS’S EFFORTS TO RESTORE LOST OR CORRUPTED USER CONTENT PURSUANT TO
          THIS SECTION 8(h) WILL CONSTITUTE SNSUS’S SOLE LIABILITY AND YOUR SOLE
          AND EXCLUSIVE REMEDY IN THE EVENT OF ANY LOSS OR CORRUPTION OF USER
          CONTENT.
        </li>
      </ol>
    ),
  },
  {
    title: "9. General Prohibitions and Snsus’s Enforcement Rights",
    description: (
      <ol type="a">
        You agree not to (and ensure that none of your Authorized Users) do any
        of the following:
        <li>
          Post, upload, publish, submit or transmit any Content that: (i)
          infringes, misappropriates or violates a third party’s patent,
          copyright, trademark, trade secret, moral rights or other intellectual
          property rights, or rights of publicity or privacy; (ii) violates, or
          encourages any conduct that would violate, any applicable law or
          regulation or would give rise to civil liability; (iii) is fraudulent,
          false, misleading or deceptive; (iv) is defamatory, obscene,
          pornographic, vulgar or offensive; (v) promotes discrimination,
          bigotry, racism, hatred, harassment or harm against any individual or
          group; (vi) is violent or threatening or promotes violence or actions
          that are threatening to any person or entity; or (vii) promotes
          illegal or harmful activities or substances
        </li>
        <li>
          Use, display, mirror or frame the Services or any individual element
          within the Services, Snsus’s name, any Snsus trademark, logo or other
          proprietary information, or the layout and design of any page or form
          contained on a page, without Snsus’s express written consent
        </li>
        <li>
          Access, tamper with, or use non-public areas of the Services, Snsus’s
          computer systems, or the technical delivery systems of Snsus’s
          providers
        </li>
        <li>
          Attempt to probe, scan or test the vulnerability of any Snsus system
          or network or breach any security or authentication measures
        </li>
        <li>
          Avoid, bypass, remove, deactivate, impair, descramble or otherwise
          circumvent any technological measure implemented by Snsus or any of
          Snsus’s providers or any other third party (including another user) to
          protect the Services or Content
        </li>
        <li>
          Attempt to access or search the Services or Content or download
          Content from the Services through the use of any engine, software,
          tool, agent, device or mechanism (including spiders, robots, crawlers,
          data mining tools or the like) other than the software and/or search
          agents provided by Snsus or other generally available third-party web
          browsers
        </li>
        <li>
          Send any unsolicited or unauthorized advertising, promotional
          materials, email, junk mail, spam, chain letters or other form of
          solicitation
        </li>
        <li>
          Use any meta tags or other hidden text or metadata utilizing a Snsus
          trademark, logo, URL or product name without Snsus’s express written
          consent
        </li>
        <li>
          Use the Services or Content, or any portion thereof, for the benefit
          of any third party or in any manner not permitted by these Terms
        </li>
        <li>
          Forge any TCP/IP packet header or any part of the header information
          in any email or newsgroup posting, or in any way use the Services or
          Content to send altered, deceptive or false source-identifying
          information
        </li>
        <li>
          Attempt to decipher, decompile, disassemble or reverse engineer any of
          the software used to provide the Services or Content
        </li>
        <li>
          Interfere with, or attempt to interfere with, the access of any user,
          host or network, including, without limitation, sending a virus,
          overloading, flooding, spamming, or mail-bombing the Services
        </li>
        <li>
          Collect or store any personally identifiable information from the
          Services from other users of the Services without their express
          permission
        </li>
        <li>
          Impersonate or misrepresent your affiliation with any person or entity
        </li>
        <li>
          Violate any applicable law or regulation; or Encourage or enable any
          other individual to do any of the foregoing
        </li>
      </ol>
    ),
  },
  {
    title: "10. Copyright Policy",
    description:
      "Snsus respects copyright law and expects its users to do the same. While we have no obligation to monitor any User Content uploaded by you in connection with the Services, if we deem it necessary, we may: 1) remove your User Content without liability, 2) suspend your access to the Services, or 3) terminate Account holders who repeatedly infringe or are reasonably believed to be repeatedly infringing the rights of copyright holders. Please see Snsus’s Copyright and IP Policy at https://snsus.click/copyright, for further information",
  },
  {
    title: "11. Links to Third Party Websites or Technology",
    description:
      "The Services may contain links to third-party websites or resources including without limitation, any third party services that may be compatible with the Services, or plugins or extensions to the Services (collectively, “Third Party Technology”). We provide these links, plugins and extensions only as a convenience and are not responsible for the content, products or services on or available from those websites or resources or for the functioning or failure to function of any such Third Party Technology. You and your Authorized Users are solely responsible for, and assume all risk arising from, the use of any Third Party Technology, including compliance with the terms and conditions governing the use of such Third Party Technology. ANY THIRD PARTY TECHNOLOGY DOWNLOADED OR OTHERWISE OBTAINED OR USED IN CONNECTION WITH THE SERVICES IS SO DOWNLOADED, OBTAINED OR USED AT YOUR AND YOUR AUTHORIZED USERS’ DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR AND YOU HEREBY WAIVE ANY AND ALL CLAIMS AND CAUSES OF ACTION AGAINST SNSUS WITH RESPECT TO SUCH USE, INCLUDING, BUT NOT LIMITED TO ANY DAMAGE TO COMPUTER SYSTEMS OR DISPLAY DEVICE, OR LOSS OF DATA, THAT RESULTS FROM THE DOWNLOAD OR USE OF ANY SUCH THIRD PARTY TECHNOLOGY.",
  },
  {
    title: "12. Termination",
    description:
      "We may terminate your access to and use of the Services, at our sole discretion, at any time and without notice to you if you are reasonably believed to have breached these Terms. You may cancel your Subscription and Account as described in Section 7© of these Terms. Upon any termination, discontinuation or cancellation of the Services or your Account, the following Sections will survive: 6, 7, 8(a), 8(b), 8(d), 8(e), 8(h), 11, 12, 13, 14, 15, 16, 17, and 18.",
  },
  {
    title: "13. Warranty Disclaimers",
    description:
      "THE SERVICES ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND. WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. We make no warranty that the Services will meet your requirements or be available on an uninterrupted, secure, or error-free basis. We make no warranty regarding the quality, accuracy, timeliness, truthfulness, completeness or reliability of any Content.",
  },
  {
    title: "14. Indemnity",
    description:
      "You will indemnify and hold harmless Snsus and its officers, directors, employees and agents, from and against any claims, disputes, demands, liabilities, damages, losses, and costs and expenses, including, without limitation, reasonable legal and accounting fees arising out of or in any way connected with (i) your and your Authorized Users’ access to or use of the Services, Tools, or Content, (ii) your and any of your Authorized Users’ User Content, (iii) acts or omission of any of your Authorized Users, or (iv) your or your Authorized Users’ violation of these Terms or any applicable law.",
  },
  {
    title: "15. Limitation of Liability",
    description: (
      <ol type="a">
        <li>
          NEITHER SNSUS NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR
          DELIVERING THE SERVICES WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
          EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS, LOST
          REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR
          GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR
          THE COST OF SUBSTITUTE SERVICES OF ANY KIND ARISING OUT OF OR IN
          CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE
          SERVICES OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT
          (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY,
          AND WHETHER OR NOT SNSUS OR ANY OTHER PARTY HAS BEEN INFORMED OF THE
          POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN
          IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. SOME JURISDICTIONS
          DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR
          CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT
          APPLY TO YOU
        </li>
        <li>
          IN NO EVENT WILL SNSUS’S TOTAL LIABILITY ARISING OUT OF OR IN
          CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE
          SERVICES OR CONTENT EXCEED THE AMOUNTS YOU HAVE PAID TO SNSUS FOR USE
          OF THE SERVICES OR CONTENT DURING THE THREE (3) MONTHS PRECEDING THE
          CLAIM FROM WHICH THE LIABILITY AROSE, OR ONE HUNDRED DOLLARS ($100),
          IF YOU HAVE NOT HAD ANY PAYMENT OBLIGATIONS TO SNSUS, AS APPLICABLE.
        </li>
        <li>
          THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE
          FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN SNSUS AND
          YOU.
        </li>
      </ol>
    ),
  },
  {
    title: "16. Governing Law and Forum Choice",
    description:
      "These Terms and any action related thereto will be governed by the ARBITRATION ACT OF KOREA and the laws of the Republic of South Korea, without regard to its conflict of laws provisions. The exclusive jurisdiction for all Disputes that you and Snsus are not required to arbitrate will be the federal courts located in South Korea, and you and Snsus each waive any objection to jurisdiction and venue in such courts.",
  },
  {
    title: "17. General Terms",
    description: (
      <ol type="a">
        <li>
          Entire Agreement. These Terms constitute the entire and exclusive
          understanding and agreement between Snsus and you regarding the
          Services and Content, and these Terms supersede and replace any and
          all prior oral or written understandings or agreements between Snsus
          and you regarding the Services and Content. If any provision of these
          Terms is held invalid or unenforceable by an arbitrator or a court of
          competent jurisdiction, that provision will be enforced to the maximum
          extent permissible and the other provisions of these Terms will remain
          in full force and effect. You may not assign or transfer these Terms,
          by operation of law or otherwise, without Snsus’s prior written
          consent. Any attempt by you to assign or transfer these Terms, without
          such consent, will be null. Snsus may freely assign or transfer these
          Terms without restriction. Subject to the foregoing, these Terms will
          bind and inure to the benefit of the parties, their successors and
          permitted assigns.
        </li>
        <li>
          Publicity. You agree that we may identify you as a Snsus customer in
          our promotional materials. We will promptly stop doing so upon your
          request sent to support@snsus.click.
        </li>
        <li>
          Notices. Any notices or other communications provided by Snsus under
          these Terms, including those regarding material modifications to these
          Terms, will be given: (i) via email; or (ii) by posting to the
          Services. For notices made by e-mail, the date of receipt will be
          deemed the date on which such notice is transmitted. You agree to
          designate one or more points of contact for notices, billing, and
          privacy and security issues (“Designated POC”). Your default
          Designated POC is the billing contact email as entered in your Snsus
          Account. It is your responsibility to ensure this email address is
          accurate, current, and accessible by an Administrator or someone
          capable of administering your account.
        </li>
        <li>
          Waiver of Rights. Snsus’s failure to enforce any right or provision of
          these Terms will not be considered a waiver of such right or
          provision. The waiver of any such right or provision will be effective
          only if in writing and signed by a duly authorized representative of
          Snsus. Except as expressly set forth in these Terms, the exercise by
          either party of any of its remedies under these Terms will be without
          prejudice to its other remedies under these Terms or otherwise.
        </li>
      </ol>
    ),
  },
  {
    title: "19. Contact Information ",
    description:
      "If you have any questions about these Terms or the Services, please contact Snsus at support@snsus.click.",
  },
];

export const TermsPage = () => {
  return (
    <div
      className="terms-container"
      style={{ maxWidth: 1200, margin: "auto", backgroundColor: "#ffffff" }}
    >
      <List
        dataSource={terms}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </div>
  );
};
