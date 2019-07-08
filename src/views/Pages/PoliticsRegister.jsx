import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";

class PoliticsRegister extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <div>
                <p>
                  <strong>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vigencia:</strong>
                </p>
                <p>
                  El programa dará inicio a partir que se realice la
                  comunicación formal del programa por parte de CONTINENTAL al
                  distribuidor y estará vigente hasta que la compañía lo
                  consideré y lo comunique formalmente.
                </p>
                <p>
                  <strong>
                    2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Participantes:
                  </strong>
                </p>
                <p>
                  En el programa sólo podrán participar la fuerza de ventas de
                  los distribuidores (desde ahora “PARTICIPANTES”), estos serán
                  previamente autorizados y validados por CONTINENTAL.
                </p>
                <p>
                  <strong>
                    3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Envío de información:
                  </strong>
                </p>
                <p>
                  Dentro del desarrollo del programa CONTINENTAL podrá enviar
                  informaciones concernientes a nuestras marcas, políticas o
                  temas relacionados al programa a cualquiera de los datos de
                  contacto ingresado por los participantes pues hacen parte del
                  mismo.
                </p>
                <p>
                  <strong>
                    4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ingreso de información y
                    verificación:
                  </strong>
                </p>
                <p>
                  Para llevar a cabo la redención de los premios es
                  indispensable el ingreso de las ventas de cada uno de los
                  participantes mensualmente sin excepción, es decir, deberán
                  ingresar las ventas del mes en curso durante el transcurso del
                  mismo, de lo contrario, dichas ventas no tendrán ninguna
                  validez dentro del programa. Del mismo modo, CONTINENTAL por
                  medio de cualquiera de sus funcionarios tendrá derecho de
                  realizar auditoria de las informaciones ingresadas antes de
                  ser redimido cualquier tipo de premio, en caso de que se
                  encuentre cualquier irregularidad o no sea permitido realizar
                  dicha auditoria dentro de los plazos establecidos por
                  CONTINENTAL, el participante que sea sujeto de esta auditoría,
                  perderá todos los beneficios o premios del programa que no se
                  hayan redimido, siendo eliminado inmediatamente del mismo y
                  perdiendo cualquier derecho a participar en cualquier programa
                  de incentivos desarrollado por CONTINENTAL. Cabe aclarar que
                  los puntos, beneficios o premios por redimir del participante
                  que incurra en cualquier irregularidad o que no sea permitido
                  auditar las informaciones ingresadas no sé podrán trasferir,
                  cambiar o reclamar por nadie diferente al participante a quien
                  se hayan asignado las ventas registradas.
                </p>
                <p>
                  <strong>
                    5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Redención de Premios:
                  </strong>
                </p>
                <p>
                  ContiClub premiará la venta de llantas de la línea de
                  automóvil y camioneta de las marcas Continental y General Tire
                  durante la vigencia del mismo; en este, cada llanta vendida
                  equivaldrá a un número determinado de puntos (Conti Puntos)
                  los cuales se podrán acumular y con ello obtener diferentes
                  tipos de premios.
                </p>
                <p>
                  Dependiendo del tipo de llanta (auto, camioneta o utilitaria)
                  y la marca (Continental o General Tire) se dará una valoración
                  respectiva a los Conti Puntos.
                </p>
                <p>
                  Adicional a ello se le otorgará Conti Puntos adicionales si la
                  llanta vendida de auto o camioneta pertenece al segmento UHP
                  (Ultra High Performance) o es de rin 17 o superior (17, 18,
                  19, 20 ó 21).
                </p>
                <p>
                  <em>
                    *Estos puntos adicionales no aplican para el segmento
                    Utilitario
                  </em>
                  <em>.</em>&nbsp;
                  <br />
                  <em>
                    *No son acumulables en el caso de ser una llanta Rin 17 y
                    adicionalmente ser UHP.
                  </em>
                </p>
                <p>
                  <strong>
                    6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Entrega de premios:&nbsp;
                  </strong>
                </p>
                <p>
                  La entrega de los premios del programa será realiza por medio
                  de un transporte por lo que CONTINENTAL no se hace responsable
                  del estado de entrega de los mismos o perdida de los premios
                  durante el embalaje o trasporte. CONTINENTAL no aceptará
                  devoluciones de los premios por imperfectos, fallas o daños de
                  los productos que sean entregados dentro del programa, en caso
                  de ocurrir alguno de estos eventos, se le brindará la
                  información del proveedor del producto al participante para
                  que este sea quien realice directamente la/s reclamaciones que
                  considere prudente/s. Los tiempos de entrega se podrán
                  modificar dependiendo de la ubicación geográfica del
                  participante y podrán exceder la vigencia del programa, el
                  punto de entrega podrá variar entre la dirección de residencia
                  o la del distribuidor según CONTINENTAL consideré. En caso de
                  ser entregado el premio en el distribuidor CONTINENTAL no se
                  hará responsable ni asumirá ningún costo adicional por
                  traslados que sean requeridos.
                </p>
                <p>
                  <strong>
                    7.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Restricciones y
                    condiciones:
                  </strong>
                </p>
                <p>
                  7.1. La vigencia del programa será desde que se realice la
                  comunicación formal del programa por parte de CONTINENTAL al
                  distribuidor y estará vigente hasta que la compañía lo
                  considere y lo comunique formalmente.
                </p>
                <p>
                  7.2. Sólo podrán participar en el programa la fuerza de ventas
                  de los distribuidores previamente autorizados por CONTINENTAL.
                </p>
                <p>
                  7.3. No sé podrán trasferir, cambiar o reclamar ningún tipo de
                  premio por nadie diferente al participante.
                </p>
                <p>
                  <br />
                  7.4. Si el participante no continua dentro del distribuidor
                  durante la vigencia del programa, se perderán todos los
                  puntos, beneficios o premios que no se hayan redimido y no sé
                  podrán trasferir, cambiar o reclamar ninguna venta o premio
                  por nadie diferente al participante.
                </p>
                <p>
                  <br />
                  7.5. Si el distribuidor desea que ingrese un nuevo
                  participante después de los plazos de inscripción deberá
                  solicitar por escrito a CONTINENTAL autorización explicando
                  las razones del porque se debería ingresar, CONTINENTAL está
                  en todo el derecho de aceptar o negarse a la solicitud según
                  su consideración.
                </p>
                <p>
                  <br />
                  7.6. Se deberán ingresar mensualmente las ventas sin
                  excepción, es decir, deberán ingresar las ventas del mes en
                  curso durante el transcurso del mismo, de la contrarío, dichas
                  ventas no tendrán ninguna validez dentro del programa.
                </p>
                <p>
                  <br />
                  7.7. Todos los campos para el registro de las ventas son
                  obligatorios (día, mes año de venta, numero de factura, costo
                  total de factura, marca, diseño, ancho-perfil-rin, cantidad)
                  así como subir la foto de la respectiva factura de venta.
                </p>
                <p>
                  <em>
                    *CONTINENTAL se reserva el derecho de entrega de premio si
                    estos campos no son diligenciados en su totalidad*
                  </em>
                </p>
                <p>
                  <br />
                  7.8. No se tendrá en cuenta las ventas realizadas por
                  licitación o pruebas de producto.
                </p>
                <p>
                  <br />
                  7.9. Solo se tendrán en cuenta las ventas de llantas de la
                  marca Continental y/o General Tire para automóvil y camioneta.
                  En caso de ingresar ventas que correspondan a otras marcas
                  (así sea del grupo CONTINENTAL) o de otras líneas de producto
                  no serán tenidas en cuenta.
                </p>
                <p>
                  <br />
                  7.10. Solo se tendrá derecho a contar con un usuario por
                  participante.
                </p>
                <p>
                  <br />
                  7.12. Las llantas de la marca Continental y General Tire que
                  CONTINENTAL decida dar puntuación adicional solo aplicará
                  durante el periodo que se defina.
                </p>
                <p>
                  7.14. CONTINENTAL no aceptará devoluciones de los premios por
                  imperfectos, fallas o daños de los productos que sean
                  entregados dentro del programa.
                </p>
                <p>
                  7.15. CONTINENTAL establece un plazo máximo de un mes para la
                  entrega de los premios desde el momento de la redención.
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(gridSystemStyle)(PoliticsRegister);
