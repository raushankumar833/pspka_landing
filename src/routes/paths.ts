// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  logout: path(ROOTS_AUTH, '/logout'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  services: '/our-services',
  contact: '/contact-us',
  ourpartners: '/our-partners',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
    termscondition: '/terms-condition',
  privacy: '/privacy'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin'),
    users: path(ROOTS_DASHBOARD, '/admin/users'),
    user_edit: path(ROOTS_DASHBOARD, '/admin/users/edit'),
    // user_edit: (username: string | undefined) => path(ROOTS_DASHBOARD, `/admin/users/${username}/edit`),
    transactions: path(ROOTS_DASHBOARD, '/admin/transactions'),
    creditReq: path(ROOTS_DASHBOARD, '/admin/credit-req'),
    accounts: path(ROOTS_DASHBOARD, '/admin/accounts'),
    banks: path(ROOTS_DASHBOARD, '/admin/banks'),
    message: path(ROOTS_DASHBOARD, '/admin/message'),
    notifications: path(ROOTS_DASHBOARD, '/admin/notifications'),
    operators: path(ROOTS_DASHBOARD, '/admin/operators'),
    routes: path(ROOTS_DASHBOARD, '/admin/routes'),
    plans: path(ROOTS_DASHBOARD, '/admin/plans'),
    complaints: path(ROOTS_DASHBOARD, '/admin/complaints'),
    risk: path(ROOTS_DASHBOARD, '/admin/risk'),
    settings: path(ROOTS_DASHBOARD, '/admin/settings')
  },
  
  customer: {
    root: path(ROOTS_DASHBOARD, '/customer'),
    recharges: path(ROOTS_DASHBOARD, '/customer/recharges'),
    bill_payments: path(ROOTS_DASHBOARD, '/customer/bill-payments'),
    travel: path(ROOTS_DASHBOARD, '/customer/travel'),
    bbps: path(ROOTS_DASHBOARD, '/customer/bbps'),
    cms: path(ROOTS_DASHBOARD, '/customer/cms'),
    money_transfer: path(ROOTS_DASHBOARD, '/customer/money-transfer'),
    aeps: {
      root:path(ROOTS_DASHBOARD, '/customer/aeps'),
      twofa: path(ROOTS_DASHBOARD, '/customer/aeps/twofa'),
    },
    transactions: path(ROOTS_DASHBOARD, '/customer/transactions'),
    credit_req: path(ROOTS_DASHBOARD, '/customer/credit-req'),
  },
  distributor: {
    root: path(ROOTS_DASHBOARD, '/distributor'),
    transactions: path(ROOTS_DASHBOARD, '/distributor/transactions/list'),
    users: path(ROOTS_DASHBOARD, '/distributor/users'),
    creditReq: path(ROOTS_DASHBOARD, '/distributor/credit-req'),
    mySale: path(ROOTS_DASHBOARD, '/distributor/my-sale'),
    myPurchase: path(ROOTS_DASHBOARD, '/distributor/my-purchase')
  },
  sales: {
    root: path(ROOTS_DASHBOARD, '/sales'),
    transactions: path(ROOTS_DASHBOARD, '/sales/transactions/list'),
    users: path(ROOTS_DASHBOARD, '/sales/users'),
    creditReq: path(ROOTS_DASHBOARD, '/sales/credit-req')
  },
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  clients: {
    root: path(ROOTS_DASHBOARD, '/clients'),
    new: path(ROOTS_DASHBOARD, '/clients/new'),
    // edit: (username: string | undefined) => path(ROOTS_DASHBOARD, `/clients/${username}/edit`),
    edit: path(ROOTS_DASHBOARD, `/clients/edit`)
  },
  recharges: {
    root: path(ROOTS_DASHBOARD, '/recharges'),
  },
  bill_payments: {
    root: path(ROOTS_DASHBOARD, '/bill-payments'),
  },
  travel: {
    root: path(ROOTS_DASHBOARD, '/travel'),
  },
  bbps: {
    root: path(ROOTS_DASHBOARD, '/bbps'),
  },
  cms: {
    root: path(ROOTS_DASHBOARD, '/cms'),
  },
  money_transfer: {
    root: path(ROOTS_DASHBOARD, '/money-transfer'),
  },
  nepal_transfer: {
    root: path(ROOTS_DASHBOARD, '/nepal-transfer'),
  },

  vendor_payments: {
    root: path(ROOTS_DASHBOARD, '/vendor-payments'),
  },
  upi_transfer: {
    root: path(ROOTS_DASHBOARD, '/upi'),
  },
  transactions: {
    root: path(ROOTS_DASHBOARD, '/transactions'),
    list: path(ROOTS_DASHBOARD, '/transactions/list'),
  },
  prabhuTransfer: {
    root: path(ROOTS_DASHBOARD, '/admin/prabhu-transfer')
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/admin'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  accounts: {
    root: path(ROOTS_DASHBOARD, '/accounts'),
  },
  banks: {
    root: path(ROOTS_DASHBOARD, '/banks'),
  },
  message: {
    root: path(ROOTS_DASHBOARD, '/message'),
  },
  notifications: {
    root: path(ROOTS_DASHBOARD, '/notifications'),
  },
  operators: {
    root: path(ROOTS_DASHBOARD, '/operators'),
  },
  routes: {
    root: path(ROOTS_DASHBOARD, '/routes'),
  },
  plans: {
    root: path(ROOTS_DASHBOARD, '/plans'),
  },
  complaints: {
    root: path(ROOTS_DASHBOARD, '/complaints'),
  },
  risk: {
    root: path(ROOTS_DASHBOARD, '/risk'),
  },
  creditReq: {
    root: path(ROOTS_DASHBOARD, '/credit-req'),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/OBEorYicjdbIT6P1YQTTK7/%5BPreview%5D-minimal-Web.15.10.22?node-id=0%3A1';
