import React from 'react';
import ReactGA from 'react-ga4';

function Privacy() {
  React.useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/Privacy',
      title: 'Privacy Page',
    });
  }, []);
  return (
    <div className="flex m-10">
      <div>
        <div className=" text-xl">
          <h1 className=" text-lava-100 text-4xl font-bold">Privacy Policy</h1>
          <p className=" text-lg text-gray-600">
            In order to receive information about your Personal Data, the
            purposes and the parties the Data is shared with, contact the Owner.
          </p>
        </div>
        <div className=" mt-5 text-xl">
          <h4>Owner and Data Controller</h4>
          <p className="mt-5 text-lg">
            <strong>
              Sports Advantage AG
              <br />
              &zwj;
            </strong>
            Chamerstrase 12C
            <br />
            6300 Zug
            <br />
            Switzerland
            <br />
            <br />
            &zwj;<strong>Owner contact email:</strong>{' '}
            contact@sportsadvantage.io
          </p>
        </div>
        <div className=" text-xl">
          <h4 className="mt-5 text-xl font-bold">Types of Data collected</h4>
          <p className="mt-2 text-lg">
            The owner does not provide a list of Personal Data types collected.
            <br />
            <br />
            Complete details on each type of Personal Data collected are
            provided in the dedicated sections of this privacy policy or by
            specific explanation texts displayed prior to the Data collection.
            Personal Data may be freely provided by the User, or, in the case of
            Usage Data, collected automatically when using this Application.
            <br />
            <br />
            Unless specified otherwise, all Data requested by this Application
            is mandatory and failure to provide this Data may make it impossible
            for this Application to provide its services. In cases where this
            Application specifically states that some Data is not mandatory,
            Users are free not to communicate this Data without consequences to
            the availability or the functioning of the Service.
            <br />
            <br />
            Users who are uncertain about which Personal Data is mandatory are
            welcome to contact the Owner. Any use of Cookies – or of other
            tracking tools – by this Application or by the owners of third-party
            services used by this Application serves the purpose of providing
            the Service required by the User, in addition to any other purposes
            described in the present document and in the Cookie Policy, if
            available.
            <br />
            <br />
            Users are responsible for any third-party Personal Data obtained,
            published or shared through this Application and confirm that they
            have the third party's consent to provide the Data to the Owner.
          </p>
        </div>
        <div className=" text-xl">
          <h4 className="mt-5 text-xl font-bold">
            Mode and place of processing the Data
          </h4>
          <p className="mt-2 text-lg">
            <strong>
              Methods of processing
              <br />
              &zwj;
            </strong>
            The Owner takes appropriate security measures to prevent
            unauthorized access, disclosure, modification, or unauthorized
            destruction of the Data.
            <br />
            The Data processing is carried out using computers and/or IT enabled
            tools, following organizational procedures and modes strictly
            related to the purposes indicated. In addition to the Owner, in some
            cases, the Data may be accessible to certain types of persons in
            charge, involved with the operation of this Application
            (administration, sales, marketing, legal, system administration) or
            external parties (such as third-party technical service providers,
            mail carriers, hosting providers, IT companies, communications
            agencies) appointed, if necessary, as Data Processors by the Owner.
            The updated list of these parties may be requested from the Owner at
            any time.
          </p>
          <p className="my-5 text-lg">
            <strong>
              Legal basis of processing
              <br />
            </strong>
            The Owner may process Personal Data relating to Users if one of the
            following applies:
          </p>
          <div className=" pl-5">
            <ul role="list" className=" pl-4 text-lg list-disc">
              <li className="text-lg">
                Users have given their consent for one or more specific
                purposes. Note: Under some legislations the Owner may be allowed
                to process Personal Data until the User objects to such
                processing (“opt-out”), without having to rely on consent or any
                other of the following legal bases. This, however, does not
                apply, whenever the processing of Personal Data is subject to
                European data protection law;
              </li>
              <li className="text-lg">
                provision of Data is necessary for the performance of an
                agreement with the User and/or for any pre-contractual
                obligations thereof;
              </li>
              <li className="text-lg">
                processing is necessary for compliance with a legal obligation
                to which the Owner is subject;
              </li>
              <li className="text-lg">
                processing is related to a task that is carried out in the
                public interest or in the exercise of official authority vested
                in the Owner;
              </li>
              <li className="text-lg">
                processing is necessary for the purposes of the legitimate
                interests pursued by the Owner or by a third party.
              </li>
            </ul>
          </div>
          <p className="mt-5 text-lg">
            In any case, the Owner will gladly help to clarify the specific
            legal basis that applies to the processing, and in particular
            whether the provision of Personal Data is a statutory or contractual
            requirement, or a requirement necessary to enter into a contract.
          </p>
          <p className="mt-5 text-lg">
            <strong>Place</strong>
            <br />
            The Data is processed at the Owner's operating offices and in any
            other places where the parties involved in the processing are
            located.&nbsp;
            <br />
            <br />
            Depending on the User's location, data transfers may involve
            transferring the User's Data to a country other than their own. To
            find out more about the place of processing of such transferred
            Data, Users can check the section containing details about the
            processing of Personal Data.
            <br />
            <br />
            Users are also entitled to learn about the legal basis of Data
            transfers to a country outside the European Union or to any
            international organization governed by public international law or
            set up by two or more countries, such as the UN, and about the
            security measures taken by the Owner to safeguard their Data.&nbsp;
            <br />
            <br />
            If any such transfer takes place, Users can find out more by
            checking the relevant sections of this document or inquire with the
            Owner using the information provided in the contact section.
          </p>
          <p className="mt-5 text-lg">
            <strong>
              Retention time
              <br />
            </strong>
            Personal Data shall be processed and stored for as long as required
            by the purpose they have been collected for.
            <br />
            <br />
            Therefore:
          </p>
          <div className=" pl-5">
            <ul role="list" className="pl-4 mt-2 list-disc">
              <li className="text-lg">
                Personal Data collected for purposes related to the performance
                of a contract between the Owner and the User shall be retained
                until such contract has been fully performed.
              </li>
              <li className="text-lg">
                Personal Data collected for the purposes of the Owner’s
                legitimate interests shall be retained as long as needed to
                fulfil such purposes. Users may find specific information
                regarding the legitimate interests pursued by the Owner within
                the relevant sections of this document or by contacting the
                Owner.
              </li>
            </ul>
          </div>
          <p className="mt-5 text-lg">
            The Owner may be allowed to retain Personal Data for a longer period
            whenever the User has given consent to such processing, as long as
            such consent is not withdrawn. Furthermore, the Owner may be obliged
            to retain Personal Data for a longer period whenever required to do
            so for the performance of a legal obligation or upon order of an
            authority.&nbsp;
            <br />
            <br />
            Once the retention period expires, Personal Data shall be deleted.
            Therefore, the right of access, the right to erasure, the right to
            rectification and the right to data portability cannot be enforced
            after expiration of the retention period.
          </p>
        </div>
        <div className=" text-xl">
          <h4 className="mt-5">
            <strong>The rights of Users</strong>
          </h4>
          <p className="mt-2 text-lg">
            Users may exercise certain rights regarding their Data processed by
            the Owner.
            <div className="my-2">
              In particular, Users have the right to do the following:
            </div>
          </p>
          <div className="pl-5">
            <ul role="list" className="pl-4 list-disc">
              <li className="text-lg">
                <strong>Withdraw their consent at any time.</strong> Users have
                the right to withdraw consent where they have previously given
                their consent to the processing of their Personal Data.
              </li>
              <li className="text-lg">
                <strong>Object to processing of their Data.</strong> Users have
                the right to object to the processing of their Data if the
                processing is carried out on a legal basis other than consent.
                Further details are provided in the dedicated section below.
              </li>
              <li className="text-lg">
                <strong>Access their Data.</strong> Users have the right to
                learn if Data is being processed by the Owner, obtain disclosure
                regarding certain aspects of the processing and obtain a copy of
                the Data undergoing processing.
              </li>
              <li className="text-lg">
                <strong>Verify and seek rectification.</strong> Users have the
                right to verify the accuracy of their Data and ask for it to be
                updated or corrected.
              </li>
              <li className="text-lg">
                <strong>Restrict the processing of their Data.</strong> Users
                have the right, under certain circumstances, to restrict the
                processing of their Data. In this case, the Owner will not
                process their Data for any purpose other than storing it.
              </li>
              <li className="text-lg">
                <strong>
                  Have their Personal Data deleted or otherwise removed.{' '}
                </strong>
                Users have the right, under certain circumstances, to obtain the
                erasure of their Data from the Owner.
              </li>
              <li className="text-lg">
                <strong>
                  Receive their Data and have it transferred to another
                  controller.{' '}
                </strong>
                Users have the right to receive their Data in a structured,
                commonly used and machine readable format and, if technically
                feasible, to have it transmitted to another controller without
                any hindrance. This provision is applicable provided that the
                Data is processed by automated means and that the processing is
                based on the User's consent, on a contract which the User is
                part of or on pre-contractual obligations thereof.
              </li>
              <li className="text-lg">
                <strong>Lodge a complaint. </strong>Users have the right to
                bring a claim before their competent data protection authority.
              </li>
            </ul>
          </div>
          <p className="mt-5 text-lg">
            <strong>
              Details about the right to object to processing
              <br />
            </strong>
            Where Personal Data is processed for a public interest, in the
            exercise of an official authority vested in the Owner or for the
            purposes of the legitimate interests pursued by the Owner, Users may
            object to such processing by providing a ground related to their
            particular situation to justify the objection.
            <br />
            <br />
            Users must know that, however, should their Personal Data be
            processed for direct marketing purposes, they can object to that
            processing at any time without providing any justification. To learn
            whether the Owner is processing Personal Data for direct marketing
            purposes, Users may refer to the relevant sections of this document.
          </p>
          <p className="mt-5 text-lg">
            <strong>
              How to exercise these rights
              <br />
            </strong>
            Any requests to exercise User rights can be directed to the Owner
            through the contact details provided in this document. These
            requests can be exercised free of charge and will be addressed by
            the Owner as early as possible and always within one month.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
