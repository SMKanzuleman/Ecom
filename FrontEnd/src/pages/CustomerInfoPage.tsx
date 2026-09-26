type CustomerInfoPageProps = {
  page: "shipping" | "returns" | "terms" | "privacy";
};

type ContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type PageContent = {
  headline: string;
  sections: ContentSection[];
};

const Content: Record<CustomerInfoPageProps["page"], PageContent> = {
  shipping: {
    headline: "Global Logistics & Thoughtful Fulfillment",
    sections: [
      {
        title: "1. Order Processing & Dispatch",
        paragraphs: [
          "All orders placed at ECOM are prepared with meticulous care from our central warehouse atelier. Orders confirmed Monday through Friday before 2:00 PM are dispatched within 24 to 48 business hours. During high-volume seasonal sales and limited-edition capsule drops, dispatch may take up to 72 hours.",
        ],
      },
      {
        title: "2. Shipping Rates & Delivery Estimates",
        paragraphs: ["We offer flexible, insured shipping tiers across all domestic regions:"],
        bullets: [
          "Standard Delivery (Rs. 250): 3 to 5 business days transit time.",
          "Express Priority (Rs. 350): 1 to 2 business days expedited courier transit.",
          "Complimentary Delivery: Automatically applied on qualifying promotional orders exceeding threshold value.",
        ],
      },
      {
        title: "3. Real-Time Tracking & Inspection",
        paragraphs: [
          "Once your parcel is handed over to our courier partner, a tracking number is automatically generated and sent via email. You can also view live delivery milestones directly from your Customer Dashboard under \"My Orders\". We advise inspecting the security seal upon delivery before accepting the parcel.",
        ],
      },
    ],
  },
  returns: {
    headline: "Effortless Returns & Silhouette Adjustments",
    sections: [
      {
        title: "1. 14-Day Return Window",
        paragraphs: [
          "We design garments intended to be loved and worn with confidence. If an item does not meet your expectations, or if you require an alternative size, you may request an exchange or return within 14 calendar days from the date of delivery.",
        ],
      },
      {
        title: "2. Garment Condition Standards",
        paragraphs: [
          "To maintain our strict standards of hygiene and craftsmanship, returned items must comply with the following:",
        ],
        bullets: [
          "Garments must be unworn, unwashed, unaltered, and completely free of marks, makeup blemishes, perfume, or odors.",
          "Original brand tags, security ribbons, and protective packaging must remain intact and attached.",
          "Underwear, bodysuits, and altered custom items are final sale and strictly non-returnable.",
        ],
      },
      {
        title: "3. Refunds & Store Credit",
        paragraphs: ["Once our inspection team receives and verifies the returned parcel:"],
        bullets: [
          "Online Card Payments (Stripe / VISA): Reimbursed to your original payment card within 5 to 7 banking days.",
          "Cash on Delivery (COD): Reimbursed via direct bank transfer or an instant ECOM store credit voucher.",
        ],
      },
    ],
  },
  terms: {
    headline: "Platform Usage & Commercial Terms",
    sections: [
      {
        title: "1. Agreement to Terms",
        paragraphs: [
          "By browsing, registering, or completing a purchase on ECOM, you agree to comply with and be bound by these Terms of Service. These terms govern all sales, content usage, and interactions on our platform.",
        ],
      },
      {
        title: "2. Accuracy of Garments & Colors",
        paragraphs: [
          "We make every effort to display the colors, fabrics, drape, and textures of our apparel as accurately as possible. However, actual colors may slightly vary depending on individual monitor calibrations, mobile screen profiles, and ambient lighting. All prices, stock quantities, and promotional sales are subject to change without prior notice.",
        ],
      },
      {
        title: "3. Order Acceptance & Fraud Prevention",
        paragraphs: [
          "Receipt of an order confirmation does not signify our final acceptance of an order. ECOM reserves the right to decline, cancel, or limit quantities on any purchase suspected of credit card fraud, unauthorized commercial reselling, or bot exploitation.",
        ],
      },
      {
        title: "4. Intellectual Property",
        paragraphs: [
          "All design layouts, garment photography, brand logos, typography, and site copy are the exclusive intellectual property of ECOM. Reproduction or distribution of any digital asset without written permission is strictly prohibited.",
        ],
      },
    ],
  },
  privacy: {
    headline: "Data Protection & Customer Confidentiality",
    sections: [
      {
        title: "1. Information We Collect",
        paragraphs: ["We collect personal details necessary to deliver seamless shopping experiences:"],
        bullets: [
          "Personal & Contact Details: Name, email address, contact phone number, and physical shipping/billing address.",
          "Transaction Records: Order history, purchase details, and delivery statuses.",
          "Security Note: We do not store credit card or debit card numbers on our servers. All bank card transactions are tokenized and processed securely by Stripe’s PCI-DSS compliant vault.",
        ],
      },
      {
        title: "2. Cookies & Secure Authentication",
        paragraphs: [
          "Our web platform uses HTTP-only cookies and stateless JWT tokens strictly for core functionality: maintaining your login session across page refreshes, remembering items stored in your shopping bag, and securing administrative dashboard access.",
        ],
      },
      {
        title: "3. How Your Information Is Used",
        paragraphs: ["Your information is strictly utilized to:"],
        bullets: [
          "Process and ship apparel orders to your doorstep.",
          "Provide real-time delivery status updates and customer support.",
          "Prevent fraudulent payments and protect platform integrity.",
        ],
      },
      {
        title: "4. Zero Data Selling",
        paragraphs: [
          "ECOM will never sell, rent, monetize, or trade your personal data to third-party advertisers or marketing data brokers. Your information is shared only with verified logistical and operational partners (such as courier delivery services) solely to fulfill your order.",
        ],
      },
    ],
  },
};

const CustomerInfoPage = ({ page }: CustomerInfoPageProps) => {
  const content = Content[page];

  return (
    <main className="min-h-[65vh] w-full bg-white">
      <article className="mx-auto w-full max-w-4xl px-6 py-14 md:px-10 md:py-20">
        <div className="mb-10 border-b border-gray-200 pb-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
            ECOM / Customer Care
          </p>
          <h1 className="max-w-3xl font-accent text-3xl font-semibold leading-tight text-black md:text-5xl">
            {content.headline}
          </h1>
          <p className="mt-5 text-sm text-gray-500">Last Updated: September 2026</p>
        </div>

        <div className="space-y-9">
          {content.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-accent font-semibold text-black">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-2 pl-6 text-base leading-7  marker:text-black">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
};

export default CustomerInfoPage;