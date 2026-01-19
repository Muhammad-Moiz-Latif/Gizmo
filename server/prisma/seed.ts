import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await prisma.device.deleteMany();
    await prisma.category.deleteMany();

    console.log("🗑️  Cleared existing data");

    // Create Categories
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                CategoryName: "Smartphones",
                Image: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop",
                Description: "Latest smartphones and mobile devices",
            },
        }),
        prisma.category.create({
            data: {
                CategoryName: "Laptops",
                Image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
                Description: "High-performance laptops and notebooks",
            },
        }),
        prisma.category.create({
            data: {
                CategoryName: "Tablets",
                Image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
                Description: "Tablets and portable displays",
            },
        }),
        prisma.category.create({
            data: {
                CategoryName: "Headphones",
                Image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                Description: "Premium audio and headphone devices",
            },
        }),
        prisma.category.create({
            data: {
                CategoryName: "Smartwatches",
                Image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                Description: "Wearable smartwatches and fitness trackers",
            },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create Devices
    const devices = await Promise.all([
        // Smartphones
        prisma.device.create({
            data: {
                DeviceName: "iPhone 15 Pro Max",
                Brand: "Apple",
                Model: "A3286",
                Quantity: 15,
                Price: 1199.99,
                Description:
                    "Latest flagship iPhone with A17 Pro chip, 48MP camera, and titanium design",
                Images: [
                    "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    processor: "A17 Pro",
                    ram: "8GB",
                    storage: "256GB",
                    display: "6.7-inch Super Retina XDR",
                    camera: "48MP main + 12MP ultra-wide",
                },
                categoryid: categories[0].CategoryId,
                Condition: "New",
                SerialNumber: "MGDC3LL/A",
                status: "CONFIRMED",
            },
        }),
        prisma.device.create({
            data: {
                DeviceName: "Samsung Galaxy S24",
                Brand: "Samsung",
                Model: "SM-S921B",
                Quantity: 12,
                Price: 999.99,
                Description: "Flagship Android phone with Snapdragon 8 Gen 3, AMOLED display",
                Images: [
                    "https://images.unsplash.com/photo-1610945415295-d9bbf957e3cb?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    processor: "Snapdragon 8 Gen 3",
                    ram: "12GB",
                    storage: "256GB",
                    display: "6.2-inch Dynamic AMOLED",
                    camera: "50MP main + 12MP telephoto",
                },
                categoryid: categories[0].CategoryId,
                Condition: "New",
                SerialNumber: "SM-S921B",
                status: "CONFIRMED",
            },
        }),

        // Laptops
        prisma.device.create({
            data: {
                DeviceName: "MacBook Pro 16",
                Brand: "Apple",
                Model: "MVVL2LL/A",
                Quantity: 8,
                Price: 2499.99,
                Description: "16-inch MacBook Pro with M3 Pro chip, 18GB RAM, 512GB SSD",
                Images: [
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1529277525253-cf7f0526f68e?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    processor: "M3 Pro",
                    ram: "18GB",
                    storage: "512GB SSD",
                    display: "16-inch Liquid Retina XDR",
                    gpu: "18-core GPU",
                },
                categoryid: categories[1].CategoryId,
                Condition: "New",
                SerialNumber: "MVVL2LL/A",
                status: "CONFIRMED",
            },
        }),
        prisma.device.create({
            data: {
                DeviceName: "Dell XPS 15",
                Brand: "Dell",
                Model: "9530",
                Quantity: 10,
                Price: 1899.99,
                Description:
                    "15.6-inch OLED laptop with Intel Core i9, RTX 4090, premium aluminum chassis",
                Images: [
                    "https://images.unsplash.com/photo-1529277525253-cf7f0526f68e?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    processor: "Intel Core i9-13900HX",
                    ram: "32GB DDR5",
                    storage: "1TB NVMe SSD",
                    display: "15.6-inch OLED (3456 x 2160)",
                    gpu: "RTX 4090",
                },
                categoryid: categories[1].CategoryId,
                Condition: "New",
                SerialNumber: "DELL9530",
                status: "CONFIRMED",
            },
        }),

        // Tablets
        prisma.device.create({
            data: {
                DeviceName: "iPad Pro 12.9",
                Brand: "Apple",
                Model: "MHWA3LL/A",
                Quantity: 7,
                Price: 1099.99,
                Description: "12.9-inch iPad Pro with M2 chip, 120Hz ProMotion display, Apple Pencil",
                Images: [
                    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    processor: "M2",
                    ram: "8GB",
                    storage: "256GB",
                    display: "12.9-inch Liquid Retina XDR",
                    battery: "40-hour battery life",
                },
                categoryid: categories[2].CategoryId,
                Condition: "New",
                SerialNumber: "MHWA3LL/A",
                status: "CONFIRMED",
            },
        }),
        prisma.device.create({
            data: {
                DeviceName: "Samsung Galaxy Tab S9",
                Brand: "Samsung",
                Model: "SM-X710",
                Quantity: 9,
                Price: 799.99,
                Description: "11-inch AMOLED tablet with Snapdragon 8 Gen 2 Lead",
                Images: [
                    "https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    processor: "Snapdragon 8 Gen 2 Lead",
                    ram: "8GB",
                    storage: "128GB",
                    display: "11-inch Dynamic AMOLED",
                    battery: "13,050 mAh",
                },
                categoryid: categories[2].CategoryId,
                Condition: "New",
                SerialNumber: "SM-X710",
                status: "CONFIRMED",
            },
        }),

        // Headphones
        prisma.device.create({
            data: {
                DeviceName: "Sony WH-1000XM5",
                Brand: "Sony",
                Model: "WH1000XM5",
                Quantity: 20,
                Price: 379.99,
                Description:
                    "Premium noise-canceling wireless headphones with 30-hour battery life",
                Images: [
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    driver: "40mm",
                    frequency: "4Hz - 40kHz",
                    battery: "30 hours",
                    weight: "250g",
                    connection: "Bluetooth 5.3",
                },
                categoryid: categories[3].CategoryId,
                Condition: "New",
                SerialNumber: "WH1000XM5",
                status: "CONFIRMED",
            },
        }),
        prisma.device.create({
            data: {
                DeviceName: "Apple AirPods Pro",
                Brand: "Apple",
                Model: "A2938",
                Quantity: 25,
                Price: 249.99,
                Description: "AirPods Pro with adaptive audio and personalized spatial audio",
                Images: [
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    type: "In-ear",
                    battery: "6 hours (30 hours with case)",
                    weight: "4.3g (single unit)",
                    driver: "Custom Apple",
                    connection: "H1 chip with Bluetooth",
                },
                categoryid: categories[3].CategoryId,
                Condition: "New",
                SerialNumber: "A2938",
                status: "CONFIRMED",
            },
        }),

        // Smartwatches
        prisma.device.create({
            data: {
                DeviceName: "Apple Watch Series 9",
                Brand: "Apple",
                Model: "A2968",
                Quantity: 16,
                Price: 429.99,
                Description: "Advanced fitness tracking with Always-On Retina display and health sensors",
                Images: [
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    display: "Always-On Retina",
                    processor: "S9",
                    battery: "18 hours",
                    water: "5ATM + water resistant",
                    sensors: "ECG, Blood Oxygen, Temperature",
                },
                categoryid: categories[4].CategoryId,
                Condition: "New",
                SerialNumber: "A2968",
                status: "CONFIRMED",
            },
        }),
        prisma.device.create({
            data: {
                DeviceName: "Samsung Galaxy Watch 6",
                Brand: "Samsung",
                Model: "SM-R940",
                Quantity: 14,
                Price: 299.99,
                Description:
                    "AMOLED smartwatch with Exynos W920 processor and health monitoring",
                Images: [
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                ],
                Specifications: {
                    display: "1.3-inch AMOLED",
                    processor: "Exynos W920",
                    battery: "40 hours",
                    water: "5ATM",
                    sensors: "ECG, SpO2, Temperature, Stress",
                },
                categoryid: categories[4].CategoryId,
                Condition: "New",
                SerialNumber: "SM-R940",
                status: "CONFIRMED",
            },
        }),
    ]);

    console.log(`✅ Created ${devices.length} devices`);
    console.log("🌱 Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
