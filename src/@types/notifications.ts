export interface NotificationInterface {
    id: number;
    user_id: number;
    is_read: number;
    message: string;
    notification_id: number;
    priority: string;
    role: string | null;
    created_at: Date;
    updated_at: Date;
  }