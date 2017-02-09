/* tslint:disable */

declare var Object: any;
export interface PersonInterface {
  name?: string;
  company?: string;
  title?: string;
}

export class Person implements PersonInterface {
  name: string;
  company: string;
  title: string;
  constructor(data?: PersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Person`.
   */
  public static getModelName() {
    return "Person";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Person for dynamic purposes.
  **/
  public static factory(data: PersonInterface): Person{
    return new Person(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Person',
      plural: 'People',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        company: {
          name: 'company',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
