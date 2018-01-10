import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { HornetRequest } from "hornet-js-core/src/services/hornet-superagent-request";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import {
    URL_PAR_EXPORTER,
    URL_PAR_EXPORTER_OFD,
    URL_PAR_RECHERCHE,
    URL_PAR_SUPPRESSION_MASSE,
    URL_PARTENAIRES
} from "applitutoriel-js-common/src/utils/urls";
import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
import { FichePartenaireServiceImpl } from "src/services/page/par/par-fpa-service-impl";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { SecteurServiceImpl } from "src/services/page/sec/secteur-service-page-impl";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { FichePartenaire } from "applitutoriel-js-common/src/services/type/par/fpa-par-type";
import { RecherchePartenaireService } from "applitutoriel-js-common/src/services/page/par/par-rpa-service";

const logger: Logger = Utils.getLogger("applitutoriel.services.par.par-rpa-service-page-impl");

/**
 * Implementation des services pour les partenaires
 * @class
 * @implements {RecherchePartenaireService}
 * @extends {ServiceApi}
 */
export class RecherchePartenaireServiceImpl extends RecherchePartenaireService {

    /** service de gestion des partenaires */
    private fichePartenaireService: FichePartenaireServiceImpl = new FichePartenaireServiceImpl();

    /** service de gestion des partenaires */
    private secteurService: SecteurServiceImpl = new SecteurServiceImpl();

    /**
     * liste les secteurs
     * @return Promise
     */
    listerSecteurs(): Promise<any> {
        return this.secteurService.lister();
    }
    /**
     * liste les produits
     * @return Promise
     */
    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - rechercher : ", criteres, reqMimeType);
        let request: HornetRequest = { url: this.buildUrl(URL_PARTENAIRES + URL_PAR_RECHERCHE), method: "post", data: criteres, typeMime: reqMimeType };
        return (res) ? this.fetchOnStream(request, res) : this.fetch(request);

    }

    supprimerPage(id): Promise<any> {
        return this.fichePartenaireService.fichePartenaire(id).then((partenaire: FichePartenaire) => {
            if (partenaire.isVIP) {
                throw new BusinessError("ERR_PARTENAIRE_VIP_SUPPRESSION", { $1: partenaire.nom, $2: partenaire.prenom });
            }
            return this.fetch({ method: "delete", url: this.buildUrl(URL_PARTENAIRES + "/" + id) });
        });
    }

    supprimer(id): Promise<any> {
        logger.trace("SERVICES - supprimer : ", id);
        return this.fetch({ method: "delete", url: this.buildUrl(URL_PARTENAIRES + "/" + id) });
    }


    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        logger.trace("SERVICES - supprimerEnMasse :", partenaires);

        logger.debug("Envoi d'une liste de partenaires à supprimer :", partenaires);

        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_SUPPRESSION_MASSE),
            data: partenaires
        });
    }


    exporter(reqMimeType: MediaType, criteres?: PartenaireRechercheParameter): Promise<any> {
        logger.trace("SERVICES - exporter : ", reqMimeType);
            return this.fetch({ method: "post", url: this.buildUrl(URL_PARTENAIRES + URL_PAR_EXPORTER), typeMime: reqMimeType, data: criteres });
    }

    exporterODF(reqMimeType: MediaType, criteres?: PartenaireRechercheParameter): Promise<any> {
        logger.trace("SERVICES - exporterODF : ", reqMimeType);
        return this.fetch({ method: "post", url: this.buildUrl(URL_PARTENAIRES + URL_PAR_EXPORTER_OFD), typeMime: reqMimeType, data: criteres });
    }
}
