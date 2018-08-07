import { BaseMochaTest } from "hornet-js-test/src/base-mocha-test";
import { Decorators } from "hornet-js-test/src/decorators";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import { runTest } from "hornet-js-test/src/test-run";
import { Injector } from "hornet-js-core/src/inject/injector";
Injector.register("databaseConfigName", "config");
import { PartenaireServiceImpl } from "src/services/data/par/partenaire-service-impl";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { FicheProduitServiceImpl } from "src/services/data/pro/fpo-service-data-impl";
import { Scope } from "hornet-js-core/src/inject/injectable";

@Decorators.describe("Test du service pour partenaire")
class PartenaireServiceSpec extends BaseMochaTest {

    @Decorators.it("Implémentation cas de test passant")
    testImplementation() {
        HornetTestAssert.assertEquals(1, 1, "L'attendu et l'obtenu doivent être égaux");
        this.end();
    }

    @Decorators.it("Appel de la méthode détection vip")
    testIsVip() {
        Injector.register(PartenaireService, PartenaireServiceImpl, Scope.SINGLETON);
        const partenaireService: PartenaireServiceImpl = Injector.getRegistered(PartenaireService);
        HornetTestAssert.assertTrue(partenaireService.isPartenaireVip(true), "Le service devrait renvoyer true");
        HornetTestAssert
            .assertFalse(partenaireService.isPartenaireVip("undefined"), "Le service devrait renvoyer false pour undefined");
        HornetTestAssert.assertFalse(partenaireService.isPartenaireVip(null), "Le service devrait renvoyer false pour null");
        HornetTestAssert.assertFalse(partenaireService.isPartenaireVip(false), "Le service devrait renvoyer false pour false");
        this.end();
    }
}

// lancement des Tests
runTest(new PartenaireServiceSpec());
