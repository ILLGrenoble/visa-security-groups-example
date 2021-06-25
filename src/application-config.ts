export class ApplicationConfig {

  server: {
    port: number,
    host: string,
    authToken: string
  }

  database: {
    type: string;
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    schema: string;
    logging: boolean;
  }

  logging: {
    level: string;
    timezone: string;
    syslog: {
      host: string,
      port: number,
      appName: string
    }
  };

  constructor(data?: Partial<ApplicationConfig>) {
    Object.assign(this, data);
  }
}

let applicationConfig: ApplicationConfig;

export function APPLICATION_CONFIG(): ApplicationConfig {
  if (applicationConfig == null) {
    applicationConfig = {
      server: {
        port: process.env.VISA_SECURITY_GROUPS_SERVER_PORT == null ? 4000 : +process.env.VISA_SECURITY_GROUPS_SERVER_PORT,
        host: process.env.VISA_SECURITY_GROUPS_SERVER_HOST == null ? 'localhost' : process.env.VISA_SECURITY_GROUPS_SERVER_HOST,
        authToken: process.env.VISA_SECURITY_GROUPS_SERVER_AUTH_TOKEN
      },
      database: {
        type: process.env.VISA_SECURITY_GROUPS_DATABASE_TYPE,
        host: process.env.VISA_SECURITY_GROUPS_DATABASE_HOST,
        port: process.env.VISA_SECURITY_GROUPS_DATABASE_PORT == null ? null : +process.env.VISA_SECURITY_GROUPS_DATABASE_PORT,
        name: process.env.VISA_SECURITY_GROUPS_DATABASE_NAME,
        user: process.env.VISA_SECURITY_GROUPS_DATABASE_USER,
        password: process.env.VISA_SECURITY_GROUPS_DATABASE_PASSWORD,
        schema: process.env.VISA_SECURITY_GROUPS_DATABASE_SCHEMA,
        logging: process.env.VISA_SECURITY_GROUPS_DATABASE_LOGGING === 'true'
      },
      logging: {
        level: process.env.VISA_SECURITY_GROUPS_LOG_LEVEL == null ? 'info' : process.env.VISA_SECURITY_GROUPS_LOG_LEVEL,
        timezone: process.env.VISA_SECURITY_GROUPS_LOG_TIMEZONE,
        syslog: {
          host: process.env.VISA_SECURITY_GROUPS_LOG_SYSLOG_HOST,
          port: process.env.VISA_SECURITY_GROUPS_LOG_SYSLOG_PORT == null ? null : +process.env.VISA_SECURITY_GROUPS_LOG_SYSLOG_PORT,
          appName: process.env.VISA_SECURITY_GROUPS_LOG_SYSLOG_APP_NAME
        }
      }
    };
  }

  return applicationConfig;
}
