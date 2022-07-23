"use strict";

import { MyUsersService } from "../model/services/my-users.service.mjs";
import { UpdateView } from "../view/update.view.mjs";

class UpdateController {
    #privateView;
    #privateMyUsersService;
    #privateID;

    constructor() {
        this.#privateView = new UpdateView();
        this.#privateCaptureID();
        this.#privateMyUsersService = new MyUsersService();
    }

    async init() {
        const data = await this.#privateMyUsersService.getUserById(this.#privateID);
        this.#privateView.init(this.formularioSubmit.bind(this), data.getValues());
    }

    async formularioSubmit() {
        const form = document.querySelector('#formulario');
        const formData = new FormData(form);

        const data = {
            id: '', nombre: '', apellido: '', correo: '', telefono: '', created: ''
        };
        for(const pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        await this.#privateMyUsersService.update(this.#privateID, data);
    }

    #privateCaptureID() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.#privateID = urlParams.get("id");
    }
}

export const update = new UpdateController();
update.init();
