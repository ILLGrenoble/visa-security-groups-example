import {Request, Response} from "express";
import { singleton } from "tsyringe";
import {Instance} from "../models";
import { SecurityGroupService } from "../services";
import { logger, ParameterError } from "../utils";

@singleton()
export class SecurityGroupController {

    constructor(private _service: SecurityGroupService) {
    }

    /**
     * The end point to obtain security groups for an instance (passed as the request body)
     * @param req The HTTP request with instance body
     * @param res The HTTP response including a list of security groups
     */
    async post(req: Request, res: Response) {
        const instance = req.body as Instance;

        try {
            const securityGroups = await this._service.getSecurityGroupsForInstance(instance);

            const owner = this._service.getOwner(instance);
            logger.info(`Got security groups for instance ${instance.id} (owner: {id: ${owner.id}, name: ${owner.firstName} ${owner.lastName}}): ${JSON.stringify(securityGroups)}`);
            res.status(200).json(securityGroups);

        } catch (err) {
            if (err instanceof ParameterError) {
                logger.info(`Bad Parameters while getting security groups for instance ${instance.id}: ${err.message}`);
                res.status(400).send(`Bad Parameters: ${err.message}`);
            
            } else {
                logger.error(`Internal server error occurred getting security groups for instance ${instance.id}.`);
                console.log(err.stack);
                res.status(500).send(`Server error: ${err.message}`);
            }
        }
    }
}
