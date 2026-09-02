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
                    "https://images.unsplash.com/photo-1610945415295-d9bbf957e3cb?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop",
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
                    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop",
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

    const additionalDeviceData = [
        {
            DeviceName: "Google Pixel 9 Pro", Brand: "Google", Model: "G2YBB", Quantity: 11, Price: 999.99,
            Description: "AI-powered flagship phone with a pro camera system and all-day battery.", categoryid: categories[0].CategoryId,
            Images: ["https://images.unsplash.com/photo-1598327105666-5b89351affe3?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1610945415295-d9bbf957e3cb?w=800&h=800&fit=crop"],
            Specifications: { processor: "Google Tensor G4", ram: "16GB", storage: "256GB", display: "6.3-inch OLED", camera: "50MP triple camera" },
            Condition: "New", SerialNumber: "PIXEL9PRO", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "OnePlus 12", Brand: "OnePlus", Model: "CPH2573", Quantity: 13, Price: 799.99,
            Description: "Fast, bright Android phone with a Hasselblad camera and large battery.", categoryid: categories[0].CategoryId,
            Images: ["https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&h=800&fit=crop"],
            Specifications: { processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", display: "6.82-inch AMOLED", camera: "50MP triple camera" },
            Condition: "New", SerialNumber: "ONEPLUS12", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "Lenovo ThinkPad X1 Carbon", Brand: "Lenovo", Model: "21HM", Quantity: 8, Price: 1549.99,
            Description: "Lightweight business laptop with a durable chassis and all-day productivity.", categoryid: categories[1].CategoryId,
            Images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop"],
            Specifications: { processor: "Intel Core Ultra 7", ram: "32GB", storage: "1TB SSD", display: "14-inch IPS", battery: "15 hours" },
            Condition: "New", SerialNumber: "THINKPADX1", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "ASUS ROG Zephyrus G16", Brand: "ASUS", Model: "GU605", Quantity: 6, Price: 1999.99,
            Description: "Slim gaming laptop with a high-refresh OLED display and dedicated graphics.", categoryid: categories[1].CategoryId,
            Images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop"],
            Specifications: { processor: "Intel Core Ultra 9", ram: "32GB", storage: "1TB SSD", display: "16-inch OLED 240Hz", gpu: "RTX 4070" },
            Condition: "New", SerialNumber: "ROGG16", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "Microsoft Surface Pro 11", Brand: "Microsoft", Model: "ZHX-00001", Quantity: 10, Price: 1199.99,
            Description: "Versatile detachable tablet with a sharp display and laptop-class performance.", categoryid: categories[2].CategoryId,
            Images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop"],
            Specifications: { processor: "Snapdragon X Plus", ram: "16GB", storage: "512GB", display: "13-inch PixelSense", battery: "14 hours" },
            Condition: "New", SerialNumber: "SURFACE11", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "Amazon Fire Max 11", Brand: "Amazon", Model: "KFTUWI", Quantity: 18, Price: 229.99,
            Description: "Large-screen tablet for streaming, reading, and everyday browsing.", categoryid: categories[2].CategoryId,
            Images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop"],
            Specifications: { processor: "Octa-core", ram: "4GB", storage: "64GB", display: "11-inch 2K", battery: "14 hours" },
            Condition: "New", SerialNumber: "FIREMAX11", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "Bose QuietComfort Ultra", Brand: "Bose", Model: "QCULTRA", Quantity: 16, Price: 429.99,
            Description: "Immersive wireless headphones with adaptive noise cancellation and rich sound.", categoryid: categories[3].CategoryId,
            Images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"],
            Specifications: { driver: "35mm", battery: "24 hours", weight: "253g", connection: "Bluetooth 5.1" },
            Condition: "New", SerialNumber: "BOSEQCULTRA", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "JBL Live Pro 2", Brand: "JBL", Model: "JBLLIVEPRO2", Quantity: 22, Price: 149.99,
            Description: "True wireless earbuds with adaptive noise cancellation and a wireless case.", categoryid: categories[3].CategoryId,
            Images: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"],
            Specifications: { type: "In-ear", battery: "10 hours", caseBattery: "40 hours", connection: "Bluetooth 5.2" },
            Condition: "New", SerialNumber: "JBLLIVEPRO2", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "Google Pixel Watch 3", Brand: "Google", Model: "GA05748", Quantity: 12, Price: 399.99,
            Description: "Fitness-focused smartwatch with advanced health insights and a bright display.", categoryid: categories[4].CategoryId,
            Images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"],
            Specifications: { display: "1.4-inch AMOLED", processor: "Snapdragon W5", battery: "24 hours", water: "5ATM", sensors: "ECG, SpO2" },
            Condition: "New", SerialNumber: "PIXELWATCH3", status: "CONFIRMED" as const,
        },
        {
            DeviceName: "Garmin Venu 3", Brand: "Garmin", Model: "010-02784-00", Quantity: 9, Price: 449.99,
            Description: "Health and fitness smartwatch with sleep coaching and long battery life.", categoryid: categories[4].CategoryId,
            Images: ["https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"],
            Specifications: { display: "1.4-inch AMOLED", battery: "14 days", water: "5ATM", sensors: "Heart rate, Pulse Ox" },
            Condition: "New", SerialNumber: "GARMINVENU3", status: "CONFIRMED" as const,
        },
    ];

    const additionalDevices = await Promise.all(
        additionalDeviceData.map((data) => prisma.device.create({ data }))
    );

    console.log(`✅ Created ${devices.length + additionalDevices.length} devices`);
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
