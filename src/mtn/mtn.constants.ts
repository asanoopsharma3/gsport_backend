/** Static subscription body fields. MSISDN is in the URL; subscriptionId comes from Excel plan_id. */
export const MTN_SUBSCRIPTION_PAYLOAD = {
  subscriptionProviderId: 'CSM',
  registrationChannel: 'WAP',
  subscriptionPaymentSource: 'Airtime',
  sendSMSNotification: 'false',
  'auto-renew': 'true',
} as const;

/** plan_id (subscriptionId) → subscriptionName for MTN request and subscription_misdns log. */
export const MTN_PLAN_ID_TO_SUBSCRIPTION_NAME = {
  '26801220000007959': 'GlobalSportsDaily',
  '26801220000007961': 'GlobalSportsWeekly',
  '26801220000007962': 'GlobalSportsMonthly',
} as const;

/** Request header transactionid: 8 chars, letter-digit-letter-digit pattern (e.g. a1b2c3d4). */
export const MTN_REQUEST_TRANSACTION_ID_LENGTH = 8;

export const MTN_UPLOAD_DIR = 'storage/uploads/mtn';
export const MTN_ENQUEUE_CHUNK_SIZE = 500;
export const MTN_QUEUE_CHUNK_SIZE = 10;
export const MTN_QUEUE_INTERVAL_MS = 5000;
export const MTN_QUEUE_ENABLED = true;
