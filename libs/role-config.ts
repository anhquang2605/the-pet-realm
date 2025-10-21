// lib/order-config.ts
export const roleConfig = {
  admin: {
    title: 'Admin Order Management',
    canEditPrice: true,
    canEditStatus: true,
    canFeature: true,
    canDelete: true,
    showAllOrders: true,
    showAnalytics: true,
    allowedStatuses: ['fresh', 'pending', 'completed', 'cancelled'],
    submitButtonText: 'Create Order as Admin',
    description: 'Full administrative access to order management'
  },
  manager: {
    title: 'Manager Order Dashboard',
    canEditPrice: true,
    canEditStatus: true,
    canFeature: false,
    canDelete: false,
    showAllOrders: true,
    showAnalytics: true,
    allowedStatuses: ['fresh', 'pending', 'completed'],
    submitButtonText: 'Create Order as Manager',
    description: 'Manager-level order management capabilities'
  },
  user: {
    title: 'Create New Order',
    canEditPrice: false,
    canEditStatus: false,
    canFeature: false,
    canDelete: false,
    showAllOrders: false,
    showAnalytics: false,
    allowedStatuses: ['fresh'],
    submitButtonText: 'Submit Order',
    description: 'Create a new order request'
  },
  guest: {
    title: 'Order Request Form',
    canEditPrice: false,
    canEditStatus: false,
    canFeature: false,
    canDelete: false,
    showAllOrders: false,
    showAnalytics: false,
    allowedStatuses: ['fresh'],
    submitButtonText: 'Request Order',
    description: 'Submit an order request for review'
  }
} as const;

export type UserRole = keyof typeof roleConfig;