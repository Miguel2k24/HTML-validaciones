
export function valida (input){
    const tipoDEInput = input.dataset.tipo;
    if(validadores[tipoDEInput]){
        validadores[tipoDEInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = "";
    }else{
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDEInput, input);
    };


};

const tipoDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];


const mensajesDeError ={
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email:{
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Debe contenes al minimo 6 caracteres y maximo 12, debe contener al menos una letra mayucula y minuscula, un numero o .+\  y no puede tener espacios"
    },
    nacimiento:{
        customError: "Debes ser mayor de edad"
    },
    telefono:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"El formato requerido es xxxxxxxxxx 10 numeros "
    },
    direccion:{
        valueMissing:"Este campo de dirrecion no puede estar vacio",
        patternMismatch:"La direccion debe ser de minimo 10 caracteres y maximo 40 caracteres"
    },
    ciudad:{
        valueMissing:"Este campo de ciudad no puede estar vacio",
        patternMismatch:"La ciudad debe ser de minimo 4 caracteres y maximo 20 caracteres"
    },
    estado:{
        valueMissing:"Este campo de estado no puede estar vacio",
        patternMismatch:"El estado debe ser de minimo 4 caracteres y maximo 20 caracteres"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError (tipoDEInput, input){
    let mensaje = "";
    tipoDeError.forEach(error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDEInput][error];
        }
    })

    return mensaje;
}


function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if (!mayorEdad(fechaCliente)){
        mensaje = "No eres mayor de edad";
    }

    input.setCustomValidity(mensaje); // nos sirve para verificar que eres mayor de edad

};


function mayorEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas  <= fechaActual;

    
};