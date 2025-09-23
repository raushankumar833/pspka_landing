// ----------------------------------------------------------------------

export type IClientSocialLink = {
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type IClientProfileFollowers = {
  follower: number;
  following: number;
};

export type IClientProfileCover = {
  name: string;
  cover: string;
  role: string;
};

export type IClientProfileAbout = {
  quote: string;
  country: string;
  email: string;
  role: string;
  company: string;
  school: string;
};

export type IClientProfile = IClientProfileFollowers &
  IClientProfileAbout & {
    id: string;
    socialLinks: IClientSocialLink;
  };

export type IClientProfileFollower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type IClientProfileGallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type IClientProfileFriend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type IClientProfilePost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};

// ----------------------------------------------------------------------

export type IClientCard = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPosts: number;
  role: string;
};

// ----------------------------------------------------------------------

export type IClientAccountGeneral = {
  mobile?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  aadhaar?: string;
  pan?: string;
  name?: string;
  gst?: string;
  address?: string;
  email?: string;
};

export type IClientAccountBillingCreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type IClientAccountBillingInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type IClientAccountBillingAddress = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type IClientAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IClientAccountNotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};
