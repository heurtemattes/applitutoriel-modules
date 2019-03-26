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
 * applitutoriel-js-lite - Application tutoriel utilisant le Framework hornet
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/applitutoriel-modules.git
 * @license CECILL-2.1
 */

import * as Sequelize from "sequelize";
import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";
import Alias from "hornet-js-bean/src/decorators/Alias";
import { ProduitAttributes } from "src/models/pro/model-produit";
import { ProduitPartenaireDTO } from "src/models/par/seq-pro-par-mod";
import { PaysAttributes } from "src/models/ref/ref-pay-mod";
import { VilleAttributes } from "src/models/ref/ref-ville-mod";
import { CiviliteAttributes } from "src/models/ref/ref-civilite-mod";
import { PhotoAttributes } from "src/models/seq-photo-model";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface PartenaireAttributes extends HornetSequelizeAttributes {
    id?: number;
    ville?: number;
    civilite?: number;
    pays?: number;
    photo?: number;
    client?: boolean;
    vip?: boolean;
    nom?: string;
    prenom?: string;
    nomLocal?: string;
    prenomLocal?: string;
    dateNaissance?: string;
    organisme?: string;
    fonction?: string;
    proTelFixe?: string;
    proTelPort?: string;
    proCourriel?: string;
    proFax?: string;
    proAdrRue?: string;
    proAdrCP?: string;
    assistNom?: string;
    assistPrenom?: string;
    assistTel?: string;
    assistCourriel?: string;
    commentaire?: string;
    satisfaction?: string | string[];
    dateCreat?: string;
    dateModif?: string;

    laNationalite: PaysAttributes;
    laVille: VilleAttributes;
    laCivilite: CiviliteAttributes;
    laPhoto: PhotoAttributes;
    listeProduit: Array<ProduitAttributes>;

    getLaNationalite(): Promise<PaysAttributes>;

    getLaVille(): Promise<VilleAttributes>;

    getLaCivilite(): Promise<CiviliteAttributes>;

    getLaPhoto(): Promise<PhotoAttributes>;

    getListeProduit(): Promise<Array<ProduitAttributes>>;
}

@Bean
export class PartenaireDTO {
    @Map()
    id: number;
    @Map()
    @Alias("ville.id")
    ville: number;
    @Map()
    @Alias("civilite.id")
    civilite: number;
    @Map()
    @Alias("nationalite.id")
    nationalite: number;
    @Map()
    @Alias("photo.id")
    photo: number;
    @Map()
    client: boolean;
    @Map()
    vip: boolean;
    @Map()
    nom: string;
    @Map()
    prenom: string;
    @Map()
    nomLocal: string;
    @Map()
    prenomLocal: string;
    @Map()
    dateNaissance: Date;
    @Map()
    organisme: string;
    @Map()
    fonction: string;
    @Map()
    proTelFixe: string;
    @Map()
    proTelPort: string;
    @Map()
    proCourriel: string;
    @Map()
    proFax: string;
    @Map()
    proAdrRue: string;
    @Map()
    proAdrCP: string;
    @Map()
    assistNom: string;
    @Map()
    assistPrenom: string;
    @Map()
    assistTel: string;
    @Map()
    assistCourriel: string;
    @Map()
    commentaire: string;
    @Map()
    satisfaction: string | string[];
    @Map()
    dateCreat: string;
    @Map()
    dateModif: string;
    @Map()
    listeProduit: Array<ProduitPartenaireDTO>;
}

export let PartenaireModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_partenaire",
        autoIncrement: true,
        primaryKey: true
    },
    ville: {
        type: Sequelize.INTEGER,
        field: "id_ville",
        allowNull: false,
        references: {
            model: "VilleModel",
            key: "id"
        }
    },
    civilite: {
        type: Sequelize.INTEGER,
        field: "id_civilite",
        allowNull: false,
        references: {
            model: "CiviliteModel",
            key: "id"
        }
    },
    nationalite: {
        type: Sequelize.INTEGER,
        field: "id_pays",
        allowNull: false,
        references: {
            model: "PaysModel",
            key: "id"
        }
    },
    photo: {
        type: Sequelize.INTEGER,
        field: "id_photo",
        references: {
            model: "PhotoModel",
            key: "id"
        }
    },
    client: {
        type: Sequelize.BOOLEAN,
        field: "par_is_client"
    },
    vip: {
        type: Sequelize.BOOLEAN,
        field: "par_is_vip"
    },
    nom: {
        type: Sequelize.STRING(50),
        field: "par_nom"
    },
    prenom: {
        type: Sequelize.STRING(50),
        field: "par_prenom"
    },
    nomLocal: {
        type: Sequelize.STRING(50),
        field: "par_nom_local"
    },
    prenomLocal: {
        type: Sequelize.STRING(50),
        field: "par_prenom_local"
    },
    dateNaissance: {
        type: Sequelize.DATE,
        field: "par_date_naissance",
    },
    organisme: {
        type: Sequelize.STRING(50),
        field: "par_organisme",
    },
    fonction: {
        type: Sequelize.STRING(50),
        field: "par_fonction",
    },
    proTelFixe: {
        type: Sequelize.STRING(16),
        field: "par_pro_tel_fixe",
    },
    proTelPort: {
        type: Sequelize.STRING(16),
        field: "par_pro_tel_port",
    },
    proCourriel: {
        type: Sequelize.STRING(80),
        field: "par_pro_courriel",
    },
    proFax: {
        type: Sequelize.STRING(16),
        field: "par_pro_fax",
    },
    proAdrRue: {
        type: Sequelize.STRING(250),
        field: "par_pro_adr_rue",
    },
    proAdrCP: {
        type: Sequelize.STRING(9),
        field: "par_pro_adr_cp",
    },
    assistNom: {
        type: Sequelize.STRING(50),
        field: "par_assist_nom",
    },
    assistPrenom: {
        type: Sequelize.STRING(50),
        field: "par_assist_prenom",
    },
    assistTel: {
        type: Sequelize.STRING(16),
        field: "par_assist_tel",
    },
    assistCourriel: {
        type: Sequelize.STRING(80),
        field: "par_assist_courriel",
    },
    commentaire: {
        type: Sequelize.STRING(500),
        field: "par_commentaire",
    },
    satisfaction: {
        type: Sequelize.STRING(500),
        field: "par_satisfaction",
    },
    dateCreat: {
        type: Sequelize.DATE,
        field: "par_date_creation",
    },
    dateModif: {
        type: Sequelize.DATEONLY,
        field: "par_date_modification",
    },
};
