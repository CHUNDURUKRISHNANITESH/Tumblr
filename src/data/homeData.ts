const profileImages = [
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467477/pngwing.com_8_ppae0y.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467479/pngwing.com_1_movuud.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467478/pngwing.com_3_hgowjc.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467478/pngwing.com_4_kumecu.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467478/pngwing.com_2_lhpj0f.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467477/pngwing.com_6_s2aegt.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467476/pngwing.com_9_g7igdo.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467476/pngwing.com_5_awuxqi.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467476/pngwing.com_7_c0av9z.png",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467476/pngwing.com_10_p0irvq.png"
];

const postImages = [
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467966/images_1_ieezfy.jpg",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467966/amazing-vacation-beach-chairs-on-the-sandy-beach-near-the-sea-summer-romantic-holiday-tourism-beautiful-tropical-island-landscape-tranquil-shore-scenery-relax-sand-seaside-horizon-palm-leaves-photo_jocyd1.jpg",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467966/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3NrOTc5MS1pbWFnZS1rd3Z1amE5Ni5qcGc_z6hvyx.webp",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467966/images_ignvoc.jpg",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467967/pngtree-beautiful-nature-scenery-wallpaper-view-image_16172461_hms4yk.jpg",
    "https://res.cloudinary.com/diazmm0lw/image/upload/v1782467967/istockphoto-2166773378-612x612_ecskal.jpg"
];

const names = [
    'Krishna',
    'Nitesh',
    'Rahul',
    'Lakshmi',
    'Mahesh',
    'Vijay',
    'Kabir',
    'Rohan',
    'Saanvi',
    'Diya',
];

const captions = [
    "Enjoying the weekend vibes",
    "Life is better at the beach",
    "Good food = good mood",
    "Exploring new places",
    "Chasing sunsets",
    "Stay positive, work hard",
];

export const stories = profileImages.map((image, index) => ({
    id: (index + 1).toString(),
    username: names[index],
    image,
}));

export const posts = postImages.map((image, index) => ({
    id: (index + 1).toString(),
    username: names[index],
    profile: profileImages[index],
    postImage: image,
    caption: captions[index],
    likes: 100 + index * 10,
}));