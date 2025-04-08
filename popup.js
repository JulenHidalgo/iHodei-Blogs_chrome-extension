document.getElementById("enviar").addEventListener("click", enviarDatos);
document.getElementById("boton-ayuda").addEventListener("click", () => {
  window.open("manual_de_uso_creacion_de_usuarios_iHodei_Blogs.pdf", "_blank");
});

let webhookURL = "";

function cargarConfiguracion() {
  fetch(chrome.runtime.getURL("config.json"))
    .then((response) => response.json())
    .then((config) => {
      webhookURL = config.WEBHOOK;
    })
    .catch((error) => {
      console.error("Error cargando config.json:", error);
    });
}

cargarConfiguracion();

function enviarDatos() {
  if (!webhookURL) {
    alert("La configuración no se ha cargado correctamente. Intenta de nuevo.");
    return;
  }
  const user = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const url = document.getElementById("url").value;
  const imagen = document.getElementById("imagen").files[0];
  const usuario_wordpress = document.getElementById("usuario_wordpress").value;
  const password_wordpress =
    document.getElementById("password_wordpress").value;

  if (
    !user ||
    !password ||
    !imagen ||
    !url ||
    !usuario_wordpress ||
    !password_wordpress
  ) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const confirmacion = confirm(
    `¿Estás seguro de que quieres crear el usuario "${user}"?`
  );
  if (!confirmacion) {
    return;
  }

  const reader = new FileReader();

  reader.onloadend = function () {
    const base64data = reader.result.split(",")[1];

    const data = {
      user: user,
      password: password,
      url: url,
      imagen: base64data,
      metodo: "CREATE_USER",
      api_key: btoa(usuario_wordpress + ":" + password_wordpress),
    };

    const boton = document.getElementById("enviar");
    boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    boton.disabled = true;

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const responseText = await response.text();
        console.log("Status:", response.status);
        console.log("Response body:", responseText);

        if (response.ok) {
          // Limpiar los campos
          document.getElementById("usuario").value = "";
          document.getElementById("password").value = "";
          document.getElementById("url").value = "";
          document.getElementById("imagen").value = "";
          document.getElementById("usuario_wordpress").value = "";
          document.getElementById("password_wordpress").value = "";

          // Restaurar el botón después de 3 segundos
          setTimeout(() => {
            boton.innerHTML = "🚀 Enviar Datos";
            boton.disabled = false;
          }, 3000);
        } else {
          alert("Error al enviar los datos.");
          boton.innerHTML = "🚀 Enviar Datos";
          boton.disabled = false;
        }
      })
      .catch((error) => {
        console.error("❌ Error atrapado en catch:", error);
        alert("Error en la conexión.");
        boton.innerHTML = "🚀 Enviar Datos";
        boton.disabled = false;
      });
  };

  reader.readAsDataURL(imagen);
}
