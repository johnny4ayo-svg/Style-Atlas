const fs = require('fs');
const path = require('path');

const metadataMap = {
  '/directory': {
    title: 'Nigerian Fashion Professionals Directory | STYLEATLAS',
    description: 'Find top Nigerian fashion designers, tailors, photographers, and brands. Browse verified professionals for your next custom outfit or styling project.',
    file: 'src/app/directory/page.tsx'
  },
  '/marketplace': {
    title: 'Nigerian Fashion Marketplace | STYLEATLAS',
    description: 'Shop ready-to-wear, accessories and made-to-order pieces from independent Nigerian labels and verified fashion businesses.',
    file: 'src/app/marketplace/page.tsx'
  },
  '/events': {
    title: 'Nigerian Fashion Events | STYLEATLAS',
    description: 'Discover upcoming fashion shows, masterclasses, exhibitions and networking events in the Nigerian fashion industry.',
    file: 'src/app/events/page.tsx'
  },
  '/jobs': {
    title: 'Nigerian Fashion Jobs | STYLEATLAS',
    description: 'Find career opportunities in the Nigerian fashion industry. Apply for roles in design, retail, marketing, tailoring and production.',
    file: 'src/app/jobs/page.tsx'
  },
  '/pricing': {
    title: 'Membership Plans for Fashion Businesses | STYLEATLAS',
    description: 'View membership plans and pricing for fashion professionals on STYLEATLAS. Choose the plan that fits your business needs.',
    file: 'src/app/pricing/page.tsx'
  },
  '/help': {
    title: 'STYLEATLAS Help Centre',
    description: 'Find answers, guides and support for using the STYLEATLAS platform as a shopper, professional or brand.',
    file: 'src/app/help/page.tsx'
  },
  '/journal': {
    title: 'Nigerian Fashion Journal | STYLEATLAS',
    description: 'Read the latest stories, interviews, trends and business insights from the Nigerian fashion industry.',
    file: 'src/app/journal/page.tsx'
  },
  '/add-business': {
    title: 'List Your Fashion Business | STYLEATLAS',
    description: 'Add your fashion business to the STYLEATLAS directory. Reach new clients and showcase your portfolio.',
    file: 'src/app/add-business/page.tsx'
  },
  '/verification': {
    title: 'How STYLEATLAS Verification Works',
    description: 'Learn about our editorial review process and what it takes to become a verified fashion professional on STYLEATLAS.',
    file: 'src/app/verification/page.tsx'
  },
  '/about': {
    title: 'About STYLEATLAS | Nigerian Fashion Directory',
    description: 'Learn about our mission to organize and elevate the Nigerian fashion industry by connecting trusted professionals with buyers.',
    file: 'src/app/about/page.tsx'
  },
  '/contact': {
    title: 'Contact STYLEATLAS',
    description: 'Get in touch with the STYLEATLAS team for support, partnerships, or general enquiries.',
    file: 'src/app/contact/page.tsx'
  },
  '/privacy': {
    title: 'Privacy Policy | STYLEATLAS',
    description: 'Read the STYLEATLAS privacy policy to understand how we collect, use, and protect your personal information.',
    file: 'src/app/privacy/page.tsx'
  },
  '/terms': {
    title: 'Terms of Service | STYLEATLAS',
    description: 'Read the terms of service and conditions for using the STYLEATLAS platform and services.',
    file: 'src/app/terms/page.tsx'
  },
  '/accessibility': {
    title: 'Accessibility Statement | STYLEATLAS',
    description: 'Read our accessibility statement and our commitment to making STYLEATLAS usable for everyone.',
    file: 'src/app/accessibility/page.tsx'
  },
  '/editorial-policy': {
    title: 'Editorial Policy | STYLEATLAS',
    description: 'Understand the editorial standards and guidelines governing content and verification on STYLEATLAS.',
    file: 'src/app/editorial-policy/page.tsx'
  }
};

for (const [route, config] of Object.entries(metadataMap)) {
  const filePath = path.join(__dirname, config.file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${route} (file not found)`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const metadataBlock = `export const metadata: Metadata = {
  title: "${config.title}",
  description: "${config.description}",
  alternates: {
    canonical: '${route}'
  },
  openGraph: {
    url: '${route}'
  }
};`;

  if (!content.includes('import type { Metadata }')) {
    content = 'import type { Metadata } from "next";\n' + content;
  }

  // Remove existing metadata block if any (regex to match export const metadata...)
  // We'll just use a simple replace if it's already structured, but better is regex
  const metaRegex = /export const metadata:\s*Metadata\s*=\s*\{[\s\S]*?\};/m;
  const generateMetaRegex = /export async function generateMetadata[\s\S]*?\}\s*;/m;
  
  if (metaRegex.test(content)) {
    content = content.replace(metaRegex, metadataBlock);
  } else if (generateMetaRegex.test(content)) {
      // For pages that dynamically generate metadata like marketplace (since search params might dictate it),
      // Actually, instructions say "Exactly one canonical exists on every public indexable route."
      // Let's replace the return object of generateMetadata
      content = content.replace(generateMetaRegex, `export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const q = searchParams?.q ? \` - \${searchParams.q}\` : "";
  return {
    title: \`${config.title.replace(' | STYLEATLAS', '')}\${q} | STYLEATLAS\`,
    description: "${config.description}",
    alternates: {
      canonical: '${route}'
    },
    openGraph: {
      url: '${route}'
    }
  };
}`);
  } else {
    // Insert after imports
    const lines = content.split('\n');
    const lastImportIndex = lines.findLastIndex(line => line.startsWith('import '));
    lines.splice(lastImportIndex + 1, 0, '\n' + metadataBlock + '\n');
    content = lines.join('\n');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated metadata for ${route}`);
}
