# iHodei-Blogs_chrome-extension

Extensión de Chrome desarrollada por HodeiCloud para la gestión visual de usuarios en la plataforma iHodei Blogs.  
Permite crear credenciales de forma rápida e intuitiva, facilitando el acceso de los clientes al sistema.  
Incluye sección de ayuda integrada.

---

## ⚙️ Configuración necesaria

> **Importante:** este proyecto requiere un archivo `config.json` que no está incluido en el repositorio por seguridad (está en `.gitignore`).

### 1. Crear archivo `config.json`

En la raíz del proyecto, crea un archivo llamado:

```
config.json
```

Y añade dentro la siguiente estructura:

```json
{
  "WEBHOOK": "https://TU_WEBHOOK_AQUI"
}
```

Reemplaza `"https://TU_WEBHOOK_AQUI"` por la URL real del webhook de Make.com o del servidor correspondiente.

---

### 2. Cargar la extensión en Chrome

1. Abre Chrome y ve a `chrome://extensions/`.
2. Activa el **modo desarrollador** (arriba a la derecha).
3. Haz clic en **"Cargar descomprimida"**.
4. Selecciona la carpeta del proyecto.
5. La extensión ya estará lista para usar.

---

### 🧪 Recomendación

No compartas nunca públicamente tu `config.json`, ya que puede contener datos sensibles.  
Este archivo se encuentra **protegido por defecto** en `.gitignore`.
