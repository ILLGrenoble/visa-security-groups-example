import { inject, singleton } from "tsyringe";
import { DataSource } from "../datasources";
import { Instrument, SecurityGroup } from "../models";
import { logger } from "../utils";

@singleton()
export class SecurityGroupRepository {

    constructor(@inject("DataSource") private _dataSource: DataSource) {
    }

    /**
     * Returns all security group names associated to instrument names in the security_group_filter table of VISA
     * @param instruments a list of instruments
     * @returns a list of SecurityGroups
     */
    async getInstrumentBasedSecurityGroups(instruments: Instrument[]): Promise<SecurityGroup[]> {
        if (instruments == null || instruments.length == 0) {
            return [];
        }

        const indices = [];
        const instrumentIds = [];
        instruments.forEach(instrument => {
            instrumentIds.push(instrument.id);
            indices.push(instrumentIds.length);
        });

        let query = {
            text: `
                SELECT DISTINCT sg.id, sg.name
                FROM security_group sg
                LEFT JOIN security_group_filter sgf ON sg.id = sgf.security_group_id
                WHERE sgf.object_type = 'INSTRUMENT'
                AND sgf.object_id in ($${indices.join(' , $')})
            `,
            values: instrumentIds
        };

        try {
            const rows = await this._dataSource.query(query);
            const securityGroups = rows.map((row: any) => ({id: row.id, name: row.name}));
            return securityGroups;

        } catch (err) {
            logger.error("Caught error in getAllInstrumentBasedSecurityGroups: " + err.message);
            throw err;
        }
    }
}