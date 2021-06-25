import { singleton } from "tsyringe";
import { Experiment, Instance, Instrument, SecurityGroup, User } from "../models";
import { SecurityGroupRepository } from "../repositories";
import { ParameterError } from "../utils";

@singleton()
export class SecurityGroupService {

    constructor(private _repository: SecurityGroupRepository) {
    }

    /**
     * Returns a list of security groups for an instance
     * @param instance The instance to which we need to associate security groups
     * @returns a list of SecurityGroups
     */
    async getSecurityGroupsForInstance(instance: Instance): Promise<SecurityGroup[]> {
        // ==============================================================================
        // Add your logic here to determine which security groups to apply to the instance
        // ==============================================================================
        
        // In this example we are getting security groups based on the instruments of active experiments
        const owner = this.getOwner(instance);
        if (owner) {
            return this.getInstrumentBasedSecurityGroupsFromExperiments(instance.experiments);
          
        } else {
            throw new ParameterError('Instance must have an owner');
        }
    }

    /**
     * Returns a list of security groups based on the experiments of an instance
     * @param experiments The experiments associated to an instance
     * @returns a list of SecurityGroups
     */
    async getInstrumentBasedSecurityGroupsFromExperiments(experiments: Experiment[]): Promise<SecurityGroup[]> {
        // Find all experiments that are active
        const now = Date.now();
        const currentExperiments = experiments && experiments.filter(experiment => {
            const experimentStartDate = new Date(experiment.startDate).getTime();
            const experimentEndDate = new Date(experiment.endDate).getTime();

            return experimentStartDate < now && experimentEndDate > now;
        });

        // Get all instruments of the active experiments
        const instruments: Instrument[] = currentExperiments && currentExperiments.map(experiment => {
            if (!experiment.instrument) {
                throw new ParameterError('Experiments must have instrument data');
            }
            return experiment.instrument
        });

        return this.getInstrumentBasedSecurityGroups(instruments);
    }

    /**
     * Returns a list of instruments based on inststruments
     * @param instruments A list of instruments
     * @returns A list of security groups
     */
    async getInstrumentBasedSecurityGroups(instruments: Instrument[]): Promise<SecurityGroup[]> {
        // Use a repository (if needed) to access a database
        return this._repository.getInstrumentBasedSecurityGroups(instruments);
    }

    /**
     * Returns the owner of an instance
     * @param instance An instance
     * @returns the owner
     */
    public getOwner(instance: Instance): User {
        const member = instance.members && instance.members.find(member => member.role === 'OWNER');

        if (member) {
            return member.user;
        }

        return null;
    }
}