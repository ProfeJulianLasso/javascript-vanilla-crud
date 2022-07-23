export class FormularioUsurio {

    #privateFormulario;

    constructor() { }

    get(formularioSubmit, data) {
        this.#privateGenerateFormulario(formularioSubmit, data);
        return this.#privateFormulario;
    }

    #privateGenerateFormulario(formularioSubmit, data) {
        const form = document.createElement('form');
        form.id = 'formulario';
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            formularioSubmit();
        });

        const inputID = this.#privateInput('id', 'hidden', data.id);
        const inputNombre = this.#privateInputWithLabel('nombre', 'Nombre', 'text', 'Digite su nombre', true, data.nombre);
        const inputApellido = this.#privateInputWithLabel('apellido', 'Apellido', 'text', 'Digite su apellido', true, data.apellido);
        const inputCorreo = this.#privateInputWithLabel('correo', 'Email', 'email', 'Digite su correo electrónico', false, data.correo);
        const inputTelefono = this.#privateInputWithLabel('telefono', 'Telefono', 'phone', 'Digite su teléfono', false, data.telefono);
        const buttons = this.#privateButtons();

        form.innerHTML = inputID + inputNombre + inputApellido + inputCorreo + inputTelefono + buttons;
        this.#privateFormulario = form;
    }

    #privateInputWithLabel(id, label, type, placeholder, required, value) {
        return `<div class="mb-3">
        <label for="${id}" class="form-label">${label}</label>
        <input type="${type}" class="form-control" id="${id}" name="${id}" placeholder="${placeholder} ${required ? "required" : ''}" value="${value ? value : null}">
        </div>`;
    }

    #privateInput(id, type, value) {
        return `<input type="${type}" id="${id}" name="${id}" value="${value ? value : ''}">`;
    }

    #privateButtons() {
        return `<div>
            <button type="button" class="btn btn-primary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Modificar</button>
        </div>`;
    }
}