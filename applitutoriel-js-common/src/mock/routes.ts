/**
 * Copyright ou © ou Copr. Ministère de l'Europe et des Affaires étrangères (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * Ce logiciel est un programme informatique servant à faciliter la création
 * d'applications Web conformément aux référentiels généraux français : RGI, RGS et RGAA
 * <p/>
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 * <p/>
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 * <p/>
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 * <p/>
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 * <p/>
 * <p/>
 * Copyright or © or Copr. Ministry for Europe and Foreign Affairs (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * This software is a computer program whose purpose is to facilitate creation of
 * web application in accordance with french general repositories : RGI, RGS and RGAA.
 * <p/>
 * This software is governed by the CeCILL license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 * <p/>
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 * <p/>
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 * <p/>
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 *
 */

/**
 * applitutoriel-js-common - Application tutoriel utilisant le Framework hornet
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.2.0
 * @link git+https://github.com/diplomatiegouvfr/applitutoriel-modules.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { Partenaire } from "src/bo/par/par-rpa-bo";

import * as secteurs from "src/resources/mock/adm/adm-lst-data.json";
import * as produits from "src/resources/mock/adm/adm-rps-data.json";
import * as villes from "src/resources/mock/par/par-rpa-villes.json";
import * as pays from "src/resources/mock/par/par-pays-data.json";
import * as partenairesData from "src/resources/mock/par/par-rpa-data-1.json";
import * as partenaireProduits from "src/resources/mock/pro/pro-lsp-data.json";

import * as _ from "lodash";

const logger: Logger = Utils.getLogger("applitutoriel.mock.routes");
let partenaires = (<any>partenairesData).data.liste;

/**
 * Liste des utilisateurs en mode bouchon
 * @type {any[]}
 */
let users = [
    {
        "name": "test",
        "roles": [ { "id": 2, "name": "APPLI_TUTO_USER" } ]
    },
    {
        "name": "admin",
        "roles": [ { "id": 1, "name": "APPLI_TUTO_ADMIN" }, { "id": 2, "name": "APPLI_TUTO_USER" } ]
    }
];

function findByUsername(username) {
    for (let i = 0, len = users.length; i < len; i++) {
        let user = users[ i ];
        if (user.name === username) {
            return user;
        }
    }
    return null;
}

export class BouchonRoutes {

    static build(router) {

        router.post("/partenaires/rechercher", function () {
            this.res.send(
                {
                    "hasTechnicalError": false,
                    "hasBusinessError": false,
                    "status": 200,
                    "url": "url",
                    "errors": [],
                    "data": (<any>partenairesData).data
                });
        });

        router.get("/partenaires/consulter/:id", function (id) {
            let idPartenaire = parseInt(id, 10);
            logger.debug("Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
            let partenaire = _.find(partenaires, function (item: Partenaire) {
                logger.debug(item);
                if (item.id === id) {
                    return true;
                }
            });
            if (partenaire) {
                this.res.send({
                    "hasTechnicalError": false,
                    "hasBusinessError": false,
                    "status": 200,
                    "url": "url",
                    "errors": [],
                    "data": partenaire
                });
            } else {
                this.res.status(404).send({
                    error: "Not found."
                });
            }
        });

        router.delete("/partenaires/supprimer/:id", function (id) {
            let idPartenaire = parseInt(id, 10);
            logger.debug("Suppression du partenaire, id:", id);
            _.remove(partenaires, function (item: Partenaire) {
                if (item.id === id) {
                    return true;
                }
            });

            this.res.send({
                message: "partenaire supprimé"
            });
        });

        router.post("/partenaires", function () {

        });

        router.put("/partenaires/sauvegarder/:id", function () {
            this.res.send({
                "hasTechnicalError": false,
                "hasBusinessError": false,
                "status": 200,
                "url": "url",
                "errors": [],
                "data": {
                    message: "partenaire envoyé"
                }
            });
        });

        router.post("/contact/envoyer", function () {
            this.res.json({
                "hasTechnicalError": false,
                "hasBusinessError": false,
                "status": 200,
                "url": "url",
                "errors": [],
                "data": {
                    message: "Courriel envoyé"
                }
            });
        });

        router.get("/secteurs", function () {
            this.res.send(secteurs);
        });
        router.get("/produits/consulter/:id", function () {
            this.res.json(partenaireProduits);
        });
        /*
                router.get("/produits", function() {
                    this.res.send(produits);
                });*/
        router.get("/partenaires/villes", function () {
            this.res.send(villes);
        });
        router.get("/partenaires/pays", function () {
            this.res.send(pays);
        });
        router.post("/partenaires/pays/nationalites/rechercher", function () {
            this.res.send(pays);
        });

        router.post("/utilisateurs/auth", function () {
            let user = findByUsername(this.req.body.login);
            this.res.json({
                "hasTechnicalError": false,
                "hasBusinessError": false,
                "status": 200,
                "url": "url",
                "errors": [],
                "data": user
            });
        });
    }
}
