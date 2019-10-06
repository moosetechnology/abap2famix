import {ModelFieldChain} from "./model_chain_field";
import {ModelMethods} from "./model_methods";
import {Access} from "famix/dist/model/famix/access";
import {FamixRepository} from "famix/dist/famix_repository";

export class ModelTargetChain extends ModelFieldChain {

  protected addToModel(modelMethod: ModelMethods): void {
    if (this.variable) {
      this.addDebugInfo("  *");
      const famixAccess = new Access(FamixRepository.getFamixRepo());
      famixAccess.setAccessor(modelMethod.getFamixMethod());
      famixAccess.setVariable(this.variable);
      famixAccess.setIsWrite(true);
    }
  }

}