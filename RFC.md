# RFC: Desafíos a Considerar para el Futuro
En este documento se presentan una serie de desafíos que deben ser considerados para el desarrollo futuro del sistema. Para cada uno de estos desafíos, se especifican: el problema identificado, la solución propuesta y los desafíos adicionales que deben ser tomados en cuenta. Además, se incluye una tabla que prioriza el desarrollo según la dificultad y el valor agregado que aporta cada desafío.


| Prioridad | Requisito | Dificultad (del 1 al 5) | Valor Agregado (del 1 al 5) |
| -------- | ------ | ------- | ---- |
| 1 | RFC1 | 3 | 4 |
| 2 | RFC2 | 2 | 3 |
| 3 | RFC3 | 5 | 5

## RFC1: Implementación de un Sistema de Autenticación
### Problema
Actualmente, el sistema carece de un mecanismo adecuado de autenticación, lo que permite que cualquier usuario pueda acceder a los recursos de otros usuarios, como visualizar las ofertas que han sido aceptadas por otros.

### Solución
Se propone implementar un sistema de autenticación utilizando JSON Web Tokens (JWT) para proteger el backend de las solicitudes provenientes del frontend. En la situación actual, el usuario del cliente está hardcodeado en la variable user, por lo que se requiere agregar un proceso de inicio de sesión (login) que permita asignar correctamente el valor a dicha variable. Además, será necesario incorporar una sesión de inicio de sesión (sign-in) que asocie la información del usuario.

### Desafíos
1. Acceso a la información del usuario: Será necesario consultar la base de datos para obtener la información del usuario y mostrar correctamente el nombre del propietario de cada oferta, lo que incrementará la carga de recursos.
2. Seguridad en el backend: No se debe enviar el ID del usuario directamente. Será necesario implementar un middleware en el backend para extraer y verificar la información del usuario desde el token JWT.
3. Compatibilidad con autenticación externa: Es posible que una opción de autenticación menos invasiva para los usuarios mexicanos sea mediante proveedores de terceros, como Google (Gmail). El modelo debe ser compatible con estas opciones de autenticación.


## RFC2: Implementación de un Sistema para Aceptar Ofertas
### Problema
Actualmente, cuando un usuario acepta una oferta, esta se bloquea inmediatamente, cambiando el estado de la oferta para los demás usuarios. Sin embargo, en algunos casos, el usuario que publicó la oferta puede decidir realizar la transacción con otro usuario, por lo que sería conveniente permitirle ver una lista de las personas interesadas en la transacción y elegir a quien prefiera.

### Solución
Se propone agregar una entidad intermedia al backend para registrar múltiples bidders (postores) interesados en cada oferta. En el frontend, se deberá ajustar la experiencia de usuario (UX) para que en la vista de mis ofertas se muestre esta lista de postores y se pueda seleccionar el más adecuado. Además, será necesario incorporar un estado de "pendiente" o "rechazado" para las ofertas.

### Desafíos
1. Complejidad en los recursos: El sistema deberá realizar un cruce de datos para manejar la lista de postores, lo que incrementará la complejidad en términos de recursos y gestión de información.

## RFC3: Implementación de un Sistema para Actualizar en Vivo las Tablas
### Problema
Actualmente, cuando un usuario acepta una oferta, los cambios no se reflejan de inmediato, sino que el usuario debe recargar la página para ver la actualización. Sería conveniente que las ofertas se actualicen automáticamente después de que se realice un cambio, mejorando así la experiencia de usuario.

### Solución
Se propone implementar una base de datos en tiempo real (RealTime) conectada al modelo del backend. Una posible solución es utilizar Firebase Database, lo cual requeriría realizar ajustes tanto en el backend como en el frontend para integrar esta funcionalidad en vivo.

### Desafíos
1. Mantenimiento de la congruencia de las bases de datos: Es necesario garantizar que ambas bases de datos (la original y la en tiempo real) estén sincronizadas correctamente.
2. Costos asociados a Firebase: Se deberá analizar el impacto económico de utilizar Firebase como base de datos en tiempo real.
3. Reestructuración del backend: La implementación de esta funcionalidad implicará una reestructuración significativa del backend, ya que debe ser compatible con la nueva base de datos en tiempo real.