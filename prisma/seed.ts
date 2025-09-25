/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Data for branches and their respective services with PHP pricing
const branchesData = [
  {
    branchTitle: "Nails",
    services: [
      {
        title: "Classic Manicure",
        description:
          "Includes nail shaping, cuticle care, a relaxing hand massage, and a polish of your choice.",
        price: 350, // Represents ₱350.00
      },
      {
        title: "Spa Pedicure",
        description:
          "A luxurious foot treatment with an aromatic soak, exfoliation, callus removal, massage, and polish.",
        price: 650, // Represents ₱650.00
      },
      {
        title: "Gel Polish Manicure",
        description:
          "A classic manicure finished with a long-lasting, chip-resistant gel polish cured under a UV light.",
        price: 900, // Represents ₱900.00
      },
      {
        title: "Nail Art (per nail)",
        description:
          "Add a creative touch to your nails with our custom designs, from simple gems to intricate patterns.",
        price: 100, // Represents ₱100.00
      },
      {
        title: "Acrylic Full Set",
        description:
          "Durable and beautiful nail extensions to add length and strength to your natural nails.",
        price: 1800, // Represents ₱1,800.00
      },
    ],
  },
  {
    branchTitle: "Spa",
    services: [
      {
        title: "Swedish Massage (60 min)",
        description:
          "A gentle, full-body massage using long, flowing strokes to reduce tension and promote relaxation.",
        price: 1200, // Represents ₱1,200.00
      },
      {
        title: "Deep Tissue Massage (60 min)",
        description:
          "Targets the deeper layers of muscle and connective tissue to relieve chronic pain and muscle tightness.",
        price: 1500, // Represents ₱1,500.00
      },
      {
        title: "Hot Stone Massage",
        description:
          "Heated, smooth stones are placed on key points of the body to ease muscle stiffness and increase circulation.",
        price: 2000, // Represents ₱2,000.00
      },
      {
        title: "Aromatherapy Add-on",
        description:
          "Enhance your massage experience with a custom blend of essential oils to soothe, energize, or balance.",
        price: 250, // Represents ₱250.00
      },
      {
        title: "Detoxifying Body Wrap",
        description:
          "A treatment designed to draw out impurities, hydrate the skin, and leave you feeling refreshed and rejuvenated.",
        price: 2800, // Represents ₱2,800.00
      },
    ],
  },
  {
    branchTitle: "Lashes",
    services: [
      {
        title: "Classic Lash Extensions (Full Set)",
        description:
          "One individual extension is applied to each natural lash, creating a subtle, mascara-like effect.",
        price: 2000, // Represents ₱2,000.00
      },
      {
        title: "Volume Lash Extensions (Full Set)",
        description:
          "Multiple lightweight extensions are fanned out and applied to each natural lash for a full, dramatic look.",
        price: 3000, // Represents ₱3,000.00
      },
      {
        title: "Lash Lift & Tint",
        description:
          "A semi-permanent treatment that gives your natural lashes a beautiful curl and a darker, fuller appearance.",
        price: 1800, // Represents ₱1,800.00
      },
      {
        title: "Lash Fill (2-3 Weeks)",
        description:
          "Maintain your extensions by filling in any gaps where lashes have naturally shed.",
        price: 1100, // Represents ₱1,100.00
      },
      {
        title: "Lash Extension Removal",
        description:
          "Safe and gentle removal of existing eyelash extensions without damaging your natural lashes.",
        price: 500, // Represents ₱500.00
      },
    ],
  },
  {
    branchTitle: "Skin Improvement",
    services: [
      {
        title: "Signature Facial",
        description:
          "A customized facial tailored to your specific skin needs, including cleansing, exfoliation, extraction, and hydration.",
        price: 1500, // Represents ₱1,500.00
      },
      {
        title: "Chemical Peel",
        description:
          "Improves skin texture and tone by applying a chemical solution that causes the outer layer of skin to peel off.",
        price: 3000, // Represents ₱3,000.00
      },
      {
        title: "Microdermabrasion",
        description:
          "A minimally invasive procedure to renew overall skin tone and texture, improving sun damage and fine lines.",
        price: 2800, // Represents ₱2,800.00
      },
      {
        title: "Hydrating Facial",
        description:
          "An intensely moisturizing treatment that replenishes dry, dehydrated skin, leaving it plump and glowing.",
        price: 1800, // Represents ₱1,800.00
      },
      {
        title: "LED Light Therapy",
        description:
          "Uses different wavelengths of light to treat acne, reduce inflammation, and promote anti-aging effects.",
        price: 1000, // Represents ₱1,000.00
      },
    ],
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Optional: Clean up existing data to avoid duplicates
  console.log("Deleting existing service units and branches...");
  await prisma.serviceUnit.deleteMany();
  await prisma.branch.deleteMany();
  console.log("Existing data deleted.");

  for (const branch of branchesData) {
    const newBranch = await prisma.branch.create({
      data: {
        title: branch.branchTitle,
        services: {
          create: branch.services, // Use nested write to create all services for this branch
        },
      },
    });
    console.log(
      `Created branch: ${newBranch.title} with ${branch.services.length} services.`
    );
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
 */
