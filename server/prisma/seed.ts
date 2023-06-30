import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function popularCars() {
  await prisma.popularCar.deleteMany();
  const popularCar = await prisma.popularCar.createMany({
    data: [
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/car_hepx1a.png',
        name: 'Koenigsegg',
        gearType: 'Automatic',
        gasTank: '90l',
        passenger: '2',
        dailyPrice: '99.00',
        monthlyPrice: '2000',
        vehicle: 'Sport',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_3_dcdcg6.png',
        name: 'Nissan GT-R',
        gearType: 'Automatic',
        gasTank: '80l',
        passenger: '2',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'Sport',
        discountPrice: '100.00',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_2_md3cwq.png',
        name: 'Rolls Royce',
        gearType: 'Manual',
        gasTank: '70l',
        passenger: '2',
        dailyPrice: '96.00',
        monthlyPrice: '2000',
        vehicle: 'Sedan',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_3_dcdcg6.png',
        name: 'Nissan GT-R',
        gearType: 'Automatic',
        gasTank: '80l',
        passenger: '2',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'Sport',
        discountPrice: '100.00',
      },
    ],
  });
  console.log({ popularCar });
}

async function orderStatus() {
  await prisma.orderStatus.deleteMany();
  const orderStatus = await prisma.orderStatus.createMany({
    data: [
      {
        name: 'Processed',
      },
      {
        name: 'Shipped',
      },
      {
        name: 'Delivered',
      },
      {
        name: 'Cancelled',
      },
    ],
  });
  console.log({ orderStatus });
}

async function mainCars() {
  await prisma.car.deleteMany();
  const cars = await prisma.car.createMany({
    data: [
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584801/Car_10_gfxciu.png',
        name: 'MG ZX Excite',
        gearType: 'Manual',
        gasTank: '50l',
        passenger: '4',
        dailyPrice: '74.00',
        monthlyPrice: '2000',
        vehicle: 'Hatchback',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584800/Car_8_gl7y9p.png',
        name: 'MG ZX Excite',
        gearType: 'Manual',
        gasTank: '70l',
        passenger: '4',
        dailyPrice: '76.00',
        monthlyPrice: '2000',
        vehicle: 'Hatchback',
        discountPrice: '80.00',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584800/Car_6_wfb2ni.png',
        name: 'All New Terios',
        gearType: 'Manual',
        gasTank: '90l',
        passenger: '6',
        dailyPrice: '74.00',
        monthlyPrice: '2000',
        vehicle: 'SUV',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584800/Car_9_yb6eky.png',
        name: 'New MGZS',
        gearType: 'Manual',
        gasTank: '80l',
        passenger: '6',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'SUV',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584800/Car_5_bvhiwv.png',
        name: 'CR -V',
        gearType: 'Manual',
        gasTank: '80l',
        passenger: '6',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'SUV',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/car_hepx1a.png',
        name: 'Koenigsegg',
        gearType: 'Automatic',
        gasTank: '90l',
        passenger: '2',
        dailyPrice: '99.00',
        monthlyPrice: '2000',
        vehicle: 'Sport',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_3_dcdcg6.png',
        name: 'Nissan GT-R',
        gearType: 'Automatic',
        gasTank: '80l',
        passenger: '2',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'Sport',
        discountPrice: '100.00',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_2_md3cwq.png',
        name: 'Rolls Royce',
        gearType: 'Manual',
        gasTank: '70l',
        passenger: '2',
        dailyPrice: '96.00',
        monthlyPrice: '2000',
        vehicle: 'Sedan',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_3_dcdcg6.png',
        name: 'Nissan GT-R',
        gearType: 'Automatic',
        gasTank: '80l',
        passenger: '2',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'Sport',
        discountPrice: '100.00',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584800/Car_7_cspdsp.png',
        name: 'CR -V',
        gearType: 'Manual',
        gasTank: '80l',
        passenger: '6',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'SUV',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_4_xpurjl.png',
        name: 'All New Rush',
        gearType: 'Manual',
        gasTank: '80l',
        passenger: '6',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'SUV',
        discountPrice: '80.00',
      },
      {
        thumbnailSrc:
          'https://res.cloudinary.com/dqxnzmlmj/image/upload/v1681584799/Car_11_awlhlb.png',
        name: 'New MGZS',
        gearType: 'Manual',
        gasTank: '80l',
        passenger: '6',
        dailyPrice: '80.00',
        monthlyPrice: '2000',
        vehicle: 'SUV',
      },
    ],
  });
  console.log({ cars });
}

mainCars()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

popularCars()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

orderStatus()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
