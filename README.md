# VISA Security Groups Example

This project contains the source code for an example Security Groups service for the VISA platform.

VISA (Virtual Infrastructure for Scientific Analysis) makes it simple to create compute instances on facility cloud infrastructure to analyse your experimental data using just your web browser.

See the [User Manual](https://visa.readthedocs.io/en/latest/) for deployment instructions and end user documentation.

## Description

The VISA Security Groups micro-service is used to manage the way OpenStack security groups (firewall rules) are selected for use for individual instances. This can be very site-specific so there needs to be a flexible way of adding logic to their selection.

For example, the security groups of an instance can depend on various parameters:

- user role (admin, staff, external user)
- associated experiments (and instruments)
- whether a reactor cycle is active

Non-trivial logic is applied when determining the security groups which will be different for different sites.

Some rules can be made quite generic, for example if security groups depend on the role of the user: this can be configurable from site to site and so the logic is integrated directly into VISA.

However, to allow for customisations (when necessary), an optional micro-service can be called to obtain a list of security group names. The micro-server is passed a full instance model from which it is assumed the relevant information to determine the security groups is available.

## Sample code

The code in this project provides an example of how to write a VISA Security Group service (in this case using TypeScript for Node.js). We have included a database adapter and some simple logic based on the instruments of the experiments associated to the instance. This is similar to logic that is done at the ILL (to enable remote experiments) but serves purely as an example case.

**This application, in it's current state, is not intended to be used in production in the VISA platform.**

### Building the application

```
npm install
```

### Running the server
```
npm start
```

The application requires environment variables to be set. These can be in a `.env` file at the root of the project. Details of the environment variables are given below.

### Testing

Unit tests can be run by executing the command

```
npm run tests
```

To test directly the server the following *curl* commands can be executed

#### User instance with experiments in active cycle

```
curl -X POST -H 'Content-Type: application/json' -d '{"id": 100, "members": [{"role": "OWNER", "user": {"id": "12345"}}], "experiments": [{"id": "100-0100-10", "startDate": "2021-05-21", "endDate": "2221-05-31", "cycle": {"id": 100}, "instrument": {"id": 94} }]}' 'http://localhost:4000/api/securitygroups'
```

#### User instance with experiments in a previous cycle
```
curl -X POST -H 'Content-Type: application/json' -d '{"id": 100, "members": [{"role": "OWNER", "user": {"id": "12345"}}], "experiments": [{"id": "100-0100-10", "startDate": "2020-05-21", "endDate": "2020-05-31", "cycle": {"id": 100}, "instrument": {"id": 94} }]}' 'http://localhost:4000/api/securitygroups'
```

### Environment variables

The following environment variables are used to configure VISA Security Service and can be placed in a `.env` file:

| Environment variable | Default value | Usage |
| ---- | ---- | ---- |
| VISA_SECURITY_GROUPS_SERVER_PORT | 4000 | The port on which to run the server |
| VISA_SECURITY_GROUPS_SERVER_HOST | localhost | The hostname on which the server is listening on |
| VISA_SECURITY_GROUPS_SERVER_AUTH_TOKEN |  | The expected `x-auth-token` value |
| VISA_SECURITY_GROUPS_DATABASE_TYPE | | The type of database (eg postgres) |
| VISA_SECURITY_GROUPS_DATABASE_HOST | | The host of the database |
| VISA_SECURITY_GROUPS_DATABASE_PORT | | The port of the database |
| VISA_SECURITY_GROUPS_DATABASE_NAME | | The database name |
| VISA_SECURITY_GROUPS_DATABASE_SCHEMA | | The database schema |
| VISA_SECURITY_GROUPS_DATABASE_USER | | The database username |
| VISA_SECURITY_GROUPS_DATABASE_PASSWORD | | The database password |
| VISA_SECURITY_GROUPS_DATABASE_LOGGING | false | Provides detailed SQL logging |
| VISA_SECURITY_GROUPS_LOG_LEVEL | 'info' | Application logging level |
| VISA_SECURITY_GROUPS_LOG_TIMEZONE |  | The timezone for the formatting the time in the application log |
| VISA_SECURITY_GROUPS_LOG_SYSLOG_HOST |  | The syslog host (optional) |
| VISA_SECURITY_GROUPS_LOG_SYSLOG_PORT |  | The syslog port (optional) |
| VISA_SECURITY_GROUPS_LOG_SYSLOG_APP_NAME |  | The syslog application name (optional) |

## Acknowledgements

<img src="https://github.com/panosc-eu/panosc/raw/master/Work%20Packages/WP9%20Outreach%20and%20communication/PaNOSC%20logo/PaNOSClogo_web_RGB.jpg" width="200px"/> 

VISA has been developed as part of the Photon and Neutron Open Science Cloud (<a href="http://www.panosc.eu" target="_blank">PaNOSC</a>)

<img src="https://github.com/panosc-eu/panosc/raw/master/Work%20Packages/WP9%20Outreach%20and%20communication/images/logos/eu_flag_yellow_low.jpg"/>
 
PaNOSC has received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 823852.
